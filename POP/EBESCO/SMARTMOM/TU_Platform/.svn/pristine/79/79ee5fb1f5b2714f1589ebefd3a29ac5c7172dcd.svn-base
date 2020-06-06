var MOMEA003_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {
		Language.init(function() {
		});
		
		this.event();
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				momWidget.isInitGrid(4, function() {
					that.grid();
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		
		if(index == 0) {
			this.initParam = undefined;
		} else if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 4) {
			if(indexInfo['op'] == 'specSaveBtn2') {
				this.initParam = {materialDepartureId: param['materialDepartureId']};
			}
			
			this.initMessage = 'CLEAR_PARAM';
		} else {
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length < 1) { 
				return; 
			}
			
			this.initParam = selectItems[0].item;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		if(index == 1) {
			for(var i = 0; i < data.length; i++) {
				if(data[i]['measureMethod'] == 'COUNT') {
					data[i]['target'] = '';
					data[i]['lsl'] = '';
					data[i]['usl'] = '';
				}
			}
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 4) {
			if(indexInfo['op'] == 'specPassBtn2') {
				AUIGrid.clearGridData(momWidget.grid[1]);
			}
			
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'specSaveBtn2' && indexInfo['sequence'] == 2) {
			this.initParam = {buttonType: 'SAVE'};
		} else if(indexInfo != undefined && indexInfo['op'] == 'specPassBtn2' && indexInfo['sequence'] == 2) {
			this.initParam = {buttonType: 'COMPLETE'};
		} else if(indexInfo != undefined && indexInfo['op'] == 'fileUploadBtn5') {
			this.initParam['entityId'] = AUIGrid.getSelectedItems(momWidget.grid[4])[0]['item']['defectResultId'];
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 1) {
			var selectedItemLength = AUIGrid.getSelectedItems(momWidget.grid[0]).length;
			if(selectedItemLength > 0) {
				var selectedItem = AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item'];
				for(var i = 0; i < callBackParam.length; i++) {
					var checkCnt = callBackParam[i].sampleCnt < selectedItem['departureQty'] ? callBackParam[i].sampleCnt : selectedItem['departureQty'];
					var itemValue = 'itemValue';
					for(var j = 1; j <= checkCnt; j++) {
						var checkItemValue = itemValue.concat(j);
						var checkValues = 'callBackParam' + '[' + [i] + '].' + checkItemValue;
						if(eval(checkValues) == '' || eval(checkValues) == null) {
							this.initMessage = Language.lang['MESSAGES10759'];
							return;
						}
					}
					
					if(callBackParam[i]['handlingTime'] < selectedItem['departureDate']) {
						this.initMessage = Language.lang['MESSAGES11312'];
						return;
					}
				}
				
				this.initMessage = 'CLEAR_PARAM';
			}
			
			if(callBackParam.length == 0) {
				this.initMessage = Language.lang['MESSAGES10328'];
				return;
			}
		}
	}, grid: function() {
		var itemValues = ['itemValue1', 'itemValue2', 'itemValue3', 'itemValue4', 'itemValue5'];
		var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[1]);
		for(var i = 0; i < itemValues.length; i++) {
			var colIndex = AUIGrid.getColumnIndexByDataField(momWidget.grid[1], itemValues[i]);
			var col = columnLayout[colIndex];
			col.editRenderer = {	
				type : 'ConditionRenderer',
				conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
					switch(item['measureMethod']) {
						case 'COUNT': 						// 계수
							return {'type':'DropDownListRenderer','list':['OK', 'NG']};
						case 'NUMBERLESS': 					// 계측
							return {'type':'InputEditRenderer'};
					}
				}
			}
			
			AUIGrid.setColumnProp(momWidget.grid[1], colIndex, col);
		}
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
			var sampleCnt = e.item.sampleCnt < item.departureQty ? e.item.sampleCnt : item.departureQty;
			if(e['dataField'].indexOf('itemValue') >= 0) {
				var number = Number(e.dataField.replace('itemValue', ''));
				if(number > sampleCnt) {
					return false;
				}
			} else if(e['dataField'] == 'File') {
				return false;
			}
		});
		
		momWidget.addFileColumn(1, 4, 0, 'MOMEA003', 'defectResultId');
		
		AUIGrid.setProp(momWidget.grid[1], {'editBeginMode' : 'click'});
	}, event: function() {
		$(document).on('click', '#specPassBtn2, #specSaveBtn2', function() {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			if(grid2Length.length == 0) {
				momWidget.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10328']});
				return;
			}
		});
		
		momWidget.clickAllCancelBtn(1);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA003_1', MOMEA003_1);
	momWidget.init(2, 'MOMEA003_1', MOMEA003_1);
	momWidget.init(5, 'MOMEA003_1', MOMEA003_1);
	MOMEA003_1.init();
});