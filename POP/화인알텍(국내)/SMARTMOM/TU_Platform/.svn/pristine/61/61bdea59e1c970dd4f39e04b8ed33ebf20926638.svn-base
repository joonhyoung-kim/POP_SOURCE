var MOMCC003_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	endDate		: undefined,
	
	menuId 		: 'MOMCC003',
	tableId		: 'MOM_ITEM_STOCK',
	
	menuCode 	: undefined,
		
	init: function() {   
		Language.init(function() {
		});
		
		this.event();
	}, loadCallInit: function() {
		this.grid();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = undefined;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtn1') {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 1) {
			if(callBackParam.length <= 0) {
				this.initMessage = Language.lang['MESSAGES11345'];				
				return;
			} 
			
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelQty'] == callBackParam[i]['qty']) {
					this.initMessage = Language.lang['MESSAGES11006'];					
					return;
				} else if(callBackParam[i]['cancelDate'] == undefined || callBackParam[i]['cancelDate'] == '') {
					this.initMessage = Language.lang['MESSAGES11485'];					
					return;
				} else if(callBackParam[i]['createDate'].substring(0, 10) > callBackParam[i]['cancelDate']) {
					this.initMessage = Language.lang['MESSAGES11481'];					
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['cancelDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11484' + '@' + endPeriod);					
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {menuId: this.menuId, tableId: this.tableId};
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 2) {
			for(var i = param.length - 1; i >= 0; i--) {
				param[i] = {
					  menuId : this.menuId
					, tableId: this.tableId
					, colId1 : 'ITEM_STOCK_INOUT_ID'
					, value1 : param[i]['itemStockInoutId']
					, colId2 : 'ITEM_STOCK_ID'
					, value2 : param[i]['itemStockId']
					, colId3 : 'MATERIAL_ORDER_ID'
					, value3 : param[i]['materialOrderId']
					, colId4 : 'MATERIAL_DEPARTURE_ID'
					, value4 : param[i]['itemDepartureId']
					, colId5 : 'IO_TIME'
					, value5 : param[i]['cancelDate']
					, colId6 : 'CANCEL_QTY'
					, value6 : param[i]['remainQty']
					, colId7 : 'DESCRIPTION'
					, value7 : param[i]['description']	
				};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'inputCancelBtn1' && indexInfo['sequence'] == 3) {
			this.initParam = {menuId : this.menuId, tableId : this.tableId};
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		var that = this;
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e){ 
			if(e.dataField == 'cancelDate') { 
				if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});					
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value);
				} 
			}
			
			return e.value; 
		}); 
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
			
			momWidget.specPrint('MOMCC003_1'
				, 'purchase.materialLedger.materialInputStatus.materialInputExcelPrintCount'
				, 'purchase.materialLedger.materialInputStatus.materialInputExcelPrint'
				, 'itemInputId'
				, 'dummy'
				, 'dummy'
				, param
				, Language.lang['MESSAGES11464']
			);
		});
    }
};

$(document).ready(function(event){
	MOMCC003_1.menuCode = momWidget.getSearchParam()['ctrType'];
	if(MOMCC003_1.menuCode == 'SAVE') {
		MOMCC003_1.menuId = 'MOMCC011';
	}
	
	console.log(MOMCC003_1.menuCode + ', ' + MOMCC003_1.menuId);
	momWidget.init(1, MOMCC003_1.menuId + '_1', MOMCC003_1);
	MOMCC003_1.init();
});