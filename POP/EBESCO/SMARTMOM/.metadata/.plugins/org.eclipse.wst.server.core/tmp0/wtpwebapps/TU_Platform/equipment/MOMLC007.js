var MOMLC007 = {
	init: function() {	
		var that = this;
		Language.init(function() {
			that.event();
		});
	}, event: function() {
		var that = this;
		
		// 사용취소 버튼 클릭 시
		$(document).on("click", "#actCancelBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var arrayList = [];
			var callbackChk = false;
			
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					if(checkedItems[i].item.cancelQty == 0) {
						arrayList.push(checkedItems[i].item);
						
						if(i == checkedItems.length - 1) {
							callbackChk = true;
						}
						
					} else {
						momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11006']});
						return;
					}
				}
			
				momWidget.messageBox({type:'info', width:'400', height: '145', html: Language.lang['MESSAGES12341'], closeButton:{text:'Close'}, okButton:{text:'OK', 
					after:function() {
						momWidget.splashShow();
						mom_ajax("L","equipment.emReductStatus.cancelEmReductStatus", JSON.stringify(arrayList), that.callbackPost, callbackChk);
					}
				}});
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11345']});
				return;
			}
		});
		
	}, callbackPost : function(result, data, param, callbackParam) {
		if(result == "SUCCESS") {
			if(callbackParam == true || callbackParam == undefined) {
				mom_ajax('R', 'equipment.emReductStatus.emReductStatus', {fromDate: $("#fromDate").val()
																		, toDate: $("#toDate").val()
																		, woId: $("#woId").val()
																		, equipmentCd: $("#equipmentCd").val()
																		, itemId: $("#itemId").val()
																		, specification: $("#specification").val()}, function(result, data) {
					if(result != 'SUCCESS') {
						momWidget.splashHide();
						return;
					} else {
						momWidget.splashHide();
						AUIGrid.setGridData(momWidget.grid[0], data);
						momWidget.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
						return;
					}
					
				}, undefined, undefined, this, 'sync');
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
		}
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMLC007', MOMLC007);
	MOMLC007.init();
});