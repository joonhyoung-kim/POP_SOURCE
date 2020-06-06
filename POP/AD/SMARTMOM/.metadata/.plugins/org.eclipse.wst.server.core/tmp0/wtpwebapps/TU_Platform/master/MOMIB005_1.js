var MOMIB005_1 = {
	reqParam: undefined,
	initMessage: undefined,
	init: function() {		
		Language.init(function() {
			
		});
		this.event();
	}, event: function() {
		$(document).on('change', '#measureMethodEP1', function() {
			if($('#measureMethodEP1').val() == 'NUMBERLESS') {
				$('#target1Label, #usl1Label, #lsl1Label').find('.circle').addClass('bg-orange');
				$('#target1Label, #usl1Label, #lsl1Label').find('.textblock').addClass('orange');
				reqParam = 'Y';
				
			} else {
				$('#target1Label, #usl1Label, #lsl1Label').find('.circle').removeClass('bg-orange');
				$('#target1Label, #usl1Label, #lsl1Label').find('.textblock').removeClass('orange');
				reqParam = 'N';
			}
		});
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo.op == 'saveBtnEP1' && reqParam == 'Y') {
			if($("#targetEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES10083'];
				return;
			}
			if($("#uslEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES10092'];
				return;
			}
			if($("#lslEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES10042'];
				return;
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB005_1', MOMIB005_1);
	MOMIB005_1.init();
});