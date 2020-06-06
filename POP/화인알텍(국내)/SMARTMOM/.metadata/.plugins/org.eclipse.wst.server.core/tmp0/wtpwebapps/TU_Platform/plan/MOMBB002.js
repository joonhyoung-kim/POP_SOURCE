var itemMapChk;
var MOMBB002 = {
	init: function() {
		var that = this;
		that.setInitData();
		that.event();
		
		Language.init(function() {
			mCommon.init("grid", "W201807031559580861000awHDbP3FXX7", undefined, function(){
				that.grid();
			}, Language);
		});
	}, grid: function() {
		AUIGrid.bind("grid", "rowCheckClick", function( e ) {
			AUIGrid.addUncheckedRowsByValue(e.pid, "noItemMap", "null");
		});
		AUIGrid.bind("grid", 'cellClick', function(e) {
			if(e.item.noItemMap != null) {
				AUIGrid.setProp("grid", "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp("grid", 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp("grid", 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			}
			
		});
		var indeterminate = false;	
		AUIGrid.bind("grid", "rowAllChkClick", function( event ) {
			if(indeterminate) {
				AUIGrid.setCheckedRowsByValue(event.pid, "noItemMap", []);
				indeterminate = false;
			} else {
				var uniqueValues = AUIGrid.getColumnDistinctValues(event.pid, "noItemMap");
				if(uniqueValues.indexOf('null') != -1) {
					uniqueValues.splice(uniqueValues.indexOf("null"),1);
				}
				AUIGrid.setCheckedRowsByValue(event.pid, "noItemMap", uniqueValues);
				indeterminate = true;
			}
		});
		
	}, event: function() {
		var that = this;
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "VERIFICATION_DEMAND_MOMBB002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){	
//			$('input[type="checkbox"]').css({"disabled":"false"});
			mCommon.render("grid", "W201807031559580861000awHDbP3FXX7", mCommon.formGetParam("#form"), function(){
//				var items = AUIGrid.getGridData("grid");
//				for(var i = 0; i < items.length; i++) {
//					if(items[i].noItemMap == null) {
//						var cnt = $('input[value="'+i+'"]').parent().siblings().find(".aui-grid-renderer-base").text();
//						cnt = cnt - 1;
//						$('input[value="'+cnt+'"]').attr({"disabled":"disabled"});
//					}
//				}
				
			});
		});
		
		$(".aui-grid-paging-number").click( function(){
//		    alert("asd");
		});
		
		
		// 품목등록 버튼
		$(document).on("click","#itemExceptBtn",function(){	
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			var chkFlag = false;
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11602']});
				return;
			}
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.noItemMap == null || checkedItems[i].item.noItemMap == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10053']});
					return;
				}
			}
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11588'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after:function(){
					
					for(var i = 0; i < checkedItems.length; i++) {
						that.itemMappingChk(checkedItems[i].item.itemId);
						if(itemMapChk == false) {
							arrayList.push(checkedItems[i].item);
						} else {
							if(i == checkedItems.length - 1) {
								chkFlag = true;
							}
							mom_ajax("U", "plan.demand.verificationDemand.itemException", JSON.stringify(checkedItems[i].item), that.callbackPost, chkFlag);
						}
					}
					if(itemMapChk == false) {
						if(i == checkedItems.length - 1) {
							chkFlag = true;
						}
						mom_ajax("L", "plan.demand.verificationDemand.itemException", JSON.stringify(arrayList), that.callbackPost, chkFlag);	
					} else {
						
					}
				}
			}});
		});
		
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	setInitData : function() {		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				micaCommon.comboBox.set("#planId",{ selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true }, {local: data, textName : "name", valueName : "code"});
			},
			error: function(data){},
			fail : function(data){}
		});

		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", {codeClassId : "DEMAND_CHECK_TYPE"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#checkType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: false});
				}
		);
	},
	callbackPost : function(result, data){
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201807031559580861000awHDbP3FXX7", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	itemMappingChk : function(itemId) {		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.verificationDemand.itemExceptionChk.dummy",
			type : "GET",
			data : {itemId : AUIGrid.getCheckedRowItems("grid").itemId},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data[0].cnt > 0) {
					itemMapChk = true;
				} else {
					itemMapChk = false;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	}
};
$(document).ready(function(event){
	MOMBB002.init();
});