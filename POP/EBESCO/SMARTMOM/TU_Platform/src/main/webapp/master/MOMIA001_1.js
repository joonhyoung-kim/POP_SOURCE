var MOMIA001_1 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIA001_1', MOMIA001_1);
	MOMIA001_1.init();
});