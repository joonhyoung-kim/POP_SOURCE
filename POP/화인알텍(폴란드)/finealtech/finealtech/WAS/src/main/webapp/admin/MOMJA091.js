var locale = sessionStorage.getItem('locale');

var MOMJA091 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid1", "W201808241400075281000YyYStcPBAhq", null, function() {
				AUIGrid.bind("grid1", "cellClick", function( event ) {
					mCommon.render("grid2", "W201808241400075281000YyYStcPBAhq", {parentId : event.item.id, locale : locale}, function(){});
					that.menu1Id = event.item.id;
					that.menu2Id = null;
					AUIGrid.setGridData("grid3", []);
				});
				
				tuCommon.editColumnSet("grid1");
				
				AUIGrid.showColumnByDataField("grid1", "icon");
				AUIGrid.setColumnPropByDataField("grid1", "icon", { "labelFunction": function(rowIndex, columnIndex, value, headerText, item) { 
					return '<div class="fa ' + value + '" style="margin-top: 8px;"> </div>';
				} } );
				
				AUIGrid.refresh("grid1");
				
				mCommon.render("grid1", "W201808241400075281000YyYStcPBAhq", {locale : locale});
				mCommon.datasets.grid1.setting.colModel[4].popupType = "input"
					mCommon.gridPopCreat("grid1", {colCount: 2, title: Language.lang['MESSAGES10399']});
				
				micaCommon.comboBox.set("#grid1ModalPop #useFlagModal", {}, {local: [{text:"Y", value:"Y"}, {text:"N", value:"N"}]});
			}, Language);
			
			mCommon.init("grid2", "W201808241400075281000YyYStcPBAhq", null, function() {
				AUIGrid.bind("grid2", "cellClick", function( event ) {
					mCommon.render("grid3", "W201808241400075281000YyYStcPBAhq", {parentId : event.item.id, locale : locale}, function(){});
					that.menu2Id = event.item.id;
				});
				
				tuCommon.editColumnSet("grid2");
				mCommon.gridPopCreat("grid2", {colCount: 2, title: Language.lang['MESSAGES10400']});
				micaCommon.comboBox.set("#grid2ModalPop #useFlagModal", {}, {local: [{text:"Y", value:"Y"}, {text:"N", value:"N"}]});
			}, Language);
			
			mCommon.init("grid3", "W201808241400075281000YyYStcPBAhq", null, function() {
				tuCommon.editColumnSet("grid3");
				mCommon.gridPopCreat("grid3", {colCount: 2, title: Language.lang['MESSAGES10401']});
				micaCommon.comboBox.set("#grid3ModalPop #useFlagModal", {}, {local: [{text:"Y", value:"Y"}, {text:"N", value:"N"}]});
			}, Language);
			
			mCommon.init("grid4", "W201808271315061141000MQ0Q7b1jRna", null, function() {
				that.getDataGrid4();
				AUIGrid.bind("grid4", "cellClick", function( event ) {
					mCommon.render("grid5", "W201808241655314001002S9JKjGqIsjy", {menuId : event.item.id}, function(){});
					that.lastSelectMenuId = event.item.id;
				});
			}, Language);
			
			mCommon.init("grid5", "W201808241655314001002S9JKjGqIsjy", null, function() {
				tuCommon.editColumnSet("grid5");
				mCommon.gridPopCreat("grid5", {colCount: 2, title: Language.lang['MESSAGES10025']});
				micaCommon.comboBox.set("#grid5ModalPop #useFlagModal", {}, {local: [{text:"Y", value:"Y"}, {text:"N", value:"N"}]});
			}, Language);
		});
		
		this.grid();
		this.event();
		
		$("#menuContent").prepend('<div id="split-left"></div>');
		$("#split-left").append($(".card.w33p.h100p.paddingr10"));
		mCommon.splitter("#split-left", "vertical", "50%");
		mCommon.splitter("#menuContent", "vertical", "66.6666%");
	}, 
	grid: function() {
		
	},
	getDataGrid4: function() {
		micaCommon.splash.show();
		var param = {
			useFlag : "Y",
			locale 	: locale
		}
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.admin.micaMenu.dummy", param, function(data) {
			var data = mCommon.parentIdHierarchy(data, "parentId", "children");
			AUIGrid.setGridData("grid4", data);
			micaCommon.splash.hide();
		});
	},
	event: function() {
		var that = this;
		$(document).on("click", "#createMenu1Btn, #createMenu2Btn, #createMenu3Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("createMenu", "").replace("Btn", "");
			
			if(id == "2" && that.menu1Id == null || id == "3" && that.menu2Id == null) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10595']});
				return;
			}
			mCommon.gridPopAdd("grid" + id);
			$("#grid" + id + "ModalPop #useFlagModal").val("Y");
			that.ajaxType = "C";
		});
		
		$(document).on("click", "#createEleBtn", function() {
			mCommon.gridPopAdd("grid5");
			$("#grid5ModalPop #useFlagModal").val("Y");
			that.ajaxType = "C";
		});
		
		$(document).on("click", ".grid1EditBtn, .grid2EditBtn, .grid3EditBtn", function() {
			var id = $(this).attr("class");
			id = id.substr(id.indexOf("EditBtn")-1, 1);
			var rowIndex = $(this).attr("row-index");
			mCommon.gridPopEdit("grid" + id, {rowNum: rowIndex});
			that.ajaxType = "U";
		});
		
		$(document).on("click", ".grid5EditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			mCommon.gridPopEdit("grid5", {rowNum: rowIndex});
			that.ajaxType = "U";
		});
		
		$(document).on("click", "#delMenu1Btn, #delMenu2Btn, #delMenu3Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("delMenu", "").replace("Btn", "");
			var item = AUIGrid.getSelectedItems("grid" + id)[0].item;
			if(item == null) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10580']});
				return;
			}
			
			that.ajaxType = "D";
			micaCommon.messageBox({width:500, height:145, type:"primary", title : Language.lang['MESSAGES10577'], html : Language.lang['MESSAGES10646'], okButton : { text: "ok", after : function(){
				that.menuAjax("grid" + id, item);
			}  }});
		});
		
		$(document).on("click", "#delEleBtn", function() {
			var item = AUIGrid.getSelectedItems("grid5")[0].item;
			if(item == null) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10580']});
				return;
			}
			
			that.ajaxType = "D";
			micaCommon.messageBox({width:500, height:145, type:"primary", title : Language.lang['MESSAGES10577'], html : Language.lang['MESSAGES10646'], okButton : { text: "ok", after : function(){
				that.elementAjax("grid5", item);
			}  }});
		});
		
		$(document).on("click", "#copyMenu1Btn, #copyMenu2Btn, #copyMenu3Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("copyMenu", "").replace("Btn", "");
			mCommon.gridPopEdit("grid" + id);
			that.ajaxType = "C";
		});
		
		$(document).on("click", "#copyEleBtn", function() {
			mCommon.gridPopEdit("grid5");
			that.ajaxType = "C";
		});
		
		$(document).on("click", "#grid1ModalPopSaveBtn, #grid2ModalPopSaveBtn, #grid3ModalPopSaveBtn", function() {
			var id = $(this).attr("id");
			id = id.replace("grid", "").replace("ModalPopSaveBtn", "");
			var saveData = mCommon.gridFormGetParam("grid" + id);
			
			switch(id) {
				case "1":
					saveData.parentId = 'root';
					break;
				case "2":
					saveData.parentId = that.menu1Id;
					break;
				case "3":
					saveData.parentId = that.menu2Id;
					break;
			}
			if(that.ajaxType == "C") {
				saveData.displayOrder = AUIGrid.getGridData("grid" + id).length;
			}
			that.menuAjax("grid" + id, saveData);
		});
		
		$(document).on("click", "#up1Btn, #up2Btn, #up3Btn, #up5Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("up", "").replace("Btn", "");
			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
			if(index)
			var item = AUIGrid.getItemByRowIndex("grid" + id, index - 1);
			if(item == null) {
				return;
			}
			var allDisplayOrderFlag = false;
			if(AUIGrid.getCellValue("grid" + id, index, "displayOrder") == null) {
				allDisplayOrderFlag = true;
			}
			AUIGrid.setCellValue("grid" + id, index, "displayOrder", index - 1);
			AUIGrid.setCellValue("grid" + id, index - 1, "displayOrder", index);
			AUIGrid.moveRowsToUp("grid" + id);
			
			that.ajaxType = "U";
			if(id == 5) {
				if(allDisplayOrderFlag) {
					var gridData = AUIGrid.getGridData("grid" + id);
					for(var i = 0; i < gridData.length; i++) {
						var gridDataI = gridData[i];
						gridDataI.displayOrder = i;
						that.elementAjax("grid" + id, gridDataI, gridData.length);
					}
				} else {
					that.nowCount = 0;
					that.elementAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index - 1), 2);
					that.elementAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index), 2);
				}
			} else {
				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index - 1));
				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
			}
			
		});
		$(document).on("click", "#down1Btn, #down2Btn, #down3Btn, #down5Btn", function() {
			var id = $(this).attr("id");
			id = id.replace("down", "").replace("Btn", "");
			var index = AUIGrid.getSelectedIndex("grid" + id)[0];
			var item = AUIGrid.getItemByRowIndex("grid" + id, index + 1);
			if(item == null) {
				return;
			}
			var allDisplayOrderFlag = false;
			if(AUIGrid.getCellValue("grid" + id, index, "displayOrder") == null) {
				allDisplayOrderFlag = true;
			}
			AUIGrid.setCellValue("grid" + id, index, "displayOrder", index + 1);
			AUIGrid.setCellValue("grid" + id, index + 1, "displayOrder", index);
			AUIGrid.moveRowsToDown("grid" + id);
			that.ajaxType = "U";
			if(id == 5) {
				if(allDisplayOrderFlag) {
					var gridData = AUIGrid.getGridData("grid" + id);
					for(var i = 0; i < gridData.length; i++) {
						var gridDataI = gridData[i];
						gridDataI.displayOrder = i;
						that.elementAjax("grid" + id, gridDataI, gridData.length);
					}
				} else {
					that.nowCount = 0;
					that.elementAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index + 1), 2);
					that.elementAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index), 2);
				}
			} else {
				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index + 1));
				that.menuAjax("grid" + id, AUIGrid.getItemByRowIndex("grid" + id, index));
			}
		});
		
		$(document).on("click", "#grid5ModalPopSaveBtn", function() {
			var saveData = mCommon.gridFormGetParam("grid5");
			saveData.menuId = that.lastSelectMenuId;
			if(that.ajaxType == "C") {
				saveData.displayOrder = AUIGrid.getGridData("grid5").length;
			}
			that.elementAjax("grid5", saveData);
		});
	},
	nowCount: 0,
	menuAjax: function(id, saveData) {
		var that = this;
		saveData['locale'] = locale;
		mom_ajax(that.ajaxType, "admin.micaMenu", JSON.stringify(saveData), function(data) {
			if(data) {
				micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10692']});
				$("#" + id + "ModalPop").micaModal("hide");
				mCommon.render(id, "W201808241400075281000YyYStcPBAhq", {parentId : saveData.parentId, locale : locale});
			}
		});
	},
	elementAjax: function(id, saveData, count) {
		var that = this;
		mom_ajax(that.ajaxType, "admin.micaElement", JSON.stringify(saveData), function(data) {
			if(data) {
				that.nowCount++;
				if(count > 2 && that.nowCount == count) {
					mCommon.render(id, "W201808241655314001002S9JKjGqIsjy", {menuId : that.lastSelectMenuId});
				} else if(count == null) {
					micaCommon.messageBox({width:500, height:145, type:"primary", title : "Message", html : Language.lang['MESSAGES10692']});
					$("#" + id + "ModalPop").micaModal("hide");
					mCommon.render(id, "W201808241655314001002S9JKjGqIsjy", {menuId : that.lastSelectMenuId});
				}
			}
		});
	},
	menu1Id : null,
	menu2Id : null,
	menu3Id : null,
	lastSelectMenuId : null,
	ajaxType : null
};
$(document).ready(function(event){
	MOMJA091.init();
});

