var MOMCD002 = {
	init: function() {
		var that = this;
		this.comboBox();
		this.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808031012020051001nTjF2zCFW97", null, function(){
				that.grid();
				mCommon.init("grid2", "W201808031026262131002UqXKkaX0uOU", null, function(){}, Language);
			}, Language);
		});
		
	}, grid: function() {
		//셀 클릭 이벤트
		AUIGrid.bind("grid1", "cellClick", function(e) {
			mCommon.render("grid2", "W201808031026262131002UqXKkaX0uOU", {workOrderId : e.item.workOrderId}, function(){});
		});
	}, event: function() {
		var that = this;
		//조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
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
			mCommon.render("grid1", "W201808031012020051001nTjF2zCFW97", that.getSearchData(), function(){});
		});
		
		// 상단 엑셀 다운 버튼
		$(document).on("click", "#mExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "workOrderRelease_MOMCD002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 하단 엑셀 다운 버튼
		$(document).on("click", "#dExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "workOrderReleaseRequest_MOMCD002_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10){
			
			mm = "0" + mm;
		}
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var checkComboOptions = {searchMode:'containsignorecase', autoComplete:true, checkboxes: true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName", comboOptions, options);
					callBack();
				}
			);
		});
		
		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "ITEM_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#type", checkComboOptions, options);
				}
		);

	},
	getSearchData: function() {
		var checkedItems = "";
		var typeList = $("#type").jqxComboBox('getCheckedItems');
		$.each(typeList, function(index){
			if(typeList.length-1 != index){
				checkedItems += "'" + this.value + "',"
			}
			else {
				checkedItems += "'" + this.value + "'"
			}
		});
		
		var param = {
				itemId : $("#itemName").val() || "",
				resourceCd : $("#resourceName").val() || "",
				inItemType : checkedItems,
				fromDate : $("#fromDate").val() || "",
				toDate : $("#toDate").val()
			}
			
		return param;
	}
};
$(document).ready(function(event){
	MOMCD002.init();
});