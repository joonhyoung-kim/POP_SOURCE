var allowMinusQty;
var endPeriod;

var MOMFA016 = {
	init: function() {
		var that =this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201808261506238871001QYMnspycuXT", null, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick('grid');
		
		AUIGrid.setColumnPropByDataField( "grid", "exShippingDate", { 
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
			data : {menuId : "MOMFA016"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
						if(event.dataField == "exShippingDate") { // 달력 지정한 필드인 경우 
							if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
								micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
								return event.oldValue; 
							} else {
								return to_date_yyyy_mm_dd(event.value); 
							} 
						}
						return event.value; 
					}); 
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId: "EXCEPTION_OUT_FLAG"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid", "exceptionFlag", {
					style:"columnStyle",
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "DropDownListRenderer",
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
		
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
			timeout : 30000000,
			async : false,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				allowMinusQty = data[0].allowMinusQty;
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
		
		AUIGrid.bind('grid', "cellEditBegin", function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');	
		});
		
		AUIGrid.setColumnPropByDataField( "grid", "description", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "exShippingQty", { style:"columnStyle" } );
		
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201808261506238871001QYMnspycuXT", mCommon.formGetParam("#form"), function(){});
		});
		
		// 출하처리 버튼
		$(document).on("click","#applyBtn",function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11610']});
				return;
			}
			for(var i =0; i<checkedItems.length; i++){
				if(checkedItems[i].item.exShippingQty == "0" || checkedItems[i].item.exShippingQty == "" ){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11383']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.exShippingDate) <= endPeriod){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11394' + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(checkedItems[i].item.currentQty >= 0) {
						if(checkedItems[i].item.currentQty < checkedItems[i].item.exShippingQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11615']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10914']});
						return;
					}
				}
			}
			
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES11449'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("D","shipping.exceptionShipping.exceptionShippingTemp",JSON.stringify({}),that.delCallback, checkedItems);
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "EXCEPTION_SHIPPING_MOMFA016_" + get_current_date("yyyy-mm-dd")});
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		
	}, 
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", facilityType : "'FAC200','FAC300','FAC400','FAC500','FAC600'"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#locationName", comboOptions, options);
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
		
		// 재고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE",attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockFlag", comboOptions, options);
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	delCallback : function(param, data, callbackParam){
		var that = this.MOMFA016;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid");
		if(param == 'SUCCESS'){
			for(var i = 0; i < checkedItems.length; i++){
				checkedItems[i].item.orderSeq = i;
				arrayList.push(checkedItems[i].item);
			}
			mom_ajax('L', 'shipping.exceptionShipping.exceptionShippingTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
			
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
		var that = this.MOMFA016;
		if(param == 'SUCCESS'){
			if(callbackParam.length > 0){
				mom_ajax('C', 'shipping.exceptionShipping.exceptionShipping', JSON.stringify(callbackParam[0]), that.listCallbackPost);
			}
			
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
		var that = this.MOMFA016;
		if(param == 'SUCCESS'){
			mCommon.render('grid', 'W201808261506238871001QYMnspycuXT', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMFA016.init();
});