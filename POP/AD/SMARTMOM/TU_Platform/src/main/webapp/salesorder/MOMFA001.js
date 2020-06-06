var MOMFA001 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	orderType			: 'SO_IN',
	
	userId				: undefined,
	
	init: function() {
		var that = this;
		this.userId = sessionStorage.getItem('userId');
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.defaultStyle();
				that.grid();
				that.event();
			});
		});
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 1) {
			var shippingOverFlag = undefined;
			mom_ajax('R', 'common.comParameter', {}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				shippingOverFlag = data[0]['shippingOverFlag'];
			}, undefined, undefined, this, 'sync');
			for(var i = 0; i < callBackParam.length; i++) {
				if(shippingOverFlag == undefined || (shippingOverFlag == 'N' && callBackParam[i]['departureQty'] > callBackParam[i]['currentQty'])) {
					this.initMessage = Language.lang['MESSAGES11614'];
					return;
				} else if(callBackParam[i]['b2biCustomerFlag'] == 'N' && callBackParam[i]['departureQty'] > callBackParam[i]['remainQty']) {
					this.initMessage = Language.lang['MESSAGES11164'];
					return;
				} else if(callBackParam[i]['fromLocationCd'] == '' || callBackParam[i]['fromLocationCd'] == undefined) {
					this.initMessage = Language.lang['MESSAGES11427'];
					return;
				} else if(callBackParam[i]['toLocationCd'] == '' || callBackParam[i]['toLocationCd'] == undefined) {
					this.initMessage = Language.lang['MESSAGES10189'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['shipDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11441' + '@' + endPeriod);
					return;
				}
			}
			
			this.initParam = {orderType: this.orderType};
			this.initMessage = 'CLEAR_PARAM';
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'applyBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				if(param[i]['unitPrice'] == Language.lang['MESSAGES10418']) {
					this.initMessage = Language.lang['MESSAGES10419'];
					return;
				}
				
				param[i]['orderType'] = this.orderType;
				param[i]['createBy'] = this.userId;
				//param[i]['unitPrice'] = Number(param[i]['unitPrice']);
				
				callBackParam[i]['orderType'] = this.orderType;
				callBackParam[i]['createBy'] = this.userId;
				//callBackParam[i]['unitPrice'] = Number(param[i]['unitPrice']);
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'b2biInterface1' && indexInfo['sequence'] == 1) {
			this.initParam = {orderType: this.orderType};
		}
	}, grid: function() { // XMOMG4 / ljw / B2Bi 사용하는 업체인 경우엔 출하수량, 출발처리번호, 출하일자 수정 못하도록 기능 추가
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(selectItems[0].item.b2biCustomerFlag == 'Y') {
				if(e.dataField == 'departureQty') {
					return false;
				}
				if(e.dataField == 'departureNumber') {
					return false;
				}
				if(e.dataField == 'shipDate') {
					return false;
				}
				if(e.dataField == 'fromLocationCd') {
					return false;
				}
				if(e.dataField == 'toLocationCd') {
					return false;
				}
				if(e.dataField == 'description') {
					return false;
				}
			}
			AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "departureQty", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "departureNumber", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "shipDate", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "fromLocationCd", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				var getValue = AUIGrid.getCellValue(momWidget.grid[0], rowIndex, "b2biCustomerFlag");
				if(getValue != 'Y') {
					return 'columnStyle';
				} else {
					return 'defaultStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "toLocationCd", {
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
		
	}, defaultStyle: function() {
		$("head").append('<style>.defaultStyle{ background: transparent;}</style>');	
	}, event: function() { // XMOMG5 / ljw / 출하처리 시 주문취소된 데이터가 있는지 Validation 체크
		$(document).on('click', '#applyBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.orderState == 'C') {
					momWidget.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES12202']}); 
					return;
				}
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
   	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFA001', MOMFA001 );
	MOMFA001 .init();
});