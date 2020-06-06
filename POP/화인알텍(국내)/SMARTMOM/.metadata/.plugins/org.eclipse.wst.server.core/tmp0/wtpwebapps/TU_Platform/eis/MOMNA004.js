var MOMNA004 = {
	initMessage		: undefined,
	initParam		: undefined,
	initFlag		: undefined,
	initMemo		: undefined,
	findFlag		: undefined,
	currentFlag     : undefined,
	init: function() {     
		var that = this;
		Language.init(function() {
			that.event();
			$('#memoContent').attr('readonly','readonly');
//			that.chart();
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			momWidget.splashHide();
			that.chartInit();
			that.chart(data, param);
			that.findFlag = 'Y';
		}
		
		if(indexInfo != undefined && (indexInfo['op'] == 'saveBtnEX1' || indexInfo['op'] == 'saveBtnEX2')) {
			$('#pop1').momModal('hide');
			$('#pop2').momModal('hide');
			
			momWidget.splashHide();
			that.chartInit();
			that.chart(data, param);
			that.findFlag = 'Y';
		}
		
	}, chartInit: function(){
		mCommon.init("chart1", "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
		mCommon.renderMockChart("chart1", "W202002111645489522441D3Sw2ahe2hj", Language);
		mCommon.init("chart2", "W202002111643272809542G65fh5hjk4ff", null, null, Language);
		mCommon.renderMockChart("chart2", "W202002111643272809542G65fh5hjk4ff", Language);
	}, chart: function(data, param) {
		var that = this;
		var kpiType1 = [];
		var kpiType2 = [];
		mom_ajax('R', 'eis.qualityStatus.qualityKpiType', {qaSeq: '1'}, function(result1, data1) {
			if(result1 != 'SUCCESS') {
				return;
			}
			if(data1.length > 0) {
				for(var i = 0; i < 4; i++) {
					kpiType1[i] = data1[i].kpiType;
				}
			}
		}, undefined, undefined, this, 'async');
		
		mom_ajax('R', 'eis.qualityStatus.qualityKpiType', {qaSeq: '2'}, function(result1, data1) {
			if(result1 != 'SUCCESS') {
				return;
			}
			if(data1.length > 0) {
				for(var i = 0; i < 3; i++) {
					kpiType2[i] = data1[i].kpiType;
				}
			}
		}, undefined, undefined, this, 'async');
		
		var chartCOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[kpiType1[0],kpiType1[1],kpiType1[2],kpiType1[3]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":kpiType1[0],"type":"bar","data":[],"itemStyle":{"color":"#585858"}},
						{"name":kpiType1[1],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":kpiType1[2],"type":"line","data":[],"itemStyle":{"color":"#32a852"}},
						{"name":kpiType1[3],"type":"line","data":[],"itemStyle":{"color":"#F01F18"}}
						
				]
			}
		
		var chartFOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[kpiType2[0],kpiType2[1],kpiType2[2],kpiType2[3]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":kpiType2[0],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"}},
						{"name":kpiType2[1],"type":"line","data":[],"itemStyle":{"color":"#32a852"}},
						{"name":kpiType2[2],"type":"line","data":[],"itemStyle":{"color":"#f01f18"}}
					
				]
			}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.qualityStatus.qualityStatus.dummy", 
				{qaSeq: '1', week: $('#week').val()}, 
				function (data1) {
					for(var i = 0; i < data1.length; i++) {
						var dataI = data1[i];
						chartCOption.xAxis[0].data.push(dataI.mm);
						chartCOption.series[0].data.push(dataI.qty1);
						chartCOption.series[1].data.push(dataI.qty2);
						chartCOption.series[2].data.push(dataI.qty3);
						chartCOption.series[3].data.push(dataI.qty4);
					}
					var myChart1 = echarts.init(document.getElementById('chart1'));
					myChart1.setOption(chartCOption);
			});
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.qualityStatus.qualityStatus.dummy", 
				{qaSeq: '2', week: $('#week').val()}, 
				function (data1) {
					for(var i = 0; i < data1.length; i++) {
						var dataI = data1[i];
						chartFOption.xAxis[0].data.push(dataI.mm);
						chartFOption.series[0].data.push(dataI.qty1);
						chartFOption.series[1].data.push(dataI.qty2);
						chartFOption.series[2].data.push(dataI.qty3);
					}
					var myChart2 = echarts.init(document.getElementById('chart2'));
					myChart2.setOption(chartFOption);
			});
		
		that.getMemo();
	}, event: function() {
		var that = this;
		var currentWeek = null;
		
		//페이지 시작시 최근 주차 받아오기
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comWeek.dummy', {}, function(data) {
			currentWeek = data[0].code;
			});
		
		// 날짜 검색조건 변경 시 페이지 클린
		$(document).on("change", "#week", function() {
	    	that.week = $("#week").val()
	   	    //선택된 날짜의 currentFlag 변경
	   	    if(currentWeek ==  $("#week").val()){
	   	    	that.currentFlag = 'Y'
	   		} else {
	    		that.currentFlag = 'N'
	   		}
	   	    that.chart();
	    });
	    	  
		$(document).on('click', '#actionBtn1', function() {
			$('#pop1').momModal('show');
		});
		
		$(document).on('click', '#actionBtn2', function() {
			$('#pop2').momModal('show');
		});
		
		$(document).on('click', '.bntpopclose', function() {
			$('#pop1').momModal('hide');
			$('#pop2').momModal('hide');
		});
		
		$('#memoContent').dblclick(function(){	
			$('#memoPop').momModal('show');
			if(that.currentFlag != 'Y'){
				$('#memoContents').attr('readonly','readonly');
				$('#memoConfirmBtn').prop('disabled', true);$('#memoConfirmBtn').css('pointer-events', 'none');
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
					var param = {description: $('#memoContents').val(), notePart: 'Q', week: $("#week").val()};
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
		
		$(document).on('click', '.bntpopclose, #cancelBtn', function() {
			$('#memoContents').val($('#memoContent').val());
			$('#memoPop').momModal('hide');
		});
		
	}, excelUpCallInit: function(index, data, callBackParam, indexInfo) {
		if(index == 0) {
			this.initParam = {qaSeq: 1, qaType: 'CKD'};
		} else if(index == 1) {
			this.initParam = {qaSeq: 2, qaType: 'FA'};
		}
	}, getMemo: function() {
		var that = this;
		 mom_ajax('R', 'common.esiNote', {notePart: 'Q', week: $("#week").val()}, function(result, data) {
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
					that.initFlag = 'N';
					that.initMemo = '';
					$('#memoContent').val('');
					$('#memoContents').val('');
				}
				
			}, undefined, undefined, this, 'async');
	}
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMNA004', MOMNA004);
   momWidget.init(2, 'MOMNA004', MOMNA004);
   MOMNA004.init();
});
