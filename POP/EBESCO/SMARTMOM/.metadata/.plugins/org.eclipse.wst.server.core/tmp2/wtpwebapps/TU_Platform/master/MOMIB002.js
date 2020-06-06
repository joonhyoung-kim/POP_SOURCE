var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var locationParam = mCommon.getSearchParam();
var gvThat;
var orgChildItem;
var btnDspFlag;

if(locationParam.bomType == 'E') { 
	$.ajax({
		type : 'GET',
		url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
		timeout : 30000000,
		async : false,
		data : {codeClassId : 'BOM_UPLOAD_OPTION', codeId : 'CREATE_ITEM_FLAG'},
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			if(data.length > 0) {
				btnDspFlag = data[0].value;
				if(btnDspFlag == 'N') {
					$("#uploadBtn").css('display','none');
				}
			}
		},
		error : function(error){
			errors = error;
		},
		fail : function(){
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
		}
	});
} else {
	$.ajax({
		type : 'GET',
		url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
		timeout : 30000000,
		async : false,
		data : {codeClassId : 'BOM_UPLOAD_OPTION', codeId : 'IF_UPLOAD_FLAG'},
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			if(data.length > 0) {
				btnDspFlag = data[0].value;
				if(btnDspFlag == 'N') {
					$("#uploadBtn").css('display','none');
				}
			}
		},
		error : function(error){
			errors = error;
		},
		fail : function(){
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
		}
	});
}

