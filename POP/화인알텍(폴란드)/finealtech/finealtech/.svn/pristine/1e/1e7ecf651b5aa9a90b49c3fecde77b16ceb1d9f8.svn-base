var endPeriod;

var MOMFA017 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201808261551194991000xOp1IP8ijZ5", null, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick('grid');
		AUIGrid.setColumnPropByDataField( "grid", "cancelDate", { 
			style:"columnStyle",
	 		editRenderer : {
	           type : "CalendarRenderer",
	           openDirectly : true,
	   		   onlyCalendar : false
		    }
	 	});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMFA017"},
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
		
		AUIGrid.setColumnPropByDataField("grid", "description", {style:"columnStyle"});
              
		// cellEditEndBefore 이벤트 바인딩
		AUIGrid.bind("grid", "cellEditEndBefore", function(event) {				
			if(event.dataField == "cancelDate") {
				var cDate = event.value;
				var eDate = event.item.exShippingDate;
				
				if(cDate < eDate) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11482']});
					return event.oldValue;
				}	
				
				if(new Date(to_date_yyyy_mm_dd(cDate)) <= new Date(endPeriod)) { 
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
	                return event.oldValue; 
	            } else {
	            	return to_date_yyyy_mm_dd(event.value); 
				}
				
			}
			
			return event.value;
		});
		AUIGrid.bind('grid', "cellEditBegin", function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');	
		});
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201808261551194991000xOp1IP8ijZ5", mCommon.formGetParam("#form"), function(){});
		});
		
		// 예외출고취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11321']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.cancelFlag == "Y") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.cancelDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11483' + '@' + endPeriod)});
					return;
				}
				
				arrayList.push(checkedItems[i].item);
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10919'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){	
					mom_ajax("L", "shipping.exceptionShippingCancel.itemStockOutExceptionCancel", JSON.stringify(arrayList), that.callBack, arrayList);
			}
			}});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "EXCEPTION_SHIPPING_CANCEL_MOMFA017_" + get_current_date("yyyy-mm-dd")});
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	}, comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#location", comboOptions, options);
			}
		);
		
		//품목타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
			}
		);
		
		//예외출고구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "IO_CATEGORY", attribute2: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#exShippingType", comboOptions, options);
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(param, data, callbackParam) {
		var that = this.MOMCC008;
		if(param == "SUCCESS") {
			mCommon.render("grid", "W201808261551194991000xOp1IP8ijZ5", mCommon.formGetParam("#form"), function(){});
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMFA017.init();
});