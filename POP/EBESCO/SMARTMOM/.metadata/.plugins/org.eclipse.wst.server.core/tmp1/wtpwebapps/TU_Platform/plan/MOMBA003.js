var locale = sessionStorage.getItem("locale");

var columnLayout;
var getPlanDate;
var dataString = "";
var dataStringG = "";
var colDate = "";
var uploadType = "P";
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

var MOMBA003 = {
	init: function() {
		var that = this;
		that.event();
		that.script();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W2018101515393095210007OReQL1MT0I", undefined, function() {
				that.setPlanDate();
				that.setColData();
				that.grid();
			}, Language);
		});
	},
	grid: function() {
		var that = this;
		var planDate = getPlanDate.replace(/-/gi,"");
		var params = {
			uploadType : uploadType,
			planDate : planDate
		}
		
		that.setOptionValue();
	
		if(optionValue == "R") { //row type 
			that.setColDate(); //header 뒤에 date 추가 생성 
			pivot = {
				dataString : dataString,
				dataStringG : dataStringG,
				planDate : getPlanDate,
				colDate : colDate,
				optionValue : optionValue,
				uploadType : uploadType
			}
			
			mCommon.render("grid", "W2018101515393095210007OReQL1MT0I", pivot, function() {});
			
		} else if(optionValue == "C") { //column type
			pivot = {
				dataString : dataString,
				dataStringG : dataStringG,
				planDate : getPlanDate,
				optionValue : optionValue,
				uploadType : uploadType
			}
			
			mCommon.render("grid", "W2018101515393095210007OReQL1MT0I", pivot, function() {});
		} 
			
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
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10899'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					micaCommon.splash.show();
					var param = {
							planDate : getPlanDate.replace(/-/gi,""),
							uploadType : uploadType
					}
					mom_ajax("C", "plan.plan.salesOrderUpload.salesOrderUploadCreateProc", JSON.stringify(param), that.listCallbackPost)
				}
			}
			});
			
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
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.setup.setup.dummy",
			type : "GET",
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				optionValue = data[0].demandPoUploadType;
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
					var cm = false;
					for (var i = 0; i < data.length; i++) {
						if(data[i].colType == 'DATETIME') {
							dataString += "TO_CHAR("+data[i].momDemandColId+", 'yyyy-mm-dd HH24:MI:ss') as "+data[i].momDemandColId;
						} else if(data[i].colType == 'DATE') {
							if(data[i].momDemandColId == 'DUE_DATE') {
								dataString += "MIN(TO_CHAR("+data[i].momDemandColId+", 'yyyy-mm-dd')) as "+data[i].momDemandColId;
							} else {
								dataString += "TO_CHAR("+data[i].momDemandColId+", 'yyyy-mm-dd') as "+data[i].momDemandColId;
							}
						} else {
							if(data[i].momDemandColId == 'QTY') {
								dataString += "SUM("+data[i].momDemandColId+") "+data[i].momDemandColId;
							} else {
								dataString += data[i].momDemandColId;
							}
						}
						if(data[i].momDemandColId != 'DUE_DATE' && data[i].momDemandColId != 'QTY') {
							if(cm) {
								dataStringG += ",";
							}
							dataStringG += data[i].momDemandColId;
							cm = true;
						}
			            //var colId = data[i].momDemandColIdTmp;
						var colId = underCamel(data[i].momDemandColId);
						var colName = locale == 'KR' ? data[i].promptName : Language.getValueFromKorean(data[i].promptName);
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
//			            dataStringG += ",";
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
		excel_upload(file, 'plan.plan.salesOrderUpload.salesOrderUpload', 'MOMBA003', 'grid', JSON.stringify({uploadType : uploadType}), this.excelProcCallBack);
		micaCommon.splash.show();
	},
	excelCallback : function(result, data, param, callbackParam){
		var that = this.MOMBA003;
		if(result == "SUCCESS") {
			that.excelUpload();
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height:"145", subTitle:true, html: Language.lang['MESSAGES10327']});
			console.log(data);
		}
	},
	excelProcCallBack : function(result, data, param, callbackParam){
		var that = this.MOMBA003;
		var params;
		if(result == "SUCCESS") {
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
	excelCallbackPost : function(result, data, param, callbackParam){
		var that = this.MOMBA003;
		var palnDate = getPlanDate.replace(/-/gi,"");
		var params = {
			uploadType : uploadType,
			planDate : palnDate
		}
		if(result == "SUCCESS"){
			that.setOptionValue();
			AUIGrid.clearGridData("grid");
			if(optionValue == "R") { //row type 
				that.setColDate(); //header 뒤에 date 추가 생성 
				pivot = {
						dataString : dataString,
						dataStringG : dataStringG,
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
						dataStringG : dataStringG,
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
	listCallbackPost : function(result, data){
		micaCommon.splash.hide();
		if(result == "SUCCESS"){
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
		/* modify hists
		 * 20191107_001 / pyj / 엑셀 양식 필수 표시 및 샘플 데이터 추가
		 */
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.salesOrderUploadExcelSample.dummy', 
			{uploadType : uploadType}, 
			function(data){
				$("body").append('<div id="template" style="width:100%; height:100%; display:none;"></div>');
				$("head").append("<style>.back-red{background-color: #ff8000;}</style>");
				var columnLayout = [];
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					/* start 20191107_001 */
					var headerStyle = '';
					var columnTempleteData = '';
					if(dataI.momDemandColId == 'NO' || dataI.momDemandColId == 'WORK_ORDER_ID' || dataI.momDemandColId == 'SALES_CUSTOMER' || dataI.momDemandColId == 'MKT' 
						||  dataI.momDemandColId == 'PART_NO' || dataI.momDemandColId == 'QTY' || dataI.momDemandColId == 'DUE_DATE' || dataI.momDemandColId == 'CURRENCY_CODE') {
						headerStyle = 'back-red';
						switch(dataI.momDemandColId) {
						case 'NO' :
							columnTempleteData = '1';
							break;
						case 'WORK_ORDER_ID' :
							columnTempleteData = 'WM1901010001';
							break;
						case 'SALES_CUSTOMER' :
							columnTempleteData = 'KR00101';
							break;
						case 'MKT' :
							columnTempleteData = '2';
							break;
						case 'PART_NO' :
							columnTempleteData = 'TEST01';
							break;
						case 'QTY' :
							columnTempleteData = '100';
							break;	
						case 'DUE_DATE' :
							columnTempleteData = '2019-12-01';
							break;
						case 'CURRENCY_CODE' :
							columnTempleteData = 'KRW';
							break;
						}
					}
					var layout = {dataField: dataI.momDemandColId, headerText : dataI.promptName || dataI.momDemandColId, headerStyle: headerStyle, columnTempleteData: columnTempleteData }
					columnLayout.push(layout);
				}
				myGridID = AUIGrid.create("template", columnLayout, {showRowNumColumn : false});
				var option = {fileName:"SALES_ORDER_UPLOAD(PO)_MOMBA003_" + get_current_date("yyyy-mm-dd")}
				option.afterRequestCallback = function() {
					$("#template").remove();
					AUIGrid.destroy("template");
				}
				var templeteData = new Array;
				var templeteDataObj = {};
				for(var i = 0; i < columnLayout.length; i++) {
					var name = columnLayout[i].dataField;
					templeteDataObj[name] = columnLayout[i].columnTempleteData;
				}
				templeteData.push(templeteDataObj);
				AUIGrid.setGridData("template", templeteData);
				/* end 20191107_001 */
				AUIGrid.exportToXlsx("template", option);
			}
		);
	}
};
$(document).ready(function(event){
	MOMBA003.init();
});