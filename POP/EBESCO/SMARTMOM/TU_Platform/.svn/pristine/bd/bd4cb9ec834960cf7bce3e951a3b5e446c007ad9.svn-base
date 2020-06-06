var MOMEA010_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {        
		Language.init(function() {
		});
		
		this.event();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'dspCancelBtn2' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['updateDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11545' + '@' + endPeriod);
					return;
				}
			}
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'dspCancelBtn2' && indexInfo['sequence'] == 2) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0 ) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { 
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i]['item']['cancelQty'] < 0) {
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11006']});
					return;
				}
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				var item  = checkedItems[i]['item'];
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue(momWidget.grid[1], 'itemStockInoutId', item.itemStockInoutId); 
				for(var j = 0; j < items.length; j++) {
					if(item['itemStockInoutId'] == items[j]['itemStockInoutId']) {
						return;
					}					
				}
				
				AUIGrid.addRow(momWidget.grid[1], item, 'last');
			}
		});
		
		$(document).on('click', '#cancelBtn2', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			if(checkedItems.length == 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11345']});
				return;
			} else {
				for(var i=checkedItems.length-1; i>=0; i--) {
					AUIGrid.removeRow(momWidget.grid[1], checkedItems[i].rowIndex);
				}
			}
		});
	}
};

$(document).ready(function(event) {
       momWidget.init(1, 'MOMEA010_1', MOMEA010_1);
       momWidget.init(2, 'MOMEA010_1', MOMEA010_1);
       MOMEA010_1.init();
});

