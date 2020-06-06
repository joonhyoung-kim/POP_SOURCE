var MOMCB001_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	menuId				: undefined,
	menuCode			: undefined,
	strTitle			: undefined,
	
	strHearderQty		: undefined,	// 출발수량
	strHearderDate		: undefined,  	// 출발일자
	
	endPeriod			: undefined,
	
	empAuthority		: undefined,
	vendorCd			: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				momWidget.isInitGrid(4, function() {
					that.grid();
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()){
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			} else if(this.empAuthority <= 5 && this.vendorCd =='') {
				this.initMessage = Language.lang['MESSAGES10570'];
				return;
			}
			
			this.initParam = {menuCode: this.menuCode};
		} else if(indexInfo != undefined && indexInfo['op'] == 'deliveryBtn2' && indexInfo['sequence'] == 4) {
			this.initParam = {menuCode: this.menuCode};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		if(indexInfo != undefined && indexInfo['op'] == 'deliveryBtn2' && indexInfo['sequence'] == 4) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
		momWidget.splashHide();
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'deliveryBtn2' && indexInfo['sequence'] == 1) {
			if(this.menuCode == 'DEPT') {
				departureType = 'D';
			} else {
				departureType = 'W';
			}
			
			if(callBackParam.length == 0) {
				this.initMessage = '출발처리할 행을 선택해 주십시오.';
				return;
			}
			
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['departureDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10000' + '@' + strHearderDate + '@' + endPeriod);
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {departureType: this.menuCode == 'DEPT' ? 'D' : 'W'};					
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'deliveryBtn2' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i]['seq'] = i + 1;
			}				
		} else if(indexInfo != undefined && indexInfo['op'] == 'deliveryBtn2' && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = callBackParam[0];
		}
	}, grid: function() {		
		this.menuCode = momWidget.getSearchParam()['menuCode'];
		this.vendorCd = sessionStorage.getItem('vendorCd');
		this.empAuthority = sessionStorage.getItem('empAuthority');
		
		if(this.menuCode == 'DEPT') {
			this.menuId = 'MOMCB001';
			this.strTitle = Language.lang['MESSAGES11402'];
			
			this.strHearderQty = Language.lang['MESSAGES11409']; 
			this.strHearderDate = Language.lang['MESSAGES11413'];
		} else {
			this.menuId = 'MOMCC009';
			this.strTitle = Language.lang['MESSAGES11033'];
			
			this.strHearderQty = Language.lang['MESSAGES11035'];
			this.strHearderDate = Language.lang['MESSAGES11036'];
			
			$('#deliveryList').text(Language.lang['MESSAGES11034']);
			$('#deliveryDetailList').text(Language.lang['MESSAGES11104']);
			$('#deliveryBtn2 .textblock').text(Language.lang['MESSAGES11037']);
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'departureQty', {headerText: this.strHearderQty});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'departureDate', {headerText: this.strHearderDate});
			
			for(var i = 0; i < momWidget.processTran[1].length; i++) {
				if(momWidget.processTran[1][i]['dataField'] == 'deliveryBtn') {
					momWidget.processTran[1][i]['headerText'] = '입고대기처리';
					break;
				}
			}
			
			momWidget.gridProperty[1]['queryId'] = 'purchase.supplier.deliveryPresentCondition.deliveryPrintStatusCount';
		}
		
		momWidget.setEndPeriod(this.menuId, this);
		
		var that = this;
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'departureQty', { 
			headerText: that.strHearderQty
		});
		
		if(that.menuCode == 'DEPT') {
			momWidget.addFileColumn(1, 4, 20, 'MOMCB001', 'materialOrderId');
		}
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) {				
			if(e.dataField == 'departureQty') {
				var dQty = e.value;
				var rQty = e.item.remainQty;					
				if(dQty > rQty) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11306']});
					return e.oldValue;
				} else if(dQty <= 0 || dQty == '') {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11305']});
					return e.oldValue;
				} else {
					var conversionUnitQty = e.value * e.item.originConversionUnitQty;
					AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'conversionUnitQty', conversionUnitQty);
					return dQty;
				}	
			}
			
			if(e.dataField == 'departureDate') { // 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value); 
                } 
	        }
			
			return e.value;
		});
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems =  AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			if(checkedItems.length <= 0){
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { 
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length; i++) {
				var materialOrderId = checkedItems[i].item['materialOrderId'];
				var remainQty = checkedItems[i].item['remainQty'];
				var chk = true;
				if(remainQty > 0) {
					for(var j = 0; j < grid2Items.length; j++) {
						if(materialOrderId == grid2Items[j].materialOrderId) {
							chk = false;
							break;
						}					
					}
					
					if(chk) {
						checkedItems[i].item['departureDate']= get_date_diff(0);
						checkedItems[i].item['departureQty'] = checkedItems[i].item['remainQty'];						
						AUIGrid.addRow(momWidget.grid[1], checkedItems[i].item, 'last');						
					}
				}
			}
			
			if(AUIGrid.getRowCount(momWidget.grid[1]) > 0) {				
				AUIGrid.setAllCheckedRows(momWidget.grid[1], true);
			}
			
			AUIGrid.setAllCheckedRows(momWidget.grid[0], false);
		});
		
//		momWidget.clickCancelBtn2(1);
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMCB001_1', MOMCB001_1);
	momWidget.init(2, 'MOMCB001_1', MOMCB001_1);
	momWidget.init(5, 'MOMCB001_1', MOMCB001_1);

	MOMCB001_1.init();
});