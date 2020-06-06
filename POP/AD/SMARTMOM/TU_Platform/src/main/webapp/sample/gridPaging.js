var MOMDA002 = {
	init: function() {
		mCommon.init("grid1", "W201806271803251831000ytALXPNAxm1");
//		mCommon.init("auigrid", "W201806271803251831000ytALXPNAxm1");
		this.grid();
		this.event();
		mCommon.pageRender("grid1", "W201806271803251831000ytALXPNAxm1", null, function(){
//			http://localhost:8100/TU_Platform/mom/request/com.thirautech.mom.reference.price.costPrice.costPriceCount.dummy
		}, "reference.price.costPrice.costPriceCount");
//		mCommon.pageScrollRender("grid", "W201806271803251831000ytALXPNAxm1", null, function(){
			
//		});
		
//		mCommon.render("auigrid", "W201806271803251831000ytALXPNAxm1");
	}, grid: function() {
	}, event: function() {
//		$("#findBtn").click(function(event){
//			mCommon.renderForm("auigrid", "W201806271803251831000ytALXPNAxm1", $(event.target).parents('form')[0]);
//		});
		$("#mExcelDownBtn").click(function(event) {
			mCommon.auiGridExcelExport("grid1", {allData : true});
			
//			직접 데이터를 넣어서 뽑아 낼수 있음.
//			mCommon.auiGridExcelExport("grid1", {data : [{col1 : "aa"}]});
		});
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});