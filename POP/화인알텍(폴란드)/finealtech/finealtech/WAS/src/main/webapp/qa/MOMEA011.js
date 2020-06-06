var locationParam = mCommon.getSearchParam();
var endPeriod;
var menuId;

if (locationParam.returnType == "MTP") {
	menuId = "MOMEA011"; 
} else if (locationParam.returnType == "MTW") {
	menuId = "MOMEA015";
} else {
	menuId = "MOMEA016";
}

var MOMEA011 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201901081055392961000cuJOZ9ki6Jy", null, function(){
				that.grid("grid1");
				if (locationParam.returnType == "MTP") {
					mCommon.init("grid2", "W201901081356222471000V0eNOGF25BS", null, function(){
						that.grid("grid2");
					}, Language);
				} else if (locationParam.returnType == "MTW") {
					mCommon.init("grid2", "W201901251207304531000Qp1Txo7LMOR", null, function(){
						that.grid("grid2");
					}, Language);
				} else {
					mCommon.init("grid2", "W201901251217365561000LCEp0AbUo1f", null, function(){
						that.grid("grid2");
					}, Language);
				}
			}, Language);
		});
		
		mCommon.splitter(".h01-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == 'grid1') {
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode(grid, "singleCell");
//			var strHearderFrom = "입고창고";
//			
//			if(locationParam.returnType == "MTW"){
//				strHearderFrom = "업체";
//				AUIGrid.setColumnPropByDataField("grid1", "locationName", { headerText:strHearderFrom })
//			} 
		} else if(grid == 'grid2') {
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode(grid, "singleCell");
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MARKET_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "marketCd", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["code"] + "(" + data[i]["name"] + ")";
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "codeName"
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "CURRENCY_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "currencyCd", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name"
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MATERIAL_RETURN_CATEGORY"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "returnCategory", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name"
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MATERIAL_RETURN_TYPE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "returnType", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name"
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy",
				type : "GET",
				data : {},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "vendorCd", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name"
							/*autoCompleteMode : true,
							autoEasyMode : true,
							type : "ComboBoxRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name"*/	
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : menuId},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
					        if(event.dataField == "updateDate") { // 달력 지정한 필드인 경우 
					        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
					        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
					                return event.oldValue; 
					        	} else {
					        		return to_date_yyyy_mm_dd(event.value);  
				                } 
					        }
					        return event.value; 
						}); 
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			var paramLocation;
//			if(locationParam.returnType == "MTP") {
//				 paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType}
//			} else 
			if (locationParam.returnType != "MTP") {
				
				AUIGrid.bind("grid2", "cellEditBegin", function(e) {
					if(locationParam.returnType == "MTO") {
						paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType, locationType : "TO"}
					} else if(locationParam.returnType == "MTW") {
						if(e.dataField == "returnLocation") {
							if(e.item.itemType == "RM" || e.item.itemType == "SM") {
								paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType, locationType : "TO_M"}
							} else if(e.item.itemType == "SP") {
								paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType, locationType : "TO_P"}
							}
						}
					}
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy",
						type : "GET",
						data : paramLocation,
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							AUIGrid.setColumnPropByDataField( grid, "returnLocation", {
								style:"columnStyle",
								labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
									var retStr = value;
									for(var i=0,len=data.length; i<len; i++) {
										if(data[i]["code"] == value) {
											retStr = data[i]["name"];
											break;
										}
									}
									return retStr;
								},
								editRenderer : {
									type : "DropDownListRenderer",
									showEditorBtnOver : true,
									list : data,
									keyField : "code", 
									valueField : "name"
								}				 		
						 	});
						},
						error: function(data){},
						fail : function(data){}
					});
					
				});
			}
			
			AUIGrid.setColumnPropByDataField(grid, "updateDate", {
				style:"columnStyle",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField(grid, "shipQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField(grid, "returnLocation", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField(grid, "description", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField(grid, "conversionUnitQty", { style:"columnStyle" } );
		}
		
		// Market, 환종, 출고일자 변경 시엔 단가, 환율 정보 조회하여 세팅하고, 업체 변경 시엔 단가 정보만 조회하여 하단 그리드에 세팅해준다.
		AUIGrid.bind("grid2", "cellEditEnd", function(e) {
			if(e.dataField == "shipQty") {
				AUIGrid.setCellValue("grid2", e.rowIndex, "conversionUnitQty", e.item.itemConversionUnitQty * e.item.shipQty);
			}
			if(e.dataField == "marketCd" || e.dataField == "currencyCd" || e.dataField == "vendorCd" || e.dataField == "updateDate") {
				// 사급반입 메뉴일 경우 매출단가 조회
				if(locationParam.returnType == "MTW") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
						type : "GET",
						data : {vendorCd : e.item.vendorCd, itemId : e.item.itemId, marketCd : e.item.marketCd, currencyCd : e.item.currencyCd, stateTime : e.item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", 0);
							}
						}
					});
				} 
				// 매입반품일 경우 매입단가 조회
				else if(locationParam.returnType == "MTP") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
						type : "GET",
						data : {vendorCd : e.item.vendorCd, itemId : e.item.itemId, marketCd : e.item.marketCd, currencyCd : e.item.currencyCd, stateTime : e.item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", 0);
							}
						}
					});
				} 
				// 외주반품일 경우 매입단가 조회
				else {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
						type : "GET",
						data : {vendorCd : e.item.vendorCd, itemId : e.item.itemId, marketCd : e.item.marketCd, currencyCd : e.item.currencyCd, stateTime : e.item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue("grid2", e.rowIndex, "unitPrice", 0);
							}
						}
					});
				} 
				
				if(e.dataField == "currencyCd" || e.dataField == "updateDate") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExchangeRate.dummy",
						type : "GET",
						data : {currencyCd : e.item.currencyCd, stateTime : e.item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid2", e.rowIndex, "exchangeRate", data[0].exchangeRate);
							} else {
								AUIGrid.setCellValue("grid2", e.rowIndex, "exchangeRate", 0);
							}
						}
					});
				}
			}
			
			if(locationParam.returnType == "MTO") {
				var vendorCd;
				var returnLocation;
				var detailGridData = AUIGrid.getGridData("grid2");
				
				if(e.dataField == "returnLocation") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.outsourcingVendor.dummy",
						type : "GET",
						data : {facilityCd : e.item.returnLocation},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								vendorCd = data[0].vendorCd;
							} else {
								vendorCd = "";
							}
							
							var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
							for(var i = e.rowIndex; i < detailGridData.length; i++) {
								AUIGrid.setCellValue("grid2", i, "returnLocation", item.returnLocation);
								AUIGrid.setCellValue("grid2", i, "vendorCd", vendorCd);
							}
							
						},
						error: function(data){
							AUIGrid.setCellValue("grid2", e.rowIndex, "vendorCd", "");
							AUIGrid.setCellValue("grid2", e.rowIndex, "vendorName", "");
						},
						fail : function(data){}
					});
					
					detailGridData = AUIGrid.getGridData("grid2");
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
							type : "GET",
							data : {vendorCd : detailGridData[i].vendorCd, itemId : detailGridData[i].itemId, marketCd : detailGridData[i].marketCd, currencyCd : detailGridData[i].currencyCd, stateTime : detailGridData[i].updateDate},
							async: false,
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									AUIGrid.setCellValue("grid2", i, "unitPrice", data[0].unitPrice);
								} else {
									AUIGrid.setCellValue("grid2", i, "unitPrice", 0);
								}
							}
						});
					}
				}
				
				if(e.dataField == "vendorCd") {
					var detailGridData = AUIGrid.getGridData("grid2");
					
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.outsourcingFacility.dummy",
						type : "GET",
						data : {vendorCd : e.item.vendorCd},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								returnLocation = data[0].facilityCd;
							} else {
								returnLocation = "";
							}
							
							var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
							for(var i = e.rowIndex; i < detailGridData.length; i++) {
								AUIGrid.setCellValue("grid2", i, "vendorCd", item.vendorCd);
								AUIGrid.setCellValue("grid2", i, "returnLocation", returnLocation);
							}
						},
						error: function(data){
							AUIGrid.setCellValue("grid2", e.rowIndex, "returnLocation", "");
						},
						fail : function(data){}
					});
					
					detailGridData = AUIGrid.getGridData("grid2");
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
							type : "GET",
							data : {vendorCd : detailGridData[i].vendorCd, itemId : detailGridData[i].itemId, marketCd : detailGridData[i].marketCd, currencyCd : detailGridData[i].currencyCd, stateTime : detailGridData[i].updateDate},
							async: false,
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									AUIGrid.setCellValue("grid2", i, "unitPrice", data[0].unitPrice);
								} else {
									AUIGrid.setCellValue("grid2", i, "unitPrice", 0);
								}
							}
						});
					}
				}
				
			} else if(locationParam.returnType == "MTW") {
				if(e.dataField == "returnLocation") {
					var detailGridData = AUIGrid.getGridData("grid2");
					var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						AUIGrid.setCellValue("grid2", i, "returnLocation", item.returnLocation);
					}
				}
				
				if(e.dataField == "vendorCd") {
					var detailGridData = AUIGrid.getGridData("grid2");
					
					var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						AUIGrid.setCellValue("grid2", i, "vendorCd", item.vendorCd);
					}
					
					detailGridData = AUIGrid.getGridData("grid2");
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
							type : "GET",
							data : {vendorCd : detailGridData[i].vendorCd, itemId : detailGridData[i].itemId, marketCd : detailGridData[i].marketCd, currencyCd : detailGridData[i].currencyCd, stateTime : detailGridData[i].updateDate},
							async: false,
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									AUIGrid.setCellValue("grid2", i, "unitPrice", data[0].unitPrice);
								} else {
									AUIGrid.setCellValue("grid2", i, "unitPrice", 0);
								}
							}
						});
					}
				}
			} else {
				if(e.dataField == "vendorCd") {
					var detailGridData = AUIGrid.getGridData("grid2");
					
					var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						AUIGrid.setCellValue("grid2", i, "vendorCd", item.vendorCd);
					}
					
					detailGridData = AUIGrid.getGridData("grid2");
					for(var i = e.rowIndex; i < detailGridData.length; i++) {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
							type : "GET",
							data : {vendorCd : detailGridData[i].vendorCd, itemId : detailGridData[i].itemId, marketCd : detailGridData[i].marketCd, currencyCd : detailGridData[i].currencyCd, stateTime : detailGridData[i].updateDate},
							async: false,
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									AUIGrid.setCellValue("grid2", i, "unitPrice", data[0].unitPrice);
								} else {
									AUIGrid.setCellValue("grid2", i, "unitPrice", 0);
								}
							}
						});
					}
				}
			}
			
			AUIGrid.setProp('grid2', 'exportURL', '0');
		});
		
