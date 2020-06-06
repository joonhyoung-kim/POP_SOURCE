//2020.04.16 박연주 코드관리 페이지 XMOM 변환
var MOMJA001_1 = {
	initMessage : undefined,
	initParam : undefined,
	groupDelMsg : undefined,
	codeClassId : undefined,
	init : function() {
		var that = this;

		Language.init(function() {
		});

		momWidget.splitter('.h01-h', 'vertical', 400, false);
	},
	retrieveCallBack : function(result, data, param, callBackParam, indexInfo) {
		var index = (indexInfo != undefined
				&& indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex']
				: indexInfo['index'];

		if (result != 'SUCCESS') {
			if (index == 1) {
				this.initParam = undefined;
			}

			momWidget.splashHide();
			return;
		}

		AUIGrid.setGridData(momWidget.grid[index], data);

		momWidget.splashHide();
	},
	createCallInit : function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex']
				: index;
		if (index == 1) {
			var that = this.init != undefined ? this : this.MOMJA001_1;
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if (selectItems.length < 1) {
				that.initMessage = Language.lang['MESSAGES11503'];
				return;
			}

			$('#codeClassIdEP2').val(this.codeClassId);
		}
	}, delCallInit : function(index, param, callBackParam, indexInfo) {
		var that = this;
		
		if (indexInfo != undefined && indexInfo['op'] == 'delCodeBtn1' && indexInfo['sequence'] == 1) {
			that.groupDelMsg = Language.lang['MESSAGES12455'];
			
			
		}
	}, cellClickCallBack : function(index, e) {
		if (index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.codeClassId = item['codeClassId'];
		}
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMJA001_1', MOMJA001_1);
	momWidget.init(2, 'MOMJA001_1', MOMJA001_1);
	MOMJA001_1.init();
});