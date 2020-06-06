/*200529 최한슬 / 데이터생성 버튼 추가 */ 
var MOMMD003 = {
	initMessage		: undefined,
	initParam 		: undefined,
	resourceGroupCd : undefined,
	cudFlag			: undefined,
	radioValue		: undefined,
	
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
//				that.grid();
				that.event();
			});
		});
	}, createCallInit:function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo.op == 'createBtn4') {
			that.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn4') {
			that.cudFlag = 'U';
		}
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'createBtn4') {
			if(that.resourceGroupCd == '' || that.resourceGroupCd == null) {
				that.initMessage = Language.lang['MESSAGES11735'];
			}
			
			$('#resourceGroupCdEP4').val(that.resourceGroupCd);
			
		}
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		//200529 / 최한슬 / 데이터생성 버튼 재조회
		if(indexInfo != undefined && ((indexInfo['op'] == 'findBtn1') || (indexInfo['op'] == 'dataBtn1'))) {
//			var pivot1 = momWidget.getDiff2($('#fromDate').val(), 1, "MAX(M#)||MAX(D.CODE_VALUES)");
//			var pivot2 = momWidget.getDiff2($('#fromDate').val(), 2, "MAX(W#)||MAX(D.CODE_VALUES)");
//			var pivot3 = momWidget.getDiff2($('#fromDate').val(), 3, "MAX(D#)||MAX(D.CODE_VALUES)");
//			this.initParam = {fromDate : $("#fromDate").val().replace(/-/gi, '')
//							, pivot1 : pivot1
//							, pivot2 : pivot2
//							, pivot3 : pivot3
//							};
			this.initParam = {fromDate : $("#week").val().replace(/-/gi, '')
					, pivot1 : momWidget.getDiff2($("#week").val(), 1, "MAX(M#)||MAX(D.CODE_VALUES)")
					, pivot2 : momWidget.getDiff2($("#week").val(), 2, "MAX(W#)||MAX(D.CODE_VALUES)")
					, pivot3 : momWidget.getDiff2($("#week").val(), 3, "MAX(D#)||MAX(D.CODE_VALUES)")
					};
			
			that.radioValue = $('input[name="value"]:checked').val();
		}	
		
		if(indexInfo != undefined && indexInfo['op'] == 'CC3') {
			that.resourceGroupCd = param.resourceGroupCd;
		}
		
		if(that.radioValue == 'resourceGroup') {
			that.initParam.isResourceGroup = 'true';
		} else {
			that.initParam.isResourceGroup = undefined;
		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS' || data.length < 1 && indexInfo['op'] != 'CC3') {
			AUIGrid.clearGridData(momWidget.grid[0]);
			momWidget.splashHide();
			return;
		}
		//200529 / 최한슬 / 데이터생성 버튼 재조회
		if(indexInfo != undefined && ((indexInfo['op'] == 'findBtn1') || (indexInfo['op'] == 'dataBtn1'))) {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			for(var i = 0; i < columnLayout.length; i++) {
				coloumn = columnLayout[i].dataField;
				if((coloumn.match('/') || ((coloumn.length == 2 || coloumn.length == 3) && coloumn.charAt(coloumn.length - 1) == 'm')) == false) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			$.each(data[0], function(key, value) {
				if(key.match('/') || ((key.length == 2 || key.length == 3) && key.charAt(key.length - 1) == 'm')) {
					var columnObj = {dataField: key, headerText: key.toUpperCase(), style: 'right-column', dataType: 'numeric', formatString: '#,##0.#'};
					changeColumn.push(columnObj);
				}
			});				
			
			AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
			AUIGrid.setGridData(momWidget.grid[0], data);
//			momWidget.splashHide();
		}
		
		$(document).on("click", "#totalExcelDownBtn1", function() {
        	var fileName = 'MOMMD003' + '_' + get_current_date('yyyy-mm-dd');
        	var option = {fileName: fileName};
          
        	option.progressBar = true;
        	momWidget.splashHide();
        	AUIGrid.exportToXlsx(momWidget.grid[0], option);
        });
		
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'CC3') {
			AUIGrid.setGridData(momWidget.grid[3], data);
			momWidget.dropDownPost(3, undefined, undefined, undefined, that);
			
		}
		//200529 / 최한슬 / 데이터생성 버튼 성공 메세지 출력
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			if(result == 'SUCCESS') {
				var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
				that.event();
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
	   		} else {
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}
		
		momWidget.splashHide();
		
	}, saveCallInit: function(index, data, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP4') {
			mom_ajax('R', 'eis.resourceUtilizationRate.resource', {resourceGroupCd: that.resourceGroupCd}, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				if(data1.length > 0) {
					for(var i = 0; i < data1.length; i++) {
						if(that.cudFlag == 'C') {
							if(data1[i]['placeCd'] == $('#placeCdEP4').val()) {
								that.initMessage = Language.lang['MESSAGES12328'];
							}
						}
					}
				}
			}, undefined, undefined, this, 'async');
		}	
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP4') {
			momWidget.findBtnClicked(3, false, {resourceGroupCd: that.resourceGroupCd}, function(result1, data1) {
				if(result1 != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[3], data1);
			});
		}
		momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		momWidget.splashHide();
		
	}
