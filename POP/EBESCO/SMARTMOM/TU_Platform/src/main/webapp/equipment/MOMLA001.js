var MOMLA001 = {
	initMessage	: undefined, 
	initParam	: undefined,
	resourceCd  : undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
	}, loadCallInit: function() {
		momWidget.isInitGrid(0, function() {});
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this.init != undefined ? this : this.MOMIA006;
		if( (param.productionYear.length > 0 && param.productionYear.length < 4) || (param.productionYear != '' && param.productionYear == '0000' || param.productionYear > '4713') ) {
			that.initMessage = Language.lang['MESSAGES12217'];
			return;
		}
		
		if( (param.installationDate.length > 0 && param.installationDate.length < 6) || (param.installationDate != '' && param.installationDate.substring(0,2) < '19' || param.installationDate.substring(4,6) > '12') ) {
			that.initMessage = Language.lang['MESSAGES12218'];
			return;
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLA001', MOMLA001);
    MOMLA001.init();
});