var MOMGA001 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808031529479411000YXZby8M4zB3", null, function() {
				that.grid();
			}, Language);
		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		$(document).on("click", "#excelDownBtn", function(){
			mCommon.auiGridExcelExport("grid", {fileName: "LOT_PRODUCT_MOMGA001_" + get_current_date("yyyy-mm-dd")});
		});
		// 조회
		$(document).on("click", "#findBtn", function(){
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
			
			mCommon.render("grid", "W201808031529479411000YXZby8M4zB3", mCommon.formGetParam("#form"), function(){});
		});
		tuCommon.addKeyDown($(document), $('#inItem'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#inMaterailLot'), $('#findBtn'));
	},
	comboBox : function(){
		$("#fromDate").val(get_date_diff(-1));
		$("#toDate").val(get_date_diff(0));

		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};

		// 설비
		mCommon.comboBoxClickCall("#inResource", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inResource",comboOptions, options);
					callBack();
				
				}
			);
		});
	}
};
$(document).ready(function(event){
	MOMGA001.init();
});