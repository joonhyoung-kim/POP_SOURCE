var userId = sessionStorage.getItem('userId');
var masterSmtpIdr;

var MOMXX010 = {
	initParam : undefined,
	initMessage : undefined,
	
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
	}, saveCallInit : function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtn1') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var smtpIds = "";
			var cnt;
			for(var i=0; i<checkedItems.length; i++) {
				if(i != checkedItems.length - 1) {
					smtpIds += "'" + checkedItems[i].item.smtpId + "',";
				} else {
					smtpIds += "'" + checkedItems[i].item.smtpId + "'";
				}
			}
			
			mom_ajax('R', 'smtp.checkSmtp', {smtpIds: smtpIds}, function(result, data) {
				if(result == 'SUCCESS') {
					cnt = data[0].cnt;
				}
				
			}, undefined, undefined, this, 'sync');
			
			if(cnt > 0) {
				this.initMessage = Language.lang['MESSAGES12450'];
				return;
			}
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtn2') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.email == undefined) {
					this.initMessage = Language.lang['MESSAGES12487'];
					return;
				}
				
				if(checkedItems[i].item.vendorCd == undefined) {
					this.initMessage = Language.lang['MESSAGES12488'];
					return;
				}
			}
		}
		
	}, event : function() {
		var that = this;
		momWidget.isInitGrid(1, function() {
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'sendPwd', {
				labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
					var asterisks = '';
					if(value != undefined && value != ''){
						for(var i=0, len=value.length; i<len; i++) {
							asterisks += '*';
						}
					}
					return asterisks;
				}
		 	});
			
			AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(event) {
				if(event.item.updateBy != undefined && event.item.updateBy != userId) {
					return false;
				}
			});
			
			// 좌측 그리드 행삭제 시
			$(document).on('click', '#rDelBtn1', function() {
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				var arrayList = [];
				if(checkedItems.length > 0) {
					for(var i=checkedItems.length-1; i>=0; i--) {
						if(checkedItems[i].item.updateBy == undefined) {
							AUIGrid.removeRow(momWidget.grid[0], checkedItems[i].rowIndex);
						}
					}
					
					checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
					if(checkedItems.length > 0) {
						for(var i=0; i<checkedItems.length; i++) {
							if(checkedItems[i].item.updateBy != userId) {
								momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12181']});
								return;
							} else {
								arrayList[i] = checkedItems[i].item;
							}
						}
						
						momWidget.splashShow();
						mom_ajax('LD', 'smtp.smtp', JSON.stringify(arrayList), function(result, data) {
							if(result == 'SUCCESS') {
								momWidget.splashHide();
								mom_ajax('R', 'smtp.smtp', {}, function(result, data) {
									AUIGrid.setGridData(momWidget.grid[0], data);
									momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
								}, undefined, undefined, this, 'sync');
							} else {
								momWidget.splashHide();
								momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES10583']});
							}
						}, undefined, undefined, this, 'sync');
					}
					
				} else {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11334']});
					return;
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
			
			// 좌측 그리드 상세조회 시
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
			
			// 우측 그리드 행삭제 시
			$(document).on('click', '#rDelBtn2', function() {
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
				var arrayList = [];
				if(checkedItems.length > 0) {
					for(var i=checkedItems.length-1; i>=0; i--) {
						if(checkedItems[i].item.updateBy == undefined) {
							AUIGrid.removeRow(momWidget.grid[1], checkedItems[i].rowIndex);
						}
					}
					
					checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
					if(checkedItems.length > 0) {
						for(var i=0; i<checkedItems.length; i++) {
							arrayList[i] = checkedItems[i].item;
						}
						
						momWidget.splashShow();
						mom_ajax('LD', 'smtp.smtpdetail', JSON.stringify(arrayList), function(result, data) {
							if(result == 'SUCCESS') {
								momWidget.splashHide();
								var masterCheckedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
								mom_ajax('R', 'smtp.smtpdetail', {smtpId: masterCheckedItems[0].item.smtpId}, function(result, data) {
									AUIGrid.setGridData(momWidget.grid[1], data);
									momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
								}, undefined, undefined, this, 'sync');
							} else {
								momWidget.splashHide();
								momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES10583']});
							}
						}, undefined, undefined, this, 'sync');
					}
					
				} else {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11334']});
					return;
				}
			});
			
			// 하단 그리드 엑셀 다운로드 버튼 클릭 시
	        $(document).on("click", "#grid2ExcelDownBtn2", function() {
	        	var fileName = 'MOMXX010' + '_' + get_current_date('yyyy-mm-dd');
	            var option = {fileName: fileName};
	            option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
		            $('.aui-grid-export-progress-modal').remove();
	            }
	          
	            option.progressBar = true;
	            AUIGrid.exportToXlsx(momWidget.grid[1], option);
	       });
 		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMXX010', MOMXX010);
	momWidget.init(2, 'MOMXX010', MOMXX010);
	MOMXX010.init();
});
