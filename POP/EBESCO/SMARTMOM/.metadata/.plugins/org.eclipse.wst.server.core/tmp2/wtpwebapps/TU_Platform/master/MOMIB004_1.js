var MOMIB004_1 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB004_1',MOMIB004_1);
	MOMIB004_1.init();
});