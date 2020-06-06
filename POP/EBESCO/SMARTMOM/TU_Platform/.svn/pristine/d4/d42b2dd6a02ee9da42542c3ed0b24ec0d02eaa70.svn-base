var MOMIA002_1 = {
	initMessage		: undefined,
	initParam		: undefined,
	
	resourceGroupCd	: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		momWidget.splitter('.tabcontentarea', 'vertical', 400);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			this.initParam = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		if(result != 'SUCCESS') {
			if(index == 1) {
				this.initParam = undefined;
			}
			
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		if(index == 0) {
			var that = this;
			var param = AUIGrid.getGridData(momWidget.grid[index])[0];
			momWidget.findBtnClicked(1, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[index+1], data);
				AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
				that.resourceGroupCd = data[0]['resourceGroupCd'];
			});
		} else {
			this.initParam = undefined;
		}
		
		momWidget.splashHide();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			var that = this.init != undefined ? this : this.MOMIA002_1;
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length < 1) { 
				that.initMessage = Language.lang['MESSAGES10683'];			
				return; 
			}
			
			$('#resourceGroupCdEP2').val(this.resourceGroupCd);
		}
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.resourceGroupCd = item['resourceGroupCd'];
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIA002_1', MOMIA002_1);
	momWidget.init(2, 'MOMIA002_1', MOMIA002_1);
	
	MOMIA002_1.init();
});