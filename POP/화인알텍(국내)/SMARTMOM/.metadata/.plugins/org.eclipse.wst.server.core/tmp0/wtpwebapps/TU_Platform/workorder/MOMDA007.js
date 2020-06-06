var MOMDA007 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808010413236061000nTfVrm3HpyQ", null, function() {
				that.grid();
			}, Language);
		});
	}, grid: function() {
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		var goodQtyT = 0;
		var badQtyT = 0;
		var cancelQtyT = 0;
		var footerObject = [
			{
				dataField : "goodQty",
				operation : "SUM",
				labelFunction : function(value, columnValues, footerValues) {
//					goodQtyT = Language.lang['MESSAGES11351'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					goodQtyT = value;
				}
			},
			{
				dataField : "cancelQty",
	        	operation : "SUM",
				labelFunction : function(value, columnValues, footerValues) {
					cancelQtyT =  value;
				}
			},
			{
				dataField : "badQty",
				positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	colSpan : 50,
	        	operation : "SUM",
				labelFunction : function(value, columnValues, footerValues) {
//					badQtyT =  Language.lang['MESSAGES11350'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					badQtyT =  value;
					return Language.lang['MESSAGES11351'] + ": " + AUIGrid.formatNumber(goodQtyT - cancelQtyT, "#,##0") + " / " 
						+ Language.lang['MESSAGES11350'] + ": " + AUIGrid.formatNumber(badQtyT, "#,##0") + " / " 
						+ Language.lang['MESSAGES10522'] + ": " + AUIGrid.formatNumber((badQtyT/(goodQtyT - cancelQtyT + badQtyT)) * 100, "#,##0.####") + "%";

				}
			}
		]
		// footer 합계
		AUIGrid.setFooter("grid", footerObject);
		$(".aui-grid-default-footer").css({"text-align": "left"});
	}, event: function() {
		var that = this;
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function(){
			mCommon.auiGridExcelExport("grid", {fileName: "JOB_RESULT_HIST_MOMDA007_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회
		$(document).on("click", "#findBtn", function(){
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
			
			mCommon.render("grid", "W201808010413236061000nTfVrm3HpyQ",  mCommon.formGetParam("#form"), function(){});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#searchKeyWord'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#userName'), $('#findBtn'));
	},
	comboBox: function(){
		// 날짜
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"JOB_RESULT_DATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);

		// searchJobTerms
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_TERMS", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#searchJobTerms",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);

		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				
				}
			);
		});

		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_RESULT_STATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#workState",comboOptions, options);
			
			}
		);
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// 설비(MOM_EQUIPMENT Table - equipmentCd)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderCreate.equipment.dummy", // 호출 URL
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#equipmentCd", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMDA007.init();
});