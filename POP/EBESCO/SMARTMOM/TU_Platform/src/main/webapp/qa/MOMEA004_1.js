var MOMEA004_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(4, function() {
						that.grid();
					});
				});
			});
		});
		
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'CC1' && indexInfo['sequence'] == 1) {
			this.initParam = {materialDepartureId: param['materialDepartureId']};
		}
	}, grid: function() {
		momWidget.addFileColumn(1, 4, 0, 'MOMEA003', 'defectResultId');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA004_1', MOMEA004_1);
	momWidget.init(2, 'MOMEA004_1', MOMEA004_1);
	momWidget.init(5, 'MOMEA004_1', MOMEA004_1);
	MOMEA004_1.init();
});