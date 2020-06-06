var locationParam = mCommon.getSearchParam();
var attribute;
var itemType;
var defaultLocation;
var endPeriod;
var allowMinusQty;
var menuId;

if(locationParam.stockType == "MAT") {
	menuId = "MOMCE005";
} else if(locationParam.stockType == "WO") {
	menuId = "MOMDA005";
} else if(locationParam.stockType == "SO") {
	menuId = "MOMFA026";
} else {
	menuId = "MOMCC015";
}

var MOMCE005 = {
	init: function() {	
		var that = this;
		that.design();
		that.comboBox();
		that.event();
	
		Language.init(function() {
			mCommon.init("grid1", "W201807131757311091000IwITB67s1hW", null, function() {
				mCommon.init("grid2", "W20180820170751946100076xIvPYgAoo", null, function(){
					that.grid();
				}, Language);
			}, Language);
		});
		mCommon.splitter(".h02-h", "horizontal", "50%");

	}, grid: function() {
	
		var comboBox;
		tuCommon.cellClick('grid1');
		tuCommon.cellClick('grid2');
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.toFacility.dummy",
			type : "GET",
			data : {facilityClassCd: "AREA", stockType : locationParam.stockType},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				comboBox = data;
				defaultLocation = data[0];
			},
			error: function(data){},
			fail : function(data){}
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
					AUIGrid.bind('grid2', "cellEditEndBefore", function(event){ 
						if(event.dataField == "moveDate") { // 달력 지정한 필드인 경우 
							if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(endPeriod)) {
								micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES10725' + '@' + endPeriod)});
								return event.oldValue; 
							} else {
								return to_date_yyyy_mm_dd(event.value); 
							} 
						}
						return event.value; 
					}); 
				}
			},
			error: function(data){},
			fail : function(data){}
		});
		
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
		
		AUIGrid.setColumnPropByDataField( "grid2", "toLocationCd", {
			style:"columnStyle",
			editRenderer : {
				type : "DropDownListRenderer",
				showEditorBtnOver : true,
				list : comboBox, 
				keyField : "code", 
				valueField : "name"
			}, labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
				var retStr = value;
				for(var i=0,len=comboBox.length; i<len; i++) {
					if(comboBox[i]["code"] == value) {
						retStr = comboBox[i]["name"];
						break;
					}
				}
				return retStr;
			}
		});
		
		AUIGrid.setColumnPropByDataField( "grid2", "moveDate", {
			style:"columnStyle",
			dataType : "date",
			formatString : "yyyy-mm-dd",
			editRenderer : {
				 type : "CalendarRenderer",			
				 openDirectly : true,
				 onlyCalendar : false
			}
		});
		
		AUIGrid.setColumnPropByDataField( "grid2", "moveQty", {style:"columnStyle"} );
		AUIGrid.setColumnPropByDataField( "grid2", "description", {style:"columnStyle"} );
		AUIGrid.setSelectionMode("grid2", "singleCell");
		
		tuCommon.cellEditEnd('grid2');
		
		 AUIGrid.bind('grid2', 'cellEditEnd', function(e) {
			 if(e.dataField == "toLocationCd") {
				 var grid2length = AUIGrid.getGridData("grid2").length;
				 var item = AUIGrid.getItemByRowIndex("grid2", e.rowIndex);
				 for(var i = e.rowIndex + 1; i < grid2length; i++) {
					 AUIGrid.setCellValue("grid2", i, "toLocationCd", item.toLocationCd);
				 }
			 }
			 AUIGrid.setProp('grid2', 'exportURL', '0');
		});
		
	}, event: function() {
		var that = this;
		
		// 조회버튼
		$(document).on("click", "#findBtn", function(){
			var param = mCommon.formGetParam("#node");
			param.stockType = locationParam.stockType;
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201807131757311091000IwITB67s1hW", param, function(){});
		});
		
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#specification'), $('#findBtn'));
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_MOVE_MOMCE005_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var detailRowCount = AUIGrid.getRowCount("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11179']});
				return;
			}
			
			$("#toLocation").val("");
	
			for(var i = 0; i < checkedItems.length; i++) {
				var item = checkedItems[i].item;
				// 값 중복 제거
				var items = AUIGrid.getItemsByValue("grid2", "itemId", item.itemId); 
				for(var j = 0; j < items.length; j++){
					if(item.itemStockId == items[j].itemStockId){
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11578' + '@' + item.itemId + '@' + item.itemName + '@' + item.fromLocationName)});
						return;
					}					
				}
				if(defaultLocation != undefined) {
					item.toLocationCd = defaultLocation.code;
				}
				item.moveDate = get_current_date("yyyy-mm-dd");
				AUIGrid.addRow("grid2", item, "last");
				
				if(item.currentQty > 0) {
					AUIGrid.setCellValue("grid2", i + detailRowCount, "moveQty", item.currentQty);
				}
				// 선택 버튼 클릭 시 이동창고 Default 빈 값, 사용자가 무조건 선택하게 하도록 적용
				AUIGrid.setCellValue("grid2", i + detailRowCount, "toLocationCd", "");
			}
		});
		
		// 하단 그리드 이동창고 콤보
		$(document).on("change", "#toLocation", function() {
			var grid2length = AUIGrid.getGridData("grid2").length;
			var toLocationCd = $("#toLocation").val();
			 for(var i = 0; i < grid2length; i++) {
				 AUIGrid.setCellValue("grid2", i, "toLocationCd", toLocationCd);
			 }
		});
		
		// 취소버튼
		$(document).on("click", "#cancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10585']});
				return;
			}
			
			AUIGrid.removeCheckedRows("grid2"); 
		});
		
		// 이동처리 버튼
		$(document).on("click", "#moveBtn", function(){
			var gridData = AUIGrid.getCheckedRowItems("grid2");
			if(gridData.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11338']});
				return;
			}
		
			var data = [];
			for(var i = 0; i < gridData.length; i++){
				data[i] = gridData[i].item;
				
				if(data[i].toLocationCd == null || data[i].toLocationCd == ''){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11574' + '@' + data[i].itemId)});
					return;
				}
				
				if(data[i].moveDate == null || data[i].moveDate == ''){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11573' + '@' + data[i].itemId)});
					return;
				}
				
				if(data[i].moveQty == null || data[i].moveQty == ''){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11570' + '@' + data[i].itemId)});
					return;
				}
				
				if(to_date_yyyy_mm_dd(data[i].moveDate) <= endPeriod){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11572' + '@' + data[i].itemId + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(data[i].currentQty >= 0) {
						if(data[i].moveQty > data[i].currentQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11571' + '@' + data[i].itemId)});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11575' + '@' + data[i].itemId)});
						return;
					}
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10991'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = {
						stockType : locationParam.stockType
					} 
