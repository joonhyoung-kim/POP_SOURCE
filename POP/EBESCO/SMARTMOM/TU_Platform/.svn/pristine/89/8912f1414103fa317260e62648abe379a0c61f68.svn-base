var MOMMD007 = {
	initMessage	: undefined, 
	initParam	: undefined,
	barName 	: [],
	excelDownParam	: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			that.chartInit();
			$(window).resize(function() {
				AUIGrid.resize(momWidget.grid[0]); 
			});
		});
		
		momWidget.splitter('.h02-h', 'horizontal', '50%');
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			
//			this.initParam = {fromDate : $("#fromDate").val().replace(/-/gi, '')
//							, pivot1 : momWidget.getDiff2($('#fromDate').val(), 1, " MAX(D.M#)||MAX(D.CODE_VALUES)")
//							, pivot2 : momWidget.getDiff2($('#fromDate').val(), 2, " MAX(D.W#)||MAX(D.CODE_VALUES)")
//							, pivot3 : momWidget.getDiff2($('#fromDate').val(), 3, " MAX(D.D#)||MAX(D.CODE_VALUES)")
//							};
			this.initParam = {fromDate : $("#week").val().replace(/-/gi, '')
					, pivot1 : momWidget.getDiff2($("#week").val(), 1, "MAX(M#)||MAX(D.CODE_VALUES)")
					, pivot2 : momWidget.getDiff2($("#week").val(), 2, "MAX(W#)||MAX(D.CODE_VALUES)")
					, pivot3 : momWidget.getDiff2($("#week").val(), 3, "MAX(D#)||MAX(D.CODE_VALUES)")
					};
		}
		
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			that.setGridFormat(momWidget.grid[0]);
			that.barName = [];
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			for(var i = 0; i < columnLayout.length; i++) {
				coloumn = columnLayout[i].dataField;
				if((coloumn.match('/') || ((coloumn.length == 2 || coloumn.length == 3) && coloumn.charAt(coloumn.length - 1) == 'm')) == false) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			if(data.length > 0) {
				$.each(data[0], function(key, value) {
					if(key.match('/') || ((key.length == 2 || key.length == 3) && key.charAt(key.length - 1) == 'm')) {
						var columnObj = {dataField: key, headerText: key.toUpperCase(), style: 'right-column', dataType: 'numeric', formatString: '#,##0.#'};
						changeColumn.push(columnObj);
						that.barName.push({name: columnObj.dataField});
					}
				});				
				AUIGrid.setGridData(momWidget.grid[0], data);
				AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
				
			} else {
				AUIGrid.clearGridData(momWidget.grid[0]);
			}
			
			momWidget.splashHide();
			that.chart(data, param);
			
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		
	}, setGridFormat: function(gridId) {
		var that = this;
		columnLayout = [
			{
				dataField : "itemBusiness",
				headerText : Language.lang['MESSAGES10553'],
				editable : false,
				width : 100,
				visible : false
			},
			{
				dataField : "itemBusinessName",
				headerText : Language.lang['MESSAGES10553'],
				editable : false,
				width : 100,
				cellMerge : true,
				excelHide: true,
				mergeRef : "itemBusiness",
		        mergePolicy : "restrict"
			},
			{
				dataField : "itemProduct",
				headerText : Language.lang['MESSAGES11225'],
				editable : false,
				width : 100,
				cellMerge : true,
				visible : false
			},
			{
				dataField : "itemProductName",
				headerText : Language.lang['MESSAGES11225'],
				editable : false,
				width : 100,
				cellMerge : true,
				excelHide: true,
				mergeRef : "itemProduct",
		        mergePolicy : "restrict"
			},
			{
				dataField : "itemModel",
				headerText : Language.lang['MESSAGES10412'],
				editable : false,
				width : 100,
				excelHide: true,
				cellMerge : true
			},
			{
				dataField : "dataType",
				headerText : Language.lang['MESSAGES12113'],
				editable : false,
				width : 100,
				visible : false
			},
			{
				dataField : "dataName",
				headerText : Language.lang['MESSAGES12113'],
				editable : false,
				width : 120,
				cellMerge : true,
				excelHide: true,
				mergeRef : "itemModel",
		        mergePolicy : "restrict"
			}
		];

		var gridProps = {
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				cellMergePolicy : "withNull",
				rowSelectionWithMerge : true,				
				editable : false
		};

		AUIGrid.destroy(momWidget.grid[0]);
		AUIGrid.create(gridId, columnLayout, gridProps);
		
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
	}, chart: function(data, param) {
		var that = this;
		var barName = that.barName;
		var dataTypeCode = [];
		for(var i = 0; i < barName.length; i++) {
			barName[i] = that.barName[i] == undefined ? '' : that.barName[i].name;
		}
		
		var chartOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[Language.lang['MESSAGES12379'],Language.lang['MESSAGES12091']],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"",/*"max":ucl,*/"axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[{"name":Language.lang['MESSAGES12379'],"type":"line","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":Language.lang['MESSAGES12091'],"type":"line","data":[],"itemStyle":{"color":"#FFBF00"}}
						
				]
				}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.productivityStatusByModel.productivityStatusByModel.dummy", 
			param, 
			function (data) {
				for(var i = 0; i < barName.length; i++) {
					chartOption.xAxis[0].data.push(barName[i].toUpperCase());
					for(var j = 0; j < data.length; j++) {
						if(param.itemBusinessCd == data[j].itemBusiness && param.itemProductCd == data[j].itemProduct
								&& param.itemModelCd == data[j].itemModel) {
							if(data[j].dataType == 'PR') {
								chartOption.series[0].data.push(data[j][barName[i]].replace('%',''));
							} 
							if(data[j].dataType == 'AC') {
								chartOption.series[1].data.push(data[j][barName[i]].replace('%',''));
							}
						}
					}
				}
				var myChart = echarts.init(document.getElementById("chart1"));
				myChart.setOption(chartOption);
		});
	}, excelDownCallInit: function(index, param, callBackParam, indexInfo) {         
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMMD007', MOMMD007);
	MOMMD007.init();
});