var grid1 = undefined;
var grid2 = undefined;
var grid9 = undefined;

var INFINITE = 100000000;

var columnProperty1 = [
	{
		dataField 	: 'columnIndex', 
		headerText 	: '컬럼 인덱스',
		width		: 40
	},{
		dataField 	: 'headerText', 
		headerText 	: '헤더명',
		style		: 'left-column'
	},{
		dataField 	: 'dataField', 
		headerText 	: '데이터 필드',
		style		: 'left-column'
	}, {
		dataField 	: 'width', 
		headerText 	: '열 너비',
		width		: 40
	},{
		dataField 	: 'sortIndex', 
		headerText 	: '정렬 우선',
		width		: 40
	},{
		dataField 	: 'sort', 
		headerText 	: '행 정렬',
		width		: 60
	},{
		dataField 	: 'style', 
		headerText 	: '셀 정렬',
		width		: 60
	},{
		dataField 	: 'formatString', 
		headerText 	: '숫자 포맷',
		width		: 80
	},{
		dataField 	: 'color', 
		headerText 	: '배경색',
		width		: 80
	},{
		dataField 	: 'dropDown', 
		headerText 	: '드롭다운',
		style		: 'left-column'
	},{
		dataField 	: 'message', 
		headerText 	: '대체 텍스트',
		style		: 'left-column',
		width		: 80
	},{
		dataField 	: 'columnFixed', 
		headerText 	: '고정 컬럼',
		width		: 40,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'editable', 
		headerText 	: '편집',
		width		: 40,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'filter', 
		headerText 	: '필터',
		width		: 40,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'visible', 
		headerText 	: '화면 보이기',
		width		: 40,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'excelHide', 
		headerText 	: '엑셀 보이기',
		width		: 40,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'excelTemplateHide', 
		headerText 	: '엑셀양식 보이기',
		width		: 60/*,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}*/
	},{
		dataField 	: 'popUp', 
		headerText 	: '팝업 등록',
		width		: 60
	},{
		dataField 	: 'popUpReq', 
		headerText 	: '팝업 필수',
		width		: 60,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'popUpRead', 
		headerText 	: '팝업 읽기전용',
		width		: 60,
		renderer 	: {
			type 	: 'CheckBoxEditRenderer',
			editable: true
		}
	},{
		dataField 	: 'popUpInit', 
		headerText 	: '팝업 초기값',
		width		: 100,
		style		: 'columnStyle'
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
	/*'fillColumnSizeMode':'',
	'showRowAllCheckBox':'',
	'showPageButtonCount':10,
	'groupingFields':[],
	'showBranchOnGrouping':false,
	'pageRowCount':20,
	'usePaging':true,
	'popupSetting':true*/
};

var MOMXX000 = {
	init: function() {		
		var that = this;
		
		that.comboBox();
		that.grid1();
		that.grid9();
		that.event();
		that.fileInpuSet();
		
		/*setTimeout(function() {
			$(window).resize(function() {
				setTimeout(function() {
					AUIGrid.resize(that.grid1);
					
					var height = document.getElementById(that.grid1).children[0].clientHeight;
					var width = document.getElementById(that.grid1).children[0].clientWidth;
					
					$(that.grid1).find('.aui-grid').css('height', height + 17 + 'px');
					$(that.grid1).find('.aui-grid').css('width', width + 17 + 'px');

					AUIGrid.resize(that.grid1);
					
					
					AUIGrid.resize(that.grid2);
					
					var height = document.getElementById(that.grid2).children[0].clientHeight;
					var width = document.getElementById(that.grid2).children[0].clientWidth;
					
					$(that.grid2).find('.aui-grid').css('height', height + 17 + 'px');
					$(that.grid2).find('.aui-grid').css('width', width + 17 + 'px');

					AUIGrid.resize(that.grid2);
				}, 100);
			});
		}, 0);*/	
	}, 
	
	design: function(idx, color, align) {
		/*if(align != null && align != undefined && align.indexOf('-') > 0) {*/
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
	
	grid9: function() {		
		$('body').append('<div id="temp_div_div" style="width600%; position:fixed; height:100%; z-index: -999; top:0px"><div id="grid9"></div></div>');
	},
	
	event: function() {
		var that = this;	
		// 조회 버튼
		$(document).on('click', '#findBtn', function() {
			that.retrieve();
		});
		
		$(document).on('click', '#newBtn', function() {
			/*var items = AUIGrid.getGridData(grid1);*/
			$('#pageName').val('페이지명(MOMXX000)');
			$('#pageId').val('');
			$('#queryId').val('namespace.queryId');
			$('#pagingId').val('100');
			$('#noId').val(false);
			$('#checkId').val('NONE');
			$('#editId').val(false);
			$('#popUpTitle').val('팝업창 제목을 입력하세요(3)');
			
			var newRow = [{
				'columnIndex'		:0,
				'headerText'		:'헤더명',
				'dataField'			:'dataField',
				'width'				:'',
				'visible'			:false,
				'excelHide'			:false,
				'excelTemplateHide'	:0,
				'popUpReq'			:false,
				'popUpRead'			:false
			}];
				
			AUIGrid.setGridData(grid1, newRow);
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
		
		$(document).on('click', '#addBtn', function() {
			var items = AUIGrid.getGridData(grid1);
			var columnIndex = 1;
			if(items[items.length-1]['columnIndex'] != undefined && items[items.length-1]['columnIndex'] != '') {
				try {
					columnIndex = parseInt(items[items.length-1]['columnIndex']) + 1; 
				} catch(e) {
				}				
			}
			
			var newRow = {
				'columnIndex'		:columnIndex,
				'headerText'		:'헤더명',
				'dataField'			:'dataField',
				'width'				:'',
				'visible'			:false,
				'excelHide'			:false,
				'excelTemplateHide'	:0,
				'popUpReq'			:false,
				'popUpRead'			:false
			};
				
			AUIGrid.addRow(grid1, newRow, 'last');
		});
		
		$(document).on('click', '#delBtn', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(grid1);
			if(checkedItems.length < 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 행을 선택하여 주십시오.'});
				
				return;
			}
			
			momWidget.messageBox({type:"info", width:"400", height: "145", html:$("#confirmMonth").val() + "삭제 하시겠습니까?", closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						AUIGrid.removeRow(grid1, checkedItems[i].rowIndex); 
					}
				}
			}});			
		});
		
		// 엑셀 다운 버튼
		$(document).on('click', '#excelDownBtn', function() {
			var items = AUIGrid.getGridData(grid1);
			
			for(var i = 0; i < items.length; i++) {
				items[i].sort = items[i].sort == 1 ? 'ASC' : (items[i].sort == -1 ? 'DESC' : '');
				items[i].style = items[i].style == 'left-column' ? 'LEFT' : (items[i].style == 'right-column' ? 'RIGHT' : 'CENTER');
				items[i].columnFixed = items[i].columnFixed ? 'true' : '';
				items[i].editable = items[i].editable ? 'true' : '';
				items[i].filter = items[i].filter ? 'true' : '';
				items[i].visible = items[i].visible ? 'true' : '';
				items[i].excelHide = items[i].excelHide ? 'true' : '';
				items[i].excelTemplateHide = items[i].excelTemplateHide == 1 ? '필수' : (items[i].excelTemplateHide == 2 ? '사용' : '');

				if(items[i].popUp == 'NORMAL') {
					items[i].popUp = '일반';
				} else if(items[i].popUp == 'TEXT') {
					items[i].popUp = '텍스트';
				} else if(items[i].popUp == 'DROPDOWN') {
					items[i].popUp = '드롭다운';
				} else if(items[i].popUp == 'CALENDAR') {
					items[i].popUp = '캘린더';
				} else if(items[i].popUp == 'DATE1') {
					items[i].popUp = '현재날짜';
				} else if(items[i].popUp == 'DATE2') {
					items[i].popUp = '현재시가';
				} 
			}
			
			if(grid9 == undefined) {
				grid9 = AUIGrid.create('#grid9', columnProperty1, {showRowNumColumn: false});
			} 
			
			AUIGrid.setGridData(grid9, items);			
			AUIGrid.exportToXlsx(grid9, {fileName : 'MOM_WIDGET_' + $('#pageId').val() + '_' + get_current_date('yyyy-mm-dd')});
			
			AUIGrid.clearGridData(grid9);
		});
		
		// 엑셀등록 팝업
		$(document).on('click', '#excelUpBtn', function() {
			$('#excelPop1').momModal('show');
			$('#file').val('');
		});
		
		$(document).on('click', '#cancelBtnEX1, ' + '.bntpopclose', function() {
			$('#excelPop1').momModal('hide');		
		});
		
		// 엑셀등록저장 버튼
		$(document).on('click', '#saveBtnEX1', function() {	
			var param = [{}];			
			var result = that.createParamExcel(param);
			
			//that.printItems(param);
			
			if(result != 0) {
				if(result >= 100 && result < 200) {
					alert('고정컬럼 오류');
				} else if(result >= 200 && result < 300) {
					alert('정렬우선 오류');
				}
				return;
			}
	 		
			that.widgetUpload(file, 'widget.widgetprop', 'MOMXX000', grid1, param, that.callbackExcelUpload);
	 		$('#excelPop1').momModal('hide');	 		
		});
		
		// HTML 생성 버튼
		/*$(document).on('click', '#createHTML', function() {
			var pageId = $.trim($('#pageName').val()).substring($.trim($('#pageName').val()).indexOf("(") + 1, $.trim($('#pageName').val()).indexOf(")"));
			window.open('/TU_Platform/util/createHtml.jsp?fileName=' + pageId);
		});*/
		
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
		$.get(momWidget.contextPath() + '/mom/request/com.thirautech.mom.widget.page.dummy', null, function(data) {
			$('#pageId').jqxComboBox({dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
			var width = parseInt(document.getElementById('pageId').style.width.toString().replace('px','')) - 7;
			var height = parseInt(document.getElementById('pageId').style.height.toString().replace('px','')) + 1;
			$('#pageId').jqxComboBox({width : width + 'px', height : height + 'px'});
				
			var items = $('#pageId').jqxComboBox("source");
			for(var j = 0; j < data.length; j++) {
				items.push({ label: data[j]['name'], value: data[j]['code'] });
			}
			
			$('#pageId').jqxComboBox('source', items);
			$('#pageId').find('input').attr('readonly', false);
			$('#pageId').removeClass('w-select');
			$('#pageId').parent().find('#' + ($('#pageId').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
		});
		
		var data1 = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];
		$('#noId').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		var width = parseInt(document.getElementById('noId').style.width.toString().replace('px','')) - 7;
		var height = parseInt(document.getElementById('noId').style.height.toString().replace('px','')) + 1;
		$('#noId').jqxComboBox({width : width + 'px', height : height + 'px'});
		
		var items1 = $('#noId').jqxComboBox('source');
		for(var j = 0; j < data1.length; j++) {
			items1.push({ label: data1[j]['name'], value: data1[j]['code'] });
		}
		
		$('#noId').jqxComboBox('source', items1);
		$('#noId').find('input').attr('readonly', false);
		$('#noId').removeClass('w-select');
		$('#noId').parent().find('#' + ($('#noId').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
		
		var data2 = [{'code':'NONE','name':'사용안함'},{'code':'singleRow','name':'단일선택'},{'code':'multipleRows','name':'다중선택'}];
		$('#checkId').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true, selectionMode : 'dropDownList'});
		var width = parseInt(document.getElementById('checkId').style.width.toString().replace('px','')) - 7;
		var height = parseInt(document.getElementById('checkId').style.height.toString().replace('px','')) + 1;
		$('#checkId').jqxComboBox({width : width + 'px', height : height + 'px'});
		
		var items2 = $('#checkId').jqxComboBox('source');
		for(var j = 0; j < data2.length; j++) {
			items2.push({ label: data2[j]['name'], value: data2[j]['code'] });
		}
		
		$('#checkId').jqxComboBox('source', items2);
		$('#checkId').find('input').attr('readonly', false);
		$('#checkId').removeClass('w-select');
		$('#checkId').parent().find('#' + ($('#checkId').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
		
		var data3 = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];
		$('#editId').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true, selectionMode : 'dropDownList'});
		var width = parseInt(document.getElementById('editId').style.width.toString().replace('px','')) - 7;
		var height = parseInt(document.getElementById('editId').style.height.toString().replace('px','')) + 1;
		$('#editId').jqxComboBox({width : width + 'px', height : height + 'px'});
		
		var items3 = $('#editId').jqxComboBox('source');
		for(var j = 0; j < data3.length; j++) {
			items3.push({ label: data3[j]['name'], value: data3[j]['code'] });
		}
		
		$('#editId').jqxComboBox('source', items3);
		$('#editId').find('input').attr('readonly', false);
		$('#editId').removeClass('w-select');
		$('#editId').parent().find('#' + ($('#editId').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
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
		var columnFixedLast = -1;
		for(var i = items.length-1; i >= 0; i--) {
			if(items[i].columnFixed) {
				if(columnFixedLast == -1) {
					columnFixedLast = i;
				}
			} else {
				if(columnFixedLast != -1 && i < columnFixedLast) {
					/*alert('고정컬럼은 연속되어야 합니다.');*/
					return -1;
				}
			}
		}
		
		return columnFixedLast + 1;
	},
	
	createParam: function(param/*, items, columnFixed*/) {
		var that = this;
		
		var items = AUIGrid.getGridData(grid1);
		for(var i = 0; i < items.length; i++) {
			if(items[i].excelTempleteHide != undefined) {
				delete items[i].excelTempleteHide;
			}
		}
		
		// 컬럼 순서
		that.columnOrder(items);
		
		// 고정 컬럼
		var columnFixed = that.columnFixed(items);
		if(columnFixed == -1) {
			return 100;
		}
		
		var sortIndexExist = [];
		var processTranIndex = -1;
		var processTran = [{}];
		for(var i = 0; i < items.length; i++) {
			delete items[i]._$uid;
			delete items[i].columnFixed;
			
			if(items[i].message != undefined && (items[i].message == 'ACTION' || items[i].message == 'action')) {
				processTranIndex = i;
				processTran = items.slice(i, items.length);
				items = items.slice(0, i);
				break;
			}
			
			/*if(items[i].width == null || items[i].width == undefined || $.trim(items[i].width) == '' || $.trim(items[i].width) == 'null') {*/
			if(items[i].width == undefined || $.trim(items[i].width) == '') {
				delete items[i].width;
			}
			
			if(items[i].sortIndex == undefined || $.trim(items[i].sortIndex) == '') {
				delete items[i].sortIndex;
				delete items[i].sort;
			} else  {
				try {
					if(items[i].sortIndex < 1) {
						return 201;
					} 
				} catch(e) {
					return 200;
				}
				
				if(items[i].sort == undefined || items[i].sort == 0) {
					items[i].sort = 1;
				}
				
				if(!items[i].visible) {
					delete items[i].sortIndex;
					delete items[i].sort;
				}
				
				sortIndexExist[items[i].sortIndex] = true;
			} 
			
			if(items[i].style == undefined || $.trim(items[i].style) == '' || (!items[i].visible && !items[i].excelHide)) {
				delete items[i].style;
			}
			
			if(items[i].formatString == undefined || $.trim(items[i].formatString) == '' || (!items[i].visible && !items[i].excelHide)) {
				delete items[i].formatString;
				delete items[i].dataType;
			} else {
				//if(items[i].formatString.indexOf('#') > 0) {
					items[i].formatString = $.trim(items[i].formatString.replace(/,/gi,'#44#'));
					items[i].dataType = 'numeric';
				//} else {
				//	items[i].formatString = $.trim(items[i].formatString);
				//}
			}
			
			if(items[i].color == undefined || $.trim(items[i].color) == '' || !items[i].visible) {
				delete items[i].color;
			} else {
				items[i].color = $.trim(items[i].color);
			}
			
			if(items[i].dropDown == undefined || $.trim(items[i].dropDown) == '') {
				delete items[i].dropDown;
			} else {
				items[i].dropDown = $.trim(items[i].dropDown);
				items[i].editable = true;  /////////////////////////////////////////////// ???
				/*delete items[i].style;
				delete items[i].color;*/   // 일단 보류, 몰렜다.., 왜 내가 일케 했는지
			}
			
			if(items[i].message == undefined || $.trim(items[i].message) == ''/* || !items[i].visible*/) {
				delete items[i].message;
			} else {
				items[i].message = $.trim(items[i].message.replace(/,/gi,'#44#'));
			}
			
			// editable
			if(items[i].editable == undefined || $.trim(items[i].editable) == '' || $.trim(items[i].editable) == 'false' || !items[i].editable) {
				items[i].editable = false;
			} else {
				items[i].editable = true;
			} 
			
			if(items[i].filter == undefined || $.trim(items[i].filter) == '' || !items[i].filter) {
				delete items[i].filter;
			} 
			
			if(items[i].visible == undefined || $.trim(items[i].visible) == '' || $.trim(items[i].visible) == 'false' || !items[i].visible) {
				items[i].visible = false;
			} else {
				items[i].visible = true;
			}
			
			if(items[i].excelHide == undefined || $.trim(items[i].excelHide) == '' || $.trim(items[i].excelHide) == 'false' || !items[i].excelHide) {
				delete items[i].excelHide;
			} else {
				items[i].excelHide = true;
			}
			
			if(items[i].excelTemplateHide == undefined || $.trim(items[i].excelTemplateHide) == '' || $.trim(items[i].excelTemplateHide) == '0' || !items[i].excelTemplateHide) {
				delete items[i].excelTemplateHide;
			} /*else {
				items[i].excelTemplateHide = true;
			}*/
			
			if((items[i].popUp != 'CALENDAR') && (items[i].popUp == undefined || $.trim(items[i].popUp) == '')) {
				delete items[i].popUp;
				delete items[i].popUpReq;
				delete items[i].popUpRead;
				delete items[i].popUpInit;
				
				continue;
			} else {
				if(items[i].popUp != 'DROPDOWN' && items[i].popUp != 'CALENDAR') {
					delete items[i].popUpInit;
				}
				
				if(items[i].popUp == 'DATE1' || items[i].popUp == 'DATE2') {
					items[i].popUpRead = true;  /////////////////////////////////////////////// ???
				}
			}
			
			if(items[i].popUpInit == undefined || $.trim(items[i].popUpInit) == '' || $.trim(items[i].popUpInit) == 'null') {
				delete items[i].popUpInit;
			}
		}
		
		if(processTranIndex != -1) {
			for(var i = 0; i < processTran.length; i++) {
				if(processTran[i]['dropDown'].indexOf(',') > 0) {
					processTran[i]['dropDown'] = processTran[i]['dropDown'].replace(/,/gi, '#44#');
				}
				
				delete processTran[i]['columnIndex'];
				delete processTran[i]['width'];
				delete processTran[i]['sortIndex'];
				delete processTran[i]['sort'];
				delete processTran[i]['style'];
				delete processTran[i]['formatString'];
				delete processTran[i]['color'];
				delete processTran[i]['columnFixed'];
				delete processTran[i]['editable'];
				delete processTran[i]['filter'];
				delete processTran[i]['visible'];
				delete processTran[i]['excelHide'];
				delete processTran[i]['excelTemplateHide'];
				delete processTran[i]['popUp'];
				delete processTran[i]['popUpReq'];
				delete processTran[i]['popUpRead'];
				delete processTran[i]['popUpInit'];
			}
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
		var flag = 1;
		if(pageName.indexOf('하단') > 0) {
			flag = 2;
		} else if(pageName.indexOf('팝업') > 0) {
			flag = 3;
		}
		pageId = pageId + flag;
		
		var queryId = $.trim($('#queryId').val());
		queryId = queryId.substring(0, queryId.lastIndexOf('.')) + '.' + queryId.substring(queryId.lastIndexOf('.') + 1) + '.dummy';
		
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
		//console.log('gridProperty = ' + gridProperty);
		
		/*var flag = 1;
		if(pageName.indexOf('하단') > 0) {
			flag = 2;
		} else if(pageName.indexOf('팝업') > 0) {
			flag = 3;
		}*/
		
		/*if(processTranIndex != -1) {
			for(var i = processTran; i < processTran.length; i++) {
				
			}
		}*/
		
		/*that.printItems(items);
		console.log('')
		that.printItems(processTran);*/
		param[0] = {
				  pageId 		: pageId
				, pageName		: pageName
				, gridProperty	: gridProperty
				, columnProperty: JSON.stringify(items)
				, processTran	: JSON.stringify(processTran).length > 4 ? JSON.stringify(processTran) : ''
				//, flag			: flag
		};
		
		return 0;
	}, 
	
	createParamExcel: function(param/*, items, columnFixed*/) {
		var that = this;
		
		var pageId = $.trim($('#pageName').val());
		var pageName = pageId;
		
		pageId = pageId.substring(pageId.indexOf("(") + 1, pageId.indexOf(")"));
		pageName = pageName.substring(0, pageName.indexOf("("));
		var flag = 1;
		if(pageName.indexOf('하단') > 0) {
			flag = 2;
		} else if(pageName.indexOf('팝업') > 0) {
			flag = 3;
		}
		
		pageId = pageId + flag;
		
		var queryId = $.trim($('#queryId').val());
		queryId = queryId.substring(0, queryId.lastIndexOf('.')) + '.' + queryId.substring(queryId.lastIndexOf('.') + 1) + '.dummy';
		
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
			+ '#22#queryId#22#:#22#' + queryId + '#22#'
			+ '#44##22#editId#22#:' + $('#editId').val()
			+ '#44##22#checkId#22#:#22#' + $('#checkId').val() + '#22#'
			+ '#44##22#showRowCheckColumn#22#:' + ($('#checkId').val() == 'NONE' ? 'false' : 'true')
			+ '#44##22#showSelectionBorder#22#:false'
			+ '#44##22#pageRowCount#22#:' + pageRowCount
			+ '#44##22#usePaging#22#:' + (pageRowCount == INFINITE ? 'false':'true') 
			+ '#44##22#showPageButtonCount#22#:10'
			+ '#44##22#selectionMode#22#:#22#' + $.trim($('#checkId').val()) + '#22#'
			+ '#44##22#editable#22#:true'									
			+ '#44##22#showRowNumColumn#22#:' + $('#noId').val()
			+ '#44##22#enableSorting#22#:true'		
			+ '#44##22#enableFilter#22#:true'
			+ '#44##22#filterLayoutWidth#22#:200'
			+ '#44##22#filterLayoutHeight#22#:300'
			+ '#44##22#popUpTitle#22#:#22#' + popUpTitle + '#22#'
			+ '#44##22#popUpColSize#22#:' + popUpColSize
			+ '#44##22#copySingleCellOnRowMode#22#:true'
			+ '}';
		
		/*var flag = 1;
		if(pageName.indexOf('하단') > 0) {
			flag = 2;
		} else if(pageName.indexOf('팝업') > 0) {
			flag = 3;
		}*/
		param[0] = {
				  pageId 		: pageId
				, pageName		: pageName
				, gridProperty	: gridProperty
				//, flag			: flag
		};
		
		return 0;
	}, 
	
	retrieve: function() {
		var that = this;
		
		var param = mCommon.formGetParam('#form');		
		var pageName = $('#pageId').find('input').val();
		
		$.get(momWidget.contextPath() + '/widget/request/com.thirautech.mom.widget.widgetprop.dummy', param, function(data) {
			if(!data || data == undefined) {
				console.log('error');
				return;
			}
			
			if(data.length > 0) {
				$('#pageName').val((data[0]['pageName'] == undefined ? '페이지명' : data[0]['pageName']) + '(' + (data[0]['pageId'] == undefined ? 'MOMXX000' : data[0]['pageId'].substring(0, data[0]['pageId'].length - 1)) + ')');
				delete data[0].pageId;
				delete data[0].pageName;
				
				$('#queryId').val(data[0]['queryId'] == undefined ? 'namespace.queryId' : data[0]['queryId'].substring(0, data[0]['queryId'].lastIndexOf('.dummy')));
				delete data[0].queryId;				
				
				$('#noId').val(data[0]['noId'] == undefined ? false : data[0]['noId']);
				delete data[0].showRowNumColumn;
				
				$('#checkId').val(data[0]['checkId'] == undefined ? 'NONE' : data[0]['checkId']);
				delete data[0].checkId;
				
				$('#editId').val(data[0]['editId'] == undefined ? false : data[0]['editId']);
				delete data[0].editId;
				
				$('#pagingId').val(data[0]['pageRowCount'] == undefined || data[0]['pageRowCount'] == 0 || data[0]['pageRowCount'] == INFINITE ? '' :data[0]['pageRowCount']);
				delete data[0].pageRowCount;
				
				/*that.printItems(data);
				console.log('#### ' + data[0]['popUpColSize']);*/
				$('#popUpTitle').val((data[0]['popUpTitle'] == undefined ? '제목을 입력하세요' : data[0]['popUpTitle']) + '(' + (data[0]['popUpColSize'] == undefined ? 3 : parseInt(data[0]['popUpColSize'])) + ')');
				delete data[0].popUpTitle;		
				
				for(var i = 0; i < data.length; i++) {
					if(data[i]['dropDown'] != undefined) {
						data[i]['dropDown'] = data[i]['dropDown'].replace('/mom/request/com.thirautech.mom.', '').replace('.dummy', '');
					}
					
					if(data[i]['message'] != undefined && (data[i]['message'] == 'ACTION' || data[i]['message'] == 'action')) {
						data[i]['columnIndex'] = '';
					}
				}
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
			
			var totalDropDownCount = 0;
			var totalDropDownList = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i]['dropDown'] != undefined && $.trim(data[i]['dropDown']).length > 0 && data[i]['popUp'] != undefined && data[i]['popUp'] == 'DROPDOWN') {
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
			for(var i = 0; i < totalDropDownList.length; i++) {				
				var queryId = '';
				
				if(totalDropDownList[i].indexOf('?') > 0) {
					queryId = momWidget.contextPath() + '/mom/request/com.thirautech.mom.' + totalDropDownList[i].replace('?', '.dummy?')
				} else {
					queryId = momWidget.contextPath() + '/mom/request/com.thirautech.mom.' + totalDropDownList[i] + '.dummy';
				}
					
				const j = i;
				$.get(queryId, null, function(data1) {
					if(data1 == undefined) {
						console.log('error');
						return;
					}
					
					dropDownCount++;
					entireDatas = entireDatas.concat(data1);
					partialDatas[totalDropDownList[j]] = data1;
					
					
					data1.unshift({'code':'', 'name':'사용안함'});
					
					if(dropDownCount == totalDropDownCount) {
						/*AUIGrid.setColumnPropByDataField(grid1, 'popUpInit', {
							style: 'columnStyle',
							labelFunction: function(rowIndex, columnIndex, value, item) { 
								var retStr = '사용안함';
								for(var j = 0; j < entireDatas.length; j++) {
									if(entireDatas[j]['code'] == value) {
										retStr = entireDatas[j]['name'];
										break;							
									}
									
								}
								
								return retStr;
							},							
							editRenderer: {
								type: 'DropDownListRenderer',
								list: entireDatas,
								showEditorBtnOver: true,
								keyField: 'code', 
								valueField: 'name'
							}							
						});*/
						
						var colLayout = AUIGrid.getColumnLayout(grid1);
						var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
						var col = colLayout[colIndex];
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
							
							var colLayout = AUIGrid.getColumnLayout(grid1);
							var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
							var col = colLayout[colIndex];
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
							var colLayout = AUIGrid.getColumnLayout(grid1);
							var colIndex = AUIGrid.getColumnIndexByDataField(grid1, 'popUpInit');
							var col = colLayout[colIndex];
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
			AUIGrid.setGridData(grid1, data);
			
			that.preView();
		});
	},
	
	preView: function() {
		var gridColumnOrigin = AUIGrid.getColumnLayout(grid2);
		
		var that = this;
		
		var param = mCommon.formGetParam('#form');
		
		var pageId = $.trim($('#pageName').val());
		var pageName = pageId;
		
		pageId = pageId.substring(pageId.indexOf("(") + 1, pageId.indexOf(")"));
		pageName = pageName.substring(0, pageName.indexOf("("));
		
		/*var flag = 1;
		if(pageName.indexOf('하단') > 0) {
			flag = 2;
		} else if(pageName.indexOf('팝업') > 0) {
			flag = 3;
		}*/
		
		//param['flag'] = flag;
		$.get(momWidget.contextPath() + '/mom/request/com.thirautech.mom.widget.widgetprop.dummy', param, 
			function(data) {
				if(!data || data == undefined) {
					console.log('error');
					return;
				}
				
				that.printItems(data);
				
				var editId 			= data[0].editId == true ? true : false;
				var columnProperty 	= JSON.parse(data[0].columnProperty);
				
				var gridProperty 	= JSON.parse(data[0].gridProperty);
				var columnFixed 	= parseInt(data[0].columnFixed);
				
				gridProperty.usePaging = false;
				
				if(grid2 != undefined) {
					/*AUIGrid.destroy('#grid2');*/
					AUIGrid.destroy(grid2);
				}
				
				//that.printItems(columnProperty);
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
				/*var result = [{}];
				for(var i = 0; i < items.length; i++) {
					result[0][items[i].dataField] = '';
				}*/
				$.get(momWidget.contextPath() + '/mom/request/com.thirautech.mom.' + $.trim($('#queryId').val()) + '.dummy', {}, 
					function(data2) {
						var result = [{}];
						if(data2.length > 0) {
							result[0] = data2[0];
						} else {
							for(var i = 0; i < items.length; i++) {
								result[0][items[i].dataField] = '';
							}
						}
				
						AUIGrid.setGridData(grid2, result);
						//momWidget.splashHide();
						
						var sortParam = [{}];
						for(var i = 0; i < columnProperty.length; i++) {
							if(i == 0) {
								sortParam.splice(0, sortParam.length);
							}
												
							const data_field = columnProperty[i].dataField;
							
							// DropDown
							if(columnProperty[i].dropDown != undefined && $.trim(columnProperty[i].dropDown) != '') {
								/*const dropDown = columnProperty[i].dropDown;
								
								$.get(momWidget.contextPath() + drop_down, null, function(data) {*/
								const idx = i;
								$.get(momWidget.contextPath() + columnProperty[i].dropDown, null, 
									function(data1) {
										if(!data1 || data1 == undefined) {
											console.log('error');
											return;
										}
										
										var colSet = {
												style: 'columnStyle' + idx,
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
									}
								);						
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
								columnLayout[i].style = 'columnStyle' + idx;
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
					}
				);
			}
		);
	},
	
	callbackSave: function(param, data, callbackParam) {
		var that = this.MOMXX000;
		
		momWidget.splashHide();
		that.retrieve();
		
		if(param == 'SUCCESS') {
			momWidget.messageBox({type:"success",  width:"400", height: "145", html:"성공하였습니다."});
		} else {
			momWidget.messageBox({type:"danger",  width:"400", height: "145", html:"실패하였습니다."});
		}
	},
	
	callbackExcelUpload: function(param, data, callbackParam) {
		var that = this.MOMXX000;
		
		if(param == 'SUCCESS') {
			var prev = $('#pageId').val();
			var current = $('#pageName').val();
			var curr = current.substring(current.indexOf('(') + 1, current.indexOf(')'));
			
			var flag = 1;
			if(current.indexOf('하단') > 0) {
				flag = 2;
			} else if(current.indexOf('팝업') > 0) {
				flag = 3;
			}
			curr = curr + flag;
			
			if(prev != curr) {
				$.get(momWidget.contextPath() + '/mom/request/com.thirautech.mom.widget.page.dummy', null, function(data) {
					//micaCommon.comboBox.clear('#pageId');
					$('#pageId').jqxComboBox("clear");
					$('#pageId').jqxComboBox("source", []);
					
					/*var comboOptions = {searchMode : 'containsignorecase', autoComplete : true};
					var options = {local : data, textName : 'name', valueName : 'code', readonly : false};
					micaCommon.comboBox.set('#pageId',comboOptions, options);*/
					$('#pageId').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true});
					
					//var items = JSON.parse(JSON.stringify($('#pageId').jqxComboBox('source')));
					var items = $('#pageId').jqxComboBox('source');
					for(var j = 0; j < data.length; j++) {
						items.push({ label: data[j]['name'], value: data[j]['code'] });
					}
					
					$('#pageId').jqxComboBox('source', items);
					
					$('#pageId').jqxComboBox('selectItem', curr);
					$('#pageId').jqxComboBox('val', curr);
					
					that.retrieve();
					
					momWidget.splashHide();
					
					momWidget.messageBox({type:"success",  width:"400", height: "145", html:"성공하였습니다."});
				});
			} else {
				$('#pageId').jqxComboBox('selectItem', curr);
				$('#pageId').jqxComboBox('val', curr);
				
				that.retrieve();
				
				momWidget.splashHide();
				
				momWidget.messageBox({type:"success",  width:"400", height: "145", html:"성공하였습니다."});
			}
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
	    event.preventDefault();
	},
	
	fileInpuSet: function() {
		$('#excelPop1 .searcharea').css({'padding' : '5px 5px 0'});
		$('#excelPop1 .searcharea from').attr('id', 'fileUploadForm');
		$('#excelPop1 .searcharea form').html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	
	printItems: function(items) {
		for(var i = 0; i < items.length; i++) {
			console.log('[' + i + '] ' + JSON.stringify(items[i]));
		}
	}
};
$(document).ready(function(event) {
	MOMXX000.init();
});