var MOMIB002 = {
	init: function() {		
		var that = this;
		gvThat = this;
		$("#inDate").val(get_current_date('YYYY-MM-DD'));
		that.event();
		that.fileInpuSet();
		if(locationParam.bomType != 'E') {
			Language.init(function() {
				mCommon.init("grid", "W201807042047200251000wfEWKiSD2Bq", null, function() {
					that.grid();
					mCommon.gridPopCreat("grid", {colCount: 2, title: "BOM"});
					that.comboBox();
					mCommon.init("popgrid", "W2019071020472406510r0ydHDjiSd3aQd", null, function() {});
				}, Language);
			});
		} else {
			Language.init(function() {
				mCommon.init("grid", "W201904291450200251000gfEAJaHg3Ya", null, function() {
					that.grid();
					mCommon.gridPopCreat("grid", {colCount: 2, title: "EBOM"});
					that.comboBox();
				}, Language);
			});
		}
			
			that.design();
			
			// 라벨 색상 변경
			$("#itemId2Label, #highItemIdLabel, #qtyLabel, #rnpFlagLabel, #mrpFlagLabel, #startTimeLabel, #useYnLabel").find(".circle").addClass("bg-orange");
			$("#itemId2Label, #highItemIdLabel, #qtyLabel, #rnpFlagLabel, #mrpFlagLabel, #startTimeLabel, #useYnLabel").find(".textblock").addClass("orange");
	}, 
	grid: function() {
		tuCommon.editColumnSet("grid");
		
//		AUIGrid.setColumnPropByDataField("grid", "qty", {
//			dataType : "numeric",
//			formatString : "#,##0.00000####"});
		
		var labelFunction = function(rowIndex, columnIndex, value, headerText, item, dataField) {
			return value == null ? value : value.replace(/ /gi, "&nbsp;");
		}
		
		var colLayout = AUIGrid.getColumnLayout("grid");
		var colIndex = AUIGrid.getColumnIndexByDataField("grid", "itemId2");
		if(colIndex != -1) {
			var col = colLayout[colIndex];
			col.labelFunction = labelFunction;
			col.renderer = {type: "TemplateRenderer"};
			AUIGrid.setColumnProp( "grid", colIndex, col );
		}
		colIndex = AUIGrid.getColumnIndexByDataField("grid", "itemName2");
		if(colIndex != -1) {
			col = colLayout[colIndex];
			col.labelFunction = labelFunction;
			col.renderer = {type: "TemplateRenderer"};
			AUIGrid.setColumnProp( "grid", colIndex, col );
		}
		
		// renderer를 수정하면 그리드를 지웠다가 다시 생성 해줘야한다.
		AUIGrid.destroy("grid");
		AUIGrid.create("grid", colLayout, mCommon.datasets.grid.setting.gridProps);
		AUIGrid.setGridData("grid", []);
		
		tuCommon.cellClick('grid');
	}, 
	event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			var param = mCommon.formGetParam("#form");
			if(param.itemId == '*') {
				param.itemId = 'ALL';
			}
			if($("#itemId").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10134+MESSAGES11589')});
			} else {
				if(locationParam.bomType != 'E') {
					mCommon.render("grid", "W201807042047200251000wfEWKiSD2Bq", param, function(dataSet){
						var data = dataSet;
						if(data.length > 0) {
							for(var i=0; i<data.length; i++) {
								AUIGrid.setProp("grid", "rowStyleFunction", function(rowIndex, data) {
									if(data.isCycle > 0) {
										return "redStyle";
									} else {
										return null;
									}
								});
							}
						}
						AUIGrid.setGridData("grid", data);
					});
				} else {
					mCommon.render("grid", "W201904291450200251000gfEAJaHg3Ya", param, function(dataSet){
						var data = dataSet;
						if(data.length > 0) {
							for(var i=0; i<data.length; i++) {
								AUIGrid.setProp("grid", "rowStyleFunction", function(rowIndex, data) {
									if(data.isCycle > 0) {
										return "redStyle";
									} else {
										return null;
									}
								});
							}
						}
						AUIGrid.setGridData("grid", data);
					});
				}
				
			}
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setBomPop();
			var selectedItems = AUIGrid.getSelectedItems("grid");
			if(selectedItems.length > 0) {
				$("#highItemIdModal").val(selectedItems[0].item.childItemId);
			}
			$("#endTimeModal").val("4712-12-31");
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#itemId2Modal, #highItemIdModal, #useYnModal, #rnpFlagModal, #mrpFlagModal, #isPhantomModal").jqxComboBox({disabled: false});
			$("#qtyModal, #startTimeModal, #endTimeModal, #descriptionModal").attr("readonly",false);
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						var paramList = [];
						for(var i = 0; i < checkedItems.length; i++){							
							var param = { parentItemId : checkedItems[i].item.parentItemId,
										  childItemId : checkedItems[i].item.childItemId }
							paramList.push(param);
						}
						
						if(locationParam.bomType != 'E') {
							mom_ajax("LD","reference.itemInfo.bom.bom", JSON.stringify(paramList), that.listCallbackPost);
						} else {
							mom_ajax("LD","reference.itemInfo.ebom.ebom", JSON.stringify(paramList), that.listCallbackPost);
						}
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}			
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#gridModalPopCancelBtn, .bntpopclose, #modalCloseBtn", function() {
			$("#gridModalPop").micaModal("hide");
			$("#pop").micaModal("hide");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			if(locationParam.bomType != 'E') {
				mCommon.auiGridExcelExport("grid", {fileName: "BOM_MOMIB002_" + get_current_date("yyyy-mm-dd")});
			} else {
				mCommon.auiGridExcelExport("grid", {fileName: "EBOM_MOMIB007_" + get_current_date("yyyy-mm-dd")});
			}
			
		});
		// 엑셀 다운 버튼
		$(document).on("click", "#modalExcelDownBtn", function() {
			mCommon.auiGridExcelExport("popgrid", {fileName: "BOM_MOMIB002_Interface_No_Item" + get_current_date("yyyy-mm-dd")});
		});
		

		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			if(locationParam.bomType != 'E') {
				mCommon.auiGridExcelExport("grid", {fileName: "BOM_MOMIB002_test"}, "templete");
			} else {
				mCommon.auiGridExcelExport("grid", {fileName: "EBOM_MOMIB007_test"}, "templete");
			}
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#itemId2Modal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				$("#itemId2Modal").focus();
				return;
			}
			if($("#highItemIdModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10603']});
				$("#highItemIdModal").focus();
				return;
			}
			if($("#qtyModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10709']});
				$("#qtyModal").focus();
				return;
			}
			if($("#mrpFlagModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10705']});
				$("#mrpFlagModal").focus();
				return;
			}
			if($("#rnpFlagModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11088']});
				$("#rnpFlagModal").focus();
				return;
			}
			if($("#startTimeModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11200']});
				$("#startTimeModal").focus();
				return;
			}
			if($("#useYnModal").val() ==""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				$("#useYnModal").focus();
				return;
			}
			if($("#highItemIdModal").val() == $("#itemId2Modal").val()){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10602']});
				$("#highItemIdModal").focus();
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getBomPop();
					$("#gridModalPop").micaModal("hide");
					if(locationParam.bomType != 'E') {
						if(type != "LC") {
							mom_ajax(type, "reference.itemInfo.bom.bom", JSON.stringify(param), that.listCallbackPost, true);
						} else if (type == "LC") {
							param.changeItemId = $("#itemId2Modal").val();
							param.childItemId = orgChildItem;
							mom_ajax("C", "reference.itemInfo.bom.bomLinkCopy", JSON.stringify(param), that.listCallbackPost, true);
						}
					} else {
						if(type != "LC") {
							mom_ajax(type, "reference.itemInfo.ebom.ebom", JSON.stringify(param), that.listCallbackPost, true);
						} else if (type == "LC") {
							param.changeItemId = $("#itemId2Modal").val();
							param.childItemId = orgChildItem;
							mom_ajax("C", "reference.itemInfo.ebom.ebomLinkCopy", JSON.stringify(param), that.listCallbackPost, true);
						}
					}
				}
			}});
			
		});
		
		// BOM 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			// BOM 모달창을 연다.
			$("#gridModalPop").micaModal("show");
			
			// BOM 팝업의 값들을 세팅해준다.
			that.setBomPop(selectItems[0].item);
			
			// BOM 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post
			$("#gridModalPopSaveBtn").attr("type", "C");

			// 복사이고 생성하기 때문에 아이템이 입력가능하게 바꾼다.
			$("#itemId2Modal, #highItemIdModal, #useYnModal, #rnpFlagModal, #mrpFlagModal, #isPhantomModal").jqxComboBox({disabled: false});
			$("#qtyModal, #startTimeModal, #endTimeModal, #descriptionModal").attr("readonly", false);
		});
		
		// BOM 구조복사 모달 열기 버튼
		$(document).on("click", "#linkCopyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length == 1) {
				orgChildItem = selectItems[0].item.childItemId;
			}
			if(selectItems.length < 1 || selectItems.length > 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES11736'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			$("#gridModalPop").micaModal("show");
			that.setBomPop(selectItems[0].item);
			$("#gridModalPopSaveBtn").attr("type", "LC");
			$("#itemId2Modal").jqxComboBox({disabled: false});
			$("#highItemIdModal, #useYnModal, #rnpFlagModal, #mrpFlagModal, #isPhantomModal").jqxComboBox({disabled: true});
			$("#qtyModal, #startTimeModal, #endTimeModal, #descriptionModal").attr("readonly","readonly");
		});
		
		//그리드 edit버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			// Bom 모달창을 연다.
			mCommon.gridPopAdd("grid");
			// Item 팝업의 값들을 세팅해준다.
			that.setBomPop(item);
			// Item 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#gridModalPopSaveBtn").attr("type", "U");
			// 수정이기 때문에 itemId,수정자,수정시간이 입력불가능하게 바꾼다.
			$("#itemId2Modal, #highItemIdModal").jqxComboBox({disabled: true});
			$("#useYnModal, #rnpFlagModal, #mrpFlagModal, #isPhantomModal").jqxComboBox({disabled: false});
			$("#qtyModal, #startTimeModal, #endTimeModal, #descriptionModal").attr("readonly",false);
			
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.excelUpload();
		});
		
		// 현행화 버튼
		$(document).on("click", "#uploadBtn", function() {
			if(locationParam.bomType == 'E') {
					var param = {
						divisionCd : divisionCd
					}
					micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES12075'], closeButton:{text:"Close"}, okButton:{text:"OK", 
						after:function() {
							mom_ajax("C", "reference.itemInfo.ebom.ebomCheckItems", JSON.stringify(param), that.listCallbackPost);
						}
					}});
				
			} else {
				var popFlag = 'N';
//				micaCommon.splash.show();
				$.ajax({
					type : 'GET',
					url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.itemInfo.bom.bomIf.dummy',
					timeout : 30000000,
					async : false,
					data : {},
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data[0].count != 0) {
							popFlag = 'Y';
						} else {
							popFlag = 'N';
						}
					},
					error : function(error){
						errors = error;
					},
					fail : function(){
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES12075'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function() {
						micaCommon.splash.show();
						mom_ajax("C", "reference.itemInfo.bom.bomAct", JSON.stringify({}), that.listCallbackPost, popFlag);
					}
				}});
			}
		});
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemId'), $('#findBtn'));
	},	
	comboBox: function(){
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "DEPLOYMENT_TYPE"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#inDeployment",{selectedIndex:0,searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			}
		);

		//사용유무, 팝업-자동차감,소요계획		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "USE_FLAG"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#useYn",{searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, {local: data, textName : "name", valueName : "code", readonly: false});
				micaCommon.comboBox.set("#useYnModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				micaCommon.comboBox.set("#mrpFlagModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				micaCommon.comboBox.set("#rnpFlagModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			}
		);
		
		//팬텀여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "N_Y"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#isPhantomModal",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
			}
		);
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		
		//품목
		var optItem = {textName : "text", valueName : "id"};
		optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.itemInfo.bom.item.dummy"; // 검색 URL
		optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItem.minLength = 4; // 최소 검색 수
		optItem.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemId2Modal", comboOptions, optItem);
		
		//상위품목
		var optParentItem = {textName : "text", valueName : "id"};
		optParentItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.itemInfo.bom.parentItem.dummy"; // 검색 URL
		optParentItem.keyName = "key"; // 서버로 검색 조건 키 이름값
		optParentItem.minLength = 4; // 최소 검색 수
		optParentItem.param = {divisionCd: divisionCd, itemType: "'FP', 'SP'"}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#highItemIdModal", comboOptions, optParentItem);	
		
	},
	setBomPop: function(data) { 
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		
		$("#itemId2Modal").val(data.childItemId || "");
		$("#highItemIdModal").val(data.parentItemId || "");
		$("#qtyModal").val(data.qty || "");
		$("#mrpFlagModal").val(data.mrpFlag || "Y");
		$("#rnpFlagModal").val(data.rnpFlag || "Y");
		$("#startTimeModal").val(data.startTime || "");
		$("#endTimeModal").val(data.endTime || "");
		$("#isPhantomModal").val(data.isPhantom || "N");
		$("#updateUserNameModal").val(data.updateBy || userId);
		$("#updateDateModal").val(data.updateDate || curr_date);
		$("#useYnModal").val(data.useYn || "Y");
		$("#descriptionModal").val(data.description || "");
		$("#bomSeqModal").val(data.bomSeq || "");
		
		$("#updateDateModal, #updateUserNameModal").attr("readonly","readonly");
	},
	getBomPop: function() {
		var result ={
				childItemId : $("#itemId2Modal").val(),
				parentItemId : $("#highItemIdModal").val(),
				qty : $("#qtyModal").val(),
				mrpFlag : $("#mrpFlagModal").val(),
				rnpFlag : $("#rnpFlagModal").val(),
				startTime : $("#startTimeModal").val(),
				endTime : $("#endTimeModal").val(),
				isPhantom : $("#isPhantomModal").val(),
				useYn : $("#useYnModal").val(),
				description : $("#descriptionModal").val(),
				bomSeq : $("#bomSeqModal").val(),
				createBy : userId,
				updateBy : userId
		}
		return result;
	},
	gridRender: function(param) {
		if(locationParam.bomType != 'E') {
			mCommon.render("grid", "W201807042047200251000wfEWKiSD2Bq", param, function() {});
		} else {
			mCommon.render("grid", "W201904291450200251000gfEAJaHg3Ya", param, function() {});
		}
		
	},
	listCallbackPost : function(result, data, param, callbackParam){
		var that = this.MOMIB002;
		var type = $(this).attr("type");
		if(result == 'SUCCESS'){
			if(callbackParam == true || callbackParam == undefined) {
				if($("#itemId").val() == null || $("#itemId").val() == '') {
					var getBomPop  = that.getBomPop();
					var itemId = getBomPop.childItemId;
					$("#itemId").val(itemId);
				}
				var params = mCommon.formGetParam("#form");
				that.gridRender(params);
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			} else {
				if (callbackParam == 'N') {
					if($("#itemId").val() == null || $("#itemId").val() == '') {
						var getBomPop  = that.getBomPop();
						var itemId = getBomPop.childItemId;
						$("#itemId").val(itemId);
					}
					var params = mCommon.formGetParam("#form");
					that.gridRender(params);
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				} else if (callbackParam == 'Y') {
					var params = {menuId: 'MOMIB002', progId: 'P_CREATE_BOM_IF'};
					mCommon.render("popgrid", "W2019071020472406510r0ydHDjiSd3aQd", params, function() {});
					$("#pop").micaModal("show");
					$(window).resize(); //그리드 사이즈 재조정
				}
			}
			micaCommon.splash.hide();
		}else{
			if(type == "LC") {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: p_err_msg});
			} else {
				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
		            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
		         } else {
		            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
		         }
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
 		
 		/*excel_upload(file, 'reference.itemInfo.bom.bom', 'MOMIB002', JSON.stringify(param));*/
		if(locationParam.bomType != 'E') {
			excel_upload(file, 'reference.itemInfo.bom.bom', 'MOMIB002', 'grid', JSON.stringify(param), gvThat.excelCallbackPost);
		} else {
			excel_upload(file, 'reference.itemInfo.ebom.ebom', 'MOMIB007', 'grid', JSON.stringify(param), gvThat.excelCallbackPost);
		}
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	},
	excelCallbackPost : function(result, data){
		var that = this.MOMIB002;
		if(result == "SUCCESS"){
			if($("#itemId").val() != null && $("#itemId").val() != '') {
				var params = mCommon.formGetParam("#form");
				that.gridRender(params);
			}
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	design : function() {
		$("head").append('<style>.redStyle{ background: #FF0000;}</style>');
	}
};
$(document).ready(function(event){
	MOMIB002.init();
});
