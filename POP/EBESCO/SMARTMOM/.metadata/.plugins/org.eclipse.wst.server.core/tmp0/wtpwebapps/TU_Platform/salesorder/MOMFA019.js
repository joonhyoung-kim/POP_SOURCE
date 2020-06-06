var MOMFA019 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		that.design();
		Language.init(function() {
			mCommon.init("grid", "W201906173552578433045sd56a4SrH", null, function(){
				that.grid("grid");
			}, Language);
		});
	}, grid: function(grid) {
		tuCommon.cellClick(grid);
		
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');
			
			if(e.item.cancelQty != 0) {
				return false;
			}
		});
		
		AUIGrid.setColumnPropByDataField('grid', 'cancelReason', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(item.cancelQty == 0){
					return 'columnStyle';
				}
			}
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
			
			mCommon.render("grid", "W201906173552578433045sd56a4SrH", param, function(){
				
			});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MATERIAL_DEDUCT_HIST_MOMDA011_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 대체취소
		$(document).on("click", "#cancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var arrayList = [];
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.cancelQty != 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11006']});
					return;
				}
				arrayList.push(checkedItems[i].item);
			}
			if(checkedItems.length != 0){
				var option = {
					type:"info", 
					width:"400", 
					height: "145",
					html:Language.lang['MESSAGES11881'], 
					okButton:{
						text:"OK", 
						after:function(){
							mom_ajax("L","shipping.itemReplacementStatus.itemReplacementCancel", JSON.stringify(arrayList), that.callbackPost);
						}
					}
				}
				
				micaCommon.messageBox(option);	
			}
		});
		
		
		//엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "itemReplacementStatus_MOMFA019_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
		
	}, comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
				{facilityClassCd:"AREA", stockType:"IR"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationCd",comboOptions, options);
			}
		);
		
		//취소여부
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "Y_N"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#cancelFlag",comboOptions, options);
				
				}
			);
	},
	callbackPost : function(result, data){
		var that = this.MOMFA019;
		if(result == "SUCCESS"){
			mCommon.render('grid', 'W201906173552578433045sd56a4SrH', mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
};
$(document).ready(function(event){
	MOMFA019.init();
});