//		if (locationParam.returnType == "MTP") {
//			$("#toLocation").css({"display":"none"});
//		}
	}, event: function() {
		var that = this;
		
		// 조회
		$(document).on("click", "#findBtn", function() {
			AUIGrid.clearGridData("grid2");
			var param = mCommon.formGetParam("#node");
			param.returnType = locationParam.returnType;
			mCommon.render("grid1", "W201901081055392961000cuJOZ9ki6Jy", param, function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_RETURN_MOMEA011_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
	
			for(var i = 0; i  < checkedItems.length; i++){
				var item  = checkedItems[i].item;
				var chk = true;
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue("grid2", "itemStockId", item.itemStockId); 
				for(var j = 0; j < items.length; j++){
					if(item.itemStockId == items[j].itemStockId){
						chk = false;
						break;
					}					
				}
					
				item.updateDate = get_current_date("yyyy-mm-dd");
				item.conversionUnitQty = item.itemConversionUnitQty * item.shipQty;
				
				// 사급반입 메뉴일 경우 매출단가 조회
				if(locationParam.returnType == "MTW") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
						type : "GET",
						data : {vendorCd : item.vendorCd, itemId : item.itemId, marketCd : item.marketCd, currencyCd : item.currencyCd, stateTime : item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								item.unitPrice = data[0].unitPrice;
							} else {
								item.unitPrice = 0;
							}
						}
					});
				}
				// 매입반품, 외주반품일 경우 매입단가 조회
				else {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
						type : "GET",
						data : {vendorCd : item.vendorCd, itemId : item.itemId, marketCd : item.marketCd, currencyCd : item.currencyCd, stateTime : item.updateDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								item.unitPrice = data[0].unitPrice;
							} else {
								item.unitPrice = 0;
							}
						}
					});
				}
				
				// 사급반입에서 업체정보 없을 경우 창고정보를 가져와 세팅하는 부분
				if (locationParam.returnType == "MTW") {
					if(item.vendorCd == '' || item.vendorCd == null) {
						item.vendorCd = item.locationCd;
						item.vendorName = item.locationName;
					}
				}
				
				if(chk) {
					AUIGrid.addRow("grid2", item, "last");
				}
				
				// 환율
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExchangeRate.dummy",
					type : "GET",
					data : {currencyCd : item.currencyCd, stateTime : item.updateDate},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							AUIGrid.setCellValue("grid2", i, "exchangeRate", data[0].exchangeRate);
						} else {
							AUIGrid.setCellValue("grid2", i, "exchangeRate", 0);
						}
					}
				});
			}
		});
		
		// 삭제
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2");
		});
		
		// 반품처리
		$(document).on("click", "#returnBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var param;
			if(checkedItems.length <= 0 ) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10447']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.shipQty <= 0 || checkedItems[i].item.shipQty == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11383']});
					return;
				}
				
				if(checkedItems[i].item.marketCd == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10044']});
					return;
				}
				
				if(checkedItems[i].item.currencyCd == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11657']});
					return;
				}
				
				if(checkedItems[i].item.unitPrice <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10296']});
					return;
				}
				
