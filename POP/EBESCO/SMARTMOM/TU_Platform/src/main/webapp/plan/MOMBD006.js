
var MOMBD006 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.setPlanDate();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201806291703491691000ltMYtYzzsaj", undefined, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "VERIFICATION_PLAN_DETAIL_MOMBD006_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201806291703491691000ltMYtYzzsaj",  mCommon.formGetParam("#form"), function(){});
		});
		
		$(document).on("change", "#planId", function(){
			that.setPlanDate();
		});
	},
	comboBox : function(){
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.verificationPlan.planId.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){

				micaCommon.comboBox.set("#planId",{ selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "planId", valueName : "planId"});
			},
			error: function(data){},
			fail : function(data){}
		});
		
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "PROBLEM_TYPE"}, function(data){
				micaCommon.comboBox.set("#problemType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			});


			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "PROBLEM_ITEM_TYPE"}, function(data){
				micaCommon.comboBox.set("#itemType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			});

		mCommon.comboBoxClickCall("#itemName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comItem.dummy',  {}, function(data){
				micaCommon.comboBox.set("#itemName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				callBack();
			});
		});
		
	},
	setPlanDate : function(){
		if($("#planId").val() == ''){	
			return;
		}
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
			type : "GET",
			data : {planId: $("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				$("#fromDate").val(to_date_yyyy_mm_dd(data[0].planDate));
				$("#toDate").val(to_date_yyyy_mm_dd(data[data.length -1].planDate));
			},
			error: function(data){},
			fail : function(data){}
		});
	}
};
$(document).ready(function(event){
	MOMBD006.init();
});