var MOMBD003_1 = {
	initMessage: undefined,
	initParam: undefined,
		
	excelDownParam: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			that.grid();
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var fromDate = new Date($('#fromDate').val());
			var toDate = new Date($('#toDate').val());
			var planIdDate = to_date_yyyy_mm_dd($('#planId').val().substr(0,8));
			planIdDate = new Date(planIdDate);
			if(fromDate > toDate) {
				this.initMessage = Language.lang['MESSAGES10785'];				
				return;
			}
			
			if(fromDate < planIdDate) {
				this.initMessage = Language.lang['MESSAGES10061'];				
				return;
			}
		}
		
		if(this.initParam == undefined || this.initParam['pivot'] == undefined) {
			this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 2, 'TO_DATE', 'YYYY-MM-DD')};
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
			var groupFields = [];
			for(var i = 0; i <= columnLayout.length; i++) {
				if(columnLayout[i] != undefined && columnLayout[i].headerText != undefined) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			var i = 0;
			$.each(data[0], function(key, value){
				if(key.match('/')){
					var columnObj = {dataField: key, editable: true, 'width': 150, style: 'right-column', dataType: 'numeric', formatString: '#,###', excelHide: true};
					AUIGrid.addColumn(momWidget.grid[0], columnObj, 'last');
					i++;
				}
			});				
			
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		}
	}, grid: function() {
	   momWidget.isInitGrid(0, function() {
		   var column = [{
			   headerText: Language.lang['MESSAGES11577'],
			   children: [{
				   headerText: Language.lang['MESSAGES10198'],
				   children: [{
					   dataField: 'col1',
					   headerText: Language.lang['MESSAGES10843'],
					   width: 120
				   }]
			   }] 
		   },{
			   headerText: Language.lang['MESSAGES11569'],
			   children: [{
				   headerText: Language.lang['MESSAGES10234'],
				   children: [{
					   dataField: 'col2',
					   headerText: Language.lang['MESSAGES10308'],
					   width: 120
				   }]
			   }]
		   },{
			   headerText: Language.lang['MESSAGES11585'],
			   children: [{
				   headerText: Language.lang['MESSAGES11613'],
				   children: [{
					   dataField: 'col3',
					   headerText: Language.lang['MESSAGES11292'],
					   width: 120
				   }]
			   }]
		   }];
		     				
		   AUIGrid.addColumn(momWidget.grid[0], column, 'first');
	   });
   }, event: function() {
	   $(document).on('change', '#planId', function() {
		   momWidget.setPlanIdDate();
	   });		
   }, excelDownCallInit: function(index, param, callBackParam, indexInfo) {         
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	} 
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMBD003_1', MOMBD003_1);
    MOMBD003_1.init();
});