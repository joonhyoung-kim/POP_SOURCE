var allowMinusQty;
var currentQty;
var outsourcingUseFlag;
var autoDeductionFlag;
var endPeriod;

$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
	timeout : 30000000,
	async : false,
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		allowMinusQty = data[0].allowMinusQty;
		outsourcingUseFlag = data[0].outsourcingUseFlag;
		autoDeductionFlag = data[0].autoDeductionFlag;
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

var MOMDA003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201808010604309981000mpYThRg9RPO", null, function() {
				that.grid("grid");			
			}, Language);		
			mCommon.init("auigrid", "W201808021809282401001uoz98dsIlZ7", null,function(){
				that.grid("auigrid");
			}, Language);	
			mCommon.init("auigrid1", "W201808021812312811002AzwPWRr2M2r", null,function(){
				that.grid("auigrid1");
			}, Language);		
		});
	}, 
	grid: function(grid) {
		var that = this;
		
		if (grid == "grid") {
			tuCommon.cellClick(grid, 'single');
			
		} else if(grid == "auigrid") {
			AUIGrid.setSelectionMode("auigrid", "singleCell");
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "N_Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){					
					AUIGrid.setColumnPropByDataField( "auigrid", "closeFlag", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data, 
							keyField : "code", 
							valueField : "name" 							
						}
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId:"WORK_ORDER_STATE", attribute4: "Y"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "auigrid", "woState", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data, 
							keyField : "code", 
							valueField : "name" 
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
				type : "GET",
				data : {codeClassId : "SHIFT_CODE"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					AUIGrid.setColumnPropByDataField( "auigrid", "shiftCd", {
						style:"columnStyle",
						labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
							var retStr = value;
							for(var i=0,len=data.length; i<len; i++) {
								if(data[i]["code"] == value) {
									retStr = data[i]["name"];
									break;
								}
							}
							return retStr;
						},
						editRenderer : {
							type : "DropDownListRenderer",
							showEditorBtnOver : true,
							list : data,
							keyField : "code", 
							valueField : "name" 
						}				 		
				 	});
				},
				error: function(data){},
				fail : function(data){}
			});
			
			AUIGrid.setColumnPropByDataField( "auigrid", "startDate", {
				style:"columnStyle",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField( "auigrid", "endDate", {
				style:"columnStyle",
				editRenderer : {
					 type : "CalendarRenderer",
					 openDirectly : true,
					 onlyCalendar : false
				}
			});
			
			AUIGrid.setColumnPropByDataField( "auigrid", "startTime", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "endTime", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "goodQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "insertNumber", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "badQty", { style:"columnStyle" } );
			AUIGrid.setColumnPropByDataField( "auigrid", "description", { style:"columnStyle" } );
			
			AUIGrid.resize("auigrid", $(window).width() * 0.85 - 48, 70);
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMDA003"},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						endPeriod = data[0].endPeriod;
						AUIGrid.bind('auigrid', "cellEditEndBefore", function(event){ 
							if(event.dataField == "startDate") { // 달력 지정한 필드인 경우 
								if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) { 
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
									return event.oldValue; 
								} else {
									return to_date_yyyy_mm_dd(event.value); 
								} 
							}
							return event.value; 
						}); 
					}
				},
				error: function(data){},
				fail : function(data){}
			});
			
		} else if(grid == 'auigrid1'){
			tuCommon.cellClick(grid, 'single');
			AUIGrid.resize("auigrid1", $(window).width() * 0.85 - 48, 280);
		}
	}, 
	event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO", that.getSearchData(), function(){});
		});
		
		// WO/PO, 아이템ID enter로 조회
		$(document).on("keydown", "#searchKeyWord", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "WORKORDER_RESULT_MOMDA003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 실적등록 버튼
		$("#createPerfomanceBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length != 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
			
			if(checkedItems[0].item.orderFlag == "OUT" && outsourcingUseFlag == "Y") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10931']});
				return;
			}
			
			var param = {
				workOrderId : checkedItems[0].item.workOrderId
			}
			mCommon.render("auigrid","W201808021809282401001uoz98dsIlZ7", param, function(){
				mCommon.render("auigrid1","W201808021812312811002AzwPWRr2M2r", param, function(){});
				$("#pop").micaModal("show");
				$(window).resize();//그리드 사이즈 오류 
			});
		});
		
		//실적등록 팝업내의 실적취소버튼
		$("#cancelPerfomanceBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("auigrid1");
			var currentQty = that.getCurrentQty();
			var arrayList = [];
			var messages;
			
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11337']});
				return;
			}
			
			if(autoDeductionFlag == "N") {
				messages = Language.lang['MESSAGES10819'];
			} else {
				messages = Language.lang['MESSAGES10820'];
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				var woId = {
					workOrderId : checkedItems[0].item.workOrderId
				}
				if(checkedItems[i].item.state == "C" || checkedItems[i].item.cancelFlag == '1'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.startTime.substr(0, 10)) <= endPeriod) {
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.getLang('MESSAGES10787' + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(currentQty >= 0) {
						if(checkedItems[i].item.goodQty > currentQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11609']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10818']});
						return;
					}
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:messages, closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						arrayList.push(checkedItems[i].item);
					}
					mom_ajax("L", "workOrder.workOrderResult.workOrderResultCancel", JSON.stringify(arrayList), that.cancelCallback, woId);
				}
			}});
		});
		
		//WO취소 버튼
		$("#cancelWoBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length != 1){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			}
			if(checkedItems[0].item.woState == 'T'){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11136']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.planStartTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11276' + '@' + endPeriod)});
					return;
				}
			}
			
			that.setWOCancelPop(checkedItems[0].item);
			$("#pCancelpop").micaModal("show");
		});
		
		//WO취소 팝업 확인 버튼
		$("#pCancelSaveBtn").click(function(event){
			var params = that.getWOCancelPop();
			if($("#cancelQty").val() == ''){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11472']});
				return;
			}
			if($("#description").val() == ''){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11468']});
				return;
			}
			if(params.cancelQty > params.remainQty){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11474']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10097'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("C", "workOrder.workOrderResult.workOrderCancel", JSON.stringify(params), that.woCancelCallback);
				}
			}});
		});
		
		//WO일괄취소 버튼
		$("#cancelAllWoBtn").click(function(event){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			
			if(checkedItems.length < 1){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11610']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.planStartTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11276' + '@' + endPeriod)});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10095'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i =0; i < checkedItems.length; i++){
						checkedItems[i].item.description = Language.lang['MESSAGES10161'];
						checkedItems[i].item.cancelQty = checkedItems[i].item.remainQty;
						arrayList.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "workOrder.workOrderResult.workOrderCancel", JSON.stringify(arrayList), that.woCancelCallback);
				}
			}});
		});
		
		//저장버튼
		$("#pSaveBtn").click(function(event){
			var realQty = 0; 
			var saveItem = AUIGrid.getGridData("auigrid");
			var defectFlag = saveItem[0].defectFlag;	
			var overFlag = saveItem[0].overFlag;
			var woId = {
				workOrderId : saveItem[0].workOrderId	
			}
			
			var now = new Date();
			var startDT = saveItem[0].startDate + " " + saveItem[0].startTime;
			var endDT = saveItem[0].endDate + " " + saveItem[0].endTime;
			
			var validDT = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
			var regNumber = /^[0-9]*$/;
			
			var chkStartDate = new Date(saveItem[0].startDate);
			var chkEndDate = new Date(saveItem[0].endDate);
			
			var chkStartTime = parseInt(saveItem[0].startTime.replace(":",""));
			var chkEndTime = parseInt(saveItem[0].endTime.replace(":",""));
			
			var currDT = get_current_date('yyyy-mm-dd hh24:mi:ss');
			var currDate = get_current_date('yyyy-mm-dd');
			
			/*시간체크*/
			if(startDT == '' || !validDT.test(startDT) ){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10791']});
				return;
			}
			
			if(endDT == '' || !validDT.test(endDT) ){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10926']});
				return;
			}
			
			if(chkStartDate > chkEndDate){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10927']});
				return;		
				
			} else if(chkStartDate == chkEndDate) {				
				if(chkStartTime > chkEndTime){
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10924']});
					return;
				}
			}
			
			/*숫자입력체크*/
			if(!regNumber.test(saveItem[0].insertNumber)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11139']});
				return;
			}
			
			if(!regNumber.test(saveItem[0].goodQty)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10834']});
				return;
			}
			
			if(!regNumber.test(saveItem[0].badQty)){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10515']});
				return;
			}
			
			if(saveItem[0].closeFlag == 'N'){
				if(saveItem[0].goodQty <= 0 && saveItem[0].badQty <= 0){
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10833']});
					return;
				}
			}
			
			if(overFlag == 'N'){ // 초과실적등록 미허용일 경우
				if(defectFlag == 'N' || defectFlag == ''){ // 불량수량 미사용일 경우
					realQty = parseInt(saveItem[0].goodQty); // 실적수량 = 양품수량
					
				} else if(defectFlag == 'Y') { // 불량수량 사용일 경우
					realQty = parseInt(saveItem[0].goodQty) + parseInt(saveItem[0].badQty); // 실적수량 = 양품수량 + 불량수량
				}
				
				if(saveItem[0].remainQty < realQty){ // 잔여수량 < 실적수량일 경우 
					micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10813']});
					return;
				}
			}
			
			if(to_date_yyyy_mm_dd(saveItem[0].startDate) <= endPeriod){
				micaCommon.messageBox({type:"warning",width:"400", height: "145", html:Language.getLang('MESSAGES10792' + '@' + endPeriod)});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10811'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("L", "workOrder.workOrderResult.workOrderResultCreate", JSON.stringify(saveItem), that.createCallback, woId);
				}
			}});
		});
		
		$(document).on("click", "#pCancelCloseBtn, #pCancelBtn, .bntpopclose", function() {
			$(".modal").micaModal("hide");
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO", that.getSearchData(), function(){});
		});
	},
	comboBox: function(){
		// 날짜
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		var woFlagComboOptions;
		
		if(outsourcingUseFlag == "Y") {
			woFlagComboOptions = {selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true};
		} else {
			woFlagComboOptions = {searchMode:'containsignorecase', autoComplete:true};
		}
		
		// date
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_DATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// searchJobTerms
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_JOB_TERMS", attribute1: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#searchJobTerms",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);

		// 설비From
		mCommon.comboBoxClickCall("#fromResourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromResourceName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 설비To
		mCommon.comboBoxClickCall("#toResourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toResourceName",comboOptions, options);
					callBack();
				
				}
			);
		});

		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_STATE", attribute3: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true
					, checkedIndex : [0,1,2]}
				, options);
			
			}
		);
		
		// orderType
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SYSTEM_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderType",comboOptions, options);
			
			}
		);
		
		// 실적등록자
		mCommon.comboBoxClickCall("#workOrderUser", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#workOrderUser",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", woFlagComboOptions, options);
			}
		);
	},
	getSearchData : function() {
		var checkedItems = "";
		var stateList = $("#state").jqxComboBox('getCheckedItems');
		$.each(stateList, function(index){
			if(stateList.length-1 != index){
				checkedItems +="'"+this.value + "',"
			} else {
				checkedItems +="'"+this.value + "'"
			}
		});
		
		var param = {
			 dateCombo : $("#dateCombo").val(),
			 fromDate : $("#fromDate").val(),
			 toDate : $("#toDate").val(),
			 searchJobTerms : $("#searchJobTerms").val(),
			 searchKeyWord : $("#searchKeyWord").val(),
			 fromResourceName : $("#fromResourceName").val(),
			 toResourceName : $("#toResourceName").val(),
			 state : checkedItems,
			 orderType : $("#orderType").val(),
			 workOrderUser : $("#workOrderUser").val(),
			 orderFlag : $("#orderFlag").val()
		}
		return param;
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	setWOCancelPop : function(data) {
		data = data || {};
		
		$("#resultQty").val(data.resultQty || 0);
		$("#goodQty").val(data.qty || 0);
		$("#remainQty").val(data.remainQty || 0);
		$("#cancelQty").val("");
		$("#description").val("");
		$("#resultQty, #goodQty, #remainQty").attr("readonly","readonly");
	},
	getWOCancelPop :function(){
		var selectItems = AUIGrid.getCheckedRowItems("grid");
		var param ={
				resultQty : $("#resultQty").val(),
				goodQty : $("#goodQty").val(),
				remainQty : $("#remainQty").val(),
				cancelQty : $("#cancelQty").val(),
				description : $("#description").val(),
				workOrderId : selectItems[0].item.workOrderId,
				itemId : selectItems[0].item.itemId,
				woState : selectItems[0].item.woState
		}
		return param;
	},
	createCallback : function(param, data, callbackParam){
		if(param == 'SUCCESS'){
			mCommon.render("auigrid", "W201808021809282401001uoz98dsIlZ7",  callbackParam, function(){
				mCommon.render("auigrid1", "W201808021812312811002AzwPWRr2M2r",  callbackParam, function(){});
			});
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + '<br />' + Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	cancelCallback : function(param, data, callbackParam){
		if(param == 'SUCCESS'){
			mCommon.render("auigrid", "W201808021809282401001uoz98dsIlZ7",  callbackParam, function(){
				mCommon.render("auigrid1", "W201808021812312811002AzwPWRr2M2r",  callbackParam, function(){});
			});
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + '<br />' + Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	woCancelCallback : function(param, data) {
		var that = this.MOMDA003;
		if(param == 'SUCCESS') {
			$("#pCancelpop").micaModal("hide");
			mCommon.render("grid", "W201808010604309981000mpYThRg9RPO",  that.getSearchData(), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + '<br />' + Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	getCurrentQty : function() {
		var currentQty;
		var checkedItem = AUIGrid.getCheckedRowItems("grid");
		
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.curItemStock.dummy',
			timeout : 30000000,
			async : false,
			data : {itemId : checkedItem[0].item.itemId, locationCd : checkedItem[0].item.goodLocationCd},
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					currentQty = data[0].currentQty;
				} else {
					currentQty = 0;
				}
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
		return currentQty;
	}
};
$(document).ready(function(event){
	MOMDA003.init();
});