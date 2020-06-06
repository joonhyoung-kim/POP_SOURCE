var userId = sessionStorage.getItem("userId");
var params;
var endPeriod;

/* modify_hists
 * SR_TNE_20191107_01 / 20191107 / gyp / 팝업에서 조회되는 창고컬럼을 warehouse에서 inLocationId로 변경
 * 
 * 
 * */

var MOMCA002 = {
	init: function() {
		var that = this;
		that.design();
		that.comboBox();
		that.event();	
		that.setPlanDate();
		
		Language.init(function() {
			mCommon.init("grid", "W201807271145395941001vlfHLDPoENF", undefined, function(){
				that.grid("grid");
			}, Language);
	//		mCommon.init("popGrid1", "W201808061331512661000tIIUj8B1VWU", null, function() {
	//			that.grid("popGrid1");
	//		}, Language);
			mCommon.init("popGrid2", "W2018080611445116110000oqXNRGqu6h", null, function() {
				that.grid("popGrid2");
			}, Language);
		});
	}, 
	grid: function(grid) {
		var that = this;
		if(grid == "grid") {
			var column = [
				{
				     headerText : "P/N",
				     children : [
				    	 {headerText: Language.lang['MESSAGES10198'],
				    		 children: [
				    			 {headerText: Language.lang['MESSAGES11585'],
				    				 children:[
				    					 {
				    						 headerText : Language.lang['MESSAGES10824'],
				    						 children: [
				    							 {
				    								 dataField : "col1",
						    						 headerText : Language.lang['MESSAGES10234'],
						    						 width : 120
				    							 }
				    						 ]
				    						
			    					 }]
			    			 }]
			    	 }] // end of children
				},
				{
				     headerText : Language.lang['MESSAGES11584'],
				     children : [
				    	 {headerText: Language.lang['MESSAGES11565'],
				    		 children: [
				    			 {headerText: Language.lang['MESSAGES10308'],
				    				 children:[
				    					 {
				    						 headerText : Language.lang['MESSAGES11050'],
				    						 children: [
				    							 {
				    								 dataField : "col2",
						    						 headerText : Language.lang['MESSAGES10522'],
						    						 width : 120
				    							 }
				    						 ]
				    						
			    					 }]
			    			 }]
			    	 }] // end of children
				},
				{
				     headerText : Language.lang['MESSAGES10855'],
				     children : [
				    	 {headerText: Language.lang['MESSAGES11613'],
				    		 children: [
				    			 {headerText: Language.lang['MESSAGES11292'],
				    				 children:[
				    					 {
				    						 headerText : Language.lang['MESSAGES10458'],
				    						 children: [
				    							 {
				    								 dataField : "col3",
						    						 headerText : Language.lang['MESSAGES10849'],
						    						 width : 120
				    							 }
				    						 ]
				    						
			    					 }]
			    			 }]
			    	 }] // end of children
			
				}
			]
					
			AUIGrid.addColumn(grid, column, "first");			
		}
//		else if (grid == "popGrid1") {
//			// 발주업체 그리드 체크상자 클릭 이벤트 설정
//			AUIGrid.bind(grid, "rowCheckClick", function(e) {
//				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
//				that.selectDetailList();
//			});
//			
//			// 발주업체 그리드 클릭 이벤트 설정			
//			AUIGrid.bind(grid, "cellClick", function(e) {
//				var rowId = e.item[AUIGrid.getProp(e.pid, "rowIdField")];
//				
//				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
//					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
//				} else {
//					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
//				}				
//				// 선택된 발주업체 조건으로 우측 발주 그리드 리스트를 기존 발주에 추가 
//				that.selectDetailList();
//			});
//			
//			// 전체 체크박스 클릭 시 발생하는 이벤트
//			AUIGrid.bind(grid, "rowAllChkClick", function(e) {
//				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
//				that.selectDetailList();
//			});
//			
//		} 
		else if (grid == "popGrid2") {
			AUIGrid.bind(grid, "cellEditBegin", function(e) {
				AUIGrid.setProp(grid, 'exportURL', '0');	
			});
			
			tuCommon.cellClick(grid);
			AUIGrid.setSelectionMode("popGrid2", "singleCell");
			AUIGrid.setColumnPropByDataField( "popGrid2", "requestDate", { 
				style:"columnStyle",
		 		editRenderer : {
			           type : "CalendarRenderer",
			           openDirectly : true,
			   		   onlyCalendar : false
			     }
		 	});
			AUIGrid.setColumnPropByDataField( "popGrid2", "requestQty", { style:"columnStyle" });
			AUIGrid.setColumnPropByDataField( "popGrid2", "description", { style:"columnStyle"});
			AUIGrid.setColumnPropByDataField( "popGrid2", "marketCd", { style:"columnStyle"});
			AUIGrid.setColumnPropByDataField( "popGrid2", "currencyCd", { style:"columnStyle"});

			that.gridComboBoxSet("popGrid2", tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", "vendorCd", "DropDownListRenderer", true);
			that.gridComboBoxSet("popGrid2", tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", "departureVendorCd", "DropDownListRenderer", true);
			that.gridComboBoxSet("popGrid2", tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy?codeClassId=MARKET_CODE", "marketCd", "DropDownListRenderer", true);
			that.gridComboBoxSet("popGrid2", tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy?codeClassId=CURRENCY_CODE", "currencyCd", "DropDownListRenderer", true);
			// SR_TNE_20191107_01
			that.gridComboBoxSet("popGrid2", tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy"+'?facilityType' + '=' + 'FAC200', "inLocationId", "DropDownListRenderer", true);
			
			AUIGrid.setProp("popGrid2", { "editable" : true, "editBeginMode" : "click"} );
			
			// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMCA002"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('popGrid2', "cellEditEndBefore", function(event){ 
					        if(event.dataField == "requestDate") { // 달력 지정한 필드인 경우 
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
		}
	}, 
	event: function() {
		var that = this;
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "REGULAR_ORDER_MOMCA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid", "W201807271145395941001vlfHLDPoENF",  that.getSearchData(), function(dataSet){
				var data = dataSet;
				var gridColumn = AUIGrid.getColumnLayout("grid");				
				
				for(var i = gridColumn.length -1; i > 3; i--){
					AUIGrid.removeColumn("grid", i);
				}
		
				if(data.length > 0){
					var i = 0;
					$.each(data[0], function(key, value){
						if(key.match("/")){
							var columnObj = { 
									dataField : key,
									editable: true,
									"width":100, 
									dataType : "numeric", 
									formatString : "#,###", 
									style: "right-column",
									styleFunction :  function(rowIndex, columnIndex, value, headerText, item, dataField) {
										if(item.category.match(Language.lang['MESSAGES11744'])){
											if(parseInt(value) < 0){
												return "redStyle";
											}
											return null;
											
										}else if(item.category == Language.lang['MESSAGES11745']){
											if(value != null && value != ''){
												return "yellowStyle";
											}
											return null;
										}
										return null;
									}
							};
							AUIGrid.addColumn("grid", columnObj, "last");
							i++;
						}
					});
				}
				
				AUIGrid.setGridData("grid", data);
			});	
		});
		
		// 발주 버튼 클릭(팝업창 호출)
		$(document).on("click", "#orderBtn", function() {
			AUIGrid.clearGridData("popGrid2");
			var row = AUIGrid.getRowCount("grid");
			if(row <= 0) {
				micaCommon.messageBox({type:"warning",  html:Language.lang['MESSAGES10329']});
				return;
			}
			
			$("#orderPop").micaModal("show");
			$(window).resize(); //그리드 사이즈 재조정
			//발주 팝업 내 업체 콤보박스
			that.getPopVendorList();
			$("#pPartNo").val("");
			$("#pPartNo").val($("#itemName").val());
			
			//발주업체 그리드
//			that.selectVendorList();
		});
		
		//발주 팝업 내 조회
		$(document).on("click", "#pSearchBtn", function() {
			that.selectVendorList();
		});
		
		// MRP 버튼 클릭
		$(document).on("click", "#mrpBtn", function() {
			var planId = AUIGrid.getGridData("grid");
			if(planId.length == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10328']});
				return;
			} else{
				planId = planId[0].planId;
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10052'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						var param = {
								planId : planId
						}
						mom_ajax("C", "purchase.purchasing.regularOrder.materialOrderMrp", JSON.stringify(param), that.listCallbackPost);
					}
				}});
			}
			
		});
		
		
		// 발주 버튼 클릭
		$(document).on("click", "#pOrderBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("popGrid2");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11331']});
				return;
			} else {
				for(var i=0; i<checkedItems.length; i++) {
					if(to_date_yyyy_mm_dd(checkedItems[i].item.requestDate) <= endPeriod) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10269' + '@' + endPeriod)});
						return;
					}
					
					if(checkedItems[i].item.vendorCd == '' ||  checkedItems[i].item.vendorCd == null
							|| checkedItems[i].item.departureVendorCd == '' || checkedItems[i].item.departureVendorCd == null) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
							return;
						}
				}
				
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10474'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							param = {
								orderType : "SYSTEM"
							}
						}
						mom_ajax("D", "common.materialOrderDel", JSON.stringify(param), that.delCallback, checkedItems);
					}
				}});
			}
		});
		
		// 발주 팝업 닫기
		$(document).on("click", "#pCancle, .bntpopclose", function() {
			$("#orderPop").micaModal("hide");
		});
		
		// planId
		$(document).on("change", "#planId", function() {
			that.setPlanDate();
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#username'), $('#findBtn'));
		tuCommon.addKeyDown($('#pForm'), $('#pPartNo'), $('#pSearchBtn'));
	},
	selectVendorList : function(tag) {
		var that = this;
		
		//발주업체 그리드
//		mCommon.render("popGrid1", "W201808061331512661000tIIUj8B1VWU", {planId: $("#planId").val(), shortagePeriod: $("#shortagePeriod").val(), itemId: $("#itemName").val(), pVendorName: $("#pVendorName").val()}, function(){
//			var items = AUIGrid.getSelectedItems("popGrid1");			
//			if(items.length > 0) {
//				AUIGrid.setSelectionByIndex("popGrid1", 0);	
//				AUIGrid.setCheckedRowsByIds("popGrid1", items[0].item[AUIGrid.getProp("popGrid1", "rowIdField")]);
//				that.selectDetailList();
//			}
//			that.selectDetailList();
//		});
		
		that.selectDetailList();
	},
	selectDetailList : function() {
		var checkVendors = "(";
//		var checkItems = AUIGrid.getCheckedRowItems("popGrid1");
		var param;
		
//		if(checkItems.length > 0) {
//			checkVendors = "(";
//			for(var i=0; i<checkItems.length; i++){
//				checkVendors = checkVendors + "'" + checkItems[i].item.vendorId + "'";			
//				if(i < checkItems.length - 1) {
//					checkVendors = checkVendors + ",";
//				}
//			}
//			checkVendors = checkVendors + ")";
//		} else {
//			checkVendors = "";
//		}
		
		var pVendorList = $("#pVendorName").jqxComboBox('getCheckedItems');
		if(pVendorList.length > 0) {
			$.each(pVendorList, function(index) {
				if(pVendorList.length-1 != index) {
					checkVendors += "'" + this.value + "',"
				} else {
					checkVendors += "'" + this.value + "')"
				}
			});
		} else {
			checkVendors = "";
		}
		
		param = {
				planId: $("#planId").val(),
				fromDate: $("#fromDate").val(),
				toDate: $("#toDate").val(),
				shortagePeriod: $("#shortagePeriod").val(),
				pPartNo: $("#pPartNo").val(),
				pVendorId: checkVendors
		}
		mCommon.render("popGrid2", "W2018080611445116110000oqXNRGqu6h", param, function(){});
	},
	getSearchData : function(){
		var that = this;
		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
		that.getDiff(fromDate, toDate);
		
		var param = {
				planId : $("#planId").val() || "",
				fromDate : $("#fromDate").val() || "",
				toDate : $("#toDate").val() || "",
				itemId : $("#itemName").val() || "",
				locationId : $("#LocationName").val() || "",
				vendorId : $("#vendorName").val() || "",
				itemType : $("#itemType").val() || "",
				planner : $("#username").val() || "",
				locationId : $("#LocationName").val() || "",
				planType : $("#palnType").val() || "",
				orderMethod : $("#orderType").val() || "",
				shortage : $("#shortage").val() || "",
				shortagePeriod : $("#shortagePeriod").val() || "",
				pVendorCd : $("#pVendorName").val() || "",
				pPartNo : $("#pPartNo").val() || "",
				pivot : pivot || ""
		}
		
		return param;
	},
	getDiff : function(sDate, eDate){
		var FORMAT = "-";
		pivot = "";

        var start_dt = sDate.split(FORMAT);
        var end_dt = eDate.split(FORMAT);
        start_dt[1] = (Number(start_dt[1]) - 1) + "";
        end_dt[1] = (Number(end_dt[1]) - 1) + "";
        var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2], "00", "00");
        var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2], "00", "00");

        compareDay = (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24;
        compareDay = compareDay + 1;

        for ( var i = 0; i < compareDay; i++) {
            var newDay = new Date(sDate);
            newDay.setDate(newDay.getDate() + i);
            var changeDay = new Date(newDay);
            var changeFY = changeDay.getFullYear();
            var changeHY = changeFY + "";
            var changeHY = changeHY.substring(2, 4);
            var changeM = changeDay.getMonth() + 1;
            var changeD = changeDay.getDate() + 0;
            
            if (changeM < 10) {
                changeM = "0" + changeM;
            } else {
            	changeM = "" + changeM;
            }
            if (changeD < 10) {
                changeD = "0" + changeD;
            } else {
            	changeD = "" + changeD;
            }
            
            var lastDay = changeFY + changeM + changeD;
            var lastDisplayDay = changeHY + '/' + changeM + '/' + changeD;
            pivot +=  "'" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
       
            if(i != compareDay -1){
            	pivot += ", ";
            }
        }
	},
