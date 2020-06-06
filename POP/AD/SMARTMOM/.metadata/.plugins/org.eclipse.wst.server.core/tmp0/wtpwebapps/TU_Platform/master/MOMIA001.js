var userId = sessionStorage.getItem("userId");
var companyCd = sessionStorage.getItem("companyCd");
var MOMIA001 = {
	init : function() {
		var that = this;
		Language.init(function() {
			mCommon.init("facilityGrid", "W201807041836240671000n8P5sRsbfMM", undefined, function() {
				console.time("그리드 콜백 실행");
				that.grid("facilityGrid");
				mCommon.gridPopCreat("facilityGrid", {colCount : 2, title : Language.lang['MESSAGES10199']});
				that.comboBox();
				that.event();
				// 라벨 색상 변경
				$("#facilityClassCdLabel, #parentFacilityCdLabel, #facilityCdLabel, #facilityTypeLabel, #facilityNameLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#facilityClassCdLabel, #parentFacilityCdLabel, #facilityCdLabel, #facilityTypeLabel, #facilityNameLabel, #useYnLabel").find(".textblock").addClass("orange");
				console.timeEnd("그리드 콜백 실행");
			}, Language);
		});
	}, 
	grid : function(grid) {
		var that = this; // MOMIA001 내부 변수 사용을 위해서 선언.
		
		// 공장관리 그리드 컬럼 Edit 설정 
		tuCommon.editColumnSet(grid);
//		widget_ajax('MOMIA001', $('head'), grid, 'init');
		tuCommon.cellClick(grid);
		
		var labelFunction = function(rowIndex, columnIndex, value, headerText, item, dataField) {
			return value.replace(/ /gi, "&nbsp;");
		}
		
		var colLayout = AUIGrid.getColumnLayout("facilityGrid");
		var colIndex = AUIGrid.getColumnIndexByDataField("facilityGrid", "facilityName2");
		if(colIndex != -1) {
			var col = colLayout[colIndex];
			col.labelFunction = labelFunction;
			col.renderer = {type: "TemplateRenderer"};
			AUIGrid.setColumnProp( "facilityGrid", colIndex, col );
		}
		
		AUIGrid.destroy("facilityGrid");
		AUIGrid.create("facilityGrid", colLayout, mCommon.datasets.facilityGrid.setting.gridProps);
		AUIGrid.setGridData("facilityGrid", []);
		
	}, 
	event : function() {
		var that = this; // MOMIA001 내부 변수 사용을 위해서 선언.
		
		$("#panel").draggable({
            handle : "#panel"
        });
		
		// 공장관리 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".facilityGridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("facilityGrid", rowIndex);
			// 공장관리 팝업의 값들을 세팅해준다.
			// 설비군 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#facilityGridModalPopSaveBtn").attr("type", "U");
			mCommon.gridPopAdd("facilityGrid");
			that.setFacilityPop(item);
			// 수정이기 때문에 시설코드가 입력불가능하게 바꾼다.
			$("#facilityCdModal").attr("readonly", "readonly");
		});
		
		//공장관리 조회
		$(document).on("click", "#findBtn", function() {
			// 공장관리 검색조건 데이터를 모아서 준다.
			//검색조건 파라미터 가지고 그리드를 그린다.
			mCommon.render("facilityGrid", "W201807041836240671000n8P5sRsbfMM", 
					 mCommon.formGetParam("#form"), function() {
//				widget_ajax('MOMIA001', $('head'), 'facilityGrid', 'reload');
			});
		});
		
		//공장관리 팝업
		$(document).on("click", "#createBtn", function() {
			$("#facilityGridModalPopSaveBtn").attr("type", "C");
			$("#facilityCdModal").attr("readonly", null);
			mCommon.gridPopAdd("facilityGrid");
			that.setFacilityPop();
		});
		
		//공장관리 팝업 저장
		$(document).on("click", "#facilityGridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			var vendorType = "";
			if($("#vendorCdModal").val() != ''){
				vendorType = that.getVendorType();
			}
			
			if($("#facilityClassCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10775']});
				return;
			}
			
			if($("#parentFacilityCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10598']});
				return;
			}
			
			if($("#facilityCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10781']});
				return;
			}
			
			if($("#facilityNameModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10777']});
				return;
			}
			
			if($("#useYnModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10565']});
				return;
			}
			
			if($("#facilityTypeModal").val() != "FAC200") {
				if($("#freeOfferFlagModal").val() != ''){
					micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10770']});
					return;
				}
			}  
			
//			if ($("#facilityTypeModal").val() != "FAC300" && $("#facilityTypeModal").val() != "FAC400") {
//				if($("#inventoryUseFlagModal").val() == "Y") {
//					micaCommon.messageBox({type : "warning", width : "400", height : "145", html : "수요차감은 생산팀 또는 영업팀창고일 경우에만 가능합니다."});
//					return;
//				}
//			}
//			
//			if ($("#facilityTypeModal").val() != "FAC300" && $("#facilityTypeModal").val() != "FAC500") {
//				if($("#stockUseFlagModal").val() == "Y") {
//					micaCommon.messageBox({type : "warning", width : "400", height : "145", html : "공정차감은 생산팀 또는 외주창고일 경우에만 가능합니다."});
//					return;
//				}
//			}
			
//			if(type == "C") {
//				if(companyCd != 'FAKR' && companyCd != 'FAKP') { //임시코드. 추후 수정 예정
//					if($("#facilityTypeModal").val() == 'FAC100') {
//						var valid = that.getFacilityClassCd();
//						if(valid > 0) {
//							micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12101']});
//							return;
//						}
//					}
//				}
//			}
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text:"Close"}, okButton : {text:"OK", 
				after : function() {
					var param = that.getFacilityPop();
					mom_ajax(type, "reference.resource.factory.factory", JSON.stringify(param), that.callbackPost);
				}
			}});
			
		});
		
		//공장관리 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			$("#facilityCdModal").attr("readonly", false);
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("facilityGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length > 1 || selectItems.length < 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}

			mCommon.gridPopAdd("facilityGrid");
			// 공장관리 팝업의 값들을 세팅해준다.
			that.setFacilityPop(selectItems[0].item);
			// 공장관리 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post
			$("#facilityCdModal").attr("readonly", null);
			$("#facilityGridModalPopSaveBtn").attr("type", "C");
		});
		
		
		//공장관리 삭제
		$(document).on("click", "#delBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("facilityGrid");
			// 삭제 시 하위 시설 존재하는 지 체크
			that.delFacilityCounting();
			var arrayList = [];
			if(selectItems.length > 0) {
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10654'], closeButton : {text:"Close"}, okButton : {text:"OK", 
					after : function() {
						for(var i = 0; i < selectItems.length; i++) {
							// type과 param값을 cud 함수로 넘겨서 생성, 수정, 삭제를 해준다.
							arrayList.push(selectItems[i].item);
						}
						mom_ajax("LD", "reference.resource.factory.factory", JSON.stringify(arrayList), that.callbackPost);
					}
				}});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
			}
		});
		
		//공장관리 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {			
			mCommon.auiGridExcelExport("facilityGrid", {fileName : "FACILITY_MOMIA001_" + get_current_date("yyyy-mm-dd")});
		});
		
		
		$(document).on("change", "#facilityCdModal", function() {	
			that.getBinList();
		});
		
		//bin클릭시 
		$(document).on("click", "#binIdModal", function() {
			if($("#facilityCdModal").val() == ''){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES11888']});
				return;
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#facilityName'), $('#findBtn'));
		
	},
	comboBox : function() {
		var comboOptions = {searchMode : 'containsignorecase', autoComplete : true};
		var options = {local : "", textName : "name", valueName : "code", readonly : false};

		// 시설군
		mCommon.comboBoxClickCall("#facilityClassName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{codeClassId : "FACILITY_CLASS_ID"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#facilityClassName", comboOptions, options);
						callBack();
					}
			);
		});
		
		//시설군(등록 팝업)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "FACILITY_CLASS_ID", attribute : "Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#facilityClassCdModal", comboOptions, options);
				}
		);
		
		//상위시설
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#parentFacilityCdModal", comboOptions, options);
				}
		);
		
		//시설구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "FACILITY_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#facilityTypeModal", comboOptions, options);
				}
		);
		
		// 업체
		mCommon.comboBoxClickCall("#vendorCdModal", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorCdModal", comboOptions, options);
					callBack();
				}
			);
		});

		// 재고 마감 여부		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "USE_FLAG"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inventoryUseFlagModal", comboOptions, options);
					micaCommon.comboBox.set("#stockUseFlagModal", comboOptions, options);
					micaCommon.comboBox.set("#materialStockFlagModal", comboOptions, options);
					micaCommon.comboBox.set("#useYnModal", comboOptions, options);
				}
		);
		
		// 유무상구분		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "FREE_OFFER"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#freeOfferFlagModal", comboOptions, options);
				}
		);
		
		// 폐기창고여부		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "Y_N"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#scrapLocationFlagModal", comboOptions, options);
					micaCommon.comboBox.set("#transferTargetFlagModal", comboOptions, options);
				}
		);
		
		// 시설구분		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "FACILITY_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inFacilityType", comboOptions, options);
				}
		);
		
		
	},
	setFacilityPop : function(data) { // data가 비었으면 초기화.
		var that = this;
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		if(data.facilityName2 != undefined) {
			var facilityName2 = $.trim(data.facilityName2.replace('┖', ''));
		}
		
		// 시설군 값을 설정해준다. null이면 빈값으로 초기화.
		$("#facilityClassCdModal").val(data.facilityClassCd || "");
		// 상위시설 값을 설정해준다.
		$("#parentFacilityCdModal").val(data.parentFacilityCd || "");
		// 시설코드 값을 설정해준다.
		$("#facilityCdModal").val(data.facilityCd || "");
		// 시설명 값을 설정해준다.
		$("#facilityNameModal").val(data.facilityName || facilityName2 || "");
		// 시설구분 값을 설정해준다.
		$("#facilityTypeModal").val(data.facilityType || "");
		// 순서 값을 설정해준다.
		$("#facilitySeqModal").val(data.facilitySeq || "");
		// 업체 값을 설정해준다.
		$("#vendorCdModal").val(data.vendorCd || "");
		// 재고차감 값을 설정해준다.
		$("#stockUseFlagModal").val(data.stockUseFlag || "N");
		// 수요차감 값을 설정해준다.
		$("#inventoryUseFlagModal").val(data.inventoryUseFlag || "N");
		// 자재차감 값을 설정해준다.
		$("#materialStockFlagModal").val(data.materialStockFlag || "N");
		//유무상구분
		$("#freeOfferFlagModal").val(data.freeOfferFlag || "");
		//폐기창고여부
		$("#scrapLocationFlagModal").val(data.scrapLocationFlag || "N");
		//BIN
		$("#binIdModal").val(data.binId || "");
		//I/F전송대상여부
		$("#transferTargetFlagModal").val(data.transferTargetFlag || "N");
		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#updateByModal").val(data.updateBy || userId);
		$("#updateDateModal").val(data.updateDate || get_current_date());
		$("#useYnModal").val(data.useYn	|| "Y");
		$("#updateByModal, #updateDateModal").attr("readonly","readonly");
		//시설설명 값을 설정해준다.
		$("#descriptionModal").val(data.description || "");
		that.getBinList(data.binId);
	},
	getFacilityPop : function() {
		var result = {
			facilityCd : $("#facilityCdModal").val(),
			parentFacilityCd : $("#parentFacilityCdModal").val(),
			facilityLevel : "1",
			facilitySeq : $("#facilitySeqModal").val(),
			facilityName : $("#facilityNameModal").val(),
			facilityClassCd : $("#facilityClassCdModal").val(),
			facilityType : $("#facilityTypeModal").val(),
			description : $("#descriptionModal").val(),
			vendorCd : $("#vendorCdModal").val(),
			inventoryUseFlag : $("#inventoryUseFlagModal").val(),
			materialStockFlag : $("#materialStockFlagModal").val(),
			useYn : $("#useYnModal").val(),
			freeOfferFlag : $("#freeOfferFlagModal").val(),
			stockUseFlag : $("#stockUseFlagModal").val(),
			scrapLocationFlag : $("#scrapLocationFlagModal").val(),
			binId : $("#binIdModal").val(),
			transferTargetFlag : $("#transferTargetFlagModal").val()
		}
		return result;
	},
	callbackPost : function(result, data, param) {
		var that = this.MOMIA001;
		if(result == 'SUCCESS') {
			mCommon.render("facilityGrid", "W201807041836240671000n8P5sRsbfMM", mCommon.formGetParam("#form"), function() {
				that.comboBox();
				micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});
				$("#facilityGridModalPop").micaModal("hide");
			});
		}else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	getVendorType : function() {
		var vendorCd = $("#vendorCdModal").val();
		var vendorType = "";
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendorType.dummy",
			type : "GET",
			async: false,
			data : {vendorCd : vendorCd},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				vendorType = data[0].vendorType;
			}
		});
		return vendorType;
	},
	getBinList : function(binId) {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.resource.factory.bin.dummy',  {locationCd : $("#facilityCdModal").val()}, function(data){
			if(data.length > 0) {
				if(binId == null) {
					$("#binIdModal").jqxComboBox({disabled: false});
					micaCommon.comboBox.set("#binIdModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "binId", valueName : "binId", readonly: false});
				} else {
					$("#binIdModal").jqxComboBox({disabled: false});
					micaCommon.comboBox.set("#binIdModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "binId", valueName : "binId", readonly: false});
					$("#binIdModal").val(binId);
				}
				
			} else {
				$("#binIdModal").val("");
				$("#binIdModal").jqxComboBox("clearSelection");
				$("#binIdModal").jqxComboBox({disabled: true});
			}
		});
	},
	getFacilityClassCd : function() {
		var cnt = 0;
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy",
			type : "GET",
			async: false,
			data : {facilityType : 'FAC100'},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				cnt = data.length;
			}
		});
		return cnt;
	},
	delFacilityCounting : function() {
		var checkedItems = AUIGrid.getCheckedRowItems("facilityGrid");
		
		for(var i=0; i<checkedItems.length; i++) {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.factory.delCountFacility.dummy",
				type : "GET",
				async: false,
				data : {facilityCd : checkedItems[i].item.facilityCd},
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					setTimeout(function() {
						if(data[0].cnt > 0) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES12105']});
							return;
						}
					}, 100);
				}
			});
		}
	}
};
$(document).ready(function(event){
	MOMIA001.init();
});