var MOMIE002_1 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIE002_1', MOMIE002_1);
	MOMIE002_1.init();
});