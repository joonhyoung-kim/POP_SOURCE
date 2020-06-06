var momWidget = {
	grid: 				[undefined, undefined, 	undefined	],
	columnProperty: 	[undefined, undefined, 	undefined	],
	gridProperty: 		[undefined, undefined, 	undefined	],
	processTran: 		[undefined, undefined, 	undefined	],
	sortParam: 			[undefined, undefined, 	undefined	],
	
	popUpSetting: 		[undefined, undefined, 	undefined	], 
	
	excelGrid: 			[undefined, undefined, 	undefined	],	
	excelTemplateGrid: 	[undefined, undefined, 	undefined	],
	
	currentPage: 		[undefined, undefined, 	undefined	],
	pageNumber: 		[undefined, undefined, 	undefined	],
	totalPage: 			[undefined, undefined, 	undefined	],
	startPage: 			[undefined, undefined, 	undefined	],
	endPage: 			[undefined, undefined, 	undefined	],
	
	entireDatas:		[undefined, undefined, 	undefined	],
	partialDatas:		[{}, 		{}, 		{}			],
	entireIsDone:		[undefined,	undefined,	undefined	],
	/*partialIsDone:		[[],		[],			[]			],*/
	entireProcess:		[0, 		0, 			0			],
	
	dropDownMap:		undefined,
	INFINITE: 			100000000,	
	
	tmpFlag: 			0,
	downSequence:		100,
	
	init: function(index, pageId, your) {
		index--;
		
		var isExist = document.getElementById('grid' + (index + 1));
		if(isExist == undefined) {
			this.messageBox({type:'warning', width:'400', height: '145', html:'grid' + (index + 1) + '가 존재하지 않습니다.'});
			return;
		}
		
		if(this.dropDownMap == undefined) {
			this.dropDownMap = new Map();
		}
		
		var that = this;
		console.time('TOBE 화면로딩');
		$.get(this.contextPath() + '/mom/request/com.thirautech.mom.widget.widgetprop.dummy', {'pageId' : pageId + (index + 1)}, 
			function(data) {
				if(data == undefined) {
					console.log('error');
					return;
				}
				
				that.gridProperty[index] = JSON.parse(data[0].gridProperty);
				that.columnProperty[index] = data[0].columnProperty.indexOf('#44#') > 0 ? JSON.parse(data[0].columnProperty.replace(/#44#/gi, ',')) : JSON.parse(data[0].columnProperty);
				if(data[0].processTran == undefined || data[0].processTran.length < 2) {
					that.processTran[index] = undefined;
				} else {
					that.processTran[index] = data[0].processTran.indexOf('#44#') > 0 ? JSON.parse(data[0].processTran.replace(/#44#/gi, ',')) : JSON.parse(data[0].processTran);
				}
				/*for(var i = 0; i < that.columnProperty[index].length; i++) {
					console.log('[' + i + '] = ' + JSON.stringify(that.columnProperty[index][i]));
				}*/
				
				/*if(that.gridProperty[index]['pageRowCount'] == undefined || that.gridProperty[index]['pageRowCount'] == 0) {
					that.gridProperty[index]['pageRowCount'] = that.INFINITE;
				}*/
				
				if(that.gridProperty[index]['editId']) {											// Edit 버튼이 설정된 경우
					var editColumn = {'headerText':'Edit','dataField':'Edit','width':40,'visible':true,
						sortable : false,
						renderer : { type : 'TemplateRenderer'}, 									// renderer를 설정 해줘야 아래 labelFunction이 호출된다.
						labelFunction: function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
							return '<div class="GridEditBtn' + (index + 1) + ' w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
						}
					}

					that.columnProperty[index].unshift(editColumn);
				}
				
				that.grid[index] = AUIGrid.create('#grid' + (index + 1), that.columnProperty[index], that.gridProperty[index]);
				
				console.timeEnd('TOBE 화면로딩');
				console.log('');
				
				if(that.gridProperty[index]['columnFixed'] > 0) {				// 고정 컬럼 설정
					if(that.gridProperty[index]['editId']) {
						AUIGrid.setFixedColumnCount(that.grid[index],parseInt(that.gridProperty[index]['columnFixed']) + 1);
					} else {
						AUIGrid.setFixedColumnCount(that.grid[index],parseInt(that.gridProperty[index]['columnFixed']));
					}
				}
				
				setTimeout(that.procColumnPropertyPageDependent, 0, index, pageId);
				setTimeout(that.procColumnProperty, 0, index);					// AUIGrid 기본 컬럼 속성 설정
				setTimeout(that.procRetrieve, 0, index);						// 조회 버튼 설정
				if(index == 0) {
					setTimeout(that.procEnterKeyEvent, 0, index);
				}
				setTimeout(that.procCellClick, 0, index);						// 셀클릭, 단일선택, 다중선택 설정
				setTimeout(that.procAddDelSaveBtn, 0, index);						// 셀클릭, 단일선택, 다중선택 설정
				setTimeout(that.procCreateBtn, 0, index, your);					// 등록버튼 설정
				setTimeout(that.procEditBtn, 0, index, your);					// Edit 버튼 이벤트, 수정 팝업 생성 및 데이터 복사
				setTimeout(that.procExcelDown, 0, index, pageId);				// Excel Download 버튼 이벤트
				setTimeout(that.procExcelTemplateDown, 0, index, pageId);		// Excel Template Download 버튼 이벤트
				setTimeout(that.procExcelUpload, 0, index, pageId);				// Excel Upload 버튼 이벤트
				if(index == 0) {
					setTimeout(that.procCalendar, 0, index);
					setTimeout(that.procResize, 0, index);
				}
				if(index == 1) {
					setTimeout(that.grid1CellClick, 0, index);
				}
				setTimeout(that.procPageDependent, 0, index, pageId);
				setTimeout(that.procProcessTran, 0, index);
			}
		);
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 속성 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 기본 컬럼 속성 설정
	procColumnProperty: function(index) {
		var that = this.momWidget;
		//var that = this;
		
		var is_drop_done = [];
		for(var loop = 0; loop < that.columnProperty[index].length; loop++) {
			if(that.columnProperty[index][loop]['dropDown'] == undefined) {
				is_drop_done[loop] = true;
			} else {
				is_drop_done[loop] = false;
			}
		}
		
		for(var loop = 0; loop < that.columnProperty[index].length; loop++) {
			const i = loop;
			const data_field = that.columnProperty[index][i]['dataField'];
			
			if(!is_drop_done[i]/* && that.columnProperty[index][i]['dropDown'] != undefined*/) {
				const drop_down = that.columnProperty[index][i]['dropDown'];
				is_drop_done[i] = true;
				
				$.get(that.contextPath() + drop_down, null, function(data) {
					if(data == undefined) {
						console.log('error');
						return;
					}
					
					that.dropDownMap.set(drop_down, data); 
					
					const idx = i;
					AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
						style: 'columnStyle' + idx,
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							var retStr = '';
							for(var j = 0; j < data.length; j++) {
								if(data[j]['code'] == value) {
									retStr = data[j]['name'];
									break;							
								}
							}
							
							return retStr;
						},
						editRenderer: {
							type: 'DropDownListRenderer',
							list: data,
							showEditorBtnOver: true,
							keyField: 'code', 
							valueField: 'name'
						}
					}); 
					
					if(index == 0 && document.getElementById(data_field/* + (index + 1)*/)) {
						$('#' + data_field).jqxComboBox({dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
						var width = parseInt(document.getElementById(data_field).style.width.toString().replace('px','')) - 7;
						var height = parseInt(document.getElementById(data_field).style.height.toString().replace('px','')) + 1;
						$('#' + data_field).jqxComboBox({width : width + 'px', height : height + 'px'});

						var items = $('#' + data_field).jqxComboBox('source');
						for(var j = 0; j < data.length; j++) {
							items.push({ label: data[j]['name'], value: data[j]['code'] });
						}
						
						$('#' + data_field).jqxComboBox('source', items);
						
						$('#' + data_field).find('input').attr('readonly', false);
						
						/*var node = document.getElementById(data_field);
						var height = node.clientHeight - 7;
						var width = node.clientWidth - 58;
						console.log(width + ', ' + height);
						
						$('#' + data_field).css('height', height + 'px');
						$('#' + data_field).css('width', width + 'px');
						$('#dropdownlistContent' + data_field).css('width', (width - 6) + 'px');
						$('#dropdownlistArrow' + data_field).css('left', (width - 4) + 'px');*/
						
						//$('#' + data_field).css('aria-expanded', false);
						
						//var el = $('#' + data_field);
						$('#' + data_field).removeClass('w-select');
						$('#' + data_field).parent().find('#' + ($('#' + data_field).attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-')); //.find('input').attr('readonly', readonly);
						// 작업 다시 하자
					}
					
					for(var k = i + 1; k < that.columnProperty[index].length; k++) {
						if(that.columnProperty[index][k]['dropDown'] == drop_down) {
							const data_field1 = that.columnProperty[index][k]['dataField'];
							
							const idx = i;
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field1, {
								style: 'columnStyle' + idx,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = '';
									for(var j = 0; j < data.length; j++) {
										if(data[j]['code'] == value) {
											retStr = data[j]['name'];
											break;							
										}
									}
									
									return retStr;
								},
								editRenderer: {
									type: 'DropDownListRenderer',
									list: data,
									showEditorBtnOver: true,
									keyField: 'code', 
									valueField: 'name'
								}
							}); 
						}
					}
				});
			}
			
			if(that.columnProperty[index][i]['visible'] == undefined || !that.columnProperty[index][i]['visible']) {
				continue;
			}
			
			// Begin Message
			/*if(that.columnProperty[index][i]['message'] != null && that.columnProperty[index][i]['message'] != undefined && $.trim(that.columnProperty[index][i]['message']) != '') {*/
			if(that.columnProperty[index][i]['message'] != undefined) {
				const message = that.columnProperty[index][i]['message'];
				
				AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
					dataField : data_field,
					labelFunction: function(rowIndex, columnIndex, value, item) { 
						return (value == null || value == '' || value == undefined) ? message : value;
					},
					editRenderer: {
						type : 'InputEditRenderer',
					}
				});
			}
			// End Message
			
			// Begin Color
			/*if(that.columnProperty[index][i]['color'] != null && that.columnProperty[index][i]['color'] != undefined && $.trim(that.columnProperty[index][i]['color']) != '' && $.trim(that.columnProperty[index][i]['color']) != 'null') {*/
			if(that.columnProperty[index][i]['color'] != undefined) {
				const idx = i;
				const color = that.columnProperty[index][i]['color'];
				const style = that.columnProperty[index][i]['style'];
				that.design(idx, color, style);
				var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
				columnLayout[i].style = 'columnStyle' + idx;
				AUIGrid.changeColumnLayout(that.grid[index], columnLayout);
			}
			// End Color
			
			// Begin Sort
			if(i == 0) {
				that.sortParam[index] = [];
			}
			/*if(that.columnProperty[index][i]['sortIndex'] != null && that.columnProperty[index][i]['sortIndex'] != undefined && $.trim(that.columnProperty[index][i]['sortIndex']) != '' && $.trim(that.columnProperty[index][i]['sortIndex']) != 'null') {*/
			if(that.columnProperty[index][i]['sortIndex'] != undefined) {
				const sortIndex = that.columnProperty[index][i]['sortIndex'] - 1;
				const asc = that.columnProperty[index][i]['sort'];
				that.sortParam[index][sortIndex] = {dataField : data_field, sortType : asc};
			}			
			// End Sort
			
			// Begin Filter
			if(that.columnProperty[index][i]['filter']) {
				var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
				columnLayout[i].filter = {showIcon:true};
				AUIGrid.changeColumnLayout(that.grid[index], columnLayout);
			}
			// End Filter
		} // for(var i = 0; i < that.columnProperty[index].length; i++)
	},
	
		// Level 2. columnStyle을 위한 HTML 동적 생성, by procColumnProperty
		design: function(idx, color, align) {
			if(align != null && align != undefined && align.indexOf('-') > 0) {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
			} else {
				$('head').append('<style>.columnStyle' + idx + '{background:' + color + '; text-align:center}</style>');
			}
		},
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 조회 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 조회버튼 핸들러
	procRetrieve: function(index) {
		var findBtnId = 'findBtn' + (index + 1);
		var isExist = document.getElementById(findBtnId);
		
		var that = this.momWidget;
		if(isExist == undefined || that.gridProperty[index]['queryId'] == undefined || $.trim(that.gridProperty[index]['queryId']) == '' || $.trim(that.gridProperty[index]['queryId']) == 'namespace.queryId.dummy') {
			return;
		}
					
		$(document).on('click', '#' + findBtnId, function() {
			that.findBtnClicked(index, true);
		});
	},
	
		// Level 2. 조회연산시 페이징 처리, by procRetrieve
		retrievePartial: function(index, param, entireProcess, callBack, flag) {
			if(entireProcess != this.entireProcess[index]) {
				return;
			} else if(param['endPage'] - param['startPage'] + 1 == this.gridProperty[index]['pageRowCount']) {
				if(this.entireIsDone[index] == 'WORK') {				
					if(param['startPage'] <= this.entireDatas[index].length) {
						var partialData = this.entireDatas[index].slice(param['startPage'] - 1, param['endPage']);
						
						//AUIGrid.clearGridData(this.grid[index]);
						AUIGrid.setGridData(this.grid[index], partialData); ///
						
						if(this.sortParam[index] != undefined && this.sortParam[index].length > 0) {
							AUIGrid.setSorting(this.grid[index], this.sortParam[index]);
						}
						
						this.drawPaging(index, param, entireProcess);
						
						return;
					} else if(param['startPage'] > this.entireDatas[index].length) {
						const start = param['startPage'];
						const end = param['endPage'];
						
						this.splashShow();
						
						if(this.partialDatas[index]['' + this.currentPage[index]] != undefined) {
							AUIGrid.setGridData(this.grid[index], this.partialDatas[index]['' + this.currentPage[index]]);
							this.splashHide();
							//console.log('#### navigationProcess Cached = ' + entireProcess + ', page = ' + this.currentPage[index]);
							
							this.drawPaging(index, param, entireProcess);
							
							return;
						} 
							
						var that = this;
						$.get(this.contextPath() + '/mom/request/com.thirautech.mom.' + that.gridProperty[index]['queryId'], param, 
							function(data) {
								if(data == undefined) {
									that.messageBox({type:'warning', width:'400', height: '145', html:'데이터 조회에 실패하였습니다.'});
									return;
								}
								
								AUIGrid.setGridData(that.grid[index], data);
								that.splashHide();
									
								if(that.sortParam[index] != undefined && that.sortParam[index].length > 0) {
									AUIGrid.setSorting(that.grid[index], that.sortParam[index]);
								}
									
								that.drawPaging(index, param, entireProcess);
																						
								setTimeout(function(index) {
									that.partialDatas[index]['' + that.currentPage[index]] = data; 
								
								}, 0, index);	
							}
						);
						
						return;
					}
				} else if(this.entireIsDone[index] == 'DONE') {
					var partialData = this.entireDatas[index].slice(param['startPage'] - 1, param['endPage']);
					
					AUIGrid.setGridData(this.grid[index], partialData); ///
					
					if(this.sortParam[index] != undefined && this.sortParam[index].length > 0) {
						AUIGrid.setSorting(this.grid[index], this.sortParam[index]);
					}
					
					this.drawPaging(index, param, entireProcess);
					
					return;
				}
			}
			
			if(this.entireIsDone[index] == 'INIT') {
				if(this.tmpFlag == 0) {
					console.time('TOBE 조회');
				}
			}
			var that = this;
			$.get(this.contextPath() + '/mom/request/com.thirautech.mom.' + that.gridProperty[index]['queryId'], param, 
				function(data) {
					if(data == undefined) {
						console.log('error');
						return;
					}
					
					if(entireProcess != that.entireProcess[index]) {
						return;
					} else if(that.entireIsDone[index] == 'INIT') {
						try {
							that.gridProperty[index]['totalRowCount'] = (data[0]['rowCount'] == undefined) ? data.length : data[0]['rowCount'];
						} catch(e) {
							that.gridProperty[index]['totalRowCount'] = data.length;
						}
						
						that.totalPage[index] = Math.floor((that.gridProperty[index]['totalRowCount'] - 1) / that.gridProperty[index]['pageRowCount']) + 1;
						
						if(data.length > that.gridProperty[index]['pageRowCount']) {
							var partialData = data.slice(param['startPage'] - 1, param['endPage']);
							AUIGrid.setGridData(that.grid[index], partialData);
						} else {
							AUIGrid.setGridData(that.grid[index], data);
						}
						
						if(that.sortParam[index] != undefined && that.sortParam[index].length > 0) {
							AUIGrid.setSorting(that.grid[index], that.sortParam[index]);
						}
						
						that.drawPaging(index, param, entireProcess);
						
						if(callBack != undefined && flag != undefined) {
							setTimeout(callBack, 0, 'SUCCESS', data, {}, flag);
						}
						
						that.splashHide();
						
						if(that.tmpFlag == 0) {
							console.timeEnd('TOBE 조회');
							console.log('');
						} else if(that.tmpFlag == 1) {
							console.timeEnd('TOBE 등록');
							console.log('');
							that.tmpFlag = 0;
							that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
						} else if(that.tmpFlag == 2) {
							console.timeEnd('TOBE EXCEL 등록');
							console.log('');
							that.tmpFlag = 0;
							that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
						} 
											
						setTimeout(function(index) {
							that.entireDatas[index] = data; 
							
							if(that.entireDatas[index].length == that.gridProperty[index]['totalRowCount']) {
								that.entireIsDone[index] = 'DONE';
								
								if(callBack != undefined && flag != undefined) {
									setTimeout(callBack, 0, 'SUCCESS', data, {}, flag);
								}
								
								return;
							}
							
							that.entireIsDone[index] = 'WORK';
							
							param['startPage'] = that.entireDatas[index].length + 1;
							param['endPage']   = that.entireDatas[index].length + that.gridProperty[index]['pageRowCount'] * 10;
							
							that.retrievePartial(index, param, entireProcess);
						}, 0, index);
					} else if(that.entireIsDone[index] == 'WORK') {
						that.entireDatas[index] = that.entireDatas[index].concat(data);

						if(that.entireDatas[index].length == that.gridProperty[index]['totalRowCount']) {
							that.entireIsDone[index] = 'DONE';
							
							if(callBack != undefined && flag != undefined) {
								setTimeout(callBack, 0, 'SUCCESS', data, {}, flag);
							}
							
							return;
						}
						
						param['startPage'] = that.entireDatas[index].length + 1;
						param['endPage']   = that.entireDatas[index].length + that.gridProperty[index]['pageRowCount'] * 40;
						
						that.retrievePartial(index, param, entireProcess);
					}
				}
			);
		},
		
			// Level 3. 페이지 네비게이션 버튼 핸들러, by retrievePartial
			drawPaging: function(index, param, entireProcess) {
				if(this.gridProperty[index]['pageRowCount'] == this.INFINITE) {
					return;
				}
				
				/*var isExist = document.getElementById('pagingPanel' + (index + 1));
				if(isExist == undefined) {
					$('#grid' + (index + 1)).parent().append('<div id="pagingPanel' + (index + 1) +'" class="aui-grid-paging-panel" style="position: absolute; width: 100%; height: 34px; left: 0px; bottom: 0px;"></div>');
				}*/ 
				
				var prevBtnHtml = '<span class="aui-grid-paging-number aui-grid-paging-first">&lt;&lt;</span><span class="aui-grid-paging-number aui-grid-paging-prev">&lt;</span>';
				var numBtnHtml = '<span class="aui-grid-paging-number #{selected}" style="">#{number}</span>';					
				var nextBtnHtml = '<span class="aui-grid-paging-number aui-grid-paging-next">&gt;</span> <span class="aui-grid-paging-number aui-grid-paging-last">&gt;&gt;</span>';					
				var pagingAppendHTML = '';
				
				var startPage = 0;
				var endPage = 0;
				if(this.currentPage[index] <= 10) {
					startPage = 1;
				} else {
					startPage = this.currentPage[index] - (this.currentPage[index] % 10 == 0 ? 10 : this.currentPage[index] % 10) + 1;  
				}
				
				endPage = startPage + 9 < this.totalPage[index] ? startPage + 9 : this.totalPage[index]; 
				if(startPage > 1 && this.totalPage[index] > 10) {
					pagingAppendHTML = prevBtnHtml;
				}
				
				for(var i = startPage; i <= endPage; i++) {
					pagingAppendHTML += numBtnHtml.replace(/#{number}/gi, i);
					if(i == this.currentPage[index]) {
						pagingAppendHTML = pagingAppendHTML.replace(/#{selected}/gi, 'aui-grid-paging-number-selected');
					} else {
						pagingAppendHTML = pagingAppendHTML.replace(/#{selected}/gi, '');
					}
				}
				
				if(endPage < this.totalPage[index]) {
					pagingAppendHTML += nextBtnHtml;
				}
				
				pagingAppendHTML += ('<span class="aui-grid-paging-info-text">'
									+ param['startPage'] 
									+ " ~ " 
									+ (param['endPage'] < this.gridProperty[index]['totalRowCount'] ? param['endPage'] : this.gridProperty[index]['totalRowCount']) 
									+ " of " + this.gridProperty[index]['totalRowCount'] 
									+ ' rows</span>');
									
				//$('#' + this.grid[index]).parent().find('.aui-grid-paging-panel').html(pagingAppendHTML);
				$(this.grid[index]).parent().find('.aui-grid-paging-panel').html(pagingAppendHTML);
				
				var that = this;
				$('.aui-grid-paging-number').on('click', function() {
					var classType = $(this).attr('class').replace('aui-grid-paging-number', '').replace(' ', '');
					var currentPage = that.currentPage[index];
					var pageNumber = that.pageNumber[index]; 
					switch(classType) {
						case 'aui-grid-paging-first':
							currentPage = 1;
							break;
						case 'aui-grid-paging-prev':
							currentPage = (pageNumber - 1) * 10 + 1;
							break;
						case 'aui-grid-paging-next':
							currentPage = (pageNumber + 1) * 10 + 1;
							break;
						case 'aui-grid-paging-last':
							currentPage = that.totalPage[index];
							break;
						default:
							currentPage = Number($(this).html());
							break;
					}
					
					that.currentPage[index] = currentPage;
					that.pageNumber[index] = parseInt((currentPage - 1) / 10);
					
					that.startPage[index] = (that.currentPage[index] - 1) * that.gridProperty[index]['pageRowCount'] + 1;
					that.endPage[index] = that.currentPage[index] * that.gridProperty[index]['pageRowCount'];
					
					//if(entireProcess != undefined) {
						param['startPage'] = that.startPage[index];
						param['endPage'] = that.endPage[index];
						
						that.retrievePartial(index, param, entireProcess);
					//}
				});	
			},
			
			// Level 3. 페이지 네비게이션시 읽지 못한 데이터를 기다리기 위한 지연 함수, by retrievePartial
			retrieveDelay: function(index, entireProcess, param, start, end) {
				var that = this;
				setTimeout(function(index, param, start, end) {
					if(start <= that.entireDatas[index].length) {
						var partialData = that.entireDatas[index].slice(start- 1, end);
						
						//AUIGrid.clearGridData(that.grid[index]);
						AUIGrid.setGridData(that.grid[index], partialData);
						
						param['startPage'] = start;
						param['endPage'] = end;
						
						that.splashHide();
						
						that.drawPaging(index, param, entireProcess);
						
						return;
					} else {
						that.retrieveDelay(index, entireProcess, param, start, end);
					}
					
				}, 40, index, param, start, end);
			},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엔터키 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 입력상자 엔터키 이벤트 핸들러
	procEnterKeyEvent: function(index) {
		var that = this.momWidget;
		
		var $form = $('#form');
		var $objs = $form.find('input[id]');
		for (var i = 0; i < $objs.length; i++) {
			$(document).on('keydown', $($objs[i]), function(event) {
				if (event.keyCode == 13) {
					that.findBtnClicked(index, true);
				}			
			});
		}		
	},
	
		// 검색버튼을 누른 효과
		findBtnClicked: function(index, splash, param1, callBack, flag) {
			this.entireIsDone[index] = 'INIT';
			this.entireDatas[index] = undefined;
			
			this.currentPage[index] = 1;
			this.pageNumber[index] = 0;
			
			this.startPage[index] = 1; 
			this.endPage[index] = this.gridProperty[index]['pageRowCount']; 
			
			var param = undefined;
			if(param1 == undefined) {
				param = this.createParam4Form('#form');
			} else {
				param = param1;
			}
			
			param['startPage'] = this.startPage[index];
			param['endPage'] = this.endPage[index];
			
			const entireProcess = ++(this.entireProcess[index]);
			
			if(splash) {
				this.splashShow();
			}
			
			this.retrievePartial(index, param, entireProcess, callBack, flag);
		},
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 셀클릭 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 셀 클릭시 선택여부 설정
	procCellClick: function(index) {
		var that = this.momWidget;
		
		if(that.gridProperty[index].checkId == 'NONE') {
			return;
		}
		
		AUIGrid.bind(that.grid[index], 'cellClick', function(e) {
			var item = e.item;
			var rowIdField;
			var rowId;
			
			rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
			rowId = item[rowIdField];
			
			if(that.gridProperty[index].checkId == 'singleRow') {
				AUIGrid.setAllCheckedRows(that.grid[index], false);
			}
			
			if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
				AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
			} else {
				AUIGrid.addCheckedRowsByIds(e.pid, rowId);
			}
		});
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 저장, 삭제 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 저장, 삭제버튼 이벤트 핸들러
	procAddDelSaveBtn: function(index) {
		var that = this.momWidget;
		
		var addBtnId = 'addBtn' + (index + 1);
		var isExist = document.getElementById(addBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + addBtnId, function() {
				var newRow = {};
				
				var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
				for(var i = 0; i < columnLayout.length; i++) {
					newRow[columnLayout[i]['dataField']] = '';
				}
				
				newRow['NEW'] = 'Y';
				
				AUIGrid.addRow(that.grid[index], newRow, 'last');
			});
		}
		
		var delBtnId = 'delBtn' + (index + 1);
		isExist = document.getElementById(delBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + delBtnId, function() {
				var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(checkedItems.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 행을 선택하여 주십시오.'});
					
					return;
				}
				
				that.messageBox({type:"info", width:"400", height: "145", html:"선택된 행을 삭제 하시겠습니까?", closeButton:{text:"Close"}, okButton:{text:"OK", after:function(){
					var param = [];
					var j = 0;
					for(var i = 0; i < checkedItems.length; i++) {
						if(checkedItems[i].item['NEW'] == 'Y') {
							continue;
						}
						
						param[j++] = checkedItems[i].item;
					}
					
					momWidget.splashShow();
					
					if(param.length > 0) {
						mom_ajax('LD', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data, call_back_param, flag) {
							momWidget.splashHide();
							
							if(result != 'SUCCESS') {
								that.messageBox({type:'danger', width:'400', height: '145', html: '삭제를 실패하였습니다.'});
								return;
							}
							
							that.findBtnClicked(index, true, undefined, function(result, data, call_back_param, flag) {
								that.messageBox({type:'success', width:'400', height: '145', html: '삭제를 성공하였습니다.'});
							}, 'SERVER DELETE');
						}, undefined, undefined);
					} else {
						setTimeout(function() {
							that.splashHide();
								
							that.findBtnClicked(index, true, undefined, function(result, data, call_back_param, flag) {
								that.messageBox({type:'success', width:'400', height: '145', html: '삭제를 성공하였습니다.'});
							}, 'CLIENT DELETE');
						}, 200);
					}
				}}});
			});
		}
		
		var saveBtnId = 'saveBtn' + (index + 1);
		isExist = document.getElementById(saveBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + saveBtnId, function() {
				var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(checkedItems.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'저장할 행을 선택하여 주십시오.'});
					
					return;
				}
				
				that.messageBox({type:"info", width:"400", height: "145", html:"선택된 행을 저장 하시겠습니까?", closeButton:{text:"Close"}, okButton:{text:"OK", after:function(){
					var param = [];
					for(var i = 0; i < checkedItems.length; i++) {
						param[i] = checkedItems[i].item;
					}
					
					momWidget.splashShow();
					
					mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data, call_back_param, flag) {
						momWidget.splashHide();
						
						if(result != 'SUCCESS') {
							that.messageBox({type:'danger', width:'400', height: '145', html: '저장을 실패하였습니다.'});
							return;
						}
						
						that.findBtnClicked(index, true, undefined, function(result, data, call_back_param, flag) {
							that.messageBox({type:'success', width:'400', height: '145', html: '저장을 성공하였습니다.'});
						}, 'SERVER INSERT');
					}, undefined, undefined);
				}}});
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 등록 팝업창 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 등록버튼 이벤트 핸들러
	procCreateBtn: function(index, your) {
		var that = this.momWidget;
		
		var createBtnId = 'createBtn' + (index + 1);
		var isExist = document.getElementById(createBtnId);		
		
		if(isExist == undefined) {
			return;
		}
		
		$(document).on('click', '#' + createBtnId, function() {
			that.createPopUp(index, your);
			that.popUpDataSetCopy(index, 'NEW');
			
			$('#' + that.popUpSetting[index]).momModal('show');
			that.popUpSizeSet(index);
		});
	},
	
		// Level 2. 팝업창 생성, by. procCreateBtn, procEditBtn
		createPopUp: function(index, your) {
			if(this.popUpSetting[index] != undefined && this.popUpSetting[index].length > 0) {
				return;
			}
			
			var widthSizes = {1 : 400, 2 : 700, 3 : 776};
			var wSizeClass = {1 : 'w190', 2 : 'w190', 3 : 'w120'}
			var colCount = this.gridProperty[index].popUpColSize || 2;
			var width = widthSizes[colCount];
			var wSize = wSizeClass[colCount];
			
			var modalTitle = this.gridProperty[index].popUpTitle || 'Title를 입력하세요';  
			var modalId = 'editPop' + (index + 1);
			var modal = this.createPopUpHtml.modal();
			
			modal = modal.replace(/#{index}/gi, (index + 1)).replace(/#{modalId}/gi, modalId).replace('#{modalTitle}', modalTitle);
			var rowColCount = 0;
			
			var rowHtml = '';
			var $row = null;
			var col1TextArea = '';
			for(var loop = 0; loop < this.columnProperty[index].length; loop++) {
				const i = loop;
				
				if(this.columnProperty[index][i]['popUp']) {
					if(rowColCount == 0) {
						$row = $(this.createPopUpHtml.row());
					}
					
					var col = this.createPopUpHtml['col' + colCount]().replace(/#{headerText}/gi, this.columnProperty[index][i].headerText).replace(/#{labelId}/gi, this.columnProperty[index][i]['dataField'] + (index + 1) + 'Label');
					if(this.columnProperty[index][i]['popUpReq']) {
						col = col.replace(/#{circle_require}/gi, 'bg-orange').replace(/#{textblock_require}/gi, 'orange');
					} else {
						col = col.replace(/#{circle_require}/gi, '').replace(/#{textblock_require}/gi, '');
					}
					
					var editBoxHtml = ''; 
					switch(this.columnProperty[index][i]['popUp']) {
						case 'NORMAL'	:
						case 'DATE1'	:
						case 'DATE2' 	:
							editBoxHtml = this.createPopUpHtml.input().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'DROPDOWN':
							editBoxHtml = this.createPopUpHtml.select().replace('#{wSize}', wSize);;
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'CALENDAR':
							editBoxHtml = this.createPopUpHtml.calendar().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'TEXT':
							var col1 = this.createPopUpHtml['col1']().replace(/#{headerText}/gi, this.columnProperty[index][i].headerText).replace(/#{labelId}/gi, this.columnProperty[index][i]['dataField'] + (index + 1) + 'Label');
							col1TextArea += col1.replace('#{editBox}', this.createPopUpHtml.textarea().replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							
							break;					
					}
					
					if(rowColCount == colCount) {
						rowColCount = 0;
						rowHtml += $row[0].outerHTML;
						$row = null;
					}
				}
			}
			
			if($row) {
				rowHtml += $row[0].outerHTML;
			}
			
			rowHtml += col1TextArea;
			modal = modal.replace('#{context}', rowHtml);
			$('body').append(modal);
			
			$('#' + modalId).find('.panel').width(width || '');
			var select = $('#' + modalId).find('select');
			for(var i = 0; i < select.length; i++) {
				$select = $(select[i]);
				var comboOption = {width: Number($select.css('width').replace('px','')) - 2, height: Number($select.css('height').replace('px', '')) - 2, autoDropDownHeight: true};
				$select.removeClass('w-select').css('float', 'right');
				
				$select.jqxComboBox(comboOption);
			}
			$('#' + modalId).find('.jqx-combobox').css('float', 'right');
			
			var calendar = $('#' + modalId).find('[input-type=datepicker]');
			calendar.datetimepicker({
				timepicker:false, 
				format:'Y-m-d'
			});
			
			for(var i = 0; i < this.columnProperty[index].length; i++) {
				if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
					var width = parseInt(document.getElementById(this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).style.width.toString().replace('px','')) - 7;
					var height = parseInt(document.getElementById(this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).style.height.toString().replace('px','')) + 1;
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({width : width + 'px', height : height + 'px'});
					
					//var items = JSON.parse(JSON.stringify($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source')));
					var items = $('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source');
					var data = this.dropDownMap.get(this.columnProperty[index][i]['dropDown']);
					for(var j = 0; j < data.length; j++) {
						items.push({ label: data[j]['name'], value: data[j]['code'] });
					}
					
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					
					// 2019.05.22 hyjeong begin 확인 필요
					if(!this.columnProperty[index][i]['popUpRead']) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).find('input').attr('readonly', false);					
					} 
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).removeClass('w-select');
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).parent().find('#' + ($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
					// 2019.05.22 hyjeong end 확인 필요
				} /*else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
					if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-MM-01' || this.columnProperty[index][i]['popUpInit'] == 'yyyy-mm-01') {
    					var today = get_date_diff(0);
    					//$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today.substring(0, 8) + '01');
    					var ele = document.getElementById(this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1));
    					ele.value = today.substring(0, 8) + '01';
    					//ele.text = today.substring(0, 8) + '01';
    					console.log(ele.value);
    				} else if(this.columnProperty[index][i]['popUpInit'] == 'TODAY' || this.columnProperty[index][i]['popUpInit'] == 'today') {
    					var today = get_date_diff(0);
    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today);
    					console.log($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val());
    				}
				}*/
			}
			
			var that = this;
			$('#' + modalId).find('.pop-close-Btn').on('click', function() {
				/*that.modalHide(index);*/
				$('#' + modalId).momModal('hide');			
			});
			
			this.popUpSetting[index] = modalId; 
			
			this.popUpSaveCancelBtn(index, your);
		},
		
			// Level 3. 팝업창 생성을 위한 HTML 동적 생성, by createPopUp
			createPopUpHtml: {
				modal : function() {
					var html = 
					    '<div id="#{modalId}" class="modal gridPopup">'+
					    '    <div id="panel" class="panel messagebox col2">'+
					    '        <div class="panel-body">'+
					    '            <div class="panelbody">'+
					    '                <div class="w-clearfix panelheader panel-heading">'+
					    '                    <div tmpTabId="two" data-undefined="fa-edit" class="w-icon fa fa-edit icon r5"></div>'+
					    '                    <div class="textblock">#{modalTitle}</div>'+
					    '                    <a href="#" class="w-inline-block bntpopclose pop-close-Btn"></a>'+
					    '                </div>'+
					    '                <div class="searcharea pop">'+
					    '                    <div class="w-form">'+
					    '                        <form name="form" id="form#{modalId}" class="form-inline" data-name="Form">'+
					    '#{context}'+
					    '                        </form>'+
					    '                    </div>'+
					    '                </div>'+
					    '            </div>'+
					    '            <div class="panelfooter">'+
					    '                <a id="saveBtnEP#{index}" href="#" class="w-inline-block btnpop pop-save-Btn">'+
					    '                    <div class="textblock">저장</div>'+
					    '                </a>'+
					    '                <a id="cancelBtnEP#{index}" href="#" class="w-inline-block btnpop grey pop-close-Btn">'+
					    '                    <div class="textblock">취소</div>'+
					    '                </a>'+
					    '            </div>'+
					    '        </div>'+
					    '        <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'+
					    '    </div>'+
					    '</div>';
					return html;
				},
				row: function() {
					var html = 
						'<div class="b5">'+
						'    <div class="w-row">'+
						'        '+
						'    </div>'+
						'</div>';
					return html;
				},
				col1: function() {
					var html = 
						'<ul class="w-list-unstyled">'+
						'   <li>'+
						'       <div>'+
						'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
						'               <div class="circle #{circle_require}"></div>'+
						'               <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
						'           </div>'+
						'       	#{editBox}'+
						'       </div>'+
						'   </li>'+
						'</ul>';
					return html;
				},
				col2: function() {
					var html = 
						'<div class="w-col w-col-6">'+
						'    <div class="w-clearfix listitem">'+
						'	    <div class="w-col w-col-4">'+
						'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
						'	            <div class="circle #{circle_require}"></div>'+
						'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
						'	        </div>'+
						'       </div>'+
						'	    <div class="w-col w-col-7">'+
						'       	#{editBox}'+
						'       </div>'+
						'    </div>'+
						'</div>';
					return html;
				},
				col3: function() {
					var html =
						'<div class="w-col w-col-4">'+
						'    <div class="w-clearfix listitem">'+
						'	    <div class="w-col w-col-5">'+
						'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+
						'	            <div class="circle #{circle_require}"></div>'+
						'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'+
						'	        </div>'+
						'       </div>'+
						'	    <div class="w-col w-col-6">'+
						'       	#{editBox}'+
						'       </div>'+
						'    </div>'+
						'</div>'
					return html;
				},
				input: function() {
					var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';
					return html;
				},
				textarea: function() {
					var html = '<textarea style="resize: none;" id="#{id}" type="text" class="w-input textbox w490px"></textarea>';
					return html;
				},
				select: function() {
					var html = '<select style="float:right;" id="#{id}" class="w-select fieldbox #{wSize}"></select>';
					return html;
				},
				calendar: function() {
					var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="datepicker" date-format="date" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';
					return html;
				}
			},
		
			// Level 3. 등록 수정 팝업창 저장 취소 핸들러, by createPopUp
			popUpSaveCancelBtn: function(index, your) {
				var editPopId = document.getElementById('editPop' + (index + 1));
				
				var saveBtnEPId = 'saveBtnEP' + (index + 1);
				var isExist = document.getElementById(saveBtnEPId);		
				
				var that = this;
				if(isExist != undefined) {
					$(document).on('click', '#' + saveBtnEPId, function() {		
						that.messageBox({type : 'info', width : '400', height : '145', html : '저장하시겠습니까?', closeButton : {text : 'Close'}, okButton : {text : 'OK', 
							after:function(){
								$('#' + that.popUpSetting[index]).momModal('hide');
								
								var param1 = that.createParam4PopUp(index);
								if(param1 <= 0) {
									setTimeout(function() {
										that.messageBox({type:'warning', width:'400', height: '145', html:that.columnProperty[index][param1 * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									}, 50);
									return;
								} else {
									var param = [];
									param[0] = param1;
									
									that.splashShow();
									
									that.tmpFlag = 1;
									console.time('TOBE 등록');
									that.momAjax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data) {
										if(your != undefined && your.yourCallBack != undefined) {
											your.yourCallBack('C', result, data, param);
											return;
										} 
										
										that.splashHide();
										
										if(result == 'SUCCESS') {
											that.findBtnClicked(index, false);											
										} else {
											if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
												that.messageBox({type:'danger', width:'400', height: '145', html:data['p_err_msg']});
											} else {
												that.messageBox({type:'danger', width:'400', height: '145', html:'실패하였습니다.'});
											}
										}
										
									}, undefined, undefined/*, 'xxx'*/);	
								}
							}
						}});
					});
				} 
				
				var cancelBtnEPId = 'cancelBtnEP' + (index + 1);
				isExist = document.getElementById(cancelBtnEPId);
				
				if(isExist != undefined) {
					$(document).on('click', '#' + cancelBtnEPId + ', .bntpopclose', function() {
						$('#' + that.popUpSetting[index]).momModal('hide');
					});
				}
			}, 
			
				// Level 4. 팝업창으로부터 파라미터 생성, by popUpSaveCancelBtn
				createParam4PopUp: function(index) {
					var param = {};
					
					for(var i = 0; i < this.columnProperty[index].length; i++) {
						if(this.columnProperty[index][i]['popUp'] != undefined) {
							if(this.columnProperty[index][i]['popUpReq'] && $.trim($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val()) == '') {
								return -1 * i;
							}
							
							param[this.columnProperty[index][i]['dataField']] = $.trim($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val());
						}
					}
					
					return param;
				},
			
				// Level 4. 등록 서버 통신, by popUpSaveCancelBtn
				momAjax: function(type, url, param, call_back, call_back_param, flag/*, xxx*/) {
					var type = (type == 'D' ? 'DELETE' : (type == 'U' ? 'PUT' : 'POST'));
					url = this.contextPath() + '/mom/request/com.thirautech.mom.' + url + '/list';
	
					$.ajax({
						type 		: type,
						url  		: url,
						data 		: param,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success     : function(data){
							if(call_back != undefined) {
								if(data['result'] == 'fail') {
									call_back('FAIL', data, call_back_param, flag);
								} else {
									call_back('SUCCESS', data, call_back_param, flag);
								}
							}
						},
						error       : function(error) {
							if(call_back != undefined) {
								call_back('ERROR', error, call_back_param, flag);
							}		
						},
						fail        : function(fail) {
							if(call_back != undefined) {
								call_back('FAIL', fail, call_back_param, flag);
							}
						}
					});
				},
		
		// Level 2. 등록 팝업창 열기시 데이터 복사, by procCreateBtn, procEditBtn
		popUpDataSetCopy: function(index, selectedItem) {
			if(selectedItem == 'NEW') {
				for(var i = 0; i < this.columnProperty[index].length; i++) {
					if(this.columnProperty[index][i]['popUpInit'] != undefined) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					} else {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val('');
					}
					
					if(this.columnProperty[index][i]['popUpRead']) {
						if(this.columnProperty[index][i]['popUp'] == 'DATE1') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DATE2') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD HH24:MI:SS'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: false});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).datepicker({}).attr('disabled', false);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', false);
						}					
					}
					
					if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
						if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-MM-01' || this.columnProperty[index][i]['popUpInit'] == 'yyyy-mm-01') {
	    					var today = get_date_diff(0);
	    					/*var ele = document.getElementById(this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1));
	    					ele.value = today.substring(0, 8) + '01';*/
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today.substring(0, 8) + '01');
	    				} else if(this.columnProperty[index][i]['popUpInit'] == 'TODAY' || this.columnProperty[index][i]['popUpInit'] == 'today') {
	    					var today = get_date_diff(0);
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today);
	    				} else if(this.columnProperty[index][i]['popUpInit'].indexOf('TODAY') >= 0 || this.columnProperty[index][i]['popUpInit'].indexOf('today') >= 0) {
	    					var date = this.columnProperty[index][i]['popUpInit'];
	    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_date_diff(diff));
	    				}
					}
				}
			} else {
				selectedItem = selectedItem || {};
				for(var i = 0; i < this.columnProperty[index].length; i++) {
					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(selectedItem['' + this.columnProperty[index][i]['dataField']] || '');
						
					if(this.columnProperty[index][i]['popUpRead']) {
						if(this.columnProperty[index][i]['popUp'] == 'DATE1') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DATE2') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD HH24:MI:SS'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: true});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).datepicker({}).attr('disabled', true);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						}					
					} /*else {
						if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: false});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).datepicker({disabled: false});
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', false);
						}	
					}*/
				}
			}
		},
		
		// Level2, 팝업창 크기 조절, by procCreateBtn, procEditBtn
		popUpSizeSet: function(index) {
			var $popup = $('#' + this.popUpSetting[index]);
			var labelWidth = $popup.find('.listitem .w-col.w-col-4, .listitem .w-col.w-col-5').width();
			var col1Size = $popup.find('.listitem .w-col.w-col-4').width() / 4;
			col1Size = col1Size < 1 ?  $popup.find('.listitem .w-col.w-col-5').width() / 5 : col1Size;
			
			$popup.find('.col1-label').width(labelWidth);
			$popup.find('textarea').width('calc(100% - ' + (labelWidth + col1Size) + 'px)');
		},
		
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 이벤트 핸들러
	procEditBtn: function(index, your) {
		var that = this.momWidget;
		
		if(that.gridProperty[index]['editId'] == undefined || that.gridProperty[index]['editId'] == false || that.gridProperty[index]['editId'] == '') {
			return;
		}
		
		var editPop = document.getElementById('editPop' + (index + 1));
		
		//그리드 edit버튼
		$(document).on('click', '.GridEditBtn' + (index + 1), function() {
			console.time('TOBE 등록창 열기');
			var rowIndex = $(this).attr('row-index');		 		
			var selectedItem = AUIGrid.getItemByRowIndex(that.grid[index], rowIndex);	
						
			that.createPopUp(index, your);
			that.popUpDataSetCopy(index, selectedItem);
			
			$('#' + that.popUpSetting[index]).momModal('show');
			that.popUpSizeSet(index);		
			console.timeEnd('TOBE 등록창 열기');
			console.log('');
		});
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Excel Download 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀 다운로드 버튼 핸들러
	procExcelDown: function(index, pageId1) {
		var excelDownBtnId = 'excelDownBtn' + (index + 1);
		var isExist = document.getElementById(excelDownBtnId);
		if(isExist == undefined) {
			return;
		}
		
		var that = this.momWidget;
		const pageId = pageId1;
		$(document).on('click', '#' + excelDownBtnId, function() {
			if(that.entireDatas[index] == undefined || that.entireIsDone[index] == undefined) {
				that.messageBox({type:'warning', width:'400', height: '145', html:'조회된 데이터가 존재하지 않습니다.'});
				return;
			}
			
			console.time('TOBE EXCEL 다운로드');
			
			if(that.excelGrid[index] == undefined) {
				$('body').append('<div id="temp_div1_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index + 1)  + '"></div></div>');
				
				var excelProperty = JSON.parse(JSON.stringify(that.columnProperty[index]));
				//var excelProperty = that.columnProperty[index].slice(0);
				for(var i = excelProperty.length - 1; i >= 0 ; i--) {
					if(!excelProperty[i].excelHide) {
						excelProperty.splice(i, 1);
					} else if(!excelProperty[i].visible) {
						excelProperty[i].visible = true;
					}
				}
				
				that.excelGrid[index] = AUIGrid.create('#excelGrid' + (index + 1), excelProperty, {showRowNumColumn: false});
			} 
			
			if(that.entireIsDone[index] != 'DONE') {
				that.splashShow();
				that.excelDelay(index, pageId);
				
				return;
			}
			
			//AUIGrid.clearGridData(that.excelGrid[index]);
			AUIGrid.setGridData(that.excelGrid[index], /*items*/that.entireDatas[index]);	
			
			var option = {fileName : pageId + '_' + get_current_date('yyyy-mm-dd')};
			option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
				console.timeEnd('TOBE EXCEL 다운로드');
				console.log('');
				
				that.splashHide();
				//$('#temp_div1_' + (index + 1)).remove();
				$('.aui-grid-export-progress-modal').remove();
				
				AUIGrid.clearGridData(that.excelGrid[index]);
			}
			
			option.progressBar = true;
			
			AUIGrid.exportToXlsx(that.excelGrid[index], option);
			
			$('.aui-grid-export-progress-modal').height('100%');
			$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
		});
	},
	
		excelDelay: function(index, pageId, gridId) {
			var that = this;
			setTimeout(function(index, pageId, gridId) {
				if(that.entireIsDone[index] != 'DONE') {
					that.excelDelay(index, pageId, gridId);
				} else {
					//AUIGrid.clearGridData(that.excelGrid[index]);
					AUIGrid.setGridData(that.excelGrid[index], /*items*/that.entireDatas[index]);	
					
					var option = {fileName : pageId + '_' + get_current_date('yyyy-mm-dd')};
					option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
						console.timeEnd('TOBE EXCEL 다운로드');
						console.log('');
						
						/*$('#temp_div_div').remove();*/
						$('.aui-grid-export-progress-modal').remove();
						
						AUIGrid.clearGridData(that.excelGrid[index]);
					}
					
					that.splashHide();
					
					option.progressBar = true;
					
					AUIGrid.exportToXlsx(that.excelGrid[index], option);
					
					$('.aui-grid-export-progress-modal').height('100%');
					$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
					
					return;
				}
			}, 40, index, pageId, gridId);
		},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ExcelTemplate Download 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀양식 다운로드 버튼 핸들러
	procExcelTemplateDown: function(index, pageId1) {
		var excelTemplateBtnId = 'excelTemplateBtn' + (index + 1);
		var isExist = document.getElementById(excelTemplateBtnId);
		if(isExist == undefined) {
			return;
		}
		
		var that = this.momWidget;
		const pageId = pageId1;
		$(document).on('click', '#' + excelTemplateBtnId, function() {
			var items = AUIGrid.getGridData(that.grid[index]);
			
			if(that.excelTemplateGrid[index] == undefined) {
				$('head').append('<style>.back-red{background-color: #ff8000;}</style>');
				$('body').append('<div id="temp_div2_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelTemplateGrid' + (index + 1)  + '"></div></div>');
				
				var excelTemplateProperty = JSON.parse(JSON.stringify(that.columnProperty[index]));
				//var excelTemplateProperty = that.columnProperty[index].slice(0);
				for(var i = excelTemplateProperty.length - 1; i >= 0 ; i--) {
					if(excelTemplateProperty[i].excelTemplateHide == 1) {
						excelTemplateProperty[i].visible = true;
						excelTemplateProperty[i].headerStyle = 'back-red';
					} else if(excelTemplateProperty[i].excelTemplateHide == 2) {
						excelTemplateProperty[i].visible = true;
					} else {
						excelTemplateProperty.splice(i, 1);
					}
				}
				
				that.excelTemplateGrid[index] = AUIGrid.create('#excelTemplateGrid' + (index + 1), excelTemplateProperty, {showRowNumColumn: false});
			} 
			
			console.time('TOBE EXCEL 양식 다운로드');
			
			if(that.entireDatas[index] != undefined && that.entireDatas[index].length > 0) {
				AUIGrid.setGridData(that.excelTemplateGrid[index], that.entireDatas[index].slice(0, 1));	
			}
			
			var option = {fileName : pageId + '_template_' + get_current_date('yyyy-mm-dd')};
			option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
				console.timeEnd('TOBE EXCEL 양식 다운로드');
				console.log('');
				
				/*$('#temp_div_div').remove();*/
				$('.aui-grid-export-progress-modal').remove();
				
				AUIGrid.clearGridData(that.excelTemplateGrid[index]);
			}
			
			option.progressBar = true;
			
			AUIGrid.exportToXlsx(that.excelTemplateGrid[index], option);
			
			$('.aui-grid-export-progress-modal').css({'height' : '100%'});
			$(that.excelTemplateGrid[index]).children().append($('.aui-grid-export-progress-modal'));
		});
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Excel Upload 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀업로드 버튼 이벤트 핸들러
	procExcelUpload: function(index, pageId1) {
		var excelUpBtnId = 'excelUpBtn' + (index + 1);
		var isExist = document.getElementById(excelUpBtnId);
		if(isExist == undefined) {
			return;
		}
		
		$('#excelPop' + (index + 1) + ' .searcharea').css({'padding' : '5px 5px 0'});
		$('#excelPop' + (index + 1) + ' .searcharea from').attr('id', 'fileUploadForm');
		$('#excelPop' + (index + 1) + ' .searcharea form').html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		
		$(document).on('click', '#' + excelUpBtnId, function() {
			$('#excelPop' + (index + 1)).momModal('show');
			$('#file').val('');
		});
		
		var that = this.momWidget;
		const pageId = pageId1;
		$(document).on('click', '#saveBtnEX' + (index + 1), function() {
			that.tmpFlag = 2;
			console.time('TOBE EXCEL 등록');
			var param = [{}];
			
			that.excelUpload(index, file, that.gridProperty[index]['queryId'], pageId/*, 'grid' + (index + 1)*/, JSON.stringify(param), function(result, data) {
				if(result == 'SUCCESS') {
					that.findBtnClicked(index, false);						
				} else {
					that.splashHide();
					if(data[0]['p_err_msg'] != undefined && data[0]['p_err_msg'].length > 0) {
						that.messageBox({type:'danger', width:'400', height: '145', html:data[0]['p_err_msg']});
					} else {
						that.messageBox({type:'danger', width:'400', height: '145', html:'실패하였습니다.'});
					}
				}
			});
		});
		
		$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function() {
			$('#excelPop' + (index + 1)).momModal('hide');		
		});
	},
		
		// Level 2. 엑셀 업로드 서버 통신 함수, by procExcelUpload
		excelUpload: function(index, file_id, url, page/*, grid*/, param1, call_back/*, xxx*/){
			var files = file_id.files;
		    if(files.length === 0) {
		        alert('선택된 파일이 없습니다.')
		        return;
		    }
		    
		    $('#excelPop' + (index + 1)).momModal('hide');
		    this.splashShow();
		    
		    url = this.contextPath() + '/file/excel/com.thirautech.mom.' + url;
		    	    	
		    var formData = new FormData();
		    formData.append('file', files[0]);
		    formData.append('page', page);
		    formData.append('param1', param1);
		    
		    var param = {};
		    var grid_column_origin = this.columnProperty[index];//AUIGrid.getColumnLayout(this.grid[index]);    
		    if(page.indexOf('MOM') < 0) {
		    	for(var i = 0; i < grid_column_origin.length; i++) {
		    		var key = grid_column_origin[i].headerText;
		        	var value = grid_column_origin[i].dataField;
		        	param[key] = value;
			    }
		    } else {
		    	var index = 0;
		    	for(var i = 0; i < grid_column_origin.length; i++) {
		    		if(grid_column_origin[i]['excelTemplateHide'] == 1 || grid_column_origin[i]['excelTemplateHide'] == 2) {
			    		if(grid_column_origin[i].dataField == 'Edit') {
			    			continue;
			    		}
				    	var key = index.toString();
				    	var value = grid_column_origin[i].dataField;
				    	param[key] = value;
				    	index++;
			    	} 
			    }
		    }
		    
		    formData.append('param', encodeURIComponent(JSON.stringify(param)));
	
		    var xhr = new XMLHttpRequest(); 
		    xhr.open('POST', url); 
	
		    xhr.onload = function() {
		    	if(JSON.parse(xhr.responseText)['result'] == 'fail') {
		        	if(call_back != null){
		        		call_back('FAIL', JSON.parse(xhr.responseText.replace(/\\/gi,'')));
					}
		        } else {
		        	if(call_back != null){
		        		call_back('SUCCESS', JSON.parse(xhr.responseText.replace(/\\/gi,'')));
					}
		        }
		    }
		    
		    xhr.send(formData);    
		    event.preventDefault();
		},	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Calendar Component
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 달력 컴포넌트	
	procCalendar: function(index) {
		var that = this.momWidget;
		
		var $form = $('#form');
		var $objs = $form.find('input');
		
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			if($obj.attr('input-type') == 'datepicker') {
				var dataFormat = $obj.attr("data-format") || 'Y-m-d';
                $.datetimepicker.setLocale('ko');
                var dateFormat = ($obj.attr("date-format") || "").toLocaleLowerCase();
                
                var options = {
                    format: dataFormat,
                    formatDate: dataFormat,
                    step: 60
                };
                
                if (dateFormat.indexOf("time") < 0 && dateFormat.indexOf("date") < 0) {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf("time") > -1,
                        datepicker: true
                    });
                } else {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf("time") > -1,
                        datepicker: dateFormat.indexOf("date") > -1,
                    });
                }
                
                if (dataFormat == "Y-m") {
                    $.extend(options, {
                        onGenerate: function (a, b) {
                            var clone = $($(".xdsoft_datetimepicker[style*='display: block']").find("tr")[2]).find("td:first").clone();
                            clone.css("width", "1%");
                            clone.html("<div style='text-align:center'>OK</div>");
                            $(".xdsoft_datetimepicker[style*='display: block']").find(".xdsoft_calendar").html(clone);
                        },
                        onShow: function (a, b) {
                            var picker = $(".xdsoft_datetimepicker");
                            $.each(picker, function (i, v) {
                                var clone = $($(v).find("tr")[2]).find("td:first").clone();
                                clone.css("width", "1%");
                                clone.html("<div style='text-align:center'>OK</div>");
                                $(v).find(".xdsoft_calendar").html(clone);
                            });
                        }
                    });
                }
                
                $obj.datetimepicker(options);
                
                //console.log('$obj = ' + $obj.attr('id'));
                for(var loop = 0; loop < that.columnProperty[index].length; loop++) {
                	if(that.columnProperty[index][loop]['popUp'] == 'CALENDAR' && that.columnProperty[index][loop]['dataField'] == $obj.attr('id')) {
        				if(that.columnProperty[index][loop]['popUpInit'] == 'YYYY-MM-01' || that.columnProperty[index][loop]['popUpInit'] == 'yyyy-mm-01') {
        					var today = get_date_diff(0);
        					$('#' + that.columnProperty[index][loop]['dataField']).val(today.substring(0, 8) + '01');
        					//console.log($('#' + that.columnProperty[index][loop]['dataField']).val());
        				} else if(that.columnProperty[index][loop]['popUpInit'] == 'TODAY' || that.columnProperty[index][loop]['popUpInit'] == 'today') {
        					var today = get_date_diff(0);
        					$('#' + that.columnProperty[index][loop]['dataField']).val(today);
        					//console.log($('#' + that.columnProperty[index][loop]['dataField']).val());
        				} else if(that.columnProperty[index][loop]['popUpInit'].indexOf('TODAY') >= 0 || that.columnProperty[index][loop]['popUpInit'].indexOf('today') >= 0) {
	    					var date = that.columnProperty[index][loop]['popUpInit'];
	    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
	    					$('#' + that.columnProperty[index][loop]['dataField']).val(get_date_diff(diff));
	    				}
        			}
                }
			}
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Proc Window Resize
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 윈도우 리사이즈	
	procResize: function(index) {	
		var that = this.momWidget;
		
		$(window).resize(function() {
			setTimeout(function() {
				for(var i = 0; i < 3; i++) {
					if(that.grid[i] == undefined) {
						continue;
					}
					
					AUIGrid.resize(that.grid[i]);
					
					/*var height = document.getElementById(that.grid[i]).children[0].clientHeight;
					var width = document.getElementById(that.grid[i]).children[0].clientWidth;*/
					var height = document.getElementById('grid' + (index + 1)).children[0].clientHeight;
					var width = document.getElementById('grid' + (index + 1)).children[0].clientWidth;
					
					$(that.grid[i]).find('.aui-grid').css('height', height + 17 + 'px');
					$(that.grid[i]).find('.aui-grid').css('width', width + 17 + 'px');
	
					AUIGrid.resize(that.grid[i]);
				}
			}, 100);
		});		
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Proc grid1CellClick
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 메인 그리드에서 하단 그리드로 데이터 내리기
	grid1CellClick: function(index) {
		var that = this.momWidget;
		
		//console.log('enroll : ' + index);
		AUIGrid.bind(that.grid[0], "cellClick", function(event) {
			//console.log('cellClick : ' + index);
			var item = event.item;
			//mCommon.render("grid2", "W201808062055095441002XVj4xS72la3", item, function(){});
			that.findBtnClicked(index, false, item);
		});
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 페이지 종속적인 코드
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 특별 코드
	procColumnPropertyPageDependent: function(index, pageId) {
		//var that = this;
		var that = this.momWidget;
		
		if(index == 1 && pageId.indexOf('MOMEA003') >= 0) { 	// 수입검사 하단 그리드이면
			AUIGrid.setSelectionMode(that.grid[index], 'singleCell');
			
			var data =  [{'code':'OK', 'name':'OK'}, {'code':'NG', 'name':'NG'}];
			var itemValues = ['itemValue1', 'itemValue2', 'itemValue3', 'itemValue4', 'itemValue5'];
			var colLayout = AUIGrid.getColumnLayout(that.grid[index]);
			for(var i = 0; i < itemValues.length; i++) {
				var colIndex = AUIGrid.getColumnIndexByDataField(that.grid[index], itemValues[i]);
				var col = colLayout[colIndex];	
				
				col.editRenderer = {	
					type : 'ConditionRenderer',
					labelFunction : function (rowIndex, columnIndex, value, item) { 						
						return value == 0 ? '' : value;
					},
					conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
						switch(item.measureMethod) {
							case 'COUNT': 					// 계수
								return {'type':'DropDownListRenderer','list':data,'keyField':'code','valueField':'name'};
							case 'NUMBERLESS': 					// 계측
								return {'type':'InputEditRenderer'};
						}
					}
				}
				
				that.columnProperty[index][colIndex] = col;
				AUIGrid.setColumnProp(that.grid[index], colIndex, col);
			}
			
			AUIGrid.bind(that.grid[index], 'cellEditBegin', function(e) {
				var item = AUIGrid.getSelectedItems(that.grid[0])[0].item;
				var sampleCnt = e.item.sampleCnt < item.departureQty ? e.item.sampleCnt : item.departureQty;
				if(e.dataField.indexOf('itemValue') > -1) {
					var number = Number(e.dataField.replace('itemValue', ''));
					if(number > sampleCnt) {
						return false;
					}
				}
			});
			
			var fileColumn = {
				"headerText":"File",
				"dataField":"File",
				"width":40,
				"visible":true,
				"editable":false,
				renderer : { type : "TemplateRenderer"}, 
				labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { 
					return '<div class="grid' + (index + 1) + 'FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
				}
			}
			
			that.columnProperty[index].unshift(fileColumn);
			AUIGrid.changeColumnLayout(that.grid[index], that.columnProperty[index]);
						
			AUIGrid.setProp(that.grid[index], {'editBeginMode':'click'});
			
			return true;
		}
		
		return false;
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 페이지 종속적인 코드
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 특별 코드
	procPageDependent: function(index, pageId) {
		var that = this.momWidget;
		
		if(index == 1 && pageId.indexOf('MOMEA003') >= 0) { 	// 수입검사 하단 그리드이면						
			$('#fileBtn2').remove(); 
			$('#fileUp2').removeClass('w-input').css('margin-bottom', 0).attr('type', 'file');
			$('#pop .searcharea form').append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
			
			// 파일업로드 팝업 사이즈 수정
			$('#filePop' + (index + 1) + ' #panel').css('width', '40%');
			$('.fileinput').css('min-width', '400px');
			
			// 파일 업로드 팝업 그리드
			//mCommon.init('auigrid', 'W2018082314330345610001wGOlkaGyFf', null, function() {
			var fileColumnProperty = [
			    {'headerText':'fileId','dataField':'fileId','columnIndex':0,'visible':false},
				/*{'headerText':'companyCd','dataField':'companyCd','columnIndex':0,'visible':false},
				{'headerText':'entityName','dataField':'entityName','columnIndex':1,'visible':false},
				{'headerText':'fileCategory','dataField':'fileCategory','columnIndex':2,'visible':false},
				{'headerText':'filePath','dataField':'filePath','columnIndex':3,'visible':false},
				{'headerText':'newFileName','dataField':'newFileName','columnIndex':4,'visible':false},*/
				{'headerText':'파일명','dataField':'oldFileName','style':'left-column','columnIndex':1},
				/*{'headerText':'fileSize','dataField':'fileSize','columnIndex':6,'visible':false},
				{'headerText':'기본여부','dataField':'defaultFlag','columnIndex':7,'visible':false},
				{'headerText':'description','dataField':'description','columnIndex':8,'visible':false},
				{'headerText':'createBy','dataField':'createBy','columnIndex':9,'visible':false},*/
				{'headerText':'등록일자','dataField':'createDate','width':120,'columnIndex':2}
				/*{'headerText':'updateDate','dataField':'updateDate','columnIndex':11,'visible':false},
				{'headerText':'result','dataField':'result','columnIndex':12,'visible':false}*/
			];
			
			//console.log('#### grid = ' + '#grid' + (index + 1) + '_1');
			AUIGrid.create('#grid' + (index + 1) + '_1', fileColumnProperty, {'showRowNumColumn':false, 'showRowCheckColumn':true, 'showAutoNoDataMessage':false});	
				// 팝업 내 그리드 사이즈 정의
			//AUIGrid.setProp('grid' + (index + 1) + '_1', {showAutoNoDataMessage : false});
			AUIGrid.resize('#grid' + (index + 1) + '_1', $(window).width() * 0.4 - 48, 150);
			//});	
			
			//mCommon.splitter('.h02-h', 'horizontal', '50%');
			
			$(document).on('click', '.grid' + (index + 1) + 'FileBtn', function() {
				AUIGrid.resize('grid' + (index + 1) + '_1', $(window).width() * 0.4 - 48, 150);
				$('#fileUp').val('');
				var selectedItems = AUIGrid.getSelectedItems(that.grid[index]);
				entityId = selectedItems[0].item.defectResultId;
				var param = { 
					entityName : pageId,
					entityId : entityId
				}
				/*mCommon.render('grid' + (index + 1) + '_1', 'W2018082314330345610001wGOlkaGyFf', param, function(){
					$('#filePop' + (index + 1)).momModal('show');
				});*/
				$.get(that.contextPath() + '/mom/request/com.thirautech.mom.common.file.dummy', param, 
					function(data) {
						//console.log('data = ' + JSON.stringify(data));
						if(data == undefined) {
							console.log('error');
							return;
						}
						
						//console.log('grid' + (index + 1) + '_1');
						AUIGrid.setGridData('#grid' + (index + 1) + '_1', data);
						$('#filePop' + (index + 1)).momModal('show');
					}
				);
			});
			
			$(document).on('change', '#file', function(){
				$('#uploadFileName').val($(this).val());
			});
			
			// 파일 업로드 버튼 (파일 등록)
			/*$(document).on('click', '#fileUpBtn' + (index + 1) + ', #fileDelBtn' + (index + 1), function(){
				var selectedItems = AUIGrid.getSelectedItems(that.grid[index]);
				if($(this).attr('id') == 'fileUpBtn' + (index + 1)) {
					//등록
					if($('#fileUp' + (index + 1)).val() == '') {
						that.messageBox({type:'warning', width:'400', height: '145', html:'등록할 파일을 선택해 주세요.'});
						return;
					}
					
					if(selectedItems[0].item.defectResultId == '' || selectedItems[0].item.defectResultId == null) {
						that.messageBox({type:'warning', width:'400', height: '145', html:'검사List를 저장 또는 검사완료 후 파일을 등록해 주세요.'});
						return;
					}
					
					var attach = document.getElementById('fileUp' + (index + 1));
					attach_upload(attach, pageId, entityId, '{}', function(flag, response){
						if(flag == 'SUCCESS') {
							var param = {
								entityId   : entityId,
								entityName : pageId
							}
							
							///mCommon.render('grid' + (index + 1) + '_1', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
							$.get(that.contextPath() + '/mom/request/com.thirautech.mom.common.file.dummy', param, 
								function(data) {
									if(data == undefined) {
										console.log('error');
										return;
									}
									
									AUIGrid.setGridData('#grid' + (index + 1) + '_1', data);
									
									that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
								}
							);
						} else {
							if(data.p_err_msg != undefined && data.p_err_msg != '') {
								that.messageBox({type:'warning', width:'400', height: '145', html: data.p_err_msg});
					        } else {
					        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
					        }
						}
					});
					
				} else {
					// 삭제
					var items = AUIGrid.getCheckedRowItems('#grid' + (index + 1) + '_1');
					if(items.length <= 0) {
						that.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 파일을 선택해 주세요.'});
						return;
					}
					
					for(var i = items.length - 1; i >= 0;  i--) {
						var param =  { fileId : items[i].item.fileId };
						if(i == 0) {
							mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data){
								if(flag == 'SUCCESS') {
									var param = {
										entityId   : entityId,
										entityName : pageId
									}
									
									$.get(that.contextPath() + '/mom/request/com.thirautech.mom.common.file.dummy', param, 
										function(data) {
											if(data == undefined) {
												console.log('error');
												return;
											}
											
											AUIGrid.setGridData('#grid' + (index + 1) + '_1', data);
										}
									);
									
									that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
								} else {
									if(data.p_err_msg != undefined && data.p_err_msg != '') {
										that.messageBox({type:'warning', width:'400', height: '145', html: data.p_err_msg});
							        } else {
							        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
							        }
								}
							});
						} else {
							mom_ajax('D', 'common.file', JSON.stringify(param));
						}
					}
				}
			});*/
			
			// 파일 업로드 버튼 (파일 등록)
			$(document).on('click', '#fileUpBtn' + (index + 1), function(){
				if($('#fileUp' + (index + 1)).val() == '') {
					that.messageBox({type:'warning', width:'400', height: '145', html:'등록할 파일을 선택해 주세요.'});
					
					return;
				}
				
				var selectedItems = AUIGrid.getSelectedItems(that.grid[index]);
				if(selectedItems[0].item.defectResultId == undefined || selectedItems[0].item.defectResultId == '') {
					that.messageBox({type:'warning', width:'400', height: '145', html:'검사List를 저장 또는 검사완료 후 파일을 등록해 주세요.'});
					return;
				}
				
				var attach = document.getElementById('fileUp' + (index + 1));
				attach_upload(attach, pageId, entityId, '{}', function(flag, response){
					if(flag == 'SUCCESS') {
						var param = {
							entityId   : entityId,
							entityName : pageId
						}
						
						$.get(that.contextPath() + '/mom/request/com.thirautech.mom.common.file.dummy', param, 
							function(data) {
								if(data == undefined) {
									console.log('error');
									return;
								}
								
								AUIGrid.setGridData('#grid' + (index + 1) + '_1', data);
								
								that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
							}
						);
					} else {
						if(data.p_err_msg != undefined && data.p_err_msg != '') {
							that.messageBox({type:'warning', width:'400', height: '145', html: data.p_err_msg});
				        } else {
				        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
				        }
					}
				});
			});
			
			//파일 다운로드 버튼
			$(document).on('click', '#fileDownBtn' + (index + 1), function() {
				var items = AUIGrid.getCheckedRowItems('#grid' + (index + 1) + '_1');
				
				var i = items.length - 1;
				if(i >= 0) {
					attach_download(entityId, pageId, items[i].item.oldFileName, i, items, tmpCallBack);	
				}
			});
			
			function tmpCallBack(entityId, entityName, i, items, fileName) {
				if(--i >= 0) {
					attach_download(entityId, pageId, items[i].item.oldFileName, i, items, tmpCallBack);
				}
			}
			
			// 파일 삭제 버튼
			$(document).on('click', '#fileDelBtn' + (index + 1), function(){
				var items = AUIGrid.getCheckedRowItems('#grid' + (index + 1) + '_1');
				if(items.length <= 0) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 파일을 선택해 주세요.'});
					return;
				}
				
				for(var i = items.length - 1; i >= 0;  i--) {
					var param =  { fileId : items[i].item.fileId };
					if(i == 0) {
						mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data){
							if(flag == 'SUCCESS') {
								var param = {
									entityId   : entityId,
									entityName : pageId
								}
								
								$.get(that.contextPath() + '/mom/request/com.thirautech.mom.common.file.dummy', param, 
									function(data) {
										if(data == undefined) {
											console.log('error');
											return;
										}
										
										AUIGrid.setGridData('#grid' + (index + 1) + '_1', data);
									}
								);
								
								that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
							} else {
								if(data.p_err_msg != undefined && data.p_err_msg != '') {
									that.messageBox({type:'warning', width:'400', height: '145', html: data.p_err_msg});
						        } else {
						        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
						        }
							}
						});
					} else {
						mom_ajax('D', 'common.file', JSON.stringify(param));
					}
				}
			});
			
			// 팝업 닫기  
			$(document).on('click', '#fileCloseBtn' + (index + 1) + ', .bntpopclose', function(){
				$('#filePop' + (index + 1)).momModal('hide');
			});
			
			AUIGrid.setProp(that.grid[index], {'editBeginMode':'click'});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 함수  관련
	procProcessTran: function(index) {
		var that = this.momWidget;
		
		if(that.processTran[index] == undefined) {
			return;
		}
		
		for(var loop = 0; loop < that.processTran[index].length; loop++) {
			var actionBtnId = that.processTran[index][loop]['dataField'] + (index + 1);
			//console.log('actionBtnId = ' + actionBtnId);
			var isExist = document.getElementById(actionBtnId);		
			
			if(isExist == undefined) {
				continue;
			}
			
			//console.log('exist');
			
			const i = loop;
			$(document).on('click', '#' + actionBtnId, function() {
				var actions = that.processTran[index][i]['dropDown'];
				// D:quality.qualityInput.checkIqc:empty:empty,L:quality.qualityInput.checkIqc:grid:grid,L:quality.qualityInput.upsertIqc:empty:grid,findBtnClicked:callback
				
				//console.log('actions = ' + actions);
				var actionList = actions.split(',');
				//console.log('actionList.length = ' + actionList.length);
				var actionFirstToken = actionList[0].split('#');
				
				var flag = [{}];
				flag[0]['index'] = index;
				flag[0]['sequence'] = 1;
				flag[0]['actionBtnId'] = actionBtnId;
				
				if(actionFirstToken.length == 1) {
					that.findBtnClicked(index, true, undefined, that.processTranCallback, flag);
				} else if(actionFirstToken.length == 2) {
					var param = {};
					if(actionFirstToken[1] == 'form') {
						param = that.createParam4Form('#form');
					} else if(actionFirstToken[1] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[1] == 'checkedGrid') {
						param = AUIGrid.getCheckedRowItems(that.grid[index]);
					}
					
					that.findBtnClicked(index, true, param, that.processTranCallback, flag);
				} else if(actionFirstToken.length == 4) {
					var param = [{}];
					if(actionFirstToken[0] == 'D') {
						param = {};
					}
					
					if(actionFirstToken[2] == 'form') {
						param = that.createParam4Form('#form');
					} else if(actionFirstToken[2] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[2] == 'checkedGrid') {
						var param1 = AUIGrid.getCheckedRowItems(that.grid[index]);
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					}
					
					var callBackParam = [{}];
					if(actionFirstToken[3] == 'form') {
						callBackParam = that.createParam4Form('#form');
					} else if(actionFirstToken[3] == 'grid') {
						callBackParam = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[3] == 'checkedGrid') {
						var callBackParam1 = AUIGrid.getCheckedRowItems(that.grid[index]);
						for(var j = 0; j < callBackParam1.length; j++) {
							callBackParam[j] = callBackParam1[j]['item'];
						}
					}
					
					that.messageBox({type:'info', width:'400', height: '145', html:that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', 
						after:function(){
							that.splashShow();	
							mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallback, callBackParam, flag);
						}
					}});
				}
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수  관련
		processTranCallback(result, data, call_back_param, flag) {
			var that = this.momWidget;
		
			if(result != 'SUCCESS') {
				that.splashHide();
				if(data.p_err_msg != undefined && data.p_err_msg != '') {
					that.messageBox({type:'warning', width:'400', height: '145', html: data.p_err_msg});
		        } else {
		        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
		        }
				
				return;
			}
			
			var actions = that.processTran[flag[0]['index']][0]['dropDown'];
			var actionList = actions.split(',');
			
			if(actionList.length == flag[0]['sequence']) {
				that.splashHide();
				that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
				
				return;
			}
			
			var actionNextToken = actionList[flag[0]['sequence']].split('#');
			
			flag[0]['sequence'] = flag[0]['sequence'] + 1;
			
			if(actionNextToken.length == 1) {
				that.findBtnClicked(flag[0]['index'], true, undefined, that.processTranCallback, flag);
			} else if(actionNextToken.length == 2) {
				var param = {};
				if(actionNextToken[1] == 'form') {
					param = that.createParam4Form('#form');
				} else if(actionNextToken[1] == 'grid') {
					param = AUIGrid.getGridData(that.grid[flag[0]['index']])[0];
				} else if(actionNextToken[1] == 'checkedGrid') {
					param = AUIGrid.getCheckedRowItems(that.grid[flag[0]['index']])[0]['item'];
				} else if(actionNextToken[1] == 'data') {
					param = data[0];
				} else if(actionNextToken[1] == 'callback') {
					param = call_back_param[0];
				}
				
				that.findBtnClicked(flag[0]['index'], false, param, that.processTranCallback, flag);
			} else if(actionNextToken.length == 4) {
				var param = [{}];
				if(actionNextToken[0] == 'D') {
					param = {};
				}
				
				if(actionNextToken[2] == 'form') {
					param = that.createParam4Form('#form');
				} else if(actionNextToken[2] == 'grid') {
					param = AUIGrid.getGridData(that.grid[flag[0]['index']]);
				} else if(actionNextToken[2] == 'checkedGrid') {
					var param1 = AUIGrid.getCheckedRowItems(that.grid[flag[0]['index']]);
					for(var j = 0; j < param1.length; j++) {
						param[j] = param1[j]['item'];
					}
				} else if(actionNextToken[2] == 'data') {
					param = data;
				} else if(actionNextToken[2] == 'callback') {
					param = call_back_param;
				}
				
				var callBackParam = [{}];
				if(actionNextToken[3] == 'form') {
					callBackParam = that.createParam4Form('#form');
				} else if(actionNextToken[3] == 'grid') {
					callBackParam = AUIGrid.getGridData(that.grid[flag[0]['index']]);
				} else if(actionNextToken[3] == 'checkedGrid') {
					callBackParam = AUIGrid.getCheckedRowItems(that.grid[flag[0]['index']]);
				} else if(actionNextToken[3] == 'data') {
					param = data;
				} else if(actionNextToken[3] == 'callback') {
					param = call_back_param;
				}
				
				mom_ajax(actionNextToken[0], actionNextToken[1], JSON.stringify(param), that.processTranCallback, callBackParam, flag);
			}
		},
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수, 메시지 박스
	messageBox: function(options) {
        if ($('.momMessageBoxSet').next().attr('class') == 'mm-backdrop fade in mm-stack') {
            $('.mm-backdrop.fade.in.mm-stack').remove();
        }
        
        $('.momMessageBoxSet').remove();
        if (options) {
            if (typeof options == 'string') {
                options = JSON.parse(options);
            }
            if (options.id == null) {
                options.id = '';
            }
            
            var popWidth = (typeof options.width == undefined ? 400 : options.width) + 'px';
            var popHeight = (typeof options.height == undefined ? 200 : options.height) + 'px';
            var popLeft = ($(window).width() / 2) - (popWidth.replace('px', '') / 2) + 'px';
            var popTop = ($(window).height() / 2) - (popHeight.replace('px', '') / 2) + 'px';
            var popType = (typeof options.type == undefined ? 'panel-' + 'primary' : 'panel-' + options.type);

            // from. 김대성
            var fadeStr = '';
            if (null == options.isFade || options.isFade) {
                fadeStr = ' fade';//앞에 공백 한칸 꼭 주세요
            }

            $('body').append($('<div/>', {
                'class': 'momMessageBoxSet modal fade' + fadeStr,
                'id': options.id,
                'data-draggable': true
                //style: 'position:fixed; width:' + popWidth + '; height:' + popHeight + '; left:' + popLeft + '; top:' + popTop
            }));

            $('.momMessageBoxSet').append($('<div/>', {
                'class': 'momMessageBox panel ' + popType,
                style: 'width:' + popWidth + '; height:' + popHeight + ';'
                //style: 'position:fixed; width:'+ popWidth + '; height:' + popHeight + '; left:' + popLeft + '; top:'+ popTop
            }));

            // heading
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-heading w-clearfix'
            }));

            $('.momMessageBox .panel-heading')
            .append($('<div/>', {
                'class': 'pop-h1',
                style: ' display: inline-block; margin-top: 5px; font-size: 15px;',
                html: options.title == null ? 'Message' : options.title
            }))
            .append($('<a/>', {
                href: '#',
                //'class': 'close-btn',
                'class': 'w-inline-block close-btn',
                style: 'width: 23px; height: 23px; margin-top: 3px; margin-right: 5px; float: right; border: 2px solid white; border-radius: 50%; color: white; font-size: 10px; line-height: 20px; text-align: center; top:0px; right:0px; padding:0px; background-color: transparent;'
            }));

            $('.momMessageBox .panel-heading .close-btn').append($('<div/>', {
                class: 'w-icon fa fa-times close-icon',
                style: 'margin-top: 0px; margin-right: 0px; display: inline-block;'
            }));

            // toolbar
            if (options.subTitle != null) {
                // toolbar
                $('.momMessageBox').append($('<div/>', {
                    'class': 'panel-toolbar'
                }));

                $('.momMessageBox .panel-toolbar').append($('<div/>', {
                    class: 'pop-tool',
                    style: 'display: block; height: 32px; padding-left: 10px; color: #7d7d7d; line-height: 32px;'
                }));

                $('.momMessageBox .panel-toolbar .pop-tool')
                .append($('<div/>', {
                    class: 'w-icon fa fa-exclamation-triangle'
                }))
                .append($('<div/>', {
                    class: 'pop-txt',
                    style: 'display: inline-block;',
                    html: options.subTitle
                }));
            }

            // body
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-body'
            }));

            $('.momMessageBox .panel-body').append($('<div/>', {
                'class': 'pop-body',
                style: 'padding: 10px; height: calc(100% - 68px)'
            }));

            $('.momMessageBox .panel-body .pop-body').append($('<div/>', {
                'class': 'w-form',
                style: 'overflow-y: auto; height: 100%;',
                html: options.html
            }));

            // footer
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-footer',
                //footer modal 밑에 고정
                style: 'position: absolute;bottom: 0;width: 100%;'
            }));

            $('.momMessageBox .panel-footer').append($('<div/>', {
                'class': 'pop-footer',
                style: 'height: 35px; line-height: 35px; text-align: center;'
            }));

            // Ok Button
            if (typeof options.okButton != 'undefined') {
                $('.momMessageBox .panel-footer .pop-footer').append($('<a/>', {
                    'class': 'w-inline-block pop-btn btn-ok ' + 'btn-' + options.type,
                    href: '#',
                    style: ' width: 100px; height: 25px; margin-top: 5px; margin-right: 5px; margin-left: 5px; line-height: 27px;;'
                }));

                $('.momMessageBox .panel-footer .btn-ok').append($('<div/>', {
                    class: 'w-icon fa fa-pencil icon',
                    style: 'margin-top: 0px; margin-right: 5px; font-size: 12px;'
                })).append($('<div/>', {
                    class: 'pop-txt',
                    html: typeof options.okButton.text == 'undefined' ? 'OK' : options.okButton.text,
                    style: 'display: inline-block;'
                }));

                if (typeof options.okButton.after != 'undefined') {
                    $('.momMessageBoxSet .momMessageBox .panel-footer .pop-footer .btn-ok').click(function (e) {
                        options.okButton.after(e);                       
                        $('.momMessageBoxSet').momModal('hide');
                    });
                }
            }

            // cancel button
            if (options.closeButton == null) {
                options.closeButton = {};
            }
            $('.momMessageBoxSet .momMessageBox .panel-footer .pop-footer').append($('<a/>', {
                'class': 'w-inline-block pop-btn btn-grey btn-cancel',
                href: '#',
                style: ' width: 100px; height: 25px; margin-top: 5px; margin-right: 5px; margin-left: 5px; line-height: 27px;'
            }));

            $('.momMessageBox .panel-footer .btn-cancel').append($('<div/>', {
                class: 'w-icon fa fa-close',
                style: 'margin-top: 0px; margin-right: 5px; font-size: 12px;'
            })).append($('<div/>', {
                class: 'pop-txt',
                html: typeof options.closeButton.text == 'undefined' ? 'Close' : options.closeButton.text,
                //html: 'Close',
                style: 'display: inline-block;'
            }));

            $('.momMessageBox .panel-heading .close-btn').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            });
            $('.momMessageBox .panel-footer .btn-cancel').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            });
            if (typeof options.closeButton.after != 'undefined') {
                $('.momMessageBox .panel-heading .close-btn, .momMessageBox .panel-footer .btn-cancel').click(function (e) {
                    options.closeButton.after(e);
                });
            }
        }
        //openMes.user.resetFlag = true;

        $('.momMessageBoxSet').momModal('show');
        $('.momMessageBoxSet').css('z-index', 99999999);
    },
    
    // Global 함수, 폼데이터 생성
    createParam4Form: function(form) {
    	var $form = $(form);
		var $objs = $form.find('input[id], div.jqx-combobox');
		var result = {};
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			result[$obj.attr('id')] = $obj.find('input').val() != '' ? $obj.val() : '';
		}
		
		/*console.log('param = ' + JSON.stringify(result));*/
		
		return result;
    },
