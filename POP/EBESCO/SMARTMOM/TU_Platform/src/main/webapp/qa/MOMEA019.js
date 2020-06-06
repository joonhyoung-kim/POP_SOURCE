var MOMEA019 = {
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
			
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
	}, chart: function(type, data, param) {
		var chartBottomOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":["빈도수","정규분포"],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"빈도수","min":"0",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
					{"type":"value","name":"정규분포",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false}
					],
					"series":[
						{"name":"빈도수","type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":"정규분포","type":"line","data":[],"yAxisIndex":1,"itemStyle":{"color":"#585858"}}
						
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.quality.processControlChart.processControlChartGraph.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					chartBottomOption.xAxis[0].data.push(dataI.lev);
					chartBottomOption.series[0].data.push(dataI.cnt);
					chartBottomOption.series[1].data.push(dataI.normDist);
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartBottomOption);
		});
	}, event: function() {
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA019', MOMEA019);
	MOMEA019.init();
});