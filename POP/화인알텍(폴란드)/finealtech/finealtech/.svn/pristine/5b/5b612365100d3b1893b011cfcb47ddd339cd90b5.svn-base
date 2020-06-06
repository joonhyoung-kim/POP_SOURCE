var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var locale = sessionStorage.getItem("locale");
var siteMenuDivisionCd;
var siteMenuCompanyCd;
var MOMJA095 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid1", "W201904301747246423562dfhAf2s06dF", null, function() {
				that.event();
				that.grid("grid1");
				mCommon.render("grid1", "W201904301747246423562dfhAf2s06dF");
				
			}, Language);
		
		
		mCommon.init("grid2", "W201905161702375271464GgeHBehTLfa", null, function() {
			that.grid("grid2");
			that.design();
		}, Language);
		});
		
		mCommon.splitter(".tabcontentarea", "vertical", 400);
	}, 
	grid: function(grid) {
		var that = this;
		if(grid == "grid1") {
			AUIGrid.bind("grid1", "cellClick", function( event ) {
				if(that.grid1EditMode) {
					return;
				}
				that.siteSelectItem = event.item;
				siteMenuDivisionCd = event.item.divisionCd;
				siteMenuCompanyCd = event.item.companyCd;
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.siteMenu.siteMenu.dummy", {siteMenuDivisionCd: siteMenuDivisionCd, siteMenuCompanyCd : siteMenuCompanyCd, locale : locale}, function(data) {
					that.getDataGrid2(function(rowData) {
						var rowData = mCommon.parentIdHierarchy(rowData, "parentId", "children");
						AUIGrid.setGridData("grid2", rowData);
						for(var i = 0; i < data.length; i++) {
							AUIGrid.addCheckedRowsByIds("grid2", data[i].id);
						}
					});
				})
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.siteMenu.getParentIds.dummy",
					type : "GET",
					data : {siteMenuDivisionCd : siteMenuDivisionCd, siteMenuCompanyCd : siteMenuCompanyCd},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						AUIGrid.setColumnPropByDataField( "grid2", "parentId", {
							style:"columnStyle",
							editRenderer : {
								type : "DropDownListRenderer",
								list : data, 
								keyField : "parentId", 
								valueField : "parentId" 							
							}
					 	});
					},
					error: function(data){},
					fail : function(data){}
				});
			});
		} else {
			
			AUIGrid.setColumnPropByDataField( "grid2", "displayOrder", {style:"columnStyle"});
			
			AUIGrid.bind("grid2", "rowAllChkClick", function( e ) {
				var allData = AUIGrid.getGridData("grid2");
				
				if(e.checked == true) {
					for(var i = 0; i < allData.length; i++) {
						AUIGrid.setCellValue("grid2", i, "siteMenuFlag", "Y");
					}
				} else {
					for(var i = 0; i < allData.length; i++) {
						AUIGrid.setCellValue("grid2", i, "siteMenuFlag", "N");
					}
				}
				
				
			});
			AUIGrid.bind("grid2", "rowCheckClick", function( e ) {
				if(e.item.siteMenuFlag == "N") {
					AUIGrid.setCellValue("grid2", e.rowIndex, "siteMenuFlag", "Y");
				} else {
					AUIGrid.setCellValue("grid2", e.rowIndex, "siteMenuFlag", "N");
				}
				
			});
				
		}
		
	},
	getDataGrid2: function(callBack) {
		micaCommon.splash.show();
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.siteMenu.siteMenu.dummy", {siteMenuDivisionCd: siteMenuDivisionCd, siteMenuCompanyCd : siteMenuCompanyCd, locale : locale, menuFlag : 'Y'}, function(data) {
			callBack(data);
			micaCommon.splash.hide();
		});
	},
	event: function() {
		var that = this;
		var isExpanded = true;
//		$(document).on("click", "#up2Btn", function() {
//			var id = $(this).attr("id");
//			id = id.replace("up", "").replace("Btn", "");
//			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
//			if(index)
//			var upItem = AUIGrid.getItemByRowIndex("grid" + id, index - 1);
//			var downItem = AUIGrid.getItemByRowIndex("grid" + id, index);
//			that.ajaxType = "U";
//			if(upItem.id == 'MAIN') {
//				return;
//			}
//			if(upItem.parentId != downItem.parentId) { // 클릭행의 위의 행이 중메뉴 또는 대메뉴 일경우(그룹핑행)
//				var up2Item = AUIGrid.getItemByRowIndex("grid" + id, index - 2);
//				if(up2Item.id != upItem.parentId) { // 클릭행의 위의 행과 그 위의 행이 둘 다 중메뉴 또는 대메뉴 일경우(그룹핑행)
//					AUIGrid.setCellValue("grid" + id, index, "parentId", up2Item.parentId);
//					var newOrder = that.maxDisplayOrder(up2Item.parentId) + 1;
//					AUIGrid.setCellValue("grid" + id, index, "displayOrder", newOrder);
//					that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//				} else{
//					var up3Item = AUIGrid.getItemByRowIndex("grid" + id, index - 3);
//					if(up3Item.id != 'MAIN') {
//						AUIGrid.setCellValue("grid" + id, index, "parentId", up3Item.parentId);
//						var newOrder = that.maxDisplayOrder(up3Item.parentId) + 1;
//						AUIGrid.setCellValue("grid" + id, index, "displayOrder", newOrder);
//						that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//					} else{
//						return;
//					}
//				}
//				var items = AUIGrid.getGridData("grid"+id);
//				var newOrder = 0;
//				for(var i = index; i < items.length; i++) {
//					if(index != i && items[i].parentId == downItem.parentId) {
//						AUIGrid.setCellValue("grid" + id, i, "displayOrder", newOrder);
//						newOrder++;
//						that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, i));
//					}
//				}
//				
//			} else{
//				AUIGrid.setCellValue("grid" + id, index, "displayOrder", downItem.displayOrder - 1);
//				AUIGrid.setCellValue("grid" + id, index - 1, "displayOrder", downItem.displayOrder);
//				AUIGrid.moveRowsToUp("grid" + id);
//				
//				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index - 1));
//				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//			}
//			
//			
//		});
//		
//		$(document).on("click", "#down2Btn", function() {
//			var id = $(this).attr("id");
//			id = id.replace("down", "").replace("Btn", "");
//			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
//			if(index)
//			var upItem = AUIGrid.getItemByRowIndex("grid" + id, index);
//			var downItem = AUIGrid.getItemByRowIndex("grid" + id, index + 1);
//			
//			that.ajaxType = "U";
//			
//			if(upItem.id == 'MAIN') {
//				return;
//			}
//			if(upItem.parentId != downItem.parentId) {
//				var down2Item = AUIGrid.getItemByRowIndex("grid" + id, index + 2);
//				if((down2Item.url == null && downItem.url == null) == false || down2Item.parentId == downItem.parentId) {
//					AUIGrid.setCellValue("grid" + id, index, "parentId", downItem.id);
//					var newOrder = that.maxDisplayOrder(downItem.id) + 1;
//					AUIGrid.setCellValue("grid" + id, index, "displayOrder", newOrder);
//					that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//				} else{
//					var down3Item = AUIGrid.getItemByRowIndex("grid" + id, index + 3);
//					if(down3Item.parentId == down2Item.id) {
//						AUIGrid.setCellValue("grid" + id, index, "parentId", down3Item.parentId);
//						var newOrder = that.maxDisplayOrder(down3Item.parentId) + 1;
//						AUIGrid.setCellValue("grid" + id, index, "displayOrder", newOrder);
//						that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//					} else{
//						return;
//					}
//				}
//			} else{
//				AUIGrid.setCellValue("grid" + id, index, "displayOrder", upItem.displayOrder + 1);
//				AUIGrid.setCellValue("grid" + id, index + 1, "displayOrder", upItem.displayOrder);
//				AUIGrid.moveRowsToDown("grid" + id);
//				
//				
//				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index + 1));
//				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
//			}
//			
//			
//		});
		
		$(document).on("click", "#showParentsBtn", function() {
			
			if (!isExpanded) {
				AUIGrid.expandAll("grid2");
				isExpanded = true;
			} else {
				AUIGrid.collapseAll("grid2");
				isExpanded = false;
			}
		});
		
		$(document).on("click", "#editOrderBtn", function() {
			var editedRowItems = AUIGrid.getEditedRowItems('grid2');
			var cntEdit = 1;
			var chkFlag = false;
			for(var i = 0; i < editedRowItems.length; i++) {
				editedRowItems[i].siteMenuDivisionCd = siteMenuDivisionCd;
				editedRowItems[i].siteMenuCompanyCd = siteMenuCompanyCd;
				if(editedRowItems[i].displayOrder == null || editedRowItems[i].displayOrder == '') {
					  micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11851']});
					  return;
				  }
			}
			 micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
					  for(var i = 0; i < editedRowItems.length; i++) {
						  if(i == editedRowItems.length - 1) {
							  chkFlag = true;
						  }
						  mom_ajax("U", "siteMenu.siteMenu", JSON.stringify(editedRowItems[i]), that.siteSaveCallback, chkFlag);
					  }
					}
			}});
		});
		
		$(document).on("click", "#saveMenuBtn", function() {
			  var editedRowItems = AUIGrid.getEditedRowItems("grid2");
			  var createArray = [];
//			  var removeArray = [];
			  var chkFlag = false;
			  var nxtDispOrder = 0;
			  var cntEdit = 1;
			  micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
					  for(var i = 0; i < editedRowItems.length; i++) {
						  editedRowItems[i].siteMenuDivisionCd = siteMenuDivisionCd;
						  editedRowItems[i].siteMenuCompanyCd = siteMenuCompanyCd;
						  if(editedRowItems[i].siteMenuFlag == "Y") {
							  if(editedRowItems[i].displayOrder == null) {
								  nxtDispOrder = that.maxDisplayOrder(editedRowItems[i].parentId) + cntEdit;
								  editedRowItems[i].displayOrder = nxtDispOrder;
								  cntEdit++;
							  } 
							  createArray.push(editedRowItems[i]);
						  } else {
							  if(i == editedRowItems.length - 1) {
								  chkFlag = true;
							  }
							  mom_ajax("D", "siteMenu.siteMenu", JSON.stringify(editedRowItems[i]), that.delCallback, editedRowItems[i], chkFlag);
						  }
					  }
					  
					  if(createArray.length > 0) {
						  mom_ajax("L", "siteMenu.siteMenu", JSON.stringify(createArray), that.siteSaveCallback);
					  }
					}
			  }});
