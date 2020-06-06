var MOMEA009_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	menuId		: 'MOMEA009',
		
	init: function() {   
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
			});			
		});
		
		this.event();
    }, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'disposalBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['conversionUnitQty'] == undefined || callBackParam[i]['conversionUnitQty'] == '') {
					this.initMessage = Language.lang['MESSAGES11651'];
					return;
				} else if(callBackParam[i]['discardQty'] == undefined || callBackParam[i]['discardQty'] == '') {
					this.initMessage = Language.lang['MESSAGES11543'];
					return;
				} else if(callBackParam[i]['discardDate'] == undefined || callBackParam[i]['discardDate'] == '') {
					this.initMessage = Language.lang['MESSAGES11551'];
					return;
				} else if(callBackParam[i]['reasonCode'] == undefined || callBackParam[i]['reasonCode'] == '') {
					this.initMessage = Language.lang['MESSAGES11560'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['discardDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11550' + '@' + this.endPeriod);
					return;
				}
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'disposalBtn1' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['discardQty'] == undefined || callBackParam[i]['discardQty'] == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11543']});
					return;
				} else if(callBackParam[i]['discardDate'] == undefined || callBackParam[i]['discardDate'] == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11549']});
					return;
				} else if(callBackParam[i]['reasonCode'] == undefined || callBackParam[i]['reasonCode'] == '') {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11559']});
					return;
				}
				
				param[i]['seq'] = i + 1;
			}
		}
	}, grid: function() {
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], "cellEditEndBefore", function(e){ 
	        if(e.dataField == "discardQty") {
				var discardQty = e.value;
				
				var conversionUnitQty = discardQty * e.item.originConversionUnitQty;
				AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, "conversionUnitQty", conversionUnitQty);
				return discardQty;
			}
	        
	        return e.value; 
		}); 
	}, event: function() {
		// 폐기일자 캘린더 클릭 시
		$(document).on("click", "#discardDate", function() {
			$("#discardDate").datetimepicker({
				timepicker:false,
				format:'Y-m-d'
			});
		});
		
    	// 폐기일자 캘린더 일자 변경 시
		$(document).on('change', '#discardDate', function() {
			var gridLength = AUIGrid.getGridData(momWidget.grid[0]).length;
			var discardDate = $('#discardDate').val();
			 for(var i = 0; i < gridLength; i++) {
				 AUIGrid.setCellValue(momWidget.grid[0], i, 'discardDate', discardDate);
			 }
		});
    }
};

$(document).ready(function(event) {
       momWidget.init(1, 'MOMEA009_1', MOMEA009_1);
       MOMEA009_1.init();
});

