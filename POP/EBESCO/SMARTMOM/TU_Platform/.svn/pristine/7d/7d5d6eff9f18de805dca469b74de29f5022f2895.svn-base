var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");


var MOMIB001 = {
	init: function() {
		var that = this;
		console.time("show");
		mCommon.init("grid", "W201806271409484671000DIUlFGxQPU0", undefined, function() {
			that.grid();
			that.event();
			that.comboBox();
			that.fileInpuSet();
			mCommon.render("grid", "W201806271409484671000DIUlFGxQPU0", undefined, function() {
				console.timeEnd("show");
			});
		});
	}, grid: function() {
		editColumnSet("grid");
		function editColumnSet(grid) {// grid 아이디값을 받아 구분한다.
			// AUIGrid 세팅은 AUIGrid 홈페이지 Doc를 참고.

			// 기본적인 그리드 컬럼세팅을 해준다.
			var editColumn = {"headerText":"Edit","dataField":"Edit","width":40,"visible":true,
				renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
				labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
					// return 값으로 HTML을 입력해주면 된다.
					// class 명을 gridID + EditBtn 으로 구분했다.
					// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
					return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
				}
			}
			AUIGrid.addColumn(grid, editColumn, 0);
			
//			// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
//			var gridColumn = AUIGrid.getColumnLayout(grid);
//			// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다.
//			// reverse는 javascript array 기본 함수다.
//			gridColumn.reverse();
//			// 위에서 세팅된 editColumn 값을 넣어준다.
//			gridColumn.push(editColumn);
//			// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
//			gridColumn.reverse();
//			// 그리드의 변경된 정보를 바꿔준다.
//			AUIGrid.changeColumnLayout(grid, gridColumn);
			
			$("#pSaveBtn").attr("type", "U");
		}
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			
			mCommon.render("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData());
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			$("#pop").micaModal("show");
			that.setItemPop();
			$("#pSaveBtn").attr("type", "C");
			$("#itemId").attr("readonly", null);

		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
		
			if(confirm("삭제하시겠습니까?")) {
				
				for(var i = 0; i < checkedItems.length; i++){
					
					var param = {
						divisionCd : checkedItems[i].item.divisionCd,
						companyCd : checkedItems[i].item.companyCd,
						itemId : checkedItems[i].item.itemId
					}
					mom_ajax("D","reference.itemInfo.item.item", JSON.stringify(param));
				}
			}
			mCommon.render("grid", "W201806271409484671000DIUlFGxQPU0", that.getSearchData());
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "ITEM_MOMIB001"});
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			var type = $(this).attr("type");
			var param = that.getItemPop();
			if(param.itemId == null || param.itemId ==""){
				alert("품목ID를 입력 해 주세요.");
			}
			else if(param.itemName == null || param.itemName ==""){
				alert("품명을 입력 해 주세요.");
			}
			else if(param.vendorCd == null || param.vendorCd ==""){
				alert("업체를 입력 해 주세요.");
			}
			else if(param.itemType == null || param.itemType ==""){
				alert("유형을 입력 해 주세요.");
			}
			else if(param.activationFlag == null || param.activationFlag ==""){
				alert("단종유무를 입력 해 주세요.");
			}
			else{
			mom_ajax(type,"reference.itemInfo.item.item", JSON.stringify(param));
			$("#pop").micaModal("hide");
			mCommon.render("grid", "W201806271409484671000DIUlFGxQPU0");
			}
		});
		
		// Item 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1) { return; }

			// Item 모달창을 연다.
			$("#pop").micaModal("show");
			// Item 팝업의 값들을 세팅해준다.
			that.setItemPop(selectItems[0].item);
			// Item 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post
			$("#pSaveBtn").attr("type", "C");

			// 복사이고 생성하기 때문에 아이템이 입력가능하게 바꾼다.
			$("#itemId").attr("readonly", null);
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			// Item 모달창을 연다.
			$("#pop").micaModal("show");
			// Item 팝업의 값들을 세팅해준다.
			that.setItemPop(item);
			// Item 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#pSaveBtn").attr("type", "U");
			// 수정이기 때문에 itemId,수정자,수정시간이 입력불가능하게 바꾼다.
			$("#itemId, #updateBy, #updateDate").attr("readonly", "readonly");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
