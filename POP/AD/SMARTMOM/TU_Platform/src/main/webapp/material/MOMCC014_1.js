var MOMCC014_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	menuId				: undefined,
	menuCode			: undefined,
	tableId				: 'MOM_ITEM_STOCK',
	
	stockType			: undefined,
	
	endPeriod			: undefined,
	
	releaseFacilityType	: undefined,
	requestFacilityType	: undefined,
	itemTypeParam		: undefined,
	releaseType			: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
	}, loadCallInit: function() {
		this.grid();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			}
			
			var fromDate = new Date($('#fromDate').val());
			var toDate = new Date($('#toDate').val());
			if(fromDate > toDate) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10785']});
				return;
			}
			
			this.initParam = {stockType: this.stockType};
		} else if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn1' && indexInfo['sequence'] == 4) {
			this.initParam = {stockType: this.stockType};
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['issueQty'] <= 0) {
					this.initMessage = Language.lang['MESSAGES10542'];
					return;
				} else if(callBackParam[i]['cancelDate'] == '' || callBackParam[i]['cancelDate'] == undefined) {
					this.initMessage = Language.lang['MESSAGES11485'];
					return;
				} else if(callBackParam[i]['cancelQty'] != null) {
					this.initMessage = Language.lang['MESSAGES11003'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['cancelDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11484' + '@' + this.endPeriod);
					return;
				}
			}
		
			this.initMessage = "CLEAR_PARAM";
			this.initParam = {menuId: this.menuId, tableId: this.tableId};
		}		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i] = {
					  colId1: 'FROM_INOUT_ID'
					, value1: param[i]['fromInoutId']
					, colId2: 'TO_INOUT_ID'
					, value2: param[i]['toInoutId']
					, colId3: 'DESCRIPTION'
					, value3: param[i]['description']
					, colId4: 'CANCEL_QTY'
					, value4: param[i]['issueQty']
					, colId5: 'IO_CATEGORY'
				    , value5: param[i]['ioCategory']
				    , colId6: 'CANCEL_DATE'
				    , value6: param[i]['cancelDate']
				};
			}
		}		
	}, grid: function() {
		this.menuCode = momWidget.getSearchParam()['menuCode'];
		this.stockType = momWidget.getSearchParam()['stockType'];
		
		var that = this;
		if(this.stockType == 'MAT') {
			this.menuId = 'MOMCC014';
			$('#labelText').text(Language.lang['MESSAGES10965']);
			
			mom_ajax('R', 'common.comCode', {codeClassId: 'FACILITY_TYPE', attribute1: 'Y'}, function(result, data) {
				if(result == 'SUCCESS' && data.length > 0) {
					that.releaseFacilityType = "'" + data[0]['code'] + "'";
				}
			}, undefined, undefined, this, 'sync');
			
			mom_ajax('R', 'common.comCode', {codeClassId: 'FACILITY_TYPE', attribute2: 'Y'}, function(result, data) {
				if(result == 'SUCCESS' && data.length > 0) {
					for(var i=0; i<data.length; i++) {
						if(i == 0) {
							that.requestFacilityType = "'" + data[i]['code'] + "'";
						} else {
							that.requestFacilityType += ", '" + data[i]['code'] + "'";
						}
					}
				}
			}, undefined, undefined, this, 'sync');
			
			this.itemTypeParam = {codeClassId:'ITEM_TYPE', attribute1 : 'Y'};
			this.releaseType = {codeClassId:'IO_CATEGORY', attribute2 : 'Y'};
		} else {
			this.menuId = 'MOMCC016';
			$('#labelText').text(Language.lang['MESSAGES10218']);
			
			mom_ajax('R', 'common.comCode', {codeClassId: 'FACILITY_TYPE', attribute3: 'Y'}, function(result, data) {
				if(result == 'SUCCESS' && data.length > 0) {
					that.releaseFacilityType = "'" + data[0]['code'] + "'";
				}
			}, undefined, undefined, this, 'sync');
			
			mom_ajax('R', 'common.comCode', {codeClassId: 'FACILITY_TYPE', attribute4: 'Y'}, function(result, data) {
				if(result == 'SUCCESS' && data.length > 0) {
					that.requestFacilityType = "'" + data[0]['code'] + "'";
				}
			}, undefined, undefined, this, 'sync');
			
			this.itemTypeParam = {codeClassId:'ITEM_TYPE', attribute2 : 'Y'};
			this.releaseType = {codeClassId:'IO_CATEGORY', attribute3 : 'Y'};
		}
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		momWidget.dropDownPost(0, undefined, undefined, undefined, this);
		momWidget.setEndPeriod(this.menuId, this);

		AUIGrid.bind(momWidget.grid[0], 'cellEditEndBefore', function(e){ 
	        if(e.dataField == 'cancelDate') { // 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else if(new Date(to_date_yyyy_mm_dd(e.value)) < new Date(e.item.issueDate)) {
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES12199')});
	                return e.oldValue;
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value); 
                }
	        }
	        
	        return e.value; 
		}); 
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
			// 취소수량에 값이 있으면
			if(e.item['cancelQty'] != null) {
				return false;
			} else {
				AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
				return true;
			}
		});
		
		var getColumnIndex = AUIGrid.getDataFieldByColumnIndex(momWidget.grid[0], 0);
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
        	dataField: 'issueQty',
        	operation: 'SUM',
        	formatString: '#,###',
			labelFunction: function(value, columnValues, footerValues) {
				totalIssueQty = Language.lang['MESSAGES11386'] + ': ' + AUIGrid.formatNumber(value, '#,##0.0000', 'rounding');
			}
        },{
        	dataField: 'cancelQty',
        	positionField: getColumnIndex,
        	style: 'aui-grid-default-footer',
        	operation: 'SUM',
        	colSpan: 50,
			labelFunction: function(value, columnValues, footerValues) {
				return 'Total ' + totalIssueQty + ' / ' + Language.lang['MESSAGES11469'] + ': ' + AUIGrid.formatNumber(value, '#,##0.0000', 'rounding');
			}
        }];
        
        AUIGrid.setFooter(momWidget.grid[0], footerObject);
	}, event: function() {
		var that = this;
    	$(document).on('click', '#specPrintBtn1', function() {
    		var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html:Language.lang['MESSAGES11343']});
				return;
			}
			
			var param = [];
			for(var i = 0; i < checkedItems.length; i++) {
				param[i] = checkedItems[i].item;
			}
			
    		momWidget.specPrint('MOMCC014'
    			, 'purchase.materialLedger.materialReleaseStatus.materialReleasePrintStatusCount'
    			, 'purchase.materialLedger.materialReleaseStatus.materialReleasePrintStatus'
    			, 'requestGroupId'
    			, 'stockType'
    			, that.stockType
    			, param
    			, Language.lang['MESSAGES11464']
    		);
		});
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMCC014_1', MOMCC014_1);
       MOMCC014_1.init();
});
