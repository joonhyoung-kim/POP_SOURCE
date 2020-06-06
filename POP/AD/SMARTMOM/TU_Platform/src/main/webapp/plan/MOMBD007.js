var eFromDate, eToDate;

var MOMBD007 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.setPlanDate();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W20180628181601700100040IN5hSMeAv", null, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		
		$(document).on("change", "#planId", function(){
			that.setPlanDate();
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "VERIFICATION_PLAN_MOMBD007_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var planIdDate = to_date_yyyy_mm_dd($("#planId").val().substr(0,8));
			planIdDate = new Date(planIdDate);
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			if(fromDate < planIdDate) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10061']});
				return;
			}
			mCommon.render("grid", "W20180628181601700100040IN5hSMeAv",  mCommon.formGetParam("#form"), function(){});
		});
		
		//fromDate 검색조건 변경할 경우 Validation
		$("#fromDate").on("change", function() {
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var planIdDate = to_date_yyyy_mm_dd($("#planId").val().substr(0,8));
			planIdDate = new Date(planIdDate);
			
			if(fromDate > toDate) {
				$("#fromDate").val(to_date_yyyy_mm_dd(eFromDate));
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			if(fromDate < planIdDate) {
				$("#fromDate").val(to_date_yyyy_mm_dd(eFromDate));
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10061']});
				return;
			}
		});
		
		//toDate 검색조건 변경할 경우 Validation
		$("#toDate").on("change", function() {
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var planIdDate = to_date_yyyy_mm_dd($("#planId").val().substr(0,8));
			planIdDate = new Date(planIdDate);
			
			if(fromDate > toDate) {
				$("#toDate").val(to_date_yyyy_mm_dd(eToDate));
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			if(fromDate < planIdDate) {
				$("#fromDate").val(to_date_yyyy_mm_dd(eFromDate));
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10061']});
				return;
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
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
	
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "DEMAND_CHECK_TYPE"}, function(data){
			micaCommon.comboBox.set("#problemReason",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
	},
	setPlanDate : function(){
		if($("#planId").val() == ''){	
			return;
		}
		
//		$.ajax({
//			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
//			type : "GET",
//			data : {planId: $("#planId").val()},
//			async: false,
//			timeout 	: 30000000,
//			dataType 	: 'json',
//			contentType : 'application/json; charset=UTF-8',
//			success : function(data){
//				$("#fromDate").val(to_date_yyyy_mm_dd(data[0].planDate));
//				$("#toDate").val(to_date_yyyy_mm_dd(data[data.length -1].planDate));
//			},
//			error: function(data){},
//			fail : function(data){}
//		});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
			type : "GET",
			data : {planId : $("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					eFromDate = data[0].fromDate;
					eToDate = data[0].toDemandDate;
					var planDateArray = new Array;
					var dueDateList = new Array;
					var dueDayList = new Array;
					
					$("#fromDate").val(to_date_yyyy_mm_dd(eFromDate));
					$("#toDate").val(to_date_yyyy_mm_dd(eToDate));
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	}
};
$(document).ready(function(event){
	MOMBD007.init();
});