var userId = sessionStorage.getItem("userId");
var gvThat;
var endPeriod;

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

//IE10, 11는 바이너리스트링 못읽기 때문에 ArrayBuffer 처리 하기 위함.
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
};

//파싱된 시트의 CDATA 제거 후 반환.
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

function parseCsv( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            arrData.push( [] );
        }

        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {

            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    if(arrData[arrData.length-1].length == 1 && arrData[arrData.length-1][0] == "" ) {
    	arrData.pop();
    }
    
    return( arrData );
}

var MOMCE002 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.design();
		that.script();
		that.fileInpuSet();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807141107574081000qd6BsMeVtqf", null, function() {
				that.grid();
			}, Language);
		});
	}, 
	grid: function() {
		var that = this;
		var comboBox;
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "MATERIAL_LOT_STATE", attribute1: "Y"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				comboBox = data;
			},
			error: function(data){},
			fail : function(data){}
		});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMCE002"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
					AUIGrid.bind('grid', "cellEditEndBefore", function(event){ 
						if(event.dataField == "stateTime") { // 달력 지정한 필드인 경우 
							if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
								micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
								return event.oldValue; 
							} else {
								return to_date_yyyy_mm_dd(event.value); 
							} 
						}
						return event.value; 
					}); 
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
			var gridColumn = AUIGrid.getColumnLayout("grid");
			
			gridColumn.push(
				{
					dataField : "updateQty",
					headerText : Language.lang['MESSAGES11184'],
					width : 100,
					hide : false,
					style:"columnStyle",
					editRenderer : {
						type : "InputEditRenderer"
					}
				},
				{
					dataField : "reasonCd",
					headerText : Language.lang['MESSAGES10483'],
					width : 120,
					hide : false,
					style:"columnStyle",
					editRenderer : {
						type : "DropDownListRenderer",
						autoCompleteMode : true,
						showEditorBtnOver : true,
						list : comboBox, 
						keyField : "code", 
						valueField : "name"
					}, labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=comboBox.length; i<len; i++) {
							if(comboBox[i]["code"] == value) {
								retStr = comboBox[i]["name"];
								break;
							}
						}
						return retStr;
					}
					
				},
				{
					dataField : "description",
					headerText : Language.lang['MESSAGES10484'],
					width : 120,
					hide : false,
					style:"columnStyle",
					renderer : {
						type : "InputRenderer",
						list : comboBox, 
						keyField : "code", 
						valueField : "name"
					}
				}
			);
		
			AUIGrid.changeColumnLayout("grid", gridColumn);
			
			AUIGrid.setColumnPropByDataField( "grid", "stateTime", {
				style:"columnStyle",
				dataType : "date",
				formatString : "yyyy-mm-dd",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.bind('grid', "cellEditBegin", function(e) {
				AUIGrid.setProp('grid', 'exportURL', '0');	
			});
			
			tuCommon.cellClick('grid');
			tuCommon.cellEditEnd('grid');
			
	}, event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W201807141107574081000qd6BsMeVtqf", mCommon.formGetParam("#form"), function(){});
		});
				
		// 양식다운로드
		$(document).on("click", "#excelSampleBtn", function(){
			mCommon.auiGridExcelExport("grid", {fileName: "OTHERS_IN_OUT_FINISHED_MOMCE002_test"}, "templete");
		});
		
		// 보정 버튼
		$(document).on("click", "#correctBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.locationCd == "" || checkedItems[i].item.locationCd == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11297']});
					return;
				}
				
				if(checkedItems[i].item.stateTime == "" || checkedItems[i].item.locationCd == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10487']});
					return;
				}
				
				if(checkedItems[i].item.updateQty == "" || checkedItems[i].item.locationCd == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11185']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.stateTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES10486' + '@' + endPeriod)});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10488'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var gridData = AUIGrid.getEditedRowItems("grid");
					
					setTimeout(function() {
						if(gridData.length <= 0) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10478']});
							return;
						}
					}, 1000);
					
					mom_ajax("L", "purchase.stock.othersInOutFinished.othersInOutFinishedProc", JSON.stringify(gridData), that.procCallBack);
				}
			}});
		});
		
		// 엑셀 업로드
		$(document).on("click", "#excelUpBtn", function(){
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑설 업로드 저장
		$(document).on("click", "#pSaveSalesBtn", function() {
			that.excelUpload();
			mCommon.gridPopHide("grid");
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');
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
		// form ID 는 fileUploadForm
	},
	procCallBack : function(param, data){
		var that = this.MOMCE002;
		if(param == "SUCCESS"){
			mCommon.render("grid", "W201807141107574081000qd6BsMeVtqf",  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	excelUpload: function() {
		var param = [ {} ];
 		
 		excel_upload(file, 'purchase.stock.othersInOutFinished.othersInOutFinishedProc', 'MOMCE002', 'grid', JSON.stringify(param), gvThat.procCallBack);
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMCE002.init();
});