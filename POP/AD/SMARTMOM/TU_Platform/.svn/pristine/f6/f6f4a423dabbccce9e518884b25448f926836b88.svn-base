var locationParam = mCommon.getSearchParam();
var vendorCd = sessionStorage.getItem("vendorCd");
var empAuthority  = sessionStorage.getItem("empAuthority");
var strTitle;
var depId;
var gvMenuId;
var gvTableId = "MOM_MATERIAL_DEPARTURE";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var reportUrl = "";
var endPeriod;
var strHearderDate;

var MOMCB002 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		
		if(locationParam.menuCode == "WGR"){
			gvMenuId = "MOMCC010";
		} else{
			gvMenuId = "MOMCB002";
		}
		
		// 파일업로드 팝업 사이즈 수정
		$("#popFileUpload #panel").css("width", "40%");
		$(".fileinput").css("min-width", "420px");
		
		Language.init(function() {
			mCommon.init("grid", "W201807261305450081000YPzivwuJBLr", null, function() {
				that.grid();
				that.fileInpuSet();
			}, Language);
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				// 팝업 내 그리드 사이즈 정의
				AUIGrid.setProp("auigrid", {showAutoNoDataMessage : false});
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			}, Language);	
		});
		
	}, grid: function() {
		var strHearderQty = Language.lang['MESSAGES11409'];
		strHearderDate = Language.lang['MESSAGES11413'];
		strTitle = Language.lang['MESSAGES11402'];
		
		if(locationParam.menuCode == "WGR"){
			strHearderQty = Language.lang['MESSAGES11035'];
			strHearderDate = Language.lang['MESSAGES11036'];
			strTitle = Language.lang['MESSAGES11033'];
			$("#searchDate").text(Language.lang['MESSAGES11036']);
			$("#deliveryPresentConditionList").text(Language.lang['MESSAGES11039']);
			$("#deliveryCBtn .textblock").text(Language.lang['MESSAGES11038']);
			AUIGrid.setColumnPropByDataField("grid", "departureQty", { headerText:strHearderQty });
			AUIGrid.setColumnPropByDataField("grid", "departureDate", { headerText:strHearderDate });
		}  else {
			var fileColumn = {"headerText":"File","dataField":"File","width":40,"visible":true,
					renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
					labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
						return '<div class="gridFileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
					}
				}
				
			AUIGrid.addColumn("grid", fileColumn, 17);
		}
		
		tuCommon.cellClick('grid');
		tuCommon.cellClick('auigrid', 'single');
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : gvMenuId},
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
			
			if(empAuthority <= 5 && vendorCd ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10570']});
				return;
			}
			
			var param = mCommon.formGetParam("#form");
			param.menuCode = locationParam.menuCode;
			mCommon.render("grid", "W201807261305450081000YPzivwuJBLr",  param, function(){});
		});
		
		// 출발처리취소 버튼
		$(document).on("click", "#deliveryCBtn", function(){
			var departureType;
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			
			if(locationParam.menuCode == "DEPT") {
				departureType = "D";
			} else {
				departureType = "W";
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.departureState == "CANCEL") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
				
				if(checkedItems[i].item.orderState == "CLOSED") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12230']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.departureDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10000' + '@' + strHearderDate + '@' + endPeriod)});
					return;
				}
			}
			
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10670']});
				return;
				
			} else {
				var option = {
					type:"info", 
					html:strTitle+Language.lang['MESSAGES11315'],
					width:"400", 
					height: "145",
					okButton:{
						text:"OK", 
						after:function(){
							var param = {
								menuId : gvMenuId
								, tableId : gvTableId
							};
							mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems);
						}
					}
				}
				micaCommon.messageBox(option);		
			}
		});

		if(locationParam.menuCode == "DEPT") {
			//File 버튼
			$(document).on("click", ".gridFileBtn", function() {
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
				var rowIndex = $(this).attr("row-index");
				var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
				depId = item.materialOrderId;
				$("#fileUpload").val("");
				
				var param = { 
							  entityName : 'MOMCB001',
							  entityId : depId
							  }
				
				mCommon.render("auigrid", "W2018082314330345610001wGOlkaGyFf", param, function(){
					$("#popFileUpload").micaModal("show");
				});		
			});
			
			//파일 다운로드 버튼
			$(document).on("click", "#fileDownBtn", function() {
				var items = AUIGrid.getCheckedRowItems("auigrid");
				for(var i = 0; i < items.length; i++) {
					attach_download(depId, 'MOMCB001', items[i].item.oldFileName);	
				}
			});
			
		}
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			$(this).closest(".modal").micaModal("hide");
						
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "DELIVERY_PRESENT_CONDITION_MOMCB002_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#departureNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#orderNo'), $('#findBtn'));
		
		// 명세표출력
		$(document).on("click", "#printBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var departureGroupIds = "";
			var cnt;

			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11343']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
//				if(checkedItems[i].item.departureState == "CANCEL" || checkedItems[i].item.departureState == "CHECK_FAIL") {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11461']});
//					return;
//				}
				
				if(i == 0) {
					departureGroupIds += "\'" + checkedItems[i].item.departureGroupId + "\'";
				} else {
					departureGroupIds += "\, \'" + checkedItems[i].item.departureGroupId + "\'";
				}
				
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.supplier.deliveryPresentCondition.deliveryPrintStatusCount.dummy",
					type : "GET",
					data : {departureGroupIds : departureGroupIds},
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
			}
			
			if(cnt <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11461']});
				return;
			}
			
			var departureGroupIdsUrl = departureGroupIds.replace("/'/gi","");
			
			var param1 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&excelId=MOMCB002";
			var param2 = "divisionCd="+ divisionCd + "&companyCd=" + companyCd + "&departureGroupIds=" + departureGroupIdsUrl + "&menuCode=" + locationParam.menuCode + "&excelId=MOMCB002&pId=MOMCB002";
			
			var jsonStr1 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?" + param1};
			var jsonStr2 = {"URL": "http://" + window.location.host + tuCommon.contextPath() + "/mom/request/com.thirautech.mom.purchase.supplier.deliveryPresentCondition.deliveryPrintStatus.dummy?" + param2};
			var jsonList = [];
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
//			document.location.href = reportUrl + JSON.stringify(jsonList);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),"_blank", "width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes");
			setTimeout(function (){
				new_popup.close();
			}, 500);
		});
		
	},
	comboBox : function(){
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		// 업체, 납품업체
		if(empAuthority > 5 || (empAuthority > 5 && vendorCd == "")){
			mCommon.comboBoxClickCall("#vendorName, #departureVendorName", function(callBack) {
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{attribute1 : 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#vendorName",comboOptions, options);
						micaCommon.comboBox.set("#departureVendorName",comboOptions, options);
						callBack();
					}
				);
			});
			
		}else if(empAuthority <= 5 && vendorCd != ""){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comGetVendor.dummy", // 호출 URL
				{vendorCd : vendorCd}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#vendorName",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: true});
					micaCommon.comboBox.set("#departureVendorName",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: true});
				}
			);
			$("#vendorName").jqxComboBox({disabled : true});
			$("#departureVendorName").jqxComboBox({disabled : true});
			
		}else if(empAuthority <= 5 && vendorCd ==""){
			$("#vendorName").val(Language.lang['MESSAGES10845']);
			$("#departureVendorName").val(Language.lang['MESSAGES10845']);
			$("#vendorName").jqxComboBox({disabled : true});
			$("#departureVendorName").jqxComboBox({disabled : true});
		}
		
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_ORDER_STATE", attribute1 : "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderState",comboOptions, options);
		});
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
		
		//Report 설치 URL 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				reportUrl = data[0].reportApplicationUrl;
			}
		);
	},
	listCallbackPost : function(result, data){
		var that = this.MOMCB002;
		if(result == "SUCCESS"){
			micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			var param = mCommon.formGetParam("#form");
			param.menuCode = locationParam.menuCode;
			mCommon.render("grid", "W201807261305450081000YPzivwuJBLr",  param, function(){});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
		micaCommon.splash.hide();
	},
	fileInpuSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	},
	tempInsertCallback : function(result, data, param, callbackParam){
		var that = this.MOMCB002;
		var arrayList = [];
		if(result == "SUCCESS"){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : gvMenuId
					, tableId : gvTableId
					, colId1 : 'MATERIAL_ORDER_ID'
					, value1 : callbackParam[i].item.materialOrderId
					, colId2 : 'MATERIAL_DEPARTURE_ID'
					, value2 : callbackParam[i].item.materialDepartureId
					, colId3 : 'DEPARTURE_STATE'
					, value3 : callbackParam[i].item.departureState
					, colId4 : 'CANCEL_QTY'
					, value4 : callbackParam[i].item.departureQty
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
	procListCallback : function(result, data){
		var that = this.MOMCB002;
		var parameters = {
			menuId : gvMenuId
			, tableId : gvTableId
		};
		if(result == "SUCCESS"){
			mom_ajax('C', 'purchase.supplier.deliveryPresentCondition.cancelMaterialDelivery', JSON.stringify(parameters), that.listCallbackPost);
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
};
$(document).ready(function(event){
	MOMCB002.init();
});