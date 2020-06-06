var MOMMD001 = {
	initParam		: undefined,
	columnLayout	: undefined,
	findFlag		: undefined,
	initMemo		: undefined,
	initFlag		: undefined,
	currentFlag     : undefined,
	init: function() {
		var that = this;
		Language.init(function() {
			that.event();
			momWidget.isInitGrid(0, function() {
				that.setGridFormat(momWidget.grid[0]);
				$('#memoContent').attr('readonly','readonly');
			});
		});
		
		momWidget.splitter('.h01-h', 'vertical', 1200, false);
	}, setGridFormat: function(gridId) {
		var that = this;
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
				dataField : "itemGroup",
				headerText : Language.lang['MESSAGES11906'],
				editable : false,
				width : 100,
				cellMerge : true,
				visible : false
			},
			{
				dataField : "itemGroupName",
				headerText : Language.lang['MESSAGES11906'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "resourceGroupCd",
		        mergePolicy : "restrict"
			},
//			{
//				dataField : "dataType",
//				headerText : Language.lang['MESSAGES10225'],
//				editable : false,
//				width : 100,
//				visible : false
//			},
//			{
//				dataField : "dataTypeName",
//				headerText : Language.lang['MESSAGES10225'],
//				editable : false,
//				width : 120,
//				cellMerge : true,
//				mergeRef : "resourceGroupCd",
//		        mergePolicy : "restrict"
//			},
			{
				dataField : "type",
				headerText : "TYPE",
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
		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		//200529 / 최한슬 / 데이터생성 버튼 재조회
		if(indexInfo != undefined && ((indexInfo['op'] == 'findBtn1') || (indexInfo['op'] == 'dataBtn1'))) {
			
			this.initParam = {weekStartDate : $("#week").val().replace(/-/gi, '')
							, pivot1 : momWidget.getDiff2($("#week").val(), 1, "DECODE(MOD(ROWNUM,3),0,TRUNC(M#, 1)||'%',M#)")
							, pivot2 : momWidget.getDiff2($("#week").val(), 2, "DECODE(MOD(ROWNUM,3),0,TRUNC(W#, 1)||'%',W#)")
							, pivot3 : momWidget.getDiff2($("#week").val(), 3, "DECODE(MOD(ROWNUM,3),0,TRUNC(D#, 1)||'%',D#)")
							};
			
//			if($("#resourceGroupCd").val() == '') {
//				this.initMessage = Language.lang['MESSAGES10683'];
//				return;
//			}
//			
//			if($("#placeCd").val() == '') {
//				this.initMessage = Language.lang['MESSAGES12313'];
//				return;
//			}
		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		//200529 / 최한슬 / 데이터생성 버튼 재조회
		if(indexInfo != undefined && ((indexInfo['op'] == 'findBtn1') || (indexInfo['op'] == 'dataBtn1'))) {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);	
			var changeColumn = [];
			var coloumn;
			for(var i = 0; i < columnLayout.length; i++) {
				coloumn = columnLayout[i].dataField;
				if((coloumn.match('/') || ((coloumn.length == 2 || coloumn.length == 3) && coloumn.charAt(coloumn.length - 1) == 'm')) == false) {
					changeColumn.push(columnLayout[i]);
				}
			}
			
			if(data.length > 0) {
				$.each(data[0], function(key, value) {
					if(key.match('/') || ((key.length == 2 || key.length == 3) && key.charAt(key.length - 1) == 'm')) {
						var columnObj = {dataField: key, headerText: key.toUpperCase(), style: 'right-column', dataType: 'numeric', formatString: '#,##0.#'};
						changeColumn.push(columnObj);
					}
				});
				
				AUIGrid.changeColumnLayout(momWidget.grid[0], changeColumn);
				AUIGrid.setGridData(momWidget.grid[0], data);
				
			} else {
				AUIGrid.clearGridData(momWidget.grid[0]);
			}
			that.findFlag = 'Y';
			that.getMemo();
			
			momWidget.splashHide();
		}
		
		$(document).on("click", "#totalExcelDownBtn1", function() {
        	var fileName = 'MOMMD001' + '_' + get_current_date('yyyy-mm-dd');
        	var option = {fileName: fileName};
          
        	option.progressBar = true;
        	momWidget.splashHide();
        	AUIGrid.exportToXlsx(momWidget.grid[0], option);
        });
		
		//200529 / 최한슬 / 데이터생성 버튼 성공 메세지 출력
		if(indexInfo != undefined && indexInfo['op'] == 'dataBtn1') {
			if(result == 'SUCCESS') {
	   			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
	   			momWidget.splashHide();
	   			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});	
	   		} else {
	   			momWidget.splashHide();
   	        	momWidget.messageBox({type: 'danger', width: '400', height: '145', html: Language.lang['MESSAGES10821']});
	   		}
		}
	}, event: function() {
		var that = this;
		var currentWeek;
		
		//페이지 시작시 최근 주차 받아오기
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comWeekStartDate.dummy', {}, function(data) {
			currentWeek = data[0].code.replace(/-/gi, '');
			});
				
		// 날짜 검색조건 변경 시 페이지 클린
		$(document).on("change", "#week", function() {
	    	that.week = $("#week").val().replace(/-/gi, '')
	   	    //선택된 날짜가 금주인지 설정 currentWeek 변경
	   	    if(currentWeek == that.week){
	   	    	that.currentFlag = 'Y'
	   		} else {
	    		that.currentFlag = 'N'
	   		}
	    	//week 변경시 페이지 조회 처리
	    	//조회버튼 클릭 이벤트 처리
	    	momWidget.findBtnClicked(0, false, {weekStartDate: $('#week').val().replace(/-/gi, ''), resourceGroupCd: $('#resourceGroupCd').val(), placeCd: $('placeCd').val()}, that.retrieveCallBack(), {index: 0, op: 'findBtn1'}, that);
	    	that.getMemo();
	    	
	      });
		
		$('#memoContent').dblclick(function(){	
			$('#memoPop').momModal('show');
			if(that.currentFlag != 'Y'){
				$('#memoContents').attr('readonly','readonly');
				$('#memoConfirmBtn').prop('disabled', true);
				$('#memoConfirmBtn').css('pointer-events', 'none');
				$('#memoContents').text(that.initMemo);
			} else {
				$('#memoContents').removeAttr('readonly');
				$('#memoConfirmBtn').prop('disabled', false);
				$('#memoConfirmBtn').css('pointer-events', 'auto');
				$('#memoContents').text(that.initMemo);
			}			
		});
		
		$(document).on('click', '#memoConfirmBtn', function() {			
			momWidget.messageBox({type : 'info', width : '400', height : '145', html : Language.lang['MESSAGES11194'], closeButton : {text:"Close"}, okButton : {text:"OK", 
				after : function() {
					var param = {description: $('#memoContents').val(), notePart: 'P', fromDate: $('#week').val().replace(/-/gi, '')};
					if(that.initFlag == 'N') {
						mom_ajax('C', 'common.esiNote', JSON.stringify(param), function(){
							$('#memoPop').momModal('hide');
							that.getMemo();
						});
					} else {
						mom_ajax('U', 'common.esiNote', JSON.stringify(param), function(){
							$('#memoPop').momModal('hide');
							that.getMemo();
						});
					}
				}
			}});
			
		});
				
		$(document).on('click', '#cancelBtn, .bntpopclose', function() {
			$('#memoContents').val($('#memoContent').val());
			$('#memoPop').momModal('hide');
		});
		
	}, getMemo: function() {
		var that = this;
		
		 mom_ajax('R', 'common.esiNote', {notePart: 'P', fromDate: $('#week').val().replace(/-/gi, '')}, function(result, data) {
			 if(result != 'SUCCESS') {
					return;
				}
				if(data.length > 0) {
					if(data[0] == null) {
						that.initMemo = '';
						$('#memoContent').val('');
						$('#memoContents').val('');
						that.initFlag = 'Y';
					} else {
						that.initFlag = 'Y';
						that.initMemo = data[0].description;
						$('#memoContent').val(data[0].description);
						$('#memoContents').val(data[0].description);
						
						$('#memoContent').css({'font-size':'15px'});
					}
				} else {
					that.initFlag = 'N';
					that.initMemo = '';
					$('#memoContent').val('');
					$('#memoContents').val('');
				}
				
			}, undefined, undefined, this, 'async');
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMMD001', MOMMD001);
	MOMMD001.init();
});