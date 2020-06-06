var MOMBD008_1 = {
	initMessage		: undefined,
	initParam		: undefined,
	
	fromDate		: undefined,
	toDate			: undefined,
	
	initColSize		: -1,
	
	pivot			: undefined,
	excelDownParam 	: undefined,
		
	init: function() {       
		Language.init(function() {
		});
	}, loadCallInit: function() {
		var that = this.init != undefined ? this : this.MOMBD008_1;
		
		var planId = $('#planId').val();
		if(planId == undefined || planId == '') {
			setTimeout(that.loadCallInit, 40);
			return;
		} else if(that.initColSize == -1) {
			var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
			that.initColSize = columnLayout.length;
			that.grid();
		}
		
		that.initParam = {planId: planId};
		that.design();
		/* modify hists
		 * 20191107 / pyj / 화면 pivot 생성 및 조회 오류 수정
		 */
		momWidget.setColDate(0, 3, function() { // 20191107
		}, that);
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		var param = momWidget.createParam4Form(0, '#form');
		if(param['planId'] == '') {
			this.initMessage = Language.lang['MESSAGES10158'];
			return;
		}
		
		var that = this;
		if(indexInfo != undefined && (indexInfo['op'] == 'findBtn1' || (indexInfo['op'] == 'createPsiBtn1' && indexInfo['sequence'] == 2))) {
			mom_ajax('R', 'plan.plan.psi.planType', {}, function(result, data) {
				if(result != 'SUCCESS') {
					if(data['p_err_msg'] != undefined && data['p_err_msg'] != '') {
						that.initMessage = Language.getLang(data.p_err_msg);
			        } else {
			        	that.initMessage = '실패하였습니다.';
			        }
					
					return;
				} else if(data.length < 1) {
					that.initMessage = Language.lang['MESSAGES10249'];
					return;
				}
				
				that.initParam = {pivot: that.pivot};
			}, undefined, undefined, this, 'sync');
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'createPsiBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = {planId: $('#planId').val()};
		}
	}, grid: function() {
		var columnLayout = AUIGrid.getColumnLayout(momWidget.grid[0]);
		columnLayout[0]['cellMerge'] = true;
		
		for(var i = 1; i < 3; i++) {
			columnLayout[i]['cellMerge'] = true;
			columnLayout[i]['mergeRef'] = 'itemId';
			columnLayout[i]['mergePolicy'] = 'restrict';
		}
		
		AUIGrid.changeColumnLayout(momWidget.grid[0], columnLayout);
	}, excelDownCallInit: function(index, param, callBackParam, indexInfo) {
		this.excelDownParam = AUIGrid.getColumnLayout(momWidget.grid[0]);
	}, design : function(){
		$("head").append('<style>.redStyle{ background: #FF0000;}</style>');
	}
};

$(document).ready(function(event){
   momWidget.init(1, 'MOMBD008_1', MOMBD008_1);
   MOMBD008_1.init();
});
