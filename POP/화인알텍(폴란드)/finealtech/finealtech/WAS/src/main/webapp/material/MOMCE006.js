var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");

var MOMCE006 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201806221349379281000qZwsr6X3Vn2", null, function(){
				that.grid("grid1");
				mCommon.init("grid2", "W201806221349379281000qZwsr6X3Vn2", null, function(){
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		
	}, grid: function(grid) {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		//if(grid == "grid1"){
			
		//}
		//if(grid == "grid2"){
			
		//}
		
	}, event: function() {
		
		$(document).on("click", "#findBtn", function(){
			
			if($("#fromLocation").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10034']});
				return;
			}
			if($("#toLocation").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10088']});
				return;
			}
			
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
			
			mCommon.render("grid1", "W201806221349379281000qZwsr6X3Vn2",  mCommon.formGetParam("#form"), function(){});
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//FROM, TO 창고
		mCommon.comboBoxClickCall("#fromLocation, #toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromLocation", comboOptions, options);
					micaCommon.comboBox.set("#toLocation",comboOptions, options);
					callBack();
				}
			);
		});
		
		//품목
		var optItem = {textName : "name", valueName : "code"};
		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItem.minLength = 4; // 최소 검색 수
		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemName", comboOptions, optItem);
		
		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "ITEM_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName",comboOptions, options);
				}
		);
		
		//카테고리
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "IO_CATEGORY", attribute1: "Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#category",comboOptions, options);
				}
		);
	}
};
$(document).ready(function(event){
	MOMCE006.init();
});