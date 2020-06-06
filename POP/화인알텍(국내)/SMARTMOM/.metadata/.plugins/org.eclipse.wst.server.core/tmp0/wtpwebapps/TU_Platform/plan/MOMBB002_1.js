var MOMBB002_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		this.grid();
	}, grid: function() {
		AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function( e ) {
			AUIGrid.addUncheckedRowsByValue(e.pid, "noItemMap", "null");
		});
		
		var indeterminate = false;	
		AUIGrid.bind(momWidget.grid[0], "rowAllChkClick", function( e ) {
			if(indeterminate) {
				AUIGrid.setCheckedRowsByValue(e.pid, "noItemMap", []);
				indeterminate = false;
			} else {
				var uniqueValues = AUIGrid.getColumnDistinctValues(e.pid, "noItemMap");
				uniqueValues.splice(uniqueValues.indexOf("null"),1);
				AUIGrid.setCheckedRowsByValue(e.pid, "noItemMap", uniqueValues);
				indeterminate = true;
			}
		});
	},saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'itemExceptBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['noItemMap'] == undefined || callBackParam[i]['noItemMap'] == '') {
					this.initMessage = Language.lang['MESSAGES10053'];
					return;
				}
			}
		}
	}, cellClickCallInit : function(index, e) {
		if(e.type == 'cellClick') {
			if(e.item.noItemMap != null) {
				AUIGrid.setProp(momWidget.grid[0], "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp(momWidget.grid[0], 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp(momWidget.grid[0], 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			}
			
		this.cellClickCallInitParam = 'click';
		}
   	},
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMBB002_1', MOMBB002_1);
	MOMBB002_1.init();
});