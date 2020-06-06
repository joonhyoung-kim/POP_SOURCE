var MOMFA024 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807180256478171000qwqafbOS5Pl", null, function() {
				that.grid();
			}, Language);
		});
	}, grid: function() {
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
			
			mCommon.render("grid", "W201807180256478171000qwqafbOS5Pl", mCommon.formGetParam("#form"), function(data){
				if(data.length < 1) {
					return;
				} else {
						var dueDate = 'dueDate';
			            var col_set1 = {
							dataField : dueDate,
							labelFunction : function(row_index, column_index, value, header_text, item) { 
								if(value.length > 19) {
									return value.replace('T', ' ').substring(0, 19);
								} 
								return value.replace('T', ' ');
							}
						};
						
						AUIGrid.setColumnPropByDataField('grid', dueDate, col_set1);
					}
			});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#orderState'), $('#findBtn'));
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "SALES_ORDER_STATUS_MOMFA024_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10){
			mm = "0" + mm;
		}
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
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
		
		//고객창고
		mCommon.comboBoxClickCall("#LocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : "FAC700"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#LocationName",comboOptions, options);
					callBack();
				}
			);
		});
		
		//주문구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"ORDER_GUBUN"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderGubun",comboOptions, options);
			}
		);
		
		//Market
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MARKET_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#marketName",comboOptions, options);
			}
		);
		
		//환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"CURRENCY_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#currencyName",comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMFA024.init();
});