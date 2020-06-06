var MOMZA092 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201901211836215081000PhvqZpme2mw", null, function(){
				that.grid();
				that.event();
				that.comboBox();
			}, Language);
		});
	}, grid: function() {
		
		 $("#fromDate").val(get_date_diff(0));
		 $("#toDate").val(get_date_diff(0));
		 
		 var footerObject = [
				{
					dataField : "amt",
					positionField : "amt",
					operation : "SUM",
					colSpan : 2,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10313'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
				{
					dataField : "sumAmt",
					positionField : "sumAmt",
					operation : "SUM",
					colSpan : 2,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES11348'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
			]
			// footer 합계
			AUIGrid.setFooter("grid", footerObject);
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
			mCommon.render("grid", "W201901211836215081000PhvqZpme2mw", param, function(){});
		});
	
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "DAILY_PURCHASE_TOTAL_MOMZA092_" + get_current_date("yyyy-mm-dd")});
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
	 
};
$(document).ready(function(event){
	MOMZA092.init();
});