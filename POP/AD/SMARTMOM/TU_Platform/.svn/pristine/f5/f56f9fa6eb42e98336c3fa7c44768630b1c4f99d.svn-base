var MOMIC004_1 = {
	initMessage		: undefined, 
	initParam		:  undefined,
	excelParam  	: undefined,
	cudFlag 		: undefined,
	inoutFlag 		: undefined,
	itemType 		: undefined,
	itemTypeParam	: undefined,
	
	init: function() {		
		Language.init(function() {
		});
	},
	retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
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
			momWidget.splashHide();
		}
	},
	createCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo.op == 'createBtn1' || indexInfo.op == 'copyBtn1') {
			this.cudFlag = 'C';
		} else if(indexInfo.op == 'editBtn1') {
			this.cudFlag = 'U';
		}
		
		this.initParam = { cudFlag : this.cudFlag};
		$('#saveBtnEP1').attr('id', 'saveCallBtn1');
	},
	delCallInit: function(index, param, callBackParam, indexInfo) {
		if(index == 0 && indexInfo.op == 'delCallBtn1') {
			this.cudFlag = 'D';
			this.initParam = { cudFlag : this.cudFlag};
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
			
			params.cudFlag = this.cudFlag;
			this.initParam = params;
		}
	},
	excelUpCallInit: function(index, param, callBackParam, indexInfo) {
		this.initParam = {priceType : "ST"};
	}

};

$(document).ready(function(event){
	momWidget.init(1, 'MOMIC004_1', MOMIC004_1);
	MOMIC004_1.init();
});