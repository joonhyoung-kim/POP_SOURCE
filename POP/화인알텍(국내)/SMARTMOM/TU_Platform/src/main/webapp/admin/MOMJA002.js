var empAuthority  = sessionStorage.getItem("empAuthority");
var MOMJA002 = {
	init: function() {
		var that = this;
		Language.init(function() {
			if(empAuthority != '99999999') {
				$("#SaveBtn").remove();
				$("#findBtn").remove();
				$(".steup_line").find(".jqx-combobox").jqxComboBox({disabled : true});
				$(".steup_line").find(".w-input").attr("readonly", "readonly");
			}
		});
		that.comboBox();
		that.setSetup();
		that.grid();
		that.event();
	}, grid: function() {
	}, event: function() {
		var that = this;
		// 저장
		$("#SaveBtn").click(function(event){
			if($("#demandHorizon").val() > $("#planHorizon").val()){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10144']});  
				return;
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK",    
				after:function(){
					var param = {
						localTime : $("#localTime").val(),
						currency : $("#currencyCd").val(),
						market : $("#marketCd").val(),
						demandHorizon : $("#demandHorizon").val(),
						demandHorizonUom : $("#demandHorizonUom").val(),
						demandCreateType : $("#demandCreateType").val(),
						planHorizon : $("#planHorizon").val(),
						planHorizonUom : $("#planHorizonUom").val(),
						syncPlanUseFlag : $("#syncPlanUseFlag").val(),
						moPriceBlockingFlag : $("#moPriceBlockingFlag").val(),
						autoCancelWoUseFlag : $("#autoCancelWoUseFlag").val(),
						defectQtyUseFlag : $("#defectQtyUseFlag").val(),
						woResultOverFlag : $("#woResultOverFlag").val(),
						shippingOverFlag : $("#shippingOverFlag").val(),
						specificationType : $("#specificationType").val(),
						materialLotUseFlag : $("#materialLotUseFlag").val(),
						productLotUseFlag : $("#productLotUseFlag").val(),
						shippingLotUseFlag : $("#shippingLotUseFlag").val(),
						reportExcelPath : $("#reportExcelPath").val(),
						reportApplicationUrl : $("#reportApplicationUrl").val(),
						b2biVendorCd : $("#b2biVendorCd").val(),
						b2biPpUseFlag : $("#b2bippuseflag").val(),
						b2biPoUseFlag : $("#b2bipouseflag").val(),
						b2biDepartureUseFlag : $("#b2bidepartureuseflag").val(),
						b2biReceivingUseFlag : $("#b2bireceivinguseflag").val(),
//						configSetId : $("#configSetId").val(),
						demandUploadType : $("#demandUploadType").val(),
						demandPoUploadType : $("#demandPoUploadType").val(),
						itemPoUploadType : $("#itemPoUploadType").val(),
						allowMinusQty : $("#allowMinusQty").val(),
						autoDeductionFlag : $("#autoDeductionFlag").val(),
						outsourcingUseFlag : $("#outsourcingUseFlag").val(),
						autoVendorLocationFlag : $("#autoVendorLocationFlag").val(),
						pgOrderUseFlag : $("#pgOrderUseFlag").val(),
						ppQtyType : $("#ppQtyType").val(),
						simpleWidgetFlag : $("#simpleWidgetFlag").val(),
						pastSoCreateFlag : $("#pastSoCreateFlag").val()
					}
					mom_ajax("U", "admin.setup.setup", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		// 검색
		$("#findBtn").click(function(event){
			that.setSetup();
		});
	},
	comboBoxCount: 0,
	comboBox: function() {
		var that = this;
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#syncPlanUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				micaCommon.comboBox.set("#moPriceBlockingFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				micaCommon.comboBox.set("#autoCancelWoUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#defectQtyUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				micaCommon.comboBox.set("#woResultOverFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#shippingOverFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#materialLotUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#productLotUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#shippingLotUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#b2bippuseflag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#b2bipouseflag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#b2bidepartureuseflag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#b2bireceivinguseflag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#allowMinusQty",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#autoDeductionFlag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#outsourcingUseFlag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#autoVendorLocationFlag",{searchMode:'containsignorecase', autoComplete:true}, options);
				micaCommon.comboBox.set("#pgOrderUseFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#simpleWidgetFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				micaCommon.comboBox.set("#pastSoCreateFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				
				
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//local Time 
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"LOCAL_TIME"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#localTime",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CURRENCY_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#currencyCd",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//Market
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MARKET_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#marketCd",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:2}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//수요생성방법
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"DEMAND_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#demandCreateType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//시방서 생성방식
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SPECIFICATION_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#specificationType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//업로드방법
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ROW_COL_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#demandUploadType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				micaCommon.comboBox.set("#demandPoUploadType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				micaCommon.comboBox.set("#itemPoUploadType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
		
		//영업마스터 수량 생성 방식
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			{codeClassId:"PP_QTY_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#ppQtyType",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
				that.comboBoxCount++;
				that.setSetup();
			}
		);
	},
	setSetup : function (){
		if(this.comboBoxCount < 6) {
			return;
		}
		
		var dataSetup;
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.setup.setup.dummy",
			type : "GET",
			data : {},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				dataSetup = data[0];
				
				$("#localTime").val(dataSetup.standardTime);
				$("#currencyCd").val(dataSetup.currencyCd);
				$("#marketCd").val(dataSetup.marketCd);
				$("#demandHorizon").val(dataSetup.demandHorizon);
				$("#demandCreateType").val(dataSetup.demandCreateType);
				$("#planHorizon").val(dataSetup.planHorizon);
				$("#syncPlanUseFlag").val(dataSetup.syncPlanUseFlag);
				$("#moPriceBlockingFlag").val(dataSetup.moPriceBlockingFlag);
				$("#autoCancelWoUseFlag").val(dataSetup.autoCancelWoUseFlag);
				$("#defectQtyUseFlag").val(dataSetup.defectQtyUseFlag);
				$("#woResultOverFlag").val(dataSetup.woResultOverFlag);
				$("#shippingOverFlag").val(dataSetup.shippingOverFlag);
				$("#specificationType").val(dataSetup.specificationType);
				$("#materialLotUseFlag").val(dataSetup.materialLotUseFlag);
				$("#productLotUseFlag").val(dataSetup.productLotUseFlag);
				$("shippingLotUseFlag").val(dataSetup.shippingLotUseFlag);
				$("#reportExcelPath").val(dataSetup.reportExcelPath);
				$("#reportApplicationUrl").val(dataSetup.reportApplicationUrl);
				$("#b2biVendorCd").val(dataSetup.b2biVendorCd);
				$("#b2bippuseflag").val(dataSetup.b2biProductFlag);
				$("#b2bipouseflag").val(dataSetup.b2biPoUseFlag);
				$("#b2bidepartureuseflag").val(dataSetup.b2biDepartureUseFlag);
				$("#b2bireceivinguseflag").val(dataSetup.b2biReceivingUseFlag);
//				$("#configSetId").val(dataSetup.configSetId);
				$("#demandUploadType").val(dataSetup.demandUploadType);
				$("#demandPoUploadType").val(dataSetup.demandPoUploadType);
				$("#itemPoUploadType").val(dataSetup.itemPoUploadType);
				$("#allowMinusQty").val(dataSetup.allowMinusQty);
				$("#autoDeductionFlag").val(dataSetup.autoDeductionFlag);
				$("#outsourcingUseFlag").val(dataSetup.outsourcingUseFlag);
				$("#autoVendorLocationFlag").val(dataSetup.autoVendorLocationFlag);
				$("#pgOrderUseFlag").val(dataSetup.pgOrderUseFlag);
				$("#ppQtyType").val(dataSetup.ppQtyType);
				$("#simpleWidgetFlag").val(dataSetup.simpleWidgetFlag);
				$("#pastSoCreateFlag").val(dataSetup.pastSoCreateFlag);
				
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	callbackPost : function(result, data){
		if(result == "SUCCESS"){
			micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});  
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
	MOMJA002.init();
});