//	setPopVendor : function(){
//		$.ajax({
//			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.regularOrder.popVendor.dummy",
//			type : "GET",
//			data : {planId: $("#planId").val(), itemId: $("#itemName").val(), vendorId: $("#vendorName").val(), shortagePeriod: $("#shortagePeriod").val()},
//			async: false,
//			timeout 	: 30000000,
//			dataType 	: 'json',
//			contentType : 'application/json; charset=UTF-8',
//			success : function(data){},
//			error: function(data){},
//			fail : function(data){}
//		});
//	},
	getPopVendorList : function(){ // 발주 팝업 내 업체 검색조건
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.regularOrder.vendorSet.dummy",
			type : "GET",
			data : {planId: $("#planId").val(), fromDate: $("#fromDate").val(), vendorId: $("#vendorName").val(), shortagePeriod: $("#shortagePeriod").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#pVendorName",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, {local: data, textName : "name", valueName : "code", readonly: false});
			},
			error: function(data){},
			fail : function(data){}
		});
		
	},
	setPlanDate : function(){
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.regularOrder.planId_date.dummy",
			type : "GET",
			data : {planId: $("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					$("#fromDate").val(to_date_yyyy_mm_dd(data[0].planDate));
					$("#toDate").val(get_date_diff2(to_date_yyyy_mm_dd(data[0].planDate), 30));
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	comboBox : function(){
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var selectComboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		// Plan ID
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.purchasing.regularOrder.planId.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#planId",{ selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "name", valueName : "code", readonly: false});
			},
			error: function(data){},
			fail : function(data){}
		});
		
		// 업체코드
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", 
					{attribute1 : 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#vendorName", comboOptions, options);
						callBack();
				}
			);
		});
		
		// 품목형태
		mCommon.comboBoxClickCall("#itemType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",{codeClassId : "ITEM_TYPE", attribute14: 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemType", comboOptions, options);
						callBack();
				}
			);
		});
		
		// 창고
		mCommon.comboBoxClickCall("#LocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", 
					{facilityClassCd: "AREA", facilityType:"'FAC200', 'FAC300', 'FAC400', 'FAC500'"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#LocationName", comboOptions, options);
						callBack();
				}
			);
		});
		
		// 계획구분
		mCommon.comboBoxClickCall("#palnType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "ORDER_PLAN_TYPE"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#palnType", comboOptions, options);
						callBack();
				}
			);
		});
		
		// 발주방식
		mCommon.comboBoxClickCall("#orderType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "ORDER_METHOD"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#orderType", comboOptions, options);
						callBack();
				}
			);
		});
		
		// shortage Only 
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "SHORTAGE_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#shortage", selectComboOptions, options);
					
			}
		);

		// shortagePeriod
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "SHORTAGE_PERIOD"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#shortagePeriod", selectComboOptions, options);
				}
		);
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMCA002;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("popGrid2");
		if(result == "SUCCESS"){
			for(var i = 0; i < checkedItems.length; i++){
				checkedItems[i].item['orderType'] = 'SYSTEM';
				
				/* start SR_TNE_20191107_01
				if (checkedItems[i].item.warehouse != null){
					checkedItems[i].item.inLocationId = checkedItems[i].item.warehouse;
				}  end SR_TNE_20191107_01 */

				arrayList.push(checkedItems[i].item);
			}
			mom_ajax('L', 'common.materialOrderUpload', JSON.stringify(arrayList), that.listCallback, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMCA002;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'common.materialOrder', JSON.stringify(callbackParam[0]), that.listCallbackPost);
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
	listCallbackPost : function(result, data){
		var that = this.MOMCA002;
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201807271145395941001vlfHLDPoENF", that.getSearchData(), function(){});
			micaCommon.messageBox({type:"success", width: '400', height: '145', html:Language.lang['MESSAGES10692']});
			that.selectDetailList();
		} else {
			micaCommon.messageBox({type:"danger", width: '400', height: '145',  html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	gridComboBoxSet: function(grid, url, field, type, showFg) {
		var lists;
		var errors;
		
		getComboList();
		
		function getComboList(){
			$.ajax({
				type : 'GET',
				url : url,
				timeout : 30000000,
				async : false,
				dataType : 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					lists = data;
				},
				error : function(error){
					errors = error;
				},
				fail : function(){
					micaCommon.messageBox({type:"danger", width: '400', height: '145',  html:Language.lang['MESSAGES10821']});
				}
			});
		}
		
		var colSet = {
			dataField : field,
			labelFunction : function(rowIndex, columnIndex, value, headerText, item) { 
				var retStr = "";
				for(var i=0,len=lists.length; i<len; i++) {
					if(lists[i]["code"] == value) {
						retStr = lists[i]["name"];
						break;
					}
				}
				return retStr == "" ? value : retStr;
			},
			style:"columnStyle",
			editRenderer : {
				type : type,
				showEditorBtnOver : showFg, // 마우스 오버 시 에디터버턴 보이기
				list : lists,
				keyField : "code",
				valueField : "name"	
			}
		};
		
		AUIGrid.setColumnPropByDataField(grid, field, colSet);
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
		$("head").append('<style>.redStyle{ background: #FF0000;}</style>');
		$("head").append('<style>.yellowStyle{ background: #FFF612;}</style>');
	},
};
$(document).ready(function(event){
	MOMCA002.init();
});