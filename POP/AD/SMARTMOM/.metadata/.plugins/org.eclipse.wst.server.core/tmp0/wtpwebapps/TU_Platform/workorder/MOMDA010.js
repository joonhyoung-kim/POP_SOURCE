var allowMinusQty;
var outsourcingUseFlag;
var autoDeductionFlag;
var outLocationCd;
var outLocationName;
var badLocationCd;
var badLocationName;
var locationEmptyFlag = false;
var initCount = 100000;
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
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

var MOMDA010 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201904031330482761000232N6BnlAQt", null, function(){
				mCommon.init("grid2", "W201901292035449801000WQhKDiiIlyh", null, function(){ 
					that.grid();
					that.design();
					that.comboBox();
					that.event();
				}, Language);
			}, Language);
		});
	}, 
	grid: function() {
		AUIGrid.bind("grid", "cellClick", function(event) {
			var item = event.item;
			var rowIdField;
			var rowId;
			
			rowIdField = AUIGrid.getProp(event.pid, 'rowIdField'); 
			rowId = item[rowIdField];
			
			AUIGrid.setAllCheckedRows("grid", false);
			
			if(AUIGrid.isCheckedRowById(event.pid, rowId)) {
				AUIGrid.addUncheckedRowsByIds(event.pid, rowId);
			} else {
				AUIGrid.addCheckedRowsByIds(event.pid, rowId);
			}
			
			var detailGridItems = AUIGrid.getRowCount("grid2");
			AUIGrid.clearGridData("grid2");
//			if(detailGridItems > 0) {
//				var option = {
//					type:"info",
//					width:"400", 
//					height: "145", 
//					html:"하단 그리드 데이터를 초기화 하시겠습니까?", 
//					closeButton:{text:"Close"}, 
//					okButton:{text:"OK", 
//						after:function(){
//							AUIGrid.clearGridData("grid2");
//						}
//					}
//				};
//				micaCommon.messageBox(option);
//			}
		});
		
		tuCommon.cellClick("grid2");
		AUIGrid.setSelectionMode("grid2", "none");
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "WO_BAD_TYPE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "badType", {
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
			data : {menuId : "MOMDA010"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
				        if(event.dataField == "confirmDate") { // 달력 지정한 필드인 경우 
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
		
		AUIGrid.setColumnPropByDataField( "grid2", "confirmDate", {
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",
				 openDirectly : true,
				 onlyCalendar : false
			}
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
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid", "W201904031330482761000232N6BnlAQt", that.getSearchData(), function(){});
		});
		
		// 선택
		$(document).on("click", "#choiceBtn", function() {
			var masterGridItems = AUIGrid.getCheckedRowItems("grid");
			locationEmptyFlag = false;
			if(masterGridItems.length <=0 || masterGridItems.length > 1) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return;
			}

			// 불출요청서 기준 품목 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderBadResult.workOrderDetailItem.dummy",
				type : "GET",
				data : {workOrderId : masterGridItems[0].item.workOrderId},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "itemId", {
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
			
			// 불출요청서 기준 소진창고 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderBadResult.workOrderDetailLocation.dummy",
				type : "GET",
				data : {workOrderId : masterGridItems[0].item.workOrderId},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						outLocationCd = data[0].code;
						outLocationName = data[0].name;
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			// 작업지시 기준 불량창고 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderResult.workOrderResult.dummy",
				type : "GET",
				data : {masterWoId : masterGridItems[0].item.workOrderId},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						badLocationCd = data[0].badLocationCd;
						badLocationName = data[0].badLocationName;
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			AUIGrid.bind('grid2', 'cellEditEnd', function(e) {
				if(e.dataField == "badType") {
					// 불량유형(ATTR1 = Y)에 따른 불량창고 EDIT 여부
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderBadResult.badLocationEditFlag.dummy",
						type : "GET",
						data : {codeId : e.value},
						async: false,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								AUIGrid.setCellValue("grid2", e.rowIndex, "badLocationEditFlag", data[0].badLocationEditYn);
								console.log('locationEmptyFlag = ' + locationEmptyFlag + ', ' + data[0]['badLocationEditYn']);
								if(e.dataField == "badType"){
									if(locationEmptyFlag == true && data[0].badLocationEditYn == 'Y') {
										AUIGrid.setCellValue("grid2", e.rowIndex, "badType", e.oldValue);
										micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11546']});
									} 
								} 
							} 
							if(data[0].badLocationEditYn == "N") {
								AUIGrid.setCellValue("grid2", e.rowIndex, "toLocationCd", badLocationCd);
								AUIGrid.setCellValue("grid2", e.rowIndex, "toLocationName", badLocationName);
							}
							
							
							
						},
						error: function(data){},
						fail : function(data){}
					});
					AUIGrid.setColumnPropByDataField('grid2', 'toLocationName', {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							var getValue = AUIGrid.getCellValue("grid2", rowIndex, "badLocationEditFlag");
							if(getValue == 'Y'){
								return 'columnStyle';
							}
						}
					});
				}
				
				if(e.dataField == "toLocationName") {
					AUIGrid.setCellValue("grid2", e.rowIndex, "toLocationCd", e.value);
					return e.value;
				}
				
				
			});
			
