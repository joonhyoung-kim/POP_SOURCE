var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var locationParam = mCommon.getSearchParam();
var cudFlag;
var market;
var currency;
var gvThat;

var MOMIC001 = {
	init: function() {		
		var that = this;
		gvThat = this;
		var title;
		that.event();
		that.fileInpuSet();
		Language.init(function() {
			if(locationParam.inoutFlag == "IN") {
				title = Language.lang['MESSAGES11093'];
			} else {
				title = Language.lang['MESSAGES10889'];
			}
			$("#label-id").text(title);
			
			mCommon.init("grid", "W20180626102049300100071ORm8oug6c", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: title});
				that.comboBox();
				that.getParameterInfo();
			}, Language);
		});
	}, grid: function() {	
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');	
		
	}, event: function() {
		var that = this;
	
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			var param =  mCommon.formGetParam("#form");
			param.inoutFlag = locationParam.inoutFlag;
			mCommon.render("grid", "W20180626102049300100071ORm8oug6c", param, function(){});
		});

		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			that.setMaterialPricePop(item);
			cudFlag = "U";
			$("#itemIdModal, #vendorCdModal, #marketCdModal, #currencyCdModal, #useYnModal").jqxComboBox({disabled: true});
			$("#updateUserNameModal, #updateDateModal, #prevPriceModal, #startDateModal, #endDateModal").attr("readonly", "readonly");
			$("#startDateModal").datetimepicker("destroy");
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setMaterialPricePop();
			cudFlag = "C";
			
			$("#itemIdModal, #vendorCdModal, #marketCdModal, #currencyCdModal").jqxComboBox({disabled: false});
			$("#useYnModal").jqxComboBox({disabled: true});
			$("#prevPriceModal, #updateDateModal, #updateUserNameModal, #endDateModal").attr("readonly", "readonly");
			$("#startDateModal").attr("readonly", null);
			micaCommon.datetimepicker("#startDateModal", {dateFormat: "date", dataFormat: "Y-m-d"});
		});
		
		//삭제 버튼
		$(document).on('click', '#delBtn', function(){
	    	var checkedItems = AUIGrid.getCheckedRowItems('grid');
	    	cudFlag = "D";
	        if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10656'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						mom_ajax('D', 'reference.price.materialPrice.materialPriceTemp', JSON.stringify({inoutFlag: locationParam.inoutFlag}), that.delCallback, checkedItems);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}	
		});

		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_PRICE_MOMIC001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_PRICE_MOMIC001_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			if($("#itemIdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			if($("#vendorCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
				return;
			}
			if($("#modifyUnitPriceModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11617']});
				return;
			}
			if($("#currencyCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11657']});
				return;
			}
			if($("#marketCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10044']});
				return;
			}
			if($("#startDateModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			if($("#endDateModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});
				return;
			}
		
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getMaterialPricePop();
					mom_ajax("D", "reference.price.materialPrice.materialPriceTemp", JSON.stringify(param[0]), that.upCallback, param);
					$(".modal").micaModal("hide");
				}
			}});
		});
		
		//복사 버튼
		$(document).on("click", "#copyBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "C";
				mCommon.gridPopAdd("grid");
				that.setMaterialPricePop(checkedItems[0].item);
			}
			$("#itemIdModal, #vendorCdModal, #marketCdModal, #currencyCdModal").jqxComboBox({disabled: false});
			$("#useYnModal").jqxComboBox({disabled: true});
			$("#startDateModal").attr("readonly", null);
			micaCommon.datetimepicker("#startDateModal", {dateFormat: "date", dataFormat: "Y-m-d"});
			$("#prevPriceModal, #updateDateModal, #updateUserNameModal, #endDateModal").attr("readonly", "readonly");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.excelUpload();
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		$("#fromDate").val(get_date_diff(0));

		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy',  {}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#vendorName",comboOptions, options);
			micaCommon.comboBox.set("#vendorCdModal",comboOptions, options);
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "CURRENCY_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#currencyCdModal",comboOptions, options);
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "MARKET_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#marketCdModal",comboOptions, options);
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "USE_FLAG"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#useYnModal",comboOptions, options);
		});
		
		//품목		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItems);
	},
	setMaterialPricePop: function(data) { 
		data = data || {};
		var endDate ='4712-12-31'
		$("#itemIdModal").val(data.itemId || "");
		$("#vendorCdModal").val(data.vendorCd || ""); 
		$("#unitPriceModal").val(data.unitPrice || "");
		$("#prevPriceModal").val(data.prevPrice || "");
		$("#currencyCdModal").val(data.currencyCd || currency); 
		$("#startDateModal").val(data.startDate || get_date_diff(0));
		$("#endDateModal").val(data.endDate || endDate);
		$("#marketCdModal").val(data.marketCd || market);
		$("#updateUserNameModal").val(data.updateBy || userId);
		$("#updateDateModal").val(data.updateDate || get_current_date());
		$("#useYnModal").val(data.useYn || "Y");
		$("#descriptionModal").val(data.description || "");
	},
	getMaterialPricePop: function() {
		var result = [
			{
				inoutFlag: locationParam.inoutFlag,
				vendorCd: $("#vendorCdModal").val() || "",
				itemId: $("#itemIdModal").val() || "",
				startDate: $("#startDateModal").val() || "",
				endDate: $("#endDateModal").val() || "",
				unitPrice: $("#unitPriceModal").val(),
				marketCd: $("#marketCdModal").val() || "",
				currencyCd:$("#currencyCdModal").val() || "",
				useYn: $("#useYnModal").val() || "",
				description:$("#descriptionModal").val() || "",
				cudFlag : cudFlag
			}
		]
		return result;
	},
	getParameterInfo : function() {
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comParameter.dummy",
			type : "GET",
			data : {},
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				market = data[0].marketCd;
				currency = data[0].currencyCd;
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	delCallback : function(param, data, callbackParam){
		var that = this.MOMIC001;
		if(param == 'SUCCESS'){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.cudFlag = "D";
            	arrayList.push(callbackParam[i].item);                  
            }
			mom_ajax('L', 'reference.price.materialPrice.materialPriceTemp', JSON.stringify(arrayList), that.upCallback2, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	upCallback : function(param, data, callbackParam){
		var that = this.MOMIC001;
		if(param == "SUCCESS"){
			mom_ajax("C", "reference.price.materialPrice.materialPriceTemp", JSON.stringify(callbackParam[0]), that.upCallback2, callbackParam);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	upCallback2 : function(param, data, callbackParam){
		var that = this.MOMIC001;
		if(param == "SUCCESS"){
			mom_ajax("C", "reference.price.materialPrice.materialPrice", JSON.stringify(callbackParam[0]), that.listCallbackPost, callbackParam);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	        } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	        }
			micaCommon.splash.hide();
			console.log(data);
		}
	},
	listCallbackPost : function(param, data){
		var that = this.MOMIC001;
		if(param == 'SUCCESS'){
			var param =  mCommon.formGetParam("#form");
			param.inoutFlag = locationParam.inoutFlag;
			mCommon.render("grid", "W20180626102049300100071ORm8oug6c", param, function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	excelUpload: function() {
		var param = {inoutFlag: locationParam.inoutFlag};
   		
   		/*excel_upload(file, 'reference.price.materialPrice.materialPrice', 'MOMIC001', JSON.stringify(param));*/
		excel_upload(file, 'reference.price.materialPrice.materialPrice', 'MOMIC001', 'grid', JSON.stringify(param), gvThat.listCallbackPost);
   		$("#uploadPop").micaModal("hide");
   		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIC001.init();
});
