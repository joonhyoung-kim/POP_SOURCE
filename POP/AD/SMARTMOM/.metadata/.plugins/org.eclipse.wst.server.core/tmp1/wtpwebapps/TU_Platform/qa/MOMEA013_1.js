var MOMEA013_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	menuId				: 'MOMEA013',
	returnType			: 'M',
	tnxType				: 'CANCEL',
	
	endPeriod			: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
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
			}
		}
	}/*, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'returnCancelBtn1' && indexInfo['sequence'] == 4) {
			momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
		}
	}*/, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnCancelBtn1' && indexInfo['sequence'] == 3) {
			this.initParam = {rtnType: this.returnType, tnxType: this.tnxType};
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelDate'] != undefined && callBackParam[i]['cancelDate'] != '') {
					this.initMessage =Language.lang['MESSAGES11006'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10986' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {itemRtnType: this.returnType, tnxType: this.tnxType};
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
	}
}

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA013_1', MOMEA013_1);
	MOMEA013_1.init();
});