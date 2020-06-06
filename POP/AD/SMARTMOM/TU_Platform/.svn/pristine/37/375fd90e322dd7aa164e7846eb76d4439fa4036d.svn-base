var MOMDA012 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W2019022014585767310005py7j5qIE9v", null, function(){
				that.grid();
				that.event();
				that.comboBox();
				that.design();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick("grid");
		var getColumnIndex =  AUIGrid.getDataFieldByColumnIndex("grid", 0);
		var totalBadQty;
		$(".aui-grid-default-footer").css({"text-align": "left"});
		
		var footerObject = [
			{
	        	dataField : "badQty",
	        	operation : "SUM",
	        	formatString : "#,###",
				labelFunction : function(value, columnValues, footerValues) {
					totalBadQty = value;
				}
	        },
			{
	        	dataField : "cancelQty",
	        	positionField : getColumnIndex,
	        	style : "aui-grid-default-footer",
	        	operation : "SUM",
	        	colSpan : 50,
				labelFunction : function(value, columnValues, footerValues) {
					return "Total " + Language.lang['MESSAGES10516'] + ": " + AUIGrid.formatNumber(totalBadQty - Math.abs(value), "#,##0", "rounding");
				}
	        }
        ]
        
        AUIGrid.setFooter("grid", footerObject);
		
		AUIGrid.setSelectionMode("grid", "none");
		AUIGrid.setColumnPropByDataField( "grid", "cancelReason", {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(item.cancelQty == 0) {
					return 'columnStyle';
				}
				
			}
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMDA012"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			if(e.item['cancelDate'] != undefined) {
				return false;
			} else {
				AUIGrid.setProp('grid', 'exportURL', '0');
				return true;
			}
        });
	}, event: function() {
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
			
			mCommon.render("grid", "W2019022014585767310005py7j5qIE9v",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 불량취소
		$(document).on("click", "#badCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				console.log(checkedItems[i].item.cancelQty);
				if(checkedItems[i].item.cancelQty != 0 && checkedItems[i].item.cancelQty != null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.badDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11311' + '@' + endPeriod)});
					return;
				}
				
				arrayList.push(checkedItems[i].item);
			}
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES10526'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("L","workOrder.workOrderBadResultHist.workOrderBadResultHistCancel", JSON.stringify(arrayList), that.callbackPost);
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "WORK_ORDER_BAD_HIST_MOMDA012_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox:function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
	
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly:false};
		
		// 불량유형
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  
			 {codeClassId : "WO_BAD_TYPE"},  
			function(data){
				options.local = data;
				micaCommon.comboBox.set("#badType",comboOptions, options);
			});
		
		// 설비
		mCommon.comboBoxClickCall("#resource", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resource",comboOptions, options);
					callBack();
				
				}
			);
		});
		//불량창고
		mCommon.comboBoxClickCall("#toLocationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comBadLocation.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toLocationName",comboOptions, options);
					callBack();
				
				}
			);
		});
	},
	callbackPost : function(result, data){
		var that = this.MOMDA012;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W2019022014585767310005py7j5qIE9v', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
};
$(document).ready(function(event){
	MOMDA012.init();
});