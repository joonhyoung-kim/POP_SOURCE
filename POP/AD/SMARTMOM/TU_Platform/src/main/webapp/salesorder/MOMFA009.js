var MOMFA009 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201903141744394311000ZE7Kpx7BnYY", null, function(){
				that.grid();
				that.event();
				that.comboBox();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick("grid");
		var fromDateDft;
		var toDateDft;
		//fromDate default
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "SHIP_DATE_DEFAULT", codeId : "FROM_DATE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				fromDateDft = parseInt(data[0].value);
			},
			error: function(data){},
			fail : function(data){}
		});
		
		//toDate default
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "SHIP_DATE_DEFAULT", codeId : "TO_DATE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				toDateDft = parseInt(data[0].value);
			},
			error: function(data){},
			fail : function(data){}
		});
		
		$("#fromDate").val(get_date_diff(fromDateDft));
		$("#toDate").val(get_date_diff(toDateDft));
		
//		AUIGrid.bind("grid", "rowCheckClick", function( e ) {
//			var checkedItem = AUIGrid.getCheckedRowItems("grid");
//			if(e.item.cancelDate == null) {
//				if(checkedItem.length > 0) {
//					for(var i = 0; i < checkedItem.length; i++) {
//						if(e.item.shipmentGroupId == checkedItem[i].item.shipmentGroupId && e.item.shipmentSeqNo == checkedItem[i].item.shipmentSeqNo) {
//							 //체크한 데이터랑 클릭한 데이터는 비교하지 않음
//						} else {
//							if(e.item.shipmentGroupId == checkedItem[i].item.shipmentGroupId) {
//								AUIGrid.addUncheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//								return;
//							} 
//							else if(e.item.shipmentGroupId != checkedItem[i].item.shipmentGroupId && e.checked == true) {
//								AUIGrid.addCheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//							}
//						}
//					}
//					if(checkedItem.length == 1) {
//						AUIGrid.addCheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//					} 
//					
//				} else {
//					AUIGrid.addUncheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//				}
//			} else {
//				var rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
//				var rowId = e.item[rowIdField];
//				AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
//			}
//			
//			
//		});
//		
//
//		AUIGrid.bind("grid", 'cellClick', function(e) {
//			var checkedItems = AUIGrid.getCheckedRowItems("grid");
//			var chkFlag = false;
//			AUIGrid.setProp("grid", "exportURL" , "1");
//			
//			setTimeout(function() {
//				if(AUIGrid.getProp("grid", 'exportURL') == '0') { 
//					return;
//				}
//				
//				AUIGrid.setProp("grid", 'exportURL' , '0');
//				
//			}, 200);
//			
//			if(e.item.cancelDate == null) {
//				for(var i = 0; i < checkedItems.length; i++) {
//					if(checkedItems[i].item.shipmentGroupId == e.item.shipmentGroupId) {
//						AUIGrid.addUncheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//						chkFlag = true;
//						return;
//					} 
//				}
//				
//				if(chkFlag != true) {
//					AUIGrid.addCheckedRowsByValue(e.pid, "shipmentGroupId", e.item.shipmentGroupId);
//				}
//			} 
//			
//		});
		
	}, event: function() {
		var that = this;
		
		// 조회 버튼
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
				mCommon.render("grid", "W201903141744394311000ZE7Kpx7BnYY",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.cancelDate != "" && checkedItems[i].item.cancelDate != null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11006']});
					return;
				}
			}
			if(checkedItems.length == "0") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11342']});
				return;
			} else {
				var option = {
						type:"info", 
						html:Language.lang['MESSAGES11433'], 
						width:"400", 
						height: "145",
						okButton:{
							text:"OK",
							after:function(){								
								for(var i = 0; i < checkedItems.length; i++) {
									arrayList.push(checkedItems[i].item);
								}
								mom_ajax("L", "shipping.shipPlanningStatus.shipPlanningCancel", JSON.stringify(arrayList), that.callback);								
							}
						}
				}
				micaCommon.messageBox(option);						
			}	
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "SHIP_PLANNING_CANCEL_MOMFA009_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var barCodes = "";
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i == 0) {
					barCodes += "\'" + checkedItems[i].item.barCode + "\'";
				} else {
					barCodes += "\, \'" + checkedItems[i].item.barCode + "\'";
				}
			}
			
			var barCodesUrl = barCodes.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMFA009";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&barCodes=" + barCodesUrl;
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.shipping.shipPlanningStatus.shipPlanningStatusExcelPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
			console.log(JSON.stringify(jsonList));
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#shipmentGroupId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerWoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#partNo'), $('#findBtn'));
		
	},
	comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		//취소유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#cancelFlag",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: true});
			}
		);
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	callback : function(result, data){
		var that = this.MOMFA009;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W201903141744394311000ZE7Kpx7BnYY', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMFA009.init();
});