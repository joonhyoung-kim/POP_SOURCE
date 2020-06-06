var vendorSiteCd = "";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var userId = sessionStorage.getItem("userId");

var MOMFB003 = {   	
	init: function() {
		Language.init(function() {
			mCommon.init("grid", "W201809101423135781002EdhH0bShjkV", null, null, Language);
		});
		var that = this;
		that.comboBox();
		that.event();
//		mCommon.init("grid", "W201809101423135781002EdhH0bShjkV", null, function() {
//			that.grid();	
//		});
	}, grid: function() {
	}, event: function() {
		var that = this;	
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){		
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
			
			micaCommon.splash.show();
//			mCommon.render("grid", "W201809101423135781002EdhH0bShjkV", mCommon.formGetParam("#form"), function(){});
			setTimeout(function() {
				mCommon.pageRender("grid", "W201809101423135781002EdhH0bShjkV", mCommon.formGetParam("#form"), function(data){
					if(data.length < 1) {
						return;
					} else {
						for (var i = 0; i < data.length; i++) {
							var departureDate = 'departureDate';
				            var col_set1 = {
								dataField : departureDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										}
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', departureDate, col_set1);
							
							var departureCancelDate = 'departureCancelDate';
				            var col_set2 = {
								dataField : departureCancelDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', departureCancelDate, col_set2);
							
							var transferDate = 'transferDate';
				            var col_set3 = {
								dataField : transferDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', transferDate, col_set3);
						}
					}
				}, "plan.order.B2BIifdep.b2biIfDepCount");
			}, 500);
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			micaCommon.splash.show();
			setTimeout(function() {
				mCommon.auiGridExcelExport("grid", {fileName: "DEPARTURE_B2BI_MOMFB003_" + get_current_date("yyyy-mm-dd"), allData : true});
			}, 1000);
		});
		
		// 현행화 버튼
		$(document).on("click", "#uploadBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10009'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
//					fn_b2bi_upload('com.thirautech.mom.plan.order.B2BIifdep.b2biIfDep', { vendorSiteCd : vendorSiteCd, b2biType : "DepartureStatusGERP" }, that.callbackPost);
					var param = {
						divisionCd : divisionCd,
						companyCd : companyCd,
						userId : userId
					}
					
					mom_ajax("C", "plan.order.B2BIifdep.b2biIfDep", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#departureStatus'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#departureNum'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#poNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#partNo'), $('#findBtn'));
	},
	comboBox: function() {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "LG_IF_DATE", attribute3 : "Y"}, function(data){
			micaCommon.comboBox.set("#orderSeq",{searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "B2BI_DEPARTURE_STATE"}, function(data){
			micaCommon.comboBox.set("#departureStatus",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
		
		//B2BI Vendor Site Cd 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				vendorSiteCd = data[0].b2biVendorCd;
			}
		);
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.organizationCode.dummy',  {}, function(data){
			micaCommon.comboBox.set("#organizationCode",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "code", valueName : "code", readonly: false});
		});
	}, 
	callbackPost : function(param, data){
		micaCommon.splash.hide();
		if(data.p_err_code == 'S'){
			mCommon.pageRender("grid", "W201809101423135781002EdhH0bShjkV", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			}, "plan.order.B2BIifdep.b2biIfDepCount");
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
		}
	}
};
$(document).ready(function(event){
	MOMFB003.init();
});