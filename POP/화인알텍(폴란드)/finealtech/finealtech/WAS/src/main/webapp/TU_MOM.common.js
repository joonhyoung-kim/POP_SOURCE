var tuCommon = {
	init: function() {
		this.style();
		this.event();
		this.auth();
		/*this.cellClick();*/
	},
	event: function() {
		$("#openSearchPop .fa-angle-up").addClass("fa-angle-down");
		$("#openSearchPop, .closebutton").click(function() {
			var icon = $(this).children();
			$("#openSearchPop").toggleClass("block");
			$(".searcharea:not(.pop)").toggleClass("none");
			$(".calc135, .calc170").toggleClass("open");
			$(".h03-h, .h04-h").toggleClass("h100per-nonesearch");
			
			$(window).resize();
			setTimeout(function() {
				$(window).resize();
			},500);
		});
		
		$(document).on("keyup", ".jqx-combobox input.jqx-combobox-input", function(e) {
			if(e.keyCode == 8 && $(this).val() == "" || e.keyCode == 46 && $(this).val() == "") {
				$(this).closest(".jqx-combobox").jqxComboBox("clearSelection");
			}
		});
	},
	style: function() {
		// 팝업창에 그리드가 있는 화면들 가로 85%
		$(".modal .w-widget-auigrid").closest(".panel").css("width", "85%");
		$(".navbarleft").css("overflow-y", "auto");
		$("head").append('<style>.aui-grid-table input[type=radio], input[type=checkbox]{ margin:0; } </style>');
		$("head").append('<style>.aui-grid-info-layer{ height: 100% !important; } </style>');
		$("input[input-type=datepicker], input.w-input").attr("autocomplete", "off");
		$("head").append("<style>.aui-grid-nodata-msg-layer{background : none; padding-left:40px;}</style>");
		
		$("head").append("<style>.h100per-nonesearch{ height: calc(100% - 37px);}</style>")
		if(typeof mCommon != "undefined" && mCommon.getSearchParam().v) {
			$("head").append('<link rel="stylesheet" type="text/css" href="/Mbox/design/TU_MOM/publish/TU_MOM.css"/>');
		}

		$("body").css("overflow-y", "hidden");
	},
	auth: function() {
		if(typeof mCommon == "object") {
			mCommon.authElement();
			mCommon.gridWidgetShow(["99"]);
		}
	},
	// 셀클릭 이벤트 바인딩
	cellClick: function(grid, option = null) {
		AUIGrid.bind(grid, 'cellClick', function(e) {
			/*AUIGrid.setProp(grid, "exportURL" , "1");
			setTimeout(function() {
				if(AUIGrid.getProp(grid, 'exportURL') == '0') { 
					return;
				}
				
				AUIGrid.setProp(grid, 'exportURL' , '0');*/
				
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(option != null) {
					AUIGrid.setAllCheckedRows(grid, false);
				}
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
			//}, 200);
		});
	},
	cellClickNSet: function(grid1, grid2, widget, param, option = null) {
		AUIGrid.bind(grid1, 'cellClick', function(e) {
			/*AUIGrid.setProp(grid1, "exportURL" , "1");
			setTimeout(function() {
				if(AUIGrid.getProp(grid1, 'exportURL') == '0') { 
					return;
				}
				AUIGrid.setProp(grid1, 'exportURL' , '0');*/	
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				if(option != null) {
					AUIGrid.setAllCheckedRows(grid1, false);
				}
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				
				if(grid2 != null){
					mCommon.render(grid2, widget, param, function(){});
				}
			//}, 200);
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
		var editColumn = {"headerText":"Edit","dataField":"Edit","width":40,"visible":true,
			sortable : false,
			renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
			labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
				// return 값으로 HTML을 입력해주면 된다.
				// class 명을 gridID + EditBtn 으로 구분했다.
				// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
				return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		}

		AUIGrid.addColumn(grid, editColumn, "first");
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

$(document).ready(function(){
	if($("html").attr("contextPath") != undefined) {
		tuCommon.init();
	}
});

/*
 * by hyjeong
 * s
 * Common Ajax Call
 * CUD 연산을 위한 ajax 공통 함수
 * 
 * Parameter
 * type      : 'C' - Create, 'U' - Update, 'D' - Delete
 * url       : mapping url, namespace(dot)queryId ex) 'reference.resource.factory.factory'
 * param     : ajax parameter ex) '{"empNo":"1234", "empName":"Hoyoung Jeong"}'
 * call_back : callback 함수 포인터, defualt parameter 사용, 인자 무사용/사용 무관, 처리 결과 얻고자 할 시 인자 사용 
 */
/*function mom_ajax(type, url, param) {
	var type1 = type == 'D' ? 'DELETE' : (type == 'U' ? 'PUT' : 'POST');
	if(type == 'S' || type == 'LS') {
		url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
	} else {
		url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
	}
	if(type == 'LS') {
		url += '/list';
	}
	if(type == 'L') {
		url += '/list';
	}
	if(type == 'LD') {
		url += '/list';
	}
	
	$.ajax({
		type 		: type1,
		url  		: url,
		data 		: param,
		timeout 	: 30000000,
		dataType 	: 'json',
		contentType : 'application/json; charset=UTF-8',
		success     : function(data){
		},
		error       : function(error){
		},
		fail        : function(fail){
		}
	});
}

function mom_ajax(type, url, param, call_back) {
	var type1 = type == 'D' ? 'DELETE' : (type == 'U' ? 'PUT' : 'POST');
	if(type == 'S' || type == 'LS') {
		url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
	} else {
		url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
	}
	if(type == 'LS') {
		url += '/list';
	}
	if(type == 'L') {
		url += '/list';
	}
	if(type == 'LD') {
		url += '/list';
	}
	
	$.ajax({
		type 		: type1,
		url  		: url,
		data 		: param,
		timeout 	: 30000000,
		dataType 	: 'json',
		contentType : 'application/json; charset=UTF-8',
		success     : function(data){
			if(call_back != null && call_back != undefined) {
				if(data['result'] == 'success') {
					call_back('SUCCESS', data);
				} else {
					call_back('FAIL', data);
				}
			}
		},
		error       : function(error){
			if(call_back != null && call_back != undefined) {
				call_back('ERROR', error);
			}
		},
		fail        : function(fail){
			if(call_back != null && call_back != undefined) {
				call_back('FAIL', fail);
			}
		}
	});
}

function mom_ajax(type, url, param, call_back, call_back_param) {
	var type1 = type == 'D' ? 'DELETE' : (type == 'U' ? 'PUT' : 'POST');
	if(type == 'S' || type == 'LS') {
		url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
	} else {
		url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
	}
	if(type == 'LS') {
		url += '/list';
	}
	if(type == 'L') {
		url += '/list';
	}
	if(type == 'LD') {
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
			if(call_back != null && call_back != undefined) {
				if(data['result'] == 'success') {
					call_back('SUCCESS', data, call_back_param);
				} else {
					call_back('FAIL', data, call_back_param);
				}
			}
		},
		error       : function(error){
			if(call_back != null && call_back != undefined) {
				call_back('ERROR', error, call_back_param);
			}
		},
		fail        : function(fail){
			if(call_back != null && call_back != undefined) {
				call_back('FAIL', fail, call_back_param);
			}
		}
	});
}*/

function mom_ajax(type, url, param, call_back, call_back_param, flag) {
	var type1 = type.indexOf('D') >= 0 ? 'DELETE' : (type.indexOf('U') >= 0 ? 'PUT' : 'POST');
	if(type.indexOf('S') >= 0) {
		url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
	} else {
		url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
	}
	
	if(type.indexOf('L') >= 0) {
		url += '/list';
	}
	/*if(type == 'S' || type == 'LS') {
		url = tuCommon.contextPath() + '/mom/request/upsert/com.thirautech.mom.' + url + '.dummy';
	} else {
		url = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + url + '.dummy';
	}
	if(type == 'LS') {
		url += '/list';
	}
	if(type == 'L') {
		url += '/list';
	}
	if(type == 'LD') {
		url += '/list';
	}
	
	console.log('####');
	console.log('type = ' + type1);
	console.log('url = ' + url);
	console.log('param = ' + param);
	console.log('');
	*/
	//console.log('param = ' + param);
	
	$.ajax({
		type 		: type1,
		url  		: url,
		data 		: param,
		timeout 	: 30000000,
		dataType 	: 'json',
		contentType : 'application/json; charset=UTF-8',
		success     : function(data){
			if(call_back != null && call_back != undefined) {
				if(data['result'] == 'success') {
					call_back('SUCCESS', data, call_back_param, flag);
				} else {
					call_back('FAIL', data, call_back_param, flag);
				}
			}
		},
		error       : function(error) {
			if(call_back != null && call_back != undefined) {
				call_back('ERROR', error, call_back_param, flag);
			}
		},
		fail        : function(fail) {
			if(call_back != null && call_back != undefined) {
				call_back('FAIL', fail, call_back_param, flag);
			}
		}
	});
}

//function widget_ajax(url, head, grid, flag){
//	var url = tuCommon.contextPath() + '/widget/request/' + url + '.dummy';
//	
//	$.ajax({
//		type 		: 'POST',
//		url  		: url,
//		timeout 	: 30000000,
//		async 		: false,
//		dataType 	: 'json',
//		contentType : 'application/json; charset=UTF-8',
//		success     : function(data){
//			if(flag == 'init') {
//				widget_proc_init(head, grid, data);
//			} else {
//				widget_proc_reload(head, grid, data);
//			}
//		},
//		error       : function(error){
//			console.log('error: ' + JSON.stringify(error));
//		},
//		fail        : function(fail){
//			console.log('fail: ' + JSON.stringify(fail));
//		}
//	});
//}

function widget_proc_init(head, grid, data) {
	/*console.log('use = ' + data.use);
	console.log('len = ' + data.len);
	console.log('header = ' + data.header);
	console.log('width = ' + data.width);
	console.log('align = ' + data.align);
	console.log('color = ' + data.color);
	console.log('editable = ' + data.editable);
	console.log('drop = ' + data.drop);
	console.log('sort = ' + data.sort);
	console.log('message = ' + data.message);
	console.log('show = ' + data.show);
	console.log('excel = ' + data.excel);
	console.log('template = ' + data.template);
	console.log('sequence = ' + data.sequence);*/
	
	var use = data.use;
	var len = parseInt(data.len);
	if(use == 'N' || len == 0) {
		return;
	}
	
	var grid_column_origin = AUIGrid.getColumnLayout(grid);
	var grid_column_dest = new Array(len);
	
	var header_tokens_origin = (typeof data.header == 'undefined' || data.header == null) ? null : data.header.split('|');
	var header_tokens_dest = null;
	
	var width_tokens_origin = (typeof data.width == 'undefined' || data.width == null) ? null : data.width.split('|');
	var width_tokens_dest = null;
	
	var align_tokens_origin = (typeof data.align == 'undefined' || data.align == null) ? null : data.align.split('|');
	var align_tokens_dest = null;
	
	var color_tokens_origin = (typeof data.color == 'undefined' || data.color == null) ? null : data.color.split('|');
	var color_tokens_dest = null; 
	
	var editable_tokens_origin = (typeof data.editable == 'undefined' || data.editable == null) ? null : data.editable.split('|');
	var editable_tokens_dest = null; 
	
	var drop_tokens_origin = (typeof data.drop == 'undefined' || data.drop == null) ? null : data.drop.split('|');
	var drop_tokens_dest = null; 
	
	var sort_tokens_origin = (typeof data.sort == 'undefined' || data.sort == null) ? null : data.sort.split('|');
	var sort_tokens_dest = null;
	
	var message_tokens_origin = (typeof data.message == 'undefined' || data.message == null) ? null : data.message.split('|');
	var message_tokens_dest = null;
	
	var show_tokens_origin = (typeof data.show == 'undefined' || data.show == null) ? null : data.show.split('|');
	var show_tokens_dest = null;
	
	var excel_tokens_origin = (typeof data.excel == 'undefined' || data.excel == null) ? null : data.excel.split('|');
	var excel_tokens_dest = null;
	
	var template_tokens_origin = (typeof data.template == 'undefined' || data.template == null) ? null : data.template.split('|');
	var template_tokens_dest = null;
	
	var sequence_tokens_origin = (typeof data.sequence == 'undefined' || data.sequence == null) ? null : data.sequence.split('|');
	var sequence_tokens_dest = null;
	
	var index = 0;
	if(sequence_tokens_origin == null) {
		for(var i = 0; i < grid_column_origin.length; i++) {
			if(!grid_column_origin[i].hide) {
				grid_column_dest[index] = grid_column_origin[i];
				
				index++;
			}
		}
		
		if(header_tokens_origin != null) {
			header_tokens_dest = header_tokens_origin.slice();
		}
		if(width_tokens_origin != null) {
			width_tokens_dest = width_tokens_origin.slice();
		}
		if(align_tokens_origin != null) {
			align_tokens_dest = align_tokens_origin.slice();
		}
		if(color_tokens_origin != null) {
			color_tokens_dest = color_tokens_origin.slice();
		}
		if(editable_tokens_origin != null) {
			editable_tokens_dest = editable_tokens_origin.slice();
		}
		if(drop_tokens_origin != null) {
			drop_tokens_dest = drop_tokens_origin.slice();
		}
		if(sort_tokens_origin != null) {
			sort_tokens_dest = sort_tokens_origin.slice();
		}
		if(message_tokens_origin != null) {
			message_tokens_dest = message_tokens_origin.slice();
		}
		if(show_tokens_origin != null) {
			show_tokens_dest = show_tokens_origin.slice();
		}
		if(excel_tokens_origin != null) {
			excel_tokens_dest = excel_tokens_origin.slice();
		}
		if(template_tokens_origin != null) {
			template_tokens_dest = template_tokens_origin.slice();
		}
	} else {
		if(header_tokens_origin != null) {
			header_tokens_dest = new Array(len);
		}
		if(width_tokens_origin != null) {
			width_tokens_dest = new Array(len);
		}
		if(align_tokens_origin != null) {
			align_tokens_dest = new Array(len);
		}
		if(color_tokens_origin != null) {
			color_tokens_dest = new Array(len);
		}
		if(editable_tokens_origin != null) {
			editable_tokens_dest = new Array(len);
		}
		if(drop_tokens_origin != null) {
			drop_tokens_dest = new Array(len);
		}
		if(sort_tokens_origin != null) {
			sort_tokens_dest = new Array(len);
		}
		if(message_tokens_origin != null) {
			message_tokens_dest = new Array(len);
		}
		if(show_tokens_origin != null) {
			show_tokens_dest = new Array(len);
		}
		if(excel_tokens_origin != null) {
			excel_tokens_dest = new Array(len);
		}
		if(template_tokens_origin != null) {
			template_tokens_dest = new Array(len);
		}
		sequence_tokens_dest = new Array(len);
		
		for(var i = 0; i < grid_column_origin.length; i++) {
			if(!grid_column_origin[i].hide) {
				var order = sequence_tokens_origin[index];
				
				grid_column_dest[order] = grid_column_origin[i];
				
				if(header_tokens_origin != null) {
					header_tokens_dest[order] = header_tokens_origin[index];
				}
				if(width_tokens_origin != null) {
					width_tokens_dest[order] = width_tokens_origin[index];
				}
				if(align_tokens_origin != null) {
					align_tokens_dest[order] = align_tokens_origin[index];
				}
				if(color_tokens_origin != null) {
					color_tokens_dest[order] = color_tokens_origin[index];
				}
				if(editable_tokens_origin != null) {
					editable_tokens_dest[order] = editable_tokens_origin[index];
				}
				if(drop_tokens_origin != null) {
					drop_tokens_dest[order] = drop_tokens_origin[index];
				}
				if(sort_tokens_origin != null) {
					sort_tokens_dest[order] = sort_tokens_origin[index];
				}
				if(message_tokens_origin != null) {
					message_tokens_dest[order] = message_tokens_origin[index];
				}
				if(show_tokens_origin != null) {
					show_tokens_dest[order] = show_tokens_origin[index];
				}
				if(excel_tokens_origin != null) {
					excel_tokens_dest[order] = excel_tokens_origin[index];
				}
				if(template_tokens_origin != null) {
					template_tokens_dest[order] = template_tokens_origin[index];
				}
				sequence_tokens_dest[order] = sequence_tokens_origin[index];
				
				index++;
			}
		}
	}
	
	var is_editable_enter = false;
	var sort_info = null;
	for(var i = grid_column_dest.length-1; i >= 0; i--) {
		if(header_tokens_dest != null && header_tokens_dest[i] != 'F') {
			grid_column_dest[i].headerText = header_tokens_dest[i];
		}
		
		if(width_tokens_dest != null && width_tokens_dest[i] != 'F') {
			grid_column_dest[i].width = parseInt(width_tokens_dest[i]);
		}
		
		if(align_tokens_dest != null) {
			if(align_tokens_dest[i] == 'L') {
				grid_column_dest[i].style = 'left-column';
			} else if(align_tokens_dest[i] == 'R') {
				grid_column_dest[i].style = 'right-column';
			} else if(align_tokens_dest[i] == 'C') {
				delete grid_column_dest[i].style;
			} 
		}
		
		if(color_tokens_dest != null && color_tokens_dest[i] != 'F') {
			head.append('<style>.columnStyle' + i + '{background:' + color_tokens_dest[i] + ';}</style>');
			grid_column_dest[i].style = 'columnStyle' + i;
		}
		
		if(editable_tokens_dest != null || drop_tokens_dest != null) {
			if(editable_tokens_dest != null && drop_tokens_dest != null) {	
				if(editable_tokens_dest[i] != 'F' || drop_tokens_dest[i] != 'F') {
					if(!is_editable_enter) {
						is_editable_enter = true;
					}
					grid_column_dest[i].editable = true;
				} else {
					grid_column_dest[i].editable = false;
				}
			} else if(editable_tokens_dest != null) {
				if(editable_tokens_dest[i] != 'F') {
					if(!is_editable_enter) {
						is_editable_enter = true;
					}
					grid_column_dest[i].editable = true;
				} else {
					grid_column_dest[i].editable = false;
				}
			} else if(drop_tokens_dest != null) {
				if(drop_tokens_dest[i] != 'F') {
					if(!is_editable_enter) {
						is_editable_enter = true;
					}
					grid_column_dest[i].editable = true;
				} else {
					grid_column_dest[i].editable = false;
				}
			} else {
				grid_column_dest[i].editable = false;
			}
		}
		
		if(drop_tokens_dest != null && drop_tokens_dest[i] != 'F') {
			grid_combobox_set(
					grid, 
					tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + drop_tokens_dest[i], 
					i, 
					grid_column_dest[i].dataField,  
					'DropDownListRenderer', 
					false
			);
		}
		
		if(sort_tokens_dest != null && sort_tokens_dest[i] != 'F') {
			if(sort_info == null) {
				AUIGrid.clearSortingAll(grid);
				var N = parseInt(sort_tokens_dest[i].substring(0, sort_tokens_dest[i].indexOf(']')))
				sort_info = new Array(N);
			}
			
			var token = sort_tokens_dest[i];
			var index = parseInt(token.substring(token.indexOf('[')+1, token.indexOf(',')));
			var mode = token.substring(token.indexOf(',')+1, token.indexOf(']'));
			var asc = mode == 'A' ? 1 : -1;
			sort_info[index] = {dataField : grid_column_dest[i].dataField, sortType : asc};
		}
		
		if(message_tokens_dest != null && message_tokens_dest[i] != 'F') {
			var data_field = grid_column_dest[i].dataField;
			var message = message_tokens_dest[i]; 
			var col_set = {
				dataField : data_field,
				labelFunction : function(row_index, column_index, value, header_text, item) { 
					return value == null || value == '' ? message : value;
				},
				editRenderer : {
					type : 'InputEditRenderer',
				}
			};
			
			AUIGrid.setColumnPropByDataField(grid, data_field, col_set);
		}
		
		if(show_tokens_dest != null && show_tokens_dest[i] == 'F') {
			grid_column_dest[i].visible = false;
		}
		
		if(excel_tokens_dest != null && excel_tokens_dest[i] == 'F') {
			grid_column_dest[i].excelHide = false;
		} else {
			grid_column_dest[i].excelHide = true;
		}
		
		if(template_tokens_dest != null && template_tokens_dest[i] == 'F') {
			grid_column_dest[i].excelTempleteHide = false;
		} else {
			grid_column_dest[i].excelTempleteHide = true;
		}
		
		if(sequence_tokens_dest != null) {
			grid_column_dest[i].columnIndex = sequence_tokens_dest[i];
		}
	}
	
	AUIGrid.changeColumnLayout(grid, grid_column_dest);
	
	if(is_editable_enter) {
		AUIGrid.setProp(grid, 'editable' , true); 
	}
	
	if(sort_info != null) {
		AUIGrid.setSorting(grid, sort_info);
	}
	
	AUIGrid.bind(grid, 'cellEditBegin', function(e) {
		AUIGrid.setProp(grid, 'exportURL', '0');	
	});
	
	AUIGrid.setProp(grid, {'editBeginMode':'click'});
}

function grid_combobox_set(grid, url, field_index, field_name, type, show_flag) {
	var lists;	
	$.ajax({
		type : 'GET',
		url : url,
		timeout : 30000000,
		async : false,
		dataType : 'json',
		contentType : 'application/json; charset=UTF-8',
		success : function(data){
			lists = data;
		},
		error   : function(error){
			console.log('error : ' + JSON.stringify(error));
			lists = [];
		},
		fail    : function(fail){
			console.log('fail : ' + JSON.stringify(fail));
			lists = [];
		}
	});
	
	var col_set = {
		dataField : field_name,
		labelFunction : function(row_index, column_index, value, header_text, item) {
			var ret_str = '';
			for(var i = 0; i < lists.length; i++) {
				if(lists[i]['code'] == value) {
					ret_str = lists[i]['name'];
					break;
				}
			}
			
			return ret_str == '' ? value : ret_str;
		},
		editRenderer : {
			type : type,
			showEditorBtnOver : show_flag, // 마우스 오버 시 에디터버턴 보이기
			list : lists,
			keyField : 'code',
			valueField : 'name'
		}
	};
	
	AUIGrid.setColumnPropByDataField(grid, field_name, col_set);
}

function widget_proc_reload(head, grid, data) {
	/*console.log('use = ' + data.use);
	console.log('len = ' + data.len);
	console.log('drop = ' + data.drop);
	console.log('sort = ' + data.sort);
	console.log('message = ' + data.message);*/
	
	var use = data.use;
	var len = parseInt(data.len);
	if(use == 'N' || len == 0) {
		return;
	}
	
	var grid_column_origin = AUIGrid.getColumnLayout(grid);
	var grid_column_dest = grid_column_origin.slice();
	
	var drop_tokens_origin = (typeof data.drop == 'undefined' || data.drop == null) ? null : data.drop.split('|');
	var drop_tokens_dest = drop_tokens_origin == null ? null : drop_tokens_origin.slice();
	
	var sort_tokens_origin = (typeof data.sort == 'undefined' || data.sort == null) ? null : data.sort.split('|');
	var sort_tokens_dest = sort_tokens_origin == null ? null : sort_tokens_origin.slice();
	
	var message_tokens_origin = (typeof data.message == 'undefined' || data.message == null) ? null : data.message.split('|');
	var message_tokens_dest = message_tokens_origin == null ? null : message_tokens_origin.slice();
	
	var is_drop_enter = false;
	if(drop_tokens_dest != null) {
		var drop_info = null;
		for(var i = drop_tokens_dest.length-1; i >= 0; i--) {
			if(drop_tokens_dest[i].charAt(0) == 'F') {
				continue;
			}
			
			if(!is_drop_enter) {
				is_drop_enter = true;
			}
			
			grid_combobox_set(
					grid, 
					tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + drop_tokens_dest[i], 
					i, 
					grid_column_dest[i].dataField,  
					'DropDownListRenderer', 
					false
			);
		}
	}
	
	var is_sort_enter = false;
	if(sort_tokens_dest != null) {
		var sort_info = null;
		var N = 0;
		for(var i = sort_tokens_dest.length-1; i >= 0; i--) {
			if(sort_tokens_dest[i].charAt(0) == 'F') {
				continue;
			}
			
			if(!is_sort_enter) {
				is_sort_enter = true;
				AUIGrid.clearSortingAll(grid);
				N = parseInt(sort_tokens_dest[i].substring(0, sort_tokens_dest[i].indexOf(']')))
				sort_info = new Array(N);
			}
			
			var token = sort_tokens_dest[i];
			var index = parseInt(token.substring(token.indexOf('[')+1, token.indexOf(',')));
			var mode = token.substring(token.indexOf(',')+1, token.indexOf(']'));
			var asc = mode == 'A' ? 1 : -1;
			sort_info[index] = {dataField : grid_column_dest[i].dataField, sortType : asc};
		}
	}
	
	if(message_tokens_dest != null) {
		for(var i = message_tokens_dest.length-1; i >= 0; i--) {
			if(message_tokens_dest[i] != 'F') {
				var data_field = grid_column_dest[i].dataField;
				var message = message_tokens_dest[i]; 
				var col_set = {
					dataField : data_field,
					labelFunction : function(row_index, column_index, value, header_text, item) { 
						return value == null || value == '' ? message : value;
					},
					editRenderer : {
						type : 'InputEditRenderer',
					}
				};
				
				AUIGrid.setColumnPropByDataField(grid, data_field, col_set);
			}
		}
	}
	
	if(is_drop_enter) {
		AUIGrid.setProp(grid, 'editable' , true); 
	}
	
	if(is_sort_enter) {
		AUIGrid.setSorting(grid, sort_info);
	}
}

/*
 * by hyjeong
 * 
 * Excel Upload를 위한 함수
 * 
 * Parameter
 * file_id   : html file-tag id
 * url       : mapping url, namespace(dot)queryId ex) 'reference.resource.factory.factory'
 * call_back : callback 함수 포인터, defualt parameter 사용, 인자 무사용/사용 무관, 처리 결과 얻고자 할 시 인자 사용 
 */
/*function excel_upload_deprecated(file_id, url, call_back = null){
	var files = file_id.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = tuCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url + '.dummy';
    
    var formData = new FormData();
    formData.append("file", files[0]);

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", url); 

    xhr.onload = function() {
        console.log(xhr.responseText);
        //var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
        	alert(xhr.responseText);
        	if(call_back != null){
				call_back('SUCCESS', xhr.responseText);
			}
        } else {
        	alert(xhr.responseText);
        	if(call_back != null){
				call_back('FAIL', xhr.responseText);
			}
        }
    }
    xhr.send(formData);    
    event.preventDefault();
}*/

/*function excel_upload(file_id, url, page, param, call_back = null){
	var files = file_id.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = tuCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url + '.dummy';
    
    var formData = new FormData();
    formData.append("file", files[0]);
    formData.append("page", page);
    formData.append("param", param);

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", url); 

    xhr.onload = function() {
    	micaCommon.splash.hide();
        console.log(xhr.responseText);
        if(JSON.parse(xhr.responseText)['result'] == 'success'){
    		alert('Upload Success');
    	}else{
    		alert('Upload Fail');
    	}
        if(xhr.status == 200) {
        	//alert(xhr.responseText);
        	if(call_back != null){
				call_back('SUCCESS', xhr.responseText);
			}
        } else {
        	//alert(xhr.responseText);
        	if(call_back != null){
				call_back('FAIL', xhr.responseText);
			}
        }
    }
    xhr.send(formData);    
    event.preventDefault();
}*/

function excel_upload(file_id, url, page, grid, param, call_back){
	var files = file_id.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = tuCommon.contextPath() + '/file/excel/com.thirautech.mom.' + url + '.dummy';
    
    var formData = new FormData();
    formData.append('file', files[0]);
    formData.append('page', page);
    
    var headerInfo = {};
    var grid_column_origin = AUIGrid.getColumnLayout(grid);
    
    if(page.indexOf("MOM") < 0) {
    	for(var i = 0; i < grid_column_origin.length; i++) {
    		var key = grid_column_origin[i].headerText;
        	var value = grid_column_origin[i].dataField;
        	headerInfo[key] = value;
	    }
    } else {
    	var index = 0;
    	for(var i = 0; i < grid_column_origin.length; i++) {
	    	if(typeof grid_column_origin[i].excelTempleteHide == 'undefined' || grid_column_origin[i].excelTempleteHide) {
	    		if(grid_column_origin[i].dataField == 'Edit') {
	    			continue;
	    		}
		    	var key = index.toString();
		    	var value = grid_column_origin[i].dataField;
		    	
		    	headerInfo[key] = value;
		    	index++;
	    	} 
	    }
    }
    
    formData.append('headerInfo', encodeURIComponent(JSON.stringify(headerInfo)));
    formData.append('param', encodeURIComponent(param));

    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', url); 

    xhr.onload = function() {
    	micaCommon.splash.hide();
        if(JSON.parse(xhr.responseText)['result'] == 'success') {
        	if(call_back != null){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != null){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }
    }
    
    xhr.send(formData);    
    event.preventDefault();
}

function attach_upload(file, entity_name, entity_id, param, call_back){
	var files = file.files;
    if(files.length === 0) {
        alert('선택된 파일이 없습니다.')
        return;
    }
    
    url = tuCommon.contextPath() + '/file/attach/com.thirautech.mom.common.file.dummy';
    
    var formData = new FormData();
    formData.append("file"       , files[0] );
    formData.append("entityName" , entity_name);
    formData.append("entityId"   , entity_id);
    formData.append("param"      , param    );

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", url); 

    xhr.onload = function() {
    	micaCommon.splash.hide();
        if(JSON.parse(xhr.responseText)['result'] == 'success'){
    		alert('Upload Success');
    	}else{
    		alert('Upload Fail');
    	}
        
        if(xhr.status == 200) {
        	if(call_back != undefined){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	if(call_back != undefined){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }
    }
    
    xhr.send(formData);    
    event.preventDefault();
}

function attach_download(entityId, entityName, fileName = null){
	var url = tuCommon.contextPath() + '/file/download/com.thirautech.mom.common.file.dummy?entityId='+entityId+'&entityName='+entityName;
	if(fileName != null && fileName != undefined) {
		url += ('&fileName='+fileName);
	}
	location.href = url;
	/*$.ajax({
        type		: 'GET',
        url			: url,
        dataType	: 'json',
        contentType	: 'application/json;charset=UTF-8',
        success: function (data) {
        	micaCommon.splash.hide();
        	console.log('success');
        	console.log(data);
        },
        error:function (xhr, ajaxOptions, thrownError) {
        	micaCommon.splash.hide();
            console.log("in error");
            console.log(xhr);
            console.log(ajaxOptions);
        } 
    });*/
}
function attach_download2(query, param, call_back = null){
	var url = tuCommon.contextPath() + '/file/download/' + query + '.dummy';
    /*var formData = new FormData();
    
    formData.append("query", query);
    formData.append("param", param);*/

    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", url, true); 

    xhr.onload = function() {
    	micaCommon.splash.hide();
        //console.log(xhr.responseText);
        /*if(JSON.parse(xhr.responseText)['result'] == 'success'){
    		alert('Upload Success');
    	}else{
    		alert('Upload Fail');
    	}*/
        //console.log('complete');
        if(xhr.status == 200) {
        	//alert(xhr.responseText);
        	if(call_back != null){
				call_back('SUCCESS', JSON.parse(xhr.responseText));
			}
        } else {
        	//alert(xhr.responseText);
        	if(call_back != null){
				call_back('FAIL', JSON.parse(xhr.responseText));
			}
        }
    }
    xhr.send(null);    
    event.preventDefault();
}

function fn_b2bi_upload(query, param, call_back){
	var url = tuCommon.contextPath() + '/file/B2BIXml/' + query + '.dummy';
	micaCommon.splash.show();
	$.post(url, param, call_back);
}


function fn_report_upload( files, param, call_back){
    url = tuCommon.contextPath() + '/file/report/com.thirautech.mom.common.excelPrintForm.dummy';
    
    var formData = new FormData();
    formData.append("file" , files );
    formData.append("param", param);

    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", url); 
    
    xhr.onload = function() {
    	micaCommon.splash.hide();
        if(JSON.parse(xhr.responseText)['result'] == 'success'){
    		call_back('SUCCESS', JSON.parse(xhr.responseText));
    	}else{
    		call_back('FAIL', JSON.parse(xhr.responseText));
    	}
    }
    xhr.send(formData);    
    event.preventDefault();
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
	var delimiter = '';	
	var ret_date = '';
	
	if(date.indexOf('/') > 0){
		delimiter = '/';
	}else if(date.indexOf(':') > 0){
		delimiter = ':';
	}else if(date.indexOf('.') > 0){
		delimiter = '.';
	}else if(date.indexOf(' ') > 0){
		delimiter = ' ';
	}else if(date.indexOf('-') > 0){
		delimiter = '-';
	} 
	
	if(delimiter == ''){
		if(date.length > 7){
			return date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8);
		}else{
			return '0000-00-00';
		}
	}
	
	var tokens = date.split(delimiter);
	var year = tokens[0];
	var month, day;	
	if(parseInt(tokens[1]) < 10){
		month = '0' + parseInt(tokens[1]).toString();
	}else{
		month = parseInt(tokens[1]).toString();
	}
	if(parseInt(tokens[2]) < 10){
		day = '0' + parseInt(tokens[2]).toString();
	}else{
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
function get_current_date(mode){
	var current = new Date();
	var ret_date = '';
	
	if(mode == 'yyyy-mm-dd' || mode == 'YYYY-MM-DD'){
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
		event.preventDefault();	//IE 사용할 경우
		window.event.returnValue = false;
		return;
	}
}
