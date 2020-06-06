var search = location.search.replace("?","");
var locale = sessionStorage.getItem('locale');
var statusBoard_3 = {
	init: function() {
		var that = this;
		Language.init(function() {
			that.setting(search);
			var initTime = 0;
			getInitTime();
			function getInitTime(){
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.codeValue.dummy",
					type : "GET",
					data : {codeClassId:"DASHBOARD_SET_TIME", codeId: "DP"},
					async: false,
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length != 0 || data[0].codeValues != null || data[0].codeValues != '') {
							initTime = data[0].codeValues;
						} else {
							initTime = 60;
						}
					}
				});
			}
			initTime = initTime * 1000;
			setInterval(function() {
				that.setting(search);
			}, initTime);
			that.event();
		});
		
	}, setting: function(search) {
		if(locale == 'EN') {
			$(".boardTitle_detail5.thi").css({"font-size":"200%", "line-height":"1.2"});
			$(".boardTitle_detail5.thi .textblock").css({"white-space": "normal"})
		}
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboardDisplay.statusBoard3.dummy",
			type : "GET",
			data : {boardType : search},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					var leng = data.length;
					if(leng > 13) {
						leng = 13;
					}
					var sumDayPlanQty = 0;
					var sumTargetQty = 0;
					var sumCurrGoodQty = 0;
					var sumAchieveRate = 0;
					var sumProgressRate = 0;
					var sumStopCnt = 0;
					for(var i = 1; i < leng + 1; i++) {
						if(data[i-1].dayPlanQty != null) {
							sumDayPlanQty+= data[i-1].dayPlanQty;
							data[i-1].dayPlanQty = data[i-1].dayPlanQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						if(data[i-1].targetQty != null) {
							sumTargetQty+= data[i-1].targetQty;
							data[i-1].targetQty = data[i-1].targetQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						if(data[i-1].currGoodQty != null) {
							sumCurrGoodQty+= data[i-1].currGoodQty;
							data[i-1].currGoodQty = data[i-1].currGoodQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						sumAchieveRate+= Number(data[i-1].achieveRate);
						sumProgressRate+= Number(data[i-1].progressRate);
						sumStopCnt+= data[i-1].stopCnt;
						if(data[i-1].achieveRate == null) {
							data[i-1].achieveRate = 0;
						} 
						if(data[i-1].achieveRate >= 100) {
							$(".main_detail2:nth-child("+i+") .boardTitle_detail5.thi").css({"background-color":"green"});
						} else if(data[i-1].achieveRate >= 95 && data[i-1].achieveRate < 100) {
							$(".main_detail2:nth-child("+i+") .boardTitle_detail5.thi").css({"background-color":"yellow"});
						} else if(data[i-1].achieveRate < 95) {
							$(".main_detail2:nth-child("+i+") .boardTitle_detail5.thi").css({"background-color":"red"});
						}
						
						if(data[i-1].progressRate == null) {
							data[i-1].progressRate = 0;
						}
						
						data[i-1].achieveRate += "%"; 
						data[i-1].progressRate += "%";
						$(".main_detail2:nth-child("+i+") .boardTitle_detail3").find(".textblock").text(data[i-1].resourceName || "");
						$(".main_detail2:nth-child("+i+") .boardTitle_detail4").find(".textblock").text(data[i-1].dayPlanQty || "0");
						$(".main_detail2:nth-child("+i+") .boardTitle_detail5").find(".textblock").text(data[i-1].targetQty || "0");
						$(".main_detail2:nth-child("+i+") .boardTitle_detail5.sec").find(".textblock").text(data[i-1].currGoodQty || "0");
						$(".main_detail2:nth-child("+i+") .boardTitle_detail5.thi").find(".textblock").text(data[i-1].achieveRate);
						$(".main_detail2:nth-child("+i+") .boardTitle_detail5.fou").find(".textblock").text(data[i-1].progressRate);
						$(".main_detail2:nth-child("+i+") .boardTitle_detail6").find(".textblock").text(data[i-1].stopCnt || "0");
					}
					var avgAchieveRate = Math.floor(Number(sumAchieveRate)/leng) + "%";
					var avgProgressRate = Math.floor(Number(sumProgressRate)/leng) +"%";
					$(".boardBottom2 .boardTitle_detail4").find(".textblock").text(sumDayPlanQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					$(".boardBottom2 .boardTitle_detail5").find(".textblock").text(sumTargetQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					$(".boardBottom2 .boardTitle_detail5.sec").find(".textblock").text(sumCurrGoodQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					$(".boardBottom2 .boardTitle_detail5.thi").find(".textblock").text(avgAchieveRate);
					$(".boardBottom2 .boardTitle_detail5.fou").find(".textblock").text(avgProgressRate);
					$(".boardBottom2 .boardTitle_detail6").find(".textblock").text(sumStopCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
	}, event: function() {
		var that = this;
	}
};
$(document).ready(function(event){
	statusBoard_3.init();
});