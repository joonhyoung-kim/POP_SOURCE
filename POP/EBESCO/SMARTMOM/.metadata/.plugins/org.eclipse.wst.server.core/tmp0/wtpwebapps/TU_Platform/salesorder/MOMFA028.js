var MOMFA028 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA028', MOMFA028);
	MOMFA028.init();
});