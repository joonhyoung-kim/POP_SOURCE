var userName = sessionStorage.getItem("userName");

var TabletMain = {
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
		this.style();
		this.event();
		this.menuSet(".w-nav");
		
		// 메인 띄우기 or hash 체크해서 화면 띄우기
		if(location.hash) {
			$(window).trigger("hashchange");
		} else {
			$(".navitemlink:eq(0)").click();
		}
		
	}, style: function() {
		$(".tablet-nav").css({"height": "calc(100% - 60px)", "overflow" : "auto"});
	}, event: function() {
		var that = this ; 
		$(document).on("click", "#btnTabReset", function() {
			$("#tabgroup>a:not(#tabID_MAIN), .tabcontent>div:not(#tabContentID_MAIN)").remove();
			$("#tabgroup>a")[0].click();
		});
		$(document).on("click", "#btnChangePass", function() {
			$("#nowPassword, #newPassword, #newPasswordConfirm").val("");
			$("#passwordPop").micaModal("show");
		});

		$("#pSaveBtn").click(function() {
			that.passwordChange();
		});
		
		$("#pCancelBtn").click(function() {
			$("#passwordPop").micaModal("hide");
		});
		
		$(document).on("click", "#btnLogout", function() {
			that.logout();
		});
		
		$(document).on("click", ".mom-logo", function() {
			location.reload();
		});
	}, loginCheck: function() {
		var time = 100000;
		setInterval(function() {
			$.get(tuCommon.contextPath() + "/system/loginCheck", function (result) {
				if (!result) {
					alert("세션이 끊겼습니다.");
					top.location.href = tuCommon.contextPath() + "/login.html";
				}
			});
		}, time);
	}, logout: function() {
		var param = {
			}
		$.get(tuCommon.contextPath() + "/system/logout", param, 
		function(data){
			location.href = tuCommon.contextPath() + "/login.html";
		});
	}, passwordChange: function() {
		var nowPassword = $("#nowPassword").val();
		var newPassword = $("#newPassword").val();
		$("#newPasswordConfirm").val();
		if(newPassword != $("#newPasswordConfirm").val()) {
			mCommon.messageBox({type: "fail", title: "비밀번호", html : "새로운 비밀번호가 같지 않습니다."});
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
					mCommon.messageBox({type: "fail", title: "비밀번호", html : "비밀번호가 변경 됐습니다."});	
					$("#passwordPop").micaModal("hide");
				} else {
					mCommon.messageBox({type: "fail", title: "비밀번호", html : "현재 비밀번호를 확인하세요."});
				}
			}
		});
	},
	menuSet: function (el) {
//		var authMenuList = JSON.parse(sessionStorage.getItem("authGroupMenuList"));
//		var menuListData = JSON.parse(sessionStorage.getItem("menuList"));
		var menuListData = [{"id":"1-1","parentId":"root","name":"구매관리","url":null,"icon":"fa-shopping-cart","menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMCA003","parentId":"1-1","name":"발주현황","url":"material/MOMCA003","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"2-1","parentId":"root","name":"자재입출고관리","url":null,"icon":"fa-sitemap","menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMCC001","parentId":"2-1","name":"자재입고","url":"material/MOMCC001","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMCC003","parentId":"2-1","name":"자재입고현황","url":"material/MOMCC003","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":"ctrType=CANCEL"},{"id":"MOMCC004","parentId":"2-1","name":"원자재불출","url":"material/MOMCC004","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMCC012","parentId":"2-1","name":"원자재불출(구매)","url":"material/MOMCC012","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":"stockType=MAT"},{"id":"3-1","parentId":"root","name":"재고관리","url":null,"icon":"fa-archive","menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMCE001","parentId":"3-1","name":"자재재고현황","url":"material/MOMCE001","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":"facilityType=MAT"},{"id":"4-1","parentId":"root","name":"출하관리","url":null,"icon":"fa-truck","menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMFA025","parentId":"4-1","name":"고객주문별재고현황","url":"salesorder/MOMFA007","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":"stockType=P002"},{"id":"MOMFA001","parentId":"4-1","name":"제품출하내수","url":"salesorder/MOMFA001","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMFA004","parentId":"4-1","name":"출하현황","url":"salesorder/MOMFA004","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMFC002","parentId":"4-1","name":"제품재고현황","url":"workorder/MOMDA006","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":"facilityType=SO"},{"id":"5-1","parentId":"root","name":"품질관리","url":null,"icon":"fa-barcode","menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMEA003","parentId":"5-1","name":"수입검사","url":"qa/MOMEA003","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null},{"id":"MOMEA004","parentId":"5-1","name":"수입검사현황","url":"qa/MOMEA004","icon":null,"menuGroup":null,"displayOrder":0,"useFlag":"Y","param":null}];
		var menuList = [];
		if(menuListData == null) {
			$.get(tuCommon.contextPath() + "/system/logout", {}, 
			function(data){
				location.href = tuCommon.contextPath() + "/login.html";
			});
			return;
		}
//		for(var i = 0; i < menuListData.length; i++) {
//			var menuData = menuListData[i];
//			if(menuData.useFlag == "Y" && authMenuList.indexOf(menuData.id) > -1) {
//				menuList.push(menuData);
//			}
//		}
		
		var menuList = menuListData;
		var menuList = mCommon.parentIdHierarchy(menuList, "parentId", "child");

		this.leftTabletMenuHtmlSet(el, menuList);
		this.leftTabletMenuEventSet();
	},
	leftTabletMenuHtmlSet : function(el, menuList) {
		var depth1_parent = '' +
		'<li class="depth1-menu w-clearfix tablet-navmenu" style="height: initial;">'+
			'<div class="w-dropdown menu-sam-width dropdownmenu tablet-dropdown" style="max-width: 100%;">'+
				'<div id="#{id}" class="lv1Menu w-dropdown-toggle menu-sam-width navlink tablet-navlink">'+
					'<div class="textblock dptext">#{name}</div>'+
					'<div class="w-icon fa fa-angle-down icon right"></div>'+
					'<div class="w-icon fa #{icon} icon left tablet"></div>'+
				'</div>'+
				'<nav class="lv1MenuList w-dropdown-list header-nav dropdownlist">'+
					'<ul class="depth2 depth1 menusub depth2">'+
					'</ul>'+
				'</nav>'+
			'</div>'+
		'</li>';
		var depth1_child = ''+
		'<li class="navitem tablet">'+
			'<a href="##{id}" data-path="#{htmlPath}" data-param="#{param}" name="#{name}" class="w-clearfix w-inline-block navitemlink tablet">'+
				'<div class="textblock">#{name}</div>'+
			'</a>'+
		'</li>';
		var $el = $(el).find("ul.depth1");
		$el.html("");
		for(var i = 0; i < menuList.length; i++) {
			var data = menuList[i];
			if(data.hide) { continue; }
			data.child = data.child || [];
			if(data.child == null || data.child.length < 1) {
				var tmp = depth1.replace(/#{id}/gi, data.id);
				tmp = tmp.replace(/#{htmlPath}/gi, data.url);
				tmp = tmp.replace(/#{param}/gi, data.param ? "?" + data.param : "");
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.name);
				$el.append(tmp);
			} else {
				var tmp = depth1_parent.replace(/#{id}/gi, data.id);
				tmp = tmp.replace(/#{icon}/gi, data.icon);
				tmp = tmp.replace(/#{name}/gi, data.name);
				var $tmp = $(tmp);
				for(var j = 0; j < data.child.length; j++) {
					var dataChild = data.child[j];
					if(dataChild.hide) { continue; }
					if(dataChild.child == null || dataChild.child.length < 1) {
						var tmp_child = depth1_child.replace(/#{id}/gi, dataChild.id);
						tmp_child = tmp_child.replace(/#{htmlPath}/gi, dataChild.url);
						tmp_child = tmp_child.replace(/#{param}/gi, dataChild.param ? "?" + dataChild.param : "");
						tmp_child = tmp_child.replace(/#{name}/gi, dataChild.name);
						$tmp.find(".depth2.depth1.menusub").append(tmp_child);
					} else {
						var tmp_depth2 = depth2_parent.replace(/#{id}/gi, dataChild.id);
						tmp_depth2 = tmp_depth2.replace(/#{name}/gi, dataChild.name);
						var $tmp_depth2 = $(tmp_depth2);
						for(var k = 0; k < dataChild.child.length; k++) {
							var dataChild2 = dataChild.child[k];
							if(dataChild2.hide) { continue; }
							var tmp_depth2_child = depth2_child.replace(/#{id}/gi, dataChild2.id);
							tmp_depth2_child = tmp_depth2_child.replace(/#{htmlPath}/gi, dataChild2.url);
							tmp_depth2_child = tmp_depth2_child.replace(/#{param}/gi, dataChild2.param ? "?" + dataChild2.param : "");
							tmp_depth2_child = tmp_depth2_child.replace(/#{name}/gi, dataChild2.name);
							$tmp_depth2.find(".dropdownbox .depth2.depth1").append(tmp_depth2_child);
						}
						$tmp.find(".depth2.depth1.menusub").append($tmp_depth2);
					}
				}
				$el.append($tmp);
			}
		}
	},
	leftTabletMenuEventSet: function() {
		$(".lv1Menu").on("click", function() {
			if($(this).next().is(":visible")) {
				$(".is-show").removeClass("is-show");
				$(".tablet-navlink.active").removeClass("active");
				$(this).find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
			} else {
				$(".is-show").removeClass("is-show");
				$(".tablet-navlink.active").removeClass("active");
				$(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
				
				$(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
				$(this).parent().find(".lv1MenuList").addClass("is-show");
				$(this).addClass("active");
				$(".line6").show();
			}
		});
		$(".navitemlink").on("click", function() {
			location.hash = $(this).attr("href");
		});
		$(window).bind('hashchange', function () {
			var menuABtn = $("[href='" + location.hash + "']");
			$(".navitemlink.tablet.active").removeClass("active");
			menuABtn.addClass("active");
			var tabContent = '<div id="tabContentID_#{id}" data-w-tab="Tab#{id}" class="w-tab-pane w--tab-active tabpane"><iframe src="#{url}" style="width:100%; height:100%; border:0px;"></iframe></div>';
			
			var name = menuABtn.attr("name");
			var id = menuABtn.attr("href").replace("#", "");
			var param = menuABtn.attr("data-param");
			var realDate = "&n=" + new Date().getTime();
			param = param == "" ? "?id=" + id + realDate : param + "&id=" + id + realDate;
			var href= menuABtn.attr("data-path");
			
			if($("[id='tabID_" + id + "']").length < 1) {
//				$(".tablet-content .h100per").html(tabHead.replace(/#{id}/gi, id).replace(/#{name}/gi, name));
				var publishSrc = "";
				
				$(".tablet-content .h100per").html(tabContent.replace(/#{id}/gi, id).replace(/#{url}/gi, publishSrc + href + ".html" + param));
				$("[id='tabContentID_" + id + "'] iframe").on("load", function(){
					$($("[id='tabContentID_" + id + "'] iframe")[0].contentDocument).find("body").css("background", "inherit");
				});
			}
		});
	}
};
$(document).ready(function(event){
	TabletMain.init();
});