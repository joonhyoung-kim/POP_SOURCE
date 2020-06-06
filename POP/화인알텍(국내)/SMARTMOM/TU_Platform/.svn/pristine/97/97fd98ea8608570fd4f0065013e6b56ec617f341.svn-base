var MOMBD005_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	excelDownParam: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			}
			
			var fromDate   = new Date($('#fromDate').val());
			var toDate     = new Date($('#toDate').val());
			var planIdDate = to_date_yyyy_mm_dd($('#planId').val().substring(0,8));
			planIdDate = new Date(planIdDate);
			if(fromDate > toDate){
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
			
			if(fromDate < planIdDate) {
				this.initMessage = Language.lang['MESSAGES10061'];
				return;
			}
			
			this.initParam = {'pivot': momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 1, 'SUM(DECODE(PLAN_DATE', "PLAN_RESULT, 0))")};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS' || data.length < 1) {
			AUIGrid.clearGridData(momWidget.grid[0]);
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			for(var i = 0; i <= columnLayout.length; i++) {
				if(columnLayout[i] != undefined && columnLayout[i]['headerText'] != undefined) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			$.each(data[0], function(key, value) {
				if(key.match('/')) {
					var columnObj = {dataField: key, editable: true, 'width': 80, style: 'right-column', dataType: 'numeric', formatString: '#,###', excelHide: true};
					changeColumn.push(columnObj);
				}
			});				
			
			AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		}
	}, grid: function() {
		var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
		for(var i = 0; i < 3; i++) {
			columnLayout[i]['cellMerge'] = true;
		}
		
		AUIGrid.changeColumnLayout(momWidget.grid[0], columnLayout);
	}, event: function() {
		$(document).on('change', '#planId', function() {
			momWidget.setPlanIdDate(); // 공통위젯 parameter 수정
		});
	}, excelDownCallInit: function(index, param, callBackParam, indexInfo) {         
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMBD005_1', MOMBD005_1);
	MOMBD005_1.init();
});
