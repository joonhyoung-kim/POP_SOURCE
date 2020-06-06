var MOMLC001 = {
	initCount : undefined,
	initMessage : undefined,
	initParam : undefined,
	param : undefined,
	editFlag : undefined,
	init: function() {	
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		that.design();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn1') {
			editFlag = false;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'editBtn1') {
			editFlag = true;
		}
		
	}, saveCallInit(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo['op'] == 'saveBtnEP1') {
			if(editFlag == false) {
				var param;
				mom_ajax('R', 'equipment.equipmentWoCreate.equipmentWoId', {eqmType: param.eqmType, planStartDate: param.planStartDate}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data != undefined) {
						param = {eqmWoId : data[0].eqmWoId};
					}
				}, undefined, undefined, this, 'sync');
			}
			
			this.initParam = param;
		}
		
//		if(index == 2 && indexInfo['op'] == 'saveBtn3') { 
//			if($('#startDateEP3').val() != '' && $('#endDateEP3').val() != '' && ($('#startDateEP3').val() > $('#endDateEP3').val())) {
//				this.initMessage = Language.lang['MESSAGES10785'];
//				return;
//			}
//			var grid3Data = AUIGrid.getGridData(momWidget.grid[2]);
//			
//			if(grid3Data.length == 0) {
//				this.initMessage = Language.lang['MESSAGES12226'];
//				return;
//			}
//			
//			var param = {
//					eqmType: $('#woTypeEP3').val(),
//					eqmWoId: $('#woIdEP3').val() || this.eqmWoId,
//					eqmWoName: $('#woNameEP3').val(),
//					equipmentCd: $('#equipmentCdEP3').val(),
//					planStartDate: $('#startDateEP3').val(),
//					planEndDate: $('#endDateEP3').val(),
//					eqmQty: $('#planQtyEP3').val(),
//					reasonCode: $('#reasonCodeEP3').val(),
//					description: $('#dsssescriptionEP3').val(),
//					eqmStatus : 'R'
//			};
//			
//			for(var i = 0; i < grid3Data.length; i++) {
//				grid3Data[i].eqmWoId = this.eqmWoId;
//				grid3Data[i].requestType = 'R';
//			}
//			
//			this.initParam = param;
//			this.param = grid3Data;
//		}
//		if(indexInfo['op'] == 'modalEditBtn3' && indexInfo['sequence'] == 2) {
//			var grid3Data = AUIGrid.getGridData(momWidget.grid[2]);
//			
//			var newCnt = 0;
//			var newArray = [];
//			for(var i = 0; i < grid3Data.length; i++) {
//				if(grid3Data[i]['NEW'] == 'Y') {
//					newArray.push(grid3Data[i]);
//					newCnt++;
//				}
//			}
//			
//			if(newCnt > 0) {
//				this.param = newArray;
//			} else {
//				this.param = undefined;
//				this.initMessage = 'RET';
//			}
//		} 
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && (indexInfo['op'] == 'findBtn1' || indexInfo['op'] == 'saveBtnEP1' || indexInfo['op'] == 'saveBtnEX1')) {
			
			AUIGrid.setGridData(momWidget.grid[0], data);

			AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
				if(e['dataField'] == 'cancelDate') { 
					if(e['item']['status'] == 'F' || e['item']['status'] == 'C') {
						return false;
					}
				}
			});
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'cancelDate', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(item['status'] == 'R') {
						return 'columnStyle';
					}
				}
			});
			
		}
		if(indexInfo != undefined && indexInfo['op'] == 'actBtn1' && indexInfo['sequence'] == 4) {
			if(result != 'SUCCESS') {
				momWidget.splashHide();
				return;
			}
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1') {
			if(result != 'SUCCESS') {
				momWidget.splashHide();
				return;
			}
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		momWidget.splashHide();
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'cancelBtn1') {
			var checkedGrid = AUIGrid.getCheckedRowItems(momWidget.grid[index])
			for(var i = 0; i < checkedGrid.length; i++) {
				if(checkedGrid[i]['item']['status'] == 'C') {
					this.initMessage = Language.lang['MESSAGES11006'];
				}
				
				if(checkedGrid[i]['item']['status'] == 'F') {
					this.initMessage = Language.lang['MESSAGES11160'];
					return;
				}
				if(checkedGrid[i]['item']['cancelDate'] == '' || checkedGrid[i]['item']['cancelDate'] == null) {
					this.initMessage = Language.lang['MESSAGES11485'];
				}
				
			}
		}
		if(indexInfo != undefined && (indexInfo['op'] == 'actBtn1' && indexInfo['sequence'] == 1)) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i].status != 'R') {
					this.initMessage = Language.lang['MESSAGES12234'];
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
	momWidget.init(1, 'MOMLC001', MOMLC001);
	MOMLC001.init();
});