var locationParam = mCommon.getSearchParam();
var totalKrwAmount;
var totalVat;
var gvVendorType;
var gvResultFlagOptions;

var MOMHA006 = {
	init: function() {
		var that = this;
		if(locationParam.inoutFlag == "I") {
			title = Language.lang['MESSAGES11102'];
			itemSearchTitle = Language.lang['MESSAGES11091'];
			vendorSearchTitle = Language.lang['MESSAGES10849'];
			gvVendorType = "'COOPERATIVE','BOTH'";
			gvResultFlagOptions = {codeClassId : "RESULT_END_FLAG", attribute1 : 'Y'};
		} else {
			title = Language.lang['MESSAGES11230'];
			itemSearchTitle = Language.lang['MESSAGES11223'];
			vendorSearchTitle = Language.lang['MESSAGES10184'];
			gvVendorType = "'CUSTOMER','BOTH'";
			gvResultFlagOptions = {codeClassId : "RESULT_END_FLAG", attribute2 : 'Y'};
		}
		$("#itemIdLabel").text(itemSearchTitle);
		$("#vendorNameLabel").text(vendorSearchTitle);
		$("#materialMonthlyHistLabel").text(title);
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201812141131061601000YqREHoPyBD1", null, function() {
				that.grid("grid");
			}, Language);
		});
	}, 
	grid: function() {
		var that = this;
		$("#fromDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(new Date().getFullYear(), new Date().getMonth() -1)));
        $("#toDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(new Date().getFullYear(), new Date().getMonth(), 0)));
        $(".aui-grid-default-footer").css({"text-align": "right"});
        
        var footerObject = [
	        {
	        	dataField : "magamSeq",
	        	positionField : "magamSeq",
	        	operation : "COUNT",
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11352'] + ": " + AUIGrid.formatNumber(value, "#,##0");
				}
	        },
	        {
	        	dataField : "qty",
	        	positionField : "endDate",
	        	operation : "SUM",
	        	colSpan : 2,
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11366'] + ": " + AUIGrid.formatNumber(value, "#,##0.00");
				}
	        },
	        {
	        	dataField : "conversionUnitQty",
	        	positionField : "ioTime",
	        	operation : "SUM",
	        	colSpan : 2,
				labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11368'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000");
				}
	        },
	        {
	        	dataField : "foreignTotalPrice",
	        	positionField : "itemName",
	        	operation : "SUM",
	        	colSpan : 2,
	        	labelFunction : function(value, columnValues, footerValues) {
					return Language.lang['MESSAGES11362'] + ": " + AUIGrid.formatNumber(value, "#,##0.0000");
				}
	        },
	        {
	        	dataField : "inoutPrice",
	        	positionField : "qty",
	        	operation : "SUM",
	        	formatString : "#,###",
	        	colSpan : 3,
				labelFunction : function(value, columnValues, footerValues) {
					totalKrwAmount = Number(value); 
			        return Language.lang['MESSAGES11363'] + ": " + AUIGrid.formatNumber(value, "#,##0", "rounding");
				}
	        },
	        {
	        	dataField : "inoutVat",
	        	positionField : "currencyCd",
	        	operation : "SUM",
	        	colSpan : 3,
				labelFunction : function(value, columnValues, footerValues) {
					totalVat = Number(value);
					return Language.lang['MESSAGES11358'] + ": " + AUIGrid.formatNumber(value, "#,##0", "floor");
				}
	        },
	        {
	        	dataField : "totalAmount",
	        	positionField : "inoutPrice",
	        	operation : "SUM",
	        	colSpan : 3,
	        	labelFunction : function(value, columnValues, footerValues) {
	        		return Language.lang['MESSAGES11365'] + ": " + AUIGrid.formatNumber(totalKrwAmount + totalVat, "#,##0", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
        
        // 수량, 환산수량, 외화공급가, 원화공급가, 부가세, 합계금액의 그룹 합계
		AUIGrid.setGroupBy("grid",  ["magamSeq"], {
	         dataFields : [ "qty", "conversionUnitQty", "foreignTotalPrice", "inoutPrice", "inoutVat", "totalAmount" ],
	         labelTexts : [Language.lang['MESSAGES10697']]
		});
		
	}, 
	event: function() {
		var that = this;
		//조회 
		$("#findBtn").click(function() {
			var param = mCommon.formGetParam("#node");
			param.inoutFlag = locationParam.inoutFlag;
			mCommon.render("grid", "W201812141131061601000YqREHoPyBD1", param, function(){});
		});
		
		//엑셀 다운로드
		$("#excelDownBtn").click(function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_MONTHLY_CLOSE_HIST_MOMHA006_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(inputBox)
		tuCommon.addKeyDown($(document), $('#partNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#closeGroup'), $('#findBtn'));
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//dateCombo(마감일자, 출고일자)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "SEARCH_DATE", attribute6 : "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo", {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
			}
		);
		
		//세금구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_TAX"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#taxType", comboOptions, options);
			}
		);
		
		// 업체
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : gvVendorType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorName", comboOptions, options);
					callBack();
				}
			);
		});
		
		//환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "CURRENCY_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#currency", comboOptions, options);
			}
		);
		
		//마감구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				gvResultFlagOptions, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#closeType", comboOptions, options);
			}
		);
		
		//마감유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#closeFlag", comboOptions, options);
			}
		);
		
		//품목유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "ITEM_TYPE"}, // 파라미터 //attribute 확인필요 
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
			}
		);
	}
};
$(document).ready(function(event){
	MOMHA006.init();
});