//2020.04.16 박연주 사용자관리 페이지 XMOM 변환
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var empAuthority = sessionStorage.getItem("empAuthority");
var MOMJA093_1 = {
	init: function() {
		var that = this;		
		Language.init(function(){
		});
	}, saveUser: function(saveData) {
		var that = this;
		$.ajax({
			url : tuCommon.contextPath() + "/system/user",
			data : JSON.stringify(saveData),
			contentType : "application/json; charset=UTF-8",
			method: that.ajaxType,
			success: function(result) {
				if(result.result == "success") {
					var param = mCommon.formGetParam("#form");
					param.empAuthority = empAuthority;
					momWidget.messageBox({type: "success", width: "400", height: "145", html: Language.lang["MESSAGES10692"]});
				} else {
					if(result.p_err_msg != null && result.p_err_msg != undefined && result.p_err_msg != "") {
						momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(result.p_err_msg)});
			        } else {
			        	momWidget.messageBox({type: "warning", width: "400", height: "145", html: Language.lang["MESSAGES10821"]});
			        }
				}
			}, 
			fail: function(data) {
				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != "") {
					momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
		        } else {
		        	momWidget.messageBox({type: "warning", width: "400", height: "145", html: Language.lang["MESSAGES10821"]});
		        }
			}
		});
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		$("#passwordEP1").attr("type", "password");
	}, saveCallInit: function(index, param, callBAckParam, indexInfo){
		var that = this;
		var saveData = param;
		mom_ajax('R', 'user.chkUser', {chkUserId : $("#userIdTmpEP1").val()}, function(result, data) {
			if(data.length == 0){
				saveData.divisionCd = divisionCd;
				saveData.companyCd = companyCd;
				saveData.userIdTmp = $("#userIdTmpEP1").val();
				saveData.description = $("#descriptionEP1").val();
			}
			saveData.password = mCommon.sha256Set(saveData.password);
			that.saveUser(saveData);
		});
	}
};
$(document).ready(function(event) {
	momWidget.init(1, "MOMJA093_1", MOMJA093_1);
	MOMJA093_1.init();
});