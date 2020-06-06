var MOMDA007_1 = {
	init: function() {
		Language.init(function() {
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA007_1', MOMDA007_1);
	MOMDA007_1.init();
});