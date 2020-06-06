var MOMLB006 = {
	initMessage	: undefined, 
	initParam	: undefined,
	initCount 	: 100000,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
				});
			});
		});
		
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, delCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn2' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['issueQty'] > 0) {
					this.initMessage = Language.lang['MESSAGES11387'];
					return;
				}
			}	
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn2' && indexInfo['sequence'] == 1) {
			for(var i=0; i<param.length; i++) {
				if(param[i].itemId == '') {
					this.initMessage = Language.lang['MESSAGES11589'];
					return;
				}
				
				if(param[i].requestDate == '') {
					this.initMessage = Language.lang['MESSAGES10951'];
					return;
				}
				
				if(param[i].afterReqQty == '') {
					this.initMessage = Language.lang['MESSAGES10946'];
					return;
				}
				
				param[i].eqmWoId = selectItems[0].item.eqmWoId; 
			}
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		momWidget.splashHide();
		
		var that = this;
		if(indexInfo != undefined && ( (indexInfo['op'] == 'CC1' && indexInfo['sequence'] == 1) || ( (indexInfo['op'] == 'delBtn2' || indexInfo['op'] == 'releaseBtn2') && indexInfo['sequence'] == 2) ) ) {
			this.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
		
			AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'itemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= that.initCount) {
						return 'columnStyle';
					} 
				}
			});
			
			AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
				if(e.rowIndex < that.initCount) {
					if(e['dataField'] == 'itemId') { 
						return false;
					}
				}
			});
			
			if(indexInfo['op'] != 'CC1') {
				momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
			}
		}
	}, grid: function() {
		var that = this;
		AUIGrid.bind(momWidget.grid[1], "cellEditEnd", function(e) {
			if(e.dataField == 'itemId') {
				mom_ajax('R', 'common.comItemInfo', {itemId : e.item.itemId}, function(result, data) {
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "itemName", data[0].itemName);
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "specification", data[0].specification);
				}, undefined, undefined, this, 'sync');
			}
			
			if(e.dataField == 'afterReqQty') {
				if(e.value < e.item.issueQty) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10947']});
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "afterReqQty", e.oldValue);
					return;
				}
			}
			
			if(e.dataField == 'unitQty') {
				if(e.value <= 0) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10707']});
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "unitQty", e.oldValue);
					return;
				}
			}
			
			if(e.dataField == 'outLocationCd') {
				mom_ajax('R', 'common.curItemStock', {itemId : e.item.itemId, locationCd : e.item.outLocationCd}, function(result, data) {
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "currentQty", data[0].currentQty);
				}, undefined, undefined, this, 'sync');
			}
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLB006', MOMLB006);
    momWidget.init(2, 'MOMLB006', MOMLB006);
    MOMLB006.init();
});