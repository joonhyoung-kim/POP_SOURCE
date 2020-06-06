var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var gvThat;
var market;
var endPeriod;

var MOMDA001 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.event();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W201807312104484761000cgnqXwXXH3l", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES11148']});
				that.comboBox();
				that.getParameterInfo();
				$("#itemIdLabel, #resourceCdLabel, #planQtyLabel, #planStartTimeLabel, #reasonCodeLabel").find(".circle").addClass("bg-orange");
				$("#itemIdLabel, #resourceCdLabel, #planQtyLabel, #planStartTimeLabel, #reasonCodeLabel").find(".textblock").addClass("orange");
			}, Language);
		});
		
	}, grid: function() {
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMDA001"},
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
		
	}, event: function() {
		var that = this;
		// 조회 버튼
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
			
			mCommon.render("grid", "W201807312104484761000cgnqXwXXH3l",  mCommon.formGetParam("#form"), function(){});
		});
		
		// WO/PO, 아이템ID enter로 조회
		$(document).on("keydown", "#searchKeyWord", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 수작업등록 버튼
		$(document).on("click", "#handWorkBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setWorkOrderCreatePop();
			$("#itemIdModal, #productOrderTypeModal").jqxComboBox({disabled : false});
			$("#gridModalPopSaveBtn").attr("type", "C");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "JOB_INSTRUCTION_RESISTER_MOMDA001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					if(type == "C"){
						that.workOrderCheckBom(type);
					}else if (type == "U"){
						that.createCallback(1,type);
					}
				}
			}});
		});
		
		//수정버튼
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			that.setWorkOrderCreatePop(item);
			$("#gridModalPopSaveBtn").attr("type", "U");
			
			$("#itemIdModal, #productOrderTypeModal").jqxComboBox({disabled : true});
		});
		
		//복사버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length > 1 || selectItems.length < 1) { 
				micaCommon.messageBox({type:"warning",  width:"400", height: "145",   html: Language.lang['MESSAGES11604']});
				return; }
			mCommon.gridPopAdd("grid");
			that.setWorkOrderCreatePop(selectItems[0].item);
			$("#itemIdModal, #productOrderTypeModal").jqxComboBox({disabled : false});
			$("#gridModalPopSaveBtn").attr("type", "C");
		});
		
		//작업지시계획삭제 버튼
		$(document).on("click", "#deleteWoPlanBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			for(var i = 0; i < selectItems.length; i++) {
				if(selectItems[i].item.state == 'A') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145",   html: Language.lang['MESSAGES11160']});
					return;
				}
			}
			if(selectItems.length > 0) {
				var option = {
					type:"info", 
					html:Language.lang['MESSAGES11147'], 
					width:"400", 
					height: "145", 
					okButton:{
						text:"OK", 
						after:function(){
							var param = {
								menuId : 'MOMDA001'
								, tableId : 'MOM_PRODUCT_ORDER'
							};
							mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.delProductOrderCallback, selectItems);
						}
					}
				}
				micaCommon.messageBox(option);		
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES11334']});
			}
		});
		
		// 작업지시확정 버튼
		$(document).on("click", "#confirmWoBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES11346']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.planStartTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.getLang('MESSAGES10151' + '@' + endPeriod)});
					return;
				}
			}
			
			var option = {
				type : "info", 
				width : "400", 
				height : "145",
				html:Language.lang['MESSAGES11161'], 
				okButton:{
					text:"OK", 
					after:function(){
						mom_ajax("D","workOrder.workOrderCreate.confirmWorkOrderTemp", "{}", that.delCallback, checkedItems);
					}
				}
			}
			
			micaCommon.messageBox(option);	
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "WORKORDER_MOMDA001_test"}, "templete");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.excelUpload();
		});
		
		// 수작업등록 팝업 내 설비 코드 항목 클릭 시
		$(document).on("click", "#equipmentCdModal", function() {
			if($("#resourceCdModal").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES12180']});
				return;
			}
		});
		
		tuCommon.addKeyDown($(document), $('#userName'), $('#findBtn'));
	},
	comboBox: function(){
		// 날짜
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(1));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_DATE", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
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

		// 설비
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#resourceName",comboOptions, options);
				micaCommon.comboBox.set("#resourceCdModal",comboOptions, options);
				micaCommon.comboBox.set("#outResourceNameModal",comboOptions, options);
			}
		);

		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CREATE_WORK_ORDER", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}
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
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// 품목
		var optItem = {textName : "name", valueName : "code"};
		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy"; // 검색 URL
		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItem.minLength = 4; // 최소 검색 수
		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItem);
		
		// 등록사유
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WO_CREATE_REASON"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#reasonCodeModal",comboOptions, options);
			}
		);
		
		// Market
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MARKET_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#marketCdModal", comboOptions, options);
			}
		);
		
		// 작업지시유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"PRODUCT_ORDER_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#productOrderTypeModal",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// 설비(MOM_EQUIPMENT Table - equipmentCd)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderCreate.equipment.dummy", // 호출 URL
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#equipmentCdModal", {searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#equipmentCd", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// IN-LINE 간반사용여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inlineFlagModal", comboOptions, options);
			}
		);
		
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
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	setWorkOrderCreatePop : function(data) {
		data = data || {};
		
		$("#productOrderTypeModal").val(data.productOrderType || "WO");
		$("#itemIdModal").val(data.itemId || "");
		$("#resourceCdModal").val(data.resourceCd || "");
		$("#planQtyModal").val(data.planQty || ""); 
		$("#planStartTimeModal").val(data.planStartTime || get_date_diff(0)); 
		$("#reasonCodeModal").val(data.reasonCode || "");
		$("#outResourceNameModal").val(data.outResourceCd || ""); 
		$("#planDateModal").val(data.planDate || get_date_diff(0)); 
		$("#planEndTimeModal").val(data.planEndTime || "");
		$("#priorityModal").val(data.priority || "");
		$("#purchaseOrderModal").val(data.purchaseOrder || "");
		$("#customerLineCdModal").val(data.customerLineCd || "");
		$("#customerDueDateModal").val(data.customerDueDate || "");
		$("#modelSuffixModal").val(data.modelSuffix || "");
		$("#marketCdModal").val(data.marketCd || market);
		$("#descriptionModal").val(data.description || "");
		$("#equipmentCdModal").val(data.equipmentCd || "");
		$("#inlineFlagModal").val(data.inlineFlag || "N");
	},
	getWorkOrderCreatePop : function(type) {
		var selectItems = AUIGrid.getSelectedItems("grid");
		var strProductOrderId;
		
		if(type == 'U'){
			strProductOrderId = selectItems[0].item.productOrderId;
		}
		
		var result = {
			productOrderType : $("#productOrderTypeModal").val(),
			itemId : $("#itemIdModal").val(),
			resourceCd : $("#resourceCdModal").val(),
			planQty :  $("#planQtyModal").val(),
			planStartTime : $("#planStartTimeModal").val(),
			reasonCode : $("#reasonCodeModal").val(),
			outResourceCd : $("#outResourceNameModal").val(),
			planDate : $("#planDateModal").val(),
			planEndTime : $("#planEndTimeModal").val(),
			priority : $("#priorityModal").val(),
			purchaseOrder : $("#purchaseOrderModal").val(),
			modelSuffix : $("#modelSuffixModal").val(),
			customerDueDate : $("#customerDueDateModal").val(),
			customerLineCd : $("#customerLineCdModal").val(),
			marketCd : $("#marketCdModal").val(),
			description : $("#descriptionModal").val(),
			productOrderId : strProductOrderId,
			equipmentCd : $("#equipmentCdModal").val(),
			inlineFlag : $("#inlineFlagModal").val()
		}
		return result;
	},
	workOrderCheckBom : function(type) {
		var chk;
		var that = this;
		var param = {
			itemId :$("#itemIdModal").val()
		}

		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.workOrder.workOrderCreate.workOrderCheckBom.dummy",
			type : "GET",
			data : param,
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){	
				chk = data[0].cnt;
			},
			error: function(data){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:Language.lang['MESSAGES10821']});
				return;
			},
			fail : function(data){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:Language.lang['MESSAGES10821']});
				return;
			}
		});
		setTimeout(function() {
			if(chk < 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html:Language.lang['MESSAGES10018']});
				return;
			}
		}, 300);
		if(chk > 0) {
			that.createCallback(chk,type);
		}
	},
	createCallback : function(data, type){
		var that = this;
		var param = that.getWorkOrderCreatePop(type);
		if(data != null && data != ""){
			mom_ajax(type, 'workOrder.workOrderCreate.workOrderCreate', JSON.stringify(param), that.createCallbackPost);
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	createCallbackPost : function(result, data) {
		if(result == "SUCCESS"){
			$(".modal").micaModal("hide");
			mCommon.render('grid', 'W201807312104484761000cgnqXwXXH3l', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145",  html:Language.lang['MESSAGES10692']});
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMDA001;
		var arrayList = [];
		if(result == "SUCCESS"){
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ productOrderId : callbackParam[i].item.productOrderId 
					, priority : callbackParam[i].item.priority
					, confirmQty : callbackParam[i].item.confirmQty
					, marketCd : callbackParam[i].item.marketCd
					, workOrderId : callbackParam[i].item.productOrderId
					}
				);
			}
			
			mom_ajax('L', 'workOrder.workOrderCreate.confirmWorkOrderTemp', JSON.stringify(arrayList), that.listCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	delProductOrderCallback : function(result, data, param, callbackParam){
		var that = this.MOMDA001;
		var arrayList = [];
		if(result == "SUCCESS"){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : 'MOMDA001'
					, tableId : 'MOM_PRODUCT_ORDER'
					, colId1 : 'PRODUCT_ORDER_ID'
					, value1 : callbackParam[i].item.productOrderId 
					}
				);
			}
			
			mom_ajax('L', 'common.dataMultiDelTmp', JSON.stringify(arrayList), that.delProductListCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallback : function(result, data){
		var that = this.MOMDA001;
		if(result == "SUCCESS"){
			mom_ajax('C', 'workOrder.workOrderCreate.confirmWorkOrderProc', "{}", that.listCallbackPost);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	delProductListCallback : function(result, data){
		var that = this.MOMDA001;
		var parameters = {
			menuId : "MOMDA001"
			, tableId : "MOM_PRODUCT_ORDER"
		};
		if(result == "SUCCESS"){
			mom_ajax('C', 'common.commonMultiDelProc', JSON.stringify(parameters), that.listCallbackPost);
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
	delCallbackPost : function(result, data, param, callbackParam){
		if(result == "SUCCESS"){
			if(callbackParam == true) {
				micaCommon.messageBox({type:"success", width:"400", height: "145",  html:Language.lang['MESSAGES10692']});
				mCommon.render('grid', 'W201807312104484761000cgnqXwXXH3l', mCommon.formGetParam("#form"), function(){});
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
		if(result == "SUCCESS"){
			micaCommon.messageBox({type:"success", width:"400", height: "145",  html:Language.lang['MESSAGES10692']});
			mCommon.render('grid', 'W201807312104484761000cgnqXwXXH3l', mCommon.formGetParam("#form"), function(){});
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
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var that = this.MOMDA001;
		var param = [ {} ];
 		
		excel_upload(file, 'workOrder.workOrderCreate.workOrderCreate', 'MOMDA001', 'grid', JSON.stringify(param), gvThat.createCallbackPost);
		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMDA001.init();
});