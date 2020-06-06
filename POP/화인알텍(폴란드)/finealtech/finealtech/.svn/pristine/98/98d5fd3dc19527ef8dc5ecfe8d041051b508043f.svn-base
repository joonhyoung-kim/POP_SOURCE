var companyCd = sessionStorage.getItem("companyCd");
var divisionCd = sessionStorage.getItem("divisionCd");
var locale = sessionStorage.getItem("locale");
var userName = sessionStorage.getItem("userName");

var index = {
	init: function() {
		$.get(tuCommon.contextPath() + "/system/session/userId", function (name) {
			if(name == null || name == "") {
				$.get(tuCommon.contextPath() + "/system/logout", {}, 
					function(data){
						location.href = tuCommon.contextPath() + "/login.html";
					}
				);
			}
			$("#currentUser").html(userName);
			$("#currentDivision").html(sessionStorage.divisionName + "-" + sessionStorage.companyName + " (" + sessionStorage.deptName + ")");
		});
		
		this.grid();
		this.event();
		this.style();
		this.loginCheck();
		Language.init();
	},
	style: function() {
		$(".mom-logo").css("cursor", "pointer");
	},
	grid: function() {
		
	},
	event: function() {
		var that = this ; 
		mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y");
//		mCommon.leftMenu(".w-nav", "W201808061122088411000uznqSIkwKCz");
		
		$(document).on("click", "#btnTabReset", function() {
			$("#tabgroup>a:not(#tabID_MAIN), .tabcontent>div:not(#tabContentID_MAIN)").remove();
			$("#tabgroup>a")[0].click();
		});
		$(document).on("click", "#btnChangePass", function() {
			$("#nowPassword, #newPassword, #newPasswordConfirm").val("");
			$("#passwordPop").micaModal("show");
//			nowPassword
//			newPassword
//			newPasswordConfirm
		});

		$("#pSaveBtn").click(function() {
			that.passwordChange();
		});
		
		$("#pCancelBtn, .bntpopclose").click(function() {
			$("#passwordPop").micaModal("hide");
		});
		
		$(document).on("click", "#btnLogout", function() {
			that.logout();
		});
		$(document).on("click", "#btnMomGo", function() {
			that.momGo();
		});
		$(document).on("click", "#btnFomG", function() {
			that.fomGo();
		});
		
		$(document).on("click", ".mom-logo", function() {
			location.reload();
		});
	},
	loginCheck: function() {
		var time = 100000;
		setInterval(function() {
			$.get(tuCommon.contextPath() + "/system/loginCheck", function (result) {
				if (!result) {
					$.get(tuCommon.contextPath() + '/system/postLogout/' + companyCd + divisionCd + locale, function(result) {
						sessionStorage.setItem("userId", '');
						sessionStorage.setItem("divisionCd", '');
						sessionStorage.setItem("companyCd", '');
						sessionStorage.setItem("locale", '');
						
						//alert(Language.lang['MESSAGES11764']);
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11764']}); 
						
						top.location.href = tuCommon.contextPath() + '/login.html';
					});
				}
			});
		}, time);
	},
	logout: function() {
		var param = {
			}
		$.get(tuCommon.contextPath() + "/system/logout", param, 
		function(data){
			location.href = tuCommon.contextPath() + "/login.html";
		});
	},
	passwordChange: function() {
		var nowPassword = $("#nowPassword").val();
		var newPassword = $("#newPassword").val();
		$("#newPasswordConfirm").val();
		if(newPassword != $("#newPasswordConfirm").val()) {
			mCommon.messageBox({type: "fail", title: Language.lang['MESSAGES10547'], html : Language.lang['MESSAGES11765']});
			return;
		} 
		var param = {nowPassword : mCommon.sha256Set(nowPassword), newPassword : mCommon.sha256Set(newPassword) }
		$.ajax({
			url : tuCommon.contextPath() + "/system/userPasswordChange",
			data : JSON.stringify(param),
			contentType : "application/json; charset=UTF-8",
			method: "put",
			success: function(data) {
				if(data.result == "success") {
					mCommon.messageBox({type: "fail", title: Language.lang['MESSAGES10547'], html : Language.lang['MESSAGES11766']});	
					$("#passwordPop").micaModal("hide");
				} else {
					mCommon.messageBox({type: "fail", title: Language.lang['MESSAGES10547'], html : Language.lang['MESSAGES11767']});
				}
			}
		});
	},
	momGo: function() {
		
	},
	fomGo: function() {
	}
};
$(document).ready(function(event){
	index.init();
});
;