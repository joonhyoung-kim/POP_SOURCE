var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var gvThat;
var MOMIB003 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.event();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W2018062814585496910008f5dk6b1v0E", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: "BillOfResource"});
				that.comboBox();
				// 라벨 색상 변경
				$("#itemIdLabel, #routeCdLabel, #resourceCdLabel, #tactTimeLabel, #altPriorityLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#itemIdLabel, #routeCdLabel, #resourceCdLabel, #tactTimeLabel, #altPriorityLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);	
			mCommon.init("auigrid-2", "W201811120552295561000rAfsR0UFJ58", null, function(){}, Language);
		});
	}, 
	grid: function() {		
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
		
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid", "W2018062814585496910008f5dk6b1v0E", mCommon.formGetParam("#form"), function(){});
		});
		
		// 이력조회 버튼
		$(document).on("click", "#histBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");

			if(checkedItems.length <= 0 || checkedItems.length > 1) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10998']});
				return;
			}
			
			var param = {
				itemId : checkedItems[0].item.itemId,
				routeCd : checkedItems[0].item.routeCd,
				resourceCd : checkedItems[0].item.resourceCd
			}
			
			mCommon.render("auigrid-2", "W201811120552295561000rAfsR0UFJ58", param, function(){});
			$("#listPop").micaModal("show");
			AUIGrid.resize("auigrid-2");
		});
		
		// 이력조회 엑셀 다운로드
		$(document).on("click", "#pExcelDownBtn", function() {
			mCommon.auiGridExcelExport("auigrid-2", {fileName: "BOR_HIST_MOMIB003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#listPop").micaModal("hide");
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setBorPop();
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#itemIdModal, #routeCdModal, #resourceCdModal").jqxComboBox({disabled: false});
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10644'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						micaCommon.splash.show();
						for(var i = 0; i < checkedItems.length; i++){							
							var param = checkedItems[i].item;
							arrayList.push(param);
						}
						mom_ajax("LD", "reference.itemInfo.bor.bor", JSON.stringify(arrayList), that.callbackPost);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}				
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "BOR_MOMIB003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "BOR_MOMIB003_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			var params = {
					itemId : $("#itemIdModal").val(),
					routeCd : $("#routeCdModal").val(),
					resourceCd : $("#resourceCdModal").val(),
					priority : $("#altPriorityModal").val()
			}
			var checkPriority = that.priorityCheck(params);
			if($("#itemIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				$("#itemIdModal").focus();
				return;
			}
			
			if($("#routeCdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10211']});
				$("#routeCdModal").focus();
				return;
			}
			
			if($("#resourceCdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10685']});
				$("#resourceCdModal").focus();
				return;
			}
			
			if($("#altPriorityModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10960']});
				$("#altPriorityModal").focus();
				return;
			}
			
			if($("#tactTimeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10082']});
				$("#tactTimeModal").focus();
				return;
			}
			
			if($("#useYnModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				$("#tactTimeModal").focus();
				return;
			}
			
			if(checkPriority == false) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10959']});
				return;
			}
			
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getBorPop();
					mom_ajax(type,"reference.itemInfo.bor.bor", JSON.stringify(param), that.callbackPost);
				}
			}});
			
		});
		
		// BOR 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			mCommon.gridPopAdd("grid");
			that.setBorPop(selectItems[0].item);
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#itemIdModal, #routeCdModal, #resourceCdModal").jqxComboBox({disabled: false});
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			that.setBorPop(item);
			$("#gridModalPopSaveBtn").attr("type", "U");
			$("#itemIdModal, #routeCdModal, #resourceCdModal").jqxComboBox({disabled: true});
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
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#resourceName'), $('#findBtn'));
	},
	comboBox : function() {
		mCommon.comboBoxClickCall("#routeName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "ROUTE_CODE"}, function(data){
				micaCommon.comboBox.set("#routeName",{ searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				callBack();
			});
		});
		
		//품목
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};		
		var optItem = {textName : "text", valueName : "id"};
		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.itemInfo.bom.item.dummy"; // 검색 URL
		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItem.minLength = 4; // 최소 검색 수
		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItem);
			
		mCommon.comboBoxClickCall("#resourceCdModal", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", function(data){
				micaCommon.comboBox.set("#resourceCdModal",{ searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "text", valueName : "id", readonly: false});
				callBack();
			});
		});
			
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "ROUTE_CODE"}, function(data){
			micaCommon.comboBox.set("#routeCdModal",{ searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "name", valueName : "code", readonly: false});
		});
			
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "USE_FLAG"}, function(data){
			micaCommon.comboBox.set("#useYnModal",{ searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			micaCommon.comboBox.set("#searchUseYn",{ searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
		
	},
	setBorPop: function(data) { 
		data = data || {};
		
		$("#itemIdModal").val(data.itemId || "");
		$("#routeCdModal").val(data.routeCd || "");
		$("#resourceCdModal").val(data.resourceCd || "");
		$("#altPriorityModal").val(data.altPriority || "");
		$("#earlyProducingTermModal").val(data.earlyProducingTerm || "");
		$("#tactTimeModal").val(data.tactTime || "");
		$("#yieldModal").val(data.yield || "");
		$("#useYnModal").val(data.useYn || "Y");
		$("#descriptionModal").val(data.description || "");
		$("#normalInPersonCntModal").val(data.normalInPersonCnt || "");
		$("#normalDrPersonCntModal").val(data.normalDrPersonCnt || "");
	},
	getBorPop: function() {
		var result ={
			itemId: $("#itemIdModal").val() || "",
			routeCd: $("#routeCdModal").val() || "",
			resourceCd: $("#resourceCdModal").val() || "",
			altPriority: $("#altPriorityModal").val() || "",
			earlyProducingTerm: $("#earlyProducingTermModal").val() || "",
			tactTime: $("#tactTimeModal").val() || "",
			yield: $("#yieldModal").val() || "",
			useYn: $("#useYnModal").val() || "",
			description: $("#descriptionModal").val() || "",
			normalInPersonCnt : $("#normalInPersonCntModal").val() || "",
			normalDrPersonCnt : $("#normalDrPersonCntModal").val() || ""
		}
		return result;
	},
	callbackPost : function(result, data, param){
		if(result == 'SUCCESS'){
			mCommon.render("grid", "W2018062814585496910008f5dk6b1v0E", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				$("#gridModalPop").micaModal("hide");
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
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
		
		/*excel_upload(file, 'reference.itemInfo.bor.bor', 'MOMIB003', JSON.stringify(param));*/
		excel_upload(file, 'reference.itemInfo.bor.bor', 'MOMIB003', 'grid', JSON.stringify(param), gvThat.callbackPost);
		$("#uploadPop").micaModal("hide");
		micaCommon.splash.show();
	},
	priorityCheck : function(params) {
		var checkResult = true;
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.itemInfo.bor.priorityCheck.dummy',
			timeout : 30000000,
			async : false,
			data : params,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				for(var i = 0; data.length > i; i++) {
					if(params.priority == data[i].altPriority) {
						checkResult = false; 
					}
				}
			},
			error : function(error){
				errors = error;
			},
			fail : function(data){
				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
					micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
				} else {
					micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				}
			}
		});
		
		return checkResult;
	}

};
$(document).ready(function(event){
	MOMIB003.init();
});
