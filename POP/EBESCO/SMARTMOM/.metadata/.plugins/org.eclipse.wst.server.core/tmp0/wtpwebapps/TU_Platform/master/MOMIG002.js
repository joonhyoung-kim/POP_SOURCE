var MOMIG002 = {
	initParam : undefined,
	initMessage : undefined,
	init: function() {	
		var that = this;
		Language.init(function() {
			that.event();
		});
	}, event: function() {
		$(document).on("click", "#createPopBtn1", function() {
			$('#fromDateEP1').val(get_current_date('yyyy-mm-dd'));
			$('#toDateEP1').val(get_current_date('yyyy-mm-dd'));
			$('#pop').momModal('show');
		});
		
		$(document).on("click", ".bntpopclose, #pCancelBtn1", function(){
			$('#fromDateEP1, #toDateEP1').val(get_current_date('yyyy-mm-dd'));
			$('#lineEP1').val('');
			$('#cellNumberEP1').val('');
			$('#useYnEP1').val('Y');
			$('#pop').momModal('hide');
		});
	}/*, retrieveCallInit:  function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'pSaveBtn1' && indexInfo['sequence'] == 1) {
			that.initParam = {fromDate: $('#fromDateEP1').val(), toDate: $('#toDateEP1').val()}
		}
	}*/, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'pSaveBtn1' && indexInfo['sequence'] == 2) {
			$('#pop').momModal('hide');
			momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	}, saveCallInit:  function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'pSaveBtn1' && indexInfo['sequence'] == 1) {
			var days = [];
			
			var cellNumber = Number($('#cellNumberEP1').val());
			mom_ajax('R', 'common.searchDate', {fromDate: $('#fromDateEP1').val(), toDate: $('#toDateEP1').val()}, function(result, data) {
				if(data.length > 0) {
					for(var i = 0; i < data.length; i++) {
						days[i] = data[i].solarDate;
					}
				}
			}, undefined, undefined, this, 'sync');
			var items = [];
			for(var i = 0; i < days.length; i++) {
				mom_ajax('R', 'common.comCell', {}, function(result, data) {
					for(var j = 0; j < cellNumber; j++) {
						items.push({workDate: days[i], cellCd: data[j].code, seq: data[j].seq, line: $('#lineEP1').val(), useYn: $('#useYnEP1').val()});
					}
				}, undefined, undefined, this, 'sync');
			}
			that.initParam = items;
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn1') {
			momWidget.findBtnClicked(0, false, {}, undefined, indexInfo, that);
			momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
			momWidget.splashHide();
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIG002', MOMIG002);
	MOMIG002.init();
});