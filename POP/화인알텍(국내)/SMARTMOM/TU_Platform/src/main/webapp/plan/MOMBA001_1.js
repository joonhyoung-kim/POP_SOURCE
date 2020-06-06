var MOMBA001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	cudFlag 	: undefined,
	init: function() {
		Language.init(function() {
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html:Language.lang['MESSAGES10732']}); 
		} else if(indexInfo != undefined && indexInfo['op'] == 'orderCloseBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html:Language.lang['MESSAGES11249']});
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'excelUpload1' && indexInfo['sequence'] == 1) {
			$('#excelPop1').momModal('hide');
		}
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo.op == 'createBtn1') {
			cudFlag = 'C';
			$('#customerPoId1Label').find('.circle').addClass('bg-orange');
			$('#customerPoId1Label').find('.textblock').addClass('orange');
		} else if(indexInfo.op == 'editBtn1') {
			cudFlag = 'U';
			// 출고수량 0이면 MKT 수정 가능하도록 
			if($('#shipQtyEP1').val() == '' || $('#shipQtyEP1').val() == '0'){
				$("#marketCdEP1").jqxComboBox({disabled: false});
			} else {
				$("#marketCdEP1").jqxComboBox({disabled: true});
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn1' && indexInfo['sequence'] == 1) {
			var planDate = get_date_diff(0).replace(/-/gi, '');
			this.initParam = {planDate : planDate};
		} else if(indexInfo != undefined && indexInfo['op'] == 'orderCloseBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['orderState'] == 'C') {
					this.initMessage = Language.lang['MESSAGES11004'];
					return;
				}
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			if(cudFlag == 'U') {
				if($('#customerPoIdEP1').val() == '' && $('#customerPoNoEP1').val() == '') {
					this.initMessage = Language.lang['MESSAGES12134'];
				}
				
				var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
				this.initParam = {salesOrderId: selectItems[0].item['salesOrderId']};
			} else {
				if($('#customerPoIdEP1').val() == '') {
					this.initMessage = Language.lang['MESSAGES10164'];
				}
				
				this.initParam = {salesOrderId: ''}
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMBA001_1', MOMBA001_1);
    MOMBA001_1.init();
});
