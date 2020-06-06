var MOMHA002 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808241612338391000XYXe2agOpIH", null, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick("grid");
	}, event: function() {
		var that = this;
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#closingMonth").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11721']});
				return;
			}
			if($("#psFlag").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11722']});
				return;
			}
			mCommon.render("grid", "W201808241612338391000XYXe2agOpIH",  mCommon.formGetParam("#node"), function(){});
		});
		
		//마감취소 버튼
		$(document).on("click", "#closingCancelBtn", function(){
			var arrayList = [];
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11326']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11723'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){	
					for(var i=0; i<checkedItems.length; i++) {
						arrayList.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "close.monthlyClosingCancel.monthlyVendorCloseCancel", JSON.stringify(arrayList), that.callBack, arrayList);
				}
			}});
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//마감월
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingMonthly.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#closingMonth", comboOptions, options);
			}
		);
		
		//매입/매출
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "MAGAM_IO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#psFlag",comboOptions, options);
			}
		);
		
		//업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#vendorName",comboOptions, options);
			}
		);
		
		//I/F전송여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#ifFlag",comboOptions, options);
			}
		);
	},
	callBack: function(param, data, callbackParam, flag) {
		var that = this.MOMHA002;
		if(param == "SUCCESS") {
			mCommon.render("grid", "W201808241612338391000XYXe2agOpIH",  mCommon.formGetParam("#node"), function(){});
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
	MOMHA002.init();
});