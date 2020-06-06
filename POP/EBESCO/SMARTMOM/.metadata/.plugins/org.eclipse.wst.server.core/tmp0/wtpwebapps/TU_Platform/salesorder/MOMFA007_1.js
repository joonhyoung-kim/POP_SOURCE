var MOMFA007_1 = {
	initMessage			: undefined,
	initParam			: undefined,
	
	stockType			: undefined,
	menuId				: undefined,	
	
	endPeriod			: undefined,
	allowMinusQty		: undefined,
	
	fromFacilityType	: undefined,
	toFacilityType		: undefined,

	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(2, function() {
					that.grid();
					momWidget.dropDownPost(0, undefined, undefined, undefined, that);
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromLocation').val() == '') {
				this.initMessage = Language.lang['MESSAGES10034'];
				return;
			} else if($('#toLocation').val() == '') {
				this.initMessage = Language.lang['MESSAGES10088'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		} 
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'detailBtn1' && indexInfo['sequence'] == 1) {
			$('#listPop1').momModal('show');
			//AUIGrid.resize(momWidget.grid[2]);
		} else if(indexInfo != undefined && indexInfo['op'] == 'moveBtn1' && indexInfo['sequence'] == 2) {
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'moveBtn1' && indexInfo['sequence'] == 1) {
			for(var i =0; i < callBackParam.length; i++) {
				if(callBackParam[i]['moveQty'] == undefined || callBackParam[i]['moveQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10983'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['dueDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10269' + '@' + this.endPeriod);
					return;
				} else if(this.allowMinusQty == 'N') {
					if(callBackParam[i]['currentQty'] >= 0) {
						if(callBackParam[i]['moveQty'] > callBackParam[i]['currentQty']) {
							this.initMessage = Language.lang['MESSAGES10984'];
							return;
						}
					} else {
						this.initMessage = Language.lang['MESSAGES10990'];
						return;
					}
				}
			}
			
			this.initParam = {ioTime: get_current_date(0), moveType: this.stockType};
		}
	}, grid: function() {
		var that = this;
		this.stockType = momWidget.getSearchParam()['stockType'];
		if(this.stockType == 'O004') {
			this.menuId = 'MOMCF001';
			
			mom_ajax('R', 'common.comCode', {codeClassId : "FACILITY_TYPE", attribute1 : "Y"}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				that.fromFacilityType = "'" + data[0]['code'] + "'";
			}, undefined, undefined, this, 'sync');

			mom_ajax('R', 'common.comCode', {codeClassId : "FACILITY_TYPE", attribute5 : "Y"}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				that.toFacilityType = "'" + data[0]['code'] + "'";
			}, undefined, undefined, this, 'sync');
			
		} else {
			this.menuId = 'MOMFA025';
			this.fromFacilityType = "'FAC300'";
		}
		
		var that = this;
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			that.allowMinusQty = data[0]['allowMinusQty'];
		}, undefined, undefined, this, 'sync');
		
		momWidget.setEndPeriod(this.menuId, this);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMFA007_1', MOMFA007_1);
	momWidget.init(3, 'MOMFA007_1', MOMFA007_1);
    MOMFA007_1.init();
});