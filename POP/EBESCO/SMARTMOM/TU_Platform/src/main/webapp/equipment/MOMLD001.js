var MOMLD001 = {
	initMessage		: undefined,
	initParam		: undefined,
	cudFlag			: undefined,
	
	equipmentCd	: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		momWidget.splitter('.tabcontentarea', 'vertical', 400);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(indexInfo['op'] == 'INIT1') {
			this.initParam = {codeClassId: 'EQUIPMENT_TYPE'};
		}
		if(index == 1) {
			this.initParam = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		if(index == 0) {
			var that = this;
			var param = AUIGrid.getGridData(momWidget.grid[index])[0];
			momWidget.findBtnClicked(1, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[index+1], data);
					AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
					that.equipmentType = data[0]['equipmentType'];
				} else {
					AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
					var selectedItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
					that.equipmentType = selectedItems[0].item.code;
				}
			});
		}
		
		momWidget.splashHide();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			var that = this.init != undefined ? this : this.MOMLD001;
			if(indexInfo['op'] == 'editBtn2') {
				that.cudFlag = 'U';
			} else if(indexInfo['op'] == 'createBtn2' || indexInfo['op'] == 'copyBtn2') {
				that.cudFlag = 'C';
			}
			
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length < 1) { 
				that.initMessage = Language.lang['MESSAGES10683'];			
				return; 
			}
			
			$('#equipmentTypeEP2').val(this.equipmentType);
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this.init != undefined ? this : this.MOMLD001;
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP2') {
			if(this.cudFlag == 'C') {
				mom_ajax('R', 'common.comSequence', {}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					} 
					that.initParam = {checkSeq: data[0].sequence};
				}, undefined, undefined, that, 'sync');
			}
		}
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.equipmentType = item['code'];
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLD001', MOMLD001);
	momWidget.init(2, 'MOMLD001', MOMLD001);
	
	MOMLD001.init();
});