var MOMBA008= {
	initMessage	: undefined,
	initParam	: undefined,
	
	dueDate 	: undefined,
	itemId 		: undefined,
	mergeId		: undefined,
	salesChangeFlag : undefined,
	init: function() {  
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
					that.design();
				});
			});
		});
		
		this.event();
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'changeDateBtn1' && indexInfo['sequence'] == 1) {
			for(var i =0; i < param.length; i++) {
				if(param[i]['resultFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES12473'];
				} 
			}
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'bundleCancelBtn1' && indexInfo['sequence'] == 1) {
			for(var i =0; i < param.length; i++) {
				if(param[i]['resultFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES12474'];
				} 
			}
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2') {
			if(that.salesChangeFlag == 'Y') {
				this.initMessage = Language.lang['MESSAGES12477'];
			}
			that.initParam = {changeType: 'DEL'};
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3') {
			that.initParam = {mergeId: that.mergeId
							, changeType: 'ADD'};
		}
		
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		
		if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2') {
			momWidget.findBtnClicked(0, false, undefined, function(result1, data1) {
				AUIGrid.setGridData(momWidget.grid[0], data1);
				momWidget.findBtnClicked(1, false, callBackParam[0], function(result2, data2) {
					AUIGrid.setGridData(momWidget.grid[1], data2);
				}, undefined, that);
			}, undefined, that);
			momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
			momWidget.splashHide();
		}
		if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3') {
			momWidget.findBtnClicked(0, false, undefined, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				
				$('#listPop1').momModal('hide');
				AUIGrid.setGridData(momWidget.grid[0], data1);
				var dueDate = dueDate = AUIGrid.getGridData(momWidget.grid[1]).length == 0 ? that.dueDate : AUIGrid.getGridData(momWidget.grid[1])[0].dueDate;
				$('#fromDate2').val(dueDate);
				$('#toDate2').val(get_date_diff2(dueDate, 28));
				$('#customerCd').val();
				$('#poId').val();
				$('#poNo').val();
				$('#modelSuffix').val();
				$('#resultQty2').val();
				$('#orgCode').val();
				AUIGrid.clearGridData(momWidget.grid[2]);
				momWidget.findBtnClicked(1, false, callBackParam[0], function(result2, data2) {
					AUIGrid.setGridData(momWidget.grid[1], data2);
				}, undefined, that);
			}, undefined, that);
			momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
			momWidget.splashHide();
		}
		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			that.initParam = undefined;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn3') {
			that.initParam = {fromDate: $('#fromDate2').val()
					, toDate: $('#toDate2').val()
					, itemId: $('#itemId2').val()
					, customerCd: $('#customerCd').val()
					, poId: $('#poId').val()
					, poNo: $('#poNo').val()
					, modelSuffix: $('#modelSuffix').val()
					, resultQty: $('#resultQty2').val()
					, orgCode: $('#orgCode').val()};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] != 'CD1' && indexInfo['op'] != 'findBtn1' && indexInfo['op'] != 'findBtn3') {
			momWidget.messageBox({type: 'success', width: '400', height: '145',  html: Language.lang['MESSAGES10692']});
		}
		if(indexInfo != undefined && indexInfo['op'] == 'CD1') {
			that.dueDate = param.dueDate;
			that.itemId = param.itemId;
			that.mergeId = param.mergeId;
			if(param.orderQty != param.salesRemainQty) {
				that.salesChangeFlag = 'Y';
			} else {
				that.salesChangeFlag = 'N';
			}
		}
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			that.dueDate = undefined;
			that.itemId = undefined;
			that.mergeId = undefined;
			
			AUIGrid.setProp(momWidget.grid[0], 'rowStyleFunction', function(rowIndex, data) {
				if(data.salesRemainQty !=  data.orderQty) {
					return 'yellowStyle';
				} else {
					return null;
				}
				
			});
		}
	}, grid: function() {
		var that = this;
		AUIGrid.setProp(momWidget.grid[0], {'editBeginMode' : 'click'});
	}, event: function() {
		var that = this;
		$(document).on('click', '#actAddBtn2', function() {
			if(that.dueDate != undefined && that.itemId != undefined) {
				if(that.salesChangeFlag == 'Y') {
					momWidget.messageBox({type: 'warning', width: '400', height: '145',  html: Language.lang['MESSAGES12477']});
					return;
				}
				var dueDate = dueDate = AUIGrid.getGridData(momWidget.grid[1]).length == 0 ? that.dueDate : AUIGrid.getGridData(momWidget.grid[1])[0].dueDate;
				$('#fromDate2').val(dueDate);
				$('#toDate2').val(get_date_diff2(dueDate, 28));
				$('#itemId2').val(that.itemId);
				
				$('#itemId2').attr({disabled: true});
				$('#listPop1').momModal('show');
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145',  html: Language.lang['MESSAGES12476']});
				return;
			}
			
		});
		
		$(document).on('click', '#cancelBtn3, .bntpopclose', function() {
			var dueDate = dueDate = AUIGrid.getGridData(momWidget.grid[1]).length == 0 ? that.dueDate : AUIGrid.getGridData(momWidget.grid[1])[0].dueDate;
			$('#fromDate2').val(dueDate);
			$('#toDate2').val(get_date_diff2(dueDate, 28));
			$('#customerId').val('');
			$('#poId').val('');
			$('#poNo').val('');
			$('#modelSuffix').val('');
			$('#resultQty2').val('');
			$('#orgCode').val('');
			$('#listPop1').momModal('hide');
			AUIGrid.clearGridData(momWidget.grid[2]);
		});
		
		
	}, design: function() {
		$('head').append('<style>.yellowStyle{ background: #FFF612;}</style>');
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMBA008', MOMBA008);
       momWidget.init(2, 'MOMBA008', MOMBA008);
       momWidget.init(3, 'MOMBA008', MOMBA008);
       MOMBA008.init();
});