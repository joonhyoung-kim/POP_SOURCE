var MOMXX012 = {
	locale			: undefined,
	propertyMap		: {},
	candidateMap	: {},
	
	init: function() {	
		var that = this;
		Language.init(function() {
			that.locale = sessionStorage.getItem('locale');
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		this.propertyMap = {};
		var data1 = [];
		for(var i = 0; i < data.length; i++) {
			if(data[i]['columnProperty'].length < 2) {
				continue;
			}
			
			var columnProperty 	= JSON.parse(data[i]['columnProperty']);
			if(columnProperty.length < 1) {
				continue;
			}
			
			var companyCd  	= data[i]['companyCd'];
			var divisionCd	= data[i]['divisionCd'];
			var pageId 		= data[i]['pageId'];
			var pageName 	= data[i]['pageName'];	
			this.propertyMap[companyCd + ':' + divisionCd + ':' + pageId] = columnProperty;
			for(var j = 0; j < columnProperty.length; j++) {
				var json = {};
				json['companyCd'] 		= companyCd;
				json['divisionCd'] 		= divisionCd;				
				json['pageId'] 			= pageId;
				json['pageName'] 		= pageName;
				json['locale']			= this.locale;
				
				json['KRHeaderText'] = columnProperty[j]['headerText'];				
				if(columnProperty[j][this.locale + 'HeaderText'] != undefined && columnProperty[j][this.locale + 'HeaderText'] != '') {
					json['LocaleHeaderText'] = columnProperty[j][locale + 'HeaderText'];
				}
				
				data1.push(json);
			}
		}
		
		momWidget.splashHide();
		AUIGrid.setGridData(momWidget.grid[0], data1);
		
		if(indexInfo['op'] == 'saveAllBtn1') {
			momWidget.messageBox({type:'success', width:'400', height: '145', html: '저장하였습니다'});
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(param.length < 1) {
			return;
		}
		
		this.candidateMap = {};
		var N = param.length;
		for(var i = 0; i < param.length; i++) {
			var companyCd 			= param[i]['companyCd'];
			var divisionCd 			= param[i]['divisionCd'];
			var pageId 				= param[i]['pageId'];
			var KRHeaderText		= param[i]['KRHeaderText'];
			var LocaleHeaderText	= param[i]['LocaleHeaderText'];
			
			var columnProperty 	= this.candidateMap[companyCd + ':' + divisionCd + ':' + pageId];
			if(columnProperty == undefined) {
				columnProperty 	= this.propertyMap[companyCd + ':' + divisionCd + ':' + pageId];
			}
			
			for(var j = 0; j < columnProperty.length; j++) {
				if(LocaleHeaderText != '' && KRHeaderText == columnProperty[j]['headerText']) {
					columnProperty[j][this.locale + 'HeaderText'] = LocaleHeaderText;
					this.candidateMap[companyCd + ':' + divisionCd + ':' + pageId] = columnProperty;
					break;
				}
			}
		}
		
		for(key in this.candidateMap) {
			var cdp = key.split(':');
			var json = {};
			json['company'] 		= cdp[0];
			json['division']		= cdp[1];
			json['pageId'] 			= cdp[2];
			json['columnProperty'] 	= JSON.stringify(this.propertyMap[key]);
			param.push(json);
		}
		
		param.splice(0, N);
	}, excelGridCallBack: function(index) {
		var that = this;
		var division = $('#division').val(); //that.getDivisionList();
		mom_ajax('R', 'widget.columnproperty', {division: division}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				momWidget.messageBox({type:'danger', width:'400', height: '145', html: 'Widget 데이터가 존재하지 않습니다.'});
				AUIGrid.clearGridData(momWidget.grid[0]);
				return;
			}
			
			that.propertyMap = {};
			for(var i = 0; i < data.length; i++) {
				that.propertyMap[data[i]['companyCd'] + ':' + data[i]['divisionCd'] + ':' + data[i]['pageId']] = JSON.parse(data[i]['columnProperty']);
			}			
		}, undefined, undefined, this, 'sync');
		
		var gridData = AUIGrid.getGridData(momWidget.grid[0]);
	}, entireDataSetBack(data, work) {
		var gridData = AUIGrid.getGridData(momWidget.grid[0]);
		momWidget.entireDatas[0] = gridData;
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMXX012', MOMXX012);
	MOMXX012.init();
});
