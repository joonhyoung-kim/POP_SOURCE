var MOMOA001 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMOA001', MOMOA001);
	MOMOA001.init();
});