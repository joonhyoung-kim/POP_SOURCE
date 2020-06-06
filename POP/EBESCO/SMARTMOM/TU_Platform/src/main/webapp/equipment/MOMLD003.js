var MOMLD003 = {
	initParam 			: undefined,
	initMessage			: undefined,
	init: function() {	
		var that = this;
		Language.init(function() {
		});
	}/*, retrieveCallInit: function(data, param, callBackParam, indexInfo) {
	}*/, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC1') {
			AUIGrid.setGridData(momWidget.grid[1], data);
		}
		momWidget.splashHide();
		
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLD003', MOMLD003);
	momWidget.init(2, 'MOMLD003', MOMLD003);
	MOMLD003.init();
});