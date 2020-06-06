var MOMCC002 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		
		Language.init(function() {
			mCommon.init("grid", "W201807261452215111000PhILMhqPgSj", null, function() {
				that.grid();
			}, Language);
		});

	}, grid: function() {
		tuCommon.cellClick('grid');
		 
	}, event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){
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
			mCommon.render("grid", "W201807261305450081000YPzivwuJBLr", that.getSearchData(), function(){});
		});
		
		// 입고처리 버튼
		$(document).on("click", "#inputBtn", function(){
			
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", subTitle:true, html:Language.lang['MESSAGES11746']});
				return;
			}
			
			if(confirm(Language.lang['MESSAGES11067'])){
				
				
			}
			
		});

	},
	comboBox : function(){
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		// 업체
		mCommon.comboBoxClickCall("#vendorName, #departureVendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#vendorName",comboOptions, options);
						micaCommon.comboBox.set("#departureVendorName",comboOptions, options);
						callBack();
					}
			);
		});
		
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "MATERIAL_ORDER_STATE", attribute4 : "Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#orderState",comboOptions, options);
		});
	},
	getSearchData : function(){
		var param = {
				fromDate : $("#fromDate").val(),
				toDate : $("#toDate").val(),
				vendorCd : $("#vendorName").val(),
				departureVendorCd : $("#departureVendorName").val(),
				itemId : $("#itemName").val(),
				orderState : $("#orderState").val()
				
		}
		return param;
	}
};
$(document).ready(function(event){
	MOMCC002.init();
});