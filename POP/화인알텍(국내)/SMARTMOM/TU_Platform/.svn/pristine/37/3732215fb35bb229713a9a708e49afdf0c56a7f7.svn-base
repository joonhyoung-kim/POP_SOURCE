var MOMCC001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	menuId		: 'MOMCC001',
	
	endPeriod	: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
		momWidget.splitter('.h03-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
			});
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'inputBtn2' && indexInfo['sequence'] == 4) {
			AUIGrid.removeCheckedRows(momWidget.grid[1]);
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'inputBtn2' && indexInfo['sequence'] == 1) {
			if(callBackParam.length <= 0 ){
				this.initMessage = Language.lang['MESSAGES11068'];				
				return;
			}
			
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['freeOfferFlag'] == 'N') {
					if(callBackParam[i]['unitPrice'] <= 0) {
						this.initMessage = Language.lang['MESSAGES10976'];
						return;
					} else if(to_date_yyyy_mm_dd(callBackParam[i]['deliveryDate']) <= this.endPeriod) {
						this.initMessage = Language.getLang('MESSAGES11056' + '@' + this.endPeriod);
						return;
					}
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['deliveryDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11056' + '@' + this.endPeriod);					
					return;
				}
			}	
			
			this.initMessage = 'CLEAR_PARAM';
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'inputBtn2' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param['seq'] = i + 1;
			}
		}
	}, grid: function() {
		var that = this;
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
	        if(e.dataField == 'deliveryDate') {	// 달력 지정한 필드인 경우 
	        	if(to_date_yyyy_mm_dd(e.value) <= that.endPeriod) { 
	        		momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});		                
	        		return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value); 
                } 
	        } else if(e.dataField == 'inputQty') {
				AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'conversionUnitQty', e.value * e.item.originConversionUnitQty);
			}
	        
	        return e.value; 
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			 var item = AUIGrid.getGridData(momWidget.grid[1]);
			 if(item[e.rowIndex]['departureFlag'] != 'N' || item[e.rowIndex]['iqcFlag'] != 'N') {
				 if(e.dataField == 'inputQty') {
					 return false;
				 }
				 
				 return true;
			 }
		});
		 
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			 if(e.dataField == 'locationCd') {
				 var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
				 var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
				 for(var i = e.rowIndex + 1; i < grid2length; i++) {
					 AUIGrid.setCellValue(momWidget.grid[1], i, 'locationCd', item.locationCd);
				 }
			 }
		});
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function(e) {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0 ) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11179']});
				return;
			}
			
			//상단그리드 안에서 중복체크
			for(var i = 0; i  < checkedItems.length; i++) {
				if(i < checkedItems.length - 1) {
					if(checkedItems[i].item['vendorCd'] != checkedItems[i+1].item['vendorCd']) {
						momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10641']});
						return;
					} 
				} 
			}
			
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			for(var i = 0; i  < checkedItems.length; i++) {
				if(checkedItems[i]['item']['orderFlag'] == 'M') {			// 발주구분이 자재발주일 경우
					facilityType = "'FAC200'";
					break;
				} else if(checkedItems[i]['item']['orderFlag'] == 'P') {	// 발주구분이 외주발주일 경우
					facilityType = "'FAC300'";
					break;
				}
			}
			
			mom_ajax('R', 'common.specifyFacility', {facilityClassCd: 'AREA', facilityType: facilityType}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				momWidget.setFilterPropByDropDown('toLocation', undefined, data);
				momWidget.setColumnPropByDropDown(1, 'locationCd', undefined, data);
			}, undefined, undefined, this, 'sync');
			
			checkedItems.sort(function(a, b) { 			
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i  < checkedItems.length; i++) {
				var item  = checkedItems[i].item;
				var chk = true;
				
				//하단그리드와 중복체크
				for(var j = 0; j < grid2Items.length; j++) {
					if(item['vendorCd'] != grid2Items[j]['vendorCd']) {
						momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.lang['MESSAGES10340']});
						return;
					} else if(item['materialOrderId'] == grid2Items[j]['materialOrderId']) {
						chk = false;
						break;
					}
				}
				
				if(item['orderState'] == 'CHECK') {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10738']});
					return;
				}
				
				if(chk) {
					item['deliveryDate'] = get_date_diff(0);
					AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'inputQty', {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							if(item['iqcFlag'] == 'N' && item['departureFlag'] == 'N') {
								return 'columnStyle';
							} else {
								return '';
							}
						}
					});	
					
					AUIGrid.addRow(momWidget.grid[1], item, 'last');
				}
			}
		});
		
		// 하단 그리드 입고창고 콤보 변경 시
		$(document).on("change", "#toLocation", function() {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			for(var i=0; i<grid2Length; i++) {
				var toLocation = $("#toLocation").val();
				AUIGrid.setCellValue(momWidget.grid[1], i, "locationCd", toLocation);
			}
		});
		
		momWidget.clickCancelBtn2(1);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCC001_1', MOMCC001_1);
    momWidget.init(2, 'MOMCC001_1', MOMCC001_1);
    MOMCC001_1.init();
});