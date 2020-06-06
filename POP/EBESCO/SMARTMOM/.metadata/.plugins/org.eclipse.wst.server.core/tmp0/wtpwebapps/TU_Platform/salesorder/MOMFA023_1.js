var MOMFA023_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	endPeriod	: undefined,
	
	menuId		: 'MOMFA023',	
	orderType	: 'SO_OUT_C',
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < param.length; i++) {
				if(to_date_yyyy_mm_dd(param[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10377' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {orderType: this.orderType};
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		var totalInoutPrice = undefined;
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'inoutPrice',
        	positionField: 'inoutPrice',
        	operation: 'SUM',
        	formatString: '#,##0',
			labelFunction: function(value, columnValues, footerValues) {
				totalInoutPrice = Language.lang['MESSAGES11354'] + ': ' + AUIGrid.formatNumber(value, '#,##0.00', 'rounding');
				return totalInoutPrice;
			}
        },{
        	dataField: 'inoutQty',
        	positionField: 'inoutQty',
        	style: 'aui-grid-default-footer',
        	operation: 'SUM',
        	colSpan: 4,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11367'] + ': ' + AUIGrid.formatNumber(value, '#,##0') + ' / ' + totalInoutPrice;
			}
        }];
        
		$('.aui-grid-default-footer').css({'text-align': 'left'});
		
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFA023_1', MOMFA023_1);
	MOMFA023_1.init();
});