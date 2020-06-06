var MOMCA004 = {
	init: function() {
		
		var that = this;
		var dataset ;
		Language.init(function() {
			mCommon.init("grid", "W201807241749594221000b2jWCKZEM1e", null, function() {
				that.grid();
				that.event();
				that.comboBox();
				that.dateSet(); 
			}, Language);
		});
	}, 
	grid: function() {
		AUIGrid.setColumnPropByDataField("grid", "orderDate", {
	 		style:"columnStyle",
	 		editRenderer : {
		           type : "CalendarRenderer",
		           openDirectly : true,
		   		   onlyCalendar : false

		     }
	 		
	 	});
	}, 
	event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid", "W201807241749594221000b2jWCKZEM1e", that.getSearchData());
		});
		
		// 엑셀다운로드
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "ORDER_STATE_MOMCA004"});
		});
		
		// 납기일자변경
		$(document).on("click", "#changeRequestTimeBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length != 0){
				if(confirm(Language.lang['MESSAGES10268'])) {
					for(var i = 0; i < checkedItems.length; i++) {
						var param = {
								orderDate : checkedItems[i].item.orderDate,	
								materialOrderId : checkedItems[i].item.materialOrderId
						}
						mom_ajax("U", "purchase.purchasing.orderState.updateOrderDate", JSON.stringify(param));
					}
					mCommon.render("grid", "W201807241749594221000b2jWCKZEM1e", that.getSearchData());
				}
			}
		});
		
	}, 
	comboBox: function() {
		
		//발주일, 출발일, 납품일
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"START_FLAG", attribute2:"Y"}, // 파라미터
				function(data) {
					// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
					// 콤보박스가 생성된다.
					micaCommon.comboBox.set("#dateDiv",{selectedIndex:0}, {local: data, textName : "name", valueName : "code"});
				}
			);
		// 업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#vendorName",{searchMode : "containsignorecase"}, {local: data, textName : "name", valueName : "code", readonly: false});
				micaCommon.comboBox.set("#departureVendorName",{searchMode : "containsignorecase"}, {local: data, textName : "name", valueName : "code", readonly: false});
			}
		);
		//상태
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_ORDER_STATE", attribute3 : "Y"}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#orderState",{searchMode : "containsignorecase"}, {local: data, textName : "name", valueName : "code"});
			}
		);
		//발주자
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#orderUser",{searchMode : "containsignorecase"}, {local: data, textName : "name", valueName : "code"});
			}
		);
	},
	dateSet: function() {		
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
	},
	getSearchData : function(){
		var param ={
				dateFlag : $("#dateDiv").val(),
				fromDate : $("#fromDate").val(),
				toDate : $("#toDate").val(),
				vendorCd : $("#vendorName").val(),
				itemId : $("#itemName").val(),
				orderState : $("#orderState").val(),
				orderUser : $("#orderUser").val(),
				orderSeq : $("#orderSeq").val(),
				departureVendorCd : $("#departureVendorName").val()
		}
		return param;
	}
};
$(document).ready(function(event){
	MOMCA004.init();
});