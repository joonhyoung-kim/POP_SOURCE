var allowMinusQty;
var gvMenuId = "MOMCC005";
var gvTableId = "MOM_ITEM_STOCK";
var endPeriod;

var MOMCC005 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201808101557190911000zymBOMjOt4T", null, function() {
				that.grid();
			}, Language);
		});

	}, grid: function() {
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
		
		tuCommon.cellClick('grid1');
		AUIGrid.setColumnPropByDataField( "grid1", "cancelQty", {style:"columnStyle"});
		AUIGrid.setColumnPropByDataField( "grid1", "description", {style:"columnStyle"});
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMCC005"},
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
		
		AUIGrid.bind('grid1', 'cellEditBegin', function(e) {
			AUIGrid.setProp('grid1', 'exportURL', '0');
		});

	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			if($("#fromLocation").val() == '' && $("#toLocation").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10029']});
				return;
			}
			
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
			mCommon.render("grid1", "W201808101557190911000zymBOMjOt4T",  mCommon.formGetParam("#node"), function(){});
		});
		
		// 취소처리
		$(document).on("click", "#moveCancelBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11344']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i].item.ioTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11079' + '@' + endPeriod)});
					return;
				}
				
				if(allowMinusQty == 'N') {
					if(checkedItems[i].item.currentQty >= 0) {
						if(checkedItems[i].item.currentQty < checkedItems[i].item.cancelQty) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10090']});
							return;
						}
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10540']});
						return;
					}
				}
			}
			
			var option = {
					 type:"info"
					, width:"400"
					, height: "145"
					, html:Language.lang['MESSAGES11487']
					, closeButton:{text:"Close"}
					, okButton:{
						text:"OK", 
						after:function(){
//							for(var i = 0;  i < checkedItems.length; i++){
//								mom_ajax('C', 'purchase.materialLedger.materialMoveCancel.materialMoveCancelProc', JSON.stringify(checkedItems[i].item), that.callBack, i);
//							}
							var param = {
								menuId : gvMenuId
								, tableId : gvTableId
							};
							mom_ajax("D","common.dataMultiDelTmp", JSON.stringify(param), that.tempInsertCallback, checkedItems);
						}
					}
			};
			
			micaCommon.messageBox(option);
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options =  {local: "", textName : "name", valueName : "code", readonly :false}
		//FROM, TO
		mCommon.comboBoxClickCall("#fromLocation, #toLocation", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#fromLocation",comboOptions, options);
					micaCommon.comboBox.set("#toLocation",comboOptions, options);
					callBack();
				}
			);
		});
		
		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId: "ITEM_TYPE", attribute14: 'Y'}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#itemType",comboOptions, options);
				}
		);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background:  #C7E8FD;}</style>');	
	},
	callBack : function(result, data){
		var that = this.MOMCC005;
		var checkedItems = AUIGrid.getCheckedRowItems("grid1");
		
		if(result == "SUCCESS"){
			mCommon.render("grid1", "W201808101557190911000zymBOMjOt4T",  mCommon.formGetParam("#node"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	tempInsertCallback : function(result, data, param, callbackParam){
		var that = this.MOMCC005;
		var arrayList = [];
		if(result == "SUCCESS"){
			micaCommon.splash.show();
			for(var i = 0; i < callbackParam.length; i++){
				arrayList.push(
					{ menuId : gvMenuId
					, tableId : gvTableId
					, colId1 : 'FROM_INOUT_ID'
					, value1 : callbackParam[i].item.prevStockInoutId
					, colId2 : 'TO_INOUT_ID'
					, value2 : callbackParam[i].item.itemStockInoutId
					, colId3 : 'DESCRIPTION'
					, value3 : callbackParam[i].item.description
					, colId4 : 'CANCEL_QTY'
					, value4 : callbackParam[i].item.cancelQty
					}
				);
			}
			
			mom_ajax('L', 'common.dataMultiDelTmp', JSON.stringify(arrayList), that.procListCallback);
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10583']});
			console.log(data);
		}
	},
	procListCallback : function(result, data){
		var that = this.MOMCC005;
		var parameters = {
			menuId : gvMenuId
			, tableId : gvTableId
		};
		if(result == "SUCCESS"){
			mom_ajax('C', 'purchase.materialLedger.materialMoveCancel.materialMoveCancelProc', JSON.stringify(parameters), that.callBack);
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES11016']});
			console.log(data);
			micaCommon.splash.hide();
		}
	},
};
$(document).ready(function(event){
	MOMCC005.init();
});