function menuJsonAjax() {
	var array = [];
	menuJsonSet(array, menuJson);
	MOMJA091.ajaxType = "LS";
	MOMJA091.menuAjax("grid1", array);
	return array;
}
var idObj = {};
var idSeq = 0;
function menuJsonSet(array, json, parentId) {
	parentId = parentId || "root";
	for(var i = 0; i < json.length; i++) {
		var jsonI = json[i];
		var id = idObj[jsonI.id] != null ? "menu" + (idSeq++) : jsonI.id;
		idObj[id] = id;
		var obj = {
			id : id,
			name : jsonI.name,
			url : jsonI.url,
			icon : jsonI.icon,
			useFlag : jsonI.hide ? "N" : "Y",
			displayOrder : i,
			parentId : parentId,
			param : jsonI.param
		}
		array.push(obj);
		if(jsonI.child != null && jsonI.child.length > 0) {
			menuJsonSet(array, jsonI.child, id);
		}
	}
	return array;
}

var menuJson = [{"id":"MAIN","name":"MAIN","url":"http://ux.thirautech.com:8100/Mbox/design/MOM-0411/publish/AbnormalControl","icon":"fa-home","child":[]},{"id":"master","name":"기준정보","icon":"fa-stack-overflow","child":[{"id":"1-1","name":"자원관리","child":[{"id":"MOMIA001","name":"공장관리","url":"master/MOMIA001"},{"id":"MOMIA002","name":"설비관리","url":"master/MOMIA002"},{"id":"MOMIA003","name":"업체관리","url":"master/MOMIA003"},{"id":"MOMIB003","name":"BOR","url":"master/MOMIB003"}]},{"id":"1-2","name":"품목관리","child":[{"id":"MOMIB001","name":"품목관리","url":"master/MOMIB001"},{"id":"MOMIB002","name":"BOM","url":"master/MOMIB002"},{"id":"MOMIB004","name":"고객사 모델매핑","url":"master/MOMIB004"},{"id":"MOMIB005","name":"검사기준정보","url":"master/MOMIB005"}]},{"id":"1-3","name":"근무시간관리","child":[{"id":"MOMIE001","name":"Shift 기준정보","url":"master/MOMIE001"},{"id":"MOMIE002","name":"Shift 스케줄 관리","url":"master/MOMIE002"}]},{"id":"1-4","name":"단가관리","child":[{"id":"MOMIC001","name":"자재단가관리","url":"master/MOMIC001","param":"inoutFlag=IN"},{"id":"MOMIC002","name":"영업단가관리","url":"master/MOMIC001","param":"inoutFlag=OUT"},{"id":"MOMIC003","name":"환율관리","url":"master/MOMIC003"}]},{"id":"1-5","name":"문서관리","child":[{"id":"MOMID001","name":"시방서","url":"master/MOMID001"}]},{"id":"1-6","name":"코드관리","child":[{"id":"MOMJA001","name":"코드관리","url":"admin/MOMJA001"}]}]},{"id":"plan","name":"수주/계획관리","icon":"fa-newspaper-o","child":[{"id":"2-1","name":"오더관리","child":[{"id":"MOMBA001","name":"영업마스터","url":"plan/MOMBA001"},{"id":"MOMBA002","name":"영업마스터업로드","url":"plan/MOMBA002"},{"id":"MOMBA003","name":"영업마스터업로드(PO)","url":"plan/MOMBA003"},{"id":"MOMBB001","name":"수요계획","url":"plan/MOMBB001"},{"id":"MOMBB002","name":"수요검증","url":"plan/MOMBB002"},{"id":"MOMBB003","name":"순수요계획","url":"plan/MOMBB003"}]},{"id":"2-2","name":"계획관리","child":[{"id":"MOMBD002","name":"생산계획","url":"plan/MOMBD002"},{"id":"MOMBD004","name":"외주계획","url":"plan/MOMBD004"},{"id":"MOMBD003","name":"자재소요계획","url":"plan/MOMBD003"},{"id":"MOMBD005","name":"설비가동율","url":"plan/MOMBD005"},{"id":"MOMBD007","name":"계획검증","url":"plan/MOMBD007"},{"id":"MOMBD006","name":"계획검증상세","url":"plan/MOMBD006","hide":true}]},{"id":"MOMBA004","name":"확정생산계획업로드","url":"plan/MOMBA004","hide":true}]},{"id":"PurchasingMG","name":"구매관리","icon":"fa-shopping-cart","child":[{"id":"Purchasing","name":"Purchasing","child":[{"id":"MOMCA001","name":"비정규 발주","url":"material/MOMCA001"},{"id":"MOMCA002","name":"정규 발주","url":"material/MOMCA002"},{"id":"MOMCA003","name":"발주현황","url":"material/MOMCA003"}]},{"id":"Supplier","name":"Supplier","child":[{"id":"MOMCB001","name":"출발처리","url":"material/MOMCB001","param":"menuCode=DEPT"},{"id":"MOMCB002","name":"출발처리현황","url":"material/MOMCB002","param":"menuCode=DEPT"},{"id":"MOMCC009","name":"입고대기","url":"material/MOMCB001","param":"menuCode=WGR"},{"id":"MOMCC010","name":"입고대기현황","url":"material/MOMCB002","param":"menuCode=WGR"}]},{"id":"MaterialLedger","name":"Material Ledger","child":[{"id":"MOMCC001","name":"자재입고","url":"material/MOMCC001"},{"id":"MOMCC002","name":"자재발주입고","url":"material/MOMCC002","hide":true},{"id":"MOMCC003","name":"자재입고현황","url":"material/MOMCC003"},{"id":"MOMCC004","name":"원자재불출","url":"material/MOMCC004"},{"id":"MOMCC005","name":"불출취소","url":"material/MOMCC005"},{"id":"MOMCC008","name":"예외입고","url":"material/MOMCC008"}]},{"id":"Material","name":"Material","child":[{"id":"MOMCD001","name":"자재불출요청","url":"material/MOMCD001"},{"id":"MOMCF001","name":"고객주문별자재재고현황","url":"salesorder/MOMFA007","param":"stockType=O004"},{"id":"MOMCD002","name":"공정품출고","url":"material/MOMCD002","hide":true},{"id":"MOMCD003","name":"합계출고","url":"material/MOMCD003","hide":true},{"id":"MOMCD004","name":"자재원단위조회","url":"material/MOMCD004","hide":true}]},{"id":"stock","name":"Stock","icon":"fa-cart-arrow-down","child":[{"id":"MOMCE001","name":"자재재고현황","url":"workorder/MOMDA006","param":"facilityType=MAT"},{"id":"MOMCE002","name":"재고보정","url":"material/MOMCE002"},{"id":"MOMCE003","name":"재고보정현황","url":"material/MOMCE003"},{"id":"MOMCE004","name":"재고입출고이력","url":"material/MOMCE004"},{"id":"MOMCE005","name":"재고이동","url":"material/MOMCE005","param":"stockType=MAT"},{"id":"MOMCE006","name":"재고이동취소","url":"material/MOMCE006","hide":true},{"id":"MOMCE007","name":"재고이동현황","url":"material/MOMCE007"},{"id":"MOMCE008","name":"입출고현황","url":"material/MOMCE008"}]}]},{"id":"workorder","name":"공정관리","icon":"fa-group","child":[{"id":"MOMDA001","name":"작업지시생성","url":"workorder/MOMDA001"},{"id":"MOMDA002","name":"작업지시현황","url":"workorder/MOMDA002"},{"id":"MOMDA003","name":"작업실적등록","url":"workorder/MOMDA003"},{"id":"MOMDA004","name":"작업지시서출력","url":"workorder/MOMDA004","hide":true},{"id":"MOMDA007","name":"작업실적현황","url":"workorder/MOMDA007"},{"id":"MOMDA005","name":"공정이동","url":"material/MOMCE005","param":"stockType=WO"},{"id":"MOMDA006","name":"공정재고현황","url":"workorder/MOMDA006","param":"facilityType=WO"}]},{"id":"Shipping","name":"출하관리","icon":"fa-truck","child":[{"id":"MOMFA025","name":"고객주문별재고현황","url":"salesorder/MOMFA007","param":"stockType=P002"},{"id":"MOMFA001","name":"제품출하내수","url":"salesorder/MOMFA001"},{"id":"MOMFA004","name":"출하현황","url":"salesorder/MOMFA004"},{"id":"MOMFA003","name":"매출마감","url":"salesorder/MOMFA003"},{"id":"MOMFA007","name":"완성품이동","url":"material/MOMCE005","param":"stockType=SO","hide":true},{"id":"MOMFA016","name":"예외출고","url":"salesorder/MOMFA016"},{"id":"MOMFA017","name":"예외출고취소","url":"salesorder/MOMFA017"},{"id":"MOMFA023","name":"매출마감현황","url":"salesorder/MOMFA023"},{"id":"MOMFA024","name":"주문현황","url":"salesorder/MOMFA024"},{"id":"MOMFA011","name":"출하처리(BARCODE)","url":"salesorder/MOMFA011"},{"id":"B2BI","name":"B2BI","child":[{"id":"MOMFB001","name":"생산계획","url":"salesorder/MOMFB001"},{"id":"MOMFB002","name":"PO정보","url":"salesorder/MOMFB002"},{"id":"MOMFB003","name":"출발처리","url":"salesorder/MOMFB003"},{"id":"MOMFB004","name":"입고정보","url":"salesorder/MOMFB004"},{"id":"MOMFB005","name":"B2BI검증","url":"salesorder/MOMFB005"}]},{"id":"MOMFC002","name":"제품재고현황","url":"workorder/MOMDA006","param":"facilityType=SO","hide":true}]},{"id":"qa","name":"품질관리","icon":"fa-barcode","child":[{"id":"MOMEA003","name":"수입검사","url":"qa/MOMEA003"},{"id":"MOMEA004","name":"수입검사현황","url":"qa/MOMEA004"},{"id":"MOMEA005","name":"공정검사","url":"qa/MOMEA005"},{"id":"MOMEA006","name":"공정검사현황","url":"qa/MOMEA006"},{"id":"MOMEA007","name":"출하검사","url":"qa/MOMEA007","hide":true},{"id":"MOMEA008","name":"출하검사현황","url":"qa/MOMEA008","hide":true}]},{"id":"WO","name":"WO추적관리","icon":"fa-list-alt","child":[{"id":"MOMGA001","name":"생산추적조회","url":"lot/MOMGA001"},{"id":"MOMGA002","name":"출하추적조회","url":"lot/MOMGA002"}]},{"id":"close","name":"마감관리","icon":"fa-clock-o","child":[{"id":"MOMHA001","name":"거래처별월마감","url":"close/MOMHA001"},{"id":"MOMHA002","name":"거래처별마감취소","url":"close/MOMHA002"},{"id":"MOMHA003","name":"월매입매출마감","url":"close/MOMHA003"},{"id":"MOMHA004","name":"월수불부확정","url":"close/MOMHA004"}]},{"id":"common","name":"공통관리","icon":"fa-cart-arrow-down","child":[{"id":"MOMZA002","name":"재고현황","url":"workorder/MOMDA006"}],"hide":true}]