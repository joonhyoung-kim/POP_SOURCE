var MOMID005 = {
	initMessage		: undefined,
	initParam		: undefined,
	ecoNo	: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
		//momWidget.splitter('.tabcontent', 'vertical', 400);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			this.initParam = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		this.initParam = undefined;
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
					that.ecoNo = data[0]['ecoNo'];
				}
			});
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEX2') {
			if(result == 'SUCCESS') {
	   			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
	   			momWidget.splashHide();
	   			AUIGrid.setGridData(momWidget.grid[index], data);
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
	   			momWidget.splashHide();
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}
		
		momWidget.splashHide();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			var that = this.init != undefined ? this : this.MOMID005;
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems.length < 1) { 
				that.initMessage = Language.lang['MESSAGES10024'];			
				return; 
			}
			
			$('#ecoNoEP2').val(this.ecoNo);

		}
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.ecoNo = item['ecoNo'];
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
   		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP2') {
   			mom_ajax('R', 'reference.document.eco.checkItem', {itemId: $('#itemIdEP2').val()}, function(result, data) {
				if (result != 'SUCCESS' || data.length < 1) {
					return;
				} else {
					that.initParam = {ecoNo: $('#ecoNoEP2').val()};
				} 
				if(data[0].cnt == 0) {
					momWidget.messageBox({type : 'warning', width : '400', height : '145', html : Language.lang['MESSAGES12124']});
					return;
				}
   			});
	   	}		
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP2') {
    		if(result == 'SUCCESS') {
	   			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
	   			momWidget.splashHide();
	   			momWidget.findBtnClicked(1, false, {ecoNo : param[0].ecoNo}, this.retrieveCallBack());
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
	   			momWidget.splashHide();
	   		}
		} else if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
	    	if(result == 'SUCCESS') {
		   		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		   		momWidget.splashHide();
		   		momWidget.findBtnClicked(0, false, {}, this.retrieveCallBack());
		   		momWidget.findBtnClicked(1, false, {ecoNo : param[0].ecoNo}, function(result, data) {
	   				AUIGrid.setGridData(momWidget.grid[1], data);
	   			});
		   		momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
	    	} else {
	   			momWidget.splashHide();
	   		}
	    } 
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn1') {
			var checkedItems = AUIGrid.getRowCount(momWidget.grid[1]);
			
				if(checkedItems > 0) {
					that.initMessage = Language.lang['MESSAGES12407'];
					return;
				}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMID005', MOMID005);
	momWidget.init(2, 'MOMID005', MOMID005);
	MOMID005.init();
});