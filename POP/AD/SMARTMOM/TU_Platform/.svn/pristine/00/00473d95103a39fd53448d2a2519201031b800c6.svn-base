var MOMCE005_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	stockType			: undefined,
	menuId				: undefined,
	
	defaultLocation		: undefined, 
	endPeriod			: undefined,
	
	allowMinusQty		: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
		this.event();
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
				momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				momWidget.dropDownPost(1, 'RESERVED', function(result, data) {
					if(result == 'SUCCESS' && data.length > 0) {
						that.defaultLocation = data[0];
					}
				}, undefined, that);
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = {stockType: this.stockType};
			AUIGrid.clearGridData(momWidget.grid[1]);
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
	
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'moveBtn2' && indexInfo['sequence'] == 4) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'moveBtn2' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['toLocationCd'] == undefined || callBackParam[i]['toLocationCd'] == '') {
					this.initMessage = Language.getLang('MESSAGES11574' + '@' + param[i]['itemId']);
					return;
				} else if(callBackParam[i]['moveDate'] == undefined || callBackParam[i]['moveDate'] == '') {
					this.initMessage = Language.getLang('MESSAGES11573' + '@' + param[i]['itemId']);
					return;
				} else if(callBackParam[i]['moveQty'] == undefined || callBackParam[i]['moveQty'] == '') {
					this.initMessage = Language.getLang('MESSAGES11570' + '@' + param[i]['itemId']);
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['moveDate']) <= this.endPeriod) {
					console.log('param = ' + JSON.stringify(param[i]));
					console.log('callBackParam = ' + JSON.stringify(callBackParam[i]));
					this.initMessage = Language.getLang('MESSAGES11572' + '@' + param[i]['itemId'] + '@' + this.endPeriod);
					return;
				} else if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['currentQty'] >= 0) {
						if(callBackParam[i]['moveQty'] > callBackParam[i]['currentQty']) {
							this.initMessage = Language.getLang('MESSAGES11571' + '@' + param[i]['itemId']);
							return;
						}
					} else {
						this.initMessage = Language.getLang('MESSAGES11575' + '@' + param[i]['itemId']);
						return;
					}
				}
			}
	
			this.initMessage = 'CLEAR_PARAM';
			this.initParam = {stockType: this.stockType};
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
		
		/*var toLocationData; 
		var that = this;
		mom_ajax('R', 'common.toFacility', {facilityClassCd: 'AREA', stockType: this.stockType}, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			
			toLocationData = data;
			that.defaultLocation = data[0];
		}, undefined, undefined, this, 'sync');*/
		
		var that = this;
		mom_ajax('R', 'common.comParameter', {facilityClassCd: 'AREA', stockType: this.stockType}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				//momWidget.messageBox({type:'danger', width:'400', height: '145',  html:Language.lang['MESSAGES10821']});
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'moveDate') { // 달력 지정한 필드인 경우 
				if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(that.endPeriod)) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue; 
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		}); 
		
		tuCommon.cellEditEnd(momWidget.grid[1]);
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			 if(e.dataField == 'toLocationCd') {
				 var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
				 var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
				 for(var i = e.rowIndex + 1; i < grid2length; i++) {
					 AUIGrid.setCellValue(momWidget.grid[1], i, 'toLocationCd', item.toLocationCd);
				 }
			 }
		});
	}, event: function() {
		var that = this;
		
		$(document).on('click', '#choiceBtn1', function(){
			$('#toLocation').val('');
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0 ) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11179']});
				return;
			}
			
			var detailRowCount = AUIGrid.getRowCount(momWidget.grid[1]);	
			for(var i = 0; i < checkedItems.length; i++) {
				var item = checkedItems[i]['item'];
				
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue(momWidget.grid[1], 'itemId', item['itemId']); 
				for(var j = 0; j < items.length; j++) {
					if(item.itemStockId == items[j]['itemStockId']) {
						momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.getLang('MESSAGES11578' + '@' + item.itemId + '@' + item.itemName + '@' + item.fromLocationName)});
						return;
					}					
				}
				
				if(that.defaultLocation != undefined) {
					item['toLocationCd'] = that.defaultLocation['code'];
				}
				
				item.moveDate = get_current_date('yyyy-mm-dd');
				AUIGrid.addRow(momWidget.grid[1], item, 'last');
				
				if(item.currentQty > 0) {
					AUIGrid.setCellValue(momWidget.grid[1], i + detailRowCount, 'moveQty', item['currentQty']);
				}
				
				// 선택 버튼 클릭 시 이동창고 Default 빈 값, 사용자가 무조건 선택하게 하도록 적용
				AUIGrid.setCellValue(momWidget.grid[1], i + detailRowCount, 'toLocationCd', '');
			}
		});
		
		// 하단 그리드 이동창고 콤보
		$(document).on('change', '#toLocation', function() {
			var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
			var toLocationCd = $('#toLocation').val();
			 for(var i = 0; i < grid2length; i++) {
				 AUIGrid.setCellValue(momWidget.grid[1], i, 'toLocationCd', toLocationCd);
			 }
		});
		
		momWidget.clickCancelBtn2(1);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCE005_1', MOMCE005_1);
	momWidget.init(2, 'MOMCE005_1', MOMCE005_1);
	MOMCE005_1.init();
});

