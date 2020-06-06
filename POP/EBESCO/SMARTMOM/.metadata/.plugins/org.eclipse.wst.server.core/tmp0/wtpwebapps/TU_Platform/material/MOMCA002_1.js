var MOMCA002_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	excelDownParam	: undefined,
	
	init: function() {	
		Language.init(function() {
		});
		
		this.event();
		this.design();
	}, loadCallInit: function() {
		this.grid();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 0)};
			var fromDate = $("#fromDate").val().split('-')[0] + $("#fromDate").val().split('-')[1] + $("#fromDate").val().split('-')[2];
			
			if($("#fromDate").val() == '' || $("#toDate").val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			}
			
			if($("#fromDate").val() > $("#toDate").val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
			
			if($("#planId").val().substr(0,8) > fromDate) {
				this.initMessage = Language.lang['MESSAGES10061'];
				return;
			}
			
		} else if(indexInfo != undefined && indexInfo['op'] == 'mrpBtn1' && indexInfo['sequence'] == 2) {
			this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), $('#toDate').val(), 0)};
			this.initParam['planner'] = $('#username').val();
		} else if(indexInfo != undefined && indexInfo['op'] == 'findBtn3') {
			this.initParam = {pPartNo: $('#itemId').val(), pVendorId: this.getCheckedVendorList()};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);				
			for(var i = columnLayout.length -1; i > 3; i--){
				AUIGrid.removeColumn(momWidget.grid[0], i);
			}
	
			if(data.length > 0) {
				$.each(data[0], function(key, value) {
					if(key.match('/')) {
						var columnObj = {dataField: key, editable: false, width: 100, dataType: 'numeric', formatString: '#,###', style: 'right-column',
							styleFunction:  function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.category.match(Language.lang['MESSAGES11744'])) {
									if(parseInt(value) < 0){
										return 'redStyle';
									} else {
										return null;
									}
								} else if(item.category == Language.lang['MESSAGES11745']) {
									if(value != undefined && value != '') {
										return 'yellowStyle';
									} else {
										return null;
									}
								} else {
									return null;
								}
							}
						};
						
						AUIGrid.addColumn(momWidget.grid[0], columnObj, 'last');
					}
				});
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'mrpBtn1' && indexInfo['sequence'] == 2) {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
			
			momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'mrpBtn1' && indexInfo['sequence'] == 1) {
			if(param == undefined || param != undefined && param['planId'] == undefined) {
				this.initMessage = Language.lang['MESSAGES10328'];
				return;
			}
			
			this.initParam = {planId: param['planId']};
			this.initMessage = 'CLEAR_PARAM';
		} else if(indexInfo != undefined && indexInfo['op'] == 'orderBtn3' && indexInfo['sequence'] == 2) {
			var arrayList = [];
			var seq = 0;
			for(var i=0; i<param.length; i++) {
				seq = i+1;
				this.initParam = {orderType : 'SYSTEM', seq : seq};
				arrayList.push(this.initParam);
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'orderBtn3' && indexInfo['sequence'] == 3) {
			this.initMessage = 'CLEAR_PARAM';
//			this.initParam = {orderType : 'SYSTEM'};
		}
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'orderBtn3' && indexInfo['sequence'] == 3) {
			var param = {
				planId: $('#planId').val(),
				fromDate: $('#fromDate').val(),
				toDate: $('#toDate').val(),
				shortagePeriod: $('#shortagePeriod').val(),
				pPartNo: $('#pPartNo').val(),
				pVendorId: this.getCheckedVendorList()
			}
			
			mom_ajax('R', 'purchase.purchasing.regularOrder.reqularOrderDetail', param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[2], data);
				momWidget.splashHide();
				
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}, undefined, undefined, this, 'sync');
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'orderBtn3' && indexInfo['sequence'] == 1) {
			this.initParam = {orderType : 'SYSTEM'};
		}
	}, grid: function() {
		var column = [{
			headerText: Language.lang['MESSAGES12190'],
			children: [{
				headerText: Language.lang['MESSAGES10198'],
	    		children: [{
	    			headerText: Language.lang['MESSAGES11585'],
	    			children:[{
						 headerText: Language.lang['MESSAGES10824'],
						 children: [{
							 dataField: 'col1',
    						 headerText: Language.lang['MESSAGES10234'],
    						 width: 120
						 }]
	    			}]
	    		}]
			}] // end of children
		},{
			headerText: Language.lang['MESSAGES11584'],
			children: [{
				headerText: Language.lang['MESSAGES11565'],
	    		children: [{
	    			headerText: Language.lang['MESSAGES10308'],
	    			children:[{
						 headerText: Language.lang['MESSAGES11050'],
						 children: [{
							 dataField: 'col2',
    						 headerText: Language.lang['MESSAGES10522'],
    						 width: 120
						 }]
	    			 }]
    			}]
			}] // end of children
		},{
			headerText: Language.lang['MESSAGES10855'],
			children: [{
				headerText: Language.lang['MESSAGES11613'],
				children: [{
					headerText: Language.lang['MESSAGES11292'],
	    			children:[{
	    				headerText: Language.lang['MESSAGES10458'],
	    				children: [{
							dataField: 'col3',
    						headerText: Language.lang['MESSAGES10849'],
    						width: 120
						}]
	    			}]
    			}]
			}] // end of children	
		}];
							
		AUIGrid.addColumn(momWidget.grid[0], column, 'first');	
		AUIGrid.setProp(momWidget.grid[0], 'editable', false);
		AUIGrid.setProp(momWidget.grid[2], {'editBeginMode' : 'click'});
		
		$(document).on('click', '#popClose, .bntpopclose', function() {
			$('#orderPop1').momModal('hide');
		});
	}, getCheckedVendorList: function() {
		var checkedVendorList = '(';
		var checkedItemList = $('#pVendorCd').jqxComboBox('getCheckedItems');
		if(checkedItemList.length > 0) {
			$.each(checkedItemList, function(index) {
				if(checkedItemList.length-1 != index) {
					checkedVendorList += "'" + this.value + "',"
				} else {
					checkedVendorList += "'" + this.value + "')"
				}
			});
		} else {
			checkedVendorList = '';
		}	
		
		return checkedVendorList;
	}, getPopVendorList: function() { // 발주 팝업 내 업체 검색조건
		momWidget.setFilterPropByDropDown('pVendorCd', 'purchase.purchasing.regularOrder.vendorSet', {planId: $('#planId').val(), fromDate: $('#fromDate').val(), vendorId: $('#vendorId').val(), shortagePeriod: $('#shortagePeriod').val()});
	}, excelDownCallInit: function(index, param, callBackParam, indexInfo) {         
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}, event: function() {
		$(document).on('change', '#planId', function() {
			momWidget.setPlanIdDate(1);  // 공통위젯 parameter 수정
		});		
		
		var that = this;
		$(document).on('click', '#orderBtn1', function() {
			var row = AUIGrid.getRowCount(momWidget.grid[0]);
			if(row <= 0) {
				momWidget.messageBox({type:'warning', width:'400', height: '145',  html:Language.lang['MESSAGES10329']});
				return;
			}
			
			$('#orderPop1').momModal('show');
			AUIGrid.clearGridData(momWidget.grid[2]);
			//AUIGrid.resize(momWidget.grid[2]); 
			that.getPopVendorList();
		});
		
	}, design: function() {
		$('head').append('<style>.columnStyle{ background: #C7E8FD;}</style>');
		$('head').append('<style>.redStyle{ background: #FF0000;}</style>');
		$('head').append('<style>.yellowStyle{ background: #FFF612;}</style>');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMCA002_1', MOMCA002_1);
	momWidget.init(3, 'MOMCA002_1', MOMCA002_1);
	MOMCA002_1.init();
});