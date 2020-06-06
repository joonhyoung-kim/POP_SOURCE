var MOMFB006 = {
	init: function() {
		Language.init(function() {	
		});
	}, saveCallInit: function(index, param, initParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo.op == 'uploadBtn1') {
			if($("#fromDate").val() == '' || $("#toDate").val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
			}
			
			param.fromDate = $("#fromDate").val();
			param.toDate = $("#toDate").val();
			
			this.initParam = param;
		}
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB006', MOMFB006);
	MOMFB006.init();
});