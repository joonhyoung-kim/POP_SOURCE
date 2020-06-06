var MOMOA004 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			var that = this;
			$('.steup_line #ul input').attr('readonly','readonly');
			$('.steup_line #ul input').css({'text-align':'right'});
		});
		that. event();
	}/*, excelDownCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		that.getGridData();
	}*/, event: function() {
		var that = this;
		/*$(document).on('click', '#excelBtn1', function() {
			$('#editPop1').momModal('show');
		});
		$(document).on('click', '.bntpopclose, #closeBtn1', function() {
			$('#editPop1').momModal('hide');
		});*/
		$(document).on('click', '#findBtn1', function() {
			that.findClick();
		});
		$(document).on('click', '#excelDownAll2Btn1', function() {
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			var btwDays = Math.abs(toDate.getTime() - fromDate.getTime()) / (1000*60*60*24);
			if(fromDate > toDate){
				momWidget.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			if(btwDays > 31) {
				momWidget.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES12370']});
				return;
			}
			that.getGridData();
		});
	}, getGridData: function() {
		var that = this;
		var param = {fromDate: $('#fromDate').val(), toDate: $('#toDate').val()};
		momWidget.findBtnClicked(0, true, param, function(result, data) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.findBtnClicked(1, true, param, function(result1, data1) {
				AUIGrid.setGridData(momWidget.grid[1], data1);
				momWidget.findBtnClicked(2, true, param, function(result2, data2) {
					AUIGrid.setGridData(momWidget.grid[2], data2);
					momWidget.findBtnClicked(3, true, param, function(result3, data3) {
						AUIGrid.setGridData(momWidget.grid[3], data3);
						momWidget.findBtnClicked(4, true, param, function(result4, data4) {
							data = date2StringData19(data4, ['s5StartTm']);
							data = date2StringData19(data4, ['s5EndTm']);
							AUIGrid.setGridData(momWidget.grid[4], data4);
							momWidget.splashHide();
							setTimeout(function() {
								momWidget.procExcelDownAll2(0, 'MOMOA004', that);
							}, 40);
						}, undefined, that);
					}, undefined, that);
				}, undefined, that);
			}, undefined, that);
		}, undefined, that);
	}, findClick: function() {
		var that = this;
		mom_ajax('R', 'equipment.opcData.opcData1', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
					return;
			} else {
				$('#modelS1').val(data[0].s1UWorkmodel);
				$('#ctS1').val(data[0].s1UCt);
				$('#statusS1').val(data[0].s1UStatus);
				$('#qtyS1').val(data[0].s1UQty);
				$('#r1S1').val(data[0].s1R1Qty);
				$('#r2S1').val(data[0].s1R2Qty);
				$('#r3S1').val(data[0].s1R3Qty);
				$('#r4S1').val(data[0].s1R4Qty);
				$('#r5S1').val(data[0].s1R5Qty);
				
				$('#runS2').val(data[0].s2LAutorun);
				$('#countS2').val(data[0].s2UUpCount);
				
				$('#runS4').val(data[0].s4LAutorun);
				$('#countS4').val(data[0].s4UDnCount);
				
				$('#modelS3').val(data[0].s3LWorkmodel);
				$('#ctS3').val(data[0].s3UCt);
				$('#runS3').val(data[0].s3UAutorun);
				$('#qtyS3').val(data[0].s3UQty);
				$('#conUpS3').val(data[0].s3ConvUpConv);
				$('#sensor1S3').val(data[0].s3S1Sensor);
				$('#sensor2S3').val(data[0].s3S2Sensor);
				$('#sensor3S3').val(data[0].s3S3Sensor);
				$('#sensor4S3').val(data[0].s3S4Sensor);
				$('#sensor5S3').val(data[0].s3S5Sensor);
				$('#sensor6S3').val(data[0].s3S6Sensor);
				$('#sensor7S3').val(data[0].s3S7Sensor);
				$('#conDnS3').val(data[0].s3ConvDnConv);
				
//				$('#barS6').val(data[0].);
//				$('#startS6').val(data[0].);
				
			} 
		}, undefined, undefined, that, 'sync');
		
		mom_ajax('R', 'equipment.opcData.opcData2', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
					return;
			} else {
				$('#barS5').val(data[0].s5Barcode);
				$('#startS5').val(data[0].s5StartTm);
				$('#endS5').val(data[0].s5EndTm);
				$('#topS5').val(data[0].s5TopJudge);
				$('#bottomS5').val(data[0].s5BottomJudge);
				$('#leftS5').val(data[0].s5LeftJudge);
				$('#rightS5').val(data[0].s5RightJudge);
				$('#judgeS5').val(data[0].s5EntireJudge);
			}
			
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMOA004', MOMOA004);
	momWidget.init(2, 'MOMOA004', MOMOA004);
	momWidget.init(3, 'MOMOA004', MOMOA004);
	momWidget.init(4, 'MOMOA004', MOMOA004);
	momWidget.init(5, 'MOMOA004', MOMOA004);
    MOMOA004.init();
});