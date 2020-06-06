var MOMLC003 = {
	initCount			: 0,
	initParam 			: undefined,
	initMessage			: undefined,
	workOrderId 		: undefined,
	validDT 			: /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/,
	woResultId			: undefined,
	
	init: function() {	
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.event();
				that.comboBox();
				that.fileInputSet();
			});
		});
		that.design();
	}, retrieveCallInit: function(data, param, callBackParam, indexInfo) {
		var that = this;
//		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC1') {
//			if(param.status != 'F') {
//				this.initMessage = Language.lang['MESSAGES12258'];
//				return;
//			}
//		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && (indexInfo['op'] == 'findBtn1' || indexInfo['op'] == 'createResultBtn1')) {
			AUIGrid.setProp(momWidget.grid[0], {'editBeginMode' : 'click'});
			AUIGrid.setGridData(momWidget.grid[0], data);
			if(indexInfo['op'] == 'createResultBtn1') {
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC1') {
			that.workOrderId = AUIGrid.getSelectedItems(momWidget.grid[0])[0]['item']['eqmWoId'];
			AUIGrid.setGridData(momWidget.grid[1], data);
			setTimeout(function() {
				that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
				that.grid();
			}, 100);
		}
		
		if(indexInfo['op'] != undefined && (indexInfo['op'] == 'saveBtnEP1' || indexInfo['op'] == 'delBtn1')) {
			mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoResult', {fromDate: $("#fromDate").val(), toDate : $("#toDate").val()}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[0], data);
				} else {
					AUIGrid.clearGridData(momWidget.grid[0]);
				}
			}, undefined, undefined, this, 'sync');
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn2') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoRequest', {eqmWoId: checkedItems[0].item.eqmWoId}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[1], data);
					that.initCount = AUIGrid.getGridData(momWidget.grid[1]).length; 
				} else {
					AUIGrid.clearGridData(momWidget.grid[1]);
					that.initCount = AUIGrid.getGridData(momWidget.grid[1]).length;
				}
			}, undefined, undefined, this, 'sync');
		}
		
		momWidget.splashHide();
		
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn1') {
			editFlag = false;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'editBtn1') {
			editFlag = true;
		}
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
//		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createResultBtn1') {
//			for(var i = 0; i < param.length; i++) {
//				if(param[i].status != 'A') {
//					this.initMessage = Language.lang['MESSAGES12260'];
//					return;
//				}
//				
//				if(param[i]['startTime'] == null) {
//					param[i]['startTime'] = '00:00:00';
//				}
//				if(param[i]['endTime'] == null) {
//					param[i]['endTime'] = '00:00:00';
//				}
//				
//				/*시간체크*/
//				var now = new Date();
//				var startDT;
//				var endDT;
//				if(param[i]['startDate'] != null) {
//					startDT = param[i]['startDate'].replace(/\//gi,'-') + ' ' + param[i]['startTime'];
//				} else {
//					this.initMessage = Language.lang['MESSAGES10791'];
//					return;
//				}
//				if(param[i]['endDate'] != null) {
//					endDT = param[i]['endDate'].replace(/\//gi,'-') + ' ' + param[i]['endTime'];
//				} else {
//					this.initMessage = Language.lang['MESSAGES10926'];
//					return;
//				}
//			
//				var chkStartDate = new Date(param[i]['startDate']);
//				var chkEndDate = new Date(param[i]['endDate']);			
//				var chkStartTime = parseInt(param[i]['startTime'].replace(/:/gi,''));
//				var chkEndTime = parseInt(param[i]['endTime'].replace(/:/gi,''));
//				
//				var currDT = get_current_date('yyyy-mm-dd hh24:mi:ss');
//				var currDate = get_current_date('yyyy-mm-dd');
//				
//				if(startDT == '' || !this.validDT.test(startDT) ) {
//					this.initMessage = Language.lang['MESSAGES10791'];
//					return;
//				} else if(endDT == '' || !this.validDT.test(endDT) ) {
//					this.initMessage = Language.lang['MESSAGES10926'];
//					return;
//				} else if(chkStartDate > chkEndDate) {
//					this.initMessage = Language.lang['MESSAGES10927'];
//					return;		
//				} else if(param[i]['startDate'].replace(/-/gi,'') == param[i]['endDate'].replace(/-/gi,'') && Number(chkStartTime) > Number(chkEndTime)) {
//					this.initMessage = Language.lang['MESSAGES10924'];
//					return;
//				}
//			}
//		}
		
		if(indexInfo['op'] == 'saveBtnEP1') {
			if(editFlag == false) {
				var param;
				mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoId', {eqmType: param.eqmType, planStartDate: param.planStartDate}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data != undefined) {
						param = {eqmWoId : data[0].eqmWoId};
					}
				}, undefined, undefined, this, 'sync');
			}
			
			param.fromDate = $("#fromDate").val();
			param.toDate = $("#toDate").val();
			
			this.initParam = param;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'actSaveBtn3') {
			if($("#pState").val() == '') {
				this.initMessage = ['MESSAGES12320'];
				return;
			}
			
			if($("#pStartDate").val() == '') {
				this.initMessage = ['MESSAGES10793'];
				return;
			}
			
			if($("#pStartTime").val() == '') {
				this.initMessage = ['MESSAGES10788'];
				return;
			}
			
			if($("#pEndDate").val() == '') {
				this.initMessage = ['MESSAGES11238'];
				return;
			}
			
			if($("#pEndTime").val() == '') {
				this.initMessage = ['MESSAGES11236'];
				return;
			}
		}
		
	}, addClickInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		that.grid();
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'addBtn2') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length == 0) {
				that.initMessage = Language.lang['MESSAGES11342'];
				return;
			}
		}
		
	}, addClickBack: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'addBtn2') {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(grid2Length > that.initCount) {
				AUIGrid.setCellValue(momWidget.grid[1], grid2Length - 1, 'eqmWoId', checkedItems[0].item.eqmWoId);				
			}
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn1') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.status != 'A') {
					that.initMessage = Language.lang['MESSAGES12352'];
					return;
				}
			}
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn2') {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.issueQty > 0) {
					that.initMessage = Language.lang['MESSAGES11387'];
					return;
				}
			}
		}
	}, delCallBack1: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'delBtn2') {
			var count = 0;
			var arrayList = [];
			for(var i = 0; i < param.length; i++) {
				if(param[i]['item']['NEW'] == 'Y') {
					arrayList.push(param[i].rowIndex);
					count++;
				}
			}
			AUIGrid.removeRow(momWidget.grid[1], arrayList); 
			if(count == param.length) {
				this.initParam = 'Y';
			} else {
				this.initParam = 'N';
			}
		}
	}, grid: function(){
		var that = this;
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			if(e.dataField == 'itemId' || e.dataField == 'inLocationCd' || e.dataField == 'outLocationCd' || e.dataField == 'requestQty') {
				 if(e.rowIndex >= that.initCount) {
					 return true;
				 } else {
					 return false;
				 }
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			if(e.dataField == 'itemId' ) {
				if(e.dataField == 'itemId') {
					mom_ajax('R', 'common.comItemInfo', {itemId: e.item.itemId.replace(/(\s*)/gi,'')}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						} 
						
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemName', data[0]['itemName']);
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'specification', data[0]['specification']);
					}, undefined, undefined, that, 'sync');
				}
			} 
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'itemId', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount)
				return 'columnStyle';
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'inLocationCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount)
				return 'columnStyle';
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'outLocationCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount)
				return 'columnStyle';
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'requestQty', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount)
					return 'columnStyle';
			}
		});
		
		AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function(e) {
			AUIGrid.clearGridData(momWidget.grid[1]);
		});
		
	}, design: function(){
		$('head').append('<style>.columnStyle{background: #C7E8FD !important;}</style>');	
	}, event: function() {
		var that = this;
		// 점검내역 등록
		$("#createResultBtn1").on("click", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			
			if(checkedItems.length == 0 || checkedItems.length > 1) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});  
				return;
			}
			
			$("#listPop1").momModal("show");
			$("#pWorkOrderType").val(checkedItems[0].item.eqmTypeName);
			$("#pWorkOrderId").val(checkedItems[0].item.eqmWoId);
			$("#pWorkOrderName").val(checkedItems[0].item.eqmWoName);
			$("#pResourceCd").val(checkedItems[0].item.equipmentCd || '(' || checkedItems[0].item.equipmentName || ')');
			$("#pStartDate").val("");
			$("#pStartTime").val("");
			$("#pEndDate").val("");
			$("#pEndTime").val("");
			$("#pDescription").val("");
			$("#pWorkOrderType, #pWorkOrderId, #pWorkOrderName, #pResourceCd").attr("readonly", "readonly");
			
			AUIGrid.resize(momWidget.grid[4]);
			
			mom_ajax('R', 'equipment.equipmentWoResult.equipmentWo', {workOrderId : checkedItems[0].item.eqmWoId}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				} else {
					AUIGrid.setGridData(momWidget.grid[4], data);
					return;
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 점검내역 등록 팝업 닫기
		$("#cancelBtn5, .bntpopclose").on("click", function() {
			$("#listPop1").momModal("hide");
			$("#confirmPop2").momModal("hide");
			$("#returnPop2").momModal("hide");
			
			mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoResult', {fromDate : $("#fromDate").val(), toDate : $("#toDate").val()}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				} else {
					AUIGrid.setGridData(momWidget.grid[0], data);
					return;
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 점검내역 저장
		$("#actSaveBtn3").on("click", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var validDT = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
			var startDT = $("#pStartDate").val() + " " + $("#pStartTime").val();
			var endDT = $("#pEndDate").val() + " " + $("#pEndTime").val();
			var status;
			
			
			if(checkedItems.length > 0) {
				var param = {
					workOrderId : checkedItems[0].item.eqmWoId,
					equipmentCd : $("#pResourceCd").val(),
					workDay : $("#pStartDate").val(),
					startTime : startDT,
					endTime : endDT,
					state : $("#pState").val(),
					description : $("#pDescription").val()
				}
				
				// 점검내역 등록 시 상태가 작업완료일 경우 완료 처리
				if(param.state == 'F') {
					param.status = 'F';
				} else {
					param.status = 'R';
				}
				
				if($("#pState").val() == '') {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12320']});  
					return;
				}
				
				if($("#pStartDate").val() > $("#pEndDate").val()) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});  
					return;
				}
				
				if($("#pStartTime").val().length != 6 || $("#pStartTime").val().substr(0,2) > 23 || $("#pStartTime").val().substr(2,2) > 59 || $("#pStartTime").val().substr(4,2) > 59) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11687']});  
					return;
				}
				
				if($("#pEndTime").val().length != 6 || $("#pEndTime").val().substr(0,2) > 23 || $("#pEndTime").val().substr(2,2) > 59 || $("#pEndTime").val().substr(4,2) > 59) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11689']});  
					return;
				}
				
				if(Number($("#pStartTime").val()) >= Number($("#pEndTime").val())) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11690']});
					return;
				}
				
				if(param.startTime == '' || validDT.test(param.startTime)) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});  
					return;
				}
				
				if(param.endTime == '' || validDT.test(param.endTime)) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});  
					return;
				}
				
				mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoResultChange', {eqmWoId : $("#pWorkOrderId").val()}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					} else {
						if(data.length > 0) {
							status = data[0].status;
							return;
						}
					}
					
				}, undefined, undefined, this, 'sync');
				
				if(status == 'F') {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12326']});  
					return;
				}
				
				momWidget.messageBox({type:'info', width:'400', height: '145', html: Language.lang['MESSAGES11734'], closeButton:{text:'Close'}, okButton:{text:'OK', 
					after:function() {
						momWidget.splashShow();
						mom_ajax("C", "equipment.equipmentWoResult.equipmentWo", JSON.stringify(param), that.callbackPost);
					}
				}});	
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11324']});		                
        		return; 
			}
		});
		
		// 점검내역 삭제
		$("#cancelPerfomanceBtn5").on("click", function() {
			var getGrid5Data = AUIGrid.getGridData(momWidget.grid[4]);
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[4]);
			var arrayList = [];
			var callbackChk = false;
//			var delRowCnt = 0;
			if(checkedItems.length > 0) {
//				for(var j = 0; j < getGrid5Data.length; j++) {
//					if(getGrid5Data[j].state == 'T') {
//						for(var k = 0; k < checkedItems.length; k++) {
//							if(checkedItems[k].item.state == 'T') {
//								delRowCnt++;
//							}
//							
//							if(delRowCnt == 0) {
//								momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12327']});		                
//				        		return; 
//							}
//						}
//					}
//				}
					
				for(var i = 0; i < checkedItems.length; i++) {
//					if(delRowCnt > 0) {
//						checkedItems[i].item.status = 'A';
//					} else {
//						checkedItems[i].item.status = 'A';
//					}
					
					checkedItems[i].item.status = 'R';
					
					arrayList.push(checkedItems[i].item);
					if(i == checkedItems.length - 1) {
						callbackChk = true;
					}
				}
				
				momWidget.messageBox({type:'info', width:'400', height: '145', html: Language.lang['MESSAGES10579'], closeButton:{text:'Close'}, okButton:{text:'OK', 
					after:function() {
						momWidget.splashShow();
						mom_ajax("LD","equipment.equipmentWoResult.equipmentWo", JSON.stringify(arrayList), that.callbackPost, callbackChk);
					}
				}});	
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11334']});		                
        		return; 
			}
		});
		
		//File 버튼
		$(document).on("click", ".grid3FileBtn", function() {
			AUIGrid.resize(momWidget.grid[2], $(window).width() * 0.487 - 48, 150);
			$("#fileUpload").val("");
			$("#popFileUpload").momModal("show");
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex(momWidget.grid[4], rowIndex);
			woResultId = item.woResultId;
			$("#fileUpload").val("");
			
			mom_ajax('R', 'common.file', {entityId: woResultId, entityName: 'MOMLC003'}, function(result, data) {
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[2], data);
					return;
				} else {
					AUIGrid.clearGridData(momWidget.grid[2]);
					return;
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 파일 업로드 버튼 (파일 등록)
		$(document).on("click", "#fileUploadBtn, #fileDelBtn", function() {
			var type = $("#fileCloseBtn").attr("type");
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			
			if($(this).attr("id") == "fileUploadBtn") {
				//등록
				if($("#fileUpload").val() == "") {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10347']});
					return;
				}
				
				var attach = document.getElementById('fileUpload');
				attach_upload(attach, 'MOMLC003', woResultId, '{}', function(flag, response){
					if(flag == 'SUCCESS') {
						mom_ajax('R', 'common.uploadFile', {entityId: woResultId, entityName: 'MOMLC003'}, function(result, data) {
							if(result != 'SUCCESS' || data.length < 1) {
								return;
							}
							
							if(data.length > 0) {
								AUIGrid.setGridData(momWidget.grid[2], data);
								return;
							}
							
						}, undefined, undefined, this, 'sync');
					}
				});
			} else {
				//삭제
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				var items = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
				for(var i = 0; items.length; i++) {
					var param =  { fileId : items[i].item.fileId };
					if(i == AUIGrid.getCheckedRowItems(momWidget.grid[2]).length - 1) {
						mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data) {
							if(flag == 'SUCCESS') {
								mom_ajax('R', 'common.file', {entityId: woResultId, entityName: 'MOMLC003'}, function(result, data) {
									if(data.length > 0) {
										AUIGrid.setGridData(momWidget.grid[2], data);
										return;
									} else {
										AUIGrid.clearGridData(momWidget.grid[2]);
										return;
									}
									
								}, undefined, undefined, this, 'sync');
							}
						});
					} else {
						mom_ajax('D', 'common.file', JSON.stringify(param));
					}
				}
			}
			
		});
		
		//파일 다운로드 버튼
		$(document).on("click", "#fileDownBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var items = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
			for(var i = 0; i < items.length; i++) {
				attach_download(woResultId, 'MOMLC003', items[i].item.oldFileName);	
			}
		});
		
		// 파일 업로드 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose2", function() {
			var type = $("#fileCloseBtn").attr("type");
			$(this).closest(".modal").momModal("hide");
		});
		
		// 사용수량 등록 팝업 호출
		$(document).on("click", "#confirmBtn2", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			if(checkedItems.length == 1) {
				if(checkedItems[0].item.itemId != undefined) {
					$("#confirmPop2").momModal("show");
					$("#cRequestQty").val(checkedItems[0].item.requestQty);
					$("#cReleaseQty").val(checkedItems[0].item.issueQty);
					$("#cCancelQty").val(checkedItems[0].item.cancelQty);
					$("#cDeductQty").val(checkedItems[0].item.deductQty);
					$("#confirmQty, #confirmDate").val("");
					$("#cRequestQty, #cReleaseQty, #cCancelQty, #cDeductQty").attr("readonly", "readonly");
				} else {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
					return;
				}
			} else {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
		});
		
		// 반품수량 등록 팝업 호출
		$(document).on("click", "#returnBtn2", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			if(checkedItems.length == 1) {
				if(checkedItems[0].item.itemId != undefined) {
					$("#returnPop2").momModal("show");
					$("#rRequestQty").val(checkedItems[0].item.requestQty);
					$("#rReleaseQty").val(checkedItems[0].item.issueQty);
					$("#rCancelQty").val(checkedItems[0].item.cancelQty);
					$("#rDeductQty").val(checkedItems[0].item.deductQty);
					$("#returnQty, #returnDate").val("");
					$("#rRequestQty, #rReleaseQty, #rCancelQty, #rDeductQty").attr("readonly", "readonly");
				} else {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
					return;
				}
			} else {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
		});
		
		// 사용수량 등록 팝업 저장
		$(document).on("click", "#cSaveBtn2", function() {
			momWidget.splashShow();
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			var param = {
				confirmQty : $("#confirmQty").val()
			  , confirmDate : $("#confirmDate").val()
			  , eqmWoId : checkedItems[0].item.eqmWoId
			  , itemId : checkedItems[0].item.itemId
			  , inLocationCd : checkedItems[0].item.inLocationCd
			}
			
			if(Number($("#cReleaseQty").val() == 0)) {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12347']});
				return;
			}
			
			if($("#confirmQty").val() == '') {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12350']});
				return;
			}
			
			if($("#confirmDate").val() == '') {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12348']});
				return;
			}
			
			if(Number($("#confirmQty").val()) > Number($("#cReleaseQty").val()) - Number($("#cDeductQty").val()) - Number($("#cCancelQty").val())) {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12333']});
				return;
			}
			
			mom_ajax('C', 'equipment.equipmentWoResult.emRequestConfirmQty', JSON.stringify(param), function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					$("#confirmPop2").momModal("hide");

					if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
						momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
					} else {
						momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
					}
					
					return;
				} else {
					momWidget.splashHide();
					$("#confirmPop2").momModal("hide");
					
					mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoRequest', {eqmWoId : checkedItems[0].item.eqmWoId}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						}
						
						if(data.length > 0) {
							AUIGrid.setGridData(momWidget.grid[1], data);
							momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
							return;
						}
						
					}, undefined, undefined, this, 'sync');
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 반품수량 등록 팝업 저장
		$(document).on("click", "#rSaveBtn2", function() {
			momWidget.splashShow();
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			var param = {
				returnQty : $("#returnQty").val()
			  , returnDate : $("#returnDate").val()
			  , eqmWoId : checkedItems[0].item.eqmWoId
			  , itemId : checkedItems[0].item.itemId
			  , inLocationCd : checkedItems[0].item.inLocationCd
			  , outLocationCd : checkedItems[0].item.outLocationCd
			}
			
			if(Number($("#rReleaseQty").val() == 0)) {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12347']});
				return;
			}
			
			if($("#returnQty").val() == '') {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12351']});
				return;
			}
			
			if($("#returnDate").val() == '') {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12349']});
				return;
			}
			
			if(Number($("#returnQty").val()) > Number($("#rReleaseQty").val()) - Number($("#rDeductQty").val()) - Number($("#rCancelQty").val())) {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12333']});
				return;
			}
			
			mom_ajax('C', 'equipment.equipmentWoResult.emRequestReturnQty', JSON.stringify(param), function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					$("#returnPop2").momModal("hide");
					
					if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
						momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
					} else {
						momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
					}
					
					return;
				} else {
					momWidget.splashHide();
					$("#returnPop2").momModal("hide");
					
					mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoRequest', {eqmWoId : checkedItems[0].item.eqmWoId}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						}
						
						if(data.length > 0) {
							AUIGrid.setGridData(momWidget.grid[1], data);
							momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
							return;
						}
						
					}, undefined, undefined, this, 'sync');
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 사용수량 등록 팝업 닫기
		$(document).on("click", "#cCloseBtn2", function() {
			$("#confirmPop2").momModal("hide");
		});
		
		// 반품수량 등록 팝업 닫기
		$(document).on("click", "#rCloseBtn2", function() {
			$("#returnPop2").momModal("hide");
		});
		
		// 저장
		$(document).on("click", "#materialDeductionBtn2", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			var arrayList = [];
			if(checkedItems.length > 0) {
				for(var i = 0; i < checkedItems.length; i++) {
					if(checkedItems[i].item.itemId == '' || checkedItems[i].item.itemId == null) {
						momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
						return;
					}
					if(checkedItems[i].item.inLocationCd == '' || checkedItems[i].item.inLocationCd == null) {
						momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12122']});
						return;
					}
					if(checkedItems[i].item.outLocationCd == '' || checkedItems[i].item.outLocationCd == null) {
						momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12262']});
						return;
					}
					
					var param = {
						eqmWoId : checkedItems[i].item.eqmWoId,
						itemId : checkedItems[i].item.itemId,
						requestQty : checkedItems[i].item.requestQty,
						inLocationCd : checkedItems[i].item.inLocationCd,
						outLocationCd : checkedItems[i].item.outLocationCd
					}
					
					if(checkedItems[i].item.NEW == 'Y') {
						arrayList.push(param);
					}
				}
				
				if(arrayList.length == 0) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES12262']});
					return;
				}
				
				momWidget.messageBox({type:'info', width:'400', height: '145', html: Language.lang['MESSAGES11194'], closeButton:{text:'Close'}, okButton:{text:'OK', 
					after:function() {
						momWidget.splashShow();
						
						mom_ajax('L', 'equipment.equipmentWoResult.emIssueRequest', JSON.stringify(arrayList), function(result, data) {
							if(result != 'SUCCESS') {
								momWidget.splashHide();
								return;
							} else {
								momWidget.splashHide();
								mom_ajax('R', 'equipment.equipmentWoResult.equipmentWoRequest', {eqmWoId : checkedItems[0].item.eqmWoId}, function(result, data) {
									if(result != 'SUCCESS' || data.length < 1) {
										return;
									}
									
									if(data.length > 0) {
										that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
										AUIGrid.setGridData(momWidget.grid[1], data);
										momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
										return;
									}
									
									that.grid();
									
								}, undefined, undefined, this, 'sync');
							}
						}, undefined, undefined, this, 'sync');
					}
				}});
			
			} else {
				momWidget.splashHide();
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11340']});
				return;
			}
		});
		
	}, comboBox: function() {
		// 상태
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', {codeClassId : "EQM_WORK_ORDER_STATUS", attribute3 : 'Y'}, function(data) {
			var width = $("#pState").width() + 26;
			var height = $("#pState").height() + 4 < 24 ? 24 : $("#pState").height() + 4;
			
			$("#pState").jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true});
			$("#pState").removeClass('w-select');
				
			var items = [];
			for(var i = 0; i < data.length; i++) {
				items.push({ label: data[i]['name'], value: data[i]['code'] });
			}
			
			$("#pState").jqxComboBox('source', items);
			$("#pState").jqxComboBox('selectedIndex', 0);
		});
		
		$("#pStartTime").mask("999999");
		$("#pEndTime").mask("999999");
		
		var fileColumn = {"headerText":"File","dataField":"File","width":40,"visible":true,
			renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
			labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
				return '<div class="grid3FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		}
			
		AUIGrid.addColumn(momWidget.grid[4], fileColumn, 0);
		
	}, callbackPost : function(result, data, param, callbackParam) {
		if(result == "SUCCESS") {
			if(callbackParam == true || callbackParam == undefined) {
				$("#pStartDate").val("");
				$("#pStartTime").val("");
				$("#pEndDate").val("");
				$("#pEndTime").val("");
				$("#pState").val("");
				$("#pDescription").val("");
				
				mom_ajax('R', 'equipment.equipmentWoResult.equipmentWo', {workOrderId : $("#pWorkOrderId").val()}, function(result, data) {
					if(result != 'SUCCESS') {
						momWidget.splashHide();
						return;
					} else {
						momWidget.splashHide();
						AUIGrid.setGridData(momWidget.grid[4], data);
						momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
						return;
					}
					
				}, undefined, undefined, this, 'sync');
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
		}
		
	}, fileInputSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	}

};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLC003', MOMLC003);
	momWidget.init(2, 'MOMLC003', MOMLC003);
	momWidget.init(3, 'MOMLC003', MOMLC003);
	momWidget.init(5, 'MOMLC003', MOMLC003);
	MOMLC003.init();
});