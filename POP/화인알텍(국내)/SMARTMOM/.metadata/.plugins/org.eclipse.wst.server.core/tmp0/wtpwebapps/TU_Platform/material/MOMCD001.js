var initCount = 0;
var market;
var currency;
var endPeriod;
var reportUrl = "";

var MOMCD001 = {
	init: function() {		
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201807311450096951000u0NES92PSbP", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201807311451026811001grpuVXjCTZf", null, function(){
					that.grid("grid2");
					that.getParameterInfo();
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".h02-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == "grid1") {
			AUIGrid.bind("grid1", "cellClick", function(event) {
				var item = event.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(event.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(AUIGrid.isCheckedRowById(event.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(event.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(event.pid, rowId);
				}
				
				initCount = 100000;
				event.item.inLocationName = $("#inLocationName").val();
				mCommon.render("grid2", "W201807311451026811001grpuVXjCTZf", event.item, function() {
					initCount = AUIGrid.getRowCount('grid2');
				});
				
				// 2018.08.13 hyjeong begin, dynamic cell control
				AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
					AUIGrid.setProp('grid2', 'exportURL', '0');
					console.log(e.columnIndex);
					if(e.columnIndex == 0){
						return false;
					}
				});
				
				tuCommon.cellClick('grid2');
				// 2018.08.13 hyjeong end
			});
		} else if("grid2") {			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy",
				type : "GET",
				data : {facilityClassId: "AREA", facilityType:"'FAC200', 'FAC300'"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField('grid2', 'inLocationCd', {
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
						},
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							return 'columnStyle';
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MAT_REQ_REASON"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField('grid2', 'reasonCode', {
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
						},
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							return 'columnStyle';
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "MARKET_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField('grid2', 'marketCd', {
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
						},
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							return 'columnStyle';
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "CURRENCY_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField('grid2', 'currencyCd', {
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
						},
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							return 'columnStyle';
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			AUIGrid.setColumnPropByDataField('grid2', 'requestDate', {
		 		editRenderer : {
			           type : "CalendarRenderer",
			           openDirectly : true,
			   		   onlyCalendar : false
			    },
			    styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					return 'columnStyle';
				}
		 	});
			
			AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			AUIGrid.setColumnPropByDataField('grid2', 'requestQty', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					return 'columnStyle';
				}
			});
			
			AUIGrid.setColumnPropByDataField('grid2', 'unitQty', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					return 'columnStyle';
				}
			});
			
			// 출고창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
			AUIGrid.bind('grid2', "cellEditEnd", function( event ) {
				var param = {
						itemId : event.item.itemId,
						locationCd : event.item.inLocationCd
					}
				if(event.dataField == "inLocationCd" || event.dataField == "itemId") {
					var zeroQty;
					
					$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.curItemStock.dummy", param, function(data) {
						if(data[0] == null) {
							zeroQty = 0;
						}
						
						if(zeroQty != 0) {
							AUIGrid.setCellValue("grid2", event.rowIndex, "currentQty", data[0].currentQty);
						} else {
							AUIGrid.setCellValue("grid2", event.rowIndex, "currentQty", zeroQty);
						}
					});
				}
				if(event.dataField == "itemId") {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemInfo.dummy",
						type : "GET",
						data : {itemId : param.itemId},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							AUIGrid.setCellValue("grid2", event.rowIndex, "itemName", data[0].itemName);
							AUIGrid.setCellValue("grid2", event.rowIndex, "specification", data[0].specification);
							AUIGrid.setCellValue("grid2", event.rowIndex, "itemType", data[0].itemType);
							AUIGrid.setCellValue("grid2", event.rowIndex, "itemTypeName", data[0].itemTypeName);
						},
						error: function(data){},
						fail : function(data){}
					});
				}
			});
			
			// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMCD001"},
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
			
			AUIGrid.bind('grid2', 'cellEditEndBefore', function(e) {
				 if(e.dataField == "requestQty") {
					 if(e.item.issueQty > e.value) {
						 micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10947']});
							return e.oldValue;
					 } else {
						 return e.value;
					 }
				 }
				 
				 if(e.dataField == "requestDate") { // 달력 지정한 필드인 경우 
					 if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(endPeriod)) { 
			        	 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
			             return e.oldValue; 
					 } else {
						 return to_date_yyyy_mm_dd(e.value);
					 } 
			     }
				 return e.value; 
				 
				 AUIGrid.setProp('grid2', 'exportURL', '0');
			});
			
			tuCommon.cellClick('grid2');
		}
	}, event: function() {		
		var that = this;
		// 조회
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
			
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201807311450096951000u0NES92PSbP",  mCommon.formGetParam("#node"), function(){});
		});
		
		// 빈행 추가
		$(document).on("click", "#addBtn", function(){
			var newRow = {
				'divisionCd':'',
				'companyCd':'',
				'workOrderId':'',
				'itemId':'',
				'itemName':'',
				'itemType':'',
				'itemTypeName':'',
				'unit':'',
				'unitName':'',
				'productOrderId':'',
				'woState':'',
				'woStateName':'',
				'confirmQty':'',
				'resourceCd':'',
				'resourceName':'',
				'locationCd':'',
				'locationName':'',
				'planStartTime':'',
				'result':'',
				'marketCd':market,
				'currencyCd':currency,
				'_$uid':'714C61E6-5691-3932-13A3-3124A5B8740D'  // ???
			};
			
			AUIGrid.addRow('grid2', newRow, 'last');
			
			// 2018.08.13 hyjeong begin, dynamic cell control
			AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
				console.log(e.columnIndex);
				var item = AUIGrid.getSelectedItems('grid2')[0].item;
				var rowIndex = AUIGrid.getRowIndexesByValue('grid2', 'itemId', [item.itemId]);
				
				AUIGrid.setProp('grid2', 'exportURL', '0');
				
				if(rowIndex < initCount) {
					if(e.columnIndex == 0 || e.columnIndex == 3) { // e.item['itemId'], e.item['inLocationCd']
						return false;
					}
				}
			});
			// 2018.08.13 hyjeong end
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var selectedItem = AUIGrid.getSelectedItems('grid1');
			var callbackChk = false;
			if(selectedItem.length > 0) {
				var callbackParam = {
						workOrderId : AUIGrid.getSelectedItems('grid1')[0].item.workOrderId
				}
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.issueQty != 0 && checkedItems[i].item.issueQty != undefined) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11387']});
					return;
				}
			}
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10669'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
								workOrderId : checkedItems[i].item.workOrderId,
								itemId : checkedItems[i].item.itemId,
								requestDate : checkedItems[i].item.requestDate,
								materialRequestId : checkedItems[i].item.materialRequestId
							}
							
							if(i == checkedItems.length - 1){
								callbackChk = true;
							}
							mom_ajax("D","purchase.material.materialRequest.materialRequest", JSON.stringify(param), that.callbackPost, callbackParam, callbackChk);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		//저장 버튼
		$(document).on("click", "#saveBtn", function() {
			var selectedItem = AUIGrid.getSelectedItems('grid1');
			if(selectedItem.length > 0) {
				var callbackParam = {
						workOrderId : AUIGrid.getSelectedItems('grid1')[0].item.workOrderId
				}
			}
			var callbackChk = false;
			
			var selectedItem = AUIGrid.getSelectedItems('grid1');
			var checkedItems = AUIGrid.getCheckedRowItems('grid2');
			if(checkedItems.length < 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11602']});
				return;
			}
			
			var arrayList = [];
			for(var i =0; i < checkedItems.length; i++){
				if(checkedItems[i].item.itemId == '' || checkedItems[i].item.itemId == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
					return;
				}
				
				if(checkedItems[i].item.requestDate == '' || checkedItems[i].item.requestDate == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10951']});
					return;
				}
				
				if(checkedItems[i].item.requestQty == '' || checkedItems[i].item.requestQty == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10946']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.requestDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10950' + '@' + endPeriod)});
					return;
				}
				
				
				arrayList.push(
					param ={
						materialRequestId : checkedItems[i].item.materialRequestId || "",
						workOrderId : callbackParam.workOrderId,
						inLocationCd : checkedItems[i].item.inLocationCd,
						outLocationCd : selectedItem[0].item.locationCd,
						itemId : checkedItems[i].item.itemId,
						requestDate : checkedItems[i].item.requestDate,
						requestQty : checkedItems[i].item.requestQty,
						reasonCode : checkedItems[i].item.reasonCode|| "",
						unitQty : checkedItems[i].item.unitQty,
						marketCd : checkedItems[i].item.marketCd,
						currencyCd : checkedItems[i].item.currencyCd,
						woQty : selectedItem[0].item.confirmQty,
						specification : checkedItems[i].item.specification,
						parentItemId : selectedItem[0].item.itemId
				});
				
				if(i == checkedItems.length - 1){
					callbackChk = true;
				}
			}
			
			mom_ajax('L', 'purchase.material.materialRequest.materialRequestSave', JSON.stringify(arrayList), that.callbackPost, callbackParam, callbackChk);
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#mExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_REQUEST_UP_MOMCD001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#dExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "MATERIAL_REQUEST_DOWN_MOMCD001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 명세표출력
		$(document).on("click", "#mPrintBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var workOrderIds = "";
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i == 0) {
					workOrderIds += "\'" + checkedItems[i].item.workOrderId + "\'";
				} else {
					workOrderIds += "\, \'" + checkedItems[i].item.workOrderId + "\'";
				}
			}
			
			// 불출 정보 있는지 체크
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.material.materialRequest.materialRequestExcelPrint.dummy", // 호출 URL
				{fromDate : $("#fromDate").val(), toDate : $("#toDate").val(), workOrderIds : workOrderIds}, // 파라미터
				function(data) {
					if(data.length < 1) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12183']});
						return;
					} else {
						var workOrderIdsUrl = workOrderIds.replace("/'/gi","");
						
						var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCD001";
						var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&workOrderIds=" + workOrderIdsUrl + "&fromDate=" + $("#fromDate").val() + "&toDate=" + $("#toDate").val();
						
						var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
						var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.material.materialRequest.materialRequestExcelPrint.dummy?" + param2};
						var jsonList = [];
						jsonList.push(jsonStr1);
						jsonList.push(jsonStr2);
						
						var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
						setTimeout(function (){
							new_popup.close();
						}, 500);
					}
				}
			);
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#workOrderId'), $('#findBtn'));
	},
	comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));

		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
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
		
		// 작업지시유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"PRODUCT_ORDER_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#workOrderType", comboOptions, options);
			}
		);
		
		// 지시상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_STATE", attribute5 : "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderState", comboOptions, options);
			}
		);
		
		// 출고창고
		mCommon.comboBoxClickCall("#inLocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : "'FAC200', 'FAC300'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inLocationName",comboOptions, options);
					callBack();
				}
			);
		});
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
		
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD !important;}</style>');	
	},
	callbackPost : function(result, data, param, callbackParam, flag){
		if(result == "SUCCESS"){
			if(flag == true) {
				mCommon.render("grid2", "W201807311451026811001grpuVXjCTZf", callbackParam, function() {
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
				
				var detailRowCount = AUIGrid.getRowCount('grid2');
				
				AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
					if(e.columnIndex == 0){
						return false;
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= detailRowCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});	
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	getParameterInfo : function() {
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comParameter.dummy",
			type : "GET",
			data : {},
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				market = data[0].marketCd;
				currency = data[0].currencyCd;
			},
			error: function(data){},
			fail : function(data){}
		});
	},
};
$(document).ready(function(event){
	MOMCD001.init();
});