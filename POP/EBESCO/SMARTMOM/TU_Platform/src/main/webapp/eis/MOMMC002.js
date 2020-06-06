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
		
		momWidget.splitter('.h01-h', 'horizontal', '50%');
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
				"legend":{"data":[Language.lang['MESSAGES11758'],Language.lang['MESSAGES12460']],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
					{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false}
				],
					"series":[{"name":Language.lang['MESSAGES11758'],"type":"line","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":Language.lang['MESSAGES12460'],"type":"line","data":[],"itemStyle":{"color":"#FFBF00"}}
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.salesAnalysis.salesGraph.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < 12; i++) {
					chartOption.xAxis[0].data.push((i+1) + Language.lang['MESSAGES10968']);
					chartOption.series[0].data.push(data[0]['amt' + (i+1)]);
					chartOption.series[1].data.push(data[1]['amt' + (i+1)]);
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartOption);
		});
	}, grid: function(data) {
		var that = this;
		var yyyy = $('#yyyy').val();
		AUIGrid.destroy(momWidget.grid[0]);
		
		var columnLayout = [
			{
				dataField : 'itemBusiness',
				headerText : Language.lang['MESSAGES10553'],
				width : 100,
				style: 'left-column',
				visible: true,
				cellMerge : true
			},{
				dataField : 'itemGroup',
				headerText : Language.lang['MESSAGES10225'],
				width : 100,
				style: 'left-column',
				visible: true,
				cellMerge : true
			},{
				dataField : 'itemModel',
				headerText : Language.lang['MESSAGES10412'],
				width : 100,
				style: 'left-column',
				visible: true
			}, {
				headerText: yyyy + "'01"
			, children: [{
				  dataField: 'amt1'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate1'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			}, {
			  headerText: yyyy + "'02"
			, children: [{
				  dataField: 'amt2'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate2'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'03"
			, children: [{
				  dataField: 'amt3'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate3'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'04"
			, children: [{
				  dataField: 'amt4'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate4'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'05"
			, children: [{
				  dataField: 'amt5'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate5'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'06"
			, children: [{
				  dataField: 'amt6'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate6'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'07"
			, children: [{
				  dataField: 'amt7'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate7'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'08"
			, children: [{
				  dataField: 'amt8'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate8'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'09"
			, children: [{
				  dataField: 'amt9'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate9'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'10"
			, children: [{
				  dataField: 'amt10'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate10'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'11"
			, children: [{
				  dataField: 'amt11'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate11'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			},{
				headerText: yyyy + "'12"
			, children: [{
				  dataField: 'amt12'
					, headerText: Language.lang['MESSAGES11758']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
	    	}, {
				  dataField: 'fluctuate12'
					, headerText: Language.lang['MESSAGES12460']
					, width: 80
					, visible: true
					, dataType: 'numeric'
					, style: "right-column"
					, formatString: "#,##0"
		    }] 
			}];
		var gridProps = {
				editable : false,
				enableFilter : true,
				groupingFields: ['itemBusiness', 'itemGroup'],
//				summaryText: Language.lang['MESSAGES10697'],
//				groupingSummary: {
//					dataFields: ['amt1','fluctuate1','amt2','fluctuate2','amt3','fluctuate3','amt4','fluctuate4','amt5','fluctuate5'
//			        	 ,'amt6','fluctuate6','amt7','fluctuate7','amt8','fluctuate8','amt9','fluctuate9','amt10','fluctuate10'
//			        	 ,'amt11','fluctuate11','amt12','fluctuate12'],
//		        	 rows: [{
//							expFunction : function(items, dataField) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
//								var sum = 0;
//								var count = 0;
////								if(items.length <= 0) return sum;
//								if(dataField.indexOf('amt') == 0 || dataField.indexOf('fluctuate') == 0) {
//									items.forEach(function(item) {
//										sum += Number(item[dataField]);
//										
//									});
//									return AUIGrid.formatNumber(sum, '#,##0');
//								}
//							}
//						}
//		        	 ]
//					,labelTexts: [Language.lang['MESSAGES10697']]
//				}, 
				displayTreeOpen : true,
				enableCellMerge : true,
				showBranchOnGrouping : false,		
				rowStyleFunction : function(rowIndex, item) {
					if(item.itemModel == Language.lang['MESSAGES10697']) { 		// 소계 항목만 스타일 지정
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