var MOMCE002_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	menuId 		: 'MOMCE002',
	
	init: function() {
		var that = this;		
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		
		//this.event();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'correctBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['locationCd'] == '' || callBackParam[i]['locationCd'] == null) {
					this.initMessage = Language.lang['MESSAGES11297'];
					return;
				} else if(callBackParam[i]['stateTime'] == '' || callBackParam[i]['locationCd'] == null) {
					this.initMessage = Language.lang['MESSAGES10487'];
					return;
				} else if(callBackParam[i]['updateQty'] == '' || callBackParam[i]['locationCd'] == null) {
					this.initMessage = Language.lang['MESSAGES11185'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['stateTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10486' + '@' + this.endPeriod);
					return;
				}
			}
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		var that = this;
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e['dataField'] == 'stateTime') { // 달력 지정한 필드인 경우 
				if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		});
	}/*, event: function() {
		tuCommon.cellEditEnd(momWidget.grid[0]);
	}*/
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE002_1', MOMCE002_1);
	MOMCE002_1.init();
});