var MOMIB006 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201902271309310531000oXca5HOgrDX", null, function(){
				that.grid();
				that.event();
				that.comboBox();
				that.design();
			}, Language);
		});
	}, grid: function() {
		tuCommon.cellClick("grid");
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId : "USE_FLAG"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField('grid', 'useYn', {
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "DropDownListRenderer",
						showEditorBtnOver : true,
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					},
					styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
						return 'columnStyle';
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
	}, event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W201902271309310531000oXca5HOgrDX",  mCommon.formGetParam("#form"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "EXCEPTION_MODEL_MOMIB006_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 저장 버튼
		$(document).on("click", "#saveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var chkFlag = false;
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						if(i == checkedItems.length - 1) {
							chkFlag = true;
						}
						mom_ajax("U", "reference.itemInfo.exceptionCustomerModel.exceptionCustomerModelCancel", JSON.stringify(checkedItems[i].item), that.callbackPost, chkFlag);
					}
				}
			}});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#modelSuffix'), $('#findBtn'));
	}, comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYn", {searchMode:'containsignorecase', autoComplete:true, selectedIndex : 0}, options);
			
			}
		);
	}, 
	callbackPost : function(param, data){
		if(param == 'SUCCESS'){
			mCommon.render("grid", "W201902271309310531000oXca5HOgrDX", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD !important;}</style>');	
	},
};
$(document).ready(function(event){
	MOMIB006.init();
});