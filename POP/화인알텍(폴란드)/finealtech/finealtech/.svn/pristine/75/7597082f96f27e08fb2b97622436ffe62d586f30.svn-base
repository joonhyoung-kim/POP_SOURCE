var locationParam = mCommon.getSearchParam();
var reportUrl = "";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var gvMenuId = "MOMCC014";
var gvTableId = "MOM_ITEM_STOCK";
var releaseFacilityType = "";
var itemTypeParam;
var requestFacilityType = "";
var releaseType;
var endPeriod;
var menuId;

var MOMCC014 = {
	init: function() {
		var that = this;
		if(locationParam.stockType == "MAT") {
			// 원자재(공정품)불출현황 불출창고 코드값 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "FACILITY_TYPE", attribute1 : "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						 releaseFacilityType = "'" + data[0].code + "'";
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			// 원자재(공정품)불출현황 요청창고 코드값 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "FACILITY_TYPE", attribute2 : "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						for(var i=0; i<data.length; i++) {
							if(i == 0) {
								requestFacilityType += "'" + data[i].code + "'";
							} else {
								requestFacilityType += ", '" + data[i].code + "'";
							}
						}
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			releaseFacilityType = releaseFacilityType;
			itemTypeParam = {codeClassId:"ITEM_TYPE", attribute1 : "Y"}
			requestFacilityType = requestFacilityType;
			releaseType = {codeClassId:"IO_CATEGORY", attribute2 : "Y"}
			$("#labelText").text(Language.lang['MESSAGES10965']);
			menuId = "MOMCC014";
		} else {
			// 원자재(공정품)불출현황 불출창고 코드값 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "FACILITY_TYPE", attribute3 : "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						releaseFacilityType = "'" + data[0].code + "'";
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			// 원자재(공정품)불출현황 요청창고 코드값 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "FACILITY_TYPE", attribute4 : "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						requestFacilityType = "'" + data[0].code + "'";
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			releaseFacilityType = releaseFacilityType;
			itemTypeParam = {codeClassId:"ITEM_TYPE", attribute2 : "Y"}
			requestFacilityType = requestFacilityType;
			releaseType = {codeClassId:"IO_CATEGORY", attribute3 : "Y"}
			$("#labelText").text(Language.lang['MESSAGES10218']);
			menuId = "MOMCC016";
		}
		that.grid();
		that.event();
		that.comboBox();
		that.design();
		
		Language.init(function() {
			mCommon.init("grid", "W201901031219398461000qzHXpPXRZH1", null, function() {
				that.grid("grid");
			}, Language);
		});
	}, 
	grid: function() {
		tuCommon.cellClick("grid");
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		var totalIssueQty;
		AUIGrid.setSelectionMode("grid", "singleCell");
		$(".aui-grid-default-footer").css({"text-align": "left"});
		
		AUIGrid.setColumnPropByDataField("grid", "cancelDate", {
			style:"columnStyle",
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
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
				        if(event.dataField == "cancelDate") { // 달력 지정한 필드인 경우 
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
		
		AUIGrid.setColumnPropByDataField("grid", "description", {style:"columnStyle"});
		
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			// 취소수량에 값이 있으면
			if(e.item.cancelQty != 0) {
				return false;
			} else {
				AUIGrid.setProp('grid', 'exportURL', '0');
				return true;
			}
		});
		
		var footerObject = [
			{
	        	dataField : "issueQty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalIssueQty = Language.lang['MESSAGES11386'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        },
			{
	        	dataField : "cancelQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + totalIssueQty + " / " + Language.lang['MESSAGES11469'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
	},
	event: function() {
		var that = this;
		// 조회
		$("#findBtn").click(function(event) {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			var params = mCommon.formGetParam("#form");
			params.stockType = locationParam.stockType;
			
			mCommon.render("grid", "W201901031219398461000qzHXpPXRZH1", params, function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_RELEASE_STATUS_MOMCC014_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var requestGroupIds = "";
			var cnt;

			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.issueQty != 0) {
					if(requestGroupIds == "") {
						requestGroupIds += "\'" + checkedItems[i].item.requestGroupId + "\'";
					} else {
						requestGroupIds += "\, \'" + checkedItems[i].item.requestGroupId + "\'";
					}
				} else {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10531']});
					return;
				}
			}
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.materialLedger.materialReleaseStatus.materialReleasePrintStatusCount.dummy",
				type : "GET",
				data : {requestGroupIds : requestGroupIds, stockType : locationParam.stockType},
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
			
			if(cnt == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11464']});
				return;
			}
			
			var requestGroupIdsUrl = requestGroupIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCC014";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&requestGroupIds=" + requestGroupIdsUrl + "&stockType=" + locationParam.stockType + "&excelId=MOMCC014&pId=MOMCC014";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.materialLedger.materialReleaseStatus.materialReleasePrintStatus.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
		
		// 불출취소
		$(document).on("click", "#releaseBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11332']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].issueQty <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10542']});
					return;
				}
				
				if(checkedItems[i].item.cancelDate == '' || checkedItems[i].item.cancelDate == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11485']});
					return;
				}
				
				if(checkedItems[i].item.cancelQty != '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11003']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.cancelDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11484' + '@' + endPeriod)});
					return;
				}
			}
			
			var option = {
				type:"info"
			  , width:"400"
			  , height: "145"
			  , html:Language.lang['MESSAGES10541']
			  , closeButton:{text:"Close"}
			  , okButton:{
					text:"OK", 
					after:function(){
						var param = {
							menuId : gvMenuId
						  , tableId : gvTableId
						};
						mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems);
					}
				}
			};
			
			micaCommon.messageBox(option);
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#workOrder'), $('#findBtn'));
	}, 
	comboBox: function() {
		// 요청일
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// dateCombo
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_DATE", attribute8: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#searchDate",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// 불출창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : releaseFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				}
			);
		});

		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			itemTypeParam,
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type",comboOptions, options);
			}
		);
		
		// 요청창고
		mCommon.comboBoxClickCall("#requestLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : requestFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#requestLocation",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 출고구분 
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
			releaseType, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#releaseType",comboOptions, options);
			}
		);
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background:  #C7E8FD;}</style>');	
	},
	tempInsertCallback : function(param, data, callbackParam) {
		var that = this.MOMCC014;
		var arrayList = [];
		if(param == 'SUCCESS'){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : gvMenuId
					, tableId : gvTableId
					, colId1 : 'FROM_INOUT_ID'
					, value1 : callbackParam[i].item.fromInoutId
					, colId2 : 'TO_INOUT_ID'
					, value2 : callbackParam[i].item.toInoutId
					, colId3 : 'DESCRIPTION'
					, value3 : callbackParam[i].item.description
					, colId4 : 'CANCEL_QTY'
					, value4 : callbackParam[i].item.issueQty
					, colId5 : 'IO_CATEGORY'
				    , value5 : callbackParam[i].item.ioCategory
				    , colId6 : 'CANCEL_DATE'
				    , value6 : callbackParam[i].item.cancelDate
					}
				);
			}
			
			mom_ajax('L', 'common.dataMultiDelTmp', JSON.stringify(arrayList), that.procListCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	procListCallback : function(param, data) {
		var that = this.MOMCC014;
		var parameters = {
			menuId : gvMenuId
		  , tableId : gvTableId
		};
		if(param == 'SUCCESS') {
			mom_ajax('C', 'purchase.materialLedger.materialMoveCancel.materialMoveCancelProc', JSON.stringify(parameters), that.callBack);
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
	callBack : function(param, data) {
		var that = this.MOMCC014;
		var params = mCommon.formGetParam("#form");
		params.stockType = locationParam.stockType;
		if(param == 'SUCCESS') {
			mCommon.render("grid", "W201901031219398461000qzHXpPXRZH1", params, function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
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
	MOMCC014.init();
});