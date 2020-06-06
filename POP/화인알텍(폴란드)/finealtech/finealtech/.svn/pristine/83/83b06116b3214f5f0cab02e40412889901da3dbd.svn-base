var locationParam = mCommon.getSearchParam();
var userId = sessionStorage.getItem("userId");
var empAuthority = sessionStorage.getItem("empAuthority");
var vendorCd = sessionStorage.getItem("vendorCd");
var gvMenuId = "MOMCC003";
var gvTableId = "MOM_ITEM_STOCK";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var reportUrl = "";
var endPeriod;

var MOMCC003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		if(locationParam.ctrType == 'CANCEL') {
			Language.init(function() {
				mCommon.init("grid", "W201807301629103861001UBenmm7VWe9", null, function(){
					that.grid();
				}, Language);
			});
		} else {
			Language.init(function() {
				mCommon.init("grid", "W2018113002520303110017jwqld5BUHX", null, function(){
					that.grid();
				}, Language);
			});
		}
		
	}, grid: function() {
		var that = this;
		
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		var totalInputQty;
		var totalInputAmount;
		
		tuCommon.cellClick('grid');
		AUIGrid.setSelectionMode("grid", "singleCell");
		AUIGrid.bind('grid', "cellEditBegin", function(event){ 
			AUIGrid.setProp('grid', 'exportURL', '0');
		});
		AUIGrid.setColumnPropByDataField("grid", "description", {style:"columnStyle"} );
		if(locationParam.ctrType == "CANCEL") {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMCC003"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
							if(event.dataField == "cancelDate") { // 달력 지정한 필드인 경우 
								if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
									return event.oldValue; 
								} else {
									return to_date_yyyy_mm_dd(event.value);
								} 
							}
							return event.value; 
							AUIGrid.setProp('grid', 'exportURL', '0');
						}); 
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			//Edit 가능한 컬럼
			AUIGrid.setColumnPropByDataField("grid", "cancelDate", {style:"columnStyle"} );
			
			//취소일자 달력
			that.datePickerSet("grid", "cancelDate", "CalendarRenderer", false);
			
			AUIGrid.bind('grid', 'cellEditBegin', function(e) {
				if(e.dataField == 'conversionUnitQty') {
					return false;
				}
				AUIGrid.setProp('grid', 'exportURL', '0');
			});
		} else {
			//market
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MARKET_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid", "marketCd", {
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
			
			//환종
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "CURRENCY_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid", "currencyCd", {
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
			AUIGrid.bind('grid', "cellEditEnd", function(event){ 
				var inputDate = event.item.createDate;
				var currencyParam;
				inputDate = inputDate.substr(0,10);
				if(event.dataField == 'currencyCd') {
					//setup관리의 기본환종
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comParameter.dummy",
						type : "GET",
						data : {},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							currencyParam = data[0].currencyCd;
						},
						error: function(data){},
						fail : function(data){}
					});
					//환율
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExchangeRate.dummy",
						type : "GET",
						data : {currencyCd : event.item.currencyCd, stateTime : inputDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid", event.rowIndex, "exchangeRate", data[0].exchangeRate);
							} else {
								if(currencyParam == event.item.currencyCd) {
									AUIGrid.setCellValue("grid", event.rowIndex, "exchangeRate", "1");
								} else{
									AUIGrid.setCellValue("grid", event.rowIndex, "exchangeRate", "0");
								}
							}
						},
						error: function(data){},
						fail : function(data){}
					});
					
				} 
				if(event.dataField == 'currencyCd' || event.dataField == 'marketCd') {
					//매입단가
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInPrice.dummy",
						type : "GET",
						data : {currencyCd : event.item.currencyCd, marketCd : event.item.marketCd, 
							vendorCd : event.item.vendorCd, itemId : event.item.itemId, stateTime : inputDate},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid", event.rowIndex, "unitPrice", data[0].unitPrice);
							} else {
								AUIGrid.setCellValue("grid", event.rowIndex, "unitPrice", "0");
							}
						},
						error: function(data){},
						fail : function(data){}
					});
				}
				AUIGrid.setProp('grid', 'exportURL', '0');
			});
			//Edit 가능한 컬럼
			AUIGrid.setColumnPropByDataField("grid", "conversionUnitQty", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid", "marketCd", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid", "currencyCd", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid", "exchangeRate", {style:"columnStyle"} );
		}
		
		var footerObject = [
			{
	        	dataField : "qty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalInputQty = value;
				}
	        },
	        {
	        	dataField : "inoutPrice",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalInputAmount = Language.lang['MESSAGES11031'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
			{
	        	dataField : "cancelQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + Language.lang['MESSAGES11048'] + ": " + AUIGrid.formatNumber(totalInputQty - value, "#,##0.0000", "rounding")
							+ " / " + totalInputAmount;
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
		$(".aui-grid-default-footer").css({"text-align": "left"});
	}, event: function() {
		var that = this;
		// 조회
		$("#findBtn").click(function(event){
			if(empAuthority <= 5 && vendorCd ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10570']});
				return;
			}
			if(locationParam.ctrType == 'CANCEL') {
				mCommon.render("grid", "W201807301629103861001UBenmm7VWe9",  mCommon.formGetParam("#form"), function(){});
			} else {
				mCommon.render("grid", "W2018113002520303110017jwqld5BUHX",  mCommon.formGetParam("#form"), function(){});
			}
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_INPUT_STATUS_MOMCC003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 입고취소
		$(document).on("click", "#inputCancel", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11345']});
				return;
			} else {
				for(var i=0; i<checkedItems.length; i++){
					if(checkedItems[i].item.cancelQty == checkedItems[i].item.qty) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11006']});
						return;
					}
					
					if(checkedItems[i].item.cancelDate == '' || checkedItems[i].item.cancelDate == null) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11485']});
						return;
					}
						
					if(checkedItems[i].item.createDate.substr(0, 10) > checkedItems[i].item.cancelDate) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11481']});
						return;
					}
					
//					if(checkedItems[i].item.ioCategory == "R004") {
//						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"외주임가공입고품은 입고취소가 불가능 합니다."});
//						return;
//					}
					
					if(to_date_yyyy_mm_dd(checkedItems[i].item.cancelDate) <= endPeriod) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11484' + '@' + endPeriod)});
						return;
					}
					
					arrayList[i] = checkedItems[i].item;
				}
				var option = {
						type:"info", 
						width:"400", 
						height: "145", 
						html:Language.lang['MESSAGES11030'], 
						closeButton:{text:"Close"}, 
						okButton:{
							text:"OK", 
							after:function(){
//								mom_ajax("L", "purchase.materialLedger.materialInputStatus.cancelMaterialInput", JSON.stringify(arrayList), that.callBack, checkedItems, "procCall");
								var param = {
									menuId : gvMenuId
									, tableId : gvTableId
								};
								mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems);
							}
						}
				};
				
				micaCommon.messageBox(option);
			}
		});
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var itemInputIds = "";
			var cnt;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i == 0) {
					itemInputIds += "\'" + checkedItems[i].item.itemInputId + "\'";
				} else {
					itemInputIds += "\, \'" + checkedItems[i].item.itemInputId + "\'";
				}
				
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.materialLedger.materialInputStatus.materialInputExcelPrintCount.dummy",
					type : "GET",
					data : {itemInputIds : itemInputIds},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						cnt = data[0].rowCount;
					},
					error: function(data){},
					fail : function(data){}
				});
			}
			
			if(cnt <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11464']});
				return;
			}
			
			var itemInputIdsUrl = itemInputIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCC003";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&itemInputIds=" + itemInputIdsUrl + "&excelId=MOMCC003&pId=MOMCC003";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.materialLedger.materialInputStatus.materialInputExcelPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
		
		// 저장
		$(document).on("click", "#saveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11340']});
				return;
			}
			
			var chkFlag = false;
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = { 
									currencyCd : checkedItems[i].item.currencyCd,
									marketCd : checkedItems[i].item.marketCd,
									conversionUnitQty : checkedItems[i].item.conversionUnitQty,
									exchangeRate : checkedItems[i].item.exchangeRate,
									description : checkedItems[i].item.description,
									itemStockInoutId : checkedItems[i].item.itemStockInoutId
							};
							if(i == checkedItems.length - 1) {
								chkFlag = true;
							}
							mom_ajax("U", "purchase.materialLedger.materialInputStatus.materialInputStatusSave", JSON.stringify(param), that.saveCallBack, chkFlag);
						}
					}
				}});
			});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#itemStockId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#orderId'), $('#findBtn'));
	},
	comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10){
			mm = "0" + mm;
		}
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 날짜검색콤보
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_DATE"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#dateCombo",{searchMode : "containsignorecase", selectedIndex:0}, {local: data, textName : "name", valueName : "code"});
		});
		
		// 업체검색콤보
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "VENDOR_COMBO"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#vendorCombo",{searchMode : "containsignorecase", selectedIndex:0}, {local: data, textName : "name", valueName : "code"});
		});
		
		//마감유무, 취소유무
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#endFlag",comboOptions, options);
				micaCommon.comboBox.set("#cancelFlag",comboOptions, options);
			}
		);
		
		// 입고창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", facilityType:"'FAC200', 'FAC300'"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#locationName",comboOptions, options);
			}
		);
		
		// 입고유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "IO_CATEGORY", attribute4: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inputType",comboOptions, options);
			}
		);
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
		
		//품목유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ITEM_TYPE"}, // 파라미터 //attribute 설정 필요
				function(data) {
					micaCommon.comboBox.set("#itemType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
		
		//market
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "MARKET_CODE"}, // 파라미터 
				function(data) {
					micaCommon.comboBox.set("#priceFlag",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);

		// 업체, 납품업체
		if(empAuthority > 5 || (empAuthority > 5 && vendorCd == "")){
			mCommon.comboBoxClickCall("#vendorName", function(callBack) {
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{attribute1 : 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#vendorName",comboOptions, options);
						callBack();
					}
				);
			});
			
		} else if(empAuthority <= 5 && vendorCd != ""){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comGetVendor.dummy", // 호출 URL
				{vendorCd : vendorCd}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#vendorName",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: true});
				}
			);
			$("#vendorName").jqxComboBox({disabled : true});
			
		} else if(empAuthority <= 5 && vendorCd ==""){
			$("#vendorName").val(Language.lang['MESSAGES10845']);
			$("#vendorName").jqxComboBox({disabled : true});
		}
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	datePickerSet : function(grid, field, type, showExDay) {
		var requestDateColumn = AUIGrid.getColumnItemByDataField(grid, field);
		requestDateColumn.editRenderer = {
				type : type,
	            showExtraDays : showExDay,
	            openDirectly : true,
				onlyCalendar : false,
	            defaultFormat : "yyyy-mm-dd",
	            titles : [Language.lang['MESSAGES11017'], Language.lang['MESSAGES10968'], Language.lang['MESSAGES11636'], Language.lang['MESSAGES10715'], 
	        	      	  Language.lang['MESSAGES10416'], Language.lang['MESSAGES10247'], Language.lang['MESSAGES11510']]
		}
		AUIGrid.setColumnPropByDataField(grid, field, requestDateColumn);
		
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(param, data, callbackParam) {
		var that = this.MOMCC003;
		
		if(param == 'SUCCESS'){
			mCommon.render("grid", "W201807301629103861001UBenmm7VWe9", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	saveCallBack : function(param, data, callbackParam) {
		var that = this.MOMCC003;
		if(param == 'SUCCESS'){
			if(callbackParam == true) {
				mCommon.render("grid", "W2018113002520303110017jwqld5BUHX", mCommon.formGetParam("#form"), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				});
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	tempInsertCallback : function(param, data, callbackParam){
		var that = this.MOMCC003;
		var arrayList = [];
		if(param == 'SUCCESS'){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : gvMenuId
					, tableId : gvTableId
					, colId1 : 'ITEM_STOCK_INOUT_ID'
					, value1 : callbackParam[i].item.itemStockInoutId
					, colId2 : 'ITEM_STOCK_ID'
					, value2 : callbackParam[i].item.itemStockId
					, colId3 : 'MATERIAL_ORDER_ID'
					, value3 : callbackParam[i].item.materialOrderId
					, colId4 : 'MATERIAL_DEPARTURE_ID'
					, value4 : callbackParam[i].item.itemDepartureId
					, colId5 : 'IO_TIME'
					, value5 : callbackParam[i].item.cancelDate
					, colId6 : 'CANCEL_QTY'
					, value6 : callbackParam[i].item.remainQty
					, colId7 : 'DESCRIPTION'
					, value7 : callbackParam[i].item.description
					}
				);
			}
			
			mom_ajax('L', 'common.dataMultiDelTmp', JSON.stringify(arrayList), that.procListCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	procListCallback : function(param, data){
		var that = this.MOMCC003;
		var parameters = {
			menuId : gvMenuId
			, tableId : gvTableId
		};
		if(param == 'SUCCESS'){
			mom_ajax('C', 'purchase.materialLedger.materialInputStatus.cancelMaterialInput', JSON.stringify(parameters), that.callBack);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
};
$(document).ready(function(event){
	MOMCC003.init();
});