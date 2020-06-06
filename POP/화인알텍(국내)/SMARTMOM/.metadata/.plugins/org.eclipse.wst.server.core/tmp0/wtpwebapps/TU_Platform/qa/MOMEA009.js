var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var endPeriod;

var MOMEA009 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201901040944046021000W0jc12dKoeL", null, function(){
				that.grid();
				that.event();
				that.comboBox();
				that.design();
			}, Language);
		});
		
	}, grid: function() {
		tuCommon.cellClick('grid');	
		AUIGrid.setSelectionMode('grid', "singleCell");
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "MATERIAL_TERMINATE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField("grid", "reasonCode", {
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
						showEditorBtnOver : true,
						list : data,
						keyField : "code", 
						valueField : "name"
					}	
			 	});
				
			},
			error: function(data){},
			fail : function(data){}
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMEA009"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
				        if(event.dataField == "discardDate") { // 달력 지정한 필드인 경우 
				        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
				        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
				                return event.oldValue; 
				        	} else {
				        		return to_date_yyyy_mm_dd(event.value); 
			                } 
				        }
				        
				        if(event.dataField == "discardQty") {
							var discardQty = event.value;
							
							var conversionUnitQty = discardQty * event.item.originConversionUnitQty;
							AUIGrid.setCellValue("grid", event.rowIndex, "conversionUnitQty", conversionUnitQty);
							return discardQty;
						}
				        
				        return event.value; 
					}); 
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		AUIGrid.bind('grid', "cellEditBegin", function(event){ 
			AUIGrid.setProp('grid', 'exportURL', '0');
		});
		
		// cellEditEndBefore 이벤트 바인딩
//		AUIGrid.bind("grid", "cellEditEndBefore", function(event) {				
//			if(event.dataField == "discardQty") {
//				var discardQty = event.value;
//				
//				var conversionUnitQty = discardQty * event.item.originConversionUnitQty;
//				AUIGrid.setCellValue("grid", event.rowIndex, "conversionUnitQty", conversionUnitQty);
//				return discardQty;
//			}
//			
//			return event.value;
//		});
		
		AUIGrid.setColumnPropByDataField( "grid", "discardDate", {
			style:"columnStyle",
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",			
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		AUIGrid.setColumnPropByDataField('grid', "conversionUnitQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField('grid', "discardQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField('grid', "description", { style:"columnStyle" } );
	}, event: function() {
		var that = this; 
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#locationName").val() == null || $("#locationName").val() == '') {
				micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11296']});
				return;
			}
			
			mCommon.render("grid", "W201901040944046021000W0jc12dKoeL",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_DISPOSAL_MOMEA009_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 폐기 버튼
		$(document).on("click", "#disposalBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11562']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.conversionUnitQty == null || checkedItems[i].item.conversionUnitQty == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11651']});
					return;
				}
				
				if(checkedItems[i].item.discardQty == null || checkedItems[i].item.discardQty == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11543']});
					return;
				}
				
				if(checkedItems[i].item.discardDate == null || checkedItems[i].item.discardDate == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11551']});
					return;
				}
				
				if(checkedItems[i].item.reasonCode == null || checkedItems[i].item.reasonCode == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11560']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.discardDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.getLang('MESSAGES11550' + '@' + endPeriod)});
					return;
				}
			}
			
			var param = {
				divisionCd : divisionCd,
				companyCd : companyCd
			}
			
			var option = {
				type : "info", 
				width : "400", 
				height : "145",
				html:Language.lang['MESSAGES11561'], 
				okButton:{
					text:"OK", 
					after:function(){
						mom_ajax("D", "quality.materialDisposal.materialDisposal", JSON.stringify(param), that.callBack, JSON.stringify(param), "delCall");
					}
				}
			}
				
			micaCommon.messageBox(option);	
		});
		
		// 폐기일자 캘린더 클릭 시
		$(document).on("click", "#discardDate", function() {
			$("#discardDate").datetimepicker({
				timepicker:false,
				format:'Y-m-d'
			});
		});
		
		// 폐기일자 캘린더 일자 변경 시
		$(document).on("change", "#discardDate", function() {
			var gridLength = AUIGrid.getGridData("grid").length;
			var discardDate = $("#discardDate").val();
			 for(var i = 0; i < gridLength; i++) {
				 AUIGrid.setCellValue("grid", i, "discardDate", discardDate);
			 }
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
			{facilityClassCd : "AREA", scrapLocationFlag : "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#locationName", comboOptions, options);
		});
		
		// 타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "ITEM_TYPE", attribute14: 'Y'}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
		});
		
	}, 
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(result, data, param, callbackParam, flag) {
		var that = this.MOMEA009;
		if(result == "SUCCESS") {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			var chkFlag = false;
			if(flag == "delCall") {
				for(var i=0; i<checkedItems.length; i++) {
					if(checkedItems[i].item.discardQty == '') {
						micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11543']});
						return;
					}
					
					if(checkedItems[i].item.discardDate == '') {
						micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11549']});
						return;
					}
					
					if(checkedItems[i].item.reasonCode == '') {
						micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11559']});
						return;
					}
					
					checkedItems[i].item.seq = i+1;
					
					arrayList.push(checkedItems[i].item);
					
					if(i == checkedItems.length - 1) {
						chkFlag = true;
					}
				}
				
				mom_ajax("L", "quality.materialDisposal.materialDisposal", JSON.stringify(arrayList), that.callBack, JSON.stringify(arrayList), chkFlag);
				
			} else if(flag == true) {
				mom_ajax("C", "quality.materialDisposal.materialDisposalProc", "{}", that.callBack, "{}", "procCall");
				
			} else {
				mCommon.render("grid", "W201901040944046021000W0jc12dKoeL", mCommon.formGetParam("#form"), function(){});
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			}
			
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	}
};
$(document).ready(function(event){
	MOMEA009.init();
});