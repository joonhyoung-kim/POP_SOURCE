var MOMBA004_1 = {
	initColSize	: -1,
		
	planId		: undefined,
	planDate	: undefined,
		
	initMessage	: undefined,
	initParam	: {},			/// 이유가 있어, 고치지 마
	
	excelParam	: {planDate : undefined},
	
	fromDate	: undefined,
	toDate		: undefined,
	
	init: function() {        
		Language.init(function() {
		});
		
		this.event();
	}, loadCallInit: function() {
		this.retrieve();
		//momWidget.findBtnClicked(0, false, {}, undefined, {index: 0, op: 'loadCallInit'}, this);
		mom_ajax('R', 'plan.plan.planningUpload.planningUpload', this.initParam, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			AUIGrid.setGridData(momWidget.grid[0], data);
		}, undefined, undefined, this, 'sync');
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		/*if(indexInfo != undefined && indexInfo['op'] == 'confirmUploadBtn1' && indexInfo['sequence'] == 3) {
			this.initParam['pivot'] = momWidget.getDiff(
				  this.fromDate.substring(0, 4) + '-' + this.fromDate.substring(4, 6) + '-' + this.fromDate.substring(6, 8) 
				, this.toDate.substring(0, 4) + '-' + this.toDate.substring(4, 6) + '-' + this.toDate.substring(6, 8)
				, 0 
				, 'MIN(DECODE (TO_CHAR(A.WORK_DATE,\'YYYYMMDD\')', 'A.WORK_QTY, \'\'))'
			);
		}*/
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'confirmUploadBtn1' && indexInfo['sequence'] == 3) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			delete this.initParam['pivot'];
		} 
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {planId: $('#planId').val().replace('_P', '_S')};
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 1) {
			momWidget.splashHide();
			AUIGrid.clearGridData(momWidget.grid[0]);			
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmUploadBtn1' && indexInfo['sequence'] == 1) {
			$('#excelPopExist1').momModal('hide');
			$('#uploadFileName1').val('');
		}
	}, setPlanDate: function(){
		var tokens = $('#planDate').val().split('-');
		this.planDate = tokens[0] + "-" + tokens[1] + "-" + tokens[2];
		this.planId = tokens[0] + tokens[1] + tokens[2] + "_P";
		this.excelParam['planDate'] = this.planDate;
	}, event: function() {
		var that = this;		
		$(document).on('change', '#planDate', function(){
			that.setPlanDate();
			$('#planId').val(that.planId);
		});
	}, retrieve: function(load) {
		if(this.initColSize == -1) {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
			this.initColSize = columnLayout.length;
		}
		
		momWidget.setColDate(0, 2, function() { 
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
			return;
		}, this);
		
		this.initParam['pivot'] = momWidget.getDiff(
			  this.fromDate.substring(0, 4) + '-' + this.fromDate.substring(4, 6) + '-' + this.fromDate.substring(6, 8) 
			, this.toDate.substring(0, 4) + '-' + this.toDate.substring(4, 6) + '-' + this.toDate.substring(6, 8)
			, 0 
			, 'MIN(DECODE (TO_CHAR(A.WORK_DATE,\'YYYYMMDD\')', 'A.WORK_QTY, \'\'))'
		);
		
		this.initParam['planDate'] = this.fromDate.substring(0, 4) + '-' + this.fromDate.substring(4, 6) + '-' + this.fromDate.substring(6, 8);
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMBA004_1', MOMBA004_1);
       MOMBA004_1.init();
});
