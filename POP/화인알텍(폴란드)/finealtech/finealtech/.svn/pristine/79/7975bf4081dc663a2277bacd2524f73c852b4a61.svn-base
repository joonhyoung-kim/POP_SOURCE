var divisionCd = sessionStorage.getItem("divisionCd");
var market = '';
var currency = '';

var MOMBA001 = {
	init: function() {
		var that = this;
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201806261323324461000PV2gCQ9Ilkv", null, function(){
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: "S/O"});
				that.comboBox();
				that.labelTxt();
				that.getParameterInfo();
				// 라벨 색상 변경
				$("#vendorCdLabel, #itemIdLabel, #dueDateLabel, #orderQtyLabel, #marketCdLabel, #currencyCdLabel").find(".circle").addClass("bg-orange");
				$("#vendorCdLabel, #itemIdLabel, #dueDateLabel, #orderQtyLabel, #marketCdLabel, #currencyCdLabel").find(".textblock").addClass("orange");
			}, Language);
		});
	}, grid: function() {
//		tuCommon.cellClick('grid');
		
		tuCommon.editColumnSet("grid");
	}, event: function() {
		var that = this; // MOMBA001 내부 변수 사용을 위해서 선언.
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			// 2019.01.21 hyjeong begin
			/*mCommon.render("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){});*/
			mCommon.pageRender("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){}, "plan.order.salesOrder.salesOrder");
			// 2019.01.21 hyjeong end
			
			AUIGrid.bind("grid", 'cellClick', function(e) {
				AUIGrid.setProp("grid", "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp("grid", 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp("grid", 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
//					if(option != null) {
//						AUIGrid.setAllCheckedRows("grid", false);
//					}
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			});
		});
		
		//등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setSalesOrderPop();
			$("#shipQtyModal").attr("readonly","readonly");
			$("#customerPoIdModal, #customerPoNoModal, #salesItemIdModal").attr("readonly",null);
			$("#marketCdModal, #currencyCdModal, #orderGubunModal, #vendorCdModal, #destinationCdModal,  #itemIdModal, #orderGubunModal").jqxComboBox({disabled: false});
			$("#gridModalPopSaveBtn").attr("type", "C");
		});
		
		//팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if($("#customerPoIdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10164']});
				return;
			}
			
			if($("#vendorCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10182']});
				return;
			}
			
			if($("#dueDateModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10266']});
				return;
			}
			
			if($("#marketCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10044']});
				return;
			}
			
			if($("#itemIdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES11589']});
				return;
			}
			
			if($("#orderQtyModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES11257']});
				return;
			}
			
			if($("#currencyCdModal").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11657']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getSalesOrderPop(type);
					micaCommon.splash.show();
					mom_ajax("C", "plan.order.salesOrder.salesOrder", JSON.stringify(param), that.listCallbackPost);
				}
			}});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			// 2019.01.21 hyjeong begin
			/*mCommon.auiGridExcelExport("grid", {fileName: "SALES_ORDER_MOMBA001_" + get_current_date("yyyy-mm-dd")});*/
			var param = mCommon.formGetParam("#form");
			param.startPage = 1;
			param.endPage = 1000000;
			mCommon.getDataset("W201806261323324461000PV2gCQ9Ilkv/data", param, undefined, function(dataSet) {
				var data = dataSet;
				mCommon.auiGridExcelExport("grid", {fileName: "SALES_ORDER_MOMBA001_" + get_current_date("yyyy-mm-dd"), data: data});
			});
			// 2019.01.21 hyjeong end
		});
		
		// 영업마스터 생성
		$(document).on("click", "#salesConfirmBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10899'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					micaCommon.splash.show();
					mom_ajax("C", "plan.order.salesOrder.salesMstCreate", "{}", that.salesMstCreateCollback);
				}
			}});			
		});
		
		// 수요계획 생성
		$(document).on("click", "#confirmBtn", function() {	
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10731'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var planDate = get_date_diff(0);
					planDate = planDate.replace(/-/gi, "");
					var param = {planDate : planDate};
					micaCommon.splash.show();
					mom_ajax("C", "plan.order.salesOrder.demandPlanCreate", JSON.stringify(param), that.demandPlanCreateCollback);
				}
			}});			
		});

		//수정
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			that.setSalesOrderPop(item);
			$("#customerPoIdModal, #customerPoNoModal, #shipQtyModal, #salesItemIdModal").attr("readonly","readonly");
			$("#marketCdModal, #currencyCdModal, #orderGubunModal, #vendorCdModal, #destinationCdModal, #itemIdModal, #orderGubunModal").jqxComboBox({disabled: true});
			$("#gridModalPopSaveBtn").attr("type", "U");
		});
		
		//주문마감
		$(document).on("click", "#orderCloseBtn", function() {
			var checkedItems =  AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			var param;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11341']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.orderState == "C") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11004']});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11250'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					for(var i=0; i<checkedItems.length; i++) {
						param = {
							salesOrderId : checkedItems[i].item.salesOrderId
						}
						if(i == checkedItems.length - 1) {
							chkFlag = true;
							micaCommon.splash.show();
						}
						mom_ajax("C", "plan.order.salesOrder.orderClose", JSON.stringify(param), that.orderCloseCallback, chkFlag);
					}
				}
			}
			});
			
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#customerPo'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#modelSuffix'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
	},
	comboBox: function (){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10){
			mm = "0" + mm;
		}
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(7));
		
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//고객사, 도착지
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#customerName",comboOptions, options);
				micaCommon.comboBox.set("#destinationName",comboOptions, options);
				micaCommon.comboBox.set("#vendorCdModal",comboOptions, options);
				micaCommon.comboBox.set("#destinationCdModal",comboOptions, options);
			}
		);
		
		//고객 품목 콤보박스 조회 시 부분 검색 기능
