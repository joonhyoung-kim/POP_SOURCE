var maxClosingMonth;

var MOMHA003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W2018082419033411810007s50zRC89Xn", null, function(){
				mCommon.init("grid2", "W201808241917542291001P2X4m4ixbLY", null, function(){
					that.grid();
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".calc60", "vertical", 400);
		
	}, grid: function() {
		tuCommon.cellClick("grid1");
	}, event: function() {
		var that = this;
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid1", "W2018082419033411810007s50zRC89Xn",  mCommon.formGetParam("#node"), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		// 상세조회버튼
		$(document).on("click", "#detailBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			} else if(checkedItems.length > 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11605']});
				return;
			} else if(checkedItems.length == 1){
				var item = checkedItems[0].item;
				var closingMonth = item.magamMonth;
				
				mCommon.render("grid2", "W201808241917542291001P2X4m4ixbLY", {closingMonth :closingMonth}, function(){});
			}
		});
		
		// 마감처리 버튼
		$(document).on("click", "#closingBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var detailGridData = AUIGrid.getGridData("grid2");
			var rowCnt = AUIGrid.getRowCount("grid2");
			var arrayList = [];
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11325']});
				return;
			}
			
			if(checkedItems[0].item.inFlag == "Y" || checkedItems[0].item.outFlag == "Y") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10381']});
				return;
			}
			
			if(checkedItems[0].item.inFlag == "N" || checkedItems[0].item.outFlag == "N") {
				maxClosingMonth = checkedItems[0].item.magamMonth;
			}
			
			if(maxClosingMonth != checkedItems[0].item.magamMonth) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11204']});
				return;
			}
			/*
			for(var i=0; i<rowCnt; i++) {
				if(detailGridData[i].endFlag == "N") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10852']});
					return;
				}
			}
			*/
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10380'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i=0; i<checkedItems.length; i++) {
						checkedItems[i].item.cudFlag = "C";
						arrayList.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "close.monthlySalesBuyClosing.monthlySalesBuyClosing", JSON.stringify(arrayList), that.callBack, arrayList);
				}
			}});
		});
		
		// 마감취소 버튼
		$(document).on("click", "#closingCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11326']});
				return;
			}
			
			if(checkedItems[0].item.inFlag == "N" || checkedItems[0].item.outFlag == "N") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10379']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11723'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i=0; i<checkedItems.length; i++) {
						checkedItems[i].item.cudFlag = "D";
						arrayList.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "close.monthlySalesBuyClosing.monthlySalesBuyClosing", JSON.stringify(arrayList), that.callBack, arrayList);
				}
			}});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "SALESBUYCLOSING_MOMHA003_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//마감년도
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingYears.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#closingYear", comboOptions, options);
			}
		);
	},
	callBack: function(param, data, callbackParam) {
		var that = this.MOMHA003;
		if(param == "SUCCESS") {
			mCommon.render("grid1", "W2018082419033411810007s50zRC89Xn",  mCommon.formGetParam("#node"), function(){});
			AUIGrid.clearGridData("grid2");
			micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	}
};
$(document).ready(function(event){
	MOMHA003.init();
});