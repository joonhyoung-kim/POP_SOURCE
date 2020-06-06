var MOMFB002 = {
	init: function() {
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				date2String19(momWidget.grid[0], ['needByDate','orderDate','transferDate']);
				mom_ajax('R', 'common.b2biDeployTime?b2biType=PO', {}, function(result, data, call_back_param, flag, your) {
					if(result == 'SUCCESS' && data != undefined && data.length > 0){
						$('#deployTime1').text(Language.lang['MESSAGES11902'] + data[0].deployTime);
					}
				});
			});
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			if(indexInfo != undefined && indexInfo['op'] == 'currentAffair1' && indexInfo['sequence'] == 2) {
				if(data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
					momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.getLang(data['p_err_msg'])});
				} else {
					momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.getLang['MESSAGES10821']});
				}
			}
			
			return;
		}
		
		
		if(indexInfo != undefined && indexInfo['op'] == 'currentAffair1' && indexInfo['sequence'] == 2) {
			indexInfo['sequence'] += 1;
			mom_ajax('R', 'common.b2biDeployTime?b2biType=PO', {}, function(result, data) {
				if(result == 'SUCCESS' && data != undefined && data.length > 0) {
					momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					$('#deployTime1').text(Language.lang['MESSAGES11902'] + data[0]['deployTime'] + ' / ' + Language.lang['MESSAGES10747'] + ' : ' + data[0]['updateBy']);
				} else {
					momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.getLang['MESSAGES10821']});
				}
			});
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
	} 
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB002', MOMFB002);
	MOMFB002.init();
});