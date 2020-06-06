var MOMIG001 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIG001', MOMIG001);
	MOMIG001.init();
});