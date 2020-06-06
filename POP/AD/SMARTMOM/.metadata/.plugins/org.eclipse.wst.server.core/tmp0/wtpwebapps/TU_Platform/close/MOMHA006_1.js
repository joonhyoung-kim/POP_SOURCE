var MOMHA006_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	inoutFlag	: undefined,
		
	init: function() {		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = {inoutFlag: this.inoutFlag};
		}
	}, grid: function() {    
		this.inoutFlag = momWidget.getSearchParam()['inoutFlag'];
		
		$('.aui-grid-default-footer').css({'text-align': 'right'});
	    var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'magamSeq',
        	positionField: 'magamSeq',
        	operation: 'COUNT',
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11352'] + ': ' + AUIGrid.formatNumber(value, '#,##0');
			}
	    },{
        	dataField: 'qty',
        	positionField: 'endDate',
        	operation: 'SUM',
        	colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11366'] + ': ' + AUIGrid.formatNumber(value, '#,##0.00');
			}
	    },{
        	dataField: 'conversionUnitQty',
        	positionField: 'ioTime',
        	operation: 'SUM',
        	colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11368'] + ': ' + AUIGrid.formatNumber(value, '#,##0.0000');
			}
	    },{
        	dataField: 'foreignTotalPrice',
        	positionField: 'itemName',
        	operation: 'SUM',
        	colSpan: 2,
        	labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11362'] + ': ' + AUIGrid.formatNumber(value, '#,##0.0000');
			}
        },{
        	dataField: 'inoutPrice',
        	positionField: 'qty',
        	operation: 'SUM',
        	formatString: '#,###',
        	colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				totalKrwAmount = Number(value); 
		        return Language.lang['MESSAGES11363'] + ': ' + AUIGrid.formatNumber(value, '#,##0', 'rounding');
			}
        },{
        	dataField: 'inoutVat',
        	positionField: 'currencyCd',
        	operation: 'SUM',
        	colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				totalVat = Number(value);
				return Language.lang['MESSAGES11358'] + ': ' + AUIGrid.formatNumber(value, '#,##0', 'floor');
			}
        },{
        	dataField: 'totalAmount',
        	positionField: 'inoutPrice',
        	operation: 'SUM',
        	colSpan: 3,
        	labelFunction: function(value, columnValues, footerValues) {
        		return Language.lang['MESSAGES11365'] + ': ' + AUIGrid.formatNumber(totalKrwAmount + totalVat, '#,##0', 'rounding');
			}
        }];
    
	    AUIGrid.setFooter(momWidget.grid[0], footerObject);
	    
	    // 수량, 환산수량, 외화공급가, 원화공급가, 부가세, 합계금액의 그룹 합계
		AUIGrid.setGroupBy(momWidget.grid[0],  ['magamSeq'], {
	         dataFields: ['qty', 'conversionUnitQty', 'foreignTotalPrice', 'inoutPrice', 'inoutVat', 'totalAmount']
			,labelTexts: [Language.lang['MESSAGES10697']]
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMHA006_1', MOMHA006_1);
	MOMHA006_1.init();
});