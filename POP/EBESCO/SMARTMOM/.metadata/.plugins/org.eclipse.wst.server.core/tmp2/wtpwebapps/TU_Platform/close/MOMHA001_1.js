var MOMHA001_1 = {
	initMessage	: undefined, 
	initParam	: undefined,
	
	closingMonth: undefined,
		
	init: function() {	
		var that = this;
		Language.init(function() {
		});
		this.event();
		
		momWidget.isInitGrid(0, function() {
			that.grid();
		});
		
		momWidget.splitter('.h02-h', 'vertical', 600);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = undefined;
		} else if(indexInfo != undefined && indexInfo['op'] == 'detailBtn1' && indexInfo['sequence'] == 1) {
			var checkVendors = '(';
			for(var i = 0; i < callBackParam.length; i++) {
				if(i == 0) {
					checkVendors = "('" + callBackParam[i]['vendorCd'] + "'";
				} else {
					checkVendors += (", '" + callBackParam[i]['vendorCd'] + "'");			
				}
			}
			
			checkVendors += ')';
			
			this.initParam = {vendorCd: checkVendors};
			this.initMessage = 'CLEAR_PARAM';
		} 
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'unitPriceRecalBtn1' && indexInfo['sequence'] == 4) {
			$('#closingMonth').val(this.closingMonth);
			$('#psFlag').val(this.psFlag);
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else {
			this.closingMonth = $('#closingMonth').val();
			this.psFlag = $('#psFlag').val();
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'unitPriceRecalBtn1' && indexInfo['sequence'] == 3) {
			this.initParam = {ioType: $("#psFlag").val()};
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'unitPriceRecalBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {yyyyMm: this.closingMonth, inoutFlag: this.psFlag};
		}
	}, grid: function() {
		/* modify_hists
		 * XMOMH1 / ljw / 20191106 / 검색조건 입출고월, 매입/매출 드롭다운 리스트에서 변경은 되나 값 수정은 못하도록 속성 지정 
		 * 
		 * */
		$('#closingMonth').jqxComboBox({selectionMode: 'dropDownList'});
		$('#psFlag').jqxComboBox({selectionMode: 'dropDownList'});
	}, event: function() {
		// 하단 그리드 엑셀 다운로드 버튼 클릭 시
        $(document).on("click", "#grid2ExcelDownBtn2", function() {
        	var fileName = 'MOMHA001' + '_' + get_current_date('yyyy-mm-dd');
                   
            var option = {fileName: fileName};
            option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
	            $('.aui-grid-export-progress-modal').remove();
            }
          
            option.progressBar = true;
          
            AUIGrid.exportToXlsx(momWidget.grid[1], option);
       });
	}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMHA001_1', MOMHA001_1);
	momWidget.init(2, 'MOMHA001_1', MOMHA001_1);
	MOMHA001_1.init();
});