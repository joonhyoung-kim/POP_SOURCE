var index = {
	init: function() {
		$.get(tuCommon.contextPath() + "/system/session/userId", function (name) {
			$("#currentUser").html(name);
		})
		
		this.grid();
		this.event();
		this.style();
	},
	style: function() {
		$(".mom-logo").css("cursor", "pointer");
	},
	grid: function() {
		
	},
	event: function() {
		var that = this ; 
		mCommon.leftMenu(".w-nav", "W2018041313443077410040QmdGzBgE8y");
		
		$(document).on("click", "#btnTabReset", function() {
			
		});
		$(document).on("click", "#btnChangePass", function() {
			
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
	logout: function() {
		var param = {
			}
		$.get(tuCommon.contextPath() + "/system/logout", param, 
		function(data){
			location.href = tuCommon.contextPath() + "/login.html";
		});
	},
	momGo: function() {
		
	},
	fomGo: function() {
//		alert("FOM Go");
	}
};
$(document).ready(function(event){
	index.init();
});
;