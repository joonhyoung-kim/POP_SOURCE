var pivot = "";
var planId = "";
var planDate = "";
var productionPlanId = "";
var columnLayout;
// IE10, 11은 readAsBinaryString 지원을 안함. 따라서 체크함.
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

// HTML5 브라우저인지 체크 즉, FileReader 를 사용할 수 있는지 여부
function checkHTML5Brower() {
	var isCompatible = false;
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		isCompatible = true;
	}
	return isCompatible;
};

// IE10, 11는 바이너리스트링 못읽기 때문에 ArrayBuffer 처리 하기 위함.
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
};

// 파싱된 시트의 CDATA 제거 후 반환.
function process_wb(wb) {
	var result = {};
	var output = "";
	wb.SheetNames.forEach(function(sheetName) {
		// JSON 으로 파싱
		//var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		
		// CSV 로 파싱
		var roa = XLSX.utils.sheet_to_csv( wb.Sheets[sheetName] );

		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});

	output = JSON.stringify(result);
	output = output.replace( /<!\[CDATA\[(.*?)\]\]>/g, '$1' );

	return JSON.parse(output);
};

function parseCsv(value) {
	var rows = value.split("\n");
	var pData = [];
	
	for(var i= 0; i < rows.length; i++) {
		if(rows[i] != ""){
			pData[i] =  rows[i].split(",");
		}
	}
	return pData;
}