//				if(checkedItems[i].item.returnCategory == '') {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "반품구분을 선택해 주세요." });
//					return;
//				}
				
				if(checkedItems[i].item.returnType == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10437']});
					return;
				}
				
				if(checkedItems[i].item.vendorCd == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10848']});
					return;
				}
				
				if(checkedItems[i].item.updateDate == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11395']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.updateDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11393' + '@' + endPeriod)});
					return;
				}
				
				param = {
					itemRtnType : locationParam.returnType,
					tnxType : "CREATE"
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10446'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("D", "quality.materialReturn.materialReturnTemp", JSON.stringify(param), that.callBack, JSON.stringify(param), "delCall");
				}
			}});
		});
		
		// 하단 그리드 업체 콤보
		$(document).on("change", "#toLocation", function() {
			var grid2length = AUIGrid.getGridData("grid2").length;
			var toLocationCd = $("#toLocation").val();
			var returnLocation;
			for(var i = 0; i < grid2length; i++) {
				AUIGrid.setCellValue("grid2", i, "vendorCd", toLocationCd);
			}
			
			var detailGridData = AUIGrid.getGridData("grid2");
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.outsourcingFacility.dummy",
				type : "GET",
				data : {vendorCd : toLocationCd},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						returnLocation = data[0].facilityCd;
					} else {
						returnLocation = "";
					}
					
					var grid2length = AUIGrid.getGridData("grid2").length;
					for(var i = 0; i < grid2length; i++) {
						AUIGrid.setCellValue("grid2", i, "returnLocation", returnLocation);
					}
				},
				error: function(data){
					for(var i = 0; i < grid2length; i++) {
						AUIGrid.setCellValue("grid2", i, "returnLocation", returnLocation);
					}
				},
				fail : function(data){}
			});
			
			for(var i=0; i<grid2length; i++) {
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
					type : "GET",
					data : {vendorCd : detailGridData[i].vendorCd, itemId : detailGridData[i].itemId, marketCd : detailGridData[i].marketCd, currencyCd : detailGridData[i].currencyCd, stateTime : detailGridData[i].updateDate},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							AUIGrid.setCellValue("grid2", i, "unitPrice", data[0].unitPrice);
						} else {
							AUIGrid.setCellValue("grid2", i, "unitPrice", 0);
						}
					}
				});
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#node'), $('#itemName'), $('#findBtn'));
	}, 
	comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		var paramLocation;
		
		if (locationParam.returnType == "MTP") {
			 paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType}
		} else {
			 paramLocation = {facilityClassCd : "AREA", returnType : locationParam.returnType, locationType : "FROM"}
		}
		 
		// 창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
			paramLocation, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#customerName", comboOptions, options);
		});
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#toLocation", comboOptions, {local: data, textName:"name", valueName:"code", readonly:false});
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
		
		if (locationParam.returnType == "MTP") {
			$("#label-id1").text(Language.lang['MESSAGES11825']);
		} else if (locationParam.returnType == "MTW") {
			$("#label-id1").text(Language.lang['MESSAGES11826']);
		} else {
			$("#label-id1").text(Language.lang['MESSAGES11827']);
		}
	},
	callBack : function(param, data, callbackParam, flag) {
		var that = this.MOMEA011;
		var checkedItems = AUIGrid.getCheckedRowItems("grid2");
		var arrayList = [];
		for(var i=0; i<checkedItems.length; i++) {
			checkedItems[i].item.itemRtnType = locationParam.returnType;
			checkedItems[i].item.toLocationCd = checkedItems[i].item.returnLocation;
			checkedItems[i].item.tnxType = "CREATE";
			checkedItems[i].item.returnQty = checkedItems[i].item.shipQty;
			checkedItems[i].item.returnDate = checkedItems[i].item.updateDate;
			arrayList.push(checkedItems[i].item);
		}
		
		if(param == 'SUCCESS') {
			if(flag == "delCall") {
				mom_ajax("L", "quality.materialReturn.materialReturnTemp", JSON.stringify(arrayList), that.callBack, JSON.stringify(arrayList), "insCall");
				
			} else if(flag == "insCall") {
				var param = {
					itemRtnType : locationParam.returnType,
					tnxType : "CREATE"
				}
				mom_ajax("C", "quality.materialReturn.materialReturn", JSON.stringify(param), that.callBack, JSON.stringify(param), "procCall");
				
			} else {
				var param = mCommon.formGetParam("#node");
				param.returnType = locationParam.returnType;
				AUIGrid.clearGridData("grid2");
				mCommon.render("grid1", "W201901081055392961000cuJOZ9ki6Jy", param, function() {
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMEA011.init();
});