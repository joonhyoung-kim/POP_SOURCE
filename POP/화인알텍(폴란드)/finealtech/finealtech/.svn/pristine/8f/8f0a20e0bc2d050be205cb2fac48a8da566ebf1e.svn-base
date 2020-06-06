var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var userId = sessionStorage.getItem("userId");
//var orgCodeList = [];
var orgCode;
var scheduleGroupLength;

var MOMFB001 = {
	init: function() {
		Language.init(function() {
			mCommon.init("grid", "W201809101354202541002CbGZdrRvchZ", null, null, Language);
		});
		var that = this;
		that.comboBox();
		that.event();
//		mCommon.init("grid", "W201809101354202541002CbGZdrRvchZ", null, function() {
//			that.grid();	
//		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		//조회 버튼
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
//			mCommon.render("grid", "W201809101354202541002CbGZdrRvchZ",  mCommon.formGetParam("#form"), function(){});
			setTimeout(function() {
				mCommon.pageRender("grid", "W201809101354202541002CbGZdrRvchZ", mCommon.formGetParam("#form"), function(data){
					if(data.length < 1) {
						return;
					} else {
						//for (var i = 0; i < data.length; i++) {
						var productionDate = 'productionDate';
						var col_set1 = {
								dataField : productionDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
						};
						
						AUIGrid.setColumnPropByDataField('grid', productionDate, col_set1);
						
						var productionStartDate = 'productionStartDate';
						var col_set2 = {
								dataField : productionStartDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
						};
						
						AUIGrid.setColumnPropByDataField('grid', productionStartDate, col_set2);
						
						var productionEndDate = 'productionEndDate';
						var col_set3 = {
								dataField : productionEndDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
						};
						
						AUIGrid.setColumnPropByDataField('grid', productionEndDate, col_set3);
					}
					//}
				}, "plan.order.B2BIifpp.b2biIfPp");
				
			}, 500);
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			micaCommon.splash.show();
			setTimeout(function() {
				mCommon.auiGridExcelExport("grid", {fileName: "PRODUCTPLAN_B2BI_MOMFB001_" + get_current_date("yyyy-mm-dd"), allData : true});
			}, 1000);
		});
		
		// 현행화 버튼
		$(document).on("click", "#uploadBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10005'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
//					fn_b2bi_upload('com.thirautech.mom.plan.order.B2BIifpp.b2biIfPp', { b2biType : "FpDispatchGERP" }, that.callbackPost);
					var param = {
						divisionCd : divisionCd,
						companyCd : companyCd,
						userId : userId
					}
					
					mom_ajax("C", "plan.order.B2BIifpp.b2biIfPp", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		$("#organizationCode").on("change", function() {
			if($("#organizationCode").val() != "") {
				$.ajax({
					type : 'GET',
					url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.selectedOrganizationCode.dummy',
					timeout : 30000000,
					async : false,
					data : {organizationCd : $("#organizationCode").val()},
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data) {
//						orgCodeList += ""
						for(var i = 0; i < data.length; i++) {
							if(i != data.length -1) {
//								orgCodeList += "'" + data[i].code + "', ";
								orgCode = data[i].code;
							} else {
//								orgCodeList += "'" + data[i].code + "'";
								orgCode = data[i].code;
								that.setScheduleComboBox();
							}
						}
					},
					error : function(error) {
						errors = error;
					},
					fail : function() {
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
			} else {
				$("#scheduleGroupCode").val("");
				$("#scheduleGroupCode").jqxComboBox("clearSelection");
			}
		});
		
		$("#scheduleGroupCode").on("click", function() {
			if($("#organizationCode").val() == "") {
				micaCommon.comboBox.set("#scheduleGroupCode",{searchMode:'containsignorecase', autoComplete:true}, {local: {}, textName : "name", valueName : "code", readonly: false});
				$('#jqxComboBox').on('open', function (event) { $("#scheduleGroupCode").jqxComboBox("close" ); }); 
				$("#scheduleGroupCode").val("");
				$("#scheduleGroupCode").jqxComboBox("clearSelection");
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10558']});
				return;
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#workOrderName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#lineCode'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#partNo'), $('#findBtn'));
	},
	comboBox: function() {
		$("#fromDate").val(get_date_diff(0));
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "LG_IF_DATE", attribute1 : "Y"}, function(data){
			micaCommon.comboBox.set("#orderSeq",{searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code", readonly: false});
		});	
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "Y_N"}, function(data){
			micaCommon.comboBox.set("#customerMappingFlag",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
		});	
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.organizationCode.dummy',  {}, function(data){
			micaCommon.comboBox.set("#organizationCode",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "code", valueName : "code", readonly: false});
		});
	},
	setScheduleComboBox: function() {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.scheduleGroupCode.dummy',  {organizationCode : orgCode}, function(data){
			scheduleGroupLength = data;
			if(scheduleGroupLength.length > 0) {
				$("#scheduleGroupCode").jqxComboBox({disabled: false});
				micaCommon.comboBox.set("#scheduleGroupCode",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			} else {
				$("#scheduleGroupCode").val("");
				$("#scheduleGroupCode").jqxComboBox("clearSelection");
				$("#scheduleGroupCode").jqxComboBox({disabled: true});
			}
		});
	},
	callbackPost : function(param, data){
		micaCommon.splash.hide();
		if(data.p_err_code == 'S'){
			mCommon.pageRender("grid", "W201809101354202541002CbGZdrRvchZ", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			}, "plan.order.B2BIifpp.b2biIfPpCount");
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
		}
	}
};
$(document).ready(function(event){
	MOMFB001.init();
});