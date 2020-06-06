var MOMFB008 = {
	fromDate		: undefined,
	excelDownParam 	: undefined,
	
	init: function() {
		Language.init(function() {
			$("#fromDate").jqxComboBox({disabled: true});
			$("#dropdownlistContentfromDate").css({color:"#000"});
		});
	}, grid2CallInit: function(callBack) {
		var that = this.init != undefined ? this : this.MOMFB008;
		
		var workDate = $('#fromDate').val();
		if(workDate == undefined || workDate == '') {
			setTimeout(that.grid2CallInit, 40, callBack);
			return;
		}
		
		var params = {
			fromDate : workDate.replace(/-/gi,'')
		}
		
		callBack(params);
		
		that.fromDate = params['fromDate'];
		momWidget.dropDownPost(0, undefined, undefined, undefined, that);
		/*mom_ajax('R', 'plan.order.itemFcst.itemFcstSearchOrg', params, function(result, data) {
		$('#orgCode').jqxComboBox({width : $('#orgCode').width() + 26, height : 24, dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
		$('#orgCode').removeClass('w-select');
		
		var items = $('#orgCode').jqxComboBox('source');
		for(var j = 0; j < data.length; j++) {
			items.push({ label: data[j]['name'], value: data[j]['code'] });
		}
		
		$('#orgCode').jqxComboBox('source', items);
		});*/		
	}, excelDownCallInit(index, param, callBackParam, indexInfo) {         
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[index]);
	}	
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMFB008', MOMFB008);
	MOMFB008.init();
});