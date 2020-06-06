var userId = sessionStorage.getItem("userId");

var MOMFA011 = {
	init: function() {
		var that = this;
		that.grid();
		that.design();
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid1", "W201808081436260161000w1OTAJznlBG", undefined, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201808112305299741000DuRnELer87m", undefined, function(){
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".h04-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == "grid1") {
			var that = this;
			tuCommon.cellClick("grid1");
			AUIGrid.setColumnPropByDataField("grid1", "shippingQty", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid1", "shipDate", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid1", "description", {style:"columnStyle"} );
			
			var fromLocationUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy' +'?codeClassId' + '=' +'SHIP_IN_LOCATION';
			var toLocationUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFacility.dummy' +'?facilityType' + '=' +'FAC700';
		
			//출하창고 콤보
			that.gridComboBoxSet("grid1", fromLocationUrl, "fromLocationName", "DropDownListRenderer", true);
			//고객창고 콤보
			that.gridComboBoxSet("grid1", toLocationUrl,   "toLocationName",   "DropDownListRenderer", true);
			//출하일 콤보
			that.datePickerSet("grid1", "shipDate", "CalendarRenderer", false);
			
		} else {
			AUIGrid.bind("grid2", "cellClick", function(e) {
				var item = e.item;
				var rowIdField;
				var rowId;
				var sumQty = 0;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				
				var checkedItems = AUIGrid.getCheckedRowItems("grid2");
				for(var i=0; i<checkedItems.length; i++) {
					sumQty += checkedItems[i].item.barcodeQty;
				}
				
				AUIGrid.setCellValue("grid1", 0, "shippingQty", sumQty);
			});			
		}
	}, 
	event: function() {
		// 조회
		$("#findBtn").click(function(event){
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
			
			mCommon.render("grid1", "W201808081436260161000w1OTAJznlBG", mCommon.formGetParam("#form"), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		//바코드 선택
		$("#barcodeBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var param;
			if(checkedItems.length == 0 || checkedItems.length > 1) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return;
			} else {
				for(var i=0; i<checkedItems.length; i++) {
					param = {
						itemId : checkedItems[i].item.itemId,
					}
				}
				mCommon.render("grid2", "W201808112305299741000DuRnELer87m", param, function(){});
			}
		});
		
		// 출하처리
		$("#shippingBtn").click(function(event){
			var that = MOMFA011;
			var checkedDetailItems = AUIGrid.getCheckedRowItems("grid2");
			for(var i=0; i<checkedDetailItems.length; i++) {
				if(checkedDetailItems[i].item.shipApplyFlag == "Y") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11710']});
					return;
				}
			}
			
			var param = {};
			
			var option = {
				type:"info", 
				html:Language.lang['MESSAGES11449'], 
				okButton:{
					text:"OK", 
					after:function(){
						mom_ajax("D","shipping.productShippingBarcode.productShippingBarcode", JSON.stringify(param), that.callBack, checkedDetailItems, "tempDelCall");
					}
				}
			}
			
			micaCommon.messageBox(option);	
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#inItem'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#inCustomerPo'), $('#findBtn'));
	},
	comboBox : function(){
		// 납기일
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var selectComboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 고객사
		mCommon.comboBoxClickCall("#inVendor", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : "'CUSTOMER', 'BOTH'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inVendor", comboOptions, options);
					callBack();
				}
			);
		});
		
		// 창고
		mCommon.comboBoxClickCall("#inLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType:"FAC400"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inLocation", comboOptions, options);
					callBack();
				}
			);
		});
		
		// 도착지
		mCommon.comboBoxClickCall("#inDestination", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comDestination.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inDestination", comboOptions, options);
					callBack();
				}
			);
		});
		
		// 주문상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SALES_ORDER_STATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inOrderState", selectComboOptions, options);
			}
		);
	
		
		// 단가정보
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inUnitPrice", comboOptions, options);
			}
		);
		
		// 혼류군
		mCommon.comboBoxClickCall("#inMixGroup", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comMixGroup.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inMixGroup", comboOptions, options);
					callBack();
				}
			);
		});
		
		//LG Line
		mCommon.comboBoxClickCall("#inLgLine", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCustomerLine.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inLgLine", comboOptions, options);
					callBack();
				}
			);
		});
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
					micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
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
	datePickerSet : function(grid, field, type, showExDay) {
		var requestDateColumn = AUIGrid.getColumnItemByDataField(grid, field);
		requestDateColumn.editRenderer = {
				type : type,
	            showExtraDays : showExDay,
	            titles : [Language.lang['MESSAGES11017'], Language.lang['MESSAGES10968'], Language.lang['MESSAGES11636'], Language.lang['MESSAGES10715'], 
	        	      	  Language.lang['MESSAGES10416'], Language.lang['MESSAGES10247'], Language.lang['MESSAGES11510']]
		}
		AUIGrid.setColumnPropByDataField(grid, field, requestDateColumn);
		
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	callBack : function(result, data, param, callbackParam, flag){
		var that = this.MOMFA011;
			if(result == "SUCCESS") {
				var arrayList = [];
				var checkedMasterItems = AUIGrid.getCheckedRowItems("grid1");
				var checkedDetailItems = AUIGrid.getCheckedRowItems("grid2");
				
				if(flag == "tempDelCall") {
					for(var i = 0; i < checkedDetailItems.length; i++){
						checkedDetailItems[i].item.shipDate = checkedMasterItems[0].item.shipDate;
						checkedDetailItems[i].item.salesOrderId = checkedMasterItems[0].item.salesOrderId;
						checkedDetailItems[i].item.itemId = checkedDetailItems[i].item.itemId;
						checkedDetailItems[i].item.shipQty = Number(checkedMasterItems[0].item.shippingQty);
						checkedDetailItems[i].item.seq = Number(i);						
						checkedDetailItems[i].item.barcodeId = checkedDetailItems[i].item.barcodeId;
						checkedDetailItems[i].item.createBy = userId;
						arrayList.push(checkedDetailItems[i].item);
					}
					mom_ajax('L', 'shipping.productShippingBarcode.productShippingBarcode', JSON.stringify(arrayList), that.callBack, arrayList, "tempInsCall");
					
				} else if(flag == "tempInsCall") {
					if(checkedMasterItems.length == 0 || checkedMasterItems.length > 1 || checkedDetailItems.length == 0) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
						return;
						
					} else {
						if(checkedMasterItems[0].item.fromLocationCd == '' || checkedMasterItems[0].item.fromLocationCd == null) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11711']});
							return;
						}
						
						if(checkedMasterItems[0].item.shipQty <= 0) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11712']});
							return;
						}
						
						if(checkedMasterItems[0].item.shipQty > checkedMasterItems[0].item.remainQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11713']});
							return;
						}
						
						if(checkedMasterItems[0].item.shipQty > checkedMasterItems[0].item.currentQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11714']});
							return;
						}
						
						var param = {
							orderType : "SO_IN"
						}
	
						mom_ajax("D","shipping.productShipping.productShippingTemp", JSON.stringify(param), that.callBack, checkedMasterItems, "delCall");
					}
					
			} else if(flag == "delCall") {
				var arrayList = [];
				var checkedItems = AUIGrid.getCheckedRowItems("grid1");
				for(var i = 0; i < checkedItems.length; i++){
					checkedItems[i].item.orderType = "SO_IN";
					checkedItems[i].item.createBy = userId;
					checkedItems[i].item.shippingQty = checkedItems[i].item.shippingQty;
					if(checkedItems[i].item.unitPrice == Language.lang['MESSAGES10418']){	// 단가 미결일 경우
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10419']});
						return;
						
					} else {
						checkedItems[i].item.unitPrice = Number(checkedItems[i].item.unitPrice);
					}
					arrayList.push(checkedItems[i].item);
				}
				mom_ajax('L', 'shipping.productShipping.productShippingTemp', JSON.stringify(arrayList), that.callBack, arrayList, "insCall");
				
			} else if(flag == "insCall") {
				if(callbackParam.length > 0){
					mom_ajax('C', 'shipping.productShipping.productShipping', JSON.stringify(callbackParam[0]), that.callBack, null, "procCall");
				}
				
			} else if(flag == "procCall") {
				mCommon.render('grid1', 'W201808081436260161000w1OTAJznlBG', mCommon.formGetParam("#form"), 
					function(){micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					AUIGrid.clearGridData("grid2");
				});
			}
				
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
	}
};
$(document).ready(function(event){
	MOMFA011.init();
});