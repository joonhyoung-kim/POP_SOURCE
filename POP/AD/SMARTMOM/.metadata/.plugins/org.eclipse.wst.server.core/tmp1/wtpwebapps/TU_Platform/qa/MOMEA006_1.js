var MOMEA006_1 = {
	initParam: undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				that.setGridFormat(momWidget.grid[0]);
				momWidget.isInitGrid(2, function() {
					that.grid();
				});
			});
		});
	}, grid: function() {
		console.log('Entered');
		momWidget.addFileColumn(0, 2, 25, 'MOMEA005', 'defectResultId');
	}, setGridFormat: function(gridId) {
		var that = this;
		var columnLayout = [
			{
				dataField : "isActive",
				headerText : "",
				width: 30,
				headerRenderer : {
					type : "CheckBoxHeaderRenderer",
					// 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
					// dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
					// true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
					dependentMode : true, 			
					position : "bottom" // 기본값 "bottom"
				},
				renderer : {
					type : "CheckBoxEditRenderer",
					showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
					editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
					checkValue : "Active", // true, false 인 경우가 기본
					unCheckValue : "Inactive"
				}
			},
			{
				dataField : "workOrderId",
				headerText : Language.lang['MESSAGES11150'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11577'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "itemName",
				headerText : Language.lang['MESSAGES11569'],
				editable : false,
				width : 120,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "specification",
				headerText : Language.lang['MESSAGES10234'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "planQty",
				headerText : Language.lang['MESSAGES10146'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "goodQty",
				headerText : Language.lang['MESSAGES10812'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "startTime",
				headerText : Language.lang['MESSAGES10631'],
				editable : false,
				width : 120,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "pqcStateName",
				headerText : Language.lang['MESSAGES10222'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "measureStartTime",
				headerText : Language.lang['MESSAGES10786'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "measureEndTime",
				headerText : Language.lang['MESSAGES11235'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "unit",
				headerText : Language.lang['MESSAGES10300'],
				editable : false,
				width : 120,
			},
			{
				dataField : "measureMethodName",
				headerText : Language.lang['MESSAGES11491'],
				editable : false,
				width : 100
			},
			{
				dataField : "gaugeMethodName",
				headerText : Language.lang['MESSAGES10132'],
				editable : false,
				width : 100,
			},
			{
				dataField : "checkMethodName",
				headerText : Language.lang['MESSAGES11494'],
				editable : false,
				width : 100,
			},
			{
				dataField : "itemValue1",
				headerText : Language.lang['MESSAGES10754'],
				editable : false,
				width : 120,
			},
			{
				dataField : "itemValue2",
				headerText : Language.lang['MESSAGES10755'],
				editable : false,
				width : 100
			},
			{
				dataField : "itemValue3",
				headerText : Language.lang['MESSAGES10756'],
				editable : false,
				width : 120,
			},
			{
				dataField : "itemValue4",
				headerText : Language.lang['MESSAGES10757'],
				editable : false,
				width : 100
			},
			{
				dataField : "itemValue5",
				headerText : Language.lang['MESSAGES10758'],
				editable : false,
				width : 120,
			},
			{
				dataField : "minItemValue",
				headerText : "Min",
				editable : false,
				width : 100
			},
			{
				dataField : "maxItemValue",
				headerText : "Max",
				editable : false,
				width : 120,
			},
			{
				dataField : "target",
				headerText : "Target",
				editable : false,
				width : 100
			},
			{
				dataField : "usl",
				headerText : "USL",
				editable : false,
				width : 120,
			},
			{
				dataField : "lsl",
				headerText : "LSL",
				editable : false,
				width : 100
			},
			{
				dataField : "judgementName",
				headerText : Language.lang['MESSAGES11529'],
				editable : false,
				width : 120,
			},
			{
				dataField : "description",
				headerText : Language.lang['MESSAGES10545'],
				editable : false,
				width : 100
			},
			{
				dataField : "isFile",
				headerText : Language.lang['MESSAGES11525'],
				editable : false,
				width : 120,
			},
			{
				dataField : "updateUserName",
				headerText : Language.lang['MESSAGES10128'],
				editable : false,
				width : 100
			},
			{
				dataField : "stateTime",
				headerText : Language.lang['MESSAGES10127'],
				editable : false,
				width : 100
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
		AUIGrid.create(gridId, columnLayout, gridProps);
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var checkedItems = AUIGrid.getItemsByValue(momWidget.grid[0], "isActive", "Active");
		this.initParam = checkedItems;
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMEA006_1', MOMEA006_1);
	momWidget.init(3, 'MOMEA006_1', MOMEA006_1);
	MOMEA006_1.init();
});