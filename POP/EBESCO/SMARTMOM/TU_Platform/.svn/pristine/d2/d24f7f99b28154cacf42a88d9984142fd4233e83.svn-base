var MOMBB003_1 = {
	initMessage	: undefined,
	initParam	: undefined,
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var fromDate = new Date($('#fromDate').val());
			var toDate = new Date($('#toDate').val());
			var planIdDate = new Date(to_date_yyyy_mm_dd($('#planId').val().substr(0,8)));
			if(fromDate > toDate) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			} else if(fromDate < planIdDate) {
				this.initMessage = Language.lang['MESSAGES10061'];
				return;
			}
			
			this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 1, "TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD')", "QTY, 0)))")};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[indexInfo['index']]);	
			var changeColumn = [];
			if(data.length != 0) {
				for(var i = 0; i <= columnLayout.length; i++) {
					if(columnLayout[i] != undefined && columnLayout[i].headerText != undefined) {
						changeColumn.push(columnLayout[i]);
					}
				}
				
				$.each(data[0], function(key, value){
					if(key.match('/')) {
						var columnObj = {dataField: key, style: 'right-column', dataType: 'numeric', formatString: '#,###'};
						changeColumn.push(columnObj);
					}
				});		
				AUIGrid.changeColumnLayout(momWidget.grid[indexInfo['index']], changeColumn);
			}
			
			AUIGrid.setGridData(momWidget.grid[indexInfo['index']], data);
			momWidget.splashHide();
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'createPlanBtn1' && indexInfo['sequence'] == 1) {
			var planId = get_date_diff(0).replace(/-/gi,'') + '_P';
			if($('#planId').val() != planId) {
				this.initMessage = Language.lang['MESSAGES12078'];
				return;
			}
			
			this.initParam = {planId : planId};
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'createPlanBtn1' && indexInfo['sequence'] == 1) {
			momWidget.splashHide();
			momWidget.messageBox({type:'success', width:'400', height: '145', html:Language.lang['MESSAGES10620']});
			momWidget.setPlanIdDate();
		}
	}, event: function() {
		$(document).on('change','#planId',function() {
			momWidget.setPlanIdDate();
        });	
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMBB003_1', MOMBB003_1);
       MOMBB003_1.init();
});









