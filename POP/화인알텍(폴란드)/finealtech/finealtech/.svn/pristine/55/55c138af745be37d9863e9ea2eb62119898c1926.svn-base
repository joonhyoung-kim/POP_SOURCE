var columnLayout;
var getPlanDate;
var dataString = "";
var colDate = "";
var uploadType = "D";
var params;
var pivot = "";
var optionValue = "";
var init_col_size = 0;
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
			pData[i] = rows[i].split(",");
		}
	}
	return pData;
};

var MOMBA002 = {
	init: function() {
		var that = this;
		that.event();
		that.script();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W2018101515393095210007OReQL1MT0I", undefined, function() {
				that.grid();
				that.setPlanDate();
				that.setColData();
			}, Language);
		});
	},
	grid: function() {
			
	}, event: function() {
		var that = this;
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadFileName, #planDate, #planId").attr("readonly", "readonly");
			$("#pop").micaModal("show");
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
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#pSaveSalesBtn", function(){
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
			
			params = {
				planDate : getPlanDate.replace(/-/gi,""),
				uploadType : uploadType
			}
			
			mom_ajax("D", "plan.plan.salesOrderUpload.salesOrderUpload", JSON.stringify(params), that.excelCallback, params);
			
			$("#pop").micaModal("hide");
		});
		
		//엑셀 양식 다운로드
		$(document).on("click", "#excelDownBtn", function(){
			that.excelTempDown();
		});
		
		$(document).on("click", "#createSalesBtn", function(){
			var param = {
					planDate : getPlanDate.replace(/-/gi,""),
					uploadType : uploadType
			}
			mom_ajax("C", "plan.plan.salesOrderUpload.salesOrderUploadCreateProc", JSON.stringify(param), that.listCallbackPost)
		});
		
	},
	script : function(){
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/shim.js"></script>');
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/jszip.js"></script>');
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/xlsx.js"></script>');
	},
	setPlanDate: function(){
		$("#planDate").val(get_current_date('YYYY-MM-DD'));
		var planDate = get_current_date('YYYY-MM-DD').split("-");
		getPlanDate = planDate[0] + "-" + planDate[1] + "-" + planDate[2];
		var planId = planDate[0] + planDate[1] + planDate[2] + "_P";
		$("#planId").val(planId);
		$("#planDate").datetimepicker("destroy");
	},
	setOptionValue : function() {
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.salesOrderUploadOptionValueType.dummy",
			type : "GET",
			data : {codeId : "DEMAND_EXCEL_UPLOAD_TYPE"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				optionValue = data[0].optionValue;
			}
		});
	},
	setColData : function() {
		var colDate = "";
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.salesOrderUploadConfig.dummy",
			type : "GET",
			data : {uploadType : uploadType},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length < 1) {
					micaCommon.messageBox({type:"warning", width:"400", height:"145", html:Language.lang['MESSAGES10023']});
					return;
				} else {
					var underCamel = function(str) {
						 return str.toLowerCase().replace(/(\_[a-z])/g, function(arg){
						        return arg.toUpperCase().replace('_','');
						    });
					};
					init_col_size = data.length + 1;
					var is_enter = false;
					for (var i = 0; i < data.length; i++) {
						dataString += data[i].momDemandColId;
			            //var colId = data[i].momDemandColIdTmp;
						var colId = underCamel(data[i].momDemandColId);
			            var colName = data[i].promptName;
						var columnObj = { dataField : colId, headerText : colName, dataType : "String"};	
						
						AUIGrid.addColumn("grid", columnObj, 'last');
						
						if(!is_enter && colId == 'dueDate') {
							is_enter = true;
							var col_set = {
								dataField : colId,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value.length > 12) {
										var day = value.substring(0, 10);
										if(parseInt(value.substring(11, 13)) > 0) {
											var new_day = get_date_diff2(day, 1); 
											return new_day;
										} else {
											return day;
										}
									}
									
									return value;
								},
								editRenderer : {
									type : 'InputEditRenderer',
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', colId, col_set);
						}
						
			            if (i == data.length - 1) {
			            	break;
			            }
			            dataString += ",";
			        }
				}
			}
		});
		
	},
	setColDate : function() {
		var gridColumn = AUIGrid.getColumnLayout('grid');
		if(gridColumn != null && typeof gridColumn != 'undefined' && gridColumn.length > init_col_size) {
			for(var i = gridColumn.length; i >= init_col_size; i--) {
				AUIGrid.removeColumn('grid', i);
			}
		}
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.getDueDate.dummy",
			type : "GET",
			data : {planDate : getPlanDate, uploadType : uploadType},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				var dueDateList = new Array;
				var dueDayList = new Array;
				var colDateList = new Array;
				if(data.length > 0) {
					colDate = '';
					if(data.length > 0) {
						dueDateList[0] = data[0].dueDate;
						dueDayList[0] = data[0].eday;
						colDateList[0] = dueDateList[0] + dueDayList[0];
						colDate = "TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[0].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[0].substring(4, 6) + "/" + colDateList[0].substring(6, 8) + "(" + colDateList[0].substring(8, 11).toLowerCase() + ")"+ "\"";
						var key = colDateList[0].substring(4, 6) + "/" + colDateList[0].substring(6, 8) + "(" + colDateList[0].substring(8, 11).toLowerCase() + ")";
						var columnObj = { dataField : key, dataType : "numeric", formatString : "#,###" };												
						AUIGrid.addColumn("grid", columnObj, 'last');
					}
					for (var i = 1; i < data.length; i++) {
						dueDateList[i] = data[i].dueDate;
						dueDayList[i] = data[i].eday;
						colDateList[i] = dueDateList[i] + dueDayList[i];
						colDate += ", TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[i].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8) + "(" + colDateList[i].substring(8, 11).toLowerCase() + ")"+ "\"";
						var key = colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8) + "(" + colDateList[i].substring(8, 11).toLowerCase() + ")";
						var columnObj = { dataField : key, dataType : "numeric", formatString : "#,###" };												
						AUIGrid.addColumn("grid", columnObj, 'last');
					}
				}
			}
		});
	},
	fileInpuSet: function() {
	  $("#pop .searcharea form").attr("id", "fileUploadForm");
      $("#pop .searcharea form").append('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%; display:none;">');
	},
	excelUpload: function() {
		excel_upload(file, 'plan.plan.salesOrderUpload.salesOrderUpload', 'MOMBA002', 'grid', JSON.stringify({uploadType : uploadType}), this.excelProcCallBack);
		micaCommon.splash.show();
	},
	excelCallback : function(param, data, callbackParam){
		var that = this.MOMBA002;
		if(param == "SUCCESS") {
			that.excelUpload();
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	excelProcCallBack : function(param, data, callbackParam){
		var that = this.MOMBA002;
		var params;
		if(param == "SUCCESS") {
			params = {
					planDate : getPlanDate.replace(/-/gi,""),
					uploadType : uploadType
			};
			mom_ajax("C", "plan.plan.salesOrderUpload.salesOrderUploadProc", JSON.stringify(params), that.excelCallbackPost, params);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	excelCallbackPost : function(param, data, callbackParams){
		var that = this.MOMBA002;
		var palnDate = getPlanDate.replace(/-/gi,"");
		var params = {
			uploadType : uploadType,
			planDate : palnDate
		}
		if(param == 'SUCCESS'){
			that.setOptionValue();
			AUIGrid.clearGridData("grid");
			if(optionValue == "R") { //row type 
				that.setColDate(); //header 뒤에 date 추가 생성 
				pivot = {
						dataString : dataString,
						planDate : getPlanDate,
						colDate : colDate,
						optionValue : optionValue,
						uploadType : uploadType
				}
				mCommon.render("grid", "W2018101515393095210007OReQL1MT0I", pivot, function(){
					micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10864']});
				});
			} else if(optionValue == "C") { //column type
				pivot = {
						dataString : dataString,
						planDate : getPlanDate,
						optionValue : optionValue,
						uploadType : uploadType
				}
				mCommon.render("grid", "W2018101515393095210007OReQL1MT0I", pivot, function(){
					micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10864']});
				});
			} 
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallbackPost : function(param, data){
		if(param == 'SUCCESS'){
			micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10692']});	
			AUIGrid.clearGridData("grid");
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	excelTempDown: function () {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.salesOrderUploadExcelSample.dummy', 
			{uploadType : uploadType}, 
			function(data){
				$("body").append('<div id="template" style="width:100%; height:100%; display:none;"></div>');
				var columnLayout = [];
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					var layout = {dataField: dataI.momDemandColId, headerText : dataI.promptName || dataI.momDemandColId}
					columnLayout.push(layout);
				}
				myGridID = AUIGrid.create("template", columnLayout, {showRowNumColumn : false});
				var option = {fileName:"SALES_ORDER_UPLOAD_MOMBA002_" + get_current_date("yyyy-mm-dd")}
				option.afterRequestCallback = function() {
					$("#template").remove();
					AUIGrid.destroy("template");
				}
				AUIGrid.exportToXlsx("template", option);
			}
		);
	}
};
$(document).ready(function(event){
	MOMBA002.init();
});