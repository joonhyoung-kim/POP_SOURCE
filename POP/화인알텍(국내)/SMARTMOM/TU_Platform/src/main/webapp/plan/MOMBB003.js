var eFromDate, eToDate;

var MOMBB003 = {
	init: function() {
		var that = this;
		that.setPlanDate();
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid", "W201807031737182861000c2ZqNI7NNbs", undefined, function() {}, Language);
		});
	}, grid: function() {
	}, event: function() {
		var that = this;
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "NET_DEMAND_PLANNING_MOMBB003_" + get_current_date("yyyy-mm-dd")});
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
			
			mCommon.render("grid", "W201807031737182861000c2ZqNI7NNbs",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 생산계획생성
		$(document).on("click", "#createPlanBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10619'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var planId = get_date_diff(0);
					planId = planId.replace(/-/gi, "") + "_P";
					var param = {planId : planId};
					micaCommon.splash.show();
					mom_ajax("C", "plan.demand.demandPlan.productPlanCreate", JSON.stringify(param), that.productPlanCreateCollback);
				}
			}});
		});
		
		//planID 콤보박스 변경할 경우 date값 변경  
		$(document).on("change", "#planId", function(){
			that.setPlanDate();
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
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#planId",{ selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "name", valueName : "code"});
			},
			error: function(data){},
			fail : function(data){}
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
			data : {planId: $("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					eFromDate = data[0].fromDate;
					eToDate = data[0].toDemandDate;
					$("#fromDate").val(to_date_yyyy_mm_dd(eFromDate));
					$("#toDate").val(to_date_yyyy_mm_dd(eToDate));
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	productPlanCreateCollback : function(result, data){
		var that = this.MOMBB003;
		micaCommon.splash.hide();
		if(result == "SUCCESS"){
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10620']});
			that.setPlanIdDate();
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMBB003.init();
});