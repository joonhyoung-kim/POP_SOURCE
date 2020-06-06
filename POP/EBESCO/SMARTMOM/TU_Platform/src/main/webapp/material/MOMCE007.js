var locationParam = mCommon.getSearchParam();
var allowMinusQty;
var reportUrl = "";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var menuId;
var endPeriod;

var MOMCE007 = {
	init: function() {
		var that = this;
		that.design();
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201808031005572991000pCAMBXhTRuO", null, function() {
				that.grid();
			}, Language);
		});
		
	}, grid: function() {
		if (locationParam.stockType == "MAT") {
			stockType = "'MAT'";
			menuId = "MOMCE007";
		} else if (locationParam.stockType == "WO") {
			stockType = "'WO'";
			menuId = "MOMDA009";
		} else if (locationParam.stockType == "SO") {
			stockType = "'SO'";
			menuId = "MOMFA027";
		} else if (locationParam.stockType == "MRTN") {
			stockType = "'MRTN'";
			menuId = "MOMCC017";
		}
		
		tuCommon.cellClick('grid');
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		$(".aui-grid-default-footer").css({"text-align": "left"});
		
		var totalIssueQty;
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : menuId},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
						if(event.dataField == "cancelIoTime") { // 달력 지정한 필드인 경우 
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
		
		AUIGrid.setColumnPropByDataField( "grid", "cancelIoTime", {
			style:"columnStyle",
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",
				 defaultFormat : "yyyy-mm-dd",
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		AUIGrid.setColumnPropByDataField( "grid", "description", {
			style:"columnStyle",
			editRenderer : {
				 type : "InputEditRenderer"
			}
		});
		
		AUIGrid.bind('grid', "cellEditBegin", function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');	
		});
		
		var footerObject = [
			{
	        	dataField : "qty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalIssueQty = value;
				}
	        },
			{
	        	dataField : "cancelQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + Language.lang['MESSAGES10982'] + ": " + AUIGrid.formatNumber(totalIssueQty - value, "#,##0.0000", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
	}, event: function() {
		var that = this;
		
		// 조회
		$(document).on("click", "#findBtn", function() {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var param = mCommon.formGetParam("#node");
			param.stockType = locationParam.stockType;
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201808031005572991000pCAMBXhTRuO",  param, function(){});
		});
		
		// 이동취소
		$(document).on("click", "#moveCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.cancelFlag == 'Y') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
				
				if(checkedItems[i].item.cancelIoTime == '' || checkedItems[i].item.cancelIoTime == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10994']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.cancelIoTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11479' + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(checkedItems[i].item.toLocationQty >= 0) {
						if(checkedItems[i].item.qty > checkedItems[i].item.toLocationQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11473']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10993']});
						return;
					}
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10995'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						var param = {
							fromInoutId : checkedItems[i].item.fromInoutId,
							toInoutId : checkedItems[i].item.toInoutId,
							cancelIoTime : checkedItems[i].item.cancelIoTime
						}
						
						if(i == checkedItems.length - 1) {
							chkFlag = true;
						}
						
						mom_ajax("C", "purchase.stock.itemStockMoveHist.itemStockMoveCancelProc", JSON.stringify(param), that.callBack, JSON.stringify(param), chkFlag);
					}
					
				}
			}});
			
		});
		
		// 엑셀
		$(document).on("click", "#inputBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_STOCK_MOVE_HIST_MOMCE007_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var itemInputIds = "";
			var cnt = 0;

			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i == 0) {
					itemInputIds += "\'" + checkedItems[i].item.itemInputId + "\'";
				} else {
					itemInputIds += "\, \'" + checkedItems[i].item.itemInputId + "\'";
				}
			}
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.stock.itemStockMoveHist.itemStockMoveHistPrint.dummy",
				type : "GET",
				data : {itemInputIds : itemInputIds, stockType : locationParam.stockType},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						cnt = data[0].rowCount;
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			if(cnt == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11464']});
				return;
			}
			
			var itemInputIdsUrl = itemInputIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCE007";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&itemInputIds=" + itemInputIdsUrl + "&stockType=" + locationParam.stockType + "&excelId=MOMCE007&pId=MOMCE007";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.stock.itemStockMoveHist.itemStockMoveHistPrint.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox: function() {
		$("#fromDate").val(get_date_diff(-2));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		var comboParams;
		var comboItemType;
		var facilityType;
		if(locationParam.stockType == 'MAT') {
			comboParams = {codeClassId: "IO_CATEGORY", attribute7: 'Y'} // 파라미터
			comboItemType = {codeClassId: "ITEM_TYPE", attribute3: 'Y'} // 파라미터
		} else if(locationParam.stockType == 'WO') {
			comboParams = {codeClassId: "IO_CATEGORY", attribute8: 'Y'} // 파라미터
			comboItemType = {codeClassId: "ITEM_TYPE", attribute4: 'Y'} // 파라미터
		} else if(locationParam.stockType == 'SO'){
			comboParams = {codeClassId: "IO_CATEGORY", attribute11: 'Y'} // 파라미터
			comboItemType = {codeClassId: "ITEM_TYPE", attribute5: 'Y'} // 파라미터
		} else if(locationParam.stockType == 'MRTN'){
			comboParams = {codeClassId: "IO_CATEGORY", attribute1: 'Y'} // 파라미터
			comboItemType = {codeClassId: "ITEM_TYPE", attribute6: 'Y'} // 파라미터
		}
		
		//품목타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				comboItemType, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
			}
		);
		
		// From창고
		mCommon.comboBoxClickCall("#fromLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", stockType : locationParam.stockType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromLocation", comboOptions, options);
					callBack();
				}
			);
		});
		
		// To창고
		mCommon.comboBoxClickCall("#toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.toFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", stockType : locationParam.stockType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toLocation", comboOptions, options);
					callBack();
				}
			);
		});
		
		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			comboParams,
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type",comboOptions, options);
			}
		);
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
	},
	callBack : function(result, data, param, callbackParam, flag){
		var that = this.MOMCE007;
		if(result == "SUCCESS"){
			if(flag == true) {
				var params = mCommon.formGetParam("#node");
				params.stockType = locationParam.stockType;
				mCommon.render("grid", "W201808031005572991000pCAMBXhTRuO",  params, function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMCE007.init();
});