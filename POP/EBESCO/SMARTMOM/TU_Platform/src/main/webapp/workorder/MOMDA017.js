var MOMDA017 = {
	init : function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.grid();
				that.event();
			});
		});
	}, grid : function() {
		var that = this;
		var columnLayout = [
			{
				dataField : "workOrderId",
				headerText : Language.lang['MESSAGES11150'],
				editable : false,
				cellMerge : true
			},
			{
				dataField : "planDate",
				headerText : Language.lang['MESSAGES11275'],
				editable : false,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "parentItemId",
				headerText : Language.lang['MESSAGES10601'],
				editable : false,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES12190'],
				editable : false,
				cellMerge : true
			},
			{
				dataField : "confirmQty",
				headerText : Language.lang['MESSAGES11274'],
				editable : false,
				cellMerge : true
			},
			{
				dataField : "requestQty",
				headerText : Language.lang['MESSAGES10943'],
				editable : false,
				cellMerge : true
			},
			{
				dataField : "measure",
				headerText : Language.lang['MESSAGES12395'],
				editable : false
			},
			{
				dataField : "createDate",
				headerText : Language.lang['MESSAGES12396'],
				editable : false
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

		AUIGrid.destroy(momWidget.grid[0]);
		AUIGrid.create(momWidget.grid[0], columnLayout, gridProps);
	}, event : function() {
		// 엑셀 다운로드
		$(document).on("click", "#surveyExcelDownBtn1", function() {
			var fileName = 'MOMDA017' + '_' + get_current_date('yyyy-mm-dd');
        	var option = {fileName: fileName};
          
        	option.progressBar = true;
        	momWidget.splashHide();
        	AUIGrid.exportToXlsx(momWidget.grid[0], option);
		});
	}
};
$(document).ready(function(event) {
	momWidget.init(1, 'MOMDA017', MOMDA017);
	MOMDA017.init();
});
