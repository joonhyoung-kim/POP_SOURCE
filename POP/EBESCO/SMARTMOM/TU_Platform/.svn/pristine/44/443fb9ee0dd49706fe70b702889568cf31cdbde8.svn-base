var empAuthority = sessionStorage.getItem("empAuthority");

var dashboard = {
	init: function() {
		var that = this;
		
		Language.init(function() {
//			if (empAuthority == "5"){
				mCommon.init("chart2", "W201809111424477751001F8Br8utn8ma", null, null, Language);
//				mCommon.init("chart4", "W201809111718077291000PocvMOiixaJ", null, null, Language);
				mCommon.renderMockChart("chart2", "W201809111424477751001F8Br8utn8ma", Language);
//				mCommon.renderMockChart("chart4", "W201809111718077291000PocvMOiixaJ", Language);
//			} 
			mCommon.init("chart1", "W201809111314422441000QWrobyIm9vR", null, null, Language);
			mCommon.init("chart3", "W201809111425250271002lEBa7Os9WZj", null, null, Language);
			mCommon.renderMockChart("chart1", "W201809111314422441000QWrobyIm9vR", Language);
			mCommon.renderMockChart("chart3", "W201809111425250271002lEBa7Os9WZj", Language);
			
			// 매입/매출 그래프 그리도록
			mCommon.init("chart4", "W201809111718077291000PocvMOiixaJ", null, null, Language);
			mCommon.renderMockChart("chart4", "W201809111718077291000PocvMOiixaJ", Language);
		});
		if (empAuthority != "5"){
			setTimeout(function() {
				that.chart();
				that.topDashboard();
			}, 1000);
		}
		this.grid();
		this.event();
	}, grid: function() {
		
	}, event: function() {
		
	},
	topDashboard: function() {
		$(".arrow").hide();
		$(".bgblue, .bgred, .textred, .bgorange").removeClass("bgblue").removeClass("bgred").removeClass("textred").removeClass("bgorange");
		//설비가동률
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.comResourceUilizationRate.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info1 .info_center .textblock", {value : data.per, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info1 .info_bottom .textblock:eq(0)", {value : data.inQty});
			micaCommon.fncS.animateNumber("#info1 .info_bottom .textblock:eq(1)", {value : data.outQty});
		});
		
		//발주/입고율
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.orderInputRate.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info2 .info_center .textblock", {value : data.per, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info2 .info_bottom .textblock:eq(0)", {value : data.inSumQty});
			micaCommon.fncS.animateNumber("#info2 .info_bottom .textblock:eq(1)", {value : data.orderSumQty});
		});
