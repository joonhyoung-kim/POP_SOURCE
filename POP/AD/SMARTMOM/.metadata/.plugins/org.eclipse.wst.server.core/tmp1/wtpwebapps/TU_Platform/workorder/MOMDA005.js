var MOMDA005 = {
	init: function() {
		var that = this;
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid1", "W201808010458193331000JWKC7AZqECg", null, function() {
				that.grid();
				that.event();
				mCommon.render("grid1", "W201808010458193331000JWKC7AZqECg", null, function(){}, Language);
			}, Language);
		});
	}, grid: function() {
		var comboBox;

		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy",
			type : "GET",
			data : {},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				comboBox = data;
			},
			error: function(data){},
			fail : function(data){}
		});
	
		var columnLayout = [ 
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11577'],
				editable : false,
				width : 120
			}, 
			{
				dataField : "itemName",
				headerText : Language.lang['MESSAGES11569'],
				editable : false,
				width : 140
			}, 
			{
				dataField : "specification",
				headerText : Language.lang['MESSAGES10234'],
				editable : false,
				width : 140
			}, 
			{
				dataField : "currentQty",
				headerText : Language.lang['MESSAGES11613'],
				editable : false,
				width : 100
			},
			{
				dataField : "toLocationCd",  //수정필요
				headerText : Language.lang['MESSAGES10988'],
				width : 100,
				style:"columnStyle",
				renderer : {
					type : "DropDownListRenderer",
					list : comboBox, 
					keyField : "code", 
					valueField : "name" 
				}
			},
			{
				dataField : "currentQty", 
				headerText : Language.lang['MESSAGES10982'],
				width : 100,
				dataType : "numeric",
				style:"columnStyle",
				editRenderer : {
					type : "InputEditRenderer",
					onlyNumeric : true, 
					autoThousandSeparator : true 
				}
			}, 
			{
				dataField : "description", 
				headerText : Language.lang['MESSAGES10545'],
				style:"columnStyle",
				width : 120,
				editRenderer : {
					type : "InputEditRenderer"
				}
			}];
		
			var gridProps = {
				editable : true,
				selectionMode : "singleRow",
				showRowCheckColumn : true,
				fillColumnSizeMode : true,
				showSelectionBorder: false,
				softRemoveRowMode: false
			};

			 AUIGrid.create("grid2", columnLayout, gridProps);
			 
			 tuCommon.cellClick('grid1');
			 tuCommon.cellEditEnd('grid2');
			 
	}, event: function() {
		var that = this;
		// 조회버튼
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid1", "W201808010458193331000JWKC7AZqECg", that.getSearchData());
		});
		
		// 품목으로 조회
		$(document).on("keydown", "#itemId", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "ITEM_STOCK_MOVE_MOMDA005_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 선택버튼
		$(document).on("click", "#choiceBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			if(checkedItems.length <= 0 ){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11335']});
				return;
			}
	
			for(var i = 0; i  < checkedItems.length; i++){
				var item  = checkedItems[i].item;
				var items = AUIGrid.getItemsByValue("grid2", "itemId", item.itemId); 
				
				for(var j = 0; j < items.length; j++){
					if(item.itemId == items[j].itemId){
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11770' + '@' + item.itemId + '@' + item.itemName});
						return;
					}					
				}
				
				if(item.currentQty <= 0){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11771' + '@' + item.itemId + '@' + item.itemName});
					return;
				}	
				AUIGrid.addRow("grid2", item, "last"); 
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
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10991'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var gridData = AUIGrid.getCheckedRowItems("grid2");
					console.log(gridData);
					
					if(gridData.length <= 0){
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11338']});
						return;
					}
				
					var data = [];
					for(var i = 0; i < gridData.length; i++){
						data[i] = gridData[i].item;
						
						if(data[i].toLocationCd == null || data[i].toLocationCd == ''){
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.getLang('MESSAGES11574' + '@' + data[i].itemId)});
							return;
						}
					}
				}
			}});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#itemId'), $('#findBtn'));
	},
	comboBox: function(){
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 창고
		mCommon.comboBoxClickCall("#location", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comFacility.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#location", comboOptions, options);
					callBack();
				}
			);
		});
	
		// 품목타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"ITEM_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
			
			}
		);
		
		// 재고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"WARE_INVEN_TYPE",attribute1:"Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#zeroFlag", comboOptions, options);
			
			}
		);
	}
};
$(document).ready(function(event){
	MOMDA005.init();
});