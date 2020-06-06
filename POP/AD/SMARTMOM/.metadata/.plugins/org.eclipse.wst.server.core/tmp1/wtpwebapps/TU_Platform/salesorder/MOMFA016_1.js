var MOMFA016_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	menuId			: 'MOMFA016',
	
	endPeriod		: undefined,
	allowMinusQty	: undefined,
	facilityType 	: '',
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			that.initParam = {facilityType: that.facilityType};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 4) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['exShippingQty'] == '0' || callBackParam[i]['exShippingQty'] == '' ) {
					this.initMessage = Language.lang['MESSAGES11383'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['exShippingDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11394' + '@' + this.endPeriod);
					return;
				} else if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['currentQty'] >= 0) {
						if(callBackParam[i]['currentQty'] < callBackParam[i]['exShippingQty']) {
							this.initMessage = Language.lang['MESSAGES11615'];
							return;
						}
					} else {
						this.initMessage = Language.lang['MESSAGES10914'];
						return;
					}
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < callBackParam.length; i++) {
				param[i]['orderSeq'] = i;
			}
		}
	}, grid: function() {
		var that = this;
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e){ 
			if(e.dataField == 'exShippingDate') {	 // 달력 지정한 필드인 경우 
				if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		}); 
		
		mom_ajax('R', 'common.comCode', {codeClassId: 'EXCEPTION_OUT_FLAG'}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'exceptionFlag', {
				style: 'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item ) { 
					var retStr = value;
					for(var i = 0; i < data.length; i++) {
						if(data[i]['code'] == value) {
							retStr = data[i]['name'];
							break;
						}
					}
					
					return retStr;
				}, editRenderer : {
					type: 'DropDownListRenderer',
					list: data, 
					keyField: 'code', 
					valueField: 'name' 							
				}
		 	});
		}, undefined, undefined, this, 'sync');
		
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		mom_ajax('R', 'common.comCode', {codeClassId: 'FACILITY_TYPE', attribute25 : "Y"}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			for(var i = 0; i < data.length; i++) {
				if(data.length - 1 > i) {
					that.facilityType += "'" + data[i].code + "',";
				} else {
					that.facilityType += "'" + data[i].code + "'";
				}
			}
		}, undefined, undefined, this, 'sync');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA016_1', MOMFA016_1);
	MOMFA016_1.init();
});