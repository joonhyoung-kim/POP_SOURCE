var companyCd = location.hostname.substr(0, location.hostname.indexOf("smartmom") - 1).toUpperCase();
var Login = {
	siteList: {},
	
	init: function() {
		this.logout();
		if(companyCd == "WWW") {
			companyCd = "";
		}
		
		this.comboBox();
		this.event();
	}, 
	
	event: function() {
		var that = this;
		
		$(document).on("click", ".loginbutton", function() {
			var param = {
				userId : $("#loginId").val(),
				password : mCommon.sha256Set($("#password").val()),
				siteId : $("#field-3").val()
			}
			that.login(param);
		});
		
		$(document).on("keydown", "#loginId", function(e) {
			if(e.keyCode == 13) {
				$("#password").focus();
			}
		});
		
		$(document).on("keydown", "#password", function(e) {
			if(e.keyCode == 13) {
				var param = {
					userId : $("#loginId").val(),
					password : mCommon.sha256Set($("#password").val()),
					siteId : $("#field-3").val()
				}
				that.login(param);
			}
		});
	}, 
	
	comboBox: function() {
		var that = this;
		//var options =  {textName : "companyName", valueName : "companyCd"}
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.site.dummy', {companyCd : companyCd}, function(data) {
		//$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.site.dummy', {companyCd : 'FINEALTECH'}, function(data) {
			options =  {local: data, /*textName : "companyName",*/ textName : "divisionName", valueName : "divisionCd"}
			for(var i = 0; i < data.length; i++) {
				var divisionCd = data[i].divisionCd;
				var companyCd = data[i].companyCd;
				that.siteList[divisionCd] = data[i];
				that.siteList[companyCd] = data[i];
			}
			
			micaCommon.comboBox.set("#field-3", {width: 165,dropDownHeight: '10px'}, options);
			$("#field-3").on('change', function (event) {
				
				var options =  {textName : "name", valueName : "code"}
				var site = Login.siteList[$(this).val()];
				var param = {divisionCd : site.divisionCd, companyCd : site.companyCd, codeClassId : "LANGUAGE_CODE"}
				$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', param, function(data) {
					options.local = data;
					micaCommon.comboBox.set("#field-4", {width: 165}, options);
					$("#field-4").jqxComboBox('selectIndex', 0 );
				});
			});
			$("#field-3").jqxComboBox('selectIndex', 0 ); 
			that.rememberMeCheck();
		});
	},
	
	login: function(loginParam) {
		var param = {
			userId 		: loginParam.userId,
			password 	: loginParam.password,
			divisionCd 	: this.siteList[loginParam.siteId].divisionCd,
			companyCd 	: this.siteList[loginParam.siteId].companyCd,
			locale 		: $('#field-4').val()
		}
		
		$.ajax({
			url:$("html").attr("contextPath")+"/system/login",
			method: "get",
			data : param,
			success: function(data){
				if(data == "Success") {
					sessionStorage.setItem("userId", param.userId);
					sessionStorage.setItem("divisionCd", param.divisionCd);
					sessionStorage.setItem("companyCd", param.companyCd);
					sessionStorage.setItem("locale", $('#field-4').val());
					$.get("/TU_Platform/system/loginInfo", function(data) {
						sessionStorage.setItem("divisionName", data.DIVISION_NAME);
						sessionStorage.setItem("companyName", data.COMPANY_NAME);
						sessionStorage.setItem("deptName", data.DEPT_NAME);
						sessionStorage.setItem("userName", data.NAME);
						
						sessionStorage.setItem("empAuthority", data.EMP_AUTHORITY);
						sessionStorage.setItem("vendorCd", data.VENDOR_CD || "");
						sessionStorage.setItem("menuList", JSON.stringify(data.menuList));
						sessionStorage.setItem("authGroupMenuList", data.authGroup.menuList || "[]");
						var authGroupMenuElement = micaCommon.fncS.keyValueSet({key : "menuId", data: data.authGroupElement})
						sessionStorage.setItem("authGroupMenuElement", JSON.stringify(authGroupMenuElement));
						
						Login.rememberMeSave();
						if(isMobile) {
							top.location.href = tuCommon.contextPath() + "/TabletMain.html";
						} else {
							//Language.init(undefined, true);
							Language.init(function() {
								top.location.href = tuCommon.contextPath() + "/main.html";
							}, true);
						}
					});
					
					/*console.log('Language.initialize Start ' + param.divisionCd + ', ' + param.divisionCd + ', ' + $('#field-4').val());
					Language.initialize(param.divisionCd, param.companyCd, $('#field-4').val(), function() {
						console.log('Language.initialize Success');
					})*/
				} else {
					micaCommon.messageBox({ width: 350, height: 130, title: "Login Failed", html: "Check The ID or Password", type: "danger" });
				}
			},
			error: function() {
				
			}
		});
	},
	
	loginCheck: function() {
		$.get(tuCommon.contextPath() + "/system/loginCheck", function (result) {
			if (!result) {
				Login.init();
			} else {
				if(isMobile) {
					top.location.href = tuCommon.contextPath() + "/TabletMain.html";
				} else {
					top.location.href = tuCommon.contextPath() + "/main.html";
				}
			}
		});
	},
	
	logout: function() {
		$.ajax({
            type: "get",
            url: tuCommon.contextPath() + "/system/logout",
            data: {},
            async: false,
            success: function(data) {
            }
       });
	},
	
	rememberMeSave: function() {
		if($("#checkbox").is(":checked")) {
			mCommon.setCookie("loginId", $("#loginId").val(), 30);
			mCommon.setCookie("password", mCommon.sha256Set($("#password").val()), 30);
			mCommon.setCookie("siteId", $("#field-3").val(), 30);
		} else {
			mCommon.setCookie("loginId", "", -1);
			mCommon.setCookie("password", "", -1);
			mCommon.setCookie("siteId", "", -1);
		}
	},
	
	rememberMeCheck: function() {
		if(mCommon.getCookie("userId")) {
			$("#loginId").val(mCommon.getCookie("loginId")).attr("autocomplete", "false");
			$("#password").val(mCommon.getCookie("password")).attr("autocomplete", "false");
			$("#field-3").val(mCommon.getCookie("siteId"));
			$("#checkbox").prop("checked", true);
			
			/*var param = {
				userId : mCommon.getCookie("loginId"),
				password : mCommon.getCookie("password"),
				siteId : mCommon.setCookie("siteId")
			}
			
			that.login(param);*/
		}
	}
};

$(document).ready(function(event){
	Login.loginCheck();
});

var filter = "win16|win32|win64|mac";
var isMobile = false;
if(navigator.platform){
	if(0 > filter.indexOf((navigator.platform || "").toLowerCase())){
		isMobile = true;
	}
}
