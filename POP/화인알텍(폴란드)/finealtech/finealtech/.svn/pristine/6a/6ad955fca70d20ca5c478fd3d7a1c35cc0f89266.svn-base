var endPeriod;

var MOMEA010 = {
	init : function() {
		var that = this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201901041713580581001P4ZLylhZD8G", null, function(){
				that.grid("grid1");
			}, Language);
			mCommon.init("grid2", "W201901041749473781001wCSbyhNLfTo", null, function(){
				that.grid("grid2");
			}, Language);
		});
	}, grid : function(grid) {
		tuCommon.cellClick(grid);	
		if(grid == 'grid1') {
		} else if(grid == 'grid2') {
			AUIGrid.setColumnPropByDataField(grid, "description", {style:"columnStyle"});
			AUIGrid.setSelectionMode(grid, "none");
			
			// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
				type : "GET",
				data : {menuId : "MOMEA010"},
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
			
			AUIGrid.bind(grid, 'cellEditBegin', function(e) {
				AUIGrid.setProp(grid, 'exportURL', '0');
			});

		}
	}, event : function() {
		var that = this; 
		
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201901041713580581001P4ZLylhZD8G",  mCommon.formGetParam("#node"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_DISPOSAL_HIST_MOMEA010_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i=0; i<checkedItems.length; i++) {
				if(checkedItems[i].item.cancelQty < 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
			}
			
			for(var i = 0; i  < checkedItems.length; i++){
				var item  = checkedItems[i].item;
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue("grid2", "itemStockInoutId", item.itemStockInoutId); 
				for(var j = 0; j < items.length; j++){
					if(item.itemStockInoutId == items[j].itemStockInoutId){
						return;
					}					
				}
				AUIGrid.addRow("grid2", item, "last");
			}
		});
		
		// 취소버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2"); 
		});
		
		// 폐기취소 버튼
		$(document).on("click", "#dspCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var chkFlag = false;
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11557']});
				return;
			}
			
			for(var i=0; i<checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.updateDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11545' + '@' + endPeriod)});
					return;
				}
			}
			
			var option = {
				type : "info", 
				width : "400", 
				height : "145",
				html:Language.lang['MESSAGES11709'], 
				okButton:{
					text:"OK", 
					after:function(){
						for(var i=0; i<checkedItems.length; i++) {
							if(i == checkedItems.length - 1) {
								chkFlag = true;
							}
							mom_ajax("C", "quality.materialDisposalHist.materialDisposalCancelProc", JSON.stringify(checkedItems[i].item), that.callBack, JSON.stringify(checkedItems[i].item), chkFlag);
						}
					}
				}
			}
				
			micaCommon.messageBox(option);
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
			{facilityClassCd : "AREA"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#locationName", comboOptions, options);
		});
		
		// 타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
		});
		
		// 폐기사유
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "MATERIAL_TERMINATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dpsReason", comboOptions, options);
		});
		
		// 취소여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#cancelFlag", comboOptions, options);
		});
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(param, data, callbackParam, flag) {
		var that = this.MOMEA010;
		if(param = "SUCCESS") {
			if(flag == true) {
				mCommon.render("grid1", "W201901041713580581001P4ZLylhZD8G", mCommon.formGetParam("#node"), function(){});
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				
				AUIGrid.clearGridData("grid2");
			}
			
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	}
};
$(document).ready(function(event){
	MOMEA010.init();
});