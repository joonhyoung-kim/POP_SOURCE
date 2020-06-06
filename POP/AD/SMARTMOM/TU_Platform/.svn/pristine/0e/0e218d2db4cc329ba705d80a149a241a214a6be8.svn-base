var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var itemId, itemName, itemTypeName, unit, specification, locationParamCd = [];
var defaultCurrency;
var exchangeRate;
var locationCd;
var locationName;
var vendorName;
var freeLocation;
var freeLocationName;
var freeInputFlag;
var dpFlag;
var dp = /^\d*[.]\d*$/;
var endPeriod;

$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
	timeout : 30000000,
	async : false,
	data : {codeClassId : 'SITE_SETUP'},
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		defaultCurrency = data[0].value;
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
	timeout : 30000000,
	async : false,
	data : {codeClassId : 'FREE_LOCATION'},
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		freeLocation = data[0].code;
		freeLocationName = data[0].code + '(' + data[0].name + ')'
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

$.ajax({
	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
	type : "GET",
	data : {menuId : "MOMCC008"},
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

//단가 정보 조회
function getUnitPrice(){
	$.ajax({
		type : 'GET',
		url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comItemInPrice.dummy',
		timeout : 30000000,
		async : false,
		data : {vendorCd : $("#vendorId").val(), itemId : $("#itemId").val(), marketCd : $("#mktName").val(), currencyCd : $("#currency").val(), stateTime : $("#stateTime").val()},
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			if(data.length > 0) {
				$("#unitPrice").val(data[0].unitPrice);
			} else {
				$("#unitPrice").val(0);
			}
		},
		error : function(error){
			errors = error;
		},
		fail : function(){
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
		}
	});
}

//환율 정보 조회
function getExchangeRate(){
	$.ajax({
		type : 'GET',
		url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comExchangeRate.dummy',
		timeout : 30000000,
		async : false,
		data : {vendorCd : $("#vendorId").val(), itemId : $("#itemId").val(), marketCd : $("#mktName").val(), currencyCd : $("#currency").val(), stateTime : $("#stateTime").val()},
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			if(data.length > 0) {
				exchangeRate = data[0].exchangeRate;
			} else {
				exchangeRate = 1;
			}
		},
		error : function(error){
			errors = error;
		},
		fail : function(){
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
		}
	});
}