//			alert("");
			that.excelUpload();
		});
	},
	setItemPop: function(data) { 
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		$("#itemId").val(data.itemId || "");
		$("#pItemName").val(data.itemName || "");
		$("#pVendorName").val(data.vendorCd || "");
		$("#pItemType").val(data.itemType || "");
		$("#activationFlag").val(data.activationFlag || "");
		$("#testReportFlag").val(data.testReportFlag || "");
		$("#iqcFlag").val(data.iqcFlag || "");
		$("#oqcFlag").val(data.oqcFlag || "");
		$("#unit").val(data.unit || "");
		$("#unitQty").val(data.unitQty || "");
		$("#pDepartureVendorName").val(data.departureVendorCd || "");
		$("#pInLocationName").val(data.inLocationId || "");
		$("#pOutLocationName").val(data.outLocationId || "");
		$("#leadTime").val(data.leadTime || "");
		$("#maker").val(data.maker || "");
		$("#pSpecification").val(data.specification || "");
		$("#pUnitQty").val(data.unitQty || "");
		$("#moq").val(data.moq || "");
		$("#standardOutQty").val(data.standardOutQty || "");
		$("#safetyStockQty").val(data.safetyStockQty || "");
		$("#purchaseType").val(data.purchaseType || "");
		$("#itemCategory").val(data.itemCategory || "");
		$("#itemGroupLarge").val(data.itemGroupLarge || "");
		$("#itemGroupMedium").val(data.itemGroupMedium || "");
		$("#itemGroupSmall").val(data.itemGroupSmall || "");
		$("#trackingFlag").val(data.trackingFlag || "");
		$("#orderMethod").val(data.orderMethod || "");
		$("#pUseYn").val(data.useYn || "");
		$("#itemGrade").val(data.itemGrade || "");
		$("#badLevel").val(data.badLevel || "");
		$("#updateBy").val(data.updateBy || userId);
		$("#updateDate").val(data.updateDate || curr_date);
		$("#description").val(data.description || "");
		
		$("#updateUserName, #updateDate").attr("readonly","readonly");
	},
	getItemPop: function() {
		
		var result ={
				itemId: $("#itemId").val(),
				itemName: $("#pItemName").val(),
				vendorCd:$("#pVendorName").val(),
				itemType: $("#pItemType").val(),
				activationFlag: $("#activationFlag").val(),
				testReportFlag: $("#testReportFlag").val(),
				iqcFlag:$("#iqcFlag").val(),
				oqcFlag:$("#oqcFlag").val(),
				unit:$("#unit").val(),
				unitQty: $("#unitQty").val(),
				departureVendorCd: $("#pDepartureVendorName").val(),
				inLocationId: $("#pInLocationName").val(),
				outLocationId: $("#pOutLocationName").val(),
				leadTime: $("#leadTime").val(),
				maker: $("#maker").val(),
				specification: $("#pSpecification").val(),
				moq: $("#moq").val(),
				standardOutQty: $("#standardOutQty").val(),
				safetyStockQty: $("#safetyStockQty").val(),
				purchaseType: $("#purchaseType").val(),
				itemCategory: $("#itemCategory").val(),
				itemGroupLarge: $("#itemGroupLarge").val(),
				itemGroupMedium: $("#itemGroupMedium").val(),
				itemGroupSmall: $("#itemGroupSmall").val(),
				trackingFlag: $("#trackingFlag").val(),
				orderMethod: $("#orderMethod").val(),
				useYn: "Y",
				itemGrade: $("#itemGrade").val(),
				badLevel: $("badLevel").val(),
				description: $("#description").val(),
				createBy : userId,
				updateBy: userId,
				divisionCd: divisionCd,
				companyCd: companyCd
		}
		return result;
	},	
	getSearchData: function(){
		var param = {
				divisionCd: divisionCd,
				companyCd: companyCd,
				itemId : $("#itemName").val(),
				specification : $("#specification").val(),
				vendorCd : $("#vendorName").val(),
				departureVendorCd : $("#departureVendorName").val(),
				inLocationId : $("#inLocationName").val(),
				outLocationId : $("#outLocationName").val(),
				itemUserId : $("#itemUser").val(),
				itemType : $("#itemType").val(),
				useYn : $("#useYn").val(),
				startPage : "1",
				endPage : "100"
		}
		return param;
	},
	comboBox: function() {
		$.ajaxSetup({async: true});
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//입고창고, 출고창고
		mCommon.comboBoxClickCall("#inLocationName, #outLocationName, #pInLocationName, #pOutLocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd}, // 파라미터
					function(data) {
	
						options.local = data;
						micaCommon.comboBox.set("#inLocationName",comboOptions, options);
						micaCommon.comboBox.set("#outLocationName",comboOptions, options);
						micaCommon.comboBox.set("#pInLocationName",comboOptions, options);
						micaCommon.comboBox.set("#pOutLocationName",comboOptions, options);
						callBack();
				}
			);
		});
		//담당자
		mCommon.comboBoxClickCall("#itemUser, #pItemUser", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemUser",comboOptions, options);
						micaCommon.comboBox.set("#pItemUser",comboOptions, options);
						callBack();
				}
			);
		});
		//품목유형  
		mCommon.comboBoxClickCall("#itemType, #pItemType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"ITEM_TYPE"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemType",comboOptions, options);
						micaCommon.comboBox.set("#pItemType",comboOptions, options);
						callBack();
				}
			);
		});
		//사용유무, 단종유무, 성적서검사, 수입검사, 출하검사, 투입여부
		mCommon.comboBoxClickCall("#useYn, #activationFlag, #testReportFlag, #iqcFlag, #oqcFlag, #trackingFlag, #pUseYn, #leadTime", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"USE_FLAG"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#useYn",{selectedIndex:0, searchMode:'containsignorecase', autoComplete:true}, options);
						micaCommon.comboBox.set("#activationFlag",comboOptions, options);
						micaCommon.comboBox.set("#testReportFlag",comboOptions, options);
						micaCommon.comboBox.set("#iqcFlag",comboOptions, options);
						micaCommon.comboBox.set("#oqcFlag",comboOptions, options);
						micaCommon.comboBox.set("#trackingFlag",comboOptions, options);
						micaCommon.comboBox.set("#pUseYn",comboOptions, options);
						micaCommon.comboBox.set("#leadTime",comboOptions, options);
						callBack();
				}
			);
		});
		//단위
		mCommon.comboBoxClickCall("#unit", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"ITEM_UNIT"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#unit",comboOptions, options);
						callBack();
				}
			);
		});
		//구매기준
		mCommon.comboBoxClickCall("#purchaseType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"OFFER_FLAG"}, // 파라미터
					function(data) {
						options.local = data; 
						micaCommon.comboBox.set("#purchaseType",comboOptions, options);
						callBack();
				}
			);
		});
		//대그룹
		mCommon.comboBoxClickCall("#itemGroupLarge", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"MATERIAL_GROUP_LARGE"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemGroupLarge",comboOptions, options);
						callBack();
				}
			);
		});
		//중그룹
		mCommon.comboBoxClickCall("#itemGroupMedium", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"MATERIAL_GROUP_MEDIUM"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemGroupMedium",comboOptions, options);
						callBack();
				}
			);
		});
		//소그룹
		mCommon.comboBoxClickCall("#itemGroupSmall", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"MATERIAL_GROUP_SMALL"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemGroupSmall",comboOptions, options);
						callBack();
				}
			);
		});
		//발주방식
		mCommon.comboBoxClickCall("#orderMethod", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"ORDER_METHOD"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#orderMethod",comboOptions, options);
						callBack();
				}
			);
		});
		//관리등급
		mCommon.comboBoxClickCall("#itemGrade", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"ITEM_GRADE"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemGrade",comboOptions, options);
						callBack();
				}
			);
		});
		//불량Level
		mCommon.comboBoxClickCall("#badLevel", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd, codeClassId:"BAD_LEVEL"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#badLevel",comboOptions, options);
						callBack();
				}
			);
		})
		
		//업체, 납품업체
		mCommon.comboBoxClickCall("#vendorName, #pVendorName, #departureVendorName, #pDepartureVendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{divisionCd: divisionCd, companyCd: companyCd}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#vendorName",comboOptions, options);
						micaCommon.comboBox.set("#pVendorName",comboOptions, options);
						micaCommon.comboBox.set("#departureVendorName",comboOptions, options);
						micaCommon.comboBox.set("#pDepartureVendorName",comboOptions, options);
						callBack();
				}
			);
		});
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		excel_upload(file, 'reference.itemInfo.item.item', 'MOMIB001');		
		$("#uploadPop").micaModal("hide");
	}
};
$(document).ready(function(event){
	MOMIB001.init();
});