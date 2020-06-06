var MOMHA012 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		
		Language.init(function() {
			mCommon.init("grid", "W201902201749093021000hNjbad6At5F", null, function(){
				that.grid("grid");
			}, Language);
		});
	}
	, grid: function() {
		tuCommon.cellClick("grid");
	}
	, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){			
			mCommon.render("grid", "W201902201749093021000hNjbad6At5F", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "DAYLYCLOSING_HIST_MOMHA012_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	}
	, comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//마감일
		$("#fromDate").val(get_date_diff(-1));
		$("#toDate").val(get_date_diff(0));
		
		//시설구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "FACILITY_TYPE", attribute11: "Y"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#facilityType", {searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly :false});
			}
		);
		
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", stockType : "CLOSE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#location",comboOptions, options);
			
			}
		);
		
		//대그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GROUP_LARGE"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#groupLarge", {searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly :false});
			}
		);
		
		//중그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GROUP_MEDIUM"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#groupMedium", {searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly :false});
			}
		);
		
		//품목유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType",{searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMHA012.init();
});