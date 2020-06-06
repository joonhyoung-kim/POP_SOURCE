var MOMEA018 = {
	initMessage	: undefined, 
	initParam	: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			that.chartInit();
			$(window).resize(function() {
				AUIGrid.resize(momWidget.grid[0]); 
			});
		});
		
		that.event();
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			var type = param.controlChart;
			that.chart(type, data, param);
			if(type == 'X') {
				$('#label-text').text(Language.lang['MESSAGES12267']);
			} else if(type == 'R') {
				$('#label-text').text(Language.lang['MESSAGES12268']);
			}
			
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
	}, chart: function(type, data, param) {
		var typeName;
		var cl;
		var ucl;
		var lcl;
		var min;
		if(type == 'X') {
			typeName = 'Xbar';
			cl = data[0].xbarCl;
			ucl = data[0].xbarUcl;
			lcl = data[0].xbarLcl;
			min = Math.floor(data[0].xbarMin > data[0].xbarLcl ? data[0].xbarLcl : data[0].xbarMin);
		} else if(type == 'R') {
			typeName = 'R';
			cl = data[0].rRangeCl;
			ucl = data[0].rRangeUcl;
			lcl = data[0].rRangeLcl;
			min =  Math.floor(data[0].rRangeMin > data[0].rRangeLcl ? data[0].rRangeLcl : data[0].rRangeMin);
		}
		var chartBottomOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":typeName,"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","min":min,/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
//					"min":lcl, "max":ucl,/* "interval":10000,*/
//					{"type":"value","name":Language.lang['MESSAGES11760'],"axisLabel":{"formatter":"{value}","color":"#000000","inside":false},"splitArea":{"show":false},"splitLine":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"boundaryGap":false,"silent":false,"splitNumber":0}
				],
//					"max":60,"interval":20,
//				"series":[{"name":typeName,"type":"line","data":[],"itemStyle":{"color":"#2E64FE"},
//							markLine: {
//				                silent: true,
//				                data: [{
//				                	"itemStyle":{"color":"#585858"},
//				                    yAxis: cl
//				                }, {
//				                	"itemStyle":{"color":"#FFBF00"},
//				                	yAxis: lcl
//				                }, {
//				                	"itemStyle":{"color":"#ff5f00"},
//				                	yAxis: ucl
//				                }]
//				            }
//					}]
					"series":[{"name":typeName,"type":"line","data":[],"itemStyle":{"color":"#2E64FE"}},
						{"name":"중앙선","type":"line","data":[],"itemStyle":{"color":"#585858"},symbol: 'none'},
						{"name":"상한선","type":"line","data":[],"itemStyle":{"color":"#ff5f00"},symbol: 'none'},
						{"name":"하한선","type":"line","data":[],"itemStyle":{"color":"#FFBF00"},symbol: 'none'}
						
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.quality.spcControlChart.spcControlChart.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					chartBottomOption.xAxis[0].data.push(i);
					if(type == 'X') {
						chartBottomOption.series[0].data.push(dataI.xbar);
						chartBottomOption.series[1].data.push(dataI.xbarCl);
						chartBottomOption.series[2].data.push(dataI.xbarUcl);
						chartBottomOption.series[3].data.push(dataI.xbarLcl);
					} else if(type == 'R') {
						chartBottomOption.series[0].data.push(dataI.rRange);
						chartBottomOption.series[1].data.push(dataI.rRangeCl);
						chartBottomOption.series[2].data.push(dataI.rRangeUcl);
						chartBottomOption.series[3].data.push(dataI.rRangeLcl);
					}
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartBottomOption);
		});
	}, event: function() {
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA018', MOMEA018);
	MOMEA018.init();
});