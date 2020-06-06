var MOMHA014_1 = {
	init: function() {		
		var that = this;
		Language.init(function() {
		});
		
		momWidget.isInitGrid(0, function() {
			that.grid();
		});
	}, grid: function() {
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex(momWidget.grid[0], 0);
		var totalBasisQty;
		var totalInputQty;
		var totalOutputQty;
		
		var footerObject = [
			{
	        	dataField : "basisQty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalBasisQty = Language.lang['MESSAGES10257'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
	        {
	        	dataField : "inputQty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalInputQty = Language.lang['MESSAGES11048'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
	        {
	        	dataField : "outputQty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalOutputQty = Language.lang['MESSAGES11386'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
			{
	        	dataField : "stockQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + totalBasisQty + " / "  + totalInputQty + " / "  + totalOutputQty + " / " 
							+ Language.lang['MESSAGES11183'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
		$(".aui-grid-default-footer").css({"text-align": "left"});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMHA014_1', MOMHA014_1);
	MOMHA014_1.init();
});