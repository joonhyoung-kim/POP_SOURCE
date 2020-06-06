var MOMCE001 = {
	init: function() {
		$("#inDate").datetimepicker({maxDate : new Date()});
		var that = this;
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid", "W201808011718493761000sk0b9Cdxfnf", null, function() {
				that.grid();
				that.event();
				mCommon.render("grid", "W201808011718493761000sk0b9Cdxfnf", that.getSearchData(), function(){});
			}, Language);
			
			mCommon.init("grid2", "W201808011724410041001L4Q6mBLICLB", Language););
		});
	}, grid: function() {
		tuCommon.cellClick('grid');
		
	}, event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W201808011718493761000sk0b9Cdxfnf", that.getSearchData());
		});
		
		// 이력조회
		$(document).on("click", "#multiBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11234']});
				return;
			}
			
			$("#pop").micaModal("show");
			$("#pItemName").val(checkedItems[0].item.itemId);
			$("#pLocationName").val(checkedItems[0].item.locationCd);
			mCommon.render("grid2", "W201808011724410041001L4Q6mBLICLB", that.getPopSearchData());
		});
		
		// 팝업닫기
		$(document).on("click", "#pCancelBtn, .bntpopclose", function(){
			$("#pop").micaModal("hide");
		});
		
		// 팝업창 조회
		$(document).on("click", "#pFindBtn", function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var inFromDate = new Date($("#fromDate").val());
			var inToDate = new Date($("#toDate").val());
			
			if(inFromDate > inToDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid2", "W201808011724410041001L4Q6mBLICLB", that.getPopSearchData());
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_STOCK_STATUS_MOMCE001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#pExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "ITEM_STOCK_STATUS_HIST_MOMCE001_" + get_current_date("yyyy-mm-dd")});
		});

		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox: function() {
		$("#inDate").val(get_date_diff(0));
		$("#fromDate").val(get_date_diff(-1));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type", comboOptions, options);
			}
		);
		
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#locationName",comboOptions, options);
				micaCommon.comboBox.set("#pLocationName",comboOptions, options);
			}
		);
		
		//재고량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockQty",comboOptions, options);
			}
		);
		
		//관리등급
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GRADE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGrade",comboOptions, options);
			}
		);
		
		
		//재고부족
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#shortageFlag",comboOptions, options);
			}
		);
	},
	getSearchData : function(){
		var stockQty =  $("#stockQty").val();
		if(stockQty < 0){
			stockQty = "minus";
		}
		
		var sysDateFlag;
		
		if( $("#inDate").val() == get_date_diff(0)){
			sysDateFlag = "Y";
		} else {
			sysDateFlag = "N";
		}
		
		var param = {
			sysDateFlag : sysDateFlag, // 수정필요
			inDate : $("#inDate").val(),
			itemId : $("#itemName").val(),
			type : $("#type").val(),
			locationCd : $("#locationName").val(),
			stockQty : stockQty,
			itemGrade : $("#itemGrade").val(),
			itemPlace : $("#itemPlace").val(),
			shortageFlag : $("#shortageFlag").val()
		}
		return param;
	},
	getPopSearchData : function(){
		var param = {
			fromDate : $("#fromDate").val(),
			toDate : $("#toDate").val(),
			itemId : $("#pItemName").val(),
			locationCd : $("#pLocationName").val()
		}
		return param;
	}
};
$(document).ready(function(event){
	MOMCE001.init();
});