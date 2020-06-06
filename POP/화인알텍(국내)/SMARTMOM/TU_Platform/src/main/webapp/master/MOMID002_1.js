/*2019.08.09 JS 수정 PYJ*/
var MOMID002_1 = {
	init: function() {		
		Language.init(function() {
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMID002_1', MOMID002_1);
	MOMID002_1.init();
});