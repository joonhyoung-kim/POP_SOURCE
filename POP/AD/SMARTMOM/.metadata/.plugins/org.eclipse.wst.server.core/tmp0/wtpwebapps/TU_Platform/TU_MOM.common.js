var tuCommon = {
	init: function() {
		this.style();
		this.event();
		this.auth();
	},
	event: function() {
		$('#openSearchPop .fa-angle-up').addClass('fa-angle-down');
		$('#openSearchPop, .closebutton').click(function() {
			var icon = $(this).children();
			$('#openSearchPop').toggleClass('block');
			$('.searcharea:not(.pop)').toggleClass('none');
			$('.calc135, .calc170').toggleClass('open');
			$('.h03-h, .h04-h').toggleClass('h100per-nonesearch');
			
			$(window).resize();
			setTimeout(function() {
				$(window).resize();
			},500);
		});
		
		$(document).on('keyup', '.jqx-combobox input.jqx-combobox-input', function(e) {
			if(e.keyCode == 8 && $(this).val() == '' || e.keyCode == 46 && $(this).val() == '') {
				$(this).closest('.jqx-combobox').jqxComboBox('clearSelection');
			}
			
			e.preventDefault();
		});
	},
	style: function() {
		// 팝업창에 그리드가 있는 화면들 가로 85%
		$('.modal .w-widget-auigrid').closest('.panel').css('width', '85%');
		$('.navbarleft').css('overflow-y', 'auto');
		$('head').append('<style>.aui-grid-table input[type=radio], input[type=checkbox]{ margin:0; } </style>');
		$('head').append('<style>.aui-grid-info-layer{ height: 100% !important; } </style>');
		$('input[input-type=datepicker], input.w-input').attr('autocomplete', 'off');
		$('head').append('<style>.aui-grid-nodata-msg-layer{background : none; padding-left:40px;}</style>');
		
		$('head').append('<style>.h100per-nonesearch{ height: calc(100% - 37px);}</style>')
		if(typeof mCommon != 'undefined' && mCommon.getSearchParam().v) {
			$('head').append('<link rel="stylesheet" type="text/css" href="/Mbox/design/TU_MOM/publish/TU_MOM.css"/>');
		}

		$('body').css('overflow-y', 'hidden');
	},
	auth: function() {
		if(typeof mCommon == 'object') {
			mCommon.gridWidgetShow(['99','99999999']);
			mCommon.authElement();
		}
	},
	// 셀클릭 이벤트 바인딩
	cellClick: function(grid, option) {
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
				
				if(option != undefined) {
					AUIGrid.setAllCheckedRows(grid, false);
				}
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
			}, 200);
		});
	},
	cellClickNSet: function(grid1, grid2, widget, param, option) {
		AUIGrid.setProp(grid, 'exportURL' , '0');
		AUIGrid.bind(grid1, 'cellClick', function(e) {
			var current = parseInt(AUIGrid.getProp(grid, 'exportURL'));
			AUIGrid.setProp(grid, 'exportURL' , '' + (current + 1));
			
			setTimeout(function() {
				if(AUIGrid.getProp(grid1, 'exportURL') != '1') {
					AUIGrid.setProp(grid, 'exportURL' , '0');
					return;
				}
				AUIGrid.setProp(grid1, 'exportURL' , '0');	
				
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(option != undefined) {
					AUIGrid.setAllCheckedRows(grid1, false);
				}
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				
				if(grid2 != undefined){
					mCommon.render(grid2, widget, param, function(){});
				}
			}, 200);
		});
	},
	cellEditEnd: function(grid) {
		AUIGrid.bind(grid, 'cellEditEnd', function(e) {
			var item = e.item;
			var rowIdField;
			var rowId;
			
			rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
			rowId = item[rowIdField];

			AUIGrid.addCheckedRowsByIds(e.pid, rowId);			
		});
	},
	contextPath: function() {
		//return $("html").attr("contextPath");
		return '/TU_Platform';
	},
	editColumnSet: function(grid) {// grid 아이디값을 받아 구분한다.
		// 기본적인 그리드 컬럼세팅을 해준다.
		var editColumn = {'headerText':'Edit','dataField':'Edit','width':40,'visible':true,
			sortable : false,
			renderer : { type : 'TemplateRenderer'}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
			labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
				// return 값으로 HTML을 입력해주면 된다.
				// class 명을 gridID + EditBtn 으로 구분했다.
				// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
				return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		}

		AUIGrid.addColumn(grid, editColumn, 'first');
//		// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
//		var gridColumn = AUIGrid.getColumnLayout(grid);
//		// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다.
//		// reverse는 javascript array 기본 함수다.
//		gridColumn.reverse();
//		// 위에서 세팅된 editColumn 값을 넣어준다.
//		gridColumn.push(editColumn);
//		// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
//		gridColumn.reverse();
//		// 그리드의 변경된 정보를 바꿔준다.
//		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	addKeyDown: function(document1, input1, button1) {
		document1.on('keydown', input1, function(e) {
			if(e.keyCode == 13) {
				button1.click();
			}
		});
	}
}

