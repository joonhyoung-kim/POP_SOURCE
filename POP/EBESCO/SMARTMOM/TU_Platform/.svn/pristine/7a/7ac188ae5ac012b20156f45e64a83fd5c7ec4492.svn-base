var MOMDA015= {
	defaultCurrency	: undefined,
	defaultMarket	: undefined,
	//param			: undefined,
	initMessage		: undefined,
	initParam		: undefined,
	excelUpInitParam : undefined,
       
	init: function() {   
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
					that.event();
				});
			});
		});
	}, grid: function() {
    	//AUIGrid.setSelectionMode(momWidget.grid[1], 'singleCell');
//		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
//			defaultCurrency = data[0].currencyCd;
//    		defaultMarket = data[0].marketCd;
//		}, undefined, undefined, this, 'sync');
    	   
    	/*AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'requestDate', {
    		editRenderer : {
    			type : 'CalendarRenderer',
    			openDirectly : true,
	   		   	onlyCalendar : false
		    }
    	});*/
    	   
		var that = this;
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
  			if(e.dataField == 'itemId') {
  				var zeroQty = 0;
  				mom_ajax('R', 'common.curItemStock', {itemId : e.item.itemId, locationCd : e.item.locationCd}, function(result, data) {
  					if(result != 'SUCCESS' || data.length < 1) {
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', zeroQty);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', data[0].currentQty);
					} 
  				}, undefined, undefined, that, 'sync');
  				
  				mom_ajax('R', 'common.comItemInfo', {itemId : e.item.itemId}, function(result, data) {
  					if(result != 'SUCCESS' || data.length == 0) {
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemName', '');
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'specification', '');
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemType', '');
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemTypeName', '');
  					} else {
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemName', data[0].itemName);
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'specification', data[0].specification);
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemType', data[0].itemType);
  						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemTypeName', data[0].itemTypeName);
  					}  					
  				}, undefined, undefined, that, 'sync');
  			}
  			
//  			if(e.dataField == 'salesFreeFlag') {
//  				var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
//  	   			var changedFlag = e.item.salesFreeFlag;
//  	   			for(var i = 0; i < grid2length; i++) {
//  	   				AUIGrid.setCellValue(momWidget.grid[1], i, 'salesFreeFlag', changedFlag);
//  	   			}
//  			} else  
  				if(e.dataField == 'toLocationCd') {
  				var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
  	   			var changedFlag = e.item.salesFreeFlag;
  	   			for(var i = 0; i < grid2length; i++) {
  	   				AUIGrid.setCellValue(momWidget.grid[1], i, 'salesFreeFlag', changedFlag);
  	   			}
  			}
  			
  			//AUIGrid.setProp(momWidget.grid[1], 'exportURL', '0');
  		});
    	   
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function() {
		   	var checkedItems =  AUIGrid.getCheckedRowItems(momWidget.grid[0]);   			
   			if(checkedItems.length <= 0) {
   				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11335']});
   				return;
   			}
   			
   			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a['rowIndex'] > b['rowIndex'] ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length - 1; i++) {
				if(checkedItems[i].item['locationCd'] != checkedItems[i+1].item['locationCd']) {
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12120']});
					return;
				} 
			}
			
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			for(var i = 0; i < checkedItems.length; i++) {
				var chk = true;
				for(var j = 0; j < grid2Items.length; j++) {
					if(checkedItems[i].item['locationCd'] != grid2Items[j]['locationCd']) {
						momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12120']});
						return;
					}
					
					if(checkedItems[i].item['locationCd'] == grid2Items[j]['locationCd'] && checkedItems[i].item['itemId'] == grid2Items[j]['itemId']) {
						chk = false;
						break;
					}
				}
				
				if(chk) {
					checkedItems[i].item['currentQty'] = checkedItems[i].item['qty'];
//					checkedItems[i].item['salesFreeFlag'] = 'Y';
//					checkedItems[i].item['currencyCd'] = defaultCurrency;
//					checkedItems[i].item['marketCd'] = defaultMarket;
					checkedItems[i].item['requestDate'] = get_date_diff(0);
					if($('#toLocation').val() != '') {
						checkedItems[i].item['toLocationCd'] = $('#toLocation').val();
					}
					AUIGrid.addRow(momWidget.grid[1], checkedItems[i].item, 'last');
				}
			}
