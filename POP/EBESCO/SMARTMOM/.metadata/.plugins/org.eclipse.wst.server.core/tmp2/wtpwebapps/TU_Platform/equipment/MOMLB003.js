var MOMLB003 = {
	initMessage	: undefined, 
	initParam	: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {});
		});
		that.event();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'cancelBtn1') && indexInfo['sequence'] == 2) {
			for(var i = param.length - 1; i >= 0; i--) {
				param[i] = {
					  menuId : 'MOMCA005'
					, tableId: 'MOM_EQUIPMENT_ORDER'
					, colId1 : 'EQUIPMENT_ORDER_ID'
					, value1 : param[i]['equipmentOrderId']
					, colId2 : 'CANCEL_QTY'
					, value2 : param[i]['remainQty']
					, colId3 : 'EQM_REQUEST_ID'
					, value3 : param[i]['eqmRequestId']
				};
			}
		} else if(indexInfo != undefined && (indexInfo['op'] == 'cancelBtn1') && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'cancelBtn1') && indexInfo['sequence'] == 1) {
			this.initMessage = 'CLEAR_PARAM';
			if(indexInfo['op'] == 'cancelBtn1') {
				for(var i=0; i<callBackParam.length; i++) {
					if(callBackParam[i].remainQty > 0) {
						this.initParam = {menuId : 'MOMCA005', tableId : 'MOM_EQUIPMENT_ORDER'};
					} else {
						this.initMessage = Language.lang['MESSAGES11472'];				
						return;
					}
					
					if(callBackParam[i].orderQty - callBackParam[i].closedQty - callBackParam[i].cancelQty < callBackParam[i].remainQty) {
						this.initMessage = Language.lang['MESSAGES10453'];
						return;
					}
				}
			}
		}
	}, event: function() {
		var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems == undefined || checkedItems.length < 1) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
			momWidget.specPrint('MOMLB003'
			    , 'equipment.emOrderHist.emOrderExcelPrintCount'
				, 'equipment.emOrderHist.emOrderExcelPrint'
				, 'orderGroupId'
				, 'dummy'
				, 'dummy'
				, param
			);
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB003', MOMLB003);
	MOMLB003.init();
});