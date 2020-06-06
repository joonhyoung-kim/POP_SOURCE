var MOMNA002 = {
	initMessage		: undefined,
	initParam		: undefined,
	initMemo		: undefined,
	initFlag		: undefined,
	cudFlag			: undefined,
	findFlag		: undefined,
	dataType		: 'S',
	groupType 		: undefined,
	currentFlag     : undefined,
	init: function() {  
		var that = this;
		Language.init(function() {
//			that.chart();
			that.chartInit();
			that.design();
			that.event();
			$('.gridWidgetSetBtns').css({'display':'none'});
			$('#memoContent').attr('readonly','readonly');
			$(window).resize(function() {
				AUIGrid.resize(momWidget.grid[0]); 
				AUIGrid.resize(momWidget.grid[1]); 
				AUIGrid.resize(momWidget.grid[2]); 
				AUIGrid.resize(momWidget.grid[3]); 
				AUIGrid.resize(momWidget.grid[4]); 
			});    
		});
	}, retrieveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'CC4') {
			that.groupType = data.groupType;
			that.initParam = {chartFlag: 'N', dataType: that.dataType, groupType: data.groupType};
		}
		//200529 / 최한슬 / 데이터생성 버튼 initParam 설정 
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			that.groupType = data.groupType;
			this.initParam = {weekDate : $("#week").val().replace(/-/gi, ''), chartFlag: 'N', dataType: that.dataType, groupType: data.groupType};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(2, function() {
						that.grid(data);
						that.findFlag = 'Y';
					});
				});
			});
			momWidget.splashHide();
			that.chart(data, param);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC4') {
			AUIGrid.setGridData(momWidget.grid[4], data);
			momWidget.dropDownPost(4, undefined, undefined, undefined, that);
			
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn4') {
			AUIGrid.setGridData(momWidget.grid[3], data);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEP5') {
			AUIGrid.setGridData(momWidget.grid[4], data);
		}
		
		//200529 / 최한슬 / 데이터생성 버튼 그리드&차트 그려주고 성공 메세지 출력
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			if(result == 'SUCCESS') {
	   			momWidget.splashHide();
	   			that.chart(data, param);
	   			that.grid(data);
				that.findFlag = 'Y';
	   			AUIGrid.setGridData(momWidget.grid[0], data);
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
	   			momWidget.splashHide();
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}
		
	}, saveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn4') {
			that.initParam = {dataType: that.dataType};
			var gridData = AUIGrid.getGridData(momWidget.grid[index]);
			for(var i = 0; i < gridData.length; i++) {
				for(var j = 0; j < gridData.length; j++) {
					if(i != j && gridData[i]['useYn'] == 'Y' && gridData[j]['useYn'] == 'Y') {
						if(gridData[i]['seq'] == null || gridData[i]['seq'] == ""){
							that.initMessage = Language.lang['MESSAGES12398'];
						} else if (gridData[i]['seq'] == gridData[j]['seq']) {
							that.initMessage = Language.lang['MESSAGES12281'];
						}
					}
				}
			}
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP5') {
			mom_ajax('R', 'eis.purchasePerformanceStatus.purchasePerformanceGroupCode', {chartFlag: 'N', groupType: that.groupType, dataType: that.dataType}, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				if(data1.length > 0) {
					for(var i = 0; i < data1.length; i++) {
						if(that.cudFlag == 'C') {
							if(data1[i]['useYn'] == 'Y' && data1[i]['seq'] == $('#seqEP2').val() && $('#useYnEP2').val() == 'Y') {
								that.initMessage = Language.lang['MESSAGES12281'];
							}
						
							if(data1[i]['itemGroupCode'] == $('#itemGroupCodeEP2').val()) {
								that.initMessage = Language.lang['MESSAGES12283'];
							}
						} else if(that.cudFlag == 'U') {
							if(data1[i]['useYn'] == 'Y' && data1[i]['seq'] == $('#seqEP2').val() && (data1[i]['itemGroupCode'] !=  $('#itemGroupCodeEP2').val())
									&& $('#useYnEP2').val() == 'Y') {
								that.initMessage = Language.lang['MESSAGES12281'];
							}
						}
					}
				}
			}, undefined, undefined, this, 'async');
		}
		//200529 / 최한슬 / 데이터생성 weekDate에 주차 첫번째 값 설정
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			mom_ajax('R', 'common.comWeekStartDate', {weekDate: $('#week').val().replace(/-/gi,'')}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data.length != 0) {
					that.initParam = {weekDate: $('#week').val().replace(/-/gi,'')};
				}
			}, undefined, undefined, that, 'async');
		}	
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn4') {
			momWidget.findBtnClicked(3, false, {dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[3], data);
			});
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP5') {
			momWidget.findBtnClicked(4, false, {chartFlag: 'N', groupType: that.groupType, dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[4], data);
			});
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			if(result == 'SUCCESS') {
				indexInfo['op'] = 'findBtn1';
				momWidget.findBtnClicked(0, false, {weekDate : $("#week").val().replace(/-/gi, '')}, that.retrieveCallBack(), indexInfo, that);
	   			momWidget.splashHide();
	   			AUIGrid.setGridData(momWidget.grid[index], data);
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
	   			momWidget.splashHide();
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}

		momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		momWidget.splashHide();
	}, delCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'delBtn5') {
			that.initParam = {dataType: that.dataType};
		}
	}, delCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'delBtn5') {
			momWidget.findBtnClicked(4, false, {chartFlag: 'N', groupType: that.groupType, dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				AUIGrid.setGridData(momWidget.grid[4], data);
				that.initParam = {dataType: that.dataType, groupType: that.groupType};
				momWidget.dropDownPost(1, undefined, undefined, undefined, that);
				momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
			});
		}
		momWidget.splashHide();
	}, createCallInit:function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(index != 4) {
			return;
		}
		if(indexInfo.op == 'createBtn5') {
			that.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn5') {
			that.cudFlag = 'U';
		}
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn5') {
			if(that.groupType == '' || that.groupType == null) {
				that.initMessage = Language.lang['MESSAGES12279'];
			}
			mom_ajax('R', 'eis.purchasePerformanceStatus.purchasePerformanceGroupCode', {chartFlag: 'N', dataType: that.dataType, groupType: that.groupType, useYnS: 'Y'}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				if(data.length >= 3) {
					that.initMessage = Language.lang['MESSAGES12282'];
				}
			},undefined, undefined, this, 'sync');
			
			$('#itemGroupLargeEP5').val(that.groupType);
			
		}
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
		mCommon.init("chart2", "W202002111643272809542G65fh5hjk4ff", null, null, Language);
		mCommon.renderMockChart("chart2", "W202002111643272809542G65fh5hjk4ff", Language);
	}, chart: function(data, param) {
		var desc = [];
		//1번 그래프 
		mom_ajax('R', 'eis.salesRevenueStatus.salesRevenuePart1Desc', {week : $("#week").val()}, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					desc[i] = data[i].description;
				}
			}
		}, undefined, undefined, this, 'async');
		
		var chart1Option = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[desc[0],desc[1],desc[2]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":desc[0],"type":"line","data":[],"itemStyle":{"color":"#585858"}},
						{"name":desc[1],"type":"line","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":desc[2],"type":"line","data":[],"itemStyle":{"color":"#FFBF00"}},
						{"name":desc[3],"type":"line","data":[],"itemStyle":{"color":"#2E64FE"}}
						
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.salesRevenueStatus.salesRevenuePart1.dummy", 
				{week : $("#week").val()}, 
				function (data) {
					for(var i = 0; i < data.length; i++) {
						var dataI = data[i];
						chart1Option.xAxis[0].data.push(dataI.mm);
						chart1Option.series[0].data.push(dataI.amt1);
						chart1Option.series[1].data.push(dataI.amt2);
						chart1Option.series[2].data.push(dataI.amt3);
					}
					var myChart = echarts.init(document.getElementById("chart1"));
					myChart.setOption(chart1Option);
			});
		
		//1번 우측 하단 표
		mom_ajax('R', 'eis.salesRevenueStatus.salesRevenuePlan', {week : $("#week").val()}, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			if(data.length > 0) {
				$('.sub-table:nth-child(1) .line-box.fir').find('.textblock').text(data[0].description);
				$('.sub-table:nth-child(2) .line-box.fir').find('.textblock').text(data[1].description);
				$('.sub-table:nth-child(3) .line-box.fir').find('.textblock').text(data[2].description);
				
				$('.sub-table:nth-child(1) .line-box.sec').find('.textblock').text(data[0].amt);
				$('.sub-table:nth-child(2) .line-box.sec').find('.textblock').text(data[1].amt);
				$('.sub-table:nth-child(3) .line-box.sec').find('.textblock').text(data[2].amt);
			}
		}, undefined, undefined, this, 'sync');
		
		//3번 좌측 하단 그래프
		var desc2 = [];
		//1번 그래프 
		mom_ajax('R', 'eis.salesRevenueStatus.salesRevenuePart3Desc', {week : $("#week").val()}, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					desc2[i] = data[i].trendType;
				}
			}
		}, undefined, undefined, this, 'async');
		
		var chart2Option = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[desc2[0],desc2[1]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":desc2[0],"type":"line","data":[],"itemStyle":{"color":"#585858"}},
						{"name":desc2[1],"type":"line","data":[],"itemStyle":{"color":"#ff5f00"}},
						
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.salesRevenueStatus.salesRevenuePart3.dummy", 
				{week : $("#week").val()}, 
				function (data) {
					for(var i = 0; i < data.length; i++) {
						var dataI = data[i];
						chart2Option.xAxis[0].data.push(dataI.week);
						chart2Option.series[0].data.push(dataI.amt1);
						chart2Option.series[1].data.push(dataI.amt2);
					}
					var myChart = echarts.init(document.getElementById("chart2"));
					myChart.setOption(chart2Option);
			});
		
	}, grid: function(data) {
		var that = this;
		//2번 우측 상단 그리드
		var curr = new Date();
		var currDate = get_current_date('YYYY-MM');
		var currYear = curr.getFullYear().toString();
		var nextYear = curr.getFullYear().toString();
		var currMonth = curr.getMonth() + 1;
		currMonth = currMonth < 10 ? '0' + currMonth : currMonth;
		var nextMonth = curr.getMonth() + 2;
		nextMonth = nextMonth < 10 ? '0' + nextMonth : nextMonth;
		currMonth = currMonth.toString();
		if(nextMonth > 12) {
			nextMonth = '01';
			nextYear = curr.getFullYear() + 1;
			nextYear = nextYear.toString();
		}
		nextMonth = nextMonth.toString();
		var currCol = currYear.substr(2,4) + 'Y' + currMonth;
		var nextCol = nextYear.substr(2,4) + 'Y' + nextMonth;
		
		AUIGrid.destroy(momWidget.grid[1]);
		
		var columnLayout = [{
				dataField : "businessGroup",
				headerText : Language.lang['MESSAGES10553'],
				width : 100,
				visible: true,
				cellMerge : true
			},{
				dataField : "trendType",
				headerText : Language.lang['MESSAGES10225'],
				width : 100,
				visible: true,
				cellMerge : true
			},{
				dataField : "seq",
				headerText : 'SEQ',
				width : 100,
				visible: false
			},{
				dataField : "model",
				headerText : Language.lang['주요모델'], //수정
				width : 100,
				visible: true
			},{
				dataField : "modelSeq",
				headerText : '모델SEQ', //수정
				width : 100,
				visible: false
			}, {
			  headerText: currCol
			, children: [{
				  dataField: 'currFromAmt'
					, headerText: '전주기준'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'currToAmt'
					, headerText: '금주기준'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'currGapAmt'
					, headerText: '증/감'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    	}] 
		}, {
			  headerText: nextCol
			, children: [{
				  dataField: 'nextFromAmt'
					, headerText: '전주기준'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'nextToAmt'
					, headerText: '금주기준'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'nextGapAmt'
					, headerText: '증/감'
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    	}] 
		}];
		var gridProps = {
				showRowNumColumn: false,
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				rowSelectionWithMerge : true,	
			    showBranchOnGrouping: false,			
				editable : false,
				fillColumnSizeMode: true,
				groupingFields: ['businessGroup'],
				summaryText: Language.lang['MESSAGES10697'],
				groupingSummary: {
					dataFields: ['currFromAmt', 'currToAmt', 'currGapAmt', 'nextFromAmt', 'nextToAmt', 'nextGapAmt']
				  , labelTexts: [Language.lang['MESSAGES10697']]},
				rowStyleFunction : function(rowIndex, item) {
					if(item.trendType == Language.lang['MESSAGES10697']) { 		// 소계 항목만 스타일 지정
						return 'my-row-style';
					}
					return null;
				}
		};
		
		
		AUIGrid.create(momWidget.grid[1], columnLayout, gridProps);
//		AUIGrid.setGridData(momWidget.grid[1], data);
		momWidget.findBtnClicked(1, false, undefined, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			
			AUIGrid.setGridData(momWidget.grid[1], data);
			momWidget.findBtnClicked(2, false, undefined, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[2], data);
			});
		});
		
