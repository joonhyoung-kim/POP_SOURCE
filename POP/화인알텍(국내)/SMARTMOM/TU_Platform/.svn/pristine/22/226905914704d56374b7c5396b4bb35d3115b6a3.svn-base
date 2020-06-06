var MOMLC002 = {
	init: function() {	
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		that.design();
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);

			AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
				if(e['item']['status'] == 'C') {
					if(e['dataField'] == 'cancelDate') { 
						return false;
					}
					if(e['dataField'] == 'cancelReason') { 
						return false;
					}
				}
			});
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'cancelDate', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(item['status'] == 'A') { //작업지시 상태
						return 'columnStyle';
					}
				}
			});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'cancelReason', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(item['status'] == 'A') { //작업지시 상태
						return 'columnStyle';
					}
				}
			});
			
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'woCancelBtn1') {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		momWidget.splashHide();
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo['op'] == 'woCancelBtn1') {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i].status == 'C') {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				}
				
				if(callBackParam[i].resultQty != '' && callBackParam[i].resultQty > 0) {
					this.initMessage = Language.lang['MESSAGES12232'];
					return;
				}
				
				if(callBackParam[i].cancelDate != '' && callBackParam[i].cancelDate == null) {
					this.initMessage = Language.lang['MESSAGES11485'];
					return;
				}
			}
		}
	}, grid: function() {
		momWidget.setColumnPropByCalendar(0, 'cancelDate');
	}, design: function(){
		$('head').append('<style>.columnStyle{background: #C7E8FD !important;}</style>');	
	}
	
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLC002', MOMLC002);
	MOMLC002.init();
});