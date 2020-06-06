

var MOMCD003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808031614457781002HBUKdrFif9s", null, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		//조회 버튼 클릭
		$("#findBtn").click(function(event){
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
			if($("#inLocation").val() == '' && $("#outLocation").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11754']});
				return;
			} 
			
			mCommon.render("grid", "W201808031614457781002HBUKdrFif9s", mCommon.formGetParam("#form"), function(){});
			
		});
		
		//엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "materialRequestSummary_MOMCD003_" + get_current_date("yyyy-mm-dd")});
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
		//불출창고
		mCommon.comboBoxClickCall("#inLocation", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inLocation", comboOptions, options);
					callBack();
				}
			);
		});
		
		//요청창고
		mCommon.comboBoxClickCall("#outLocation", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#outLocation", comboOptions, options);
					callBack();
				}
			);
		});
		
		//설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName", comboOptions, options);
					callBack();
				}
			);
		});
		
		//타입
		mCommon.comboBoxClickCall("#type", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "ITEM_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#type", comboOptions, options);
					callBack();
				}
			);
		});
		
		//재고량
		mCommon.comboBoxClickCall("#stockQty", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#stockQty", comboOptions, options);
					callBack();
				}
			);
		});
		
		//불출량
		mCommon.comboBoxClickCall("#releaseQty", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "DISCHARGE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#releaseQty", comboOptions, options);
					callBack();
				}
			);
		});
		
	}
};
$(document).ready(function(event){
	MOMCD003.init();
});