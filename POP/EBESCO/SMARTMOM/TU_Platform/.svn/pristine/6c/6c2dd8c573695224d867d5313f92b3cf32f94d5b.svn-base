var MOMCE008 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808022256074851000u14d2vUaMQF", null, function(){
				that.grid();
			}, Language);
		});
	
	}, grid: function() {
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		$(".aui-grid-default-footer").css({"text-align": "left"});
		
		var footerObject = [
			{
	        	dataField : "qty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + Language.lang['MESSAGES11073'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);

	}, event: function() {
		var that = this;
		//조회 버튼
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
			
			mCommon.render("grid", "W201808022256074851000u14d2vUaMQF", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "itemStockInOutStatus_MOMCE008_" + get_current_date("yyyy-mm-dd")});
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
		
		//입출고타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "IO_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#ioType",comboOptions, options);
			}
		);
		
		//카테고리
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "IO_CATEGORY"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#category",comboOptions, options);
			}
		);
		
		//품목형태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType",comboOptions, options);
			}
		);
		
		//관리등급
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GRADE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGrade",comboOptions, options);
			}
		);

		//대그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GROUP_LARGE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGroupLarge",comboOptions, options);
			}
		);
		
		//중그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_GROUP_MEDIUM"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGroupMedium",comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMCE008.init();
});