var MOMBD002_1 = {
	initMessage		: undefined,
	initParam		: undefined,
	
	excelDownParam	: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var fromDate = new Date($('#fromDate').val());
			var toDate = new Date($('#toDate').val());
			var planIdDate = new Date(to_date_yyyy_mm_dd($('#planId').val().substr(0,8)));
			if(fromDate > toDate) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			} else if(fromDate < planIdDate) {
				this.initMessage = Language.lang['MESSAGES10061'];
				return;
			}
		}
		
		if(this.initParam == undefined || this.initParam['pivot'] == undefined) {
			this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 1, "SUM(DECODE (TO_CHAR(A.PLAN_DATE,'YYYYMMDD')", "A.PLAN_QTY, ''))")};
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
			
			$.each(data[0], function(key, value) {
				if(key.match('/')) {
					groupFields.push(key);
					var columnObj = {dataField: key, style: 'right-column', dataType: 'numeric', formatString: '#,###', excelHide: true};
					changeColumn.push(columnObj);
				}
			});				
			
			AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
			AUIGrid.setGroupBy(momWidget.grid[0],  ['resourceName'], {
				dataFields : groupFields
			});
			
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		} else if(indexInfo != undefined && indexInfo['op'] == 'syncExcelDownBtn1' && indexInfo['sequence'] == 1) {
			momWidget.exportToXlsx(0, 'PRODUCTION_SYNC_PLAN_MOMBA004_1' + get_current_date('yyyy-mm-dd'), data, this);
		}
	}, excelDownCallInit(index, param, callBackParam, indexInfo) {         
		   this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}, event: function() {
		$(document).on('change','#planId',function() {
			momWidget.setPlanIdDate(); // 공통위젯 parameter 수정
        });		
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMBD002_1', MOMBD002_1);
	MOMBD002_1.init();
});