var MOMZA092_1 = {
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, grid: function() {
		 var footerObject = [{
				labelText: '∑',
				positionField: '#base'
			},{
					dataField : "amt",
					positionField : "amt",
					operation : "SUM",
					colSpan : 2,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10313'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
				{
					dataField : "sumAmt",
					positionField : "sumAmt",
					operation : "SUM",
					colSpan : 2,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES11348'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
			]
			// footer 합계
			AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}
};
$(document).ready(function(event){
	momWidget.init(1, 'MOMZA092_1');
	MOMZA092_1.init();
});