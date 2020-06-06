var MOMNA001 = {
	initMessage		: undefined,
	initParam		: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			that.initParam = {EXCEL_FLAG: 'DELETE'};
		});
	}
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMNA001', MOMNA001);
   MOMNA001.init();
});
