var MOMIB008 = {
	init: function() {		
		Language.init(function() {});
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		console.log('index = ' + index);
		console.log('param = ' + JSON.stringify(param));
		console.log('callBackParam = ' + callBackParam);
		console.log('indexInfo = ' + JSON.stringify(indexInfo));
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB008', MOMIB008);
	MOMIB008.init();
});