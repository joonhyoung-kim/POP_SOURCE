var momWidget = {
	your:				[undefined, undefined, undefined, undefined, undefined, undefined],
	grid: 				[undefined, undefined, undefined, undefined, undefined, undefined],
	columnProperty: 	[undefined, undefined, undefined, undefined, undefined, undefined],
	gridProperty: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	searchFilter: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	processTran: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	indexColumn: 		[[], [], [], [], [], []],
	sortParam: 			[[], [], [], [], [], []],
	
	popUpSetting: 		[undefined, undefined, undefined, undefined, undefined, undefined], 
	
	excelGrid: 			[undefined, undefined, undefined, undefined, undefined, undefined],	
	specExcelGrid: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	excelTemplateGrid: 	[undefined, undefined, undefined, undefined, undefined, undefined],
	
	currentPage: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	pageNumber: 		[undefined, undefined, undefined, undefined, undefined, undefined],
	totalPage: 			[undefined, undefined, undefined, undefined, undefined, undefined],
	startPage: 			[undefined, undefined, undefined, undefined, undefined, undefined],
	endPage: 			[undefined, undefined, undefined, undefined, undefined, undefined],
	
	entireDatas:		[undefined, undefined, undefined, undefined, undefined, undefined],
	partialDatas:		[{}, {}, {}, {}, {}, {}],
	entireIsDone:		[undefined, undefined, undefined, undefined, undefined, undefined],
	entireProcess:		[0, 0, 0, 0, 0, 0],
	// 2020.04.12 hyjeong begin
	singleRowIndex:		[undefined, undefined, undefined, undefined, undefined, undefined],
	// 2020.04.12 hyjeong end
	
	is_drop_done:		[[], [], [], [], [], []],
	dropDownMap:		undefined,
	INFINITE: 			100000000,	
	
	uploadFlag: 		0,
	downSequence:		100,
	
	isInitSearch:		false,
	
	init: function(index, pageId, your, customFlag) {
		index--;
		
		this.your[index] = your;
		
		var isExist = document.getElementById('grid' + (index + 1));
		if(isExist == undefined) {
			this.messageBox({type: 'warning', width: '400', height: '145', html:'grid' + (index + 1) + '가 존재하지 않습니다.'});
			return;
		}
		
		this.dropDownMap = new Map();
		
		var that = this;
		
		if(index == 0) {
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
				}, 400);
			});
			
			that.splashShow('load');
		}
		
		var queryId = '/mom/request/com.thirautech.mom.widget.widgetprop.dummy';
		$.get(this.contextPath() + queryId, {'pageId' : pageId + (index + 1)}, function(data) {
			if(data == undefined) {
				console.log('error');
				return;
			}
			
			that.gridProperty[index] = JSON.parse(data[0].gridProperty);
			// 2020.04.12 hyjeong begin
			if(that.gridProperty[index]['checkId'] == 'radioButton') {
				that.gridProperty[index]['selectionMode'] = 'singgleRow';
				that.gridProperty[index]['rowCheckToRadio'] = true;
			}
			// 2020.04.12 hyjeong end
			
			data[0]['columnProperty'] = 
				data[0]['columnProperty'].indexOf('#44#') > 0 
				?(
					data[0]['columnProperty'].indexOf('#22#') > 0 
					?(
						  data[0]['columnProperty'].indexOf('columnStyle') > 0 
						? data[0]['columnProperty'].replace(/#44#/gi, ',').replace(/#22#/gi, "'").replace(/columnStyle/gi,'columnStyle' + index) 
						: data[0]['columnProperty'].replace(/#44#/gi, ',').replace(/#22#/gi, "'")
					)
					:(
						  data[0]['columnProperty'].indexOf('columnStyle') > 0 
						? data[0]['columnProperty'].replace(/#44#/gi, ',').replace(/columnStyle/gi,'columnStyle' + index) 
						: data[0]['columnProperty'].replace(/#44#/gi, ',')
					)
				)
				:(
					data[0]['columnProperty'].indexOf('#22#') > 0 
					?(
						  data[0]['columnProperty'].indexOf('columnStyle') > 0 
						? data[0]['columnProperty'].replace(/#22#/gi, "'").replace(/columnStyle/gi,'columnStyle' + index) 
						: data[0]['columnProperty'].replace(/#22#/gi, "'")
					)
					:(
						  data[0]['columnProperty'].indexOf('columnStyle') > 0 
						? data[0]['columnProperty'].replace(/columnStyle/gi,'columnStyle' + index) 
						: data[0]['columnProperty']
					)
				);
							
			that.columnProperty[index] = JSON.parse(data[0].columnProperty);	
			
			if(data[0].searchFilter == undefined || data[0].searchFilter.length < 2) {
				that.searchFilter[index] = undefined;
			} else {
				data[0]['searchFilter'] = 
					data[0]['searchFilter'].indexOf('#44#') > 0 
					?(
						  data[0]['searchFilter'].indexOf('#22#') > 0 
						? data[0]['searchFilter'].replace(/#44#/gi, ',').replace(/#22#/gi, "'") 
						: data[0]['searchFilter'].replace(/#44#/gi, ',')
					)
					:(
						  data[0]['searchFilter'].indexOf('#22#') > 0 
						? data[0]['searchFilter'].replace(/#22#/gi, "'") 
						: data[0]['searchFilter']
					);
				that.searchFilter[index] = JSON.parse(data[0].searchFilter);
			}
			
			if(data[0].processTran == undefined || data[0].processTran.length < 2) {
				that.processTran[index] = undefined;
			} else {
				data[0]['processTran'] = 
					  data[0]['processTran'].indexOf('#44#') > 0 
					? data[0]['processTran'].replace(/#44#/gi, ',') 
					: data[0]['processTran'];
				that.processTran[index] = JSON.parse(data[0].processTran);
			}
			
			if(data[0]['indexColumn'] != undefined && data[0]['indexColumn'].length > 1) {
				that.indexColumn[index] = JSON.parse(data[0].indexColumn);
			}
						
			if(index == 0 && that.processTran[index] != undefined) {
				for(var i = 0; i < that.processTran[index].length; i++) {
					if(that.processTran[index][i]['dataField'] == 'INIT') {
						this.isInitSearch = true;
					}
				}
			}
			
			if(that.gridProperty[index]['editId']) {											// Edit 버튼이 설정된 경우
				var editColumn = {headerText: 'Edit', dataField: 'Edit', width:40, visible: true, sortable : false
					, renderer: { 
						type: 'TemplateRenderer'
					}, labelFunction: function(rowIndex, columnIndex, value, headerText, item) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
						return '<div class="GridEditBtn' + (index + 1) + ' w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
					}
				}

				that.columnProperty[index].unshift(editColumn);
			}
			
			if(that.indexColumn[index] != undefined) {
				for(var i = 0; i < that.indexColumn[index].length; i++) {
					if(that.indexColumn[index][i]['filter']) {
						var INDEX = that.indexColumn[index][i]['INDEX'];
						that.columnProperty[index][INDEX]['filter'] = {showIcon:true};
					}
				}
			}
			
			// 2020.04.12 hyjeong begin
			// Begin Cell Button
			for(var loop = 0; loop < that.indexColumn[index].length; loop++) {
				const i = loop;
				
				if(that.indexColumn[index][i]['color'] != undefined && that.indexColumn[index][i]['color'] == 'BUTTON') {
					const INDEX = that.indexColumn[index][i]['INDEX'];
					const data_field = that.columnProperty[index][INDEX]['dataField'];
					const labelText = that.columnProperty[index][INDEX]['formatString']; 
					const headerText = that.columnProperty[index][INDEX]['headerText'];
					const width = that.columnProperty[index][INDEX]['width'];
					var colSet = {
						  dataField	: data_field
						, headerText: headerText
						, width		: width
						, renderer	: {
							  type: 'ButtonRenderer'
							, labelText: labelText
							, onclick: function(rowIndex, columnIndex, value, item) {
								if(your != undefined && your.gridCellBtnAction != undefined) {
									your.gridCellBtnAction(index, rowIndex, columnIndex, value, item);
								}
							}
						}
					};
					
					that.columnProperty[index][INDEX] = colSet;
				}
			}
			// 2020.04.12 hyjeong end

			if(that.grid[index] != undefined) {
				AUIGrid.destroy(that.grid[index]);
			}
			
			//////////////////////////////////////////////////////////////////////////////////////////
			/*var param = {
				  divisionCd : sessionStorage.getItem('divisionCd')
				, companyCd  : sessionStorage.getItem('companyCd' )
				, locale     : sessionStorage.getItem('locale')
				, pageId     : 'GRID'
				, useYn      : 'Y'
				, description: pageId + (index + 1)
			}
			
			mom_ajax('R', 'widget.widgetheaders', param, function(result, data1) {
				if(result != 'SUCCESS' || data1.length < 1) {
					return;
				}
				
				var headers = {};
				for(var i = 0; i < data1.length; i++) {
					headers[data1[i]['codeType']] = data1[i]['keyword'];
				}
				
				for(var i = 0; i < that.columnProperty[index].length; i++) {
					if(headers[that.columnProperty[index][i]['dataField']] != undefined) {
						that.columnProperty[index][i]['headerText'] = headers[that.columnProperty[index][i]['dataField']];
					}
				}
			}, undefined, undefined, undefined, 'sync');*/
			var locale = sessionStorage.getItem('locale');
			if(locale != 'KR') {
				for(var i = 0; i < that.columnProperty[index].length; i++) {
					if(that.columnProperty[index][i][locale + 'HeaderText'] == undefined || that.columnProperty[index][i][locale + 'HeaderText'] == '') {
						continue;
					}
					
					that.columnProperty[index][i]['headerText'] = that.columnProperty[index][i][locale + 'HeaderText'];
				}
			}
			//////////////////////////////////////////////////////////////////////////////////////////
			
			that.grid[index] = AUIGrid.create('#grid' + (index + 1), that.columnProperty[index], that.gridProperty[index]);
			
			if(that.gridProperty[index]['columnFixed'] > 0) {				// 고정 컬럼 설정
				if(that.gridProperty[index]['editId']) {
					AUIGrid.setFixedColumnCount(that.grid[index],parseInt(that.gridProperty[index]['columnFixed']) + 1);
				} else {
					AUIGrid.setFixedColumnCount(that.grid[index],parseInt(that.gridProperty[index]['columnFixed']));
				}
			}
		
			that.procColumnProperty(index, your);				// AUIGrid 기본 컬럼 속성 설정
			that.procRetrieve(index, your);
			that.procCreateBtn(index, your);					// 등록버튼 설정
			that.procProcessTran(index, your);					// 자리 이동
			
			if(index == 0 && !that.isInitSearch) {
				that.splashHide('load');
			}
			
			setTimeout(that.backProc, 0, index, your, pageId);
		});
	},
	
	backProc: function(index, your, pageId) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		that.procAddDelSaveBtn(index, your);				// 셀클릭, 단일선택, 다중선택 설정
		that.procEditBtn(index, your);						// Edit 버튼 이벤트, 수정 팝업 생성 및 데이터 복사
		that.procCopyBtn(index, your);						// 복사 버튼 이벤트, 내리기 버튼
		that.procExcelDown(index, pageId, your);			// Excel Download 버튼 이벤트
		that.procExcelDownAll(index, pageId, your);			// Excel Download All 버튼 이벤트
		that.procExcelTemplateDown(index, pageId, your);	// Excel Template Download 버튼 이벤트
		
		that.procExcelUpload(index, pageId, your);			// Excel Upload 버튼 이벤트
		that.procCellClick(index, your);					// 셀클릭, 단일선택, 다중선택 설정
		that.clickCancelBtn2(index, your);					// 추가셀 취소 이벤트
		
		if(index == 0) {
			that.procCalendar(index);
			//that.procGridWidget(index, pageId);
		} else if(index == 2 || index == 4) {
			that.procPopUpCancelBtn(index, your);
		}
		
		that.procEnterKeyEvent(index, your);
		
		//mCommon.test(that);
		/*console.log('Enter');
		$(document).on('click', '.navicon-left', function() {
			console.log('Click');
			var toggle = $(this).attr('toggle') || 'false';
			if(toggle == 'true'){
				console.log('show');
				$('.contentarea').width('');
				$('.w-nav').show();
				toggle = 'false';
				$('.navicon-left .fa-play').addClass('fa-rotate-180');
				
				$(window).resize();
				setTimeout(function() {
					$(window).resize();
				}, 400);
			} else {
				console.log('hide');
				$('.contentarea').width('calc(100% - 30px)');
				$('.w-nav').hide();
				toggle = 'true';
				$('.navicon-left .fa-play').removeClass('fa-rotate-180');
				
				$(window).resize();
				setTimeout(function() {
					$(window).resize();
				}, 400);
			}
			
			$(this).attr('toggle', toggle);
		});*/
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 속성 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 기본 컬럼 속성 설정
	procColumnProperty: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		var loop = 0, drop_down_count = 0, complete_drop_down = 0;
		
		if(that.indexColumn[index] != undefined && that.indexColumn[index] != '' && that.indexColumn[index] != null) {
			for(; loop < that.indexColumn[index].length; loop++) {
				if(that.indexColumn[index][loop]['popUp'] == 'DROPDOWN') {
					drop_down_count++;
				}
				
				that.is_drop_done[index][loop] = false;
			}
			
			if(that.searchFilter[index] != undefined) {
				for(; loop < that.indexColumn[index].length + that.searchFilter[index].length; loop++) {
					if(that.searchFilter[index][loop - that.indexColumn[index].length]['dropDown'] == undefined || that.searchFilter[index][loop - that.indexColumn[index].length]['dropDown'].length < 2) {
						that.is_drop_done[index][loop] = true;
					} else {
						that.is_drop_done[index][loop] = false;
					}
				}
			}
			
			var offset = that.gridProperty[index]['editId'] ? 1 : 0;
			var touchCount = drop_down_count == 0 ? 1 : 0;
			that.sortParam[index] = []; 
			for(var loop = 0; loop < that.indexColumn[index].length; loop++) {
				const i = loop;
				const INDEX = that.indexColumn[index][i]['INDEX'];
				const data_field = that.columnProperty[index][INDEX]['dataField'];
				
				if(that.indexColumn[index][i]['popUp'] == 'DROPDOWN') {
					const drop_down = that.columnProperty[index][INDEX]['dropDown'];
					if(drop_down != undefined && drop_down != '' && drop_down.indexOf('#') > 0) {
						continue;
					}
					
					if(!that.is_drop_done[index][i]) {
						that.is_drop_done[index][i] = true;
						var data = that.dropDownMap.get(drop_down);
						if(data != undefined) {
							var columnStyle = 'columnStyle';
							if(that.indexColumn[index][i]['color']) {
								columnStyle += (index + '' + INDEX);
								that.design(index, INDEX, that.indexColumn[index][i]['color'], that.indexColumn[index][i]['style']);
							} else {
								columnStyle = undefined;
							}
							
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
								style: columnStyle,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = '';
									for(var j = 0; j < data.length; j++) {
										if(data[j]['code'] == value) {
											retStr = data[j]['name'];
											break;							
										}
									}
									
									return retStr;
								}, editRenderer: {
									type: 'DropDownListRenderer',
									list: data,
									showEditorBtnOver: true,
									keyField: 'code', 
									valueField: 'name'
								}
							});
						} else {
							mom_ajax('R', drop_down, {}, function(result, data) {
								if(result != 'SUCCESS') {
									console.log('error');						
									return;
								}
								
								that.dropDownMap.set(drop_down, data);
								
								var columnStyle = 'columnStyle';
								if(that.indexColumn[index][i]['color']) {
									columnStyle += (index + '' + INDEX);
									that.design(index, INDEX, that.indexColumn[index][i]['color'], that.indexColumn[index][i]['style']);
								} else {
									columnStyle = undefined;
								}
								
								AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
									style: columnStyle,
									labelFunction: function(rowIndex, columnIndex, value, item) { 
										var retStr = '';
										for(var j = 0; j < data.length; j++) {
											if(data[j]['code'] == value) {
												retStr = data[j]['name'];
												break;							
											}
										}
										
										return retStr;
									}, editRenderer: {
										type: 'DropDownListRenderer',
										list: data,
										showEditorBtnOver: true,
										keyField: 'code', 
										valueField: 'name'
									}
							 	});
							});
						}
					}
				}
				
				// Begin Color
				// 2020.04.12 hyjeong begin
				if(that.indexColumn[index][i]['color'] != undefined && that.indexColumn[index][i]['color'] != 'BUTTON') {
					var color = that.indexColumn[index][i]['color'];
					that.design(index, INDEX, that.columnProperty[index][INDEX]['color'], that.columnProperty[index][INDEX]['style']);
					if(color.indexOf('H') >= 0) {
						that.columnProperty[index][INDEX]['headerStyle'] = 'headerStyle' + index + '' + INDEX;
						AUIGrid.changeColumnLayout(that.grid[index], that.columnProperty[index]);
					}
				}
				// 2020.04.12 hyjeong end
				// End Color
				
				// Begin Filter
				/*if(that.indexColumn[index][i]['filter'] != undefined) {
					var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
					columnLayout[INDEX]['filter'] = {showIcon:true};
					AUIGrid.changeColumnLayout(that.grid[index], columnLayout);
				}*/
				// End Filter
				
				////////////////////////////////////////////////////////////////////////////////////////////
				// Begin Sort
				if(that.indexColumn[index][i]['sortIndex'] != undefined) {
					const sortIndex = that.indexColumn[index][i]['sortIndex'] - 1;
					const asc = that.columnProperty[index][INDEX]['sort'];
					that.sortParam[index][sortIndex] = {dataField : data_field, sortType : asc};
				}
				// End Sort
				
				// Begin Message
				if(that.indexColumn[index][i]['message'] != undefined) {
					const message = that.indexColumn[index][i]['message'];
					AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
						//style:'columnStyle',
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							return (value == null || value == '' || value == undefined) ? message : value;
						}, editRenderer: {
							type: 'InputEditRenderer'
						}
				 	});
				}
				// End Message
				////////////////////////////////////////////////////////////////////////////////////////////
			} // for(var loop = 0; loop < that.columnProperty[index].length; loop++)
			
			if(that.sortParam[index].length > 0) {
				AUIGrid.setSorting(that.grid[index], that.sortParam[index]);
			}
		}
		
		if(that.searchFilter[index] != undefined) {
			for(var loop = 0; loop < that.searchFilter[index].length; loop++) {
				const i = loop;
				const data_field = that.searchFilter[index][i]['dataField'];
				
				const drop_down = that.searchFilter[index][i]['dropDown'];
				if(that.searchFilter[index][i]['sortIndex'] == undefined || that.searchFilter[index][i]['sortIndex'] == 1) {
					if(drop_down == undefined || drop_down.indexOf('#') > 0) {
						if(that.searchFilter[index][i]['popUpInit'] != undefined) {
							//if(that.searchFilter[index][i]['popUp'] == 'CALENDAR') {
								if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-MM-01') {
			    					var today = get_date_diff(0);	    					
			    					$('#' + data_field).val(today.substring(0, 8) + '01');
			    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-MM-31') {
			    					var today = get_date_diff(0);	    					
			    					var todaydd = parseInt(today.substring(8, 10));
			    					var nextMonthdd = '';
			    					if(todaydd < 15) {
			    						nextMonthdd = get_date_diff2(today, 40);
			    					} else {
			    						nextMonthdd = get_date_diff2(today, 20);
			    					}
			    					nextMonthdd = nextMonthdd.substring(0, 8) + '01';
			    					$('#' + data_field).val(get_date_diff2(nextMonthdd, -1));
			    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-M--01') {
			    					var today = get_date_diff(0);	    					
			    					var todaydd = parseInt(today.substring(8, 10));
			    					var prevMonthdd = '';
			    					if(todaydd < 15) {
			    						prevMonthdd = get_date_diff2(today, -20);
			    					} else {
			    						prevMonthdd = get_date_diff2(today, -40);
			    					}
			    					$('#' + data_field).val(prevMonthdd.substring(0, 8) + '01');
			    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-M--31') {
			    					var today = get_date_diff(0);	    					
			    					var currentMonth01 = today.substring(0, 8) + '01';
			    					$('#' + data_field).val(get_date_diff2(currentMonth01, -1));
			    				} else if(that.searchFilter[index][i]['popUpInit'] == 'TODAY') {
			    					var today = get_date_diff(0);	    					
			    					$('#' + data_field).val(today);
			    				} else if(that.searchFilter[index][i]['popUpInit'].indexOf('TODAY') >= 0) {
			    					if(that.searchFilter[index][i]['popUpInit'].indexOf('MONTH') >= 0) {
			    						var today = get_date_diff(0);
			    						var todaydd = parseInt(today.substring(8, 10));
			    						var prevStartDay = undefined, nextEndDay = undefined;
			    						if(that.searchFilter[index][i]['popUpInit'].indexOf('-') >= 0) {
			    							var firstDay = today.substring(0, 8) + '01';
			    							var prevLastDay = get_date_diff2(firstDay, -1);
			    							prevStartDay = prevLastDay.substring(0, 8) + (todaydd < 10 ? '0' + todaydd : '' + todaydd); 
			    						} else {
			    	    					var nextMonthdd = '';
			    	    					if(todaydd < 15) {
			    	    						nextMonthdd = get_date_diff2(today, 40);
			    	    					} else {
			    	    						nextMonthdd = get_date_diff2(today, 20);
			    	    					}
			    	    					
			    	    					if(today == 1) {
			    	    						nextEndDay = nextMonthdd.substring(0, 8) + '01';
			    	    						nextEndDay = get_date_diff2(nextEndDay, -1);
			    	    					} else {
			    	    						nextEndDay = nextMonthdd.substring(0, 8) + (todaydd - 1 < 10 ? '0' + (todaydd - 1) : '' + (todaydd - 1));
			    	    					}
			    	    				}
			    						
			    						$('#' + data_field).val(prevStartDay || nextEndDay);
			    					} else {
				    					var date = that.searchFilter[index][i]['popUpInit'];
				    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
				    					
				    					$('#' + data_field).val(get_date_diff(diff));
			    					}
			    				}
							//} 
						}
						
						continue;
					}
					
					var data = that.dropDownMap.get(drop_down);
					if(data != undefined) {
						if(document.getElementById(data_field)) {
							var width = $('#' + data_field).width() + 26;
							var height = $('#' + data_field).height() + 4 < 24 ? 24 : $('#' + data_field).height() + 4;
							if(that.searchFilter[index][i]['width'] != undefined && that.searchFilter[index][i]['width'] != '') {
								height = that.searchFilter[index][i]['width'];
							}
								
							// 2020.04.12 hyjeong begin
							if(that.searchFilter[index][i]['filter']) {
								if(that.searchFilter[index][i]['color'] == undefined || that.searchFilter[index][i]['color'] == '') {
									$('#' + data_field).jqxComboBox({width: width, height: height, dropDownHeight: 250, autoDropDownHeight: false, searchMode: 'containsignorecase', autoComplete: true, checkboxes: true});
									$('#' + data_field).removeClass('w-select');
									
									var items = $('#' + data_field).jqxComboBox('source');
									for(var j = 0; j < data.length; j++) {
										items.push({label: data[j]['name'], value: data[j]['code']});
									}
									
									$('#' + data_field).jqxComboBox('source', items);
									$('#' + data_field).find('input').attr('readonly', false);
									
									var cinput = $('#' + data_field).find('.jqx-combobox-input');
									$(document).on('keyup', cinput, function(e) {
										if(cinput.val() == '') {
											$('#' + data_field).val('');
										}
									});
								} else if(that.searchFilter[index][i]['color'] == 'GRID') {
									html =  	'<div id="' + data_field + (index + 1) + '1" style="padding: 0px 0px 0px 0px;">'
											+ 		'<input maxlength="256" id="' + data_field + (index + 1) + '4" input-type="text" type="text" class="w-input fieldbox" style="border-top:0px; border-bottom:0px"></input>'
											+ 		'<input type="hidden" id="' + data_field + '" />' 
											+ 	'</div>'
											+ 	'<div id="' + data_field + (index + 1) + '2" style="padding-left:5px;">'
											+ 	'</div>';
									$('select#' + data_field).append(html);
									$('select#' + data_field).removeClass('w-select');
									$('select#' + data_field).attr('id', data_field + (index + 1) + '0');
									$('select#' + data_field + (index + 1) + '0').replaceTag('div');									
									
									const MULTI_CELL_WIDTH = 100;
									const AREA_HEIGHT = 270;
									var isNameExist = false;
									
									$('#' + data_field + (index + 1) + '2').append('<br /><div id="' + data_field + (index + 1) + '3" class="w-widget w-widget-auigrid w-dyn-list w-unbound grid"></div>');
									
									var columnProperty1 = [];									
									var columnCount = 0;
									if(data.length > 0) {
										for(key in data[0]) {
											if(key == 'code') {
												var json = {dataField: 'code', visible: false};
												columnProperty1.push(json);
												continue;
											} else if(key == 'name') {
												isNameExist = true;
											} 
											////////////////////////////////////////////////////
											/*else if(key == 'value' || key == 'codeName') {
												continue;
											}*/
											////////////////////////////////////////////////////
												
											var json = {};
											json['dataField'] = key;
											json['width'] = width - 25 - 5 - 2;
											json['style'] = 'left-column';
											json['filter'] = {showIcon:true};
											columnProperty1.push(json);
											columnCount++;
										}
									}
									
									if(columnCount > 1) {
										for(var j = 0; j < columnProperty1.length; j++) {
											columnProperty1[j]['width'] = MULTI_CELL_WIDTH - 5 - (17 / columnCount) - 2;
										}
									}
									
									if(columnCount > 1) {
										width = columnCount * MULTI_CELL_WIDTH - 5 - 1;
									}
									
									$('#' + data_field + (index + 1) + '4').css({width: width - 2});
									
									var height = data.length * 26;
									
									////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
									if(height > AREA_HEIGHT) {
										$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width + 17, height: AREA_HEIGHT + 28 + 16 + 4});
									} else {
										$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width + 17, height: height + 28 + 26 + 16 + 4});
									}
									////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
									AUIGrid.create(
										  '#' + data_field + (index + 1) + '3'
										, columnProperty1
										, {enableFilter: true, showRowNumColumn: false, enableHScrollByWheel: false, showSelectionBorder: true, footerHeight: 0, showRowCheckColumn: true, selectionMode: 'multipleRows'}
									);
									
									AUIGrid.setFixedColumnCount('#' + data_field + (index + 1) + '3', columnCount + 10);
									
									$('#' + data_field + (index + 1) + '1').parents('div').css({padding: '0px 0px 0px 0px'});
									$('#' + data_field + (index + 1) + '2').parents('div').css({'z-index': '999'});
									if(height > AREA_HEIGHT) {
										$('#' + data_field + (index + 1) + '2').css({height: AREA_HEIGHT + 30});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10, height: AREA_HEIGHT + 10, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: AREA_HEIGHT});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: AREA_HEIGHT});
									} else {
										$('#' + data_field + (index + 1) + '2').css({height: height + 26 + 16 + 4 + 10});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10, height: height + 26 + 4, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: height + 26 + 4});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: height + 26 + 4});
									}
									$('#' + data_field + (index + 1) + '0').parent('div').parent('li').parent('ul').parent('form').parent('div').parent('div').css({'padding-top': '5px'});
									
									AUIGrid.setGridData('#' + data_field + (index + 1) + '3', data);
									
									AUIGrid.bind('#' + data_field + (index + 1) + '3', 'rowCheckClick', function(e) {
										var items = $('#' + data_field).val() == '' ? JSON.parse('[]') : JSON.parse($('#' + data_field).val()); 
										var display = $('#' + data_field + (index + 1) + '4').val();
										delete e['item']['_$uid'];
										if(e['checked']) {
											items.push(e['item']);
										} else {
											for(var j = items.length - 1; j >= 0; j--) {
												if(JSON.stringify(items[j]) == JSON.stringify(e['item'])) {
													items.splice(j, 1);
													break;
												}
											}
										}
										
										var tmpKey = '';
										for(var j = 0; j < items.length; j++) {
											if(isNameExist) {
												if(j == 0) {
													$('#' + data_field + (index + 1) + '4').val(items[j]['name']);
												} else {
													var display = $('#' + data_field + (index + 1) + '4').val();
													display += (',' + items[j]['name']);
													$('#' + data_field + (index + 1) + '4').val(display);
												}
											} else {
												if(j == 0) {
													for(key in e['item']) {
														if(e['item'][key] != undefined && e['item'][key] != ''){
															tmpKey = key;
															break;
														}
													}
													
													$('#' + data_field + (index + 1) + '4').val(items[j][tmpKey]);
												} else {
													var display = $('#' + data_field + (index + 1) + '4').val();
													display += (',' + items[j][tmpKey]);
													$('#' + data_field + (index + 1) + '4').val(display);
												}
											}
										}
										
										$('#' + data_field).val(JSON.stringify(items));
									});
									
									$(document).on('keyup', '#' + data_field + (index + 1) + '4', function(e) {
										if($('#' + data_field + (index + 1) + '4').val() == '') {
											$('#' + data_field).val('');
										}
									});
								}
							} else {
								if(that.searchFilter[index][i]['color'] == undefined || that.searchFilter[index][i]['color'] == '') {
									$('#' + data_field).jqxComboBox({width: width, height: height, dropDownHeight: 250, autoDropDownHeight: false, searchMode: 'containsignorecase', autoComplete: true});
									$('#' + data_field).removeClass('w-select');
									
									var items = $('#' + data_field).jqxComboBox('source');
									for(var j = 0; j < data.length; j++) {
										items.push({ label: data[j]['name'], value: data[j]['code'] });
									}
									
									$('#' + data_field).jqxComboBox('source', items);
									$('#' + data_field).find('input').attr('readonly', false);
									
									var cinput = $('#' + data_field).find('.jqx-combobox-input');
									$(document).on('keyup', cinput, function(e) {
										if(cinput.val() == '') {
											$('#' + data_field).val('');
										}
									});
								} else {
									html =  	'<div id="' + data_field + (index + 1) + '1" style="padding: 0px 0px 0px 0px;">'
											+ 		'<input maxlength="256" id="' + data_field + (index + 1) + '4" input-type="text" type="text" class="w-input fieldbox" style="border-top:0px; border-bottom:0px"></input>'
											+ 		'<input type="hidden" id="' + data_field + '" />' 
											+ 	'</div>'
											+ 	'<div id="' + data_field + (index + 1) + '2" style="padding-left:5px;">'
											+ 	'</div>';
									$('select#' + data_field).append(html);
									$('select#' + data_field).removeClass('w-select');
									$('select#' + data_field).attr('id', data_field + (index + 1) + '0');
									$('select#' + data_field + (index + 1) + '0').replaceTag('div');									
									
									const MULTI_CELL_WIDTH = 100;
									const AREA_HEIGHT = 270;
									var isNameExist = false;
									
									$('#' + data_field + (index + 1) + '2').append('<br /><div id="' + data_field + (index + 1) + '3" class="w-widget w-widget-auigrid w-dyn-list w-unbound grid"></div>');
									
									var columnProperty1 = [];									
									var columnCount = 0;
									if(data.length > 0) {
										for(key in data[0]) {
											if(key == 'code') {
												var json = {dataField: 'code', visible: false};
												columnProperty1.push(json);
												continue;
											} else if(key == 'name') {
												isNameExist = true;
											} 
											////////////////////////////////////////////////////
											/*else if(key == 'value' || key == 'codeName') {
												continue;
											}*/
											////////////////////////////////////////////////////
												
											var json = {};
											json['dataField'] = key;
											json['width'] = width - 25 - 5 - 2;
											json['style'] = 'left-column';
											json['filter'] = {showIcon:true};
											columnProperty1.push(json);
											columnCount++;
										}
									}
									
									if(columnCount > 1) {
										for(var j = 0; j < columnProperty1.length; j++) {
											columnProperty1[j]['width'] = MULTI_CELL_WIDTH - 5 - 4;
										}
									}
									
									if(columnCount > 1) {
										width = columnCount * MULTI_CELL_WIDTH - 5 - 1;
									}
									
									$('#' + data_field + (index + 1) + '4').css({width: width - 19});
									
									var height = data.length * 26;
									
									////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
									if(height > AREA_HEIGHT) {
										$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width, height: AREA_HEIGHT + 28 + 16 + 4});
									} else {
										$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width, height: height + 28 + 26 + 16 + 4});
									}
									////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
									AUIGrid.create(
										  '#' + data_field + (index + 1) + '3'
										, columnProperty1
										, {enableFilter: true, showRowNumColumn: false, enableHScrollByWheel: false, showSelectionBorder: true, footerHeight: 0, selectionMode: 'singleRow'}
									);
									
									AUIGrid.setFixedColumnCount('#' + data_field + (index + 1) + '3', columnCount + 10);
									
									$('#' + data_field + (index + 1) + '1').parents('div').css({padding: '0px 0px 0px 0px'});
									$('#' + data_field + (index + 1) + '2').parents('div').css({'z-index': '999'});
									if(height > AREA_HEIGHT) {
										$('#' + data_field + (index + 1) + '2').css({height: AREA_HEIGHT + 30});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10 - 15, height: AREA_HEIGHT + 10, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: AREA_HEIGHT});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: AREA_HEIGHT});
									} else {
										$('#' + data_field + (index + 1) + '2').css({height: height + 26 + 16 + 4 + 10});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10 - 15, height: height + 26 + 4, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: height + 26 + 4});
										$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: height + 26 + 4});
									}
									$('#' + data_field + (index + 1) + '0').parent('div').parent('li').parent('ul').parent('form').parent('div').parent('div').css({'padding-top': '5px'});
							
									
									AUIGrid.setGridData('#' + data_field + (index + 1) + '3', data);
									
									AUIGrid.bind('#' + data_field + (index + 1) + '3', 'cellClick', function(e) {
										delete e['item']['_$uid'];
										$('#' + data_field).val(JSON.stringify(e['item']));
										$('#' + data_field + (index + 1) + '4').val(e['value']);
									});
									
									$(document).on('keyup', '#' + data_field + (index + 1) + '4', function(e) {
										if($('#' + data_field + (index + 1) + '4').val() == '') {
											$('#' + data_field).val('');
										}
									});
									////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
								}
							}
							// 2020.04.12 hyjeong end
							
							if(that.searchFilter[index][i]['popUpInit'] != undefined) {
								if(that.searchFilter[index][i]['popUpInit'] == 'FIRST ROW') {
									$('#' + data_field).jqxComboBox('selectItem', items[0]);
								} else if(that.searchFilter[index][i]['popUpInit'] == 'SECOND ROW') {
									$('#' + data_field).jqxComboBox('selectItem', items[1]);
								} else {
									$('#' + data_field).val(that.searchFilter[index][i]['popUpInit']);
								}
							}
							
							if(that.searchFilter[index][i]['sortIndex'] != undefined) {
								const currentIndex = parseInt(that.searchFilter[index][i]['sortIndex']);
								for(var loop2 = 0; loop2 < that.searchFilter[index].length; loop2++) {
									const j = loop2;
									if(that.searchFilter[index][j]['sortIndex'] != undefined && that.searchFilter[index][j]['sortIndex'] == currentIndex + 1) {
										const data_field2 = that.searchFilter[index][j]['dataField'];
										
										$(document).on('click', '#' + data_field2, function(e) {
											if($('#' + data_field).val() == '') {
												$('#' + data_field2).val('');
												that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10558']});
												
												return;
											}
										});
										
										$('#' + data_field).on('change', function() {
											var drop_down2 = that.searchFilter[index][j]['dropDown'];
											var replace_orgin = drop_down2.substring(drop_down2.indexOf('#'), drop_down2.lastIndexOf('#') + 1);
											drop_down2 = drop_down2.replace(replace_orgin, $('#' + data_field).val());
											$('#' + data_field2).jqxComboBox('clear');
											
											var data2 = that.dropDownMap.get(drop_down2);
											if(data2 != undefined) {
												var items2 = [];
												for(var k = 0; k < data2.length; k++) {
													items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
												}
												
												$('#' + data_field2).jqxComboBox('source', items2);
											} else {
												mom_ajax('R', drop_down2, {}, function(result2, data2) {
													if(result2 != 'SUCCESS') {
														console.log('error');														
														return;
													}
													
													var items2 = [];
													for(var k = 0; k < data2.length; k++) {
														items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
													}
													
													$('#' + data_field2).jqxComboBox('source', items2);														
													that.dropDownMap.set(drop_down2, data2);
												});		
											}
										});
										
										break;
									}
								}
							}
						}
					} else {
						mom_ajax('R', drop_down, {}, function(result, data) {
							if(result != 'SUCCESS') {
								console.log('error');								
								return;
							}
							
							/*data = [];
							for(var j = 0; j < 20; j++) {
								var json = {'컬럼1' : '밸류 ' + (j + 1), '컬럼2' : '밸류 ' + (j + 1), '컬럼3' : '밸류 ' + (j + 1)};
								data.push(json);
							}*/
							
							that.dropDownMap.set(drop_down, data); 
							if(document.getElementById(data_field)) {
								var width = $('#' + data_field).width() + 26;
								var height = $('#' + data_field).height() + 4 < 24 ? 24 : $('#' + data_field).height() + 4;
								if(that.searchFilter[index][i]['width'] != undefined && that.searchFilter[index][i]['width'] != '') {
									height = that.searchFilter[index][i]['width'];
								}
									
								// 2020.04.12 hyjeong begin
								if(that.searchFilter[index][i]['filter']) {
									if(that.searchFilter[index][i]['color'] == undefined || that.searchFilter[index][i]['color'] == '') {
										$('#' + data_field).jqxComboBox({width: width, height: height, dropDownHeight: 250, autoDropDownHeight: false, searchMode: 'containsignorecase', autoComplete: true, checkboxes: true});
										$('#' + data_field).removeClass('w-select');
										
										var items = $('#' + data_field).jqxComboBox('source');
										for(var j = 0; j < data.length; j++) {
											items.push({label: data[j]['name'], value: data[j]['code']});
										}
										
										$('#' + data_field).jqxComboBox('source', items);
										$('#' + data_field).find('input').attr('readonly', false);
										
										var cinput = $('#' + data_field).find('.jqx-combobox-input');
										$(document).on('keyup', cinput, function(e) {
											if(cinput.val() == '') {
												$('#' + data_field).val('');
												$('#' + data_field).jqxComboBox('uncheckAll');
											}
										});
									} else if(that.searchFilter[index][i]['color'] == 'GRID') {
										html =  	'<div id="' + data_field + (index + 1) + '1" style="padding: 0px 0px 0px 0px;">'
												+ 		'<input maxlength="256" id="' + data_field + (index + 1) + '4" input-type="text" type="text" class="w-input fieldbox" style="border-top:0px; border-bottom:0px"></input>'
												+ 		'<input type="hidden" id="' + data_field + '" />' 
												+ 	'</div>'
												+ 	'<div id="' + data_field + (index + 1) + '2" style="padding-left:5px;">'
												+ 	'</div>';
										$('select#' + data_field).append(html);
										$('select#' + data_field).removeClass('w-select');
										$('select#' + data_field).attr('id', data_field + (index + 1) + '0');
										$('select#' + data_field + (index + 1) + '0').replaceTag('div');									
										
										const MULTI_CELL_WIDTH = 100;
										const AREA_HEIGHT = 270;
										var isNameExist = false;
										
										$('#' + data_field + (index + 1) + '2').append('<br /><div id="' + data_field + (index + 1) + '3" class="w-widget w-widget-auigrid w-dyn-list w-unbound grid"></div>');
										
										var columnProperty1 = [];									
										var columnCount = 0;
										if(data.length > 0) {
											for(key in data[0]) {
												if(key == 'code') {
													var json = {dataField: 'code', visible: false};
													columnProperty1.push(json);
													continue;
												} else if(key == 'name') {
													isNameExist = true;
												} 
												////////////////////////////////////////////////////
												/*else if(key == 'value' || key == 'codeName') {
													continue;
												}*/
												////////////////////////////////////////////////////
													
												var json = {};
												json['dataField'] = key;
												json['width'] = width - 25 - 5 - 2;
												json['style'] = 'left-column';
												json['filter'] = {showIcon:true};
												columnProperty1.push(json);
												columnCount++;
											}
										}
										
										if(columnCount > 1) {
											for(var j = 0; j < columnProperty1.length; j++) {
												columnProperty1[j]['width'] = MULTI_CELL_WIDTH - 5 - (17 / columnCount) - 2;
											}
										}
										
										if(columnCount > 1) {
											width = columnCount * MULTI_CELL_WIDTH - 5 - 1;
										}
										
										$('#' + data_field + (index + 1) + '4').css({width: width - 2});
										
										var height = data.length * 26;
										
										////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										if(height > AREA_HEIGHT) {
											$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width + 17, height: AREA_HEIGHT + 28 + 16 + 4});
										} else {
											$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width + 17, height: height + 28 + 26 + 16 + 4});
										}
										////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										AUIGrid.create(
											  '#' + data_field + (index + 1) + '3'
											, columnProperty1
											, {enableFilter: true, showRowNumColumn: false, enableHScrollByWheel: false, showSelectionBorder: true, footerHeight: 0, showRowCheckColumn: true, selectionMode: 'multipleRows'}
										);
										
										AUIGrid.setFixedColumnCount('#' + data_field + (index + 1) + '3', columnCount + 10);
										
										$('#' + data_field + (index + 1) + '1').parents('div').css({padding: '0px 0px 0px 0px'});
										$('#' + data_field + (index + 1) + '2').parents('div').css({'z-index': '999'});
										if(height > AREA_HEIGHT) {
											$('#' + data_field + (index + 1) + '2').css({height: AREA_HEIGHT + 30});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10, height: AREA_HEIGHT + 10, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: AREA_HEIGHT});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: AREA_HEIGHT});
										} else {
											$('#' + data_field + (index + 1) + '2').css({height: height + 26 + 16 + 4 + 10});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10, height: height + 26 + 4, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: height + 26 + 4});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: height + 26 + 4});
										}
										$('#' + data_field + (index + 1) + '0').parent('div').parent('li').parent('ul').parent('form').parent('div').parent('div').css({'padding-top': '5px'});
										
										AUIGrid.setGridData('#' + data_field + (index + 1) + '3', data);
										
										AUIGrid.bind('#' + data_field + (index + 1) + '3', 'rowCheckClick', function(e) {
											var items = $('#' + data_field).val() == '' ? JSON.parse('[]') : JSON.parse($('#' + data_field).val()); 
											var display = $('#' + data_field + (index + 1) + '4').val();
											delete e['item']['_$uid'];
											if(e['checked']) {
												items.push(e['item']);
											} else {
												for(var j = items.length - 1; j >= 0; j--) {
													if(JSON.stringify(items[j]) == JSON.stringify(e['item'])) {
														items.splice(j, 1);
														break;
													}
												}
											}
											
											var tmpKey = '';
											for(var j = 0; j < items.length; j++) {
												if(isNameExist) {
													if(j == 0) {
														$('#' + data_field + (index + 1) + '4').val(items[j]['name']);
													} else {
														var display = $('#' + data_field + (index + 1) + '4').val();
														display += (',' + items[j]['name']);
														$('#' + data_field + (index + 1) + '4').val(display);
													}
												} else {
													if(j == 0) {
														for(key in e['item']) {
															if(e['item'][key] != undefined && e['item'][key] != ''){
																tmpKey = key;
																break;
															}
														}
														
														$('#' + data_field + (index + 1) + '4').val(items[j][tmpKey]);
													} else {
														var display = $('#' + data_field + (index + 1) + '4').val();
														display += (',' + items[j][tmpKey]);
														$('#' + data_field + (index + 1) + '4').val(display);
													}
												}
											}
											
											$('#' + data_field).val(JSON.stringify(items));
										});
										
										$(document).on('keyup', '#' + data_field + (index + 1) + '4', function(e) {
											if($('#' + data_field + (index + 1) + '4').val() == '') {
												$('#' + data_field).val('');
											}
										});
									}
								} else {
									if(that.searchFilter[index][i]['color'] == undefined || that.searchFilter[index][i]['color'] == '') {
										$('#' + data_field).jqxComboBox({width: width, height: height, dropDownHeight: 250, autoDropDownHeight: false, searchMode: 'containsignorecase', autoComplete: true});
										$('#' + data_field).removeClass('w-select');
										
										var items = $('#' + data_field).jqxComboBox('source');
										for(var j = 0; j < data.length; j++) {
											items.push({ label: data[j]['name'], value: data[j]['code'] });
										}
										
										$('#' + data_field).jqxComboBox('source', items);
										$('#' + data_field).find('input').attr('readonly', false);
										
										var cinput = $('#' + data_field).find('.jqx-combobox-input');
										$(document).on('keyup', cinput, function(e) {
											if(cinput.val() == '') {
												$('#' + data_field).val('');
											}
										});
									} else {
										html =  	'<div id="' + data_field + (index + 1) + '1" style="padding: 0px 0px 0px 0px;">'
												+ 		'<input maxlength="256" id="' + data_field + (index + 1) + '4" input-type="text" type="text" class="w-input fieldbox" style="border-top:0px; border-bottom:0px"></input>'
												+ 		'<input type="hidden" id="' + data_field + '" />' 
												+ 	'</div>'
												+ 	'<div id="' + data_field + (index + 1) + '2" style="padding-left:5px;">'
												+ 	'</div>';
										$('select#' + data_field).append(html);
										$('select#' + data_field).removeClass('w-select');
										$('select#' + data_field).attr('id', data_field + (index + 1) + '0');
										$('select#' + data_field + (index + 1) + '0').replaceTag('div');									
										
										const MULTI_CELL_WIDTH = 100;
										const AREA_HEIGHT = 270;
										var isNameExist = false;
										
										$('#' + data_field + (index + 1) + '2').append('<br /><div id="' + data_field + (index + 1) + '3" class="w-widget w-widget-auigrid w-dyn-list w-unbound grid"></div>');
										
										var columnProperty1 = [];									
										var columnCount = 0;
										if(data.length > 0) {
											for(key in data[0]) {
												if(key == 'code') {
													var json = {dataField: 'code', visible: false};
													columnProperty1.push(json);
													continue;
												} else if(key == 'name') {
													isNameExist = true;
												} 
												////////////////////////////////////////////////////
												/*else if(key == 'value' || key == 'codeName') {
													continue;
												}*/
												////////////////////////////////////////////////////
													
												var json = {};
												json['dataField'] = key;
												json['width'] = width - 25 - 5 - 2;
												json['style'] = 'left-column';
												json['filter'] = {showIcon:true};
												columnProperty1.push(json);
												columnCount++;
											}
										}
										
										if(columnCount > 1) {
											for(var j = 0; j < columnProperty1.length; j++) {
												columnProperty1[j]['width'] = MULTI_CELL_WIDTH - 5 - 4;
											}
										}
										
										if(columnCount > 1) {
											width = columnCount * MULTI_CELL_WIDTH - 5 - 1;
										}
										
										$('#' + data_field + (index + 1) + '4').css({width: width - 19});
										
										var height = data.length * 26;
										
										////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										if(height > AREA_HEIGHT) {
											$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width, height: AREA_HEIGHT + 28 + 16 + 4});
										} else {
											$('#' + data_field + (index + 1) + '0').jqxExpander({expanded: false, width: width, height: height + 28 + 26 + 16 + 4});
										}
										////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										AUIGrid.create(
											  '#' + data_field + (index + 1) + '3'
											, columnProperty1
											, {enableFilter: true, showRowNumColumn: false, enableHScrollByWheel: false, showSelectionBorder: true, footerHeight: 0, selectionMode: 'singleRow'}
										);
										
										AUIGrid.setFixedColumnCount('#' + data_field + (index + 1) + '3', columnCount + 10);
										
										$('#' + data_field + (index + 1) + '1').parents('div').css({padding: '0px 0px 0px 0px'});
										$('#' + data_field + (index + 1) + '2').parents('div').css({'z-index': '999'});
										if(height > AREA_HEIGHT) {
											$('#' + data_field + (index + 1) + '2').css({height: AREA_HEIGHT + 30});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10 - 15, height: AREA_HEIGHT + 10, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: AREA_HEIGHT});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: AREA_HEIGHT});
										} else {
											$('#' + data_field + (index + 1) + '2').css({height: height + 26 + 16 + 4 + 10});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid').css({width: width - 10 - 15, height: height + 26 + 4, 'border-right': 'none', 'border-left': 'none', 'border-top': 'none', 'border-bottom': 'none'});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-content-panel-mask').css({width: width - 5, height: height + 26 + 4});
											$('#' + data_field + (index + 1) + '3').find('.aui-grid-main-panel').css({width: width - 5, height: height + 26 + 4});
										}
										$('#' + data_field + (index + 1) + '0').parent('div').parent('li').parent('ul').parent('form').parent('div').parent('div').css({'padding-top': '5px'});
								
										
										AUIGrid.setGridData('#' + data_field + (index + 1) + '3', data);
										
										AUIGrid.bind('#' + data_field + (index + 1) + '3', 'cellClick', function(e) {
											delete e['item']['_$uid'];
											$('#' + data_field).val(JSON.stringify(e['item']));
											$('#' + data_field + (index + 1) + '4').val(e['value']);
										});
										
										$(document).on('keyup', '#' + data_field + (index + 1) + '4', function(e) {
											if($('#' + data_field + (index + 1) + '4').val() == '') {
												$('#' + data_field).val('');
											}
										});
										////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
									}
								}
								// 2020.04.12 hyjeong end
								
								if(that.searchFilter[index][i]['popUpInit'] != undefined) {
									if(that.searchFilter[index][i]['popUpInit'] == 'FIRST ROW') {
										$('#' + data_field).jqxComboBox('selectItem', items[0]);
									} else if(that.searchFilter[index][i]['popUpInit'] == 'SECOND ROW') {
										$('#' + data_field).jqxComboBox('selectItem', items[1]);
									} else {
										$('#' + data_field).val(that.searchFilter[index][i]['popUpInit']);
									}
								}
								
								if(that.searchFilter[index][i]['sortIndex'] != undefined) {
									const currentIndex = parseInt(that.searchFilter[index][i]['sortIndex']);
									for(var loop2 = 0; loop2 < that.searchFilter[index].length; loop2++) {
										const j = loop2;
										if(that.searchFilter[index][j]['sortIndex'] != undefined && that.searchFilter[index][j]['sortIndex'] == currentIndex + 1) {
											const data_field2 = that.searchFilter[index][j]['dataField'];
											
											$(document).on('click', '#' + data_field2, function(e) {
												if($('#' + data_field).val() == '') {
													$('#' + data_field2).val('');
													that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10558']});
													
													return;
												}
											});
											
											$('#' + data_field).on('change', function() {
												var drop_down2 = that.searchFilter[index][j]['dropDown'];
												var replace_orgin = drop_down2.substring(drop_down2.indexOf('#'), drop_down2.lastIndexOf('#') + 1);
												drop_down2 = drop_down2.replace(replace_orgin, $('#' + data_field).val());
												$('#' + data_field2).jqxComboBox('clear');
												
												var data2 = that.dropDownMap.get(drop_down2);
												if(data2 != undefined) {
													var items2 = [];
													for(var k = 0; k < data2.length; k++) {
														items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
													}
													
													$('#' + data_field2).jqxComboBox('source', items2);
												} else {
													mom_ajax('R', drop_down2, {}, function(result2, data2) {
														if(result2 != 'SUCCESS') {
															console.log('error');														
															return;
														}
														
														var items2 = [];
														for(var k = 0; k < data2.length; k++) {
															items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
														}
														
														$('#' + data_field2).jqxComboBox('source', items2);															
														that.dropDownMap.set(drop_down2, data2);
													});		
												}
											});
											
											break;
										}
									}
								}
							}
							
							that.dropDownMap.set(drop_down, data);
						});
					}						
				} else {	
					if(document.getElementById(data_field)) {
						var width = $('#' + data_field).width() + 26;
						var height = $('#' + data_field).height() + 4 < 24 ? 24 : $('#' + data_field).height() + 4;
						if(that.searchFilter[index][i]['width'] != undefined) {
							height = that.searchFilter[index][i]['width'];
						}
						
						$('#' + data_field).jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
						$('#' + data_field).removeClass('w-select');
						$('#' + data_field).jqxComboBox('source', []);
						$('#' + data_field).find('input').attr('readonly', false);
						
						const currentIndex = parseInt(that.searchFilter[index][i]['sortIndex']);
						for(var loop2 = 0; loop2 < that.searchFilter[index].length; loop2++) {
							const j = loop2;
							if(that.searchFilter[index][j]['sortIndex'] != undefined && that.searchFilter[index][j]['sortIndex'] == currentIndex + 1) {
								const data_field2 = that.searchFilter[index][j]['dataField'];
								$('#' + data_field).on('change', function() {
									var drop_down2 = that.searchFilter[index][j]['dropDown'];
									var replace_orgin = drop_down2.substring(drop_down2.indexOf('#'), drop_down2.lastIndexOf('#') + 1);
									drop_down2 = drop_down2.replace(replace_orgin, $('#' + data_field).val());
									$('#' + data_field2).jqxComboBox('clear');
									var data2 = that.dropDownMap.get(this.columnProperty[index][i]['dropDown']);
									if(data2 != undefined) {
										var items2 = [];
										for(var k = 0; k < data2.length; k++) {
											items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
										}
										
										$('#' + data_field2).jqxComboBox('source', items2);
									} else {
										mom_ajax('R', drop_down2, {}, function(result2, data2) {
											if(result2 != 'SUCCESS') {
												console.log('error');												
												return;
											}
											
											var items2 = [];
											for(var k = 0; k < data2.length; k++) {
												items2.push({ label: data2[k]['name'], value: data2[k]['code'] });
											}
											
											$('#' + data_field2).jqxComboBox('source', items2);
											that.dropDownMap.set(data_field2, data2);
										});
									}
								});
								
								break;
							}
						}
					}
				}
				
				/*if(that.searchFilter[index][i]['popUpInit'] != undefined) {
					//if(that.searchFilter[index][i]['popUp'] == 'CALENDAR') {
						if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-MM-01') {
	    					var today = get_date_diff(0);	    					
	    					$('#' + data_field).val(today.substring(0, 8) + '01');
	    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-MM-31') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var nextMonthdd = '';
	    					if(todaydd < 15) {
	    						nextMonthdd = get_date_diff2(today, 40);
	    					} else {
	    						nextMonthdd = get_date_diff2(today, 20);
	    					}
	    					nextMonthdd = nextMonthdd.substring(0, 8) + '01';
	    					$('#' + data_field).val(get_date_diff2(nextMonthdd, -1));
	    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-M--01') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var prevMonthdd = '';
	    					if(todaydd < 15) {
	    						prevMonthdd = get_date_diff2(today, -20);
	    					} else {
	    						prevMonthdd = get_date_diff2(today, -40);
	    					}
	    					$('#' + data_field).val(prevMonthdd.substring(0, 8) + '01');
	    				} else if(that.searchFilter[index][i]['popUpInit'] == 'YYYY-M--31') {
	    					var today = get_date_diff(0);	    					
	    					var currentMonth01 = today.substring(0, 8) + '01';
	    					$('#' + data_field).val(get_date_diff2(currentMonth01, -1));
	    				} else if(that.searchFilter[index][i]['popUpInit'] == 'TODAY') {
	    					var today = get_date_diff(0);	    					
	    					$('#' + data_field).val(today);
	    				} else if(that.searchFilter[index][i]['popUpInit'].indexOf('TODAY') >= 0) {
	    					if(that.searchFilter[index][i]['popUpInit'].indexOf('MONTH') >= 0) {
	    						var today = get_date_diff(0);
	    						var todaydd = parseInt(today.substring(8, 10));
	    						var prevStartDay = undefined, nextEndDay = undefined;
	    						if(that.searchFilter[index][i]['popUpInit'].indexOf('-') >= 0) {
	    							var firstDay = today.substring(0, 8) + '01';
	    							var prevLastDay = get_date_diff2(firstDay, -1);
	    							prevStartDay = prevLastDay.substring(0, 8) + (todaydd < 10 ? '0' + todaydd : '' + todaydd); 
	    						} else {
	    	    					var nextMonthdd = '';
	    	    					if(todaydd < 15) {
	    	    						nextMonthdd = get_date_diff2(today, 40);
	    	    					} else {
	    	    						nextMonthdd = get_date_diff2(today, 20);
	    	    					}
	    	    					
	    	    					if(today == 1) {
	    	    						nextEndDay = nextMonthdd.substring(0, 8) + '01';
	    	    						nextEndDay = get_date_diff2(nextEndDay, -1);
	    	    					} else {
	    	    						nextEndDay = nextMonthdd.substring(0, 8) + (todaydd - 1 < 10 ? '0' + (todaydd - 1) : '' + (todaydd - 1));
	    	    					}
	    	    				}
	    						
	    						$('#' + data_field).val(prevStartDay || nextEndDay);
	    					} else {
		    					var date = that.searchFilter[index][i]['popUpInit'];
		    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
		    					
		    					$('#' + data_field).val(get_date_diff(diff));
	    					}
	    				}
					//} 
				}*/ 
			} 
		}
	},
	
		// Level 2. columnStyle을 위한 HTML 동적 생성, by procColumnProperty
		design: function(index, idx, color, align) {
			/*var list = document.getElementsByTagName('style');
			for(var i = 0; i < list.length; i++) {
				if(list[i].innerHTML.indexOf('columnStyle' + idx) >= 0) {
					return;
				}
			}*/
			/*const index1 = index;
			const idx1 = idx;
			const color1 = color;
			const align1 = align;*/
			
			if(color.indexOf('H') >= 0) {
				color = color.replace(/H/gi, '#');
				$('head').append('<style>.headerStyle' + index + '' + idx + '{background:' + color + ';}</style>');
			} else {
				if(align != undefined && align.indexOf('-') > 0) {
					$('head').append('<style>.columnStyle' + index + '' + idx + '{background:' + color + '; text-align:' + align.substr(0, align.indexOf('-')) + '}</style>');
				} else {
					$('head').append('<style>.columnStyle' + index + '' + idx + '{background:' + color + '; text-align:center}</style>');
				}
			}
		},
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 조회 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 조회버튼 핸들러
	procRetrieve: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var findBtnId = 'findBtn' + (index + 1);
		var isExist = document.getElementById(findBtnId);
		if(isExist == undefined || that.gridProperty[index]['queryId'] == undefined || $.trim(that.gridProperty[index]['queryId']) == '' || $.trim(that.gridProperty[index]['queryId']) == 'namespace.queryId.dummy') {
			return;
		}
		
		$(document).on('click', '#' + findBtnId, function(e) {
			that.findBtnClicked(index, true, {}, undefined, {index: index, op: findBtnId}, your);
			//e.preventDefault();
		});
	},
	
		// Level 2. 조회연산시 페이징 처리, by procRetrieve
		retrievePartial: function(index, param, entireProcess, retrieveCallBack, indexInfo, your) {
			if(indexInfo != undefined && indexInfo['index'] != -1) {
				index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
			}
			
			var that = this.grid == undefined ? this.momWidget : this;
			
			if(entireProcess != this.entireProcess[index]) {
				return;
			} else if(param['endPage'] - param['startPage'] + 1 == this.gridProperty[index]['pageRowCount']) {
				if(this.entireIsDone[index] == 'WORK') {				
					if(param['startPage'] <= this.entireDatas[index].length) {
						var partialData = this.entireDatas[index].slice(param['startPage'] - 1, param['endPage']);
						
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
							
							if(that.sortParam[index] != undefined && that.sortParam[index].length > 0) {
								AUIGrid.setSorting(that.grid[index], that.sortParam[index]);
							}
							
							this.drawPaging(index, param, entireProcess);
							
							return;
						} 
							
						mom_ajax('R', this.gridProperty[index]['queryId'], param, function(result, data) {
							if(result != 'SUCCESS') {
								that.messageBox({type:'warning', width:'400', height: '145', html:'조회에 실패하였습니다.'});
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
						}, undefined, indexInfo, your);
						
						return;
					}
				} else if(this.entireIsDone[index] == 'DONE') {
					var partialData = this.entireDatas[index].slice(param['startPage'] - 1, param['endPage']);
					
					AUIGrid.setGridData(this.grid[index], partialData); ///
					
					if(this.sortParam[index] != undefined && this.sortParam[index].length > 0) {
						AUIGrid.setSorting(this.grid[index], this.sortParam[index]);
					}
					
					this.drawPaging(index, param, entireProcess);
					
					if(indexInfo != undefined && indexInfo['newIndex'] != undefined) {
						delete indexInfo['newIndex'];
					}
					
					return;
				}
			}
			
			mom_ajax('R', this.gridProperty[index]['queryId'], param, function(result, data) {
				if(result != 'SUCCESS') {
					console.log('error');
					return;
				}
				
				if(entireProcess != that.entireProcess[index]) {
					return;
				} else if(that.entireIsDone[index] == 'INIT') {
					//that.entireDatas[index] = data;
					try {
						that.gridProperty[index]['totalRowCount'] = (data[0]['rowCount'] == undefined && data[0]['ROW_COUNT'] == undefined) ? data.length : (data[0]['rowCount'] || data[0]['ROW_COUNT']);
					} catch(e) {
						that.gridProperty[index]['totalRowCount'] = data.length;
					}
					
					that.totalPage[index] = Math.floor((that.gridProperty[index]['totalRowCount'] - 1) / that.gridProperty[index]['pageRowCount']) + 1;
					
					/*if(index == 0 && indexInfo != undefined && indexInfo['op'] == ('INIT' + (index + 1))) {
						that.splashHide('load');
					}*/
					if(your != undefined) {
						if(retrieveCallBack != undefined) {
							retrieveCallBack('SUCCESS', data, param, undefined, indexInfo, your);
						} else if(your.retrieveCallBack != undefined) {
							your.retrieveCallBack('SUCCESS', data, param, undefined, indexInfo, your);
						} else {
							that.splashHide();
							
							if(data.length < 1) {
								AUIGrid.clearGridData(that.grid[index]);
							} else if(data.length > that.gridProperty[index]['pageRowCount']) {
								var partialData = data.slice(param['startPage'] - 1, param['endPage']);
								AUIGrid.setGridData(that.grid[index], partialData);
							} else {
								AUIGrid.setGridData(that.grid[index], data);
							}
						}
					} else if(retrieveCallBack != undefined) {
						retrieveCallBack('SUCCESS', data, param, undefined, indexInfo, your);
					} else {
						that.splashHide();
						
						if(data.length < 1) {
							AUIGrid.clearGridData(that.grid[index]);
						} else if(data.length > that.gridProperty[index]['pageRowCount']) {
							var partialData = data.slice(param['startPage'] - 1, param['endPage']);
							AUIGrid.setGridData(that.grid[index], partialData);
						} else {
							AUIGrid.setGridData(that.grid[index], data);
						}
					}
					
					/*that.entireDatas[index] = data;
					console.log('aaa');*/
					/*if(that.sortParam[index].length > 0) {
						AUIGrid.setSorting(that.grid[index], that.sortParam[index]);
					}*/
					
					that.postSetGridData(index);
					that.drawPaging(index, param, entireProcess);
					
					if(your != undefined && your.saveCallBack == undefined && that.uploadFlag != 0) {
						that.splashHide();
						that.uploadFlag = 0;
						that.messageBox({type:'success', width:'400', height: '145', html:'성공하였습니다.'});
					}
										
					setTimeout(function(index) {
						that.entireDatas[index] = data; 
						
						if(that.entireDatas[index].length == that.gridProperty[index]['totalRowCount']) {
							that.entireIsDone[index] = 'DONE';
							if(your != undefined && your.entireDataSetBack != undefined) {
								your.entireDataSetBack(data, 'DONE');
							}
							
							if(indexInfo != undefined && indexInfo['newIndex'] != undefined) {
								delete indexInfo['newIndex'];
							}
							
							return;
						}
						
						that.entireIsDone[index] = 'WORK';
						if(your != undefined && your.entireDataSetBack != undefined) {
							your.entireDataSetBack(data, 'WORK');
						}
						
						
						param['startPage'] = that.entireDatas[index].length + 1;
						param['endPage']   = that.entireDatas[index].length + that.gridProperty[index]['pageRowCount'] * 10;
						
						that.retrievePartial(index, param, entireProcess, retrieveCallBack, indexInfo, your);
					}, 0, index);
				} else if(that.entireIsDone[index] == 'WORK') {
					that.entireDatas[index] = that.entireDatas[index].concat(data);

					if(that.entireDatas[index].length == that.gridProperty[index]['totalRowCount']) {
						that.entireIsDone[index] = 'DONE';
						if(your != undefined && your.entireDataSetBack != undefined) {
							your.entireDataSetBack(data, 'DONE');
						}
						
						if(retrieveCallBack != undefined) {
							setTimeout(retrieveCallBack, 0, 'SUCCESS', data, param, undefined, indexInfo, your);
						}
						
						return;
					}
					
					if(your != undefined && your.entireDataSetBack != undefined) {
						your.entireDataSetBack(data, 'WORK');
					}
					
					param['startPage'] = that.entireDatas[index].length + 1;
					//param['endPage']   = that.entireDatas[index].length + that.gridProperty[index]['pageRowCount'] * 40;
					param['endPage']   = that.entireDatas[index].length + that.gridProperty[index]['pageRowCount'] * 100;
					
					that.retrievePartial(index, param, entireProcess, retrieveCallBack, indexInfo, your);
				}
			});
		},
		
			// Level 3. 페이지 네비게이션 버튼 핸들러, by retrievePartial
			drawPaging: function(index, param, entireProcess) {
				var that = this.grid == undefined ? this.momWidget : this;
				
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
				var that = this.grid == undefined ? this.momWidget : this;
				
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
	procEnterKeyIsEnter				: undefined,
	procEnterKeyRetrieveComplete 	: [undefined, undefined, undefined, undefined, undefined, undefined],
	procEnterKeyEvent: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var $form = $('.form-inline');
		var $objs = $form.find('input[id]');
		for (var i = 0; i < $objs.length; i++) {
			$(document).on('keydown', $($objs[i]), function(e) {
				if(e.keyCode == 13) {
//					if(your != undefined && your.keyDownCallInit != undefined) {
//						your.keyDownCallInit(index, e.keyCode);
//						if(your.returnFlag == 'Y') {
//							return;
//						}
//					}
					
					if(
						(   
							(   
								   your != undefined 
								&& your.currentEnterKeyIndex == index
							) 
							||
							(
								   your != undefined 
								&& your.currentEnterKeyIndex == undefined
							)
						)
						&& that.procEnterKeyRetrieveComplete[index] == undefined 
						&& document.getElementById('findBtn' + (index+1)) != undefined
					) {
						that.procEnterKeyRetrieveComplete[index] = true;
						setTimeout(function() {
							that.procEnterKeyRetrieveComplete[index] = undefined;
						}, 400);
						
						if(e.target.form.id == "form") {
							that.findBtnClicked(index, true, {}, undefined, {index: index, op: 'findBtn' + (index + 1)}, your);
						}
					}
					
					return false;
				}
			});
		}		
	},
	
		// 검색버튼을 누른 효과
		findBtnClicked: function(index, splash, param, retrieveCallBack, indexInfo, your) { 
			if(indexInfo != undefined && indexInfo['index'] != -1) {
				index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
			}
			
			var that = this;
			if(param == undefined || jQuery.isEmptyObject(param) || param == 'default') {
				param = this.createParam4Form(index, '#form');
				if(param <= 0) {
					setTimeout(function() {
						if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
							that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
							return;
						}
						
						var message = '';
						var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
						for(var i = 0; i < that.searchFilter[index].length; i++) {
							if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
								if(message == '') {
									message = that.searchFilter[index][i]['headerText'];
								} else {
									message += (', ' + that.searchFilter[index][i]['headerText']);
								}
							}
						}
						
						message += ' 중 적어도 1개는 필수 항목입니다.';
						that.messageBox({type: 'warning', width: '400', height: '145', html: message});
						return;
					}, 40);
					
					return;
				}
			}
			
			/*if(document.getElementById('fromDate') != undefined && document.getElementById('toDate') != undefined) {
				if($('.h01 > #fromDate').val() == '' || $('.h01 > #toDate').val() == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
					return;
				} else if($('#fromDate').val() > $('#toDate').val()) {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
					return;
				}
			}*/
			var h01Area = document.querySelector('.h01');
			if(h01Area != undefined) {
				var fromDate = h01Area.querySelector('#fromDate');
				var toDate = h01Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				}
			}
			var h02Area = document.querySelector('.h02');
			if(h02Area != undefined) {
				var fromDate = h02Area.querySelector('#fromDate');
				var toDate = h02Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				}
			}
			var h03Area = document.querySelector('.h03');
			if(h03Area != undefined) {
				var fromDate = h03Area.querySelector('#fromDate');
				var toDate = h03Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				}
			}
			var h04Area = document.querySelector('.h04');
			if(h04Area != undefined) {
				var fromDate = h04Area.querySelector('#fromDate');
				var toDate = h04Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				}
			}
			var h05Area = document.querySelector('.h05');
			if(h05Area != undefined) {
				var fromDate = h05Area.querySelector('#fromDate');
				var toDate = h05Area.querySelector('#toDate');
				if(fromDate != undefined && toDate != undefined) {
					if(fromDate.value == '' || toDate.value == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					} else if(Number(fromDate.value.replace(/-/gi,'')) > Number(toDate.value.replace(/-/gi,''))) {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
						return;
					}
				} else if(fromDate != undefined) {
					if($('#fromDate').val() == '') {
						that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
						return;
					}
				}
			}
			
			if(document.getElementById('moFromDate') != undefined && document.getElementById('moToDate') != undefined) {
				if($('#moFromDate').val() == '' || $('#moToDate').val() == '') {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10250']});
					return;
				} else if($('#moFromDate').val() > $('#moToDate').val()) {
					that.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10785']});
					return;
				}
			}
			
			/////////////////////////////////////////////////////////////
			var paramPair = {param : param, callBackParam : undefined};
			var message = this.procCallInit(index, 'R', paramPair, indexInfo, your);
			if(message != 'SUCCESS') {
				this.splashHide();
				this.messageBox({type: 'warning', width: '400', height: '145',  html: message});
				
				return;
			}
			param = paramPair['param'];
			/////////////////////////////////////////////////////////////
			
			this.entireIsDone[index] = 'INIT';
			this.entireDatas[index] = undefined;
			
			this.currentPage[index] = 1;
			this.pageNumber[index] = 0;
			
			this.startPage[index] = 1; 
			this.gridProperty[index]['pageRowCount'] == this.gridProperty[index]['pageRowCount'] == undefined ? this.INFINITE : this.gridProperty[index]['pageRowCount'];
			this.endPage[index] = this.gridProperty[index]['pageRowCount'];
			
			param['startPage'] = this.startPage[index];
			param['endPage'] = this.endPage[index];
			
			const entireProcess = ++(this.entireProcess[index]);
			
			if(splash) {
				this.splashShow();
			}

			if(index == 0 && this.grid[index+1] != undefined) {
				AUIGrid.clearGridData(this.grid[index+1]);
			}
			
			this.retrievePartial(index, param, entireProcess, retrieveCallBack, indexInfo, your);
		},
		
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 셀클릭 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// AUIGrid 셀 클릭시 선택여부 설정
	// 2020.04.12 hyjeong begin
	procCellClick: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		AUIGrid.setSelectionMode(that.grid[index], 'singleCell');		
		if(your != undefined && your.cellClickPostpone != undefined) {
			return;
		}
		
		// 2020.04.12 hyjeong begin
		if(that.gridProperty[index].checkId == 'NONE' || that.gridProperty[index].checkId == 'multipleRowsCell') {
			return;
		} else if(that.gridProperty[index].checkId == 'radioButton' || that.gridProperty[index].checkId == 'singleRowCell') {
			AUIGrid.bind(that.grid[index], 'rowCheckClick', function(e) {
				//AUIGrid.setAllCheckedRows(e.pid, false);
				const rowIdField = AUIGrid.getProp(e['pid'], 'rowIdField'); 
				const rowId = e['item'][rowIdField];
				
				if(e['checked']) {
					if(that.singleRowIndex[index] == undefined) {
						that.singleRowIndex[index] = e;
					} else {
						if(JSON.stringify(e['item']) == JSON.stringify(that.singleRowIndex[index]['item'])) {
						} else {
							const rowIdField1 = AUIGrid.getProp(that.singleRowIndex[index]['pid'], 'rowIdField'); 
							const rowId1 = that.singleRowIndex[index]['item'][rowIdField1];
							
							AUIGrid.addUncheckedRowsByIds(that.singleRowIndex[index]['pid'], rowId1);
							AUIGrid.addCheckedRowsByIds(e['pid'], rowId);
							that.singleRowIndex[index] = e;
						}
					}
				} else {
					const rowIdField1 = AUIGrid.getProp(that.singleRowIndex[index]['pid'], 'rowIdField'); 
					const rowId1 = that.singleRowIndex[index]['item'][rowIdField1];
					
					AUIGrid.addUncheckedRowsByIds(that.singleRowIndex[index]['pid'], rowId1);
					that.singleRowIndex[index] = undefined;
				}
			});
			
			return;
		}		
		// 2020.04.12 hyjeong end
		
		if(that.processTran[index] != undefined) {
			for(var i = 0; i < that.processTran[index].length; i++) {
				if((that.processTran[index][i]['dataField'] == 'CC' || that.processTran[index][i]['dataField'] == 'CD') && that.processTran[index][i]['message'] == 'ACTION') {
					return;
				}
			}
		}
		
		AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
		AUIGrid.bind(that.grid[index], 'cellClick', function(e) {
			if(your != undefined && your.cellClickCallInit != undefined) {
				your.cellClickCallInit(index, e);
				if(your != undefined && your.cellClickCallInitParam != undefined) {
					return;
				}
			}
			
			
			var current = parseInt(AUIGrid.getProp(that.grid[index], 'exportURL'));
			AUIGrid.setProp(that.grid[index], 'exportURL' , '' + (current + 1));
			setTimeout(function() {
				if(AUIGrid.getProp(that.grid[index], 'exportURL') != '1') { 
					AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
					return;
				}
				
				AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
				
				const item = e['item'];
				const rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				const rowId = item[rowIdField];			
				// 2020.04.12 hyjeong begin
				if(that.gridProperty[index]['checkId'] == 'singleRow') {
					AUIGrid.setAllCheckedRows(e.pid, false);
				}
				
				if(that.singleRowIndex[index] == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					that.singleRowIndex[index] = undefined;
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					that.singleRowIndex[index] = rowId;
				}				
				// 2020.04.12 hyjeong end
				
				if(your != undefined && your.cellClickCallBack != undefined) {
					your.cellClickCallBack(index, e);
				}
			}, 400);
		});
	},
	// 2020.04.12 hyjeong end
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 저장, 삭제 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 저장, 삭제버튼 이벤트 핸들러
	procAddDelSaveBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var addBtnId = 'addBtn' + (index + 1);
		var isExist = document.getElementById(addBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + addBtnId, function(e) {
				if(your != undefined && your.addClickInit != undefined) {
					your.addClickInit(index, undefined, undefined, {'index' : index, 'op' : addBtnId});
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				
				var newRow = {};
				
				//var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
				for(var i = 0; i < that.columnProperty[index].length; i++) {
					if(that.columnProperty[index][i]['popUpInit'] != undefined) {
						newRow[that.columnProperty[index][i]['dataField']] = that.columnProperty[index][i]['popUpInit'];
					} else {
						newRow[that.columnProperty[index][i]['dataField']] = '';
					}
				}
				
				newRow['NEW'] = 'Y';
				
				AUIGrid.addRow(that.grid[index], newRow, 'last');
				if(your != undefined && your.addClickBack != undefined) {
					your.addClickBack(index, undefined, undefined, {'index' : index, 'op' : addBtnId});
					if(your.initParam == 'Y') {
						return;
					}
				}
			});
		}
		
		var delBtnId = 'delBtn' + (index + 1);
		isExist = document.getElementById(delBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + delBtnId, function(e) {
				const checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(checkedItems.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'삭제할 행을 선택하여 주십시오.'});
					return;
				}
				
				if(your != undefined && your.delCallBack1 != undefined) {
					your.delCallBack1(index, checkedItems, undefined, {'index' : index, 'op' : delBtnId});
					if(your.initParam == 'Y') {
						return;
					}
				}
				
				var paramPair = {param : [], callBackParam : undefined};
				var message = that.procCallInit(index, 'LD', paramPair, {'index' : index, 'op' : delBtnId}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				var param1 = paramPair['param'];
				that.messageBox({type: 'info', width: '400', height: '145', html: '선택된 행을 삭제 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
					var isInitParam = false;
					if(JSON.stringify(param1['param']) != '[]' && JSON.stringify(param1['param']) != '[{}]' && JSON.stringify(param1['param']) != '"[]"' && JSON.stringify(param1['param']) != '"[{}]"' && param1.length > 0) {
						isInitParam = true;
					}
					var tobeDeleted = [];
					var j = 0;
					var param = [];
					for(var i = 0; i < checkedItems.length; i++) {
						if(checkedItems[i]['item']['NEW'] != 'Y') {
							param[j++] = checkedItems[i].item;
							if(isInitParam) {
								for(key in param1[0]) {
									param[i][key] = param1[0][key];
								}
							}
						}
						
						tobeDeleted[i] = checkedItems[i].rowIndex;
					}

					
					that.splashShow();
					if(param.length > 0) {
						var queryId = your != undefined && your['query' + index] != undefined ? your['query' + index] : that.gridProperty[index]['queryId']
						mom_ajax('LD', queryId, JSON.stringify(param), function(result, data, callBackParam, flag) {
							var message = that.procCallBack(index, 'LD', result, data, param, callBackParam, {'index' : index, 'op' : delBtnId}, your);
							if(message == 'SUCCESS') {
								return;
							}
							
							if(result != 'SUCCESS') {
								that.splashHide();
								that.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});
								
								return;
							} else {
								that.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
							}
							
							/*if(tobeDeleted.length > 0) {
								for(var i = tobeDeleted.length - 1; i >= 0; i--) {
									AUIGrid.removeRow(that.grid[index], tobeDeleted[i]);
								}
							}
							
							that.splashHide();*/
							that.findBtnClicked(index, false, undefined, undefined, {index: index, op: delBtnId, sequence: 2}, your);
						}, undefined, {'index' : index, 'op' : delBtnId}, your);
					} else {
						/*setTimeout(function() {
							if(tobeDeleted.length > 0) {
								for(var i = tobeDeleted.length - 1; i >= 0; i--) {
									AUIGrid.removeRow(that.grid[index], tobeDeleted[i]);
								}
							}
							
							that.splashHide();
						}, 200);*/
						that.findBtnClicked(index, false, undefined, undefined, {index: index, op: delBtnId, sequence: 2}, your);
					}
				}}});
			});
		}
		
		var saveBtnId = 'saveBtn' + (index + 1);
		isExist = document.getElementById(saveBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + saveBtnId, function(e) {
				var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(checkedItems.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'저장할 행을 선택하여 주십시오.'});
					return;
				}
				
				var param = [];
				for(var i = 0; i < checkedItems.length; i++) {
					param.push(checkedItems[i].item);
				}
				
				var paramPair = {param: param, callBackParam : undefined};
				var message = that.procCallInit(index, 'L', paramPair, {index: index, op: saveBtnId}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				param = paramPair['param'];
				that.messageBox({type:"info", width:"400", height: "145", html:"선택된 행을 저장 하시겠습니까?", closeButton:{text:"Close"}, okButton:{text:"OK", after:function() {
					/*var isInitParam = false;
					if(JSON.stringify(param1['param']) != '[]' && JSON.stringify(param1['param']) != '[{}]' && JSON.stringify(param1['param']) != '"[]"' && JSON.stringify(param1['param']) != '"[{}]"' && param1.length > 0) {
						isInitParam = true;
					}
				
					var param = [];
					for(var i = 0; i < checkedItems.length; i++) {
						param[i] = checkedItems[i].item;
						if(isInitParam) {
							for(key in param1[0]) {
								param[i][key] = param1[0][key];
							}
						}
					}*/
					
					that.splashShow();					
					mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data, callBackParam, flag) {
						var message = that.procCallBack(index, 'L', result, data, param, callBackParam, {'index' : index, 'op' : saveBtnId}, your);
						if(message == 'SUCCESS') {
							if(your != undefined && your.saveCallBack) {
								your.saveCallBack('SUCCESS', data, param, callBackParam, {'index' : index, 'op' : saveBtnId});
							} else {
								return;
							}
						}
						
						if(result != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});
							
							return;
						}
						
						that.findBtnClicked(index, true, {}, function(result, data) {
							if(your != undefined && your.retrieveCallBack != undefined) {
								your.retrieveCallBack('SUCCESS', data, param, undefined, {'index' : index, 'op' : saveBtnId}, your);
								return;
							}
							
							AUIGrid.setGridData(that.grid[index], data);
							that.splashHide();
							
							that.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다.'});
						}, {'index' : index, 'op' : saveBtnId}, your);
					}, undefined, {'index' : index, 'op' : saveBtnId}, your);
				}}});
			});
		}
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var updateBtnId = 'updateBtn' + (index + 1);
		isExist = document.getElementById(updateBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + updateBtnId, function(e) {
				var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(checkedItems.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'저장할 행을 선택하여 주십시오.'});
					return;
				}
				
				that.messageBox({type:"info", width:"400", height: "145", html:"선택된 행을 저장 하시겠습니까?", closeButton:{text:"Close"}, okButton:{text:"OK", after:function() {
					var param = [];
					for(var i = 0; i < checkedItems.length; i++) {
						param[i] = checkedItems[i].item;
					}
					var paramPair = {param : param, callBackParam : undefined};
					var message = that.procCallInit(index, 'L', paramPair, undefined, your);
					if(message != 'SUCCESS') {
						that.splashHide();
						that.messageBox({type:'warning', width:'400', height: '145',  html: message});
						
						return;
					}
					param = paramPair['param'];
					
					that.splashShow();
					
					mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data, callBackParam, flag) {
						var message = that.procCallBack(index, 'L', result, data, param, callBackParam, {'index' : index, 'op' : updateBtnId}, your);
						if(message == 'SUCCESS') {
							return;
						}
						
						if(result != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});
							
							return;
						}
						
						that.findBtnClicked(index, true, {}, function(result, data) {
							if(your != undefined && your.retrieveCallBack != undefined) {
								your.retrieveCallBack('SUCCESS', data, param, undefined, undefined, your);
								return;
							}
							
							AUIGrid.setGridData(that.grid[index], data);
							that.splashHide();
							
							that.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다.'});
						}, {'index' : index, 'op' : updateBtnId}, your);
					}, undefined, {'index' : index, 'op' : updateBtnId}, your);
				}}});
			});
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var saveAllBtnId = 'saveAllBtn' + (index + 1);
		isExist = document.getElementById(saveAllBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + saveAllBtnId, function(e) {
				var param = AUIGrid.getGridData(that.grid[index]);
				var paramPair = {param : param, callBackParam : undefined};
				var message = that.procCallInit(index, 'L', paramPair, {index: index, op: saveAllBtnId}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				that.messageBox({type:'info', width:'400', height: '145', html:'저장 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
					param = paramPair['param'];
					
					that.splashShow();					
					mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data, callBackParam, flag) {
						var message = that.procCallBack(index, 'L', result, data, param, callBackParam, {'index' : index, 'op' : saveAllBtnId}, your);
						if(message == 'SUCCESS') {
							return;
						}
						
						if(result != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'danger', width:'400', height: '145', html: '실패하였습니다.'});
							
							return;
						}
						
						that.findBtnClicked(index, true, {}, function(result, data) {
							if(your != undefined && your.retrieveCallBack != undefined) {
								your.retrieveCallBack('SUCCESS', data, param, undefined, {index: index, op: saveAllBtnId, sequence: 2}, your);								
								return;
							}
							
							AUIGrid.setGridData(that.grid[index], data);
							that.splashHide();
							
							that.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다.'});
						}, {index: index, op: saveAllBtnId, sequence: 2}, your);
					}, undefined, {index: index, op: saveAllBtnId, sequence: 1}, your);
				}}});
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 등록 팝업창 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 등록버튼 이벤트 핸들러
	procCreateBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var createBtnId = 'createBtn' + (index + 1);
		
		var isExist = document.getElementById(createBtnId);		
		if(isExist != undefined) {
			$(document).on('click', '#' + createBtnId, function(e) {
				/*if(that.popUpSetting == undefined || that.popUpSetting[index] == undefined) {
					that.messageBox({type:'warning', width:'400', height: '145',  html: '팝업창을 준비중입니다.<br />1 ~ 2 초 뒤에 다시 이용해 주시기 바랍니다.'});
					return;
				}*/
				
				that.createPopUp(index, your);				
				that.popUpDataSetCopy(index, 'NEW', {});
				
				var message = that.procCallInit(index, 'CW', {param : undefined, callBackParam : undefined}, {index : index, op : 'createBtn' + (index + 1)}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				$('#' + that.popUpSetting[index]).momModal('show');
				that.popUpSizeSet(index);
				
				if(your != undefined && your.createCallBack != undefined) {
					your.createCallBack(index, undefined, undefined, {index : index, op : 'createBtn' + (index + 1)});
				}
			});
		}
		
		
	},
	
		// Level 2. 팝업창 생성, by. procCreateBtn, procEditBtn
		createPopUp: function(index, your) {
			var that = this.grid == undefined ? this.momWidget : this;
			
			if(this.popUpSetting[index] != undefined && this.popUpSetting[index].length > 0) {
				for(var loop = 0; loop < this.columnProperty[index].length; loop++) {
					if(this.columnProperty[index][loop]['popUp'] == 'DROPDOWN' 
					&& this.columnProperty[index][loop]['dropDown'] != undefined 
					&& this.columnProperty[index][loop]['dropDown'].length > 0 
					&& this.columnProperty[index][loop]['dropDown'].indexOf('#') > 0) {
						const i = loop;
						
						var tokens = this.columnProperty[index][i]['dropDown'].split('#');
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								//console.log(that.columnProperty[index][i]['dropDown'] + ', isJSON = ' + isJSON)
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											if(drop_down.indexOf('?') > 0) {
												drop_down = drop_down.substring(0, drop_down.indexOf('?') + 1);
											}
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						var data = that.dropDownMap.get(drop_down);
						if(data != undefined) {
							var items = [];
							for(var k = 0; k < data.length; k++) {
								items.push({ label: data[k]['name'], value: data[k]['code'] });
							}
							
							$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
						} else {
							mom_ajax('R', drop_down, {}, function(result, data) {
								if(result != 'SUCCESS' || data.length < 1) {
									$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', []);
									return;
								}
								
								var items = [];
								for(var k = 0; k < data.length; k++) {
									items.push({ label: data[k]['name'], value: data[k]['code'] });
								}
								
								$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
							});
						}						
					} 
				}
				
				return;
			}
			
			var createBtnId = 'createBtn' + (index + 1);
			var isExistCreateBtn = document.getElementById(createBtnId);	
			
			var copyBtnId = 'copyBtn' + (index + 1);
			var isExistCopyBtn = document.getElementById(copyBtnId);
			
			var linkCopyBtnId = 'linkCopyBtn' + (index + 1);
			var isExistLinkCopyBtn = document.getElementById(linkCopyBtnId);
			
			if(!that.gridProperty[index]['editId'] && isExistCreateBtn == undefined && isExistCopyBtn == undefined && isExistLinkCopyBtn == undefined) {
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
							editBoxHtml = this.createPopUpHtml.input().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'NUMBER'	:
							editBoxHtml = this.createPopUpHtml.number().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'NUMBER1'	:
							editBoxHtml = this.createPopUpHtml.number1().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'NUMBER4'	:
							editBoxHtml = this.createPopUpHtml.number4().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'NUMBER6'	:
							editBoxHtml = this.createPopUpHtml.number6().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'DROPDOWN'	:
							editBoxHtml = this.createPopUpHtml.select().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'CALENDAR'	:
							editBoxHtml = this.createPopUpHtml.calendar().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
							break;
						case 'TEXT'		:
							var col1 = this.createPopUpHtml['col1']().replace(/#{headerText}/gi, this.columnProperty[index][i].headerText).replace(/#{labelId}/gi, this.columnProperty[index][i]['dataField'] + (index + 1) + 'Label');
							col1TextArea += col1.replace('#{editBox}', this.createPopUpHtml.textarea().replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							
							break;
						case 'FILE'		:
							editBoxHtml = this.createPopUpHtml.file().replace('#{wSize}', wSize);
							col = col.replace('#{editBox}', editBoxHtml.replace('#{id}', this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)));
							$row.find('.w-row').append(col);
							rowColCount++;
							
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
				var width = Number($select.css('width').replace('px','')) - 2;
				var height = Number($select.css('height').replace('px', '')) - 2;
				var comboOption = {width: width, height: height, dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true};
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
					if(this.columnProperty[index][i]['dropDown'] != undefined 
							&& this.columnProperty[index][i]['dropDown'].length > 0 
							&& this.columnProperty[index][i]['dropDown'].indexOf('#') > 0) {
						var tokens = this.columnProperty[index][i]['dropDown'].split('#');
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								//console.log(that.columnProperty[index][i]['dropDown'] + ', isJSON = ' + isJSON)
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											if(drop_down.indexOf('?') > 0) {
												drop_down = drop_down.substring(0, drop_down.indexOf('?') + 1);
											}
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						var data = that.dropDownMap.get(drop_down);
						if(data != undefined) {
							var items = [];
							for(var k = 0; k < data.length; k++) {
								items.push({ label: data[k]['name'], value: data[k]['code'] });
							}
							
							$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
						} else {
							mom_ajax('R', drop_down, {}, function(result, data) {
								if(result != 'SUCCESS' || data.length < 1) {
									try {
										$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', []);
									} catch(e) {
									}
									
									return;
								}
								
								var items = [];
								for(var k = 0; k < data.length; k++) {
									items.push({ label: data[k]['name'], value: data[k]['code'] });
								}
								
								$('#' + that.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
							});
						}
					} else {
						var width = $('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).width();
						var height = $('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).height() + 4;
						
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).removeClass('w-select');
						
						var items = $('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source');
						var data = this.dropDownMap.get(this.columnProperty[index][i]['dropDown']);
						if(data != undefined) {
							for(var j = 0; j < data.length; j++) {
								items.push({ label: data[j]['name'], value: data[j]['code'] });
							}
						}
						
						/*if(this.columnProperty[index][i]['dropDown'] == 'common.comFacility') {
							console.log(JSON.stringify(data));
						}*/
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
						
						// 2019.05.22 hyjeong begin 확인 필요
						if(!this.columnProperty[index][i]['popUpRead']) {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).find('input').attr('readonly', false);					
						} 
					}
				} 
			}
			
			$('#' + modalId).find('.pop-close-Btn').on('click', function() {
				$('#' + modalId).momModal('hide');			
			});
			
			this.popUpSetting[index] = modalId; 			
			this.popUpSaveCancelBtn(index, your);
		},
		
			// Level 3. 팝업창 생성을 위한 HTML 동적 생성, by createPopUp
			createPopUpHtml: {
				modal : function() {
					var html = 
					     '<div id="#{modalId}" class="modal gridPopup">'
						+'    <div id="panel" class="panel messagebox col2">'
						+'        <div class="panel-body">'
						+'            <div class="panelbody">'
						+'                <div class="w-clearfix panelheader panel-heading">'
						+'                    <div tmpTabId="two" data-undefined="fa-edit" class="w-icon fa fa-edit icon r5"></div>'
						+'                    <div class="textblock">#{modalTitle}</div>'
						+'                    <a href="#" class="w-inline-block bntpopclose pop-close-Btn"></a>'
						+'                </div>'
						+'                <div class="searcharea pop">'
						+'                    <div class="w-form">'
						+'                        <form name="form" id="form#{modalId}" class="form-inline" data-name="Form">'
						+'#{context}'
					   	+'                        </form>'
					   	+'                    </div>'
					   	+'                </div>'
					   	+'            </div>'
					   	+'            <div class="panelfooter">'
					   	+'                <a id="saveBtnEP#{index}" href="#" class="w-inline-block btnpop pop-save-Btn">'
					   	+'                    <div class="textblock">저장</div>'
					   	+'                </a>'
					   	+'                <a id="cancelBtnEP#{index}" href="#" class="w-inline-block btnpop grey pop-close-Btn">'
					   	+'                    <div class="textblock">취소</div>'
					   	+'                </a>'
					   	+'            </div>'
					   	+'        </div>'
					   	+'        <div panelFooter="n" class="panel-footer hide" data-panelFooter="n"></div>'
					   	+'    </div>'
					   	+'</div>';
					
					return html;
				},
				
				row: function() {
					var html = 
						 '<div class="b5">'
						+'    <div class="w-row">'
					   	+'        '
					   	+'    </div>'
					   	+'</div>';
					
					return html;
				},
				
				col1: function() {
					var html = 
						 '<ul class="w-list-unstyled">'
						+'   <li>'
						+'       <div>'
						+'           <div id="#{labelId}" class="col1-label labelbox" style="white-space: nowrap; text-overflow: ellipsis;">'
						+'               <div class="circle #{circle_require}"></div>'
						+'               <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'           </div>'
						+'       	#{editBox}'
						+'       </div>'
						+'   </li>'
						+'</ul>';
					
					return html;
				},
				
				col2: function() {
					var html = 
						 '<div class="w-col w-col-6">'
						+'    <div class="w-clearfix listitem">'
						+'	    <div class="w-col w-col-4">'
						+'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'
						+'	            <div class="circle #{circle_require}"></div>'
						+'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'	        </div>'
						+'       </div>'
						+'	    <div class="w-col w-col-7">'
						+'       	#{editBox}'
						+'       </div>'
						+'    </div>'
						+'</div>';
					
					return html;
				},
				
				col3: function() {
					var html =
						 '<div class="w-col w-col-4">'
						+'    <div class="w-clearfix listitem">'
						+'	    <div class="w-col w-col-5">'
						+'   	     <div id="#{labelId}" class="labelbox" style="width:100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'
						+'	            <div class="circle #{circle_require}"></div>'
						+'	            <div class="textblock #{textblock_require}" title="#{headerText}">#{headerText}</div>'
						+'	        </div>'
						+'       </div>'
						+'	    <div class="w-col w-col-6">'
						+'       	#{editBox}'
						+'       </div>'
						+'    </div>'
						+'</div>';
						
					return html;
				},
				
				input: function() {
					var html = '<input style="float:right;" maxlength="256" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off"></input>';					
					return html;
				},
				
				number: function() {
					var html = '<input style="float:right;" maxlength="100" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number1: function() {
					var html = '<input style="float:right;" maxlength="1" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number4: function() {
					var html = '<input style="float:right;" maxlength="4" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
					return html;
				},
				
				number6: function() {
					var html = '<input style="float:right;" maxlength="6" id="#{id}" input-type="text" type="text" class="w-input fieldbox #{wSize}" autocomplete="off" onkeypress="digit_check(event)" onkeyup="this.value=number_filter(this.value)"></input>';					
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
				},
				
				file: function() {
					var html = '<input name="file" id="file" type="file" accept="image" style="float:right; width:55%;">'
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
					$(document).on('click', '#' + saveBtnEPId, function(e) {
						var paramPair = {param : {}, callBackParam : undefined};
						var param = that.createParam4PopUp(index, paramPair['param']);
						if(param <= 0) {
							setTimeout(function() {
								that.messageBox({type:'warning', width:'400', height: '145', html:that.columnProperty[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								/*if(that.columnProperty[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});*/
							}, 40);
							
							return;
						}
						
						paramPair['param'] = param;		
						var message = that.procCallInit(index, 'L', paramPair, {index: index, op: saveBtnEPId}, your);
						if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						param = paramPair['param'];
						
						that.messageBox({type : 'info', width : '400', height : '145', html : '저장 하시겠습니까?', closeButton : {text : 'Close'}, okButton : {text : 'OK', 
							after:function() {
								$('#' + that.popUpSetting[index]).momModal('hide');
								
								that.splashShow();
								
								that.uploadFlag = 1;
								//console.time('TOBE 등록');
								//that.momAjax('L', that.gridProperty[index]['queryId'], JSON.stringify(param), function(result, data) {
								var param1 = [];
								if(your != undefined && your.paramNull != undefined) {
									param1 = param;
								} else {
									param1[0] = param;
								}
								
								mom_ajax('L', that.gridProperty[index]['queryId'], JSON.stringify(param1), function(result, data) {
									var message = that.procCallBack(index, 'L', result, data, param1, undefined, {'index' : index, 'op' : saveBtnEPId}, your);
									if(message == 'SUCCESS') {
										return;
									} 
									
									that.splashHide();
									
									if(result == 'SUCCESS') {
										that.findBtnClicked(index, false, {}, function(result, data) {
										//that.findBtnClicked(index, false, param, function(result, data) {
											if(your != undefined && your.retrieveCallBack != undefined) {
												your.retrieveCallBack('SUCCESS', data, param1, undefined, {'index' : index, 'op' : saveBtnEPId}, your);
												return;
											}
											
											AUIGrid.setGridData(that.grid[index], data);
											
											that.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다.'});
										}, {'index' : index, 'op' : saveBtnEPId}, your);											
									} else {
										if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
											that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
										} else {
											that.messageBox({type:'danger', width:'400', height: '145', html:'실패하였습니다.'});
										}
									}
								}, undefined, {'index' : index, 'op' : saveBtnEPId}, your);	
							}
						}});
					});
				} 
				
				var cancelBtnEPId = 'cancelBtnEP' + (index + 1);
				isExist = document.getElementById(cancelBtnEPId);
				
				if(isExist != undefined) {
					$(document).on('click', '#' + cancelBtnEPId + ', .bntpopclose', function(e) {
						$('#' + that.popUpSetting[index]).momModal('hide');
					});
				}
			}, 
			
				// Level 4. 팝업창으로부터 파라미터 생성, by popUpSaveCancelBtn
			createParam4PopUp: function(index, param1) {
               var param = param1 == undefined ? {} : param1;
               for(var idx = 0; idx < this.columnProperty[index].length; idx++) {
            	   const i = idx;
            	   if(this.columnProperty[index][i]['popUp'] != undefined) {
            		   /*if(this.columnProperty[index][i]['dataField'] == 'productOrderType') {
            			   console.log(':' + $.trim($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val()) + ':');  
            		   }*/
            		   if(this.columnProperty[index][i]['popUpReq'] && $.trim($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val()) == '') {
                		  if(param1[this.columnProperty[index][i]['dataField']] == undefined || param1[this.columnProperty[index][i]['dataField']] == '') {
                			  return -1 * i;
                		  }
            		   }
                	  
            		   if(param[this.columnProperty[index][i]['dataField']] == undefined) {
            			   param[this.columnProperty[index][i]['dataField']] = $.trim($('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val());
            		   }
            	   }
               }
               
               return param;
            },
			
				// Level 4. 등록 서버 통신, by popUpSaveCancelBtn
				/*momAjax: function(type, url, param, call_back, callBackParam, flag, xxx) {
					var type = (type == 'D' ? 'DELETE' : (type == 'U' ? 'PUT' : 'POST'));
					url = this.contextPath() + '/mom/request/com.thirautech.mom.' + url + '/list';
	
					$.ajax({
						type 		: type,
						url  		: url,
						data 		: param,
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success     : function(data) {
							if(call_back != undefined) {
								if(data['result'] == 'fail') {
									call_back('FAIL', data, callBackParam, flag);
								} else {
									call_back('SUCCESS', data, callBackParam, flag);
								}
							}
						},
						error       : function(error) {
							if(call_back != undefined) {
								call_back('ERROR', error, callBackParam, flag);
							}		
						},
						fail        : function(fail) {
							if(call_back != undefined) {
								call_back('FAIL', fail, callBackParam, flag);
							}
						}
					});
				},*/
		
		// Level 2. 등록 팝업창 열기시 데이터 복사, by procCreateBtn, procEditBtn
		popUpDataSetCopy: function(index, mode, selectedItem) {
			if(mode == 'NEW') {
				for(var idx = 0; idx < this.columnProperty[index].length; idx++) {
					if(this.columnProperty[index][idx]['dataField'] == 'Edit') {
						continue;
					}
					
					const i = idx;
					/*if(this.columnProperty[index][i]['popUpInit'] != undefined) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					} else {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val('');
					}*/
					
					if(this.columnProperty[index][i]['popUpRead'] == 2) {
						if(this.columnProperty[index][i]['popUp'] == 'DATE1') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DATE2') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD HH24:MI:SS'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: true});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', true);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						}					
					} else {
						if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: false});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', false);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', false);
						}	
					}
					
					if(this.columnProperty[index][i]['popUpInit'] != undefined) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					} else {
						if(this.columnProperty[index][i]['popUp'] != 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val('');
						} else {
							var items = $('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source');
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox('source', items);
						}
					}
					
					if(this.columnProperty[index][i]['popUpInit'] != undefined && this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
						if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-MM-01'/* || this.columnProperty[index][i]['popUpInit'] == 'yyyy-mm-01'*/) {
	    					var today = get_date_diff(0);
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today.substring(0, 8) + '01');
	    				} else if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-MM-31') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var nextMonthdd = '';
	    					if(todaydd < 15) {
	    						nextMonthdd = get_date_diff2(today, 40);
	    					} else {
	    						nextMonthdd = get_date_diff2(today, 20);
	    					}
	    					nextMonthdd = nextMonthdd.substring(0, 8) + '01';
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_date_diff2(nextMonthdd, -1));
	    				} else if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-M--01') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var prevMonthdd = '';
	    					if(todaydd < 15) {
	    						prevMonthdd = get_date_diff2(today, -20);
	    					} else {
	    						prevMonthdd = get_date_diff2(today, -40);
	    					}
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(prevMonthdd.substring(0, 8) + '01');
	    				} else if(this.columnProperty[index][i]['popUpInit'] == 'YYYY-M--31') {
	    					var today = get_date_diff(0);	    					
	    					var currentMonth01 = today.substring(0, 8) + '01';
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_date_diff2(currentMonth01, -1));
	    				} else if(this.columnProperty[index][i]['popUpInit'] == 'TODAY'/* || this.columnProperty[index][i]['popUpInit'] == 'today'*/) {
	    					var today = get_date_diff(0);
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(today);
	    				} else if(this.columnProperty[index][i]['popUpInit'].indexOf('TODAY') >= 0/* || this.columnProperty[index][i]['popUpInit'].indexOf('today') >= 0*/) {
	    					var date = this.columnProperty[index][i]['popUpInit'];
	    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
	    					$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_date_diff(diff));
	    				}
					}
				}
			} else if(mode == 'COPY') { 
				selectedItem = selectedItem || {};
				for(var i = 0; i < this.columnProperty[index].length; i++) {
					//$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(selectedItem['' + this.columnProperty[index][i]['dataField']] || '');
					if(this.columnProperty[index][i]['popUpInit'] != undefined && (selectedItem['' + this.columnProperty[index][i]['dataField']] == '' || selectedItem['' + this.columnProperty[index][i]['dataField']] == undefined)) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					} else {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(selectedItem['' + this.columnProperty[index][i]['dataField']] || '');
					}
					
					if(this.columnProperty[index][i]['popUpRead'] == 2) {
						if(this.columnProperty[index][i]['popUp'] == 'DATE1') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DATE2') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD HH24:MI:SS'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: true});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', true);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						}					
					} else {
						if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: false});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', false);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', false);
						}	
					}
				}
			} else {
				selectedItem = selectedItem || {};
				for(var i = 0; i < this.columnProperty[index].length; i++) {
					if(this.columnProperty[index][i]['popUpInit'] != undefined && (selectedItem['' + this.columnProperty[index][i]['dataField']] == '' || selectedItem['' + this.columnProperty[index][i]['dataField']] == undefined)) {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(this.columnProperty[index][i]['popUpInit']);
					} else {
						$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(selectedItem['' + this.columnProperty[index][i]['dataField']] || '');
					}
						
					if(this.columnProperty[index][i]['popUpRead'] == 1 || this.columnProperty[index][i]['popUpRead'] == 2) {
						if(this.columnProperty[index][i]['popUp'] == 'DATE1') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DATE2') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).val(get_current_date('YYYY-MM-DD HH24:MI:SS'));
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						} else if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: true});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', true);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', true);
						}					
					} else {
						if(this.columnProperty[index][i]['popUp'] == 'DROPDOWN') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).jqxComboBox({disabled: false});
						} else if(this.columnProperty[index][i]['popUp'] == 'CALENDAR') {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).prop('disabled', false);
						} else {
							$('#' + this.columnProperty[index][i]['dataField'] + 'EP' + (index + 1)).attr('readonly', false);
						}	
					}
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
	// 팡업창 닫기 버튼 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// cancelBtn3, bntpopclose
	procPopUpCancelBtn: function(index, your) {
		var that = this;
		
		var cancelBtn3Id = 'cancelBtn' + (index + 1);
		var isExist = document.getElementById(cancelBtn3Id);		
		if(isExist != undefined) {
			$(document).on('click', '.bntpopclose, #cancelBtn' + (index + 1), function() {
				$('#listPop' + (index / 2)).momModal('hide');
				if(your != undefined && your.popUpCancelBtnCallBack != undefined) {
					your.popUpCancelBtnCallBack(index);
				}
				if(your != undefined && your.currentEnterKeyIndex != undefined) {
					your.currentEnterKeyIndex = 0;
				}
			});
		}
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Edit 버튼 이벤트 핸들러
	procEditBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(that.gridProperty[index]['editId'] == undefined || that.gridProperty[index]['editId'] == false || that.gridProperty[index]['editId'] == '') {
			return;
		}
		
		//var editPop = document.getElementById('editPop' + (index + 1));
		
		//그리드 edit버튼
		$(document).on('click', '.GridEditBtn' + (index + 1), function(e) {
			//console.time('TOBE 등록창 열기');
			/*if(that.popUpSetting == undefined || that.popUpSetting[index] == undefined) {
				that.messageBox({type:'warning', width:'400', height: '145',  html: '팝업창을 준비중입니다.<br />1 ~ 2 초 뒤에 다시 이용해 주시기 바랍니다.'});
				return;
			}*/
			
			var rowIndex = $(this).attr('row-index');		 		
			var selectedItem = AUIGrid.getItemByRowIndex(that.grid[index], rowIndex);	
						
			that.createPopUp(index, your);
			that.popUpDataSetCopy(index, 'EDIT', selectedItem);
			
			var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'editBtn' + (index + 1)}, your);
			if(message != 'SUCCESS') {
				that.splashHide();
				that.messageBox({type:'warning', width:'400', height: '145',  html: message});
				
				return;
			}
			
			$('#' + that.popUpSetting[index]).momModal('show');
			that.popUpSizeSet(index);	
			if(your != undefined && your.createCallBack != undefined) {
				your.createCallBack(index, undefined, undefined, {index : index, op : 'createBtn' + (index + 1)});
			}
		});
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 복사 팝업창 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 복사버튼 이벤트 핸들러
	procCopyBtn: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var copyBtnId = 'copyBtn' + (index + 1);
		var linkCopyBtn = 'linkCopyBtn' + (index + 1); 
		var isExist = document.getElementById(copyBtnId);		
		
		if(isExist != undefined) {
			$(document).on('click', '#' + copyBtnId, function(e) {
				var selectedItem = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(selectedItem.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'복사할 행을 선택하여 주십시오.'});					
					return;
				}
				
				if(selectedItem.length > 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'복사할 행을 한개만 선택하여 주십시오.'});					
					return;
				}
				
				/*if(that.popUpSetting == undefined || that.popUpSetting[index] == undefined) {
					that.messageBox({type:'warning', width:'400', height: '145',  html: '팝업창을 준비중입니다.<br />1 ~ 2 초 뒤에 다시 이용해 주시기 바랍니다.'});
					return;
				}*/
				
				selectedItem = 	selectedItem[0].item;
				
				that.createPopUp(index, your);
				that.popUpDataSetCopy(index, 'COPY', selectedItem);
				
				var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'copyBtn' + (index + 1)}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				$('#' + that.popUpSetting[index]).momModal('show');
				that.popUpSizeSet(index);				
			});
		}
		
		isExist = document.getElementById(linkCopyBtn);		
		if(isExist != undefined) {
			$(document).on('click', '#' + linkCopyBtn, function(e) {
				var selectedItem = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(selectedItem.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'복사할 행을 선택하여 주십시오.'});					
					return;
				}
				
				if(selectedItem.length > 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'복사할 행을 한개만 선택하여 주십시오.'});					
					return;
				}
				
				selectedItem = 	selectedItem[0].item;
				
				that.createPopUp(index, your);
				that.popUpDataSetCopy(index, 'COPY', selectedItem);
				
				var message = that.procCallInit(index, 'CW', {param : selectedItem, callBackParam : undefined}, {index : index, op : 'linkCopyBtn' + (index + 1)}, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				$('#' + that.popUpSetting[index]).momModal('show');
				that.popUpSizeSet(index);
				
				if(your != undefined && your.createCallBack != undefined) {
					your.createCallBack(index, selectedItem, undefined, {index : index, op : 'linkCopyBtn' + (index + 1)});
				}
			});
		}
		
		var downBtnId = 'downBtn' + (index + 1);
		isExist = document.getElementById(downBtnId);
		
		if(isExist != undefined) {
			$(document).on('click', '#' + downBtnId, function(e) {
				var selectedItems1 = AUIGrid.getCheckedRowItems(that.grid[index]);
				if(selectedItems1.length < 1) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'내릴 행을 선택하여 주십시오.'});					
					return;
				}
				
				var selectedItems = [];
				for(var i = 0; i < selectedItems1.length; i++) {
					selectedItems[i] = selectedItems1[i].item;
				}
				
				AUIGrid.clearGridData(that.grid[index + 1]);
				setTimeout(function() {
					AUIGrid.setGridData(that.grid[index + 1], selectedItems);
				}, 0);	
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Excel Download 관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 엑셀 다운로드 버튼 핸들러
	procExcelDown: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelDownBtnId = 'excelDownBtn' + (index + 1);
		var isExist = document.getElementById(excelDownBtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			$(document).on('click', '#' + excelDownBtnId, function(e) {
				if(that.entireDatas[index] == undefined || that.entireIsDone[index] == undefined) {
					that.messageBox({type:'warning', width:'400', height: '145', html:'조회된 데이터가 존재하지 않습니다.'});					
					return;
				}
				
				if(that.excelGrid[index] == undefined) {
					$('body').append('<div id="temp_div1_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index + 1)  + '"></div></div>');
					
					var excelProperty = JSON.parse(JSON.stringify(that.columnProperty[index]));
					if(your != undefined && your['excelDownCallInit'] != undefined) {
						your.excelDownCallInit(index, undefined, undefined, undefined);
					}
					if(your != undefined && your['excelDownParam'] != undefined) {
						excelProperty = JSON.parse(JSON.stringify(your['excelDownParam']));
					}
					
					for(var i = excelProperty.length - 1; i >= 0 ; i--) {
						if(!excelProperty[i]['excelHide']) {
							excelProperty.splice(i, 1);
						} else if(!excelProperty[i]['visible']) {
							excelProperty[i]['visible'] = true;
						}
					}
					
					if(your != undefined && your['excelGridProperty'] != undefined) {
						var excelGridProperty = your['excelGridProperty'];
						that.excelGrid[index] = AUIGrid.create('#excelGrid' + (index + 1), excelProperty, excelGridProperty);
					} else {
						that.excelGrid[index] = AUIGrid.create('#excelGrid' + (index + 1), excelProperty, {showRowNumColumn: false});
					}
				} 
				
				if(that.entireIsDone[index] != 'DONE') {
					/*that.splashShow();
					that.excelDelay(index, pageId);*/
					that.messageBox({type:'warning', width:'400', height: '145',  html: '데이터의 양이 많습니다.<br />잠시 뒤에 다시 이용해 주시기 바랍니다.'});					
					return;
				}
				
				/*
				 * 20200108 / pyj / 엑셀 다운 시 5만건 이상이면 다운 안되는 벨리데이션 삭제(페이지 다운되지 않아서 필요x)
				 */
//				if(that.entireDatas[index].length > 50000) {
//					that.messageBox({type:'warning', width:'400', height: '145',  html: '데이터의 건수가 50,000건 이상입니다.<br />다운로드를 지원하지 않습니다.'});					
//					return;
//				}
				
				if(your != undefined && your.excelDownInit != undefined) {
					your.excelDownInit(index, e);
				}
				
				AUIGrid.setGridData(that.excelGrid[index], that.entireDatas[index]);	
				
				var fileName = '';
				if(pageId.indexOf('MOMBD002') >= 0) {
					fileName = 'PRODUCTION_PLAN_MOMBD002_' + get_current_date('yyyy-mm-dd');
				} else {
					fileName = pageId + '_' + get_current_date('yyyy-mm-dd');
				}
				
				var option = {fileName: fileName};
				option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					//AUIGrid.clearGridData(that.excelGrid[index]);
					
					$('#temp_div1_' + (index + 1)).remove();
					AUIGrid.destroy(that.excelGrid[index]);
					that.excelGrid[index] = undefined;
				}
				
				option.progressBar = true;
				
				AUIGrid.exportToXlsx(that.excelGrid[index], option);
				
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
			});
		}
		
		var specExcelDownBtnId = 'specExcelDownBtn' + (index + 1);
		isExist = document.getElementById(specExcelDownBtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			$(document).on('click','#' + specExcelDownBtnId,function() {
				that.exportToXlsx(index, pageId + '_' + get_current_date('yyyy-mm-dd'));
				return;
	        });	
		}
	},
	
	// 엑셀 다운로드 버튼 핸들러
	procExcelDownAll: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelDownAllBtnId = 'excelDownAllBtn' + (index + 1);
		var isExist = document.getElementById(excelDownAllBtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			$(document).on('click', '#' + excelDownAllBtnId, function(e) {
				var options = [];
				var fileName = '';
				for(var index2 = 0; index2 < that.excelGrid.length; index2++) {
					if(that.grid[index2] == undefined) {
						continue;
					}
					
					const index1 = index2;
					if(that.excelGrid[index1] == undefined) {
						if(that.columnProperty[index1] == undefined) {
							continue;
						} else {
							$('body').append('<div id="temp_div2_' + (index1 + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index1 + 1)  + '"></div></div>');
							
							if(JSON.stringify(that.columnProperty[index1]).length < 4) {
								continue;
							}
							
							var excelProperty1 = JSON.parse(JSON.stringify(that.columnProperty[index1]));
							for(var i = excelProperty1.length - 1; i >= 0 ; i--) {
								if(!excelProperty1[i]['excelHide']) {
									excelProperty1.splice(i, 1);
								} else if(!excelProperty1[i]['visible']) {
									excelProperty1[i]['visible'] = true;
								}
							}
							
							const excelProperty = excelProperty1;							
							that.excelGrid[index1] = AUIGrid.create('#excelGrid' + (index1 + 1), excelProperty, {showRowNumColumn: false});
						}
					}
					
					if(that.excelGrid[index1] != undefined && that.entireDatas[index1] != undefined) {
						AUIGrid.setGridData(that.excelGrid[index1], that.entireDatas[index1]);	
					}
					
					if(fileName == '') {
						fileName = pageId + '_' + get_current_date('yyyy-mm-dd');
					}
					
					var option = {sheetName: 'Sheet' + (index1 + 1), fileName: fileName};
					options.push(option);
				}
				
				options.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
					$('.aui-grid-export-progress-modal').remove();
					
					for(var index1 = 0; index1 < that.excelGrid.length; index1++) {
						if(that.excelGrid[index1] != undefined) {
							$('#temp_div2_' + (index1 + 1)).remove();
							AUIGrid.destroy(that.excelGrid[index1]);
							that.excelGrid[index1] = undefined
						}
					}
				}
				
				options.progressBar = true;
				
				var start = 0;				
				var excelGrids = [];
				for(var index1 = start + 1; index1 < that.excelGrid.length; index1++) {
					if(that.excelGrid[index1] != undefined) {
						excelGrids.push(that.excelGrid[index1]);
					}
				}
				
				AUIGrid.exportToXlsxMulti(that.excelGrid[start], excelGrids, options);
				
				$('.aui-grid-export-progress-modal').height('100%');
				$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));				
			});
		}
	},
		
	procExcelDownAll2: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelDownAll2BtnId = 'excelDownAll2Btn' + (index + 1);
		var isExist = document.getElementById(excelDownAll2BtnId);
		if(isExist != undefined) {
			const pageId = pageId1;
			var options = [];
			var fileName = '';
			for(var index2 = 0; index2 < that.excelGrid.length; index2++) {
				if(that.grid[index2] == undefined) {
					continue;
				}
				
				const index1 = index2;				
				if(that.excelGrid[index1] == undefined) {
					if(that.columnProperty[index1] == undefined) {
						continue;
					} else {
						$('body').append('<div id="temp_div2_' + (index1 + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelGrid' + (index1 + 1)  + '"></div></div>');
						
						var excelProperty1 = JSON.parse(JSON.stringify(that.columnProperty[index1]));
						for(var i = excelProperty1.length - 1; i >= 0 ; i--) {
							if(!excelProperty1[i]['excelHide']) {
								excelProperty1.splice(i, 1);
							} else if(!excelProperty1[i]['visible']) {
								excelProperty1[i]['visible'] = true;
							}
						}
						
						const excelProperty = excelProperty1;
						that.excelGrid[index1] = AUIGrid.create('#excelGrid' + (index1 + 1), excelProperty, {showRowNumColumn: false});
					}
				}
				
				AUIGrid.setGridData(that.excelGrid[index1], that.entireDatas[index1]);					
				if(fileName == '') {
					fileName = pageId + '_' + get_current_date('yyyy-mm-dd');
				}
				
				var option = {sheetName: 'Sheet' + (index1 + 1), fileName: fileName};
				options.push(option);
			}
			
			options.afterRequestCallback = function() { 
				$('.aui-grid-export-progress-modal').remove();
				
				for(var index1 = 0; index1 < that.excelGrid.length; index1++) {
					if(that.excelGrid[index1] != undefined) {
						$('#temp_div2_' + (index1 + 1)).remove();
						AUIGrid.destroy(that.excelGrid[index1]);
						that.excelGrid[index1] = undefined
					}
				}
			}
			
			options.progressBar = true;
			
			var start = 0;
			var excelGrids = [];
			for(var index1 = start + 1; index1 < that.excelGrid.length; index1++) {
				if(that.excelGrid[index1] != undefined) {
					excelGrids.push(that.excelGrid[index1]);
				} 
			}
			
			AUIGrid.exportToXlsxMulti(that.excelGrid[start], excelGrids, options);
			
			$('.aui-grid-export-progress-modal').height('100%');
			$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));				
		}
	},
	
		excelDelay: function(index, pageId, gridId) {
			var that = this.grid == undefined ? this.momWidget : this;
			
			setTimeout(function(index, pageId, gridId) {
				if(that.entireIsDone[index] != 'DONE') {
					that.excelDelay(index, pageId, gridId);
				} else {
					//AUIGrid.clearGridData(that.excelGrid[index]);
					AUIGrid.setGridData(that.excelGrid[index], /*items*/that.entireDatas[index]);	
					
					var option = {fileName : pageId + '_' + get_current_date('yyyy-mm-dd')};
					option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
						$('.aui-grid-export-progress-modal').remove();
						$('#temp_div1_' + (index + 1)).remove();
						AUIGrid.destroy(that.excelGrid[index]);
						that.excelGrid[index] = undefined;
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
	procExcelTemplateDown: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelTemplateBtnId = 'excelTemplateBtn' + (index + 1);
		var isExist = document.getElementById(excelTemplateBtnId);
		if(isExist == undefined) {
			return;
		}
		
		const pageId = pageId1;
		$(document).on('click', '#' + excelTemplateBtnId, function(e) {
			var items = AUIGrid.getGridData(that.grid[index]);
			
			$('head').append('<style>.back-red{background-color: #ff8000;}</style>');
			$('body').append('<div id="temp_div3_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="excelTemplateGrid' + (index + 1)  + '"></div></div>');
			
			var excelTemplateProperty = JSON.parse(JSON.stringify(that.columnProperty[index]));
			if(your != undefined && your['excelTemplateDownCallInit'] != undefined) {
				your.excelTemplateDownCallInit(index, excelTemplateProperty, undefined, undefined);
			}
			if(your != undefined && your['excelTemplateDownParam'] != undefined) {
				excelTemplateProperty = JSON.parse(JSON.stringify(your['excelTemplateDownParam']));
			}
			
			for(var i = excelTemplateProperty.length - 1; i >= 0 ; i--) {
				if(excelTemplateProperty[i]['excelTemplateHide'] == 1) {
					excelTemplateProperty[i]['visible'] = true;
					excelTemplateProperty[i]['headerStyle'] = 'back-red';
				} else if(excelTemplateProperty[i]['excelTemplateHide'] == 2) {
					excelTemplateProperty[i]['visible'] = true;
				} else {
					excelTemplateProperty.splice(i, 1);
				}
			}
			
			that.excelTemplateGrid[index] = AUIGrid.create('#excelTemplateGrid' + (index + 1), excelTemplateProperty, {showRowNumColumn: false});
			
			if(that.entireDatas[index] != undefined && that.entireDatas[index].length > 0) {
				AUIGrid.setGridData(that.excelTemplateGrid[index], that.entireDatas[index].slice(0, 1));	
			}
			
			if(pageId == 'MOMNA004') {
				var kpiType = [];
				mom_ajax('R', 'eis.qualityStatus.qualityKpiType', {qaSeq: (index+1)}, function(result, data) {
					if(result != 'SUCCESS') {
						return;
					}
					if(data.length > 0) {
						for(var i = 0; i < data.length; i++) {
							kpiType.push(data[i]);
						}
					}
				}, undefined, undefined, this, 'async');
	            AUIGrid.setGridData(that.excelTemplateGrid[index], kpiType); 
	         }
			
			var fileName = '';
			if(pageId.indexOf('MOMBA003') >= 0) {
				fileName = 'SALES_ORDER_UPLOAD(PO)_MOMBA003_' + get_current_date('yyyy-mm-dd');
			} else {
				fileName = pageId + '_template_' + get_current_date('yyyy-mm-dd');
			} 
			
			var option = {fileName : fileName};
			option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
				$('.aui-grid-export-progress-modal').remove();
				//AUIGrid.clearGridData(that.excelTemplateGrid[index]);	
				
				$('#temp_div3_' + (index + 1)).remove();
				AUIGrid.destroy(that.excelTemplateGrid[index]);
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
	procExcelUpload: function(index, pageId1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		var excelUpBtnId = 'excelUpBtn' + (index + 1);
		var isExist = document.getElementById(excelUpBtnId);
		if(isExist == undefined) {
			return;
		}
		
		var excelPopExistId = 'excelPopExist' + (index + 1); 
		isExist = document.getElementById(excelPopExistId);
		if(isExist) {
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpInit != undefined) {
					your.excelUpInit(index, e);
					if(your != undefined && your.excelUpInitParam != undefined) {
						if(your['initMessage'] != undefined) {
							var err = your['initMessage'];
							that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
							your['initMessage'] = undefined;
							return;
						}
					}
				}
				$('#file' + (index + 1)).val('');
				$('#uploadFileName' + (index + 1)).val('');
				$('#' + excelPopExistId).momModal('show');
			});
			
			$(document).on('click', '#fileBtn' + (index + 1), function(e) {
				$('#file' + (index + 1)).click();
			});
			
			$(document).on('change', '#file' + (index + 1), function(e) {
				$('#uploadFileName' + (index + 1)).val('');
				$('#uploadFileName' + (index + 1)).val($('#file' + (index + 1)).val());
			});
			
			$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelPopExistId).momModal('hide');	
			});
			
			return;
		} 
		
		var excelPopId = 'excelPop' + (index + 1);
		isExist = document.getElementById(excelPopId);
		var isEnter = false;
		if(isExist) {
			isEnter = true;
			$('#' + excelPopId + ' .searcharea').css({'padding' : '5px 5px 0'});
			$('#' + excelPopId + ' .searcharea from').attr('id', 'fileUploadForm');
			$('#' + excelPopId + ' .searcharea form').html('<input name="file' + (index + 1) + '" id="file' + (index + 1) + '" type="file" accept=".xlsx, .xls" style="width:100%;">');
		
			$(document).on('click', '#' + excelUpBtnId, function(e) {
				if(your != undefined && your.excelUpInit != undefined) {
					your.excelUpInit(index, e);
					if(your['initMessage'] != undefined) {
						var err = your['initMessage'];
						that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
						your['initMessage'] = undefined;
						return;
					}
				}
				$('#file' + (index + 1)).val('');
				$('#' + excelPopId).momModal('show');
			});
			
			const pageId = pageId1;
			$(document).on('click', '#saveBtnEX' + (index + 1), function(e) {
				$('#' + excelPopId).momModal('hide');
				that.uploadFlag = 2;
				//var param = [{}];
				var param = {};
				
				that.splashShow();
				var file;
				if(index == 0) {
					file = file1;
				} else if(index == 1) {
					file = file2;
				} else if(index == 2) {
					file = file3;
				} else if(index == 3) {
					file = file4;
				} else if(index == 4) {
					file = file5;
				} else if(index == 5) {
					file = file6;
				} 
				if(your != undefined && your.excelUpCallInit != undefined) {
					your.excelUpCallInit(index, undefined, undefined, {index: index, op: 'saveBtnEX' + (index + 1)});
					if(your.initParam != undefined) {
						param = your.initParam;
					}
				}
				
				if(your != undefined && your.initParam != undefined) {
					param = your.initParam;
				}
				
				excel_upload(file, that.gridProperty[index]['queryId'], pageId, that.grid[index], JSON.stringify(param), function(result, data) {
					if(result == 'SUCCESS') {
						that.findBtnClicked(index, true, {}, function(result, data) {
							if(your != undefined && your.retrieveCallBack != undefined) {
								your.retrieveCallBack('SUCCESS', data, param, undefined, {'index' : index, 'op' : 'saveBtnEX' + (index + 1)}, your);							
								return;
							}
							
							AUIGrid.setGridData(that.grid[index], data);
							
							that.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다.'});
						}, {'index' : index, 'op' : 'saveBtnEX' + (index + 1)}, your);						
					} else {
						//that.splashHide();
						if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 0) {
							that.messageBox({type:'danger', width:'400', height: '145', html:Language.getLang(data['p_err_msg'])});
						} else {
							that.messageBox({type:'danger', width:'400', height: '145', html:'실패하였습니다.'});
						}
					}
				}, undefined, {'index' : index, 'op' : 'saveBtnEX' + (index + 1)}, your);
			});
			
			$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelPopId).momModal('hide');	
			});
		}   
		
		var excelGridId = 'excelGrid' + (index + 1);
		isExist = document.getElementById(excelGridId);
		if(isExist) {
			if(!isEnter) {
				$('#' + excelGridId + ' .searcharea').css({'padding' : '5px 5px 0'});
				$('#' + excelGridId + ' .searcharea from').attr('id', 'excelGridForm');
				$('#' + excelGridId + ' .searcharea form').html('<input name="gridFile' + (index + 1) + '" id="gridFile' + (index + 1) + '" type="file" accept=".xlsx, .xls" style="width:100%;">');
			
				$(document).on('click', '#' + excelUpBtnId, function(e) {
					if(your != undefined && your.excelUpInit != undefined) {
						your.excelUpInit(index, e);
						if(your != undefined && your.excelUpInitParam != undefined) {
							if(your['initMessage'] != undefined) {
								var err = your['initMessage'];
								that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
								your['initMessage'] = undefined;
								return;
							}
						}
					}
					
					$('#' + excelGridId).momModal('show');
					$('#file' + (index + 1)).val('');
				});
			}
			
			$(document).on('click', '#saveBtnEX' + (index + 1), function(e) {
				$('#' + excelGridId).momModal('hide');
				that.uploadFlag = 2;
				var param = [{}];
				
				//that.splashShow();
				var file;
				if(index == 0) {
					file = gridFile1;
				} else if(index == 1) {
					file = gridFile2;
				} else if(index == 2) {
					file = gridFile3;
				} else if(index == 3) {
					file = gridFile4;
				} else if(index == 4) {
					file = gridFile5;
				} else if(index == 5) {
					file = gridFile6;
				} 
				
				excel_upload_new(file, that.grid[index], function() {
					that.uploadFlag = 0; // uploadFlag가 2로 설정돼서 웹엑셀 업로드 후 조회버튼 누르면 성공했다는 메세지가 나오는 현상 수정
					that.splashHide();
					if(your != undefined && your.excelGridCallBack) {
						your.excelGridCallBack(index);
					}
				});
			});
			
			$(document).on('click', '#cancelBtnEX' + (index + 1) + ', ' + '.bntpopclose', function(e) {
				$('#' + excelGridId).momModal('hide');	
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Calendar Component
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 달력 컴포넌트	
	procCalendar: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		//var $form = $('#form');
		var $form = $('.form-inline');
		var $objs = $form.find('input');
		
		for (var i = 0; i < $objs.length; i++) {
			var $obj = $($objs[i]);
			$.datetimepicker.setLocale('ko');
			if($obj.attr('input-type') == 'datepicker') {
				var dataFormat = $obj.attr('data-format') || 'Y-m-d';
                var dateFormat = ($obj.attr('date-format') || '').toLocaleLowerCase();
                
                var options = {
                    format: dataFormat,
                    formatDate: dataFormat,
                    step: 60
                };
                
                if(dateFormat.indexOf('time') < 0 && dateFormat.indexOf('date') < 0) {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf('time') > -1,
                        datepicker: true
                    });
                } else {
                    $.extend(options, {
                        timepicker: dateFormat.indexOf('time') > -1,
                        datepicker: dateFormat.indexOf('date') > -1,
                    });
                }
                
                if(dataFormat == 'Y-m') {
                    $.extend(options, {
                        onGenerate: function (a, b) {
                            var clone = $($(".xdsoft_datetimepicker[style*='display: block']").find('tr')[2]).find('td:first').clone();
                            clone.css('width', '1%');
                            clone.html("<div style='text-align:center'>OK</div>");
                            $(".xdsoft_datetimepicker[style*='display: block']").find(".xdsoft_calendar").html(clone);
                        },
                        onShow: function (a, b) {
                            var picker = $('.xdsoft_datetimepicker');
                            $.each(picker, function (i, v) {
                                var clone = $($(v).find('tr')[2]).find('td:first').clone();
                                clone.css('width', '1%');
                                clone.html("<div style='text-align:center'>OK</div>");
                                $(v).find('.xdsoft_calendar').html(clone);
                            });
                        }
                    });
                }
                
                $obj.datetimepicker(options);
                
                if(that.searchFilter[index] == undefined || that.searchFilter[index].length == 0) {
                	return;
                }
                for(var loop = 0; loop < that.searchFilter[index].length; loop++) {
                	if(that.searchFilter[index][loop]['popUpInit'] != undefined && that.searchFilter[index][loop]['popUp'] == 'CALENDAR' && that.searchFilter[index][loop]['dataField'] == $obj.attr('id')) {
        				if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-MM-01'/* || that.searchFilter[index][loop]['popUpInit'] == 'yyyy-mm-01'*/) {
        					var today = get_date_diff(0);
        					$('#' + that.searchFilter[index][loop]['dataField']).val(today.substring(0, 8) + '01');
        				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-MM-31') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var nextMonthdd = '';
	    					if(todaydd < 15) {
	    						nextMonthdd = get_date_diff2(today, 40);
	    					} else {
	    						nextMonthdd = get_date_diff2(today, 20);
	    					}
	    					nextMonthdd = nextMonthdd.substring(0, 8) + '01';
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff2(nextMonthdd, -1));
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-M--01') {
	    					var today = get_date_diff(0);	    					
	    					var todaydd = parseInt(today.substring(8, 10));
	    					var prevMonthdd = '';
	    					if(todaydd < 15) {
	    						prevMonthdd = get_date_diff2(today, -20);
	    					} else {
	    						prevMonthdd = get_date_diff2(today, -40);
	    					}
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(prevMonthdd.substring(0, 8) + '01');
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'YYYY-M--31') {
	    					var today = get_date_diff(0);	    					
	    					var currentMonth01 = today.substring(0, 8) + '01';
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff2(currentMonth01, -1));
	    				} else if(that.searchFilter[index][loop]['popUpInit'] == 'TODAY' || that.searchFilter[index][loop]['popUpInit'] == 'today') {
        					var today = get_date_diff(0);
        					$('#' + that.searchFilter[index][loop]['dataField']).val(today);
        				} else if(that.searchFilter[index][loop]['popUpInit'].indexOf('TODAY') >= 0 || that.searchFilter[index][loop]['popUpInit'].indexOf('today') >= 0) {
	    					var date = that.searchFilter[index][loop]['popUpInit'];
	    					var diff = parseInt(date.substring(5, date.length).replace(/ /gi,''));
	    					$('#' + that.searchFilter[index][loop]['dataField']).val(get_date_diff(diff));
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
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(index == undefined) {// && that.grid != undefined) {
			for(var i = 0; i < that.grid.length; i++) {
				if(that.grid[i] == undefined || document.getElementById('grid' + (index + 1)) == undefined) {
	                  continue;
	            }
				
				AUIGrid.resize(that.grid[i]);
				
				var height = document.getElementById('grid' + (index + 1)).children[0].clientHeight;
				var width = document.getElementById('grid' + (index + 1)).children[0].clientWidth;
				
				$(that.grid[i]).find('.aui-grid').css('height', height + 17 + 'px');
				$(that.grid[i]).find('.aui-grid').css('width', width + 17 + 'px');

				AUIGrid.resize(that.grid[i]);
			}
		} else {// if(index != undefined && that.grid != undefined && that.grid[i] != undefined && document.getElementById('grid' + (index + 1)) != undefined) {
			const i = index;
			$(window).resize(function() {
				setTimeout(function() {
					AUIGrid.resize(that.grid[i]);
					
					var height = document.getElementById('grid' + (i + 1)).children[0].clientHeight;
					var width = document.getElementById('grid' + (i + 1)).children[0].clientWidth;
					
					$(that.grid[i]).find('.aui-grid').css('height', height + 17 + 'px');
					$(that.grid[i]).find('.aui-grid').css('width', width + 17 + 'px');
	
					AUIGrid.resize(that.grid[i]);
				}, 100);
			});	
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 함수  관련
	procCallInit: function(index, action, param, indexInfo, your) {
		if(your == undefined) {
			return 'SUCCESS';
		} else if(indexInfo != undefined && indexInfo['op'] != undefined && indexInfo['row'] != undefined && indexInfo['sequence'] == 1 && this.processTran[indexInfo['index']][indexInfo['row']]['message'] == 'ACTION' && this.processTran[indexInfo['index']][indexInfo['row']]['filter']) {
			return 'SUCCESS';
		}
		//var procFunction = undefined;
		
		if(action == 'CW' && your.createCallInit != undefined) {
			your.createCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'E' && your.excelCallInit != undefined) {
			your.excelCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'R' && your.retrieveCallInit != undefined) {
			your.retrieveCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'C' || action == 'L') && your.saveCallInit != undefined) {
			if(action == 'C') {
				var param1 = [];
				param1[0] = param['param'];
				your.saveCallInit(index, param1, param['callBackParam'], indexInfo);
			} else {
				your.saveCallInit(index, param['param'], param['callBackParam'], indexInfo);
			}
		} else if((action == 'D' || action == 'LD') && your.delCallInit != undefined) {
			if(action == 'D') {
				var param1 = [];
				param1[0] = param['param'];
				your.delCallInit(index, param1, param['callBackParam'], indexInfo);
			} else {
				your.delCallInit(index, param['param'], param['callBackParam'], indexInfo);
			}
		} else if((action == 'U') && your.updateCallInit != undefined) {
			your.updateCallInit(index, param['param'], param['callBackParam'], indexInfo);
		}
		
		if(your['initMessage'] != undefined) {
			var err = your['initMessage'];
			your['initMessage'] = undefined;			
			if(err != 'CLEAR_PARAM') {
				return err;
			}
			
			if(err == 'CLEAR_PARAM' || param['param'] == undefined) {
				if(action = 'R') {
					param['param'] = this.createParam4Form(index, '#form');
				} else if(action == 'E' || action == 'C' || action == 'D' || action == 'U') {
					param['param'] = {};
				} else {
					param['param'] = [];
				}
			}
		}
		
		if(action == 'CW') {
			return 'SUCCESS';
		}
		
		if(param['param'] != undefined && your['initParam'] != undefined) {
			if(JSON.stringify(param['param']) == '{}' || JSON.stringify(param['param']) == '"{}"') {
				param['param'] = your['initParam'];
    		} else if(JSON.stringify(param['param']) == '[]' || JSON.stringify(param['param']) == '[{}]' || JSON.stringify(param['param']) == '"[]"' || JSON.stringify(param['param']) == '"[{}]"') {
    			param['param'][0] = your['initParam'];
    		} else {
				for(key in your['initParam']) {
					if(param['param'].length == undefined || (your != undefined && your.paramNull != undefined)) {
						if(key == 0 && your != undefined && your.paramNull != undefined) {
							param['param'] = [];
						}
						param['param'][key] = your['initParam'][key];
					} else {
						for(var i = 0; i < param['param'].length; i++) {
							param['param'][i][key] = your['initParam'][key];
						}
					}
				}
    		}
		}
		
		return 'SUCCESS';
	},
	
	procCallInitTran: function(index, action, param, indexInfo, your) {
		if(your == undefined) {
			return 'SUCCESS';
		}
		
		if(action == 'CW' && your.createCallInit != undefined) {
			your.createCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'E' && your.excelCallInit != undefined) {
			your.excelCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if(action == 'R' && your.retrieveCallInit != undefined) {
			your.retrieveCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'C' || action == 'L') && your.saveCallInit != undefined) {
			your.saveCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'D' || action == 'LD') && your.delCallInit != undefined) {
			your.delCallInit(index, param['param'], param['callBackParam'], indexInfo);
		} else if((action == 'U') && your.updateCallInit != undefined) {
			your.updateCallInit(index, param['param'], param['callBackParam'], indexInfo);
		}
		
		if(your['initMessage'] != undefined) {
			var err = your['initMessage'];
			your['initMessage'] = undefined;
			
			if(err != 'CLEAR_PARAM') {
				return err;
			} else if(err == 'CLEAR_PARAM' || param['param'] == undefined) {
				if(action == 'E' || action == 'R' || action == 'C' || action == 'D' || action == 'U') {
					param['param'] = {};
				} else {
					param['param'] = [];
				}
			}
		}
		
		if(action == 'CW') {
			return 'SUCCESS';
		}

		if(param['param'] != undefined && your['initParam'] != undefined) {
			if(JSON.stringify(param['param']) == '{}' || JSON.stringify(param['param']) == '"{}"') {
				param['param'] = your['initParam'];
    		} else if(JSON.stringify(param['param']) == '[]' || JSON.stringify(param['param']) == '[{}]' || JSON.stringify(param['param']) == '"[]"' || JSON.stringify(param['param']) == '"[{}]"') {
    			param['param'][0] = your['initParam'];
    		} else {
				for(key in your['initParam']) {
					if(param['param'].length == undefined) {
						param['param'][key] = your['initParam'][key];
					} else {
						for(var i = 0; i < param['param'].length; i++) {
							param['param'][i][key] = your['initParam'][key];
						}
					}
				}
    		}
		}
		
		return 'SUCCESS';
	},
	
	procCallBack: function(index, action, result, data, param, callBackParam, indexInfo, your) {
		if(your == undefined) {
			return 'FAIL';
		}
		
		if(action == 'E' && your.excelCallBack != undefined) {
			your.excelCallBack(result, data, param, callBackParam, indexInfo);
			return 'SUCCESS';
		} else if(action == 'R' && your.retrieveCallBack != undefined) {
			your.retrieveCallBack(result, data, param, callBackParam, indexInfo);
			return 'SUCCESS';
		} else if((action == 'C' || action == 'L') && your.saveCallBack != undefined) {
			your.saveCallBack(result, data, param, callBackParam, indexInfo);
			return 'SUCCESS';
		} else if((action == 'D' || action == 'LD') && your.delCallBack != undefined) {
			your.delCallBack(result, data, param, callBackParam, indexInfo);
			return 'SUCCESS';
		}
		
		return 'FAIL';
	},
		
	procProcessTran: function(index1, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		const index = index1;
		if(that.processTran[index] == undefined) {
			return;
		} 
		
		var indexInfoList = [];
		for(var loop = 0; loop < that.processTran[index].length; loop++) {
			const i = loop;
			
			var indexInfo = {};
			indexInfo['index'] = index;
			indexInfo['op'] = that.processTran[index][i]['dataField'] + (index + 1);
			indexInfoList[i] = indexInfo;
			
			if(that.processTran[index][i]['dataField'] == 'INIT') {
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				if(that.processTran[index][i]['headerText'] == 'SEARCH') {
					that.findBtnClicked(index, false, undefined, undefined, indexInfoList[i], your);
				} else if(that.processTran[index][i]['headerText'] == 'LOAD') {
					if(your != undefined && your.loadCallInit != undefined) {
						your.loadCallInit();
					}
					
					that.splashHide('load');
				} else if(that.processTran[index][i]['headerText'] == 'GRID') {
					var message = that.procCallInit(index, 'R', {param : undefined, callBackParam : undefined}, indexInfoList[i], your);
					if(message != 'SUCCESS') {
						that.messageBox({type:'warning', width:'400', height: '145',  html: message});						
						return;
					}
					
					mom_ajax('R', that.processTran[index][i]['dropDown'], {}, function(result, data) {
						if(result != 'SUCCESS' || data == undefined || data.length < 1) {
							return;
						}
						
						var underCamel = function(str) {
							 return str.toLowerCase().replace(/(\_[a-z])/g, function(arg) {
								 return arg.toUpperCase().replace('_','');
							 });
						};
						
						var initColSize = data.length + 1;
						var fieldString = '';
						var fieldStringG = '';
						for (var j = 0; j < data.length; j++) {
							if(j == 0) {
								if(data[i].colType == 'DATETIME') {
									dataString = 'TO_CHAR(' + data[i].momDemandColId + ', \'yyyy-mm-dd HH24:MI:ss\') as ' + data[i].momDemandColId;
								} else if(data[i].colType == 'DATE') {
									dataString = 'TO_CHAR(' + data[i].momDemandColId + ', \'yyyy-mm-dd\') as ' + data[i].momDemandColId;
								} else {
									fieldString = data[j].momDemandColId;
								}
								fieldStringG = data[j].momDemandColId;
							} else {
								if(data[i].colType == 'DATETIME') {
									dataString += 'TO_CHAR(' + data[i].momDemandColId + ', \'yyyy-mm-dd HH24:MI:ss\') as ' + data[i].momDemandColId;
								} else if(data[i].colType == 'DATE') {
									dataString += 'TO_CHAR(' + data[i].momDemandColId + ', \'yyyy-mm-dd\') as ' + data[i].momDemandColId;
								} else {
									fieldString += (',' + data[j].momDemandColId);
								}
								fieldStringG += (',' + data[j].momDemandColId);
							}
							
				            var colId = underCamel(data[j].momDemandColId);
							var colName = locale == 'KR' ? data[j].promptName : Language.getValueFromKorean(data[j].promptName);
								
							AUIGrid.addColumn(that.grid[index], {dataField: colId, headerText: colName/*, dataType: 'String'*/, visible: true, editable: false}, 'last');
						}
						
						if(your != undefined && your.initColSize != undefined) {
							your.initColSize = initColSize;
						}
						if(your != undefined && your.fieldString != undefined) {
							your.fieldString = fieldString;
						} 
						if(your != undefined && your.fieldStringG != undefined) {
							your.fieldStringG = fieldStringG;
						}
						
						that.splashHide('load');	
						
						if(your != undefined && your.gridCallInit != undefined) {
							your.gridCallInit();
						}
						
						return;
					}, undefined, indexInfoList[i], your, 'sync'); 
				} else if(that.processTran[index][i]['headerText'] == 'GRID2') { 
					var param = {};
					if(your != undefined && your['grid2CallInit'] != undefined) {
						your.grid2CallInit(function(initParam) {
							param = initParam;
							mom_ajax('R', that.processTran[index][i]['dropDown'], param, function(result, data) {
								var columnLayout = AUIGrid.getColumnLayout(that.grid[index]);
								var column = {width:120,visible:true};
								if(data.length > 0) {
									for(var i = 0; i < columnLayout.length; i++) {
										if(data[0][columnLayout[i].dataField] != undefined) {
											columnLayout[i].headerText = data[0][columnLayout[i].dataField];
										}
									}
									
									AUIGrid.changeColumnLayout(that.grid[index], columnLayout);
								}
								
								that.splashHide('load');								
								return;
							});
						});						
					}
				}
				
				continue;
			} else if(that.processTran[index][i]['dropDown'].indexOf('POPUP') == 0) {
				const actionBtnId = that.processTran[index][i]['dataField'] + (index + 1);
				var isExist = document.getElementById(actionBtnId);	
				if(isExist) {
					//that.processTran[index][i]['dropDown'] = that.processTran[index][i]['dropDown'].substring(6);
					$(document).on('click', '#' + actionBtnId, function(e) {
						var actionToken = that.processTran[index][i]['dropDown'].substring(6);
						var param = {};
						if(actionToken == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionToken == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionToken == 'checkedGrid') {
							var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
							if(checkedItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
								return;
							} else if(checkedItems.length > 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11605']});
								return;
							}
							
							param = AUIGrid.getCheckedRowItems(that.grid[index])[0]['item'];
						} else if(actionToken == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							if(param.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
								return;
							}
						} else if(actionToken.indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionToken];
						}
						
						var newIndex = 2;
						indexInfoList[i]['index'] = index;
						indexInfoList[i]['row'] = i;
						indexInfoList[i]['sequence'] = 1;
						indexInfoList[i]['newIndex'] = newIndex;
						
						that.findBtnClicked(index, true, param, undefined, indexInfoList[i], your);
						
						$('#listPop' + (index + 1)).momModal('show');
						if(your != undefined && your.currentEnterKeyIndex != undefined) {
							your.currentEnterKeyIndex = index;
						}
						AUIGrid.resize(that.grid[newIndex]);
					});
				}
				
				continue;
			}
			
			const actionBtnId = that.processTran[index][i]['dataField'] + (index + 1);
			var isExist = document.getElementById(actionBtnId);		
			if(isExist == undefined) {
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				
				const actions = that.processTran[index][i]['dropDown'];
				const actionList = actions.split(',');
				const actionFirstToken = actionList[0].split('#');
				
				if(actionFirstToken.length == 4 && actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CC') {
					AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
					AUIGrid.bind(that.grid[index], 'cellClick', function(e) {
						if(that.gridProperty[index].checkId == 'singleRow' || that.gridProperty[index].checkId == 'multipleRows') {
							var current = parseInt(AUIGrid.getProp(that.grid[index], 'exportURL'));
							AUIGrid.setProp(that.grid[index], 'exportURL' , '' + (current + 1));
							
							setTimeout(function() {
								if(AUIGrid.getProp(that.grid[index], 'exportURL') != '1') { 
									AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
									return;
								}
								
								AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
								
								const item = e.item;
								const rowIdField = AUIGrid.getProp(e.pid, 'rowIdField');
								const rowId = item[rowIdField];
								if (that.singleRowIndex[index] == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
									AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = undefined;
								} else {
									if (that.gridProperty[index].checkId == 'singleRow' && that.singleRowIndex[index] != undefined) {
										AUIGrid.addUncheckedRowsByIds(e.pid, that.singleRowIndex[index]);
									}

									AUIGrid.addCheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = rowId;
								}

								if (your != undefined && your.cellClickCallBack != undefined) {
									your.cellClickCallBack(index, e);
								}
							}, 400);
						}
							
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							//재고입출고이력 상단 그리드 row 클릭 시 검색조건 파라미터 값 추가히기
							var searchParam = that.createParam4Form(index, '#form');
							if(your.menuId == 'MOMCE004_1' && searchParam != undefined) {
								param.fromDate = searchParam.fromDate;
								param.toDate = searchParam.toDate;
								param.ioType = searchParam.ioType;
							}
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var newIndex = parseInt(actionFirstToken[3].substring(actionFirstToken[3].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						
						that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
						
						/* modify hists
						 * 20191115_001 / pyj / cellClick시 callback실행하는 위치 수정
						 */
						/* start 20191115_001 */
						if(your != undefined && your.cellClickCallBack != undefined) {
							your.cellClickCallBack(index, e);
						}
						/* end 20191115_001 */
					});
					
					continue;
				} else if(actionFirstToken.length == 4 && actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CD') {
					AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
					AUIGrid.bind(that.grid[index], 'cellDoubleClick', function(e) {
						if(that.gridProperty[index].checkId == 'singleRow' || that.gridProperty[index].checkId == 'multipleRows') {
							var current = parseInt(AUIGrid.getProp(that.grid[index], 'exportURL'));
							AUIGrid.setProp(that.grid[index], 'exportURL' , '' + (current + 1));
							
							setTimeout(function() {
								if(AUIGrid.getProp(that.grid[index], 'exportURL') != '1') { 
									AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
									return;
								}
								
								AUIGrid.setProp(that.grid[index], 'exportURL' , '0');
								
								const item = e.item;
								const rowIdField = AUIGrid.getProp(e.pid, 'rowIdField');
								const rowId = item[rowIdField];
								if (that.singleRowIndex[index] == rowId || AUIGrid.isCheckedRowById(e.pid, rowId)) {
									AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = undefined;
								} else {
									if (that.gridProperty[index].checkId == 'singleRow' && that.singleRowIndex[index] != undefined) {
										AUIGrid.addUncheckedRowsByIds(e.pid, that.singleRowIndex[index]);
									}

									AUIGrid.addCheckedRowsByIds(e.pid, rowId);
									that.singleRowIndex[index] = rowId;
								}

								if (your != undefined && your.cellClickCallBack != undefined) {
									your.cellClickCallBack(index, e);
								}
							}, 400);
						}
						
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							//재고입출고이력 상단 그리드 row 클릭 시 검색조건 파라미터 값 추가히기
							var searchParam = that.createParam4Form(index, '#form');
							if(your.menuId == 'MOMCE004_1' && searchParam != undefined) {
								param.fromDate = searchParam.fromDate;
								param.toDate = searchParam.toDate;
								param.ioType = searchParam.ioType;
							}
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var newIndex = parseInt(actionFirstToken[3].substring(actionFirstToken[3].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						
						that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
				
						/* modify hists
						 * 20191115_001 / pyj / cellClick시 callback실행하는 위치 수정
						 */
						/* start 20191115_001 */
						if(your != undefined && your.cellClickCallBack != undefined) {
							your.cellClickCallBack(index, e);
						}
						/* end 20191115_001 */
					});
					
					continue;
				}
			}
			
			const actions = that.processTran[index][i]['dropDown'];
			const actionList = actions.split(',');
			if(actionList == undefined || actionList.length < 1) {
				return;
			}
			
			const actionFirstToken = actionList[0].split('#');
			
			$(document).on('click', '#' + actionBtnId, function(e) {
				indexInfoList[i]['index'] = index;
				indexInfoList[i]['row'] = i;
				indexInfoList[i]['sequence'] = 1;
				delete indexInfoList[i]['newIndex'];
				
				if(actionFirstToken.length == 1) {
					that.findBtnClicked(index, true, {}, that.processTranCallBack, indexInfoList[i], your);
				} else if(actionFirstToken.length == 2) {
					var param = {};
					if(actionFirstToken[1] == 'form') {
						param = that.createParam4Form(index, '#form');
						if(param <= 0) {
							setTimeout(function() {
								//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});
							}, 40);
							
							return;
						}
					} else if(actionFirstToken[1] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[1] == 'checkedGrid') {
						param = AUIGrid.getCheckedRowItems(that.grid[index])[0]['item'];
						if(param.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});							
							return;
						}
					} else if(actionFirstToken[1] == 'selectedGrid') {
						param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
						if(param.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});							
							return;
						}
					} else if(actionFirstToken[1].indexOf('param') >= 0 && your[actionFirstToken[1]] != undefined) {
						param = your[actionFirstToken[1]];
					}
					
					that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
				} else if(actionFirstToken.length == 3) {	
					if(actionFirstToken[1].indexOf('grid') < 0) {	// R#queryId#param
						if(actionFirstToken[1].indexOf('.') > 0) {
							var param = {};
							//var method = 'POST';							
							if(actionFirstToken[2].indexOf('=') > 0) {
								//method = 'GET';
								actionFirstToken[1] += ('?' + actionFirstToken[2]);
							} else if(actionFirstToken[2] == 'form') {
								param = that.createParam4Form(indexInfoList[i]['index'], '#form');
								if(param <= 0) {
									setTimeout(function() {
										//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
											that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
											return;
										}
										
										var message = '';
										var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
										for(var i = 0; i < that.searchFilter[index].length; i++) {
											if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
												if(message == '') {
													message = that.searchFilter[index][i]['headerText'];
												} else {
													message += (', ' + that.searchFilter[index][i]['headerText']);
												}
											}
										}
										
										message += ' 중 적어도 1개는 필수 항목입니다.';
										that.messageBox({type: 'warning', width: '400', height: '145', html: message});
									}, 40);
									
									return;
								}
							} else if(actionFirstToken[2] == 'grid') {
								param = AUIGrid.getGridData(that.grid[currentGridIndex])[0];
							} else if(actionFirstToken[2] == 'checkedGrid') {
								param = AUIGrid.getCheckedRowItems(that.grid[currentGridIndex])[0]['item'];
								if(param.length < 1) {
									that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});									
									return;
								}
							} else if(actionFirstToken[2] == 'selectedGrid') {
								param = AUIGrid.getSelectedItems(that.grid[currentGridIndex])[0]['item'];
								if(param.length < 1) {
									that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});									
									return;
								}
							} else if(actionFirstToken[2] == 'data') {
								param = data[0];
							} /*else if(actionFirstToken[2] == 'callBack') {
								param = callBackParam[0];
							}*/ else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
								param = your[actionFirstToken[2]];
							}
		
							var paramPair = {param : param, callBackParam : undefined};
							var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
							if(message != 'SUCCESS') {
								that.splashHide();
								that.messageBox({type:'warning', width:'400', height: '145',  html: message});
								
								return;
							}
							
							param = paramPair['param'];
							//mom_ajax('R', actionFirstToken[1], param, that.processTranCallBack, '', indexInfo, your);
							// 확실하지 않지만.., 변환
							that.findBtnClicked(index, true, param, that.processTranCallBack, indexInfoList[i], your);
						} 
					} else {
						var param = {};							// R#gridN#param	
						var newIndex = parseInt(actionFirstToken[1].substring(actionFirstToken[1].indexOf('grid') + 'grid'.length)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
						}
						
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index])[0];
						} else if(actionFirstToken[2] == 'checkedGrid') {
							checkRowItems = AUIGrid.getCheckedRowItems(that.grid[index]);
							if(checkRowItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});								
								return;
							} else {
								param = AUIGrid.getCheckedRowItems(that.grid[index])[0]['item'];
								var searchParam = that.createParam4Form(index, '#form');
								if(searchParam.fromDate != '' && searchParam.toDate != '') {
									param.fromDate = searchParam.fromDate;
									param.toDate = searchParam.toDate;
								}
							}
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
							if(param.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});								
								return;
							}
						} else if(actionFirstToken[2] == 'data') {
							param = data[0];
						} /*else if(actionFirstToken[2] == 'callBack') {
							param = callBackParam[0];
						}*/ else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						that.findBtnClicked(index == newIndex ? index : newIndex, false, param, that.processTranCallBack, indexInfoList[i], your);
					}
				} else if(actionFirstToken.length == 4) {		
					if(actionFirstToken[0] == 'E') { //E#queryId#pageId#param
						var file_id = document.getElementById('file' + (indexInfoList[i]['index'] + 1));
						var param = {}
						
						if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
							param = your[actionFirstToken[3]];
						}
						
						var paramPair = {param : param, callBackParam : undefined};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						
						param = paramPair['param'];
						excel_upload(file_id, actionFirstToken[1], actionFirstToken[2], that.grid[indexInfoList[i]['index']], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
						
						return;
					}
					
					var param = [];
					if(actionFirstToken[2] == 'form') {
						var tmp = that.createParam4Form(index, '#form');
						if(tmp <= 0) {
							setTimeout(function() {
								//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][tmp * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});
							}, 40);
							
							return;
						}
						
						param[0] = tmp;
					} else if(actionFirstToken[2] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[2] == 'checkedGrid') {
						var param1 = AUIGrid.getCheckedRowItems(that.grid[index]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2] == 'selectedGrid') {
						var param1 = AUIGrid.getSelectedItems(that.grid[index]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('checkedGrid') >= 0) {
						var currentGridIndex = parseInt(actionFirstToken[2].substring(actionFirstToken[2].indexOf('checkedGrid') + 'checkedGrid'.length)) - 1;
						var param1 = AUIGrid.getCheckedRowItems(that.grid[currentGridIndex]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('selectedGrid') >= 0) {
						var currentGridIndex = parseInt(actionFirstToken[2].substring(actionFirstToken[2].indexOf('selectedGrid') + 'selectedGrid'.length)) - 1;
						var param1 = AUIGrid.getSelectedItems(that.grid[currentGridIndex]);
						if(param1.length < 1) {
							that.messageBox({type:'warning', width:'400', height: '145', html: that.processTran[index][i]['headerText'] + '할 행을 선택하여 주십시오.'});
							
							return;
						}
						
						for(var j = 0; j < param1.length; j++) {
							param[j] = param1[j]['item'];
						}
					} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
						param = your[actionFirstToken[2]];
					}
					
					if(actionFirstToken[0] == 'R' || actionFirstToken[0] == 'C' || actionFirstToken[0] == 'D' || actionFirstToken[0] == 'U') {
						if(param.length > 0) {
							param = param[0];
						} else {
							param = {};
						}
					} 
					
					var callBackParam = [];
					if(actionFirstToken[3] == 'form') {
						callBackParam = that.createParam4Form(index, '#form');
						if(callBackParam == -1) {
							callBackParam = [];
						}
					} else if(actionFirstToken[3] == 'grid') {
						callBackParam = AUIGrid.getGridData(that.grid[index]);
					} else if(actionFirstToken[3] == 'checkedGrid') {
						var callBackParam1 = AUIGrid.getCheckedRowItems(that.grid[index]);
						for(var j = 0; j < callBackParam1.length; j++) {
							callBackParam[j] = callBackParam1[j]['item'];
						}
					} else if(actionFirstToken[3] == 'selectedGrid') {
						var callBackParam1 = AUIGrid.getSelectedItems(that.grid[index]);
						for(var j = 0; j < callBackParam1.length; j++) {
							callBackParam[j] = callBackParam1[j]['item'];
						}
					} else if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
						callBackParam = your[actionFirstToken[3]];
					}
					
					if(that.processTran[index][i]['filter']) {
						/////////////////////////////////////////////////////////////
						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInitTran(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						var ioMonth;
						if(message != 'SUCCESS') {
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});						
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						// XMOMH28 / ljw / 월수불마감에서 일괄취소 시 검색조건에서 선택한 마감월 값 추가
						if(param.yyyymm != undefined) {
							ioMonth = param.yyyymm + " ";
						} else {
							ioMonth = '';
						}
						/////////////////////////////////////////////////////////////
						if(Array.isArray(param[0])) { // XMOME28 / pyj / 중복 배열 거르기
							param = param[0];
						}
						if(your != undefined && your.groupDelMsg != undefined) {
							that.messageBox({type:'info', width:'400', height: '145', html: your.groupDelMsg + that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
								that.splashShow();
								if(actionFirstToken[0] == 'R') {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
								} else {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
								}
							}}});
						} else {
							that.messageBox({type:'info', width:'400', height: '145', html: ioMonth + that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
								that.splashShow();
								if(actionFirstToken[0] == 'R') {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
								} else {
									mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
								}
							}}});
						}
					} else {
						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						//that.messageBox({type:'info', width:'400', height: '145', html:that.processTran[index][i]['headerText'] + ' 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
							that.splashShow();
							if(actionFirstToken[0] == 'R') {
								mom_ajax(actionFirstToken[0], actionFirstToken[1], param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
							} else {
								mom_ajax(actionFirstToken[0], actionFirstToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfoList[i], your);
							}
						//}}});
					}
				} else if(actionFirstToken.length == 5) {		
					if(actionFirstToken[0] == 'R' && actionFirstToken[1] == 'CS') {
						var param = {};
						if(actionFirstToken[2] == 'form') {
							param = that.createParam4Form(index, '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionFirstToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[2] == 'checkedGrid') {
							var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
							if(checkedItems == undefined || checkedItems.length < 1) {
								that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES11335']});								
								return;
							}
							param = AUIGrid.getCheckedRowItems(that.grid[index])[0]['item'];
						} else if(actionFirstToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
						} else if(actionFirstToken[2].indexOf('param') >= 0 && your[actionFirstToken[2]] != undefined) {
							param = your[actionFirstToken[2]];
						}
						
						var callBackParam = [];
						if(actionFirstToken[3] == 'form') {
							callBackParam = that.createParam4Form(index, '#form');
							if(callBackParam == -1) {
								callBackParam = [];
							}
						} else if(actionFirstToken[3] == 'grid') {
							callBackParam = AUIGrid.getGridData(that.grid[index]);
						} else if(actionFirstToken[3] == 'checkedGrid') {
							var callBackParam1 = AUIGrid.getCheckedRowItems(that.grid[index]);
							for(var j = 0; j < callBackParam1.length; j++) {
								callBackParam[j] = callBackParam1[j]['item'];
							}
						} else if(actionFirstToken[3] == 'selectedGrid') {
							var callBackParam1 = AUIGrid.getSelectedItems(that.grid[index]);
							for(var j = 0; j < callBackParam1.length; j++) {
								callBackParam[j] = callBackParam1[j]['item'];
							}
						} else if(actionFirstToken[3].indexOf('param') >= 0 && your[actionFirstToken[3]] != undefined) {
							callBackParam = your[actionFirstToken[3]];
						}
						
						var queryId = that.gridProperty[index]['queryId'];
						var newIndex = parseInt(actionFirstToken[4].substring(actionFirstToken[4].indexOf('grid')+4)) - 1;
						if(newIndex != index) {
							indexInfoList[i]['newIndex'] = newIndex;
							queryId = that.gridProperty[newIndex]['queryId'];
						}

						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInit(index, actionFirstToken[0], paramPair, indexInfoList[i], your);
						if(message != 'SUCCESS') {
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});							
							return;
						}
						
						param = paramPair['param'];
						callBackParam = paramPair['callBackParam'];
						
						that.splashShow();
						mom_ajax(actionFirstToken[0], queryId, param, that.processTranCallBack, callBackParam, indexInfoList[i], your);
						
						return;
					}
				}
			});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 트랜잭션 처리 콜백 함수  관련
	    processTranCallBack: function(result, data, param, callBackParam, indexInfo, your) {
			var that = this.grid == undefined ? this.momWidget : this;
			//var index = indexInfo['index']; //(indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index']; 
			if(result != 'SUCCESS') {
				that.splashHide();
				if(data.p_err_msg != undefined && data.p_err_msg != '') {
					that.messageBox({type:'danger', width:'400', height: '145', html: Language.getLang(data['p_err_msg'])});
		        } else {
		        	that.messageBox({type:'warning', width:'400', height: '145', html: '실패하였습니다.'});
		        }
				
				return;
			}
			
			var actions = that.processTran[indexInfo['index']][indexInfo['row']]['dropDown'];
			var actionList = actions.split(',');
			if(actionList == undefined || actionList.length == 1 || actionList.length == indexInfo['sequence']) {
				if(actionList == undefined) {
					that.splashHide();
					return;
				}
				
				var actionLastToken = actionList[actionList.length - 1];
				var action = actionLastToken.substring(0, actionLastToken.indexOf('#'));
				if(action == 'R' && your != undefined && your.retrieveCallBack) {
					your.retrieveCallBack('SUCCESS', data, param, callBackParam, indexInfo);
					return;
				} else if((action == 'C' || action == 'L') && your != undefined && your.saveCallBack) {
					your.saveCallBack('SUCCESS', data, param, callBackParam, indexInfo);
					return;
				} else if((action == 'D' || action == 'LD') && your != undefined && your.delCallBack) {
					your.delCallBack('SUCCESS', data, param, callBackParam, indexInfo);
					return;
				}
				
				var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
				if((action == 'R' || action == 'POPUP') && (your == undefined || your.retrieveCallBack == undefined)) {
					AUIGrid.setGridData(that.grid[index], data);
					that.splashHide();
				}
				
				if(that.processTran[indexInfo['index']][indexInfo['row']]['filter']) {
					that.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
				}
				
				return;
			}
			
			if(actionList[indexInfo['sequence']] == undefined) {
				return;
			}
			var actionNextToken = actionList[indexInfo['sequence']].split('#');
			indexInfo['sequence'] = indexInfo['sequence'] + 1;
			if(actionNextToken.length == 1) {
				that.findBtnClicked(indexInfo['index'], true, {}, that.processTranCallBack, indexInfo, your);
			} else if(actionNextToken.length == 2) {
				/*if(actionNextToken[0] == 'B') { 									// your callBack
					if(your != undefined && your[actionNextToken[1]] != undefined) {
						your[actionNextToken[1]]('SUCCESS', data, param, callBackParam, indexInfo);
					} else {
						console.log('#### your ' + actionNextToken[1] + '에 접근할 수 없습니다.');
					}
					
					return;
				}*/
				
				var param = {};
				if(actionNextToken[1] == 'form') {
					var tmp = that.createParam4Form(indexInfo['index'], '#form');
					if(tmp <= 0) {
						setTimeout(function() {
							//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][tmp * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
							if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
								that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								return;
							}
							
							var message = '';
							var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
							for(var i = 0; i < that.searchFilter[index].length; i++) {
								if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
									if(message == '') {
										message = that.searchFilter[index][i]['headerText'];
									} else {
										message += (', ' + that.searchFilter[index][i]['headerText']);
									}
								}
							}
							
							message += ' 중 적어도 1개는 필수 항목입니다.';
							that.messageBox({type: 'warning', width: '400', height: '145', html: message});
						}, 40);
						
						return;
					}
					param = tmp;
				} else if(actionNextToken[1] == 'grid') {
					param = AUIGrid.getGridData(that.grid[indexInfo['index']])[0];
				} else if(actionNextToken[1] == 'checkedGrid') {
					param = AUIGrid.getCheckedRowItems(that.grid[indexInfo['index']])[0]['item'];
				} else if(actionNextToken[1] == 'selectedGrid') {
					param = AUIGrid.getSelectedItems(that.grid[indexInfo['index']])[0]['item'];
				} else if(actionNextToken[1] == 'data') {
					param = data[0];
				} else if(actionNextToken[1] == 'callBack') {
					param = callBackParam[0];
				} else if(actionNextToken[1].indexOf('param') >= 0 && your[actionNextToken[1]] != undefined) {
					param = your[actionNextToken[1]];
				}
				
				that.findBtnClicked(indexInfo['index'], false, param, that.processTranCallBack, indexInfo, your);
			} else if(actionNextToken.length == 3) { 			// R#queryId#param, R#gridN#param
				var currentIndex = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
				if(actionNextToken[1].indexOf('grid') < 0) {	
					if(actionNextToken[1].indexOf('.') > 0) {	// R#queryId#param
						var param = {};
						//var method = 'POST';
						
						if(actionNextToken[2].indexOf('=') > 0) {
							//method = 'GET';
							actionNextToken[1] += ('?' + actionNextToken[2]);
						} else if(actionNextToken[2] == 'form') {
							param = that.createParam4Form(indexInfo['index'], '#form');
							if(param <= 0) {
								setTimeout(function() {
									//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
										that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
										return;
									}
									
									var message = '';
									var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
									for(var i = 0; i < that.searchFilter[index].length; i++) {
										if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
											if(message == '') {
												message = that.searchFilter[index][i]['headerText'];
											} else {
												message += (', ' + that.searchFilter[index][i]['headerText']);
											}
										}
									}
									
									message += ' 중 적어도 1개는 필수 항목입니다.';
									that.messageBox({type: 'warning', width: '400', height: '145', html: message});
								}, 40);
								
								return;
							}
						} else if(actionNextToken[2] == 'grid') {
							param = AUIGrid.getGridData(that.grid[currentIndex])[0];
						} else if(actionNextToken[2] == 'checkedGrid') {
							param = AUIGrid.getCheckedRowItems(that.grid[currentIndex])[0]['item'];
						} else if(actionNextToken[2] == 'selectedGrid') {
							param = AUIGrid.getSelectedItems(that.grid[currentIndex])[0]['item'];
						} else if(actionNextToken[2] == 'data') {
							param = data[0];
						} else if(actionNextToken[2] == 'callBack') {
							param = callBackParam[0];
						} else if(actionNextToken[2].indexOf('param') >= 0 && your[actionNextToken[2]] != undefined) {
							param = your[actionNextToken[2]];
						}
	
						var paramPair = {param : param, callBackParam : callBackParam};
						var message = that.procCallInit(index, actionNextToken[0], paramPair, indexInfo, your);
						if(message != 'SUCCESS') {
							that.splashHide();
							that.messageBox({type:'warning', width:'400', height: '145',  html: message});
							
							return;
						}
						
						param = paramPair['param'];
						mom_ajax('R', actionNextToken[1], param, that.processTranCallBack, undefined, indexInfo, your);						
					} 
				} else {
					var param = {};							// R#gridN#param	
					//var currentGridIndex = that.grid[indexInfo['index']];
					var newIndex = parseInt(actionNextToken[1].substring(actionNextToken[1].indexOf('grid') + 'grid'.length)) - 1;
					if(newIndex != currentIndex) {
						indexInfo['newIndex'] = newIndex;
					}
					
					if(actionNextToken[2] == 'form') {
						param = that.createParam4Form(index, '#form');
						if(param <= 0) {
							setTimeout(function() {
								//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
									that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
									return;
								}
								
								var message = '';
								var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
								for(var i = 0; i < that.searchFilter[index].length; i++) {
									if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
										if(message == '') {
											message = that.searchFilter[index][i]['headerText'];
										} else {
											message += (', ' + that.searchFilter[index][i]['headerText']);
										}
									}
								}
								
								message += ' 중 적어도 1개는 필수 항목입니다.';
								that.messageBox({type: 'warning', width: '400', height: '145', html: message});
							}, 40);
							
							return;
						}
					} else if(actionNextToken[2] == 'grid') {
						param = AUIGrid.getGridData(that.grid[index])[0];
					} else if(actionNextToken[2] == 'checkedGrid') {
						param = AUIGrid.getCheckedRowItems(that.grid[index])[0]['item'];
					} else if(actionNextToken[2] == 'selectedGrid') {
						param = AUIGrid.getSelectedItems(that.grid[index])[0]['item'];
					} else if(actionNextToken[2] == 'data') {
						param = data[0];
					} else if(actionNextToken[2] == 'callBack') {
						param = callBackParam[0];
					} else if(actionNextToken[2].indexOf('param') >= 0 && your[actionNextToken[2]] != undefined) {
						param = your[actionNextToken[2]];
					}
					
					that.findBtnClicked(newIndex, false, param, that.processTranCallBack, indexInfo, your);
				}
			} else if(actionNextToken.length == 4) {
				if(actionNextToken[0] == 'E') { 		//E#queryId#pageId#param
					var file_id = document.getElementById('file' + (indexInfo['index'] + 1));
					var param = {};					
					if(actionNextToken[3].indexOf('param') >= 0 && your[actionNextToken[3]] != undefined) {
						param = your[actionNextToken[3]];
					}
					
					var paramPair = {param : param, callBackParam : callBackParam};
					var message = that.procCallInit(index, actionNextToken[0], paramPair, indexInfo, your);
					if(message != 'SUCCESS') {
						that.splashHide();
						that.messageBox({type:'warning', width:'400', height: '145',  html: message});
						
						return;
					}
					
					param = paramPair['param'];
					excel_upload(file_id, actionNextToken[1], actionNextToken[2], that.grid[indexInfo['index']], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfo, your);
					
					return;
				}
				
				var param = [];				
				if(actionNextToken[2] == 'form') {
					param = that.createParam4Form(indexInfo['index'], '#form');
					if(param <= 0) {
						setTimeout(function() {
							//that.messageBox({type:'warning', width:'400', height: '145', html:that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
							if(that.searchFilter[index][param * -1]['sortIndex'] == undefined || that.searchFilter[index][param * -1]['sortIndex'] == '') {
								that.messageBox({type: 'warning', width: '400', height: '145', html: that.searchFilter[index][param * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
								return;
							}
							
							var message = '';
							var sortIndex = that.searchFilter[index][param * -1]['sortIndex'];
							for(var i = 0; i < that.searchFilter[index].length; i++) {
								if(that.searchFilter[index][i]['sortIndex'] != undefined && that.searchFilter[index][i]['sortIndex'] == sortIndex) {
									if(message == '') {
										message = that.searchFilter[index][i]['headerText'];
									} else {
										message += (', ' + that.searchFilter[index][i]['headerText']);
									}
								}
							}
							
							message += ' 중 적어도 1개는 필수 항목입니다.';
							that.messageBox({type: 'warning', width: '400', height: '145', html: message});
						}, 40);
						
						return;
					}
				} else if(actionNextToken[2] == 'grid') {
					param = AUIGrid.getGridData(that.grid[indexInfo['index']]);
				} else if(actionNextToken[2] == 'checkedGrid') {
					var param1 = AUIGrid.getCheckedRowItems(that.grid[indexInfo['index']]);
					for(var j = 0; j < param1.length; j++) {
						param[j] = param1[j]['item'];
					}
				} else if(actionNextToken[2] == 'selectedGrid') {
					var param1 = AUIGrid.getSelectedItems(that.grid[indexInfo['index']]);
					for(var j = 0; j < param1.length; j++) {
						param[j] = param1[j]['item'];
					}
				} else if(actionNextToken[2] == 'data') {
					param = data;
				} else if(actionNextToken[2] == 'callBack') {
					param = callBackParam;
				} else if(actionNextToken[2].indexOf('param') >= 0 && your[actionNextToken[2]] != undefined) {
					param = your[actionNextToken[2]];
				}
				
				if(actionNextToken[0] == 'R' || actionNextToken[0] == 'C' || actionNextToken[0] == 'D' || actionNextToken[0] == 'U') {
					if(param.length > 0) {
						param = param[0];
					} else {
						param = {};
					}
				} 
				
				var callBackParam1 = [];
				if(actionNextToken[3] == 'form') {
					callBackParam1 = that.createParam4Form(indexInfo['index'], '#form');
					if(callBackParam1 == -1) {
						callBackParam1 = [];
					}
				} else if(actionNextToken[3] == 'grid') {
					callBackParam1 = AUIGrid.getGridData(that.grid[indexInfo['index']]);
				} else if(actionNextToken[3] == 'checkedGrid') {
					var param1 = AUIGrid.getCheckedRowItems(that.grid[indexInfo['index']]);
					for(var j = 0; j < param1.length; j++) {
						callBackParam1[j] = param1[j]['item'];
					}					
				} else if(actionNextToken[3] == 'selectedGrid') {
					var param1 = AUIGrid.getSelectedItems(that.grid[indexInfo['index']]);
					for(var j = 0; j < param1.length; j++) {
						callBackParam1[j] = param1[j]['item'];
					}
				} else if(actionNextToken[3] == 'data') {
					callBackParam1 = data;
				} else if(actionNextToken[3] == 'callBack') {
					callBackParam1 = callBackParam;
				} else if(actionNextToken[3].indexOf('param') >= 0 && your[actionNextToken[3]] != undefined) {
					callBackParam1 = your[actionNextToken[3]];
				}
					
				var paramPair = {param : param, callBackParam : callBackParam1};
				var message = that.procCallInit(index, actionNextToken[0], paramPair, indexInfo, your);
				if(message != 'SUCCESS') {
					that.splashHide();
					that.messageBox({type:'warning', width:'400', height: '145',  html: message});
					
					return;
				}
				
				param = paramPair['param'];
				callBackParam = paramPair['callBackParam']
				mom_ajax(actionNextToken[0], actionNextToken[1], JSON.stringify(param), that.processTranCallBack, callBackParam, indexInfo, your);
			}
		},
	
	isInitGrid: function(index, initCallBack, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		setTimeout(function(index, initCallBack, your) {
			if(that.grid[index] == undefined) {
				that.isInitGrid(index, initCallBack, your);
			} else if(your != undefined && your.initColSize == -1) {
				that.isInitGrid(index, initCallBack, your);
			} else {
				if(initCallBack != undefined) {
					initCallBack();
				}
				
				return;
			}
			
		}, 40, index, initCallBack, your);
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수  관련
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Global 함수, 메시지 박스
	messageBox: function(options) {
        if($('.momMessageBoxSet').next().attr('class') == 'mm-backdrop fade in mm-stack') {
            $('.mm-backdrop.fade.in.mm-stack').remove();
        }
        
        $('.momMessageBoxSet').remove();
        if(options) {
            if(typeof options == 'string') {
                options = JSON.parse(options);
            } 
            
            if(options.id == null) {
                options.id = '';
            }
            
            var popWidth = (typeof options.width == undefined ? 400 : options.width) + 'px';
            var popHeight = (typeof options.height == undefined ? 200 : options.height) + 'px';
            var popLeft = ($(window).width() / 2) - (popWidth.replace('px', '') / 2) + 'px';
            var popTop = ($(window).height() / 2) - (popHeight.replace('px', '') / 2) + 'px';
            var popType = (typeof options.type == undefined ? 'panel-' + 'primary' : 'panel-' + options.type);

            // from. 김대성
            var fadeStr = '';
            if(null == options.isFade || options.isFade) {
                fadeStr = ' fade';//앞에 공백 한칸 꼭 주세요
            }

            $('body').append($('<div/>', {
                'class': 'momMessageBoxSet modal fade' + fadeStr,
                'id': options.id,
                'data-draggable': true
            }));
            $('.momMessageBoxSet').append($('<div/>', {
                'class': 'momMessageBox panel ' + popType,
                style: 'width:' + popWidth + '; height:' + popHeight + ';'
            }));
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-heading w-clearfix'
            }));
            $('.momMessageBox .panel-heading').append($('<div/>', {
                'class': 'pop-h1',
                style: ' display: inline-block; margin-top: 5px; font-size: 15px;',
                html: options.title == null ? 'Message' : options.title
            })).append($('<a/>', {
                href: '#',
                'class': 'w-inline-block close-btn',
                style: 'width: 23px; height: 23px; margin-top: 3px; margin-right: 5px; float: right; border: 2px solid white; border-radius: 50%; color: white; font-size: 10px; line-height: 20px; text-align: center; top:0px; right:0px; padding:0px; background-color: transparent;'
            }));
            $('.momMessageBox .panel-heading .close-btn').append($('<div/>', {
                class: 'w-icon fa fa-times close-icon',
                style: 'margin-top: 0px; margin-right: 0px; display: inline-block;'
            }));
            
            if(options.subTitle != null) {
                $('.momMessageBox').append($('<div/>', {
                    'class': 'panel-toolbar'
                }));
                $('.momMessageBox .panel-toolbar').append($('<div/>', {
                    class: 'pop-tool',
                    style: 'display: block; height: 32px; padding-left: 10px; color: #7d7d7d; line-height: 32px;'
                }));
                $('.momMessageBox .panel-toolbar .pop-tool').append($('<div/>', {
                    class: 'w-icon fa fa-exclamation-triangle'
                })).append($('<div/>', {
                    class: 'pop-txt',
                    style: 'display: inline-block;',
                    html: options.subTitle
                }));
            }
            
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
            $('.momMessageBox').append($('<div/>', {
                'class': 'panel-footer',
                style: 'position: absolute;bottom: 0;width: 100%;'
            }));
            $('.momMessageBox .panel-footer').append($('<div/>', {
                'class': 'pop-footer',
                style: 'height: 35px; line-height: 35px; text-align: center;'
            }));
            
            if(typeof options.okButton != 'undefined') {
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
                
                if(typeof options.okButton.after != 'undefined') {
                    $('.momMessageBoxSet .momMessageBox .panel-footer .pop-footer .btn-ok').click(function (e) {
                        options.okButton.after(e);                       
                        $('.momMessageBoxSet').momModal('hide');
                    });
                }
            }

            if(options.closeButton == null) {
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
                style: 'display: inline-block;'
            }));
            $('.momMessageBox .panel-heading .close-btn').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            });            
            $('.momMessageBox .panel-footer .btn-cancel').click(function () { 
            	$('.momMessageBoxSet').momModal('hide');
            });
            
            if(typeof options.closeButton.after != 'undefined') {
                $('.momMessageBox .panel-heading .close-btn, .momMessageBox .panel-footer .btn-cancel').click(function (e) {
                    options.closeButton.after(e);
                });
            }
        }
        
        $('.momMessageBoxSet').momModal('show');
        $('.momMessageBoxSet').css('z-index', 99999999);
    },
    
    // Global 함수, 폼데이터 생성
    createParam4Form: function(index, form) {
    	var result = {};
    	for(var i = 0; i < 3; i++) {
    		var formId = 'form';
    		if(i != 0) {
    			formId += (i+1);
    		}	
    		
	    	var $form = $(formId); 
			var $objs = $form.find('input[id], div.jqx-combobox');
			if($objs.length < 1) {
				continue;
			}
			
			for(var j = 0; j < $objs.length; j++) {
				var $obj = $($objs[j]);
				result[$obj.attr('id')] = $obj.find('input').val() != '' ? $obj.val() : '';
				if(index != undefined && this.searchFilter[index] != undefined && this.searchFilter[index].length > 0) {
					for(var k = 0; k < this.searchFilter[index].length; k++) {
						if(this.searchFilter[index][k]['popUpReq'] && $obj.attr('id') == this.searchFilter[index][k]['dataField'] && (result[$obj.attr('id')] == undefined || result[$obj.attr('id')] == '')) {
							if(this.searchFilter[index][k]['sortIndex'] == undefined || this.searchFilter[index][k]['sortIndex'] == '') {
								return -1 * k;
							}
							
							var sortIndex = this.searchFilter[index][k]['sortIndex'];
							var isValid = false;
							for(var l = 0; l < this.searchFilter[index].length; l++) {
								if(l != k && this.searchFilter[index][l]['sortIndex'] != undefined && this.searchFilter[index][l]['sortIndex'] == sortIndex && $('#' + this.searchFilter[index][l]['dataField']).val() != '') {
									isValid = true;
									break;
								}
							}
							
							if(!isValid) {
								return -1 * k;
							}
						}
					}
				}
				
				// 2020.04.12 hyjeong begin
				if($obj.hasClass('jqx-combobox')) {
					var list = $obj.jqxComboBox('getCheckedItems');
					if(list != undefined) {
						if(list.length == 0) {
							result[$obj.attr('id')] = '';
						} else if(list.length == 1) {
							result[$obj.attr('id')] = "'" + list[0]['value'] + "'";
						} else {
							var checkedItems = '';
							$.each(list, function(index) {
								if(index == 0) {
									checkedItems = "'" + list[index]['value'] + "'";
								} else {
									checkedItems += (",'" + list[index]['value'] + "'");
								}
							});
							
							result[$obj.attr('id')] = checkedItems;
						}
					}
				}
				// 2020.04.12 hyjeong end
			}
    	}
    	
    	return result;
    },
    
    procGridWidget: function(index, pageId) {
		var that = this;

		$('.cardheard').prepend('<a id="gridWidgetSetBtn" href="#" class="gridWidgetSetBtns w-inline-block btntool floatr"><div class="w-icon fa fa-cog icon"></div><div class="textblock"></div></a>');
		$(document).on('click', '.gridWidgetSetBtns', function() {
			if($(this).closest('.card').find('.w-widget-auigrid')) {
				window.open('/TU_Platform/admin/MOMXX011.html?pageId=' + pageId + (index + 1), 'Widget Setup', 'width=1600,height=800');
			}
		});
		
		var btns = $('.gridWidgetSetBtns')
		for(var i = 0; i < btns.length; i++) {
			if($(btns[i]).closest('.card, .wcalc320').find('.w-widget-auigrid').length < 1) {
				$(btns[i]).hide();
			};
		}
	},
	
	createDropDown: function(id, data, width1, height1) {
		var width = $('#' + id).width() + 26;
		if(width1 != undefined) {
			width = width1;
		}
		
		var height = $('#' + id).height() + 4 < 24 ? 24 : $('#' + id).height() + 4;
		if(height1 != undefined) {
			height = height1;
		}
		
		$('#' + id).jqxComboBox({width : width, height : height, dropDownHeight : 250, autoDropDownHeight : false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
		$('#' + id).removeClass('w-select');
			
		var items = [];
		for(var i = 0; i < data.length; i++) {
			items.push({ label: data[i]['name'], value: data[i]['code'] });
		}
		
		$('#' + id).jqxComboBox('source', items);
		$('#' + id).find('input').attr('readonly', false);
	}, 
	
	dropDownPost: function(index, columnStyle, filter_callback, column_callback, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(that.searchFilter[index] != undefined) {
			for(var loop = 0; loop < that.searchFilter[index].length; loop++) {
				if(that.searchFilter[index][loop]['dropDown'] != undefined && that.searchFilter[index][loop]['dropDown'].length > 0 && that.searchFilter[index][loop]['dropDown'].indexOf('#') > 0) {
					const i = loop;
					var tokens = that.searchFilter[index][i]['dropDown'].split('#');
					var drop_down = tokens[0];
					var isExit = false;
					for(var j = 1; j < tokens.length; j++) {
						if(j % 2  == 1) {
							if(your[tokens[j]] == undefined) {
								isExist = true;
								continue;
							}
							
							var isJSON = true;
							var seq = 0;
							try {
								isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
							} catch(e) {
								isJSON = false;
							}
							
							if(isJSON) {
								var json = your[tokens[j]];
								var k = 0;
								for(key in json) {
									if(k == 0) {
										if(drop_down.indexOf('?') > 0) {
											drop_down = drop_down.substring(0, drop_down.indexOf('?') + 1);
										}
										drop_down += (key + '=' + json[key]);
										k++;
									} else {
										drop_down += ('&' + key + '=' + json[key]);
									}
								}
							} else {
								drop_down += your[tokens[j]];
							}
						} else {
							drop_down += tokens[j];
						}
					}
					
					if(isExit) {
						continue;
					}
					
					mom_ajax('R', drop_down, {}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						}
						
						//that.dropDownMap.set(that.searchFilter[index][i]['dropDown'], data);
						that.dropDownMap.set(drop_down, data);
						that.createDropDown(that.searchFilter[index][i]['dataField'], data, undefined, that.searchFilter[index][i]['width']);
						
						if(filter_callback != undefined) {
							filter_callback(result, data);
						}
					});
				}
			}
		}
		
		if(that.indexColumn[index] != undefined) {
			for(var loop = 0; loop < that.indexColumn[index].length; loop++) {
				const i = loop;
				if(that.indexColumn[index][i]['popUp'] != undefined && that.indexColumn[index][i]['popUp'] == 'DROPDOWN') {
					const INDEX = that.indexColumn[index][i]['INDEX'];
					if(that.columnProperty[index][INDEX]['dropDown'].indexOf('#') > 0) {
						var tokens = that.columnProperty[index][INDEX]['dropDown'].split('#');
						const data_field = that.columnProperty[index][INDEX]['dataField'];
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						const columnStyle1 = columnStyle == undefined ? undefined : (columnStyle == 'RESERVED' ? 'columnStyle' + (index + '' + INDEX) : columnStyle);
						if(that.indexColumn[index][i]['color'] != undefined) {
							that.design(index, INDEX, that.columnProperty[index][INDEX]['color'], that.columnProperty[index][INDEX]['style']);
						}
						
						mom_ajax('R', drop_down, {}, function(result, data) {
							if(result != 'SUCCESS' || data.length < 1) {
								return;
							}
							
							//that.dropDownMap.set(that.columnProperty[index][INDEX]['dropDown'], data);
							that.dropDownMap.set(drop_down, data);
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
								style: columnStyle1,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = value;
									for(var i = 0, len = data.length; i < len; i++) {
										if(data[i]['code'] == value) {
											retStr = data[i]['name'];
											break;
										}
									}
									
									return retStr;
								}, editRenderer : {
									type: 'DropDownListRenderer',
									showEditorBtnOver: true, 
									list: data, 
									keyField: 'code', 
									valueField: 'name' 							
								}
						 	});
							
							if(column_callback != undefined) {
								column_callback(result, data);
							}
						});
					}
				}
			}
		}
	},
	
	dropDownPosPost: function(index, dataField, columnStyle, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		if(this.indexColumn[index] != undefined) {
			for(var loop = 0; loop < this.indexColumn[index].length; loop++) {
				const i = loop;
				if(this.indexColumn[index][i]['popUp'] != undefined && this.indexColumn[index][i]['popUp'] == 'DROPDOWN' && this.indexColumn[index][i]['dataField'] == dataField) {
					var INDEX = this.indexColumn[index][i]['INDEX'];
					if(this.columnProperty[index][INDEX]['dropDown'].indexOf('#') > 0) {
						var tokens = this.columnProperty[index][INDEX]['dropDown'].split('#');
						const data_field = this.columnProperty[index][INDEX]['dataField'];
						var drop_down = tokens[0];
						var isExit = false;
						for(var j = 1; j < tokens.length; j++) {
							if(j % 2  == 1) {
								if(your[tokens[j]] == undefined) {
									isExist = true;
									continue;
								}
								
								var isJSON = true;
								var seq = 0;
								try {
									isJSON = JSON.stringify(your[tokens[j]]).indexOf('{') >= 0 ? true : false;
								} catch(e) {
									isJSON = false;
								}
								
								if(isJSON) {
									var json = your[tokens[j]];
									var k = 0;
									for(key in json) {
										if(k == 0) {
											drop_down += (key + '=' + json[key]);
											k++;
										} else {
											drop_down += ('&' + key + '=' + json[key]);
										}
									}
								} else {
									drop_down += your[tokens[j]];
								}
							} else {
								drop_down += tokens[j];
							}
						}
						
						if(isExit) {
							continue;
						}
						
						var columnStyle1 = columnStyle == undefined ? undefined : (columnStyle == 'RESERVED' ? 'columnStyle' + (index + '' + INDEX) : columnStyle);
						if(that.indexColumn[index][i]['color'] != undefined) {
							that.design(index, INDEX, that.columnProperty[index][INDEX]['color'], that.columnProperty[index][INDEX]['style']);
						}
						mom_ajax('R', drop_down, {}, function(result, data) {
							if(result != 'SUCCESS' || data.length < 1) {
								return;
							}
							
							AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
								style: columnStyle1,
								labelFunction: function(rowIndex, columnIndex, value, item) { 
									var retStr = value;
									for(var i = 0, len = data.length; i < len; i++) {
										if(data[i]['code'] == value) {
											retStr = data[i]['name'];
											break;
										}
									}
									
									return retStr;
								}, editRenderer: {
									type: 'DropDownListRenderer',
									showEditorBtnOver: true, // 마우스 오버 시 에디터버턴 보이기
									list: data, 
									keyField: 'code', 
									valueField: 'name' 							
								}
						 	});
						}, undefined, undefined, your, 'sync');
					}
				}
			}
		}
	},
	
	setFilterPropByDropDown: function(id, url, data1, call_back) {
		if(url != undefined) {
			mom_ajax('R', url, data1, function(result, data) {				
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				var items = []; 
				for(var j = 0; j < data.length; j++) {
					items.push({label: data[j]['name'], value: data[j]['code']});
				}
				
				$('#' + id).jqxComboBox('source', items);
				
				if(call_back != undefined) {
					call_back(result, data);
				}
			}, undefined, undefined, this, 'sync');
		} else {
			$('#' + id).jqxComboBox('clear');
			
			var items = []; 
			for(var j = 0; j < data1.length; j++) {
				items.push({label: data1[j]['name'], value: data1[j]['code']});
			}
			
			$('#' + id).jqxComboBox('source', items);
	
			if(call_back != undefined) {
				call_back();
			}
		}	
	},
	
	setColumnPropByDropDown: function(index, data_field, url, data1, call_back) {
		var that = this;
		if(url != undefined) {
			mom_ajax('R', url, data1, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					if(call_back != undefined) {
						call_back(result, data);
					}
					
					return;
				}
				
				AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
					labelFunction: function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i = 0, len = data.length; i < len; i++) {
							if(data[i]['code'] == value) {
								retStr = data[i]['name'];
								break;
							}
						}
						
						return retStr;
					}, editRenderer : {
						type: 'DropDownListRenderer',
						showEditorBtnOver: true,
						list: data, 
						keyField: 'code', 
						valueField: 'name' 							
					}
			 	});
				
				if(call_back != undefined) {
					call_back(result, data);
				}
			}, undefined, undefined, this, 'sync');
		} else {
			AUIGrid.setColumnPropByDataField(that.grid[index], data_field, {
				editable: true,
				labelFunction: function( rowIndex, columnIndex, value, headerText, item ) { 
					var retStr = value;
					for(var i = 0, len = data1.length; i < len; i++) {
						if(data1[i]['code'] == value) {
							retStr = data1[i]['name'];
							break;
						}
					}
					
					return retStr;
				}, editRenderer: {
					type: 'DropDownListRenderer',
					showEditorBtnOver: true,
					list: data1, 
					keyField: 'code', 
					valueField: 'name' 							
				}
		 	});
			
			if(call_back != undefined) {
				call_back();
			}
		}
	},
	
	setColumnPropByCalendar: function(index, data_field) {
		AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
			editable: true,
			dataType: 'date',
			formatString: 'yyyy-mm-dd',
			editRenderer: {
				type: 'CalendarRenderer',
				openDirectly: true,
				onlyCalendar: true,
				showEditorBtn : true,
				showEditorBtnOver: true
			}
		});
	},
	
	setPlanIdDate: function(mode) {
    	var that = this;
    	
		if($('#planId').val() == '') {
			return;
		}
		/* modify hists
		 * XMOMD10 / 20191105 / pyj / PlanId로 PlanDate mapping하는 쿼리 공통으로 수정(정규발주제외). mode3까지 있던 부분 mode1까지로 줄임.
		 */
		/* start XMOMD10 */
		var queryId = 'plan.demand.demandPlan.planId_date';
		if(mode != undefined && mode == 1) {
			queryId = 'purchase.purchasing.regularOrder.planId_date';
		} 
		
		mom_ajax('R', queryId, {planId: $('#planId').val()}, function(result, data) {
			if(result == 'SUCCESS') {
				if(mode != undefined && mode == 1) {
					$("#fromDate").val(to_date_yyyy_mm_dd(data[0].planDate));
					$("#toDate").val(get_date_diff2(to_date_yyyy_mm_dd(data[0].planDate), 30));
				} else {
					$('#fromDate').val(to_date_yyyy_mm_dd(data[0].fromDate));
					$('#toDate').val(to_date_yyyy_mm_dd(data[0].toPlanDate));
				}
					
				//if(mode != undefined && mode == 3) {
					
				/*} else {
					$('#fromDate').val(to_date_yyyy_mm_dd(data[0].planDate));
					$('#toDate').val(to_date_yyyy_mm_dd(data[data.length -1].planDate));
				}*/
				/* end XMOMD10 */
			}
		});
	}, 
	
    getDiff: function(sDate, eDate, mode, param1, param2) {
    	var FORMAT = '-';
		var pivot = '';

        var start_dt = sDate.split(FORMAT);
        var end_dt = eDate.split(FORMAT);
        start_dt[1] = (Number(start_dt[1]) - 1) + '';
        end_dt[1] = (Number(end_dt[1]) - 1) + '';
        var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2], '00', '00');
        var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2], '00', '00');
        var compareDay = (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24 + 1;
        for(var i = 0; i < compareDay; i++) {
            var newDay = new Date(sDate);
            newDay.setDate(newDay.getDate() + i);
            var changeDay = new Date(newDay);
            var changeFY = changeDay.getFullYear();
            var changeHY = changeFY + '';
            var changeHY = changeHY.substring(2, 4);
            var changeM = changeDay.getMonth() + 1;
            var changeD = changeDay.getDate() + 0;
            
            if(changeM < 10) {
                changeM = '0' + changeM;
            } else {
            	changeM = '' + changeM;
            }
            
            if(changeD < 10) {
                changeD = '0' + changeD;
            } else {
            	changeD = '' + changeD;
            }
            
            var lastDay = changeFY + changeM + changeD;
            var lastDisplayDay = changeHY + '/' + changeM + '/' + changeD;            
            if(mode == 0) {
            	if(param1 == undefined && param2 == undefined) {
		            if(i == 0) {
		            	pivot =  "'" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", '" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
		            }
            	} else {
            		if(i == 0) {
		            	pivot =  " " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
		            }
            	}
            } else if(mode == 1) {
            	if(param1 == undefined && param2 == undefined) {
            		pivot +=  ", '" + lastDay  +"' AS \"" + lastDisplayDay +"\"";
            	} else {
            		pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
            	}
            } else if(mode == 2) {
            	if(param1 == undefined && param2 == undefined) {
		        } else {
            		if(i == 0) {
		            	pivot =  " " + param1 + "('" + lastDay  +"' , '" + param2 + "') AS \"" + lastDisplayDay +"\"";
		            } else {
		            	pivot +=  ", " + param1 + "('" + lastDay  +"' , '" + param2 + "') AS \"" + lastDisplayDay +"\"";
		            }
            	}
            } else if(mode == 3) {
            	if(param1 == undefined && param2 == undefined) {
		        } else {
	            	pivot +=  ", " + param1 + ", '" + lastDay  +"' , " + param2 + " AS \"" + lastDisplayDay +"\"";
            	}
            }
        } 
        
        return pivot;
	},
	
	getDiff2: function(sDate, mode, param, cnt) {
		var pivot = '';
		var changeDay = new Date(sDate);
		var changeM = changeDay.getMonth() + 1;
		var param1 = param;
		var dayOfWeek = changeDay.getDay();
		var date1 = new Date(sDate);
		var firDay = new Date();
		var weekNm = Math.ceil(date1.getDate() / 7);
		var minusDay = 0;
		
		if(mode == 1) {
			for(var i = 0; i < 3; i++) {
				changeM = changeDay.getMonth() + 1
	        	param1 = param.replace(/#/gi, i + 1);
				if(mode == 1) {
					if(i == 0) {
						changeM = changeM - 3;
					} else if(i == 1) {
						changeM = changeM - 2;
					} 
					
					if(changeM < 0) {
						changeM = 13 + changeM;
					} else if(changeM == 0) {
						changeM = changeM + 1;
					} else if(changeM > 0 && i != 2) {
						changeM += 1;
					}
					
					var displayMonth = changeM + 'M';
					pivot += "," + param1 + " AS \"" + displayMonth +"\"";
				} 
			}
			
		} else if(mode == 2) {
			if(dayOfWeek == 0 && weekNm != 1) {
				weekNm -= 1;
			}
			
			if(cnt != '' && cnt != null && cnt != undefined) {
				weekNm = cnt;
			}
			
			for(var i = 0; i < weekNm; i++) {
				if(i > 0) {
					minusDay -= 7;
				}
			}
			
			for(var i = 0; i < weekNm; i++) {
				param1 = param.replace(/#/gi, i + 1);
				
				if(i == 0) {
					switch(dayOfWeek) {
						case 0 : firDay = date1.setDate(date1.getDate() - 6 + minusDay); break; //SUN
						case 1 : firDay = date1.setDate(date1.getDate() - 7 + minusDay); break;  //MON
						case 2 : firDay = date1.setDate(date1.getDate() - 1 + minusDay); break; //TUE
						case 3 : firDay = date1.setDate(date1.getDate() - 2 + minusDay); break; //WED
						case 4 : firDay = date1.setDate(date1.getDate() - 3 + minusDay); break; //THU
						case 5 : firDay = date1.setDate(date1.getDate() - 4 + minusDay); break; //FRI
						case 6 : firDay = date1.setDate(date1.getDate() - 5 + minusDay); break; //SAT
						default : firDay = date1.setDate(date1.getDate()) //MON
					}
					
					if(dayOfWeek == 0) {
						firDay = date1.setDate(date1.getDate() - 7);
					}
				} 
				
				if(i != 0 || dayOfWeek == 0 || dayOfWeek == 1) {
					firDay = date1.setDate(date1.getDate() + 7);
				}
				
				firDay = (date1.getMonth() + 1) + '/' + date1.getDate();
				pivot += "," + param1 + " AS \"" + firDay + 'W\"';
			}
			
		} else if(mode == 3) {
			for(var i = 0; i < 7; i++) {
				param1 = param.replace(/#/gi, i + 1);
				if(i == 0) {
					switch(dayOfWeek) {
						case 0 : firDay = date1.setDate(date1.getDate() - 6); break; //SUN
						case 1 : firDay = date1.setDate(date1.getDate() - 7); break;  //MON
						case 2 : firDay = date1.setDate(date1.getDate() - 1); break; //TUE
						case 3 : firDay = date1.setDate(date1.getDate() - 2); break; //WED
						case 4 : firDay = date1.setDate(date1.getDate() - 3); break; //THU
						case 5 : firDay = date1.setDate(date1.getDate() - 4); break; //FRI
						case 6 : firDay = date1.setDate(date1.getDate() - 5); break; //SAT
						default : firDay = date1.setDate(date1.getDate()) //MON
					}
					
					if(dayOfWeek == 1) {
						date1.setDate(date1.getDate() + 7);
					}
				} else {
					date1.setDate(date1.getDate() + 1);
				}
				
				firDay = (date1.getMonth() + 1) + '/' + date1.getDate();
				
				pivot += "," + param1 + " AS \"" + firDay +'\"';
			} 
		}
        return pivot;
        
	},
	
	
	/* modify hists
	 * XMOMC20 / 20191107 / pyj / 확정생산계획업로드, psi pivot 생성 분기 mode 수정 
	 */
	setColDate : function(index, mode, callBack, your) {
		var that = this;
		
		var columnLayout = AUIGrid.getColumnLayout(this.grid[index]);
		if(columnLayout != undefined && your.initColSize != -1 && columnLayout.length > your.initColSize) {
			for(var i = columnLayout.length - 1; i >= your.initColSize; i--) {
				AUIGrid.removeColumn(this.grid[index], i);
			}
		}
		
		var queryId = 'plan.plan.salesOrderUpload.getDueDate';
		
		//if(mode == 1) {
			var productionPlanId = your.planId;
			$.ajax({
				url  		: that.contextPath() + '/mom/request/com.thirautech.mom.plan.plan.productionPlan.productionPlanId.dummy',
				type 		: 'GET',
				data 		: {planDate:$('#planDate').val()},
				async		: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success 	: function(data) {
					if(data.length > 0) {
						productionPlanId = data[0]['planId'];
					} else {
						productionPlanId = planId;
					}
				},
				error		: function(data) {},
				fail 		: function(data) {}
			});
			
			your.initParam['planId'] = productionPlanId;
			queryId = 'plan.plan.productionPlan.planId_date';
		if(mode == 2 || mode == 3) { // XMOMC20
			queryId = 'plan.plan.productionPlan.planId_days';
		} 
		
		mom_ajax('R', queryId, your.initParam, function(result, data) {
			var dueDateList = [];
			var dueDayList  = [];
			var colDateList = [];
			
			if(mode == 0) {
				your.colDate = '';
			}
			if(data != undefined) {
				if(mode == 1 || mode == 2) { // XMOMC20
					your.fromDate = data[0].planDate;
					your.toDate = data[data.length - 1].planDate;
				}
				
				for(var i = 0; i < data.length; i++) {
					if(mode == 0) {
						dueDateList[i] = data[i]['dueDate'];
					} else {
						dueDateList[i] = data[i]['planDate'];
					}
					
					if(mode != 3) {
						dueDayList[i] = data[i]['eday'];
						colDateList[i] = dueDateList[i] + dueDayList[i];
					}
					
					if(mode == 0) {
						if(i == 0) {
							your.colDate = "TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[0].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[0].substring(4, 6) + "/" + colDateList[0].substring(6, 8) + "(" + colDateList[0].substring(8, 11).toLowerCase() + ")"+ "\"";
						} else {
							your.colDate += ", TO_CHAR(SUM(DECODE(TO_CHAR(DUE_DATE, 'YYYYMMDD'), '" + colDateList[i].substring(0, 8) + "', QTY, 0))) AS \"" + colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8) + "(" + colDateList[i].substring(8, 11).toLowerCase() + ")"+ "\"";
						}
					}

					var key = '';
					var columnObj = undefined;
					if(mode == 0) {
						key = colDateList[0].substring(4, 6) + '/' + colDateList[0].substring(6, 8) + '(' + colDateList[0].substring(8, 11).toLowerCase() + ')';
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###'};
					} else if(mode == 1) {
						key = colDateList[i].substring(2, 4) + "/" + colDateList[i].substring(4, 6) + "/" + colDateList[i].substring(6, 8);
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###', excelTemplateHide : 2};
					} /* start XMOMC20 */
					else if(mode == 2) {
						key = dueDateList[i].substring(2, 4) + "/" + dueDateList[i].substring(4, 6) + "/" + dueDateList[i].substring(6, 8);
						columnObj = {dataField : key, dataType : 'numeric', formatString : '#,###'};
					 /* end XMOMC20 */
					} else if(mode == 3) {
						key = dueDateList[i].substring(2, 4) + "/" + dueDateList[i].substring(4, 6) + "/" + dueDateList[i].substring(6, 8);
						columnObj = { 
							dataField: key, 
							dataType: 'numeric', 
							formatString: '#,###', 
							styleFunction:  function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.category.match('BALANCE')) {
									if(parseInt(value) < 0) {
										return 'redStyle';
									}
									
									return null;
								}
								
								return null;
							}, excelHide: true
						};
						
						if(i == 0) {
							your.pivot = '\'' + dueDateList[i] + '\' AS "' + dueDateList[i].substring(2,4) + '/' + dueDateList[i].substring(4,6) + '/' + dueDateList[i].substr(6,8) + '"';
						} else {
							your.pivot += ', \'' + dueDateList[i] + '\' AS "' + dueDateList[i].substring(2,4) + '/' + dueDateList[i].substring(4,6) + '/' + dueDateList[i].substr(6,8) + '"';
						}
					} 
					
					AUIGrid.addColumn(that.grid[index], columnObj, 'last');
				}
				
				callBack();
			}
		}, undefined, undefined, this, 'sync');		
	}, 
	
	// Deprecated -> date2StringData19 in TU_MOM.common.js
	setDueDate: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		AUIGrid.setColumnPropByDataField(that.grid[index], 'dueDate', {
			  style: 'columnStyle'
			, labelFunction: function(rowIndex, columnIndex, value, item) { 
					if(value.length > 12) {
						var day = value.substring(0, 10);
						if(parseInt(value.substring(11, 13)) > 0) {
							var new_day = get_date_diff2(day, 1); 
							return new_day;
						} else {
							return day;
						}
					}
					
					return value;
			}, editRenderer: {
				type: 'InputEditRenderer'
			}
		});
	}, 
	
	setEndPeriod: function(menuId, your) {
		mom_ajax('R', 'common.comEndPeriod', {menuId: menuId}, function(result, data) {
			if(result == 'SUCCESS' && data.length > 0) {
				your.endPeriod = data[0]['endPeriod'];
			}
		}, undefined, undefined, this, 'sync');
	},
	
	getSearchParam: function() {
		var param = location.search.replace('?','');
		if(param == '') { 
			return {}; 
		}
		
		eval('var search = {' + param.replace(/=/gi, ':"').replace(/&/gi, '",') + '"' + '}');
		return search;
	},
	
	exportToXlsx: function(index, fileName, data, your) {
		if(data == undefined) {
			AUIGrid.exportToXlsx(this.grid[index], {fileName: fileName + '_' + get_current_date("yyyy-mm-dd")});
			return;
		}
		
		var that = this;
		
		if(this.specExcelGrid[index] == undefined) {
			$('body').append('<div id="temp_div4_' + (index + 1) + '" style="width:100%; position:fixed; height:100%; z-index: -999; top:0px"><div id="specExcelGrid' + (index + 1)  + '"></div></div>');
			
			var excelProperty = JSON.parse(JSON.stringify(AUIGrid.getColumnLayout(this.grid[index])));
			
			if(your != undefined && your['specExcelDownCallInit'] != undefined) {
				your.specExcelDownCallInit(index, undefined, undefined, undefined);
			}
			if(your != undefined && your['specExcelDownParam'] != undefined) {
				excelProperty = JSON.parse(JSON.stringify(your.specExcelDownParam));
			}
			
			for(var i = excelProperty.length - 1; i >= 0 ; i--) {
				if(!excelProperty[i]['excelHide']) {
					excelProperty.splice(i, 1);
				} else if(excelProperty[i]['visible'] == undefined || !excelProperty[i]['visible']) {
					excelProperty[i]['visible'] = true;
				}
			}
			
			this.specExcelGrid[index] = AUIGrid.create('#specExcelGrid' + (index + 1), excelProperty, {showRowNumColumn: false});
		} 
		
		AUIGrid.setGridData(this.specExcelGrid[index], data);	
		
		var option = {fileName : fileName};
		option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
			$('.aui-grid-export-progress-modal').remove();
			that.splashHide();
			
			$('#temp_div4_' + (index + 1)).remove();
			AUIGrid.destroy(that.specExcelGrid[index]);
		}
		
		option.progressBar = true;
		
		AUIGrid.exportToXlsx(this.specExcelGrid[index], option);
		
		$('.aui-grid-export-progress-modal').height('100%');
		$('#grid' + (index + 1)).children().append($('.aui-grid-export-progress-modal'));
	},
	
	postSetGridData: function(index) {
		for(var i = 0; i < this.indexColumn[index].length; i++) {
			if(this.indexColumn[index][i]['formatString'] != undefined && this.indexColumn[index][i]['formatString'] != '') {
				const INDEX = this.indexColumn[index][i]['INDEX'];
				const type = (this.columnProperty[index][INDEX]['popUp'] != undefined && this.columnProperty[index][INDEX]['popUp'] == 'CALENDAR') ? 'CalendarRenderer' : 'InputEditRenderer';
				if(this.indexColumn[index][i]['formatString'].toUpperCase() == 'YYYY-MM-DD' && this.indexColumn[index][i]['formatString'].length >= 10) {										
					const data_field = this.columnProperty[index][INDEX]['dataField']; 
					AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							if(value != undefined) {
								value = value.replace(/-/gi,'').replace(/\//gi,'').replace(/ /gi,'').replace(/:/gi,'');
								return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8);
							}
						}, editRenderer: {
							type: type,
							openDirectly: true,
							onlyCalendar: true,
							showEditorBtn : true,
							showEditorBtnOver : true
						}
				 	});
				} else if(this.indexColumn[index][i]['formatString'].toUpperCase().indexOf('YYYY-MM-DD HH') >= 0 && this.indexColumn[index][i]['formatString'].length >= 19) {										
					const data_field = this.columnProperty[index][INDEX]['dataField']; 
					AUIGrid.setColumnPropByDataField(this.grid[index], data_field, {
						labelFunction: function(rowIndex, columnIndex, value, item) { 
							value = value.replace(/-/gi,'').replace(/\//gi,'').replace(/ /gi,'').replace(/:/gi,'');
							return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8) + ' ' + (value.substring(8,10) == '' ? '00' : value.substring(8,10)) + ':' + (value.substring(8,10) == '' ? '00' : value.substring(10,12)) + ':' + (value.substring(8,10) == '' ? '00' : value.substring(12,14));
						}, editRenderer: {
							type: type,
							formatString: 'yyyy-mm-dd hh24:mi:ss',
							openDirectly: true,
							onlyCalendar: true
						}
				 	});
				}
			}
		}
		
		if(this.sortParam[index] != undefined && this.sortParam[index].length > 0) {
			AUIGrid.setSorting(this.grid[index], this.sortParam[index]);
		}
	},
	
	addFileColumn: function(index1, index2, pos, pageId, id) {
		var that = this.grid == undefined ? this.momWidget : this;
		
		$('#fileBtn' + (index2 + 1)).remove(); 
		$('#fileUpload' + (index2 + 1)).removeClass('w-input').css('margin-bottom', 0).attr('type', 'file');
		$('#filePop' + (index2 + 1) + ' .searcharea form').append('<input name="attach' + (index2 + 1) + '" id="attach' + (index2 + 1) + '" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
		
		var fileColumn = {
			'headerText':'File', 'dataField':'File', 'width':40, 'visible':true
			,  renderer : { 
				type : 'TemplateRenderer'
			}, labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { 
				return '<div class="grid2FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		};
			
		AUIGrid.addColumn(that.grid[index1], fileColumn, pos);
		
		var that = this;
		var depId;
		
		$(document).on('click', '.grid2FileBtn', function() {
			AUIGrid.resize(that.grid[index2], $(window).width() * 0.4 - 48, 150);
			var rowIndex = $(this).attr('row-index');
			var item = AUIGrid.getItemByRowIndex(that.grid[index1], rowIndex);
			depId = item[id];
			$('#fileUpload' + (index2 + 1)).val('');
			
			var param = { 
				entityName: pageId,
				entityId : depId
			}
			
			that.findBtnClicked(index2, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(that.grid[index2], data);
				$('#filePop' + (index2 + 1)).momModal('show');
				AUIGrid.resize(that.grid[index2]);
			});
		});
		
		var isExist = document.getElementById('fileUploadBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileUploadBtn' + (index2 + 1), function() {
				if($('#fileUpload' + (index2 + 1)).val() == '') {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10347']});
					return;
				}
				
				if(depId == undefined) {
					that.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10113']});
					return;
				}
				
				var attach = document.getElementById('fileUpload' + (index2 + 1));
				attach_upload(attach, pageId, depId, '{}', function(result, data) {
					if(result == 'SUCCESS') {
						var param = {
							entityId   : depId,
							entityName : pageId
						};
						
						that.findBtnClicked(index2, false, param, function(result, data) {
							if(result != 'SUCCESS') {
								return;
							}
							
							AUIGrid.setGridData(that.grid[index2], data);
						});
					}
				});
			});
		}
		
		isExist = document.getElementById('fileDelBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileDelBtn' + (index2 + 1), function() {
				var items = AUIGrid.getCheckedRowItems(that.grid[index2]);
				if(items.length == 0) {
					that.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10584']});
					return;
				}
				var param = [];
				for(var i = 0; i < items.length; i++) {
					param[i] =  {fileId: items[i].item['fileId']};
				}
								
				mom_ajax('LD', 'common.file', JSON.stringify(param), function(result, data) {
					if(result == 'SUCCESS') {
						var param = {
							entityId   : depId,
							entityName : pageId
						}
						
						that.findBtnClicked(index2, false, param, function(result, data) {
							if(result != 'SUCCESS') {
								return;
							}
							
							AUIGrid.setGridData(that.grid[index2], data);
						});
					}
				});
			});
		}
	
		isExist = document.getElementById('fileDownBtn' + (index2 + 1));
		if(isExist != undefined) {
			$(document).on('click', '#fileDownBtn' + (index2 + 1), function() {
				var items = AUIGrid.getCheckedRowItems(that.grid[index2]);
				for(var i = 0; i < items.length; i++) {
					attach_download(depId, pageId, items[i].item.oldFileName);	
				}
			});
		}
		
		$(document).on('click', '.bntpopclose, #fileCloseBtn' + (index2 + 1), function() {
			$('#filePop' + (index2 + 1)).momModal('hide');
		});
	}, 
	
	/* modify hists
	 * 20191116 / pyj / 웹 엑셀 등록 후 취소 할 경우 라인 그어지고 데이터 안없어지는 현상 수정
	 */
	clickCancelBtn2: function(index, your) {
		var that = this.grid == undefined ? this.momWidget : this;
		$(document).on('click', '#cancelCellBtn' + (index + 1), function() {
			var checkedItems = AUIGrid.getCheckedRowItems(that.grid[index]);
			if(checkedItems.length <= 0) {
				that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10585']});
				return;
			}
			
			if(your != undefined && your.cancelCallInit != undefined) {
				your.cancelCallInit(index, checkedItems, undefined, {'index' : index, 'op' : 'cancelBtn'+ (index + 1)});
				if(your['initMessage'] != undefined) {
					var err = your['initMessage'];
					that.messageBox({type:'warning', width:'400', height: '145',  html: err});	
					your['initMessage'] = undefined;
					return;
				}
			}
			
			AUIGrid.removeCheckedRows(that.grid[index]); 
			AUIGrid.removeSoftRows(that.grid[index]); // 20191116 / 추가
//			AUIGrid.setAllCheckedRows(that.grid[index], true);
			if(your != undefined && your.cancelCallBack != undefined) {
				your.cancelCallBack(index, checkedItems, undefined, {'index' : index, 'op' : 'cancelBtn'+ (index + 1)});
			}
		});
	},
	
	clickAllCancelBtn: function(index) {
		var that = this.grid == undefined ? this.momWidget : this;
		$(document).on('click', '#allCancelBtn' + (index + 1), function() {
			var gridData = AUIGrid.getGridData(that.grid[index]);
			if(gridData.length <= 0) {
				that.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES10328']});
				return;
			}
			
			AUIGrid.clearGridData(that.grid[index]);
		});
	},
	
	/* modify hist
	 * 20191114_001 / pyj / 명세서 출력 함수 인자 추가 및 파라미터명 일부 수정
	 */
	specPrint: function(pageId, queryId1, queryId2, id, menuCode1, menuCode2, param1, message) {// 20191114_001 / queryId2 추가
		var that = this.grid == undefined ? this.momWidget : this;
		
		var ids = "";
		for(var i = 0; i < param1.length; i++) {
			if(i == 0) {
				ids += "'" + param1[i]['' + id] + "'";
			} else {
				ids += ",'" + param1[i]['' + id] + "'";
			}
		}
		
		var reportUrl = "";
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data == undefined || data.length < 1) {
				return;
			}
			
			reportUrl = data[0].reportApplicationUrl;
		}, undefined, undefined, undefined, 'sync');
		
		var param = {};
		param[id + 's'] = ids;
		mom_ajax('R', queryId1, param, function(result, data) {
			if(data.length > 0 && data[0]['rowCount'] <= 0) {
				that.messageBox({type:'warning', width:'400', height:'145', html:message});				
				return;
			}
			
			var idsUrl = ids.replace("/'/gi","");
			
			var param1 = 'divisionCd='+ sessionStorage.getItem('divisionCd') + '&companyCd=' + sessionStorage.getItem('companyCd') + '&excelId=' + pageId;
			var param2 = 'divisionCd='+ sessionStorage.getItem('divisionCd') + '&companyCd=' + sessionStorage.getItem('companyCd') + '&' + id + 's=' + idsUrl + '&' + menuCode1 + '=' + menuCode2 + '&excelId=' + pageId + '&pId=' + pageId;
			
			var jsonStr1 = {'URL': 'http://' + window.location.host + tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comExcelPrintFormCall.dummy?' + param1};
			var jsonStr2 = {'URL': 'http://' + window.location.host + tuCommon.contextPath() + '/mom/request/com.thirautech.mom.' + queryId2 + '.dummy?' + param2}; // 20191114_001 / queryId1 -> queryId2
			
			var jsonList = [];
			
			jsonList.push(jsonStr1);
			jsonList.push(jsonStr2);
			
			var new_popup = window.open(reportUrl + JSON.stringify(jsonList),'_blank', 'width=10, height=10, left=0, top=0 toolbar=no, menubar=no, scrollbars=no, resizable=yes');
			setTimeout(function () {
				new_popup.close();
			}, 400);
		});
	},
