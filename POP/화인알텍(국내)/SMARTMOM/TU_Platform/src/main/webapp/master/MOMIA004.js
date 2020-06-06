var MOMIA004 = {
	init : function() {		
		Language.init(function() {});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMIA004');
	MOMIA004.init();
});
