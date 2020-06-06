var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var reportUrl = "";
var menuId = "MOMFA004";
var endPeriod;

var MOMFA004 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807101344386031000Dr3piHXlIDf", null, function() {
				that.grid("grid");
				that.design();
				mCommon.init("auigrid-2", "W201807101945251431000IbscWXJ17Dn", null, function() {
					that.grid("auigrid-2");
				}, Language);
			}, Language);
		});

	}, grid: function(grid) {
		tuCommon.cellClick(grid);
		if(grid == 'grid') {
			var indeterminate = false;	
			AUIGrid.bind(grid, "rowAllChkClick", function( event ) {
				if(indeterminate) {
					AUIGrid.setCheckedRowsByValue(event.pid, "ioCategoryName", []);
					indeterminate = false;
				} else {
					var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "ioCategoryName");
					uniqueValues.splice(uniqueValues.indexOf(Language.lang['MESSAGES11227']),1);
					AUIGrid.setCheckedRowsByValue(event.pid, "ioCategoryName", uniqueValues);
					indeterminate = true;
				}
			});
			
			// 수불통제일에 대한 Validation
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
					}
				},
				error: function(data){},
				fail : function(data){}
			});
		}
		
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){	
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201807101344386031000Dr3piHXlIDf",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 이력조회 버튼
		$(document).on("click","#historyBtn",function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length == 1){
				var param = {
					salesOrderId : checkedItems.salesOrderId
				}
				mCommon.render("auigrid-2", "W201807101945251431000IbscWXJ17Dn", param, function(){
					$("#listPop").micaModal("show");
				});
				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11600']});
			}
		});
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11328']});
				return;
			}
			
			var param = {
				menuId : menuId
			}
			
			mom_ajax("D", "shipping.productShippingStatus.productShippingStatusPrintTemp", JSON.stringify(param), that.printCallback);
		});
		
		//팝업 취소 버튼
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			// 등록 팝업을 닫는다.
			$("#listPop").micaModal("hide");
		});
		
		//출하 취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11455']});
				return;
			}
			for(var i = 0; i< checkedItems.length; i++) {
				if(checkedItems[i].item.ioCategory == 'PRTN001'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11228']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.ioTime) <= endPeriod){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11443' + '@' + endPeriod)});
					return;
				}
			}
			
			var option = {
				type:"info", 
				html:Language.lang['MESSAGES11453'], 
				width:"400", 
				height: "145",
				okButton:{
					text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
									itemStockInoutId : checkedItems[i].item.itemStockInoutId,
									ioTime : checkedItems[i].item.ioTime,
									orderType : "SO_IN_C"
								}
							mom_ajax("C","shipping.productShippingStatus.productShippingCancel", JSON.stringify(param), that.listCallbackPost);
						}
					}
				}
			}
			
			micaCommon.messageBox(option);
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCT_SHIPPING_STATUS_MOMFA004_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#createByName'), $('#findBtn'));
	},
	comboBox : function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10){
			mm = "0" + mm;
		}
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		// 고객사, 도착지
		mCommon.comboBoxClickCall("#searchKeyword", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy',  {vendorType : "'CUSTOMER', 'BOTH'"}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#searchKeyword",comboOptions, options);
				callBack();
			});
		});
		
		// 고객사, 도착지 라벨 콤보
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "SEARCH_SALES_COMBO", attribute1 : "Y"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#searchSalesCombo",{selectedIndex : 0, searchMode:'containsignorecase', autoComplete:true}, options);
		});
		
		// 주문상태
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "SALES_ORDER_STATE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#orderState",comboOptions, options);
		});
		
		// Market
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "MARKET_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#marketName",comboOptions, options);
		});
		
		// 환종
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "CURRENCY_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#currencyName",comboOptions, options);
		});
		
		// 주문구분
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "ORDER_GUBUN"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#orderGubun",comboOptions, options);
		});
		
		// B2BI 취소수량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"QTY_FLAG", attribute1 :"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#cancelFlag",comboOptions, options);
			}
		);
		
		// 고객창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFacility.dummy',  {facilityClassId:"AREA", facilityType : "FAC700"}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#locationName", comboOptions, options);
				callBack();
			});
		});
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	printCallback : function(result, data) {
		var that = this.MOMFA004;
		if(result == "SUCCESS") {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				checkedItems[i].item.seq = i+1;
				checkedItems[i].item.menuId = menuId;
				arrayList.push(checkedItems[i].item);
			}
			
			mom_ajax("L", "shipping.productShippingStatus.productShippingStatusPrintTemp", JSON.stringify(arrayList), that.printDelCallback);
		}
	},
	printDelCallback : function(result, data) {
		var that = this.MOMFA004;
		if(result == "SUCCESS") {
			params = {
				menuId : menuId
			}
			mom_ajax("C", "shipping.productShippingStatus.productShippingStatusPrint", JSON.stringify(params), that.printCallbackProc);
		}
	},
	printCallbackProc : function(result, data) {
		var that = this.MOMFA004;
		if(result == 'SUCCESS') {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var itemStockInoutIds = "";
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.departureCancelQty <= 0) {
					if(itemStockInoutIds == "" || itemStockInoutIds == null) {
						itemStockInoutIds += "\'" + checkedItems[i].item.itemStockInoutId + "\'";
					} else {
						itemStockInoutIds += "\, \'" + checkedItems[i].item.itemStockInoutId + "\'";
					}
				}
			}
			
			if(itemStockInoutIds == "" || itemStockInoutIds == null) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES10010']});
				return;
			}
			
			var itemStockInoutIdsUrl = itemStockInoutIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMFA004";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&itemStockInoutIds=" + itemStockInoutIdsUrl + "&excelId=MOMFA004&pId=MOMFA004";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.shipping.productShippingStatus.productShippingExcelPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		}
	},
	listCallbackPost : function(result, data){
		var that = this.MOMFA004;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W201807101344386031000Dr3piHXlIDf',  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}, 
	design: function(){
		$("head").append('<style>.disable-check-style{ color:#d3825c;}</style>');	
	},
};
$(document).ready(function(event){
	MOMFA004.init();
});