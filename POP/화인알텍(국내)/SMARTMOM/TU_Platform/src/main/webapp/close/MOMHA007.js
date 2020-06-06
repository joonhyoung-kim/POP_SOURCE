var MOMHA007 = {
	init: function() {
		mCommon.init("grid1", "W201806221349379281000qZwsr6X3Vn2");
		mCommon.init("grid2", "W201806221349379281000qZwsr6X3Vn2");
		mCommon.init("auigrid", "W201804131344405511005fblOYGXqRkv");
		mCommon.init("auigrid-2", "W201804131344405511005fblOYGXqRkv");
		this.grid();
		this.event();
		mCommon.render("grid1", "W201806221349379281000qZwsr6X3Vn2");
		mCommon.render("grid2", "W201806221349379281000qZwsr6X3Vn2");
		mCommon.render("auigrid", "W201804131344405511005fblOYGXqRkv");
		mCommon.render("auigrid-2", "W201804131344405511005fblOYGXqRkv");
	}, grid: function() {
	}, event: function() {
		$("#btnSearch").click(function(event){
			mCommon.renderForm("auigrid", "W201804171937587591000dvUxX5NEG7n", $(event.target).parents('form')[0]);
		});
	}
};
$(document).ready(function(event){
	MOMHA007.init();
});