var allowMinusQty;

var MOMCC004 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		
		Language.init(function() {
			mCommon.init("grid", "W201807301624296151000jJDKbuq9vEf", null, function() {
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
		
		tuCommon.cellClick('grid');
		
	}, event: function() {
		var that = this;
		// 조회
		$("#findBtn").click(function(event){
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
			mCommon.render("grid", "W201807301624296151000jJDKbuq9vEf", mCommon.formGetParam("#form"), function(){});
		});
		
		// 출고
		$("#releaseBtn").click(function(event){
			var checkedItems =  AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			if(checkedItems.length > 0){
				for(var i=0; i<checkedItems.length; i++) {
					if(allowMinusQty == 'N') {
						if(checkedItems[i].item.currentQty >= 0) {
							if(checkedItems[i].item.remainQty > checkedItems[i].item.standardOutQty) {
								if(checkedItems[i].item.requestQty > checkedItems[i].item.currentQty) {
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11616']});
									return;
								}
								if(checkedItems[i].item.issueQty > checkedItems[i].item.remainQty) {
									micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10259']});
									return;
								}
							}
						} else {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11379']});
							return;
						}
					}
					
					if(checkedItems[i].item.requestFlag == "Y") {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11390']});
						return;
					}
					arrayList.push(checkedItems[i].item);
				}
				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11333']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11400'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("D", "purchase.materialLedger.materialRelease.materialReleaseTmp", "{}", that.delCallback, arrayList);
					//mom_ajax("L", "purchase.materialLedger.materialRelease.materialRelease", JSON.stringify(arrayList), that.listCallbackPost, arrayList);
				}
			}});
			
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_RELEASE_MOMCC004_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#workOrder'), $('#findBtn'));
	},
	comboBox : function(){
		// 요청일
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 불출창고
		mCommon.comboBoxClickCall("#locationName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{facilityClassCd: "AREA", facilityType : "FAC200"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				
				}
			);
		});

		//타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_TYPE", attribute1 : "N"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#type",comboOptions, options);
			
			}
		);
		
		// 상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MATERIAL_REQUEST_STATE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#state",{searchMode:'containsignorecase', autoComplete:true,selectedIndex:1}, options);
			
			}
		);
		
		// 재고량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#stockQty",comboOptions, options);
			
			}
		);
		
		// 잔량
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE", attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#remainQty",comboOptions, options);
			
			}
		);
	},
	delCallback : function(param, data, callbackParam){
		var that = this.MOMCC004;
		var arrayList = [];
		var checkedItems = AUIGrid.getCheckedRowItems("grid");
		if(param == 'SUCCESS'){
			for(var i = 0; i < checkedItems.length; i++){
				arrayList.push(callbackParam[i]);
			}
			mom_ajax("L", "purchase.materialLedger.materialRelease.materialReleaseTmp", JSON.stringify(arrayList), that.procCallback);
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	procCallback : function(param, data){
		var that = this.MOMCC004;
		if(param == 'SUCCESS'){
			mom_ajax('C', 'purchase.materialLedger.materialRelease.materialRelease', "{}", that.listCallbackPost);
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES11016']});
			console.log(data);
		}
	},
	listCallbackPost : function(param, data){
		var that = this.MOMCC004;
		if(param == 'SUCCESS'){
			mCommon.render("grid", "W201807301624296151000jJDKbuq9vEf",  mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMCC004.init();
});