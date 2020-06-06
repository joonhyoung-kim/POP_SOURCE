var MOMIB005_1 = {
	reqParam: undefined,
	initMessage: undefined,
	init: function() {		
		Language.init(function() {
			
		});
		this.event();
	}, event: function() {
		$(document).on('change', '#measureMethodEP1', function() {
			if( ($('#measureMethodEP1').val() == 'NUMBERLESS' && $('#targetTypeEP1').val() == '') 
			 || ($('#measureMethodEP1').val() == 'NUMBERLESS' && $('#targetTypeEP1').val() == 'ALL') ) {
				$('#targetType1Label, #target1Label, #usl1Label, #lsl1Label').find('.circle').addClass('bg-orange');
				$('#targetType1Label, #target1Label, #usl1Label, #lsl1Label').find('.textblock').addClass('orange');
				reqParam = 'Y';
			} else if($('#measureMethodEP1').val() == 'NUMBERLESS' && $('#targetTypeEP1').val() == 'USL') {
				$('#targetType1Label, #target1Label, #usl1Label').find('.circle').addClass('bg-orange');
				$('#targetType1Label, #target1Label, #usl1Label').find('.textblock').addClass('orange');
				$('#lsl1Label').find('.circle').removeClass('bg-orange');
				$('#lsl1Label').find('.textblock').removeClass('orange');
				reqParam = 'Y';
			} else if($('#measureMethodEP1').val() == 'NUMBERLESS' && $('#targetTypeEP1').val() == 'LSL') {
				$('#targetType1Label, #target1Label, #lsl1Label').find('.circle').addClass('bg-orange');
				$('#targetType1Label, #target1Label, #lsl1Label').find('.textblock').addClass('orange');
				$('#usl1Label').find('.circle').removeClass('bg-orange');
				$('#usl1Label').find('.textblock').removeClass('orange');
				reqParam = 'Y';
			} else if($('#measureMethodEP1').val() == 'COUNT') {
				$('#targetType1Label, #target1Label, #usl1Label, #lsl1Label').find('.circle').removeClass('bg-orange');
				$('#targetType1Label, #target1Label, #usl1Label, #lsl1Label').find('.textblock').removeClass('orange');
				reqParam = 'N';
			}
		});
		
		$(document).on('change', '#targetTypeEP1', function() {
			if($('#targetTypeEP1').val() == 'USL') {
				$('#usl1Label').find('.circle').addClass('bg-orange');
				$('#usl1Label').find('.textblock').addClass('orange');
				$('#lsl1Label').find('.circle').removeClass('bg-orange');
				$('#lsl1Label').find('.textblock').removeClass('orange');
				
			} else if($('#targetTypeEP1').val() == 'LSL') {
				$('#lsl1Label').find('.circle').addClass('bg-orange');
				$('#lsl1Label').find('.textblock').addClass('orange');
				$('#usl1Label').find('.circle').removeClass('bg-orange');
				$('#usl1Label').find('.textblock').removeClass('orange');
			} else {
				$('#usl1Label, #lsl1Label').find('.circle').addClass('bg-orange');
				$('#usl1Label, #lsl1Label').find('.textblock').addClass('orange');
			}
		});
		
		$(document).on("change", "#measureTypeEP1", function() {
			if($("#measureTypeEP1").val() == "PQC") {
				$("#fpPqcFlagEP1, #mpPqcFlagEP1, #lpPqcFlagEP1").jqxComboBox({disabled: false});
				$("#fpPqcFlagEP1").val('Y');
				$("#mpPqcFlagEP1").val('Y');
				$("#lpPqcFlagEP1").val('Y');
				
				mom_ajax('R', 'common.comItemId', {itemType : "'FP', 'SP'"}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					}
					
					$('#itemIdEP1').jqxComboBox("clear");
					$('#itemIdEP1').jqxComboBox("source", []);
					$('#itemIdEP1').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true});
					
					var items = $('#itemIdEP1').jqxComboBox('source');
					for(var j = 0; j < data.length; j++) {
						items.push({ label: data[j]['name'], value: data[j]['code'] });
					}
					
					$('#itemIdEP1').jqxComboBox('source', items);
					
				}, undefined, undefined, this, 'sync');
				
			} else if($("#measureTypeEP1").val() == "IQC") {
				$("#fpPqcFlagEP1").val("");
				$("#mpPqcFlagEP1").val("");
				$("#lpPqcFlagEP1").val("");
				$("#fpPqcFlagEP1, #mpPqcFlagEP1, #lpPqcFlagEP1").jqxComboBox({disabled: true});
				
				mom_ajax('R', 'common.comItemId', {itemType : "'RM', 'SM', 'CI', 'GI'"}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					}
					
					$('#itemIdEP1').jqxComboBox("clear");
					$('#itemIdEP1').jqxComboBox("source", []);
					$('#itemIdEP1').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true});
					
					var items = $('#itemIdEP1').jqxComboBox('source');
					for(var j = 0; j < data.length; j++) {
						items.push({ label: data[j]['name'], value: data[j]['code'] });
					}
					
					$('#itemIdEP1').jqxComboBox('source', items);
					
				}, undefined, undefined, this, 'sync');
				
			} else {
				$("#fpPqcFlagEP1").val("");
				$("#mpPqcFlagEP1").val("");
				$("#lpPqcFlagEP1").val("");
				$("#fpPqcFlagEP1, #mpPqcFlagEP1, #lpPqcFlagEP1").jqxComboBox({disabled: true});
				
				mom_ajax('R', 'common.comItemId', {itemType : "'FP', 'SP'"}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					}
					
					$('#itemIdEP1').jqxComboBox("clear");
					$('#itemIdEP1').jqxComboBox("source", []);
					$('#itemIdEP1').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true});
					
					var items = $('#itemIdEP1').jqxComboBox('source');
					for(var j = 0; j < data.length; j++) {
						items.push({ label: data[j]['name'], value: data[j]['code'] });
					}
					
					$('#itemIdEP1').jqxComboBox('source', items);
					
				}, undefined, undefined, this, 'sync');
			}
		});
		
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo.op == 'saveBtnEP1' && reqParam == 'Y') {
			if($("#targetTypeEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES12459'];
				return;
			}
			
			if($("#targetEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES10083'];
				return;
			}
			
			if($("#targetTypeEP1").val() == "ALL" || $("#targetTypeEP1").val() == "USL") {
				if($("#uslEP1").val() == '') {
					this.initMessage = Language.lang['MESSAGES10092'];
					return;
				}
			}
			
			if($("#targetTypeEP1").val() == "ALL" || $("#targetTypeEP1").val() == "LSL") {
				if($("#lslEP1").val() == '') {
					this.initMessage = Language.lang['MESSAGES10042'];
					return;
				}
			}
		}
		
		if($("#measureTypeEP1").val() == "PQC") {
			if($("#fpPqcFlagEP1").val() == '' && $("#mpPqcFlagEP1").val() == '' && $("#lpPqcFlagEP1").val() == '') {
				this.initMessage = Language.lang['MESSAGES12453'];
				return;
			}
			
			if($("#fpPqcFlagEP1").val() == 'N' && $("#mpPqcFlagEP1").val() == 'N' && $("#lpPqcFlagEP1").val() == 'N'
			  || $("#fpPqcFlagEP1").val() == 'N' && $("#mpPqcFlagEP1").val() == 'N' && $("#lpPqcFlagEP1").val() == ''
			  || $("#fpPqcFlagEP1").val() == 'N' && $("#mpPqcFlagEP1").val() == '' && $("#lpPqcFlagEP1").val() == ''
			  || $("#fpPqcFlagEP1").val() == 'N' && $("#mpPqcFlagEP1").val() == '' && $("#lpPqcFlagEP1").val() == 'N'
			  || $("#fpPqcFlagEP1").val() == '' && $("#mpPqcFlagEP1").val() == 'N' && $("#lpPqcFlagEP1").val() == 'N'
			  || $("#fpPqcFlagEP1").val() == '' && $("#mpPqcFlagEP1").val() == 'N' && $("#lpPqcFlagEP1").val() == ''
			  || $("#fpPqcFlagEP1").val() == '' && $("#mpPqcFlagEP1").val() == '' && $("#lpPqcFlagEP1").val() == 'N') {
				this.initMessage = Language.lang['MESSAGES12475'];
				return;
			}
		}
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo.op != undefined && indexInfo.op == 'createBtn1') {
			$("#fpPqcFlagEP1, #mpPqcFlagEP1, #lpPqcFlagEP1").jqxComboBox({disabled: true});
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB005_1', MOMIB005_1);
	MOMIB005_1.init();
});