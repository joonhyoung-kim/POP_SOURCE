var locationParam = mCommon.getSearchParam();	
var divisionCd = sessionStorage.getItem("divisionCd");
var facilityType;

var MOMDA006 = {
	init: function() {
		var that = this;
		
		if (locationParam.facilityType == "MAT") {
			facilityType = "'FAC200'";
		} else if (locationParam.facilityType == "WO") {
			facilityType = "'FAC300', 'FAC500'";
		} else if (locationParam.facilityType == "SO") {
			facilityType ="'FAC400', 'FAC700'";
		}
		
		that.design();
		$("#inDate").datetimepicker({maxDate : new Date()});
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808011718493761000sk0b9Cdxfnf", null, function() {
				that.grid();
				mCommon.init("popgrid", "W201808011724410041001L4Q6mBLICLB", null, function(){}, Language);
			}, Language);
		});
	}, 
	design : function (){
		if (locationParam.facilityType == "MAT") {
			$("#label-id").text(Language.lang['MESSAGES11108']);
		} else if (locationParam.facilityType == "WO") {
			$("#label-id").text(Language.lang['MESSAGES10212']);
		} else if (locationParam.facilityType == "SO") {
			$("#label-id").text(Language.lang['MESSAGES11715']);
		} else {
			$("#label-id").text(Language.lang['MESSAGES11716']);
		}
	},
	grid: function() {
		tuCommon.cellClick('grid', 'single');
		
	}, event: function() {
		var that = this;
		
		// 조회
		$(document).on("click", "#findBtn", function(){
			if($("#inDate").val() == '' || $("#inDate").val() == null) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			} else {
				mCommon.render("grid", "W201808011718493761000sk0b9Cdxfnf", that.getSearchData(), function(){});
			}
		});
		
		// 품목으로 조회
		$(document).on("keydown", "#itemName", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 이력조회
		$(document).on("click", "#histBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11234']});
				return;
			}
			
			if(checkedItems.length > 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
			
			$("#pop").micaModal("show");
			$(window).resize(); //그리드 사이즈 재조정
			$("#moFromDate, #moToDate").datetimepicker({maxDate : new Date()});
			$("#moItem").val(checkedItems[0].item.itemId);
			$("#moLocation").val(checkedItems[0].item.locationCd);
			mCommon.render("popgrid", "W201808011724410041001L4Q6mBLICLB",  mCommon.formGetParam("#pop form"), function(){});
		});
		
		// 팝업닫기
		$(document).on("click", "#modalCloseBtn, .bntpopclose", function(){
			$("#pop").micaModal("hide");
		});
		
		// 팝업창 조회
		$(document).on("click", "#modalFindBtn", function(){
			if($("#moFromDate").val() == '' || $("#moToDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10250']});
				return;
			}
			
			if($("#moItem").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			
			if($("#moLocation").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11295']});
				return;
			}
			
			var fromDate = new Date($("#moFromDate").val());
			var toDate = new Date($("#moToDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("popgrid", "W201808011724410041001L4Q6mBLICLB", mCommon.formGetParam("#pop form"), function(){});
		});
		
		$(document).on("click", "#excelDownBtn", function(){
			mCommon.auiGridExcelExport("grid", {fileName: "STOCK_STATUS_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#modalExcelDownBtn", function() {
			mCommon.auiGridExcelExport("popgrid", {fileName: "STOCK_STATUS_HIST_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function(){
		$("#inDate").val(get_date_diff(0));
		$("#moFromDate").val(get_date_diff(-1));
		$("#moToDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		mCommon.comboBoxClickCall("#locationName, #moLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType:facilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName", comboOptions, options);
					micaCommon.comboBox.set("#moLocation", comboOptions, options);
					callBack();
				}
			);
		});
	
		// 타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type",comboOptions, options);
			
			}
		);

		// 재고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE", attribute2:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockQty", comboOptions, options);
			
			}
		);
	
		// 관리등급
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_GRADE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGrade", comboOptions, options);
			
			}
		);
	
		// 재고부족
//		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
//			{codeClassId:"WARE_INVEN_TYPE"}, // 파라미터
//			function(data) {
//				options.local = data;
//				micaCommon.comboBox.set("#shortageFlag", comboOptions, options);
//			
//			}
//		);
		
		//품목		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#moItem", comboOptions, optItems);
		
		//창고유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"FACILITY_TYPE", attribute19: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#facilityType",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true, checkedIndex:[0,1,2,4]}, options);
			}
		);
		
	},
	getSearchData : function(){
		var sysDateFlag;
		var checkedItems = "";
		var facilityList = $("#facilityType").jqxComboBox('getCheckedItems');
		
		if( $("#inDate").val() == get_date_diff(0)){
			sysDateFlag = "Y";
		} else {
			sysDateFlag = "N";
		}
		
		$.each(facilityList, function(index){
			if(facilityList.length-1 != index){
				checkedItems += "'" + this.value + "',"
			} else {
				checkedItems += "'" + this.value + "'"
			}
		});
		
		var param = {
			facilityType : facilityType,
			sysDateFlag : sysDateFlag, // 수정필요
			inDate : $("#inDate").val(),
			itemId : $("#itemName").val(),
			type : $("#type").val(),
			locationCd : $("#locationName").val(),
			stockQty : $("#stockQty").val(),
			itemGrade : $("#itemGrade").val(),
			itemPlace : $("#itemPlace").val(),
			shortageFlag : $("#shortageFlag").val(),
			facilityType : checkedItems
		}
		return param;
	}
};
$(document).ready(function(event){
	MOMDA006.init();
});