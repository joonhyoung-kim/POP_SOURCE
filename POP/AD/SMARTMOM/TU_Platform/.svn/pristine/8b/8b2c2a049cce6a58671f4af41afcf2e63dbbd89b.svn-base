var userId = sessionStorage.getItem("userId");
var cudFlag;
var codeClassId;
var codeSeq;
var addDate;

var MOMJA006 = {
	init: function() {		
		var that = this;
		var title;
		$("#label-id").text(title);
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W2019050214585496910008f5dk6b1v0E", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: title});
				that.comboBox();
			}, Language);
		});
	}, grid: function() {	
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');	
		
	}, event: function() {
		var that = this;
	
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			var param =  mCommon.formGetParam("#form");
			mCommon.render("grid", "W2019050214585496910008f5dk6b1v0E", param, function(){});
		});

		// Edit 버튼
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			that.setCalOffClassPop(item);
			cudFlag = "U";
			$("#pop").micaModal("show");
			$("#pCalOffClassId, #pUpdateBy, #pUpdateDate").attr("readonly", "readonly");
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			that.setCalOffClassPop();
			that.checkCalOffClassCode();
			cudFlag = "C";
			$("#pop").micaModal("show");
			$("#pCalOffClassId, #pUpdateBy, #pUpdateDate").attr("readonly", "readonly");
		});
		
		//삭제 버튼
		$(document).on('click', '#delBtn', function() {
	    	var checkedItems = AUIGrid.getCheckedRowItems('grid');
	    	var callbackChk = false;
	    	cudFlag = "D";
	    	var calOffClassIds = [];
	    	var checkFlag;
	    	
	    	for(var i=0; i<checkedItems.length; i++) {
	    		if(i + 1 < checkedItems.length) {
	    			calOffClassIds += "'" + checkedItems[i].item.calOffClassId + "',";
	    		} else {
	    			calOffClassIds += "'" + checkedItems[i].item.calOffClassId + "'";
	    		}
	    	}
	    	
	    	// 이미 등록한 비가동 유형이 있는지 체크 후 있으면 삭제 못하도록 처리
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.calOffClass.checkShiftCodeDetail.dummy",
				type : "GET",
				async: false,
				timeout 	: 30000000,
				data 		: {calOffClassIds : calOffClassIds},
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						if(data[0].rowCount > 0) {
							checkFlag = false;
						}
					} else {
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
						return;
					}
				},
				error: function(data){},
				fail : function(data){}
			});
	    	
	        if(checkedItems.length > 0 && checkFlag != false) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11703'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i=0; i<checkedItems.length; i++) {
			        		var param = {
								calOffClassId : checkedItems[i].item.calOffClassId
							}
			        		
			        		if(i == checkedItems.length - 1) {
								callbackChk = true;
							}
			        		
			        		mom_ajax('D', 'reference.workinghours.calOffClass.calOffClass', JSON.stringify(param), that.delCallback, checkedItems, callbackChk);
			        	}
						
					}
				}});				
			} else if(checkedItems.length > 0 && checkFlag == false) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11837']});
				return;
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}	
		});

		// 팝업 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			var startTime = $("#pStartTime").val();
			var endTime = $("#pEndTime").val();
			
			if($("#pCalOffClassId").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11704']});
				return;
			}
			
			if($("#pCalOffClassName").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11705']});
				return;
			}
			
			if($("#pStartTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10788']});
				return;
			}
			
			if($("#pEndTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11236']});
				return;
			}
			
			if($("#pUseYn").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11685']});
				return;
			}
			
			if(startTime.substr(0,2) > 23 || startTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11687']});
				return;
			}
						
			if(endTime.substr(0,2) > 23 || endTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11689']});
				return;
			}
			
			if(startTime > endTime) {
				addDate = 1;
			} else {
				addDate = 0;
			}
		
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					var param = that.getCalOffClassPop();
					mom_ajax(cudFlag, "reference.workinghours.calOffClass.calOffClass", JSON.stringify(param[0]), that.listCallbackPost, param);
					$(".modal").micaModal("hide");
				}
			}});
		});
		
		//복사 버튼
		$(document).on("click", "#copyBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "C";
				that.setCalOffClassPop(checkedItems[0].item);
				that.checkCalOffClassCode();
			}
			$("#pop").micaModal("show");
			$("#pCalOffClassId, #pUpdateBy, #pUpdateDate").attr("readonly", "readonly");
		});
		
		//팝업 닫기 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#offClassId'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true, selectedIndex:0};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 사용여부
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', {codeClassId : "USE_FLAG"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#pUseYn", comboOptions, options);
		});
		
		$("#pStartTime").mask("9999");
		$("#pEndTime").mask("9999");
		
	},
	checkCalOffClassCode : function() {
		// SHIFT 코드 조회하여 팝업 항목에 값 세팅
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.calOffClass.calOffClassId.dummy",
			type : "GET",
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					if(data[0] == null) {
						codeClassId = "SN0001";
					} else {
						codeSeq = data[0].codeSeq;
						if(codeSeq > 0 && codeSeq < 9) {
							codeSeq = "000" + (codeSeq + 1);
						} else if(codeSeq >= 9) {
							codeSeq = "00" + (codeSeq + 1);
						} else if(codeSeq >= 99) {
							codeSeq = "0" + (codeSeq + 1);
						} else if(codeSeq >= 999) {
							codeSeq = codeSeq + 1;
						}
						codeClassId = "SN" + codeSeq;
					}
					$("#pCalOffClassId").val(codeClassId);
					
				} else {
					codeClassId = "SN0001";
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	setCalOffClassPop: function(data) {
		data = data || {};
		$("#pCalOffClassId").val(data.offCd || "");
		$("#pCalOffClassName").val(data.offName || ""); 
		$("#pStartTime").val(data.startTime || "");
		$("#pEndTime").val(data.endTime || "");
		$("#pUseYn").val(data.useYn || "Y");
		$("#pUiSequence").val(data.uiSequence || "");
		$("#pUpdateBy").val(data.updateBy || userId);
		$("#pUpdateDate").val(data.updateDate || get_current_date());
		$("#pDescription").val(data.description || "");
	},
	getCalOffClassPop: function() {
		var startTime = $("#pStartTime").val().replace(":", "");
		var endTime = $("#pEndTime").val().replace(":", "");
		var result = [
			{
				calOffClassId: $("#pCalOffClassId").val(),
				calOffClassName: $("#pCalOffClassName").val(),
				startTime : startTime,
				endTime: endTime,
				useYn: $("#pUseYn").val(),
				updateBy: $("#pUpdateBy").val(),
				updateDate:$("#pUpdateDate").val(),
				uiSequence : $("#pUiSequence").val(),
				description:$("#pDescription").val(),
				cudFlag : cudFlag, 
				addDate : addDate
			}
		]
		return result;
	},
	delCallback : function(result, data, param, callbackParam, flag) {
		var that = this.MOMJA006;
		if(result == "SUCCESS") {
			if(flag == true) {
				var param = mCommon.formGetParam("#form");
				mCommon.render("grid", "W2019050214585496910008f5dk6b1v0E", param, function() {
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(result, data) {
		var that = this.MOMJA006;
		if(result == "SUCCESS"){
			var param =  mCommon.formGetParam("#form");
			mCommon.render("grid", "W2019050214585496910008f5dk6b1v0E", param, function() {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMJA006.init();
});
