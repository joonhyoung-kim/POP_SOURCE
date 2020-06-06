var MOMBD009 = {
	initMessage		: undefined,
	initParam		: {},
	planId : undefined,
	planDate	: undefined,
	excelDownParam	: undefined,
	excelParam	: {planDate : undefined},
	excelUpInitParam : undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		this.initParam = undefined;
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
		if(result != 'SUCCESS') {
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
			if(data.length != 0) {
				$.each(data[0], function(key, value) {
					if(key.match('/')) {
						groupFields.push(key);
						var columnObj = {dataField: key, style: 'right-column', dataType: 'numeric', formatString: '#,###', excelHide: true};
						changeColumn.push(columnObj);
					}
				});				
			}
			AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
			AUIGrid.setGroupBy(momWidget.grid[0],  ['resourceName'], {
				dataFields : groupFields
			});
			
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		} 
//		if(indexInfo != undefined && indexInfo['op'] == 'syncExcelDownBtn1' && indexInfo['sequence'] == 1) {
//			momWidget.exportToXlsx(0, 'PRODUCTION_SYNC_PLAN_MOMBA004' + get_current_date('yyyy-mm-dd'), data, this);
//		}
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 2) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		if(indexInfo != undefined && indexInfo['op'] == 'confirmUploadBtn1' && indexInfo['sequence'] == 3) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			$('#excelPopExist1').momModal('hide');
		} 
//		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {planId: $('#planId').val().replace('_P', '_S')};
		}
	}, excelUpInit(index, e) {
		var that = this;
		mom_ajax('R', 'plan.plan.productionPlan.productionPlanId', {planDate: get_current_date('yyyy-mm-dd')}, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			
			if(data.length == 0) {
				that.excelUpInitParam = 'Y';
				that.initMessage = Language.lang['MESSAGES10249']; 
				return;
			}
		}, undefined, undefined, this, 'sync');
	}, excelDownCallInit(index, param, callBackParam, indexInfo) {         
		   this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}, setPlanDate: function(){
		var tokens = $('#planDate1').val().split('-');
		this.planDate = tokens[0] + "-" + tokens[1] + "-" + tokens[2];
		this.planId = tokens[0] + tokens[1] + tokens[2] + "_P";
		this.excelParam['planDate'] = this.planDate;
	}, event: function() {
		var that = this;
		$(document).on('change','#planId',function() {
			momWidget.setPlanIdDate(); // 공통위젯 parameter 수정
        });		
		
		$(document).on('change', '#planDate1', function(){
			that.setPlanDate();
			$('#planId1').val(that.planId);
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMBD009', MOMBD009);
	MOMBD009.init();
});