var returnType = 'P';
var endPeriod;

var MOMEA014 = {
	init: function() {
		var that = this;
		that.design();
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201901141653542561000BGUqpvGvljn", null, function() {
				that.grid();
			}, Language);
		});
	}, 
	grid: function() {
		tuCommon.cellClick("grid");
		
		// 수불통제일에 대한 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMEA014"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	}, 
	event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function() {
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
			mCommon.render("grid", "W201901141653542561000BGUqpvGvljn", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCT_RETURN_HIST_MOMEA014_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 반품취소 버튼
		$(document).on("click", "#returnCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length < 1) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11610']});
				return;
			}
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.cancelDate != undefined && checkedItems[i].item.cancelDate != '' && checkedItems[i].item.cancelDate != null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.ioTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES10439' + '@' + endPeriod)});
					return;
				}
			}
				
				micaCommon.messageBox({type:"info", width:"400", height: "145", html : Language.lang['MESSAGES10429'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						var param = {
							itemRtnType : returnType,
							tnxType : 'CANCEL'
						}
						mom_ajax("D", "common.returnHistTemp", JSON.stringify(param), that.cancelCallback, checkedItems);
					}
				}});
		});
		
		tuCommon.addKeyDown($(document), $('#product'), $('#findBtn'));
	},
	comboBox : function() {
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_current_date('YYYY-MM-DD'));
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_DATE", attribute7: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true} , options);
			
			}
		);
		
		// From 업체
		mCommon.comboBoxClickCall("#fromVendor", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : "'CUSTOMER', 'BOTH'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromVendor", comboOptions, options);
					callBack();
			});
		});
		
		// To 창고
		mCommon.comboBoxClickCall("#toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd : "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toLocation", comboOptions, options);
					callBack();
			});
		});
		
		// 반품유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "PRODUCT_RETURN_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#returnType", comboOptions, options);
		});
		
		// 마감유무, 취소유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#endYn", comboOptions, options);
				micaCommon.comboBox.set("#cancelYn", comboOptions, options);
		});
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	cancelCallback : function (param, data, callbackParam){
		var that = this.MOMEA014;
		var arrayList = [];
		if(param == 'SUCCESS'){
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.tnxType = "CANCEL";
				callbackParam[i].item.itemRtnType = returnType;
				arrayList.push(callbackParam[i].item);
			}
			
			mom_ajax('L', 'common.returnHistTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallback : function(param, data, callbackParam){
		var that = this.MOMEA014;
		var params= {
				tnxType : callbackParam[0].tnxType,
				rtnType : returnType
		}
		if(param == 'SUCCESS'){
			mom_ajax('C', 'quality.productReturnHist.productReturnCancel', JSON.stringify(params), that.listCallbackPost);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(param, data){
		if(param == 'SUCCESS'){
			micaCommon.messageBox({type:"success", width:"400", height: "145",  html:Language.lang['MESSAGES10692']});
			mCommon.render('grid', 'W201901141653542561000BGUqpvGvljn', mCommon.formGetParam("#form"), function(){});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
};
$(document).ready(function(event){
	MOMEA014.init();
});