//	, grid: function() {
//		var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
//		columnLayout[0]['cellMerge'] = true;
//		
//		for(var i = 1; i < 3; i++) {
//			columnLayout[i]['cellMerge'] = true;
//			columnLayout[i]['mergeRef'] = 'resourceCd';
//			columnLayout[i]['mergePolicy'] = 'restrict';
//		}
//		
//		AUIGrid.changeColumnLayout(momWidget.grid[0], columnLayout);
//	}
	, event: function() {
		var that = this;
				
		$("#rgValue").attr('checked', 'checked');
		
		$(document).on("click", "#goalSetupBtn1", function() {
			momWidget.findBtnClicked(2, false, undefined, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[2], data);
			});
			$('#pop').momModal('show');
			AUIGrid.resize(momWidget.grid[3]);
		});
		
		$(document).on('click', '#pop .bntpopclose, #modalCloseBtn', function() {
			$('#pop').momModal('hide');
			AUIGrid.clearGridData(momWidget.grid[3]);
			momWidget.findBtnClicked(0, false, {fromDate: $('#fromDate').val().replace(/-/gi,''), resourceCd: $('#resourceCd').val()}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[0], data);
			});
		});
		
		// 조회 시 radio Button 선택 값에 따라 그리드 항목 변경
		$(document).on('click', '#findBtn1, #dataBtn1', function() {
			that.radioValue = $('input[name="value"]:checked').val(); /*200529 최한슬 / 데이터생성 버튼 눌렀을 때도 radioValue 먼저 타도록 수정 */ 
			if(that.radioValue == 'resource') {
				
				columnLayout = [
					{
						dataField : "placeCd",
						headerText : Language.lang['MESSAGES12303'],
						editable : false,
						width : 100,
						visible : false
					},
					{
						dataField : "placeName",
						headerText : Language.lang['MESSAGES12303'],
						editable : false,
						width : 100,
						cellMerge : true,
						mergeRef : "placeCd",
				        mergePolicy : "restrict"
					},
					{
						dataField : "resourceGroupCd",
						headerText : Language.lang['MESSAGES10678'],
						editable : false,
						width : 100,
						cellMerge : true,
						visible : false
					},
					{
						dataField : "resourceGroupName",
						headerText : Language.lang['MESSAGES10678'],
						editable : false,
						width : 100,
						cellMerge : true,
						mergeRef : "resourceGroupCd",
				        mergePolicy : "restrict"
					},
					{
						dataField : "resourceCd",
						headerText : Language.lang['MESSAGES10673'],
						editable : false,
						width : 100,
						cellMerge : true,
						visible : false
					},
					{
						dataField : "resourceName",
						headerText : Language.lang['MESSAGES10686'],
						editable : false,
						width : 100,
						cellMerge : true,
						mergeRef : "resourceCd",
				        mergePolicy : "restrict"
					},
					{
						dataField : "dataType",
						headerText : Language.lang['MESSAGES10225'],
						editable : false,
						width : 100,
						visible : false
					},
					{
						dataField : "dataName",
						headerText : Language.lang['MESSAGES10225'],
						editable : false,
						width : 120,
						cellMerge : false
					}
				];

			} 
			
			if(that.radioValue == 'resourceGroup') {
				
				columnLayout = [
					{
						dataField : "placeCd",
						headerText : Language.lang['MESSAGES12303'],
						editable : false,
						width : 100,
						visible : false
					},
					{
						dataField : "placeName",
						headerText : Language.lang['MESSAGES12303'],
						editable : false,
						width : 100,
						cellMerge : true,
						mergeRef : "placeCd",
				        mergePolicy : "restrict"
					},
					{
						dataField : "resourceGroupCd",
						headerText : Language.lang['MESSAGES10678'],
						editable : false,
						width : 100,
						cellMerge : true,
						visible : false
					},
					{
						dataField : "resourceGroupName",
						headerText : Language.lang['MESSAGES10678'],
						editable : false,
						width : 100,
						cellMerge : true,
						mergeRef : "resourceGroupCd",
				        mergePolicy : "restrict"
					},
					{
						dataField : "dataType",
						headerText : Language.lang['MESSAGES10225'],
						editable : false,
						width : 100,
						visible : false
					},
					{
						dataField : "dataName",
						headerText : Language.lang['MESSAGES10225'],
						editable : false,
						width : 120,
						cellMerge : false
					}
				];
				
			}
			
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
		});
		
		
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMMD003', MOMMD003);
	momWidget.init(3, 'MOMMD003', MOMMD003);
	momWidget.init(4, 'MOMMD003', MOMMD003);
	MOMMD003.init();
});