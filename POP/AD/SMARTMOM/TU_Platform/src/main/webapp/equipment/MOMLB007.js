var MOMLB007 = {
	initMessage	: undefined, 
	initParam	: undefined,
	menuId 		: 'MOMLB007',
	endPeriod	: undefined,
	
	init: function() {  
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				that.event();
			});			
		});
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] == 'shipBtn1' && that.initParam != undefined) {
			for(var i=0; i<param.length; i++) {
				param[i].transactionSeq = i+1;
				param[i].materialReleaseGroupId = that.initParam;
			}
			
			mom_ajax('R', 'common.comParameter', {}, function(result, data) {
        		if(data.length > 0) {
        			moPriceBlockingFlag = data[0].moPriceBlockingFlag;
        		} else {
        			return;
        		}
				
        		if(moPriceBlockingFlag == 'Y') {
        			if(param.unitPrice == undefined) {
        				this.initMessage = Language.lang['MESSAGES10296'];				
        				return;
        			}
        		}
			}, undefined, undefined, this, 'sync');
		}
	}, grid: function() {
		var that = this;
		
		momWidget.setEndPeriod(this.menuId, this);
		
		AUIGrid.bind(momWidget.grid[0], 'cellEditEnd', function(e) { 
			var checkedRowItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			
			// 그리드 불출창고 변경 시
	        if(e.dataField == 'outLocationCd') {
				for(var i = 0; i < checkedRowItems.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[0], checkedRowItems[i].rowIndex, 'outLocationCd', e.value);
				}
	        }
	        
	        // 그리드 불출일자 변경 시
	        if(e.dataField == 'issueDate') {
				if(e.value < e.item.requestDate) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12255']});
					AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, "issueDate", e.oldValue);
					return;
				}
	        	
	        	if(e.value <= that.endPeriod) {
	        		AUIGrid.setCellValue(momWidget.grid[0], e.rowIndex, 'issueDate', get_current_date('YYYY-MM-DD'));
		        	momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
		        	return;
	        	}
	        }
	        
	        return e.value; 
		}); 
	}, event: function() {
		var that = this;
		
		$(document).on('change', '#outLocation', function() {
			var checkedRowItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedRowItems.length > 0) {
				for(var i = 0; i < checkedRowItems.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[0], checkedRowItems[i].rowIndex, 'outLocationCd', $('#outLocation').val());
				}
			}
		});
		
		$(document).on('click', '#shipBtn1', function() {
			var checkedGrid = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			for(var i=0; i<checkedGrid.length; i++) {
				if(checkedGrid[i].item.outLocationCd == undefined) {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12262']});
		        	return;
				}
			}
			
			mom_ajax('R', 'equipment.emMaterialRelease.emMaterialReleaseGroupId', {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data != undefined) {
					that.initParam = data[0].materialReleaseGroupId;
				}
			}, undefined, undefined, this, 'sync');
    	});
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMLB007', MOMLB007);
	MOMLB007.init();
});