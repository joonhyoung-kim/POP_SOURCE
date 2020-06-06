var companyCd = sessionStorage.getItem("companyCd");
var divisionCd = sessionStorage.getItem("divisionCd");
var locale = sessionStorage.getItem("locale");
var userName = sessionStorage.getItem("userName");
var noticeBoardId = "";
var timer;
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
			$("#currentDivision").html(sessionStorage.divisionName + "(" + sessionStorage.divisionCd + "/" + sessionStorage.companyCd + ") "
										+ " [" + sessionStorage.deptName + "]");
		});
		
		this.grid();
		this.event();
		this.style();
		this.loginCheck();
		this.noticeCheck();
		this.browserClose();
//		this.noticeStart();
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
		/*$(document).on("click", "#btnFomG", function() {
			that.fomGo();
		});*/
		
		$(document).on("click", ".mom-logo", function() {
			location.reload();
		});
		
		
		
		$(document).on("click", "#noticeTopTitle, #noticeTopText", function() {
			that.noticeCheck('Y');
		});
		$("#btnPrintAppDown").click(function() {
			window.open("https://chrome.google.com/webstore/detail/meta4-clickonce-launcher/jkncabbipkgbconhaajbapbhokpbgkdc?hl=ko","_blank", "");
		});
		
		// 공지사항팝업 닫기
		$(document).on("click", "#notiConfirmBtn, .bntpopclose", function() {
			$("#noticePop").micaModal("hide");
			that.noticeDoNotOpenCheck();
		});
		
		
		$(document).on("click", "#noticeCheckbox", function() {
			console.log($("#noticeCheckbox").prop("checked"));
		});
		
		/* modify_hists
		 * 20191104_002 / 20191104 / gyp / 메뉴검색 기능 추가 예정
		 * 
		 * */
		$(document).on("click", "#searchMenuBtn", function() {
			
			alert("준비중입니다."); // 20191104_002
		});
	},
	loginCheck: function() {
		var time = 100000;
		this.noticeTop();
		timer = setInterval(this.noticeTop, 600000);
		setInterval(function() {
			mCommon.fnLoginCheck();
		}, time);
	},
	logout: function() {
		var param = {
			}
		$.get(tuCommon.contextPath() + "/system/logout", param, 
		function(data){
			location.href = tuCommon.contextPath() + "/login.html?flag=logout";
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
	noticeCheck: function(cl) {
		var popFlag;
		if(cl == 'Y') {
			popFlag = 'N';
		} else {
			 popFlag = 'Y';
		}
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.noticeBoard.dummy",
				type : "GET",
				data : {popFlag : popFlag},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){	
					if(data.length > 0){
						if(popFlag == 'N' && data[0].boardId != null) {
							$(".check").css({display:"none"});
						}
						$("#noticePop").micaModal('show');
						$("#noticeTitle").text(data[0].boardTitle);
						$("#noticeContents").text(data[0].boardContents);
						$("#noticeText").text(data[0].boardContents);
						noticeBoardId = data[0].boardKey;
					}
				},
				error: function(data){
					console.log(data);
					micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Error."});
					return;
				},
				fail : function(data){
					console.log(data);
					micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Fail."});
					return;
				}
			});
			
	},
	noticeTop: function() {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.noticeBoard.dummy",
				type : "GET",
				data : {popFlag:'N'},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){	
					//console.log(data);
					if(data.length > 0){
						$("#noticeTopTitle").text(data[0].boardTitle)
						$("#noticeTopText").text(data[0].boardContents);
					} else {
						$("#noticeTopTitle").text("");
						$("#noticeTopText").text("");
					}
				},
				error: function(data){
					console.log(data);
					alert("Session lost.");
					top.location.href = tuCommon.contextPath() + '/login.html';
					return;
				},
				fail : function(data){
					console.log(data);
					micaCommon.messageBox({type:"danger", width:"400", height: "145",   html:"Notice Check Fail."});
					return;
				}
			});
	},
	noticeDoNotOpenCheck: function() {
		if($("#noticeCheckbox").prop("checked")){
			var param = { boardId : noticeBoardId};
			mom_ajax("C","admin.noticeUserCheck", JSON.stringify(param));
		}
	},
	browserClose: function() {
		window.onbeforeunload = function(e){
//			$.get(tuCommon.contextPath() + "/system/logout", {}, 
//				function(data){
//					location.href = tuCommon.contextPath() + "/login.html";
//				}
//			);
		}
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