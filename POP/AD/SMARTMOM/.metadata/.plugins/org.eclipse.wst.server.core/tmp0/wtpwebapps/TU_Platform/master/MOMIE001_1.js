var MOMIE001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	init: function() {		
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				var column = [{
					  headerText: ''
					, children: [{
						  dataField: 'col1'
   						, headerText: ''
   						, width: 0
   						, visible: false
			    	}] 
				}];
				
				AUIGrid.addColumn(momWidget.grid[0], column, 'first');
				var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		this.initParam = {'endDate' : '2018-01-01'};
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIE001_1', MOMIE001_1);
	MOMIE001_1.init();
});