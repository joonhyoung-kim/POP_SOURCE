var endPeriod;

var MOMEA012 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W20190111235408589100005xNHaw9UnM", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201901120015164191001fcBVBmtYf9c", null, function() {
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".h01-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == 'grid1') {
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode(grid, "singleCell");
		} else if(grid == 'grid2') {
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode(grid, "singleCell");
			AUIGrid.bind('grid2', "cellEditBegin", function(e) {
				AUIGrid.setProp('grid2', 'exportURL', '0');	
			});
		
		// 반품유형
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "PRODUCT_RETURN_TYPE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "returnType", {
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
			}
		});
		
		// 반품창고
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy",
			type : "GET",
			data : {returnType : "P", locationType : "TO"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "returnLocation", {
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
			}
		});
		
		// Market
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "MARKET_CODE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "marketCd", {
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
			}
		});
		
		// 환종
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
		
		AUIGrid.setColumnPropByDataField("grid2", "returnDate", {
			style:"columnStyle",
			editRenderer : {
				 type : "CalendarRenderer",
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		AUIGrid.setColumnPropByDataField("grid2", "returnQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField("grid2", "description", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField("grid2", "conversionUnitQty", { style:"columnStyle" } );
		
		// Market, 환종, 출고일자 변경 시엔 단가, 환율 정보 조회하여 세팅하고, 업체 변경 시엔 단가 정보만 조회하여 하단 그리드에 세팅해준다.
		AUIGrid.bind("grid2", "cellEditEnd", function(e) {
			if(e.dataField == "returnQty") {
				AUIGrid.setCellValue("grid2", e.rowIndex, "conversionUnitQty", e.item.itemConversionUnitQty * e.item.returnQty);
			}
			if(e.dataField == "marketCd" || e.dataField == "currencyCd" || e.dataField == "returnDate") {
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
					type : "GET",
					data : {vendorCd : e.item.vendorCd, itemId : e.item.itemId, marketCd : e.item.marketCd, currencyCd : e.item.currencyCd, stateTime : e.item.returnDate},
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
				
				if(e.dataField == "currencyCd" || e.dataField == "returnDate") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExchangeRate.dummy",
						type : "GET",
						data : {currencyCd : e.item.currencyCd, stateTime : e.item.returnDate},
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
		});
		
		// 수불통제일에 대한 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMEA012"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
						if(event.dataField == "returnDate") { // 달력 지정한 필드인 경우 
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
		
		}
		
	}, event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function() {
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W20190111235408589100005xNHaw9UnM", mCommon.formGetParam("#node"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "PRODUCT_RETURN_MOMEA012_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택
		$(document).on("click", "#choiceBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0 ) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			AUIGrid.clearGridData("grid2");
	
			for(var i = 0; i  < checkedItems.length; i++) {
				var item  = checkedItems[i].item;
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue("grid2", "itemStockId", item.itemStockId); 
				for(var j = 0; j < items.length; j++){
					if(item.itemStockId == items[j].itemStockId){
						return;
					}					
				}
				
				item.returnQty = 0;
				item.returnDate = get_current_date("yyyy-mm-dd");
				item.conversionUnitQty = item.itemConversionUnitQty * item.returnQty;
				AUIGrid.addRow("grid2", item, "last");
				
				// 환율
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExchangeRate.dummy",
					type : "GET",
					data : {currencyCd : item.currencyCd, stateTime : item.returnDate},
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
				
				// 매출단가
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
					type : "GET",
					data : {vendorCd : item.vendorCd, itemId : item.itemId, marketCd : item.marketCd, currencyCd : item.currencyCd, stateTime : item.returnDate},
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
		
		// 삭제
		$(document).on("click", "#delBtn", function() {
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
				if(checkedItems[i].item.returnQty <= 0 || checkedItems[i].item.returnQty == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10435']});
					return;
				}
				
				if(checkedItems[i].item.returnType == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10437']});
					return;
				}
				
				if(checkedItems[i].item.returnLocation == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10444']});
					return;
				}
				
				if(checkedItems[i].item.returnDate == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10440']});
					return;
				}
				
				if(checkedItems[i].item.marketCd == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10044']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.returnDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES10439' + '@' + endPeriod)});
					return;
				}
				
				param = {
					itemRtnType : "P",
					tnxType : "CREATE"
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10446'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("D", "quality.productReturn.productReturnTemp", JSON.stringify(param), that.callBack, JSON.stringify(param), "delCall");
				}
			}});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#node'), $('#itemName'), $('#findBtn'));
	},
	comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 고객사
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
			{returnType : "P", locationType : "FROM"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#customerName", comboOptions, options);
		});
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack : function(result, data, param, callbackParam, flag) {
		var that = this.MOMEA012;
		var checkedItems = AUIGrid.getCheckedRowItems("grid2");
		var arrayList = [];
		for(var i=0; i<checkedItems.length; i++) {
			checkedItems[i].item.itemRtnType = "P";
			checkedItems[i].item.tnxType = "CREATE";
			checkedItems[i].item.toLocationCd = checkedItems[i].item.returnLocation;
			checkedItems[i].item.returnQty = checkedItems[i].item.returnQty;
			checkedItems[i].item.returnDate = checkedItems[i].item.returnDate;
			checkedItems[i].item.vendorCd = checkedItems[i].item.vendorCd;
			arrayList.push(checkedItems[i].item);
		}
		
		if(result == "SUCCESS") {
			if(flag == "delCall") {
				mom_ajax("L", "quality.productReturn.productReturnTemp", JSON.stringify(arrayList), that.callBack, JSON.stringify(arrayList), "insCall");
				
			} else if(flag == "insCall") {
				var param = {
					itemRtnType : "P",
					tnxType : "CREATE"
				}
				mom_ajax("C", "quality.productReturn.productReturn", JSON.stringify(param), that.callBack, JSON.stringify(param), "procCall");
				
			} else {
				var param = mCommon.formGetParam("#node");
				AUIGrid.clearGridData("grid2");
				mCommon.render("grid1", "W20190111235408589100005xNHaw9UnM", param, function() {
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
	MOMEA012.init();
});