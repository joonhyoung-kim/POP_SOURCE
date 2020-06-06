var MOMCB002_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	empAuthority	: undefined,
	vendorCd		: undefined,
	
	menuId			: undefined,
	menuCode 		: undefined,
	tableId 		: 'MOM_MATERIAL_DEPARTURE',
	
	endPeriod		: undefined,
	
	strHearderDate	: undefined,
	strHearderQty 	: undefined,
	strTitle	  	: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
    }, loadCallInit: function() {
    	var that = this;
    	momWidget.isInitGrid(0, function() {
    		momWidget.isInitGrid(2, function() {
    			that.grid();
    		});
		});
    }, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
    	if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
    		if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];				
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			} else if(this.empAuthority <= 5 && this.vendorCd == '') {
				this.initMessage = Language.lang['MESSAGES10570'];
				return;
			}
			
			this.initParam = {menuCode: this.menuCode};
    	} else if(indexInfo != undefined && indexInfo['op'] == 'deliveryCancelBtn1' && indexInfo['sequence'] == 4) {
			this.initParam = {menuCode : this.menuCode};
		}
    }, delCallInit: function(index, param, callBackParam, indexInfo) {
    	if(indexInfo != undefined && indexInfo['op'] == 'deliveryCancelBtn1' && indexInfo['sequence'] == 1) {
	    	for(var i = 0; i < callBackParam.length; i++) {
	    		if(callBackParam[i]['departureState'] == 'CANCEL') {
	    			this.initMessage = Language.lang['MESSAGES11006'];					
					return;
	    		}
	    		
	    		if(callBackParam[i]['departureState'] == 'CHECK_FAIL') {
	    			this.initMessage = Language.lang['MESSAGES12451'];					
					return;
	    		}
	    		
				if(to_date_yyyy_mm_dd(callBackParam[i]['departureDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10000' + '@' + this.strHearderDate + '@' + this.endPeriod);					
					return;
				}
			}
	    	
	    	this.initMessage = 'CLEAR_PARAM';
	    	this.initParam = {menuId : this.menuId, tableId : this.tableId};
    	}
    }, saveCallInit: function(index, param, callBackParam, indexInfo) {
    	if(indexInfo != undefined && indexInfo['op'] == 'deliveryCancelBtn1' && indexInfo['sequence'] == 2) {
			for(var i = param.length - 1; i >= 0; i--) {
				param[i] = {
						  menuId : this.menuId
						, tableId: this.tableId
						, colId1 : 'MATERIAL_ORDER_ID'
						, value1 : param[i]['materialOrderId']
						, colId2 : 'MATERIAL_DEPARTURE_ID'
						, value2 : param[i]['materialDepartureId']
						, colId3 : 'DEPARTURE_STATE'
						, value3 : param[i]['departureState']
						, colId4 : 'CANCEL_QTY'
						, value4 : param[i]['departureQty']	
				};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'deliveryCancelBtn1' && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
	    	this.initParam = {menuId : this.menuId, tableId : this.tableId};
		}
    }, grid: function() {
    	this.menuCode = momWidget.getSearchParam()['menuCode'];
    	this.empAuthority 	= sessionStorage.getItem('empAuthority');
    	this.vendorCd 		= sessionStorage.getItem('vendorCd');
    	
    	if(this.menuCode == 'DEPT') {
        	this.menuId = 'MOMCB002';
        	this.strTitle = Language.lang['MESSAGES11402'];
        	
        	this.strHearderQty = Language.lang['MESSAGES11409'];
    		this.strHearderDate = Language.lang['MESSAGES11413'];
    	} else {
    		this.menuId = 'MOMCC010';
    		this.strTitle = Language.lang['MESSAGES11033'];
    		
    		this.strHearderQty = Language.lang['MESSAGES11035'];
    		this.strHearderDate = Language.lang['MESSAGES11036'];
    		
			$('#searchDate').text(Language.lang['MESSAGES11036']);
			$('#deliveryPresentConditionList').text(Language.lang['MESSAGES11039']);
			$('#deliveryCancelBtn1 .textblock').text(Language.lang['MESSAGES11038']);
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'departureQty', { headerText: this.strHearderQty });
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'departureDate', { headerText: this.strHearderDate });
    	}
    	
        momWidget.setEndPeriod(this.menuId, this);
        
    	if(this.menuCode == 'DEPT') {
    		momWidget.addFileColumn(0, 2, 17, 'MOMCB001', 'materialOrderId');
    	}
    }, event: function() {
    	var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems == undefined || checkedItems.length < 1) { 
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
			momWidget.specPrint('MOMCB002'
				, 'purchase.supplier.deliveryPresentCondition.deliveryPrintStatusCount'
				, 'purchase.supplier.deliveryPresentCondition.deliveryPrintStatus'
				, 'departureGroupId'
				, 'menuCode'
				, that.menuCode
				, param
				, Language.lang['MESSAGES11461']
			);
		});
    }
};
		
$(document).ready(function(event) {
       momWidget.init(1, 'MOMCB002_1', MOMCB002_1);
       momWidget.init(3, 'MOMCB002_1', MOMCB002_1);
   	
       MOMCB002_1.init();
});