var hostLen = (location.hostname.indexOf(".smartmom") == -1) ? location.hostname.indexOf("-smartmom") : location.hostname.indexOf(".smartmom") ;
var companyCd = location.hostname.substr(0, hostLen).toUpperCase();
var macaddress;
var Login2 = {
	siteList: {},
	
	init: function() {
		this.logout();
		if(companyCd == "WWW") {
			companyCd = "";
		}
		/*
		if(mCommon.getCookie('divisionCd') != undefined && mCommon.getCookie('divisionCd') == 'FAKR') {
			if(
				   mCommon.getCookie('loginId')    != undefined && mCommon.getCookie('loginId')    != '' 
				&& mCommon.getCookie('password')   != undefined && mCommon.getCookie('password')   != '' 
				&& mCommon.getCookie('siteId')     != undefined && mCommon.getCookie('siteId')     != ''
				//&& mCommon.getCookie('divisionCd') != undefined && mCommon.getCookie('divisionCd') != ''
				&& mCommon.getCookie('companyCd')  != undefined && mCommon.getCookie('companyCd')  != ''
				&& mCommon.getCookie('locale')     != undefined && mCommon.getCookie('locale')     != ''
			) {
				var param = {
					  userId:   mCommon.getCookie('loginId')
					, password: mCommon.sha256Set(mCommon.getCookie('password'))
					, siteId:   mCommon.getCookie('siteId')
				};
				
				var url = unescape(location.href); 			
				if(url.indexOf('logout') < 0) {
					this.login(param);
				}
			}
		}
		*/
		this.comboBox();
		this.event();
	}, 
	
	event: function() {
		var that = this;
		
		$(document).on("click", ".loginbutton2", function() {
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
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.site.dummy', {companyCd : companyCd}, function(data) {
			var siteOptions = {local: data, /*textName : "companyName",*/ textName : "divisionName", valueName : "divisionCd", readonly : false};
			for(var i = 0; i < data.length; i++) {
				var divisionCd = data[i].divisionCd;
				var companyCd = data[i].companyCd;
				that.siteList[divisionCd] = data[i];
//				that.siteList[companyCd] = data[i];
			}
			
			micaCommon.comboBox.set("#field-3", {width : 280, height : 100, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0, scrollBarSize : 30, itemHeight: 50}, siteOptions);
			//$('#field-3').find('.jqx-combobox-arrow-normal').width(100);
			var langOptions = {textName : "name", valueName : "code"};
			
			$("#field-3").on('change', function (event) {
				var site = Login2.siteList[$(this).val()];
				var param = {divisionCd : site.divisionCd, companyCd : site.companyCd, codeClassId : "LANGUAGE_CODE"};
				
				$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', param, function(data) {
					langOptions.local = data;
					micaCommon.comboBox.set("#field-4", {width: 250, height : 100, autoDropDownHeight : true, scrollBarSize : 30, itemHeight: 50},langOptions);
					$("#field-4").jqxComboBox('selectIndex', 0);
				});
			});
			
			var site = Login2.siteList[$("#field-3").val()];
			var param = {divisionCd : site.divisionCd, companyCd : site.companyCd, codeClassId : "LANGUAGE_CODE"};
			
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', param, function(data) {
				langOptions.local = data;
				micaCommon.comboBox.set("#field-4", {width: 250, height : 100, autoDropDownHeight : true, scrollBarSize : 30, itemHeight: 50},langOptions);
				$("#field-4").jqxComboBox('selectIndex', 0);
			});
			
			$("#field-3").jqxComboBox('selectIndex', 0); 
			
			that.rememberMeCheck();
		});
	},
	
	login: function(loginParam) {
		var param = {
			userId 		: loginParam.userId,
			password 	: loginParam.password,
			divisionCd 	: (this.siteList[loginParam.siteId] != undefined && this.siteList[loginParam.siteId]['divisionCd'] != undefined) ? this.siteList[loginParam.siteId]['divisionCd'] : mCommon.getCookie('divisionCd'),
			companyCd 	: (this.siteList[loginParam.siteId] != undefined && this.siteList[loginParam.siteId]['companyCd']  != undefined) ? this.siteList[loginParam.siteId]['companyCd'] :  mCommon.getCookie('companyCd'),
			locale 		: $('#field-4').val() != undefined ? $('#field-4').val() : mCommon.getCookie('locale')
		}
		micaCommon.splash.show();
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
						sessionStorage.setItem("localTime", data.STANDARD_TIME);				
						sessionStorage.setItem("deptCd", data.DEPT_CD);
						sessionStorage.setItem("empAuthority", data.EMP_AUTHORITY);
						sessionStorage.setItem("vendorCd", data.VENDOR_CD || "");
						sessionStorage.setItem("menuList", JSON.stringify(data.menuList));						
						//sessionStorage.setItem("authGroupMenuList", JSON.stringify(data.authGroup));
						sessionStorage.setItem("authGroupMenuList", data.authGroup.menuList || "[]");
						var authGroupMenuElement = micaCommon.fncS.keyValueSet({key : "menuId", data: data.authGroupElement})
						sessionStorage.setItem("authGroupMenuElement", JSON.stringify(authGroupMenuElement));
						sessionStorage.setItem("parameters", JSON.stringify(data.parameters));
						sessionStorage.setItem("resourceList", JSON.stringify(data.resourceList));
						Login2.rememberMeSave();
						
						if(isMobile) {
							top.location.href = tuCommon.contextPath() + "/TabletMain.html";
							micaCommon.splash.hide();
						} else {
							//Language.init(undefined, true);
							Language.init(function() {
								if (data.USER_TYPE=="P")
								{
									
									var param = '?' +'login/'+macaddress;
									window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');								
								//top.location.href = tuCommon.contextPath() + "/dashboard/screenselect.html";
								
								}
							else
							{
								
							}
							
								
								micaCommon.splash.hide();
							}, true);
						}
					});
					
					/*console.log('Language.initialize Start ' + param.divisionCd + ', ' + param.divisionCd + ', ' + $('#field-4').val());
					Language.initialize(param.divisionCd, param.companyCd, $('#field-4').val(), function() {
						console.log('Language.initialize Success');
					})*/
					
				mCommon.setCookie('loginId', param['userId'], 30);
				mCommon.setCookie('password', $("#password").val(), 30);
				mCommon.setCookie('siteId', $('#field-4').val(), 30);
				mCommon.setCookie('divisionCd', param['divisionCd'], 30);
					mCommon.setCookie('companyCd', param['companyCd'], 30);
					mCommon.setCookie('locale', $('#field-4').val(), 30);
				} else {
					micaCommon.messageBox({ width: 1000, height: 270, title: "Login Failed", html: "Check The ID or Password", type: "danger", fontSize: 45, headerSize: 75, footerSize: 65,footerFontSize: 22});
					/*momWidget.messageBox({type:'warning', width:'400',height:'145',html: Language.lang[MESSAGES11334],size: '200%'});*/
					micaCommon.splash.hide();
				} 
			},
			error: function() {
				micaCommon.splash.hide();
			}
		});
	},
	
	loginCheck: function() {
		var that = this;
		$.get(tuCommon.contextPath() + "/system/loginCheck", function (result) {
			if (!result) {
				Login2.init();
			} else {
//				if(isMobile) {
//					top.location.href = tuCommon.contextPath() + "/TabletMain.html";
//				} else {
				that.init();
					//top.location.href = tuCommon.contextPath() + "/main.html";
					
//				}
//				if (data.USER_TYPE=="P")
//					{
//					top.location.href = tuCommon.contextPath() + "/dashboard/screenselect.html";
//					
//					}
//				else
//				{
//					
//				}
							
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
			/*mCommon.setCookie("loginId", "", -1);
			mCommon.setCookie("password", "", -1);
			mCommon.setCookie("siteId", "", -1);*/
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
	Login2.loginCheck();
});

var filter = "win16|win32|win64|mac";
var isMobile = false;
if(navigator.platform){
	if(0 > filter.indexOf((navigator.platform || "").toLowerCase())){
		isMobile = true;
	}
}