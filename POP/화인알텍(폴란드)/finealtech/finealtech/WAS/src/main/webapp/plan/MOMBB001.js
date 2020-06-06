var pivot = "";

var MOMBB001 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201807031422579311000GSdO2rkaqfn", null, function(){
				that.grid("grid");
				that.comboBox();
				that.event();
			}, Language);
		});
		$("#fromDate", "#toDate").attr("readonly","readonly");
	}, grid: function() {
	}, event: function() {
		var that = this;		
		// 조회 버튼
		$(document).on("click","#findBtn",function() {
			var demandHorizon;
			
			$.ajax({
				type : 'GET',
				url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.horizon.dummy',
				timeout : 30000000,
				async : false,
				dataType : 'json',
				data : {planId : $("#planId").val()},
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					demandHorizon = data[0].demandHorizon;
				},
				error : function(error){
					errors = error;
				},
				fail : function(){
					micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
				}
			});
			
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
//			var betweenDay = (toDate.getTime() - fromDate.getTime())/1000/60/60/24;
			
//			if(betweenDay > demandHorizon) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: "수요생성구간까지만 조회가 가능합니다." });
//				return;
//			}
			
			// 2019.01.17 hyjeong begin
			/*mCommon.render("grid", "W201807031422579311000GSdO2rkaqfn",  that.getSearchData(), function(dataSet){*/
			mCommon.pageRender("grid", "W201807031422579311000GSdO2rkaqfn",  that.getSearchData(), function(dataSet){

				console.time('draw');
				var data = dataSet;
				var gridColumn = AUIGrid.getColumnLayout("grid");	
				var changeColumn = [];
				
				for(var i = 0; i <= gridColumn.length; i++) {
					if(gridColumn[i] != undefined && gridColumn[i].headerText != undefined) {
						changeColumn.push(gridColumn[i]);
					}
				}
				
				if(data.length > 0){
					$.each(data[0], function(key, value){
						if(key.match("/")){
							var columnObj = { dataField : key, style: "right-column", dataType: "numeric", formatString: "#,###" };
							changeColumn.push(columnObj);
						}
					});				
				}
				
				AUIGrid.changeColumnLayout("grid", changeColumn);
				AUIGrid.setGridData("grid", data);
				console.timeEnd('draw');
			});
			// 2019.01.17 hyjeong end
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			// 2019.01.20 hyjeong begin
			/*mCommon.auiGridExcelExport("grid", {fileName: "DEMAND_PLAN_MOMBB001_" + get_current_date("yyyy-mm-dd")});*/
			var param = that.getSearchData();
			param.startPage = 1;
			param.endPage = 1000000;
			mCommon.getDataset("W201807031422579311000GSdO2rkaqfn/data", param, undefined, function(dataSet) {
				var data = dataSet;
				mCommon.auiGridExcelExport("grid", {fileName: "DEMAND_PLAN_MOMBB001_" + get_current_date("yyyy-mm-dd"), data: data});
			});
			// 2019.01.20 hyjeong end
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
		$("#planId").on("change", function(e) {
			that.setPlanIdDate();
        });		
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function(){		
		// Plan ID
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId.dummy", {}, 
		     function(data){
				micaCommon.comboBox.set("#planId",{searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code"});
			 }
		);
		
		// 업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", {}, 
		     function(data){
				micaCommon.comboBox.set("#vendorName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			 }
		);
	},
	getSearchData: function() {
		var that = this;
		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
		that.getDiff(fromDate, toDate);
		var param = {
			planId : $("#planId").val(),
			fromDate : $("#fromDate").val(),
			toDate : $("#toDate").val(),
			itemId : $("#itemName").val(), 
			vendorCd : $("#vendorName").val(),
			pivot : pivot
		}
		return param;
	},
	getDiff : function(sDate, eDate){
		var FORMAT = "-";
		pivot = "";

        var start_dt = sDate.split(FORMAT);
        var end_dt = eDate.split(FORMAT);
        start_dt[1] = (Number(start_dt[1]) - 1) + "";
        end_dt[1] = (Number(end_dt[1]) - 1) + "";
        var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2], "00", "00");
        var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2], "00", "00");

        compareDay = (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24;
        compareDay = compareDay + 1;

        for ( var i = 0; i < compareDay; i++) {
            var newDay = new Date(sDate);
            newDay.setDate(newDay.getDate() + i);
            var changeDay = new Date(newDay);
            var changeFY = changeDay.getFullYear();
            var changeHY = changeFY + "";
            var changeHY = changeHY.substring(2, 4);
            var changeM = changeDay.getMonth() + 1;
            var changeD = changeDay.getDate() + 0;
            
            if (changeM < 10) {
                changeM = "0" + changeM;
            } else {
            	changeM = "" + changeM;
            }
            if (changeD < 10) {
                changeD = "0" + changeD;
            } else {
            	changeD = "" + changeD;
            }
            
            var lastDay = changeFY + changeM + changeD;
            var lastDisplayDay = changeHY + '/' + changeM + '/' + changeD;
            pivot +=  ", TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + lastDay  +"', QTY, 0))) AS \"" + lastDisplayDay +"\"";
       
        }
	},
	setPlanIdDate: function(){
		if($("#planId").val() == ''){	
			return;
		}
		
		pivot = "";
		//Date 가져오기
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
			type : "GET",
			data : {planId:$("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				var fromDate =data[0].planDate;
				var toDate =data[data.length - 1].planDate;
				var planDateArray = new Array;
				var dueDateList = new Array;
				var dueDayList = new Array;
				
				$("#fromDate").val(to_date_yyyy_mm_dd(fromDate));
				$("#toDate").val(to_date_yyyy_mm_dd(toDate));
				
			},
			error: function(data){},
			fail : function(data){}
		});
				
	},
	productPlanCreateCollback : function(param, data){
		var that = this.MOMBB001;
		micaCommon.splash.hide();
		if(param == 'SUCCESS'){
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10620']});
			that.setPlanIdDate();
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMBB001.init();
});