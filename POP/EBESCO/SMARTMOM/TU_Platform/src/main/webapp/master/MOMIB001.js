var userId = sessionStorage.getItem("userId");
var gvThat;

var MOMIB001 = {
	init: function() {		
		var that = this;
		gvThat = this;
		
		Language.init(function() {
			mCommon.init("grid", "W201806271409484671000DIUlFGxQPU0", null, function() {
				that.grid("grid");
				that.event();
				that.fileInpuSet();
				mCommon.gridPopCreat("grid", {colCount: 3, title: Language.lang['MESSAGES11577']});
				that.comboBox();
				$("#descriptionModal").height("30px");
				// 라벨 색상 변경
				$("#itemIdLabel, #itemNameLabel, #itemTypeLabel, #activationFlagLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#itemIdLabel, #itemNameLabel, #itemTypeLabel, #activationFlagLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);		
		});
	}, 
	grid: function(grid) {
		if(grid != '') {
			tuCommon.editColumnSet(grid);
		}
		
		AUIGrid.bind("grid", "cellClick", function(event) {
			if(event.dataField == 'attach1') {
				var selectedItem = AUIGrid.getItemByRowIndex("grid", event.rowIndex);
				item_download(selectedItem['itemId'], 'ATTACH1');
			} else if(event.dataField == 'attach2') {
				var selectedItem = AUIGrid.getItemByRowIndex("grid", event.rowIndex);
				item_download(selectedItem['itemId'], 'ATTACH2');
			}
			
			var rowId = event.item[AUIGrid.getProp(event.pid, "rowIdField")];
			
			if(AUIGrid.isCheckedRowById(event.pid, rowId)) {
				AUIGrid.addUncheckedRowsByIds(event.pid, rowId);
			} else {
				AUIGrid.addCheckedRowsByIds(event.pid, rowId);
			}
		});
		
		/*AUIGrid.setColumnPropByDataField('grid', 'attach1', {
			style:"columnStyle",
			labelFunction : function (rowIndex, columnIndex, value, item ) { 
				console.log('value = ' + value);
				if(value == undefined || value == '') {
					return '';
				}
				
				return '<div class="w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			},
			editRenderer : {
				type : "TemplateRenderer"
			}
		});*/

	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			// 2019.01.20 hyjeong begin
//			mCommon.render("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData(), function(){}, "reference.itemInfo.item.item");
			mCommon.pageRender("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData(), function(data){}, "reference.itemInfo.item.item");
			// 2019.01.20 hyjeong end
			
//			micaCommon.splash.show();
//			$.get('/TU_Platform/mom/request/com.thirautech.mom.reference.itemInfo.item.item.dummy', that.getSearchData(), 
//				function(data) {
//					if(data == undefined) {
//						return;
//					}
//					
//					AUIGrid.setColumnPropByDataField('grid', 'attach1', {
//						style:"columnStyle",
//						labelFunction : function(rowIndex, columnIndex, value, item) { 
//							if(value == undefined || value == '') {
//								return '';
//							}
//							
//							return '<div class="w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
//						},
//						renderer : {
//							type : "TemplateRenderer"
//						}
//					});					
//					
//					setTimeout(function() {
//						micaCommon.splash.hide();
//						AUIGrid.setGridData('grid', data);	
//					}, 10);
//				}
//			);
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#itemIdModal").attr("readonly", null);
			mCommon.gridPopAdd("grid");
			that.setItemPop();
			$("#updateByModal").val(userId);
			$("#updateDateModal").val(curr_date);
			
			$("#attach1Modal").parent().html('<input name="file1" id="file1" type="file" accept=".*" style="width:100%;">');
			$("#attach2Modal").parent().html('<input name="file2" id="file2" type="file" accept=".*" style="width:100%;">');
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var callbackChk = false;
			var arrayList = [];
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10664'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						micaCommon.splash.show();
						for(var i = 0; i < checkedItems.length; i++){
							arrayList.push(checkedItems[i].item);
							if(i == checkedItems.length - 1){
								callbackChk = true;
							}
						}
						mom_ajax("LD","reference.itemInfo.item.item", JSON.stringify(arrayList), that.callbackPost, callbackChk);
					}
				}});
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			// 2019.01.20 hyjeong begin
			/*mCommon.auiGridExcelExport("grid", {fileName: "ITEM_MOMIB001_" + get_current_date("yyyy-mm-dd")});*/
			var param = that.getSearchData();
			param.startPage = 1;
			param.endPage = 1000000;
			mCommon.getDataset("W201806271409484671000DIUlFGxQPU0/data", param, undefined, function(dataSet) {
				var data = dataSet;
				mCommon.auiGridExcelExport("grid", {fileName: "ITEM_MOMIB001_" + get_current_date("yyyy-mm-dd"), data: data});
			});
			// 2019.01.20 hyjeong end
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_MOMIB001_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#itemIdModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11592']});
				return;
			}
			
			if($("#itemNameModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11576']});
				return;
			}
			
			if($("#itemTypeModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10978']});
				return;
			}
			
			if($("#activationFlagModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10305']});
				return;
			}
			if($("#useYnModal").val() == '' ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					//버튼 type 세팅
					var param = that.getItemPop();
					mom_ajax(type, "reference.itemInfo.item.item", JSON.stringify(param), that.callbackPost , true);
				}
			}});
			
		});
		
		// Item 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			mCommon.gridPopAdd("grid");
			// Item 팝업의 값들을 세팅해준다.
			that.setItemPop(selectItems[0].item);
			// Item 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post
			$("#gridModalPopSaveBtn").attr("type", "C");

			// 복사이고 생성하기 때문에 아이템이 입력가능하게 바꾼다.
			$("#itemIdModal").attr("readonly", null);
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			// Item 모달창을 연다.
			// Item 팝업의 값들을 세팅해준다.
			// Item 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#gridModalPopSaveBtn").attr("type", "U");
			// 수정이기 때문에 itemId,수정자,수정시간이 입력불가능하게 바꾼다.
			$("#itemIdModal, #updateByModal, #updateDateModal").attr("readonly", "readonly");
			mCommon.gridPopAdd("grid");
			that.setItemPop(item);
			
			$("#attach1Modal").parent().html('<input name="file1" id="file1" type="file" accept=".*" style="width:100%;">');
			$("#attach2Modal").parent().html('<input name="file2" id="file2" type="file" accept=".*" style="width:100%;">');
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
			mCommon.gridPopHide("grid");
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#specification'), $('#findBtn'));
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		
		//업체, 납품업체
		mCommon.comboBoxClickCall("#vendorName, #vendorCdModal, #departureVendorName, #departureVendorCdModal", function(callBack) {
			var tempVal = $("#vendorCdModal").val();
			tempVal = tempVal == "Loading..." ? "" : tempVal;
			var tempDeVal = $("#departureVendorCdModal").val();
			tempDeVal = tempDeVal == "Loading..." ? "" : tempDeVal;
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {

					options.local = data;
					micaCommon.comboBox.set("#vendorName",comboOptions, options);
					micaCommon.comboBox.set("#vendorCdModal",{searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '200px'}, options);
					micaCommon.comboBox.set("#departureVendorName",comboOptions, options);
					micaCommon.comboBox.set("#departureVendorCdModal",{searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '200px'}, options);
					callBack();
					$("#vendorCdModal").val(tempVal);
					$("#departureVendorCdModal").val(tempDeVal);
				}
			);
		});
		
		//입고창고, 출고창고
		mCommon.comboBoxClickCall("#inLocationName, #outLocationName, #inLocationIdModal, #outLocationIdModal", function(callBack) {
			var tempVal = $("#inLocationIdModal").val();
			tempVal = tempVal == "Loading..." ? "" : tempVal;
			var tempDeVal = $("#outLocationIdModal").val();
			tempDeVal = tempDeVal == "Loading..." ? "" : tempDeVal;
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd : "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inLocationName",comboOptions, options);
					micaCommon.comboBox.set("#outLocationName",comboOptions, options);
					micaCommon.comboBox.set("#inLocationIdModal",{searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '150px'}, options);
					micaCommon.comboBox.set("#outLocationIdModal",{searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '150px'}, options);
					callBack();
					$("#inLocationIdModal").val(tempVal);
					$("#outLocationIdModal").val(tempDeVal);
				}
			);		
		});
		
		//담당자
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemUser",comboOptions, options);
				micaCommon.comboBox.set("#itemUserIdModal",comboOptions, options);					
			}
		);
		
		//품목유형 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType",comboOptions, options);
				micaCommon.comboBox.set("#itemTypeModal",comboOptions, options);
			}
		);
		
		//사용유무, 수입검사, 공정검사, 출하검사, BIN 사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYn",{searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
				micaCommon.comboBox.set("#useYnModal",comboOptions, options);
				micaCommon.comboBox.set("#iqcFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#pqcFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#oqcFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#otherReqFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#binUseFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#materialMeasureFlagModal",comboOptions, options);
			}
		);
		
		//단종유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"N_Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#activationFlagModal",comboOptions, options);
				micaCommon.comboBox.set("#isPhantomModal",comboOptions, options);
			}
		);
		
		//단위
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_UNIT"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#unitModal",comboOptions, options);
				micaCommon.comboBox.set("#conversionUnitModal",comboOptions, options);
			}
		);
		
		//발주방식
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ORDER_METHOD"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderMethodModal",comboOptions, options);
//				callBack();
			}
		);
		
		//관리등급
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_GRADE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGradeModal",comboOptions, options);
//				callBack();
			}
		);
		
		//매입/판매구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"FREE_OFFER_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#freeOfferFlagModal", comboOptions, options);
				micaCommon.comboBox.set("#salesFreeFlagModal", comboOptions, options);
			}
		);
		
		//대그룹 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"ITEM_GROUP_LARGE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGroupLargeModal",comboOptions, options);
			}
		);
		
		//중그룹 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"ITEM_GROUP_MEDIUM"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGroupMediumModal",comboOptions, options);
			}
		);
		
		//소그룹 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"ITEM_GROUP_SMALL"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemGroupSmallModal",comboOptions, options);
			}
		);
		
		//POP입력방식 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"POP_INPUT_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popInputTypeModal",comboOptions, options);
			}
		);
		
		//향지 		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"POP_DESTINATION"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popDestinationModal",comboOptions, options);
			}
		);
		
		//생산지
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"POP_MADEBY"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popMadebyModal",comboOptions, options);
			}
		);

		//제품라벨타입, 박스라벨타입, 파레트라벨타입, 간반라벨타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.itemInfo.item.itemPopLabel.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popGtLabelidModal",comboOptions, options);
				micaCommon.comboBox.set("#popCtLabelidModal",comboOptions, options);
				micaCommon.comboBox.set("#popPalletLabelidModal",comboOptions, options);
				micaCommon.comboBox.set("#popGanbanLabelidModal",comboOptions, options);
			}
		);
		
		//향지
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"DESTINATION"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popDestinationModal",comboOptions, options);
			}
		);
		
		//생산지
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{ codeClassId:"MADEBY"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#popMadebyModal",comboOptions, options);
			}
		);
		
		//신규등록여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#createItemFlag",comboOptions, options);
			}
		);
		
		//인치
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"INCH"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inchModal",comboOptions, options);
			}
		);
		
		//ORG CODE
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.b2biOrgSetup.b2biOrgCode.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orgCode",comboOptions, options);
				micaCommon.comboBox.set("#orgCodeModal",comboOptions, options);
			}
		);
	},
	setItemPop: function(data) { 
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		$("#itemIdModal").val(data.itemId || "");
		$("#itemNameModal").val(data.itemName || "");
		$("#itemTypeModal").val(data.itemType || "");
		$("#activationFlagModal").val(data.activationFlag || "N");
		$("#iqcFlagModal").val(data.iqcFlag || "N");
		$("#pqcFlagModal").val(data.pqcFlag || "N");
		$("#oqcFlagModal").val(data.oqcFlag || "N");
		$("#unitModal").val(data.unit || "");
		$("#unitQtyModal").val(data.unitQty || "");
		$("#unitWeightModal").val(data.unitWeight || "");
		
		if($("#departureVendorCdModal").jqxComboBox('getItemByValue', data.departureVendorCd) == null && data.departureVendorCd != null){
			$("#departureVendorCdModal").jqxComboBox('addItem', { label: data.departureVendorCd + "(" + data.departureVendorName + ")", value: data.departureVendorCd} ); 
		}
		if($("#vendorCdModal").jqxComboBox('getItemByValue', data.vendorCd) == null && data.vendorCd != null){
			$("#vendorCdModal").jqxComboBox('addItem', { label: data.vendorCd + "(" + data.vendorName + ")", value: data.vendorCd} ); 
		}
		$("#departureVendorCdModal").val(data.departureVendorCd || "");
		$("#vendorCdModal").val(data.vendorCd || "");

		if($("#inLocationIdModal").jqxComboBox('getItemByValue', data.inLocationId) == null && data.inLocationId != null){
			$("#inLocationIdModal").jqxComboBox('addItem', { label: data.inLocationId + "(" + data.inLocationName + ")", value: data.inLocationId} ); 
		}
		if($("#outLocationIdModal").jqxComboBox('getItemByValue', data.outLocationId) == null && data.outLocationId != null){
			$("#outLocationIdModal").jqxComboBox('addItem', { label: data.outLocationId + "(" + data.outLocationName + ")", value: data.outLocationId} ); 
		}
		$("#inLocationIdModal").val(data.inLocationId || "");
		$("#outLocationIdModal").val(data.outLocationId || "");
		
		$("#leadTimeModal").val(data.leadTime || "");
		$("#specificationModal").val(data.specification || "");
		$("#punitQtyModal").val(data.unitQty || "");
		$("#moqModal").val(data.moq || "");
		$("#standardOutQtyModal").val(data.standardOutQty || "");
		$("#safetyStockQtyModal").val(data.safetyStockQty || "");
		$("#itemCategory").val(data.itemCategory || "");
		$("#orderMethodModal").val(data.orderMethod || "");
		$("#useYnModal").val(data.useYn || "Y");
		$("#itemGradeModal").val(data.itemGrade || "");
		$("#itemUserIdModal").val(data.itemUserId || "")
		$("#updateByModal").val(data.updateByName || userId);
		$("#updateDateModal").val(data.updateDate || curr_date);
		$("#descriptionModal").val(data.description || "");
		$("#freeOfferFlagModal").val(data.freeOfferFlag || "N");
		$("#conversionUnitQtyModal").val(data.conversionUnitQty || "");
		$("#conversionUnitModal").val(data.conversionUnit || "");
		$("#itemGroupLargeModal").val(data.itemGroupLarge || "");
		$("#itemGroupMediumModal").val(data.itemGroupMedium || "");
		$("#itemGroupSmallModal").val(data.itemGroupSmall || "");
		$("#toolModal").val(data.tool || "");
		$("#pressLineModal").val(data.pressLine || "");
		$("#rpItemIdModal").val(data.rpItemId || "");
		$("#preBuildTermModal").val(data.preBuildTerm || "");
		$("#itemGroupCodeModal").val(data.itemGroupCode || "");
		$("#salesFreeFlagModal").val(data.salesFreeFlag || "N");
		$("#popMakeLotQtyModal").val(data.popMakeLotQty || "");
		$("#popInputTypeModal").val(data.popInputType || "");
		$("#popCtQtyModal").val(data.popCtQty || "");
		$("#popGtLabelidModal").val(data.popGtLabelid || "");
		$("#popCtLabelidModal").val(data.popCtLabelid || "");
		$("#popPalletLabelidModal").val(data.popPalletLabelid || "");
		$("#popEanModal").val(data.popEan || "");
		$("#popUpcModal").val(data.popUpc || "");
		$("#popDestinationModal").val(data.popDestination || "");
		$("#popMadebyModal").val(data.popMadeby || "");
		$("#popGanbanLabelidModal").val(data.popGanbanLabelid || "");
		$("#labeldescModal").val(data.labeldesc || "");
		$("#labelspecModal").val(data.labelspec || "");
		$("#binUseFlagModal").val(data.binUseFlag || "");
		$("#ctOutQtyModal").val(data.ctOutQty || "");
		$("#inchModal").val(data.inch || "");
		$("#materialTypeModal").val(data.materialType || "");
		$("#colorModal").val(data.color || "");
		$("#pressItemIdModal").val(data.pressItemId || "");
		$("#otherReqFlagModal").val(data.otherReqFlag || "N");
		$("#orgCodeModal").val(data.orgCode || "");
		$("#materialMeasureFlagModal").val(data.materialMeasureFlag || "");
		
		$("#updateByModal, #updateDateModal").attr("readonly","readonly");
	},
	getItemPop: function() {
		
		var result ={
				itemId: $("#itemIdModal").val(),
				itemName: $("#itemNameModal").val(),
				vendorCd:$("#vendorCdModal").val(),
				itemType: $("#itemTypeModal").val(),
				activationFlag: $("#activationFlagModal").val(),
				iqcFlag:$("#iqcFlagModal").val(),
				pqcFlag:$("#pqcFlagModal").val(),
				oqcFlag:$("#oqcFlagModal").val(),
				unit:$("#unitModal").val(),
				unitQty: $("#unitQtyModal").val(),
				unitWeight: $("#unitWeightModal").val(),
				departureVendorCd: $("#departureVendorCdModal").val(),
				inLocationId: $("#inLocationIdModal").val(),
				outLocationId: $("#outLocationIdModal").val(),
				leadTime: $("#leadTimeModal").val(),
				specification: $("#specificationModal").val(),
				moq: $("#moqModal").val(),
				standardOutQty: $("#standardOutQtyModal").val(),
				safetyStockQty: $("#safetyStockQtyModal").val(),
				itemCategory: $("#itemCategory").val(),
				orderMethod: $("#orderMethodModal").val(),
				useYn: $("#useYnModal").val(),
				itemGrade: $("#itemGradeModal").val(),
				itemUserId : $("#itemUserIdModal").val(),
				description: $("#descriptionModal").val(),
				freeOfferFlag: $("#freeOfferFlagModal").val(),
				conversionUnitQty: $("#conversionUnitQtyModal").val(),
				conversionUnit : $("#conversionUnitModal").val(),
				itemGroupLarge : $("#itemGroupLargeModal").val(),
				itemGroupMedium : $("#itemGroupMediumModal").val(),
				itemGroupSmall : $("#itemGroupSmallModal").val(),
				tool : $("#toolModal").val(),
				rpItemId : $("#rpItemIdModal").val(),
				pressLine : $("#pressLineModal").val(),
				preBuildTerm :  $("#preBuildTermModal").val(),
				itemGroupCode : $("#itemGroupCodeModal").val(),
				salesFreeFlag : $("#salesFreeFlagModal").val(),
				popMakeLotQty : $("#popMakeLotQtyModal").val(),
				popInputType : $("#popInputTypeModal").val(),
				popCtQty :$("#popCtQtyModal").val(),
				popGtLabelid : $("#popGtLabelidModal").val(),
				popCtLabelid : $("#popCtLabelidModal").val(),
				popPalletLabelid : $("#popPalletLabelidModal").val(),
				popEan : $("#popEanModal").val(),
				popUpc : $("#popUpcModal").val(),
				popDestination : $("#popDestinationModal").val(),
				popMadeby : $("#popMadebyModal").val(),
				popGanbanLabelid : $("#popGanbanLabelidModal").val(),
				labeldesc : $("#labeldescModal").val(),
				labelspec : $("#labelspecModal").val(),
				binUseFlag : $("#binUseFlagModal").val(),
				ctOutQty : $("#ctOutQtyModal").val(),
				inch : $("#inchModal").val(),
				materialType : $("#materialTypeModal").val(),
				color : $("#colorModal").val(),
				pressItemId : $("#pressItemIdModal").val(),
				otherReqFlag : $("#otherReqFlagModal").val(),
				orgCode : $("#orgCodeModal").val(),
				materialMeasureFlag : $("#materialMeasureFlagModal").val()
		}
		return result;
	},	
	getSearchData: function(){
		var param = {
				itemId : $("#itemName").val(),
				specification : $("#specification").val(),
				vendorCd : $("#vendorName").val(),
				departureVendorCd : $("#departureVendorName").val(),
				inLocationId : $("#inLocationName").val(),
				outLocationId : $("#outLocationName").val(),
				itemUserId : $("#itemUser").val(),
				itemType : $("#itemType").val(),
				useYn : $("#useYn").val(),
				createItemFlag : $("#createItemFlag").val(),
				orgCode : $("#orgCode").val()
		}
		return param;
	},
	callbackPost : function(result, data, param, callbackParam){
		var that = this.MOMIB001;
		if(result == "SUCCESS") {
			if(callbackParam == true || callbackParam == undefined) {
				if($("#file1").val() == undefined) {
	               $(".modal").micaModal("hide");
	               
	               mCommon.pageRender("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData(), function(data){
	                  micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
	               }, "reference.itemInfo.item.item");
	               
	               that.grid();
	               return;
	            }
				var params = {'key' : 'ATTACH1', 'itemId' : data.itemId};	
				file_upload(file1, 'reference.itemInfo.item.file', JSON.stringify(params), 'file1', that.callbackPost);
			} else if(callbackParam == 'file1') {
				var params = {'key' : 'ATTACH2', 'itemId' : data.itemId};					
				file_upload(file2, 'reference.itemInfo.item.file', JSON.stringify(params), 'file2', that.callbackPost);
			} else if(callbackParam == 'file2') {
				$(".modal").micaModal("hide");
				
				mCommon.pageRender("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData(), function(data){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				}, "reference.itemInfo.item.item");
				
				that.grid();
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
		}
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
 		
 		//excel_upload(file, 'reference.itemInfo.item.item', 'MOMIB001', JSON.stringify(param));	
 		excel_upload(file, 'reference.itemInfo.item.item', 'MOMIB001', 'grid', JSON.stringify(param), gvThat.callbackPost);
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIB001.init();
});