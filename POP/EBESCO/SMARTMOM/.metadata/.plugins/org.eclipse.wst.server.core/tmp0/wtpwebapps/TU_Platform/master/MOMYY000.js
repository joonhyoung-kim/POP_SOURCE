var MOMYY000 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMYY000', MOMYY000);
	MOMYY000.init();
});