//		
		//계획대비실적율
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.planPreparePerformanceRate.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info3 .info_center .textblock", {value : data.per, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info3 .info_bottom .textblock:eq(0)", {value : data.sumGoodQty});
			micaCommon.fncS.animateNumber("#info3 .info_bottom .textblock:eq(1)", {value : data.planQty});
		});
		
		//주문대비출하율
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.salesShippingRate.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info4 .info_center .textblock", {value : data.rateShip, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info4 .info_bottom .textblock:eq(0)", {value : data.sumShip});
			micaCommon.fncS.animateNumber("#info4 .info_bottom .textblock:eq(1)", {value : data.sumOrder});
		});
		
		//매입/매출(수량)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.comPurchaseSalesQtyToday.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info5 .info_center .textblock", {value : data.per, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info5 .info_bottom .textblock:eq(0)", {value : data.inQty});
			micaCommon.fncS.animateNumber("#info5 .info_bottom .textblock:eq(1)", {value : data.outQty});
		});
		
		//매입/매출(금액)
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.comPurchaseSalesPriceToday.dummy", function (data) {
			data = data[0];
			micaCommon.fncS.animateNumber("#info6 .info_center .textblock", {value : data.per, appendStr : "%"});
			micaCommon.fncS.animateNumber("#info6 .info_bottom .textblock:eq(0)", {value : data.inPrice});
			micaCommon.fncS.animateNumber("#info6 .info_bottom .textblock:eq(1)", {value : data.outPrice});
		});
		
		
	},
	chart: function() {
		var that = this;
		var chartBottomOption = '';
		//매입매출현황 단위
		var dUom = '';
		var dUomNum = '';
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", 
			{codeClassId:"DASHBOARD_SETUP", codeId:"D_UOM"}, 
			function (data) {
				data = data[0];
				dUom = data.name;
				dUomNum = data.value;
				chartBottomOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
						"legend":{"data":[Language.lang['MESSAGES11758'],Language.lang['MESSAGES11759'],Language.lang['MESSAGES11760']],"bottom":"0","left":"100"},
						"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
						"yAxis":[{"type":"value","name":Language.lang[dUom],"min":0,"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
//							"max":20000, "interval":10000,
							{"type":"value","name":Language.lang['MESSAGES11760'],"min":0,"axisLabel":{"formatter":"{value}","color":"#000000","inside":false},"splitArea":{"show":false},"splitLine":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"boundaryGap":false,"silent":false,"splitNumber":0}],
//							"max":60,"interval":20,
						"series":[{"name":Language.lang['MESSAGES11758'],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
							{"name":Language.lang['MESSAGES11759'],"type":"bar","data":[],"itemStyle":{"color":"#ffff00"}},
							{"name":Language.lang['MESSAGES11760'],"type":"line","yAxisIndex":1,"data":[],"itemStyle":{"color":"#00ff10"}}]}
				
				$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.comPurchaseSalesWeekly.dummy", 
					{value : dUomNum}, 
					function (data) {
						for(var i = 0; i < data.length; i++) {
							var dataI = data[i];
							chartBottomOption.xAxis[0].data.push(dataI.ioTime + "\n" + dataI.ioDate);
							chartBottomOption.series[0].data.push(dataI.outPrice);
							chartBottomOption.series[1].data.push(dataI.inPrice);
							chartBottomOption.series[2].data.push(dataI.per);
						}
						var myChart = echarts.init(document.getElementById("chart4"));
						myChart.setOption(chartBottomOption);
				});
		});
		
		var chartTopOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[],"show":true,"orient":"horizontal","bottom":"0","left":"0", "width":"475"},
				"xAxis":[{"type":"category","data":[Language.lang['MESSAGES11762'],Language.lang['MESSAGES11763']],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"show":true,"onZero":false},"axisTick":{"show":true,"alignWithLabel":false}}],
				"yAxis":[{"type":"value","name":Language.lang['MESSAGES11761'],"axisLabel":{"formatter":"{value}","show":true},"splitLine":{"show":true},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false,"boundaryGap":false},
					{"type":"value","axisLabel":{"formatter":"{value}","show":false},"splitArea":{"show":false},"splitLine":{"show":true},"axisLine":{"show":false},"axisTick":{"show":false}}],
				"series":[{"name":"","type":"bar","data":[],"itemStyle":{"color":"#ff5f00"},"label":{"show":true}},
					{"name":"","type":"bar","data":[],"itemStyle":{"color":"#ffff00"},"label":{"show":true}},
					{"name":"","type":"bar","data":[],"itemStyle":{"color":"#00ff10"},"label":{"show":true}},
					{"name":"","type":"bar","data":[],"itemStyle":{"color":"#000ff0"},"label":{"show":true}},
					{"name":"","type":"bar","data":[],"itemStyle":{"color":"#9A2EFE"},"label":{"show":true}},
					{"name":"","type":"bar","data":[],"itemStyle":{"color":"#8181F7"},"label":{"show":true}}]}
		//상단 차트
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboard.stockStatus.dummy", function (data) {
			for(var i = 0; i < data.length; i++) {
				var dataI = data[i];
				//chartTopOption.legend.data.push(dataI.itemGroupLargeName);
				chartTopOption.series[i].name = dataI.itemGroupLargeName;
				chartTopOption.series[i].data.push(dataI.prevAmount);
				chartTopOption.series[i].data.push(dataI.thisAmount);
			}
			var myChart = echarts.init(document.getElementById("chart2"));
			myChart.setOption(chartTopOption);
		});
	}
};
$(document).ready(function(event){
	dashboard.init();
});