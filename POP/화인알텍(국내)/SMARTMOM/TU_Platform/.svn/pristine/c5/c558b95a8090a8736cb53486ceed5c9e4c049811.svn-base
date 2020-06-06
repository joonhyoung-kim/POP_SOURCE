var MOMDA011_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	endPeriod	: undefined,
	
	menuId		: 'MOMDA011',
	radioValue  : undefined,
	
	init: function() {		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
//				that.event();
				that.grid();
			});
		});
		
		this.design();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
			that.radioValue = $('input[name="value"]:checked').val();
			that.initParam = undefined;
			if(that.radioValue == 'summary') {
				that.initParam = {isSummary: 'Y'};
			}
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		$(document).on("click", "input[name='value']:checked", function() {
			that.radioValue = $('input[name="value"]:checked').val();
			param.isSummary = '';
			if(that.radioValue == 'summary') {
				param.isSummary = 'Y';
			} 
			momWidget.findBtnClicked(0, false, param, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				AUIGrid.setGridData(momWidget.grid[0], data1);
			});
		});
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
//		if(indexInfo != undefined && indexInfo['op'] == 'deductCancelBtn1' && indexInfo['sequence'] == 2) {
//			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
//		}
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'deductCancelBtn1' && indexInfo['sequence'] == 1) {
			if(that.radioValue == 'summary') {
				this.initMessage = Language.lang['MESSAGES12392'];
				return;
			}
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelQty'] != 0 && callBackParam[i]['cancelQty'] != null) {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['ioTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11080' + '@' + this.endPeriod);
					return;
				}
			}
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		this.inoutFlag = momWidget.getSearchParam()['inoutFlag'];
		
		$('.aui-grid-default-footer').css({'text-align': 'right'});
	    var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'qty',
        	positionField: 'workOrderId',
        	operation: 'SUM',
        	colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10718'] + ': ' + AUIGrid.formatNumber(value, '#,###,##0.00');
			}
		},{
        	dataField: 'cancelQty',
        	positionField: 'itemName',
        	operation: 'SUM',
        	colSpan: 2,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11469'] + ': ' + AUIGrid.formatNumber(value, '#,###,##0.00');
			}
		}];
	    
	    AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}, design: function() {
		$('head').append('<style>.columnStyle{background: #C7E8FD;}</style>');	
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA011_1', MOMDA011_1);
	MOMDA011_1.init();
});