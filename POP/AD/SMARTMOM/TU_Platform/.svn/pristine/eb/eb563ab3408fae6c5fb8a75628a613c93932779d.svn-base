var userId = sessionStorage.getItem("userId");

var MOMGA002 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808031840011611000Zg5IhtOVsY0", null, function(){
				that.grid();
				mCommon.init("grid2", "W201808031844105281001IuSu8J52Szg", null, function(){}, Language);
			}, Language);
		});
		mCommon.splitter(".h02-h", "horizontal", "50%");
		
	}, grid: function() {
	
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid1", "W201808031840011611000Zg5IhtOVsY0", mCommon.formGetParam("#form"), function(){});
		});
		
		//셀 클릭 이벤트
		AUIGrid.bind("grid1", "cellClick", function(e) {
			mCommon.render("grid2", "W201808031844105281001IuSu8J52Szg", {barcodeId : e.item.barcodeId}, function(){});
		});
		
		// 상단 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "lotProductShipping_MOMGA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 하단 엑셀 다운 버튼
		$(document).on("click", "#excelSubDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "lotProductShippingDetail_MOMGA002_MOMCD002_" + get_current_date("yyyy-mm-dd")});
		});
		
		tuCommon.addKeyDown($(document), $('#inItem'), $('#findBtn'));
	},
	comboBox: function() {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(31));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//설비
		mCommon.comboBoxClickCall("#inResource", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inResource", comboOptions, options);
					callBack();
				}
			);
		});
		
		//고객사
		mCommon.comboBoxClickCall("#inVendor", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : "'CUSTOMER', 'BOTH'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inVendor", comboOptions, options);
					callBack();
				}
			);
		});
		
		//도착지
		mCommon.comboBoxClickCall("#inDestination", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comDestination.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inDestination", comboOptions, options);
					callBack();
				}
			);
		});
	}
};
$(document).ready(function(event){
	MOMGA002.init();
});