//			AUIGrid.update(momWidget.grid[1]);  
			
		});
    	   
    	// 하단 그리드 요청창고 콤보
		$(document).on('change', '#toLocation', function() {
   			var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
   			var toLocationCd = $('#toLocation').val();
   			for(var i = 0; i < grid2length; i++) {
   				AUIGrid.setCellValue(momWidget.grid[1], i, 'toLocationCd', toLocationCd);
   			}
   		});
		
   		//취소
   		/*$(document).on('click', '#cancelBtn2', function() {
   			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			if(checkedItems.length <= 0 ) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows(momWidget.grid[1]);
   		});*/
		momWidget.clickCancelBtn2(1);
    	   
   		$(document).on('click', '#addBtn2', function() {
   			var grid2 = AUIGrid.getGridData(momWidget.grid[1]);
   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'locationCd', $('#locationName').val());
   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'currencyCd', defaultCurrency);
   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'marketCd', defaultMarket);
   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'requestDate', get_current_date('YYYY-MM-DD'));
   			if($('#toLocation').val() != '') {
   				AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'toLocationCd', $('#toLocation').val());
   			}
   			
   			if(grid2.length == 1) { 	//하단 데이터가 없는 경우 
   	   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'salesFreeFlag', 'Y');
   			} else { 					//하단 데이터가 있으면 위의 데이터의 유무상 구분을 넣어줌
   	   			AUIGrid.setCellValue(momWidget.grid[1], grid2.length - 1, 'salesFreeFlag', grid2[grid2.length - 2].salesFreeFlag);
   			}   	
   			
   			 
   		});
   	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
   		var that = this;
   		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn2' && indexInfo['sequence'] == 1) {
	   		 for(var i = 0; i < callBackParam.length; i++) {
	   			 
	   			if(callBackParam[i].itemId == undefined || callBackParam[i].itemId == '') {
	   				that.initMessage = Language.lang['MESSAGES11589'];
					return;
	   			} else if(callBackParam[i].itemName == undefined || callBackParam[i].itemName == '') {
	   				that.initMessage = Language.lang['MESSAGES12124'];
					return;
	   			} else if(callBackParam[i].toLocationCd == undefined || callBackParam[i].toLocationCd == '') {
	   				that.initMessage = Language.lang['MESSAGES12122'];
					return;
	   			} else if(callBackParam[i].requestQty == undefined || callBackParam[i].requestQty == '') {
	   				that.initMessage = Language.lang['MESSAGES10946'];
					return;
	   			} else if(callBackParam[i].requestReason == undefined || callBackParam[i].requestReason == '') {
	   				that.initMessage = Language.lang['MESSAGES12123'];
					return;
	   			}
	   		}
	   		mom_ajax('R', 'workOrder.sampleRequest.materialRequestId', {}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					that.initMessage = Language.lang['MESSAGES12184'];
				} else {
					that.initParam = {materialRequestId : data[0].materialRequestId};
				} 
			}, undefined, undefined, that, 'sync');
	   }  	   		 
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn2' && indexInfo['sequence'] == 1) {
    		if(result == 'SUCCESS') {
	   			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
	   			AUIGrid.clearGridData(momWidget.grid[index]);
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
    		momWidget.splashHide();
		}
	},  excelGridCallBack: function() {
		var that = this;
		var allData = AUIGrid.getGridData(momWidget.grid[1]);
		
		for(var i = 0; i < allData.length; i++) {
			allData[i].locationCd = $("#locationName").val();
			AUIGrid.setCellValue(momWidget.grid[1], i, 'locationCd', allData[i].locationCd);
			mom_ajax('R', 'common.comItemInfo', {itemId : allData[i].itemId}, function(result, data) {
				if(result != 'SUCCESS' || data.length == 0) {
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemName', '');
					AUIGrid.setCellValue(momWidget.grid[1], i, 'specification', '');
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemType', '');
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemTypeName', '');
				} else {
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemName', data[0].itemName);
					AUIGrid.setCellValue(momWidget.grid[1], i, 'specification', data[0].specification);
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemType', data[0].itemType);
					AUIGrid.setCellValue(momWidget.grid[1], i, 'itemTypeName', data[0].itemTypeName);
				}  	
				
				mom_ajax('R', 'common.curItemStock', {itemId : allData[i].itemId, locationCd : allData[i].locationCd}, function(result, data) {
					
					var zeroQty = 0;
					if(result != 'SUCCESS' || data.length < 1) {
							AUIGrid.setCellValue(momWidget.grid[1], i, 'currentQty', zeroQty);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'currentQty', data[0].currentQty);
					} 
				}, undefined, undefined, that, 'sync');
			}, undefined, undefined, that, 'sync');
		}
	}, excelUpInit: function() {
		if($("#locationName").val() == '') {
			this.excelUpInitParam = 'N';
			this.initMessage = Language.lang['MESSAGES12140'];
		}
	}, addClickInit: function(index, param, callBackParam, indexInfo) {
		this.initMessage = undefined;
		if($('#locationName').val() == '') {
			this.initMessage = Language.lang['MESSAGES12140'];
		}
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA015', MOMDA015);
	momWidget.init(2, 'MOMDA015', MOMDA015);
	MOMDA015.init();
});