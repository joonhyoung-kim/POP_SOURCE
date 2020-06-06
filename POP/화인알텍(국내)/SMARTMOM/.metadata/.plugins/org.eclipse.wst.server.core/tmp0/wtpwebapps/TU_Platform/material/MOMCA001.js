var defaultDate = get_current_date('YYYY-MM-DD');
var gvThat;
var endPeriod;

var MOMCA001 = {
	init: function() {
		var that = this;
		gvThat = this;
		Language.init(function() {
			mCommon.init("node-2", "W201806221349379281000qZwsr6X3Vn2", null, function() {
				that.grid("node-2");
				mCommon.init("auigrid", "W201806221720411561000xXhtpN4O4Fe", null, function() {
					that.grid("auigrid");
				}, Language);
			}, Language);
		});
		that.comboBox();
		that.event();
		that.design();
		that.fileInpuSet();
	}, grid: function(grid) {
		var that = this;
		if(grid == "node-2"){
			AUIGrid.setSelectionMode("node-2", "singleCell");
			// 비정규발주 그리드 콤보박스 설정 
			var vendorUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy'
				+ '?attribute1' + '=' + 'Y';
			
			var facilityUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFacility.dummy'
				+'?facilityType' + '=' + 'FAC200';
			
			var mktUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy'
				 +'?codeClassId' + '=' +'MARKET_CODE';
			
			var currencyUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy'
				+'?codeClassId' + '=' +'CURRENCY_CODE';
			
			//발주업체 콤보
			that.gridComboBoxSet("node-2", vendorUrl, "vendorCd", "DropDownListRenderer", true);
			//납품업체 콤보
			that.gridComboBoxSet("node-2", vendorUrl, "departureVendorCd", "DropDownListRenderer", true);
			//입고창고 콤보
			that.gridComboBoxSet("node-2", facilityUrl, "inLocationId", "DropDownListRenderer", true);
			//MKT 콤보 리스트
			that.gridComboBoxSet("node-2", mktUrl, "marketCd", "DropDownListRenderer", true);
			//환종 콤보 리스트
			that.gridComboBoxSet("node-2", currencyUrl, "currencyCd", "DropDownListRenderer", true);
			//납기일자 달력
			that.datePickerSet("node-2", "requestDate", "CalendarRenderer", false);
			
			AUIGrid.setColumnPropByDataField( "node-2", "vendorCd", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "departureVendorCd", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "inLocationId", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "requestQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "marketCd", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "currencyCd", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "requestDate", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "node-2", "description", { style:"columnStyle" } );
			
			/*  // 셀변경시 다른 셀 변경 샘플
			AUIGrid.bind("node-2", "cellEditEnd", function( event ) {
				if(event.dataField == "vendorCd") {
					event.value;
					var param = {
						itemId : "3551A10032B",
						locationCd : "BR100",
					}
					$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.curItemStock.dummy", param, function(data) {
						if(data[0] == null) {
							return;
						}
						AUIGrid.setCellValue("node-2", event.rowIndex, "departureFlagName", data[0].currentQty);
					});
				}
			});
			*/
//			widget_ajax('MOMCA001', $('head'), grid, 'init');
			
			// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMCA001"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('node-2', "cellEditEndBefore", function(event){ 
					        if(event.dataField == "requestDate") { // 달력 지정한 필드인 경우 
					        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
					        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10725']});
					                return event.oldValue; 
					        	} else {
					        		return to_date_yyyy_mm_dd(event.value);
				                } 
					        }
					        return event.value; 
						}); 
					}
				},
				error: function(data){},
				fail : function(data){}
			});
		}
		
		tuCommon.cellClick(grid);
		
		AUIGrid.bind('aui-grid', 'cellEditBegin', function(e) {
			AUIGrid.setProp('aui-grid', 'exportURL', '0');
		});
		
	}, event: function() {
		var that = this; // MOMCA001 내부 변수 사용을 위해서 선언.
		var sequence;
		var errors;

		// 비정규발주 조회
		$(document).on("click", "#findBtn", function() {
			// 비정규발주 검색조건 데이터를 모아서 준다.
			if(($("#vendorName").val() == '') && ($("#itemName").val() == '') && ($("#specification").val() == '') && ($("#userName").val() == '') ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10850']});
				return;
			}
			// 모달창을 연다.
			mCommon.render("auigrid", "W201806221720411561000xXhtpN4O4Fe", that.getSearchData(), function(){});
			$("#pop").micaModal("show");
			AUIGrid.resize("auigrid");
		});
		
		//팝업 저장
		$(document).on("click", "#pCreateBtn", function() {
			//팝업 그리드에서 체크한 행만 가져온다.
			var selectItems = AUIGrid.getCheckedRowItems("auigrid");
			for(var i = 0; i < selectItems.length; i++) {
				//메인 그리드에 팝업에서 체크한 행을 마지막에 추가한다.
				AUIGrid.addRow("node-2", selectItems[i].item, "last");
			}
			$("#pop").micaModal("hide");
		});
		
		//취소
		$(document).on("click", "#cancelBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("node-2");
			if(selectItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11488']});
				return;
			}
			AUIGrid.removeCheckedRows("node-2"); 
		});
		
		//발주
		$(document).on("click", "#orderBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("node-2");
			
			if(selectItems.length == "0") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11331']});
				return;
			}
			
			for(var i=0; i<selectItems.length; i++) {
				if(to_date_yyyy_mm_dd(selectItems[i].item.requestDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10269']});
					return;
				}
				
				if(selectItems[i].item.vendorCd == '' ||  selectItems[i].item.vendorCd == null
					|| selectItems[i].item.departureVendorCd == '' || selectItems[i].item.departureVendorCd == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10474'], closeButton:{text:"Close"}, okButton:{text:"OK",
				after:function(){
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = {
							orderType : "MANUAL"
					};
					
					mom_ajax("D", "common.materialOrderDel", JSON.stringify(param), that.delCallback, selectItems);
				}
			}});
			
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("node-2", {fileName: "IRREGULARORDER_MOMCA001_test"}, "templete");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 팝업 닫기
		$(document).on("click", "#pCancelBtn, #dpCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			var param = {
					orderType : "MANUAL"
			};
			mom_ajax("D", "common.materialOrderDel", JSON.stringify(param), that.excelUpload);
		});
		
		// 입고창고 콤보
		$(document).on("change", "#toLocation", function() {
			var grid2length = AUIGrid.getGridData("node-2").length;
			var toLocationCd = $("#toLocation").val();
			 for(var i = 0; i < grid2length; i++) {
				 AUIGrid.setCellValue("node-2", i, "inLocationId", toLocationCd);
			 }
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#userName'), $('#findBtn'));
	},
	comboBox: function() {
		$("#deliveryDate").val(defaultDate);
		// 발주업체
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{attribute1 : 'Y'}, // 파라미터
					function(data) {
						micaCommon.comboBox.set("#vendorName", {searchMode : "containsignorecase", autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly : false});
						callBack();
					}
			);
		});
		
		//납품업체
		mCommon.comboBoxClickCall("#departureVendor", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
					{attribute1 : 'Y'}, // 파라미터
					function(data) {
						micaCommon.comboBox.set("#departureVendor", {searchMode : "containsignorecase", autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly : false});
						callBack();
					}
			);
		});
		
		// 입고창고
		mCommon.comboBoxClickCall("#toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
					{facilityType : "FAC200"}, // 파라미터
					function(data) {
						micaCommon.comboBox.set("#toLocation", {searchMode : "containsignorecase"}, {local: data, textName : "name", valueName : "code", readonly : false});
						callBack();
					}
			);
		});
	},
	getSearchData: function(){
		var param = {
			vendorName : $("#vendorName").val(),
			deliveryDate : $("#deliveryDate").val(),
			itemName : $("#itemName").val(),
			specification : $("#specification").val(),
			departureVendor : $("#departureVendor").val(),
			userName : $("#userName").val(),
		}
		return param;
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMCA001;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("node-2");
		if(result == "SUCCESS"){
			for(var i = 0; i < checkedItems.length; i++){
				checkedItems[i].item['orderType'] = 'MANUAL';
				checkedItems[i].item.seq = i+1;
				arrayList.push(checkedItems[i].item);
				if(checkedItems[i].item.requestQty < 1){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10463']});
					return;
				}
			}
			mom_ajax('L', 'common.materialOrderUpload', JSON.stringify(arrayList), that.listCallback, arrayList);
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMCA001;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'common.materialOrder', JSON.stringify(callbackParam[0]), that.listCallbackPost);
			}
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	excelCallback : function(result, data){
		var that = this.MOMCA001;
		if(result == "SUCCESS"){
			mom_ajax('C', 'common.materialOrder', JSON.stringify({orderType : 'MANUAL'}), that.listCallbackPost);
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallbackPost : function(result, data){
		var that = this.MOMCA001;
		if(result == "SUCCESS"){
			AUIGrid.removeCheckedRows("node-2");
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']}); 
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
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
				fail : function(data){
					if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
						micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
					} else {
						micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
					}
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
				valueField : "name",
				formatString: "#,###"
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
	            openDirectly : true,
		   		onlyCalendar : false,
		        titles : [Language.lang['MESSAGES11017'], Language.lang['MESSAGES10968'], Language.lang['MESSAGES11636'], Language.lang['MESSAGES10715'], 
		        	      Language.lang['MESSAGES10416'], Language.lang['MESSAGES10247'], Language.lang['MESSAGES11510']]
		}
		AUIGrid.setColumnPropByDataField(grid, field, requestDateColumn);
		
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [
   			{}
   		];
  		
  		/*excel_upload(file, 'common.materialOrderUpload', 'MOMCA001', JSON.stringify(param));*/
		excel_upload(file, 'common.materialOrderUpload', 'MOMCA001', 'node-2', JSON.stringify(param), gvThat.excelCallback);
  		$("#uploadPop").micaModal("hide");
  		micaCommon.splash.show();
	}
};

$(document).ready(function(event){
	MOMCA001.init();
});