/*}

var momSplash = {*/
	splash: undefined,
    splashName: 'spinner_',
    splashIds: [],
    splashInitFlag: true,
    splashInit: function() {
    	if(this.splashInitFlag) {
            var that = this;
            $(window).resize(function() {
                for(var i in that.splashIds) {
                    that.splashResize('#' + that.splashIds[i]);
                }
            });

            this.splashInitFlag = false;
        }
    },
    splashSet: function(options) {
    	options = options || {};
        this.splashInit();
        
        var el = $('body');
        el = $(el);
        el.uniqueId();
        
        //var id = $('body').attr('id');
        this.splashIds.push(el.attr('id'));
        var fontSize = options.fontSize || '50px';
        var background = options.background || 'rgba(0, 0, 0, 0.2)'
        var html = 	'<div id="#{id}" style="display:none; position: fixed; top:#{top}; text-align: center;font-size: #{fontSize};z-index: 99999999999;background: #{background}; color:white;">' +
                		'<div class="w-icon fa fa-spinner fa-spin" style="position: fixed;"></div>' +
                	'</div>';
        el.find('#' + this.splashName + el.attr('id')).remove();
        el.prepend(html.replace(/#{id}/gi, this.splashName + el.attr('id')).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + 'px'));
        for(var i in this.splashIds) {
        	this.splashResize('#' + this.splashIds[i]);
        }
        
        return '#' + this.splashName + el.attr('id');
    },
    splashResize: function(el) {
        var height = $(el).height();
        var width = $(el).width();
        var spinner = $('#' + this.splashName + $(el).attr('id'));
        spinner.width(width);
        spinner.height(height);
        spinner.find('.fa').css('line-height', height + 'px');
    },
    splashShow: function() {
        if (this.splash == undefined) {
            if (this.splashIds[0] == undefined) {
                var ret = this.splashSet();
            }
        }
       
        $('#' + this.splashName + this.splashIds[0]).show();
    },
    splashHide: function() {
    	$('#' + this.splashName + this.splashIds[0]).hide();
    },
    contextPath: function() {
		return '/TU_Platform';
	},
};

(function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================
    var momModal = function (element, options) {
    	this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.panel');
        //this.$dialog = this.$element.find('.mm-dialog')
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
            this.$element
              .find('.mm-content')
              .load(this.options.remote, $.proxy(function () {
                  this.$element.trigger('loaded.bs.momModal')
              }, this));
        }
    };

    momModal.VERSION = '3.3.6';

    momModal.TRANSITION_DURATION = 300;
    momModal.BACKDROP_TRANSITION_DURATION = 150;

    momModal.DEFAULTS = {
        backdrop: 'static',
        keyboard: true,
        show: true,
        draggable: true,
        width: false,
        resizable: false,
        paramObject: {}
    };

    momModal.prototype.getParamObject = function () {
        return momModal.DEFAULTS.paramObject;
    };

    momModal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    };

    momModal.prototype.show = function (_relatedTarget) {
    	var that = this;
        var e = $.Event('show.bs.momModal', { relatedTarget: _relatedTarget });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('mm-open');

        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.momModal', '[data-dismiss="momModal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.momModal', function () {
            that.$element.one('mouseup.dismiss.bs.momModal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            })
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
              .show()
              .scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.bs.momModal', { relatedTarget: _relatedTarget });

            transition ?
              that.$dialog // wait for modal to slide in
                .one('bsTransitionEnd', function () {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(momModal.TRANSITION_DURATION) :
              that.$element.trigger('focus').trigger(e);
        });
        if (that.options.draggable) {
            that.$element.children().first().draggable({
                handle: '.panel-heading'
            });
        }

        if (that.options.width) {
            that.$dialog.css({
                width: that.options.width,
                height: 'auto',
                'max-height': '100%'
            });
        }

        var zIndex = 1040 + (10 * $('.modal:visible').length);
        that.$element.css({
            'z-index': zIndex,
            position: 'fixed'
        });
        $('.mm-backdrop').not('.mm-stack').css('z-index', zIndex - 1).addClass('mm-stack');

        that.$element.css('display', 'block');
        that.$dialog.css('margin-top', Math.max(0, ($(window).height() - that.$dialog.height()) / 2));
        if (that.$element.parents('[splitter=col]').length > 0) {
            var colHeight = that.$element.parents('[splitter=col]').height();
            that.$element.parents('[splitter=col]').height('initial');
            setTimeout(function () {
                that.$element.parents('[splitter=col]').height('');
                that.$element.parents('[splitter=col]').height(colHeight);
            });
        }

        if (that.options.resizable) {
            that.$dialog.css({
                overflow: 'hidden'
            });
            var resizable = {};
            if (typeof that.options.resizable == 'boolean') {
                resizable = {
                    //minHeight: that.$dialog.css('max-height'),
                    //maxHeight: that.$dialog.css('max-height'),
                    minHeight: that.$dialog.height(),
                    maxHeight: that.$dialog.height(),
                    minWidth: that.$dialog.width()
                }
            } else {
                resizable = that.options.resizable;
            }
            that.$dialog.resizable(resizable);
        }
    };

    momModal.prototype.hide = function (e) {
        if (e) e.preventDefault();

        e = $.Event('hide.bs.momModal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented())
            return;

        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.momModal');

        this.$element
          .removeClass('in')
          .off('click.dismiss.bs.momModal')
          .off('mouseup.dismiss.bs.momModal');

        this.$dialog.off('mousedown.dismiss.bs.momModal');

        $.support.transition && this.$element.hasClass('fade') ?
          this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(momModal.TRANSITION_DURATION) :
          this.hideModal();
    };

    momModal.prototype.enforceFocus = function () {
        $(document)
          .off('focusin.bs.momModal') // guard against infinite focus loop
          .on('focusin.bs.momModal', $.proxy(function (e) {
              if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                  this.$element.trigger('focus');
              }
          }, this));
    };

    momModal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.momModal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.momModal');
        }
    };

    momModal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.momModal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.bs.momModal');
        }
    };

    momModal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
            that.$body.removeClass('mm-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hidden.bs.momModal');
        })
    };

    momModal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    momModal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$backdrop = $(document.createElement('div'))
              .addClass('mm-backdrop ' + animate)
              .appendTo(this.$body);

            this.$element.on('click.dismiss.bs.momModal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static'
                  ? this.$element[0].focus()
                  : this.hide();
            }, this));

            if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

            this.$backdrop.addClass('in');

            if (!callback) return;

            doAnimate ?
              this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) :
              callback();

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass('fade') ?
              this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) :
              callbackRemove();

        } else if (callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals

    momModal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    momModal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    };

    momModal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    };

    momModal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    momModal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    };

    momModal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    momModal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'mm-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    momModal.prototype.confirm = function (option) {
        /*
        option : Confirm Modal 설정 옵션 
            {
                title       : 타이틀
                msg         : 메세지
                yesTxt      : yes 버튼 Text
                noTxt   : no 버튼 text
                yesCallBack : yes 버튼 콜백 함수
                noCallBack  : no버튼 콜백 함수
            }
        */
        var defaults = {
            title: 'Confirmation',
            msg: 'Are you sure?',
            yesTxt: 'Yes',
            noTxt: 'No',
            width: '600px',
            backdrop: 'static',
            yesCallBack: false,
            noCallBack: false
        };
        var options = $.extend({}, defaults, typeof option == 'object' && option);

        //confirm modal 수정
        var modalTop = $('<div/>', {
            class: 'modal fade'
        });
        $('body').append(modalTop);
        //var dialog = $('<div/>', {
        //    class: 'panel panel-primary'
        //});
        var dialog = $('<div/>', {
            class: 'panel'
        });
        modalTop.append(dialog);
        //modal header
        var header = $('<div/>', {
            class: 'panel-heading'
        });
        dialog.append(header);
        var headerIcon = $('<a/>', {
            href: '#',
            class: 'w-inline-block close-btn',
            'data-dismiss': 'momModal'
        });
        header.append(headerIcon);
        var headercloseIcon = $('<div/>', {
            class: 'w-icon fa fa-times close-icon'
        });
        headerIcon.append(headercloseIcon);
        var headerTitle = $('<div/>', {
            class: 'pop-h1',
            text: options.title
        });
        header.append(headerTitle);

        //modal body
        var body = $('<div/>', {
            class: 'panel-body'
        });
        dialog.append(body);
        var bodyPop = $('<div/>', {
            class: 'pop-body'
        });
        body.append(bodyPop);
        var bodyMsg = $('<div/>', {
            class: 'pop-txt',
            text: options.msg
        });
        bodyPop.append(bodyMsg);

        //modal footer
        var footer = $('<div/>', {
            class: 'panel-footer'
        });
        dialog.append(footer);
        var popFooter = $('<div/>', {
            class: 'pop-footer'
        });
        footer.append(popFooter);
        var yesBtn = $('<a/>', {
            class: 'w-inline-block pop-btn'
        });
        popFooter.append(yesBtn);
        var yesBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-check icon'
        });
        yesBtn.append(yesBtnIcon);
        var yesBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.yesTxt
        });
        yesBtn.append(yesBtnTxt);
        var noBtn = $('<a/>', {
            class: 'w-inline-block pop-btn grey-btn'
        });
        popFooter.append(noBtn);
        var noBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-close icon'
        });
        noBtn.append(noBtnIcon);
        var noBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.noTxt
        });
        noBtn.append(noBtnTxt);
        //yes click event
        yesBtn.on('click', function () {
            if (options.yesCallBack && $.isFunction(options.yesCallBack)) {
                options.yesCallBack.call(this, true);
            }
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 500);
        });

        //no click event
        noBtn.on('click', function () {
            if (options.noCallBack && $.isFunction(options.noCallBack)) {
                options.noCallBack.call(this, false);
            }
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 500);

        });

        $(modalTop).momModal({
            backdrop: options.backdrop,
            keyboard: false,
            width: options.width
        });
    };

    // MODAL PLUGIN DEFINITION
    // =======================
    function Plugin(option, _relatedTarget) {
        // MODAL에 parameter를 등록 해서 사용 한다.
        if (typeof option == 'string' && option == 'getParams')
            return $(this).data('params');

        return this.each(function () {
            var $this = $(this);
            if (typeof option.params !== 'undefined') {
                $this.data('params', option.params);
            }
            var data = $this.data('bs.momModal');
            var options = $.extend({}, momModal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            $this.attr('tabindex', -1);

            if (!data) $this.data('bs.momModal', (data = new momModal(this, options)));
            if (typeof option == 'string') {
                data[option](_relatedTarget);
            }
            else if (options.show) data.show(_relatedTarget);
        });
    };

    var old = $.fn.momModal;

    $.fn.momModal = Plugin;
    $.fn.momModal.Constructor = momModal;


    // MODAL NO CONFLICT
    // =================
    $.fn.momModal.noConflict = function () {
        $.fn.momModal = old;
        return this;
    };


    // MODAL DATA-API
    // ==============
    $(document).on('click.bs.momModal.data-api', '[data-toggle="momModal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option = $target.data('bs.momModal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        $target.one('show.bs.momModal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.momModal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        Plugin.call($target, option, this);
    });

})(jQuery);




