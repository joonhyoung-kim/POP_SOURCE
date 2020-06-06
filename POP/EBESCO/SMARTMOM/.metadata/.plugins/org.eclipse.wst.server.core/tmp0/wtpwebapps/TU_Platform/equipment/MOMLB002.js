var MOMLB002 = {
	initMessage	: undefined, 
	initParam	: undefined,
	moPriceBlockingFlag : undefined,
//	defaultCurrency : undefined,
	init: function() {  
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				
			});			
		});
		that.event();
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'pSaveBtn1') {
			$('#pop').momModal('hide');
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] == 'orderBtn1') {
			if(param.length == 0) {
				this.initMessage = Language.lang['MESSAGES11331'];				
				return;
			}
			
			for(var i=0; i<param.length; i++) {
				if(param[i].vendorCd == undefined) {
					this.initMessage = Language.lang['MESSAGES12237'];				
					return;
				}
				
				if(param[i].departureVendorCd == undefined) {
					this.initMessage = Language.lang['MESSAGES12238'];				
					return;				
				}
				
				if(param[i].orderQty == undefined) {
					this.initMessage = Language.lang['MESSAGES10463'];				
					return;
				}
				
				if(param[i].dueDate == undefined) {
					this.initMessage = Language.lang['MESSAGES12239'];				
					return;
				}
				
				if(param[i].currencyCd == undefined) {
					this.initMessage = Language.lang['MESSAGES11657'];				
					return;
				}
				
				if(param[i].marketCd == undefined) {
					this.initMessage = Language.lang['MESSAGES10044'];				
					return;
				}
				
				if(moPriceBlockingFlag == 'Y') {
	    			if(param[i].unitPrice == '') {
	    				this.initMessage = Language.lang['MESSAGES10296'];				
	    				return;
	    			}
	    		}
				
				param[i].transactionSeq = i+1;
				param[i].orderGroupId = initParam;
			}
		}
		if(indexInfo != undefined && indexInfo['op'] == 'pSaveBtn1') {
			var requestGroupId = '';
			if($('#vendorEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES12237'];				
				return;
			}
			if($('#itemIdEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES11589'];				
				return;
			}
			if($('#locationEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES11062'];				
				return;
			}
			if($('#orderQtyEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES10463'];				
				return;
			}
			if($('#orderDateEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES10266'];				
				return;
			}
			if($('#currencyEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES11657'];				
				return;
			}
			if($('#marketEP1').val() == '') {
				this.initMessage = Language.lang['MESSAGES10044'];				
				return;
			}
//			if($('#unitPriceEP1').val() == '' || $('#unitPriceEP1').val() == '0') {
//				this.initMessage = Language.lang['MESSAGES10296'];				
//				return;
//			}
			
			that.initParam = {
					vendorCd: $('#vendorEP1').val(), 
					departureVendorCd: $('#departureVendorEP1').val(), 
					itemId: $('#itemIdEP1').val(),
					locationCd: $('#locationEP1').val(),
					orderQty: $('#orderQtyEP1').val(),
					dueDate: $('#orderDateEP1').val(),
					currencyCd: $('#currencyEP1').val(),
					marketCd: $('#marketEP1').val(),
					unitPrice: $('#unitPriceEP1').val(),
					description: $('#descriptionEP1').val(),
					transactionSeq: 1};
		}
	}, grid: function() {
		var that = this;
		var data, currentDate;
		
//		mom_ajax('R', 'common.comCurrency', {}, function(result, data) {
//    		if(data.length > 0) {
//    			that.defaultCurrency = data[0].code;
//    		}
//		}, undefined, undefined, this, 'sync');
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) { 
			var gridData = AUIGrid.getGridData(momWidget.grid[0]);
			
			// 그리드 입고창고 변경 시
	        if(e.dataField == 'locationCd') {
				for(var i = 0; i < gridData.length; i++) {
					if(e.item.requestGroupId == gridData[i].requestGroupId) {
						AUIGrid.setCellValue(momWidget.grid[0], i, 'locationCd', e.value);
					}
				}
	        }
	        
	        // 그리드 발주업체 변경 시
	        if(e.dataField == 'vendorCd') {
	        	mom_ajax('R', 'common.comItemInPrice', {vendorCd: e.value, itemId: e.item.itemId, marketCd: e.item.marketCd, currencyCd: e.item.currencyCd, stateTime: e.item.dueDate}, function(result, data) {
	        		if(data.length > 0) {
	        			data = data[0].unitPrice;
	        		}
    				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', data);
    			}, undefined, undefined, this, 'sync');
	        }
	        
	        // 그리드 납기일자 변경 시
	        if(e.dataField == 'dueDate') {
	        	mom_ajax('R', 'common.comLocalDate', {}, function(result, data) {
	        		if(data.length > 0) {
	        			currentDate = data[0].currentDate;
	        		}
    			}, undefined, undefined, this, 'sync');
	        	
	        	for(var i = 0; i < gridData.length; i++) {
	        		if(e.item.requestGroupId == gridData[i].requestGroupId && to_date_yyyy_mm_dd(e.value) >= currentDate) {
	        			AUIGrid.setCellValue(momWidget.grid[0], i, 'dueDate', e.value);
	        		}
	        	}
	        	
	        	if(to_date_yyyy_mm_dd(e.value) < currentDate) {
    				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12240']});		                
    				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'dueDate', e.oldValue);
    				return;
    			} else {
    				return to_date_yyyy_mm_dd(e.value);
    			}
	        	
	        	mom_ajax('R', 'common.comItemInPrice', {vendorCd: e.item.vendorCd, itemId: e.item.itemId, marketCd: e.item.marketCd, currencyCd: e.item.currencyCd, stateTime: e.value}, function(result, data) {
	        		if(data.length > 0) {
	        			data = data[0].unitPrice;
	        		}
    				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', data);
    			}, undefined, undefined, this, 'sync');
	        }
	        
	        // 그리드 환종 변경 시
	        if(e.dataField == 'currencyCd') {
	        	mom_ajax('R', 'common.comItemInPrice', {vendorCd: e.item.vendorCd, itemId: e.item.itemId, marketCd: e.item.marketCd, currencyCd: e.value, stateTime: e.item.dueDate}, function(result, data) {
	        		if(data.length > 0) {
	        			data = data[0].unitPrice;
	        		}
    				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', data);
    			}, undefined, undefined, this, 'sync');
	        }
	        
	        // 그리드 Market 변경 시
	        if(e.dataField == 'marketCd') {
	        	mom_ajax('R', 'common.comItemInPrice', {vendorCd: e.item.vendorCd, itemId: e.item.itemId, marketCd: e.value, currencyCd: e.item.currencyCd, stateTime: e.item.dueDate}, function(result, data) {
	        		if(data.length > 0) {
	        			data = data[0].unitPrice;
	        		}
    				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'unitPrice', data);
    			}, undefined, undefined, this, 'sync');
	        }
	        
	        return e.value; 
		}); 
	}, event: function() {
		var that = this;
		$(document).on('change', '#toLocation', function() {
			var checkedRowItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var gridData = AUIGrid.getGridData(momWidget.grid[0]);
			if(checkedRowItems.length > 0) {
				for(var i = 0; i < gridData.length; i++) {
					for(var j = 0; j < checkedRowItems.length; j++) {
						if(checkedRowItems[j].item.requestGroupId == gridData[i].requestGroupId) {
							AUIGrid.setCellValue(momWidget.grid[0], i, 'locationCd', $('#toLocation').val());
						}
					}
				}
			}
		});
		
		//단가 자동 입력
		$(document).on('change', '#itemIdEP1, #vendorEP1, #marketEP1, #currencyEP1, #orderDateEP1', function() {
			if($('#itemIdEP1').val() != '' && $("#vendorEP1").val() != '' 
				&& $("#marketEP1").val() != '' && $("#currencyEP1").val() != '' && $('orderDateEP1').val() != '') {
				var unitPrice = '';
				mom_ajax('R', 'common.comItemInPrice', {vendorCd: $('#vendorEP1').val(), itemId: $('#itemIdEP1').val(), marketCd: $('#marketEP1').val(), currencyCd: $('#currencyEP1').val(), stateTime: $('#orderDateEP1').val()}, function(result, data) {
	        		if(data.length > 0) {
	        			unitPrice = data[0].unitPrice;
	        		} else {
	        			unitPrice = 0;
	        		}
    			}, undefined, undefined, this, 'sync');
				
//				if(that.defaultCurrency != $('#currencyEP1').val()) {
//					mom_ajax('R', 'common.comExchangeRate', {currencyCd: that.defaultCurrency, stateTime: $('#orderDateEP1').val()}, function(result, data) {
//		        		if(data.length > 0) {
//		        			data = data[0].exchangeRate;
//		        			unitPrice = data * unitPrice;
//		        		}
//		        		
//	    			}, undefined, undefined, this, 'sync');
//				}
				$('#unitPriceEP1').val(unitPrice);
			}
		});
		
		$(document).on('click', '#orderBtn1', function() {
			mom_ajax('R', 'equipment.emOrder.emOrderGroupId', {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data != undefined) {
					initParam = data[0].orderGroupId;
				}
			}, undefined, undefined, this, 'sync');
			
			mom_ajax('R', 'common.comParameter', {}, function(result, data) {
        		if(data.length > 0) {
        			moPriceBlockingFlag = data[0].moPriceBlockingFlag;
        		}
			}, undefined, undefined, this, 'sync');
    	});
		
		$(document).on('click', '#createOrderBtn1', function() {
			$('#pop').momModal('show');
			$('#orderIdEP1, #unitPriceEP1').attr('readonly','readonly');
		});
		
		$(document).on('click', '#pCancelBtn1, .bntpopclose', function() {
			$('#pop').momModal('hide');
		});
		
	}

};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB002', MOMLB002);
	MOMLB002.init();
});