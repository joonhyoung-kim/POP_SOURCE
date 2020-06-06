var userName = sessionStorage.getItem("userName");
var lastWoId = localStorage.getItem("lastWo");
var search=decodeURI(location.search).replace("?", "");
var searchArr = search.split('/');
var complete = {
	currentPage : undefined,
	initMessage : undefined,
	initParam : undefined,
	excelParam : undefined,

	init : function() {

		var that = this;
		Language.init(function() {
           
			that.setting(searchArr);
			// that.clock();
			// setInterval(that.clock, 1000);
		});

		that.event();
		// this.design();
	},
	setting : function(paramCheck) {
		var that = this;
		if (paramCheck[0] == 'MOMKA001') {
			if(lastWoId!='' && lastWoId!= null)
			{  var retVal = confirm("최근 작업지시를 불러오시겠습니까?");

			   if( retVal == true ){ 

				 // micaCommon.splash.show();
					$('#woNo').text(lastWoId);
					$('#serbi').text(paramCheck[1]+'('+paramCheck[2]+')');
					$('#workerName').text(userName);
					that.woReSearch();
					return;

			   }else{

				   $('#serbi').text(paramCheck[1]+'('+paramCheck[2]+')');
					$('#workerName').text(userName);
					return;
			   }	
		   }
			
			else
				{		
					$('#serbi').text(paramCheck[1]+'('+paramCheck[2]+')');
					$('#workerName').text(userName);			
				}
		} else if (paramCheck[0] == 'MOMAA001') {
			if(searchArr.length>3)
			{
			$('#woNo').text(paramCheck[3]);
			$('#serbi').text(paramCheck[1]+'('+paramCheck[2]+')');
			$('#workerName').text(userName);
			that.woReSearch();
			}
			else
				{			
				$('#serbi').text(paramCheck[1]+'('+paramCheck[2]+')');
				$('#workerName').text(userName);
				}			
		}
	},
	 clock : function() {
		 var that = this;
	    var date = new Date();
	    // date Object를 받아오고
	    var month = date.getMonth();
	    // 달을 받아옵니다
	    var clockDate = date.getDate();
	    // 몇일인지 받아옵니다
	    var day = date.getDay();
	    // 요일을 받아옵니다.
	    var week = ['일', '월', '화', '수', '목', '금', '토'];
	    // 요일은 숫자형태로 리턴되기때문에 미리 배열을 만듭니다.
	    var hours = date.getHours();
	    // 시간을 받아오고
	    var minutes = date.getMinutes();
	    // 분도 받아옵니다.
	    var seconds = date.getSeconds();
	    // 초까지 받아온후
	   var nowTime= `${month+1}월 ${clockDate}일 ${week[day]}요일`+`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;
	    $('#nowTime').text(nowTime); 
	   
	},
	createLotId : function() {
		var that = this;
		var arr = $('#itemName').text().split('(');
		var itemCd = arr[0].replace(")", "");	
		var lotId="";
		var param = {
			P_FLAG : "G",
			P_ITEM_ID : itemCd,
			P_SCODE : "",
			P_CCODE : "",
			P_WORK_ORDER_ID : $('#woNo').text(),
			P_CREATE_BY : userName
		}
		mom_ajax("C", "pop.popResult.snmake", JSON.stringify(param), that.createLotIdCallback);
			

	},
	getLotId : function() {
		var that = this;	
		var lotId="";
		var param = {
				WORK_ORDER_ID : $('#woNo').text(),
				CREATE_BY : userName
			}
		$.ajax({
			url : tuCommon.contextPath()
					+ "/mom/request/com.thirautech.mom.pop.popResult.lotId.dummy",
			type : "GET",
			data : param,
			async : false,
			timeout : 30000000,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data) {
				if (data.length > 0) {
					that.performInsert(data[0].serialnumber);

				} else {
					if (data.p_err_msg != null
							&& data.p_err_msg != undefined
							&& data.p_err_msg != '') {
						
					} else {
						
					}
					console.log(data);
				}

			}
		});
		
		// mom_ajax("R", "pop.popResult.lotId.dummy", JSON.stringify(param),
		// that.getLotIdCallback);
			

	},
	
	createLotIdCallback : function(result, data, call_back_param, index_info, your){
		var that = this.complete;
		if(result == "SUCCESS") {
			that.getLotId();
				 
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				
			} else {
				
			}
			console.log(data);
		}
	},
	createperformInsertCallback : function(result, data, call_back_param, index_info, your){
		var that = this.complete;
		if(result == "SUCCESS") {
			that.woReSearch();				 
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				
			} else {
				
			}
			console.log(data);
		}
	},
	changeWoStateCallback : function(result, data, call_back_param, index_info, your){
		var that = this.complete;
		if(result == "SUCCESS") {
			if ($('#serbiStatus').text()=='가동중')
			{
				$('#serbiStatus').text("정지");
				
			}
			else if($('#serbiStatus').text()=='정지')
			{
				$('#serbiStatus').text("가동중");
			}	
				 
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				
			} else {
				
			}
			console.log(data);
		}
	},
	closeWorkorderCallback : function(result, data, call_back_param, index_info, your){
		var that = this.complete;	
		if(result == "SUCCESS") {
				$('#serbiStatus').text("마감");										 		
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				
			} else {
				
			}
			console.log(data);
		}
	},
	woStateChange : function(woId) {
		var that = this;
		var saveItem = "";
		var goodQtyCount = 0;
		var chkFlag = false;
		var param = {
			p_serialnumber : "LOTSTART",
			p_division_cd : divisionCd,
			p_company_cd : companyCd,
			p_work_order_id : woId,
			p_wo_state : "R",
			p_shift_cd : "DAY",
			p_work_person : "1",
			p_good_qty : "0",
			p_bad_qty : "0",
			p_description : "pop실적",
			p_close_flag : "N",
			p_badcode : "BAD",
			p_destination : "",
			p_update_by : userName,
			p_short_sn : "K",
			p_long_sn : "JH"
		}
		mom_ajax("C", "pop.popResult.popworesult", JSON.stringify(param));
		

	},
	woReSearch : function() {
		var serbi = sessionStorage.getItem("serbi");
		var woId = sessionStorage.getItem("woId");
		var param = {
			divisionCd : divisionCd,
			companyCd: companyCd,
			resourceCd : searchArr[1],
			pageId : 'complete',
			woId : $('#woNo').text()
		}	
				$.ajax({
					url : tuCommon.contextPath()
							+ "/mom/request/com.thirautech.mom.pop.popResult.wosearch.dummy",
					type : "GET",
					data : param,
					async : false,
					timeout : 30000000,
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data) {
						if (data.length > 0) {
							var ctQty=0;
							var packingQty=0;
							var planQty=0;
							var goodQty=0;
							var progress=0;
							var openBoxQty=0;
							var woState="";
							if (data[0].woState=='H')
								{
								woState='정지';
								}
							else if (data[0].woState=='R')
								{
								woState='가동중';
								}
							else if (data[0].woState=='A')
							{
							woState='작업지시';
							}
							$('#woNo').text(data[0].workOrderId);
							$('#itemName').text(data[0].itemId+'('+data[0].itemName+')');
							$('#serbiStatus').text(woState);
							$('#planQty').text(data[0].confirmQty+' '+data[0].unit);
							$('#goodQty').text(data[0].qty+' '+data[0].unit);
							$('#badQty').text(data[0].badQty+' '+data[0].unit);
							$('#inputType').text(data[0].popInputType);						
							$('#defaultInputQty').text(data[0].popMakeLotQty);	
							$('#woStartEndDate').text(data[0].startTime+' / '+data[0].planEndDate);	
							planQty=Number(data[0].confirmQty);
							goodQty=Number(data[0].qty);
							ctQty=Number(data[0].popCtQty);
							packingQty= Math.ceil(planQty/ctQty);
							openBoxQty= Math.ceil(goodQty/ctQty);																										
							progress=((goodQty/planQty)*100).toFixed(1);
							$('#ctQty').text(openBoxQty+'/'+packingQty);
							$('#progress').text(progress+'%');
						} else {
							if (data.p_err_msg != null
									&& data.p_err_msg != undefined
									&& data.p_err_msg != '') {
								
							} else {
								
							}
							console.log(data);
						}

					}
				});

	},
	performInsert : function(lotId) {
		var that = this;
		var saveItem = "";
		var goodQtyCount = 0;
		var chkFlag = false;
		var param = {
			p_serialnumber : lotId,
			p_division_cd : divisionCd,
			p_company_cd : companyCd,
			p_work_order_id : $('#woNo').text(),
			p_wo_state : "R",
			p_shift_cd : "DAY",
			p_work_person : "1",
			p_good_qty : $('#defaultInputQty').text(),
			p_bad_qty :  '0',
			p_description : "pop실적",
			p_close_flag : "N",
			p_badcode : "BAD",
			p_destination : "",
			p_update_by : userName,
			p_short_sn : "K",
			p_long_sn : "JH"
	}
		mom_ajax("C", "pop.popResult.popworesult", JSON.stringify(param), that.createperformInsertCallback);
		
	},
	woHold : function() {
		var that = this;
		var saveItem = "";
		var goodQtyCount = 0;
		var woState="";
		var chkFlag = false;
	if ($('#serbiStatus').text()=='가동중')
		{
			woState= "R";
		}
		else if($('#serbiStatus').text()=='정지')
		{
			woState= "H";
		}	
		var param = {		
				woState : woState,
				divisionCd  : divisionCd,
				companyCd : companyCd,
				workOrderId : $('#woNo').text()
				
	}
		mom_ajax("U", "pop.popResult.holdState", JSON.stringify(param), that.changeWoStateCallback);
		

	},
	woClose : function() {
		var that = this;	
		var param = {						
				divisionCd : divisionCd,
				companyCd : companyCd,
				workOrderId : $('#woNo').text(),
				userId : userName
	}
		mom_ajax("C", "pop.popResult.closeWorkorderProc", JSON.stringify(param), that.closeWorkorderCallback);
		

	},
	event : function() {
		var that = this;
		var cnt = 0;

		// 화면 닫기
		$(document).on('click', '#closeBtn', function() {			
			 if($('#serbiStatus').text()=='가동중')
		       {that.woHold();}
			var woNo= $('#woNo').text();
			var setWo= localStorage.setItem("lastWo", woNo);
			 console.log(typeof setWo);
			window.close();
		});
		// 작업 종료
		$(document).on('click', '#finishBtn', function() {
			if ($('#serbiStatus').text()!='작업지시')
			{		
				that.woClose();
			}
			

		});
		// 작업 정지
		$(document).on('click', '#holdBtn', function() {
			if ($('#serbiStatus').text()!='작업지시')
			{		
				that.woHold();
			}
		

		});
		// 무작업 등록
		$(document).on('click', '#noWorkBtn', function() {			
			if ($('#serbiStatus').text()!='작업지시')
			{		
			
			}

		});
		// 불량등록
		$(document).on('click', '#badBtn', function() {	
			if ($('#serbiStatus').text()!='작업지시')
			{		
			
			}
		});
		// 작업지시번호 눌렀을떄
		$(document).on('click','#woSearchBtn', function() {
			       if($('#serbiStatus').text()=='가동중')
			       {that.woHold();}
			      
			        var param = '?' + searchArr[1]+"/"+searchArr[2]+"/"+$('#woNo').text();
					window.open('MOMAA001.html'+encodeURI(param), '_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
					
				});
		// 작업시작
		$(document).on("click", "#woStartBtn", function() {
			if ($('#serbiStatus').text()=='작업지시')
			{		
				that.woStateChange($('#woNo').text());
				that.woReSearch();
			}
						
		});
		// +(양품추가)
		$(document).on("click", "#performRegBtn", function() {
			that.createLotId();
		});
			// +(양품취소)
			$(document).on("click", "#perforDelBtn", function() {
				
					
		});
		
		// 숫자패드
		$(document).on('click','#defaultInputQty', function() {		
	        var param = '?' + $('#defaultInputQty').text();
			window.open('numberPad.html' + param, '_blank','width=500,height=500,left=0,top=0');		
		});
	}, 
		
};

$(document).ready(function(event) {
	complete.init();
	 
});