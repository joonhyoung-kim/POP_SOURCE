var MOMMC002 = {
	initMessage	: undefined, 
	initParam	: undefined,
	arrYyyymm 	: [],
	init: function() {
		var that = this;
		Language.init(function() {
			that.chartInit();
			that.design();
			$(window).resize(function() {
				AUIGrid.resize(momWidget.grid[0]); 
			});
		});
		
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}/*, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			
			this.initParam = {fromDate : $("#fromDate").val().replace(/-/gi, '')
							, pivot : momWidget.getDiff2($('#fromDate').val(), 2, " MAX(W#)", 15)
							};
		}
	}*/, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			momWidget.isInitGrid(0, function() {
				that.grid(data);
			});
			momWidget.splashHide();
			that.chart(data, param);
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
	}, chart: function(data, param) {
		var that = this;
		var chartOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[Language.lang['MESSAGES12088'],Language.lang['MESSAGES11758'],Language.lang['MESSAGES12309']],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
					{"type":"value","name":Language.lang['MESSAGES12309'],/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false}
				],
					"series":[{"name":Language.lang['MESSAGES12088'],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":Language.lang['MESSAGES11758'],"type":"bar","data":[],"itemStyle":{"color":"#ffff00"}},
						{"name":Language.lang['MESSAGES12309'],"type":"line","data":[],"itemStyle":{"color":"#00ff10"},"yAxisIndex":1}
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.salesAnalysis.salesAnalysis.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					for(var j = 0; j < that.arrYyyymm.length; j++) {
						if(i == 0) {
							chartOption.xAxis[0].data.push(that.arrYyyymm[j]);
						}
						chartOption.series[0].data.push(dataI['planM' + (j+1)]);
						chartOption.series[1].data.push(dataI['salesM' + (j+1)]);
						chartOption.series[2].data.push(dataI['rateM' + (j+1)]);
					}
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartOption);
		});
	}, grid: function(data) {
		var that = this;
		var yyyymm = $('#yyyymm').val();
		var month = Number(yyyymm.substring(6,4));
		var year = Number(yyyymm.substring(0,4));
		var arrMonth = [];
		that.arrYyyymm = [];
		
		for(var i = 11; i > -1; i--) {
			arrMonth[i] = month;
			that.arrYyyymm[i] = year + "'" + month;
			if(month != 1) {
				month--;
				year = year;
			} else {
				month = 12;
				year = year - 1;
			}
			
		}
		AUIGrid.destroy(momWidget.grid[0]);
		
		var columnLayout = [{
				dataField : 'itemGroupLarge',
				headerText : Language.lang['MESSAGES10225'],
				width : 100,
				visible: true
//				cellMerge : true
			},{
				dataField : 'model',
				headerText : Language.lang['MESSAGES10412'],
				width : 100,
				visible: true
			}, {
			  headerText: that.arrYyyymm[0]
			, children: [{
				  dataField: 'planM1'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM1'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM1'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			}, {
			  headerText: that.arrYyyymm[1]
			, children: [{
				  dataField: 'planM2'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM2'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM2'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[2]
			, children: [{
				  dataField: 'planM3'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM3'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM3'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[3]
			, children: [{
				  dataField: 'planM4'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM4'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM4'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[4]
			, children: [{
				  dataField: 'planM5'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM5'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM5'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[5]
			, children: [{
				  dataField: 'planM6'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM6'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM6'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[6]
			, children: [{
				  dataField: 'planM7'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM7'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM7'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[7]
			, children: [{
				  dataField: 'planM8'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM8'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM8'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[8]
			, children: [{
				  dataField: 'planM9'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM9'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM9'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[9]
			, children: [{
				  dataField: 'planM10'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM10'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM10'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[10]
			, children: [{
				  dataField: 'planM11'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM11'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM11'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			},{
			  headerText: that.arrYyyymm[11]
			, children: [{
				  dataField: 'planM12'
					, headerText: Language.lang['MESSAGES12088']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'salesM12'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }, {
				  dataField: 'rateM12'
					, headerText: Language.lang['MESSAGES12309']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0.0"
		    	}] 
			}];
		var gridProps = {
				editable : false,
				enableFilter : true,
				groupingFields: ['itemGroupLarge'],
				summaryText: Language.lang['MESSAGES10697'],
				groupingSummary: {
					dataFields: ['planM1','salesM1','rateM1','planM2','salesM2','rateM2','planM3','salesM3','rateM3','planM4','salesM4','rateM4','planM5','salesM5','rateM5'
			        	 ,'planM6','salesM6','rateM6','planM7','salesM7','rateM7','planM8','salesM8','rateM8','planM9','salesM9','rateM9','planM10','salesM10','rateM10'
			        	 ,'planM11','salesM11','rateM11','planM12','salesM12','rateM12'],
		        	 rows: [{
							expFunction : function(items, dataField) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
								var sum = 0;
								var count = 0;
//								if(items.length <= 0) return sum;
								if(dataField.indexOf('plan') == 0 || dataField.indexOf('sales') == 0) {
									items.forEach(function(item) {
										sum += Number(item[dataField]);
										
									});
									return AUIGrid.formatNumber(sum, '#,##0');
								}
								if(dataField.indexOf('rate') == 0) {
									items.forEach(function(item) {
										sum += Number(item[dataField]);
										count += 1;
									});
									return AUIGrid.formatNumber(sum/count, '#,##0');
								}
							}
						}
		        	 ]
					,labelTexts: [Language.lang['MESSAGES10697']]
				}, 
				displayTreeOpen : true,
				enableCellMerge : true,
				showBranchOnGrouping : false,		
				rowStyleFunction : function(rowIndex, item) {
					if(item.itemGroupLarge == Language.lang['MESSAGES10697']) { 		// 소계 항목만 스타일 지정
						return 'my-row-style';
					}
					return null;
				}
		};
		
//		AUIGrid.addColumn(momWidget.grid[0], columnLayout, 'last');	
//		AUIGrid.changeColumnLayout(momWidget.grid[0], columnLayout);
		
		AUIGrid.create(momWidget.grid[0], columnLayout, gridProps);
		AUIGrid.setGridData(momWidget.grid[0], data);
		
	}, design: function(){
		$('head').append('<style>.my-row-style {background:#D8D8D8;font-weight:bold;color:#000;}</style>');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMMC002', MOMMC002);
	MOMMC002.init();
});