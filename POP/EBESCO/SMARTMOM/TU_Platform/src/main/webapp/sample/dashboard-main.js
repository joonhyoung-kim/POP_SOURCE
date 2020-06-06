$(document).ready(function () {
    page.init();
});

var orange = "#FF5722";
var blue = "#5C6BC0";
var green = "#4CAF50";
var yellow = "#FFC107"
var mLangList = new Array();
var LangVo = new Object();

var balloonText = "<div style='font-size:10px;margin-bottom:-5px'>[[category]]</div><div style='font-size:13px;'>[[value]]</div>";
var page = {
    init: function () {
        this.mlang();
        this.grid();
        this.grid2();
        this.menuGet();
        this.event();
//        this.lineWorkingDataGet();
    },
    mlang: function(){
        var params = {};
        var _this = this;
        
        ajaxService(params, '/ajaxDashboardMultiLangList.do', function(data){
            LangVo = data.langVo;
            
            $("#chartLabel").text(LangVo['설비별CAPA_SHORTAGE현황']);
            $("#chartLabel1").text(LangVo['중요자재SHORTAGE현황']);
            $("#lineWorkingLabel").text(LangVo['라인가동현황']);
            $("#lineStateWait").text(LangVo['대기']);
            $("#lineStateRun").text(LangVo['진행']);
            $("#lineStateEnd").text(LangVo['완료']);
            $("#lineStateNot").text(LangVo['비가동']);
            $("#lineStateStop").text(LangVo['정지']);
            
            $("#loginUserId").text(data.empNo);
            
        }, 'POST', null, {async:false});
    },
    event: function(){
        var params = {};
        $("#popRunBtn").click(function(){
            ajaxService(params, '/ajaxMomPopCall.do', function(data){
                
            }, 'POST', null, {async:false});
        });
        
    },
    menuGet: function(){
        var params = {};
        var _this = this;
        
        ajaxService(params, '/ajaxMenuSelect.do', function(data){
            var menuList = data.list;
            _this.menuSetting(menuList);
            
        }, 'POST');
    },
    menuSetting: function(list){
        $("#topMenu").find("li").remove();
        var menu = list;
        var menu2 = list;
        var menu3 = list;
        
        for(var i=0; i<menu.length; i++){
            var temp = 0;
            var menuDiv = "";
            
            var menuDiv1 = "<li class='depth1-menu w-clearfix'>"
                        + "<div class='w-dropdown menu-sam-width w-clearfix top-dropdown'>"
                        + "    <div class='w-dropdown-toggle menu-sam-width topdrown'>"
                        + "        <div>#{menuName}</div>"
                        + "        <div class='w-icon fa fa-angle-down'></div>"
                        + "    </div>";
            
            var menuDiv2 = "<nav class='w-dropdown-list header-nav w-clearfix topdroplist'>"
                        + "<div class='depth2 depth1'>"
                        + "<div class='w-clearfix menuarea'>";
            
            if(menu[i].level2 == 2 && menu[i].menuName!='MOBILE'){
                if(menu[i].menuAuthority != ""){
                    menuDiv = menuDiv1.replace(/#\{menuName\}/g, menu[i].mlangMenuName);
                    
                    menuDiv += menuDiv2;
                    
                    var menuDiv3 = "<div class='w-20-list'>" 
                        + "<ul id='ul' class='w-list-unstyled'>"; 
                    
                    for(var j=0; j<menu2.length; j++){
                        
                        var menuDiv3_1 = "<li class='s-depth2-wrap'>" 
                            + "<div class='w-icon fa fa-angle-down icon r5'></div>"
                            + "#{menuName}</li>";
                        
                        if(menu2[j].parentId == menu[i].menuId && menu2[j].level2 == 3 && menu2[j].menuAuthority != ""){
                            if(menu2[j].programId != '#'){
                                if(temp == 0){
                                    menuDiv += menuDiv3;
                                }
                                temp++;
                                var menuDiv3_2 = "<li><a href='#{programId}' class='w-clearfix w-inline-block s-depth2-col click_menu' menuId='#{menuId}'>"
                                    + "<div class='icon-circle'></div>"
                                    + "<div class='textblock'>"
                                    + "#{menuName}</div></a></li>";
                                
                                menuDiv3_2 = menuDiv3_2.replace(/#\{programId\}/g, menu2[j].programId).replace(/#\{menuName\}/g, menu2[j].mlangMenuName);
                                menuDiv3_2 = menuDiv3_2.replace(/#\{menuId\}/g, menu2[j].menuId);
                                
                                menuDiv += menuDiv3_2;
                            } else{
                                menuDiv += menuDiv3;
                                menuDiv += menuDiv3_1.replace(/#\{menuName\}/g, menu2[j].mlangMenuName);
                                for(var k=0; k<menu3.length; k++){
                                    var menuDiv4 = "<li><a href='#{programId}' class='w-clearfix w-inline-block s-depth2-col click_menu' menuId='#{menuId}'>"
                                        + "<div class='icon-circle'></div>"
                                        + "<div class='textblock'>"
                                        + "#{menuName}</div></a></li>";
                                    
                                    if(menu3[k].parentId == menu2[j].menuId && menu3[k].level2 == 4 && menu3[k].menuAuthority != ""){
                                        menuDiv4 = menuDiv4.replace(/#\{programId\}/g, menu3[k].programId).replace(/#\{menuName\}/g, menu3[k].mlangMenuName);
                                        menuDiv4 = menuDiv4.replace(/#\{menuId\}/g, menu3[k].menuId);
                                        
                                        menuDiv += menuDiv4;
                                    }
                                }
                                
                                menuDiv += "</ul></div>";
                            }
                        }
                    }
                    
                    if(temp > 0){
                        menuDiv += "</ul></div>";
                    } 
                    menuDiv += "</div></div></nav></div></li>";
                    $("#topMenu").append(menuDiv);
                }
            }
        }
        
        // 대메뉴 마우스 오버 시 서브메뉴 Open/Close
        $(".w-dropdown-toggle").on("mouseenter", function () {
            if ($(this).hasClass("is-show")) {
//                $(this).removeClass("is-show");
//                $(this).parent().find(".w-dropdown-list").removeClass("is-show");
            } else {
                $(".w-dropdown-toggle").removeClass("is-show");
                $(".w-dropdown-toggle").parent().find(".w-dropdown-list").removeClass("is-show");
                $(this).addClass("is-show");
                $(this).parent().find(".w-dropdown-list").addClass("is-show");
            }
        });
        
        // 서브메뉴 마우스 leave 시 서브메뉴 Close
        $(".w-dropdown-list").on("mouseleave", function () {
            $(".w-dropdown-toggle").removeClass("is-show");
            $(".w-dropdown-toggle").parent().find(".w-dropdown-list").removeClass("is-show");
        });
        
        // 화면메뉴 클릭 시 서브메뉴 Close
        $(".click_menu").on("click", function () {
            $(".w-dropdown-toggle").removeClass("is-show");
            $(".w-dropdown-toggle").parent().find(".w-dropdown-list").removeClass("is-show");
        });
        
    },
    lineWorkingDataGet: function(){
        var params = {};
        var _this = this;
        
        ajaxService(params, '/ajaxDashboardLineWorkingList.do', function(data){
            var menuList = data.list;
            _this.lineWorkingSetting(menuList);
            
        }, 'POST');
    },
    lineWorkingSetting: function(list){
        $("#lineWorking").find(".linebox").remove();
        
        for(var i=0; i<list.length; i++){
            var temp = 0;
            var lineDiv = "<div class='linebox'>"
                          + "<h5>#{equipmentName}</h5>"
                          + "<div class='total-text'>"
                          + "<h2 class='#{state}'>#{per} %</h2>"
                          + "</div><div class='w-clearfix topline'>"
                          + "<div class='w50p rline'>"
                          + "<div class='textblock'>#{confirmQty} EA</div>"
                          + "</div><div class='w50p'>"
                          + "<div class='textblock'>#{resultQty} EA</div>"
                          + "</div></div></div>";
            
            
            lineDiv = lineDiv.replace(/#\{equipmentName\}/g, list[i].equipmentName);
            
            if(list[i].state == "RUN"){
                lineDiv = lineDiv.replace(/#\{state\}/g, "green-text");
            } else if(list[i].state == "WAIT"){
                lineDiv = lineDiv.replace(/#\{state\}/g, "grey-text");
            } else if(list[i].state == "END"){
                lineDiv = lineDiv.replace(/#\{state\}/g, "yellow-text");
            } else if(list[i].state == "NOT"){
                lineDiv = lineDiv.replace(/#\{state\}/g, "dark-grey-text");
            }
            
            lineDiv = lineDiv.replace(/#\{per\}/g, list[i].per);
            lineDiv = lineDiv.replace(/#\{confirmQty\}/g, list[i].confirmQty);
            lineDiv = lineDiv.replace(/#\{resultQty\}/g, list[i].resultQty);
                    
            $("#lineWorking").append(lineDiv);
        }
        
    },
    grid: function () {
        var dataProvider = new Array();
        var params = {};
        
        var chartOptions = {
                "type": "serial",
                "pathToImages" : "//cdn.amcharts.com/lib/3/images/",
                "categoryField": "date",
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": balloonText,
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": LangVo['일CAPA'],
                        "type": "column",
                        "valueField": "column-1",
                        "labelText": "[[value]]"
                    },
                    {
                        "balloonText": balloonText,
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "title": LangVo['계획시간'],
                        "type": "column",
                        "valueField": "column-2",
                        "labelText": "[[value]]"
                    },
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": LangVo['시간(MIN)']
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": LangVo['설비별CAPA_SHORTAGE현황']
                    }
                ],
                "dataProvider": dataProvider
        }
        
        ajaxService(params, '/ajaxMomShortageStatusList.do', function(data){
            for ( var i = 0; i < data.list.length; i++) {
                dataProvider.push({
                    "date" : data.list[i].planDate + "\n" + data.list[i].resourceId,
                    "column-1" : data.list[i].workTime,
                    "column-2" : data.list[i].ttQty,
                });
            }
            AmCharts.makeChart("chart", chartOptions);
            
        }, 'POST');
        
    },
    grid2: function () {
        var dataProvider = new Array();
        var params = {};
        
        var chartOptions = {
                "type": "serial",
                "pathToImages" : "//cdn.amcharts.com/lib/3/images/",
                "categoryField": "date",
                "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "chartScrollbar": {
                    "enabled": true
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": balloonText,
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": LangVo['품목'],
                        "type": "column",
                        "valueField": "column-1",
                        "labelText": "[[value]]"
                    },
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": LangVo['부족수량']
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "enabled": true,
                    "useGraphSettings": true
                },
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": LangVo['중요자재SHORTAGE현황']
                    }
                ],
                "dataProvider": dataProvider
        }
        
        ajaxService(params, '/ajaxMomShortageStatusList2.do', function(data){
            for ( var i = 0; i < data.list.length; i++) {
                dataProvider.push({
                    "date" : data.list[i].planDate + "\n" + data.list[i].itemId,
                    "column-1" : data.list[i].qty,
                });
            }
            
            AmCharts.makeChart("chart1", chartOptions);
        }, 'POST');
    }
}