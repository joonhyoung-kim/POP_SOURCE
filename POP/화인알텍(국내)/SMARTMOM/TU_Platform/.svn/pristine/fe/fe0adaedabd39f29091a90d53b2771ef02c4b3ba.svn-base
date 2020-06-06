var userId = sessionStorage.getItem('userId');
var masterSmtpIdr;

var MOMXX010 = {
	initParam : undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.splitter('.h01-h', 'vertical', '50%');
			that.event();
		});
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			AUIGrid.clearGridData(momWidget.grid[1]);
		}
	}, delCallBack1: function(index, param, callbackParam, indexInfo) {
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		if(index == 0) {
			// 삭제 시
			if(indexInfo.op == 'delBtn1') {
				var checkedRowItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				this.initParam = undefined;
				
				for(var i=0; i<checkedRowItems.length; i++) {
					if(checkedRowItems[i].item.updateBy != userId) {
						momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12181']});
						this.initParam = 'Y';
						return;
					}
				}
			}
		}
	}, event : function() {
		var that = this;
		momWidget.isInitGrid(1, function() {
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'sendPwd', {
				labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
					var asterisks = '';
					for(var i=0, len=value.length; i<len; i++) {
						asterisks += '*';
					}
					return asterisks;
				}
		 	});
			
			AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(event) {
				if(event.item.updateBy != undefined && event.item.updateBy != userId) {
					return false;
				}
			});
			
			// 좌측 그리드 행추가 시
			$(document).on('click', '#cAddBtn1', function() {
				AUIGrid.setProp(momWidget.grid[0], {'editable' : true});
				var getGridData = AUIGrid.getGridData(momWidget.grid[0]);
				if(getGridData.length > 0) {
					for(var i=0; i<getGridData.length; i++) {
						if(i+1 == getGridData.length) {
							if(Number(getGridData[i].smtpId.substring(4, 7)) > 0 && Number(getGridData[i].smtpId.substring(4, 7) < 9)) {
								masterSmtpId = 'SMTP00' + (Number(getGridData[i].smtpId.substring(4, 7)) + 1);
							} else if(Number(getGridData[i].smtpId.substring(4, 7)) >= 9 && Number(getGridData[i].smtpId.substring(4, 7)) < 99) {
								masterSmtpId = 'SMTP0' + (Number(getGridData[i].smtpId.substring(4, 7)) + 1);
							} else if(Number(getGridData[i].smtpId.substring(4, 7)) >= 99) {
								masterSmtpId = 'SMTP' + (Number(getGridData[i].smtpId.substring(4, 7)) + 1);
							}
						}
					}
				} else {
					masterSmtpId = 'SMTP001';
				}
				
				var newRow1 = {
					smtpId : masterSmtpId,
					addFlag : 'Y'
				};
				AUIGrid.addRow(momWidget.grid[0], newRow1, 'last');
			});
			
			// 우측 그리드 행추가 시
			$(document).on('click', '#cAddBtn2', function() {
				var masterGrid = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				
				if(masterGrid.length == 1) {
					var newRow2 = {
						smtpId : masterGrid[0].item.smtpId,
						addFlag : 'Y'
					};
					AUIGrid.addRow(momWidget.grid[1], newRow2, 'last');
				} else {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11604']});
					return;
				}
			});
			
			$(document).on('click', '#choiceBtn1', function() {
				var checkedItems =  AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				if(checkedItems.length <= 0) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11335']});
					return;
				}
				
				if(checkedItems.length > 1) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11604']});
					return;
				}
				
				momWidget.splashShow();
				
				mom_ajax('R', 'smtp.smtpdetail', {smtpId: checkedItems[0].item.smtpId}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					
					AUIGrid.setGridData(momWidget.grid[1], data);
					that.initCount = data.length;					
				}, undefined, undefined, that, 'sync');
				
				setTimeout(function() {
					momWidget.splashHide();
				}, 40 * 4);
			});
 		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMXX010', MOMXX010);
	momWidget.init(2, 'MOMXX010');
	MOMXX010.init();
});
