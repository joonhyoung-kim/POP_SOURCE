var MOMDA013 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	menuId			: 'MOMDA013',
	endPeriod		: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
					that.event();
				});		
			});		
		});
	}, grid: function() {
		var that = this;
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) {
        	if(e['item']['workQty'] > e['item']['currentQty']) {
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'workQty', e['item']['currentQty']);
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11897']});
				
				return;
			} else if(e['item']['workQty'] == 0) {
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'workQty', e['item']['currentQty']);
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10719']});
				
				return;
			} else if(e['dataField'] == 'confirmDate' && e['value'] <= that.endPeriod) {
	        	AUIGrid.setCellValue(momWidget.grid[0], e['rowIndex'], 'confirmDate', get_current_date('YYYY-MM-DD'));
	        	momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	        }
        	
        	AUIGrid.clearGridData(momWidget.grid[1]);
        });
		
		AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function(event) {
			AUIGrid.clearGridData(momWidget.grid[1]);
		});
		
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			AUIGrid.clearGridData(momWidget.grid[1]);
		}
	}, event: function() {
		var that = this;
		$(document).on("click", "#decompositionBtn2", function() {
			that.checkedItem = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			that.grid2Length = AUIGrid.getGridData(momWidget.grid[1]);
        	
        	if(that.checkedItem.length < 1) {
        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11342']});
        		return;
        	}
        	
        	if(that.grid2Length.length < 1) {
        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10328']});
        		return;
        	}
        	
        	if(that.checkedItem.length > 1) {
        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11604']});
        		return;
        	}
        });
		
		$(document).on('click', '#choiceBtn1', function() {
			that.masterGridItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(that.masterGridItems.length <= 0 || that.masterGridItems.length > 1) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11604']});
				return;
			}
			
			momWidget.splashShow();
			
			mom_ajax('R', 'workOrder.workOrderCreate.decompositionWorkOrderDetail', 
				{confirmDate: that.masterGridItems[0].item.confirmDate, workQty : that.masterGridItems[0].item.workQty, itemId : that.masterGridItems[0].item.itemId}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[1], data);
				that.initCount = data.length;
			}, undefined, undefined, this, 'sync');
			
			setTimeout(function() {
				momWidget.splashHide();
			}, 400);
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA013', MOMDA013);
	momWidget.init(2, 'MOMDA013', MOMDA013);
	MOMDA013.init();
});
