var userId = sessionStorage.getItem("userId");
var gvThat;
var MOMIA003 = {
	init : function() {		
		var that = this;
		gvThat = this;
		
		//2019.05.09 hyjeong begin
		Language.init(function() {
			mCommon.init("grid", "W201807061831548961001HGLPb7ukGAU", null, function() {
				that.grid("grid");
				mCommon.gridPopCreat("grid", {colCount : 3, title : Language.lang['MESSAGES10853']});
				that.comboBox();
				// 라벨 색상 변경
				$("#vendorCdLabel, #vendorNameLabel, #vendorTypeLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#vendorCdLabel, #vendorNameLabel, #vendorTypeLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);
		});
		// 2019.05.09 hyjeong end
		
		that.event();
		that.fileInpuSet();		
	}, 
	
	grid: function(grid) {
		tuCommon.editColumnSet(grid);
		tuCommon.cellClick(grid);
	}, 
	
	event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function() {
			mCommon.render("grid", "W201807061831548961001HGLPb7ukGAU", mCommon.formGetParam("#form"), function(){
			});
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setVendorPop();
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#vendorCdModal").attr("readonly", false);
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10655'], closeButton : {text : "Close"}, okButton : {text : "OK", 
					after : function() {
						for(var i = 0; i < checkedItems.length; i++){
							arrayList.push(checkedItems[i].item)
							
						}
						mom_ajax("LD","reference.resource.vendor.vendor", JSON.stringify(arrayList), that.callbackPost);
					}
				}});				
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
				return;
			}			
		});
		
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName : "VENDOR_MOMIA003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName : "VENDOR_MOMIA003_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if($("#vendorCdModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10857']});
				return;
			}
			
			if($("#vendorNameModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10851']});
				return;
			}
			
			if($("#vendorTypeModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10860']});
				return;
			}
			
			if($("#useYnModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10583']});
				return;
			}
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after:function(){
					var param = that.getVendorPop();
					if(type == "C") {
						mom_ajax(type, "reference.resource.vendor.vendor", JSON.stringify(param), that.callbackProc, param);	
					} else {
						mom_ajax(type, "reference.resource.vendor.vendor", JSON.stringify(param), that.callbackPost);	
					}
					
				}
			}});

		});
		
		// 업체 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			
			mCommon.gridPopAdd("grid");
			that.setVendorPop(selectItems[0].item);
			
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#vendorCdModal").attr("readonly", null);
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {			
			var rowIndex = $(this).attr("row-index");			
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			
			that.setVendorPop(item);
			
			$("#gridModalPopSaveBtn").attr("type", "U");
			$("#vendorCdModal, #updateByModal, #updateDateModal").attr("readonly", "readonly");
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
		tuCommon.addKeyDown($(document), $('#vendorId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#vendorName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#businessNo'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : 'containsignorecase', autoComplete : true};
		var options = {local : "", textName : "name", valueName : "code", readonly : false};
		//업체타입
			$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{ codeClassId : "VENDOR_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorType", comboOptions, options);
					micaCommon.comboBox.set("#vendorTypeModal", comboOptions, options);
				}
			);
		
		//거래유무,사용유무,출발처리유무,출하자동입고
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId : "USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
//					micaCommon.comboBox.set("#dealFlagModal", comboOptions, options);
				micaCommon.comboBox.set("#useYnModal", comboOptions, options);
				micaCommon.comboBox.set("#departureFlagModal", comboOptions, options);
				micaCommon.comboBox.set("#shipInUseFlagModal", comboOptions, options);
				micaCommon.comboBox.set("#useFlag", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			}
		);
		
		//수요계획생성방식
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId : "DEMAND_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#createDemandTypeModal", comboOptions, options);
			}
		);
	},
	setVendorPop : function(data) { 
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		var curr_YmdDate = get_current_date('yyyy-mm-dd');
		
		$("#vendorCdModal").val(data.vendorCd || "");
		$("#vendorNameModal").val(data.vendorName || "");
		$("#vendorTypeModal").val(data.vendorType || "");
//		$("#dealFlagModal").val(data.dealFlag || "Y");
		$("#businessNoModal").val(data.businessNo || "");
		$("#businessTypeModal").val(data.businessType || "");
		$("#businessStatusModal").val(data.businessStatus || "");
		$("#addressModal").val(data.address || "");
		$("#ceoNameModal").val(data.ceoName || "");
		$("#managerNameModal").val(data.managerName || "");
		$("#oqcFlagModal").val(data.oqcFlag || "");
		$("#telNoModal").val(data.telNo || "");
		$("#faxNoModal").val(data.faxNo || "");
//		$("#dealStartDateModal").val(data.dealStartDate || curr_YmdDate);
//		$("#dealEndDateModal").val(data.dealEndDate || "");
		$("#emailModal").val(data.email || "");
		$("#preBuildTermModal").val(data.preBuildTerm || "");
		$("#useYnModal").val(data.useYn || "Y");
		$("#shipInUseFlagModal").val(data.shipInUseFlag || "N");
		$("#departureFlagModal").val(data.departureFlag || "N");
		$("#shipInLocationModal").val(data.shipInLocation || "");
		$("#updateByModal").val(data.updateBy || userId);
		$("#updateDateModal").val(data.updateDate||curr_date);
		$("#descriptionModal").val(data.description || "");
		$("#createDemandTypeModal").val(data.createDemandType || "");
		$("#corporateCodeModal").val(data.corporateCode || "");
		
		$("#vendorCdModal, #updateByModal, #updateDateModal").attr("readonly", "readonly");
	},
	getVendorPop: function() {
		var result = {vendorCd: $("#vendorCdModal").val(),vendorName: $("#vendorNameModal").val(),vendorType:$("#vendorTypeModal").val(),businessNo: $("#businessNoModal").val(),businessType :  $("#businessTypeModal").val(),businessStatus :  $("#businessStatusModal").val(),address : $("#addressModal").val(),ceoName: $("#ceoNameModal").val(),managerName:$("#managerNameModal").val(),telNo:$("#telNoModal").val(),faxNo:$("#faxNoModal").val(),email: $("#emailModal").val(),preBuildTerm: $("#preBuildTermModal").val(),useYn: $("#useYnModal").val(),shipInUseFlag : $("#shipInUseFlagModal").val(),departureFlag: $("#departureFlagModal").val(),shipInLocation: $("#shipInLocationModal").val(),description : $("#descriptionModal").val(),createDemandType : $("#createDemandTypeModal").val(),corporateCode : $("#corporateCodeModal").val()};
		return result;
	},	
	callbackPost : function(result, data, param){
		if(result == 'SUCCESS'){
			mCommon.render("grid", "W201807061831548961001HGLPb7ukGAU", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				$("#gridModalPop").micaModal("hide");
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	callbackProc : function(result, data, param, callbackParam) {
		if(result == 'SUCCESS'){
			var that = this.MOMIA0003;
			if(callbackParam == undefined) {
				mom_ajax("C", "reference.resource.vendor.vendorLocationProc", "{}", gvThat.callbackPost);
			} else{
				mom_ajax("C", "reference.resource.vendor.vendorLocationProc", JSON.stringify(callbackParam), gvThat.callbackPost);
			}
			
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
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		//var that = this.MOMIA003;
		var param = [ {} ];
 		
		excel_upload(file, 'reference.resource.vendor.vendor', 'MOMIA003', 'grid', JSON.stringify(param), gvThat.callbackProc);
		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIA003.init();
});