$(document).ready(function() {
	if($('html').attr('contextPath') != undefined) {
		tuCommon.init();
	}/* else {
		// 함수에 넣어야 하지만.., 임시로
		var param = location.search.replace("?","");
		if(param == '') { 
			return {}; 
		}
		
		eval('var search = {' + param.replace(/=/gi, ':"').replace(/&/gi, '",') + '"' + '}');
		var pageId = search['id'];
		
		var json = sessionStorage.getItem('authGroupMenuElement');
		if(json == undefined) {
			console.log('json is undefined');
			return;
		}
		
		var authGroupMenuElement = JSON.parse(json);
		var authElement = authGroupMenuElement[pageId];
		if(authElement == undefined) {
			return;
		}
		
		var authElementIds = JSON.parse(authElement.list || '[]');
		
		var displayOrderList = [];
		$.ajax({
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.admin.micaElement.dummy?menuId=' + pageId,
			type : 'GET',
			data : {planId:$('#planId').val()},
			async: false,
			success: function (data) {
				console.log('data = ' + JSON.stringify(data));
				for(var i = 0; i < data.length; i++) {
					if(data[i].useFlag == 'Y') {
						displayOrderList.push(data[i].elementId);	
					} else {
						authElementIds.push(data[i].elementId);
					}
				}
			}
		});
		
		if(authElement.displayOrderList != undefined){
			displayOrderList = JSON.parse(authElement.displayOrderList);
		}
		
		console.log('displayOrderList = ' + JSON.stringify(displayOrderList));
		console.log('authElementIds = ' + JSON.stringify(authElementIds));
	
		for(var i = displayOrderList.length - 1; i > -1; i--) {
			var eleId = displayOrderList[i];
			var $ele = $('#' + eleId);
			if($ele.css('float') == 'right' || $ele.parent().css('float') == 'right'){
				$ele.parent().append($ele);
			} else {
				$ele.parent().prepend($ele);
			}
		}
		
		for(var i = 0; i < authElementIds.length; i++) {
			var eleId = authElementIds[i];
			console.log('eleId = ' + eleId);
			$('#' + eleId).hide();
		}
	}*/
});

