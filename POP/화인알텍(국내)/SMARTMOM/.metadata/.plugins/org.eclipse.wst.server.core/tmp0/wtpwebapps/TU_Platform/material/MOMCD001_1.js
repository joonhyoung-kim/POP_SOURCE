var MOMCD001_1= {
	initMessage	: undefined,
	initParam	: undefined,
		
	menuId		: 'MOMCD001',
	endPeriod	: undefined,
	
	initCount 	: 100000,
	
	init: function() {  
		Language.init(function() {
		});
		
		this.event();
		this.design();
		momWidget.splitter('.h03-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
			});
		});
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 1) {
			for(var i =0; i < callBackParam.length; i++) {
				if(callBackParam[i]['issueQty'] == undefined && callBackParam[i]['issueQty'] == '') {
					this.initMessage = Language.lang['MESSAGES11387'];
					return;
				}
			}
			
			this.initParam = {workOrderId: AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['workOrderId']};
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn2' && indexInfo['sequence'] == 1) {
			for(var i =0; i < callBackParam.length; i++) {
				if(callBackParam[i]['itemId'] == undefined || callBackParam[i]['itemId'] == '') {
					this.initMessage = Language.lang['MESSAGES11589'];
					return;
				} else if(callBackParam[i]['requestDate'] == undefined || callBackParam[i]['requestDate'] == '') {
					this.initMessage = Language.lang['MESSAGES10951'];
					return;
				} else if(callBackParam[i]['requestQty'] == undefined || callBackParam[i]['requestQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10946'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['requestDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10950' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {
				  workOrderId: AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['workOrderId']
				, outLocationCd: AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['locationCd']
				, woQty: AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['confirmQty']
				, parentItemId: AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['itemId']
			};
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
		if(
				indexInfo != undefined
			&&
				(
					(
						indexInfo['op'] == 'CC1' 
					&& 
						indexInfo['sequence'] == 1
					)
				|| 
					(
						(
							indexInfo['op'] == 'actDelBtn2' 
						||
							indexInfo['op'] == 'actSaveBtn2' 
						)
					&& 
						indexInfo['sequence'] == 2
					)
				)
		) {
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
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		momWidget.setEndPeriod(this.menuId, this);
		
		mom_ajax('R', 'common.comParameter', {workOrderId: that.workOrderId}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			that.market = data[0]['marketCd'];
			that.currency = data[0]['currencyCd'];
		}, undefined, undefined, this, 'sync');
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
	        if(e['dataField'] == 'requestDate') { 	// 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e['value'])) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value); 
                }
	        } else if(e['dataField'] == 'requestQty') { 
	        	if(e['value'] < e['item']['issueQty'] + e['item']['cancelQty']) { 
	        		momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12197']});
	                return e.oldValue; 
	        	} else {
	        		return e.value; 
                }
	        }
	        
	        return e.value; 
		}); 
		
		// 출고창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
		AUIGrid.bind(momWidget.grid[1], "cellEditEnd", function( e ) {
			var param = {
					itemId : e['item']['itemId'],
					locationCd : e['item']['inLocationCd']
				}
			if(e['dataField'] == 'inLocationCd' || e['dataField'] == 'itemId') {
				var zeroQty;
				
				mom_ajax('R', 'common.curItemStock', param, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					}
					
					if(data[0] == null) {
						zeroQty = 0;
					}
					
					if(zeroQty != 0) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', data[0].currentQty);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', zeroQty);
					}
				}, undefined, undefined, this, 'sync');
			}
			if(e.dataField == 'itemId') {
				mom_ajax('R', 'common.comItemInfo', {itemId : param.itemId}, function(result, data) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "itemName", data[0].itemName);
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "specification", data[0].specification);
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "itemType", data[0].itemType);
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "itemTypeName", data[0].itemTypeName);
				}, undefined, undefined, this, 'sync');
			}
		});
		
		
	}, event: function() {
		var that = this;
		$(document).on('click', '#actAddBtn2', function() {
			var newRow = {
				  'divisionCd': ''
				, 'companyCd': ''
				, 'workOrderId': ''
				, 'itemId': ''
				, 'itemName': ''
				, 'itemType': ''
				, 'itemTypeName': ''
				, 'unit': ''
				, 'unitName': ''
				, 'productOrderId': ''
				, 'woState': ''
				, 'woStateName': ''
				, 'confirmQty': ''
				, 'resourceCd': ''
				, 'resourceName': ''
				, 'locationCd': ''
				, 'locationName': ''
				, 'planStartTime': ''
				, 'result': ''
				, 'marketCd': that.market
				, 'currencyCd': that.currency
			};
			
			AUIGrid.addRow(momWidget.grid[1], newRow, 'last');
		});
	}, design: function(){
		$('head').append('<style>.columnStyle{background: #C7E8FD !important;}</style>');	
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMCD001_1', MOMCD001_1);
       momWidget.init(2, 'MOMCD001_1', MOMCD001_1);
       MOMCD001_1.init();
});