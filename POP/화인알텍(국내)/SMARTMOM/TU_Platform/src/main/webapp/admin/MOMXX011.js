var grid1 = undefined;
var grid2 = undefined;

var INFINITE = 100000000;
var pageId = undefined;
var processTran = [];
var searchFilter = [];

var columnProperty1 = [
	{
		dataField 	: 'columnIndex', 
		headerText 	: '컬럼 인덱스',
		width		: 80
	},{
		dataField 	: 'headerText', 
		headerText 	: '헤더명',
		style		: 'left-column'
	},{
		dataField 	: 'dataField', 
		headerText 	: '데이터 필드',
		style		: 'left-column',
		visible		: false
	}, {
		dataField 	: 'width', 
		headerText 	: '열 너비',
		width		: 120
	},{
		dataField 	: 'sortIndex', 
		headerText 	: '정렬 우선',
		width		: 80
	},{
		dataField 	: 'sort', 
		headerText 	: '행 정렬',
		width		: 120
	},{
		dataField 	: 'style', 
		headerText 	: '셀 정렬',
		width		: 120
	},{
		dataField 	: 'formatString', 
		headerText 	: '숫자 포맷',
		width		: 100
	},{
		dataField 	: 'color', 
		headerText 	: '배경색',
		width		: 160
	},{
		dataField 	: 'dropDown', 
		headerText 	: '드롭다운',
		style		: 'left-column',
		visible		: false
	},{
		dataField 	: 'message', 
		headerText 	: '대체 텍스트',
		style		: 'left-column',
		width		: 160
	},{
		dataField 	: 'columnFixed', 
		headerText 	: '고정 컬럼',
		width		: 100,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'editable', 
		headerText 	: '편집',
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		},
		visible		: false
	},{
		dataField 	: 'filter', 
		headerText 	: '필터',
		width		: 100,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'visible', 
		headerText 	: '화면 보이기',
		width		: 100,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'excelHide', 
		headerText 	: '엑셀 보이기',
		width		: 100,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'excelTemplateHide', 
		headerText 	: '엑셀양식 보이기',
		width		: 60,
		visible		: false
	},{
		dataField 	: 'popUp', 
		headerText 	: '팝업 등록',
		width		: 60,
		visible		: false
	},{
		dataField 	: 'popUpReq', 
		headerText 	: '팝업 필수',
		width		: 60,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		},
		visible		: false
	},{
		dataField 	: 'popUpRead', 
		headerText 	: '팝업 읽기전용',
		width		: 60,
		visible		: false
	},{
		dataField 	: 'popUpInit', 
		headerText 	: '팝업 초기값',
		width		: 100,
		style		: 'columnStyle',
		visible		: false
	}
];

var gridProperty1 = {
	'showRowNumColumn':true,
	'showSelectionBorder':false,
	'editable':true,				
	'enableSorting':true,	
	'showRowCheckColumn':true,	
	'enableFilter':true,
	'filterLayoutWidth':200,
	'filterLayoutHeight':300,	
	'selectionMode':'singleRow',
	'copySingleCellOnRowMode':true,
	'softRemoveRowMode': false
};

