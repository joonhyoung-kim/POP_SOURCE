var MOMEA005_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	checkCnt	: undefined,
	detailSampleCnt : undefined,
	workOrderId : undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(4, function() {
						that.columnStyle();
						that.defaultStyle();
						that.grid();
						that.event();
					});
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		
		if(index == 0) {
			this.initParam = undefined;
		} else if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 2) {
			console.log('indexInfo = ' + JSON.stringify(indexInfo));
			console.log('param = ' + JSON.stringify(param));
			if(indexInfo['op'] == 'specSaveBtn2' && param['workOrderId'] != undefined) {
				this.initParam = {workOrderId: param['workOrderId']};
			}
			console.log('this.initParam = ' + JSON.stringify(this.initParam));
			
			this.initMessage = 'CLEAR_PARAM';
		} else {
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length < 1) { 
				return; 
			}
			
			this.initParam = selectItems[0].item;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		if(index == 1) {
			if(param['goodQty'] != undefined) {
				this.checkCnt = param['goodQty'];
			}
			
			if(param['workOrderId'] != undefined) {
				this.workOrderId = param['workOrderId'];
			}
			
			var itemValue = [];
			detailSampleCnt = 0;
			for(var i = 0; i < data.length; i++) {
				if(data[i]['measureMethod'] == 'COUNT') {
					data[i]['target'] = '';
					data[i]['lsl'] = '';
					data[i]['usl'] = '';
				}
				
				detailSampleCnt = data[i].sampleCnt;
				if(detailSampleCnt > that.checkCnt) {
					detailSampleCnt = that.checkCnt;
				}
				
				for(var j = 1; j <= detailSampleCnt; j++) {
					itemValue[j] = 'itemValue' + j;
					AUIGrid.setColumnPropByDataField(momWidget.grid[1], itemValue[j], {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							var number = Number(dataField.replace('itemValue', ''));
							var realSampleCnt;
							if(item.sampleCnt > that.checkCnt) {
								realSampleCnt = that.checkCnt;
							} else {
								realSampleCnt = item.sampleCnt;
							}
							if(itemValue.includes(dataField) && realSampleCnt >= number && item.state == 'SAVE')
							return 'columnStyle';
						}
					});
				}
			}
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 2) {
			if(indexInfo['op'] == 'specPassBtn2') {
				AUIGrid.clearGridData(momWidget.grid[1]);
			}
			
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'specSaveBtn2' || indexInfo['op'] == 'specPassBtn2') && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['startTime'] == '' || callBackParam[i]['startTime'] == undefined) {
					this.initMessage = Language.lang['MESSAGES10788'];
					return;
				} else if(callBackParam[i]['endTime'] == '' || callBackParam[i]['endTime'] == undefined) {
					this.initMessage = Language.lang['MESSAGES11236'];
					return;
				}
				
				if(callBackParam[i]['startTime'] > callBackParam[i]['endTime']) {
					this.initMessage = Language.lang['MESSAGES10789'];
					return;
				}
			}
			
			if(indexInfo['op'] == 'specSaveBtn2') {
				this.initParam = {buttonState: 'SAVE'};
			} else if(indexInfo['op'] == 'specPassBtn2') {
				this.initParam = {buttonState: 'FINISH'};
			} 
		} 
	}, grid: function() {
		var that = this;
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
			var sampleCnt = e.item.sampleCnt;
			if(sampleCnt > that.checkCnt) {
				sampleCnt = that.checkCnt;
			}
			
			if(e['dataField'].indexOf('itemValue') >= 0) {
				var number = Number(e.dataField.replace('itemValue', ''));
				if(number > sampleCnt) {
					return false;
				} 
			} else if(e['dataField'] == 'File') {
				return false;
			} 
			/* modify hists
			 * XMOME14 / 20191106 / ljw / 검사완료된 데이터도 수정 가능한 것에 대한 부분 수정 */
			if(e['dataField'] == 'startTime' || e['dataField'] == 'endTime' || e['dataField'].indexOf('itemValue') >= 0 || e['dataField'] == 'description') {
				if(e.item.state == 'FINISH') {
					return false;
				} else {
					return true;
				}
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], "cellEditEndBefore", function(e) {
			if(e.dataField == "startTime" || e.dataField == "endTime") {
				if(e.value.length == 4 && e.value >= 0000 && e.value <= 2359) {
					return e.value;
				} else {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12198']});
					return e.oldValue;
				}
			}
			
			if(e.dataField == "itemValue1" || e.dataField == "itemValue2" || e.dataField == "itemValue3" || e.dataField == "itemValue4" || e.dataField == "itemValue5" || e.dataField == "description") {
				return e.value;
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'startTime', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[1], rowIndex, "state");
				if(getValue == 'FINISH') {
					return 'defaultStyle';
				} else {
					return 'columnStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'endTime', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[1], rowIndex, "state");
				if(getValue == 'FINISH') {
					return 'defaultStyle';
				} else {
					return 'columnStyle';
				}
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], "cellEditEnd", function(e) {
			mom_ajax('R', 'quality.processQualityCoorperation.processQualityCoorperationDown', {workOrderId : that.workOrderId}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				if(data.length > 0) {
					var itemValue = [];
					detailSampleCnt = 0;
					for(var i = 0; i < data.length; i++) {
						if(data[i]['measureMethod'] == 'COUNT') {
							data[i]['target'] = '';
							data[i]['lsl'] = '';
							data[i]['usl'] = '';
						}
						
						detailSampleCnt = data[i].sampleCnt;
						if(detailSampleCnt > that.checkCnt) {
							detailSampleCnt = that.checkCnt;
						}
						
						for(var j = 1; j <= detailSampleCnt; j++) {
							itemValue[j] = 'itemValue' + j;
							AUIGrid.setColumnPropByDataField(momWidget.grid[1], itemValue[j], {
								styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
									var number = Number(dataField.replace('itemValue', ''));
									var realSampleCnt;
									if(item.sampleCnt > that.checkCnt) {
										realSampleCnt = that.checkCnt;
									} else {
										realSampleCnt = item.sampleCnt;
									}
									if(itemValue.includes(dataField) && realSampleCnt >= number && item.state == 'SAVE')
									return 'columnStyle';
								}
							});
						}
					}
				}
			}, undefined, undefined, this, 'sync');
			
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'description', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[1], rowIndex, "state");
				if(getValue == 'FINISH') {
					return 'defaultStyle';
				} else {
					return 'columnStyle';
				}
			}
		});
		
		momWidget.addFileColumn(1, 4, 0, 'MOMEA005', 'defectResultId');
		
		AUIGrid.setProp(momWidget.grid[1], {'editBeginMode' : 'click'});
	}, event: function() {
		/* modify hists
	     * XMOME18 / 20191106 / ljw / 하단 그리드 데이터 없을 경우 검사완료/저장 이벤트 실행시 벨리데이션 부분 */
		$(document).on('click', '#specSaveBtn2, #specPassBtn2', function() {
			var gridData = AUIGrid.getGridData(momWidget.grid[1]);
			if(gridData.length == 0) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10328']});
				return;
			}
		});
		
	}, defaultStyle: function() {
		$("head").append('<style>.defaultStyle{background: #FFFFFF;}</style>');
	}, columnStyle: function() {
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA005_1', MOMEA005_1);
	momWidget.init(2, 'MOMEA005_1', MOMEA005_1);
	momWidget.init(5, 'MOMEA005_1', MOMEA005_1);
	MOMEA005_1.init();
});