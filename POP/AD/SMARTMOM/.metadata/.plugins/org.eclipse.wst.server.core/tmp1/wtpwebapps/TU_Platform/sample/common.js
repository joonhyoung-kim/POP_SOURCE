
var tabs = $(".tabclass");

var tabCnt = 0;
var gvMenuId = "";

/**
 * tabMenu 구성
 * @returns
 */
$(document).ready(function(){
	if(typeof tabMenu !== "undefined"){
		tabMenu.draw(".tabclass");
	}
});

$(document).on('click', '.jarvismetro-tile', function (event) {
    var tabTitle = $(this).text().trim();
    var divId = "ID_" + $(this).attr("href").replace(/^#/, '');
    var index = 100;
    var menuText;
    tabs.find("#recent-tab > li").each(function () {
        menuText = $(this).find("a").text();
        if (tabTitle == menuText) {
            index = tabs.find("#recent-tab > li").index($(this));
            loadFlag = $(this).hasClass("active");
        }
    });
    addTab(tabTitle, divId, index);
    event.preventDefault();
    return false;
});

$(document).on('click', '.click_menu', function (event) {
    gvMenuId = $(this).attr("menuId");
    var tabTitle = $(this).text();
    var divId = "ID_" + $(this).attr("href").replace(/^#/, '');

    var index = 100;
    var menuText;
    var isTab = 'N';
    
    if(typeof tabMenu !== "undefined") {
    	$(".tabclass").find(".tabmenu").each(function() {
            menuText = $(this).text();
            
            if (tabTitle == menuText) {
                index = $(".tabclass").find(".tabmenu").index($(this));
                loadFlag = $(this).hasClass("active");
                isTab = 'Y';
            }
        });
    } else {
    	tabs.find("#recent-tab > li").each(function () {
            menuText = $(this).find("a").text();
            if (tabTitle == menuText) {
                index = tabs.find("#recent-tab > li").index($(this));
                loadFlag = $(this).hasClass("active");
                isTab = 'Y';
            }
        });
    }

//    if(tabCnt > 10 && isTab == 'N'){
//        alert("The maximum number of tabs 12.");
//        return;
//    } else{
        addTab(tabTitle, divId, index, isTab);
//    }

    event.preventDefault();
    return false;
});

$(window).on('hashchange', function() {
	var divId = "#ID_" + location.hash.substring(1);
	if(divId < 5) {
		$(".tab-pane").removeClass("active");
        $("#recent-tab li").removeClass("active");
        $(divId).addClass("active");
		$('#recent-tab li:has(a[href="' + location.hash + '"])').addClass("active");
	}
});


var index = 0;
var tabTemplate = "<li class='active'><a data-tab='tab' href='##{href}' class='click_tab'>#{label}<span class='click_remove'><i class='fa fa-times'></i></span></a></li>";
var tabTemplateDrag = "<li class='listitem'><a href='##{href}' data-tab='tab' class='w-inline-block tabmenu click_tab active'><div class='textblock'>#{label}</div><img src='./Images/68679dd4-45f8-4b78-8380-54dbee8a000a.png' width='8' height='8' class='closeimage'></img></a></li>";

var contentsTemplate = "<div id='ID_#{contentsId}' class='tab-pane active' >"
	+ "<iframe id='i#{contentsId}' class='cont_frame' src='/#{contentsId}.do'"
    + "frameborder='0' scrolling='no' marginwidth='0' marginheight='0' leftmargin='0' topmargin='0'></iframe></div>";

// actual addTab function: adds new tab using the input from the form above
function addTab(tabTitle, divId, index, isTab) {
	if(typeof tabMenu !== "undefined") {
		$(".tabmenu").removeClass("active");
	} else {
		$("#recent-tab li").removeClass("active");
	}
    
	$(".tab-pane").removeClass("active");
	
	var hashID = divId.substring(3);
	var n = hashID.indexOf("/publish/index.html");
	if (n > 0) hashID = hashID.substr(0, n);

	var test;
	localStorage.setItem("_menuId", gvMenuId);
	if (index == 100) {
	    //draggable tabMenu by kimside
	    if(typeof tabMenu !== "undefined") {
	    	var liTemplate = $(tabTemplateDrag.replace(/#\{href\}/g, hashID).replace(/#\{label\}/g, tabTitle));
	    	$(".tabclass").append(liTemplate);
		    
	    	tabMenu.scrollPosition(liTemplate[0].offsetLeft);
	    } else {
	    	var liTemplate = $(tabTemplate.replace(/#\{href\}/g, hashID).replace(/#\{label\}/g, tabTitle));
		    $(".tabclass").find("ul").append(liTemplate);
	    }
	    //draggable tabMenu by kimside
	    
	    test = contentsTemplate.replace(/#\{contentsId\}/g, hashID);
	    if (n > 0 ) {
	    	//html 반영시 주소 설정
	    	//반영하는 서버
	        test = test.replace('/' + hashID+'.do', "http://211.199.87.242:8888/Mbox/design/" + hashID+"/publish/index.html?v="+new Date().getTime());
//	        test = test.replace('/' + hashID+'.do', "http://112.216.110.174:8044/mica/" + hashID+".html?v="+new Date().getTime());
//	        test = test.replace('/' + hashID+'.do', "http://192.168.0.204/mica/" + hashID+".html?v="+new Date().getTime());
//	        test = test.replace('/' + hashID+'.do', "http://112.216.110.174:8084/mica/" + hashID+".html?v="+new Date().getTime());
//	        test = test.replace('/' + hashID+'.do', "http://112.216.110.174:8083/mica/" + hashID+".html?v="+new Date().getTime());
//	        test = test.replace('/' + hashID+'.do', "http://106.249.231.219/mica/" + hashID+".html?v="+new Date().getTime());
	    }
	    div = $(test);

		$(".tab-content").append(div);
		dataString = new Object;
		dataString = {
				hashID : hashID,
	    };
		var getUrl = window.location.href;
		//이력화면 관련 추가 ajax
		$.ajax({
	        type: "POST",
	        url: "/ajaxMomMenuSelect.do",
	        cache:false,
	        data : JSON.stringify(dataString),
	        contentType : "application/json; charset=utf-8",
	        processData : false,
	        dataType: "json",
	        success: function(result) {
	          if(result.result=="success") {

	          } else {

	          }
	        },
	        error : function(request, status, error) {
//	            $(location).attr('href', "redirect:/");
	            window.location = "/sessionTimeout.do";
//	            alert("NETWORK ERROR : " + request.status);
            }
	      });

		if(isTab == 'N'){
		    tabCnt ++;
		}
    } else {
//        $("#recent-tab li:eq(" + index + ")").addClass("active"); //Activate first tab
//        $("#"+divId).addClass("active");
    	
    	//draggable tabMenu by kimside
    	if(typeof tabMenu !== "undefined") {
    		$(".tabmenu:eq(" + index + ")").addClass("active"); //Activate first tab
    		console.log($(".tabmenu:eq(" + index + ")")[0].offsetLeft);
    		tabMenu.scrollPosition($(".tabmenu:eq(" + index + ")")[0].offsetLeft);
    	} else {
    		$("#recent-tab li:eq(" + index + ")").addClass("active"); //Activate first tab
    	}
    	//draggable tabMenu by kimside
    	
        var n = divId.indexOf(".html");
        if (n > 0) divId = divId.substr(0, n);
        $("#"+divId).addClass("active");
    }
	window.location.hash = hashID;
    return false;
}

var delFlag = false;
$(document).on('click.tab.data-api', '[data-tab="tab"]', function (e) {
//    if ($(this).parent().hasClass("active")) return;
    if (delFlag == false) {
    	if(typeof tabMenu !== "undefined") {
    		$(".tab-pane").removeClass("active");
    		$(".tabmenu").removeClass("active");
    		$(this).addClass('active');
    	} else {
    		$(".tab-pane").removeClass("active");
    		$("#recent-tab li").removeClass("active");
    		$(this).parent().addClass('active');
    	}
//        divId = $(this).attr("href").replace(/^#/, '');
        hashID = $(this).attr("href");
        divId = "#ID_" + hashID.substring(1);
        $(divId).addClass("active");

        window.location.hash = hashID;
//        loadURL(divId, $('#content'));
    }
    delFlag = false;
    e.preventDefault();
});

$(".tabclass").delegate("span.click_remove", "click", function (e) {
    var hashID = $(this).parent().attr("href")
    var divId = "#ID_" + hashID.substring(1);

    $(divId).remove();
    $(this).closest("li").remove();
    hashID = $("#recent-tab li.active").find("a").attr("href");

    if (!hashID) {
        $("#recent-tab li:last").addClass("active"); //Activate first tab
        hashID = $("#recent-tab li:last").find("a").attr("href");
//        loadURL(divId.replace(/^#/, ''), $('#content'));

    }
    divId = "#ID_" + hashID.substring(1);
    $(divId).addClass("active");
    delFlag = true;
    e.preventDefault();
    tabCnt = tabCnt - 1;
});

//kimside 데모
$(document).on("click", ".closeimage", function (e) {
    var hashID = $(this).parent().attr("href")
    var divId = "#ID_" + hashID.substring(1);

    $(divId).remove();
    $(this).closest("a").remove();
    hashID = $(".tabmenu.active").attr("href");

    if (!hashID) {
        $(".tabmenu:last").addClass("active"); //Activate first tab
        hashID = $(".tabmenu:last").attr("href");
        console.log(hashID);
//        loadURL(divId.replace(/^#/, ''), $('#content'));

    }
    divId = "#ID_" + hashID.substring(1);
    $(divId).addClass("active");
    delFlag = true;
    e.preventDefault();
    tabCnt = tabCnt - 1;
});

function saveDiv() {
    //var storageKey = $("#recent-tab li.active").find("a").attr("href");
    //if (storageKey)
    //    localStorage.setItem(storageKey.replace(/^#/, ''), $(".main-content").html());
}

// ajax 동기 처리
function AjaxGetData(prm, url) {
	var retData = "";
	if(url == null) url = "/mesPosAjaxGetData.do";
    $.ajax({
		url: url,
		type:"POST",
		data:JSON.stringify(prm),
		contentType: "application/json; charset=utf-8",
		async: false,
		cache: false,
		processData:false,
		success : function(result){
			if(result.result == "success") {
				retData =  result;
			return retData;
			}else if(result.result=='fail'){
				alertMessage("DB ERROR :", "실패하였습니다.", "FAIL", 5);
			}else if(result.result==false){
				alertMessage("DB ERROR :", "실패하였습니다.", "FAIL", 5);
			}
		},
		error:function(request, status, error){
			alertMessage("NETWORK ERROR :", request.status, "FAIL", 5);
		}
	});
    return retData;
}

//ajax 비동기 처리
function AjaxGetDataAsync(prm, url, successFunctionId, loaderDiv) {
	if(url == null) url = "/mesPosAjaxGetData.do";
    $.ajax({
		url: url,
		type:"POST",
		data:JSON.stringify(prm),
		contentType: "application/json; charset=utf-8",
//		async: false,
		cache: false,
		processData:false,
		beforeSend :function(){
			if(loaderDiv != null) loaderDiv.show();
		},
		success : function(result){
			if(loaderDiv != null)
				loaderDiv.hide();
			if(result.result == "success") {
				if (successFunctionId != null)	successFunctionId(result);
			}else if(result.result=='fail'){
				alertMessage("DB ERROR :", "실패하였습니다.", "FAIL", 5);
			}else if(result.result==false){
				alertMessage("DB ERROR :", "실패하였습니다.", "FAIL", 5);
			}
		},
        complete : function(data) {
			if(loaderDiv != null) loaderDiv.hide();
        },
		error:function(request, status, error){
			alertMessage("NETWORK ERROR :", request.status, "FAIL", 5);
		}
	});
}

function setOptionList(codeList, codeid) {
	var opt_temp = "<option>#{text}</option>";
    var options ="" ;
    $.each(codeList, function () {
		options += opt_temp.replace(/#\{text\}/g, this[codeid]);
	});
	return options;
}

function alertMessage(title, content, kind, timeout){
	var color = "#296191";
	if(kind == "FAIL") {
		color = "#C79121";
	} else if (kind == "WARNING") {
		color = "#C79121";
	}

	$.smallBox({
		title : title,
		content : "<i class='fa fa-clock-o'></i> <i>" + content + "...</i>",
		color : color,
		iconSmall : "fa fa-bell bounce animated",
		timeout : timeout*1000
	});
}


jQuery(function($) {
    $.datepicker.regional['ko'] = {
        closeText : 'close',
        prevText : '◀',
        nextText : '▶',
        currentText : 'today',
        monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthNamesShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesShort : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        weekHeader : 'Wk',
        dateFormat : 'yy-mm-dd',
        firstDay : 0,
        isRTL : false,
        showMonthAfterYear : true,
        yearSuffix : ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
});
//Setting CommboBox Value
	function setComboBox(target, data) {
	    var value, opt;
	    for (var i = 0; i < data.length; i++) {
	        value = $.trim(data[i]);
	        if (i == 0) opt = $("<option />", { selected:"", value: value, text: value });
    	    else opt = $("<option />", { value: value, text: value });
    	    target.append(opt);
    	}
    	target.trigger('chosen:updated');
	}

//	$(".chosen-select").chosen();


function checkBrowser() {
	var buff = navigator.userAgent;
	if(buff.indexOf("Firefox")> 0) return "FireFox";
	else if(buff.indexOf("Chrome")>0) return "Chrome";
	else return "IE";
}

    //switch element when editing inline
function aceSwitch(cellvalue, options, cell) {
    setTimeout(function () {
        $(cell).find('input[type=checkbox]')
                .wrap('<label class="inline" />')
            .addClass('ace ace-switch ace-switch-5')
            .after('<span class="lbl"></span>');
    }, 0);
}
//enable datepicker
function pickDate(cellvalue, options, cell) {
    //				setTimeout(function(){
    $(cell).find('input[type=text]')
            .datepicker({ format: 'yyyy/mm:dd', language: 'kr', autoclose: true });
    //				}, 0);
}

function style_edit_form(form) {
    //enable datepicker on "sdate" field and switches for "stock" field
    form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
        .end().find('input[name=stock]')
              .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

    //update buttons classes
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
    buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>')

    buttons = form.next().find('.navButton a');
    buttons.find('.ui-icon').remove();
    buttons.eq(0).append('<i class="icon-chevron-left"></i>');
    buttons.eq(1).append('<i class="icon-chevron-right"></i>');
}

function style_delete_form(form) {
    var buttons = form.next().find('.EditButton .fm-button');
    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
    buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
    buttons.eq(1).prepend('<i class="icon-remove"></i>')
}

function style_search_filters(form) {
    form.find('.delete-rule').val('X');
    form.find('.add-rule').addClass('btn btn-xs btn-primary');
    form.find('.add-group').addClass('btn btn-xs btn-success');
    form.find('.delete-group').addClass('btn btn-xs btn-danger');
}
function style_search_form(form) {
    var dialog = form.closest('.ui-jqdialog');
    var buttons = dialog.find('.EditTable')
    buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
    buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
    buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
}

function beforeDeleteCallback(e) {
    var form = $(e[0]);
    if (form.data('styled')) return false;

    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
    style_delete_form(form);

    form.data('styled', true);
}

function beforeEditCallback(e) {
    var form = $(e[0]);
    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
    style_edit_form(form);
}

//unlike navButtons icons, action icons in rows seem to be hard-coded
//you can change them like this in here if you want
function updateActionIcons(table) {
    /**
    var replacement =
    {
        'ui-icon-pencil' : 'icon-pencil blue',
        'ui-icon-trash' : 'icon-trash red',
        'ui-icon-disk' : 'icon-ok green',
        'ui-icon-cancel' : 'icon-remove red'
    };
    $(table).find('.ui-pg-div span.ui-icon').each(function(){
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
    })
    */
}

//replace icons with FontAwesome icons like above
function updatePagerIcons(table) {
    var replacement =
    {
        'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
        'ui-icon-seek-prev': 'icon-angle-left bigger-140',
        'ui-icon-seek-next': 'icon-angle-right bigger-140',
        'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
    };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

        if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
    })
}

function enableTooltips(table) {
    $('.navtable .ui-pg-button').tooltip({ container: 'body' });
    $(table).find('.ui-pg-div').tooltip({ container: 'body' });
}

/*
function createGrid(grid_selector, pager_selector, caption, colNames, colModel, grid_data, height, widthFlag) {

    jQuery(grid_selector).jqGrid({
        data: grid_data,
        datatype: "local",
        height: height,
        colNames: colNames,
        colModel: colModel,
        viewrecords: true,
        rowNum: 20,
        rowList: [23],
        pager: pager_selector,
        altRows: true,
        multiboxonly: true,

        loadComplete: function () {
            var table = this;
            setTimeout(function () {
                updateActionIcons(table);
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        },
        caption: caption,
        autowidth: widthFlag,
        multiselect: false
    });
}
*/

    //switch element when editing inline
    function aceSwitch(cellvalue, options, cell) {
        setTimeout(function () {
            $(cell).find('input[type=checkbox]')
                    .wrap('<label class="inline" />')
                .addClass('ace ace-switch ace-switch-5')
                .after('<span class="lbl"></span>');
        }, 0);
    }
    //enable datepicker
    function pickDate(cellvalue, options, cell) {
        //				setTimeout(function(){
        $(cell).find('input[type=text]')
                .datepicker({ format: 'yyyy/mm:dd', language: 'kr', autoclose: true });
        //				}, 0);
    }


    function style_edit_form(form) {
        //enable datepicker on "sdate" field and switches for "stock" field
        form.find('input[name=sdate]').datepicker({ format: 'yyyy-mm-dd', autoclose: true })
            .end().find('input[name=stock]')
                  .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

        //update buttons classes
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
        buttons.eq(1).prepend('<i class="icon-remove"></i>')

        buttons = form.next().find('.navButton a');
        buttons.find('.ui-icon').remove();
        buttons.eq(0).append('<i class="icon-chevron-left"></i>');
        buttons.eq(1).append('<i class="icon-chevron-right"></i>');
    }

    function style_delete_form(form) {
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
        buttons.eq(1).prepend('<i class="icon-remove"></i>')
    }

    function style_search_filters(form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-xs btn-primary');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }
    function style_search_form(form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable')
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
    }

    function beforeDeleteCallback(e) {
        var form = $(e[0]);
        if (form.data('styled')) return false;

        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
        style_delete_form(form);

        form.data('styled', true);
    }

    function beforeEditCallback(e) {
        var form = $(e[0]);
        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
        style_edit_form(form);
    }



    //it causes some flicker when reloading or navigating grid
    //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
    //or go back to default browser checkbox styles for the grid
    function styleCheckbox(table) {
        /**
			$(table).find('input:checkbox').addClass('ace')
			.wrap('<label />')
			.after('<span class="lbl align-top" />')


			$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
			.find('input.cbox[type=checkbox]').addClass('ace')
			.wrap('<label />').after('<span class="lbl align-top" />');
		*/
    }


    //unlike navButtons icons, action icons in rows seem to be hard-coded
    //you can change them like this in here if you want
    function updateActionIcons(table) {
        /**
        var replacement =
        {
            'ui-icon-pencil' : 'icon-pencil blue',
            'ui-icon-trash' : 'icon-trash red',
            'ui-icon-disk' : 'icon-ok green',
            'ui-icon-cancel' : 'icon-remove red'
        };
        $(table).find('.ui-pg-div span.ui-icon').each(function(){
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
        })
        */
    }

    //replace icons with FontAwesome icons like above
    function updatePagerIcons(table) {
        var replacement =
        {
            'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
            'ui-icon-seek-prev': 'icon-angle-left bigger-140',
            'ui-icon-seek-next': 'icon-angle-right bigger-140',
            'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }

    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({ container: 'body' });
        $(table).find('.ui-pg-div').tooltip({ container: 'body' });
    }



	// Numeric only control handler
    jQuery.fn.ForceNumericOnly =
        function(limit) {
            return this.each(function() {
                    $(this).keydown(function(e) {
                    	var key = e.charCode || e.keyCode || 0;
                    	if( (key >= 37 && key <= 40) || key == 8 || key == 9 || key == 46) return key;
                    	else if(this.value.length >= limit)
                        {
                        	return false;
                        }

                        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                        return (
                        		                                key == 8 ||
                                key == 9 ||
                                key == 46 ||
                               (key >= 37 && key <= 40) ||
                               (key >= 48 && key <= 57) ||
                               (key >= 96 && key <= 105)
                            );
                    });

//                   // 포커스 나갈때 콤마처리
//                   $(this).focusout(function() { $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); });
//                   // 포커스 들어올때 콤마처리
//                   $(this).focusin(function() { $(this).val($(this).val().replace(/\,/g, '')); });

//                 // 키 눌렀을때 콤마처리
//                 $(this).keyup(function() {
//                        $(this).val($(this).val().replace(/,/g, ''));
//                        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//                  });
            });
        };

        // serializeArray를 JSON에 맞게 변환.
        function getFormData($form){
            var unindexed_array = $form.serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function(n, i){
                indexed_array[n['name']] = n['value'];
            });

            return indexed_array;
        }

    	function numFormat( cellvalue, options, rowObject ){

    	    if(cellvalue == null) {
    	        cellvalue = '';
    	        return cellvalue;
    	    }
    	    var partsE = cellvalue.toString().replace(/,/g, "");
    	    var parts = partsE.split(".");
    	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	    return parts.join(".");

    	}

    	function numFormatter(cellvalue, options, rowObject) {

    	    if (cellvalue == null) {
    	        cellvalue = '';
    	        return cellvalue;
    	    }
    	    var partsE = cellvalue.toString().replace(/,/g, "");
    	    var parts = partsE.split(".");
    	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	    return parts.join(".");

    	}

    	function nullFormatter(cellvalue, options, rowObject) {
    	    if(cellvalue == null) {
    	        cellvalue = '-';
    	    }
    	    return cellvalue;
    	}

    	function numFormatter5(cellvalue, options, rowObject) {
    	    if (cellvalue == null) {
    	        cellvalue = '';
    	        return cellvalue;
    	    }
    	    var partsE = cellvalue.toString().replace(/,/g, "");
    	    var parts = partsE.split(".");
    	    if(parts[0] == '') {
    	        parts[0] = 0;
    	    } else {
    	        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	    }
    	    if(parts[1] == null) {
    	        return parts[0]+".0000"
    	    }
    	    parts[1] = rpad(parts[1], 4, '0');
    	    return parts.join(".");
    	}

    	function numFormatter2(cellvalue, options, rowObject) {
    	    if (cellvalue == null) {
    	        cellvalue = '';
    	        return cellvalue;
    	    }
    	    var partsE = cellvalue.toString().replace(/,/g, "");
    	    var parts = partsE.split(".");
    	    if(parts[0] == '') {
    	        parts[0] = 0;
    	    } else {
    	        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	    }
    	    if(parts[1] != null) {
    	        parts[1] = parts[1].substring(0,2);
    	    }
    	    return parts.join(".");
    	}

    	function rpad(originalstr, length, strToPad) {
    	    while (originalstr.length < length)
    	        originalstr = originalstr + strToPad;
    	    return originalstr;

    	}

    	function setColNames(list) {
    		var colNames = [];

    		for(i=0; i<list.length; i++) {
//    			colNames[i] = list[i].thColName;
//    			if($("#"+list[i].thColName).val() != null){
        			colNames[i] = $("#"+list[i].thColName).val();
//        		}
    			//console.log(list[i].thColName + " " + list[i].thColId);
    		}
    		//console.log(list.length);

    		return colNames;
    	}

    	function setColModel(list) {

    		var strArray ="[";

    		for(i=0; i<list.length; i++) {

    			strArray += " { name:'" + list[i].colId + "', index:'" + list[i].colId + "', width:" + list[i].width + ", align:'" + list[i].align + "'";

    			if(list[i].sortable == "Y") {
    				strArray += ", sortable: true";
    			}

    			if(list[i].editable == "Y") {
    				strArray += ", editable:true";
    			}

    			if(list[i].hidden == "Y") {
    				strArray += ", hidden:true";
    			}

    			strArray += "}, ";
    		}

    		strArray+="]";

    		var colModel = eval("(" + strArray + ")");

    		return colModel;
    	}

        function setComGridColNames(list) {
            var colNames = [];
            for(var i=0; i<list.length; i++) {
                colNames[i] = list[i].colName;
            }
            return colNames;
        }

        function setComGridColModel(list) {
            var strArray ="[";
            for(var i=0; i<list.length; i++) {
                strArray += list[i].colValue + ", ";
            }
            strArray+="]";
            var colModel = eval("(" + strArray + ")");
            return colModel;
        }

        function setModalNames(list) {
            for(var i=0; i<list.length; i++) {
                tag = $("#" + list[i].colId);
                var mandatoryFlag = list[i].mandatoryFlag;
                if (tag.length > 0) {
                    if (tag.get(0).tagName == 'INPUT') {
                        $("input[name=" + list[i].colId + "]").parent().prev().children().children("label").text(list[i].colName);
                        if(mandatoryFlag == "Y"){
                            $("input[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("input[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-check-square txt-color-red");
                        } else{
                            $("input[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("input[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-minus-square txt-color-blue");
                        }
                        
                    } else if (tag.get(0).tagName == 'SELECT') {
                        $("select[name=" + list[i].colId + "]").parent().prev().children().children("label").text(list[i].colName);
                        if(mandatoryFlag == "Y"){
                            $("select[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("select[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-check-square txt-color-red");
                        } else{
                            $("select[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("select[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-minus-square txt-color-blue");
                        }
                    } else if (tag.get(0).tagName == 'TEXTAREA') {
                        $("textarea[name=" + list[i].colId + "]").parent().prev().children().children("label").text(list[i].colName);
                        if(mandatoryFlag == "Y"){
                            $("textarea[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("textarea[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-check-square txt-color-red");
                        } else{
                            $("textarea[name=" + list[i].colId + "]").parent().prev().children().find("i").removeClass();
                            $("textarea[name=" + list[i].colId + "]").parent().prev().children().find("i").addClass("fa fa-minus-square txt-color-blue");
                        }
                    }
                }
            }
        }


        // 숫자만 입력 되도록
        function onlyNum() {
            var keycode = window.event.keyCode;

            if ((keycode == 8 || (keycode >= 35 && keycode <= 40)
                    || (keycode >= 46 && keycode <= 57)
                    || (keycode >= 96 && keycode <= 105)
                    || keycode == 109 || keycode == 110
                    || keycode == 189 || keycode == 190 || keycode == 9)
                && !event.shiftKey ) {
                window.event.returnValue = true;
                return;
            } else {
                event.preventDefault(); //IE 사용할 경우
                window.event.returnValue = false;
                return;
            }
        }

        // 특수문자 입력 안되도록
        function fn_nonSpecialKey() {
//          var keycode = window.event.keyCode;
//
//          if ((keycode == 8 || keycode == 9 || keycode == 16
//                  || (keycode >= 35 && keycode <= 40)
//                  || (keycode >= 46 && keycode <= 57)
//                  || (keycode >= 65 && keycode <= 90)
//                  || (keycode >= 96 && keycode <= 105) || keycode == 110
//                  || keycode == 190 )
//                  || keycode == 229 ) {
//              window.event.returnValue = true;
//              return;
//          } else {
//              event.preventDefault(); //IE 사용할 경우
//              window.event.returnValue = false;
//              return;
//          }
        }

         function setOptionList2(codeList, selectId, strFlag, emptyFlag ){
    		 var value = "";
    		 var text = "";
    		 var opt;
    		 
    		 if(null == emptyFlag || !emptyFlag){
    		     $(selectId).empty();
    		 }
    		 for ( var i = 0; i < codeList.length; i++) {
    		   value = $.trim(codeList[i].id);

    		   if(null != strFlag && (strFlag == "N" || strFlag == "n")){
    		       text = $.trim(codeList[i].name);
    		   } else{
    		       text = $.trim(codeList[i].text);
    		   }

    		   if(text.length > 20 ){
    		       text = text.substring(0,20) + "...";
    		   }

    		   if (i == 0)
    		     opt = $("<option />", {
    		       selected : "",
    		       value : value,
    		       text : text
    		     });
    		   else
    		     opt = $("<option />", {
    		       value : value,
    		       text : text
    		     });
    		   $(selectId).append(opt);
    		 }
    	 }

         function setOptionList3(codeList, selectId ){
             var value, text, opt;
             for ( var i = 0; i < codeList.length; i++) {
               value = $.trim(codeList[i].id);
               text = $.trim(codeList[i].text);


               if (i == 0)
                 opt = $("<option />", {
                   selected : "",
                   value : value,
                   text : text
                 });
               else
                 opt = $("<option />", {
                   value : value,
                   text : text
                 });
               $(selectId).append(opt);
             }
         }

         function setOptionListLimitless(codeList, selectId ){
             var value, text, opt;
             for ( var i = 0; i < codeList.length; i++) {
               value = $.trim(codeList[i].id);
               text = $.trim(codeList[i].text);

               if(text.length > 40 ){
                   text = text.substring(0,40) + "...";
               }

               if (i == 0)
                 opt = $("<option />", {
                   selected : "",
                   value : value,
                   text : text
                 });
               else
                 opt = $("<option />", {
                   value : value,
                   text : text
                 });
               $(selectId).append(opt);
             }
         }


         function arr_sub(a1, a2)
         {
           var a=[], sub=[];
           for(var i=0;i<a1.length;i++)
             a[a1[i]]=true;
           for(var i=0;i<a2.length;i++)
             if(a[a2[i]]) delete a[a2[i]];
           for(var k in a)
             sub.push(k);
           return sub;
         }



         function fn_messageSet(message, param1, param2, param3, param4, param5, param6 ){
              var reMessage = message;
              if( param1 != null){
                  reMessage = reMessage.replace("$1",param1);
              }
              if( param2 != null){
                  reMessage = reMessage.replace("$2",param2);
              }
              if( param3 != null){
                  reMessage = reMessage.replace("$3",param3);
              }
              if( param4 != null){
                  reMessage = reMessage.replace("$4",param4);
              }
              if( param5 != null){
                  reMessage = reMessage.replace("$5",param5);
              }
              if( param6 != null){
                  reMessage = reMessage.replace("$6",param6);
              }
              return reMessage;
          }

         function fn_ColShow(site,str, param1,param2,param3,param4,param5,param6 ){
             var len = str.length;
             site = site.substring(0,len);
             if(site == str){
                 $(gridSelector).jqGrid('showCol',param1);
                 $(gridSelector).jqGrid('showCol',param2);
                 $(gridSelector).jqGrid('showCol',param3);
                 $(gridSelector).jqGrid('showCol',param4);
                 $(gridSelector).jqGrid('showCol',param5);
                 $(gridSelector).jqGrid('showCol',param6);
             }
         }


         function fn_AllTrim(str){
             return str.replace(/ +/g,'').replace(/\t+/g,'');
         }

         function fn_OnlyNumFormatter(str){
             if(null != str && str != ""){
                 str = str.toString();
                 str = str.replace(/\,+/g, "");
                 str = str.replace(/\-+/g, "");
                 str = str.replace(/ +/g, "");
                 str = str.replace(/\:+/g, "");
                 str = str.replace(/\/+/g, "");
             }
             return str;
         }


         function fn_dateFormate(dateStr){
             if(null == dateStr){
                 return true;
             }

             var ymd = fn_OnlyNumFormatter(dateStr);
             var er = 0;

             if(ymd.length!=8){
                 er = 1;     //날짜 형식 체크
             }

             var y = ymd.substring(0,4);
             var m = ymd.substring(4,6);
             var d = ymd.substring(6,8);


             var daa = [31,28,31,30,31,30,31,31,30,31,30,31];

             if(y%1000!=0 && y%4==0){
                 daa[1] = 29;    //윤년 체크
             }

             if(d>daa[m-1] || d<1){
                 er = 1;     //날짜 체크
             }

             if(m<1 || m>12){
                 er = 1;     //월 체크
             }

             if(m%1!=0 || y%1!=0 || d%1!=0){
                 er = 1;     //정수 체크
             }

             if(er==1){
                 return false;
             }

             return true;
         }

         function fn_dateTimeFormate(dateStr){
             var ymd = fn_OnlyNumFormatter(dateStr);
             var er = 0;

             if(ymd.length!=12 && ymd.length!=14){
                 er = 1;     //날짜 형식 체크
             }

             var y = ymd.substring(0,4);
             var m = ymd.substring(4,6);
             var d = ymd.substring(6,8);
             var h = ymd.substring(8,10);
             var mi = ymd.substring(10,12);
             var s = "00";

             if(ymd.length==14){
                 s = ymd.substring(12,14);

                 if(s<0 || s>59){
                     er = 1;     //초 체크
                 }
             }

             var daa = [31,28,31,30,31,30,31,31,30,31,30,31];

             if(y%1000!=0 && y%4==0){
                 daa[1] = 29;    //윤년 체크
             }

             if(d>daa[m-1] || d<1){
                 er = 1;     //날짜 체크
             }

             if(m<1 || m>12){
                 er = 1;     //월 체크
             }

             if(h<0 || h>23){
                 er = 1;     //시간 체크
             }

             if(mi<0 || mi>59){
                 er = 1;     //분 체크
             }

             if(m%1!=0 || y%1!=0 || d%1!=0 || h%1!=0 || mi%1!=0 || s%1!=0){
                 er = 1;     //정수 체크
             }

             if(er==1){
                 return false;
             }

             return true;
         }

         function fn_setExMessage(msgCode){
             var reMsg = "";

//             if(msgCode == "org.springframework.jdbc.BadSqlGrammarException"){
//                 reMsg = "Error-0001 is encountered.";
//             } else {
                 reMsg = msgCode;
//             }

             return reMsg;
         }

         function fn_ChkByte(obj, maxByte){
             var str = obj.value;
             var str_len = str.length;
             var rbyte = 0;
             var rlen = 0;
             var one_char = "";
             var str2 = "";

             for(var i=0; i<str_len; i++){
                 one_char = str.charAt(i);
                 if(escape(one_char).length > 4){
                     rbyte += 3;                                         //한글3Byte
                 }else{
                     rbyte++;                                            //영문 등 나머지 1Byte
                 }

                 if(rbyte <= maxByte){
                     rlen = i+1;                                          //return할 문자열 갯수
                 }
             }

             if(rbyte > maxByte){
                 alert("한글 "+(parseInt(maxByte/3))+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
                 obj.value = str.substr(0,rlen);                                  //문자열 자르기
                 //fnChkByte(str2, maxByte);
                 return false;
             } else{
                 return true;
             }
         }

         function fn_validate(frm,rules,msg){
             $(frm).validate({
                 debug: false,
                 onfocusout: false,
                 ignore: ".ignore, .select2-input",
                 rules: rules,
                 messages: msg,
                 submitHandler: function (frm) {
                     //기존 버튼 클릭시 이벤트가 위치 하면 됨. Input의 type=submit 아니면 활용안됨.
                 },
                 errorPlacement: function(error, element) {
                     //에러메시지 표시 위치를 별도로 지정하는 부분. defalut는 element에 메시지 표시됨.
                     //선언 후 내용 없으면 element에 메시지 표시 안됨.
                 },
                 invalidHandler: function(form, validator) {
                     //에러발생시 alertMessage
                     if (validator.numberOfInvalids()) {
                         alertMessage("Warning :", validator.errorList[0].message, "FAIL", 5);
                         validator.errorList[0].element.focus();
                     }
                 }
             });
         }

         function fn_pointUnderMaxLen(obj){
             var keycode = window.event.keyCode;
             var ObjValue = obj.value;
             var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가
             if (_pattern0.test(ObjValue)) {
                if (keycode == 46) {
                    return false;
                }
             }

             if(obj.value.lastIndexOf('.') != -1){
                 var ObjValue = obj.value.split(".");
                 if(ObjValue[1].length > 4){
                     obj.value = obj.value.substr(0,obj.value.length-1);
                 }
             }
         }
         
         
         function fnSetElementList(menuId, groupId) {
             var dataString = new Object;
             dataString = {
                 menuId : menuId,
                 groupId : groupId
             }
             $.ajax({
                 type : "POST",
                 url : "/ajaxMomUserMenuWLlist.do",
                 cache : false,
                 data : JSON.stringify(dataString),
                 contentType : "application/json; charset=utf-8",
                 processData : false,
                 dataType : "json",
                 success : function(result) {
                     if (result.result == "success") {
                         var eList = result.list;
                         var iTag;
                         
                         for(var i=0; i<eList.length; i++){
                             $("#"+eList[i].elementId).hide();
                             
                             if(eList[i].elementFlag == "BTN"){
                                 iTag = $("#"+eList[i].elementId).children("i")[0].outerHTML;
                                 iTag = eList[i].elMultiLang + " " + iTag;
                                 $("#"+eList[i].elementId).html(iTag) ;
                             } else{
                                 $("#"+eList[i].elementId).find("label").text(eList[i].elMultiLang);
                             }
                             
                             if(eList[i].realIsUsable == "Y" || groupId == "9999"){
                                 $("#"+eList[i].elementId).show();
                             }
                         }
                         
                     } else {
                         $("#errorMsgList").val('${LangVO["실패하였습니다"]}');
                         $("#errorMessageModal").modal('show');
                     }
                 }
             });
         }
         
         function fn_nullCheck(chkValue){
             var reVal = false;
             if(chkValue == null) reVal = true;
             else if(chkValue == undefined) reVal = true;
             else if(chkValue == "") reVal = true;
             else if(chkValue == 0) reVal = true;
             
             return reVal;
         }

