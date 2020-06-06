var gvThat;
var userId = sessionStorage.getItem("userId");

var MOMIB006 = {
	init: function() {
		var that = this;
		gvThat = this;
		Language.init(function() {
			mCommon.init("grid", "W201902271309310531000oXca5HOgrDX", null, function(){
				mCommon.gridPopCreat("grid", {colCount: 1, title: Language.lang['MESSAGES11804']});
				that.grid("grid");
				that.event();
				that.comboBox();
				that.design();
				that.fileInpuSet();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick("grid");
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "USE_FLAG"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField('grid', 'useYn', {
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "DropDownListRenderer",
						showEditorBtnOver : true,
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					},
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						return 'columnStyle';
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
	}, event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W201902271309310531000oXca5HOgrDX",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			$("#gridModalPopSaveBtn").attr("type", "C");
			mCommon.gridPopAdd("grid");
			that.setExCustomModel();
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "EXCEPTION_MODEL_MOMIB006_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 저장 버튼
		$(document).on("click", "#saveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						arrayList.push(checkedItems[i].item)
					}
					mom_ajax("LU", "reference.itemInfo.exceptionCustomerModel.exceptionCustomerModel", JSON.stringify(arrayList), that.callbackPost);
				}
			}});
		});
		
		// 삭제 버튼
		$(document).on("click", "#delBtn", function() {
			// 선택된 데이터 가져오기
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after : function(){
						for(i = 0; i < checkedItems.length; i++){
							arrayList.push(checkedItems[i].item);	
						}
						mom_ajax("LD", "reference.itemInfo.exceptionCustomerModel.exceptionCustomerModel", JSON.stringify(arrayList), that.callbackPost);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}	
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "EXCEPTION_CUSTOM_MODEL_MOMIB006_test"}, "templete");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.excelUpload();
			mCommon.gridPopHide("grid");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#productClassIdModal").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10051']});
				return;
			}
			
			if($("#useYnModal").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					//버튼 type 세팅
					var param = that.getExCustomModel();
					mom_ajax(type, "reference.itemInfo.exceptionCustomerModel.exceptionCustomerModel", JSON.stringify(param), that.callbackPost);
					$("#gridModalPop").micaModal("hide");
				}
			}});
			
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#modelSuffix'), $('#findBtn'));
	}, comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYn", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
				micaCommon.comboBox.set("#useYnModal", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			}
		);
	},
	setExCustomModel : function(data) {
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd');
		$("#productClassIdModal").val(data.productClassId || "");
		$("#useYnModal").val(data.useYn || "Y");
		$("#updateByModal").val(userId);
		$("#updateDateModal").val(curr_date);
		$("#updateDateModal, #updateByModal").attr("readonly", "readonly");
	},
	getExCustomModel : function(data) {
		var result = {
			productClassId : $("#productClassIdModal").val(),
			useYn : $("#useYnModal").val()
		}
		
		return result;
	},
	callbackPost : function(result, data){
		var that = this.MOMIB006;
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201902271309310531000oXca5HOgrDX", mCommon.formGetParam("#form"), function(){
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
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD !important;}</style>');	
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
 		
 		excel_upload(file, 'reference.itemInfo.exceptionCustomerModel.exceptionCustomerModel', 'MOMIB006', 'grid', JSON.stringify(param), gvThat.callbackPost);
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIB006.init();
});