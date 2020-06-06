var MOMIF003 = {
	initParam : undefined,
	initMessage : undefined,
	init: function() {	
		var that = this;
		Language.init(function() {
			that.event();
		});
	}, event: function() {
		$(document).on("click", "#createPopBtn1", function() {
			$('#pop').momModal('show');
		});
		
		$(document).on("click", ".bntpopclose, #pCancelBtn1", function(){
			$('#itemIdEP1').val('');
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
			momWidget.splashHide();
		}
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	}, saveCallInit:  function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'pSaveBtn1' && indexInfo['sequence'] == 1) {
			
			var cellNumber = Number($('#cellNumberEP1').val());
			var items = [];
				mom_ajax('R', 'common.comCell', {}, function(result, data) {
					for(var i = 0; i < cellNumber; i++) {
						items.push({cellCd: data[i].code, seq: data[i].seq, itemId: $('#itemIdEP1').val(), useYn: $('#useYnEP1').val()});
					}
				}, undefined, undefined, this, 'sync');
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
	momWidget.init(1, 'MOMIF003', MOMIF003);
	MOMIF003.init();
});