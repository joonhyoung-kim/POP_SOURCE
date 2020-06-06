var MOMEA011_1 = {
	returnType			: undefined,
	menuId				: undefined,
	
	locationType		: undefined,
	endPeriod			: undefined,
	
	paramLocation		: undefined,
	
	init: function() {	
		Language.init(function() {
		});
		
		this.event();
		momWidget.splitter('.h01-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
				momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				momWidget.dropDownPost(1, undefined, undefined, undefined, that);
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		AUIGrid.clearGridData(momWidget.grid[1]);
		this.initParam = {returnType: this.returnType};
	}/*, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'returnBtn2' && indexInfo['sequence'] == 4) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}*/, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnBtn2' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i]['toLocationCd'] = param[i]['returnLocation'];
		        param[i]['returnQty'] = param[i]['shipQty'];
		        param[i]['returnDate'] = param[i]['updateDate'];
			}
			
			this.initParam = {itemRtnType: this.returnType, tnxType: 'CREATE'};
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'returnBtn2' && indexInfo['sequence'] == 1) {
			for(var i=0; i<callBackParam.length; i++) {
				if(callBackParam[i]['shipQty'] <= 0 || callBackParam[i]['shipQty'] == '') {
					this.initMessage = Language.lang['MESSAGES11383'];
					return;
				} else if(callBackParam[i]['marketCd'] == '') {
					this.initMessage = Language.lang['MESSAGES10044'];
					return;
				} else if(callBackParam[i]['currencyCd'] == '') {
					this.initMessage = Language.lang['MESSAGES11657'];
					return;
				} else if(callBackParam[i]['unitPrice'] <= 0) {
					this.initMessage = Language.lang['MESSAGES10296'];
					return;
				} else if(callBackParam[i]['returnType'] == '') {
					this.initMessage = Language.lang['MESSAGES10437'];
					return;
				} else if(callBackParam[i]['vendorCd'] == '') {
					this.initMessage = Language.lang['MESSAGES10848'];
					return;
				} else if(callBackParam[i]['updateDate'] == '') {
					this.initMessage = Language.lang['MESSAGES11395'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['updateDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11393' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initParam = {itemRtnType: this.returnType, tnxType: 'CREATE'};
		}
	}, grid: function() {
		var that = this;
		this.returnType = momWidget.getSearchParam()['returnType'];
		if(this.returnType == 'MTP') {
			this.menuId = 'MOMEA011';
			this.paramLocation = {facilityClassCd: 'AREA', returnType: this.returnType};
		} else if(this.returnType == 'MTW') {
			this.menuId = 'MOMEA015';
			this.locationType = 'FROM';
			this.paramLocation = {facilityClassCd: 'AREA', returnType: this.returnType, locationType: this.locationType};
		} else {
			this.menuId = 'MOMEA016';
			this.locationType = 'TO';
			this.paramLocation = {facilityClassCd: 'AREA', returnType: this.returnType, locationType: this.locationType};
		}
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
	        if(e.dataField == 'updateDate') { // 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value);  
                } 
	        }
	        
	        return e.value; 
		}); 
		
		/* modify_hists
		 * XMOM 변환 / ljw / 20191106 / 하단 그리드 출고량 변경 시 환산수량 항목 품목관리에 등록된 환산수량 기준 값과 계산하여 자동으로 값 입력하도록 수정
		 * XMOM 변환 / ljw / 20191113 / 하단 그리드 Market, 환종, 출고일자 변경 시 단가, 환율 정보 조회하여 그리드에 세팅하고, 업체 변경 시엔 단가 정보 조회하여 그리드에 세팅 한다.
		 * 
		 * */
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			if(e.dataField == "shipQty") {
				AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "conversionUnitQty", e.item.itemConversionUnitQty * e.item.shipQty);
			}
			
			if(e.dataField == "marketCd" || e.dataField == "currencyCd" || e.dataField == "vendorCd" || e.dataField == "updateDate") {
				// 사급반입 메뉴일 경우 영업단가 조회
				if(that.returnType == "MTW") {
					mom_ajax("R", "common.comItemOutPrice", {vendorCd: e.item.vendorCd, itemId: e.item.itemId, marketCd: e.item.marketCd, currencyCd: e.item.currencyCd, stateTime: e.item.updateDate}, function(result, data) {
						if(data.length > 0) {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "unitPrice", data[0].unitPrice);
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "unitPrice", 0);
						}
					}, undefined, undefined, that, "sync");
				} else { // 매입반품, 외주반품 메뉴일 경우 자재단가 조회
					mom_ajax("R", "common.comItemInPrice", {vendorCd : e.item.vendorCd, itemId : e.item.itemId, marketCd : e.item.marketCd, currencyCd : e.item.currencyCd, stateTime : e.item.updateDate}, function(result, data) {
						if(data.length > 0) {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "unitPrice", data[0].unitPrice);
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "unitPrice", 0);
						}
					}, undefined, undefined, that, "sync");
				}
				
				if(e.dataField == "currencyCd" || e.dataField == "updateDate") {
					mom_ajax("R", "common.comExchangeRate", {currencyCd: e.item.currencyCd, stateTime: e.item.updateDate}, function(result, data) {
						if(data.length > 0) {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "exchangeRate", data[0].exchangeRate);
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "exchangeRate", 0);
						}
					}, undefined, undefined, that, "sync");
				}
			}
			
			// 반품창고 수정 시
			if(e.dataField == "returnLocation") {
				// 외주반품 메뉴일 경우
				if(that.returnType == "MTO") {
					var vendorCd;
					var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
					
					mom_ajax("R", "common.outsourcingVendor", {facilityCd: e.item.returnLocation}, function(result, data) {
						if(result == "SUCCESS") {
							if(data.length > 0) {
								vendorCd = data[0].vendorCd;
							} else {
								vendorCd = "";
							}
							
							var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
							for(var i=e.rowIndex; i<detailGridData.length; i++) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "returnLocation", item.returnLocation);
								AUIGrid.setCellValue(momWidget.grid[1], i, "vendorCd", vendorCd);
							}
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "vendorCd", "");
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "vendorName", "");
						}
					}, undefined, undefined, that, "sync");
					
					for(var i=e.rowIndex; i<detailGridData.length; i++) {
						mom_ajax("R", "common.comItemInPrice", {vendorCd: detailGridData[i].vendorCd, itemId: detailGridData[i].itemId, marketCd: detailGridData[i].marketCd, currencyCd: detailGridData[i].currencyCd, stateTime: detailGridData[i].updateDate}, function(result, data) {
							if(data.length > 0) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", 0);
							}
						}, undefined, undefined, that, "sync");
					}
				} else if(that.returnType == "MTW") { // 사급반입 메뉴일 경우
					var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
					var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
					for(var i=e.rowIndex; i<detailGridData.length; i++) {
						AUIGrid.setCellValue(momWidget.grid[1], i, "returnLocation", item.returnLocation);
					}
				}
			}
			
			// 업체 수정시
			if(e.dataField == "vendorCd") {
				// 외주반품 메뉴일 경우
				if(that.returnType == "MTO") {
					var returnLocation;
					var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
					mom_ajax("R", "common.outsourcingFacility", {vendorCd: e.item.vendorCd}, function(result, data) {
						if(result == "SUCCESS") {
							if(data.length > 0) {
								returnLocation = data[0].facilityCd;
							} else {
								returnLocation = "";
							}
							
							var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
							for(var i=e.rowIndex; i<detailGridData.length; i++) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "vendorCd", item.vendorCd);
								AUIGrid.setCellValue(momWidget.grid[1], i, "returnLocation", returnLocation);
							}
						} else {
							AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "returnLocation", "");
						}
					}, undefined, undefined, that, "sync");
					
					for(var i=e.rowIndex; i<detailGridData.length; i++) {
						mom_ajax("R", "common.comItemInPrice", {vendorCd: detailGridData[i].vendorCd, itemId: detailGridData[i].itemId, marketCd: detailGridData[i].marketCd, currencyCd: detailGridData[i].currencyCd, stateTime: detailGridData[i].updateDate}, function(result, data) {
							if(data.length > 0) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", 0);
							}
						}, undefined, undefined, that, "sync");
					}
				} else if(that.returnType == "MTW") { // 사급반입 메뉴일 경우
					var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
					var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
					for(var i=e.rowIndex; i<detailGridData; i++) {
						AUIGrid.setCellValue(momWidget.grid[1], i, "vendorCd", item.vendorCd);
						
						mom_ajax("R", "common.comItemOutPrice", {vendorCd: detailGridData[i].vendorCd, itemId: detailGridData[i].itemId, marketCd: detailGridData[i].marketCd, currencyCd: detailGridData[i].currencyCd, stateTime: detailGridData[i].updateDate}, function(result, data) {
							if(data.length > 0) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", 0);
							}
						}, undefined, undefined, that, "sync");
					}
				} else { // 매입반품(MTP) 메뉴일 경우
					var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
					var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
					for(var i=e.rowIndex; i<detailGridData.length; i++) {
						AUIGrid.setCellValue(momWidget.grid[1], i, "vendorCd", item.vendorCd);
						
						mom_ajax("R", "common.comItemInPrice", {vendorCd: detailGridData[i].vendorCd, itemId: detailGridData[i].itemId, marketCd: detailGridData[i].marketCd, currencyCd: detailGridData[i].currencyCd, stateTime: detailGridData[i].updateDate}, function(result, data) {
							if(data.length > 0) {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue(momWidget.grid[1], i, "unitPrice", 0);
							}
						}, undefined, undefined, that, "sync");
					}
				}
			}
		});
		
		var param;
		if(that.returnType != 'MTP') { // 매입반품 메뉴가 아닌 경우
			AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
				if(that.returnType == 'MTO') { // 외주반품 메뉴 이면
					param = {facilityClassCd : 'AREA', returnType : that.returnType, locationType : 'TO'}
				} else if(that.returnType == 'MTW') { // 사급반입 메뉴 이면
					if(e.dataField == 'returnLocation') { // 반품창고 수정 시
						if(e.item['itemType'] == 'RM' || e.item['itemType'] == 'SM') { // 원자재, 부자재는 자재팀창고만 조회하도록
							param = {facilityClassCd: 'AREA', returnType: that.returnType, locationType: 'TO_M'}
						} else if(e.item['itemType'] == 'SP') { // 반제품은 생산팀창고만 조회하도록
							param = {facilityClassCd: 'AREA', returnType: that.returnType, locationType: 'TO_P'}
						}
					}
				}
				
				momWidget.setColumnPropByDropDown(1, 'returnLocation', 'common.dynamicFacility', param); 
			}); 
		}		
	}/*, comboBox: function() {
		mom_ajax('R', 'common.comVendor', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			momWidget.createDropDown('toLocation', data, undefined, 19);
		});
	}*/, event: function() {
		var that = this;
		
//		momWidget.clickCancelBtn2(1);
		
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
	
			for(var i = 0; i  < checkedItems.length; i++) {
				var item  = checkedItems[i].item;
				var chk = true;
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue(momWidget.grid[1], 'itemStockId', item['itemStockId']); 
				for(var j = 0; j < items.length; j++){
					if(item['itemStockId'] == items[j]['itemStockId']) {
						chk = false;
						break;
					}					
				}
					
				item['updateDate'] = get_current_date('yyyy-mm-dd');
				item['conversionUnitQty'] = item['itemConversionUnitQty'] * item['shipQty'];
				
				// 사급반입 메뉴일 경우 매출단가 조회
				if(that.returnType == 'MTW') {
					mom_ajax('R', 'common.comItemOutPrice', {vendorCd: item['vendorCd'], itemId: item['itemId'], marketCd: item['marketCd'], currencyCd: item['currencyCd'], stateTime: item['updateDate']}, function(result, data) {
						if(data.length > 0) {
							item['unitPrice'] = data[0]['unitPrice'];
						} else {
							item['unitPrice'] = 0;
						}
					}, undefined, undefined, that, 'sync'); 
				} else { 	// 매입반품, 외주반품일 경우 매입단가 조회
					mom_ajax('R', 'common.comItemInPrice', {vendorCd: item['vendorCd'], itemId: item['itemId'], marketCd: item['marketCd'], currencyCd: item['currencyCd'], stateTime: item['updateDate']}, function(result, data) {
						if(data.length > 0) {
							item['unitPrice'] = data[0]['unitPrice'];
						} else {
							item['unitPrice'] = 0;
						}
					}, undefined, undefined, that, 'sync');
				}
				
				// 사급반입에서 업체정보 없을 경우 창고정보를 가져와 세팅하는 부분
				if(that.returnType == 'MTW' && (item['vendorCd'] == '' || item['vendorCd'] == null)) {
					item['vendorCd'] = item['locationCd'];
					item['vendorName'] = item['locationName'];
				}
				
				if(chk) {
					AUIGrid.addRow(momWidget.grid[1], item, 'last');
				}
				
				// 환율
				mom_ajax('R', 'common.comExchangeRate', {currencyCd: item['currencyCd'], stateTime: item['updateDate']}, function(result, data) {
					if(data.length > 0) {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'exchangeRate', data[0]['exchangeRate']);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'exchangeRate', 0);
					}
				}, undefined, undefined, that, 'sync');
			}
		});
		
		$(document).on('change', '#toLocation', function() {
			var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
			var toLocationCd = $('#toLocation').val();
			for(var i = 0; i < grid2length; i++) {
				AUIGrid.setCellValue(momWidget.grid[1], i, 'vendorCd', toLocationCd);
			}
			
			mom_ajax('R', 'common.outsourcingFacility', {vendorCd: toLocationCd}, function(result, data) {
				var returnLocation = '';
				if(result == 'SUCCESS' && data.length > 0) {
					returnLocation = data[0].facilityCd; 
				}
				
				for(var i = 0; i < grid2length; i++) {
					AUIGrid.setCellValue(momWidget.grid[1], i, 'returnLocation', returnLocation);
				}
			}, undefined, undefined, that, 'sync');
			
			var detailGridData = AUIGrid.getGridData(momWidget.grid[1]);
			for(var i = 0; i < grid2length; i++) {
				mom_ajax('R', 'common.comItemInPrice', {vendorCd: detailGridData[i]['vendorCd'], itemId: detailGridData[i]['itemId'], marketCd: detailGridData[i]['marketCd'], currencyCd: detailGridData[i]['currencyCd'], stateTime: detailGridData[i]['updateDate']}, function(result, data) {
					if(data.length < 1) {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'unitPrice', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], i, 'unitPrice',  data[0]['unitPrice']);
					}
				}, undefined, undefined, that, 'sync');
			}
		});
	}
};

$(document).ready(function(event) {
	var returnType = momWidget.getSearchParam()['returnType'];
	momWidget.init(1, 'MOMEA011_1', MOMEA011_1);
	if(returnType == "MTP") {
		momWidget.init(2, 'MOMEA011_1', MOMEA011_1);
	} else if(returnType == "MTW") {
		momWidget.init(2, 'MOMEA015_1', MOMEA011_1);
	} else {
		momWidget.init(2, 'MOMEA016_1', MOMEA011_1);
	}
	MOMEA011_1.init();
});

