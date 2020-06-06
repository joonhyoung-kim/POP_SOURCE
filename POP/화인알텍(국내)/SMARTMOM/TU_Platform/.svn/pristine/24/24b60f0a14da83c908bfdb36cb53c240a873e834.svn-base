var chkFlag;
var MOMDA014 = {
	cellClickCallInitParam : undefined,
	init : function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				that.event();
			});
		});
	},
	grid : function() {
        AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function(event) {
        	var checkedItem = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItem.length > 0) {
				for(var i = 0; i < checkedItem.length; i++) {
					if(event.item.workOrderId == checkedItem[i].item.workOrderId && event.rowIndex == checkedItem[i].rowIndex) {
						 //체크한 데이터랑 클릭한 데이터는 비교하지 않음
					} else {
						if(event.item.workOrderId == checkedItem[i].item.workOrderId) {
							AUIGrid.addUncheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
							return;
						}
						if(i==1) {
							if(event.item.workOrderId != checkedItem[i].item.workOrderId && event.checked == true && event.item.cancelQty == '') {
								AUIGrid.addCheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
								return;
							} else {
								AUIGrid.addUncheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
								return;
							}
						}
					}
				}
				if(event.checked != false) {
					if(checkedItem.length >= 1 && (event.item.cancelQty == '' || event.item.cancelQty == null)) {
						AUIGrid.addCheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
						return;
					} else {
						AUIGrid.addUncheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
						return;
					}
				}
				
			} else {
				AUIGrid.addUncheckedRowsByValue(event.pid, "workOrderId", event.item.workOrderId);
				return;
			}
		});   
        
        var indeterminate = false;	
		AUIGrid.bind(momWidget.grid[0], "rowAllChkClick", function( e ) {
			if(indeterminate) {
				AUIGrid.setCheckedRowsByValue(e.pid, "cancelQty", []);
				indeterminate = false;
			} else {
				var allDate = AUIGrid.getGridData(momWidget.grid[0]);
				var uniqueValues = AUIGrid.getColumnDistinctValues(e.pid, "cancelQty");
				uniqueValues.splice(uniqueValues.indexOf("0"),1);
				AUIGrid.addUncheckedRowsByValue(e.pid, 'cancelQty', uniqueValues);
				indeterminate = true;
			}
		});
		
	}, event : function() {
		$(document).on("click", "#decompositionCancelBtn1", function() {
        	var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
        	if(checkedItems.length < 1) {
        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11604']});
        		return;
        	}
        	for(var i=0; i<checkedItems.length; i++) {
        		if(checkedItems[i].item.cancelQty != 0 && checkedItems[i].item.cancelQty != null) {
        			momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11006']});
            		return;	
        		}
        	}
        });
	}, 
	cellClickCallInit : function(index, e) {
		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
		chkFlag = false;
		
		if(e.item.cancelQty < 0) {
			AUIGrid.addUncheckedRowsByValue(e.pid, 'workOrderId', e.item.workOrderId);
			chkFlag = false;
//			return;
		} else if (e.item.cancelQty == 0) {
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.workOrderId == e.item.workOrderId) {
					AUIGrid.addUncheckedRowsByValue(e.pid, 'workOrderId', e.item.workOrderId);
					chkFlag = true;
					this.cellClickCallInitParam = 'click';
					return;
				} 
			}
			
			if(chkFlag != true) {
				AUIGrid.addCheckedRowsByValue(e.pid, 'workOrderId', e.item.workOrderId);
			}
		} 
		this.cellClickCallInitParam = 'click';
	}
};
$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA014', MOMDA014);
	MOMDA014.init();
});
