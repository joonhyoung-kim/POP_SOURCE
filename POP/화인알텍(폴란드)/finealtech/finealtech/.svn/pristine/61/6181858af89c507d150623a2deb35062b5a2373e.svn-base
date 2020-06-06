var MOMDA002 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807311929491961000mGWSQvpD0Jh", null, function() {
				that.grid("grid");
				mCommon.init("auigrid2", "W2018073119353764410001jaqgX0iIdw", function(){
					that.grid("auigrid2");
				}, Language);
			}, Language);
		});
		
	}, grid: function(grid) {
		tuCommon.cellClick(grid, 'single');
		
	}, event: function() {
		var that = this;
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "JOB_CURRENT_SITUATION_MOMDA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 자재차감조회 팝업 엑셀 다운 버튼
		$(document).on("click", "#dpExcelDownBtn", function() {
			mCommon.auiGridExcelExport("auigrid2", {fileName: "MATERIAL_DEDUCTION_MOMDA002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회
		$("#findBtn").click(function(event){
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
			
			mCommon.render("grid", "W201807311929491961000mGWSQvpD0Jh", that.getSearchData(), function(){});
		});
		
		// WO/PO, 아이템ID enter로 조회
		$(document).on("keydown", "#searchKeyWord", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 자재차감이력조회
		$(document).on("click", "#materialDeductionBtn", function() {
			 var checkedItems = AUIGrid.getCheckedRowItems("grid");
			 if(checkedItems.length <= 0){
				 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11234']});
				 return;
			 }
			 
			 if(checkedItems.length > 1){
				 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				 return;
			 }
			 
			 mCommon.render("auigrid2", "W2018073119353764410001jaqgX0iIdw", checkedItems[0].item, function(){});
			 $(window).resize();
			 $("#dppop").micaModal("show");
		});
		
		// 팝업닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function(){
			 $(".modal").micaModal("hide");
		});
	},
	comboBox: function(){
		// 날짜
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(1));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
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
		
		// 창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : "'FAC300', 'FAC500'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName", comboOptions, options);
					callBack();
				}
			);
		});

		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WORK_ORDER_STATE", attribute2: "Y"}, // 파라미터
			function(data){
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, {local: data, textName : "name", valueName : "code"});
			
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
		
		// 완료자
		mCommon.comboBoxClickCall("#completeBy", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comUser.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#completeBy",comboOptions, options);
					callBack();
				}
			);
		});
		
		// 내부/외주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "WO_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#orderFlag", {searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	},
	getSearchData : function(){
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
			locationCd : $("#locationName").val(),
			resourceCd : $("#resourceName").val(),
			state : checkedItems,
			orderType : $("#orderType").val(),
			completeBy : $("#completeBy").val(),
			orderFlag :  $("#orderFlag").val()
		}
		return param;
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});