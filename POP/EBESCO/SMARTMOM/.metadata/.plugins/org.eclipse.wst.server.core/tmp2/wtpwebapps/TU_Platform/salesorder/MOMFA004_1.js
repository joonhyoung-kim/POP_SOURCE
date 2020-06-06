var MOMFA004_1 = {
	initMessage		: undefined,
	initParam		: undefined,
	
	indeterminate 	: false,
		
	endPeriod		: undefined,
	
	orderType 		: 'SO_IN_C',
	menuId			: 'MOMFA004',
	divisionCd 		: undefined,
	companyCd 		: undefined,
	reportUrl		: undefined,
	
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
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		}
	} , saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['ioCategory'] == 'PRTN001') {
					this.initMessage = Language.lang['MESSAGES11228'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11443' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {orderType: this.orderType};		
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		console.log('this.menuId = ' + this.menuId + ', this.endPeriod = ' + this.endPeriod);
		
		divisionCd = sessionStorage.getItem("divisionCd");
		companyCd = sessionStorage.getItem("companyCd");
		
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data == undefined || data.length < 1) {
				return;
			}
			
			reportUrl = data[0].reportApplicationUrl;
		}, undefined, undefined, undefined, 'sync');
		
	}, event: function() {
    	var that = this;
    	
    	// Start XMOM 변환 / 20191105 / ljw / 명세표출력 기능 추가 
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems == undefined || checkedItems.length < 1) { 
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = {menuId : that.menuId};
			mom_ajax("D", "shipping.productShippingStatus.productShippingStatusPrintTemp", JSON.stringify(param), that.printCallback);
		});
    }, printCallback : function(result, data) {
		var that = this.MOMFA004_1;
		if(result == "SUCCESS") {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				checkedItems[i].item.seq = i+1;
				checkedItems[i].item.menuId = that.menuId;
				arrayList.push(checkedItems[i].item);
			}
			
			mom_ajax("L", "shipping.productShippingStatus.productShippingStatusPrintTemp", JSON.stringify(arrayList), that.printDelCallback);
		} else {
			momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES12208']});
			return;
		}
	}, printDelCallback : function(result, data) {
		var that = this.MOMFA004_1;
		if(result == "SUCCESS") {
			var param = {
				menuId : that.menuId
			}
			mom_ajax("C", "shipping.productShippingStatus.productShippingStatusPrint", JSON.stringify(param), that.printCallbackProc);
		} else {
			momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES12209']});
			return;
		}
	}, printCallbackProc : function(result, data) {
		var that = this.MOMFA004_1;
		if(result == 'SUCCESS') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var itemStockInoutIds = "";
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.departureCancelQty <= 0) {
					if(itemStockInoutIds == "" || itemStockInoutIds == null) {
						itemStockInoutIds += "\'" + checkedItems[i].item.itemStockInoutId + "\'";
					} else {
						itemStockInoutIds += "\, \'" + checkedItems[i].item.itemStockInoutId + "\'";
					}
				}
			}
			
			if(itemStockInoutIds == "" || itemStockInoutIds == null) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES10010']});
				return;
			}
			
			var itemStockInoutIdsUrl = itemStockInoutIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMFA004";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&itemStockInoutIds=" + itemStockInoutIdsUrl + "&excelId=MOMFA004&pId=MOMFA004";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.shipping.productShippingStatus.productShippingExcelPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function () {
				new_popup.close();
			}, 500);
		} else {
			momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES12210']});
			return;
		}
	}
	// End XMOM 변환 / 20191105 / ljw / 명세표출력 기능 추가 
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA004_1', MOMFA004_1);
	MOMFA004_1.init();
});