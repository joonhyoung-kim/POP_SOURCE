var MOMDA016= {
	initMessage : undefined,
	initParam : undefined,
	cellClickCallInitParam : undefined,
	init: function() {   
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				that.event();
				that.design();
			});
		});
	}, grid: function() {
//		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'outLocationCd', {
//			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				if(item.cancelQty > 0 || item.requestState == 'R'){
//					return 'cancelStyle';
//				}
//			}
//		});	
//		
//		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'requestDate', {
//			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				if(item.cancelQty > 0 || item.requestState == 'R'){
//					return 'cancelStyle';
//				}
//			}
//		});	
//		
//		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'requestQty', {
//			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				if(item.cancelQty > 0 || item.requestState == 'R'){
//					return 'cancelStyle';
//				}
//			}
//		});	
//		
//		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'reasonCode', {
//			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
//				if(item.cancelQty > 0 || item.requestState == 'R'){
//					return 'cancelStyle';
//				}
//			}
//		});	
//		
//		AUIGrid.bind(momWidget.grid[0], 'cellEditBegin', function(e) {
//			AUIGrid.setProp(momWidget.grid[0], 'exportURL', '0');
//			if(e.item.cancelQty > 0 || e.item.requestState == 'R'){
//				return false;
//			}
//		});
//		
		AUIGrid.bind(momWidget.grid[0], "rowCheckClick", function( e ) {
			var checkedItem = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(e.item.cancelQty != null || e.item.cancelQty != 0 || item.requestState != 'R') {
				AUIGrid.addUncheckedRowsByValue(e.pid, "requestState", "R");
			}
			
		});
		
		 var indeterminate = false;	
			AUIGrid.bind(momWidget.grid[0], "rowAllChkClick", function( e ) {
				if(indeterminate) {
					AUIGrid.setCheckedRowsByValue(e.pid, "requestState", []);
					indeterminate = false;
				} else {
					var allDate = AUIGrid.getGridData(momWidget.grid[0]);
					var uniqueValues = AUIGrid.getColumnDistinctValues(e.pid, "requestState");
					uniqueValues.splice(uniqueValues.indexOf("0"),1);
					AUIGrid.addUncheckedRowsByValue(e.pid, 'requestState', uniqueValues);
					indeterminate = true;
				}
			});
    	   
	}, event: function() {
		$(document).on('click', '#toLocationCd', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length == 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
				return;
			}
		});
		$(document).on('change', '#toLocationCd', function() {
   			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
   			var toLocationCd = $('#toLocationCd').val();
   			for(var i = 0; i < checkedItems.length; i++) {
				AUIGrid.setCellValue(momWidget.grid[0], checkedItems[i].rowIndex, 'outLocationCd', toLocationCd);
   			}
   		});
		
   	}, saveCallInit: function(index, param, callbackParam, indexInfo) {
//   		if(index == 0 && indexInfo.op == 'saveBtn1') {
//   			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
//   			for(var i = 0; i < checkedItems.length; i++) {
//   				if(checkedItems[i].item.issueQty != '0' && checkedItems[i].item.issueQty != null && checkedItems[i].item.requestQty < checkedItems[i].item.issueQty) {
//   					this.initMessage = Language.lang['MESSAGES12182'];
//   					
//   				}
//   			}
//   		}
   		if(index == 0 && indexInfo.op == 'requestCancelBtn1') {
   			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
   			for(var i = 0; i < checkedItems.length; i++) {
   				var calcCancelQty = 0;
   				if(checkedItems[i].item.issueQty == '0' || checkedItems[i].item.issueQty == null) {
   					this.initParam = {calcCancelQty : checkedItems[i].item.requestQty};
   				} else {
   					this.initParam = {calcCancelQty : checkedItems[i].item.requestQty - checkedItems[i].item.issueQty};
   				}
   			}
   		}
   	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
//		if(indexInfo != undefined && indexInfo['op'] == 'saveBtn1') {
//    		if(result == 'SUCCESS') {
//    			for(var i = 0; i < param.length; i++) {
//    				if(param[i].requestQty - param[i].issueQty < 1) {
//    					mom_ajax('U', 'workOrder.sampleRequestStatus.sampleRequestStatusClose', JSON.stringify(param[i]), function(result, data) {
//    						if(result != 'SUCCESS') {
//    							momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
//    							return;
//    						}
//    					}, undefined, undefined, this, 'sync');
//    				} 
//    			}
//    			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
//	   		} else {
//	   			momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
//	   		}
//		} else 
			if(indexInfo != undefined && indexInfo['op'] == 'requestCancelBtn1') {
			if(result == 'SUCCESS') {
				momWidget.findBtnClicked(0, false, {}, undefined, indexInfo, this);
    			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
	   		} else {
	   			momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}
		momWidget.splashHide();
	}, cellClickCallInit : function(index, e) {
		if(e.type == 'cellClick') {
			if(e.item.requestState != 'R') {
				AUIGrid.setProp(momWidget.grid[0], "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp(momWidget.grid[0], 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp(momWidget.grid[0], 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			}
			
		this.cellClickCallInitParam = 'click';
		}
   	}, design: function(){
		$("head").append('<style>.cancelStyle{ background: #FFF !important;}</style>');	
	},
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA016', MOMDA016);
	MOMDA016.init();
});