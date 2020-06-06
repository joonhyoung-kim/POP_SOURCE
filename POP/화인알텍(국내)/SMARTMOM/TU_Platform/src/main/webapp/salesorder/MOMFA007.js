var locationParam = mCommon.getSearchParam();
var allowMinusQty;
var menuId;
var endPeriod;
var gvParams;

if(locationParam.stockType == "O004") {
	menuId = "MOMCF001";
} else {
	menuId = "MOMFA025";
}

var MOMFA007 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201808111728372531000vd88UvIXfh6", null, function() {
				that.grid();
				mCommon.init("auigrid", "W201903181322550911000hYu91BxnLux", null , function(){}, Language);
			}, Language);
		});
		
	},	grid: function() {
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
			timeout : 30000000,
			async : false,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				allowMinusQty = data[0].allowMinusQty;
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : menuId},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					endPeriod = data[0].endPeriod;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
		AUIGrid.setColumnPropByDataField( "grid", "description", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "moveQty", { style:"columnStyle" } );
		AUIGrid.setSelectionMode("grid", "singleCell");
		tuCommon.cellClick('grid');
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
	         AUIGrid.setProp('grid', 'exportURL', '0');
	      });
	}, event: function() {
		var that = this;
		// 조회
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
			
			if($("#fromLocation").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10034']});
				return;
			}
			
			if($("#toLocation").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10088']});
				return;
			}
			
			gvParams = mCommon.formGetParam("#form");
			gvParams.stockType = locationParam.stockType;
			
			mCommon.render("grid", "W201808111728372531000vd88UvIXfh6",gvParams, function(){});
		});
		
		$(document).on("click", "#excelDownBtn", function(){
			mCommon.auiGridExcelExport("grid", {fileName: "STOCK_MOVE_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 이동처리
		$(document).on("click", "#moveBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems == 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11610']});
				return;
			}
			for(var i =0; i < checkedItems.length; i++){
				if(checkedItems[i].item.moveQty == '' || checkedItems[i].item.moveQty==null){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10983']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.dueDate) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10269' + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(checkedItems[i].item.currentQty >= 0) {
						if(checkedItems[i].item.moveQty > checkedItems[i].item.currentQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10984']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10990']});
						return;
					}
				}
				
				var param ={
						itemId : checkedItems[i].item.itemId,
						fromLocationCd : checkedItems[i].item.fromLocationCd,
						toLocationCd : checkedItems[i].item.toLocationCd,
						ioTime : get_current_date(0),
						moveQty : checkedItems[i].item.moveQty,
						moveType : locationParam.stockType,
						description : checkedItems[i].item.description || ""
				}
				arrayList.push(param);
				
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10980'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("L", "shipping.customerOrderStockStatus.customerOrderStockMove", JSON.stringify(arrayList), that.callBack);
				}
			}
			});
		});
		
		// 상세조회
		$(document).on("click", "#detailBtn", function(){
			var checkedItem = AUIGrid.getCheckedRowItems("grid");
			var param;
			if(checkedItem.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			} else if(checkedItem.length > 0 && checkedItem.length < 2) {
				param = {itemId : checkedItem[0].item.itemId, fromDate : $("#fromDate").val(), toDate : $("#toDate").val()};
				$("#pop").micaModal("show");
				$(window).resize(); //그리드 사이즈 재조정
				mCommon.render("auigrid", "W201903181322550911000hYu91BxnLux", param , function(){});
			} else if(checkedItem.length > 1){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11604']});
				return;
			}
			
		});
		
		// 팝업닫기
		$(document).on("click", "#pCancelBtn, .bntpopclose", function(){
			$("#pop").micaModal("hide");
		});
	}, comboBox : function(){
		$("#fromDate").val(get_date_diff(-5));
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		var fromFacilityType;
		var toFacilityType = "'FAC400'";
		
		if (locationParam.stockType == "O004") {
			fromFacilityType = "'FAC200'";
		}
		else {
			fromFacilityType = "'FAC300'"
		}
		
		// From창고
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
					{facilityClassCd: "AREA", facilityType : fromFacilityType }, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#fromLocation", comboOptions, options);
					}
			);
		// To창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : toFacilityType}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#toLocation", comboOptions, options);
				}
		);
	
		
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(result, data) {
		if(result == "SUCCESS") {
			mCommon.render("grid", "W201808111728372531000vd88UvIXfh6", gvParams, function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145",   html: Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMFA007.init();
});