var MOMXX011 = {
	init: function() {		
		var that = this;
		
		that.comboBox();
		that.grid1();
		//that.grid9();
		that.event();
		
		that.retrieve();
	}, 
	
	design: function(idx, color, align) {
		if(align != undefined && align.indexOf('-') > 0) {
			$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
		} else {
			$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:center}</style>');
		}
	},
	
	grid1: function() {
		grid1 = AUIGrid.create('#grid1', columnProperty1, gridProperty1);
		tuCommon.cellClick(grid1, 'single');
	}, 
	
	/*grid9: function() {		
		$('body').append('<div id="temp_div_div" style="width600%; position:fixed; height:100%; z-index: -999; top:0px"><div id="grid9"></div></div>');
	},*/
	
	event: function() {
		var that = this;	
		// 조회 버튼
		$(document).on('click', '#findBtn', function() {
			that.retrieve();
		});
		
		$(document).on('click', '#saveBtn', function() {
			var param = [{}];			
			var result = that.createParam(param/*, items, columnFixedLast*/);
			
			//that.printItems(param);
			if(result != 0) {
				if(result >= 100 && result < 200) {
					alert('고정컬럼 오류');
				} else if(result >= 200 && result < 300) {
					alert('정렬우선 오류');
				}
				return;
			}
			
			momWidget.splashShow();			
			that.widgetAjax('widgetprop', JSON.stringify(param), that.callbackSave);
		});
		
		var $form = $('#form');
		var $objs = $form.find('input[id]');
		for (var i = 0; i < $objs.length; i++) {
			$(document).on('keydown', $($objs[i]), function(event) {
				if (event.keyCode == 13) {
					$('#findBtn').click();
				}			
			});
		}
	},
	
	comboBox: function() {
		// 페이지리스트
		var queryId = '/mom/request/com.thirautech.mom.widget.page.dummy';
		$.get(momWidget.contextPath() + queryId, null, function(data) {
			var width = $('#pageId').width() + 26;
			var height = $('#pageId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
			
			$('#pageId').jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
			
			$('#pageId').removeClass('w-select');
				
			var data1 = $('#pageId').jqxComboBox("source");
			for(var i = 0; i < data.length; i++) {
				data1.push({ label: data[i]['name'], value: data[i]['code'] });
			}
			
			$('#pageId').jqxComboBox('source', data1);			
			$('#pageId').jqxComboBox('selectItem', pageId);
			$('#pageId').find('input').attr('readonly', false);
		});
		
		var width = $('#noId').width() + 26;
		var height = $('#noId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
		var data = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];
		
		$('#noId').jqxComboBox({width : width, height : height, searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		
		$('#noId').removeClass('w-select');
		
		var data1 = $('#noId').jqxComboBox('source');
		for(var i = 0; i < data.length; i++) {
			data1.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#noId').jqxComboBox('source', data1);
		$('#noId').find('input').attr('readonly', false);
				
		width = $('#checkId').width() + 26;
		height = $('#checkId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
		data = [{'code':'NONE','name':'사용안함'},{'code':'singleRow','name':'단일선택'},{'code':'multipleRows','name':'다중선택'}];

		$('#checkId').jqxComboBox({width : width, height : height, searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		
		$('#checkId').removeClass('w-select');
		
		data1 = $('#checkId').jqxComboBox('source');
		for(var i = 0; i < data.length; i++) {
			data1.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#checkId').jqxComboBox('source', data1);
		$('#checkId').find('input').attr('readonly', false);
		
		width = $('#editId').width() + 26;
		height = $('#editId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
		data = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];

		$('#editId').jqxComboBox({width : width, height : height, searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		
		$('#editId').removeClass('w-select');
		
		data1 = $('#editId').jqxComboBox('source');
		for(var i = 0; i < data.length; i++) {
			data1.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#editId').jqxComboBox('source', data1);
		$('#editId').find('input').attr('readonly', false);
	},
	
	columnOrder: function(items1) {
		var that = this;
		
		var isChanged = false;
		var assign = new Array();
		for(var i = 0; i < items1.length; i++) {
			if(!isChanged && items1[i].columnIndex != i.toString()) {
				isChanged = true;
			}
			
			assign[i] = 0;
		}
		
		if(!isChanged) {
			return;
		}
		
		var items = new Array();
		for(var key =0, index = 0; index < 1000; index++) {
			for(var search = 0; search < items1.length; search++) {
				/*if(items1[search].columnIndex != null && items1[search].columnIndex != undefined && items1[search].columnIndex == index.toString() && assign[search] == 0) {*/
				if(items1[search].columnIndex != undefined && items1[search].columnIndex == index.toString() && assign[search] == 0) {
					assign[search] = 1;
					items[key] = items1[search];
					items[key].columnIndex = key;
					key++;
					//break;
				}
			}
			
			if(index >= items1.length) {
				var isExit = true;
				for(var i = 0; i < assign.length; i++) {
					if(assign[i] == 0) {
						isExit = false;
					}
				}
				
				if(isExit) {
					break;
				}
			}
		}
		
		for(var i = 0; i < assign.length; i++) {
			if(assign[i] == 0) {
				assign[i] = 1;
				items.push(items1[i]);
			}
		}
		
		for(var i = 0; i < items.length; i++) {
			items1[i] = items[i];
		}
	}, 
	
	columnFixed: function(items) {
		var filterActionCount = 0;
		var columnFixedLast = -1;
		for(var i = items.length-1; i >= 0; i--) {
			if(items[i]['message'] == 'FILTER' || items[i]['message'] == 'ACTION') {
				if(columnFixedLast == -1) {
				} else {
					filterActionCount++;
				}
				continue;
			}
			
			if(items[i]['columnFixed']) {
				if(columnFixedLast == -1) {
					columnFixedLast = i;
				}
			} else {
				if(columnFixedLast != -1 && i < columnFixedLast && items[i]['message'] != 'FILTER' & items[i]['message'] != 'ACTION') {
					return -1;
				}
			}
		}
		
		return columnFixedLast - filterActionCount + 1;
	},
	
	createParam: function(param/*, items, columnFixed*/) {
		var that = this;
		
		var items = AUIGrid.getGridData(grid1);
		
		// 컬럼 순서
		that.columnOrder(items);
		
		// 고정 컬럼
		var columnFixed = that.columnFixed(items);
		if(columnFixed == -1) {
			return 100;
		}
		
		var sortIndexExist = [];
		for(var i = 0; i < items.length; i++) {
			delete items[i]._$uid;
			delete items[i]['columnFixed'];
			
			if(items[i].width == undefined || $.trim(items[i].width) == '') {
				delete items[i].width;
			}
			
			if(items[i]['sortIndex'] == undefined || $.trim(items[i]['sortIndex']) == '') {
				delete items[i]['sortIndex'];
				delete items[i]['sort'];
			} else  {
				try {
					if(items[i]['sortIndex'] < 1) {
						return 201;
					} 
				} catch(e) {
					return 200;
				}
				
				if(items[i]['sort'] == undefined || items[i]['sort'] == 0) {
					items[i]['sort'] = 1;
				}
				
				if(!items[i]['visible']) {
					delete items[i]['sortIndex'];
					delete items[i]['sort'];
				}
				
				sortIndexExist[items[i]['sortIndex']] = true;
			} 
			
			if(items[i]['style'] == undefined || $.trim(items[i]['style']) == '' || (!items[i]['visible'] && !items[i]['excelHide'])) {
				delete items[i]['style'];
			}
			
			if(items[i]['formatString'] == undefined || $.trim(items[i]['formatString']) == '' || (!items[i]['visible'] && !items[i]['excelHide'])) {
				delete items[i]['formatString'];
				delete items[i].dataType;
			} else {
				items[i]['formatString'] = $.trim(items[i]['formatString'].replace(/,/gi,'#44#'));
				items[i].dataType = 'numeric';
			}
			
			if(items[i]['color'] == undefined || $.trim(items[i]['color']) == '' || !items[i]['visible']) {
				delete items[i]['color'];
			} else {
				items[i]['color'] = $.trim(items[i]['color']);
			}
			
			/*if(items[i]['dropDown'] == undefined || $.trim(items[i]['dropDown']) == '') {
				delete items[i]['dropDown'];
			} else {
				items[i]['dropDown'] = $.trim(items[i]['dropDown']);
			}*/
			
			if(items[i]['message'] == undefined || $.trim(items[i]['message']) == ''/* || !items[i]['visible']*/) {
				delete items[i]['message'];
			} else {
				items[i]['message'] = $.trim(items[i]['message'].replace(/,/gi,'#44#'));
			}
			
			// editable
			/*if(items[i]['editable'] == undefined || $.trim(items[i]['editable']) == '' || $.trim(items[i]['editable']) == 'false' || !items[i]['editable']) {
				items[i]['editable'] = false;
			} else {
				items[i]['editable'] = true;
			}*/ 
			
			if(items[i]['filter'] == undefined || $.trim(items[i]['filter']) == '' || !items[i]['filter']) {
				delete items[i]['filter'];
			} 
			
			if(items[i]['visible'] == undefined || $.trim(items[i]['visible']) == '' || $.trim(items[i]['visible']) == 'false' || !items[i]['visible']) {
				items[i]['visible'] = false;
			} else {
				items[i]['visible'] = true;
			}
			
			if(items[i]['excelHide'] == undefined || $.trim(items[i]['excelHide']) == '' || $.trim(items[i]['excelHide']) == 'false' || !items[i]['excelHide']) {
				delete items[i]['excelHide'];
			} else {
				items[i]['excelHide'] = true;
			}
			
			/*if(items[i]['excelTemplateHide'] == undefined || items[i]['excelTemplateHide'] == '') {
				items[i]['excelTemplateHide'] = 0;
			}*/ 
			
			/*if(items[i]['popUp'] == undefined || $.trim(items[i]['popUp']) == '') {
				delete items[i]['popUp'];
				delete items[i]['popUpReq'];
				delete items[i]['popUpRead'];
				delete items[i]['popUpInit'];
				
				continue;
			}*/ 
			
			/*if($.trim(items[i]['popUpInit']) == '' || items[i]['popUpInit'] == 'null') {
				delete items[i]['popUpInit'];
			}*/
		}
		
		for(var i = 1; i < sortIndexExist.length; i++) {
			if(sortIndexExist[i] == undefined) {
				return 202;
			}
		}
		
		var pageId = $.trim($('#pageName').val());
		var pageName = pageId;
		
		pageId = pageId.substring(pageId.indexOf("(") + 1, pageId.indexOf(")"));
		pageName = pageName.substring(0, pageName.indexOf("("));
		
		var queryId = $.trim($('#queryId').val());
		queryId = queryId.replace(/.dummy/, '');
		
		var pageRowCount = INFINITE;
		if($.trim($('#pagingId').val()) != undefined && $.trim($('#pagingId').val()) != '' && $.trim($('#pagingId').val()) != '0') {
			try {
				pageRowCount = parseInt($.trim($('#pagingId').val()));
			} catch(e) {
				pageRowCount = INFINITE;
			}
		}
		
		var popUpColSize = 3;
		var popUpTitle = $.trim($('#popUpTitle').val());
		if(popUpTitle != undefined && popUpTitle != '') {
			if(popUpTitle.indexOf('(') > 0) {
				popUpColSize = parseInt($.trim(popUpTitle.substring(popUpTitle.indexOf('(') + 1, popUpTitle.indexOf(')'))));
				popUpTitle = $.trim(popUpTitle.substring(0, popUpTitle.indexOf('(')));
			} 
		}
		
		var gridProperty = '{'
			+ '"queryId":"' + queryId + '"'
			+ ',"editId":' + $('#editId').val()
			+ ',"columnFixed":' + columnFixed
			+ ',"checkId":"' + $('#checkId').val() + '"'
			+ ',"showRowCheckColumn":' + ($('#checkId').val() == 'NONE' ? 'false' : 'true')
			+ ',"showSelectionBorder":false'
			+ ',"pageRowCount":' + pageRowCount 
			+ ',"usePaging":' + (pageRowCount == INFINITE ? 'false':'true')
			+ ',"showPageButtonCount":10'
			+ ',"selectionMode":"' + $.trim($('#checkId').val()) + '"'
			+ ',"editable":true'									
			+ ',"showRowNumColumn":' + $('#noId').val()
			+ ',"enableSorting":true'		
			+ ',"enableFilter":true'
			+ ',"filterLayoutWidth":200'
			+ ',"filterLayoutHeight":300'
			+ ',"popUpTitle":"' + popUpTitle + '"'
			+ ',"popUpColSize":' + popUpColSize
			+ ',"copySingleCellOnRowMode":true'
			+ '}';
		
		param[0] = {
				  pageId 		: pageId
				, pageName		: pageName
				, gridProperty	: gridProperty
				, columnProperty: JSON.stringify(items)
				, processTran	: JSON.stringify(processTran).length > 2 ? JSON.stringify(processTran) : ''
				, searchFilter	: JSON.stringify(searchFilter).length > 2 ? JSON.stringify(searchFilter) : ''
		};
		
		return 0;
	}, 
	
	retrieve: function() {
		var that = this;
		
		var param = {pageId : $('#pageName').val().substring($('#pageName').val().indexOf('(') + 1, $('#pageName').val().indexOf(')'))};
		var queryId = '/widget/request/com.thirautech.mom.widget.widgetprop.dummy';
		$.get(momWidget.contextPath() + queryId, param, function(data) {
			if(!data || data == undefined) {
				console.log('error');
				return;
			}
			
			if(data.length > 0) {
				$('#pageName').val((data[0]['pageName'] == undefined ? '페이지명' : data[0]['pageName']) + '(' + (data[0]['pageId'] == undefined ? 'MOMXX011' : data[0]['pageId'].substring(0, data[0]['pageId'].length)) + ')');
				delete data[0].pageId;
				delete data[0].pageName;
				
				$('#queryId').val(data[0]['queryId'] == undefined ? 'namespace.queryId' : (data[0]['queryId'].indexOf('.dummy') ? data[0]['queryId'].replace(/.dummy/,'') : data[0]['queryId']));
				delete data[0].queryId;				
				
				$('#noId').val(data[0]['noId'] == undefined ? false : data[0]['noId']);
				delete data[0].showRowNumColumn;
				
				$('#checkId').val(data[0]['checkId'] == undefined ? 'NONE' : data[0]['checkId']);
				delete data[0].checkId;
				
				$('#editId').val(data[0]['editId'] == undefined ? false : data[0]['editId']);
				delete data[0].editId;
				
				$('#pagingId').val(data[0]['pageRowCount'] == undefined || data[0]['pageRowCount'] == 0 || data[0]['pageRowCount'] == INFINITE ? '' :data[0]['pageRowCount']);
				delete data[0].pageRowCount;
				
				$('#popUpTitle').val((data[0]['popUpTitle'] == undefined ? '제목을 입력하세요' : data[0]['popUpTitle']) + '(' + (data[0]['popUpColSize'] == undefined ? 3 : parseInt(data[0]['popUpColSize'])) + ')');
				delete data[0].popUpTitle;	
			}
			
			var sortCode =  [{'code':0, 'name':'사용안함'}, {'code':1, 'name':'ASC'}, {'code':-1, 'name':'DESC'}];
			AUIGrid.setColumnPropByDataField(grid1, 'sort', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value/*, headerText*/, item) { 
					if(value == -1) {
						retStr = 'DESC';
					} else if(value == 1) {
						retStr = 'ASC';
					} else {
						retStr = '사용안함';
					}
					
					return retStr;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : sortCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});	
			
			var alignCode =  [{'code':'', 'name':'CENTER'}, {'code':'left-column', 'name':'LEFT'}, {'code':'right-column', 'name':'RIGHT'}];
			AUIGrid.setColumnPropByDataField(grid1, 'style', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					var retStr = 'CENTER';
					if(value == 'left-column') {
						retStr = 'LEFT';
					} else if(value == 'right-column') {
						retStr = 'RIGHT';
					}
					
					return retStr;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : alignCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});	
			
			var popUpCode =  [
			                  {'code':'', 			'name':'사용안함'},
			                  {'code':'NORMAL', 	'name':'일반'}, 
			                  {'code':'TEXT', 		'name':'텍스트'}, 
			                  {'code':'DROPDOWN', 	'name':'드롭다운'}, 
			                  {'code':'CALENDAR', 	'name':'캘린더'}, 
			                  {'code':'DATE1', 		'name':'현재날짜'},
			                  {'code':'DATE2', 		'name':'현재시간'}
			                 ];
			AUIGrid.setColumnPropByDataField(grid1, 'popUp', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value == 'NORMAL') {
						retStr = '일반';
					} else if(value == 'TEXT') {
						retStr = '텍스트';
					} else if(value == 'DROPDOWN') {
						retStr = '드롭다운';
					} else if(value == 'CALENDAR') {
						retStr = '캘린더';
					} else if(value == 'DATE1') {
						retStr = '현재날짜';
					} else if(value == 'DATE2') {
						retStr = '현재시간';
					} else {
						retStr = '사용안함';
					}
					
					return retStr;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : popUpCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});
			
			var excelTemplateCode =  [{'code':0, 'name':'사용안함'}, {'code':1, 'name':'필수'}, {'code':2, 'name':'사용'}];
			AUIGrid.setColumnPropByDataField(grid1, 'excelTemplateHide', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value == 1) {
						retStr = '필수';
					} else if(value == 2) {
						retStr = '사용';
					} else {
						retStr = '사용안함';
					}
					
					return retStr;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : excelTemplateCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});
			
			var popUpRead =  [{'code':0, 'name':'사용안함'}, {'code':1, 'name':'수정'}, {'code':2, 'name':'등록/수정'}];
			AUIGrid.setColumnPropByDataField(grid1, 'popUpRead', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value == 1) {
						retStr = '수정팝업';
					} else if(value == 2) {
						retStr = '등록/수정팝업';
					} else {
						retStr = '사용안함';
					}
					
					return retStr;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : popUpRead,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});
			
			var totalDropDownCount = 0;
			var totalDropDownList = [];
			for(var i = 0; i < data.length; i++) {
				if(
					(data[i]['dropDown'] != undefined && $.trim(data[i]['dropDown']).length > 0 && data[i]['popUp'] != undefined && data[i]['popUp'] == 'DROPDOWN') || 
					(data[i]['dropDown'] != undefined && $.trim(data[i]['dropDown']).length > 0 && data[i]['message'] == 'FILTER')
				) {
					if(totalDropDownCount == 0) {
						totalDropDownCount = 1;
						totalDropDownList[0] = $.trim(data[i]['dropDown'])
					} else {
						var isMatch = false;
						for(var j = 0; j < totalDropDownList.length; j++) {
							if($.trim(data[i]['dropDown']) == totalDropDownList[j]) {
								isMatch = true;
								break;
							}
						}
						
						if(!isMatch) {
							totalDropDownList[totalDropDownCount] = $.trim(data[i]['dropDown']);
							totalDropDownCount++;
						}
					}
				}
			}
			
			var dropDownCount = 0;
			var entireDatas = [{'code':'', 'name':'사용안함'}];
			var partialDatas = {};
			for(var idx = 0; idx < totalDropDownList.length; idx++) {				
				const i = idx;
				
				var queryId = '';
				if(totalDropDownList[i].indexOf('?') > 0) {
					queryId = momWidget.contextPath() + '/mom/request/com.thirautech.mom.' + totalDropDownList[i].replace('?', '.dummy?')
				} else {
					queryId = momWidget.contextPath() + '/mom/request/com.thirautech.mom.' + totalDropDownList[i] + '.dummy';
				}
				$.get(queryId, null, function(data1) {
					if(data1 == undefined) {
						console.log('error');
						return;
					}
					
					dropDownCount++;
					entireDatas = entireDatas.concat(data1);
					partialDatas[totalDropDownList[i]] = data1;
					
					data1.unshift({'code':'FIRST ROW', 'name':'첫번째 행'});
					data1.unshift({'code':'', 'name':'사용안함'});
					
					if(dropDownCount == totalDropDownCount) {
						var columnLayout = AUIGrid.getColumnLayout(grid1);
						var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
						var col = columnLayout[colIndex];
						var labelFunction = function(rowIndex, columnIndex, value, item) { 
							var retStr = value;//'';
							for(var j = 1; j < entireDatas.length; j++) {
								if(entireDatas[j]['code'] == value) {
									retStr = entireDatas[j]['name'];
									break;							
								}
							}
							
							return retStr;
						};
						
						col.labelFunction = labelFunction;
						
						col.editRenderer = {	
							type : 'ConditionRenderer',
							conditionFunction : function(rowIndex, columnIndex, value, item) {
								if(item.dropDown != undefined && item.dropDown.length > 0) {
									return {
										type	: 'DropDownListRenderer', 
										list	: entireDatas,
										showEditorBtnOver: true,
										keyField: 'code', 
										valueField: 'name'
									};
								} else {
									return {
										'type'	:'InputEditRenderer'
									};
								}
							}	
						}
						
						AUIGrid.setColumnProp(grid1, colIndex, col);
						
						AUIGrid.bind(grid1, 'cellEditBegin', function(event) {
							if(event['headerText'] != '팝업 초기값' || event['item']['dropDown'] == undefined || event['item']['dropDown'].length < 1) {
								return;
							}
							
							var columnLayout = AUIGrid.getColumnLayout(grid1);
							var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
							var col = columnLayout[colIndex];
							var labelFunction = function(rowIndex, columnIndex, value, item) { 
								var retStr = '';
								for(var j = 1; j < entireDatas.length; j++) {
									if(entireDatas[j]['code'] == value) {
										retStr = entireDatas[j]['name'];
										break;							
									}
								}
								
								return retStr;
							};
							
							col.labelFunction = labelFunction;
							
							col.editRenderer = {	
								type : 'ConditionRenderer',
								conditionFunction : function(rowIndex, columnIndex, value, item) {
									if(item.dropDown != undefined && item.dropDown.length > 0) {
										return {
											type	: 'DropDownListRenderer', 
											list	: partialDatas[event['item']['dropDown']],
											showEditorBtnOver: true,
											keyField: 'code', 
											valueField: 'name'
										};
									} else {
										return {
											'type'	:'InputEditRenderer'
										};
									}
								}
							}
							
							AUIGrid.setColumnProp(grid1, colIndex, col);
						});
						
						AUIGrid.bind(grid1, 'cellEditEnd', function(event) {
							var columnLayout = AUIGrid.getColumnLayout(grid1);
							var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
							var col = columnLayout[colIndex];
							var labelFunction = function(rowIndex, columnIndex, value, item) { 
								var retStr = '';
								for(var j = 1; j < entireDatas.length; j++) {
									if(entireDatas[j]['code'] == value) {
										retStr = entireDatas[j]['name'];
										break;							
									}
								}
								
								return retStr;
							};
							
							col.labelFunction = labelFunction;
							
							col.editRenderer = {	
								type : 'ConditionRenderer',
								conditionFunction : function(rowIndex, columnIndex, value, item) {
									if(item.dropDown != undefined && item.dropDown.length > 0) {
										return {
											type	: 'DropDownListRenderer', 
											list	: entireDatas,
											showEditorBtnOver: true,
											keyField: 'code', 
											valueField: 'name'
										};
									} else {
										return {
											type	:'InputEditRenderer'
										};
									}
								}
							}
							
							AUIGrid.setColumnProp(grid1, colIndex, col);
						});
					}					
				});				
			}
			
			//var prop = AUIGrid.getColumnItemByDataField(grid1, 'sort');
			processTran = [];
			searchFilter = [];
			for(var i = data.length - 1; i >= 0; i--) {
				if(data[i]['message'] == 'ACTION') {
					processTran.unshift(data[i]);
					data.splice(i, 1);
				} else if(data[i]['message'] == 'FILTER') {
					searchFilter.unshift(data[i]);
					data.splice(i, 1);
				}
			}
			
			AUIGrid.setGridData(grid1, data);
			
			that.preView();
		});
	},
	
	preView: function() {
		var gridColumnOrigin = AUIGrid.getColumnLayout(grid2);
		
		var that = this;
		
		var param = {pageId : $('#pageName').val().substring($('#pageName').val().indexOf('(') + 1, $('#pageName').val().indexOf(')'))};
		
		var queryId = '/mom/request/com.thirautech.mom.widget.widgetprop.dummy';
		$.get(momWidget.contextPath() + queryId, param, function(data) {
			if(!data || data == undefined || data.length < 1) {
				console.log('error');
				return;
			}
			
			var editId 			= data[0]['editId'] != undefined ? data[0]['editId'] : false;
			var columnProperty 	= JSON.parse(data[0]['columnProperty']);
			
			var gridProperty 	= JSON.parse(data[0]['gridProperty']);
			var columnFixed 	= parseInt(data[0]['columnFixed']);
			
			gridProperty.usePaging = false;
			
			if(grid2 != undefined) {
				AUIGrid.destroy(grid2);
			}
			
			grid2 = AUIGrid.create('#grid2', columnProperty, gridProperty);
			
			if(editId) {
				tuCommon.editColumnSet(grid2);
				columnProperty = AUIGrid.getColumnLayout(grid2);
				if(columnFixed > 0) {
					columnFixed++;
				}
			}
			
			if(columnFixed > 0) {
				AUIGrid.setFixedColumnCount(grid2,columnFixed);
			}
			
			// Dummy 행 넣기
			var items = AUIGrid.getGridData(grid1);
			var param = {};
			param['startPage'] = 1;
			param['endPage'] = 1;
			
			var queryId = '/mom/request/com.thirautech.mom.' + $.trim($('#queryId').val()) + '.dummy';
			$.get(momWidget.contextPath() + queryId, param, function(data2) {
				var result = [{}];
				if(data2.length > 0) {
					result[0] = data2[0];
				} else {
					for(var i = 0; i < items.length; i++) {
						result[0][items[i].dataField] = '';
					}
				}
		
				AUIGrid.setGridData(grid2, result);
				
				var sortParam = [{}];
				for(var idx = 0; idx < columnProperty.length; idx++) {
					if(idx == 0) {
						sortParam.splice(0, sortParam.length);
					}
							
					const i = idx;
					const data_field = columnProperty[i].dataField;
					
					// DropDown
					if(columnProperty[i].dropDown != undefined && $.trim(columnProperty[i].dropDown) != '') {
						var queryId = '';
						if(columnProperty[i].dropDown.indexOf('?') > 0) {
							queryId = '/mom/request/com.thirautech.mom.' + columnProperty[i].dropDown.replace('?', '.dummy?')
						} else {
							queryId = '/mom/request/com.thirautech.mom.' + columnProperty[i].dropDown + '.dummy';
						}
						$.get(momWidget.contextPath() + queryId, null, function(data1) {
							if(!data1 || data1 == undefined) {
								console.log('error');
								return;
							}
							
							var colSet = {
									style: 'columnStyle' + i,
									labelFunction: function(rowIndex, columnIndex, value, item) { 
										var retStr = '';
										for(var j = 0, len = data1.length; j < len; j++) {
											if(data1[j]['code'] == value) {
												retStr = data1[j]['name'];
												break;							
											}
										}
										
										return retStr;
									},
									editRenderer: {
										type : 'DropDownListRenderer',
										list : data1,
										showEditorBtnOver : true,
										keyField : 'code', 
										valueField : 'name'
									}
							};
							
							AUIGrid.setColumnPropByDataField(grid2, data_field, colSet);
						});						
					}
					
					// Message
					if(columnProperty[i].message != undefined && $.trim(columnProperty[i].message) != '') {
						const message = columnProperty[i].message;
						
						var colSet = {
							dataField : data_field,
							labelFunction: function(rowIndex, columnIndex, value, item) { 
								return (value == undefined || value == '') ? message : value;
							},
							editRenderer: {
								type : 'InputEditRenderer',
							}
						};
						
						AUIGrid.setColumnPropByDataField(grid2, data_field, colSet);
					}
					
					// Color
					if(columnProperty[i].color != undefined && $.trim(columnProperty[i].color) != '') {
						const idx = i;
						const color = columnProperty[i].color;
						const style = columnProperty[i].style;
						that.design(idx, color, style);
						var columnLayout = AUIGrid.getColumnLayout(grid2);
						columnLayout[i]['style'] = 'columnStyle' + idx;
						AUIGrid.changeColumnLayout(grid2, columnLayout);
					}
					
					// Sort
					if(columnProperty[i].sortIndex != undefined && $.trim(columnProperty[i].sortIndex) != '') {
						const sortIndex = columnProperty[i].sortIndex - 1;
						const asc = columnProperty[i].sort;
						sortParam[sortIndex] = {dataField : data_field, sortType : asc};
					}
					
					// Filter
					if(columnProperty[i].filter) {
						var columnLayout = AUIGrid.getColumnLayout(grid2);
						columnLayout[i].filter = {showIcon:true};
						AUIGrid.changeColumnLayout(grid2, columnLayout);
					}
				}
				
				if(sortParam.length > 0) {
					AUIGrid.setSorting(grid2, sortParam);
				}
			});
		});
	},
	
	callbackSave: function(result, data, param, callbackParam) {
		var that = this.MOMXX011;
		
		momWidget.splashHide();
		that.retrieve();
		
		if(result == 'SUCCESS') {
			momWidget.messageBox({type:"success",  width:"400", height: "145", html:"성공하였습니다."});
		} else {
			momWidget.messageBox({type:"danger",  width:"400", height: "145", html:"실패하였습니다."});
		}
	},
	
	widgetAjax: function(url, param, callBack) {
		var type = 'POST';
		url = momWidget.contextPath() + '/widget/request/com.thirautech.mom.widget.' + url + '.dummy/list';
		
		$.ajax({
			type 		: type,
			url  		: url,
			data 		: param,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success     : function(data) {
				if(callBack != null && callBack != undefined) {
					if(data['result'] == 'success') {
						callBack('SUCCESS', data);
					} else {
						callBack('FAIL', data);
					}
				}
			},
			error       : function(error){
				if(callBack != null && callBack != undefined) {
					callBack('ERROR', error);
				}
			},
			fail        : function(fail){
				if(callBack != null && callBack != undefined) {
					callBack('FAIL', fail);
				}
			}
		});
	},
	
	widgetUpload: function(fileId, url, page, grid, param1, callBack) {
		var files = fileId.files;
	    if(files.length === 0) {
	        alert('선택된 파일이 없습니다.')
	        return;
	    }
	    
	    momWidget.splashShow();
	    
	    url = momWidget.contextPath() + '/widget/excel/com.thirautech.mom.' + url + '.dummy';
	    
	    var formData = new FormData();
	    formData.append('file', files[0]);
	    
	    formData.append('param1', encodeURIComponent(JSON.stringify(param1)));
	    
	    var param2 = {};
	    var grid_column_origin = AUIGrid.getColumnLayout(grid);
	    
	    var index = 0;
		for(var i = 0; i < grid_column_origin.length; i++) {
	    	if(typeof grid_column_origin[i].excelTemplateHide == 'undefined' || grid_column_origin[i].excelTemplateHide) {
	    		if(grid_column_origin[i].dataField == 'Edit') {
	    			continue;
	    		}
	    		
		    	var key = index.toString();
		    	var value = grid_column_origin[i].dataField;
		    	param2[key] = value;
		    	
		    	index++;
	    	} 
	    }
	    
		formData.append('param2', encodeURIComponent(JSON.stringify(param2)));

	    var xhr = new XMLHttpRequest(); 
	    xhr.open('POST', url); 

	    xhr.onload = function() {
	    	momWidget.splashHide();
	        if(JSON.parse(xhr.responseText)['result'] == 'success') {
	        	if(callBack != null){
					callBack('SUCCESS', xhr.responseText);
				}
	        } else {
	        	if(callBack != null){
					callBack('FAIL', JSON.parse(xhr.responseText));
				}
	        }
	    }
	    
	    xhr.send(formData);    
	    //event.preventDefault();
	},
	
	printItems: function(items) {
		for(var i = 0; i < items.length; i++) {
			console.log('[' + i + '] ' + JSON.stringify(items[i]));
		}
	}
};

$(document).ready(function(event) {
	var url = location.href;
	var pageId1 = url.substring(url.indexOf('pageId=') + 7).replace(/#/gi,'');
	
	$('#pageName').val('pageName(' + pageId1 + ')');
	pageId = pageId1;
	
	MOMXX011.init();
});
