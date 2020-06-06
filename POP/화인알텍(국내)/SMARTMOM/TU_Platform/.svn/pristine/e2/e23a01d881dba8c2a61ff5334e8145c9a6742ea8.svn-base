var MOMCE007_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	stockType			: undefined,
	menuId				: undefined,	
	
	endPeriod			: undefined,
	allowMinusQty		: undefined,
	
	comboParams			: undefined,
	comboItemType		: undefined,

	init: function() {	
		var that = this;
		Language.init(function() {
			that.stockType = momWidget.getSearchParam()['stockType'];
			if(that.stockType == 'MAT') {
				that.comboParams = {codeClassId: "IO_CATEGORY", attribute7: 'Y'}  // 파라미터
				that.comboItemType = {codeClassId: "ITEM_TYPE", attribute3: 'Y'} // 파라미터
			} else if(that.stockType == 'WO') {
				that.comboParams = {codeClassId: "IO_CATEGORY", attribute8: 'Y'} // 파라미터
				that.comboItemType = {codeClassId: "ITEM_TYPE", attribute4: 'Y'} // 파라미터
			} else if(that.stockType == 'SO') {
				that.comboParams = {codeClassId: "IO_CATEGORY", attribute11: 'Y'} // 파라미터
				that.comboItemType = {codeClassId: "ITEM_TYPE", attribute5: 'Y'} // 파라미터
			} else {
				that.comboParams = {codeClassId: "IO_CATEGORY", attribute1: 'Y'} // 파라미터
				that.comboItemType = {codeClassId: "ITEM_TYPE", attribute6: 'Y'} // 파라미터
			}
			
			momWidget.isInitGrid(0, function() {
				momWidget.dropDownPost(0, undefined, undefined, undefined, that);
			});
		});
		
		this.event();
	}, loadCallInit: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		this.initParam = {stockType: this.stockType};
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'moveCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['cancelFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				} else if(callBackParam[i]['cancelIoTime'] == undefined || callBackParam[i]['cancelIoTime'] == '') {
					this.initMessage = Language.lang['MESSAGES10994'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['cancelIoTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11479' + '@' + this.endPeriod);
					return;
				} else if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['toLocationQty'] >= 0) {
						if(callBackParam[i]['qty'] > callBackParam[i]['toLocationQty']) {
							this.initMessage = Language.lang['MESSAGES11473'];
							return;
						}
					} else {
						this.initMessage = Language.lang['MESSAGES10993'];
						return;
					}
				}
			}
		}
	}, grid: function() {
		this.stockType = momWidget.getSearchParam()['stockType'];
		if(this.stockType == 'MAT') {
			this.menuId = 'MOMCE005';
		} else if(this.stockType == 'WO') {
			this.menuId = 'MOMDA005';
		} else if(this.stockType == 'SO') {
			this.menuId = 'MOMFA026';
		} else {
			this.menuId = 'MOMCC015';
		}
		
		momWidget.setEndPeriod(this.menuId, this);
		
		var getColumnIndex = AUIGrid.getDataFieldByColumnIndex(momWidget.grid[0], 0);
		var that = this;		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'cancelIoTime') { // 달력 지정한 필드인 경우 
				if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue; 
				} else if(new Date(to_date_yyyy_mm_dd(e.value)) < new Date(e.item.ioTime)) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES12200')});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		});
		
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				momWidget.messageBox({type:'danger', width:'400', height: '145',  html:Language.lang['MESSAGES10821']});
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		/*AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');	
		});*/
		
		var totalIssueQty = totalIssueQty;
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'qty',
        	positionField: 'qty',
        	operation: 'SUM',
        	formatString: '#,##0',
			labelFunction: function(value, columnValues, footerValues) {
				totalIssueQty = value;
				return totalIssueQty;
			}
        },{
        	dataField: 'cancelQty',
        	positionField: 'cancelQty',
        	style: 'aui-grid-default-footer',
        	operation: 'SUM',
        	colSpan: 4,
			labelFunction: function(value, columnValues, footerValues) {
				return 'Total ' + Language.lang['MESSAGES10982'] + ': ' + AUIGrid.formatNumber(totalIssueQty - value, '#,##0', 'rounding');
			}
        }];
        
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}, event: function() {
		var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems == undefined || checkedItems.length < 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11343']});
				
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
    		momWidget.specPrint('MOMCE007'
    			, 'purchase.stock.itemStockMoveHist.itemStockMoveHistPrint'
    			, 'itemInputId'
    			, 'stockType'
    			, that.stockType
    			, param
    			, Language.lang['MESSAGES11461']
    		);
    	});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE007_1', MOMCE007_1);
	MOMCE007_1.init();
});