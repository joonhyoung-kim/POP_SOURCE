var MOMDA010_1 = {
	initMessage			: undefined, 
	initParam			: undefined,
	
	//cellClickPostpone	: true,
	
	menuId				: 'MOMDA010',
	
	initCount			: undefined,
	
	workOrderId			: undefined,
	resourceCd			: undefined,
	
	outLocationCd		: undefined,
	outLocationName		: undefined,
	
	badLocationCd		: undefined,
	badLocationName		: undefined,
	
	locationEmptyFlag	: true,
	masterGridItems		: undefined,
	
	setColumnPropFlag	: false,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
				});
			});
		});
		
		this.event();
		this.design();
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
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.masterGridItems = undefined;
		} else if(indexInfo != undefined && indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			this.initCount = data.length;
			this.setColumnPropByDataField();			
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 1) {
			for(var i = callBackParam.length - 1; i >= 0; i--) {
				if(callBackParam[i]['itemId'] == undefined || callBackParam[i]['itemId'] == '') {
					this.initMessage = Language.lang['MESSAGES11589'];
					return;
				} else if(callBackParam[i]['badType'] == undefined || callBackParam[i]['badType'] == '') {
					this.initMessage = Language.lang['MESSAGES10520'];
					return;
				} else if(callBackParam[i]['badQty'] == undefined || callBackParam[i]['badQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10517'];
					return;
				} else if(callBackParam[i]['confirmDate'] == undefined || callBackParam[i]['confirmDate'] == '') {
					this.initMessage = Language.lang['MESSAGES11313'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['confirmDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11311' + '@' + this.endPeriod);
					return;
				} 
				
				if(callBackParam[i]['addFlag'] == 'Y') {
					param.splice(i, 1);
				}
			}
			
			this.initParam = {workOrderId: this.workOrderId};
			
			if(param.length <= 0) {
				this.initMessage = Language.lang['MESSAGES11002'];
				return;
			}
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		momWidget.setColumnPropByCalendar(1, 'confirmDate');
	}, event: function() {
		var that = this;
		$(document).on('click', '#choiceBtn1', function() {
			AUIGrid.clearGridData(momWidget.grid[1]);
			
			that.masterGridItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			that.locationEmptyFlag = false;
			if(that.masterGridItems.length <= 0 || that.masterGridItems.length > 1) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11604']});
				return;
			}
			
			momWidget.splashShow();
			
			that.workOrderId = that.masterGridItems[0]['item']['workOrderId'];
			that.resourceCd = that.masterGridItems[0]['item']['resourceCd'];
			that.outLocationCd = that.masterGridItems[0]['item']['goodLocationCd'];
			that.outLocationName = that.masterGridItems[0]['item']['goodLocationName'];
			
			momWidget.dropDownPosPost(1, 'itemId', 'RESERVED', that);
			momWidget.dropDownPost(1, undefined, undefined, undefined, that);	
			mom_ajax('R', 'workOrder.workOrderResult.workOrderResult', {masterWoId: that.workOrderId}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				that.badLocationCd = data[0]['badLocationCd'];
				that.badLocationName = data[0]['badLocationName'];
			}, undefined, undefined, this, 'sync');
			
			momWidget.setColumnPropByDropDown(1, 'toLocationName', 'workOrder.workOrderBadResult.badLocationList', {resourceCd: that.resourceCd}, function(result, data) {
				if(data.length <= 0) {
					that.locationEmptyFlag = true;
				}
			});
			
			mom_ajax('R', 'workOrder.workOrderBadResult.workOrderBadResult', {workOrderId: that.workOrderId}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[1], data);
				that.initCount = data.length;
				
				that.setColumnPropByDataField();
			}, undefined, undefined, this, 'sync');
			setTimeout(function() {
				momWidget.splashHide();
			}, 40 * 4);
			
			AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) {			
		        if(e.dataField == 'confirmDate') { 										// 달력 지정한 필드인 경우 
		        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
		        		momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
		                return e.oldValue; 
		        	} else {
		        		return to_date_yyyy_mm_dd(e.value); 
	                } 
		        }
		        
		        return e.value; 
			});
			
			AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
				if(e.rowIndex >= that.initCount) {
					if(e.dataField == 'itemId' || e.dataField == 'badType' || e.dataField == 'badQty' || e.dataField == 'confirmDate' || e.dataField == 'description') {
						return true;
					}
					
					if(e.dataField == 'toLocationName') {
						if(e.item['badLocationEditFlag'] == 'Y' && !that.locationEmptyFlag) {
							return true;
						} else {
							return false;
						}						
					}
				} else {
					if(e.dataField == 'itemId' || e.dataField == 'badType' || e.dataField == 'badQty' || e.dataField == 'confirmDate' || e.dataField == 'description' || e.dataField == 'toLocationName') {
						return false;
					}
				}
			});
			
			AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
				if(e.dataField == 'badType') {
					mom_ajax('R', 'workOrder.workOrderBadResult.badLocationEditFlag', {codeId: e.value}, function(result, data) {
						if(result != 'SUCCESS' && data.length > 0) {
							return;
						}
						
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'badLocationEditFlag', data[0]['badLocationEditYn']);
						console.log('that.locationEmptyFlag = ' + that.locationEmptyFlag + ', ' + data[0]['badLocationEditYn']);
						if(e.dataField == 'badType') {
							if(that.locationEmptyFlag && data[0]['badLocationEditYn'] == 'Y') {
								AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'badType', e.oldValue);
								momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11546']});
							} 
						}
					
						if(data[0]['badLocationEditYn'] == 'N') {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'toLocationCd', that.badLocationCd);
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'toLocationName', that.badLocationName);
						}
					}, undefined, undefined, this, 'sync');
					
					AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'toLocationName', {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							var getValue = AUIGrid.getCellValue(momWidget.grid[1], rowIndex, 'badLocationEditFlag');
							if(getValue == 'Y') {
								return 'columnStyle';
							}
						}
					});
				}
				
				if(e.dataField == 'toLocationName') {
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'toLocationCd', e.value);
					return e.value;
				}
			});		
			
			/* modify_hists
			 * XMOMF35 / ljw / 하단 그리드 소진창고 항목에 상단 그리드에서 체크한 양품창고 그대로 들고와서 값 매핑만 해줄 수 있도록 수정  
			 * 
			 * */
			var gridData = AUIGrid.getGridData(momWidget.grid[1]);
			for(var i=0; i<gridData.length; i++) {
				AUIGrid.setCellValue(momWidget.grid[1], i, "fromLocationCd", that.masterGridItems[0].item.goodLocationCd);
				AUIGrid.setCellValue(momWidget.grid[1], i, "fromLocationName", that.masterGridItems[0].item.goodLocationName);
			}
		});
		
		$(document).on('click', '#actAddBtn2', function() {
			if(that.masterGridItems == undefined) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '불량등록할 작업실적을 선택해 주십시오.'});
				return;
			}
			
			var newRow = {
				  'itemId'			: ''
				, 'fromLocationCd'	: that.outLocationCd
				, 'fromLocationName': that.outLocationName
				, 'toLocationCd'	: that.badLocationCd
				, 'toLocationName'	: that.badLocationName
				, 'confirmDate'		: get_current_date('YYYY-MM-DD')
				, 'addFlag'			: 'N'
			};
			
			AUIGrid.addRow(momWidget.grid[1], newRow, 'last');
			var rowCount = AUIGrid.getRowCount(momWidget.grid[1]);
			AUIGrid.setSelectionByIndex(momWidget.grid[1], rowCount, 10);
			
			that.setColumnPropByDataField();
		});		
		
		$(document).on('click', '#actDelBtn2', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			var chkFlag = false;
			var arrayList = [];
			if(checkedItems.length <= 0 ) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10585']});
				return;
			}
			
			for(var i = checkedItems.length - 1; i >= 0; i--) {
				if(checkedItems[i]['item']['addFlag'] == 'N') {
					arrayList.push(checkedItems[i].rowIndex);
				}
			}
			
			if(arrayList.length <= 0) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10339']});
				return;
			}
			
			AUIGrid.removeRow(momWidget.grid[1], arrayList);
		});
		
		$(document).on('change', '#badType', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			var badType = $('#badType').val();
			for(var i = 0; i < checkedItems.length; i++) {
				AUIGrid.setCellValue(momWidget.grid[1], checkedItems[i].rowIndex, 'badType', badType);
			}
			
			mom_ajax('R', 'workOrder.workOrderBadResult.badLocationEditFlag', {codeId: badType}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				console.log('that.locationEmptyFlag = ' + that.locationEmptyFlag + ', ' + data[0]['badLocationEditYn']);
				if(that.locationEmptyFlag && data[0]['badLocationEditYn'] == 'Y') {
					for(var i = 0; i < checkedItems.length; i++) {
						AUIGrid.setCellValue(momWidget.grid[1], checkedItems[i].rowIndex, 'badType', '');
					}
					
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11546']});
					return;
				} else {
					for(var i=0; i<checkedItems.length; i++) {
						AUIGrid.setCellValue(momWidget.grid[1], checkedItems[i].rowIndex, 'badLocationEditFlag', data[0]['badLocationEditYn']);
						if(data[0]['badLocationEditYn'] == 'N') {
							AUIGrid.setCellValue(momWidget.grid[1], checkedItems[i].rowIndex, 'toLocationCd', that.badLocationCd);
							AUIGrid.setCellValue(momWidget.grid[1], checkedItems[i].rowIndex, 'toLocationName', that.badLocationName);
						}
					}
				}
			}, undefined, undefined, this, 'sync');
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'toLocationName', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					var getValue = AUIGrid.getCellValue(momWidget.grid[1], rowIndex, 'badLocationEditFlag');
					if(getValue == 'Y') {
						return 'columnStyle';
					}
				}
			});
		});
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			AUIGrid.clearGridData(momWidget.grid[1]);
		}
	}, design: function() {
		$('head').append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}, setColumnPropByDataField: function() {
		if(this.setColumnPropFlag) {
			return;
		}
		
		this.setColumnPropFlag = true;
		var that = this;
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'itemId', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'badType', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'badQty', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'confirmDate', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'description', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA010_1', MOMDA010_1);
    momWidget.init(2, 'MOMDA010_1', MOMDA010_1);
    MOMDA010_1.init();
});

