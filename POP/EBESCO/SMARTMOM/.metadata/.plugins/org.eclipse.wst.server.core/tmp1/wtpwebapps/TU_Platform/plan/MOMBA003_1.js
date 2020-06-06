var MOMBA003_1 = {
	uploadType	: 'P',
	optionValue : undefined,
	
	initColSize	: -1,
	fieldString	: '',
	fieldStringG: '',
	
	planId		: undefined,
	planDate	: undefined,
	
	initMessage	: undefined,
	initParam	: undefined,
	
	excelTemplateDownParam : undefined,
	
	colDate		: undefined,
	pivot		: undefined,
		
	init: function() {
		Language.init(function() {
		});
		
		this.event();
	}, gridCallInit: function() {
		var that = this.init != undefined ? this : this.MOMBA003_1;
		setTimeout(function() {
			that.grid();
			that.retrieve('load');
		}, 40);
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'poUploadBtn1' && indexInfo['sequence'] == 4) {
			this.retrieve();
		} else {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'createSalesBtn1' && indexInfo['sequence'] == 1) {
			AUIGrid.clearGridData(momWidget.grid[0]);
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'poUploadBtn1' && indexInfo['sequence'] == 1) {
			$('#excelPopExist1').momModal('hide');
			$('#uploadFileName1').val('');
		}
	}, excelTemplateDownCallInit(index, param, callBackParam, indexInfo) {
		this.excelTemplateDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
		for(var i = 1; i < this.excelTemplateDownParam.length; i++) {
			this.excelTemplateDownParam[i]['excelTemplateHide'] = 2;
		}
	}, setPlanDate: function(){
		$('#planDate').val(get_current_date('YYYY-MM-DD'));
		var planDate = get_current_date('YYYY-MM-DD').split('-');
		this.planId = planDate[0] + planDate[1] + planDate[2] + '_P';
		this.planDate = planDate[0] + '-' + planDate[1] + '-' + planDate[2];
		$('#planId').val(this.planId);
		$('#planDate').datepicker('destroy');
		
		this.initParam = {
			planDate: this.planDate.replace(/-/gi,''),
			uploadType: this.uploadType,
			codeId: 'DEMAND_PO_EXCEL_UPLOAD_TYPE'
		}
	}, grid: function() {
		//momWidget.setDueDate(0);	
		this.setPlanDate();
		
		$('#uploadFileName1, #planId').attr('readonly', true);
		$('#planDate').attr({'disabled': true});
	}, event: function() {
		$(document).on('change', '#file1', function() {
			$('#uploadFileName1').val('');
			$('#uploadFileName1').val($('#file1').val());
		});
	}, retrieve: function(load) {
		var that = this;
		if(this.optionValue == undefined) {
			mom_ajax('R', 'admin.setup.setup', {}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					this.optionValue = 'C';
					return;
				}
				
				that.optionValue = data[0].demandPoUploadType;
			}, undefined, undefined, this, 'sync');
		}
		
		this.pivot = {
			  dataString : this.fieldString
			, dataStringG: this.fieldStringG
			, planDate   : this.planDate
			, optionValue: this.optionValue
			, uploadType : this.uploadType
		};
		
		if(this.optionValue == 'R') { 						//row type 
			momWidget.setColDate(0, 0, function() {  		//header 뒤에 date 추가 생성
				this.pivot[colDate] = this.colDate;
				
				mom_ajax('R', 'plan.plan.salesOrderUpload.salesOrderUploadCreate', this.pivot, function(result, data) {
					data = date2StringData19(data, ['dueDate']);
					AUIGrid.setGridData(momWidget.grid[0], data);
					if(load == undefined) {
						momWidget.splashHide();
						momWidget.messageBox({type:'success', width:'400', height:'145', html:Language.lang['MESSAGES10864']});
					}
				}, undefined, undefined, this, 'sync');
			}, this); 				 
		} else if(this.optionValue == 'C') {
			mom_ajax('R', 'plan.plan.salesOrderUpload.salesOrderUploadCreate', this.pivot, function(result, data) {
				data = date2StringData19(data, ['dueDate']);
				AUIGrid.setGridData(momWidget.grid[0], data);
				if(load == undefined) {
					momWidget.splashHide();
					momWidget.messageBox({type:'success', width:'400', height:'145', html:Language.lang['MESSAGES10864']});
				}
			}, undefined, undefined, this, 'sync');
		}
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMBA003_1', MOMBA003_1);
	MOMBA003_1.init();
});