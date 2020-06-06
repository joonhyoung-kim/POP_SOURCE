var vendorCd = sessionStorage.getItem("vendorCd");
var empAuthority  = sessionStorage.getItem("empAuthority");
var locationParam = mCommon.getSearchParam();
var departureType;
var strTitle;
var depId;
var endPeriod;
var menuId;
var strHearderDate;

var language = undefined;

var MOMCB001 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		
		// 파일업로드 팝업 사이즈 수정
		$("#popFileUpload #panel").css("width", "40%");
		$(".fileinput").css("min-width", "420px");
		
		Language.init(function(_language) {
			language = _language;
			mCommon.init("grid1", "W201807251425205041000jdOsiGdrphQ", null, function() {
				mCommon.init("grid2", "W201808210937212211001dKsijWPEm1o", null, function() {
					that.grid();
					that.fileInpuSet();
				}, Language);
			}, Language);
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				// 팝업 내 그리드 사이즈 정의
				AUIGrid.setProp("auigrid", {showAutoNoDataMessage : false});
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			}, Language);
		});
		
		mCommon.splitter(".h02-h", "horizontal", "50%");

	}, grid: function() {		
		var that = this;
		var strHearderQty = Language.lang['MESSAGES11409'];
		strHearderDate = Language.lang['MESSAGES11413'];
		menuId = "MOMCB001";
		
		
		if(locationParam.menuCode == "WGR"){
			strHearderQty = Language.lang['MESSAGES11035'];
			strHearderDate = Language.lang['MESSAGES11036'];
			strTitle = Language.lang['MESSAGES11033'];
			$("#deliveryList").text(Language.lang['MESSAGES11034']);
			$("#deliveryDetailList").text(Language.lang['MESSAGES11104']);
			$("#deliveryBtn .textblock").text(Language.lang['MESSAGES11037']);
			menuId = "MOMCC009";
			AUIGrid.setColumnPropByDataField("grid1", "departureQty", { headerText:strHearderQty })
			AUIGrid.setColumnPropByDataField("grid1", "departureDate", { headerText:strHearderDate })
		} else {
			strTitle = Language.lang['MESSAGES11402'];
		}
			AUIGrid.setSelectionMode("grid2", "singleCell");
			tuCommon.cellClick('grid1');
			tuCommon.cellClick('grid2');
			tuCommon.cellClick('auigrid', 'single');
			
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
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			 
			// cellEditEndBefore 이벤트 바인딩
			AUIGrid.bind("grid2", "cellEditEndBefore", function(event) {				
				if(event.dataField == "departureQty") {
					var dQty = event.value;
					var rQty = event.item.remainQty;
					
					if(dQty > rQty) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11306']});
						return event.oldValue;
					} else if(dQty <= 0 || dQty == '') {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11305']});
						return event.oldValue;
					} else {
						var conversionUnitQty = event.value * event.item.originConversionUnitQty;
						AUIGrid.setCellValue("grid2", event.rowIndex, "conversionUnitQty", conversionUnitQty);
						return dQty;
					}	
				}
				
//				if(event.dataField == "departureDate") {
//					var dDate = event.value;
//					var oDate = event.item.createDate;
//					
//					if(dDate < oDate) {
//						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "처리일자가 발주일자보다 빠를 수 없습니다." });
//						return event.oldValue;
//					} else {
//						return dDate;
//					}
//				}
				
				if(event.dataField == "departureDate") { // 달력 지정한 필드인 경우 
		        	if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
		        		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
		                return event.oldValue; 
		        	} else {
		        		return to_date_yyyy_mm_dd(event.value); 
	                } 
		        }
				
				return event.value;
			});
			
			AUIGrid.setColumnPropByDataField( "grid2", "departureDate", {
				style:"columnStyle",
				headerText : strHearderDate,
				dataType : "date",
				formatString : "yyyy-mm-dd",
				editRenderer : {
					 type : "CalendarRenderer",	
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField( "grid2", "conversionUnitQty", { style:"columnStyle" });
			
			AUIGrid.setColumnPropByDataField( "grid2", "departureQty", { 
				style:"columnStyle",
				headerText : strHearderQty
			});
			
			AUIGrid.setColumnPropByDataField( "grid2", "description", { style:"columnStyle" } );
			
			if(locationParam.menuCode == "DEPT"){
				var fileColumn = {"headerText":"File","dataField":"File","width":40,"visible":true,
						renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
						labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
							return '<div class="grid2FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
						}
					}
					
				AUIGrid.addColumn("grid2", fileColumn, 20);
			}
			
			AUIGrid.bind('grid2', 'cellEditBegin', function(e) {
				AUIGrid.setProp('grid2', 'exportURL', '0');
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
			
			if(AUIGrid.getRowCount("grid2") > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11125'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){			
						mCommon.render("grid1", "W201807251425205041000jdOsiGdrphQ",  param, function(){
							AUIGrid.clearGridData("grid2"); 
						});
					}
				}});
			} else {
				mCommon.render("grid1", "W201807251425205041000jdOsiGdrphQ",  param, function(){});
			}			
		});
		
		// 출발처리버튼
		$(document).on("click", "#deliveryBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid2");
			if(locationParam.menuCode == "DEPT") {
				departureType = "D";
			} else {
				departureType = "W";
			}
			
			if(checkedItems.length == "0") {
				return;
			} else {
				for(var i=0; i<checkedItems.length; i++) {
					if(to_date_yyyy_mm_dd(checkedItems[i].item.departureDate) <= endPeriod) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10000' + '@' + strHearderDate + '@' + endPeriod)});
						return;
					}
				}
				
				var option = {
						type:"info", 
						html:strTitle + Language.lang['MESSAGES11304'], 
						width:"400", 
						height: "145",
						okButton:{
							text:"OK",
							after:function(){								
								var param = {departureType : departureType}
								mom_ajax("D", "purchase.supplier.materialDelivery.materialDeliveryTemp", JSON.stringify(param), that.delCallback, checkedItems);								
							}
						}
				}
				micaCommon.messageBox(option);						
			}	
		});
		
		if(locationParam.menuCode == "DEPT") {
			//File 버튼
			$(document).on("click", ".grid2FileBtn", function() {
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
				var rowIndex = $(this).attr("row-index");
				var item = AUIGrid.getItemByRowIndex("grid2", rowIndex);
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
			
			// 파일 업로드 버튼 (파일 등록)
			$(document).on("click", "#fileUploadBtn, #fileDelBtn", function(){
				var type = $("#fileCloseBtn").attr("type");
				
				if($(this).attr("id") == "fileUploadBtn") {
					//등록
					if($("#fileUpload").val() == "") {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10347']});
						return;
					}
					
					var attach = document.getElementById('fileUpload');
					attach_upload(attach, 'MOMCB001', depId, '{}', function(flag, response){
						if(flag == 'SUCCESS') {
							var param = {
									entityId   : depId,
									entityName : 'MOMCB001'
							}
							mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
						}
					});
				} else {
					//삭제
					var items = AUIGrid.getCheckedRowItems("auigrid");
					for(var i = 0; items.length; i++) {
						var param =  { fileId : items[i].item.fileId };
						if(i == AUIGrid.getCheckedRowItems("auigrid").length - 1) {
							mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data){
								if(flag == 'SUCCESS') {
									var param = {
											entityId   : depId,
											entityName : 'MOMCB001'
									}
									mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
								}
							});
						} else {
							mom_ajax('D', 'common.file', JSON.stringify(param));
						}
					}
				}
				
			});
		}
		
		//파일 다운로드 버튼
		$(document).on("click", "#fileDownBtn", function() {
			var items = AUIGrid.getCheckedRowItems("auigrid");
			for(var i = 0; i < items.length; i++) {
				attach_download(depId, 'MOMCB001', items[i].item.oldFileName);	
			}
		});
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_DELIVERY_MOMCB001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length; i++){
				var item = checkedItems[i].item;
				var materialOrderId = item.materialOrderId;
				var remainQty = item.remainQty;
				var chk = true;
				
				if(remainQty > 0) {
					for(var j = 0; j < grid2Items.length; j++){
						if(materialOrderId == grid2Items[j].materialOrderId){
							chk = false;
							break;
						}					
					}
					if(chk) {
						item.departureDate= get_date_diff(0);
						item.departureQty = item.remainQty;						
						AUIGrid.addRow("grid2", item, "last");						
					}
				}
			}
			
			if(AUIGrid.getRowCount("grid2") > 0) {				
				AUIGrid.setAllCheckedRows("grid2", true);
			}
			
			AUIGrid.setAllCheckedRows("grid1", false);
		});
		
		// 취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2"); 
			AUIGrid.setAllCheckedRows("grid2", true);
		});
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			$(this).closest(".modal").micaModal("hide");
						
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#orderNumber'), $('#findBtn'));
	},
	comboBox : function(){
		$("#fromDate").val(get_date_diff(-7));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true}
		var options = {local: "", textName : "name", valueName : "code", readonly: false}
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
		
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
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMCB001;
		if(result == "SUCCESS"){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.departureType = departureType; 
				callbackParam[i].item.seq = i+1;
            	arrayList.push(callbackParam[i].item);
            }
			mom_ajax('L', 'purchase.supplier.materialDelivery.materialDeliveryTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMCB001;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'purchase.supplier.materialDelivery.materialDelivery', JSON.stringify(callbackParam[0]), that.listCallbackPost);
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
		var that = this.MOMCB001;
		if(result == "SUCCESS"){
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			var param = mCommon.formGetParam("#form");
			param.menuCode = locationParam.menuCode;
			mCommon.render("grid1", "W201807251425205041000jdOsiGdrphQ",  param, function(){
				AUIGrid.clearGridData("grid2");
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	fileInpuSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	},
};
$(document).ready(function(event){
	MOMCB001.init();
});