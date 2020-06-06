var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var allowMinusQty;
var outsourcingUseFlag;
var autoDeductionFlag;
var initCount = 0;
var checkNumber = /^[0-9]*$/;
var checkDp = /^\d*[.]\d*$/;
var market;
var currency;
var endPeriod;

$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
	timeout : 30000000,
	async : false,
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		allowMinusQty = data[0].allowMinusQty;
		outsourcingUseFlag = data[0].outsourcingUseFlag;
		autoDeductionFlag = data[0].autoDeductionFlag;
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

var MOMDA008 = {
	init : function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201808010604309981000mpYThRg9RPO", null, function(){
				that.grid("grid");
				mCommon.init("grid2", "W201811160950323621000yVGICMxgFVk", null, function(){ 
					that.grid("grid2");
					that.getParameterInfo();
				}, Language);
			}, Language);
			mCommon.init("auigrid", "W201808021809282401001uoz98dsIlZ7", null, function(){
				that.grid("auigrid");
			}, Language);
			mCommon.init("auigrid1", "W201808021812312811002AzwPWRr2M2r", null, function(){
				that.grid("auigrid1");
			}, Language);
		});
	}, grid : function(grid) {
		var that = this;
		tuCommon.cellClick(grid);
		if (grid == "grid") {
			AUIGrid.bind(grid, 'cellClick', function(e) {
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				AUIGrid.clearGridData("grid2");
			});
			
		} else if(grid == 'grid2') {
			AUIGrid.setColumnPropByDataField( "grid2", "remainQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField('grid2', 'workOrderId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy",
				type : "GET",
				data : {facilityClassCd: "AREA", facilityType : "'FAC200', 'FAC300'"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "inLocationName", {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							if(rowIndex >= initCount){
								return 'columnStyle';
							}
						},
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
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy",
				type : "GET",
				data : {facilityClassCd: "AREA", facilityType : "'FAC300'"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "outLocationName", {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							if(rowIndex >= initCount){
								return 'columnStyle';
							}
						},
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
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId: "MARKET_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "marketCd", {
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
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId: "CURRENCY_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "currencyCd", {
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
			
			AUIGrid.setColumnPropByDataField('grid2', 'requestDate', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				},
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});	
			AUIGrid.setColumnPropByDataField('grid2', 'requestQty', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});
			AUIGrid.setColumnPropByDataField('grid2', 'unitQty', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
				AUIGrid.setProp('grid2', 'exportURL', '0');
				if(e.rowIndex < initCount) {
					if(e.dataField == 'workOrderId' || e.dataField == 'itemId' || e.dataField == 'inLocationName' || e.dataField == 'outLocationName'|| e.dataField == 'requestDate'
							|| e.dataField == 'requestQty' || e.dataField == 'unitQty') {
						return false;
					}
				}
			});
			
			// 소진창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
			AUIGrid.bind('grid2', "cellEditEnd", function( event ) {
				if(event.dataField == "outLocationName" || event.dataField == "itemId" ) {
					var zeroQty;
					var param = {
						itemId : event.item.itemId,
						locationCd : event.item.outLocationName
					}
					param.itemId = param.itemId.replace(/(\s*)/g,"");
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
							},
							error: function(data){},
							fail : function(data){}
						});
					}
				} 
			});
			
			// 수불통제일 이후 날짜로만 선택가능하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMDA008"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
							if(event.dataField == "deductDate") { // 달력 지정한 필드인 경우 
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
			
			
			AUIGrid.setColumnPropByDataField( "grid2", "deductDate", {
				style:"columnStyle",
				formatString:"YYYY-MM-DD",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode(grid, "singleCell");
		} else if(grid == "auigrid") {
			AUIGrid.setSelectionMode("auigrid", "singleCell");
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "N_Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){					
					AUIGrid.setColumnPropByDataField( "auigrid", "closeFlag", {
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
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId:"WORK_ORDER_STATE", attribute4: "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "auigrid", "woState", {
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
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "SHIFT_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "auigrid", "shiftCd", {
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
			
			// 수불통제일 이후 날짜로만 선택가능하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMDA008"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('auigrid', "cellEditEndBefore", function(event){ 
							if(event.dataField == "startDate") { // 달력 지정한 필드인 경우 
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
			
			AUIGrid.setColumnPropByDataField( "auigrid", "startDate", {
				style:"columnStyle",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField( "auigrid", "endDate", {
				style:"columnStyle",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField( "auigrid", "startTime", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "endTime", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "goodQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "insertNumber", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "badQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "description", { style:"columnStyle" } );
			
			AUIGrid.resize("auigrid", $(window).width() * 0.85 - 48, 70);
			
		} else if(grid == 'auigrid1'){
			tuCommon.cellClick(grid, 'single');
			AUIGrid.resize("auigrid1", $(window).width() * 0.85 - 48, 280);
		}
	}, event : function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
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
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO", that.getSearchData(), function(){});
		});
		
		// WO/PO, 아이템ID enter로 조회
		$(document).on("keydown", "#searchKeyWord", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "WORKORDER_RESULT_MOMDA008_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var inWorkOrderId = "";
			initCount = 100000;
			if(checkedItems.length <= 0 || checkedItems.length > 1) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return;
			} 
			for(var i = 0; i  < checkedItems.length; i++) {
//				if(checkedItems[i].item.deductFlag == "Y") {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "이미 차감된 목록은 선택할 수 없습니다." });
//					return;
//				}
				
				if(checkedItems[i].item.woState != "T" && checkedItems[i].item.woState != "R" && checkedItems[i].item.woState != "H") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11135']});
					return;
				}
				inWorkOrderId += "'" + checkedItems[i].item.workOrderId + "'";
				if(i != checkedItems.length - 1) {
					inWorkOrderId += ",";
				}
			}
			var param = {
				inWorkOrderId : inWorkOrderId
			}
			
			mCommon.render("grid2","W201811160950323621000yVGICMxgFVk", param, function(){
				initCount = AUIGrid.getRowCount('grid2');
			});
			
		});
		
		//자동차감 버튼
		$("#autoDeductionBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length <= 0 ) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
//				if(checkedItems[i].item.woState != "T") {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "작업완료된 건에 대해서만 차감할 수 있습니다." });
//					return;
//				}
//				
//				if(checkedItems[i].item.deductFlag == "Y") {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "차감된 건에서는 중복 차감할 수 없습니다." });
//					return;
//				}
				
				if(checkedItems[i].item.qty <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12192']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.endTime.substr(0,10)) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10923' + '@' + endPeriod)});
					return;
				}
				
				// 수동차감 안 된 데이터만 자동차감 진행
				if(checkedItems[i].item.manualDeductFlag == "N") {
					checkedItems[i].item.deductFlag = "AUTO";
					arrayList.push(checkedItems[i].item);
				}
			}
			
			// 자동차감할 데이터 없을 경우
			if(arrayList.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11005']});
				return;
			}
			
			var option = {
					type:"info",
					width:"400", 
					height: "145", 
					html:Language.lang['MESSAGES10716'], 
					closeButton:{text:"Close"}, 
					okButton:{text:"OK", 
						after:function(){
							var endFlag = false;
//							for(var i = 0; i < checkedItems.length; i++) {
////								var param = {
////										workOrderId : checkedItems[i].item.workOrderId,
////										deductFlag : "AUTO"
////								}
//								checkedItems[i].item.deductFlag = "AUTO";
//								arrayList.push(checkedItems[i].item);
////								if(i == checkedItems.length - 1){
////									endFlag = true;
////								}
////								mom_ajax("C", "workOrder.workOrderResult.itemDeductByBom", JSON.stringify(param), that.deductionCallback, endFlag);
//							}
							mom_ajax("L", "workOrder.workOrderResult.itemDeductByBom", JSON.stringify(arrayList), that.deductionCallback, "");
						}
					}
			};
			micaCommon.messageBox(option);
		});
		
		// 빈행 추가
		$(document).on("click", "#addBtn", function(){
			var grid2Items = AUIGrid.getGridData("grid2");
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems[0].item.woType == 'RE') {
				var setWorkOrderId = checkedItems[0].item.workOrderId;
				var setWoTypeName = Language.lang['MESSAGES11717'];
			} else {
				if(grid2Items.length != 0) {
					var setWorkOrderId = grid2Items[grid2Items.length - 1].workOrderId;
				} else {
					var setWorkOrderId = checkedItems[0].item.workOrderId;
				}
				var setWoTypeName = Language.lang['MESSAGES11718'];
			}
			var setWoType = checkedItems[0].item.woType;
			
			var newRow = {
				'woType':setWoType,
				'woTypeName':setWoTypeName,
				'workOrderId':'',
				'itemId':'',
				'workOrderId': setWorkOrderId || '',
				'itemId':'',
				'itemName':'',
				'specification':'',
				'inLocationCd':'',
				'requestDate':'',
				'currentQty':'',
				'originRequestQty':'',
				'requestQty':'',
				'issueQty':'',
				'cancelQty':'',
				'remainQty':'',
				'unitQty':'',
				'addFlag':'N',
				'marketCd':market,
				'currencyCd':currency
			};
			
			AUIGrid.addRow('grid2', newRow, 'last');
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var callbackChk = false;
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				if (checkedItems.length <= 0){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
					return;
				}
				else if(checkedItems[i].item.deductedQty != undefined && checkedItems[i].item.deductedQty != 0 && checkedItems[i].item.addFlag == 'Y') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11282']});
					return;
				}
				else if(checkedItems[i].item.issueQty != undefined && checkedItems[i].item.issueQty != 0 && checkedItems[i].item.addFlag == 'Y') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10529']});
					return;
				}
			
				if (checkedItems[i].item.addFlag == "N") {
					arrayList.push(checkedItems[i].rowIndex);
				}
			}
			AUIGrid.removeRow("grid2", arrayList);
			checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10669'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
								workOrderId : checkedItems[i].item.workOrderId,
								itemId : checkedItems[i].item.itemId,
								requestDate : checkedItems[i].item.requestDate,
								materialRequestId : checkedItems[i].item.materialRequestId,
								addFlag : checkedItems[i].item.addFlag,
								rowIndex : checkedItems[i].rowIndex
							}
							
							if(i == checkedItems.length - 1){
								callbackChk = true;
							}
