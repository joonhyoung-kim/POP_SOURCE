var pivot;
var columnLayout;

var MOMBD005 = {
	init: function() {
		var that = this;
		Language.init(function() {
			that.setGridFormat("grid");
		});
		that.comboBox();
		that.event();
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
			
			if($("#fromDate").val() == '' || $("#toDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			var betweenDay = (toDate.getTime() - fromDate.getTime())/1000/60/60/24;
			
			if(betweenDay > planHorizon) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10143']});
				return;
			}			
			
			that.selectList();			
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "RESOURCE_USAGE_R_MOMBD005_" + get_current_date("yyyy-mm-dd")});
		});
		
		//planID 콤보박스 변경할 경우 date값 변경  
		$("#planId").on("change", function(e) {
			that.setPlanIdDate();
			AUIGrid.clearGridData("grid");
        });
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#routeName'), $('#findBtn'));
	},
	comboBox : function(){		
		// Plan ID
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.resourceUsageR.planId.dummy", 
			{}, 
		     function(data){
				micaCommon.comboBox.set("#planId",{searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code"});
			 }
		);
		
		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy",
				{}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#resourceName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
					callBack();
				}
			);
		});
	},
	selectList: function(){
		var that = this;
		micaCommon.splash.show();
		var param = that.getSearchData();
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.resourceUsageR.resourceUsageR.dummy",
			type : "GET",
			data : param,
			async: true,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){		
				var gridColumn = AUIGrid.getColumnLayout("grid");	
				for(var i = gridColumn.length; i >= 0; i--) {
					if(gridColumn[i] == undefined) {
						AUIGrid.removeColumn("grid", i);
					} else {
						if(gridColumn[i].headerText == undefined) {
							AUIGrid.removeColumn("grid", i);
						}
					}
				}
				if(data.length > 0){
					var i = 0;
					$.each(data[0], function(key, value){
						if(key.match("/")){
							var columnObj = { dataField : key, editable: true, "width":80, style: "right-column", dataType: "numeric", formatString: "#,###" };
							AUIGrid.addColumn("grid", columnObj, "last");
							i++;
						}
					});
				}
				AUIGrid.setGridData("grid", data);
				micaCommon.splash.hide();
			},
			error: function(data){
				micaCommon.splash.hide();
			},
			fail : function(data){
				micaCommon.splash.hide();
			}
		});		
		
	},
	setGridFormat: function(gridId){
		columnLayout = [
			{
				dataField : "routeId",
				headerText : Language.lang['MESSAGES10200'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "resourceId",
				headerText : Language.lang['MESSAGES10673'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11577'],
				editable : false,
				width : 120,
				cellMerge : true
			},
			{
				dataField : "categoryId",
				headerText : Language.lang['MESSAGES11495'],
				editable : false,
				width : 100
			}
		];

		var gridProps = {
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				cellMergePolicy : "withNull",
				rowSelectionWithMerge : true,				
				editable : false
		};

		AUIGrid.create(gridId, columnLayout, gridProps);		
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
            
            pivot +=  ", SUM(DECODE(PLAN_DATE, '" + lastDay  +"', PLAN_RESULT, 0)) AS \"" + lastDisplayDay +"\"";
            
        }
	},
	setPlanIdDate: function(){
		if($("#planId").val() == ''){	
			return;
		}
		pivot = "";
		//Date 가져오기
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.outsourcingPlan.outsourcingPlanId_date.dummy",
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
	getSearchData : function(){
		var that = this;
		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
		that.getDiff(fromDate, toDate);

		var param = {
				planId : $("#planId").val() || "",
				fromDate : $("#fromDate").val() || "",
				toDate : $("#toDate").val() || "",
				itemId : $("#itemName").val() || "", 
				resourceId : $("#resourceName").val() || "",
				routeId : $("#routeName").val() || "",
				pivot : pivot
			}

		return param;
	},
};
$(document).ready(function(event){
	MOMBD005.init();
});