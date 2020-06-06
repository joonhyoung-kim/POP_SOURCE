var MOMIB006_1 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB006_1', MOMIB006_1);
	MOMIB006_1.init();
});