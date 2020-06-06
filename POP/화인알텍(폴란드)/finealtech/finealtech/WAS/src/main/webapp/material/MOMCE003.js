var dateCombo;

var MOMCE003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808021655294171001jLpZsbltHtx", null, function() {
				that.grid();
			}, Language);
		});
	}, grid: function() {
		
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
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
			mCommon.render("grid", "W201808021655294171001jLpZsbltHtx",  mCommon.formGetParam("#node"), function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#inputBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "othersInOutFinishedStatus_MOMCE003_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#userName'), $('#findBtn'));
	},
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
	
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var selectComboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//보정일, 수정일
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "MATERIAL_MOD_DATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo", selectComboOptions, options);
			}
		);
		
		//창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName",comboOptions, options);
					callBack();
				}
			);
		});
		
		//보정구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "MATERIAL_LOT_STATE", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#materialLotState",comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMCE003.init();
});