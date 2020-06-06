var grid1 = undefined;
var grid2 = undefined;
var grid9 = undefined;

var initPageLoad = true;

var INFINITE = 100000000;

var columnProperty1 = [{
		  dataField 	: 'columnIndex'
		, headerText 	: '컬럼 인덱스'
		, width			: 40
	},{
		  dataField 	: 'headerText' 
		, headerText 	: '헤더명'
		, style			: 'left-column'
	},{
		  dataField 	: 'KRHeaderText' 
		, headerText 	: '한글 헤더명'
		, style			: 'left-column'
		, visible		: false
	},{
		  dataField 	: 'dataField' 
		, headerText 	: '데이터 필드'
		, style			: 'left-column'
	}, {
		  dataField 	: 'width' 
		, headerText 	: '열 너비'
		, width			: 40
	},{
		  dataField 	: 'sortIndex' 
		, headerText 	: '정렬 우선'
		, width			: 40
	},{
		  dataField 	: 'sort' 
		, headerText 	: '행 정렬'
		, width			: 60
	},{
		  dataField 	: 'style' 
		, headerText 	: '셀 정렬'
		, width			: 60
	},{
		  dataField 	: 'formatString' 
		, headerText 	: '숫자 포맷'
		, width			: 80
	},{
		  dataField 	: 'color' 
		, headerText 	: '배경색'
		, width			: 80
	},{
		  dataField 	: 'dropDown' 
		, headerText 	: '드롭다운'
		, style			: 'left-column'
	},{
		  dataField 	: 'message' 
		, headerText 	: '대체 텍스트'
		, style			: 'left-column'
		, width			: 80
	},{
		  dataField 	: 'columnFixed' 
		, headerText 	: '고정 컬럼'
		, width			: 40
		, renderer 		: {
			  type 		: 'CheckBoxEditRenderer'
			, editable	: true
		}
	},{
		  dataField 	: 'editable'
		, headerText 	: '편집'
		, width			: 40
		, renderer 		: {
			  type 		: 'CheckBoxEditRenderer'
			, editable: true
		}
	},{
		  dataField 	: 'filter' 
		, headerText 	: '필터'
		, width			: 40
		, renderer 		: {
			  type 		: 'CheckBoxEditRenderer'
			, editable: true
		}
	},{
		  dataField 	: 'visible'
		, headerText 	: '화면 보이기'
		, width			: 40
		, renderer 		: {
			  type 		: 'CheckBoxEditRenderer'
			, editable: true
		}
	},{
		  dataField 	: 'excelHide'
		, headerText 	: '엑셀 보이기'
		, width		: 40
		, renderer 	: {
			  type 	  : 'CheckBoxEditRenderer'
			, editable: true
		}
	},{
		  dataField 	: 'excelTemplateHide' 
		, headerText 	: '엑셀양식 보이기'
		, width		: 60
	},{
		  dataField 	: 'popUp'
		, headerText 	: '팝업 등록'
		, width		: 60
	},{
		  dataField 	: 'popUpReq'
		, headerText 	: '팝업 필수'
		, width			: 60
		, renderer 		: {
			  type 	  	: 'CheckBoxEditRenderer'
			, editable	: true
		}
	},{
		  dataField 	: 'popUpRead'
		, headerText 	: '팝업 읽기전용'
		, width			: 60
	},{
		  dataField 	: 'popUpInit' 
		, headerText 	: '팝업 초기값'
		, width			: 100
		, style			: 'columnStyle'
	}
];

var gridProperty1 = {
	  'showRowNumColumn': true
	, 'showSelectionBorder': false
	, 'editable': true			
	, 'enableSorting': true	
	, 'showRowCheckColumn': true
	//, 'rowCheckToRadio': true
	, 'enableFilter': true
	, 'filterLayoutWidth': 200
	, 'filterLayoutHeight': 300
	, 'selectionMode': 'multipleRows'
	, 'copySingleCellOnRowMode': true
	, 'softRemoveRowMode': false
};

// 2020.04.12 hyjeong begin
var singleRowIndex = undefined; 
// 2020.04.12 hyjeong end

