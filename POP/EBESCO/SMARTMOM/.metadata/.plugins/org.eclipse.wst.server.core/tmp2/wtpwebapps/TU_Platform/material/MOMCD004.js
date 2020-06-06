var MOMCD004 = {
	init: function() {
		Language.init(function() {
			mCommon.init("grid", "W201806151115315681001qXIFFoPZh6f", Language);
		});
		this.grid();
		this.event();
		mCommon.render("grid", "W201806151115315681001qXIFFoPZh6f");
	}, grid: function() {
	}, event: function() {
		$("#findBtn").click(function(event){
			mCommon.render("grid", "W201806151115315681001qXIFFoPZh6f",  mCommon.formGetParam("#form"), function(){});
		});
	}
};
$(document).ready(function(event){
	MOMCD004.init();
});