//							if(checkedItems[i].item.addFlag == 'N') {
//								AUIGrid.removeRow("grid2", checkedItems[i].rowIndex);
//							} else if(checkedItems[i].item.addFlag == 'Y') {
								mom_ajax("D","workOrder.workOrderResult.materialRequest", JSON.stringify(param), that.deleteCallback, callbackChk, param);
//							}
						}
					}
				}});
			}
		});
		
		//자재차감 버튼
		$("#materialDeductionBtn").click(function(event) {
			var items = AUIGrid.getGridData("grid2");
			
			for(var i = 0; i < items.length; i++) {
				if(items[i].workOrderId == "" || items[i].workOrderId == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11151']});
					return;
				}
				
				if(items[i].itemId == "" || items[i].itemId == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
					return;
				}
				
				if(items[i].inLocationName == "" || items[i].inLocationName == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11397']});
					return;
				}
				
				if(items[i].outLocationName == "" || items[i].outLocationName == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10712']});
					return;
				}
				
				if(items[i].requestDate == "" || items[i].requestDate == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10951']});
					return;
				}
				
				if(items[i].requestQty == "" || items[i].requestQty == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10946']});
					return;
				}
				
//				if(items[i].remainQty == "" || items[i].remainQty == null) {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"차감수량을 입력해 주세요."});
//					return;
//				}
				
				if(items[i].unitQty == "" || items[i].unitQty == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10709']});
					return;
				}
				
				if(items[i].requestQty <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10944']});
					return;
				}
				
//				if(items[i].remainQty <= 0) {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"차감수량은 0보다 커야 합니다."});
//					return;
//				}
				
				if(items[i].unitQty <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10707']});
					return;
				}
				
				if(!checkNumber.test(items[i].requestQty)) {
					if(!checkDp.test(items[i].requestQty)) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10945']});
						return;
					}
				}
				
				if(!checkNumber.test(items[i].remainQty)) {
					if(!checkDp.test(items[i].remainQty)) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11284']});
						return;
					}
				}
				
				if(!checkNumber.test(items[i].unitQty)) {
					if(!checkDp.test(items[i].unitQty)) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10708']});
						return;
					}
				}
				
				if(items[i].deductDate == "" || items[i].deductDate == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11288']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(items[i].deductDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11287' + '@' + endPeriod)});
					return;
				}
			}
			
			var param = {
				divisionCd : divisionCd,
				companyCd : companyCd
			};
			
			var option = {
					type:"info",
					width:"400", 
					height: "145", 
					html:Language.lang['MESSAGES11114'], 
					closeButton:{text:"Close"}, 
					okButton:{text:"OK", 
						after:function() {
							mom_ajax("D", "workOrder.workOrderResult.itemDeductTmp", JSON.stringify(param), that.deductionCallback, "", "tempDelete");
						}
					}
			};
			micaCommon.messageBox(option);
		});
		
		// 실적등록 버튼
		$("#createPerfomanceBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length != 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
			
			if(checkedItems[0].item.orderFlag == "OUT" && outsourcingUseFlag == "Y") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10931']});
				return;
			}
			
			var param = {
				workOrderId : checkedItems[0].item.workOrderId
			}
			mCommon.render("auigrid","W201808021809282401001uoz98dsIlZ7", param, function(){
				mCommon.render("auigrid1","W201808021812312811002AzwPWRr2M2r", param, function(){});
				$("#pop").micaModal("show");
				$(window).resize();//그리드 사이즈 오류 
			});
		});
		
		//실적등록 팝업내의 실적취소버튼
		$("#cancelPerfomanceBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("auigrid1");
			var arrayList = [];
			var messages;
			
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11337']});
				return;
			}
			
			if(autoDeductionFlag == "N") {
				messages = Language.lang['MESSAGES10819'];
			} else {
				messages = Language.lang['MESSAGES10820'];
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				var woId = {
					workOrderId : checkedItems[0].item.workOrderId
				}
				
				if(checkedItems[i].item.state == "C" || checkedItems[i].item.cancelFlag == '1'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.startTime.substr(0, 10)) <= endPeriod) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.getLang('MESSAGES10787' + '@' + endPeriod)});
					return;
				}
				
				/*// 실적취소 시 창고의 재고여부 체크 불가로 제외 - gyp 190725
				if(allowMinusQty == 'N') {
					if(currentQty >= 0) {
						if(checkedItems[i].item.goodQty > currentQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11609']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10818']});
						return;
					}
				}*/
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:messages, closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						arrayList.push(checkedItems[i].item);
					}
					mom_ajax("L", "workOrder.workOrderResult.workOrderResultCancel", JSON.stringify(arrayList), that.cancelCallback, woId);
				}
			}});
		});
		
		//WO취소 버튼
		$("#cancelWoBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length != 1){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
			if(checkedItems[0].item.woState == 'T'){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11136']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.planStartTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11276' + '@' + endPeriod)});
					return;
				}
			}
			
			that.setWOCancelPop(checkedItems[0].item);
			$("#pCancelpop").micaModal("show");
		});
		
		//WO취소 팝업 확인 버튼
		$("#pCancelSaveBtn").click(function(event){
			var params = that.getWOCancelPop();
			if($("#cancelQty").val() == ''){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11472']});
				return;
			}
			if($("#description").val() == ''){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11468']});
				return;
			}
			if(Number(params.cancelQty) > Number(params.remainQty)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11474']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10097'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("C", "workOrder.workOrderResult.workOrderCancel", JSON.stringify(params), that.woCancelCallback);
				}
			}});
		});
		
		//WO일괄취소 버튼
		$("#cancelAllWoBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			
			if(checkedItems.length < 1){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11610']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.planStartTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11276' + '@' + endPeriod)});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10095'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i =0; i < checkedItems.length; i++){
						checkedItems[i].item.description = Language.lang['MESSAGES10161'];
						checkedItems[i].item.cancelQty = checkedItems[i].item.remainQty;
						arrayList.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "workOrder.workOrderResult.workOrderCancel", JSON.stringify(arrayList), that.woCancelCallback);
				}
			}});
		});
		
		//저장버튼
		$("#pSaveBtn").click(function(event){
			var realQty = 0; 
			var saveItem = AUIGrid.getGridData("auigrid");
			var defectFlag = saveItem[0].defectFlag;	
			var overFlag = saveItem[0].overFlag;
			var woId = {
				workOrderId : saveItem[0].workOrderId	
			}
			
			var now = new Date();
			var startDT = saveItem[0].startDate + " " + saveItem[0].startTime;
			var endDT = saveItem[0].endDate + " " + saveItem[0].endTime;
			
			var validDT = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
			var regNumber = /^[0-9]*$/;
			
			var chkStartDate = new Date(saveItem[0].startDate);
			var chkEndDate = new Date(saveItem[0].endDate);
			
			var chkStartTime = parseInt(saveItem[0].startTime.replace(":",""));
			var chkEndTime = parseInt(saveItem[0].endTime.replace(":",""));
			
			var currDT = get_current_date('yyyy-mm-dd hh24:mi:ss');
			var currDate = get_current_date('yyyy-mm-dd');
			
			/*시간체크*/
			if(startDT == '' || !validDT.test(startDT) ){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10791']});
				return;
			}
			
			if(endDT == '' || !validDT.test(endDT) ){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10926']});
				return;
			}
			
			if(chkStartDate > chkEndDate){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10927']});
				return;		
				
			} else if(chkStartDate == chkEndDate) {				
				if(chkStartTime > chkEndTime){
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10924']});
					return;
				}
			}
			
			/*숫자입력체크*/
			if(!regNumber.test(saveItem[0].insertNumber)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11139']});
				return;
			}
			
			if(!regNumber.test(saveItem[0].goodQty)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10834']});
				return;
			}
			
			if(!regNumber.test(saveItem[0].badQty)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10515']});
				return;
			}
			
			if(saveItem[0].closeFlag == 'N'){
				if(saveItem[0].goodQty <= 0 && saveItem[0].badQty <= 0){
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10833']});
					return;
				}
			}
			
			if(overFlag == 'N'){ // 초과실적등록 미허용일 경우
				if(defectFlag == 'N' || defectFlag == ''){ // 불량수량 미사용일 경우
					realQty = parseInt(saveItem[0].goodQty); // 실적수량 = 양품수량
					
				} else if(defectFlag == 'Y') { // 불량수량 사용일 경우
					realQty = parseInt(saveItem[0].goodQty) + parseInt(saveItem[0].badQty); // 실적수량 = 양품수량 + 불량수량
				}
				
				if(saveItem[0].remainQty < realQty){ // 잔여수량 < 실적수량일 경우 
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10813']});
					return;
				}
			}
			
			if(saveItem[0].startDate <= endPeriod){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.getLang('MESSAGES10792' + '@' + endPeriod)});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10811'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("L", "workOrder.workOrderResult.workOrderResultCreate", JSON.stringify(saveItem), that.createCallback, woId);
				}
			}});
		});
		
		$(document).on("click", "#pCancelCloseBtn, #pCancelBtn, .bntpopclose", function() {
			$(".modal").micaModal("hide");
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO", that.getSearchData(), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		// 작업시작
		$(document).on("click", "#workStartBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11339']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.woState != "A") {
					micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11152']});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11131'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					for(var i=0; i<checkedItems.length; i++) {
						if(i == checkedItems.length - 1) {
							chkFlag = true;
						}
						mom_ajax("U", "workOrder.workOrderResult.workOrderResultState", JSON.stringify(checkedItems[i].item), that.woStartCallback, JSON.stringify(checkedItems[i].item), chkFlag);
					}
				}
			}});
		});
		
	}, comboBox : function() {
		// 날짜
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		var woFlagComboOptions;
		
		if(outsourcingUseFlag == "Y") {
			woFlagComboOptions = {selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true};
		} else {
			woFlagComboOptions = {searchMode:'containsignorecase', autoComplete:true};
		}
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_DATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// searchJobTerms
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_TERMS", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#searchJobTerms",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);

		// 설비From
		mCommon.comboBoxClickCall("#fromResourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromResourceName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 설비To
		mCommon.comboBoxClickCall("#toResourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toResourceName",comboOptions, options);
					callBack();
				
				}
			);
		});

		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_STATE", attribute3: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true}
				, options);
			
			}
		);
		
		// orderType
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SYSTEM_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderType",comboOptions, options);
			
			}
		);
		
		// 실적등록자
		mCommon.comboBoxClickCall("#workOrderUser", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#workOrderUser",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", woFlagComboOptions, options);
			}
		);
		
		// 차감여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#deductFlag", {selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#manualDeductFlag", {selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	},
	getSearchData : function() {
		var checkedItems = "";
		var stateList = $("#state").jqxComboBox('getCheckedItems');
		$.each(stateList, function(index){
			if(stateList.length-1 != index){
				checkedItems +="'"+this.value + "',"
			} else {
				checkedItems +="'"+this.value + "'"
			}
		});
		
		var param = {
			 dateCombo : $("#dateCombo").val(),
			 fromDate : $("#fromDate").val(),
			 toDate : $("#toDate").val(),
			 searchJobTerms : $("#searchJobTerms").val(),
			 searchKeyWord : $("#searchKeyWord").val(),
			 fromResourceName : $("#fromResourceName").val(),
			 toResourceName : $("#toResourceName").val(),
			 state : checkedItems,
			 orderType : $("#orderType").val(),
			 workOrderUser : $("#workOrderUser").val(),
			 orderFlag : $("#orderFlag").val(),
			 deductFlag : $("#deductFlag").val(),
			 manualDeductFlag : $("#manualDeductFlag").val()
		}
		return param;
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	setWOCancelPop : function(data) {
		data = data || {};
		
		$("#resultQty").val(data.resultQty || 0);
		$("#goodQty").val(data.qty || 0);
		$("#remainQty").val(data.remainQty || 0);
		$("#cancelQty").val("");
		$("#description").val("");
		$("#resultQty, #goodQty, #remainQty").attr("readonly","readonly");
	},
	getWOCancelPop :function(){
		var selectItems = AUIGrid.getCheckedRowItems("grid");
		var param ={
				resultQty : $("#resultQty").val(),
				goodQty : $("#goodQty").val(),
				remainQty : $("#remainQty").val(),
				cancelQty : $("#cancelQty").val(),
				description : $("#description").val(),
				workOrderId : selectItems[0].item.workOrderId,
				itemId : selectItems[0].item.itemId,
				woState : selectItems[0].item.woState
		}
		return param;
	},
	createCallback : function(result, data, param, callbackParam){
		if(result == "SUCCESS"){
			mCommon.render("auigrid", "W201808021809282401001uoz98dsIlZ7",  callbackParam, function(){
				mCommon.render("auigrid1", "W201808021812312811002AzwPWRr2M2r",  callbackParam, function(){});
			});
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	cancelCallback : function(result, data, param, callbackParam){
		if(result == "SUCCESS"){
			mCommon.render("auigrid", "W201808021809282401001uoz98dsIlZ7",  callbackParam, function(){
				mCommon.render("auigrid1", "W201808021812312811002AzwPWRr2M2r",  callbackParam, function(){});
			});
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	woCancelCallback : function(result, data) {
		var that = this.MOMDA008;
		if(result == "SUCCESS") {
			$("#pCancelpop").micaModal("hide");
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO",  that.getSearchData(), function(){
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
	},
	deductionCallback : function(result, data, param, callbackParam, flag) {
		var that = this.MOMDA008;
		var checkedItem = AUIGrid.getCheckedRowItems("grid");
		var items = AUIGrid.getGridData("grid2");
		var arrayList = [];
		if(result == "SUCCESS") {
			if(flag == "tempDelete") {
				for(var i = 0; i < items.length; i++) {
//					if((checkedItem[0].item.deductFlag == 'Y' && items[i].addFlag == 'N') || (checkedItem[0].item.deductFlag == 'N')) {
						arrayList.push(items[i]);
//					}
				}
				mom_ajax("L", "workOrder.workOrderResult.itemDeductTmp", JSON.stringify(arrayList), that.deductionCallback, "", "tempInsert");
				
			} else if(flag == "tempInsert") {
				var params = {deductFlag : "MANUAL"};
				mom_ajax("C", "workOrder.workOrderResult.itemDeductByBom", JSON.stringify(params), that.deductionCallback, "", "procInsert");
				
			} else {
				if(callbackParam == true || callbackParam == "") {
					AUIGrid.clearGridData("grid2");
					mCommon.render("grid", "W201808010604309981000mpYThRg9RPO",  that.getSearchData(), function(){
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					});
				}
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
	deleteCallback : function(result, data, param, callbackParam, items) {
		var that = this.MOMDA008;
		var item = {
				inWorkOrderId : "'" + items.workOrderId + "'"
		}
		if(items.addFlag == 'N') {
			AUIGrid.removeRow("grid2", items.rowIndex);
		}
		if(result == "SUCCESS") {
			if(callbackParam == true) {
				mCommon.render("grid2", "W201811160950323621000yVGICMxgFVk", item, function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
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
	woStartCallback : function(result, data, param, callbackParam, flag) {
		var that = this.MOMDA008;
		if(result == "SUCCESS") {
			if(flag == true) {
				mCommon.render("grid", "W201808010604309981000mpYThRg9RPO",  that.getSearchData(), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + '<br />' + Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMDA008.init();
});