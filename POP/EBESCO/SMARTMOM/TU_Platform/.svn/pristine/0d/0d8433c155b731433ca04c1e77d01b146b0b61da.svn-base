var locationParam = mCommon.getSearchParam();
var releaseFacilityType;
var itemTypeParam;
var requestFacilityType;
var allowMinusQty;
var locationParam;
var endPeriod;
var menuId;

var MOMCC012 = {
	init: function() {
		var that = this;
		if(locationParam.stockType == "MAT") {
			releaseFacilityType = "'FAC200'"
			itemTypeParam = {codeClassId:"ITEM_TYPE", attribute1 : "Y"}
			requestFacilityType = "'FAC300', 'FAC500'"
			$("#labelText").text(Language.lang['MESSAGES10964']);
			menuId = "MOMCC012";
		} else {
			releaseFacilityType = "'FAC300'"
			itemTypeParam = {codeClassId:"ITEM_TYPE", attribute2 : "Y"}
			requestFacilityType = "'FAC500'"
			$("#labelText").text(Language.lang['MESSAGES10217']);
			menuId = "MOMCC013";
		}
		
		Language.init(function() {
			mCommon.init("grid1", "W201807301624296151000jJDKbuq9vEf", null, function() {
				mCommon.init("grid2", "W201812201507585901000cnSxS9jznYZ", null, function() {
					that.grid();
					that.event();
					that.comboBox();
					that.design();
				}, Language);
			}, Language);
		});
		
		mCommon.splitter(".h03-h", "horizontal", "50%");
	}, grid: function() {
		if(locationParam.stockType == "MAT") {
			$("#labelText").text(Language.lang['MESSAGES10964']);
		} else {
			$("#labelText").text(Language.lang['MESSAGES10217']);
		}
		
		tuCommon.cellClick('grid1');
		tuCommon.cellClick('grid2');
		
		AUIGrid.setSelectionMode("grid1", "singleCell");
		AUIGrid.setSelectionMode("grid2", "singleCell");
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy",
			type : "GET",
			async: false,
			data : {facilityClassCd : "AREA", facilityType : releaseFacilityType},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "inLocationCd", {
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
		
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
			timeout : 30000000,
			async : false,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				allowMinusQty = data[0].allowMinusQty;
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			async: false,
			data : {codeClassId : "MARKET_CODE"},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "marketCd", {
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
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			async: false,
			data : {codeClassId : "CURRENCY_CODE"},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField( "grid2", "currencyCd", {
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
		
		AUIGrid.bind("grid2", "cellEditBegin", function() {
			AUIGrid.setProp("grid2", "exportURL", "0");
		});
		
		// 불출창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
		AUIGrid.bind('grid2', "cellEditEnd", function( event ) {
			if(event.dataField == "inLocationCd") {
				var zeroQty;
				var param = {
					itemId : event.item.itemId,
					locationCd : event.item.inLocationCd
				}
				
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.curItemStock.dummy", param, function(data) {
					if(data[0] == null) {
						zeroQty = 0;
					}
					
					if(zeroQty != 0) {
						AUIGrid.setCellValue("grid2", event.rowIndex, "currentQty", data[0].currentQty);
					} else {
						AUIGrid.setCellValue("grid2", event.rowIndex, "currentQty", zeroQty);
					}
				});
				
				var grid2length = AUIGrid.getGridData("grid2").length;
				var item = AUIGrid.getItemByRowIndex("grid2", event.rowIndex);
				for(var i = event.rowIndex + 1; i < grid2length; i++) {
					AUIGrid.setCellValue("grid2", i, "inLocationCd", item.inLocationCd);
				}
			}
			
			if(event.dataField == "issueDate") {
				var grid2length = AUIGrid.getGridData("grid2").length;
				var item = AUIGrid.getItemByRowIndex("grid2", event.rowIndex);
				for(var i = event.rowIndex + 1; i < grid2length; i++) {
					AUIGrid.setCellValue("grid2", i, "issueDate", item.issueDate);
				}
			}
			
			AUIGrid.setProp("grid2", "exportURL", "0");
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : menuId},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
				        if(event.dataField == "issueDate") { // 달력 지정한 필드인 경우 
				        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
				        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
				                return event.oldValue; 
				        	} else {
				        		return to_date_yyyy_mm_dd(event.value);
			                } 
				        }
				        
				        //잔량 수정시 환산수량 변경
				        if(event.dataField == "remainQty") {
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
		
		AUIGrid.setColumnPropByDataField( "grid2", "issueDate", {
			style:"columnStyle",
			editRenderer : {
				 type : "CalendarRenderer",
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		AUIGrid.setColumnPropByDataField( "grid2", "inLocationCd", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid2", "remainQty", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid2", "description", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid2", "conversionUnitQty", { style:"columnStyle" } );
		
	}, event: function() {
		var that = this;
		// 조회
		$("#findBtn").click(function(event) {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			var param = mCommon.formGetParam("#form");
			param.stockType = locationParam.stockType;
			
			//AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201807301624296151000jJDKbuq9vEf", param, function(){});
		});
		
		//엑셀 다운로드(상단)
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_RELEASE_MOMCC012_" + get_current_date("yyyy-mm-dd")});
		});
		
		//선택
		$(document).on("click", "#choiceBtn", function() {
			var checkedItems =  AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.requestFlag == "Y") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11389']});
					return;
				}
				var item = checkedItems[i].item;
				var chk = true;
				
				//하단그리드와 중복체크
				for(var j = 0; j < grid2Items.length; j++) {
					if(item.workOrderId == grid2Items[j].workOrderId && item.itemId == grid2Items[j].itemId && item.requestDate == grid2Items[j].requestDate) {
						chk = false;
						break;
					}
				}
				item.issueDate = get_current_date("yyyy-mm-dd");
				if(chk) {
					AUIGrid.addRow("grid2", item, "last");						
				}
			}
		});
		
		//요청마감
		$("#requestCloseBtn").click(function(event) {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					if(checkedItems[i].item.requestFlag == "Y") {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11391']});
						return;
					}
					arrayList.push(checkedItems[i].item);
				}
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11327']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10941'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("L", "purchase.materialLedger.materialRelease.materialReleaseState", JSON.stringify(arrayList), that.listCallbackPost, arrayList);
				}
			}});
			
		});
		
		//출고
		$("#releaseBtn").click(function(event) {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var arrayList = [];
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					if(to_date_yyyy_mm_dd(checkedItems[i].item.issueDate) <= endPeriod) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10534' + '@' + endPeriod)});
						return;
					}
					/* modify hists
					 * 20191107001 / pyj / 출고시 음수재고 허용안하는 경우 조건 오류 수정
					 */
					if(allowMinusQty == 'N') {
						if(checkedItems[i].item.currentQty >= 0) {
							if(checkedItems[i].item.remainQty > checkedItems[i].item.standardOutQty) {
								if(checkedItems[i].item.remainQty > checkedItems[i].item.currentQty) {// 20191107001 / issueQty -> remainQty
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11616']});
									return;
								}
								if(checkedItems[i].item.issueQty < checkedItems[i].item.remainQty) {// 20191107001 / 부등호 수정
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10259']});
									return;
								}
							}
						} else {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11379']});
							return;
						}
					}
					
					if(checkedItems[i].item.requestFlag == "Y") {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11390']});
						return;
					}
					arrayList.push(checkedItems[i].item);
				}
				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11333']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11400'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("D", "purchase.materialLedger.materialRelease.materialReleaseTmp", "{}", that.delCallback, arrayList);
				}
			}});
			
		});
		
		//엑셀 다운로드(하단)
		$(document).on("click", "#dexcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "MATERIAL_RELEASE_DETAIL_MOMCC012_" + get_current_date("yyyy-mm-dd")});
		});
		
		//취소
		$(document).on("click", "#cancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
			AUIGrid.removeCheckedRows("grid2"); 
		});
		
		// 하단 그리드 불출창고 콤보
		$(document).on("change", "#toLocation", function() {
			var grid2length = AUIGrid.getGridData("grid2").length;
			var toLocationCd = $("#toLocation").val();
			 for(var i = 0; i < grid2length; i++) {
				 AUIGrid.setCellValue("grid2", i, "inLocationCd", toLocationCd);
			 }
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#workOrder'), $('#findBtn'));
	}, 
	comboBox: function() {
		// 요청일
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 불출창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : releaseFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				}
			);
		});

		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			itemTypeParam,	// 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type",comboOptions, options);
			}
		);
		
		// 요청창고
		mCommon.comboBoxClickCall("#outLocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : requestFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#outLocationName",{searchMode:'containsignorecase', autoComplete:true}, options);
					callBack();
				}
			);
		});
		
		// 재고량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockQty",comboOptions, options);
			}
		);
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag",comboOptions, options);
			}
		);
		
		//하단 불출창고
		mCommon.comboBoxClickCall("#toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd : "AREA", facilityType : releaseFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toLocation", comboOptions, options);
					callBack();
				
				}
			);
		});
	}, 
	design: function() {
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	delCallback : function(result, data, param, callbackParam) {
		var that = this.MOMCC012;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid2");
		if(result == "SUCCESS") {
			for(var i = 0; i < checkedItems.length; i++) {
				arrayList.push(callbackParam[i]);
			}
			mom_ajax("L", "purchase.materialLedger.materialRelease.materialReleaseTmp", JSON.stringify(arrayList), that.procCallback);
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
		var that = this.MOMCC012;
		if(result == "SUCCESS") {
			mom_ajax('C', 'purchase.materialLedger.materialRelease.materialRelease', "{}", that.listCallbackPost);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(result, data) {
		var that = this.MOMCC012;
		if(result == "SUCCESS") {
			var param = mCommon.formGetParam("#form");
			param.stockType = locationParam.stockType;
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201807301624296151000jJDKbuq9vEf", param, function() {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
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
	MOMCC012.init();
});