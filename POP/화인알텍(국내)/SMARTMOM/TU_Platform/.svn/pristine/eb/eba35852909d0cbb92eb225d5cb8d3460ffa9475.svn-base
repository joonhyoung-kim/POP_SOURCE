var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var cudFlag;
var gvThat;
var MOMIC004 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201811201707372011000aa4OMXrdcBC", null, function(){
				that.grid();
				that.fileInpuSet();	
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES11567']});
				that.comboBox();
			}, Language);
		});
	}, grid : function() {
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
	}, event : function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			var param =  mCommon.formGetParam("#form");
			mCommon.render("grid", "W201811201707372011000aa4OMXrdcBC", param, function(){});
		});
		
		//수정 버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			that.setStandardPricePop(item);
			cudFlag = "U";
			$("#itemIdModal, #useYnModal").jqxComboBox({disabled: true});
			$("#updateByModal, #updateDateModal, #prevPriceModal, #startDateModal, #endDateModal").attr("readonly", "readonly");
			$("#startDateModal, #endDateModal").datetimepicker("destroy");
		});

		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setStandardPricePop();
			cudFlag = "C";
			
			$("#itemIdModal").jqxComboBox({disabled: false});
			$("#useYnModal").jqxComboBox({disabled: true});
			$("#prevPriceModal, #updateDateModal, #updateByModal, #endDateModal").attr("readonly", "readonly");
			$("#startDateModal").attr("readonly", null);
			micaCommon.datetimepicker("#startDateModal", {dateFormat: "date", dataFormat: "Y-m-d"});
			$("#endDateModal").datetimepicker("destroy");
		});
		
		//삭제 버튼
		$(document).on('click', '#delBtn', function(){
	    	var checkedItems = AUIGrid.getCheckedRowItems('grid');
	    	cudFlag = "D";
	        if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10663'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						var param = {};
						mom_ajax('D', 'reference.price.standardPrice.standardPriceTemp', JSON.stringify(param), that.delCallback, checkedItems);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}	
		});

		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "STANDARD_PRICE_MOMIC004_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "STANDARD_PRICE_MOMIC004_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			if($("#itemIdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			if($("#unitPriceModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11619']});
				return;
			}
			if($("#startDateModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			if($("#useYnModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				return;
			}
		
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getMaterialPricePop();
					mom_ajax("D", "reference.price.standardPrice.standardPriceTemp", JSON.stringify(param[0]), that.upCallback, param);
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
				that.setStandardPricePop(checkedItems[0].item);
			}
			$("#itemIdModal").jqxComboBox({disabled: false});
			$("#useYnModal").jqxComboBox({disabled: true});
			$("#startDateModal").attr("readonly", null);
			micaCommon.datetimepicker("#startDateModal", {dateFormat: "date", dataFormat: "Y-m-d"});
			$("#prevPriceModal, #updateDateModal, #updateByModal, #endDateModal").attr("readonly", "readonly");
			$("#endDateModal").datetimepicker("destroy");
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
		
	}, comboBox : function() {
		var comboOptions = {searchMode : "containsignorecase", autoComplete : true};
		var options = {local : "", textName : "name", valueName : "code", readonly : false};
		
		$("#fromDate").val(get_date_diff(0));
		
		//품목유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ITEM_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#itemType", comboOptions, options);
				}
		);
		
		//품목		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItems);
		
		//원가타입
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  
				{codeClassId : "PRICE_TYPE"}, 
				function(data){
				options.local = data;
				micaCommon.comboBox.set("#priceTypeModal", comboOptions, options);
				micaCommon.comboBox.set("#priceType", comboOptions, options);
		});
		
		//사용유무
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  
				{codeClassId : "USE_FLAG"}, 
				function(data){
				options.local = data;
				micaCommon.comboBox.set("#useYnModal", comboOptions, options);
		});
		
		//단가유형
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  
				{codeClassId : "PRICE_CATEGORY"}, 
				function(data){
				options.local = data;
				micaCommon.comboBox.set("#categoryCdModal", comboOptions, options);
				micaCommon.comboBox.set("#categoryCd", comboOptions, options);
		});
	},
	setStandardPricePop : function(data) {
		data = data || {};
		var endDate ='4712-12-31'
		$("#itemIdModal").val(data.itemId || "");
		$("#unitPriceModal").val(data.unitPrice || "");
		$("#prevPriceModal").val(data.prevPrice || "");
		$("#priceTypeModal").val(data.priceType || "ST");
		$("#startDateModal").val(data.startDate || get_date_diff(0));
		$("#endDateModal").val(data.endDate || endDate);
		$("#updateByModal").val(data.updateBy || userId);
		$("#updateDateModal").val(data.updateDate || get_current_date());
		$("#useYnModal").val(data.useYn || "Y");
		$("#descriptionModal").val(data.description || "");
		$("#categoryCdModal").val(data.categoryCd || "USING");
	},
	getMaterialPricePop: function() {
		var result = [
			{
				itemId : $("#itemIdModal").val() || "",
				startDate : $("#startDateModal").val() || "",
				endDate : $("#endDateModal").val() || "",
				unitPrice : $("#unitPriceModal").val(),
				useYn : $("#useYnModal").val() || "",
				description : $("#descriptionModal").val() || "",
				priceType : $("#priceTypeModal").val() || "",
				categoryCd : $("#categoryCdModal").val() || "",
				cudFlag : cudFlag
			}
		]
		return result;
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMIC004;
		if(result == 'SUCCESS'){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.cudFlag = "D";
            	arrayList.push(callbackParam[i].item);                  
            }
			mom_ajax('L', 'reference.price.standardPrice.standardPriceTemp', JSON.stringify(arrayList), that.upCallback2, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	upCallback : function(result, data, param, callbackParam){
		var that = this.MOMIC004;
		if(result == "SUCCESS"){
			mom_ajax("C", "reference.price.standardPrice.standardPriceTemp", JSON.stringify(callbackParam[0]), that.upCallback2, callbackParam);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	upCallback2 : function(result, data, param, callbackParam){
		var that = this.MOMIC004;
		if(result == "SUCCESS"){
			mom_ajax("C", "reference.price.standardPrice.standardPrice", JSON.stringify(callbackParam[0]), that.listCallbackPost, callbackParam);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(result, data){
		var that = this.MOMIC004;
		if(result == "SUCCESS"){
			var param =  mCommon.formGetParam("#form");
			mCommon.render("grid", "W201811201707372011000aa4OMXrdcBC", param, function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	excelUpload: function() {
		var param = {priceType : 'ST'};
		excel_upload(file, 'reference.price.standardPrice.standardPrice', 'MOMIC004', 'grid', JSON.stringify(param), gvThat.listCallbackPost);
   		$("#uploadPop").micaModal("hide");
   		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIC004.init();
});