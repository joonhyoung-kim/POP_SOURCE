var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var gvThat;

var MOMJA093 = {
	init: function() {
		var that = this;
		gvThat = this;
		Language.init(function() {
			mCommon.init("grid", "W2018082814222302610009pZV4hZmA66", null, function() {
				mCommon.gridPopCreat("grid", {colCount: 3, title: Language.lang['MESSAGES10566']});
				that.comboBox();
				that.grid("grid");
				$("#userIdLabel, #passwordLabel, #empNoLabel, #positionLabel, #defaultLanguageLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#userIdLabel, #passwordLabel, #empNoLabel, #positionLabel, #defaultLanguageLabel, #useYnLabel").find(".textblock").addClass("orange");
				$("#passwordModal").attr("type", "password");
				
			}, Language);
		});
		that.event();
		that.fileInpuSet();
	}, 
	grid: function(grid) {
		var that = this;
//		AUIGrid.setColumnPropByDataField(grid, "empAuthority", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				return that.empAuthorityList[value].codeName;
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "vendorCd", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var vendorCd = that.vendorCdList[value] || {};
//				return vendorCd.vendorName || "";
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "deptCd", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var deptCd = that.deptCdList[value] || {};
//				return deptCd.name || "";
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "position", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var position = that.positionList[value] || {};
//				return position.name || "";
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "defaultLanguage", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var languageCd = that.languageCdList[value] || {};
//				return languageCd.name || "";
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "useYn", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var useYn = that.useYnList[value] || {};
//				return useYn.name || "";
//			} 
//		});
//		
//		AUIGrid.setColumnPropByDataField(grid, "managerYn", {
//			labelFunction : function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				var managerYn = that.managerYnList[value] || {};
//				return managerYn.name || "";
//			} 
//		});
		tuCommon.cellClick(grid);
		tuCommon.editColumnSet("grid");
		
	}, 
	event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function() {
			mCommon.render("grid", "W2018082814222302610009pZV4hZmA66", mCommon.formGetParam("#form"), function(){
				//widget_ajax('MOMJA093', $('head'), 'grid', 'reload');
			});
		});
		
		//등록 버튼 클릭
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.ajaxType = "post";
			$("#userIdTmpModal").attr("readonly", null);
			$("#useYnModal").val("Y");
		});
		
		var dvCd = "";
		var cpCd = "";
		
		//수정 버튼 
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			dvCd = item.divisionCd;
			cpCd = item.companyCd;
			$("#userIdTmpModal").attr("readonly", "readonly");
			mCommon.gridPopEdit("grid", {rowNum: rowIndex});
			that.ajaxType = "put";
		});
		
		//저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var saveData = mCommon.gridFormGetParam("grid");
			if($("#userIdTmpModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10039']});
				return;
			}
			if($("#passwordModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10059']});
				return;
			}
			if($("#empNoModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10575']});
				return;
			}
			if($("#empAuthorityModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10233']});
				return;
			}
			if($("#positionModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES11279']});
				return;
			}
			if($("#defaultLanguageModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10569']});
				return;
			}
			if($("#useYnModal").val() == ""){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10565']});
				return;
			}
			saveData.divisionCd = divisionCd;
			saveData.companyCd = companyCd;
			saveData.userIdTmp = $("#userIdTmpModal").val();
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after:function(){
					saveData.password = mCommon.sha256Set(saveData.password);
					that.saveUser(saveData);
				}
			}});
			
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10651'], closeButton : {text : "Close"}, okButton : {text : "OK", 
					after : function() {
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
								userIdTmp : checkedItems[i].item.userIdTmp
							}
							if(i == checkedItems.length - 1){
								chkFlag = true;
							}
							mom_ajax("D","user.user", JSON.stringify(param), that.callbackPost, chkFlag);
						}
					}
				}});				
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
				return;
			}			
		});
		
		// 복사 버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopEdit("grid", {rowNum: selectItems[0].rowIndex});
			that.ajaxType = "post";
			$("#passwordModal").val("");
			$("#userIdTmpModal").attr("readonly", null);
		});
		
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName : "USER_MOMJA093_test"}, "templete");
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {			
			mCommon.auiGridExcelExport("grid", {fileName : "USER_MOMJA093_" + get_current_date("yyyy-mm-dd")});
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
		tuCommon.addKeyDown($(document), $('#empNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#empName'), $('#findBtn'));
	},
	saveUser: function(saveData) {
		var that = this;
		$.ajax({
			url : tuCommon.contextPath() + "/system/user",
			data : JSON.stringify(saveData),
			contentType : "application/json; charset=UTF-8",
			method: that.ajaxType,
			success: function(result) {
				if(result.result == "success") {
					mCommon.render("grid", "W2018082814222302610009pZV4hZmA66", mCommon.formGetParam("#form"), function(){
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
						$("#gridModalPop").micaModal("hide");
					});
				} else {
					if(result.p_err_msg != null && result.p_err_msg != undefined && result.p_err_msg != '') {
			           micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(result.p_err_msg)});
			        } else {
			           micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			        }
				}
			}, 
			fail: function(data) {
				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
		           micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
		        } else {
		           micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
		        }
			}
		});
	},
	comboBox: function() {
		var that = this;
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		
		//권한
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.authority.dummy", // 호출 URL
			function(data) {
				var options = {local: "", textName : "codeName", valueName : "codeId", readonly : false};
				options.local = data;
				that.empAuthorityList = micaCommon.fncS.keyValueSet({key : "codeId", data: data})
				micaCommon.comboBox.set("#empAuthorityModal", comboOptions, options);
			}
		);
		
		//직급 
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"POSITION"}, // 파라미터
			function(data) {
				var options = {local: "", textName : "name", valueName : "code", readonly : false};
				options.local = data;
				that.positionList = micaCommon.fncS.keyValueSet({key : "code", data: data})
				micaCommon.comboBox.set("#positionModal", comboOptions, options);
			}
		);
		
		//업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.vendor.vendor.dummy", // 호출 URL
			function(data) {
				var options = {local: "", textName : "vendorName", valueName : "vendorCd", readonly : false};
				options.local = data;
				that.vendorCdList = micaCommon.fncS.keyValueSet({key : "vendorCd", data: data})
				micaCommon.comboBox.set("#vendorCdModal", comboOptions, options);
			}
		);
		
		//사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				var options = {local: "", textName : "name", valueName : "code", readonly : false};
				options.local = data;
				that.useYnList = micaCommon.fncS.keyValueSet({key : "code", data: data})
				micaCommon.comboBox.set("#useYnModal",comboOptions, options);
			}
		);
		
		//관리자여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"N_Y"}, // 파라미터
				function(data) {
					var options = {local: "", textName : "name", valueName : "code", readonly : false};
					options.local = data;
					that.managerYnList = micaCommon.fncS.keyValueSet({key : "code", data: data})
					micaCommon.comboBox.set("#managerYnModal",comboOptions, options);
				}
			);
		
		//사용자언어
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"LANGUAGE_CODE"}, // 파라미터
				function(data) {
					var options = {local: "", textName : "name", valueName : "code", readonly : false};
					options.local = data;
					that.languageCdList = micaCommon.fncS.keyValueSet({key : "code", data: data})
					micaCommon.comboBox.set("#defaultLanguageModal",comboOptions, options);
				}
			);
		
		//부서
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"DEPT_CD"}, // 파라미터
			function(data) {
				var options = {local: "", textName : "name", valueName : "code", readonly : false};
				options.local = data;
				that.deptCdList = micaCommon.fncS.keyValueSet({key : "code", data: data})
				micaCommon.comboBox.set("#deptCdModal", comboOptions, options);
				micaCommon.comboBox.set("#partName", comboOptions, options);
			}
		);
		
		
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
 		
		excel_upload(file, 'user.user', 'MOMJA093', 'grid', JSON.stringify(param), gvThat.callbackPost);
		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	},
	callbackPost : function(param, data, callbackParam){
		if(param == 'SUCCESS'){
			if(callbackParam == true){
				mCommon.render("grid", "W2018082814222302610009pZV4hZmA66", mCommon.formGetParam("#form"), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					$("#gridModalPop").micaModal("hide");
				});
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
	empAuthorityList: []
};
$(document).ready(function(event){
	MOMJA093.init();
});