var MOMEA014_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	returnType			: 'P',
	tnxType				: 'CANCEL',
	
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
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelDate'] != undefined && callBackParam[i]['cancelDate'] != '') {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10439' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {itemRtnType: this.returnType, rtnType: this.returnType, tnxType: this.tnxType};
			this.initMessage = 'CLEAR_PARAM';
		}
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMEA014_1', MOMEA014_1);
	MOMEA014_1.init();
});