function mom_ajax(type, url, param, call_back, call_back_param, index_info, your, async) {
	if(type == 'R') {
		if(url.indexOf('?') > 0) {
			if(url.indexOf('dummy') >= 0) {
				url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url;
			} else {
				url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url.replace('?', '.dummy?');
			}
		} else {
			if(url.indexOf('dummy') >= 0) {
				url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url;
			} else {
				url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
			}
		}
		
		$.ajax({
			type 		: 'GET',
			url  		: url,
			data 		: param,
			async		: async == undefined ? true : false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success     : function(data) {
				if(call_back != undefined) {
					if(data != undefined) {
						call_back('SUCCESS', data, param, call_back_param, index_info, your);
					} else {
						call_back('FAIL', data, param, call_back_param, index_info, your);
					}
				}
			}, error	: function(error) {
				if(call_back != undefined) {
					call_back('ERROR', error, param, call_back_param, index_info, your);
				}
			}, fail		: function(fail) {
				if(call_back != undefined) {
					call_back('FAIL', fail, param, call_back_param, index_info, your);
				}
			}
		});
		
		return;
	}
	
	var type1 = type.indexOf('D') >= 0 ? 'DELETE' : (type.indexOf('U') >= 0 ? 'PUT' : 'POST');
	if(type.indexOf('S') >= 0) {
		if(url.indexOf('dummy') >= 0) {
			url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url;
		} else {
			url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
		}
	} else {
		if(url.indexOf('dummy') >= 0) {
			url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url;
		} else {
			url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
		}
	}
	
	if(type.indexOf('L') >= 0) {
		url += '/list';
	}
		
	$.ajax({
		type 		: type1,
		url  		: url,
		data 		: param,
		timeout 	: 30000000,
		dataType 	: 'json',
		contentType : 'application/json; charset=UTF-8',
		success     : function(data) {
			if(call_back != undefined) {
				if(data['result'] == 'success') {
					call_back('SUCCESS', data, param, call_back_param, index_info, your);
				} else {
					call_back('FAIL', data, param, call_back_param, index_info, your);
				}
			}
		}, error	: function(error) {
			if(call_back != undefined) {
				call_back('ERROR', error, param, call_back_param, index_info, your);
			}
		}, fail		: function(fail) {
			if(call_back != undefined) {
				call_back('FAIL', fail, param, call_back_param, index_info, your);
			}
		}
	});
}

