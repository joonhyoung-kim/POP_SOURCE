var MOMCA004 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					that.grid();
					that.event();
				});
			});
			
			momWidget.splitter('.h02-h', 'horizontal', '50%');
		});
	}, saveCallInit: function(index, param, callBackParam, indexInfo) { 
		for(var i=0; i<param.length; i++) {
			if(param[i].outLocationCd == undefined) {
				this.initMessage = Language.lang['MESSAGES12122'];				
				return;
			}
			
			if(param[i].requestQty == undefined) {
				this.initMessage = Language.lang['MESSAGES10946'];				
				return;
			}
		}
	}, grid: function() {
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			 // 요청창고 변경 한 데이터의 아래 데이터는 일괄 변경
			 if(e.dataField == 'outLocationCd') {
				 var grid2length = AUIGrid.getGridData(momWidget.grid[1]).length;
				 var item = AUIGrid.getItemByRowIndex(momWidget.grid[1], e.rowIndex);
				 for(var i = e.rowIndex + 1; i < grid2length; i++) {
					 AUIGrid.setCellValue(momWidget.grid[1], i, 'outLocationCd', item.outLocationCd);
				 }
			 }
		});
	}, event: function() {
		// 상단 그리드 선택 버튼 클릭 시 이벤트 처리
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length == 0) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { 
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			mom_ajax('R', 'purchase.purchasing.emRequest.emRequestSeqNum', {}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				for(var i=0; i<checkedItems.length; i++) {
					checkedItems[i].item.dueDate = get_current_date('yyyy-mm-dd');
					
					if(data[0].seqNum == '' || data[0].seqNum == undefined) {
						checkedItems[i].item.groupNum = '0000';
					} else {
						checkedItems[i].item.groupNum = data[0].seqNum + i+1; 
					}
					
					checkedItems[i].item.transactionSeq = i+1;

					AUIGrid.addRow(momWidget.grid[1], checkedItems[i].item, 'last');
				}
			}, undefined, undefined, this, 'sync');
			
			AUIGrid.setAllCheckedRows(momWidget.grid[0], false);
		});

		// 하단 그리드 요청창고 콤보 변경 시
		$(document).on("change", "#outLocation", function() {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			for(var i=0; i<grid2Length; i++) {
				var outLocation = $("#outLocation").val();
				AUIGrid.setCellValue(momWidget.grid[1], i, "outLocationCd", outLocation);
			}
		});
		
//		momWidget.clickCancelBtn2(1);
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMCA004', MOMCA004);
	momWidget.init(2, 'MOMCA004', MOMCA004);
	MOMCA004.init();
});