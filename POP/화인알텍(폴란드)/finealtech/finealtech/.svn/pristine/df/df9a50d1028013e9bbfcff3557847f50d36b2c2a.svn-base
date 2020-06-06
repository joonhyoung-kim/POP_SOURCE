var MOMDA011 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid", "W201902191110130081000rgQyLvJj5uj", null, function(){
				that.grid("grid");
			}, Language);
		});
	}, grid: function(grid) {
		tuCommon.cellClick(grid);
		
		// 수불통제일 포함한 이전일로는 선택 못하도록 Validation
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comEndPeriod.dummy",
			type : "GET",
			data : {menuId : "MOMDA011"},
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
		
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			var param = mCommon.formGetParam("#form");
			
			mCommon.render("grid", "W201902191110130081000rgQyLvJj5uj", param, function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_DEDUCT_HIST_MOMDA011_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 차감취소
		$(document).on("click", "#deductCancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.cancelQty != 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
				
				if(to_date_yyyy_mm_dd(checkedItems[i].item.ioTime) <= endPeriod) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.getLang('MESSAGES11080' + '@' + endPeriod)});
					return;
				}
				
				arrayList.push(checkedItems[i].item);
			}
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES11291'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("L","workOrder.materialDeductHist.materialDeductCancel", JSON.stringify(arrayList), that.callbackPost);
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#workOrder'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#workItem'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#deductItem'), $('#findBtn'));
		
	}, comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		mCommon.comboBoxClickCall("#location", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
				{facilityClassCd : "AREA"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#location",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 설비
		mCommon.comboBoxClickCall("#resource", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resource",comboOptions, options);
					callBack();
				
				}
			);
		});
	},
	callbackPost : function(param, data){
		var that = this.MOMDA011;
		if(param == 'SUCCESS'){
			mCommon.render('grid', 'W201902191110130081000rgQyLvJj5uj', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMDA011.init();
});