var MOMID003 = {
	initParam: undefined,
	entityId: undefined,
	preViewParams: undefined,
	cuFlag: undefined,
	op: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			that.event();
			that.comboBox();
			that.design();
		});
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 2) {
			var selectedGrid1 = AUIGrid.getSelectedItems(momWidget.grid[0]);
			var selectedGrid2 = AUIGrid.getSelectedItems(momWidget.grid[1]);

			$("#resourceMonitorCdEP3").val(selectedGrid2[0].item['resourceMonitorCd']);
			this.initParam = {resourceCd : selectedGrid2[0].item['resourceCd'], itemId : selectedGrid1[0].item['itemId'], attachType : "image/jpeg"};
			
			if(indexInfo != undefined && indexInfo['op'] == 'createBtn3' || indexInfo['op'] == 'copyBtn3') {
				cuFlag = 'C';
			} else if(indexInfo != undefined && indexInfo['op'] == 'editBtn3') {
				cuFlag = 'U';
			}
			
			$('#file').html($('#file').html());
			$('#file').val("");
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(cuFlag == 'C' && file.files.length == 0) {
			this.initMessage = Language.lang['MESSAGES10347'];
			return;
		}
		
		if(indexInfo != undefined && indexInfo != ['mSaveBtn']) {
			if($("#fromMonitorCd").val() == undefined) {
				this.initMessage = Language.lang['MESSAGES12290'];
				return;
			}
			
			if($("#toMonitorCd").val() == undefined) {
				this.initMessage = Language.lang['MESSAGES12291'];
				return;
			}
		}
	}
