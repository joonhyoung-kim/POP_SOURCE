var MOMHA013 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		
		Language.init(function() {
			mCommon.init("grid", "W201902201945391461003SZXcS766PGI", null, function(){
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
			mCommon.render("grid", "W201902201945391461003SZXcS766PGI", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MONTHLY_MATERIAL_PRICE_CONFIRM_STATUS_MOMHA013_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	}
	, comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//마감일
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingYearMonths.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#confirmMonth",{searchMode:'none', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly :true});
			}
		);
		
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
	MOMHA013.init();
});