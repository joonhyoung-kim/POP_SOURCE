var gv_cudFlag = "";
var gv_selectFlag = "";

var MOMHA004 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808241907044361001qJP7m8L90QP", null, function(){
				that.grid("grid1");
			}, Language);
			mCommon.init("grid2", "W201808241912122951000Xqu8mwa9d0j", null, function(){
				that.grid("grid2");
			}, Language);
		});
		
		mCommon.splitter(".h01-h", "vertical", 600);
		
	}, 
	grid: function(id) {
		// 클릭시 체크
		if(id == "grid1") tuCommon.cellClick(id);
	}, 
	event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){			
			mCommon.render("grid1", "W201808241907044361001qJP7m8L90QP",  that.getSearchData(), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		// 상세조회 버튼
		$(document).on("click", "#detailBtn", function(){			
			var locationCds = "";
			var checkItems = AUIGrid.getCheckedRowItems("grid1");
			var param;
			
			if(checkItems.length == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			} else if(checkItems.length > 0 && checkItems.length < 350 ) {
				locationCds = "(";
				for(var i=0; i<checkItems.length; i++){
					locationCds = locationCds + "'" + checkItems[i].item.locationCd + "'";			
					if(i < checkItems.length - 1) {
						locationCds = locationCds + ",";
					}
				}
				locationCds = locationCds + ")";
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10590']});
				return;
			} 
			
			param = { locationCd : locationCds,
					  confirmMonth : $("#confirmMonth").val() || '' };
				
			mCommon.render("grid2", "W201808241912122951000Xqu8mwa9d0j", param , function(){});
		});
		
		// 선택확정 버튼
		$(document).on("click", "#confirmBtn", function(){	
			var checkItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			for(var i = 0;  i < checkItems.length ; i++){
				checkItems[i].item.yyyymm = $("#confirmMonth").val();
				if(checkItems[i].item.confirmFlag == 'Y'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10363']});
					return;
				}
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10666'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					gv_cudFlag = "C";
					gv_selectFlag = "SELECT";
					var param = {
							cudFlag : gv_cudFlag
						};
					
					mom_ajax("D","close.monthlyMaterialPriceConfirm.qtyConfirmTmp", JSON.stringify(param), that.tmpDeleteCallback, checkItems);
				}
			}});
		});
		
		// 선택취소 버튼
		$(document).on("click", "#confirmCancelBtn", function(){
			var checkItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			for(var i = 0;  i < checkItems.length ; i++){
				checkItems[i].item.yyyymm = $("#confirmMonth").val();
				if(checkItems[i].item.confirmFlag == 'N'){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10421']});
					return;
				}
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10668'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					gv_cudFlag = "D";
					gv_selectFlag = "SELECT";
					var param = {
							cudFlag : gv_cudFlag
						};
					mom_ajax("D","close.monthlyMaterialPriceConfirm.qtyConfirmTmp", JSON.stringify(param), that.tmpDeleteCallback, checkItems);
				}
			}});
		});
		
		// 일괄확정 버튼
		$(document).on("click", "#batchBtn", function(){	
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:$("#confirmMonth").val() + " " + Language.lang['MESSAGES11019'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					gv_cudFlag = "C";
					gv_selectFlag = "ALL";
					var param = {
							yyyymm : $("#confirmMonth").val()
							, cudFlag : gv_cudFlag
							, selectFlag : gv_selectFlag
						};
					micaCommon.splash.show();
					mom_ajax("C","close.monthlyMaterialPriceConfirm.monthlyMaterialPriceConfirm", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		
		// 일괄취소 버튼
		$(document).on("click", "#batchCancelBtn", function(){
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:$("#confirmMonth").val() + " " + Language.lang['MESSAGES11021'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					gv_cudFlag = "D";
					gv_selectFlag = "ALL";
					var param = {
							yyyymm : $("#confirmMonth").val()
							, cudFlag : gv_cudFlag
							, selectFlag : gv_selectFlag
						};
					mom_ajax('C', 'close.monthlyMaterialPriceConfirm.monthlyMaterialPriceConfirmCancel', JSON.stringify(param), that.callbackPost);
				}
			}});
			
		});
		
		// 대기LIST 엑셀 다운로드
		$(document).on("click", "#mExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MONTHLYCLOSING_MSTL_MOMHA004_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 상세LIST 엑셀 다운로드
		$(document).on("click", "#dExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "MONTHLYCLOSING_DTL_MOMHA004_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function() {
		//시설구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "FACILITY_TYPE", attribute11: "Y"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#facilityType", {searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, {local: data, textName : "name", valueName : "code", readonly :false});
			}
		);
		
		//확정월
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingYearMonths.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#confirmMonth",{searchMode:'none', autoComplete:true, selectedIndex:0}, {local: data, textName : "name", valueName : "code", readonly :true});
			}
		);
		
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", stockType : "CLOSE"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#locationCd",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly : false});
			
			}
		);
	},
	tmpDeleteCallback : function(param, data, callbackParam){
		var that = this.MOMHA004;
		var arrayList = [];
		if(param == 'SUCCESS'){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ locationCd : callbackParam[i].item.locationCd
					, confirmMonth : $("#confirmMonth").val()
					, cudFlag : gv_cudFlag
					}
				);
			}
			
			mom_ajax('L', 'close.monthlyMaterialPriceConfirm.qtyConfirmTmp', JSON.stringify(arrayList), that.tmpInsertListCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	tmpInsertListCallback : function(param, data){
		var that = this.MOMHA004;
		var parameters = {
				yyyymm : $("#confirmMonth").val()
				, cudFlag : gv_cudFlag
				, selectFlag : gv_selectFlag};
		if(param == 'SUCCESS'){
			if (gv_cudFlag == "C"){
				mom_ajax('C', 'close.monthlyMaterialPriceConfirm.monthlyMaterialPriceConfirm', JSON.stringify(parameters), that.callbackPost);
			}else {
				mom_ajax('C', 'close.monthlyMaterialPriceConfirm.monthlyMaterialPriceConfirmCancel', JSON.stringify(parameters), that.callbackPost);
			}
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
			micaCommon.splash.hide();
		}
	},
	callbackPost : function(param, data){
		var that = this.MOMHA004;
		micaCommon.splash.hide();
		if(param == 'SUCCESS'){
			mCommon.render('grid1', 'W201808241907044361001qJP7m8L90QP', mCommon.formGetParam("#node"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			AUIGrid.clearGridData("grid2");
			
		}else{
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	getSearchData : function() {
		var checkedItems = "";
		var stateList = $("#facilityType").jqxComboBox('getCheckedItems');
		$.each(stateList, function(index){
			if(stateList.length-1 != index){
				checkedItems +="'"+this.value + "',"
			} else {
				checkedItems +="'"+this.value + "'"
			}
		});
		
		var param = {
			confirmMonth : $("#confirmMonth").val(),
			facilityType : checkedItems,
			locationCd : $("#locationCd").val()
		}
		return param;
	},
};
$(document).ready(function(event){
	MOMHA004.init();
});