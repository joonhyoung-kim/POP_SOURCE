var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");

var MOMDA002 = {
	init: function() {
		var that = this;
		mCommon.init("facilityGrid", "W201806261408438271000Q9M2Fnstnxz");
		this.grid();
		this.event();
		that.comboBox();
		mCommon.pageRender("facilityGrid", "W201806261408438271000Q9M2Fnstnxz", null, function(){
			mCommon.gridPopCreat("facilityGrid", {colCount: 2, width: 810, title: "테스트 팝업창"});
		});
	}, grid: function() {
		
	}, event: function() {
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {textName : "name", valueName : "code"};
		options.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		options.keyName = "key"; // 서버로 검색 조건 키 이름값
		options.minLength = 4; // 최소 검색 수
		options.param = {divisionCd: divisionCd, companyCd: companyCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#facilityClassName", comboOptions, options);
		
//		get_comItemId_code
//		mCommon.comboBoxClickCall("#facilityClassName", function(callBack) {
//			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
//				{}, // 파라미터
//				function(data) {
//					options.local = data;
//					micaCommon.comboBox.set("#facilityClassName",comboOptions, options);
//					callBack();
//				}
//			);
//		});
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});