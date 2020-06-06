var gvThat;
//IE10, 11은 readAsBinaryString 지원을 안함. 따라서 체크함.
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
var MOMBB004 = {
	init: function() {
		var that = this;
		gvThat = this;
		Language.init(function() {
			mCommon.init("grid", "W2019011710425835510003nULxC6E2ph", null, function(){
				that.grid();
				that.event();
				that.comboBox();
				that.script();
				that.fileInpuSet();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick('grid');
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){	
			mCommon.render("grid", "W2019011710425835510003nULxC6E2ph", mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ORDER_COMPARE_MOMBB004_" + get_current_date("yyyy-mm-dd")});
		});
		
		//엑셀 양식 다운로드
		$(document).on("click", "#excelSampleBtn", function(){
			that.excelTempDown();
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUploadBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
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
			
			mom_ajax("D","plan.plan.orderCompare.orderCompare", "{}", that.delCallback);
			//that.excelUpload();
			mCommon.gridPopHide("grid");
		});
		
		// apply 버튼
		$(document).on("click", "#applyBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning",  width:"400", height: "145",   html: Language.lang['MESSAGES11610']});
				return;
			}
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.workDate < get_current_date('yyyy-mm-dd')) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145",   html: Language.lang['MESSAGES10920']});
					return;
				}
				if(checkedItems[i].item.execType != 'Y') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145",   html: Language.lang['MESSAGES11460']});
					return;
				}
				checkedItems[i].item.txnType = checkedItems[i].item.execType;
				arrayList.push(checkedItems[i].item);
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11263'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax('L', 'plan.plan.orderCompare.orderCompareProc', JSON.stringify(arrayList), that.procCallback);
				}
			}});
			
		});
		
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#modelSuffix'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#customerPoId'), $('#findBtn'));
	},
	comboBox : function() {
		$("#createDate").val(get_current_date('yyyy-mm-dd'));
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 주문상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SALES_ORDER_STATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderState",comboOptions, options);
			}
		);
		
		// 처리유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"EXEC_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#execType",comboOptions, options);
			}
		);
	},
	excelTempDown: function () {
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.plan.plan.salesOrderUpload.salesOrderUploadExcelSample.dummy', 
			{uploadType : 'IC'}, 
			function(data){
				$("body").append('<div id="template" style="width:100%; height:100%; display:none;"></div>');
				var columnLayout = [];
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					var layout = {dataField: dataI.momDemandColId, headerText : dataI.promptName || dataI.momDemandColId}
					columnLayout.push(layout);
				}
				myGridID = AUIGrid.create("template", columnLayout, {showRowNumColumn : false});
				var option = {fileName:"COMPARE_ORDER_MOMBB004_" + get_current_date("yyyy-mm-dd")}
				option.afterRequestCallback = function() {
					$("#template").remove();
					AUIGrid.destroy("template");
				}
				AUIGrid.exportToXlsx("template", option);
			}
		);
	},
	script : function(){
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/shim.js"></script>');
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/jszip.js"></script>');
	   $("head").append('<script type="text/javascript" src="' + tuCommon.contextPath() + '/Content/AUIGrid/js-xlsx/xlsx.js"></script>');
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	delCallback : function(param, data){
		var that = this.MOMBB004;
		if(param == 'SUCCESS'){
			that.excelUpload();
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:Language.lang['MESSAGES10253']});
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	excelUpload : function() {
		var param = [ {} ];
		excel_upload(file, 'plan.plan.orderCompare.orderCompare', 'MOMBB004', 'grid', JSON.stringify(param), gvThat.uploadCallback);
		micaCommon.splash.show();
	},
	uploadCallback : function(param, data){
		var that = this.MOMBB004;
		if(param == 'SUCCESS'){
			$(".modal").micaModal("hide");
			mCommon.render("grid", "W2019011710425835510003nULxC6E2ph", mCommon.formGetParam("#form"), function(data){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	procCallback : function(param, data){
		var that = this.MOMBB004;
		if(param == 'SUCCESS'){
			$(".modal").micaModal("hide");
				mCommon.render("grid", "W2019011710425835510003nULxC6E2ph", mCommon.formGetParam("#form"), function(data){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMBB004.init();
});