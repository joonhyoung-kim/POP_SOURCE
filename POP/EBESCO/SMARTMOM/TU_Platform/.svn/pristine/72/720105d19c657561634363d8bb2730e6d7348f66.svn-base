var MOMIB009 = {
	init: function() {		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, grid: function() {
		var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
		columnLayout[0]['cellMerge'] = true;
		
		for(var i = 1; i < 3; i++) {
			columnLayout[i]['cellMerge'] = true;
			columnLayout[i]['mergeRef'] = 'equipmentCd';
			columnLayout[i]['mergePolicy'] = 'restrict';
		}
		
		AUIGrid.changeColumnLayout(momWidget.grid[0], columnLayout);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB009', MOMIB009);
	MOMIB009.init();
});