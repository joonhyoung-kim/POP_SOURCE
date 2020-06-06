var MOMCE008_1 = {
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	
	}, grid: function() {
		var getColumnIndex = AUIGrid.getDataFieldByColumnIndex(momWidget.grid[0], 0);
		$('.aui-grid-default-footer').css({'text-align': 'left'});
		
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'qty',
        	positionField: getColumnIndex,
        	style: 'aui-grid-default-footer',
        	operation: 'SUM',
        	colSpan: 50,
			labelFunction : function(value, columnValues, footerValues) {
				return 'Total ' + Language.lang['MESSAGES11073'] + ': ' + AUIGrid.formatNumber(value, '#,##0.0000', 'rounding');
			}
        }];
        
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE008_1', MOMCE008_1);
	MOMCE008_1.init();
});