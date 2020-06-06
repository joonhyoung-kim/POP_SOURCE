var MOMCC018 = {
	init: function() {
		var that = this;
		Language.init(function() {
		});
		
		that.event();
		
	}, event: function() {
		var that = this;
		
		// 자재단가적용 버튼 클릭 시(팝업창 호출)
		$(document).on("click", "#mpPopBtn1", function() {
			momWidget.splashShow();
			$("#mpPop1").momModal("show");
			
			mom_ajax('R', 'purchase.materialLedger.ospExceptionInput.updateUnitPrice', {}, function(result, data) {
				
				if(result != 'SUCCESS' || data.length < 1) {
					momWidget.splashHide();
					AUIGrid.clearGridData(momWidget.grid[2]);
					return;
				}
				
				if(data.length > 0) {
					momWidget.splashHide();
					AUIGrid.setGridData(momWidget.grid[2], data);
					return;
				}
				
			}, undefined, undefined, this, 'sync');
		});
		
		// 자재단가적용 팝업창 닫기
		$(document).on("click", "#modalCloseBtn, .bntpopclose", function() {
			$("#mpPop1").momModal("hide");
		});
		
		// 자재단가반영 버튼 클릭 시
		$(document).on("click", "#mpChangeBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
			
			if(checkedItems.length > 0) {
				momWidget.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES12391'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function() {
						momWidget.splashShow();
						var param = {
							inoutFlag : "IN"
						}
						mom_ajax("D", "reference.price.materialPrice.materialPriceTemp", JSON.stringify(param), that.callBack, '', "mpDelCall");
					}
				}});
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11746']});
				return;
			}
				
		});
		
		// 입고처리 버튼 클릭 시
		$(document).on("click", "#inputBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					if(checkedItems[i].item.inLocationId == '') {
						momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11062']});
						return;
					}
				}
				
				momWidget.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11067'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function() {
						momWidget.splashShow();
						var param = {
							divisionCd : sessionStorage.getItem("divisionCd")
						}
						mom_ajax("D", "purchase.materialLedger.ospExceptionInput.ospExceptionInputTemp", JSON.stringify(param), that.callBack, '', "delCall");
					}
				}});
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11746']});
				return;
			}
		});
		
		// 메인 그리드 삭제 버튼 클릭 시
		$(document).on("click", "#ospDelBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var arrayList = [];
			
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					var param = {
						vendorCd : checkedItems[i].item.vendorCd,
						partNo : checkedItems[i].item.partNo,
						transactionDate : checkedItems[i].item.transactionDate
					}
					
					arrayList.push(param);
				}
				
				momWidget.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function() {
						momWidget.splashShow();
						mom_ajax("L", "purchase.materialLedger.ospExceptionInput.updateApplyFlag", JSON.stringify(arrayList), that.callBack, '', "procCall");
					}
				}});
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11334']});
				return;
			}
		});
		
		// 자재단가적용 팝업 내 삭제 버튼 클릭 시
		$(document).on("click", "#mpDelBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
			var arrayList = [];
			
			if(checkedItems.length > 0) {
				for(var i=0; i<checkedItems.length; i++) {
					var param = {
						vendorCd : checkedItems[i].item.vendorCd,
						partNo : checkedItems[i].item.partNo,
						transactionDate : checkedItems[i].item.transactionDate
					}
					
					arrayList.push(param);
				}
				
				momWidget.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function() {
						momWidget.splashShow();
						mom_ajax("L", "purchase.materialLedger.ospExceptionInput.updatePriceApplyFlag", JSON.stringify(arrayList), that.callBack, '', "mpCall");
					}
				}});
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11334']});
				return;
			}
		});
		
	}, callBack: function(result, data, param, callbackParam, flag) {
		var that = this.MOMCC018;
		if(result == "SUCCESS") {
			if(flag == "delCall") {
				var arrayList = [];
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
				
				for(var i=0; i<checkedItems.length; i++) {
					arrayList.push(checkedItems[i].item);
				}
				
				mom_ajax("L", "purchase.materialLedger.ospExceptionInput.ospExceptionInputTemp", JSON.stringify(arrayList), that.callBack, '', "insCall");
				
			} else if(flag == "insCall") {
				var param = {
					divisionCd : sessionStorage.getItem("divisionCd")
				}
				mom_ajax("C", "purchase.materialLedger.ospExceptionInput.ospExceptionInput", JSON.stringify(param), that.callBack, '', "procCall");
				
			} else if(flag == "procCall") {
				mom_ajax('R', 'purchase.materialLedger.ospExceptionInput.ospExceptionInput', {fromDate: $("#fromDate").val(), toDate: $("#toDate").val()}, function(result, data) {
					if(data.length > 0) {
						momWidget.splashHide();
						AUIGrid.setGridData(momWidget.grid[0], data);
						momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
						return;
					} else {
						momWidget.splashHide();
						AUIGrid.clearGridData(momWidget.grid[0]);
						momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
						return;
					}
				}, undefined, undefined, this, 'sync');
				
			} else if(flag == "mpDelCall") {
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
				var mpArrayList = [];
				
				if(checkedItems.length > 0) {
					for(var i=0; i<checkedItems.length; i++) {
						var param = {
							inoutFlag : "IN",
							vendorCd : checkedItems[i].item.vendorCd,
							itemId : checkedItems[i].item.partNo,
							startDate : checkedItems[i].item.transactionDate,
							unitPrice : checkedItems[i].item.salesPrice,
							marketCd : checkedItems[i].item.marketCd,
							currencyCd : checkedItems[i].item.currencyCd,
							cudFlag : "C",
							useYn : "Y"
						}
						
						mpArrayList.push(param);
					}
					
					mom_ajax('L', 'reference.price.materialPrice.materialPriceTemp', JSON.stringify(mpArrayList), that.callBack, '', "mpUpCall");
					
				} else {
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
					return;
				}
				
			} else if(flag == "mpUpCall") {
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
				var mpArrayList = [];
				
				if(checkedItems.length > 0) {
					for(var i=0; i<checkedItems.length; i++) {
						var param = {
							inoutFlag : "IN",
							vendorCd : checkedItems[i].item.vendorCd,
							itemId : checkedItems[i].item.partNo,
							startDate : checkedItems[i].item.transactionDate,
							unitPrice : checkedItems[i].item.salesPrice,
							marketCd : checkedItems[i].item.marketCd,
							currencyCd : checkedItems[i].item.currencyCd,
							cudFlag : "C",
							useYn : "Y"
						}
						
						mpArrayList.push(param);
					}
					
					mom_ajax('L', 'purchase.materialLedger.ospExceptionInput.confirmPriceApplyFlag', JSON.stringify(mpArrayList), that.callBack, '', "mpInsCall");
				} else {
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
					return;
				}
				
			
			} else if(flag == "mpInsCall") {
				var param = {
					inoutFlag : "IN",
					cudFlag : "C"
				}
				
				mom_ajax('C', 'reference.price.materialPrice.materialPrice', JSON.stringify(param), that.callBack, '', "mpProcCall");
					
			} else {
				mom_ajax('R', 'purchase.materialLedger.ospExceptionInput.updateUnitPrice', {}, function(result, data) {
					if(data.length > 0) {
						momWidget.splashHide();
						AUIGrid.setGridData(momWidget.grid[2], data);
						momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
						return;
					} else {
						momWidget.splashHide();
						AUIGrid.clearGridData(momWidget.grid[2]);
						momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
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

$(document).ready(function(event) {
	momWidget.init(1, 'MOMCC018', MOMCC018);
	momWidget.init(3, 'MOMCC018', MOMCC018);
	MOMCC018.init();
});