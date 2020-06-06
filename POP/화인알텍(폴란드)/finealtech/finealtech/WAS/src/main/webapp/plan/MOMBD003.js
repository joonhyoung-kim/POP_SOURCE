var pivot;

var MOMBD003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.setPlanDate();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807161046303991000NYHJS0WGx6x", null, function(){
				that.gridColumnSet();
			}, Language);
		});
	}, grid: function() {
	},
	event: function() {
		var that = this;
		$(document).on("click", "#findBtn", function(){
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
//				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10143']});
//				return;
//			}			
			
			mCommon.render("grid", "W201807161046303991000NYHJS0WGx6x",  that.getSearchData(), function(dataSet){
				var data = dataSet;
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
							var columnObj = { dataField : key, editable: true, "width":150, style: "right-column", dataType: "numeric", formatString: "#,###" };
							AUIGrid.addColumn("grid", columnObj, "last");
							i++;
						}
					});
				}
				AUIGrid.setGridData("grid", data);	
				
			});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "METARIAL_LEDGER_MOMBD003_" + get_current_date("yyyy-mm-dd")});
		});
		
		//planID 변경 시 호출
		$(document).on("change", "#planId", function(){
			that.setPlanDate();
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// planID 가져오기.
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.materialLedger.planId.dummy",
			type : "GET",
			data : {},
			async: false,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#planId",{ selectedIndex: 0, searchMode:'contains', autoComplete:true }, {local: data, textName : "name", valueName : "code"});
			},
			error: function(data){},
			fail : function(data){}
		});

		mCommon.comboBoxClickCall("#vendorCd", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy', {}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#vendorCd", comboOptions, options);
				callBack();
			});
		});

		mCommon.comboBoxClickCall("#isShortage", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "USE_FLAG"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#isShortage", comboOptions, options);
					callBack();
				}
			);
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
            
            pivot +=  "TO_DATE('" + lastDay  +"', 'YYYY-MM-DD') AS \"" + lastDisplayDay +"\"";
       
            if(i != compareDay -1){
            	pivot += ", ";
            }
        }
	},
	gridColumnSet : function() {
		var column = [
			{
			     headerText : Language.lang['MESSAGES11577'],
			     children : [
			    	 {headerText: Language.lang['MESSAGES10198'],
			    		 children: [
	    					 {
	    						 dataField : "col1",
	    						 headerText : Language.lang['MESSAGES10843'],
	    						 width : 120
    					 }]
		    	 }] // end of children
			},
			{
			     headerText : Language.lang['MESSAGES11569'],
			     children : [
		    			 {headerText: Language.lang['MESSAGES10234'],
		    				 children:[
		    					 {
		    						 dataField : "col2",
		    						 headerText : Language.lang['MESSAGES10308'],
		    						 width : 120
	    					 }]
		    	 }] // end of children
			},
			{
			     headerText : Language.lang['MESSAGES11585'],
			     children : [
			    	 {headerText: Language.lang['MESSAGES11613'],
			    		 children: [
		    					 {
		    						 dataField : "col3",
		    						 headerText : Language.lang['MESSAGES11292'],
		    						 width : 120
	    					 }]
		    	 }] // end of children
			}
		]
				
		AUIGrid.addColumn("grid", column, "first");		
	},
	getSearchData : function(){
		var that = this;
		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
		that.getDiff(fromDate, toDate);

		var param = {
				planId : $("#planId").val() || "",
				itemId : $("#itemId").val() || "",
				shortage : $("#isShortage").val() || "",
				vendorId : $("#vendorCd").val() || "",
				fromDate : fromDate || "",
				toDate : toDate || "",
				pivot : pivot || ""
		}

		return param;
	},
	setPlanDate : function(){
		if($("#planId").val() == ''){	
			return;
		}
		//Date 가져오기
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
			type : "GET",
			data : {planId:$("#planId").val()},
			async: false,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				var fromDate =data[0].planDate;
				var toDate =data[data.length - 1].planDate;

				$("#fromDate").val(to_date_yyyy_mm_dd(fromDate));
				$("#toDate").val(to_date_yyyy_mm_dd(toDate));
			},
			error: function(data){},
			fail : function(data){}
		});
	}
};
$(document).ready(function(event){
	MOMBD003.init();
});