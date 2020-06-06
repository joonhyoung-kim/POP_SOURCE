var planId;

var MOMBA006 = {
	init: function() {
		var that = this;
		Language.init(function() {
			that.setGridFormat("grid");
		});
		that.event();
		that.comboBox();
	},
	grid: function() {
	}, 
	event: function() {
		var that = this;
		
		//조회 버튼
		$(document).on("click", "#findBtn", function() {
			if($("#planId").val() != '') {
				that.selectList();
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10060']});
				return;
			}
		});
		
		// 영업마스터 생성
		$(document).on("click", "#salesConfirmBtn", function() {
//			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10899'], closeButton:{text:"Close"}, okButton:{text:"OK", 
//				after:function(){
//					micaCommon.splash.show();
//					mom_ajax("C", "plan.order.salesOrder.salesMstCreate", "{}", that.salesMstCreateCollback);
//				}
//			}});			
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "SALES_ORDER_COMPARE_MOMBA006_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 키다운 이벤트
		tuCommon.addKeyDown($(document), $('#customerPo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#modelSuffix'), $('#findBtn'));
	},
	comboBox: function (){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//planId
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.order.salesOrderCompare.planDate.dummy", // 호출 URL 
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#planId", {searchMode : "containsignorecase", autoComplete:true, selectedIndex:0}, options); 
			}
		);
		
		//비교상태
		mCommon.comboBoxClickCall("#compareType", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SALES_COMPARE_STATE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#compareType",comboOptions, options);
					callBack();
				}
			);
		});
	},
	setGridFormat: function(gridId){
		var columnLayout = [ {
			dataField : "customerPoId",
			headerText : Language.lang['MESSAGES10194'],
			width : 160,
			style: "left-column"
		},
		{
			dataField : "itemId",
			headerText : Language.lang['MESSAGES11577'],
			width : 150,
			style: "left-column"
		},
		{
			dataField : "itemName",
			headerText : Language.lang['MESSAGES11569'],
			width : 180,
			style: "left-column"
		},
		{
			dataField : "salesItemId",
			headerText : Language.lang['MESSAGES10191'],
			width : 150,
			style: "left-column"
		},
		{
			headerText : Language.lang['MESSAGES10479'],
			children : [ {
				dataField : "oldDueDate",
				headerText : Language.lang['MESSAGES10265'],
				width : 100
			}, {
				dataField : "oldQty",
				headerText : Language.lang['MESSAGES11247'],
				width : 100,
				style: "right-column",
				formatString: "#,###"
			} ]
		},
		{
			headerText : Language.lang['MESSAGES10481'],
			children : [ {
				dataField : "newDueDate",
				headerText : Language.lang['MESSAGES10265'],
				width : 100
			}, {
				dataField : "newQty",
				headerText : Language.lang['MESSAGES11247'],
				width : 100,
				style: "right-column",
				formatString: "#,###"
			} ]
		},
		{
			dataField : "orderStateName",
			headerText : Language.lang['MESSAGES11253'],
			width : 100
		},
		{
			dataField : "remainQty",
			headerText : Language.lang['MESSAGES11163'],
			width : 100,
			style: "right-column",
			formatString: "#,###"
		},
		{
			dataField : "salesCompareStateName",
			headerText : Language.lang['MESSAGES10546'],
			width : 100
		}]
		
		var gridProps = {
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				editable : false,
				fillColumnSizeMode : true,
				showRowCheckColumn : true
		};

		AUIGrid.create(gridId, columnLayout, gridProps);	
	},
	selectList: function() {
		var that = this;
		micaCommon.splash.show();
	
		planId = $("#planId").val().replace("_P", "");
		var param = {
			planId : planId,
			customerPo : $("#customerPo").val(),
			itemName : $("#itemName").val(),
			modelSuffix : $("#modelSuffix").val(),
			compareType : $("#compareType").val()
		}
				
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.plan.order.salesOrderCompare.salesOrderCompare.dummy",
			type : "GET",
			data : param,
			async: true,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){				
				AUIGrid.setGridData("grid", data);
				micaCommon.splash.hide();
			},
			error: function(data){
				micaCommon.splash.hide();
			},
			fail : function(data){
				micaCommon.splash.hide();
			}
		});		
		
	}
};
$(document).ready(function(event){
	MOMBA006.init();
});