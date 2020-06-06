var MOMEA008 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808071342516491001dsqNG4DS5ps", null, function() {
				that.grid();
				mCommon.init("grid2", "W201808071346493231002u7mz6kSmmR6", null, function() {}, Language);
			}, Language);
		});
	}, grid: function() {
		var that = this;
		AUIGrid.bind("grid1", "cellClick", function( e ) {
			var params = {
				customerPoId : e.item.customerPoId,
				itemId : e.item.itemId
			}
			
			mCommon.render("grid2", "W201808071346493231002u7mz6kSmmR6", params, function(){});
		});
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){	
			mCommon.render("grid1", "W201808071342516491001dsqNG4DS5ps", mCommon.formGetParam("#form"), function(){
			});
		});
	},
	comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// DATE combo
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_DATE", attribute2: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	
		// 설비
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorName",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 판정
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"PASS_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#judgement",comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMEA008.init();
});