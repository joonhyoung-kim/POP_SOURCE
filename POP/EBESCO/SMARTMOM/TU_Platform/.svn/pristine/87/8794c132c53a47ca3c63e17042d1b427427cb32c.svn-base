var MOMLD002 = {
	initMessage		: undefined,
	initParam		: undefined,
	saveFlag		: undefined, 
	init: function() {	
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.design();
			});
		});
		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			var saveFlag;
			mom_ajax('R', 'equipment.equipmentCheck.equipmentCheckCnt', {equipmentCd: $('#equipmentCd').val(), yyyymm: $('#yyyymm').val()}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				} 
				if(data[0].count == 0) {
					that.saveFlag = 'N';
				} else {
					that.saveFlag = 'Y';
				}
			}, undefined, undefined, that, 'sync');
			that.initParam = {saveFlag: that.saveFlag, equipmentCd: $('#equipmentCd').val(), yyyymm: $('#yyyymm').val()};
		} else if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEX1') {
			that.saveFlag = 'Y';
			that.initParam['saveFlag'] = that.saveFlag;
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			that.grid(data);
			AUIGrid.setGridData(momWidget.grid[0], data);
		} else  if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEX1') {
			if(result != 'SUCCESS') {
				if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
					that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
				} else {
					momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
				}
			} else {
				AUIGrid.setGridData(momWidget.grid[0], data);
				that.grid(data);
				
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}
			
			/*var param1 = {saveFlag: 'Y', equipmentCd: $('#equipmentCd').val(), yyyymm: $('#yyyymm').val()}
			momWidget.findBtnClicked(0, false, param1, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				AUIGrid.setGridData(momWidget.grid[0], data1);
				that.grid(data1);
			});
			
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});*/
		}
		
		momWidget.splashHide();
	}, saveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		var today = get_current_date('yyyy-mm-dd');
		var todayYM = today.substring(0,7);
		todayYM = todayYM.replace('-','');
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveAllBtn1') {
			if($('#yyyymm').val() != todayYM) {
				that.initMessage = Language.lang['MESSAGES12300'];			
				return; 
			}
			var department = sessionStorage.getItem('deptCd') == 'null' ? '' : sessionStorage.getItem('deptCd');
			that.initParam = {
					equipmentCd: $('#equipmentCd').val(), 
					yyyymm: $('#yyyymm').val(),
					controlNumber: $('#equipmentCd').val(),
					department: department
					};
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveAllBtn1') {
			var param1 = {saveFlag: 'Y', equipmentCd: $('#equipmentCd').val(), yyyymm: $('#yyyymm').val()}
			momWidget.findBtnClicked(0, false, param1, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				that.grid(data1);
				
				AUIGrid.setGridData(momWidget.grid[0], data1);
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			});
		}
		momWidget.splashHide();
	}, grid: function(data){
		var that = this;
		var today = get_current_date('yyyy-mm-dd');
		var todayD = Number(today.substring(8,11));
		var todayYM = today.substring(0,7);
		todayYM = todayYM.replace('-','');
		
		$('#checker').val('');
		$('#deptNo').val('');
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) {
			var dataField = e.dataField;
			var idx = [8, 15, 22, 29, 32];
			if(e.item.cycleType == 'WEK') { //주단위
				if((dataField.length == 2 || dataField.length == 3)  && dataField.charAt(0) == 'd') {
					if(Number(dataField.replace('d','')) < 8) {
						for(var i = 1; i < 8; i++) {
							AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);				
						}
					} else if(Number(dataField.replace('d','')) < 15) {
						for(var i = 8; i < 15; i++) {
							AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);				
						}
					} else if(Number(dataField.replace('d','')) < 22) {
						for(var i = 15; i < 22; i++) {
							AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);				
						}
					} else if(Number(dataField.replace('d','')) < 29) {
						for(var i = 22; i < 29; i++) {
							AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);				
						}
					} else {
						for(var i = 29; i < 32; i++) {
							AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);				
						}
					}
				} 
			}
			
			if(e.item.cycleType == 'MON') { //월단위
				if((dataField.length == 2 || dataField.length == 3)  && dataField.charAt(0) == 'd') {
					for(var i = 1; i < 32; i++) {
						AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'd'+ i, e.value);	
					}
				}
			}
		});
		
		mom_ajax('R', 'common.comCode', {codeClassId: 'EQM_CHECK_STATE'}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			for(var i = 1; i < 32; i++) {
				AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'd' + i, {
					labelFunction: function(rowIndex, columnIndex, value, item) { 
						var retStr = '';
						for(var j = 0; j < data.length; j++) {
							if(data[j]['code'] == value) {
								retStr = data[j]['name'];
								break;							
							}
						}
						return retStr == '' ? value : retStr;
					}, editRenderer: {
						type: 'ComboBoxRenderer',
						list: data,
						showEditorBtnOver: true,
						keyField: 'code', 
						valueField: 'name'
					}
				});
			}
		}, undefined, undefined, this, 'sync');
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			var dataField = e.dataField;
			if($('#yyyymm').val() == todayYM) {
				if((dataField.charAt(0) == 'd' && (Number(dataField.substring(1,3)) == todayD)) || dataField == 'description'){
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		});
		
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'd' + todayD, {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if($('#yyyymm').val() == todayYM) {
					return 'columnStyle';
				} else {
					return '';
				}
			}
		});	
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'description', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if($('#yyyymm').val() == todayYM) {
					return 'columnStyle';
				} else {
					return '';
				}
			}
		});	
		
		var checker = data[0] == undefined ? '' : data[0].checker;
		mom_ajax('R', 'equipment.equipmentCheck.user', {checker: checker}, function(result1, data1) {
			if(result1 != 'SUCCESS') {
				return;
			} 
			if(data1.length != 0) {
				$('#checker').val(data1[0].name);
				$('#deptNo').val(data1[0].deptName);
			} else {
				$('#checker').val();
				$('#deptNo').val();
			}
		}, undefined, undefined, that, 'sync');
		
		
		$('#deptNo, #checker').attr('readonly','readonly');
		
	}, design : function() {
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
	}, excelUpCallInit: function(index, data, callBackParam, indexInfo) {
		this.initParam = {equipmentCd: $('#equipmentCd').val(), yyyymm: $('#yyyymm').val()};
	}, excelUpInit: function() {
		if($('#equipmentCd').val() == '' || $('#equipmentCd').val() == undefined || $('#equipmentCd').val() == null) {
			this.initMessage = Language.lang['MESSAGES12301'];			
			return; 
		}
		if($('#yyyymm').val() == '' || $('#yyyymm').val() == undefined || $('#yyyymm').val() == null) {
			this.initMessage = Language.lang['MESSAGES12302'];			
			return; 
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLD002', MOMLD002);
	
	MOMLD002.init();
});