//					mom_ajax("L", "purchase.stock.materialMove.materialMoveProc", JSON.stringify(data), that.procCallBack);
					mom_ajax("D", "purchase.stock.materialMove.itemMoveTmp", JSON.stringify(param), that.procCallBack, JSON.stringify(param), "delCall");
				}
			}});
		});
	},
	comboBox : function(){
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", stockType : locationParam.stockType}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#location",comboOptions, options);
			
			}
		);
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.toFacility.dummy", // 호출 URL
			{facilityClassCd: "AREA", stockType : locationParam.stockType}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#toLocation", comboOptions, options);
			
			}
		);
		
		// 품목타입
		if (locationParam.stockType == "MAT"){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
				{codeClassId:"ITEM_TYPE", attribute3 :"Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#itemType",comboOptions, options);
				}
			);
		} else if (locationParam.stockType == "WO"){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
					{codeClassId:"ITEM_TYPE", attribute4 :"Y"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemType",comboOptions, options);
					}
				);
		} else if (locationParam.stockType == "SO"){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
					{codeClassId:"ITEM_TYPE", attribute5 :"Y"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemType",comboOptions, options);
					}
				);
		} else if (locationParam.stockType == "MRTN"){
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
					{codeClassId:"ITEM_TYPE", attribute6 :"Y"}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#itemType",comboOptions, options);
					}
				);
		}
		
		// 재고량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#zeroFlag",{searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			
			}
		);
	},
	design : function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	

		if (locationParam.stockType == "WO") {
			$("#label-id2").text(Language.lang['MESSAGES11829']);
		} else if (locationParam.stockType == "SO") {
			$("#label-id2").text(Language.lang['MESSAGES11828']);
		} else {
			$("#label-id2").text(Language.lang['MESSAGES11186']);
		}
	},
	procCallBack : function(result, data, param, callbackParam, flag){
		var that = this.MOMCE005;
		var gridData = AUIGrid.getCheckedRowItems("grid2");
		var arrayList = [];
		if(result == "SUCCESS"){
			if(flag == "delCall") {
				for(var i=0; i<gridData.length; i++) {
					gridData[i].item.stockType = locationParam.stockType;
					arrayList.push(gridData[i].item);
				}
				mom_ajax("L", "purchase.stock.materialMove.itemMoveTmp", JSON.stringify(arrayList), that.procCallBack, JSON.stringify(arrayList), "insCall");
			} else if(flag == "insCall") {
				var param = {
					stockType : locationParam.stockType
				}
				mom_ajax("C", "purchase.stock.materialMove.materialMoveProc", JSON.stringify(param), that.procCallBack, JSON.stringify(param), "procCall");
			} else {
				var param = mCommon.formGetParam("#node");
				param.stockType = locationParam.stockType;
				mCommon.render("grid1", "W201807131757311091000IwITB67s1hW", param, function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					AUIGrid.clearGridData("grid2");
				});
			}
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMCE005.init();
});