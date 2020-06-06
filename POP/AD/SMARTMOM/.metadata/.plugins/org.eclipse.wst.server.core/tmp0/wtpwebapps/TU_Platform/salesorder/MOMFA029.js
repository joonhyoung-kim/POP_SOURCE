var MOMFA029 = {
	init: function() {
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA029', MOMFA029);
	MOMFA029.init();
});