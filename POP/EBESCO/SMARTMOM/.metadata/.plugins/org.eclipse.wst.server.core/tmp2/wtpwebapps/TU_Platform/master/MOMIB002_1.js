
var MOMIB002_1 = {
	initParam: undefined,
	initMessage: undefined,
	
	
	menuId: undefined,
//	popFlag: undefined,
	orgChildItem: undefined,
	init: function() {		
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(2, function() {
				});
			});
		});
		this.event();
	}, loadCallInit: function() {
		this.grid();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 0 && indexInfo.op == 'findBtn1') {
			if(param.itemId == '') {
				this.initMessage = Language.getLang('MESSAGES10134+MESSAGES11589');
			}
			if(param.itemId == '*') {
				this.initParam = {itemId : 'ALL'};
			} else {
				this.initParam = undefined;
			}
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveLinkCopyBtn1') {
			if(param.itemId == '*') {
				this.initParam = {itemId : 'ALL'};
			} else {
				this.initParam = undefined;
			}
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'uploadBtn1') {
			if(this.menuId == 'MOMIB007') {
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
				momWidget.splashHide();
			} else {
				if(param.progId != null && param.progId != undefined && param.progId != '') {
					momWidget.findBtnClicked(2, true, param, function(){
						momWidget.splashHide();
					}, indexInfo, this);
					
//					mom_ajax('R', 'reference.itemInfo.bom.bomIfNoItem', param, function(result, data) {
					AUIGrid.getGridData(momWidget.grid[2]);
					$('#listPop1').momModal('show');
					momWidget.splashHide();
					AUIGrid.setGridData(momWidget.grid[2], data);
				} else {
					momWidget.splashHide();
					momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
				}
				
//					});
				
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
				
			}
		}
		
		if(indexInfo['op'] != undefined && (indexInfo['op'] == 'findBtn1' || indexInfo['op'] == 'saveBtnEP1' || indexInfo['op'] == 'delBtn1' )) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		}
		
		if(indexInfo['op'] != undefined && (indexInfo['op'] == 'saveBtnEX1' || indexInfo['op'] == 'uploadBtn1'|| indexInfo['op'] == 'saveLinkCopyBtn1')) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn1') {
			$("#endTimeEP1").val("4712-12-31");
			$('#saveLinkCopyBtn1').attr('id', 'saveBtnEP1');
		}
	}, createCallBack: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] == 'linkCopyBtn1') {
			$('#childItemIdEP1').jqxComboBox({disabled: false});
			$('#highItemIdEP1, #useYnEP1, #rnpFlagEP1, #mrpFlagEP1').jqxComboBox({disabled: true});
			$('#qtyEP1, #descriptionEP1, #bomSeqEP1, #startTimeEP1, #endTimeEP1').attr('readonly','readonly');
			$("#startTimeEP1, #endTimeEP1").prop('disabled', true);
			$('#saveBtnEP1').attr('id', 'saveLinkCopyBtn1');
			
			this.orgChildItem = param.childItemId;
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo.op == 'saveBtnEP1') {
			if(param.highItemId == param.childItemId) {
				this.initMessage = Language.lang['MESSAGES10602'];
			}
			param.parentItemId = $("#highItemIdEP1").val();
		}
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveLinkCopyBtn1') {
			param.parentItemId = $("#highItemIdEP1").val();
			param.changeItemId = $("#childItemIdEP1").val();
			param.childItemId = this.orgChildItem;
			
			this.initParam = param;
		} 
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'uploadBtn1') {
//			this.popFlag = 'N';
			var param;
			mom_ajax('R', 'reference.itemInfo.bom.bomIf', {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data != undefined && data[0].count != 0) {
//					this.popFlag = 'Y';
					param = {menuId: 'MOMIB002', progId: 'P_CREATE_BOM_IF'};
				} else {
//					this.popFlag = 'N';
					param = {};
				}
			}, undefined, undefined, this, 'async');
			
			this.initParam = param;
		}
			
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEP1') {
			if($("#itemId").val() == null || $("#itemId").val() == '') {
				$('itemId').val(param.childItemId);
			}	
			if($("#itemId").val() == '*') {
				param[0].itemId ='ALL';
			} else {
				param[0].itemId = $("#itemId").val(); /* 전체조회 아닐시 품목 input 박스  추가 */
			}
			
			param[0].inDeployment = $('#inDeployment').val();
			momWidget.findBtnClicked(0, true, param[0], function(result, data){
				AUIGrid.setGridData(momWidget.grid[0], data);
				momWidget.splashHide();
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}, indexInfo, this);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveLinkCopyBtn1') {
			if($("#itemId").val() == null || $("#itemId").val() == '') {
				$('itemId').val(param.childItemId);
//				momWidget.findBtnClicked(0, true, param, function(){
//					momWidget.splashHide();
//				}, indexInfo, this);
			}	
			$('#editPop1').momModal('hide');
			momWidget.splashHide();
			
			var itemId;
			if($("#itemId").val() == '*') {
				itemId ='ALL';
			} else {
				itemId = $("#itemId").val(); /* 전체조회 아닐시 품목 input 박스  추가 */
			}
			var form = {inDate: $('#inDate').val(), itemId: itemId, inDeployment: $('#inDeployment').val(), useYn: $('#useYn').val()};
			momWidget.findBtnClicked(0, true, form, function(result, data){
				AUIGrid.setGridData(momWidget.grid[0], data);
				momWidget.splashHide();
			}, indexInfo, this);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
	}, event: function() {
		$(document).on('click', '.bntpopclose, #closeBtn3', function() {
			$('#listPop1').momModal('hide');
		});
		
	}, grid: function() {
		var labelFunction = function(rowIndex, columnIndex, value, headerText, item, dataField) {
			return value == null ? value : value.replace(/ /gi, "&nbsp;");
		}
		
		var colLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
		var colIndex = AUIGrid.getColumnIndexByDataField(momWidget.grid[0], 'itemId2');
		if(colIndex != -1) {
			var col = colLayout[colIndex];
			col.labelFunction = labelFunction;
			col.renderer = {type: 'TemplateRenderer'};
			AUIGrid.setColumnProp(momWidget.grid[0], colIndex, col );
		}
		colIndex = AUIGrid.getColumnIndexByDataField(momWidget.grid[0], 'itemName2');
		if(colIndex != -1) {
			col = colLayout[colIndex];
			col.labelFunction = labelFunction;
			col.renderer = {type: 'TemplateRenderer'};
			AUIGrid.setColumnProp(momWidget.grid[0], colIndex, col );
		}
		
		AUIGrid.destroy(momWidget.grid[0]);
		AUIGrid.create(momWidget.grid[0], colLayout, momWidget.gridProperty[0]);
		AUIGrid.setGridData(momWidget.grid[0], []);
	}
};
$(document).ready(function(event){
	MOMIB002_1.menuCode = momWidget.getSearchParam()['bomType'];
	if(MOMIB002_1.menuCode == 'E') {
		MOMIB002_1.menuId = 'MOMIB007';
		$('#labelText').text('EBOM');
	} else {
		MOMIB002_1.menuId = 'MOMIB002';
		$('#labelText').text('BOM');
		$("#uploadBtn1").css('display','none')
	}
	
	
	
	momWidget.init(1, MOMIB002_1.menuId + '_1', MOMIB002_1);
	momWidget.init(3, 'MOMIB002_1', MOMIB002_1);
	MOMIB002_1.init();
	
});