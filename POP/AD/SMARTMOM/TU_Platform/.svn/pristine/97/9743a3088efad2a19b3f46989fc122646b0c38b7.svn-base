var search = location.search.replace("?","");
var statusBoard_2 = {
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
					data : {codeClassId:"DASHBOARD_SET_TIME", codeId: "DM"},
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
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboardDisplay.statusBoard2.dummy",
			type : "GET",
			data : {boardType : search},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					var leng = data.length;
					if(leng > 21) {
						leng = 21;
					}
					var cnt = 0; // 데이터 개수에 따라 row1~3
					if(leng > 0 && leng < 8) {
						cnt = 1;
					} else if(leng > 4 && leng < 15) {
						cnt = 2;
					} else {
						cnt = 3;
					}
					for(var i = 0; i < leng; i++) {
						var rowCnt1 = 0;
						var rowCnt2 = 0;
						if(i < 7) {
							rowCnt2 = i + 1;
							rowCnt1 = 1;
						} else if(i > 6 && i < 14) {
							rowCnt2 = i - 6;
							rowCnt1 = 2;
						} else if(i > 13) {
							rowCnt2 = i - 13;
							rowCnt1 = 3;
						}
						$(".dm_table:nth-child("+rowCnt1+") li.sub_title:nth-child("+(rowCnt2)+")").find("#sub_title").text(data[i].resourceName);
						for(var k = 1; k < 11; k++) {
							var culId;
							switch(k) {
								case 1 : 
									culId = data[i].model;
									if(culId == null) {
										culId = '';
									}
									break;
								case 2 : culId = data[i].orderQty; break;
								case 3 : culId = data[i].targetQty;
									if(culId == null) {
										culId = 0;
									}
									break;
								case 4 : culId = data[i].curTargetQty; 
									if(culId == null) {
										culId = 0;
									}
									break;
								case 5 : culId = data[i].okQty; break;
								case 6 : culId = data[i].ngQty; break;
								case 7 : culId = data[i].nonOpeQty; break;
								case 8 : culId = data[i].planRate; break;
								case 9 : culId = data[i].targetRate; break;
								case 10 : culId = data[i].ngRate; break;
								default : culId = ''
							}
							$(".dm_table:nth-child("+rowCnt1+") .n"+k+" li.a:nth-child("+(2*rowCnt2)+")").find("#sub_contents").text(culId);
						}
					}
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	}, event: function() {
		var that = this;
	},
};
$(document).ready(function(event){
	statusBoard_2.init();
});