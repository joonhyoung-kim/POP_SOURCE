var MOMDA006_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	facilityType 		: undefined,
	
	init: function() {	
		var facilityType = momWidget.getSearchParam()['facilityType'];
		if (facilityType == 'MAT') {
			this.facilityType = "'FAC200'";
		} else if (facilityType == 'WO') {
			this.facilityType = "'FAC300', 'FAC500'";
		} else if (facilityType == 'SO') {
			this.facilityType ="'FAC400', 'FAC700'";
		}
		
		$("#fromDate").datetimepicker({maxDate : new Date()});
		
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(2, function() {
					that.grid();
					momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		this.initMessage = undefined;
		
		if(index == 0) {
			this.initParam = {sysDateFlag : $('#fromDate').val() == get_date_diff(0) ? 'Y' : 'N'};
		} else {
			$('#moItem').val(param['itemId']);
			$('#moLocation').val(param['locationCd']);
			
			$('#moFromDate, #moToDate').datetimepicker({
				maxDate : new Date(),
				timepicker:false, 
				format:'Y-m-d'
			});
			
			$('#moFromDate').val(get_date_diff(-1));
			$('#moToDate').val(get_date_diff(0));
			
			this.initParam = {moFromDate : $('#moFromDate').val(), moToDate : $('#moToDate').val(), moItem : $('#moItem').val(), moLocation : $('#moLocation').val()};
		}
	}, grid: function() {
		var that = this.init != undefined ? this : this.MOMDA006_1;
		
		var data = $('#facilityType').jqxComboBox('source');
		if(data == undefined || data.length < 1) {
			setTimeout(that.grid, 40);
			return;
		}
		
		$('#facilityType').jqxComboBox('checkIndex', 0);
		$('#facilityType').jqxComboBox('checkIndex', 1);
		$('#facilityType').jqxComboBox('checkIndex', 2);
		$('#facilityType').jqxComboBox('checkIndex', 4);
	}
};
 
$(document).ready(function(event){
	momWidget.init(1, 'MOMDA006_1', MOMDA006_1);
	momWidget.init(3, 'MOMDA006_1', MOMDA006_1);
	MOMDA006_1.init();
});