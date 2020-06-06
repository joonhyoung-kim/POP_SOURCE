var facilityType;
var endPeriod;

var MOMCC001 = {
	init: function() {
		var that = this;
			
		Language.init(function() {
			mCommon.init("grid1", "W201807261515076941000NYWEYL7JTRM", null, function() {
				mCommon.init("grid2", "W201808281656408471000MLkh2qebjMn", null, function() {
					that.grid();
					that.design();
					that.comboBox();
					that.event();
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".h03-h", "horizontal", "50%");
	}, grid: function() {
		AUIGrid.setColumnPropByDataField( "grid2", "deliveryDate", {
			style:"columnStyle",
			dataType : "date",
			editRenderer : {
				 type : "CalendarRenderer",
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMCC001"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
				        if(event.dataField == "deliveryDate") { // 달력 지정한 필드인 경우 
				        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
				        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
				                return event.oldValue; 
				        	} else {
				        		return to_date_yyyy_mm_dd(event.value); 
			                } 
				        }
				        
				        //입고량 수정시 환산수량 변경
				        if(event.dataField == "inputQty") {
							var conversionUnitQty = event.value * event.item.originConversionUnitQty;
							AUIGrid.setCellValue("grid2", event.rowIndex, "conversionUnitQty", conversionUnitQty);
						}
				        
				        return event.value; 
					}); 
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		 AUIGrid.setSelectionMode("grid2", "singleCell");
		 AUIGrid.setColumnPropByDataField( "grid2", "description", { style:"columnStyle" } );
		 AUIGrid.setColumnPropByDataField( "grid2", "conversionUnitQty", { style:"columnStyle" } );
		 
		 tuCommon.cellClick('grid1');
		 tuCommon.cellClick('grid2');
		 
		 // 2018.08.12 hyjeong begin, dynamic cell control
		 AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
			 var item = AUIGrid.getGridData('grid2');
			 if(item[e.rowIndex].departureFlag != 'N' || item[e.rowIndex].iqcFlag != 'N') {
				 if(e.dataField == "inputQty") {
					 return false;
				 }
				 return true;
			 }
			 AUIGrid.setProp('grid2', 'exportURL', '0');
		});
		// 2018.08.12 hyjeong end
		 
		 AUIGrid.bind('grid2', 'cellEditEnd', function(e) {
			 if(e.dataField == "locationCd") {
				 var grid2length = AUIGrid.getGridData("grid2").length;
				 var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
				 for(var i = e.rowIndex + 1; i < grid2length; i++) {
					 AUIGrid.setCellValue("grid2", i, "locationCd", item.locationCd);
				 }
			 }
			 AUIGrid.setProp('grid2', 'exportURL', '0');
		});
		 
	}, event: function() {
		var that = this;
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		
		// 조회버튼
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
			
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201807261515076941000NYWEYL7JTRM",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_INPUT_MOMCC001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			for(var i = 0; i  < checkedItems.length; i++) {
				// 발주구분이 자재발주일 경우
				if(checkedItems[i].item.orderFlag == "M") {
					facilityType = "'FAC200'";
				} 
				// 발주구분이 외주발주일 경우
				else if(checkedItems[i].item.orderFlag == "P") {
					facilityType = "'FAC300'";
				}
			}
			
			// 하단 버튼 옆 입고창고 리스트 
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd : "AREA", facilityType : facilityType}, // 파라미터
				function(data) {
					options.local = data;
					comboOptions.height = 19;
					micaCommon.comboBox.set("#toLocation", comboOptions, options);
				}
			);
			
			// 하단 입고창고 리스트 세팅
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy",
				type : "GET",
				async: false,
				data : {facilityClassCd : "AREA", facilityType : facilityType},
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "grid2", "locationCd", {
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
							showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 보이기
							list : data, 
							keyField : "code", 
							valueField : "name" 							
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11179']});
				return;
			}
			
			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			//상단 그리드에서 체크한 데이터의 업체가 다르면 추가 못하도록 메시지 처리
			for(var i = 0; i  < checkedItems.length; i++) {
				if(i < checkedItems.length - 1) {
					if(checkedItems[i].item.vendorCd != checkedItems[i+1].item.vendorCd) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10641']});
						return;
					} 
				} 
			}
			for(var i = 0; i  < checkedItems.length; i++){
				var item  = checkedItems[i].item;
				var chk = true;
				
				//하단 그리드에 추가된 데이터의 업체와 상단 그리드에서 추가할 업체가 다르면 메시지 처리
				for(var j = 0; j < grid2Items.length; j++){
					if(item.vendorCd != grid2Items[j].vendorCd){
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10340']});
						return;
					}
					
					// 발주번호가 같으면 중복 체크 못하도록
					if(item.materialOrderId == grid2Items[j].materialOrderId){
						chk = false;
						break;
					}
				}
				if(item.orderState == 'CHECK'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10738']});
					return;
				}
				
				if(chk) {
					item.deliveryDate= get_date_diff(0);
					AUIGrid.setColumnPropByDataField('grid2', 'inputQty', {
						styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
							if(item.iqcFlag == "N" && item.departureFlag == "N") {
								return 'columnStyle';
							} else {
								return '';
							}
						}
					});	
					AUIGrid.addRow("grid2", item, "last");
				}
			}
			
		});
		
		// 입고처리버튼
		$(document).on("click", "#inputBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var arrayList = [];
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11068']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				// 유상입고 일때 단가 체크
				if(checkedItems[i].item.freeOfferFlag == 'N' || checkedItems[i].item.freeOfferFlag == null){
					if(checkedItems[i].item.unitPrice <= 0 || checkedItems[i].item.unitPrice == null ) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10976']});
						return;
					}
					
//					if(to_date_yyyy_mm_dd(checkedItems[i].item.deliveryDate) <= endPeriod) {
//						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11056' + '@' + endPeriod)});
//						return;
//					}
				}
				
				//무상입고
				/* LJW - 190108(화인알텍용 임시 주석처리, 추후 주석 제거)
//				if(checkedItems[i].item.deliveryDate < checkedItems[i].item.departureDate || checkedItems[i].item.deliveryDate < checkedItems[i].item.createDate) {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"입고일은 출발일자 또는 발주일자보다 빠를 수 없습니다."});
//					return;
//				}
				*/
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.deliveryDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11056' + '@' + endPeriod)});
					return;
				}
			}
			
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					html:Language.lang['MESSAGES11067'], 
					width:"400", 
					height: "145",
					okButton:{
						text:"OK", 
						after:function(){
							for(var i = 0; i < checkedItems.length; i++){
							arrayList.push(checkedItems[i].item);
							}
							mom_ajax('D', 'purchase.materialLedger.materialInput.materialInputTemp', "{}", that.delCallback, arrayList);
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		// 취소버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
			AUIGrid.removeCheckedRows("grid2"); 
		});
		
		// 하단 그리드 입고창고 콤보
		$(document).on("change", "#toLocation", function() {
			var grid2length = AUIGrid.getGridData("grid2").length;
			var toLocationCd = $("#toLocation").val();
			 for(var i = 0; i < grid2length; i++) {
				 AUIGrid.setCellValue("grid2", i, "locationCd", toLocationCd);
			 }
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#orderNumber'), $('#findBtn'));
	},
	comboBox : function(){
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 업체, 납품업체
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
	
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_ORDER_STATE", attribute4 : "Y"}, // 파라미터
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
		
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background:  #C7E8FD;}</style>');	
	},
	delCallback : function(result, data, param, callbackParam) {
		var that = this.MOMCC001;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid2");
		if(result == "SUCCESS"){
			for(var i = 0; i < checkedItems.length; i++){
				callbackParam[i].seq = i+1;
				arrayList.push(callbackParam[i]);
			}
			mom_ajax('L', 'purchase.materialLedger.materialInput.materialInputTemp', JSON.stringify(arrayList), that.procCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	procCallback : function(result, data) {
		var that = this.MOMCC001;
		if(result == "SUCCESS"){
			mom_ajax('C', 'purchase.materialLedger.materialInput.materialInputCreate', "{}", that.callbackPost);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	callbackPost : function(result, data) {
		if(result == "SUCCESS"){
			AUIGrid.removeCheckedRows("grid2");
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			mCommon.render("grid1", "W201807261515076941000NYWEYL7JTRM",  mCommon.formGetParam("#form"), function(){});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMCC001.init();
});