function excel_upload(file_id, url, page, grid, param, call_back, callBackParam, indexInfo, your) {
	var files = file_id.files;
    if(files.length === 0) {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    if(url.indexOf('dummy') >= 0) {
    	url = tuCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url;				// AS-IS Version
    } else {	
    	url = tuCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url + '.dummy';	// Current Version
    }
    
    var formData = new FormData();
    formData.append('file', files[0]);
    formData.append('page', page);
    
    var headerInfo = {};
    var neccesityInfo = {};
    var grid_column_origin = AUIGrid.getColumnLayout(grid);
    if(page.indexOf('MOM') < 0) {
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		var key = grid_column_origin[i].headerText;
        	var value = grid_column_origin[i].dataField;
        	headerInfo[key] = value;
	    }
    } else {
    	var index = 0;
    	
    	var mode = 'MICA';
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		if(grid_column_origin[i]['excelTemplateHide'] != undefined) {
    			mode = 'XMOM';
    			break;
    		}
    	}
    	
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		var excelTemplateHide = undefined;
    		if(mode == 'MICA') {
    			excelTemplateHide = (typeof grid_column_origin[i].excelTempleteHide == 'undefined') ? true : grid_column_origin[i].excelTempleteHide; 
    		} else {
    			excelTemplateHide = grid_column_origin[i]['excelTemplateHide'];
    		}
    		
    		if(excelTemplateHide && excelTemplateHide != 0) {
	    		if(grid_column_origin[i].dataField == 'Edit') {
	    			continue;
	    		}
		    	var key = index.toString();
		    	var value = grid_column_origin[i].dataField;
		    	headerInfo[key] = value;
		    	neccesityInfo[key] = mode == 'MICA' ? (grid_column_origin[i].require ? 1 : 2) : excelTemplateHide;
		    	index++;
	    	} 
	    }
    }
    
    formData.append('headerInfo', encodeURIComponent(JSON.stringify(headerInfo)));
    formData.append('neccesityInfo', encodeURIComponent(JSON.stringify(neccesityInfo)));
    
    if(your != undefined && your['excelParam'] != undefined) {
    	param = JSON.stringify(your['excelParam']);
    }
    
    formData.append('param', encodeURIComponent(param));

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 
    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText), param, callBackParam, indexInfo, your);
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText), param, callBackParam, indexInfo, your);
			}
        }
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// 엑셀파일을 서버에 전송하지 않고, 그리드에 넣기
function excel_upload_new(file, grid, call_back) {
	var excelData = [];
	var reader = new FileReader();
    reader.onload = function() {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName) {
	        var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
	        for(var i = 0; i < rowObj.length; i++) {
	        	excelData.push(rowObj[i]);
	        }
        });
        
        excel_upload_new_run(grid, excelData, call_back);
    };
    
    reader.readAsBinaryString(file.files[0]);
}
function excel_upload_new_run(grid, data, call_back) {
	var headerInfo = {};
    var grid_column_origin = AUIGrid.getColumnLayout(grid);
    
    for(var i = 0; i < grid_column_origin.length; i++) {
		var key = grid_column_origin[i].headerText;
    	var value = grid_column_origin[i].dataField;
    	headerInfo[key] = value;
    }
    
    for(var i = 0; i < data.length; i++) {
    	for(var key in data[i]) {
    		if(headerInfo[key] != undefined) {
    			data[i][headerInfo[key]] = data[i][key];
    			delete data[i][key];
    		}
    	}
    }
    
    //AUIGrid.clearGridData(grid);
    /*var existsData = AUIGrid.getGridData(grid);
    if(existsData != undefined && existsData.length > 0) {
    	data = existsData.concat(data);
    }*/
    
    AUIGrid.setGridData(grid, data);
    
    var pageRowCount = AUIGrid.getProp(grid, 'pageRowCount');
    if(pageRowCount == 1) {
    	AUIGrid.setPageRowCount(grid, 100);
    }
    
    call_back();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

function attach_upload(file, entity_name, entity_id, param, call_back) {
	var files = file.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = tuCommon.contextPath() + '/file/attach/com.thirautech.mom.common.file.dummy';
    
    var formData = new FormData();
    formData.append('file'       , files[0] );
    formData.append('entityName' , entity_name);
    formData.append('entityId'   , entity_id);
    formData.append('param'      , param    );

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 

    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
    		//alert('Upload Success');
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
    	} else {
    		//alert('Upload Fail');
    		if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
    	}
        
        /*if(xhr.status == 200) {
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }*/
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function attach_download(entityId, entityName, fileName) {
	var url = tuCommon.contextPath() + '/file/download/com.thirautech.mom.common.file.dummy?entityId='+entityId+'&entityName='+entityName;
	if(fileName != null && fileName != undefined) {
		url += ('&fileName='+fileName);
	}
	
	location.href = url;
}

function attach_download2(query, param, call_back) {
	var url = tuCommon.contextPath() + '/file/download/' + query + '.dummy';
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 

    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(xhr.status == 200) {
        	if(call_back != undefined) {
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }
    }
    
    xhr.send(null);    
    //event.preventDefault();
}

function fn_b2bi_upload(query, param, call_back) {
	var url = tuCommon.contextPath() + '/file/B2BIXml/' + query + '.dummy';
	try {
		momWidget.splashShow();
	} catch(e) {
		try {
			micaCommon.splash.show();
		} catch(e1) {
		}
	}
	
	$.post(url, param, call_back);
}

function fn_report_upload( files, param, call_back){
    url = tuCommon.contextPath() + '/file/report/com.thirautech.mom.common.excelPrintForm.dummy';
    
    var formData = new FormData();
    formData.append('file' , files );
    formData.append('param', param);

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 
    
    xhr.onload = function() {
    	try {
    		momWidget.splashHide();
    	} catch(e) {
    		try {
    			micaCommon.splash.hide();
    		} catch(e1) {
    		}
    	}
    	
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
    		call_back('SUCCESS', JSON.parse(xhr.responseText));
    	} else {
    		call_back('FAIL', JSON.parse(xhr.responseText));
    	}
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function file_upload(file_id, query, param, call_back_param, call_back){
	var files = file_id.files;
    if(files.length === 0) {
    	call_back('SUCCESS', JSON.parse(param), '', call_back_param);
    	
        return;
    }
    
    if(query.indexOf("workingManualFile") == -1) {
    	url = tuCommon.contextPath() + '/file/file/com.thirautech.mom.reference.itemInfo.item.file.dummy';
    } else {
    	url = tuCommon.contextPath() + '/file/file/com.thirautech.mom.reference.document.workingManual.workingManualFile.dummy';
    }
    
    var formData = new FormData();
    formData.append('file'	, files[0]);
    formData.append('query'	, query);
    formData.append('param'	, encodeURIComponent(param));
    
    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 

    xhr.onload = function() {
    	if(xhr.status == 200) {
        	if(call_back != undefined) {
				call_back('SUCCESS', JSON.parse(xhr.responseText), '', call_back_param);
			}
        } else {
        	if(call_back != undefined) {
				call_back('FAIL', JSON.parse(xhr.responseText), '', call_back_param);
			}
        }
    }
    
    xhr.send(formData);    
    //event.preventDefault();
}

function item_download(itemId, key){
	var url = tuCommon.contextPath() + '/file/download/item/com.thirautech.mom.reference.itemInfo.item.file.dummy?itemId='+itemId+'&key='+key;
	
	location.href = url;
}

function file_download(resourceCd, itemId, attachSeq, attachName, key){
	var url = tuCommon.contextPath() + '/file/attach/item/com.thirautech.mom.reference.document.workingManual.workingManualFile.dummy?resourceCd='+resourceCd+'&itemId='+itemId+'&attachSeq='+attachSeq+'&attachName='+attachName+'&key='+key;
	
	location.href = url;
}

/*
 * by hyjeong
 * 
 * Common 날자 형식 지원을 위한 함수
 * 
 * Return Value : 'YYYY-MM-DD'
 * 
 * Parameter
 * date  : 비정규형 날짜 포맷 'YYYY/MM/DD', 'YYYY:MM:DD', 'YYYY.MM.DD', 'YYYY MM DD', 'YYYYMMDD'
 */
function to_date_yyyy_mm_dd(date){
	if(date == undefined || date == '') {
		return '';
	}
	
	var delimiter = '';	
	var ret_date = '';
	
	if(date.indexOf('/') > 0) {
		delimiter = '/';
	} else if(date.indexOf(':') > 0) {
		delimiter = ':';
	} else if(date.indexOf('.') > 0) {
		delimiter = '.';
	} else if(date.indexOf(' ') > 0) {
		delimiter = ' ';
	} else if(date.indexOf('-') > 0) {
		delimiter = '-';
	} 
	
	if(delimiter == '') {
		if(date.length > 7) {
			return date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8);
		} else {
			return '0000-00-00';
		}
	}
	
	var tokens = date.split(delimiter);
	var year = tokens[0];
	var month, day;	
	if(parseInt(tokens[1]) < 10) {
		month = '0' + parseInt(tokens[1]).toString();
	} else {
		month = parseInt(tokens[1]).toString();
	}
	
	if(parseInt(tokens[2]) < 10) {
		day = '0' + parseInt(tokens[2]).toString();
	} else {
		day = parseInt(tokens[2]).toString();
	}
	
	ret_date = year + '-' + month + '-' + day;
	
	return ret_date;
}

/*
 * by hyjeong
 * 
 * 현재날짜, 현재 시간을 구하는 함수
 * 
 * Return Value : 'YYYY-MM-DD', 'YYYY-MM-DD HH24:MI:SS' 
 * 
 * Parameter
 * mode : 'YYYY-MM-DD', 'yyyy-mm-dd', 'YYYY-MM-DD HH24:MI:SS', 'yyyy-mm-dd hh24:mi:ss'
 */
function get_current_date(mode) {
	var current = new Date();
	var ret_date = '';
	
	if(mode == 'yyyy-mm-dd' || mode == 'YYYY-MM-DD') {
		ret_date = current.getFullYear() 																		   + '-' + 
		 (parseInt(current.getMonth() + 1) < 10 ? '0' + parseInt(current.getMonth() + 1) : current.getMonth() + 1) + '-' + 
			      (current.getDate()       < 10 ? '0' +          current.getDate()        : current.getDate());
		
		return ret_date;
	}
	
	ret_date = 		current.getFullYear() 																			+ '-' + 
		  (parseInt(current.getMonth() + 1) < 10 ? '0' + parseInt(current.getMonth() + 1) : current.getMonth() + 1) + '-' + 
			       (current.getDate()       < 10 ? '0' + 		  current.getDate()       : current.getDate())      + ' ' +
				   (current.getHours()      < 10 ? '0' + 		  current.getHours()      : current.getHours())     + ':' + 
				   (current.getMinutes()    < 10 ? '0' + 		  current.getMinutes()    : current.getMinutes())   + ':' +
				   (current.getSeconds()    < 10 ? '0' + 		  current.getSeconds()    : current.getSeconds());
	
	return ret_date;
}

/*
 * by hyjeong
 * 
 * 현재날짜로 부터 +diff, -diif 날짜를 구하는 함수
 * 
 * Return Value : 'YYYY-MM-DD'
 * 
 * Parameter
 * mode : 7 - 7일 후, -6 - 6일 전
 */
function get_date_diff(diff) {
	var date = new Date();
	var ret_date = '';
	
	date.setDate(date.getDate() + diff);
	ret_date = 		date.getFullYear() 																	   + '-' + 
	 	  (parseInt(date.getMonth() + 1) < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1) + '-' + 
	  	      	   (date.getDate()       < 10 ? '0' +          date.getDate()       : date.getDate());
	
	return ret_date;
}

function get_date_diff2(day, diff) {
	var date = new Date(day);
	var ret_date = '';
	
	date.setDate(date.getDate() + diff);
	ret_date = 		date.getFullYear() 																	   + '-' + 
	 	  (parseInt(date.getMonth() + 1) < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1) + '-' + 
	  	      	   (date.getDate()       < 10 ? '0' +          date.getDate()       : date.getDate());
	
	return ret_date;
}

//숫자만 입력 되도록
function onlyNum() {
	var keycode = window.event.keyCode;

	if ((keycode == 8 || (keycode >= 35 && keycode <= 40)
			|| (keycode >= 46 && keycode <= 57)
			|| (keycode >= 96 && keycode <= 105)
			|| keycode == 109 || keycode == 110
			|| keycode == 189 || keycode == 190 || keycode == 9)
		&& !event.shiftKey ) {
	    window.event.returnValue = true;
		return;
	} else {
		//event.preventDefault();	//IE 사용할 경우
		window.event.returnValue = false;
		return;
	}
}

function date2String19(grid, columns) {
	if(grid == undefined || columns == undefined) {
		return;
	}
	
	for(var idx = 0; idx < columns.length; idx++) {
		const i = idx;
		AUIGrid.setColumnPropByDataField(grid, columns[i], {
			//dataField : columns[i],
			labelFunction: function(row_index, column_index, value, item) { 
				if(value != undefined && value.length > 19) {
					return value.replace('T', ' ').substring(0, 19);
				}
				
				return value;
			}
		});
	}
}

function date2StringData19(datas, colums) {
	if(datas == undefined) {
		return;
	}
	
	for(var idx = 0; idx < datas.length; idx++) {
		const i = idx;
		for(key in datas[i]) {
			var value = datas[i][key];
			if(value == undefined || value.length == undefined || value.length < 19) {
				continue;
			}
			
			if(value.indexOf('-') == 4 && value.indexOf('T') == 10) {
				var day = value.substring(0, 10);
				var hour = parseInt(value.substring(11, 13)) + 9;
				if(hour >= 24) {
					datas[i][key] = get_date_diff2(day, 1) + ' 0' + (hour - 24) + value.substring(13); 
				} else {
					datas[i][key] = get_date_diff2(day, 0) + (hour < 10 ? ' 0' + hour : hour) + value.substring(13); 
				}
			}
		}
	}	
		
	return datas;
}

function date2StringData10(datas, colums) {
	if(datas == undefined) {
		return;
	}
	
	for(var idx = 0; idx < datas.length; idx++) {
		const i = idx;
		for(key in datas[i]) {
			var value = datas[i][key];
			if(value == undefined || value.length == undefined || value.length < 19) {
				continue;
			}
			
			if(value.indexOf('-') == 4 && value.indexOf('T') == 10) {
				var day = value.substring(0, 10);
				var hour = parseInt(value.substring(11, 13)) + 9;
				if(hour >= 24) {
					datas[i][key] = get_date_diff2(day, 1);// + ' 0' + (hour - 24) + value.substring(13); 
				} else {
					datas[i][key] = get_date_diff2(day, 0);// + (hour < 10 ? ' 0' + hour : hour) + value.substring(13); 
				}
			}
		}
	}	
		
	return datas;
}

function get_time_check(time){
	var pattern = /^([01][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
	
	return pattern.test(time);
}

function digit_check(e) {
    var code = e.which?e.which:event.keyCode;
    if(code < 48 || code > 57) {
    	window.event.returnValue = false;
    	return;
    }
}

function number_filter(str_value) {
	return str_value.replace(/[^0-9]/gi, ""); 
}

function getChosung(src) {
	var choStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = ((src.charCodeAt(i) - 44032) /28) / 21;
		if(index >= 0) {
			choStr += String.fromCharCode(index + 4352);
		} 
	}
	
	return choStr;
}

function getJoongsung(src) {
	var joongStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = ((src.charCodeAt(i)- 44032) / 28) % 21;
	    if(index >= 0) {
	    	joongStr += String.fromCharCode(index + 4449);
	    }
	}
	
	return joongStr;
}

function getJongsung(src) {
	var jongStr = '';
	for(var i = 0; i < src.length; i++) {
		var index = (src.charCodeAt(i) - 44032) % 28;
	    if(index > 0) {
	      jongStr += String.fromCharCode(index + 4519);
	    }
	}
	
	return jongStr;
}

function getHangul(src) {
	var str = '', ch, code, index1, index2, index3;
	for(var i = 0; i < src.length; i++) {
		ch = src[i];
		code = src.charCodeAt(i);
		index1 = ((code - 44032) / 28) / 21;
		index2 = ((code - 44032) / 28) % 21;
		index3 = (code - 44032) % 28;
	    if(index1 > 0 || index2 > 0 || index3 > 0) {
	    	var ch = String.fromCharCode(index1 + 4352)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	} 
	    	ch = String.fromCharCode(index2 + 4449)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	}
	    	ch = String.fromCharCode(index3 + 4519)
	    	if(ch != 'ᆧ') {
	    		str += (ch + ' ');
	    	}
	    } else {
	    	str += (src[i] + ' ');
	    }
	}
	
	return str;
}

// 2020.04.12 hyjeong begin
(function( $ ) {
	$.fn.replaceTag = function(newTag) {
	    var originalElement = this[0]
	    , originalTag = originalElement.tagName
	    , startRX = new RegExp('^<'+originalTag, 'i')
	    , endRX = new RegExp(originalTag+'>$', 'i')
	    , startSubst = '<'+newTag
	    , endSubst = newTag+'>'
	    , newHTML = originalElement.outerHTML
	    .replace(startRX, startSubst)
	    .replace(endRX, endSubst);
	    this.replaceWith(newHTML);
	};
})(jQuery);
// 2020.04.12 hyjeong end

