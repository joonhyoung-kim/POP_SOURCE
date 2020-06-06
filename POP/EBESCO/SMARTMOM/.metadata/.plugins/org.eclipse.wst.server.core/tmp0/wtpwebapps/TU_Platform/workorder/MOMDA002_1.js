var MOMDA002_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
		momWidget.isInitGrid(0, function() {
			that.defaultStyle();
			that.grid();
		});
		
		that.event();
		$("#uploadPop1 .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop1 .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop1 .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		} 
	}/*, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		console.log('#### ' + JSON.stringify(indexInfo));
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
	}*/
	, grid: function() {
		/* modify_hists
		 * XMOMF9 / ljw / 20191106 / 작업상태 지시나 진행중인 데이터 대상으로 설비코드 항목 그리드에서 수정하여 저장 가능하도록 기능 추가
		 * 
		 * */
		var that = this;
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			if(e.dataField == "equipmentCd") {
				if(e.item.woState != "C" && e.item.woState != "T") {
					return true;
				} else {
					return false;
				}
			}
		});
		
		mom_ajax('R', 'workOrder.workOrderCreate.equipment', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			momWidget.setColumnPropByDropDown(0, 'equipmentCd', undefined, data);
		}, undefined, undefined, this, 'sync');
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'equipmentCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "woState");
				if(getValue != 'C' && getValue != 'T') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
	}, event: function() {
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpActBtn1", function() {
			$("#uploadPop1").momModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop1").momModal("hide");
		});
		
	}, excelTemplateDownCallInit(index, param, callBackParam, indexInfo) {
		var columnLayout = [{dataField: 'workOrderId', headerText : Language.lang['MESSAGES11150'], columnTempleteData: "WM1910300001", excelTemplateHide: 1},{dataField: 'itemId', headerText : Language.lang['MESSAGES12190'], columnTempleteData: "CHAIR_01", excelTemplateHide: 1}
		,{dataField: 'startTime', headerText : Language.lang['MESSAGES10786'], columnTempleteData: "2019-10-30 063000", excelTemplateHide: 1}, {dataField: 'endTime', headerText : Language.lang['MESSAGES11235'], columnTempleteData: "2019-10-30 183000", excelTemplateHide: 1}
		,{dataField: 'goodQty', headerText : Language.lang['MESSAGES10835'], columnTempleteData: "100", excelTemplateHide: 1},{dataField: 'badQty', headerText : Language.lang['MESSAGES10516'], columnTempleteData: "10", excelTemplateHide: 2},{dataField: 'shiftCd', headerText : 'shift Cd', columnTempleteData: "D", excelTemplateHide: 2}];
		this.excelTemplateDownParam = columnLayout;
		
	}, delCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'dpSaveBtn1' ) {
			var param = [ { } ];
			$('body').append('<div id="grid2" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelTemplateGrid2"></div></div>');
			var columnLayout = [{dataField: 'workOrderId', headerText : Language.lang['MESSAGES11150'], columnTempleteData: "WM1910300001", excelTemplateHide: 1},{dataField: 'itemId', headerText : Language.lang['MESSAGES12190'], columnTempleteData: "CHAIR_01", excelTemplateHide: 1}
			,{dataField: 'startTime', headerText : Language.lang['MESSAGES10786'], columnTempleteData: "2019-10-30 063000", excelTemplateHide: 1}, {dataField: 'endTime', headerText : Language.lang['MESSAGES11235'], columnTempleteData: "2019-10-30 183000", excelTemplateHide: 1}
			,{dataField: 'goodQty', headerText : Language.lang['MESSAGES10835'], columnTempleteData: "100", excelTemplateHide: 1},{dataField: 'badQty', headerText : Language.lang['MESSAGES10516'], columnTempleteData: "10", excelTemplateHide: 2},{dataField: 'shiftCd', headerText : 'shift Cd', columnTempleteData: "D", excelTemplateHide: 2}];
			
			var gridPros = {
				showRowCheckColumn: false,
				rowIdField : "id"
			};
			AUIGrid.create('grid2', columnLayout, gridPros);
			
			excel_upload(file, 'workOrder.jobCurrentSituation.woResultExUpload', 'MOMDA002', 'grid2', JSON.stringify(param), function(result, data){
				if(result == "SUCCESS"){
					mom_ajax('C', 'workOrder.jobCurrentSituation.woResultExUploadProc', JSON.stringify(data), function(result, data){
						momWidget.findBtnClicked('0', true, {}, function(result, data) {
							
							AUIGrid.setGridData(momWidget.grid[0], data);
							momWidget.splashHide();
							$("#uploadPop1").momModal("hide");
							momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
						});
					}, undefined, undefined, this, 'sync');
				}
			});
		}
	}, defaultStyle: function() {
		$("head").append('<style>.defaultStyle{background: #FFFFFF;}</style>');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA002_1', MOMDA002_1);
	momWidget.init(3, 'MOMDA002_1', MOMDA002_1);
	MOMDA002_1.init();
});