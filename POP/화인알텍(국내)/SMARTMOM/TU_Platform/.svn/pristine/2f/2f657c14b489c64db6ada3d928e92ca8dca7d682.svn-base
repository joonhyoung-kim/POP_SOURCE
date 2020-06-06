var MOMIF004 = {
	initMessage: undefined,
	initParam: undefined, 
	line: undefined, 
	paramNull: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			that.event();
		});
	}, event: function() {
		var that = this;
		$(document).on("click", "#createPopBtn1", function() {
			$('#pop').momModal('show');
		});
		
		$(document).on("click", ".bntpopclose, #pCancelBtn1", function(){
			$('#pop').momModal('hide');
		});
		
		$(document).on('change', '#lineEP1', function() {
			that.line = $('#lineEP1').val();
			that.retrieveCallBack('SUCCESS', undefined, {line: that.line}, undefined, {index: 0, op: 'lineEP1'});
		});
		
		$(document).on('change', '#itemIdEP1', function() {
			if($('#lineEP1').val() == '' || $('#lineEP1').val() == null) {
				$('#itemIdEP1').val('');
				momWidget.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES12375']});
				return;
			}
		});
	}/*, retrieveCallInit:  function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
//			that.paramNull = undefined;
		}
	}*/, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		if(indexInfo != undefined && indexInfo['op'] == 'lineEP1') {
			momWidget.dropDownPost(0, undefined, undefined, function(result1, data1) {
				if(result == 'SUCCESS' && data1.length > 0) {
					var items = [];
					for(var i = 0; i < data1.length; i++) {
						items.push({label: data1[i]['name'], value: data1[i]['code']});
					}
					$('#itemIdEP1').jqxComboBox('clear');
					$('#itemIdEP1').jqxComboBox('source', items);
				}
			},  that);
		}
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	}, saveCallInit:  function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			var items = [];
			mom_ajax('R', 'reference.cell.lineCell.lineCell', {fromDate: $('#workDateEP1').val(), toDate: $('#workDateEP1').val(), line: that.line}, function(result, data) {
				if(data.length == 0) {
					that.initMessage = Language.lang['MESSAGES12376'];
				}
				for(var i= 0; i < data.length; i++) {
					mom_ajax('R', 'reference.cell.itemCell.itemCell', {itemId: $('#itemIdEP1').val(), cell: data[i].cellCd}, function(result1, data1) {
						items.push({workDate: $('#workDateEP1').val(), line: $('#lineEP1').val(), cellCd: data[i].cellCd, seq: data[i].seq, 
							itemId: $('#itemIdEP1').val(), difficulty: data1[0].difficulty, standardTime: data1[0].standardTime, 
							alarmTime1: data1[0].alarmTime1, alarmTime2: data1[0].alarmTime2,
							useYn: $('#useYnEP1').val(), workerCd: data[i].workerCd});
					}, undefined, undefined, this, 'sync');
				}
			}, undefined, undefined, this, 'sync');
			that.paramNull = 'Y';
			that.initParam = items;
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		that.paramNull = undefined;
		if(indexInfo != undefined && (indexInfo['op'] == 'saveAllBtn1' || indexInfo['op'] == 'saveBtnEP1')) {
			momWidget.findBtnClicked(0, false, {}, undefined, indexInfo, that);
			momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		momWidget.splashHide();
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIF004', MOMIF004);
	MOMIF004.init();
});