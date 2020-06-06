var userId = sessionStorage.getItem("userId");
var gvThat;
var endDate;

$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.price.globalPrice.globalPrice.dummy',
	timeout : 30000000,
	async : false,
	data : {fromDate : $("#fromDate").val(), currencyCd : $("#currencyName").val()},
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		if(data.length > 0) {
			endDate = data[0].endDate;
		}
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

var MOMIC003 = {
	init: function() {	
		var that = this;
		gvThat = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W20180702133106068100024GgdpPqMso", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES11653']});
				that.comboBox();
			}, Language);
		});
	},
	grid: function() {
		var that = this;
		$("#fromDate").val(get_current_date("YYYY-MM-DD"));
		$("#updateByName").val(userId);
		
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
	}, 
	event: function() {
		var that = this; // MOMIC003 내부 변수 사용을 위해서 선언.
		
		// Edit 버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			$("#gridModalPopSaveBtn").attr("type", "U");
			mCommon.gridPopAdd("grid");
			that.setExchangeRatePop(item);
			cudFlag = "U";
			$("#currencyCdModal, #useYnModal").jqxComboBox({disabled: true});
			$("#updateUserNameModal, #updateDateModal, #startDateModal, #endDateModal").attr("readonly", "readonly");
			$("#startDateModal, #endDateModal").datetimepicker("destroy");
			
		});
		
				
		//조회 버튼
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W20180702133106068100024GgdpPqMso", that.getSearchData(), function(){});
		});
		
		// 현행화 버튼 클릭
		$(document).on("click", "#priceBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11304'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					$.post(tuCommon.contextPath() 
							+ '/file/exchange/com.thirautech.mom.reference.price.globalPrice.globalPriceProc.dummy', {}, that.priceCallbackPost);
				}
			}});
			
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function(){
			var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
			$("#gridModalPopSaveBtn").attr("type", "C");
			mCommon.gridPopAdd("grid");
			that.setExchangeRatePop();
			cudFlag = "C";
			$("#useYnModal").jqxComboBox({disabled: true});
			$("#currencyCdModal").jqxComboBox({disabled: false});
			$("#startDateModal").attr("readonly", null);
			$("#endDateModal").attr("readonly", "readonly");
			$("#endDateModal").datetimepicker("destroy");
			$("#updateUserNameModal").val(userId);
			$("#updateDateModal").val(curr_date);
		});
		
		// 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(checkedItems.length < 1 || checkedItems.length > 1) { 
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}
			cudFlag = "C";

			$("#gridModalPopSaveBtn").attr("type", "C");
			mCommon.gridPopAdd("grid");
			// 팝업의 값들을 세팅해준다.
			that.setExchangeRatePop(checkedItems[0].item);
			// 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post

			// 복사이고 생성하기 때문에 입력가능하게 바꾼다.
			$("#currencyCdModal").jqxComboBox({disabled: false});
			$("#startDateModal").attr("readonly", null);
			$("#endDateModal").attr("readonly", "readonly");
			$("#endDateModal").datetimepicker("destroy");
		});
		
		//시작일 선택시 종료일 수정
		$(document).on("change", "#startDateModal", function() {
			if($("#startDateModal").val() > get_current_date('YYYY-MM-DD')) {
				$("#startDateModal").val(get_current_date('YYYY-MM-DD'));
				$("#endDateModal").val($("#startDateModal").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10795']});
				return;
			} else {
				$("#startDateModal").datetimepicker({ onSelectDate: function(dateText) {  
					var exDate = $("#startDateModal").val();
					$("#endDateModal").val(exDate);
				  }
				});
			}
		});
		
		//저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#currencyCdModal").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11638']});
				return;
			}
			
			if($("#unitPriceModal").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10963']});
				return;
			}
			
			if($("#startDateModal").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10796']});
				return;
			}
			
			if($("#endDateModal").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11240']});
				return;
			}
			
			if($("#useYnModal").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				return;
			}
			
//			if(type == 'C') {
//				if($("#startDateModal").val() < endDate) {
//					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"이미 등록된 시작일/종료일 입니다."});
//					return;
//				}
//			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					//버튼 type 세팅
					var param = that.getExchangeRatePop();
					mom_ajax('C', "reference.price.globalPrice.globalPriceProc", JSON.stringify(param), that.listCallbackPost, true);
				}
			}});
		});
		
	},
	comboBox: function() {
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		//환율 관리
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCurrencyCode.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#currencyName", comboOptions, options);
				micaCommon.comboBox.set("#currencyCdModal", comboOptions, options);
			}
		);
		
		//사용여부
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', {codeClassId : "USE_FLAG"}, function(data) {
			options.local = data;
			micaCommon.comboBox.set("#useYnModal", comboOptions, options);
		});
	},
	setExchangeRatePop: function(data) { 
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		$("#currencyCdModal").val(data.currencyCd || "");
		$("#unitPriceModal").val(data.unitPrice || "");
		$("#startDateModal").val(data.startDate || get_current_date('yyyy-mm-dd'));
		$("#endDateModal").val(data.endDate || get_current_date('yyyy-mm-dd'));
		$("#useYnModal").val(data.useYn || "Y");
		$("#updateUserNameModal").val(data.userId || "");
		$("#updateDateModal").val(data.updateDate || "");
		$("#descriptionModal").val(data.description || "");
		
		$("#updateUserNameModal, #updateDateModal").attr("readonly","readonly");
	},
	getExchangeRatePop: function() {
		var result = {
			currencyCd : $("#currencyCdModal").val(),
			unitPrice : $("#unitPriceModal").val(),
			startDate : $("#startDateModal").val(),
			endDate : $("#endDateModal").val(),
			userId : $("#updateUserNameModal").val(),
			cudFlag : cudFlag,
			description : $("#descriptionModal").val()
		}
		return result;
	},
	getSearchData : function(){
		var param = {
			fromDate : $("#fromDate").val(),
			currencyCd : $("#currencyName").val()
		}
		return param;
	},
	listCallbackPost : function(result, data, param, callbackParam) {
		if(result == 'SUCCESS') {
			if(callbackParam == true) {
				mCommon.render("grid", "W20180702133106068100024GgdpPqMso", gvThat.getSearchData(), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					$("#gridModalPop").micaModal("hide");
				});
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(param);
		}
	}
	,
	priceCallbackPost : function(result, data) {
		if(data == 'success') {
			if(result.result == 'success') {
				mCommon.render("grid", "W20180702133106068100024GgdpPqMso", gvThat.getSearchData(), function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + " \n" + Language.getLang(result.p_err_msg)});
			}
		} else {
			if(result.p_err_msg != null && result.p_err_msg != undefined && result.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(result.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
		}
	}
	
};
$(document).ready(function(event){
	MOMIC003.init();
});