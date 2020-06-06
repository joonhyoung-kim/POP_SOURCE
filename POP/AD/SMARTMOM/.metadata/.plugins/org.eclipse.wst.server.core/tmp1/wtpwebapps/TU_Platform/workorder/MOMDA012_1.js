var MOMDA012_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	endPeriod	: undefined,
	
	menuId		: 'MOMDA012',
	
	init: function() {		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
		
		this.design();
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
		if(indexInfo != undefined && indexInfo['op'] == 'badCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelQty'] != 0 && callBackParam[i]['cancelQty'] != null ) {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['badDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11311' + '@' + this.endPeriod);
					return;
				}
			}
		}
	}/*, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'badCancelBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}*/, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'cancelReason', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(item['cancelQty'] == 0) {
					return 'columnStyle';
				}				
			}
		});
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			if(e.item['cancelDate'] != undefined) {
				return false;
			} else {
				//AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
				return true;
			}
		});
		
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex(momWidget.grid[0], 0);
		var totalBadQty;
		$('.aui-grid-default-footer').css({'text-align': 'left'});
		
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField : 'badQty',
        	operation : 'SUM',
        	formatString : '#,###',
			labelFunction : function(value, columnValues, footerValues) {
				totalBadQty = value;
			}
		},{
        	dataField : 'cancelQty',
        	positionField : getColumnIndex,
        	style : 'aui-grid-default-footer',
        	operation : 'SUM',
        	colSpan : 50,
			labelFunction : function(value, columnValues, footerValues) {
				return 'Total ' + Language.lang['MESSAGES10516'] + ': ' + AUIGrid.formatNumber(totalBadQty + value, '#,##0', 'rounding');
		  }
        }];
        
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
		
	}, design: function() {
		$('head').append('<style>.columnStyle{background: #C7E8FD;}</style>');	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA012_1', MOMDA012_1);
	MOMDA012_1.init();
});