var MOMCC008 = {
		init: function() {
			var that = this;
			Language.init(function() {
				that.grid();
				that.event();
				that.comboBox();
			});
			
	}, grid: function() {
		var columnLayout = [ 
			{
				dataField : "vendorCd",
				headerText : Language.lang['MESSAGES10855'],
				editable : false,
				width : 120
			},
			{
				dataField : "vendorName",
				headerText : Language.lang['MESSAGES10849'],
				editable : false,
				width : 120
			}, {
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11577'],
				editable : false,
				width : 140
			}, {
				dataField : "itemName",
				headerText : Language.lang['MESSAGES11569'],
				editable : false,
				width : 140
			}, {
				dataField : "itemTypeName",
				headerText : Language.lang['MESSAGES11580'],
				editable : false,
				width : 100
			},
			{
				dataField : "freeOfferFlagName",
				headerText : Language.lang['MESSAGES11747'],
				editable : false,
				width : 100
			},
			{
				dataField : "locationInName",  
				headerText : Language.lang['MESSAGES11060'],
				editable : false,
				width : 100
			},
			{
				dataField : "qty",  
				headerText : Language.lang['MESSAGES11040'],
				editable : false,
				width : 100,
				dataType : "numeric",
				formatString : "#,##0"
			},
			{
				dataField : "unit",  
				headerText : Language.lang['MESSAGES10300'],
				editable : false,
				width : 100
			},
			{
				dataField : "unitPrice", 
				headerText : Language.lang['MESSAGES10293'],
				editable : false,
				width : 100,
				dataType : "numeric",
				formatString : "#,###.0#"
			},
			{
				dataField : "marketName",  
				headerText : "Market",
				editable : false,
				width : 100
			},
			{
				dataField : "currencyName",
				headerText : Language.lang['MESSAGES11654'],
				editable : false,
				width : 100
			}, 
			{
				dataField : "exchangeRate", 
				headerText : Language.lang['MESSAGES11652'],
				editable : false,
				width : 100,
				dataType : "numeric",
				formatString : "#,###.#"
			}, 
			{
				dataField : "stateTime", 
				headerText : Language.lang['MESSAGES11055'],
				editable : false,
				width : 100
			}, 
			{
				dataField : "inItemExcetionFlag", 
				headerText : Language.lang['MESSAGES11748'],
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "inItemExcetionFlagName", 
				headerText : Language.lang['MESSAGES11749'],
				editable : false,
				width : 100
			}, 
			{
				dataField : "specification", 
				headerText : Language.lang['MESSAGES10234'],
				editable : false,
				width : 100
			}, 
			{
				dataField : "description", 
				headerText : Language.lang['MESSAGES10545'],
				editable : false,
				width : 100
			}, 
			{
				dataField : "locationInCd", 
				headerText : Language.lang['MESSAGES11750'],
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "dpFlag", 
				headerText : Language.lang['MESSAGES11751'],
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "freeInputFlag", 
				headerText : Language.lang['MESSAGES11752'],
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "marketCd", 
				headerText : "MKT_ID",
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "freeOfferFlag", 
				headerText : Language.lang['MESSAGES11753'],
				editable : false,
				visible: false,
				width : 100
			}, 
			{
				dataField : "exceptionFlag", 
				headerText : Language.lang['MESSAGES10905'],
				editable : false,
				visible: false,
				width : 100
			}];
		
		var gridProps = {

				editable : false,
				selectionMode : "singleCell",
				showSelectionBorder : false,
				showRowCheckColumn : true,
				fillColumnSizeMode : true,
				showSelectionBorder: false,
				softRemoveRowMode: false
	
		};

		 AUIGrid.create("grid", columnLayout, gridProps);
		 tuCommon.cellClick('grid');
		 
		 $("#qty").parent().append('<input maxlength="20" name="field-26" id="qty" input-type="text" type="text" onkeydown="onlyNum();" class="w-input fieldbox w190" data-name="Field 26"></input>');
		 $("#qty").remove();
		 
	}, event: function() {
		var that = this;
		//등록버튼
		$("#createBtn").click(function(event){
			that.setExceptionInputPop();
			$("#locationIn").val("");
			$("#costFlag").jqxComboBox({disabled: true});
			$("#exceptionInpuPop").micaModal("show");
		});
		
		//저장버튼
		$("#pSaveBtn").click(function(event){
			if($("#vendorId").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
				return;
			}
			
			if($("#itemId").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			
			if($("#costFlag").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10974']});
				return;
			}
			
			if($("#locationIn").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11062']});
				return;
			}
			
			if($("#stateTime").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11057']});
				return;
			}
			
			if($("#qty").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11043']});
				return;
			}
			
			if ($("#costFlag").val() == "N") {
            	if ($("#unitPrice").val() == "" || parseFloat($("#unitPrice").val()) <= 0) {
                	micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10976']});
                	return;
                }
            	if ($("#currency").val() == "") {
                	micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11658']});
                	return;
                }
            }
			
			if($("#qty").val() < 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11042']});
            	return;
			}
			
			if (dpFlag == "N") {
            	if (dp.test($("#qty").val())) {
            		micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10701']});
                	return;
            	}
            }
			
			if($("#stateTime").val() <= endPeriod) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11058' + '@' + endPeriod)});
				return;
			}
			
			var item = that.getExceptionInputPop();
			AUIGrid.addRow("grid", item, "last"); 
			$("#exceptionInpuPop").micaModal("hide");
		});

		//팝업 취소 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			// 등록 팝업을 닫는다.
			$("#exceptionInpuPop").micaModal("hide");
		});
		
		//업체 선택 시 업체에 해당하는 품목 리스트만 조회
		$(document).on("change", "#vendorId", function() {
			vendorName = $("#vendorId").jqxComboBox('getSelectedItem').originalItem.label;
			var vendorStartIndex = vendorName.indexOf("(") + 1;
            var vendorEndIndex = vendorName.lastIndexOf(")");
            vendorName = vendorName.substring(vendorStartIndex, vendorEndIndex);
			
            getVenderItemList();
			
			function getVenderItemList(){
				$.ajax({
					type : 'GET',
					url :  tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendorItem.dummy',
					timeout : 30000000,
					async : false,
					data : {key : $("#vendorId").val()},
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						//Item combo
						var optItem = {textName : "name", valueName : "code"};
						optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy"; // 검색 URL
						optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
						optItem.minLength = 4; // 최소 검색 수
						optItem.param = {divisionCd: divisionCd, key : $("#vendorId").val()}; // 기본 파라미터
						
						mCommon.comboBoxSearchCall("#itemId", {searchMode:'containsignorecase', autoComplete:true}, optItem);
					},
					error : function(error){
						errors = error;
					},
					fail : function(){
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
			}
			
			if($("#costFlag").val() == "N" && $("#itemId").val() != "" && $("#mktName").val() != "" && $("#currency").val() != "") {
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
			}
		});
		
		//품목 선택 시 품목에 해당하는 품명, 규격, 단위, 자재Type 자동 매핑
		$(document).on("change", "#itemId", function() {
			getItemList();
			
			//유/무상 여부 상관 없이 품목에 해당하는 품명, 품목Type, 단위, 규격 정보를 조회
			function getItemList(){
				$.ajax({
					type : 'GET',
					url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comSelectItem.dummy',
					timeout : 30000000,
					async : false,
					data : {key : $("#itemId").val()},
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						$("#itemName").val(data[0].text);
						$("#itemTypeName").val(data[0].itemTypeName);
						$("#unit").val(data[0].unit);
						$("#specification").val(data[0].specification);
						dpFlag = data[0].dpFlag;
						$("#costFlag").val(data[0].freeOfferFlag);
					},
					error : function(error){
						errors = error;
					},
					fail : function(){
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
			}
			
			if($("#costFlag").val() == "N" && $("#vendorId").val() != "" && $("#mktName").val() != "" && $("#currency").val() != "") {
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
			}
		});
		
		//MKT 변경 시
		$(document).on("change", "#mktName", function() {
			if($("#costFlag").val() == "N" && $("#vendorId").val() != "" && $("#itemId").val() != "" && $("#currency").val() != "") {
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
			}
		});
		
		//환종 변경 시
		$(document).on("change", "#currency", function() {
			if($("#costFlag").val() == "N" && $("#vendorId").val() != "" && $("#itemId").val() != "" && $("#mktName").val() != "") {
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
			}
		});
		
		//입고일자 변경 시
		$(document).on("change", "#stateTime", function() {
			if($("#costFlag").val() == "N" && $("#vendorId").val() != "" && $("#itemId").val() != "" && $("#currency").val() != "" && $("#mktName").val() != "") {
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
			}
		});
		
		//유/무상 변경 시
		$(document).on("change", "#costFlag", function() {
			var options = {local: "", textName : "text", valueName : "id", readonly : false};
			var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
			
			//무상일 경우
			if($("#costFlag").val() == "Y") {
				var freeLocationCd = freeLocation;
				var freeLocationName = freeLocationName;
				$("#unitPrice").val(0);
				
					$.ajax({
						type : 'GET',
						url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFreeInputFlag.dummy',
						timeout : 30000000,
						async : false,
						data : {flag : $("#costFlag").val()},
						dataType : 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								options.local = data;
								micaCommon.comboBox.set("#locationIn", comboOptions, options);
								
								$("#locationIn").val(data[0].text);
								freeInputFlag = data[0].freeInputFlag;
				            } else {
								$("#locationIn").val(Language.lang['MESSAGES10341']);
							}
						},
						error : function(error){
							errors = error;
						},
						fail : function(){
							micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
						}
					});
			} else {	//유상일 경우
				getUnitPrice();
				
				if(defaultCurrency != $("currency").val()) {
					getExchangeRate();
				}
				
					$.ajax({
						type : 'GET',
						url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comFreeInputFlag.dummy',
						timeout : 30000000,
						async : false,
						data : {flag : $("#costFlag").val()},
						dataType : 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								options.local = data;
								micaCommon.comboBox.set("#locationIn", comboOptions, options);
								
								$("#locationIn").val(data[0].text);
								freeInputFlag = data[0].freeInputFlag;
				            } else {
								$("#locationIn").val(Language.lang['MESSAGES10342']);
							}
						},
						error : function(error){
							errors = error;
						},
						fail : function(){
							micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
						}
					});
			}
		});
		
		// 취소버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid"); 
		});
		
		//복사  버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length > 1 || selectItems.length < 1) { 
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return; }
			$("#exceptionInpuPop").micaModal("show");
			that.setExceptionInputPop(selectItems[0].item);
		});
		
		//입고처리 버튼 
		$(document).on("click", "#inputBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11068']});
				return;
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10907'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					param = {
						inOutFlag : "IN"
					}
					
					mom_ajax("D", "common.delItemStockExTemp", JSON.stringify(param), that.callBack, param, "delCall");
				}
			}});
		});
		
	},
	setExceptionInputPop : function(data) {
		data = data || {};
		$("#vendorId").val(data.vendorCd || "");
		$("#itemId").val(data.itemId || "");
		$("#itemName").val(data.itemName || "");
		$("#costFlag").val(data.freeOfferFlagName);
		$("#specification").val(data.specification || "");
		$("#unit").val(data.unit || "");
		$("#itemTypeName").val(data.itemTypeName || "");
		$("#locationIn").val(data.locationInCd || ""); 
		$("#stateTime").val(data.stateTime || get_date_diff(0));
		$("#qty").val(data.qty || "");
		$("#mktName").val(data.marketCd);
		$("#currency").val(data.currencyCd);
		$("#unitPrice").val(data.unitPrice || "");
		$("#inItemExceptionFlag").val(data.ioCategory);
		$("#description").val(data.description || "");
		
		$("#itemName, #specification, #unit, #itemTypeName, #unitPrice").attr("readonly","readonly");
	},
	getExceptionInputPop: function() {
		var freeOfferFlagName = $("#costFlag").jqxComboBox('getSelectedItem').originalItem.label;
		var marketName = $("#mktName").jqxComboBox('getSelectedItem').originalItem.label;
		var currencyName = $("#currency").jqxComboBox('getSelectedItem').originalItem.label;
		var inItemExcetionFlagName = $("#inItemExceptionFlag").jqxComboBox('getSelectedItem').originalItem.label;
		
		var locationStartIndex = $("#locationIn").val().indexOf("(") + 1;
        var locationEndIndex = $("#locationIn").val().lastIndexOf(")");                
        var locationCdEndIndex = $("#locationIn").val().indexOf("(");
        
        locationCd = $("#locationIn").val().substring(0, locationCdEndIndex);
        locationName = $("#locationIn").val().substring(locationStartIndex, locationEndIndex);
        
        if(locationEndIndex == -1) {
			locationStartIndex = $("#locationIn").find('.jqx-combobox-input').val().indexOf("(") + 1;
	        locationEndIndex = $("#locationIn").find('.jqx-combobox-input').val().lastIndexOf(")");
	        locationCdEndIndex = $("#locationIn").find('.jqx-combobox-input').val().indexOf("(");
	        
	        locationCd = $("#locationIn").find('.jqx-combobox-input').val().substring(0, locationCdEndIndex);
	        locationName = $("#locationIn").find('.jqx-combobox-input').val().substring(locationStartIndex, locationEndIndex);
        }
		
		var result = {
				vendorCd : $("#vendorId").val(),
				vendorName : vendorName,
				itemId : $("#itemId").val(),
				itemName : $("#itemName").val(),
				itemTypeName : $("#itemTypeName").val(),
				freeOfferFlag : $("#costFlag").val(),
				freeOfferFlagName : freeOfferFlagName,
				locationInName : locationName,
				locationInCd : locationCd, 
				qty : $("#qty").val(),
				unit : $("#unit").val(),
				unitPrice : $("#unitPrice").val(),
				marketName : marketName,
				marketCd : $("#mktName").val(),
				currencyName : currencyName,
				currencyCd : $("#currency").val(),
				exchangeRate : exchangeRate,
				stateTime : $("#stateTime").val(),
				inItemExcetionFlag : $("#inItemExceptionFlag").val(),
				inItemExcetionFlagName : inItemExcetionFlagName,	//예외입고입고 구분명
				specification : $("#specification").val(),
				description : $("#description").val(),
				freeInputFlag : freeInputFlag,	//유상입고인지 무상입고인지 여부
				dpFlag : dpFlag					//소수점입고 가능한지 여부
			}
		return result;
	},
	comboBox: function(){
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 업체
		mCommon.comboBoxClickCall("#vendorId", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorId",comboOptions, options);
					callBack();
				}
			);
		});

		// 유/무상
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"FREE_OFFER_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#costFlag", {selectedIndex:0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// Market
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MARKET_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#mktName", {selectedIndex:2, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// 환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CURRENCY_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#currency", {selectedIndex:0, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
		
		// 예외입고구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "EXCEPTION_IN_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#inItemExceptionFlag", {selectedIndex:0, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	},
	callBack : function(result, data, param, callbackParam, flag) {
		var that = this.MOMCC008;
		var arrayList = [];
		if(result == "SUCCESS"){
			if(flag == "delCall") {
				var checkedItems = AUIGrid.getCheckedRowItems("grid");
				for(var i=0; i<checkedItems.length; i++) {
					checkedItems[i].item.orderSeq = i+1;
					checkedItems[i].item.inOutFlag = "IN";
					arrayList.push(checkedItems[i].item);
				}
				
				mom_ajax("L", "common.insItemStockExTemp", JSON.stringify(arrayList), that.callBack, arrayList, "insCall");
				
			} else if(flag == "insCall") {
				param = {};
				mom_ajax("C", "common.itemStockInException", JSON.stringify(param), that.callBack, param, "procCall");
				
			} else {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				AUIGrid.clearGridData("grid");
			}
			
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
	MOMCC008.init();
});