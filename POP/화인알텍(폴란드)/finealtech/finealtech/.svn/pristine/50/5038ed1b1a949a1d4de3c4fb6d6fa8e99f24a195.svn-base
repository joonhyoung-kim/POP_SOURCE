var MOMFA008 = {
	init: function() {
		var that = this;
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201903131729036001000Y2s0iKdiG4e", null, function(){
				that.grid("grid1");
				that.event();
				mCommon.init("grid2", "W201903131731395941002OvxZGVZObvF", null, function() {
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		
	}, grid: function(grid) {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(1));
		tuCommon.cellClick(grid);
		if(grid == "grid1") {
			
		} else if(grid == "grid2"){
			AUIGrid.setColumnPropByDataField( grid, "description", { style:"columnStyle" });
		}
	}, event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){
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
			
			var param = mCommon.formGetParam("#form");
			if(AUIGrid.getRowCount("grid2") > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11125'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){			
						mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  param, function(){
							AUIGrid.clearGridData("grid2"); 
						});
					}
				}});
			} else {
				mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  param, function(){});
			}			
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
			
			checkedItems.sort(function(a, b) { // rowIndex 로 오름차순 정렬
			     return a.rowIndex > b.rowIndex ? 1 : -1;
			});
			
			for(var i = 0; i < checkedItems.length; i++){
				var item = checkedItems[i].item;
				var customerPoId = item.customerPoId;
				var remainQty = item.remainQty;
				var chk = true;
				
				for(var j = 0; j < grid2Items.length; j++){
					if(customerPoId == grid2Items[j].customerPoId){
						chk = false;
						break;
					}					
				}
				if(chk) {
					AUIGrid.addRow("grid2", item, "last");						
				}
			}
			
			if(AUIGrid.getRowCount("grid2") > 0) {				
				AUIGrid.setAllCheckedRows("grid2", true);
			}
			
			AUIGrid.setAllCheckedRows("grid1", false);
		});
		
		// 취소 버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2"); 
			AUIGrid.setAllCheckedRows("grid2", true);
		});
		
		// 출하계획생성 버튼
		$(document).on("click", "#shippingPlanBtn", function(){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length == "0") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11342']});
				return;
			} else {
				var option = {
						type:"info", 
						html:Language.lang['MESSAGES11429'], 
						width:"400", 
						height: "145",
						okButton:{
							text:"OK",
							after:function(){								
								var param = {}
								mom_ajax("D", "shipping.shipPlanning.shipPlanningTmp", JSON.stringify(param), that.delCallback, checkedItems);								
							}
						}
				}
				micaCommon.messageBox(option);						
			}	
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "SHIP_PLANNING_MOMFA008_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#customerWo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#customerPoNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	delCallback : function(param, data, callbackParam){
		var that = this.MOMFA008;
		if(param == 'SUCCESS'){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.shipmentSeqNo = i + 1; 
            	arrayList.push(callbackParam[i].item);
            }
			mom_ajax('L', 'shipping.shipPlanning.shipPlanningTmp', JSON.stringify(arrayList), that.listCallback, arrayList);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallback : function(param, data, callbackParam){
		var that = this.MOMFA008;
		if(param == 'SUCCESS'){
			if(callbackParam.length > 0){
				mom_ajax('C', 'shipping.shipPlanning.shipPlanningCreate', JSON.stringify(callbackParam[0]), that.listCallbackPost);
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(param, data){
		var that = this.MOMFA008;
		if(param == 'SUCCESS'){
			micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			var params = mCommon.formGetParam("#form");
			mCommon.render("grid1", "W201903131729036001000Y2s0iKdiG4e",  params, function(){
				AUIGrid.clearGridData("grid2");
			});
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
};
$(document).ready(function(event){
	MOMFA008.init();
});