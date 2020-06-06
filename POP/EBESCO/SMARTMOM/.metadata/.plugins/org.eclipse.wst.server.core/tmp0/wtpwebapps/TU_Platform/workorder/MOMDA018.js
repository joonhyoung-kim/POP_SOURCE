var MOMDA018 = {
	initMessage	: undefined, 
	initParam	: undefined,
	initCount	: 0,
	workOrderId : undefined,
	planStartTime : undefined,
	clickFlag	: undefined,
	
	init: function() {
		Language.init(function() {
		});
		this.design();
		this.event();
		momWidget.splitter('.h03-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			that.initParam = undefined;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'CD1') {
			that.workOrderId = data.workOrderId;
			that.planStartTime = data.planStartTime;
			that.initParam = {workOrderId: that.workOrderId, parentItemId: data.itemId};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'CD1' && indexInfo['sequence'] == 1) {
			AUIGrid.setGridData(momWidget.grid[1], data);
			momWidget.dropDownPost(1, undefined, undefined, undefined, that);
			setTimeout(function() {
				that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
				that.grid();
			}, 100);
			
			that.clickFlag = 'Y';
		}
		if(indexInfo != undefined && indexInfo['op'] == 'faultBtn2' && indexInfo['sequence'] == 2) {
			momWidget.findBtnClicked(0, false, undefined, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				AUIGrid.setGridData(momWidget.grid[0], data1);
				momWidget.findBtnClicked(1, false, that.initParam, function(result2, data2) {
					if(result1 != 'SUCCESS') {
						return;
					}
					AUIGrid.setGridData(momWidget.grid[1], data2);
					that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
					that.grid();
					momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
				});
			});
		}
		momWidget.splashHide();
	}, delCallInit: function(index, param, callBackParam, indexInfo) { 
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'faultBtn2' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < param.length; i++) {
				if(param[i]['NEW'] == undefined) {
					this.initMessage = Language.lang['MESSAGES11002'];
				}
				if(param[i]['stateTime'] == '') {
					this.initMessage = Language.lang['MESSAGES12442'];
				}
				if(param[i]['itemId'] == '') {
					this.initMessage = Language.lang['MESSAGES12443'];
				}
				if(param[i]['measureDetailType'] == '') {
					this.initMessage = Language.lang['MESSAGES12444'];
				}
				if(param[i]['gaugeMethod'] == '') {
					this.initMessage = Language.lang['MESSAGES10133'];
				}
				if(param[i]['defectQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10517'];
				}
				
				if(to_date_yyyy_mm_dd(param[i]['stateTime']) < to_date_yyyy_mm_dd(that.planStartTime)) {
					this.initMessage = Language.lang['MESSAGES12441'];
				}
			}
			
		}
	}, addClickInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'addBtn2') {
			if(that.clickFlag != 'Y') {
				this.initMessage = Language.lang['MESSAGES12445'];
			}
		}
	}, addClickBack: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'addBtn2') {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			if(grid2Length > that.initCount) {
				AUIGrid.setCellValue(momWidget.grid[1], grid2Length - 1, 'stateTime', get_current_date('yyyy-mm-dd'));
				AUIGrid.setCellValue(momWidget.grid[1], grid2Length - 1, 'parentItemId', that.initParam['parentItemId']);
				AUIGrid.setCellValue(momWidget.grid[1], grid2Length - 1, 'workOrderId', that.initParam['workOrderId']);
			}
		}
	}, cancelCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'cancelBtn2') {
			for(var i = 0; i < param.length; i++) {
				if(param[i]['item']['NEW'] == undefined) {
					that.initMessage = Language.lang['MESSAGES12440'];
				}
			}
		}
	}, cancelCallBack: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'cancelBtn2') {
			AUIGrid.setCheckedRowsByValue(momWidget.grid[1], 'NEW', []);
		}
	}, cellClickCallBack: function(index, e) {
		var that = this;
		if(index == 0) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			that.clickFlag = 'N';
		}
	}, grid: function() {
		var that = this;
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			 if(e.dataField == 'stateTime' || e.dataField == 'itemId' || e.dataField == 'measureDetailType' ||  e.dataField == 'gaugeMethod' 
					|| e.dataField == 'defectType' || e.dataField == 'reasonCode' || e.dataField == 'defectQty' || e.dataField == 'problemReason' 
						 ||  e.dataField == 'defectBy' || e.dataField == 'description') {
				 var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
				 if(e.rowIndex + 1 <= that.initCount) {
					 return false;
				 }
			 }
		});
		
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'itemId', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'stateTime', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'measureDetailType', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'gaugeMethod', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'defectType', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'reasonCode', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'defectQty', {
			style: "right-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'problemReason', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'defectBy', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'description', {
			style: "left-column",
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				} 
			}
		});
		
		/* 일괄 불량등록하고자 할때 전체체크 분리 */
		var indeterminate = false;	
		AUIGrid.bind(momWidget.grid[1], 'rowAllChkClick', function( e ) {
			if(indeterminate) {
				AUIGrid.setCheckedRowsByValue(e.pid, 'NEW', []);
				indeterminate = false;
			} else {
				AUIGrid.setCheckedRowsByValue(e.pid, 'NEW', 'Y');
				indeterminate = true;
			}
		});
	}, event: function() {
//		momWidget.clickCancelBtn2(1);
	}, design: function(){
		$('head').append('<style>.columnStyle{background: #C7E8FD !important;}</style>');
		$("head").append('<style>.defaultStyle{ background: transparent;}</style>');	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA018', MOMDA018);
    momWidget.init(2, 'MOMDA018', MOMDA018);
    MOMDA018.init();
});