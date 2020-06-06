var MOMIB003_1 = {
	initMessage: undefined,
	init: function() {		
		var that = this;
		Language.init(function() {
			that.event();
		});
	}, event: function() {
		// 이력조회 버튼
		$(document).on('click', '#histBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length <= 0 || checkedItems.length > 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10998']});
				return;
			}
			
			var param = {
				  itemId 	: checkedItems[0].item['itemId']
				, routeCd 	: checkedItems[0].item['routeCd']
				, resourceCd: checkedItems[0].item['resourceCd']
			}
			
			momWidget.findBtnClicked(1, true, param, undefined);
			
			$('#listPop1').momModal('show');
			//AUIGrid.resize(momWidget.grid[1]);
		});
		
		$(document).on('click', '#cancelBtn2, .bntpopclose', function() {
			$('#listPop1').momModal('hide');
		});
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo.op == 'saveBtnEP1') { //품목, 공정이 같은 다른 설비 bor 데이터를 등록할시 우선순위가 같은 것이 있으면 validation
			var checkResult = true;
			param.priority = param.altPriority;
			mom_ajax('R', 'reference.itemInfo.bor.priorityCheck', param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				for(var i = 0; data.length > i; i++) {
					if(param.priority == data[i].altPriority) {
						checkResult = false; 
						that.initMessage = Language.lang['MESSAGES10959'];
					}
				}
			}, undefined, undefined, this, 'sync');
		}
		
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB003_1', MOMIB003_1);
	momWidget.init(2, 'MOMIB003_1', MOMIB003_1);
	MOMIB003_1.init();
});