//			AUIGrid.bind('grid2', 'cellEditEnd', function(e) {
//				if(e.dataField == "badType") {
//					AUIGrid.setColumnPropByDataField('grid2', 'toLocationName', {
//						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
//							if(e.item.badLocationEditFlag == 'Y'){
//								return 'columnStyle';
//							}
//						}
//					});
//				}
//				return e.value;
//			});
			// 설비ID에 따른 불량창고리스트 조회
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderBadResult.badLocationList.dummy",
				type : "GET",
				data : {resourceCd : masterGridItems[0].item.resourceCd},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						AUIGrid.setColumnPropByDataField( "grid2", "toLocationName", {
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
					} else {
						locationEmptyFlag = true;
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
			mCommon.render("grid2", "W201901292035449801000WQhKDiiIlyh", that.choiceSearchData(), function(){
				initCount = AUIGrid.getRowCount('grid2');
				AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= initCount){
							return 'columnStyle';
						}
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'badType', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= initCount){
							return 'columnStyle';
						}
					}
				});	
				
				
				AUIGrid.setColumnPropByDataField('grid2', 'badQty', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= initCount){
							return 'columnStyle';
						}
					}
				});	
				
				AUIGrid.setColumnPropByDataField('grid2', 'confirmDate', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= initCount){
							return 'columnStyle';
						}
					}
				});	
				
				AUIGrid.setColumnPropByDataField('grid2', 'description', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex >= initCount){
							return 'columnStyle';
						}
					}
				});	
				
			});
			
			AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
				if(initCount > 0 && e.rowIndex <= initCount) {
					if(e.dataField == "itemId" || e.dataField == "badType" || e.dataField == "badQty" || e.dataField == "confirmDate" || e.dataField == "description") {
						return false;
					}
				}
				if(e.dataField == "toLocationName") {
					if(e.item.badLocationEditFlag == 'Y') {
						return true;
					} else{
						return false;
					}
				}
			});
			
		});
		
		// 빈행 추가
		$(document).on("click", "#addBtn", function() {
			var newRow = {
				'itemId':'',
				'fromLocationCd':outLocationCd,
				'fromLocationName':outLocationName,
				'toLocationCd':badLocationCd,
				'toLocationName':badLocationName,
				'badType':'',
				'badQty':'',
				'confirmDate':get_current_date("YYYY-MM-DD"),
				'description':'',
				'addFlag':'N'
			};
			
			AUIGrid.addRow('grid2', newRow, 'last');
			AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});
			
			AUIGrid.setColumnPropByDataField('grid2', 'badType', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			
			AUIGrid.setColumnPropByDataField('grid2', 'badQty', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			AUIGrid.setColumnPropByDataField('grid2', 'confirmDate', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			AUIGrid.setColumnPropByDataField('grid2', 'description', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(rowIndex >= initCount){
						return 'columnStyle';
					}
				}
			});	
			
			AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
				if(e.rowIndex >= initCount) {
					if(e.dataField == "itemId" || e.dataField == "badType" || e.dataField == "badQty" || e.dataField == "confirmDate" || e.dataField == "description") {
						return true;
					}
					if(e.dataField == "toLocationName") {
						if(e.item.badLocationEditFlag == "Y" && locationEmptyFlag != true) {
							return true;
						} else {
							return false;
						}
						
					}
				} else {
					if(e.dataField == "itemId" || e.dataField == "badType" || e.dataField == "badQty" || e.dataField == "confirmDate" || e.dataField == "description" || e.dataField == "toLocationName") {
						return false;
					}
				}
			});
			
			
		});
		
		// 체크한 행 삭제
		$(document).on("click", "#delBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var chkFlag = false;
			var arrayList = [];
			if(checkedItems.length <= 0 ) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
			
			for(var i=checkedItems.length - 1; i >= 0; i--) {
				if (checkedItems[i].item.addFlag == "N") {
					arrayList.push(checkedItems[i].rowIndex);
				}
			}
			AUIGrid.removeRow("grid2", arrayList);
			
			if(arrayList.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10339']});
				return;
			}
		});
		
		// 불량등록
		$(document).on("click", "#materialDeductionBtn", function() {
			var masterGridItem = AUIGrid.getCheckedRowItems("grid");
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var arrayList = [];
			var chkFlag = false;
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10508']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.itemId == '' || checkedItems[i].item.itemId == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
					return;
				}
				
				if(checkedItems[i].item.badType == '' || checkedItems[i].item.badType == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10520']});
					return;
				}
				
				if(checkedItems[i].item.badQty == '' || checkedItems[i].item.badQty == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10517']});
					return;
				}
				
				if(checkedItems[i].item.confirmDate == '' || checkedItems[i].item.confirmDate == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11313']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.confirmDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11311' + '@' + endPeriod)});
					return;
				}
				
				if(i == checkedItems.length - 1) {
					chkFlag = true;
				}
				
				if(checkedItems[i].item.addFlag != 'Y') {
					checkedItems[i].item.workOrderId = masterGridItem[0].item.workOrderId;
					arrayList.push(checkedItems[i].item);
				}
			}
			
			if(arrayList.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11002']});
				return;
			}
			
			var option = {
				type:"info",
				width:"400", 
				height: "145", 
				html:Language.lang['MESSAGES10509'], 
				closeButton:{text:"Close"}, 
				okButton:{text:"OK", 
					after:function(){
						mom_ajax("L", "workOrder.workOrderBadResult.workOrderBadResultConfirm", JSON.stringify(arrayList), that.callBack, JSON.stringify(arrayList), chkFlag);
					}
				}
			};
			micaCommon.messageBox(option);
		});
		
		// 불량유형 선택한 값이 체크한 그리드 행에 매핑되도록 수정
		$(document).on("change", "#badType", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var badType = $("#badType").val();
			for(var i = 0; i < checkedItems.length; i++) {
				AUIGrid.setCellValue("grid2", checkedItems[i].rowIndex, "badType", badType);
			}
			
			// 불량유형(ATTR1 = Y)에 따른 불량창고 EDIT 여부
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderBadResult.badLocationEditFlag.dummy",
				type : "GET",
				data : {codeId : badType},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						console.log('locationEmptyFlag = ' + locationEmptyFlag + ', ' + data[0]['badLocationEditYn']);
						if(locationEmptyFlag == true && data[0].badLocationEditYn == 'Y') {
							for(var i = 0; i < checkedItems.length; i++) {
								AUIGrid.setCellValue("grid2", checkedItems[i].rowIndex, "badType", '');
							}
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11546']});
							return;
						} else {
							for(var i=0; i<checkedItems.length; i++) {
								AUIGrid.setCellValue("grid2", checkedItems[i].rowIndex, "badLocationEditFlag", data[0].badLocationEditYn);
								
								if(data[0].badLocationEditYn == "N") {
									AUIGrid.setCellValue("grid2", checkedItems[i].rowIndex, "toLocationCd", badLocationCd);
									AUIGrid.setCellValue("grid2", checkedItems[i].rowIndex, "toLocationName", badLocationName);
								}
							}
						}
					} 
				},
				error: function(data){},
				fail : function(data){}
			});
			AUIGrid.setColumnPropByDataField('grid2', 'toLocationName', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					var getValue = AUIGrid.getCellValue("grid2", rowIndex, "badLocationEditFlag");
					if(getValue == 'Y'){
						return 'columnStyle';
					}
				}
			});
		});
	}, 
	comboBox : function() {
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
		
		// 불량유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_BAD_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#badType", comboOptions, options);
			}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	choiceSearchData : function() {
		var masterGridData = AUIGrid.getCheckedRowItems("grid");
		var param = {
			workOrderId : masterGridData[0].item.workOrderId
		}
		return param;
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
	callBack : function(result, data, param, callbackParam, flag) {
		var that = this.MOMDA010;
		var masterRowItems = AUIGrid.getCheckedRowItems("grid");
		var detailRowItems = AUIGrid.getCheckedRowItems("grid2");
		var arrayList = [];
		var params = {
			workOrderId : masterRowItems[0].item.workOrderId
		}
		if(result == "SUCCESS") {
			if(flag == true) {
				mCommon.render("grid2", "W201901292035449801000WQhKDiiIlyh", params, function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					initCount = AUIGrid.getRowCount('grid2');
				});
				
				AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
					if(e.dataField == "itemId" || e.dataField == "badType" || e.dataField == "badQty" || e.dataField == "confirmDate" || e.dataField == "description") {
						return false;
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'itemId', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex > initCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'badType', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex > initCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'badQty', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex > initCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'confirmDate', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex > initCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});
				
				AUIGrid.setColumnPropByDataField('grid2', 'description', {
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						if(rowIndex > initCount) {
							return 'columnStyle';
						} else {
							return null;
						}
					}
				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMDA010.init();
});