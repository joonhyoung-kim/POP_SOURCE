var MOMCA001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	menuId		: 'MOMCA001',
	
	endPeriod	: undefined,
	
	init: function() {  
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});			
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if(($('#vendorCd').val() == undefined || $('#vendorCd').val() == '') && $('#itemId').val() == '' && $('#specification').val() == '' && $('#userName').val() == '') {
				this.initMessage = Language.lang['MESSAGES10850'];
				return;
			}
			
			this.initParam = undefined;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[2], data);
			momWidget.splashHide();
			$('#listPop1').momModal('show');
			//AUIGrid.resize(momWidget.grid[2]);
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'orderBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['requestDate']) <= this.endPeriod) {
					this.initMessage = Language.lang['MESSAGES10269'];
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
		} else if(indexInfo != undefined && indexInfo['op'] == 'excelUpload1' && indexInfo['sequence'] == 1) {
			$('#excelPop1').momModal('hide');
		}
		
		this.initParam = {orderType: 'MANUAL'};
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'orderBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param['seq'] = i + 1;
				callBackParam['seq'] = i + 1;
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'orderBtn1' && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = param;
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'orderBtn1' && indexInfo['sequence'] == 3) {
			AUIGrid.removeCheckedRows(momWidget.grid[0]);
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && indexInfo['op'] == 'excelUpload1' && indexInfo['sequence'] == 3) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, grid: function() {
		var that = this;
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
	        if(e.dataField == 'requestDate') { 								// 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height:'145', html:Language.lang['MESSAGES10725']});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value);
                } 
	        }
	        
	        return e.value; 
		}); 
	}, event: function() {
		$(document).on('click', '#actCancelBtn3, #cancelBtnEX1, .bntpopclose', function() {
			$('#excelPop1').momModal('hide');
			$('#listPop1').momModal('hide');
		});
		
		$(document).on('click', '#actCreateBtn3', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
			for(var i = 0; i < checkedItems.length; i++) {
				AUIGrid.addRow(momWidget.grid[0], checkedItems[i].item, 'last');
			}
			
			$('#listPop1').momModal('hide');
		});
		
		momWidget.clickCancelBtn2(0);
		
		$(document).on('change', '#toLocation', function() {
			var length = AUIGrid.getGridData(momWidget.grid[0]).length;
			for(var i = 0; i < length; i++) {
				AUIGrid.setCellValue(momWidget.grid[0], i, 'inLocationId', $('#toLocation').val());
			}
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMCA001_1', MOMCA001_1);
	momWidget.init(3, 'MOMCA001_1', MOMCA001_1);
	MOMCA001_1.init();
});