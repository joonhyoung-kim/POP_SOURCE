var MOMDA001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	menuId		: 'MOMDA001',
	tableId		: 'MOM_PRODUCT_ORDER',
	colId1 		: 'PRODUCT_ORDER_ID',
	cudFlag		: undefined,
	init: function() {
		Language.init(function() {
		});	
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		} 
	}/*, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && (indexInfo['op'] == 'confirmWoBtn1' || indexInfo['op'] == 'deleteWoPlanBtn1') && indexInfo['sequence'] == 4) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}*/, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo.op == 'createBtn1') {
			this.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn1') {
			this.cudFlag = 'U';
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmWoBtn1' && indexInfo['sequence'] == 1) {
			if(callBackParam.length == 0) {
				this.initMessage = Language.lang['MESSAGES11346'];
				return;
			}
			
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['planStartTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10151' + '@' + endPeriod);
					return;
				}
				if(callBackParam[i].state == 'A') {
					this.initMessage =  Language.lang['MESSAGES12195'];
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {menuId: this.menuId, tableId: this.tableId};
		} else if(indexInfo != undefined && indexInfo['op'] == 'deleteWoPlanBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['state'] == 'A') {
					this.initMessage = Language.lang['MESSAGES11160'];
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {menuId: this.menuId, tableId: this.tableId};
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmWoBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i] = {
					  productOrderId: param[i]['productOrderId']
					, priority: param[i]['priority']
					, confirmQty : param[i]['confirmQty']
					, marketCd : param[i]['marketCd']
				};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'deleteWoPlanBtn1' && indexInfo['sequence'] == 2) {
			console.log('this.colId = ' + this.colId);
			for(var i = 0; i < param.length; i++){
				param[i] = {
					  colId1 : this.colId1
					, value1 : param[i]['productOrderId']
				};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length > 0) {
				if(this.cudFlag == 'U'){
					this.initParam = {productOrderId : selectItems[0]['item']['productOrderId']}
				}
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA001_1', MOMDA001_1);
	MOMDA001_1.init();
});