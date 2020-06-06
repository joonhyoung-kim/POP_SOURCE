var MOMLB001 = {
	initMessage	: undefined, 
	initParam	: undefined,
	excelParam	: {requestGroupId : undefined},
	editFlag 	: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
			});
		});
		that.event();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn1' || indexInfo['op'] == 'copyBtn1') {
			editFlag = false;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'editBtn1') {
			editFlag = true;
		}
		
	}, createCallBack: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] == 'createBtn1') {
			$("#dueDateEP1").datetimepicker({minDate : new Date()});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo['op'] == 'saveBtnEP1') {
			param.transactionSeq = 1;
		}
		if(index == 0 && indexInfo['op'] == 'saveBtnEP1') {
			if(editFlag == false) {
				var param;
				mom_ajax('R', 'equipment.emRequest.emRequestGroupId', {}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data != undefined) {
						param = {requestGroupId : data[0].requestGroupId};
					}
				}, undefined, undefined, this, 'sync');
			}
			
			this.initParam = param;
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn1') {
			var checkedGrid = AUIGrid.getCheckedRowItems(momWidget.grid[index])
			for(var i = 0; i < checkedGrid.length; i++) {
				if(checkedGrid[i]['item']['state'] != 'R') {
					this.initMessage = Language.lang['MESSAGES12233'];
				}
			}
			
		}
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
			
			momWidget.specPrint('MOMLB001'
			    , 'equipment.emRequest.emRequestExcelPrintCount'
				, 'equipment.emRequest.emRequestExcelPrint'
				, 'requestGroupId'
				, 'dummy'
				, 'dummy'
				, param
			);
		});
    	
    	$(document).on('click', '#saveBtnEX1', function() {
    		var param;
			mom_ajax('R', 'equipment.emRequest.emRequestGroupId', {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data != undefined) {
					param = {requestGroupId : data[0].requestGroupId};
				}
			}, undefined, undefined, this, 'sync');
			that.excelParam['requestGroupId'] = param.requestGroupId;
    	});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB001', MOMLB001);
	MOMLB001.init();
});