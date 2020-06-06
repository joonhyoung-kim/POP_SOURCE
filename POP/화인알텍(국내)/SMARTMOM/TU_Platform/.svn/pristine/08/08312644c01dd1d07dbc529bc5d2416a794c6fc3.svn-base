var MOMCA003_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	//reportUrl 	: undefined,
	
	init: function() {         
		Language.init(function() {
		});
		
		this.event();
	}/*, loadCallInit: function() {
	}*/, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'changeRequestTimeBtn1' || indexInfo['op'] == 'orderCancelBtn1') && indexInfo['sequence'] == 2) {
			for(var i = param.length - 1; i >= 0; i--) {
				param[i] = {
					  menuId : 'MOMCA003'
					, tableId: 'MOM_MATERIAL_ORDER'
					, colId1 : 'MATERIAL_ORDER_ID'
					, value1 : param[i]['materialOrderId']
					, colId2 : 'ORDER_TYPE'
					, value2 : this.initParam['attr1']
					, colId3 : 'ORDER_DATE'
					, value3 : param[i]['orderDate']
					, colId4 : 'CANCEL_QTY'
					, value4 : param[i]['compareRemainQty']	
				};
			}
		} else if(indexInfo != undefined && (indexInfo['op'] == 'changeRequestTimeBtn1' || indexInfo['op'] == 'orderCancelBtn1') && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'changeRequestTimeBtn1' || indexInfo['op'] == 'orderCancelBtn1') && indexInfo['sequence'] == 1) {
			this.initMessage = 'CLEAR_PARAM';
			if(indexInfo['op'] == 'changeRequestTimeBtn1') {
				this.initParam = {menuId : 'MOMCA003', tableId : 'MOM_MATERIAL_ORDER', attr1 : 'ORDER_DATE'};
			} else {
				this.initParam = {menuId : 'MOMCA003', tableId : 'MOM_MATERIAL_ORDER', attr1 : 'CANCEL_QTY'};
			}
		}
	}, event: function() {
		var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.lang['MESSAGES11329']});
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
    		momWidget.specPrint('MOMCA003'
    			, 'purchase.purchasing.irregularOrderCancel.orderExcelPrintCount'
    			, 'purchase.purchasing.irregularOrderCancel.orderExcelPrint'
    			, 'orderGroupId'
    			, 'dummy'
    			, 'dummy'
    			, param
    			, Language.lang['MESSAGES11464']
    		);
		});
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMCA003_1', MOMCA003_1);
       MOMCA003_1.init();
});

