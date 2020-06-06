var MOMMD008 = {
	initMessage		: undefined,
	initParam		: undefined,
	barName			: [],
		
	init: function() {     
		var that = this;
		Language.init(function() {
			that.chartInit();
			$(window).resize(function() {
				AUIGrid.resize(momWidget.grid[0]); 
			});
		});
		
		momWidget.splitter('.h01-h', 'horizontal', '50%');
		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = {fromDate : $("#week").val().replace(/-/gi, '')
							, pivot1 : momWidget.getDiff2($('#week').val(), 2, "NON_TIME#", 2)
							};
			
			if($("#placeCd").val() == '') {
				this.initMessage = Language.lang['MESSAGES12313'];
				return;
			}
			
			if($("#resourceGroupCd").val() == '') {
				this.initMessage = Language.lang['MESSAGES10683'];
				return;
			}
		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			that.barName = [];
			
			for(var i = 0; i < columnLayout.length; i++) {
				var coloumn = columnLayout[i].dataField;
				if(coloumn.indexOf('/') == -1) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			if(data.length > 0) {
				$.each(data[0], function(key, value) {
					if(key.match('/')) {
						var columnObj = {dataField: key, headerText: key.toUpperCase(), style: 'right-column', dataType: 'string', excelHide: true};
						changeColumn.push(columnObj);
						that.barName.push({name : columnObj.dataField});
					}
				});				
				
				AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
				AUIGrid.setGridData(momWidget.grid[0], data);
			} else {
				AUIGrid.clearGridData(momWidget.grid[0]);
			}
			
			momWidget.splashHide();
			
			that.chart(data, param);
		}
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
	}, chart: function(data, param) {
		var that = this;
		var chartBottomOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":["지난주", "이번주"],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":true},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false}],
				"series":[
					{"name":"지난주","type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
					{"name":"이번주","type":"bar","data":[],"itemStyle":{"color":"#FFBF00"}}
				]
		};
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.lossWorstStatus.lossWorstStatus.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < data.length; i++) {
					var dataI = data[i];
					chartBottomOption.xAxis[0].data.push(dataI.nonTypeName);
					chartBottomOption.series[0].data.push(dataI[that.barName[0].name]);
					chartBottomOption.series[1].data.push(dataI[that.barName[1].name]);
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartBottomOption);
		});
	}
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMMD008', MOMMD008);
   MOMMD008.init();
});