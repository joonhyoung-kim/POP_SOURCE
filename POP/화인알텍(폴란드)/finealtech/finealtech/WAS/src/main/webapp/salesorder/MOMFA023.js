var endPeriod;

var MOMFA023 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807131546445161000iOmx8mOwdpL", null, function() {
				that.grid();		
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick('grid');
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		var totalInoutPrice;
		$(".aui-grid-default-footer").css({"text-align": "left"});
		
		// 수불통제일에 대한 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMFA023"},
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
		
		var footerObject = [
			{
	        	dataField : "inoutPrice",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalInoutPrice = Language.lang['MESSAGES11354'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
			{
	        	dataField : "inoutQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11367'] + ": " + AUIGrid.formatNumber(value, "#,###") + " / " + totalInoutPrice;
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
		
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201807131546445161000iOmx8mOwdpL",  mCommon.formGetParam("#form"), function(){});
		});
		
		//팝업 취소 버튼
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			// 등록 팝업을 닫는다.
			$("#listPop").micaModal("hide");
		});
		
		//마감 취소 버튼
		$(document).on("click", "#CancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10385']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.ioTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES10377' + '@' + endPeriod)});
					return;
				}
			}
		
			var option = {
				type:"info", 
				html:Language.lang['MESSAGES10659'], 
				okButton:{
					text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
									itemStockInoutId : checkedItems[i].item.itemStockInoutId,
									ioTime : checkedItems[i].item.ioTime,
									orderType : "SO_OUT_C",
								}
							mom_ajax("C","shipping.productShippingCloseStatus.productShippingCloseCancel", JSON.stringify(param), that.listCallbackPost, checkedItems);
						}
					}
				}
			}
			
			micaCommon.messageBox(option);
		
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCT_SHIPPING_CLOSE_STATUS_MOMFA023_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#createByName'), $('#findBtn'));
	},
	comboBox:function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
	
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		
		// 고객사
		mCommon.comboBoxClickCall("#customerName", function(callBack) {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy',  
			 {vendorType : "'CUSTOMER', 'BOTH'"},  
			function(data){
				options.local = data;
				micaCommon.comboBox.set("#customerName",comboOptions, options);
				callBack();
			});
		});
		
		// 도착지
		mCommon.comboBoxClickCall("#destinationName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comDestination.dummy',  {}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#destinationName",comboOptions, options);
				callBack();
			});
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
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "Y_N"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#endFlag",comboOptions, options);
		});
		
		// 고객창고
		mCommon.comboBoxClickCall("#LocationName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFacility.dummy',  {facilityClassCd:"AREA", facilityType : "FAC700"}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#LocationName", comboOptions, options);
				callBack();
			});
		});
		
		// B2BI 입고수량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"QTY_FLAG", attribute2:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inputFlag",comboOptions, options);
			}
		);
		
	},
	listCallbackPost : function(param, data){
		var that = this.MOMFA023;
		if(param == 'SUCCESS'){
			mCommon.render('grid', 'W201807131546445161000iOmx8mOwdpL',  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145",  html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMFA023.init();
});