var MOMXX003 = {
	init : function() {
		var that = this;
		Language.init(function(){});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMXX003');
	MOMXX003.init();
});
