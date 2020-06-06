var pivot = "";

var MOMBD002 = {
	init: function() {
		var that = this;
		that.getPlanId();
		that.setPlanIdDate();
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807051536311331000L8FWTCABBq2", null, function(){}, Language);
		});
	}, grid: function() {		
		
		
	}, event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			var planHorizon;
			
			$.ajax({
				type : 'GET',
				url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.horizon.dummy',
				timeout : 30000000,
				async : false,
				dataType : 'json',
				data : {planId : $("#planId").val()},
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					planHorizon = data[0].planHorizon;
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
//			
//			if(betweenDay > planHorizon) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10143'] });
//				return;
//			}
			
			mCommon.pageRender("grid", "W201807051536311331000L8FWTCABBq2",  that.getSearchData(), function(dataSet){
				var data = dataSet;
				var groupFields = [];
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
							groupFields.push(key);
							var columnObj = { dataField : key, style: "right-column", dataType: "numeric", formatString: "#,###" };
							changeColumn.push(columnObj);
						}
					});				
				}
				AUIGrid.changeColumnLayout("grid", changeColumn);
				AUIGrid.setGroupBy("grid",  ["resourceName"], {
					dataFields : groupFields
				});

				AUIGrid.setGridData("grid", data);
			});
		});
		
		// 확정생산계획 엑셀 다운 버튼
		$(document).on("click", "#syncExcelDownBtn", function() {
			// 수정된 다운로드
			var param = {
					planId : $("#planId").val(),
					fromDate : $("#fromDate").val(),
					toDate : $("#toDate").val(),
					itemId : $("#itemName").val(), 
					resourceId : $("#resourceName").val(),
					pivot : pivot
				}
			mCommon.getDataset("W201807051536311331000L8FWTCABBq2/data", param, undefined, function(dataSet) {
				var data = dataSet;
				mCommon.auiGridExcelExport("grid", {fileName: "PRODUCTION_SYNC_PLAN_MOMBA004_" + get_current_date("yyyy-mm-dd"), data: data});
			});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			// 기존 다운로드
			mCommon.auiGridExcelExport("grid", {fileName: "PRODUCTION_PLAN_MOMBD002_" + get_current_date("yyyy-mm-dd")});
		});
		
		//planID 콤보박스 변경할 경우 date값 변경  
		$("#planId").on("change", function(e) {
			that.setPlanIdDate();
        });
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function() {
		//설비 가져오기.
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", 
				{}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#resourceName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly :false});
					callBack();
				}
			);
		});
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
				resourceId : $("#resourceName").val(),
				pivot : pivot
			}
		return param;
	},
	getPlanId: function(){
		//planID 가져오기.
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.productionPlan.productionPlanId.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#planId", {selectedIndex:0, searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "planId", valueName : "planId"});
			},
			error: function(data){},
			fail : function(data){}
		});
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
            pivot +=  "SUM(DECODE (TO_CHAR(A.PLAN_DATE,'YYYYMMDD'),'" + lastDay  +"',A.PLAN_QTY, '')) AS \"" + lastDisplayDay +"\"";
       
            if(i != compareDay -1){
            	pivot += ", ";
            }
        }
	},
	setPlanIdDate: function(){
		var that = this;
		if($("#planId").val() == ''){	
			return;
		}
		pivot = "";
		//Date 가져오기
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.productionPlan.planId_date.dummy",
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
	}
};
$(document).ready(function(event){
	MOMBD002.init();
});