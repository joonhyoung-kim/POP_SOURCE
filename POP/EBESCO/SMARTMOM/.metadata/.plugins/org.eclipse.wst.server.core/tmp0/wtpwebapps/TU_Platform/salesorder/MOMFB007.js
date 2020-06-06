var MOMFB007 = {
	init: function() {
		Language.init(function() {	
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB007', MOMFB007);
	MOMFB007.init();
});