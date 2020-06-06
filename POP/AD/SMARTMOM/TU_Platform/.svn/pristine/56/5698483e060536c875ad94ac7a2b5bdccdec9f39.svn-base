var MOMFA004 = {
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
				that.defaultStyle();
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
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
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
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems[0].item.b2biCustomerFlag == 'Y') {
				if(e.dataField == 'description') {
					return false;
				}
				if(e.dataField == 'shipCancelDate') {
					return false;
				}
			}
			AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
		});
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'shipCancelDate') { // 달력 지정한 필드인 경우 
				if(to_date_yyyy_mm_dd(e.value) <= this.endPeriod) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		}); 
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "shipCancelDate", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "description", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		divisionCd = sessionStorage.getItem("divisionCd");
		companyCd = sessionStorage.getItem("companyCd");
		
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data == undefined || data.length < 1) {
				return;
			}
			
			reportUrl = data[0].reportApplicationUrl;
		}, undefined, undefined, undefined, 'sync');
		
		AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function( e ) {
			AUIGrid.addUncheckedRowsByValue(e.pid, "b2biCustomerFlag", "Y");
		});
		
		var indeterminate = false;	
		AUIGrid.bind(momWidget.grid[0], "rowAllChkClick", function( e ) {
			if(indeterminate) {
				AUIGrid.setCheckedRowsByValue(e.pid, "b2biCustomerFlag", []);
				indeterminate = false;
			} else {
//				var uniqueValues = AUIGrid.getColumnDistinctValues(e.pid, "b2biCustomerFlag");
//				uniqueValues.splice(uniqueValues.indexOf("Y"),1);
				AUIGrid.setCheckedRowsByValue(e.pid, "b2biCustomerFlag", 'N');
				indeterminate = true;
			}
		});
		
	}, cellClickCallInit : function(index, e) {
		if(e.type == 'cellClick') {
			if(e.item.b2biCustomerFlag != 'Y') {
				AUIGrid.setProp(momWidget.grid[0], "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp(momWidget.grid[0], 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp(momWidget.grid[0], 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			}
			
		this.cellClickCallInitParam = 'click';
		}
   	}, event: function() {
    	var that = this;
    	
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems == undefined || checkedItems.length < 1) { 
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = {menuId : that.menuId};
			mom_ajax("D", "shipping.surplusDeficitShippingStatus.surplusDeficitShippingStatusPrintTemp", JSON.stringify(param), that.printCallback);
		});
    }, printCallback : function(result, data) {
		var that = this.MOMFA004;
		if(result == "SUCCESS") {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				checkedItems[i].item.seq = i+1;
				checkedItems[i].item.menuId = that.menuId;
				arrayList.push(checkedItems[i].item);
			}
			
			mom_ajax("L", "shipping.surplusDeficitShippingStatus.surplusDeficitShippingStatusPrintTemp", JSON.stringify(arrayList), that.printDelCallback);
		} else {
			momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES12208']});
			return;
		}
	}, printDelCallback : function(result, data) {
		var that = this.MOMFA004;
		if(result == "SUCCESS") {
			var param = {
				menuId : that.menuId
			}
			mom_ajax("C", "shipping.surplusDeficitShippingStatus.surplusDeficitShippingStatusPrint", JSON.stringify(param), that.printCallbackProc);
		} else {
			momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.lang['MESSAGES12209']});
			return;
		}
	}, printCallbackProc : function(result, data) {
		var that = this.MOMFA004;
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
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMFC003";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&itemStockInoutIds=" + itemStockInoutIdsUrl + "&excelId=MOMFC003&pId=MOMFC003";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.shipping.surplusDeficitShippingStatus.surplusDeficitShippingExcelPrint.dummy?" + param2};
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
	}, defaultStyle: function() {
		$("head").append('<style>.defaultStyle{ background: transparent;}</style>');	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA004', MOMFA004);
	MOMFA004.init();
});