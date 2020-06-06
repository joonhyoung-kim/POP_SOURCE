var MOMID006 = {
	preViewParams: undefined,
	init: function() {		
		var that = this;
		Language.init(function() {
			that.design();
			that.event();
		});
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'attachName', { style:"hyperStyle" } );
		AUIGrid.setColumnPropByDataField(momWidget.grid[0], 'originalFileName', { style:"hyperStyle" } );
		AUIGrid.setGridData(momWidget.grid[0], data);
		
		momWidget.splashHide();	
	},event: function(){
		// 미리보기 팝업 닫기
		$(document).on("click", ".bntpopclose, #preClosedBtn", function() {
			$("#preViewPop").momModal("hide");
		});
		
		// 설비 검색조건 변경 시 설비에 해당하는 모니터 코드 리스트만 가져오도록 이벤트 처리
	      $(document).on("change", "#resourceCd", function() {
	         // 모니터 코드 comboBox set
	         $.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comResourceMonitor.dummy', {resourceCd : $("#resourceCd").val()}, function(data) {
	            var items = [];
	            for(var i = 0; i < data.length; i++) {
	               items.push({ label: data[i]['name'], value: data[i]['code'] });
	            }
	            
	            $("#resourceMonitorCd").jqxComboBox('source', items);
	         });
	      });
	}, cellClickCallInit: function(index, e) {
		console.log("cell click");
		var that = this;

		if(index == 0) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
			if(item.length > 0) {
				this.resourceCd = item['resourceCd'];
				
			} else {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11342']});
			}
		} 
		
		preViewParams = e.item;
		if (e.dataField == "attachName" || e.dataField == "originalFileName"){
			$("#preViewPop").momModal("show");
			that.preViewImage();
		}
	}, preViewImage: function() {
		var that = this;
		var images = new Array();
 
		$(".slider-img").remove();
		mom_ajax('R', 'reference.document.workingManual.preViewWorkingManual'
				, { itemId : preViewParams.itemId
					, resourceCd: preViewParams.resourceCd		
					, resourceMonitorCd: preViewParams.resourceMonitorCd
					, attachSeq : preViewParams.attachSeq}
		, function(result, data) {
			if(data.length > 0) {				
				for(var i=0; i<data.length; i++) {
					if(data[i].attachType != null && data[i].attachType.indexOf('video') == -1) {
						if(data[i].CONTENTS != undefined) {
							images[i] = "data:" + data[i].attachType + ";base64," + data[i].attach;
							that.html = '<img class="slider-img" src="' + images[i] + '"' + ' id=' + '"' + 'image' + Number(i+1) + '"' + ' />';
						} 
					} 
				}
				$("#preview").append(that.html);
				
			}
		}, undefined, undefined, this, 'sync');
		
	}, design: function(){
		$("head").append('<style>.hyperStyle{ text-decoration: underline; color: #049cb0;}</style>');	
		$("head").append('<style>.hyperStyle :hover{ text-decoration: underline; color: #ba0615; cursor:pointer;}</style>');	
	}
};

$(document).ready(function(event){ 
	momWidget.init(1, 'MOMID006', MOMID006);
	MOMID006.init();
});