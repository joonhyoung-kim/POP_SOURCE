var MOMFB005 = {
	init: function() {
		Language.init(function() {	
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB005', MOMFB005);
	MOMFB005.init();
});