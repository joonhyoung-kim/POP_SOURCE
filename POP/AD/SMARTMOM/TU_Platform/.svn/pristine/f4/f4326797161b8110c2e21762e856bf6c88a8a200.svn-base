//20200331 박연주 QA확인 신규 페이지 생성 
var MOMDA019 = {
	initMessage			: undefined,
	initParam			: undefined,
	init: function() {		
		var that = this;
		Language.init(function() {
			that.event();			
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(2, function() {
					that.grid();
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && (indexInfo['op'] == 'createDefectResultBtn1' || indexInfo['op'] == 'cancelDefectResultBtn1') && indexInfo['sequence'] == 2) {
			this.initParam = {isQa : null};
		}
	}, grid: function() {
		//20200331 박연주 file column 추가
		momWidget.addFileColumn(0, 2, 22, 'MOMDA019', 'defectResultId');
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		//20200331 박연주  조치등록 Validation
		if(indexInfo != undefined && indexInfo['op'] == 'createDefectResultBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {isQa : 'Y'};
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['isQa'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES12433'];
				} else if(callBackParam[i]['handlingTime'] == '' || callBackParam[i]['handlingTime'] == undefined) {
					this.initMessage = Language.lang['MESSAGES12434'];
				} else if(callBackParam[i]['qaReasonCode'] == '' || callBackParam[i]['qaReasonCode'] == undefined) {
					this.initMessage = Language.lang['MESSAGES12435'];
				} else if (to_date_yyyy_mm_dd(callBackParam[i]['handlingTime']) < to_date_yyyy_mm_dd(callBackParam[i]['stateTime'])) { //callBackParam[i]['stateTime']) {
					this.initMessage = Language.lang['MESSAGES12436'];
				}
			}
		}
		
		//20200331 박연주  조치취소 Validation
		if(indexInfo != undefined && indexInfo['op'] == 'cancelDefectResultBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {isQa : 'N', handlingTime : null, qaReasonCode : null};
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['isQa'] != 'Y') {
						this.initMessage = Language.lang['MESSAGES12437'];
				}
			}
		}
	}, delCallInit : function(index, param, callBackParam, indexInfo) {
		//20200331 박연주  불량삭제 Validation
		if(indexInfo != undefined && indexInfo['op'] == 'delDefectResultBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['isQa'] == 'Y') {
						this.initMessage = Language.lang['MESSAGES12438'];
				}
			}
		}
	}, event: function() {
		//20200331 박연주 파일 팝업 닫기시 grid 새로고침
		$(document).on('click', '#fileCloseBtn3', function() {
			momWidget.findBtnClicked(0, false, {}, undefined, undefined, this);
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA019', MOMDA019);
	momWidget.init(3, 'MOMDA019', MOMDA019);
	MOMDA019.init();
});