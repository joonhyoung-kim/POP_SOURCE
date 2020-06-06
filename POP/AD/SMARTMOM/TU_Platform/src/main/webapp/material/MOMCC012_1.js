var MOMCC012_1 = {
	initMessage				: undefined,
	initParam				: undefined,
	
	stockType				: undefined,
	menuId					: undefined,
	
	releaseFacilityType		: undefined,
	itemTypeParam			: undefined,
	requestFacilityType		: undefined,
	
	allowMinusQty			: undefined,
		
	init: function() {	
		Language.init(function() {
		});
		this.event();
		this.design();
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				that.grid();
				momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				momWidget.dropDownPost(1, 'RESERVED', undefined, undefined, that);
			});	
		});		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) { 
		this.initParam = {stockType: this.stockType};
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn2' && indexInfo['sequence'] == 4) {
			AUIGrid.clearGridData(momWidget.grid[1], data);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'requestCloseBtn1') {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) { 
		if(indexInfo != undefined && indexInfo['op'] == 'releaseBtn2' && indexInfo['sequence'] == 1) {
			if(callBackParam.length < 1) {
				this.initMessage = Language.lang['MESSAGES11333'];
				return;
			}
			
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam[i]['issueDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10534' + '@' + this.endPeriod);
					return;
				}
				/* modify hists
				 * 20191107001 / pyj / 출고시 음수재고 허용안하는 경우 조건 오류 수정
				 */
				if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['currentQty'] >= 0) {
						if(callBackParam[i]['remainQty'] > callBackParam[i]['standardOutQty']) {
							if(callBackParam[i]['remainQty'] > callBackParam[i]['currentQty']) { // 20191107001 / issueQty -> remainQty
								this.initMessage = Language.lang['MESSAGES11616'];
								return;
							}
							if(callBackParam[i]['issueQty'] < callBackParam[i]['remainQty']) { // 20191107001 / 부등호 수정
								this.initMessage = Language.lang['MESSAGES10259'];
								return;
							}
						}
					} else {
						this.initMessage = Language.lang['MESSAGES11379'];
						return;
					}
				}
				
				if(callBackParam[i]['requestFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES11390'];
					return;
				}
				
				this.initMessage = 'CLEAR_PARAM';
			}
		}
	}, grid: function() {
		this.stockType = momWidget.getSearchParam()['stockType'];
		
		if(this.stockType == 'MAT') {
			this.releaseFacilityType = "'FAC200'";
			this.itemTypeParam = {codeClassId:'ITEM_TYPE', attribute1 : 'Y'}
			this.requestFacilityType = "'FAC300', 'FAC500'";
			$('#labelText').text(Language.lang['MESSAGES10964']);
			this.menuId = 'MOMCC012';
		} else {
			this.releaseFacilityType = "'FAC300'";
			this.itemTypeParam = {codeClassId:'ITEM_TYPE', attribute2 : 'Y'}
			this.requestFacilityType = "'FAC500'";
			$('#labelText').text(Language.lang['MESSAGES10217']);
			this.menuId = 'MOMCC013';
		}
		
		var that = this;
		mom_ajax('R', 'common.comParameter', {facilityClassCd: 'AREA', facilityType: this.releaseFacilityType}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				momWidget.messageBox({type:'danger', width:'400', height: '145',  html:Language.lang['MESSAGES10821']});
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		// 불출창고 변경 시 해당 품목, 변경한 창고의 현재고 가져와 세팅하는 부분
		tuCommon.cellEditEnd(momWidget.grid[1]);
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			if(e.dataField == 'inLocationCd') {
				mom_ajax('R', 'common.comParameter', {itemId: event.item['itemId'], locationCd: event.item['inLocationCd']}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1 || data[0] == undefined) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', data[0].currentQty);
					} 
				}, undefined, undefined, this, 'sync');
				
				var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
				var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
				for(var i = e.rowIndex + 1; i < grid2length; i++) {
					AUIGrid.setCellValue(momWidget.grid[1], i, 'inLocationCd', item.inLocationCd);
				}
			}
			
			if(e.dataField == 'issueDate') {
				var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
				var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], event.rowIndex);
				for(var i = event.rowIndex + 1; i < grid2length; i++) {
					AUIGrid.setCellValue(momWidget.grid[1], i, 'issueDate', item['issueDate']);
				}
			}
			
			if(e['dataField'] == 'remainQty') {
				mom_ajax('R', 'common.comItemInfo', {itemId: e['item']['itemId']}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1 || data[0] == undefined) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'conversionUnitQty', e['item']['remainQty'] * 1);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'conversionUnitQty', e['item']['remainQty'] * data[0].conversionUnitQty);
					} 
				}, undefined, undefined, this, 'sync');
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e){ 
	        if(e.dataField == 'issueDate') { // 달력 지정한 필드인 경우 
	        	if(new Date(to_date_yyyy_mm_dd(e.value)) <= new Date(that.endPeriod)) { 
	        		momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
	                return e.oldValue; 
	        	} else {
	        		return to_date_yyyy_mm_dd(e.value);
                } 
	        }
	        
	        return e.value; 
		});
		
		momWidget.setEndPeriod(this.menuId, this);
	}, event: function() {
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems =  AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			
			if(checkedItems.length <= 0) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item['requestFlag'] == 'Y') {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11389']});
					return;
				}
				
				var item = checkedItems[i].item;
				console.log(JSON.stringify(item))
				var chk = true;
				//하단그리드와 중복체크
				for(var j = 0; j < grid2Items.length; j++) {
					if(item.workOrderId == grid2Items[j]['workOrderId'] && item['itemId'] == grid2Items[j]['itemId'] && item['requestDate'] == grid2Items[j]['requestDate']) {
						chk = false;
						break;
					}
				}
				
				item.issueDate = get_current_date('yyyy-mm-dd');
				if(chk) {
					AUIGrid.addRow(momWidget.grid[1], item, 'last');						
				}
			}
		});
		
		$(document).on('change', '#toLocation', function() {
			var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
			var toLocationCd = $('#toLocation').val();
			for(var i = 0; i < grid2length; i++) {
				AUIGrid.setCellValue(momWidget.grid[1], i, 'inLocationCd', toLocationCd);
			}
		});
			
		// 하단 그리드 엑셀 다운로드 버튼 클릭 시
        $(document).on("click", "#grid2ExcelDownBtn2", function() {
        	var fileName = 'MOMCC012' + '_' + get_current_date('yyyy-mm-dd');
                   
            var option = {fileName: fileName};
            option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
	            $('.aui-grid-export-progress-modal').remove();
            }
          
            option.progressBar = true;
          
            AUIGrid.exportToXlsx(momWidget.grid[1], option);
       });
        
       // 취소 버튼 클릭 시
	   $(document).on('click', '#rowCancelBtn2', function() {
		   var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
		   if(checkedItems.length > 0) {
			   AUIGrid.removeCheckedRows(momWidget.grid[1]); 
			   AUIGrid.removeSoftRows(momWidget.grid[1]);
		   } else {
			   momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10585']});
			   return;
		   }
	   });
		

		//momWidget.clickCancelBtn2(1);
	}, design: function() {
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}
};

$(document).ready(function(event){
       momWidget.init(1, 'MOMCC012_1', MOMCC012_1);
       momWidget.init(2, 'MOMCC012_1', MOMCC012_1);
       MOMCC012_1.init();
});