/*}

var momSplash = {*/
	splitterI: 0,
    splitter: function($el, orientation, size, collapsible) {
		$el = $($el);
		var splitterI = this.splitterI++;
		var className = $el.attr('class');
		if(collapsible == undefined || collapsible == null) {
			collapsible = true;
		}
		$el.append($('<div id="splitter' + splitterI + '" class="' + className + '"></div>'));
		$el.children().css('background', 'inherit');
		$el.children(':eq(1)').css('padding-left', '0px');
		$('#splitter' + splitterI).append($el.children(':eq(0)'));
		$('#splitter' + splitterI).append($el.children(':eq(0)'));
		$('#splitter' + splitterI).jqxSplitter({width: 'calc(100% - 2px)', height:'calc(100% - 2px)', orientation: orientation, panels: [{ size: size, collapsible: collapsible }]});
		$('#splitter' + splitterI).css('border', 'none');
		
		$(window).resize(
				function() {
					AUIGrid.resize(momWidget.grid[0]); 
					AUIGrid.resize(momWidget.grid[1]); 
					AUIGrid.resize(momWidget.grid[2]); 
				}
		);
		$(window).resize(
				function() {
					AUIGrid.resize(momWidget.grid[0]); 
					AUIGrid.resize(momWidget.grid[1]); 
					AUIGrid.resize(momWidget.grid[2]); 
				}
		);
	},
	parentIdHierarchy: function(data, parentKey, childKey) {
		parentKey = parentKey || 'parentId';
		childKey = childKey || 'child';
		var result = [];
		var nameSeq = {};
		
		var keyValueObj = this.keyValueSet({key : 'id', data:data});
		
		for(var key in keyValueObj) {
			var obj = keyValueObj[key];
			var parentId = obj[parentKey];
			if(parentId == 'root') {
				result.push(obj);
			} else {
				if(keyValueObj[parentId]) {
					if(keyValueObj[parentId][childKey] == null) {
						keyValueObj[parentId][childKey] = [];
					} 
					keyValueObj[parentId][childKey].push(obj);
				}
			}
		}
		result.sort(function (a, b) {
			return a.displayOrder - b.displayOrder
		});
		return result;
	},
	keyValueSet: function (options) {
        // options : key, data[]
        // [{col1:"1",col2:"2" },{col1:"11", col2:"22"}]
        // key col1
        // {1: {col1:"1", col2:"2"}, 11: {col1:"11", col2:"22"}}
        // toLowerCase : true -> key 무조건 소문자
        // type : obj, array
        // 배열 오브젝트를 키 오브젝트로 바꿔준다.

        var data = options.data;
        var key = options.key;
        var type = options.type || 'obj';
        var toLowerCase = options.toLowerCase;

        var result = {};
        $.each(data, function (i, v) {
            if (key) {
                var resultKey = v[key];
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == 'array') {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            } else {
                var resultKey = v;
                if (toLowerCase) {
                    resultKey = resultKey.toLowerCase();
                }
                if (type == 'array') {
                    if (result[resultKey] == null) {
                        result[resultKey] = [];
                    }
                    result[resultKey].push(v);
                } else {
                    result[resultKey] = v;
                }
            }
        });
        return result;
    },
	splash: undefined,
	splash1: undefined,
	splash2: undefined,
    splashName1: 'spinner1_',
    splashName2: 'spinner2_',
    splashIds: [],
    splashInitFlag: true,
    
    splashInit: function() {
    	if(this.splashInitFlag) {
            var that = this;
            $(window).resize(function() {
                //for(var i in that.splashIds) {
                    that.splashResize('#' + that.splashIds[0], 'load');
                    that.splashResize('#' + that.splashIds[1]);
                //}
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
        var html = 	 '<div id="#{id}" style="display:none; position: fixed; top:#{top}; text-align: center;font-size: #{fontSize};z-index: 99999999999;background: #{background}; color:white;">' 
                	+	'<div class="w-icon fa fa-spinner fa-spin" style="position: fixed;"></div>';
        
        html += (options['load'] != undefined ? '<br /><br /><br /><div>Loading...</div>' : '');
        html += '</div>';
        
        if(options['load'] != undefined) {
        	el.find('#' + this.splashName2 + el.attr('id')).remove();
        	el.prepend(html.replace(/#{id}/gi, this.splashName1 + el.attr('id')).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + 'px'));
        } else {
        	el.find('#' + this.splashName2 + el.attr('id')).remove();
        	el.prepend(html.replace(/#{id}/gi, this.splashName2 + el.attr('id')).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + 'px'));
        }
        
        for(var i in this.splashIds) {
        	this.splashResize('#' + this.splashIds[i], options['load']);
        }
        
        if(options != undefined) {
        	return '#' + this.splashName1 + el.attr('id');
        }
        
        return '#' + this.splashName2 + el.attr('id');
    },
    
    splashResize: function(el, load) {
        var height = $(el).height();
        var width = $(el).width();
        var spinner = undefined;
        if(load != undefined) {
        	spinner = $('#' + this.splashName1 + $(el).attr('id'));
        } else {
        	spinner = $('#' + this.splashName2 + $(el).attr('id'));
        }
        
        spinner.width(width);
        spinner.height(height);
        spinner.find('.fa').css('line-height', height + 'px');
    },
    
    splashShow: function(load) {
    	if(load != undefined) {
	        if(this.splash1 == undefined && this.splashIds[0] == undefined) {
	            var ret = this.splashSet({load:load});
	        }
	       
	        $('#' + this.splashName1 + this.splashIds[0]).show();
	    } else {
    		if(this.splash2 == undefined && this.splashIds[1] == undefined) {
    			var ret = this.splashSet();
	        }
	       
	        $('#' + this.splashName2 + this.splashIds[1]).show();
    	}
    },
    
    splashHide: function(load) {
    	if(load != undefined) {
    		$('#' + this.splashName1 + this.splashIds[0]).hide();
    	} else {
    		$('#' + this.splashName2 + this.splashIds[1]).hide();
    	}
    },
    
    contextPath: function() {
		return '/TU_Platform';
	}
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
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if(this.options.remote) {
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
        if(this.isShown || e.isDefaultPrevented()) {
        	return;
        }

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('mm-open');

        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.momModal', '[data-dismiss="momModal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.momModal', function () {
            that.$element.one('mouseup.dismiss.bs.momModal', function (e) {
                if($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            })
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');
            if(!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element.show().scrollTop(0);
            that.adjustDialog();
            if(transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');
            that.enforceFocus();
            var e = $.Event('shown.bs.momModal', { relatedTarget: _relatedTarget });

            transition 
            	? that.$dialog 
            			.one('bsTransitionEnd', function () {
            				that.$element.trigger('focus').trigger(e)
            			})
            			.emulateTransitionEnd(momModal.TRANSITION_DURATION) 
            	: that.$element.trigger('focus').trigger(e);
        });
        
        if(that.options.draggable) {
            that.$element.children().first().draggable({
                handle: '.panel-heading'
            });
        }

        if(that.options.width) {
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
        if(that.$element.parents('[splitter=col]').length > 0) {
            var colHeight = that.$element.parents('[splitter=col]').height();
            that.$element.parents('[splitter=col]').height('initial');
            setTimeout(function () {
                that.$element.parents('[splitter=col]').height('');
                that.$element.parents('[splitter=col]').height(colHeight);
            });
        }

        if(that.options.resizable) {
            that.$dialog.css({
                overflow: 'hidden'
            });
            
            var resizable = {};
            if(typeof that.options.resizable == 'boolean') {
                resizable = {
                    minHeight: that.$dialog.height(),
                    maxHeight: that.$dialog.height(),
                    minWidth: that.$dialog.width()
                }
            } else {
                resizable = that.options.resizable;
            }
            
            that.$dialog.resizable(resizable);
        }
        
        var grid = $(this.$element.find('.cardcontent').find('div')).attr('id');
        if(grid != undefined && grid.length > 4 && grid.indexOf('grid') >= 0) {
        	AUIGrid.resize(momWidget.grid[parseInt(grid.substring(4,5)) - 1]);
        }
    };

    momModal.prototype.hide = function (e) {
        /*if(e) {
        	//e.preventDefault();
        }*/

        e = $.Event('hide.bs.momModal');

        this.$element.trigger(e);

        if(!this.isShown || e.isDefaultPrevented()) {
            return;
        }
        
        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.momModal');

        this.$element
        	.removeClass('in')
        	.off('click.dismiss.bs.momModal')
        	.off('mouseup.dismiss.bs.momModal');

        this.$dialog.off('mousedown.dismiss.bs.momModal');

        $.support.transition && this.$element.hasClass('fade') 
        	? this.$element
        		.one('bsTransitionEnd', $.proxy(this.hideModal, this))
        		.emulateTransitionEnd(momModal.TRANSITION_DURATION) 
        	: this.hideModal();
    };

    momModal.prototype.enforceFocus = function () {
        $(document)
        	.off('focusin.bs.momModal') // guard against infinite focus loop
        	.on('focusin.bs.momModal', $.proxy(function (e) {
        		if(this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        			this.$element.trigger('focus');
        		}
        	}, this));
    };

    momModal.prototype.escape = function () {
        if(this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.momModal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if(!this.isShown) {
            this.$element.off('keydown.dismiss.bs.momModal');
        }
    };

    momModal.prototype.resize = function () {
        if(this.isShown) {
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
        });
    };

    momModal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    momModal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if(this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $(document.createElement('div')).addClass('mm-backdrop ' + animate).appendTo(this.$body);
            this.$element.on('click.dismiss.bs.momModal', $.proxy(function (e) {
                if(this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;                    
                    return;
                }
                
                if(e.target !== e.currentTarget) {
                	return;
                }
                
                this.options.backdrop == 'static'
                	? this.$element[0].focus()
                	: this.hide();
            }, this));

            if(doAnimate) {
            	this.$backdrop[0].offsetWidth; // force reflow
            }

            this.$backdrop.addClass('in');
            if(!callback) {
            	return;
            }
            
            doAnimate 
            	? this.$backdrop
            		  .one('bsTransitionEnd', callback)
                	  .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) 
                : callback();
        } else if(!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback();
            };
            
            $.support.transition && this.$element.hasClass('fade') 
            	? this.$backdrop
            		  .one('bsTransitionEnd', callbackRemove)
            		  .emulateTransitionEnd(momModal.BACKDROP_TRANSITION_DURATION) 
            	: callbackRemove();
        } else if(callback) {
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
        });
    };

    momModal.prototype.resetAdjustments = function () {
        this.$element.css({
        	paddingLeft: '',
        	paddingRight: ''
        });
    };

    momModal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if(!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    momModal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if(this.bodyIsOverflowing) {
        	this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
        }
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
            if(options.yesCallBack && $.isFunction(options.yesCallBack)) {
                options.yesCallBack.call(this, true);
            }
            
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 400);
        });

        //no click event
        noBtn.on('click', function () {
            if(options.noCallBack && $.isFunction(options.noCallBack)) {
                options.noCallBack.call(this, false);
            }
            
            $(modalTop).momModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 400);
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
        if(typeof option == 'string' && option == 'getParams') {
            return $(this).data('params');
        }

        return this.each(function () {
            var $this = $(this);
            if(typeof option.params !== 'undefined') {
                $this.data('params', option.params);
            }
            
            var data = $this.data('bs.momModal');
            var options = $.extend({}, momModal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            $this.attr('tabindex', -1);
            if(!data) {
            	$this.data('bs.momModal', (data = new momModal(this, options)));
            }
            
            if(typeof option == 'string') {
                data[option](_relatedTarget);
            } else if(options.show) {
            	data.show(_relatedTarget);
            }
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

        /*if($this.is('a')) {
        	//e.preventDefault();
        }*/

        $target.one('show.bs.momModal', function (showEvent) {
            if(showEvent.isDefaultPrevented()) {
            	return; // only register focus restorer if modal will actually get shown
            }
            
            $target.one('hidden.bs.momModal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        
        Plugin.call($target, option, this);
        
        //e.preventDefault();
    });
})(jQuery);