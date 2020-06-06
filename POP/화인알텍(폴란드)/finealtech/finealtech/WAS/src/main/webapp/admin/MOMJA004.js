var orgCd = '';
var MOMJA004 = {
	init: function() {
		var that = this;
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201812191039584571000IUgVOze0Pwm", null, function(){
				that.grid("grid1");
				mCommon.gridPopCreat("grid1", {colCount: 1, title : "Organization"});
				that.comboBox();
				mCommon.init("grid2", "W201812191107337331001m2ZfAgQBdyN", null, function(){
					that.grid("grid2");
					mCommon.gridPopCreat("grid2", {colCount: 1, title : "Schedule Group"});
					that.comboBox();
					$("#organizationCodeLabel").css({"width": "120px"});
					$("#scheduleGroupCdLabel, #scheduleGroupNameLabel").css({"width": "150px"});
				}, Language);
			}, Language);
		});
	}, grid: function(grid) {
		tuCommon.editColumnSet(grid);
		tuCommon.cellClick(grid);
		if(grid == 'grid1') {
			mCommon.render(grid, "W201812191039584571000IUgVOze0Pwm", {}, function() {
				AUIGrid.setSelectionByIndex(grid, 0);
				var items = AUIGrid.getSelectedItems(grid); 
				if(items.length > 0) {
					mCommon.render("grid2", "W201812191107337331001m2ZfAgQBdyN", {organizationCode : items[0].item.organizationCode}, function() {});
				}
			});
			// 그리드 클릭 이벤트 설정			
			AUIGrid.bind(grid, "cellClick", function(e) {
				var rowId = e.item[AUIGrid.getProp(e.pid, "rowIdField")];
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}				
				orgCd = e.item.organizationCode;
				mCommon.render("grid2", "W201812191107337331001m2ZfAgQBdyN", {organizationCode : orgCd}, function() {});
			});
		} else if(grid == 'grid2') {
			
		}
	}, event: function() {
		var that = this;
		$("#mCreateBtn").click(function() {
			$("#grid1ModalPop #useYnModal").val("Y");
			mCommon.gridPopAdd("grid1");
			$("#grid1ModalPopSaveBtn").attr("type", "C");
			$("#organizationCodeModal").attr("readonly", null);
		});
		$(document).on("click", ".grid1EditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid1", rowIndex);
			mCommon.gridPopAdd("grid1");
			that.setOrgPop(item);
			$("#grid1ModalPopSaveBtn").attr("type", "U");
			$("#organizationCodeModal").attr("readonly", "readonly");
		});
		
		//Organization 저장
		$(document).on("click", "#grid1ModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK",    
				after : function(){
					var param = that.getOrgPop();
					mom_ajax(type, "admin.b2biOrgSetup.b2biOrgSetupLeft", JSON.stringify(param), that.callbackPost, "grid1", true);
					if(type == 'U' && param.useYn == 'N') {
						mom_ajax(type, "admin.b2biOrgSetup.b2biOrgSetupRightUpdate", JSON.stringify(param));
					}
					
				}
			}});
		});
		
		// Organization 복사 모달 열기 버튼
		$(document).on("click", "#mCopyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid1");
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];  
				else message = Language.lang['MESSAGES10491'];  
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopAdd("grid1");
			
			that.setOrgPop(selectItems[0].item);
			
			$("#grid1ModalPopSaveBtn").attr("type", "C");

			$("#organizationCodeModal").attr("readonly", null);
		});
		
		// Organization 삭제 버튼
		$(document).on("click", "#mDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid1");
			var chkFlag = false;
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10054'], closeButton : {text : "Close"}, okButton : {text : "OK",    
					after : function(){
						var param;
						
						for(var i = 0; i < selectItems.length; i++) {
							param =  {  organizationCode : selectItems[i].item.organizationCode }
							if (i == selectItems.length-1){
								chkFlag = true;
							}
							mom_ajax("D", "admin.b2biOrgSetup.b2biOrgSetupLeft", JSON.stringify(param), that.callbackPost, "delOrganization", chkFlag);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});  
				return;
			}
		});
		
		//Schedule Group 등록
		$("#dCreateBtn").click(function() {
			$("#grid2ModalPop #useYnModal").val("Y");
			mCommon.gridPopAdd("grid2");
			var selectItems = AUIGrid.getSelectedItems("grid1");
			if(selectItems.length < 1) { 
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10055']});  
				return; 
			}
			$("#grid2ModalPopSaveBtn").attr("type", "C");
			$("#scheduleGroupCdModal").attr("readonly", null);
		});
		
		//Schedule Group 수정 
		$(document).on("click", ".grid2EditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid2", rowIndex);
			mCommon.gridPopAdd("grid2");
			that.setSchedulePop(item);
			$("#grid2ModalPopSaveBtn").attr("type", "U");
			$("#scheduleGroupCdModal").attr("readonly", "readonly");
		});
		
		// Schedule Group 복사 모달 열기 버튼
		$(document).on("click", "#dCopyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid2");
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];  
				else message = Language.lang['MESSAGES10491'];  
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopAdd("grid2");
			
			that.setSchedulePop(selectItems[0].item);
			
			$("#grid2ModalPopSaveBtn").attr("type", "C");
			$("#scheduleGroupCdModal").attr("readonly", null);

		});
		
		// Schedule Group 삭제 버튼
		$(document).on("click", "#dDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid2");
			var chkFlag = false;
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10579'], closeButton : {text : "Close"}, okButton : {text : "OK",   
					after : function(){
						var param;
						
						for(var i = 0; i < selectItems.length; i++) {
							param =  {  organizationCode : selectItems[i].item.organizationCode, 
									scheduleGroupCd : selectItems[i].item.scheduleGroupCd}
							if (i == selectItems.length-1){
								chkFlag = true;
							}
							mom_ajax("D", "admin.b2biOrgSetup.b2biOrgSetupRight", JSON.stringify(param), that.callbackPost, "grid2", chkFlag);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});  
				return;
			}
		});
		
		//Schedule Group 저장
		$(document).on("click", "#grid2ModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if(AUIGrid.getSelectedItems("grid1")[0].item.useYn == 'N' && $("#grid2ModalPop #useYnModal").val() == 'Y') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10426']});  
				return;
			}
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK",   
				after : function(){
					var param = that.getSchedulePop();
					param.organizationCode = AUIGrid.getSelectedItems("grid1")[0].item.organizationCode;
					mom_ajax(type, "admin.b2biOrgSetup.b2biOrgSetupRight", JSON.stringify(param), that.callbackPost, "grid2", true);
				}
			}});
		});
		
	}, comboBox : function() {
		var comboOptions = {searchMode : 'containsignorecase', autoComplete : true};
		var options = {local : "", textName : "name", valueName : "code", readonly : false};
	
		//업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorCdModal",comboOptions, options);
				}
		);
		
		//사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "USE_FLAG"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#grid1ModalPop #useYnModal",comboOptions, options);
					micaCommon.comboBox.set("#grid2ModalPop #useYnModal",comboOptions, options);
				}
		);
		
	}, setOrgPop : function(data) {
		data = data || {};
		$("#organizationCodeModal").val(data.organizationCode || "");
		$("#vendorCdModal").val(data.vendorCd || "");
		$("#grid1ModalPop #useYnModal").val(data.useYn || "Y");
		
		$("#organizationCodeModal").attr("readonly","readonly");
	}, setSchedulePop : function(data) {
		data = data || {};
		$("#scheduleGroupCdModal").val(data.scheduleGroupCd || "");
		$("#scheduleGroupNameModal").val(data.scheduleGroupName || "");
		$("#grid2ModalPop #useYnModal").val(data.useYn || "Y");
	}, getOrgPop : function() {
		var result = {
			organizationCode : $("#organizationCodeModal").val(),
			vendorCd : $("#vendorCdModal").val(),
			useYn : $("#grid1ModalPop #useYnModal").val()
		}
		return result;
	}, getSchedulePop : function() {
		var result = {
			scheduleGroupCd : $("#scheduleGroupCdModal").val(),
			scheduleGroupName : $("#scheduleGroupNameModal").val(),
			useYn : $("#grid2ModalPop #useYnModal").val()
		}
		return result;
	}, callbackPost : function(param, data, callbackParam, flag) {
		if(param == 'SUCCESS') {
			var that = this; 
			if(flag == true){
				if(callbackParam == 'delOrganization') {
					var selectItems = AUIGrid.getCheckedRowItems("grid1");
					var chkFlag = false;
					
					for(var i = 0; i < selectItems.length; i++) {
						
						var param = {organizationCode : selectItems[i].item.organizationCode}
						
						if (i == selectItems.length-1) {
							chkFlag = true;
						}
						
						mom_ajax("D", "admin.b2biOrgSetup.b2biOrgSetupRight", JSON.stringify(param), that.callbackPost, "grid2", chkFlag);
					}
					
					mCommon.render("grid1", "W201812191039584571000IUgVOze0Pwm", null, function() {
						AUIGrid.setSelectionByIndex("grid1", 0);							
						var items = AUIGrid.getSelectedItems("grid1"); 
						if(items.length > 0) {
							mCommon.render("grid2", "W201812191107337331001m2ZfAgQBdyN", {organizationCode : items[0].item.organizationCode}, function() {
								micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});  
								$("#grid1ModalPop").micaModal("hide");
							});
						}
					});
				} else if(callbackParam == 'grid1') {
					mCommon.render("grid1", "W201812191039584571000IUgVOze0Pwm", null, function() {							
						var organizationCode = data.organizationCode;
							var row = AUIGrid.getRowIndexesByValue("grid1", "organizationCode", organizationCode);
							AUIGrid.setSelectionByIndex("grid1", row[0]);
							
							var items = AUIGrid.getSelectedItems("grid1"); 
							if(items.length > 0) {
								mCommon.render("grid2", "W201812191107337331001m2ZfAgQBdyN", {organizationCode : items[0].item.organizationCode}, function(){});
								micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});  
								$("#grid1ModalPop").micaModal("hide");
							}
						});
				} else if(callbackParam == 'grid2') {
					mCommon.render("grid2", "W201812191107337331001m2ZfAgQBdyN", {organizationCode : AUIGrid.getSelectedItems("grid1")[0].item.organizationCode}, function(){});
					micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});  
					$("#grid2ModalPop").micaModal("hide");
				}
			}
		} else {
			micaCommon.messageBox({type : "danger", width : "400", height : "145", html : Language.lang['MESSAGES10821']});  
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMJA004.init();
});