var MOMBA004 = {
	init: function() {
		var that = this;
		that.script();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W201811281112310791000U5RsyeKKZfi", undefined, function() {
				that.grid();
				that.event();
				$("#planDate").val("");
			}, Language);
		});
	},
	grid: function() {
		 tuCommon.cellClick('grid');
	}, event: function() {
		var that = this;
		// 엑셀 업로드 팝업 버튼
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadFileName").val(""); 
			$("#uploadFileName, #planId").attr("readonly", "readonly");
			$("#pop").micaModal("show");
		});
		
		// 팝업 취소
		$(document).on("click", "#pCancelBtn, .bntpopclose", function(){
			$("#pop").micaModal("hide");
		});
		
		// 파일 버튼
		$(document).on("click", "#fileBtn", function(){
			$("#file").click();
		});
		
		// 파일 선택 시 파일명 가져오기
		$(document).on("change", "#file", function(){
			$("#uploadFileName").val("");
			$("#uploadFileName").val($("#file").val());
		});
		
		$("#planDate").on("change", function(e) {
			that.setPlanDate();
			$("#planId").val(planId);
		});
		
		$(document).on("click", "#pSaveSalesBtn", function(){
			planDate = $("#planDate").val();
			if($("#planDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES10138']});
				return;
			}
			
			if (!checkHTML5Brower()) {
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES10544']});
				return;
			} else {
			    var data = null;
			    var file = $("#file").get(0).files[0];
			    if (typeof file == "undefined") {
			    	micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11526']});
			        return;
			    }
			    var reader = new FileReader();

				reader.onload = function(e) {
					var data = e.target.result;
					 //엑셀 바이너리 읽기 
					var workbook;
					if(rABS) { // 일반적인 바이너리 지원하는 경우
						workbook = XLSX.read(data, {type: 'binary'});
					} else { // IE 10, 11인 경우
						var arr = fixdata(data);
						workbook = XLSX.read(btoa(arr), {type: 'base64'});
					}
					var jsonObj = process_wb(workbook);
				};

				if(rABS) reader.readAsBinaryString(file);
				else reader.readAsArrayBuffer(file);
			}
			
			var params = {}
				
			mom_ajax("D", "plan.plan.planningUpload.planningUpload", JSON.stringify(params), that.excelCallback);
			$("#pop").micaModal("hide");
		});
		
		$(document).on("change", "#file", function(){
			$("#uploadFileName").val("");
			$("#uploadFileName").val($("#file").val());
		});
		
		
		$(document).on("click", "#excelSampleBtn", function(){
			that.setColDate();
			mCommon.auiGridExcelExport("grid", {fileName: "SYNC_PLANNING_UPLOAD_MOMBA004_" + get_current_date("yyyy-mm-dd")}, "templete");
		});
		
		$(document).on("click", "#confirmBtn", function(){
			var gridData =  AUIGrid.getGridData("grid");
			var planIdSync = $("#planId").val();
			planIdSync = planIdSync.replace("_P", "_S");
			if($("#planId").val() == '' || $("#file").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES10867']});
				return;
			}
			
			if(gridData.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES11755']});
				return;
			}
			var param = {
					planId : planIdSync
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11756'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("C", "plan.plan.planningUpload.planningUploadProc", JSON.stringify(param), that.callBack);
					micaCommon.splash.show();
					}
				}
			});
			
		});
	
	},
	callBack : function(result, data){
		var that = this.MOMBA004;
		if(result == "SUCCESS"){
			AUIGrid.clearGridData("grid");
			micaCommon.splash.hide();
			micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10692']});
			console.log(data);
		}
		else{
			micaCommon.splash.hide();
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	excelCallback : function(result, data, param, callbackParam){
		var that = this.MOMBA004;
		if(result == "SUCCESS") {
			that.excelUpload();
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height:"145", subTitle:true, html: Language.lang['MESSAGES10327']});
			console.log(data);
		}
	},
	excelUpload : function() {
		var param = {
				planDate : planDate
		};
		excel_upload(file, 'plan.plan.planningUpload.planningUpload', 'MOMBA004', 'grid', JSON.stringify(param), this.excelCallBackPost);
		micaCommon.splash.show();
	},
	excelCallBackPost : function(result, data, param, callbackParam) {
		var that = this.MOMBA004;
		if(result == "SUCCESS"){
			AUIGrid.clearGridData("grid");
			that.setColDate();
			var param = {
					planDate : $("#planDate").val(),
					pivot : pivot
			}
			mCommon.render("grid", "W201811281112310791000U5RsyeKKZfi", param, function(){
				micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10864']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	        	micaCommon.messageBox({type:"danger",width:"400", height:"145",  html: Language.lang['MESSAGES11757']});
	         }
			console.log(data);
		}
		
	},
	script : function(){
		   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/shim.js"></script>');
		   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/jszip.js"></script>');
		   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/xlsx.js"></script>');
	},

    fileInpuSet: function() {
		$("#pop .searcharea form").attr("id", "fileUploadForm");
	    $("#pop .searcharea form").append('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%; display:none;">');
    },
    setPlanDate: function(){
		var planDate = $("#planDate").val().split("-");
		getPlanDate = planDate[0] + "-" + planDate[1] + "-" + planDate[2];
		planId = planDate[0] + planDate[1] + planDate[2] + "_P";
	},
	setColDate : function() {
		pivot = "";
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.productionPlan.productionPlanId.dummy",
			type : "GET",
			data : {planDate:$("#planDate").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					productionPlanId = data[0].planId;
				} else {
					productionPlanId = planId;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		//Date 가져오기
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.productionPlan.planId_days.dummy",
			type : "GET",
			data : {planId : productionPlanId},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				var fromDate = data[0].planDate;
				var toDate = data[data.length - 1].planDate;
				var planDateArray = new Array;
				var dueDateList = new Array;
				var dueDayList = new Array;
				var gridColumn = AUIGrid.getColumnLayout("grid");
				var colLen = mCommon.datasets.grid.setting.colModel.length;
				var colHideLen = 0;
				for(var i = colLen - 1; i >= 0; i--) {
					if(mCommon.datasets.grid.setting.colModel[i].hide != true){
						colHideLen = i;
						break;
					} 
				}
				for(var i = gridColumn.length -1; i > colHideLen; i--){
					AUIGrid.removeColumn("grid", i);
				}
				$("#fromDate").val(to_date_yyyy_mm_dd(fromDate));
				$("#toDate").val(to_date_yyyy_mm_dd(toDate));
				
				for(var i = 0; i < data.length; i++){					
					dueDateList[i] = data[i].planDate;
					dueDayList[i] = data[i].eday;
					if(fromDate <= dueDateList[i] && dueDateList[i] <= toDate){
						planDateArray.push(dueDateList[i] + dueDayList[i]);
						pivot += "MIN(DECODE (TO_CHAR(A.WORK_DATE,'YYYYMMDD'), '" + planDateArray[i].substring(0, 8) + "',A.WORK_QTY, '')) AS \"" + planDateArray[i].substring(2, 4) + "/" + planDateArray[i].substring(4, 6) + "/" + planDateArray[i].substring(6, 8) + "\"";
						if(i == data.length-1){
							break;
						}
						pivot += ",";
					}
					
					var key = planDateArray[i].substring(2, 4) + "/" + planDateArray[i].substring(4, 6) + "/" + planDateArray[i].substring(6, 8);
					var columnObj = { dataField : key, dataType : "numeric", formatString : "#,###" };												
					AUIGrid.addColumn("grid", columnObj, 'last');
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	}
};
$(document).ready(function(event){
	MOMBA004.init();
});