//		var optItem = {textName : "code", valueName : "code"};
//		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.order.salesOrder.comSalesItemId.dummy"; // 검색 URL
//		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
//		optItem.minLength = 4; // 최소 검색 수
//		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
//		
//		mCommon.comboBoxSearchCall("#salesItemIdModal", comboOptions, optItem);
		
		//고객사라인
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.order.salesOrder.comSalesOrder.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#customerLine",comboOptions, options);
			}
		);
		
		//잔량
		mCommon.comboBoxClickCall("#remainQty", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SEARCH_REMAIN_QTY"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#remainQty",comboOptions, options);
					callBack();
				}
			);
		});
		
		//상태
		mCommon.comboBoxClickCall("#orderState", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SALES_ORDER_STATE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#orderState",comboOptions, options);
					callBack();
				}
			);
		});
		
		//품목 콤보박스 조회 시 부분 검색 기능
		var optItem = {textName : "name", valueName : "code"};
		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy"; // 검색 URL
		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItem.minLength = 4; // 최소 검색 수
		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
		
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItem);
		
		//MKT
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"MARKET_CODE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#marketCdModal",comboOptions, options);
			}
		);
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"ORDER_GUBUN"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#orderGubun",comboOptions, options);
					micaCommon.comboBox.set("#orderGubunModal",comboOptions, options);
			}
		);
		
		//환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"CURRENCY_CODE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#currencyCdModal",comboOptions, options);
			}
		);
	},
	setSalesOrderPop: function(data) { 
		data = data || {};
		
		$("#customerPoIdModal").val(data.customerPoId || "");
		$("#customerPoNoModal").val(data.customerPoNo || "");
		$("#salesItemIdModal").val(data.salesItemId || "");
		$("#vendorCdModal").val(data.vendorCd || "");
		$("#dueDateModal").val(data.dueDate || "");
		$("#shipQtyModal").val(data.shipQty || "");
		$("#marketCdModal").val(data.marketCd || market);
		$("#orderGubunModal").val(data.orderGubun || "");
		$("#itemIdModal").val(data.itemId || "");
		$("#destinationCdModal").val(data.destinationCd || "");
		$("#orderQtyModal").val(data.orderQty || "");
		$("#shipQtyModal").val(data.shipQty || "");
		$("#currencyCdModal").val(data.currencyCd || currency);
		$("#cancelQtyModal").val(data.cancelQty || "");
		$("#descriptionModal").val(data.description || "");
	},
	getSalesOrderPop: function(type) {
		var salesOrderId='';
		// 영업마스터 팝업의 데이터를 모아서 준다.
		if(type == "U") {
			var selectItems = AUIGrid.getSelectedItems("grid");
			if(selectItems != ''){
				if(selectItems[0].item.salesOrderId != '' && selectItems[0].item.salesOrderId != null){
					salesOrderId = selectItems[0].item.salesOrderId
				}
			}
		}
		
		
		var result = {
			customerPoId: $("#customerPoIdModal").val(),
			customerPoNo: $("#customerPoNoModal").val(),
			salesItemId: $("#salesItemIdModal").val(),
			itemId: $("#itemIdModal").val(),
			customerCd: $("#vendorCdModal").val(),
			destinationCd: $("#destinationCdModal").val(),
			dueDate: $("#dueDateModal").val(),
			orderQty: $("#orderQtyModal").val(),
			shipQty: $("#shipQtyModal").val(),
			cancelQty: $("#cancelQtyModal").val(),
			marketCd: $("#marketCdModal").val(),
			currencyCd: $("#currencyCdModal").val(),
			orderGubun : $("#orderGubunModal").val(),
			description : $("#descriptionModal").val(),
			salesOrderId : salesOrderId
		}
		return result;
	},
	labelTxt : function() {
		$("#vendorCdLabel .textblock").text(Language.lang['MESSAGES10176']);
		$("#destinationCdLabel .textblock").text(Language.lang['MESSAGES10334']);
		$("#dueDateLabel .textblock").text(Language.lang['MESSAGES10265']);
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
	listCallbackPost : function(param, data){
		var that = this.MOMBA001;
		micaCommon.splash.hide();
		if(param == 'SUCCESS'){
			mCommon.render("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){
				$("#gridModalPop").micaModal("hide");
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	},
	salesMstCreateCollback : function(param, data){
		var that = this.MOMBA001;
		micaCommon.splash.hide();
		if(param == 'SUCCESS'){				
			mCommon.render("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10897']});
			});
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	},
	demandPlanCreateCollback : function(param, data){
		var that = this.MOMBA001;
		micaCommon.splash.hide();
		if(param == 'SUCCESS'){
			mCommon.render("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10732']});
			});
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	},
	orderCloseCallback : function(param, data, callbackParam) {
		var that = this.MOMBA001;
		micaCommon.splash.hide();
		if(param == 'SUCCESS') {
			if(callbackParam == true) {
				mCommon.render("grid", "W201806261323324461000PV2gCQ9Ilkv",  mCommon.formGetParam("#form"), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES11249']});
				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMBA001.init();
});