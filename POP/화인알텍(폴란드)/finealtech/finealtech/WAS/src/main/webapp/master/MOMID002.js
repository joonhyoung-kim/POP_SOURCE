var fileFlag;

var MOMID002 = {
	init: function() {
		var that = this;
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W2018090417230872610007jKt9cdZG10", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES10075']});
				that.comboBox();
				
				// 라벨 색상 변경
				$("#EXCEL_IDLabel, #excelFileNameLabel, #excelPathLabel, #excelFileLabel").find(".circle").addClass("bg-orange");
				$("#EXCEL_IDLabel, #excelFileNameLabel, #excelPathLabel, #excelFileLabel").find(".textblock").addClass("orange");
				
				//엑셀파일 파일선택영역으로 change
				$("#excelFileModal").remove(".textbox");
				$("#excelFileLabel").parent().append('<input name="file" id="excelFileModal" type="file" accept=".xlsx, .xls" style="width:80%;">');	
				
			}, Language);	
		});
	}, grid: function() {
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid", "W2018090417230872610007jKt9cdZG10", that.getSearchData(), function(){});
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			$("#gridModalPopSaveBtn").attr("type", "C");
			fileFlag = "C";
			mCommon.gridPopAdd("grid");
			that.setReportPop();
			$("#EXCEL_IDModal").attr("readonly", null);
		});
		
		//그리드 edit 버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			fileFlag = "U";
			// Report 모달창을 연다.
			// Report 팝업의 값들을 세팅해준다.
			// Report 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#gridModalPopSaveBtn").attr("type", "U");
			// 수정이기 때문에 itemId,수정자,수정시간이 입력불가능하게 바꾼다.
			$("#EXCEL_IDModal, #UPDATE_DATEModal, #UPDATE_BY_NAMEModal").attr("readonly", "readonly");
			mCommon.gridPopAdd("grid");
			that.setReportPop(item);
		});
		
		// 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#EXCEL_IDModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10074']});
				return;
			}
			
			if($("#excelFileNameModal").val() == "" && fileFlag == "C"){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11523']});
				return;
			}
			
			if($("#excelPathModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11520']});
				return;
			}
			
			if($("#excelFileModal").val() == "" && fileFlag == "C"){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10867']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					//버튼 type 세팅
					var param = that.getReportPop();
					var files = excelFileModal.files;
				    if(files.length === 0 && fileFlag == "C") {
				        alert(Language.lang['MESSAGES10662']);
				        return;
				    }
				    // CRUD type 입력
				    param.crudType = type;
				    
				    // 한글 깨짐때문에 encoding
				    param.description = encodeURIComponent(param.description);
				    param.excelFileName = encodeURIComponent(param.excelFileName);
				    param.groupColumn = encodeURIComponent(param.groupColumn);
				    
				    fn_report_upload(files[0], JSON.stringify(param), that.callbackPostReport);
				}
			}});
		});
		
		// 취소 버튼
		$(document).on("click", "#gridModalPopCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		// 복사 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			fileFlag = "C";
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) {
					message = Language.lang['MESSAGES11603'];
				} else {
					message = Language.lang['MESSAGES10491'];
				}
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}
			
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#EXCEL_IDModal").attr("readonly", null);
			mCommon.gridPopAdd("grid");
			// 팝업의 값들을 세팅해준다.
			that.setReportPop(selectItems[0].item);
		});
		
		// 삭제 버튼
		$(document).on("click", "#delBtn", function(){			
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var callbackChk = false;
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10645'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
								excelId : checkedItems[i].item.EXCEL_ID
							}
							if(i == checkedItems.length-1){
								callbackChk = true;
							}
							mom_ajax("D","common.excelPrintForm", JSON.stringify(param), that.callbackPost, callbackChk);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false};
		
		//사용유무, 단종유무, 성적서검사, 수입검사, 출하검사, 투입여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#USE_YN_NAMEModal", comboOptions, options);
			}
		);
	},
	getSearchData: function(){
		var param = {
			excelId : $("#reportId").val(),
			excelFileName : $("#fileName").val()
		}
		return param;
	},
	setReportPop: function(data){
		data = data || {};
		
		$("#EXCEL_IDModal").val(data.EXCEL_ID || "");
		$("#excelFileNameModal").val(data.excelFileName || "");
		$("#excelPathModal").val(data.excelPath || "");
		$("#LIST_ALLCOUNTModal").val(data.LIST_ALLCOUNT || "");
		$("#GROUP_COLUMNModal").val(data.GROUP_COLUMN || "");
		$("#USE_YN_NAMEModal").val(data.USE_YN || "Y");
		$("#UPDATE_DATEModal").val(data.UPDATE_DATE || "");
		$("#UPDATE_BY_NAMEModal").val(data.UPDATE_BY_NAME);
		$("#descriptionModal").val(data.description || "");
		
		$("#UPDATE_DATEModal, #UPDATE_BY_NAMEModal").attr("readonly","readonly");
	},
	getReportPop: function(){
		var result = {
			excelId: $("#EXCEL_IDModal").val(),
			excelFileName: $("#excelFileNameModal").val(),
			listAllcount: $("#LIST_ALLCOUNTModal").val(),
			groupColumn: $("#GROUP_COLUMNModal").val(),
			useYn: $("#USE_YN_NAMEModal").val(),
			description: $("#descriptionModal").val()
		}
		return result;
	},
	callbackPost : function(param, data, callbackParam){
		var that = this.MOMID002;
		if(param == 'SUCCESS'){
			$("#gridModalPop").micaModal("hide");
			if(callbackParam == true){
				mCommon.render("grid", "W2018090417230872610007jKt9cdZG10",  that.getSearchData(), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	callbackPostReport : function(param, data, callbackParam){
		var that = this.MOMID002;
		if(param == 'SUCCESS'){
			$("#gridModalPop").micaModal("hide");
			mCommon.render("grid", "W2018090417230872610007jKt9cdZG10", that.getSearchData(), function(){
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
	}
};
$(document).ready(function(event){
	MOMID002.init();
});