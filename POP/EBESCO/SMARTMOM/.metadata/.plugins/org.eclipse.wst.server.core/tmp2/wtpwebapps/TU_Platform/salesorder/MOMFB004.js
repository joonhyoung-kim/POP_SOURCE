var MOMFB004 = {
	init: function() {
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				date2String19(momWidget.grid[0], ['receivingDate','departureDate','transferDate']);
				mom_ajax('R', 'common.b2biDeployTime?b2biType=RCV', {}, function(result, data) {
					if(result == 'SUCCESS' && data != undefined && data.length > 0) {
						$('#deployTime1').text(Language.lang['MESSAGES11902'] + data[0]['deployTime']);
					}
				});
			});
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			if(indexInfo != undefined && (indexInfo['op'] == 'currentAffair1' || indexInfo['op'] == 'createDepartureBtn1') && indexInfo['sequence'] == 2) {
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
			mom_ajax('R', 'common.b2biDeployTime?b2biType=RCV', {}, function(result1, data1) {
				if(result1 == 'SUCCESS' && data1 != undefined && data1.length > 0) {
					momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					$('#deployTime1').text(Language.lang['MESSAGES11902'] + data1[0]['deployTime'] + ' / ' + Language.lang['MESSAGES10747'] + ' : ' + data1[0]['updateBy']);
				} else {
					momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.getLang['MESSAGES10821']});
				}
			});
		} else if(indexInfo != undefined && indexInfo['op'] == 'createDepartureBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB004', MOMFB004);
	MOMFB004.init();
});