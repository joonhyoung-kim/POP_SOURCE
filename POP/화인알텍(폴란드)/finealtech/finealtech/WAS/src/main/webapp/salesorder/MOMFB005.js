var MOMFB005 = {	
	init: function() {
		Language.init(function() {
			mCommon.init("grid", "W201808211604046871000yBVtyiQCksG", null, null, Language);
		});
		var that = this;
		that.setInitData();
		that.event();
//		mCommon.init("grid", "W201808211604046871000yBVtyiQCksG", null, function() {
//			that.grid();	
//		});
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
			
//			mCommon.render("grid", "W201808211604046871000yBVtyiQCksG", mCommon.formGetParam("#form"), function(){});
			mCommon.pageRender("grid", "W201808211604046871000yBVtyiQCksG", mCommon.formGetParam("#form"), function(){}, "plan.order.B2BIifvrf.b2biIfVrfCount");
		});		
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "INPUTINFO_B2BI_MOMFB005_" + get_current_date("yyyy-mm-dd"), allData : true});
		});
		
		tuCommon.addKeyDown($(document), $('#modelSuffix'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#PoNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#departureNum'), $('#findBtn'));
	},
	setInitData: function() {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
	}		
};
$(document).ready(function(event){
	MOMFB005.init();
});