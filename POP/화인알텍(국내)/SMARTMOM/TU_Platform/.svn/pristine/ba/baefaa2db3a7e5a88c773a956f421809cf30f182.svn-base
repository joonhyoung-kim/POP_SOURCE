var successFlag="";
var userId = sessionStorage.getItem("userId");
var params;
var endPeriod;

var MOMFA001 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201807061716239191000HGBVepmBZI4", null, function() {
				that.grid();
			}, Language);
		});

	}, grid: function() {
		//AUIGrid.setSelectionMode("grid", "none");
		tuCommon.cellClick('grid');
		
		AUIGrid.setColumnPropByDataField( "grid", "shipDate", { 
			style:"columnStyle",
	 		editRenderer : {
	           type : "CalendarRenderer",
	           openDirectly : true,
	   		   onlyCalendar : false
		     }
	 	});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy",
			type : "GET",
			data : {facilityClassId:"AREA", facilityType : "FAC400"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid", "fromLocationCd", {
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
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy",
			type : "GET",
			data : {facilityClassId:"AREA", facilityType : "FAC700"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid", "toLocationCd", {
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
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
		
		// 수불통제일에 대한 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMFA001"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
						if(event.dataField == "shipDate") { // 달력 지정한 필드인 경우 
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
		
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
			timeout : 30000000,
			async : false,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				shippingOverFlag = data[0].shippingOverFlag;
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
		
		AUIGrid.setColumnPropByDataField( "grid", "conversionUnitQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "shippingQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "description", { style:"columnStyle" } );
		
		AUIGrid.bind('grid', "cellEditBegin", function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');	
		});
		
		// 출하가능창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
		AUIGrid.bind('grid', "cellEditEnd", function( event ) {
			if(event.dataField == "fromLocationCd") {
				var zeroQty;
				var param = {
					itemId : event.item.itemId,
					locationCd : event.item.fromLocationCd
				}
				
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.curItemStock.dummy", param, function(data) {
					if(data[0] == null) {
						zeroQty = 0;
					} 
					
					if(zeroQty != 0) {
						AUIGrid.setCellValue("grid", event.rowIndex, "currentQty", data[0].currentQty);
					} else {
						AUIGrid.setCellValue("grid", event.rowIndex, "currentQty", zeroQty);
					}
				});
			}
			
			if(event.dataField == "departureQty") {
				AUIGrid.setCellValue("grid", event.rowIndex, "conversionUnitQty", event.item.departureQty * event.item.itemConversionUnitQty);
			}
		});
		
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
			
			mCommon.render("grid", "W201807061716239191000HGBVepmBZI4", mCommon.formGetParam("#form"), function(){
				AUIGrid.setColumnPropByDataField( "grid", "departureQty", {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(item.b2biCustomerFlag == "N") {
							return 'columnStyle';
						}
						
					}
				});
				AUIGrid.setColumnPropByDataField( "grid", "departureNumber", {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(item.b2biCustomerFlag == "N") {
							return 'columnStyle';
						}
						
					}
				});
				AUIGrid.bind('grid', "cellEditBegin", function( event ) {
					var item = AUIGrid.getSelectedItems("grid");
					if(item[0].item.b2biCustomerFlag == "Y") {
						if(event.dataField == "departureQty") {
							return false;
						}
						if(event.dataField == "departureNumber") {
							return false;
						}
					}
					AUIGrid.setProp('grid', 'exportURL', '0');
				});
				
				var departureDate = 'departureDate';
				var col_set1 = {
						dataField : departureDate,
						labelFunction : function(row_index, column_index, value, header_text, item) { 
							if(value != "" && value != undefined && value != null) {
								if(value.length > 19) {
									return value.replace('T', ' ').substring(0, 19);
								} 
							}
							return '';
						}
				};
				
				AUIGrid.setColumnPropByDataField('grid', departureDate, col_set1);
			});
		});
		
		// 출하처리 버튼
		/* modify hists
		 * 20191107001 / pyj / 공통으로 render처리 전 splash하기 때문에 메세지 ok버튼 누르는 순간 splash 해주도록 추가
		 */
		$(document).on("click","#applyBtn",function(){
			var shippingOverFlag = that.getParameter();
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11610']});
				return;
			}
			params = that.getProductShippingPop();
			for(var i = 0; i < checkedItems.length; i++){
				if(shippingOverFlag == 'N'){
					if(checkedItems[i].item.departureQty > checkedItems[i].item.currentQty){
						micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11614']});
						return;
					}
				}
				if(checkedItems[i].item.b2biCustomerFlag == 'N') {
					if(checkedItems[i].item.departureQty > checkedItems[i].item.remainQty) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11164']});
						return;
					}
				}
				if(checkedItems[i].item.fromLocationCd == '' || checkedItems[i].item.fromLocationCd == null){
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11427']});
					return;
				}
				if(checkedItems[i].item.toLocationCd == '' || checkedItems[i].item.toLocationCd == null){
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10189']});
					return;
				}
				if(to_date_yyyy_mm_dd(checkedItems[i].item.shipDate) <= endPeriod){
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.getLang('MESSAGES11441' + '@' + endPeriod)});
					return;
				}
			}
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES11449'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("D","shipping.productShipping.productShippingTemp", JSON.stringify(params), that.delCallback, checkedItems);
							micaCommon.splash.show(); // 20191107001
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		//B2BI I/F 버튼
		$(document).on("click", "#b2biInterface", function(){
			params = that.getProductShippingPop();
			var option = {
				type:"info",
				width:"400", 
				height: "145",
				html:Language.lang['MESSAGES10001'], 
				okButton:{
					text:"OK", 
					after:function(){
						mom_ajax("C","shipping.productShipping.productShippingB2BI", JSON.stringify(params), that.listCallbackPost);
					}
				}
			}
			
			micaCommon.messageBox(option);
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCT_SHIPPING_MOMFA001_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#mixGroup'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#poNo'), $('#findBtn'));
	},
	comboBox: function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		//주문상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SALES_ORDER_STATE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#orderState", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			}
		);
		
		//고객사
		mCommon.comboBoxClickCall("#customerName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{vendorType : "'CUSTOMER', 'BOTH'"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#customerName",comboOptions, options);
						callBack();
					}
			);
		});
		
		// 도착지
		mCommon.comboBoxClickCall("#destinationName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comDestination.dummy',  {}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#destinationName",comboOptions, options);
				callBack();
			});
		});
		
		//단가정보
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#unitPriceFlag",comboOptions, options);
			}
		);
		
		//출하가능창고 
		mCommon.comboBoxClickCall("#fromLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
					{facilityClassCd: "AREA", facilityType:"FAC400"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#fromLocation",comboOptions, options);
						callBack();
				}
			);
		});
		
		//수량비교
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"QTY_FLAG", attribute3:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#compareQty",comboOptions, options);
			}
		);
		
		//출발처리
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"QTY_FLAG", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#departureFlag",comboOptions, options);
			}
		);
		
		//날짜 콤보
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SEARCH_DATE", attribute9:"Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#dateCombo", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	getProductShippingPop: function() {
		var result = {
			orderType : "SO_IN"
		}
		return result;
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMFA001;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid");
		if(result == "SUCCESS"){
			for(var i = 0; i < checkedItems.length; i++){
				checkedItems[i].item.orderType = "SO_IN";
				checkedItems[i].item.createBy = userId;
				if(checkedItems[i].item.unitPrice == Language.lang['MESSAGES10418']){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10419']});
					return;
					
				} else {
					checkedItems[i].item.unitPrice = Number(checkedItems[i].item.unitPrice);
				}
				arrayList.push(checkedItems[i].item);
			}
			mom_ajax('L', 'shipping.productShipping.productShippingTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
			
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
		var that = this.MOMFA001;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'shipping.productShipping.productShipping', JSON.stringify(callbackParam[0]), that.listCallbackPost);
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
		var that = this.MOMFA001;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W201807061716239191000HGBVepmBZI4', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	getParameter : function() {
		var shippingOverFlag;
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comParameter.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				shippingOverFlag = data[0].shippingOverFlag;
			}
		});
		return shippingOverFlag;
	}
};
$(document).ready(function(event){
	MOMFA001.init();
});