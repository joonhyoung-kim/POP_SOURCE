var fromDate = get_date_diff(-1); 
var toDate = get_current_date("YYYY-MM-DD");

var MOMEA017 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201903271107446621000cXObetlAzjz", null, function() {
				that.grid();
			}, Language);
		});
		that.event();
		
	}, grid: function() {
		$("#fromDate").val(fromDate);
		$("#toDate").val(toDate);
		
	}, event: function() {
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid", "W201903271107446621000cXObetlAzjz", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "TEMPERATURE_RESULT_MOMEA017_" + get_current_date("yyyy-mm-dd")});
		});
	}
};
$(document).ready(function(event){
	MOMEA017.init();
});