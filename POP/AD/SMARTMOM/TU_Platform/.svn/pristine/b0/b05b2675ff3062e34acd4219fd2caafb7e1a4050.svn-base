var userId = sessionStorage.getItem("userId");
var MOMJA094 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201902121445380071000jFXYvA7usCc", null, function() {
				that.grid();
			}, Language);
		});
	},
	grid: function() {
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
	},
	event: function() {
		var that = this;
		
		// 조회
		$(document).on("click", "#findBtn", function() {
			var param = mCommon.formGetParam("#form");
			mCommon.render("grid", "W201902121445380071000jFXYvA7usCc", param, function(){});
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_STOCK_CONTROL_MOMJA094_" + get_current_date("yyyy-mm-dd")});
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			// 팝업 저장버튼 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#pCreateBtn").attr("type", "U");
			$("#createPop").micaModal("show");
			$("#pDeptName").jqxComboBox({disabled: true});
			that.setItemStockControlPop(item);
		});
		
		// 등록 버튼(팝업창 호출)
		$(document).on("click", "#createBtn", function() {
			$("#createPop").micaModal("show");
			that.setItemStockControlPop();
			$("#pDeptName").jqxComboBox({disabled: false});
			$("#pCreateBtn").attr("type", "C");
		});

		// 복사
		$(document).on("click", "#copyBtn", function() {
			var checkItem = AUIGrid.getCheckedRowItems("grid");
			if(checkItem.length < 1 || checkItem.length > 1) { 
				var message = "";
				if(checkItem.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return;
			}
			
			$("#createPop").micaModal("show");
			that.setItemStockControlPop(checkItem[0].item);
			$("#pCreateBtn").attr("type", "C");
			$("#pDeptName").jqxComboBox({disabled: false});
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#pCreateBtn", function() {
			var type = $(this).attr("type");
			
			if($("#pDeptName").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11719']});
				return;
			}
			
			if($("#pCloseDate").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11720']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					//버튼 type 세팅
					var param = that.getItemStockControlPop();
					mom_ajax(type, "admin.itemStockControl.itemStockControl", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		// 취소 버튼(팝업창)
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#createPop").micaModal("hide");
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false};
		
		//부서명
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "CONTROL_DEPT"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#partName", comboOptions, options);
				micaCommon.comboBox.set("#pDeptName", comboOptions, options);
			}
		);
	},
	setItemStockControlPop: function(data) {
		data = data || {};
		$("#pDeptName").val(data.deptCd || "");
		$("#pCloseDate").val(data.ctrlDate || "");
		$("#pDescription").val(data.description || "");
		$("#pDeptName").attr("readonly", "readonly");
	},
	getItemStockControlPop: function() {
		var result = {
			deptCd : $("#pDeptName").val(),
			ctrlDate : $("#pCloseDate").val(),
			description : $("#pDescription").val()
		}
		
		return result;
	},
	callbackPost: function(result, data) {
		var that = this.MOMJA094;
		if(result == "SUCCESS"){
			$("#createPop").micaModal("hide");
			var param = mCommon.formGetParam("#form");
			mCommon.render("grid", "W201902121445380071000jFXYvA7usCc", param, function(){
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
	}
};
$(document).ready(function(event){
	MOMJA094.init();
});