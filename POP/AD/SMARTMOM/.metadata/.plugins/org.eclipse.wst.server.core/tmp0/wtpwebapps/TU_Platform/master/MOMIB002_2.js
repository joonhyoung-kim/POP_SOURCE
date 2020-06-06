var MOMIB002_2 = {
	description 	: [],
	errorMap		: undefined,
	dbChildMap		: undefined,
	dbParentMap		: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		this.grid();
		this.event();
		this.design();
	}, grid: function() {
		
	}, event: function() {
		this.errorMap = new Map();
		this.dbChildMap = new Map();
		this.dbParentMap = new Map();
		
		var that = this;
		$(document).on('click', '#checkValidBtn1', function() {
			that.errorMap.clear();
			that.dbChildMap.clear();
			that.dbParentMap.clear();
			
			var gridItems = AUIGrid.getGridData(momWidget.grid[0]);
			if(gridItems.length < 1) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: '검사할 항목이 없습니다.'});
				return;
			}
			
			var itemIds = "'" + gridItems[0]['parentItemId'] + "'";
			for(var i = 1; i < gridItems.length; i++) {
				itemIds += (",'" + gridItems[i]['parentItemId'] + "'");
			}
			
			mom_ajax('R', 'reference.itemInfo.item.validation', {itemIds: itemIds}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				for(var i = 0; i < data.length; i++) {
					that.dbParentMap.set(data[i]['itemId'], data[i]);
				}
			}, undefined, undefined, this, 'sync');
			
			/*for(var i = 0; i < gridItems.length; i++) {
				if(gridItems[i]['parentItemId'] == '-') {
					gridItems[i]['parentItemId'] = '-';
				} else {
					var parentItem = that.dbParentMap.get(gridItems[i]['parentItemId']);
					if(parentItem == undefined) {
						that.errorMap.set(i, {parentItemId: '품목 누락'});
						gridItems[i]['parentItemId'] = '품목 누락';
					}
				}
			}*/
			
			itemIds = "'" + gridItems[0]['childItemId'] + "'";
			for(var i = 1; i < gridItems.length; i++) {
				itemIds += (",'" + gridItems[i]['childItemId'] + "'");
			}
			
			mom_ajax('R', 'reference.itemInfo.item.validation', {itemIds: itemIds}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				for(var i = 0; i < data.length; i++) {
					that.dbChildMap.set(data[i]['itemId'], data[i]);
				}
			}, undefined, undefined, this, 'sync');
			
			for(var i = 0; i < gridItems.length; i++) {
				var parentItem = that.dbChildMap.get(gridItems[i]['parentItemId']); 
				var childItem = that.dbChildMap.get(gridItems[i]['childItemId']); 
				
				if(gridItems[i]['parentItemId'] == '-') {
				} else if(gridItems[i]['parentItemId'] == undefined || gridItems[i]['parentItemId'] == '') {
					that.errorMap.set(i, {parentItemId: '누락'});
					gridItems[i]['parentItemId'] = '누락';
				} else if(that.dbParentMap.get(gridItems[i]['parentItemId']) == undefined) {
					that.errorMap.set(i, {parentItemId: '품목정보 누락'});
					gridItems[i]['parentItemId'] = '품목정보 누락';
				} else if(parentItem != undefined && childItem != undefined && parentItem['itemType'] == 'RM' && childItem['itemType'] == 'RM') {
					that.errorMap.set(i, {parentItemId: '원자재-원자재 모자 구성 오류'});
					gridItems[i]['parentItemId'] = '원자재-원자재 모자 구성 오류';
				}
				
				if(gridItems[i]['childItemId'] == undefined || gridItems[i]['childItemId'] == '') {
					that.errorMap.set(i, {childItemId: '누락'});
					gridItems[i]['childItemId'] = '누락';
				} else if(that.dbChildMap.get(gridItems[i]['childItemId']) == undefined) {
					that.errorMap.set(i, {childItemId: '품목정보 누락'});
					gridItems[i]['childItemId'] = '품목정보 누락';
				} 
				
				
				if(childItem != undefined && gridItems[i]['itemName'] != childItem['itemName']) {
					that.errorMap.set(i, {itemName: '품명 불일치'});
					gridItems[i]['itemName'] = '품명 불일치';
				} 
				
				if(childItem != undefined && gridItems[i]['itemType'] != childItem['itemType']) {
					that.errorMap.set(i, {itemType: '품목타입코드가 ' + childItem['itemType'] + '이어야 합니다.'});
					gridItems[i]['itemType'] = '품목타입코드가 ' + childItem['itemType'] + '이어야 합니다.';
				}
			}
			
			AUIGrid.setGridData(momWidget.grid[0], gridItems);
			
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'parentItemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(that.errorMap.get(rowIndex) != undefined && that.errorMap.get(rowIndex)['parentItemId'] != undefined) { 
						return 'columnStyle1';
					}
				}
			});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'childItemId', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(that.errorMap.get(rowIndex) != undefined && that.errorMap.get(rowIndex)['childItemId'] != undefined) { 
						return 'columnStyle1';
					}
				}
			});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'itemName', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(that.errorMap.get(rowIndex) != undefined && that.errorMap.get(rowIndex)['itemName'] != undefined) { 
						return 'columnStyle1';
					}
				}
			});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'itemType', {
				styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
					if(that.errorMap.get(rowIndex) != undefined && that.errorMap.get(rowIndex)['itemType'] != undefined) { 
						return 'columnStyle1';
					}
				}
			});
		});
	}, design: function(){
		$('head').append('<style>.columnStyle1{ background: #FFBFAA !important;}</style>');	
		$('head').append('<style>.columnStyle2{ background: #00FF00 !important;}</style>');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIB002_2', MOMIB002_2);
	MOMIB002_2.init();
});