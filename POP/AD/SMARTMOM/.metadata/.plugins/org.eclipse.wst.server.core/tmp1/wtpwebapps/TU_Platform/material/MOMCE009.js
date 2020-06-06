var MOMCE009 = {
	init: function() {
		mCommon.init("grid1", "W201806151115315681001qXIFFoPZh6f");
		mCommon.init("grid2", "W201806151115315681001qXIFFoPZh6f");
		this.grid();
		this.event();
		mCommon.render("grid1", "W201806151115315681001qXIFFoPZh6f");
		mCommon.render("grid2", "W201806151115315681001qXIFFoPZh6f");
	}, grid: function() {
	}, event: function() {
	}
};
$(document).ready(function(event){
	MOMCE009.init();
});