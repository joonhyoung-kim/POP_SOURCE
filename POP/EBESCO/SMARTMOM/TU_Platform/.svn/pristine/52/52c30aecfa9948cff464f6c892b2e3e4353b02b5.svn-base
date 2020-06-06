var MOMZA091 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201901202159133351000aMv3P9oYgbm", null, function(){
				that.grid();
				that.event();
				that.design();
				that.comboBox();
			}, Language);
		});
	}
	, grid: function() {
		$("#fromDate").val(get_date_diff(0));
		 $("#toDate").val(get_date_diff(0));
		
		var footerObject = [
			{
				dataField : "amt",
				positionField : "qty",
				operation : "SUM",
				colSpan : 2,
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES10314'] + ": " + AUIGrid.formatNumber(value, "#,##0");
				}
			},
			{
				dataField : "sumAmt",
				positionField : "sumQty",
				operation : "SUM",
				colSpan : 2,
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11348'] + ": " + AUIGrid.formatNumber(value, "#,##0");
				}
			},
		]
		// footer 합계
		AUIGrid.setFooter("grid", footerObject);
		
		AUIGrid.setGroupBy("grid",  ["itemGroupMediumNm"], {
	         dataFields : [ "qty", "amt", "sumQty", "sumAmt"],
	         labelTexts : [Language.lang['MESSAGES10697']]
	         
		});
		
		AUIGrid.setProp("grid", "rowStyleFunction", function(rowIndex, item) {
			if(item.itemGroupMediumNm == Language.lang['MESSAGES10697']) { // 소계 항목만 스타일 지정
				return "my-row-style";
			}
		});
		
		// 변경된 rowStyleFunction 이 적용되도록 그리드 업데이트
		AUIGrid.update("grid");
	}, event: function() {
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
//			var checkedItems = "";
//			var stateList = $("#itemType").jqxComboBox('getCheckedItems');
//			$.each(stateList, function(index){
//				if(stateList.length-1 != index){
//					checkedItems +="'"+this.value + "',"
//				} else {
//					checkedItems +="'"+this.value + "'"
//				}
//			});
			
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			var param = mCommon.formGetParam("#form");
//			param.itemType = checkedItems;
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var fromDateM = $("#fromDate").val().substr(0, 7);
			var toDateM = $("#toDate").val().substr(0, 7);
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			if(fromDateM != toDateM){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10105']});
				return;
			}
			mCommon.render("grid", "W201901202159133351000aMv3P9oYgbm", param, function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "DAILY_SALES_HIST_MOMZA091_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox : function () {
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		//품목유형
//		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
//				{codeClassId : "ITEM_TYPE"}, // 파라미터
//				function(data) {
//					options.local = data;
//					micaCommon.comboBox.set("#itemType",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, options);
//				}
//		);
	},
	design : function(){
		$("head").append('<style>.my-row-style {background:#D8D8D8;font-weight:bold;color:#000;}</style>');
	},
};
$(document).ready(function(event){
	MOMZA091.init();
});