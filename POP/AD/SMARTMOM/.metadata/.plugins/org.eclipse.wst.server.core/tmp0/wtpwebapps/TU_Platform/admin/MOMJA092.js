var locale = sessionStorage.getItem("locale");
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var empAuthority = sessionStorage.getItem("empAuthority");

var MOMJA092 = {
	init: function() {
		var that = this;
		var param = {empAuthority : empAuthority};
		Language.init(function() {
			mCommon.init("grid1", "W201808261417551161000bzd54qfs068", null, function() {
				mCommon.render("grid1", "W201808261417551161000bzd54qfs068", param);
				AUIGrid.bind("grid1", "cellClick", function( event ) {
					if(that.grid1EditMode) {
						return;
					}
					that.authSelectItem = event.item;
					$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.admin.micaAuthGroup/M", {id: event.item.codeId}, function(data) {
						that.getDataGrid2(function(rowData) {
							var menuList = JSON.parse(data.menuList || null);
							
							// 권한 관리 부분 메뉴 순서 
//						if(menuList) {
//							rowData.sort(function(a, b) {
//								var aIndex = menuList.indexOf(a.id);
//								var bIndex = menuList.indexOf(b.id);
//								aIndex = aIndex < 0 ? 999999 : aIndex;
//								bIndex = bIndex < 0 ? 999999 : bIndex;
//								
//								return aIndex - bIndex;
//							});
//						}
							var rowData = mCommon.parentIdHierarchy(rowData, "parentId", "children");
							AUIGrid.setGridData("grid2", rowData);
							
							AUIGrid.setCheckedRowsByIds("grid2", menuList);
							AUIGrid.setGridData("grid3", []);
						});
					})
				});
			}, Language);
			
			mCommon.init("grid2", "W201808261502372271000USvABQfYLlF", null, function() {
				AUIGrid.bind("grid2", "cellClick", function( event ) {
					that.selectMenuId = event.item.id;
					mCommon.render("grid3", "W201808261508447831001YFPBUBQAYrv", {menuId : event.item.id, locale : locale, authMenu : "Y"}, function(){
						that.getDataGrid3Check();
					});
				});
			}, Language);
			
			mCommon.init("grid3", "W201808261508447831001YFPBUBQAYrv", null, null, Language);
		});
		this.event();
		$(".w-clearfix.h100per").prepend('<div id="split-left"></div>');
		$("#split-left").append($(".card.wcalc10.w400px, .card.wcalc750.h100p"));
		mCommon.splitter("#split-left", "vertical", "35%");
		mCommon.splitter(".w-clearfix.h100per", "vertical", "75%");
	}, 
	getDataGrid2: function(callBack) {
		micaCommon.splash.show();
		var param = {
			locale	: locale
			, empAuthority : empAuthority 
		}
		
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.admin.authoSiteMenu.dummy", param, function(data) {
			callBack(data);
			micaCommon.splash.hide();
		});
	},
	getDataGrid3Check: function(callBack) {
		var that = this;
		micaCommon.splash.show();
		var param = {
				authId : this.authSelectItem.codeId,
				menuId : this.selectMenuId,
				authMenu : "Y"
		}
		
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.admin.micaAuthElement.dummy", param, function(data) {
			var checkList = [];
			if(data.length > 0) {
				checkList = JSON.parse(data[0].list || "{}");
				
				var displayOrderList = JSON.parse(data[0].displayOrderList || "[]");
				
				var gridData = AUIGrid.getGridData("grid3");
				gridData.sort(function(a, b) {
					var aIndex = displayOrderList.indexOf(a.elementId);
					var bIndex = displayOrderList.indexOf(b.elementId);
					aIndex = aIndex < 0 ? 999999 : aIndex;
					bIndex = bIndex < 0 ? 999999 : bIndex;
					return aIndex - bIndex;
				});
				AUIGrid.setGridData("grid3", gridData);
			}
			AUIGrid.setAllCheckedRows("grid3", true);
			AUIGrid.addUncheckedRowsByIds("grid3", checkList);
			micaCommon.splash.hide();
		});
	},
	event: function() {
		var that = this;
		$("#saveGroupBtn, #delGroupBtn, #copyGroupBtn, #createGroupBtn").hide();
		$(document).on("click", "#saveMenuBtn", function() {
			that.ajaxType = "LS";
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var checkIds = [];
			for(var i = 0; i< checkedItems.length; i++) {
				checkIds.push(checkedItems[i].item.id);
			}
			
			that.authSelectItem.menuList = JSON.stringify(checkIds);
			that.authSelectItem.divisionCd = divisionCd;
			that.authSelectItem.companyCd = companyCd;
			
			var saveData = {
				menuList : JSON.stringify(checkIds),
				id : that.authSelectItem.codeId,
				name : that.authSelectItem.codeName
			}
			that.authSaveAjax([saveData]);
		});
		
		$(document).on("click", "#saveEleBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid3");
			var uncheckIds = [];
			var checkRowIndexs = [];
			var displayOrderList = [];
			
			for(var i = 0; i< checkedItems.length; i++) {
				checkRowIndexs.push(checkedItems[i].rowIndex);
			} 
			
			var allData = AUIGrid.getGridData("grid3");
			for(var i = 0; i < allData.length; i++) {
				if(checkRowIndexs.indexOf(i) < 0) {
					uncheckIds.push(allData[i].elementId);
				}
				displayOrderList.push(allData[i].elementId);
			}
			
			var param = {
				authId : that.authSelectItem.codeId,
				menuId : that.selectMenuId,
				list : JSON.stringify(uncheckIds),
				displayOrderList : JSON.stringify(displayOrderList)
			}
			that.ajaxType = "LS";
			that.authElementAjax([param]);
		});
		
		$(document).on("click", "#createGroupBtn", function() {
			var removedRowItems = AUIGrid.getRemovedItems("grid1");
			if(removedRowItems.length > 0) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES11011']});
				return;
			}
			
			AUIGrid.addRow("grid1", {}, "last");
			$("#editModeGroupBtn").attr("mode", "N").click();
		});
		
		$(document).on("click", "#copyGroupBtn", function() {
			var item = AUIGrid.getSelectedItems("grid1")[0];
			if(item == null) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10232']});
			}
			item = item.item;
			var rowIndex = AUIGrid.getGridData("grid1").length;
			
			AUIGrid.setSelectionByIndex("grid1", AUIGrid.getSelectedIndex("grid1")[0], 1);
			AUIGrid.openInputer("grid1");
		});
		
		$(document).on("click", "#delGroupBtn", function() {
			var removedRowItems = AUIGrid.getRemovedItems("grid1");
			if(removedRowItems.length > 0) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES11011']});
				return;
			}

			var editedRowItems = AUIGrid.getEditedRowColumnItems("grid1");
			if(editedRowItems.length > 0) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10581']});
				return;
			}
			
			AUIGrid.removeRow("grid1", "selectedIndex"); 
		});
		$(document).on("click", "#saveGroupBtn", function() {
			// 추가된 행 아이템들(배열)
			var addedRowItems = AUIGrid.getAddedRowItems("grid1");
			// 수정된 행 아이템들(배열)
			var editedRowItems = AUIGrid.getEditedRowItems("grid1"); 
			
			var upsertData = addedRowItems.concat(editedRowItems);
			for(var i = 0; i < upsertData.length; i++) {
				var dataI = upsertData[i];
				if(dataI.id == null || dataI.name == null) {
					micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10552']});
					return; 
				}
				upsertData[i].divisionCd = divisionCd;
				upsertData[i].companyCd = companyCd;
			}
			
			// 삭제된 행 아이템들(배열)
			var removedRowItems = AUIGrid.getRemovedItems("grid1");
			if(removedRowItems.length > 0) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : Language.lang['MESSAGES11192'], html : Language.lang['MESSAGES10582'], okButton : { text: "ok", after : function(){
						that.ajaxType = "D";
						that.authSaveAjax(removedRowItems[0], function() {
							AUIGrid.resetUpdatedItems("grid1", "a");
							$("#editModeGroupBtn").attr("mode", "Y").click();
						});
					}  
				}});
				
			} else {
				that.ajaxType = "LS";
				that.authSaveAjax(upsertData, function() {
					AUIGrid.resetUpdatedItems("grid1", "a");
					$("#editModeGroupBtn").attr("mode", "Y").click();
				});
			}
		});
		
		$(document).on("click", "#up2Btn, #up3Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("up", "").replace("Btn", "");
			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
			if(index)
			var item = AUIGrid.getItemByRowIndex("grid" + id, index - 1);
			if(item == null) {
				return;
			}
//			AUIGrid.setCellValue("grid" + id, index, "displayOrder", index - 1);
//			AUIGrid.setCellValue("grid" + id, index - 1, "displayOrder", index);
			AUIGrid.moveRowsToUp("grid" + id);
		});
		$(document).on("click", "#down2Btn, #down3Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("down", "").replace("Btn", "");
			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
			var item = AUIGrid.getItemByRowIndex("grid" + id, index + 1);
			if(item == null) {
				return;
			}
//			AUIGrid.setCellValue("grid" + id, index, "displayOrder", index + 1);
//			AUIGrid.setCellValue("grid" + id, index + 1, "displayOrder", index);
			AUIGrid.moveRowsToDown("grid" + id);
		});
	},
	authSaveAjax: function(saveData, callBack) {
		var that = this;
		callBack = callBack || function(){}
		
		mom_ajax(that.ajaxType, "admin.micaAuthGroup", JSON.stringify(saveData), function(data) {
			if(data) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10692']});
				callBack();
			}
		});
	},
	authElementAjax: function(saveData) {
		var that = this;
		
		mom_ajax(that.ajaxType, "admin.micaAuthElement", JSON.stringify(saveData), function(data) {
			if(data) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10692']});
			}
		});
	},
	grid1EditMode : false,
	ajaxType: null,
	authSelectItem : {},
	selectMenuId: null,
	elementObjData : null
};
$(document).ready(function(event){
	MOMJA092.init();
});