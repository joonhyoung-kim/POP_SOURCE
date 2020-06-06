var MOMZA091_1 = {
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				that.event();
			});			
		});
		
		that.design();
	}, grid: function() {
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
			dataField: 'amt',
			positionField: 'qty',
			operation: 'SUM',
			colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10314'] + ': ' + AUIGrid.formatNumber(value, '#,##0');
			}
		},{
			dataField: 'sumAmt',
			positionField: 'sumQty',
			operation: 'SUM',
			colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11348'] + ': ' + AUIGrid.formatNumber(value, '#,##0');
			}
		}];
		
		// footer 합계
		AUIGrid.setFooter(momWidget.grid[0], footerObject);
		
		AUIGrid.setGroupBy(momWidget.grid[0],  ['itemGroupMediumNm'], {
	         dataFields : [ 'qty', 'amt', 'sumQty', 'sumAmt'],
	         labelTexts : [Language.lang['MESSAGES10697']]
	    });
		
		AUIGrid.setProp(momWidget.grid[0], 'rowStyleFunction', function(rowIndex, item) {
			if(item.itemGroupMediumNm == Language.lang['MESSAGES10697']) { 		// 소계 항목만 스타일 지정
				return 'my-row-style';
			}
		});
		
		// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
		AUIGrid.update(momWidget.grid[0]);
	}, design: function(){
		$('head').append('<style>.my-row-style {background:#D8D8D8;font-weight:bold;color:#000;}</style>');
	}, event: function() {
		/* modify_hists
		 * XMOMI19 / ljw / 20191106 / 엑셀 소계 미출력되어 공통 소스에 엑셀 다운로드 다른 방식의 함수 호출하여 사용
		 * 
		 * */
		var that = this;
		$(document).on('click', '#gridExcelDownBtn1', function() {
			momWidget.exportToXlsx(0, "DAILY_SALES_HIST_MOMZA091_" + get_current_date("yyyy-mm-dd"), AUIGrid.getGridData(momWidget.grid[0]));
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMZA091_1', MOMZA091_1);
	MOMZA091_1.init();
});