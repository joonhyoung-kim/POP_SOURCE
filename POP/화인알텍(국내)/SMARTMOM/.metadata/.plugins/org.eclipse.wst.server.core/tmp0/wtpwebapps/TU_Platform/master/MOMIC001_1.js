var MOMIC001_1 = {
	initMessage		: undefined, 
	initParam		:  undefined,
	excelParam  	: undefined,
	cudFlag 		: undefined,
	inoutFlag 		: undefined,
	itemType 		: undefined,
	itemTypeParam	: undefined,		// 추가, XMOM 세팅부분에 동적 파라미터로 사용
	
	init: function() {		
		var that = this;
		Language.init(function() {
			that.inoutFlag = momWidget.getSearchParam()['inoutFlag'];
			that.itemType = momWidget.getSearchParam()['itemType'];
			if(that.inoutFlag == 'IN') {
				that.itemTypeParam = "'FP','SP','RM','SM','CI','GI'";
				title = Language.lang['MESSAGES11093'];
			} else if(that.inoutFlag == 'OUT'){
				that.itemTypeParam = "'FP','SP','RM','SM','CI','GI'";
				title = Language.lang['MESSAGES10889'];
			} else if(that.itemType == 'EM') {
				that.itemTypeParam = "'EM'";
				that.inoutFlag = 'IN';
				title = Language.lang['MESSAGES12216'];
				
//				momWidget.setColumnPropByDropDown(0, 'itemId', 'common.comItem', param); 
			}
			$('#label-id').text(title);
			
			momWidget.isInitGrid(0, function() {
				momWidget.dropDownPost(0, undefined, undefined, undefined, that);
			});
		});
		
		//that.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		this.initMessage = undefined;
		this.initParam = {inoutFlag: this.inoutFlag, itemType: this.itemType};
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveCallBtn1' || indexInfo != undefined && indexInfo['op'] == 'delCallBtn1' && indexInfo['sequence'] == 4) {
			$('#editPop1').momModal('hide');
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		}
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		if(this.inoutFlag == 'OUT') {
			$('#editPop1').find('.bntpopclose').siblings('.textblock').text(Language.lang['MESSAGES10889']);
		} else if(this.inoutFlag == 'IN' && this.itemType == 'EM') {
			/*var param = {
					itemType: "'EM'"
			};*/
			$('#editPop1').find('.bntpopclose').siblings('.textblock').text(Language.lang['MESSAGES12216']);
		}
		if(indexInfo.op == 'createBtn1' || indexInfo.op == 'copyBtn1') {
			this.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn1') {
			this.cudFlag = 'U';
		}
		this.initParam = {inoutFlag : this.inoutFlag, cudFlag : this.cudFlag};
		$('#saveBtnEP1').attr('id', 'saveCallBtn1');
	}/*, createCallBack: function(index, param, callBackParam, indexInfo) {
		//console.log('this.inoutFlag = ' + this.inoutFlag + ', this.itemType = ' + this.itemType);
		if(this.inoutFlag == 'IN' && this.itemType == 'EM') {
			var param = {
					itemType: "'EM'"
			};
			//console.log('Enter = ' + JSON.stringify(param));
			//momWidget.setColumnPropByDropDown(0, 'itemId', 'common.comItem', param);
			//momWidget.dropDownPost(0, undefined, undefined, undefined, this);
		}
	}*/, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo.op == 'delCallBtn1') {
			this.initParam = {inoutFlag : this.inoutFlag, cudFlag : 'D'};
		}
		if(index == 0 && indexInfo.op == 'saveCallBtn1') {
			var params = momWidget.createParam4PopUp(index, param);
			if(params <= 0) {
				setTimeout(function() {
					var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:columnLayout[params * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
				}, 40);
				
				return;
			}
			params.inoutFlag = this.inoutFlag;
			params.cudFlag = this.cudFlag;
			this.initParam = params;
		}
	}
};
/*var MOMIC005 = {
		initMessage	: undefined, 
		initParam	:  undefined,
		excelParam  : undefined,
		cudFlag : undefined,
		inoutFlag : undefined,
		itemType : undefined,
		
		init: function() {		
			Language.init(function() {
				inoutFlag = 'IN';
				itemType = momWidget.getSearchParam()['itemType'];
				
				$('#label-id').text(Language.lang['MESSAGES12216']);
			});
		}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
			this.initMessage = undefined;
			this.initParam = {inoutFlag: inoutFlag, itemType: itemType};
		}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
			if(result != 'SUCCESS') {
				momWidget.splashHide();
				return;
			}
			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
			
			AUIGrid.setGridData(momWidget.grid[index], data);
			momWidget.splashHide();
			
			if(indexInfo != undefined && indexInfo['op'] == 'saveCallBtn1' || indexInfo != undefined && indexInfo['op'] == 'delCallBtn1' && indexInfo['sequence'] == 4) {
				$('#editPop1').momModal('hide');
				momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
			}
		}, createCallInit: function(index, param, callBackParam, indexInfo) {
			$('#editPop1').find('.bntpopclose').siblings('.textblock').text(Language.lang['MESSAGES12216']);
			if(indexInfo.op == 'createBtn1' || indexInfo.op == 'copyBtn1') {
				cudFlag = 'C';
			} else if(indexInfo.op == 'editBtn1') {
				cudFlag = 'U';
			}
			this.initParam = {inoutFlag : inoutFlag, cudFlag : cudFlag};
			$('#saveBtnEP1').attr('id', 'saveCallBtn1');
		}, delCallInit: function(index, param, callBackParam, indexInfo) {
			if(index == 0 && indexInfo.op == 'delCallBtn1') {
				this.initParam = {inoutFlag : inoutFlag, cudFlag : 'D'};
			}
			if(index == 0 && indexInfo.op == 'saveCallBtn1') {
				var params = momWidget.createParam4PopUp(index, param);
				if(params <= 0) {
					setTimeout(function() {
						var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
						momWidget.messageBox({type:'warning', width:'400', height: '145', html:columnLayout[params * -1]['headerText'] + ' 은(는) 필수 항목입니다.'});
					}, 40);
					
					return;
				}
				params.inoutFlag = inoutFlag;
				params.cudFlag = cudFlag;
				this.initParam = params;
			}
			
		}
	};*/

$(document).ready(function(event){
	momWidget.init(1, 'MOMIC001_1', MOMIC001_1);
//	momWidget.init(1, 'MOMIC005', MOMIC005);
//	if(momWidget.getSearchParam()['inoutFlag'] == 'IN' || momWidget.getSearchParam()['inoutFlag'] == 'OUT') {
		MOMIC001_1.init();
//	} else {
//		MOMIC005.init();
//	}
});