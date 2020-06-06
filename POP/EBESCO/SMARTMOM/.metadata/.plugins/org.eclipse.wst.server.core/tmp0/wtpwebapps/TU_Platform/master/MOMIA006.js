var MOMIA006 = {
	initMessage		: undefined,
	initParam		: undefined,
	resourceGroupCd : undefined,
	resourceCd 		: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		$("#menuContent").prepend('<div id="split-left"></div>');
		$("#split-left").append($(".card.w25p.h100p.paddingr10"));
		momWidget.splitter("#split-left", "vertical", "25.5%");
		momWidget.splitter("#menuContent", "vertical", "74.5%");
	}
	, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		this.initParam = 'CLEAR_PARAM';
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		if(index == 0) {
			var param = AUIGrid.getGridData(momWidget.grid[index])[0];
			momWidget.findBtnClicked(1, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[index+1], data);
					AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
					that.resourceGroupCd = data[0]['resourceGroupCd'];
					
					mom_ajax('R', 'reference.resource.resourceByMonitor.monitor', {resourceCd: data[0].resourceCd}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							AUIGrid.clearGridData(momWidget.grid[index+2]);
							return;
						}
						
						AUIGrid.setGridData(momWidget.grid[index+2], data);
					}, undefined, undefined, this, 'sync');
				} else {
					AUIGrid.clearGridData(momWidget.grid[index+1]);
					AUIGrid.clearGridData(momWidget.grid[index+2]);
				}
			});
		} 
		
		if(index == 1) {
			var param = AUIGrid.getGridData(momWidget.grid[index])[0];
			momWidget.findBtnClicked(2, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}

				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[index+1], data);
					AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
					that.resourceCd = data[0]['resourceCd'];
				} else {
					AUIGrid.clearGridData(momWidget.grid[index+1]);
				}
			});
		}
		
		momWidget.splashHide();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(item.length > 0) {
				$("#resourceGroupCdEP2").val(item[0].item['resourceGroupCd']);
			}
		} else if(index == 2) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[1]);
			if(item.length > 0) {
				$("#resourceCdEP3").val(item[0].item['resourceCd']);
			}
		}
	}, cellClickCallInit: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(item.length > 0) {
				this.resourceGroupCd = item['resourceGroupCd'];
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
			}
		} else if(index == 1) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[1]);
			if(item.length > 0) {
				this.resourceCd = item['resourceCd'];
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIA006', MOMIA006);
	momWidget.init(2, 'MOMIA006', MOMIA006);
	momWidget.init(3, 'MOMIA006', MOMIA006);
	
	MOMIA006.init();
});