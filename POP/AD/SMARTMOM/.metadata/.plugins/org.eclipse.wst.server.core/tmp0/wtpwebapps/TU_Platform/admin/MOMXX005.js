var MOMXX005 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMXX005', MOMXX005);
	MOMXX005.init();
});