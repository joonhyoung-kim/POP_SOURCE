var search = location.search.replace("?","").split(',');
//$(window).resize(function() { 
//    if ("#cBoard"){ 
//      AUIGrid.resize("#cBoard"); 
//    } 
//});
var statusBoard_1 = {
	index: 0,
	datas1: [],
	datas2: [],
	init: function() {
		//var index = 0;
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
		
		var that = this;
		$("#resourceName").remove();
		var resourceName = '';
		var nowTime = get_current_date('YYYY-MM-DD HH24:MI').substring(0,16);
		var param;
		const resourceCd = search[that.index];
//		if(that.datas1[that.index] == undefined) {
//			$.ajax({
//				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.facility.facility.dummy/A",
//				type : "GET",
//				data : {resourceCd : resourceCd},
//				async: false,
//				timeout 	: 30000000,
//				dataType 	: 'json',
//				contentType : 'application/json; charset=UTF-8',
//				success : function(data){
//					if(data != null) {
//						resourceName = data.resourceName;
//					}
//					
//					
//					that.datas1[that.index] = data.resourceName;
//				},
//				error: function(data){},
//				fail : function(data){}
//			});
//		} else {
//			resourceName = that.datas1[that.index];
//		}
		
		
		
		
//		if(that.datas2[that.index] == undefined) {
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.addition.dashboardDisplay.statusBoard1.dummy",
			type : "GET",
			data : {resourceCd : resourceCd},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					param = {
							partNo : data[0].partNo,
							model : data[0].model,
							description : data[0].description,
							workOrder : data[0].workOrder,q3
							planQty : data[0].planQty,
							outputQty : data[0].outputQty,
							progress : data[0].progress,
							ng : data[0].ngRate,
							dayPlanQty : data[0].dayPlanQty,
							uph : data[0].currTarget,
							dayOutput : data[0].dayOutputQty,
							dayNg : data[0].dayNg,
							dayProgress : data[0].dayProgress,
							resourceName : data[0].resourceName
					}
					var html1 = '<div multi-lang="" class="textblock" id ="resourceName">[' + param.resourceName + ']</div>';
					var html2 = '<div multi-lang="" class="textblock center" id="nowTime">' + nowTime + '</div>'
					$("#titleReosurce").parent().append(html1);
					$("#nowTime").remove();
					$(".boardTitle_detail2").append(html2);
					
					/* 20200324 / pyj / 현재 불필요 조건 */
//					if(param.uph < param.dayUph) {
//						$("#currTarget").css({"color":"red"});
//					} else {
//						$("#currTarget").css({"color":"yellow"});
//					}
					
					if(param.dayProgress > 100) {
						$(".greenArea").css({"width": "100%"});
						$(".yellowArea").css({"width": "0%"});
					} else {
						$(".greenArea").css({"width": Number(param.dayProgress.trim().replace("%","")) + '%'});
						$(".yellowArea").css({"width": (100 -  Number(param.dayProgress.trim().replace("%","")))+'%'});
					}
					
					$(".greenTxt").text(param.dayProgress);
					
					
//					if(Number(param.dayProgress.trim().replace("%","")) < 9) {
//						$(".greenTxt").css({"color":"black"});
//						console.log("1" + param.dayProgress);
//					} else {
						$(".greenTxt").css({"color":"black"});
//					}
					
					$("#partNo").text(param.partNo || "");
					$("#model").text(param.model || "");
					$("#description").text(param.description || "");
					$("#workOrder").text(param.workOrder || "");
					$("#dayNg").text(param.dayNg || "");
					if(param.progress != '%') {
						$("#progress").text(param.progress || "");
					}
					if(param.ng != '%') {
						$("#ng").text(param.ng || "");
					}
					if(param.planQty != null) {
						$("#planQty").text(param.planQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  || "");
					} else {
						$("#planQty").text("");
					}
					if(param.outputQty != null) {
						$("#outputQty").text(param.outputQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
					} else {
						$("#outputQty").text("");
					}
					if(param.dayPlanQty != null) {
						$("#dayPlanQty").text(param.dayPlanQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
					} else {
						$("#dayPlanQty").text("");
					}
					if(param.uph != null) {
						$("#currTarget").text(param.uph.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
					} else {
						$("#currTarget").text("");
					}
					if(param.dayOutput != null) {
						$("#dayOutput").text(param.dayOutput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
					} else {
						$("#dayOutput").text("");
					}
					that.datas2[that.index] = param;
					that.index = (that.index + 1) % search.length;
					
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		/* 20200325 / pyj /timeout 갱신될때마다 데이터를 가지고 와야하므로 분기 삭제 */
//		} 
//		else {
//			param = that.datas2[that.index];
//			
//			var html1 = '<div multi-lang="" class="textblock" id ="resourceName">[' + param.resourceName + ']</div>';
//			var html2 = '<div multi-lang="" class="textblock center" id="nowTime">' + nowTime + '</div>'
//			$("#titleReosurce").parent().append(html1);
//			$("#nowTime").remove();
//			$(".boardTitle_detail2").append(html2);
//			
//			/* 20200324 / pyj / 현재 불필요 조건 */
////			if(param.uph < param.dayUph) {
////				$("#currTarget").css({"color":"red"});
////			} else {
////				$("#currTarget").css({"color":"yellow"});
////			}
////			
//			if(param.dayProgress > 100) {
//				$(".greenArea").css({"width": "100%"});
//				$(".yellowArea").css({"width": "0%"});
//			} else {
//				$(".greenArea").css({"width": Number(param.dayProgress.trim().replace("%","")) +'%'});
//				$(".yellowArea").css({"width": (100 - Number(param.dayProgress.trim().replace("%","")))+'%'});
//			}
//			
//			$(".greenTxt").text(param.dayProgress);
//			
//			
////			if(Number(param.dayProgress.trim().replace("%","")) < 9) {
////				$(".greenTxt").css({"color":"black"});
////				console.log("1" + param.dayProgress);
////			} else {
//				$(".greenTxt").css({"color":"black"});
////			}
//			
//			$("#partNo").text(param.partNo || "");
//			$("#model").text(param.model || "");
//			$("#description").text(param.description || "");
//			$("#workOrder").text(param.workOrder || "");
//			$("#dayNg").text(param.dayNg || "");
//			if(param.progress != '%') {
//				$("#progress").text(param.progress || "");
//			}
//			if(param.ng != '%') {
//				$("#ng").text(param.ng || "");
//			}
//			if(param.planQty != null) {
//				$("#planQty").text(param.planQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  || "");
//			}
//			if(param.outputQty != null) {
//				$("#outputQty").text(param.outputQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
//			}
//			if(param.dayPlanQty != null) {
//				$("#dayPlanQty").text(param.dayPlanQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
//			}
//			if(param.uph != undefined) {
//				$("#currTarget").text(param.uph.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
//			}
//			if(param.dayOutput != null) {
//				$("#dayOutput").text(param.dayOutput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "");
//			}
//			that.index = (that.index + 1) % search.length;
//		}
	}, event: function() {
		var that = this;
	}
};
$(document).ready(function(event){
	statusBoard_1.init();
});