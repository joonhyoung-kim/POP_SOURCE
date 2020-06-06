var MOMHA004_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		momWidget.splitter('.h01-h', 'vertical', 600);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'detailBtn1' && indexInfo['sequence'] == 1) {
			if(callBackParam.length >  350 ) {
				this.initMessage = Language.lang['MESSAGES10590'];
			}
			
			var locationCds = '(';
			for(var i = 0; i < callBackParam.length; i++) {
				if(i == 0) {
					locationCds = "('" + callBackParam[i]['locationCd'] + "'";	
				} else {
					locationCds += (",'" + callBackParam[i]['locationCd'] + "'");
				}
			}
			locationCds += ')';
			
			this.initParam = {locationCd: locationCds, confirmMonth: $('#confirmMonth').val() || ''};
			this.initMessage = 'CLEAR_PARAM';
		} else if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			// XMOMH27 / ljw / 시설구분 검색조건 다중 체크하여 조회할 수 있도록 기능 추가
			var checkedItems = "";
			var stateList = $("#facilityType").jqxComboBox('getCheckedItems');
			$.each(stateList, function(index){
				if(stateList.length-1 != index){
					checkedItems += "'" + this.value + "',"
				} else {
					checkedItems +="'" + this.value + "'"
				}
			});
			
			this.initParam = {locationCd: $("#locationCd").val(), confirmMonth: $('#confirmMonth').val(), facilityType: checkedItems};
		} else {
			this.initParam = undefined;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(
			(indexInfo != undefined && (indexInfo['op'] == 'batchBtn1' || indexInfo['op'] == 'batchCancelBtn1') && indexInfo['sequence'] == 2) 
			||
			(indexInfo != undefined && (indexInfo['op'] == 'confirmBtn1' || indexInfo['op'] == 'confirmCancelBtn1') && indexInfo['sequence'] == 4)
		) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'batchBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {yyyymm: $('#confirmMonth').val(), cudFlag: 'C', selectFlag: 'ALL'}
		} else if(indexInfo != undefined && indexInfo['op'] == 'batchCancelBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {yyyymm: $('#confirmMonth').val(), cudFlag: 'D', selectFlag: 'ALL'}
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'confirmBtn1' || indexInfo['op'] == 'confirmCancelBtn1') && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(indexInfo['op'] == 'confirmBtn1' && callBackParam[i]['confirmFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES10363'];
					return;
				} else if(indexInfo['op'] == 'confirmCancelBtn1' && callBackParam[i]['confirmFlag'] == 'N') {
					this.initMessage = Language.lang['MESSAGES10421'];
					return;
				}
			}
			
			this.initParam = {cudFlag: (indexInfo['op'] == 'confirmBtn1' ? 'C' : 'D'), confirmMonth: $('#confirmMonth').val(), yyyymm: $('#confirmMonth').val(), selectFlag: 'SELECT'};
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMHA004_1', MOMHA004_1);
	momWidget.init(2, 'MOMHA004_1', MOMHA004_1);
	
	MOMHA004_1.init();
});