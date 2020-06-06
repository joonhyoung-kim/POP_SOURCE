var MOMCE003_1 = {
	init: function() {
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE003_1', MOMCE003_1);
	MOMCE003_1.init();
});