//2020.04.27 박연주 묶음생산 신규 생성
var MOMBA007 = {
	initMessage	: undefined, 
	initParam	: undefined,
	changeFlag 	: undefined,
	bundleQty   : 0,
	bundleDate  :undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			that.event();
		});
		$('#bundleQty').attr('readonly','readonly');
		momWidget.splitter('.h50per', 'vertical', ($(window).width * 0.7), false);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		AUIGrid.setFixedColumnCount(momWidget.grid[0], 6);
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			}
		}
		
		AUIGrid.clearGridData(momWidget.grid[1]);
		$('#bundleDate').val('');
		$('#bundleQty').val('');
		this.bundleQty = 0;
		
		var date = new Date($('#fromDate').val());
		date.setDate(date.getDate() + 28);
		this.initParam = {pivot : momWidget.getDiff($('#fromDate').val(), date.toISOString().slice(0,10), 1, "DECODE (TO_CHAR(A.DUE_DATE,'YYYYMMDD')", "A.ORDER_QTY, '')")};
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS' || data.length < 1) {
			AUIGrid.clearGridData(momWidget.grid[0]);
			momWidget.splashHide();
			return;
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			var groupFields = [];
			for(var i = 0; i <= columnLayout.length; i++) {
				if(columnLayout[i] != undefined && columnLayout[i].headerText != undefined) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			$.each(data[0], function(key, value) {
				if(key.match('/')) {
					groupFields.push(key);
					var columnObj = {dataField: key, style: 'right-column', dataType: 'numeric', formatString: '#,###', excelHide: true};
					changeColumn.push(columnObj);
				}
			});
			
			AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
			
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
		}
		
		AUIGrid.setGridData(momWidget.grid[0], data);
		
		momWidget.splashHide();
	}, event: function() {
		var that = this;
		
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems =  AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			
			if(checkedItems.length <= 0){
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11335']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(i < checkedItems.length - 1){
					if(checkedItems[i]['item']['itemId'] != checkedItems[i+1]['item']['itemId']) {
						momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12458']});
						return;
					}
				}
				var item = checkedItems[i]['item'];
				var chk = true;
			
				var selectItemId = AUIGrid.getCellValue(momWidget.grid[1], 0,'itemId');
				
				//validation 체크
				if(selectItemId != null) {
					if(selectItemId != item['itemId']){
						momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES12458']});
						return;
					} else{
						for(var j = 0; j < grid2Items.length; j++) {
							if(item['salesOrderId'] == grid2Items[j]['salesOrderId']) {
								chk = false;
								break;
							}
						}
					} 
				} else {
					that.bundleDate = item['dueDate'];
				};
				
				if(chk){
					AUIGrid.addRow(momWidget.grid[1], item, 'last');
					if (to_date_yyyy_mm_dd(item['dueDate']) < to_date_yyyy_mm_dd(that.bundleDate)){
						that.bundleDate = item['dueDate'];
					};
				};
			
				if(that.changeFlag != 'Y' && i == checkedItems.length-1){
					$('#bundleDate').val(that.bundleDate);
				}
			}
			that.setBundleQty();
		});
	
		$(document).on('change', '#bundleDate', function() {
			that.changeFlag = 'Y'
		});
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'confirmBtn2' && indexInfo['sequence'] == 3) {
			this.initParam = {bundleDate : this.bundleDate, bundleQty : this.bundleQty};
		}
	}, setBundleQty: function(){
		var sum = AUIGrid.getColumnValues(momWidget.grid[1], 'remainQty');
		this.bundleQty = 0;
		if(sum != undefined){
			for(var i = 0; i < sum.length; i++){
				this.bundleQty += sum[i]
			}
			$('#bundleQty').val(this.bundleQty);
		}
	}, cancelCallBack: function(){
		this.setBundleQty();
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMBA007', MOMBA007);
	momWidget.init(2, 'MOMBA007', MOMBA007);
    MOMBA007.init();
});