var MOMXX000 = {
	init: function() {		
		Language.init();
		this.comboBox();
		this.grid1();
		this.grid9();
		this.event();
		this.fileInpuSet();
	}, 
	
	// 2020.04.12 hyjeong begin
	design: function(idx, color, align) {
		if(color.indexOf('H') >= 0) {
			color = color.replace(/H/gi, '#');
			$('head').append('<style>.headerStyle' + idx + '{background:' + color + ';}</style>');
		} else {
			if(align != undefined && align.indexOf('-') > 0) {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
			} else {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:center}</style>');
			}
		}
	},
	// 2020.04.12 hyjeong end
	
	grid1: function() {
		grid1 = AUIGrid.create('#grid1', columnProperty1, gridProperty1);
		//tuCommon.cellClick(grid1, 'single');
		tuCommon.cellClick(grid1);
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
			$('#noId').val(false);
			$('#checkId').val('NONE');
			$('#editId').val(false);
			$('#cellMergeId').val(false);
			$('#showFooterId').val(false);
			$('#popUpTitle').val('팝업창 제목을 입력하세요(3)');
			$('#pagingId').val('100');
			
			var newRow = [{
				'columnIndex'			:0
				, 'headerText'			:'헤더명'
				, 'dataField'			:'dataField'
				, 'width'				:''
				, 'visible'				:false
				, 'excelHide'			:false
				, 'excelTemplateHide'	:0
				, 'popUpReq'			:false
				, 'popUpRead'			:0
			}];
				
			AUIGrid.setGridData(grid1, newRow);
		});
		
		$(document).on('click', '#saveBtn', function() {
			var param = [{}];			
			var result = that.createParam(param);
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
				  'columnIndex'			:columnIndex
				, 'headerText'			:'헤더명'
				, 'dataField'			:'dataField'
				, 'width'				:''
				, 'visible'				:false
				, 'excelHide'			:false
				, 'excelTemplateHide'	:0
				, 'popUpReq'			:false
				, 'popUpRead'			:0
			};
				
			AUIGrid.addRow(grid1, newRow, 'last');
		});
		
		$(document).on('click', '#delBtn', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(grid1);
			if(checkedItems.length < 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 행을 선택하여 주십시오.'});
				return;
			}
			
			momWidget.messageBox({type:'info', width:'400', height: '145', html: '선택된 행을 삭제 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', 
				after:function(){
					for(var i = checkedItems.length - 1; i >= 0; i--) {
						const rowIndex = checkedItems[i].rowIndex;
						AUIGrid.removeRow(grid1, rowIndex);
					}
				}
			}});			
		});
		
		// 엑셀 다운 버튼
		$(document).on('click', '#excelDownBtn', function() {
			var items = AUIGrid.getGridData(grid1);
			
			for(var i = 0; i < items.length; i++) {
				items[i]['columnFixed'] = items[i]['columnFixed'] ? '1' : '';
				items[i]['editable'] = items[i]['editable'] ? '1' : '';
				items[i]['filter'] = items[i]['filter'] ? '1' : '';
				items[i]['visible'] = items[i]['visible'] ? '1' : '';
				items[i]['excelHide'] = items[i]['excelHide'] ? '1' : '';
				items[i]['popUpReq'] = items[i]['popUpReq'] ? '1' : '';
			}
			
			if(grid9 == undefined) {
				delete columnProperty1[2]['visible'];
				grid9 = AUIGrid.create('#grid9', columnProperty1, {showRowNumColumn: false});
				columnProperty1[2]['visible']= false;
			} 
			
			AUIGrid.setGridData(grid9, items);			
			AUIGrid.exportToXlsx(grid9, {fileName : 'MOM_WIDGET_' + $('#pageId').val() + '_' + get_current_date('yyyy-mm-dd')});
			
			AUIGrid.clearGridData(grid9);
		});
		
		// 엑셀등록 팝업
		$(document).on('click', '#excelUpBtn', function() {
			$('#excelGrid1').momModal('show');
			$('#file').val('');
		});
		
		$(document).on('click', '#cancelBtnEX1, ' + '.bntpopclose', function() {
			$('#excelGrid1').momModal('hide');		
		});
		
		// 엑셀등록저장 버튼
		$(document).on('click', '#saveBtnEX1', function() {	
			excel_upload_new(file, grid1, function() {
	        	$('#excelGrid1').momModal('hide');
	        });
		});
		
		$(document).on('click', '#delPageBtn', function() {
			momWidget.messageBox({type:'info', width:'400', height: '145', html: '작성중인 페이지를 삭제 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', 
				after:function() {
					var pageName = $('#pageName').val();
					var flag = 1;
					if(pageName.indexOf('하단 팝업 하단') > 0) {
						flag = 6;
					} else if(pageName.indexOf('하단 팝업') > 0) {
						flag = 5;
					} else if(pageName.indexOf('팝업 하단') > 0) {
						flag = 4;
					} else if(pageName.indexOf('팝업') > 0) {
						flag = 3;
					} else if(pageName.indexOf('하단') > 0) {
						flag = 2;
					}
					
					var pageId = pageName.substring(pageName.indexOf('(') + 1, pageName.indexOf(')')) + flag;
					
					url = momWidget.contextPath() + '/widget/request/com.thirautech.mom.widget.widgetprop.dummy';
					var param = {pageId: pageId};
					$.ajax({
						type 		: 'DELETE',
						url  		: url,
						data 		: JSON.stringify(param),
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success     : function(data) {
							if(data['result'] == 'success') {
								that.getPageIdList();
								momWidget.messageBox({type:"success",  width:"400", height: "145", html:"성공하였습니다."});
							} else {
								if(data['p_err_msg'] != null && data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
								} else {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});  
								}
							}
						},
						error       : function(error) {
							if(data['p_err_msg'] != null && data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
								momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
							} else {
								if(data['p_err_msg'] != null && data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
								} else {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});  
								}
							}
						},
						fail        : function(fail) {
							if(data['p_err_msg'] != null && data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
								momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
							} else {
								if(data['p_err_msg'] != null && data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
								} else {
									momWidget.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});  
								}
							}
						}
					});
				}
			}});
		});
		
		// HTML 생성 버튼
		/*$(document).on('click', '#createHTML', function() {
			var pageId = $.trim($('#pageName').val()).substring($.trim($('#pageName').val()).indexOf("(") + 1, $.trim($('#pageName').val()).indexOf(")"));
			window.open('/TU_Platform/util/createHtml.jsp?fileName=' + pageId);
		});*/
		
		var $form = $('#form');
		var $objs = $form.find('input[id]');
		for (var i = 0; i < $objs.length; i++) {
			$(document).on('keydown', $($objs[i]), function(e) {
				if (e.keyCode == 13) {
					$('#findBtn').click();
				}			
			});
		}
	},
	
	comboBox: function() {
		// 페이지리스트
		this.getPageIdList();
		
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
		data = [{'code':'NONE','name':'사용안함'},{'code':'radioButton','name':'라디오버튼'},{'code':'singleRow','name':'단일선택'},{'code':'multipleRows','name':'다중선택'},{'code':'singleRowCell','name':'단일선택(선택안함)'},{'code':'multipleRowsCell','name':'다중선택(선택안함)'}];

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
		
		width = $('#cellMergeId').width() + 26;
		height = $('#cellMergeId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
		data = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];

		$('#cellMergeId').jqxComboBox({width : width, height : height, searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		
		$('#cellMergeId').removeClass('w-select');
		
		data1 = $('#cellMergeId').jqxComboBox('source');
		for(var i = 0; i < data.length; i++) {
			data1.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#cellMergeId').jqxComboBox('source', data1);
		$('#cellMergeId').find('input').attr('readonly', false);
		
		width = $('#showFooterId').width() + 26;
		height = $('#showFooterId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
		data = [{'code':false,'name':'사용안함'},{'code':true,'name':'사용'}];

		$('#showFooterId').jqxComboBox({width : width, height : height, searchMode : 'containsignorecase', autoComplete : true, selectionMode: 'dropDownList'});
		
		$('#showFooterId').removeClass('w-select');
		
		data1 = $('#showFooterId').jqxComboBox('source');
		for(var i = 0; i < data.length; i++) {
			data1.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#showFooterId').jqxComboBox('source', data1);
		$('#showFooterId').find('input').attr('readonly', false);
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
		var searchFilterIndex = -1, processTranIndex = -1;
		var searchFilter = [], processTran = [];
		for(var i = 0, j = 0; i < items.length; i++) {
			delete items[i]._$uid;
			delete items[i]['columnFixed'];
			
			if(items[i]['message'] != undefined && items[i]['message'] == 'ACTION') {
				processTranIndex = i;
				processTran.push(items[i]);
				
				continue;
			} else if(items[i]['message'] != undefined && items[i]['message'] == 'FILTER') {
				searchFilterIndex = i;
				searchFilter.push(items[i]);
				
				continue;
			}
			
			items[i]['columnIndex'] = j++;
			
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
			
			if(items[i]['dropDown'] == undefined || $.trim(items[i]['dropDown']) == '') {
				delete items[i]['dropDown'];
			} else {
				items[i]['dropDown'] = $.trim(items[i]['dropDown']).replace(/,/gi, '#44#').replace(/'/gi, '#22#');
				//items[i]['editable'] = true;  /////////////////////////////////////////////// ???
				/*delete items[i]['style'];
				delete items[i]['color'];*/   // 일단 보류, 몰렜다.., 왜 내가 일케 했는지
			}
			
			if(items[i]['message'] == undefined || $.trim(items[i]['message']) == ''/* || !items[i]['visible']*/) {
				delete items[i]['message'];
			} else {
				items[i]['message'] = $.trim(items[i]['message'].replace(/,/gi,'#44#'));
			}
			
			// editable
			if(items[i]['editable'] == undefined || $.trim(items[i]['editable']) == '' || $.trim(items[i]['editable']) == 'false' || !items[i]['editable']) {
				items[i]['editable'] = false;
			} else {
				items[i]['editable'] = true;
			} 
			
			if(items[i]['filter'] == undefined || $.trim(items[i]['filter']) == '' || $.trim(items[i]['filter']) == 'false' || !items[i]['filter']) {
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
			
			if(items[i]['excelTemplateHide'] == undefined || items[i]['excelTemplateHide'] == '') {
				items[i]['excelTemplateHide'] = 0;
			} /*else {
				items[i]['excelTemplateHide'] = true;
			}*/
			
			if(items[i]['popUp'] == undefined || $.trim(items[i]['popUp']) == '') {
				delete items[i]['popUp'];
				delete items[i]['popUpReq'];
				delete items[i]['popUpRead'];
				delete items[i]['popUpInit'];
				
				continue;
			} 
			
			if($.trim(items[i]['popUpInit']) == '' || items[i]['popUpInit'] == 'null') {
				delete items[i]['popUpInit'];
			}
		}
		
		for(var i = items.length - 1; i >= 0; i--) {
			if(items[i]['message'] != undefined && (items[i]['message'] == 'FILTER' || items[i]['message'] == 'ACTION')) {
				items.splice(i, 1);
			}
		}
		
		if(processTranIndex != -1) {
			that.columnOrder(processTran);
			for(var i = 0; i < processTran.length; i++) {
				if(processTran[i]['dropDown'] != undefined && processTran[i]['dropDown'].indexOf(',') > 0) {
					processTran[i]['dropDown'] = processTran[i]['dropDown'].replace(/,/gi, '#44#');
				}
				
				//delete processTran[i]['columnIndex'];
				delete processTran[i]['width'];
				delete processTran[i]['sortIndex'];
				delete processTran[i]['sort'];
				delete processTran[i]['style'];
				delete processTran[i]['formatString'];
				delete processTran[i]['color'];
				delete processTran[i]['columnFixed'];
				delete processTran[i]['editable'];
				//delete processTran[i]['filter'];
				delete processTran[i]['visible'];
				delete processTran[i]['excelHide'];
				delete processTran[i]['excelTemplateHide'];
				delete processTran[i]['popUp'];
				delete processTran[i]['popUpReq'];
				delete processTran[i]['popUpRead'];
				delete processTran[i]['popUpInit'];
			}
		}
		
		if(searchFilterIndex != -1) {
			that.columnOrder(searchFilter);
			for(var i = 0; i < searchFilter.length; i++) {
				if(searchFilter[i]['dropDown'] != undefined && searchFilter[i]['dropDown'].indexOf(',') > 0) {
					searchFilter[i]['dropDown'] = searchFilter[i]['dropDown'].replace(/,/gi, '#44#');
				}
				if(searchFilter[i]['dropDown'] != undefined && searchFilter[i]['dropDown'].indexOf("'") > 0) {
					searchFilter[i]['dropDown'] = searchFilter[i]['dropDown'].replace(/'/gi, '#22#');
				}
				
				//delete searchFilter[i]['columnIndex'];
				if(searchFilter[i]['width'] == '') {
					delete searchFilter[i]['width'];
				}
				if(searchFilter[i]['sortIndex'] == '' || searchFilter[i]['sortIndex'] == undefined || searchFilter[i]['sortIndex'] == 'null') {
					delete searchFilter[i]['sortIndex'];
				}
				delete searchFilter[i]['sort'];
				delete searchFilter[i]['style'];
				delete searchFilter[i]['formatString'];
				// 2020.04.12 hyjeong begin
				//delete searchFilter[i]['color'];
				if(searchFilter[i]['color'] == '' || searchFilter[i]['color'] == undefined || searchFilter[i]['color'] == 'null') {
					delete searchFilter[i]['color'];
				}
				// 2020.04.12 hyjeong end
				delete searchFilter[i]['columnFixed'];
				delete searchFilter[i]['editable'];
				//delete searchFilter[i]['filter'];
				delete searchFilter[i]['visible'];
				delete searchFilter[i]['excelHide'];
				delete searchFilter[i]['excelTemplateHide'];
				//delete searchFilter[i]['popUp'];
				//delete searchFilter[i]['popUpReq'];
				//delete searchFilter[i]['popUpRead'];
				//delete searchFilter[i]['popUpInit'];
				if(searchFilter[i]['popUp'] == 'CALENDAR') {
					delete searchFilter[i]['dropDown'];
				}
				/*if(searchFilter[i]['dropDown'] != undefined && searchFilter[i]['dropDown'] != '') {
					searchFilter[i]['dropDown'] = searchFilter[i]['dropDown'].replace(/,/gi, '#44#').replace(/'/gi, '#22#');
				}*/
				if($.trim(searchFilter[i]['popUpInit']) == '' || searchFilter[i]['popUpInit'] == 'null') {
					delete searchFilter[i]['popUpInit'];
				}
			}
		}
		
		for(var i = 1; i < sortIndexExist.length; i++) {
			if(sortIndexExist[i] == undefined) {
				return 202;
			}
		}
		
		// 2020.04.12 hyjeong begin
		var pageId = $.trim($('#pageName').val());
		var pageName = pageId;
		var gridSeq = ($('#gridSeq').val() == undefined || $('#gridSeq').val() == '') ? undefined : $.trim($('#gridSeq').val());
		
		pageId = pageId.substring(pageId.indexOf("(") + 1, pageId.indexOf(")"));
		pageName = pageName.substring(0, pageName.indexOf("("));
		
		if(gridSeq == undefined) {
			var flag = 1;
			if(pageName.indexOf('하단 팝업 하단') > 0) {
				flag = 6;
			} else if(pageName.indexOf('하단 팝업') > 0) {
				flag = 5;
			} else if(pageName.indexOf('팝업 하단') > 0) {
				flag = 4;
			} else if(pageName.indexOf('팝업') > 0) {
				flag = 3;
			} else if(pageName.indexOf('하단') > 0) {
				flag = 2;
			}
			
			pageId = pageId + flag;
		} else {
			pageId += gridSeq;
		}
		// 2020.04.12 hyjeong end
		
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
			+ ',"showRowCheckColumn":' + ($('#checkId').val() == 'NONE' ? false : true)
			+ ',"showSelectionBorder":false'
			+ ',"pageRowCount":' + pageRowCount 
			+ ',"usePaging":' + (pageRowCount == INFINITE ? false : true)
			+ ',"showPageButtonCount":10'
			+ ',"selectionMode":"' + $.trim($('#checkId').val()) + '"'
			+ ',"editable":true'	
			+ ',"editableOnFixedCell":true'
			+ ',"showRowNumColumn":' + $('#noId').val()
			+ ',"enableSorting":true'		
			+ ',"enableFilter":true'
			+ ',"filterLayoutWidth":200'
			+ ',"filterLayoutHeight":300'
			+ ',"popUpTitle":"' + popUpTitle + '"'
			+ ',"popUpColSize":' + popUpColSize
			+ ',"copySingleCellOnRowMode":true'
			+ ',"displayTreeOpen":true'
			+ ($('#cellMergeId').val() ? ',"enableCellMerge":true,"cellMergePolicy":"withNull","rowSelectionWithMerge":true' : '')
			+ ($('#showFooterId').val() ? ',"showFooter":true,"footerHeight":24' : '')
			+ '}';
		
		var offset = $('#editId').val() ? 1 : 0;
		var indexColumn = [];
		for(var i = 0; i < items.length; i++) {
			var json = {};
			
			if(/*items[i]['popUp'] == 'DROPDOWN' && */items[i]['dropDown'] != undefined && items[i]['dropDown'].length > 1) {
				json['popUp'] = 'DROPDOWN';
			} else if(items[i]['popUp'] == 'CALENDAR') {
				json['popUp'] = 'CALENDAR';
			} 
			
			if(items[i]['sortIndex'] != undefined && items[i]['sortIndex'].length > 0) {
				json['sortIndex'] = items[i]['sortIndex'];
			}
			
			if(items[i]['color'] != undefined && items[i]['color'].length > 0) {
				json['color'] = items[i]['color'];
			}
			
			if(items[i]['filter'] != undefined && items[i]['filter']) {
				json['filter'] = true;
			}
			
			if(items[i]['message'] != undefined && items[i]['message'].length > 0) {
				json['message'] = items[i]['message'];
			}
			
			if(items[i]['formatString'] != undefined && items[i]['formatString'].length > 0 && items[i]['formatString'].indexOf('#') < 0) {
				json['formatString'] = items[i]['formatString'];
			}
			
			if(JSON.stringify(json).length > 2) {
				json['INDEX'] = i + offset;
				indexColumn.push(json);
			}
		}
		
		var locale = sessionStorage.getItem('locale');
		if(locale == 'KR') {
			for(var i = 0; i < items.length; i++) {
				items[i]['KRHeaderText'] = items[i]['headerText'];
			}
		} else {
			for(var i = 0; i < items.length; i++) {
				items[i][locale + 'HeaderText'] = items[i]['headerText'];
				if(items[i]['KRHeaderText'] != undefined && items[i]['KRHeaderText'] != '') {
					items[i]['headerText'] = items[i]['KRHeaderText'];	
				}				
			}
		}
		
		if(items.length > 0) {
			console.log(JSON.stringify(items[0]));
		}
		
		param[0] = {
			  pageId 		: pageId
			, pageName		: pageName
			, gridProperty	: gridProperty
			, columnProperty: JSON.stringify(items)
			, processTran	: JSON.stringify(processTran).length > 2 ? JSON.stringify(processTran) : ''
			, searchFilter	: JSON.stringify(searchFilter).length > 2 ? JSON.stringify(searchFilter) : ''
			, indexColumn	: JSON.stringify(indexColumn).length > 2 ? JSON.stringify(indexColumn) : ''
		};
		
		this.createParamPost(param, offset);
		
		return 0;
	},
	
	createParamPost: function(param, offset) {
		var columnProperty = JSON.parse(param[0]['columnProperty']);
		for(var i = 0; i < columnProperty.length; i++) {
			var json = columnProperty[i];
			const data_field = json['dataField'];
				
			if(json['popUp'] == 'DROPDOWN') {
			} else if(json['popUp'] == 'CALENDAR') {
				json['dataType'] = 'date';
				//json['formatString'] = 'yyyy-mm-dd';
				json['editRenderer'] = {
					 type: 'CalendarRenderer',
					 openDirectly: true,
					 onlyCalendar: true
				};
			} 
			
			// Begin Color
			if(json['color'] != undefined) {
				var color = json['color'];
				var style = json['style'];
				//that.design(INDEX, color, style);
				json['style'] = 'columnStyle' + (offset + i);
			}
			// End Color
			
			// Begin Filter
			/*if(json['filter'] == true) {
			} else {
				delete json['filter'];
			}*/
			// End Filter
			
			columnProperty[i] = json;
		}
		
		param[0]['columnProperty'] = JSON.stringify(columnProperty);
	},
	
	// Deprecated.., 더이상 사용하지 않음
	createParamExcel: function(param) {
		return 0;
	}, 
	
	retrieve: function() {
		var that = this;
		
		var param = mCommon.formGetParam('#form');		
		var pageName = $('#pageId').find('input').val();
		
		var queryId = '/widget/request/com.thirautech.mom.widget.widgetprop.dummy';
		$.get(momWidget.contextPath() + queryId, param, function(data) {
			if(!data || data == undefined) {
				console.log('error');
				return;
			}
			
			var pageId = '';
			if(data.length > 0) {
				$('#pageName').val((data[0]['pageName'] == undefined ? '페이지명' : data[0]['pageName']) + '(' + (data[0]['pageId'] == undefined ? 'MOMXX000' : data[0]['pageId'].substring(0, data[0]['pageId'].length - 1)) + ')');
				pageId = data[0].pageId;
				delete data[0].pageId;
				delete data[0].pageName;
				
				// 2020.04.12 hyjeong begin
				//$('#gridSeq').val(pageId.substring(pageId.length - 1, pageId.length));
				// 2020.04.12 hyjeong end
				
				$('#queryId').val(data[0]['queryId'] == undefined ? 'namespace.queryId' : (data[0]['queryId'].indexOf('.dummy') ? data[0]['queryId'].replace(/.dummy/,'') : data[0]['queryId']));
				delete data[0].queryId;				
				
				$('#noId').val(data[0]['noId'] == undefined ? false : data[0]['noId']);
				delete data[0].showRowNumColumn;
				
				$('#checkId').val(data[0]['checkId'] == undefined ? 'NONE' : data[0]['checkId']);
				delete data[0].checkId;
				
				$('#editId').val(data[0]['editId'] == undefined ? false : data[0]['editId']);
				delete data[0].editId;
				
				$('#cellMergeId').val(data[0]['cellMergeId'] == undefined ? false : data[0]['cellMergeId']);
				$('#showFooterId').val(data[0]['showFooterId'] == undefined ? false : data[0]['showFooterId']);
				
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
			                  {'code':'NUMBER', 	'name':'숫자'},
			                  {'code':'NUMBER1', 	'name':'숫자(1자리)'},
			                  {'code':'NUMBER4', 	'name':'숫자(4자리)'},
			                  {'code':'NUMBER6', 	'name':'숫자(6자리)'},
			                  {'code':'TEXT', 		'name':'텍스트'}, 
			                  {'code':'DROPDOWN', 	'name':'드롭다운'}, 
			                  {'code':'CALENDAR', 	'name':'캘린더'}, 
			                  {'code':'DATE1', 		'name':'현재날짜'},
			                  {'code':'DATE2', 		'name':'현재시간'},
			                  {'code':'FILE', 		'name':'파일'}
			                 ];
			AUIGrid.setColumnPropByDataField(grid1, 'popUp', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value == 'NORMAL') {
						retStr = '일반';
					} else if(value == 'NUMBER') {
						retStr = '숫자';
					} else if(value == 'NUMBER1') {
						retStr = '숫자(1자리)';
					} else if(value == 'NUMBER4') {
						retStr = '숫자(4자리)';
					} else if(value == 'NUMBER6') {
						retStr = '숫자(6자리)';
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
					} else if(value == 'FILE') {
						retStr = '파일';
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
					
					data1.unshift({'code':'SECOND ROW', 'name':'두번째 행'});
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
			for(var i = 0; i < data.length; i++) {
				if(data[i]['dropDown'] == undefined || data[i]['dropDown'] == '') {
					continue;
				}
				
				data[i]['dropDown'] = data[i]['dropDown'].replace(/\"/gi,"'");
			}
			
			//////////////////////////////////////////////////////////////////////////////////////////
			/*if(sessionStorage.getItem('locale') != 'KR') {
				var param = {
					  divisionCd : sessionStorage.getItem('divisionCd')
					, companyCd  : sessionStorage.getItem('companyCd' )
					, locale     : sessionStorage.getItem('locale')
					, pageId     : 'GRID'
					, useYn      : 'Y'
					, description: pageId
				}
				
				mom_ajax('R', 'widget.widgetheaders', param, function(result, data1) {
					if(result != 'SUCCESS' || data1.length < 1) {
						return;
					}
					
					var headers = {};
					for(var i = 0; i < data1.length; i++) {
						headers[data1[i]['codeType']] = data1[i]['keyword'];
					}
					
					for(var i = 0; i < data.length; i++) {
						if(headers[data[i]['dataField']] != undefined && (data[i]['message'] != 'FILTER' && data[i]['message'] != 'ACTION')) {
							data[i]['headerText'] = headers[data[i]['dataField']];
						}
					}
				}, undefined, undefined, undefined, 'sync');
			}*/
			var locale = sessionStorage.getItem('locale');
			if(sessionStorage.getItem('locale') != 'KR') {
				for(var i = 0; i < data.length; i++) {
					if(data[i][locale + 'HeaderText'] != undefined) {
						data[i]['headerText'] = data[i][locale + 'HeaderText']; 
					}
				}
			}
			//////////////////////////////////////////////////////////////////////////////////////////
			
			AUIGrid.setGridData(grid1, data);
			
			that.preView();
		});
	},
	
	preView: function() {
		var that = this;
		var param = mCommon.formGetParam('#form');
		var pageId = $.trim($('#pageName').val());
		var pageName = pageId;
		
		pageId = pageId.substring(pageId.indexOf("(") + 1, pageId.indexOf(")"));
		pageName = pageName.substring(0, pageName.indexOf("("));
		
		var queryId = '/mom/request/com.thirautech.mom.widget.widgetprop.dummy';
		$.get(momWidget.contextPath() + queryId, param, function(data) {
			if(!data || data == undefined) {
				console.log('error');
				return;
			}
			
			var queryId = '/mom/request/com.thirautech.mom.' + $.trim($('#queryId').val()) + '.dummy';
			$.get(momWidget.contextPath() + queryId, param, function(data2) {
				var editId 			= $('#editId').val() == true ? true : false;
				var columnLayout1 	= JSON.parse(data[0].columnProperty);
				
				var gridProperty 	= JSON.parse(data[0].gridProperty);
				// 2020.04.12 hyjeong begin
				if(gridProperty['checkId'] == 'radioButton') {
					gridProperty['selectionMode'] = 'singgleRow';
					gridProperty['rowCheckToRadio'] = true;
				} else if(gridProperty['checkId'] == 'singleRow' || gridProperty['checkId'] == 'singleRowCell') {
					gridProperty['selectionMode'] = 'singgleRow';
					//gridProperty['singleRowCell'] = true;
				} else if(gridProperty['checkId'] == 'multipleRows' || gridProperty['checkId'] == 'multipleRowsCell') {
					gridProperty['selectionMode'] = 'multipleRows';
					//gridProperty['multipleRowsCell'] = true;
				}
				// 2020.04.12 hyjeong end
				delete gridProperty['showFooter'];
				delete gridProperty['footerHeight'];
				var columnFixed 	= parseInt(data[0].columnFixed);
				
				gridProperty['usePaging'] = false;
				if(grid2 != undefined) {
					AUIGrid.destroy(grid2);
				}
				
				// 2020.04.12 hyjeong begin
				// Begin Button
				for(var idx = 0; idx < columnLayout1.length; idx++) {
					const i = idx;
					if(columnLayout1[i]['color'] != undefined && columnLayout1[i]['color'] == 'BUTTON') {
						const data_field = columnLayout1[i]['dataField'];
						const headerText = columnLayout1[i]['headerText'];
						const width = columnLayout1[i]['width'];
						var labelText = columnLayout1[i]['formatString']; 
						var colSet = {							  
							  dataField		: data_field
							, headerText	: headerText
							, width			: width
							, renderer		: {
								  type		: 'ButtonRenderer'
								, labelText	: labelText
								, onclick	: function(rowIndex, columnIndex, value, item) {
								}
							}
						};
						
						columnLayout1[i] = colSet;
					}
				}
				// 2020.04.12 hyjeong end				
				
				if(editId) {
					var editColumn = {'headerText':'Edit','dataField':'Edit','width':40,'visible':true,
						sortable : false,
						renderer : { type : 'TemplateRenderer'}, 									// renderer를 설정 해줘야 아래 labelFunction이 호출된다.
						labelFunction: function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
							return '<div class="GridEditBtn2 w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + 0 + '> </div>';
						}
					}

					columnLayout1.unshift(editColumn);
					grid2 = AUIGrid.create('#grid2', columnLayout1, gridProperty);
					
					columnLayout1 = AUIGrid.getColumnLayout(grid2);
					if(columnFixed > 0) {
						columnFixed++;
					}
				} else {
					grid2 = AUIGrid.create('#grid2', columnLayout1, gridProperty);
				}
				
				// 2020.04.12 hyjeong begin
				AUIGrid.unbind(grid2, 'cellClick');
				if(gridProperty['checkId'] == 'singleRow') {
					that.cellClick(grid2, 'single');
				} else if(gridProperty['checkId'] == 'multipleRows') {
					that.cellClick(grid2);
				}
				// 2020.04.12 hyjeong end
				
				if(columnFixed > 0) {
					AUIGrid.setFixedColumnCount(grid2,columnFixed);
				}
				
				// Dummy 행 넣기
				var items = AUIGrid.getGridData(grid1);
				var param = {};
				param['startPage'] = 1;
				param['endPage'] = 1;
				
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
				for(var idx = 0; idx < columnLayout1.length; idx++) {
					if(idx == 0) {
						sortParam.splice(0, sortParam.length);
					}
							
					const i = idx;
					const data_field = columnLayout1[i]['dataField'];
					
					// Begin DropDown
					if(columnLayout1[i]['dropDown'] != undefined && $.trim(columnLayout1[i]['dropDown']) != '') {
						var queryId = '';
						if(columnLayout1[i]['dropDown'].indexOf('?') > 0) {
							queryId = '/mom/request/com.thirautech.mom.' + columnLayout1[i]['dropDown'].replace('?', '.dummy?')
						} else {
							queryId = '/mom/request/com.thirautech.mom.' + columnLayout1[i]['dropDown'] + '.dummy';
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
					
					// Begin Message
					if(columnLayout1[i]['message'] != undefined && $.trim(columnLayout1[i]['message']) != '') {
						const message = columnLayout1[i]['message'];
						
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
					
					// Begin Color
					// 2020.04.12 hyjeong begin
					if(columnLayout1[i]['color'] != undefined && $.trim(columnLayout1[i]['color']) != '' && columnLayout1[i]['color'] != 'BUTTON') {
						const idx = i;
						const color = columnLayout1[i]['color']; 
						const style = columnLayout1[i]['style'];
						that.design(idx, color, style);
						var columnLayout1 = AUIGrid.getColumnLayout(grid2);
						if(color.indexOf('H') >= 0) {
							columnLayout1[i]['headerStyle'] = 'headerStyle' + idx;
						} else {
							columnLayout1[i]['style'] = 'columnStyle' + idx;
						}
					} else if(columnLayout1[i]['style'] != undefined && columnLayout1[i]['style'].indexOf('columnStyle') >= 0) {
						delete columnLayout1[i]['style'];
					} else if(columnLayout1[i]['headerStyle'] != undefined && columnLayout1[i]['headerStyle'].indexOf('headerStyle') >= 0) {
						delete columnLayout1[i]['headerStyle'];
					}
					
					AUIGrid.changeColumnLayout(grid2, columnLayout1);
					// 2020.04.12 hyjeong end
					
					// Begin Sort
					if(columnLayout1[i]['sortIndex'] != undefined && $.trim(columnLayout1[i]['sortIndex']) != '') {
						const sortIndex = columnLayout1[i]['sortIndex'] - 1;
						const asc = columnLayout1[i]['sort'];
						sortParam[sortIndex] = {dataField : data_field, sortType : asc};
					}
					
					// Begin Filter
					if(columnLayout1[i]['filter']) {
						var columnLayout1 = AUIGrid.getColumnLayout(grid2);
						columnLayout1[i]['filter'] = {showIcon:true};
						AUIGrid.changeColumnLayout(grid2, columnLayout1);
					}
					
					// 2020.04.12 hyjeong begin
					// Begin Button
					/*if(columnLayout1[i]['color'] != undefined && columnLayout1[i]['color'] == 'BUTTON') {
						var colSet = {
							  headerText	: columnLayout1[i]['headerText']
							, dataField		: data_field
							, renderer		: {
								  type		: 'ButtonRenderer'
								, labelText	: labelText
								, onclick	: function(rowIndex, columnIndex, value, item) {
								}
							}
						};
						
						AUIGrid.setColumnPropByDataField(grid2, data_field, colSet);
					}*/
					// 2020.04.12 hyjeong end
				}
				
				if(sortParam.length > 0) {
					AUIGrid.setSorting(grid2, sortParam);
				}
			});
		});		
	},
	
	callbackSave: function(result, data, param, callbackParam) {
		var that = this.MOMXX000;
		
		$('#pageId').val(data['pageId']);
		that.retrieve();
		
		momWidget.splashHide();
		if(result != 'SUCCESS') {
			if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
				momWidget.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
			} else {
				momWidget.messageBox({type:'danger', width:'400', height: '145', html:'실패하였습니다.'});
			}
			return;
		} 

		momWidget.messageBox({type:'success',  width: '400', height: '145', html: '성공하였습니다.'});
	},
	
	callbackExcelUpload: function(result, data, param, callbackParam) {
		var that = this.MOMXX000;
		
		if(result != 'SUCCESS') {
			momWidget.messageBox({type: 'danger',  width: '400', height: '145', html: '실패하였습니다.'});			
			return;
		}
		
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
			var queryId = '/mom/request/com.thirautech.mom.widget.page.dummy';
			$.get(momWidget.contextPath() + queryId, null, function(data) {
				$('#pageId').jqxComboBox("clear");
				$('#pageId').jqxComboBox("source", []);
				
				$('#pageId').jqxComboBox({searchMode : 'containsignorecase', autoComplete : true});
				
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
	
	// Deprecated.., 더 이상 사용하지 않음
	widgetUpload: function(fileId, url, page, grid, param1, callBack) {
		return 0;
	},
	
	getPageIdList: function() {
		var queryId = '/mom/request/com.thirautech.mom.widget.page.dummy';
		$.get(momWidget.contextPath() + queryId, null, function(data) {
			if(initPageLoad) {
				initPageLoad = false;
				
				var width = $('#pageId').width() + 26;
				var height = $('#pageId').height() + 4 < 24 ? 24 : $('#pageId').height() + 4;
				
				$('#pageId').jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
				$('#pageId').removeClass('w-select');
					
				var data1 = $('#pageId').jqxComboBox("source");
				for(var i = 0; i < data.length; i++) {
					data1.push({ label: data[i]['name'], value: data[i]['code'] });
				}
				
				$('#pageId').jqxComboBox('source', data1);			
				$('#pageId').find('input').attr('readonly', false);
				
				/*$('#pageName').val('');
				$('#queryId').val('');
				$('#noId').val('');
				$('#checkId').val('');
				$('#editId').val('');
				$('#popUpTitle').val('');
				$('#pagingId').val('');*/
			} else {
				var data1 = []; //$('#pageId').jqxComboBox("source");
				for(var i = 0; i < data.length; i++) {
					data1.push({ label: data[i]['name'], value: data[i]['code'] });
				}
				
				$('#pageId').jqxComboBox('source', data1);
			}
		});
	},
	
	fileInpuSet: function() {
		$('#excelGrid1 .searcharea').css({'padding' : '5px 5px 0'});
		$('#excelGrid1 .searcharea from').attr('id', 'fileUploadForm');
		$('#excelGrid1 .searcharea form').html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	
	// 2020.04.12 hyjeong begin
	cellClick: function(grid, single) {
		AUIGrid.setProp(grid, 'exportURL' , '0');
		
		AUIGrid.bind(grid, 'cellClick', function(e) {
			var current = parseInt(AUIGrid.getProp(grid, 'exportURL'));
			AUIGrid.setProp(grid, 'exportURL' , '' + (current + 1));
			
			setTimeout(function() {
				if(AUIGrid.getProp(grid, 'exportURL') != '1') { 
					AUIGrid.setProp(grid, 'exportURL' , '0');
					return;
				}
				
				AUIGrid.setProp(grid, 'exportURL' , '0');
				
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(single != undefined) {
					AUIGrid.setAllCheckedRows(grid, false);
				}
				
				if(singleRowIndex == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					singleRowIndex = undefined;
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					singleRowIndex = rowId;
				}
			}, 400);
		});
	}, 
	// 2020.04.12 hyjeong end
	
	printItems: function(items) {
		for(var i = 0; i < items.length; i++) {
			console.log('[' + i + '] ' + JSON.stringify(items[i]));
		}
	}
};

$(document).ready(function(event) {
	MOMXX000.init();
});
