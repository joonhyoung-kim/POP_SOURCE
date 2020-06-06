var MOMNA003 = {
	initMessage		: undefined,
	initParam		: undefined,
	dataType		: 'M',
	groupType		: undefined,
	initCount		: 0,
	cudFlag			: undefined,
	initMemo		: undefined,
	initFlag		: undefined,
	currentFlag     : undefined,
	htmlInitFlag    : undefined,
	init: function() {  
		var that = this;
		htmlInitFlag = 'Y';
		Language.init(function() {
			that.event();
			momWidget.isInitGrid(0, function() {
			});
		});
	}, retrieveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'CC1') {
			that.groupType = data.groupType;
			that.initParam = {chartFlag: 'N', dataType: that.dataType, groupType: data.groupType};
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'findBtn1') {
			that.chart(data, param);
//			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC1') {
			AUIGrid.setGridData(momWidget.grid[1], data);
			momWidget.dropDownPost(1, undefined, undefined, undefined, that);
			
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
		}
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEP2') {
			AUIGrid.setGridData(momWidget.grid[1], data);
		}
		momWidget.splashHide();
		
	}/*, addClickBack: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'addBtn2') {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1]).length;
			if(grid2Length > that.initCount) {
				AUIGrid.setCellValue(momWidget.grid[1], grid2Length - 1, 'itemGroupLarge', that.initParam);				
			}

		}
	}*/, saveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn1') {
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
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP2') {
			mom_ajax('R', 'eis.purchasePerformanceStatus.purchasePerformanceGroupCode', {chartFlag: 'N', dataType: that.dataType, groupType: that.groupType}, function(result1, data1) {
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
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'saveAllBtn1') {
			momWidget.findBtnClicked(0, false, {dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[0], data);
			});
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP2') {
			momWidget.findBtnClicked(1, false, {chartFlag: 'N', groupType: that.groupType, dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[1], data);
			});
		}
		momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		momWidget.splashHide();
	}, delCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'delBtn2') {
			that.initParam = {dataType: that.dataType};
		}
	}, delCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			return;
		}
		if(indexInfo != undefined && indexInfo['op'] == 'delBtn2') {
			momWidget.findBtnClicked(1, false, {chartFlag: 'N', groupType: that.groupType, dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				AUIGrid.setGridData(momWidget.grid[1], data);
				that.initParam = {chartFlag: 'N', dataType: that.dataType, groupType: that.groupType};
				momWidget.dropDownPost(1, undefined, undefined, undefined, that);
				momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
			});
		}
		momWidget.splashHide();
	}, createCallInit:function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(index != 1) {
			return;
		}
		if(indexInfo.op == 'createBtn2') {
			that.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn2') {
			that.cudFlag = 'U';
		}
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn2') {
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
			
			$('#itemGroupLargeEP2').val(that.groupType);
			
		}
	}, chart: function(data, param) {
		var that = this;
		var groupId = [];
		var groupName = [];
		var goal = [];
		var html;
		mom_ajax('R', 'eis.purchasePerformanceStatus.purchasePerformanceGroupLarge', {attribute3: 'Y', dataType: that.dataType}, function(result1, data1) {
			if(result1 != 'SUCCESS') {
				return;
			}
			
			if(data1.length > 0) {
				if (htmlInitFlag == 'Y'){
					$('.wrap-contents').remove();
				}
				for(var i = 0; i < data1.length; i++) {
					var groupCode = [];
					groupId[i] = data1[i].groupType;
					groupName[i] = data1[i].groupName;
					goal[i] = data1[i].goal == null ? '0' : data1[i].goal;
					if (htmlInitFlag == 'Y'){
						html = 
							'<div class="wrap-contents">'
								+'<div class="w10p tabs radius20 margin5">'
									+'<div multi-lang="" class="textblock font-white"' + 'id="group"' + (i+1) +'>'+ groupName[i] +'</div>'
								+'</div>'
								+'<div class="wrap-text">'
									+'<div class="w-clearfix chart50-10 margin5">'
										+'<div id="iChart'+ (i+1) +'" class="w-widget w-widget-chart w-dyn-list w-unbound h100per">'
										+'</div>'
										+'<div id="goal'+ (i+1) +'" class="posR">'+Language.lang["MESSAGES12089"] +': '+ goal[i] +'%</div>'
									+'</div>'
									+'<div class="w-clearfix chart50-10 margin5">'
										+'<div id="bChart'+ (i+1) +'" class="w-widget w-widget-chart w-dyn-list w-unbound h100per"></div>'
									+'</div>'
								+'</div>'
							+'</div>';
						
						$('.main').append(html);
						
						mCommon.init('iChart'+ (i+1), "W202002111645489522441D3Sw2ahe2hj", null, null, Language);
						mCommon.renderMockChart('iChart'+ (i+1), "W202002111645489522441D3Sw2ahe2hj", Language);
						mCommon.init('bChart'+ (i+1), "W202002111643272809542G65fh5hjk4ff", null, null, Language);
						mCommon.renderMockChart('bChart'+ (i+1), "W202002111643272809542G65fh5hjk4ff", Language);
						
						if(i == data1.length - 1) {
							var htmlMemo = 
							'<div class="wrap-contents">'
								+'<div class="cardheard" style="margin-bottom: 5px;">'
									+'<div tmpTabId="three" class="w-icon fa fa-sticky-note icon r5">MEMO</div>'
									+'<div multi-lang="" style="display:none;" class="textblock">MESSAGES12271</div>'
								+'</div>'
								+'<div id ="memoText" class="card wcalc10 margin5 parttwo">'
									+'<textarea id="memoContent" class="textblock noresize w100p" style="padding: 10px;"></textarea>'
								+'</div>'
							+'</div>';
							
							$('.main').append(htmlMemo);
						}
					}
					
					mom_ajax('R', 'eis.purchasePerformanceStatus.purchasePerformanceGroupCode', {chartFlag: 'Y', groupType: groupId[i], dataType: that.dataType, week: $('#week').val()}, function(result2, data2) {
						if(result2 != 'SUCCESS') {
							return;
						}
						if(data2.length > 0) {
							for(var j = 0; j < data2.length; j++) {
								groupCode[j] = data2[j].itemGroupCode;
							}
						}
						
					},undefined, undefined, this, 'sync');
					
					that.chartData(i, groupId, groupCode, goal);
				}
			}
			$('#memoContent').attr('readonly','readonly');
			that.getMemo();
			htmlInitFlag = 'N';
		}, undefined, undefined, this, 'async');
	}, chartData: function(i, groupId, groupCode, goal) {
		var chartIOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[groupCode[0],groupCode[1],groupCode[2]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":groupCode[0],"type":"bar","data":[],"itemStyle":{"color":"#585858"},"yAxisIndex":0,
							markLine: {
				                silent: true,
				                data: [{
				                	"itemStyle":{"color":"#ff1100"},
				                    yAxis: goal[i]
				                }]
				            }},
						{"name":groupCode[1],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"},"yAxisIndex":0},
						{"name":groupCode[2],"type":"bar","data":[],"itemStyle":{"color":"#FFBF00"},"yAxisIndex":0}
						
				]
			}
		
		var chartBOption = {"tooltip":{"trigger":"axis","axisPointer":{"type":"cross","crossStyle":{"color":"#999"}}},"toolbox":{"feature":{"dataView":{"show":true,"readOnly":false},"magicType":{"show":true,"type":["line","bar"]},"restore":{"show":true},"saveAsImage":{"show":true}}},
				"legend":{"data":[groupCode[0],groupCode[1],groupCode[2]],"bottom":"0","left":"100"},
				"xAxis":[{"type":"category","data":[],"axisPointer":{"type":"shadow"},"splitArea":{"show":false},"splitLine":{"show":false},"axisLabel":{"show":true},"axisLine":{"onZero":false},"axisTick":{"show":true}}],
				"yAxis":[{"type":"value","name":"","axisLabel":{"formatter":"{value}","show":true,"inside":false},"splitLine":{"show":true},"splitArea":{"show":false},"axisLine":{"show":true},"axisTick":{"show":true,"alignWithLabel":false},"silent":false},
				],
					"series":[
						{"name":groupCode[0],"type":"bar","data":[],"itemStyle":{"color":"#585858"},"yAxisIndex":0},
						{"name":groupCode[1],"type":"bar","data":[],"itemStyle":{"color":"#ff5f00"},"yAxisIndex":0},
						{"name":groupCode[2],"type":"bar","data":[],"itemStyle":{"color":"#FFBF00"},"yAxisIndex":0}
						
				]
			}
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.purchasePerformanceStatus.purchasePerformanceStatus.dummy", 
				{groupType: groupId[i], kpiType: 'I', week: $('#week').val()}, 
				function (data2) {
					for(var k = 0; k < data2.length; k++) {
						var dataI = data2[k];
						chartIOption.xAxis[0].data.push(dataI.mm);
						chartIOption.series[0].data.push(dataI.percent1);
						chartIOption.series[1].data.push(dataI.percent2);
						chartIOption.series[2].data.push(dataI.percent3);
					}
					var myChart1 = echarts.init(document.getElementById('iChart' + (i+1)));
					myChart1.setOption(chartIOption);
			});
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.eis.purchasePerformanceStatus.purchasePerformanceStatus.dummy", 
				{groupType: groupId[i], kpiType: 'B', week: $('#week').val()}, 
				function (data2) {
					for(var k = 0; k < data2.length; k++) {
						var dataI = data2[k];
						chartBOption.xAxis[0].data.push(dataI.mm);
						chartBOption.series[0].data.push(dataI.percent1);
						chartBOption.series[1].data.push(dataI.percent2);
						chartBOption.series[2].data.push(dataI.percent3);
					}
					var myChart2 = echarts.init(document.getElementById('bChart' + (i+1)));
					myChart2.setOption(chartBOption);
			});
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
	   	    //선택된 날짜가 금주인지 설정 currentWeek 변경
	   	    if(currentWeek ==  $("#week").val()){
	   	    	that.currentFlag = 'Y'
	   		} else {
	    		that.currentFlag = 'N'
	   		}
	    	  that.chart();
	      });
	      
		$(document).on('click', '#actionBtn1', function() {
			momWidget.findBtnClicked(0, false, {dataType: that.dataType}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[0], data);
			});
			$('#pop').momModal('show');
			AUIGrid.resize(momWidget.grid[1]);
		});
		
		$(document).on('click', '#pop .bntpopclose, #modalCloseBtn', function() {
			$('#pop').momModal('hide');
			htmlInitFlag = 'Y';
			AUIGrid.clearGridData(momWidget.grid[1]);
			document.location.reload();
			momWidget.findBtnClicked(0, false, undefined, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[0], data);
			});
//			that.chart();
		});
		$(document).on('dblclick', '#memoContent', function(){
//		$('#memoContent').dblclick(function(){	
			console.log("dbclick");
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
					var param = {description: $('#memoContents').val(), notePart: 'M', week: $("#week").val()};
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
		
	}, getMemo: function() {
		var that = this;
		
		 mom_ajax('R', 'common.esiNote', {notePart: 'M', week: $("#week").val()}, function(result, data) {
			 $('#memoContent').attr('readonly','readonly');
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
   momWidget.init(1, 'MOMNA003', MOMNA003);
   momWidget.init(2, 'MOMNA003', MOMNA003);
   MOMNA003.init();
});