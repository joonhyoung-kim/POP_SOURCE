var menuList = sessionStorage.getItem("menuList");
var authMenuList = sessionStorage.getItem("authGroupMenuList");
var resourceList = sessionStorage.getItem("resourceList");
var divisionName = sessionStorage.getItem("divisionName");
var userId = sessionStorage.getItem("userId");
var search =  decodeURI(location.search.replace("?", ""));
var searchArr = search.split('/');
var screenLocation= new Array();
var screenLocationList = new Array();
var screenCnt=8;
var pageCount=1;
var macaddress;


var screenselect = {
	currentPage : undefined,
	initMessage : undefined,
	initParam : undefined,
	excelParam : undefined,
  
	init : function() {
		
		var that = this;
		Language.init(function() {         
			// that.setting(searchArr);
			// that.clock();
			// setInterval(that.clock, 1000);
		});
		that.setting(searchArr);
		that.event();		
	},
	 setting: function(paramCheck) {
		 var that = this;
		 if (paramCheck[0] == 'login') 
		 {	 
			 var cnt=1;
				menu=JSON.parse(menuList);
				myMenu=authMenuList.replace('[','').replace(']','').replace(/\"/gi, "");
				myMenuArray=myMenu.split(',');
				$('#screenTitle').text("작업화면 선택");
				$('#divisionName').text(divisionName);
				$('#loginId').text(userId+"님");
				
			
				for(var i=0;i<menu.length;i++)			
					for(var j=0;j<myMenuArray.length;j++)				
						{
							if(menu[i].id==myMenuArray[j])
								{		
								 var data = new Object() ;	
								 data.screen="screen"+cnt;
								 data.url=menu[i].url;
								 data.name=menu[i].name;
								 screenLocation.push(data);
								 screenLocationList.push(data);
								 var page="#screen"+cnt;
							 if(cnt<10)
							 {   $(page).css('top','35%');
								 $(page).text(menu[i].name);
							 
							 }										 
							 cnt++;
							     }
							   }				
			}
		 else if (paramCheck[0] == 'complete')
		 {
			 var cnt=1;
			 resources=JSON.parse(resourceList);
			 $('#screenTitle').text("설비 선택");
			 $('#divisionName').text(divisionName);
			 $('#loginId').text(userId+"님");		
			 
			 for(var i=0;i<resources.length;i++)
				 {
				 var data = new Object() ;	
				 data.screen="screen"+cnt;
				 data.code=resources[i].code;
				 data.name=resources[i].name;
				 screenLocation.push(data);
				 screenLocationList.push(data);
				 var page="#screen"+cnt;
			 if(cnt<10)
			 {   
				 resourceArray=resources[i].name.split('(');
				 $(page).css('top','10%');
				 $(page+'-1').text(resourceArray[0]);
				 $(page+'-2').text(resourceArray[1].replace(")", ""));
			 
			 }										 
			 cnt++;
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
	logout: function() {
		var param = {
			}
		$.get(tuCommon.contextPath() + "/system/logout", param, 
		function(data){
			location.href = tuCommon.contextPath() + "/login2.html?flag=logout";
		});
	},
	event : function() {
		var that = this;
		var cnt = 0;

		// 화면 닫기
		$(document).on('click', '#closeBtn', function() {	
			
			if (searchArr[0] == 'login') 
				{
				that.logout();
				}
			else if (searchArr[0] == 'complete') 
				{
				var param = '?' +'login/'+macaddress;
				window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');	
				}
			// top.location.href = tuCommon.contextPath() + "/login.html";
			// window.close();
			
		});
		// screen1 클릭
		$(document).on('click', '#screen1', function() {		
			if ($('#screen9').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen1')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen1') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen1-1').text()+'/'+$('#screen1-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
			
		});
		// screen2 클릭
		$(document).on('click', '#screen2', function() {
			
			if ($('#screen9').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen2')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen2') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen2-1').text()+'/'+$('#screen2-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
			
		});
		// screen3 클릭
		$(document).on('click', '#screen3', function() {
			
			if ($('#screen3').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen3')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen3') 
							{
							
							    var param = '?' +'resourceSelect/'+$('#screen3-1').text()+'/'+$('#screen3-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
			
		});
		// screen4 클릭
		$(document).on('click', '#screen4', function() {
			
			if ($('#screen4').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen4')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen4') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen4-1').text()+'/'+$('#screen4-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
			
		});
		// screen5 클릭
		$(document).on('click', '#screen5', function() {
			
			if ($('#screen5').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen5')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen5') 
							{
							
							var param = '?' +'resourceSelect/'+$('#screen5-1').text()+'/'+$('#screen5-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
			
		});
		// screen6 클릭
		$(document).on('click', '#screen6', function() {
			
			if ($('#screen6').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen6')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen6') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen6-1').text()+'/'+$('#screen6-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
		});
		// screen7 클릭
		$(document).on('click', '#screen7', function() {
			
			if ($('#screen7').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen7')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen7') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen7-1').text()+'/'+$('#screen7-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
		});
		// screen8 클릭
		$(document).on('click', '#screen8', function() {
			
			if ($('#screen8').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen8')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen8') 
							{
							
							    var param = '?' +'resourceSelect/'+$('#screen8-1').text()+'/'+$('#screen8-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
		
		});
		// screen9 클릭
		$(document).on('click', '#screen9', function() {
			
			if ($('#screen9').text()!=null) //버튼활성화 체크 
			{
				var jsonData = JSON.stringify(screenLocation);
				var parseData =JSON.parse(jsonData);		
				if (searchArr[0] == 'login') //작업선택화면
					{
				
				for(var i=0;i<parseData.length;i++)
					{
					if(parseData[i].screen=='screen9')
						{
						if(parseData[i].url=="dashboard/complete")
							{
							var param = '?' +'complete/'+macaddress;
							window.open(tuCommon.contextPath() + "/dashboard/screenselect.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');						
							}
						else
							{
							location.href = tuCommon.contextPath() + '/'+parseData[i].url+'.html';
							}
						
						}			
					}			
					  }
				else if (searchArr[0] == 'complete') //설비선택화면
					{				
					for(var i=0;i<parseData.length;i++)
						{
						if(parseData[i].screen=='screen9') 
							{
							
								var param = '?' +'resourceSelect/'+$('#screen9-1').text()+'/'+$('#screen9-2').text();
								window.open(tuCommon.contextPath() + "/dashboard/complete.html"+ encodeURI(param),'_self','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');																											
							}			
						}
					}
			}
		
		});
		// 화면 올리기
		$(document).on('click', '#up', function() {
			if(screenCnt>=18){
				if (searchArr[0] == 'login') 
				{
			var screenLocationData = JSON.stringify(screenLocation);
			var screenLocationListData = JSON.stringify(screenLocationList);
			var parseLocation =JSON.parse(screenLocationData);
			var parseLocationList =JSON.parse(screenLocationListData);	
			screenLocation= new Array();
			if(screenCnt==18)
				{
				screenCnt-=19;	
				
				}
			else 
				{
				screenCnt-=18;	
				}
			for(var i=1;i<=9;i++)
			 {
				if(parseLocationList[screenCnt+i]!=null)
				{
					
					// delete screenLocation[i-1];
					var screenName="#screen"+i;
					$(screenName).text(parseLocationList[screenCnt+i].name);				
					var data = new Object();	
					data.screen="screen"+i;
					data.url=parseLocationList[screenCnt+i].url;
					data.name=parseLocationList[screenCnt+i].name;
					screenLocation.push(data);
				/*
				 * screenLocationData = JSON.stringify(screenLocation);
				 * parseLocation = JSON.parse(screenLocationData);
				 */
				}
				
				else if(parseLocationList[screenCnt+i]==null)
				{
				    var screenName="#screen"+i;
					$(screenName).text("");
				}
			 }			
			
			}
				else if (searchArr[0] == 'complete')
					{			
					var screenLocationData = JSON.stringify(screenLocation);
					var screenLocationListData = JSON.stringify(screenLocationList);
					var parseLocation =JSON.parse(screenLocationData);
					var parseLocationList =JSON.parse(screenLocationListData);	
				   
					screenLocation= new Array();
					if(screenCnt==18)
						{
						screenCnt-=19;	
						
						}
					else 
						{
						screenCnt-=18;	
						}
					for(var i=1;i<=9;i++)
					 {
						if(parseLocationList[screenCnt+i]!=null)
						{
							
							// delete screenLocation[i-1];
							var screenName="#screen"+i;							
							resources=JSON.parse(resourceList);
							resourceArray=resources[screenCnt+i].name.split('(');
							$(screenName+'-1').text(resourceArray[0]);
							$(screenName+'-2').text(resourceArray[1].replace(")", ""));	
							var data = new Object();	
							data.screen="screen"+i;
							screenLocation.push(data);
						/*
						 * screenLocationData = JSON.stringify(screenLocation);
						 * parseLocation = JSON.parse(screenLocationData);
						 */
						}
						
						else if(parseLocationList[screenCnt+i]==null)
						{
						    var screenName="#screen"+i;
						    $(screenName+'-1').text("");
							$(screenName+'-2').text("");
						}
					 }
					
					
					
					}
			}
		});
		// 화면내리기
		$(document).on('click', '#down', function() {
			if($('#screen9').text()!="")
				{
				if (searchArr[0] == 'login') 
				{
					var screenLocationData = JSON.stringify(screenLocation);
					var screenLocationListData = JSON.stringify(screenLocationList);
					var parseLocation =JSON.parse(screenLocationData);
					var parseLocationList =JSON.parse(screenLocationListData);	
					screenLocation= new Array();
					if (screenCnt<8)
						{
						screenCnt=8;
						}
					for(var i=1;i<=9;i++)
					 {
						if(parseLocationList[screenCnt+i]!=null)
						{
						// delete screenLocation[i-1];
					    var screenName="#screen"+i;
					    
						$(screenName).text(parseLocationList[screenCnt+i].name);				
						var data = new Object();	
						 data.screen="screen"+i;					 
						 data.url=parseLocationList[screenCnt+i].url;
						 data.name=parseLocationList[screenCnt+i].name;
						 screenLocation.push(data);	
						 /*
							 * screenLocationData = JSON.stringify(screenLocation);
							 * parseLocation = JSON.parse(screenLocationData);
							 */
						} 
						else if(parseLocationList[screenCnt+i]==null)
							{
							    var screenName="#screen"+i;
								$(screenName).text("");
							}
					 }
					if(screenCnt==8)
						{
						screenCnt+=10;
						}
					else
						{
						screenCnt+=9;
						}
				}
				
				
			else if (searchArr[0] == 'complete') 
				{
				var screenLocationData = JSON.stringify(screenLocation);
				var screenLocationListData = JSON.stringify(screenLocationList);
				var parseLocation =JSON.parse(screenLocationData);
				var parseLocationList =JSON.parse(screenLocationListData);	
				screenLocation= new Array();
				if (screenCnt<8)
					{
					screenCnt=8;
					}
				for(var i=1;i<=9;i++)
				 {
					if(parseLocationList[screenCnt+i]!=null)
					{			
				    var screenName="#screen"+i;
				    resources=JSON.parse(resourceList);
					resourceArray=resources[screenCnt+i].name.split('(');
				    $(screenName+'-1').text(resourceArray[0]);
					$(screenName+'-2').text(resourceArray[1].replace(")", ""));					
					var data = new Object();	
					 data.screen="screen"+i;
					 screenLocation.push(data);					
					} 
					else if(parseLocationList[screenCnt+i]==null)
						{
						    var screenName="#screen"+i;
						    $(screenName+'-1').text("");
							$(screenName+'-2').text("");	
						}
				 }
				if(screenCnt==8)
					{
					screenCnt+=10;
					}
				else
					{
					screenCnt+=9;
					}
				}
				
				}
		});
		
	}, 
		
};

$(document).ready(function(event) {
	screenselect.init();
	 
});