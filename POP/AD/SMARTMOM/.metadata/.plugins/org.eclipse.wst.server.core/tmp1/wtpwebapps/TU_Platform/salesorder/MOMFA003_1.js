var MOMFA003_1 = {
	initMessage		: undefined,
	initParam		: undefined,
		
	orderType		: 'SO_OUT',
	
	menuId			: 'MOMFA003',
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
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
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['confirmDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10377' + '@' + this.endPeriod);
					return;
				} else if(Number(callBackParam[i]['shipConfirmQty']) <= 0) {
					this.initMessage = Language.getLang('MESSAGES12104' + '@' + Language.lang['MESSAGES10398']);
					return;
				}
				
				this.initParam = {orderType: this.orderType};
				this.initMessage = 'CLEAR_PARAM';
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i]['unitPrice'] = Number(param[i]['unitPrice']);
				callBackParam[i]['unitPrice'] = param[i]['unitPrice'];
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'b2biInterface1' && indexInfo['sequence'] == 1) {
			this.initParam = {orderType: this.orderType};
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'confirmDate') { // 달력 지정한 필드인 경우 
				if(to_date_yyyy_mm_dd(e.value) <= endPeriod) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		}); 
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) {
			if(e.dataField == 'shipConfirmQty') {
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'conversionUnitQty', e.item['shipConfirmQty'] * e.item['itemConversionUnitQty']);
			} else if(e.dataField == 'confirmDate') {
				var setUnitPrice = 0;
				mom_ajax('R', 'common.comItemOutPrice', { vendorCd: e.item['vendorCd']
														, itemId: e.item['itemId']
														, marketCd: e.item['marketCd']
														, currencyCd: e.item['currencyCd']
														, stateTime: e.item['confirmDate']}, function(result, data) {
					if(result == 'SUCCESS' || data.length > 0) {
						setUnitPrice = data[0]['unitPrice'];
					}
				}, undefined, undefined, this, 'sync');
				
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', setUnitPrice);
			}
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA003_1', MOMFA003_1);
	MOMFA003_1.init();
});