//		AUIGrid.addColumn(momWidget.grid[1], column, 'first');
//		AUIGrid.changeColumnLayout(momWidget.grid[1], columnLayout);
		
//		AUIGrid.setProp(momWidget.grid[1], 'rowStyleFunction', function(rowIndex, item) {
//			if(item.trendType == Language.lang['MESSAGES10697']) { 		// 소계 항목만 스타일 지정
//				return 'my-row-style';
//			}
//		});
		
//		AUIGrid.setGroupBy(momWidget.grid[1],  ['trendType'], {
//	         dataFields: ['currFromAmt', 'currToAmt', 'currGapAmt', 'nextFromAmt', 'nextToAmt', 'nextGapAmt']
//			,labelTexts: [Language.lang['MESSAGES10697']]
//		});
		
		
//		momWidget.findBtnClicked(1, false, this.initParam, undefined, undefined, this);
		
		//3번 좌측 하단 그리드 푸터
		 var footerObject = [{
				labelText: 'TOTAL',
				positionField: 'trendType'
			},{
					dataField : 'plan',
					positionField : 'plan',
					operation : "SUM",
					dataType: 'numeric',
					style: "right-column",
					formatString: "#,##0"
				},
				{
					dataField : 'percent',
					positionField : "percent",
					operation : "SUM",
					dataType: 'numeric',
					style: "right-column",
					formatString: "#,##0"
				},
				{
					dataField : 'result',
					positionField : "result",
					operation : "SUM",
					dataType: 'numeric',
					style: "right-column",
					formatString: "#,##0"
				},
				{
					dataField : 'progress',
					positionField : "progress",
					operation : "SUM",
					dataType: 'numeric',
					style: "right-column",
					formatString: "#,##0"
				},
				{
					dataField : 'gap',
					positionField : "gap",
					operation : "SUM",
					dataType: 'numeric',
					style: "right-column",
					formatString: "#,##0"
				}
				
			];
			// footer 합계
			AUIGrid.setFooter(momWidget.grid[2], footerObject);
		 
		 that.getMemo();
		 momWidget.findBtnClicked(0, false, undefined, function(result, data) {
			if(result != 'SUCCESS') {
				return;
			}
			
			AUIGrid.setGridData(momWidget.grid[0], data);
		});
		 
	}, event: function() {
		var that = this;
		$(document).on('click', '#actionBtn2', function() {
			momWidget.findBtnClicked(3, false, {dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
	
				AUIGrid.setGridData(momWidget.grid[3], data);
			});
			$('#pop').momModal('show');
			AUIGrid.resize(momWidget.grid[4]);
		});
		$(document).on('click', '#pop .bntpopclose, #modalCloseBtn', function() {
			$('#pop').momModal('hide');
			AUIGrid.clearGridData(momWidget.grid[4]);
			momWidget.findBtnClicked(3, false, {groupType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[3], data);
			});
		});
		
		var currentWeek = null;
		
		// 날짜 검색조건 변경 시 페이지 클린
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comWeek.dummy', {}, function(data) {
			currentWeek = data[0].code;
			});

		// 날짜 검색조건 변경 시 페이지 클린
		$(document).on("change", "#week", function() {
	    	that.week = $("#week").val()
	   	    //선택된 날짜가 금주인지 설정 currentWeek 변경
	   	    if(currentWeek ==  $("#week").val()){
	   	    	that.currentFlag = 'Y'
	   		} else {
	    		that.currentFlag = 'N'
	   		}
	    	momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(2, function() {
						that.grid();	 
						that.findFlag = 'Y';
					});
				});
			});
	    	that.chart();
	      });
	      
		$('#memoContent').dblclick(function(){	
			$('#memoPop').momModal('show');
			if(that.currentFlag != 'Y'){
				$('#memoContents').attr('readonly','readonly');
				$('#memoConfirmBtn').prop('disabled', true);
				$('#memoConfirmBtn').css('pointer-events', 'none');
				$('#memoContents').text(that.initMemo);
			} else {
				$('#memoContents').removeAttr('readonly');
				$('#memoConfirmBtn').prop('disabled', false);
				$('#memoConfirmBtn').css('pointer-events', 'auto');
				$('#memoContents').text(that.initMemo);
			}
		});
		
		$(document).on('click', '#memoConfirmBtn', function() {
			momWidget.messageBox({type : 'info', width : '400', height : '145', html : Language.lang['MESSAGES11194'], closeButton : {text:"Close"}, okButton : {text:"OK", 
				after : function() {
					var param = {description: $('#memoContents').val(), notePart: 'S', week: $("#week").val()};
					if(that.initFlag == 'N') {
						mom_ajax('C', 'common.esiNote', JSON.stringify(param), function(){
							$('#memoPop').momModal('hide');
							that.getMemo();
						});
					} else {
						mom_ajax('U', 'common.esiNote', JSON.stringify(param), function(){
							$('#memoPop').momModal('hide');
							that.getMemo();
						});
					}
				}
			}});
		});
		
		$(document).on('click', '#cancelBtn, .bntpopclose', function() {
			$('#memoContents').val($('#memoContent').val());
			$('#memoPop').momModal('hide');
		});
		
	}, design: function(){
		$('head').append('<style>.my-row-style {background:#D8D8D8;font-weight:bold;color:#000;}</style>');
	}, getMemo: function() {
		var that = this;
		//4번 우측 하단 note
		 mom_ajax('R', 'common.esiNote', {notePart: 'S', week: $("#week").val()}, function(result, data) {
//			 $('#memoContent').attr('readonly','readonly');
			 if(result != 'SUCCESS') {
					return;
				}
				if(data.length > 0) {
					if(data[0] == null) {
						that.initMemo = '';
						$('#memoContent').val('');
						$('#memoContents').val('');
						that.initFlag = 'Y';
					} else {
						that.initFlag = 'Y';
						that.initMemo = data[0].description;
						$('#memoContent').val(data[0].description);
						$('#memoContents').val(data[0].description);
						$('#memoContent').css({'font-size':'15px'});
					}
				} else {
					that.initMemo = '';
					$('#memoContent').val('');
					$('#memoContents').val('');
					that.initFlag = 'N';
				}
				
			}, undefined, undefined, this, 'async');
	}
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMNA002', MOMNA002);
   momWidget.init(2, 'MOMNA002', MOMNA002);
   momWidget.init(3, 'MOMNA002', MOMNA002);
   momWidget.init(4, 'MOMNA002', MOMNA002);
   momWidget.init(5, 'MOMNA002', MOMNA002);
   MOMNA002.init();
});
