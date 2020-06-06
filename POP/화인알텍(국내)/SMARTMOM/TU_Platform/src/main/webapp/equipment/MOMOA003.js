var MOMOA003 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMOA003', MOMOA003);
	MOMOA003.init();
});