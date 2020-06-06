var MOMIC003_1 = {
	initParam	: undefined,
	
	init: function() {		
		Language.init(function() {
		});
		
		this.event();

	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == "createBtn1" || indexInfo['op'] == "copyBtn1")) {
			this.initParam = {cudFlag : "C"};
		} else if(indexInfo != undefined && indexInfo['op'] == "editBtn1") {
			this.initParam = {cudFlag : "U"};
		}
		
	}, event: function() {
		var that = this;
		
		// 현행화 버튼 클릭
		$(document).on("click", "#priceBtn1", function() {
			momWidget.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11304'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					momWidget.splashShow();
					$.post(tuCommon.contextPath() 
							+ '/file/exchange/com.thirautech.mom.reference.price.globalPrice.globalPrice.dummy', {}, that.priceCallbackPost);
				}
			}});
		});
		
	}, priceCallbackPost : function(result, data) {
		if(data == 'success') {
			momWidget.splashHide();
			
			if(result.result == 'success') {
				mom_ajax('R', 'reference.price.globalPrice.globalPrice', {date: $("#date").val(), currencyCd: $("#currencyName").val()}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1) {
						return;
					}
					AUIGrid.setGridData(momWidget.grid[0], data);
					momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					
				}, undefined, undefined, this, 'sync');
				
			} else {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821'] + " \n" + Language.getLang(result.p_err_msg)});
			}
		} else {
			momWidget.splashHide();

			if(result.p_err_msg != null && result.p_err_msg != undefined && result.p_err_msg != '') {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(result.p_err_msg)});
			} else {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIC003_1', MOMIC003_1);
	MOMIC003_1.init();
});