var grid1;
var MOMFA018 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid1", "W201906041450476536043j3cfh9FAhEa", null, function() {
				that.comboBox();
				that.event();
				that.grid();
			},Language);
		});
	}, grid: function() {
		var that = this;
		$("#toItemId, #orderQty, #stockQty, #locationCd2").attr("readonly","readonly");
		AUIGrid.bind("grid1", 'cellClick', function(e) {
			$("#fromItemId").val("");
			var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
			var options = {local: "", textName : "name", valueName : "code", readonly : false};
			var itemType = e.item.itemType;
			
			$("#toItemId").val(e.item.itemId);
			$("#orderQty").val(e.item.remainQty);
			$("#locationCd2").val(e.item.locationName);
			$("#stockQty").val(e.item.currentQty);
			$("#replaceDate").val(get_date_diff(0));
			
			
			getItemList();
			//대체 품목
			function getItemList(){
				//Item combo
				var optItem = {textName : "name", valueName : "code"};
				optItem.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy"; // 검색 URL
				optItem.keyName = "key"; // 서버로 검색 조건 키 이름값
				optItem.minLength = 4; // 최소 검색 수
				optItem.param = {itemType : "'" + itemType + "'"}; // 기본 파라미터
				
				mCommon.comboBoxSearchCall("#fromItemId", comboOptions, optItem);
			}
			
//			that.changeItem(e.item);
		});
	}, event: function() {
		var that = this;
		$(document).on("click", "#findBtn1", function() {
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
			
			if($("#locationCd").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11296']});
				return;
			}
			
			mCommon.render("grid1", "W201906041450476536043j3cfh9FAhEa",  mCommon.formGetParam("#form"), function(){});
		});
		
		$(document).on("change", "#fromItemId", function() {
			var item = AUIGrid.getSelectedItems("grid1"); 
			that.changeItem(item[0].item);
		});
		
		//품목대체 클릭
		$(document).on("click", "#saveBtn", function() {
			var selectedItem = AUIGrid.getSelectedItems("grid1"); 
			var params = {
					fromItemId : $("#fromItemId").val(),
					toItemId : $("#toItemId").val(),
					locationCd : selectedItem[0].item.locationCd,
					substitudeQty : $("#substitudeQty").val(),
					description : $("#description").val(),
					replaceDate : $("#replaceDate").val()
			}
			if(parseInt($("#stockQty").val()) < parseInt(params.substitudeQty)) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11873']});
				return;
			}
			
			if(selectedItem[0].item.remainQty < parseInt(params.substitudeQty)) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11874']});
				return;
			}
			
			if($("#substitudeQty").val() == '0' || $("#substitudeQty").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10719']});
				return;
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11870'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					mom_ajax("C", "shipping.itemReplacement.itemReplacement", JSON.stringify(params), that.callBack);
				}
			}
			});
		});
		
		//엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "itemReplacement_MOMFA018_" + get_current_date("yyyy-mm-dd")});
		});
	}, 
	comboBox: function() {
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;
		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		//창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.dynamicFacility.dummy", // 호출 URL
				{facilityClassCd:"AREA", stockType:"IR"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#locationCd",comboOptions, options);
			}
		);
	}, 
	changeItem: function(e) {
		var param = {
				itemId : $("#fromItemId").val(),
				locationCd : e.locationCd
		}
		var stockQty = 0;
		var substitudeQty = 0;
		var realRemainQty = e.remainQty - e.currentQty; 
		if($("#fromItemId").val() == '') {
			stockQty = 0;
			substitudeQty = 0;
		} else {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.curItemStock.dummy",
				type : "GET",
				data : param,
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data[0] == null) {
						stockQty = 0;
						substitudeQty = 0;
					} else {
						stockQty = data[0].currentQty;
						if(stockQty < realRemainQty) {
							substitudeQty = data[0].currentQty;
						} else {
							substitudeQty = realRemainQty;
						}
					}
				}
			});
		}
			
		$("#stockQty").val(stockQty);
		$("#substitudeQty").val(substitudeQty);
	},
	callBack: function(result, data) {
		if(result == "SUCCESS") {
			mCommon.render("grid1", "W201906041450476536043j3cfh9FAhEa", mCommon.formGetParam("#form"), function(){
				$("#fromItemId").val("");
				$("#toItemId").val("");
				$("#locationCd2").val("");
				$("#orderQty").val("");
				$("#stockQty").val("");
				$("#substitudeQty").val("");
				$("#description").val("");
				$("#replaceDate").val("");
				micaCommon.messageBox({type:"success",  width:"400", height: "145",   html: Language.lang['MESSAGES10692']});
			});
		} else {
			micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
	
};
$(document).ready(function(event){
//	momWidget.init(1, 'MOMFA018');
	MOMFA018.init();
});