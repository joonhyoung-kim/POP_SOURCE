var MOMCE004 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W2018080219101761610010HvzDHi6YxU", null, function(){
				that.grid();
				mCommon.init("grid2", "W201808021954102401001L5AcGrFbeum", null, function(){}, Language);
			}, Language);
		});
		mCommon.splitter(".h02-h", "horizontal", "50%");
	}, grid: function() {
		AUIGrid.bind("grid1", "cellClick", function(e) {
			var param = mCommon.formGetParam("#node");
			param.itemStockId = e.item.itemStockId;
			mCommon.render("grid2", "W201808021954102401001L5AcGrFbeum", param, function(){});
		});
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			if($("#locationName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11296']});
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
			
			mCommon.render("grid1", "W2018080219101761610010HvzDHi6YxU",  mCommon.formGetParam("#node"), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var selectedComboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName", comboOptions, options);
					callBack();
				}
			);
		});
		
		//재고량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockQty",selectedComboOptions, options);
			}
		);
		
		//입출고타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "IO_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#ioType",comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMCE004.init();
});