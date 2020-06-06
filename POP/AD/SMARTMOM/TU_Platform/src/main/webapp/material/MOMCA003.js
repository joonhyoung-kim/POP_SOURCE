var vendorCd = sessionStorage.getItem("vendorCd");
var empAuthority = sessionStorage.getItem("empAuthority");
var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var reportUrl = ""; 
var gvMenuId = "MOMCA003";
var gvTableId = "MOM_MATERIAL_ORDER";
var endPeriod;

var MOMCA003 = {
	init: function() {
		var that = this;
		that.design();
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807251059342711003rGPgdRHUZQu", null, function() {
				that.grid();
			}, Language);
		});
	}, grid: function() {
//		AUIGrid.setColumnPropByDataField( "grid", "orderDate", {style:"columnStyle"} );
		AUIGrid.setColumnPropByDataField( "grid", "orderDate", {
			style:"columnStyle",
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",	
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		AUIGrid.setColumnPropByDataField( "grid", "compareRemainQty", {style:"columnStyle"} );
	
		tuCommon.cellEditEnd('grid');		 
		tuCommon.cellClick('grid');
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');
	    });
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : gvMenuId},
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
		
	}, event: function() {
		//발주취소 조회
		var that = this;
		$(document).on("click", "#findBtn", function() { 
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			if(empAuthority <= 5 && vendorCd ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10570']});
				return;
			}
			
			mCommon.render("grid", "W201807251059342711003rGPgdRHUZQu",  mCommon.formGetParam("#form"), function(){});
		});
		
		//발주취소
		$(document).on("click", "#orderCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11330']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++){
				if(checkedItems[i].item.orderState == "CANCEL") {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11463']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.createDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.getLang('MESSAGES10470' + '@' + endPeriod)});
					return;
				}
				
				if(checkedItems[i].item.remainedQty <= 0) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10451']});
					return;
				}
				
				if(checkedItems[i].item.compareRemainQty <= 0) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11458']});
					return;
				}
				
				if(checkedItems[i].item.compareRemainQty > checkedItems[i].item.remainedQty) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10453']});
					return;
				}
			}
			
			var option = {
					type:"info", 
					html:Language.lang['MESSAGES10452'], 
					okButton:{
						text:"OK", 
						after:function(){
							var param = {
								menuId : gvMenuId
								, tableId : gvTableId
							};
							mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems, "CANCEL_QTY");
						}
					}
			}
			micaCommon.messageBox(option);				
		});
		
		// 납기일 변경
		$(document).on("click", "#changeRequestTimeBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11322']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++){
				if(checkedItems[i].item.orderState == "CANCEL") {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11462']});
					return;
				}
			}
			
			var option = {
					type:"info", 
					html:Language.lang['MESSAGES10268'], 
					okButton:{
						text:"OK", 
						after:function(){
							var param = {
								menuId : gvMenuId
								, tableId : gvTableId
							};
							mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems, "ORDER_DATE");
						}
					}
			}
		
			micaCommon.messageBox(option);			
		});
		
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "IRREGULAR_CANCEL_MOMCA003_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#orderNumber'), $('#findBtn'));
		
		// 발주서 출력
		$(document).on("click", "#orderPrintBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var orderGroupIds = "";
			var cnt;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11329']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i == 0) {
					orderGroupIds += "\'" + checkedItems[i].item.orderGroupId + "\'";
				} else {
					orderGroupIds += "\, \'" + checkedItems[i].item.orderGroupId + "\'";
				}
				
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.irregularOrderCancel.orderExcelPrintCount.dummy",
					type : "GET",
					data : {orderGroupIds : orderGroupIds},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						cnt = data[0].rowCount;
					},
					error: function(data){},
					fail : function(data){}
				});
			}
			
			if(cnt <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11464']});
				return;
			}
			
			var orderGroupIdsUrl = orderGroupIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCA003";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&orderGroupIds=" + orderGroupIdsUrl + "&excelId=MOMCA003&pId=MOMCA003";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.irregularOrderCancel.orderExcelPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
	},
	comboBox: function() {
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = { searchMode : "containsignorecase", autoComplete:true };
		var options = {local: "", textName : "name", valueName : "code", readonly: false};
		
		// 업체, 납품업체
		if(empAuthority > 5 || (empAuthority > 5 && vendorCd == "")){
			mCommon.comboBoxClickCall("#vendorName, #departureVendorName", function(callBack) {
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
						{attribute1 : 'Y'}, // 파라미터
						function(data) {
							options.local = data;
							micaCommon.comboBox.set("#vendorName",comboOptions, options);
							micaCommon.comboBox.set("#departureVendorName",comboOptions, options);
							callBack();
						}
				);
			});
			
		} else if(empAuthority <= 5 && vendorCd != "") {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comGetVendor.dummy", // 호출 URL
					{vendorCd : vendorCd}, // 파라미터
					function(data) {
						micaCommon.comboBox.set("#vendorName",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: true});
						micaCommon.comboBox.set("#departureVendorName",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: true});
					}
			);
			$("#vendorName").jqxComboBox({disabled : true});
			$("#departureVendorName").jqxComboBox({disabled : true});
			
		} else if(empAuthority <= 5 && vendorCd =="") {
			$("#vendorName").val(Language.lang['MESSAGES10845']);
			$("#departureVendorName").val(Language.lang['MESSAGES10845']);
			$("#vendorName").jqxComboBox({disabled : true});
			$("#departureVendorName").jqxComboBox({disabled : true});
		}
		
		//상태
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_ORDER_STATE", attribute3 : "Y"}, // 파라미터
			function(data){
				options.local = data;
				micaCommon.comboBox.set("#orderState", comboOptions, options);
			}
		);
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
	},
	callBack : function(result, data){
		var that = this.MOMCA003;
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201807251059342711003rGPgdRHUZQu",  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
		
//		return param;
		micaCommon.splash.hide();
	},
	tempInsertCallback : function(result, data, param, callbackParam, orderType){
		var that = this.MOMCA003;
		var arrayList = [];
		if(result == "SUCCESS"){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : gvMenuId
					, tableId : gvTableId
					, colId1 : 'MATERIAL_ORDER_ID'
					, value1 : callbackParam[i].item.materialOrderId
					, colId2 : 'ORDER_TYPE'
					, value2 : orderType
					, colId3 : 'ORDER_DATE'
					, value3 : callbackParam[i].item.orderDate
					, colId4 : 'CANCEL_QTY'
					, value4 : callbackParam[i].item.compareRemainQty
					}
				);
			}
			
			mom_ajax('L', 'common.dataMultiDelTmp', JSON.stringify(arrayList), that.procListCallback, null, orderType);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	procListCallback : function(result, data, param, callbackParam, orderType){
		var that = this.MOMCA003;
		var parameters = {
			menuId : gvMenuId
			, tableId : gvTableId
			, attr1 : orderType
		};
		if(result == "SUCCESS"){
			mom_ajax('C', 'purchase.purchasing.irregularOrderCancel.cancelMaterialOrderProc', JSON.stringify(parameters), that.callBack);
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
	MOMCA003.init();
});