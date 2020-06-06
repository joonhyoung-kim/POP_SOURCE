var MOMFA017_1 = {
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['cancelDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11483' + '@' + endPeriod);
					return;
				}
			}
		}
	}, grid: function() {
		var that = this;
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'cancelDate') {	 // 달력 지정한 필드인 경우 
				if(e.value <= e['item']['exShippingDate']) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang['MESSAGES11482']});
					return e.oldValue; 
				} else if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	            } else {
	            	return to_date_yyyy_mm_dd(e.value); 
				}
			}
			
			return e.value; 
		}); 
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA017_1', MOMFA017_1);
	MOMFA017_1.init();
});