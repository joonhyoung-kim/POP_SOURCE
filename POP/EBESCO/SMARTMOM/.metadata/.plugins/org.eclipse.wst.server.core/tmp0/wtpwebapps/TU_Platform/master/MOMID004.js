var MOMID004 = {
	init: function() {
		var that = this;
		Language.init(function() {
			window.open('workingManual.html','workingManual','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
		});
	}
};

$(document).ready(function(event) {
	MOMID004.init();
});