//			  
//			  if(removeArray.length > 0) {
//				  mom_ajax("LD", "siteMenu.siteMenu", JSON.stringify(removeArray), function() {});
//			  }
		}); 
		
	},
	siteSaveCallback: function(data, callBack, flag) {
		var that = this.MOMJA095;
		if(data == 'SUCCESS'){
			if(flag != false) {
				var param = {
						siteMenuDivisionCd : siteMenuDivisionCd, 
						siteMenuCompanyCd : siteMenuCompanyCd,
						locale : locale
				}
				
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.siteMenu.siteMenu.dummy", param, function(data) {
					that.getDataGrid2(function(rowData) {
						var rowData = mCommon.parentIdHierarchy(rowData, "parentId", "children");
						AUIGrid.setGridData("grid2", rowData);
						for(var i = 0; i < data.length; i++) {
							AUIGrid.addCheckedRowsByIds("grid2", data[i].id);
						}
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					});
				})
//				mCommon.render("grid2", "W201905161702375271464GgeHBehTLfa", param, function(){
//					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
//				});
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	},
	delCallback: function(data, callBack, params, flag) {
		var that = this.MOMJA095;
		if(data == 'SUCCESS'){
			var param = {
					siteMenuDivisionCd : siteMenuDivisionCd, 
					siteMenuCompanyCd : siteMenuCompanyCd,
					id : params.id
			}
			 mom_ajax("U", "siteMenu.authSiteMenu", JSON.stringify(param), that.siteSaveCallback, flag);
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:data["p_err_msg"]});
			console.log(data);
		}
	},
	menuAjax: function(id, saveData) {
		var that = this;
		saveData['locale'] = locale;
		saveData['siteMenuDivisionCd'] = siteMenuDivisionCd;
		saveData['siteMenuCompanyCd'] = siteMenuCompanyCd;
		mom_ajax(that.ajaxType, "siteMenu.siteMenu", JSON.stringify(saveData), function(data) {
			if(data) {
//				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.siteMenu.siteMenu.dummy", saveData, function(data) {
					that.getDataGrid2(function(rowData) {
						var rowData = mCommon.parentIdHierarchy(rowData, "parentId", "children");
						AUIGrid.setGridData("grid2", rowData);
						
						for(var i = 0; i < data.length; i++) {
							AUIGrid.addCheckedRowsByIds("grid2", data[i].id);
						}
					});
				})
			}
		});
		
	},
	maxDisplayOrder: function(id) {
		var maxDisplayOrder = 0;
		var param = {
				parentId : id ,
				siteMenuDivisionCd : siteMenuDivisionCd,
				siteMenuCompanyCd : siteMenuCompanyCd
		}
		
		$.ajax({url: tuCommon.contextPath() + "/mom/request/com.thirautech.mom.siteMenu.maxDisplayOrder.dummy",
			type : "GET",
			data : param,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			async: false,
			success: function(data) {
				if(data[0] != null) {
					maxDisplayOrder = data[0].maxDisplayOrder;
				} else{
					maxDisplayOrder = -1;
				}
			}
		})
		return maxDisplayOrder;
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	grid1EditMode : false,
	ajaxType: null,
	siteSelectItem : {},
	selectMenuId: null,
	elementObjData : null
};
$(document).ready(function(event){
	MOMJA095.init();
});