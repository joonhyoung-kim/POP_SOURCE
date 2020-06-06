var MOMKA001 = {
	currentPage	: undefined,	
	initMessage	: undefined, 
	initParam	: undefined,	
	excelParam	: undefined, 
	
	init: function() {
		Language.init(function() {
		});
		
		this.event();
		//this.design();
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(param == undefined || param.length == 0) {
			this.initMessage = '저장할 데이터가 없습니다.';			
			return;
		}
		
		var gridData = AUIGrid.getGridData(momWidget.grid[index]);
		for(var i = 0; i < param.length; i++) {
			for(var j = 0; j < gridData.length; j++) {
				if((param[i]['seq'] != gridData[j]['seq']) && (param[i]['resourceCd'] == gridData[j]['resourceCd'])) {
					this.initMessage = '설비를 변경할 수 없습니다.';					
					return;
				}
			}
		}
	}, 
	getResourceName : function(resourceCd) {
		var that = this;	
		var lotId="";
		var param = {
				divisionCd : divisionCd,
				companyCd : companyCd,
				vendorCd : resourceCd							
			}
		$.ajax({
			url : tuCommon.contextPath()
					+ "/mom/request/com.thirautech.mom.common.common.comGetVendor.dummy",
			type : "GET",
			data : param,
			async : false,
			timeout : 30000000,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data) {
				if (data.length > 0) {
					return data[0].name;

				} else {
					if (data.p_err_msg != null
							&& data.p_err_msg != undefined
							&& data.p_err_msg != '') {
						
					} else {
						
					}
					console.log(data);
				}

			}
		});
		
		//mom_ajax("R", "pop.popResult.lotId.dummy", JSON.stringify(param), that.getLotIdCallback);
			

	},
	event: function() {
		var that = this;
		var cnt = 0;		
		$(document).on('click', '#productionStatusBtn', function() {
			if($('#productionStatus').val() == '') {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES10685']});
				return;
			}
			var paNum = $("#productionStatus").jqxComboBox('getCheckedItems').length;
			var param = '?';
			for(var i = 0; i < paNum; i++) {
				param +=  $("#productionStatus").jqxComboBox('getCheckedItems')[i].value;
				if(i != paNum - 1) {
					param += ",";
				}
			}
			
			window.open('statusBoard_1.html' + param,'win'+cnt,'width=1500,height=800,left=0,top=0');
			cnt++;
		});
		
		$(document).on('click', '#mainBtn', function() {
			if($('#typeSetup1').val() == '') {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES12081']});
				return;
			}
			
			var param = '?' + $('#typeSetup1').val();
			window.open('statusBoard_2.html'+ param,'win'+cnt,'width=1500,height=800,left=0,top=0');
			cnt++;
		});
		
		$(document).on('click', '#main2Btn', function() {
			if($('#typeSetup2').val() == '') {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES12081']});
				return;
			}
			
			var param = '?' + $('#typeSetup2').val();
			window.open('statusBoard_3.html'+ param,'win'+cnt,'width=1500,height=800,left=0,top=0');
			cnt++;
		});
		
		$(document).on('click', '#main3Btn', function() {
			var that = this;
			if($('#typeSetup3').val() == '') {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.lang['MESSAGES12081']});
				return;
			}
			var resourceName="";
//			resourceName= that.getResourceName($('#typeSetup3').val());
//			var param = {
//					divisionCd : divisionCd,
//					companyCd : companyCd,
//					vendorCd : $('#typeSetup3').val()						
//				}
			mom_ajax('R', 'pop.popResult.resource', {resourceCd : $('#typeSetup3').val()}, function(result, data) {
				if(result != 'SUCCESS' || data.length < 1) {
					return;
				}
				
				if(data.length > 0) {
					resourceName = data[0].resourceName;
				}
				
			}, undefined, undefined, this, 'sync');
			
			
			var param = '?' +'MOMKA001/'+ $('#typeSetup3').val()+'/'+resourceName;
			window.open('complete.html'+ encodeURI(param),'win'+cnt,'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes')
	
			cnt++;
		});
		
		$(document).on('click', '#actionBtn11', function() {
			that.currentPage = {menuId : 'MOMKA001_2'};
			that.initParam = that.currentPage;
			that.excelParam = that.currentPage;
			
			$('#pop').momModal('show');
			AUIGrid.resize(momWidget.grid[0], $(window).width() * 0.488 - 48, 320);
			/*AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'resourceCd', {style:'columnStyle'});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'seq', {style:'columnStyle'});*/
		});
		
		$(document).on('click', '#actionBtn21', function() {
			that.currentPage = {menuId : 'MOMKA001_3'};
			that.initParam = that.currentPage;
			that.excelParam = that.currentPage;
			
			$('#pop').momModal('show');
			AUIGrid.resize(momWidget.grid[0], $(window).width() * 0.488 - 48, 320);
			/*AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'resourceCd', {style:'columnStyle'});
			AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'seq', {style:'columnStyle'});*/
		});
		
		/*$(document).on('click', '#excelDownBtn1', function() {
			momWidget.procResize();
		});
		
		$(document).on('click', '#excelTemplateBtn1', function() {
			momWidget.init(1, 'MOMKA001', MOMKA001, 'reInit');
		});*/
		
		$(document).on('click', '#addRowBtn', function() {
			if($('#dashboardType').val() == '') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12081']});
				return;
			} else if($('#resourceCd').val() == '') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12082']});
				return;
			} else if($('#dashboardType').val() != '' && $('#resourceCd').val() != '') {
				var param = that.getPopResult();
				param.menuId = that.currentPage.menuId;
				AUIGrid.addRow(momWidget.grid[0], param, 'last');
			}
		});
		
		$(document).on('click', '#modalCloseBtn, .bntpopclose', function() {
			$('#pop').momModal('hide');
			$('#dashboardType').val('');
			$('#resourceCd').val('');
		});
	}, getPopResult : function() {
		var checkSeq = AUIGrid.getGridData(momWidget.grid[0]).length;
		
		var result = {
			boardType: $('#dashboardType').val(),
			boardTypeName: $('#dashboardType').jqxComboBox('getSelectedItem').originalItem.label,
			resourceCd: $('#resourceCd').jqxComboBox('getSelectedItem').value,
			seq: checkSeq + 1
		};
		
		return result;
	}/*, design: function(){
		$('head').append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}*/
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMKA001', MOMKA001);
	MOMKA001.init();
});