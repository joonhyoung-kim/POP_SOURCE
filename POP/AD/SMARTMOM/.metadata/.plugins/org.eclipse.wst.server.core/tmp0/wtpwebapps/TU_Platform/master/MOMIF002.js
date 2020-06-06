var MOMIF002 = {
	initMessage: undefined,
	init: function() {		
		Language.init(function() {
		});
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo.op == 'saveBtnEP1') { //순서 데이터를 등록할시 같은 것이 있으면 validation
			var checkResult = true;
			param.priority = param.altPriority;
			mom_ajax('R', 'reference.cell.cell.priorityCheck', param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				for(var i = 0; data.length > i; i++) {
					if(param.priority == data[i].altPriority) {
						checkResult = false;
						that.initMessage = Language.lang['MESSAGES12361'];
					}
				}
			}, undefined, undefined, this, 'sync');
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIF002', MOMIF002);
	MOMIF002.init();
});