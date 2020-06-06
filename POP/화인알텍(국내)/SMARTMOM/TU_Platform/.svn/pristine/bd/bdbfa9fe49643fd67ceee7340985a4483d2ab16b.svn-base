var MOMLC004 = {
	init: function() {	
		var that = this;
		Language.init(function() {
			
		});
	}, saveCallInit(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo['op'] == 'resultCancelBtn1') {
			for(var i = 0; i < param.length; i++) {
				if(param[i].state == 'C') {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				}
			}
		}
	}

};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLC004', MOMLC004);
	MOMLC004.init();
});