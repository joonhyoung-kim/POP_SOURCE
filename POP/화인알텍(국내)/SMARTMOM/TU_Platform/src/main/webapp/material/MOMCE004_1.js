var MOMCE004_1 = {
	menuId : "MOMCE004_1",
	
	init: function() {        
		Language.init(function() {
        });
    }
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE004_1', MOMCE004_1);
    momWidget.init(2, 'MOMCE004_1', MOMCE004_1);
    MOMCE004_1.init();
});
