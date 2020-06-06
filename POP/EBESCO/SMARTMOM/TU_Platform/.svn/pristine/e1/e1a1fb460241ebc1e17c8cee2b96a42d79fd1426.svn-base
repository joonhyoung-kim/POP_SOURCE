var MOMFA023 = {
	initMessage	: undefined, 
	endPeriod	: undefined,
	menuId		: 'MOMFA023',
	orderType	: 'SO_OUT_C',
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.defaultStyle();
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'cancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < param.length; i++) {
				if(to_date_yyyy_mm_dd(param[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10377' + '@' + this.endPeriod);
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
				if(e.dataField == 'confirmDate') {
					return false;
				}
			}
			AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
		});
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'confirmDate') { // 달력 지정한 필드인 경우 
				if(to_date_yyyy_mm_dd(e.value) <= this.endPeriod) { 
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		}); 
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], "confirmDate", {
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
		
		var totalInoutPrice = undefined;
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'inoutPrice',
        	positionField: 'inoutPrice',
        	operation: 'SUM',
        	formatString: '#,##0',
			labelFunction: function(value, columnValues, footerValues) {
				totalInoutPrice = Language.lang['MESSAGES11354'] + ': ' + AUIGrid.formatNumber(value, '#,##0.00', 'rounding');
				return totalInoutPrice;
			}
        },{
        	dataField: 'inoutQty',
        	positionField: 'orderStateName',
        	style: 'aui-grid-default-footer',
        	operation: 'SUM',
        	colSpan: 4,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11367'] + ': ' + AUIGrid.formatNumber(value, '#,##0') + ' / ' + totalInoutPrice;
			}
        }];
        
		$('.aui-grid-default-footer').css({'text-align': 'left'});
		
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
        
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
   	}, defaultStyle: function() {
		$("head").append('<style>.defaultStyle{ background: transparent;}</style>');	
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFA023', MOMFA023);
	MOMFA023.init();
});