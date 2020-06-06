var MOMCC005_1= {
	initMessage			: undefined,
	initParam			: undefined,
	
	menuId				: 'MOMCC005',
	tableId				: 'MOM_ITEM_STOCK',
	
	endPeriod			: undefined,
	allowMinusQty		: undefined,
	
	init: function() {      
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'moveCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11079' + '@' + this.endPeriod);
					return;
				} else if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['currentQty'] >= 0) {
						if(callBackParam[i]['currentQty'] < callBackParam[i]['cancelQty']) {
							this.initMessage = Language.lang['MESSAGES10090'];
							return;
						}
					} else {
						this.initMessage = Language.lang['MESSAGES10540'];
						return;
					}
				}
			}
		
			this.initMessage = "CLEAR_PARAM";
			this.initParam = {menuId: this.menuId, tableId: this.tableId};
		}		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'moveCancelBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i] = {
					  colId1: 'FROM_INOUT_ID'
					, value1: param[i]['prevStockInoutId']
					, colId2: 'TO_INOUT_ID'
					, value2: param[i]['itemStockInoutId']
					, colId3: 'DESCRIPTION'
					, value3: param[i]['description']
					, colId4: 'CANCEL_QTY'
					, value4: param[i]['cancelQty'] * (-1)
					, colId5: 'TABLE_ID'
					, value5: this.initParam.tableId
				};
			}
		}		
	}, grid: function() {
		var that = this;
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		momWidget.setEndPeriod(this.menuId, this);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCC005_1', MOMCC005_1);
    MOMCC005_1.init();
});