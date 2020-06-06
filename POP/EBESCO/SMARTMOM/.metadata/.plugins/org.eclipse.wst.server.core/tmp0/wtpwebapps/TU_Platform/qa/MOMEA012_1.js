var MOMEA012_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	itemRtnType	: 'P',
	tnxType		: 'CREATE',
	
	menuId		: 'MOMEA012',
	
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
		momWidget.splitter('.h01-h', 'horizontal', '50%');
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'returnBtn2' && indexInfo['sequence'] == 4) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnBtn2' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['returnQty'] <= 0 || callBackParam[i]['returnQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10435'];
					return;
				} else if(callBackParam[i]['returnType'] == '' || callBackParam[i]['returnType'] == null) {
					this.initMessage = Language.lang['MESSAGES10437'];
					return;
				} else if(callBackParam[i]['returnLocation'] == '' || callBackParam[i]['returnLocation'] == null) {
					this.initMessage = Language.lang['MESSAGES10444'];
					return;
				} else if(callBackParam[i]['returnDate'] == '') {
					this.initMessage = Language.lang['MESSAGES10440'];
					return;
				} else if(callBackParam[i]['marketCd'] == '') {
					this.initMessage = Language.lang['MESSAGES10044'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['returnDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10439' + '@' + endPeriod);
				}
				
				callBackParam[i]['toLocationCd'] = callBackParam[i]['returnLocation'];
			}	
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {itemRtnType: this.itemRtnType, tnxType: this.tnxType};			
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		var that = this;
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'returnDate') { 	// 달력 지정한 필드인 경우 
				if(to_date_yyyy_mm_dd(e.value) <= that.endPeriod) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value);  
				} 
			}
			
			return e.value; 
		}); 
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {	// Market, 환종, 출고일자 변경 시엔 단가, 환율 정보 조회하여 세팅하고, 업체 변경 시엔 단가 정보만 조회하여 하단 그리드에 세팅해준다.
			if(e.dataField == 'returnQty') {
				AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'conversionUnitQty', e.item['itemConversionUnitQty'] * e.item['returnQty']);
			} else if(e.dataField == 'marketCd' || e.dataField == 'currencyCd' || e.dataField == 'returnDate') {
				mom_ajax('R', 'common.comItemOutPrice', {
															  vendorCd: e.item['vendorCd']
															, itemId: e.item['itemId']
															, marketCd: e.item['marketCd']
															, currencyCd: e.item['currencyCd']
															, stateTime: e.item['returnDate']
														}, function(result, data) {				// 환율
					if(result != 'SUCCESS' || data.length < 1) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'unitPrice', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'unitPrice', data[0]['unitPrice']);
					}					
				}, undefined, undefined, this, 'sync');
				
				if(e.dataField == 'currencyCd' || e.dataField == 'returnDate') {
					mom_ajax('R', 'common.comItemOutPrice', {currencyCd: e.item['currencyCd'], stateTime: e.item['returnDate']}, function(result, data) {				
						if(result != 'SUCCESS' || data.length < 1) {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'exchangeRate', 0);
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'exchangeRate', data[0]['exchangeRate']);
						}					
					}, undefined, undefined, this, 'sync');
				}
			}
		});
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
			
			AUIGrid.clearGridData(momWidget.grid[1]);
			for(var i = 0; i < checkedItems.length; i++) {
				var item = checkedItems[i].item;
				var items = AUIGrid.getItemsByValue(momWidget.grid[1], 'itemStockId', item['itemStockId']);		// 값 중복 제거 
				for(var j = 0; j < items.length; j++) {
					if(item['itemStockId'] == items[j]['itemStockId']) {
						return;
					}					
				}
				
				item['returnQty'] = 0;
				item['returnDate'] = get_current_date('yyyy-mm-dd');
				item['conversionUnitQty'] = item['itemConversionUnitQty'] * item['returnQty'];
				AUIGrid.addRow(momWidget.grid[1], item, 'last');
				
				mom_ajax('R', 'common.comExchangeRate', {currencyCd: item['currencyCd'], stateTime: item['returnDate']}, function(result, data) {		// 환율
					if(result != 'SUCCESS' || data.length < 1) {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'exchangeRate', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'exchangeRate', data[0]['exchangeRate']);
					}					
				}, undefined, undefined, this, 'sync');
				
				mom_ajax('R', 'common.comItemOutPrice', {
															vendorCd: item['vendorCd']
															, itemId: item['itemId']
															, marketCd: item['marketCd']
															, currencyCd: item['currencyCd']
															, stateTime: item['returnDate']
														}, function(result, data) {								// 매출단가
					if(result != 'SUCCESS' || data.length < 1) {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'unitPrice', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'unitPrice', data[0]['unitPrice']);
					}					
				}, undefined, undefined, this, 'sync');
			}
		});
		
//		momWidget.clickCancelBtn2(1);
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMEA012_1', MOMEA012_1);
	momWidget.init(2, 'MOMEA012_1', MOMEA012_1);
	MOMEA012_1.init();
});