//	, keyDownCallInit: function(index, keyCode) {
//		var that = this;
//		if(keyCode == 13) {
//			that.op = 'findBtn4';
//			return;
//		}
//	}
	, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
			AUIGrid.clearGridData(momWidget.grid[1]);
			AUIGrid.clearGridData(momWidget.grid[2]);
		} else if(indexInfo['op'] == 'CC1') {
			if(data.length > 0) {
				AUIGrid.setGridData(momWidget.grid[1], data);
				AUIGrid.clearGridData(momWidget.grid[2]);
				var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
				if(item.length > 0) {
					this.initParam = {itemId : item[0].item['itemId']};
				}
			} else {
				AUIGrid.clearGridData(momWidget.grid[1]);
				AUIGrid.clearGridData(momWidget.grid[2]);
			}
		} else if(indexInfo['op'] == 'CC2') {
			AUIGrid.setColumnPropByDataField(momWidget.grid[2], 'attach', { style:"hyperStyle" } );
			AUIGrid.setGridData(momWidget.grid[2], data);
		} else {
			AUIGrid.setGridData(momWidget.grid[2], data);
		}
		
		if(indexInfo['op'] == 'findBtn4') {
			AUIGrid.setGridData(momWidget.grid[3], data);
		}
		
		momWidget.splashHide();
	}, delCallBack: function(index, param, callBackParam, indexInfo) {
		var checkedGrid1 = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
		var selectedGrid2 = AUIGrid.getSelectedItems(momWidget.grid[1]);
		
		if(indexInfo != undefined && indexInfo['op'] == 'delBtn3') {
			this.initParam = {resourceCd : callBackParam[0].resourceCd, itemId : callBackParam[0].itemId};
		}
		
		mom_ajax('R', 'reference.document.workingManual.workingManual', {itemId : checkedGrid1[0].item.itemId, resourceCd : selectedGrid2[0].item.resourceCd, resourceMonitorCd : selectedGrid2[0].item.resourceMonitorCd}, function(result, data) {
			AUIGrid.setGridData(momWidget.grid[2], data);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}, undefined, undefined, this, 'sync');
		
		momWidget.splashHide();
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var checkedGrid1 = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
		var selectedGrid2 = AUIGrid.getSelectedItems(momWidget.grid[1]);
		
		if(file.files.length > 0) {
			var params = {'key' : 'ATTACH'
						, 'entityId' : "MOMID003"
						, "resourceCd" : param[0].resourceCd
						, "resourceMonitorCd" : selectedGrid2[0].item.resourceMonitorCd
						, "itemId" : param[0].itemId
						, "attachSeq" : param[0].attachSeq
						, "attachName" : param[0].attachName
						, "originalFileName" : file.files[0].name
						, "attachType" : file.files[0].type};	
			file_upload(file, 'reference.document.workingManual.workingManualFile', JSON.stringify(params));
		}
		
		mom_ajax('R', 'reference.document.workingManual.workingManual', {itemId : checkedGrid1[0].item.itemId, resourceCd : selectedGrid2[0].item.resourceCd, resourceMonitorCd : selectedGrid2[0].item.resourceMonitorCd}, function(result, data) {
			AUIGrid.setGridData(momWidget.grid[2], data);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}, undefined, undefined, this, 'sync');
		
		momWidget.splashHide();
	}, cellClickCallInit: function(index, e) {
		var that = this;
		if(index == 0) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(item.length > 0) {
				this.resourceCd = item['resourceCd'];
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
			}
		} 
		
		preViewParams = e.item;
		if (e.dataField == "attach"){
			$("#preViewPop").momModal("show");
			that.preViewImage();
			
			//window.open('preViewWorkingManual.html','preViewWorkingManual','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
		}
	}, event: function() {
		// 모니터 복사
		$(document).on("click", "#copyMonitorBtn2", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			if(checkedItems.length > 0) {
				$("#fromMonitorCd").val(checkedItems[0].item.resourceMonitorCd);
				$("#copyPop").momModal("show");
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10491']});
				return;
			}
		});
		
		// 모니터 복사 팝업 닫기 시
		$(document).on("click", ".bntpopclose, #mCancelBtn", function() {
			$("#copyPop").momModal("hide");
		});
		
		// 미리보기 팝업 닫기
		$(document).on("click", ".bntpopclose, #preClosedBtn", function() {
			$("#preViewPop").momModal("hide");
		});
		
		// 모니터 복사 팝업 저장 시
		$(document).on("click", "#mSaveBtn", function() {
			var toMonitorList = $("#toMonitorCd").jqxComboBox('getCheckedItems');
			var arrayList = [];
			
			if(toMonitorList.length == 1) {
				if($("#fromMonitorCd").val() == toMonitorList[0].originalItem.value) {
					momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11880']});
					return;
				}
			}
			
			for(var i=0; i<toMonitorList.length; i++) {
				if($("#fromMonitorCd").val() != toMonitorList[i].originalItem.value) {
					var param = {
						fromMonitorCd : $("#fromMonitorCd").val(),
						toMonitorCd : toMonitorList[i].originalItem.value
					}
					
					arrayList.push(param);
				}
			}
			
			mom_ajax('L', 'reference.document.workingManual.copyWorkingManual', JSON.stringify(arrayList), function(result, data) {
				$("#copyPop").momModal("hide");
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}, undefined, undefined, this, 'sync');
		});
		
		// 이미지복사 팝업 호출 시
		$(document).on("click", "#copyBorBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length > 0) {
				var pItem = checkedItems[0].item.itemId+"("+checkedItems[0].item.itemName+")";
				var pResource = checkedItems[0].item.resourceCd+"("+checkedItems[0].item.resourceName+")";
				
				$("#borCopyPop").momModal("show");
				$("#mItemId").val(pItem);
				$("#mResourceCd, #dResourceCd").val(pResource);
				$("#mRouteCd, #dRouteCd").val(checkedItems[0].item.routeName);
				$("#mItemId, #mResourceCd, #mRouteCd, #dResourceCd, #dRouteCd").attr("readonly", "readonly");
				$("#dItemId").val("");
				AUIGrid.resize(momWidget.grid[3]);
				AUIGrid.resize(momWidget.grid[4]);
				AUIGrid.clearGridData(momWidget.grid[3]);
				AUIGrid.clearGridData(momWidget.grid[4]);
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10491']});
				return;
			}
		});
		
		// 이미지복사 팝업 닫기 시
		$(document).on("click", ".bntpopclose, #pCancelBtn", function() {
			$("#borCopyPop").momModal("hide");
		});
		
		// 이미지복사 팝업 내 조회
		$(document).on("click", "#actFindBtn4", function() {
			var resourceEndIndex = $("#dResourceCd").val().indexOf("("); 
			var routeEndIndex = $("#dRouteCd").val().indexOf("(");
			var mItemIdEndIndex = $("#mItemId").val().indexOf("(");
			
			mom_ajax('R', 'reference.itemInfo.bor.bor', {itemName : $("#dItemId").val()
													   , resourceCd : $("#dResourceCd").val().substring(0, resourceEndIndex)
													   , routeName : $("#dRouteCd").val().substring(0, routeEndIndex)
													   , copyItemId : $("#mItemId").val().substring(0, mItemIdEndIndex)}
			, function(result, data) {
				if(data.length > 0) {
					AUIGrid.setGridData(momWidget.grid[3], data);
				} else {
					AUIGrid.clearGridData(momWidget.grid[3]);
				}
			}, undefined, undefined, this, 'sync');
		});
		
		// 이미지복사 팝업 내 선택 버튼 
		$(document).on("click", "#actChoiceBtn4", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[3]);
			var gridItems = AUIGrid.getGridData(momWidget.grid[4]);
			
			if(checkedItems.length > 0) {
				for(var i = 0; i  < checkedItems.length; i++) {
					var item  = checkedItems[i].item;
					var chk = true;
					
					for(var j = 0; j < gridItems.length; j++) {
						if(item.itemId == gridItems[j].itemId) {
							chk = false;
							break;
						}
					}
					
					if(chk) {
						AUIGrid.addRow(momWidget.grid[4], item, "last");
					}
				}
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
		});
		
		// 이미지복사 팝업 내 취소 버튼
		$(document).on("click", "#dCancelBtn5", function () {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[4]);
			if(checkedItems.length > 0) {
				AUIGrid.removeCheckedRows(momWidget.grid[4]);
				AUIGrid.removeSoftRows(momWidget.grid[4]);
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
		});
		
		// 이미지복사 팝업 내 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[4]);
			var itemEndIndex = $("#mItemId").val().indexOf("(");
			var arrayList = [];
			if(checkedItems.length > 0) {
				momWidget.splashShow();
				for(var i=0; i<checkedItems.length; i++) {
					var param = {
						resourceCd : checkedItems[i].item.resourceCd,
						fromItemId : $("#mItemId").val().substring(0, itemEndIndex),
						toItemId : checkedItems[i].item.itemId
					}
					
					if(checkedItems[i].item.itemId != $("#mItemId").val().substring(0, itemEndIndex)) {
						arrayList.push(param);
					}
				}
				
				if(arrayList.length > 0) {
					mom_ajax('L', 'reference.document.workingManual.copyWorkingManualByItem', JSON.stringify(arrayList), function(result, data) {
						if(result == 'SUCCESS') {
							momWidget.splashHide();
							$("#borCopyPop").momModal("hide");
							momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
							return;
						}
						
						if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
							momWidget.splashHide();
							momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
						} else {
							momWidget.splashHide();
							momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
						}
					}, undefined, undefined, this, 'sync');
				} else {
					momWidget.splashHide();
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12339']});
					return;
				}
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11340']});
				return;
			}
		});
		
	}, comboBox: function() {
		// From 모니터 코드
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comMonitor.dummy', {}, function(data) {
			var width = $("#fromMonitorCd").width() + 26;
			var height = $("#fromMonitorCd").height() + 4 < 24 ? 24 : $("#fromMonitorCd").height() + 4;
			
			$("#fromMonitorCd").jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true});
			$("#fromMonitorCd").removeClass('w-select');
				
			var items = [];
			for(var i = 0; i < data.length; i++) {
				items.push({ label: data[i]['name'], value: data[i]['code'] });
			}
			
			$("#fromMonitorCd").jqxComboBox('source', items);
		});
		
		// To 모니터 코드
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comMonitor.dummy', {}, function(data) {
			var width = $("#toMonitorCd").width() + 26;
			var height = $("#toMonitorCd").height() + 4 < 24 ? 24 : $("#toMonitorCd").height() + 4;
			
			$("#toMonitorCd").jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, checkboxes: true});
			$("#toMonitorCd").removeClass('w-select');
				
			var items = [];
			for(var i = 0; i < data.length; i++) {
				items.push({ label: data[i]['name'], value: data[i]['code'] });
			}
			
			$("#toMonitorCd").jqxComboBox('source', items);
		});
		
	}, preViewImage: function() {
		var that = this;
		var images = new Array();
		$(".slider-img").remove();
		mom_ajax('R', 'reference.document.workingManual.preViewWorkingManual'
				, { itemId : preViewParams.itemId
					, resourceCd: preViewParams.resourceCd		
					, resourceMonitorCd: preViewParams.resourceMonitorCd
					, attachSeq : preViewParams.attachSeq}
		, function(result, data) {
			if(data.length > 0) {
				for(var i=0; i<data.length; i++) {
					if(data[i].attachType != null && data[i].attachType.indexOf('video') == -1) {
						if(data[i].CONTENTS != undefined) {
							images[i] = "data:" + data[i].attachType + ";base64," + data[i].attach;
							that.html = '<img class="slider-img" src="' + images[i] + '"' + ' id=' + '"' + 'image' + Number(i+1) + '"' + ' />';
						} 
					} 
				}
				$("#preview").append(that.html);
				
			}
		}, undefined, undefined, this, 'sync');
		
	}, design: function(){
		$("head").append('<style>.hyperStyle{ text-decoration: underline; color: #049cb0;}</style>');	
		$("head").append('<style>.hyperStyle :hover{ text-decoration: underline; color: #ba0615; cursor:pointer;}</style>');	
	}
//	, cellClickCallBack: function(index, e) {
//		if(e.dataField == 'attach') {
//			var selectedItem = AUIGrid.getItemByRowIndex(momWidget.grid[2], e.rowIndex);
//			file_download(selectedItem['resourceCd'], selectedItem['itemId'], selectedItem['attachSeq'], selectedItem['attachName'], 'ATTACH');
//		}
//	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMID003', MOMID003);
	momWidget.init(2, 'MOMID003', MOMID003);
	momWidget.init(3, 'MOMID003', MOMID003);
	momWidget.init(4, 'MOMID003', MOMID003);
	momWidget.init(5, 'MOMID003', MOMID003);
	MOMID003.init();
});