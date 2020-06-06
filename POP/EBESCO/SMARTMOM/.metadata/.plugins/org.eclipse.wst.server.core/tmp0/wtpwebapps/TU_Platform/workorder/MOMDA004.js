var MOMDA004 = {
	init: function() {
		
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807251059342711003rGPgdRHUZQu", null, function() {
				that.grid();
			}, Language);
		});
		
	}, grid: function() {
	}, event: function() {
	},
	comboBox: function(){
		
		// 날짜
		$("#workOrderDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
					{facilityClassCd:"AREA"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#locationName", comboOptions, options);
						callBack();
					}
			);
		});

	}
};
$(document).ready(function(event){
	MOMDA004.init();
});