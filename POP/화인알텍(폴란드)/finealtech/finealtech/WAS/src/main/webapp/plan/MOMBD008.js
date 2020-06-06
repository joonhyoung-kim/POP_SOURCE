var pivot = '';
var MOMBD008 = {
	init: function() {
		var that = this;
		Language.init(function() {
			mCommon.init("grid", "W201811291810548111000Wv0kmpGW0Oy", null, function(){
				that.grid();
				that.event();
				that.comboBox();
				that.design();
				that.getPivot();
			}, Language);
		});
		
	}, grid: function() {
		var columnLayout = [
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11224'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "category",
				headerText : Language.lang['MESSAGES10225'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "totalQty",
				headerText : Language.lang['MESSAGES11355'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "itemId",
				mergePolicy : "restrict",
				dataType : "numeric",
				formatString : "#,###"
			},
			{
				dataField : "stockQty",
				headerText : Language.lang['MESSAGES11175'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "itemId",
				mergePolicy : "restrict",
				dataType : "numeric",
				formatString : "#,###"
			},
			{
				dataField : "pastQty",
				headerText : Language.lang['MESSAGES10219'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "itemId",
				mergePolicy : "restrict",
				dataType : "numeric",
				formatString : "#,###"
			}
		];

		var gridProps = {
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				cellMergePolicy : "withNull",
				rowSelectionWithMerge : true,
				editable : false
		};
		AUIGrid.destroy("grid");
		AUIGrid.create("grid", columnLayout, gridProps);	
			
	}, event: function() {
		var that = this;
		//  조회
		$(document).on("click", "#findBtn", function() {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.psi.planType.dummy", // 호출 URL
					{}, // 파라미터
					function(data) {
						if(data.length < 1) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10249']});
							return;
						}
					});
			if($("#planId").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10158']});
				return;
			}
			var param =  mCommon.formGetParam("#form");
			param.pivot = pivot;
			mCommon.render("grid", "W201811291810548111000Wv0kmpGW0Oy", param, function(){});
		});
		
		//psi생성 버튼
		$(document).on("click", "#createPsiBtn", function() {
			var param = {
				planId : $("#planId").val()
			} 
			mom_ajax("C", "plan.plan.psi.psiCreate", JSON.stringify(param), that.callBackPost);
			micaCommon.splash.show();
		});
		
		//planID 콤보박스 변경할 경우 date값 변경  
		$("#planId").on("change", function(e) {
			that.getPivot();
        });
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PSI_MOMBD008_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#model'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		
	}, comboBox : function(){
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 계획유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.plan.psi.planType.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#planId", {searchMode:'containsignorecase', autoComplete:true, selectedIndex:0}, options);
		});
		
		// 품목유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.specifyCode.dummy", // 호출 URL
			{codeClassId : "ITEM_TYPE", codeId : "'FP','SP'"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#itemType", comboOptions, options);
		});
		
		// shortage
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId : "QTY_FLAG", codeId : "Y_MINUS"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#shortage", comboOptions, options);
		});
	}, 
	getPivot : function() {
		pivot = "";
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.demand.demandPlan.planId_date.dummy",
			type : "GET",
			data : {planId:$("#planId").val()},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				for(var i = 0; i < data.length; i++){	
					var result = data[i].planDate;
					if(i == 0) {
						pivot += "'"+result+"' AS \""+result.substr(2,2)+"/"+result.substr(4,2)+"/"+result.substr(6,2)+"\"";
					} else {
						pivot += ", '"+result+"' AS \""+result.substr(2,2)+"/"+result.substr(4,2)+"/"+result.substr(6,2)+"\"";
					}
					
					var key = result.substr(2,2)+"/"+result.substr(4,2)+"/"+result.substr(6,2);
					var columnObj = { 
							dataField : key, 
							dataType : "numeric", 
							formatString : "#,###", 
							styleFunction :  function(rowIndex, columnIndex, value, headerText, item, dataField) {
								if(item.category.match("BALANCE")){
									if(parseInt(value) < 0){
										return "redStyle";
									}
									return null;
								}
								return null;
					}};												
					AUIGrid.addColumn("grid", columnObj, 'last');
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	callBackPost : function(param, data) {
		var that = this.MOMBD008;
		if(param == 'SUCCESS'){
			that.grid();
			that.getPivot();
			var searchParam =  mCommon.formGetParam("#form");
			searchParam.pivot = pivot;
			mCommon.render("grid", "W201811291810548111000Wv0kmpGW0Oy", searchParam, function(){
				micaCommon.messageBox({type:"success", width:"400", height:"145", html:Language.lang['MESSAGES10071']});
			});
		} else {
			micaCommon.messageBox({type:"danger",width:"400", height:"145",  html: Language.lang['MESSAGES10821'] + Language.getLang(data.p_err_msg)});
			console.log(data);
		}
		micaCommon.splash.show();
	},
	design : function(){
		$("head").append('<style>.redStyle{ background: #FF0000;}</style>');
	}
};
$(document).ready(function(event){
	MOMBD008.init();
});