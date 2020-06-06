var MOMFA008 = {
	init: function() {
		var that = this;
		that.design();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid1", "W201903131729036001000Y2s0iKdiG4e", null, function(){
				that.grid("grid1");
				that.event();
				mCommon.init("grid2", "W201903131731395941002OvxZGVZObvF", null, function() {
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		
	}, grid: function(grid) {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(1));
		
		$("#shipDate").val(get_date_diff(0));
		
		tuCommon.cellClick(grid);
		if(grid == "grid1") {
//			AUIGrid.bind("grid1", "rowCheckClick", function( e ) {
//				var checkedItem = AUIGrid.getCheckedRowItems("grid1");
//				if(checkedItem.length > 0) {
//					for(var i = 0; i < checkedItem.length; i++) {
//						if(e.item.departureNumber == checkedItem[i].item.departureNumber && e.item.transactionId == checkedItem[i].item.transactionId) {
//							 //체크한 데이터랑 클릭한 데이터는 비교하지 않음
//						} else {
//							if(e.item.departureNumber == checkedItem[i].item.departureNumber) {
//								AUIGrid.addUncheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//								return;
//							} 
//							else if(e.item.departureNumber != checkedItem[i].item.departureNumber && e.checked == true) {
//								AUIGrid.addCheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//							}
//						}
//					}
//					if(checkedItem.length == 1) {
//						AUIGrid.addCheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//					} 
//					
//				} else {
//					AUIGrid.addUncheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//				}
//				
//			});
			
//			AUIGrid.bind("grid1", 'cellClick', function(e) {
//				var checkedItems = AUIGrid.getCheckedRowItems("grid1");
//				var chkFlag = false;
//				var chkFlag2 = false;
//				AUIGrid.setProp("grid1", "exportURL" , "1");
//				
//				setTimeout(function() {
//					if(AUIGrid.getProp("grid1", 'exportURL') == '0') { 
//						return;
//					}
//					
//					AUIGrid.setProp("grid1", 'exportURL' , '0');
//					
//				}, 200);
//				
//				for(var i = 0; i < checkedItems.length; i++) {
//					if(checkedItems[i].item.departureNumber != null && e.item.departureNumber != null && checkedItems[i].item.departureNumber == e.item.departureNumber) {
//						AUIGrid.addUncheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//						chkFlag = true;
//						return;
//					} else if(chkFlag2 != true && checkedItems[i].item.departureNumber != e.item.departureNumber) {
//						var item = e.item;
//						var rowIdField;
//						var rowId;
//						
//						rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
//						rowId = item[rowIdField];
//						
//						if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
//							AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
//						} else {
//							AUIGrid.addCheckedRowsByIds(e.pid, rowId);
//						}
//						chkFlag2 = true;
////						return;
//					}
//				}
//				
//				if(chkFlag != true) {
//					if(e.item.departureNumber != undefined && e.item.departureNumber != null && e.item.departureNumber != '') {
//						AUIGrid.addCheckedRowsByValue(e.pid, "departureNumber", e.item.departureNumber);
//					} else {
//						if(chkFlag2 != true) {
//							var item = e.item;
//							var rowIdField;
//							var rowId;
//							
//							rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
//							rowId = item[rowIdField];
//							
//							if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
//								AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
//							} else {
//								AUIGrid.addCheckedRowsByIds(e.pid, rowId);
//							}
//						}
//					}
//				}
//				
//
//				
//			});
		} else if(grid == "grid2"){
			AUIGrid.setColumnPropByDataField( grid, "qty", { style:"columnStyle" });
			AUIGrid.setColumnPropByDataField( grid, "description", { style:"columnStyle" });
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy",
				type : "GET",
				data : {stockType : "SP", locationType : "FROM"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "fromLocationCd", {
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
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy",
				type : "GET",
				data : {stockType : "SP", locationType : "TO"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( grid, "toLocationCd", {
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
			
			AUIGrid.bind(grid, 'cellEditEndBefore', function(e) {
				if(e.dataField == 'qty') {
					if(e.item.departureQty < e.value) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12127']});
						return e.oldValue;
					} else {
						return e.value;
					}
				}
				return e.value;
			});
			
			
			AUIGrid.setSelectionMode('grid2', 'singleCell');
			$('#hour').find('input').attr('placeholder','00');
			$('#minute').find('input').attr('placeholder',"00'");
		}
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
			
			var param = mCommon.formGetParam("#form");
			if(AUIGrid.getRowCount("grid2") > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11125'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){			
						mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  param, function(){
							AUIGrid.clearGridData("grid2"); 
						});
					}
				}});
			} else {
				mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  param, function(){});
			}			
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length; i++){
				var item = checkedItems[i].item;
				var salesOrderId = item.salesOrderId;
//				var customerPoId = item.customerPoId;
//				var itemId = item.itemId;
				var chk = true;
//				if(i < checkedItems.length - 1) {
//					if(checkedItems[i].item['customerPoId'] != checkedItems[i+1].item['customerPoId'] || checkedItems[i].item['itemId'] != checkedItems[i+1].item['itemId'] ) {
//						micaCommon.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12126']});
//						return;
//					} 
//				}
				
				for(var j = 0; j < grid2Items.length; j++){
					if(salesOrderId == grid2Items[j].salesOrderId){
						chk = false;
						break;
					}					
					
//					if(customerPoId != grid2Items[j].customerPoId || itemId != grid2Items[j].itemId) {
//						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12126']});
//						return;
//					}
				}
				if(chk) {
					AUIGrid.addRow("grid2", item, "last");						
				}
			}
			
			if(AUIGrid.getRowCount("grid2") > 0) {				
				AUIGrid.setAllCheckedRows("grid2", true);
			}
			
			AUIGrid.setAllCheckedRows("grid1", false);
		});
		
		// 취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2"); 
			AUIGrid.setAllCheckedRows("grid2", true);
		});
		
		// 출하계획생성 버튼
		$(document).on('click', '#shippingPlanBtn', function(){
			var checkedItems =  AUIGrid.getCheckedRowItems('grid2');
			var hour = $('#hour').val() == '' ? '00' : $('#hour').val();
			var minute = $('#minute').val() == '' ? '00' : $('#minute').val();
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.qty == '' || checkedItems[i].item.qty == null) {
					micaCommon.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11707']});
					return;
				}
				checkedItems[i].item.shipDate = $('#shipDate').val() + ' ' + $('#hour').val() + ':' + $('#minute').val() + ':00';
				checkedItems[i].item.carModel = $("#carModel").val();
			}
			
			if(checkedItems.length == "0") {
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11342']});
				return;
			} else {
				var option = {
						type:'info', 
						html:Language.lang['MESSAGES11429'], 
						width:'400', 
						height: '145',
						okButton:{
							text:'OK',
							after:function(){								
								var param = {}
								mom_ajax('D', 'shipping.shipPlanning.shipPlanningTmp', JSON.stringify(param), that.delCallback, checkedItems);								
							}
						}
				}
				micaCommon.messageBox(option);						
			}	
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "SHIP_PLANNING_MOMFA008_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#customerWo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode:'containsignorecase', width: '40px', height: '20px', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		
		$('#shipDate').datetimepicker({
			timepicker:false, 
			format:'Y-m-d'
		});
		
		
		//시
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"HMS_SET_UP", attribute1:"Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#hour", comboOptions, options);
			}
		);
		
		//분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"HMS_SET_UP", attribute2:"Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#minute", comboOptions, options);
			}
		);
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMFA008;
		if(result == "SUCCESS"){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.shipmentSeqNo = i + 1; 
            	arrayList.push(callbackParam[i].item);
            }
			mom_ajax('L', 'shipping.shipPlanning.shipPlanningTmp', JSON.stringify(arrayList), that.listCallback, arrayList);
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
		var that = this.MOMFA008;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'shipping.shipPlanning.shipPlanningCreate', JSON.stringify(callbackParam[0]), that.listCallbackPost);
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
		var that = this.MOMFA008;
		if(result == "SUCCESS"){
			var params = mCommon.formGetParam("#form");
			mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  params, function(){
				AUIGrid.clearGridData("grid2");
				$("#carModel").val("");
				$("#shipDate").val(get_date_diff(0));
				$("#hour").val("");
				$("#minute").val("");
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
};
$(document).ready(function(event){
	MOMFA008.init();
});