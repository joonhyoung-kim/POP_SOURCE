var gvThat;
var MOMDA002 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.comboBox();
		that.event();
		that.fileInpuSet();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201807311929491961000mGWSQvpD0Jh", null, function() {
				that.grid("grid");
				mCommon.init("auigrid2", "W2018073119353764410001jaqgX0iIdw", function(){
					that.grid("auigrid2");
				}, Language);
			}, Language);
		});
		
	}, grid: function(grid) {
		tuCommon.cellClick(grid, 'single');
		
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			if(e.dataField == "equipmentCd") {
				if(e.item.woState != "C" && e.item.woState != "T") {
					return true;
				} else {
					return false;
				}
			}
		});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderCreate.equipment.dummy",
			type : "GET",
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField('grid', 'equipmentCd', {
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "ConditionRenderer",
						conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
							return {
								type : "DropDownListRenderer",
								showEditorBtnOver : true,
								list : data, 
								keyField : "code", 
								valueField : "name"
							}
						}
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
		
		AUIGrid.setColumnPropByDataField('grid', 'equipmentCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue("grid", rowIndex, "woState");
				if(getValue != 'C' && getValue != 'T'){
					return 'columnStyle';
				}
			}
		});
		
	}, event: function() {
		var that = this;
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "JOB_CURRENT_SITUATION_MOMDA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 자재차감조회 팝업 엑셀 다운 버튼
		$(document).on("click", "#dpExcelDownBtn", function() {
			mCommon.auiGridExcelExport("auigrid2", {fileName: "MATERIAL_DEDUCTION_MOMDA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회
		$("#findBtn").click(function(event){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201807311929491961000mGWSQvpD0Jh", that.getSearchData(), function(){});
		});
		
		// WO/PO, 아이템ID enter로 조회
		$(document).on("keydown", "#searchKeyWord", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 자재차감이력조회
		$(document).on("click", "#materialDeductionBtn", function() {
			 var checkedItems = AUIGrid.getCheckedRowItems("grid");
			 if(checkedItems.length <= 0){
				 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11234']});
				 return;
			 }
			 
			 if(checkedItems.length > 1){
				 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				 return;
			 }
			 
			 mCommon.render("auigrid2", "W2018073119353764410001jaqgX0iIdw", checkedItems[0].item, function(){});
			 $(window).resize();
			 $("#dppop").micaModal("show");
		});
		
		$(document).on("click", "#saveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11340']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					for(var i=0; i<checkedItems.length; i++) {
						var param = { equipmentCd : checkedItems[i].item.equipmentCd, 
								      workOrderId : checkedItems[i].item.workOrderId }
						
						if(i == checkedItems.length-1) {
							chkFlag = true;
						}
						
						mom_ajax("U", "workOrder.jobCurrentSituation.equipmentCd", JSON.stringify(param), that.listCallbackPost, chkFlag);
					}
				}
			}});
		});
		
		//엑셀 양식 다운로드
		$(document).on("click", "#excelSampleBtn", function(){
			that.excelTempDown();
		});
		
		// 팝업닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function(){
			 $(".modal").micaModal("hide");
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
			var param = {};
			mom_ajax("D", "workOrder.jobCurrentSituation.woResultExUpload", JSON.stringify(param), that.excelUpload);
			mCommon.gridPopHide("grid");
		});
	},
	comboBox: function(){
		// 날짜
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(1));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_DATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// searchJobTerms
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_TERMS", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#searchJobTerms",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// 창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : "'FAC300', 'FAC500'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName", comboOptions, options);
					callBack();
				}
			);
		});

		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_STATE", attribute2: "Y"}, // 파라미터
			function(data){
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, {local: data, textName : "name", valueName : "code"});
			
			}
		);
		
		// orderType
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SYSTEM_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderType",comboOptions, options);
			
			}
		);
		
		// 완료자
		mCommon.comboBoxClickCall("#completeBy", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#completeBy",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// 설비(MOM_EQUIPMENT Table - equipmentCd)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderCreate.equipment.dummy", // 호출 URL
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#equipmentCd", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	},
	getSearchData : function(){
		var checkedItems = "";
		var stateList = $("#state").jqxComboBox('getCheckedItems');
		$.each(stateList, function(index){
			if(stateList.length-1 != index){
				checkedItems +="'"+this.value + "',"
			} else {
				checkedItems +="'"+this.value + "'"
			}
		});
		
		var param = {
			dateCombo : $("#dateCombo").val(),
			fromDate : $("#fromDate").val(),
			toDate : $("#toDate").val(),
			searchJobTerms : $("#searchJobTerms").val(),
			searchKeyWord : $("#searchKeyWord").val(),
			locationCd : $("#locationName").val(),
			resourceCd : $("#resourceName").val(),
			state : checkedItems,
			orderType : $("#orderType").val(),
			completeBy : $("#completeBy").val(),
			orderFlag :  $("#orderFlag").val(),
			equipmentCd : $("#equipmentCd").val()
		}
		return param;
	}, 
	excelTempDown : function() {
			$("body").append('<div id="template" style="width:100%; height:100%; display:none;"></div>');
			$("head").append("<style>.back-red{background-color: #ff8000;}</style>");
			var columnLayout = [{dataField: 'workOrderId', headerText : Language.lang['MESSAGES11150'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "WM1910300001"},{dataField: 'itemId', headerText : Language.lang['MESSAGES12190'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "CHAIR_01"}
			,{dataField: 'startTime', headerText : Language.lang['MESSAGES10786'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "2019-10-30 063000"}, {dataField: 'endTime', headerText : Language.lang['MESSAGES11235'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "2019-10-30 183000"}
			,{dataField: 'goodQty', headerText : Language.lang['MESSAGES10835'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "100"},{dataField: 'badQty', headerText : Language.lang['MESSAGES10516'], excelTempleteHide : true, columnTempleteData: "10"},{dataField: 'shiftCd', headerText : 'shift Cd', excelTempleteHide : true, columnTempleteData: "D"}];
			
			myGridID = AUIGrid.create("template", columnLayout, {showRowNumColumn : false});
			var option = {fileName:"WORK_ORDER_MOMDA002" + get_current_date("yyyy-mm-dd")}
			option.afterRequestCallback = function() {
				$("#template").remove();
				AUIGrid.destroy("template");
			}
			var templeteData = new Array;
			var templeteDataObj = {};
			for(var i = 0; i < columnLayout.length; i++) {
				var name = columnLayout[i].dataField;
				templeteDataObj[name] = columnLayout[i].columnTempleteData;
			}
			templeteData.push(templeteDataObj);
			AUIGrid.setGridData("template", templeteData);
			AUIGrid.exportToXlsx("template", option);
//			mCommon.auiGridExcelExport("template", option, "templete");
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var that = this.MOMDA002;
		var param = [ { } ];
		
		var columnLayout = [{dataField: 'workOrderId', headerText : Language.lang['MESSAGES11150'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "WM1910300001"},{dataField: 'itemId', headerText : Language.lang['MESSAGES12190'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "CHAIR_01"}
		,{dataField: 'startTime', headerText : Language.lang['MESSAGES10786'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "2019-10-30 063000"}, {dataField: 'endTime', headerText : Language.lang['MESSAGES11235'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "2019-10-30 183000"}
		,{dataField: 'goodQty', headerText : Language.lang['MESSAGES10835'], headerStyle : 'back-red', excelTempleteHide : true, columnTempleteData: "100"},{dataField: 'badQty', headerText : Language.lang['MESSAGES10516'], excelTempleteHide : true, columnTempleteData: "10"},{dataField: 'shiftCd', headerText : 'shift Cd', excelTempleteHide : true, columnTempleteData: "D"}];
		var gridPros = {
				showRowCheckColumn: false,
				rowIdField : "id"
			};
		AUIGrid.create('grid2', columnLayout, gridPros);
		
 		excel_upload(file, 'workOrder.jobCurrentSituation.woResultExUpload', 'MOMDA002', 'grid2', JSON.stringify(param), gvThat.excelCallback);
 		
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	},
	excelCallback : function(result, data){
		var that = this.MOMDA002;
		var param = {};
		if(result == "SUCCESS"){
			mom_ajax('C', 'workOrder.jobCurrentSituation.woResultExUploadProc', JSON.stringify(param), that.listCallbackPost, true);
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallbackPost : function(result, data, param, callbackParam) {
		var that = this.MOMDA002;
		if(result == "SUCCESS") {
			if(callbackParam == true) {
				mCommon.render("grid", "W201807311929491961000mGWSQvpD0Jh",  mCommon.formGetParam("#form"), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});