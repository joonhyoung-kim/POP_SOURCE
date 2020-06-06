var MOMHA003_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
		
	init: function() {		
		Language.init(function() {
		});
		
		momWidget.splitter('.calc60', 'vertical', 400);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'detailBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {closingMonth: callBackParam[0]['magamMonth']};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && (indexInfo['op'] == 'closingBtn1' || indexInfo['op'] == 'closingCancelBtn1') && indexInfo['sequence'] == 2) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'closingBtn1' && indexInfo['sequence'] == 1) {
			if(callBackParam[0]['inFlag'] == 'Y' || callBackParam[0]['outFlag'] == 'Y') {
				this.initMessage = Language.lang['MESSAGES10381'];
				return;
			} 
			
			this.initParam = {cudFlag: 'C'};
		} else if(indexInfo != undefined && indexInfo['op'] == 'closingCancelBtn1' && indexInfo['sequence'] == 1) {
			if(callBackParam[0]['inFlag'] == 'N' || callBackParam[0]['outFlag'] == 'N') {
				this.initMessage = Language.lang['MESSAGES10379'];
				return;
			} 
			
			this.initParam = {cudFlag: 'D'};
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMHA003_1', MOMHA003_1);
	momWidget.init(2, 'MOMHA003_1', MOMHA003_1);
	
	MOMHA003_1.init();
});