var compareDay;
var pivot = "";
var pivot2 = "";

var MOMIE002 = {
	init: function() {
		this.setInitData();
		var that = this;
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201807051045448591002f60CN14pbBb", null, function() {
				that.grid();
				that.event();
			}, Language);
		});
	},
	grid : function(){
		var that = this; 
		var dataSet = mCommon.getDataset("W201807051045448591002f60CN14pbBb/data", that.getSearchData());
		var data = dataSet;
		var gridColumn = AUIGrid.getColumnLayout("grid");
		
		for(var i = gridColumn.length -1; i >= 7; i--){
			AUIGrid.removeColumn("grid", i);
		}
		
		if(data.length > 0){
			$.each(data[0], function(key, value){
				if(key.match("/")){
					var columnObj = { dataField : key, editable: true, "width":140};
					//var matchValidT = /d{6}/;
					var matchValidP = /^[0-9]*$/;
					columnObj.editRenderer = {
						type : "InputEditRenderer",
						onlyNumeric : true,
						validator : function(oldValue, newValue, item) {
							var timeValid = false; 
							var personValid = false;
							if(item.seq == "1" || item.seq == "2"){
								if((newValue && newValue.length == 6) || newValue == ''){
									timeValid = true;
								}
								return {"validate" : timeValid, "message"  : Language.lang['MESSAGES10038']};
							}else {
								if(matchValidP.test(newValue) == true){
									personValid = true;
								}
								return {"validate" : personValid, "message"  : Language.lang['MESSAGES10751']};
							}
						}
					}
					//tuCommon.onlyNum();
					AUIGrid.addColumn("grid", columnObj, 'last');
				}
			});
		}
		
		AUIGrid.setGridData("grid", data);	
	},
	event: function() {
		var that = this;
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "SHIFT_PLAN_SCHEDULE_MOMIE002_" + get_current_date("yyyy-mm-dd")});
		});

		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			that.grid();
		  //mCommon.render("grid", "W201807051045448591002f60CN14pbBb", that.getSearchData());		  	
		});
		
		// 저장 버튼
		$(document).on("click", "#saveBtn", function(){
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var editedRowItems = AUIGrid.getEditedRowItems("grid");
					var chkFlag = false;
					for(var i = 0; i < editedRowItems.length; i++){		
						$.each(editedRowItems[i], function(key, jsonValue){
							if(key.match("/")){
								var param = {
									shiftId : editedRowItems[i].shiftId,
									seq : editedRowItems[i].seq,
									resourceCd : editedRowItems[i].resourceCd,
									applyDate : "20" + key,
									value : jsonValue
								}
								
								if((param.seq == "1" || param.seq == "2") && param.value == "") {
									mom_ajax("D","reference.workinghours.shiftPlanSchedule.shiftPlanSchedule", JSON.stringify(param), that.callbackPost);
								}
								mom_ajax("U","reference.workinghours.shiftPlanSchedule.shiftPlanSchedule", JSON.stringify(param), that.callbackPost);
							}
						});
					}
				}
			}});
		});
	},
	setInitData : function(){
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(7));
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "SHIFT_CODE"}, function(data){
			micaCommon.comboBox.set("#shiftName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
		
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comResource.dummy',  {}, function(data){
			micaCommon.comboBox.set("#resourceName",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			callBack();
		});
		});
	},
	getSearchData : function(){
		var that = this;

		var fromDate = $("#fromDate").val();
		var toDate = $("#toDate").val();
	
		that.getDiff(fromDate, toDate);
		
		var param = {
			fromDate : fromDate  || "",
			toDate : toDate  || "",
			shiftCd : $("#shiftName").val() || "",
			resourceCd : $("#resourceName").val() || "",
			pivot : pivot  || "",
			pivot2 : pivot2  || ""
		};
				
		return param;
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	getDiff : function(sDate, eDate){
		var FORMAT = "-";
		pivot = "";
		pivot2 = "";

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
            
            var lastDay = changeFY + '-' + changeM + '-' + changeD;
            var lastDisplayDay = changeHY + '/' + changeM + '/' + changeD;
            
            pivot += "MAX(DECODE(APPLY_DATE, '" + lastDay + "',DAY)) AS \"" + lastDisplayDay +"\"";
            pivot2 += "'" + lastDay + "'";
            
            if(i != compareDay -1){
            	pivot += ", ";
            	pivot2 += ", ";
            }
        }
	},
	callbackPost :function(param, data) {
		var that = this.MOMIE002;
		if(param == 'SUCCESS'){
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			mCommon.render("grid", "W201807051045448591002f60CN14pbBb",  that.getSearchData(), function(){});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMIE002.init();
});