var MOMOA005 = {
		initColSize	: -1,

		initMessage	: undefined,
		initParam	: {},			/// 이유가 있어, 고치지 마
		
	init: function() {		
		Language.init(function() {
			
		});
	}, loadCallInit: function() {
		this.retrieve();
		//momWidget.findBtnClicked(0, false, {}, undefined, {index: 0, op: 'loadCallInit'}, this);
		mom_ajax('R', 'equipment.equipmentEvent.equipmentEvent', this.initParam, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			AUIGrid.setGridData(momWidget.grid[0], data);
		}, undefined, undefined, this, 'sync');
	}, retrieve: function(load) {
		if(this.initColSize == -1) {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
			this.initColSize = columnLayout.length;
		}	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMOA005', MOMOA005);
	momWidget.init(3, 'MOMOA005', MOMOA005);
	MOMOA005.init();
});