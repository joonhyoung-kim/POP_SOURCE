var MOMHA001 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808241538153591000y8Jj3oyGN5Z", null, function(){
				that.grid("grid1");
			}, Language);
			mCommon.init("grid2", "W201808241539073751001sfJym109Rib", null, function(){
				that.grid("grid2");
			}, Language);
		});
		mCommon.splitter(".h02-h", "vertical", 600);
		
	}, 
	grid: function(id) {		
		// 클릭시 체크
		if(id == "grid1") tuCommon.cellClick(id);
	}, 
	event: function() {		
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){			
			mCommon.render("grid1", "W201808241538153591000y8Jj3oyGN5Z",  mCommon.formGetParam("#node"), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		// 상세조회 버튼
		$(document).on("click", "#detailBtn", function(){			
			var checkVendors = "";
			var checkItems = AUIGrid.getCheckedRowItems("grid1");
			var param;
			if(checkItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			} else if(checkItems.length > 0) {
				checkVendors = "(";
				for(var i=0; i<checkItems.length; i++){
					checkVendors = checkVendors + "'" + checkItems[i].item.vendorCd + "'";			
					if(i < checkItems.length - 1) {
						checkVendors = checkVendors + ",";
					}
				}
				checkVendors = checkVendors + ")";
			} else {
				checkVendors = "''";
			} 
			
			param = { vendorCd : checkVendors,
					  closingMonth : $("#closingMonth").val() || '',
					  psFlag : $("#psFlag").val() || '' };
				
			mCommon.render("grid2", "W201808241539073751001sfJym109Rib", param , function(){});
		});
		
		// 마감처리 버튼
		$(document).on("click", "#closingBtn", function(){
//			var arrayList = [];
//			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
//			if(checkedItems.length <= 0) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11325']});
//				return;
//			}
//			
//			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10380'], closeButton:{text:"Close"}, okButton:{text:"OK", 
//				after:function(){	
//					for(var i=0; i<checkedItems.length; i++) {
//						checkedItems[i].item.yyyymm = $("#closingMonth").val();
//						checkedItems[i].item.magamAmount = checkedItems[i].item.monthPrice;
//						arrayList.push(checkedItems[i].item);
//					}
//					
//					mom_ajax("L", "close.monthlyClosing.monthlyVendorClose", JSON.stringify(arrayList), that.callBack, arrayList);
//				}
//			}});
		});
		
		// 단가재계산 버튼
		$(document).on("click", "#unitPriceRecalBtn", function(){
			var arrayList = [];
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11323']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10298'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = {
							yyyyMm : $("#closingMonth").val()
							, inoutFlag : $("#psFlag").val()
						};
					mom_ajax("D","close.monthlyClosing.itemPriceUpdateTmp", JSON.stringify(param), that.tmpDeleteCallback, checkedItems);
					

//					
//					mom_ajax("L", "close.monthlyClosing.itemInoutPriceUpdate", JSON.stringify(arrayList), that.callBack, arrayList);
				}
			}});
		});
		
		// 엑셀 다운 버튼 (업체)
		$(document).on("click", "#mExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MONTHLY_CLOSING_MASTER_MOMHA001_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 다운 버튼 (상세)
		$(document).on("click", "#dExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "MONTHLY_CLOSING_DETAIL_MOMHA001_" + get_current_date("yyyy-mm-dd")});
		});
	},
	comboBox: function() {
		//마감월
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingMonthly.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#closingMonth", 
						                {searchMode:'none', autoComplete:true, selectedIndex:0}, 
						                {local: data, textName : "name", valueName : "code", readonly :true});
			}
		);
		
		//매입/매출
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "MAGAM_IO_FLAG"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#psFlag",
						                {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, 
						                {local: data, textName : "name", valueName : "code", readonly :true});
			}
		);
		
		//업체
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#vendorName",
						                {searchMode:'none', autoComplete:true}, 
						                {local: data, textName : "name", valueName : "code", readonly :false});
			}
		);
		
		//마감여부
//		var codeData = [{code:"", name:"전체"},{code:"Y", name:"예"},{code:"N", name:"아니오"}]
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "Y_N"}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#closingFlag",
				                {searchMode:'none', autoComplete:true}, 
				                {local: data, textName : "name", valueName : "code", readonly :true});
			}
		);
	},
	tmpDeleteCallback : function(param, data, callbackParam){
		var that = this.MOMHA001;
		var arrayList = [];
		if(param == 'SUCCESS'){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ vendorCd : callbackParam[i].item.vendorCd
					, yyyyMm : $("#closingMonth").val()
					, inoutFlag : $("#psFlag").val()
					}
				);
			}
			
			mom_ajax('L', 'close.monthlyClosing.itemPriceUpdateTmp', JSON.stringify(arrayList), that.tmpInsertListCallback);
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	tmpInsertListCallback : function(param, data){
		var that = this.MOMHA001;
		var parameters = {ioType : $("#psFlag").val()};
		if(param == 'SUCCESS'){
			mom_ajax('C', 'close.monthlyClosing.itemInoutPriceUpdate', JSON.stringify(parameters), that.callBack);
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
	callBack: function(param, data, callbackParam) {
		var that = this.MOMHA001;
		if(param == "SUCCESS") {
			mCommon.render("grid1", "W201808241538153591000y8Jj3oyGN5Z",  mCommon.formGetParam("#node"), function(){});
			AUIGrid.clearGridData("grid2");
			micaCommon.messageBox({type:"success", width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			
		} else {
			micaCommon.splash.hide();
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	}
};
$(document).ready(function(event){
	MOMHA001.init();
});