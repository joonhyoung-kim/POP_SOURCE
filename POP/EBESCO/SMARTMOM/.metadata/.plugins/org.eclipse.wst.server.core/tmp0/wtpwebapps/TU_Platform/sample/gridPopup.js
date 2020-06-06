var MOMDA002 = {
	init: function() {
		var that = this;
		mCommon.init("facilityGrid", "W2018071413492856310009p2sQakgttl");
		this.grid();
		this.event();
		mCommon.pageRender("facilityGrid", "W2018071413492856310009p2sQakgttl", null, function(){
			mCommon.gridPopCreat("facilityGrid", {colCount: 2, title: "테스트 팝업창"});
			that.comboBox();
		});
	}, grid: function() {
		
	}, event: function() {
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("facilityGrid");
		});
		
//		$(document).on("click", "#editBtn", function() {
//			mCommon.gridPopEdit("facilityGrid"); // {rowNum : 수정할 row번호} 제외시 그리드에서 선택된 row 가져와서 수정모드에서 뿌려줌.
//		});
		
		// 팝업 세이브 버튼 
		// 아이디는 "그리드아이디 + ModalPop + SaveBtn"
		$(document).on("click", "#facilityGridModalPopSaveBtn", function() {
			console.log(mCommon.gridFormGetParam("facilityGrid"));
		});
		
		$(document).on("click", "#editBtn", function() {
		    mCommon.widgetPopupSetting("facilityGrid");
		});
		
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("facilityGrid", null, "templete")
		});
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
	
		// 샘플이라 임의 데이터를 넣었습니다.
		mCommon.comboBoxClickCall("#itemNameModal", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#itemNameModal",comboOptions, options);
					callBack();
				}
			);
		});
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});