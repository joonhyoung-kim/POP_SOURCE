var MOMLB004 = {
	initMessage	: undefined, 
	initParam	: undefined,
	menuId		: 'MOMLB004',
	endPeriod	: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		that.event();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'inputBtn1' && indexInfo['sequence'] == 1) {
			var checkedGrid = AUIGrid.getCheckedRowItems(momWidget.grid[index])
			var arrayList = [];
			for(var i = 0; i < checkedGrid.length; i++) {
				if(checkedGrid[i].item.locationCd == '') {
					this.initMessage = Language.lang['MESSAGES11062'];
				}
				
				if(checkedGrid[i].item.unitPrice == '' || checkedGrid[i].item.unitPrice == 0) {
					this.initMessage = Language.lang['MESSAGES10296'];
				}
				
				if(checkedGrid[i].item.inputQty == '' || checkedGrid[i].item.inputQty <= 0) {
					this.initMessage = Language.lang['MESSAGES12243'];
				}
				
				checkedGrid[i].item.transSeq = i + 1;
			}
			
			mom_ajax('R', 'equipment.equipmentMaterialInput.eqmInputGroupId', {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data != undefined) {
					for(var i = 0; i < checkedGrid.length; i++) {
						checkedGrid[i].item.eqmInputGroupId = data[0].eqmInputGroupId;
						arrayList.push(checkedGrid[i].item);
					}
				}
			}, undefined, undefined, this, 'sync');
			
			this.initParam = arrayList;
		}
	}, grid: function() {
		var that = this;
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
	        if(e['dataField'] == 'deliveryDate') { 								// 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value);
                } 
	        }
	        
	        if(e['dataField'] == 'inputQty') {
	        	if(e['value'] > e['item']['remainQty']) {
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES12242']});
	                return e.oldValue; 
	        		}
	        }
	        
	        return e.value; 
		});
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) {
			if(e['dataField'] == 'inputQty') {
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'conversionUnitQty', e['item']['inputQty'] * e['item']['itemConversionUnitQty']);
			}
			
			if(e['dataField'] == 'deliveryDate') {
				var param = {
						vendorCd : e['item']['vendorCd'],
						itemId :  e['item']['itemId'],
						marketCd : e['item']['marketCd'],
						currencyCd : e['item']['currencyCd'],
						stateTime : e['item']['deliveryDate']
				}
			
				mom_ajax('R', 'common.comItemInPrice', param, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data.length != 0) {
						AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', data[0].unitPrice);
					} else {
						AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', '0');
					}
				}, undefined, undefined, this, 'sync');
			}
		});
	}, event: function() {
		// 입고창고 콤보 변경
		$(document).on('change', '#toLocationCd', function() {
			var checkedGrid = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			for(var i = 0; i < checkedGrid.length; i++) {
				var toLocation = $('#toLocationCd').val();
				AUIGrid.setCellValue(momWidget.grid[0], checkedGrid[i].rowIndex, 'locationCd', toLocation);
			}
		});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB004', MOMLB004);
	MOMLB004.init();
});