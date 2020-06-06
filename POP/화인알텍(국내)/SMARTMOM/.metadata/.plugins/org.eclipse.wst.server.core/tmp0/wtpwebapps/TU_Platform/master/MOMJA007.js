var MOMJA007 = {
	init: function() {		
		var that = this;
		Language.init(function() {});
	}
};
$(document).ready(function(event){
	momWidget.init(1, 'MOMJA007');
	MOMJA007.init();
});
