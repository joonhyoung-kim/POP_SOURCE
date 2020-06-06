var params;
var setUnitPrice;

var MOMFA003 = {
	init: function() {
		var that = this;
		that.design()
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W2018070618140496210003z8ClFJsEsJ", null, function() {
				that.grid();
			}, Language);
		});
		
	}, grid: function() {
	 	AUIGrid.setColumnPropByDataField( "grid", "confirmDate", {
	 		style:"columnStyle",
	 		editRenderer : {
	           type : "CalendarRenderer",
	           openDirectly : true,
	   		   onlyCalendar : false
		     }
	 	});
	 	
	 	AUIGrid.setColumnPropByDataField( "grid", "shipConfirmQty", { style:"columnStyle" } );
	 	AUIGrid.setColumnPropByDataField( "grid", "conversionUnitQty", { style:"columnStyle" } );
	 	
	 	AUIGrid.bind('grid', "cellEditBegin", function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');	
		});
	 	
		AUIGrid.bind('grid', "cellEditEnd", function( event ) {
			if(event.dataField == "shipConfirmQty") {
				AUIGrid.setCellValue("grid", event.rowIndex, "conversionUnitQty", event.item.shipConfirmQty * event.item.itemConversionUnitQty);
			}
			
			if(event.dataField == "confirmDate") {
				// 마감일자 변경 시 단가 재조회
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemOutPrice.dummy",
					type : "GET",
					data : {vendorCd : event.item.vendorCd, itemId : event.item.itemId, marketCd : event.item.marketCd, currencyCd : event.item.currencyCd, stateTime : event.item.confirmDate},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							setUnitPrice = data[0].unitPrice;
						} else {
							setUnitPrice = 0;
						}
					},
					error: function(data){},
					fail : function(data){}
				});
				
				AUIGrid.setCellValue("grid", event.rowIndex, "unitPrice", setUnitPrice);
			}
		});
	 	
	 	tuCommon.cellClick('grid');
	 	
		// 수불통제일에 대한 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMFA003"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
						if(event.dataField == "confirmDate") { // 달력 지정한 필드인 경우 
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
		
	}, event: function() {
		var that = this;
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCT_SHIPPING_CLOSE_MOMFA003_" + get_current_date("yyyy-mm-dd")});
		});
		
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
			
			mCommon.render("grid", "W2018070618140496210003z8ClFJsEsJ", mCommon.formGetParam("#form"), function(){});
		});
		
		// 마감처리
		/* modify hists
		 * 20191107001 / pyj / 공통으로 render처리 전 splash하기 때문에 메세지 ok버튼 누르는 순간 splash 해주도록 추가
		 */
		$(document).on("click","#applyBtn",function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			params = that.getProductShippingClosePop();
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.confirmDate == null || checkedItems[i].item.confirmDate == "") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.getLang('MESSAGES11732') + " (" + Language.getLang('MESSAGES10171') + " : " + checkedItems[i].item.customerPoId + ")"});
					return;
				}
				
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.confirmDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.getLang('MESSAGES10377' + '@' + endPeriod)});
					return;
				}
				
				if(Number(checkedItems[i].item.shipConfirmQty) <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.getLang('MESSAGES12104@' + Language.lang['MESSAGES10398'])});
					return;
				}
			}
			
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES10380'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("D","shipping.productShippingClose.productShippingCloseTemp", JSON.stringify(params), that.delCallback, checkedItems);
							micaCommon.splash.show(); // 20191107001
						}
					}
				}
				
				micaCommon.messageBox(option);
				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10383']});
			}
		});
		
		//B2BI I/F 버튼
		$(document).on("click", "#b2biInterface", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			params = that.getProductShippingClosePop();
			if(checkedItems.length != 0){
				
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES10001'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("C","shipping.productShipping.productShippingB2BI", JSON.stringify(params), that.listCallbackPost, checkedItems);
						}
					}
				}
				
				micaCommon.messageBox(option);
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#createByName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
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
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		
		// 창고
		mCommon.comboBoxClickCall("#LocationName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.specifyFacility.dummy',  
				 {facilityClassCd: "AREA", facilityType : "'FAC700'"}, // 파라미터
			function(data){
				options.local = data;
				micaCommon.comboBox.set("#LocationName", comboOptions, options);
				callBack();
			}); 
		});
		
		// 고객사,도착지
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy',  
			 {vendorType : "'CUSTOMER', 'BOTH'"}, 
		function(data){
			options.local = data;
			micaCommon.comboBox.set("#customerName",comboOptions, options);
			micaCommon.comboBox.set("#destinationName",comboOptions, options);
		});
		
		// 환종
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "CURRENCY_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#currencyName",comboOptions, options);
		});
		
		// MKT
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "MARKET_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#marketName",comboOptions, options);
		});
		
		// B2BI 마감수량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			 {codeClassId:"QTY_FLAG", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#closeFlag",comboOptions, options);
			}
		);
	
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
	},
	getProductShippingClosePop: function() {
		var result = {
			orderType : "SO_OUT"
		}
		return result;
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMFA003;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid");
		if(result == "SUCCESS"){
			for(var i = 0; i < checkedItems.length; i++){
				checkedItems[i].item.orderType = "SO_OUT";
				checkedItems[i].item.unitPrice = Number(checkedItems[i].item.unitPrice);
				
				arrayList.push(checkedItems[i].item);
			}
			mom_ajax('L', 'shipping.productShippingClose.productShippingCloseTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMFA003;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'shipping.productShippingClose.productShippingClose', JSON.stringify(callbackParam[0]), that.listCallbackPost);
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
	listCallbackPost : function(result, data){
		var that = this.MOMFA003;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W2018070618140496210003z8ClFJsEsJ', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMFA003.init();
});