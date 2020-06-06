var MOMLB005 = {
	initMessage	: undefined, 
	initParam	: undefined,
	menuId		: 'MOMLB005',
	tableId 	: 'MOM_EQM_ITEM_ORDER',
	endPeriod	: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		that.event();
		that.design();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 2) {
			for(var i = param.length - 1; i >= 0; i--) {
				param[i] = {
					  menuId : this.menuId
					, tableId: this.tableId
					, colId1 : 'ITEM_STOCK_INOUT_ID'
					, value1 : param[i]['itemStockInoutId']
					, colId2 : 'ITEM_STOCK_ID'
					, value2 : this.initParam['itemStockId']
					, colId3 : 'EQUIPMENT_ORDER_ID'
					, value3 : param[i]['equipmentOrderId']
					, colId4 : 'CANCEL_DATE'
					, value4 : param[i]['cancelDate']	
					, colId5 : 'CANCEL_QTY'
					, value5 : param[i]['inputQty']	
					, colId6 : 'DESCRIPTION'
					, value6 : param[i]['description']	
				};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i].cancelQty < 0) {
					this.initMessage = Language.lang['MESSAGES11006'];				
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {menuId : this.menuId, tableId : this.tableId};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
			AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
				if(e['dataField'] == 'cancelDate') { 
					if(e['item']['cancelQty'] < 0) {
						return false;
					}
				}
			});
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'cancelDate', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(item.cancelQty < 0) {
						return 'columnStyle';
					}
				}
			});
			
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1') {
			if(result != 'SUCCESS') {
				momWidget.splashHide();
				return;
			}
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		momWidget.splashHide();
	}, grid: function() {
		var that = this;
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
	        if(e['dataField'] == 'cancelDate') { // 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		if(new Date(to_date_yyyy_mm_dd(e.value)) < new Date(e.item.ioTime)) {
	        			momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11481']});
		                return e.oldValue; 
	        		}
	        		return to_date_yyyy_mm_dd(e.value);
                } 
	        	
	        }
	        return e.value; 
		});
		
	}, event: function() {
		var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
    		momWidget.specPrint(that.menuId
    			, 'purchase.materialLedger.materialInputStatus.materialInputExcelPrintCount'
    			, 'equipment.equipmentMaterialInputStatus.emInputExcelPrint'
    			, 'itemInputId'
    			, 'dummy'
    			, 'dummy'
    			, param
    			, Language.lang['MESSAGES11464']
    		);
		});
	}, design: function() {
		$('head').append('<style>.columnStyle{background: #FFFFFF !important;}</style>');	
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB005', MOMLB005);
	MOMLB005.init();
});