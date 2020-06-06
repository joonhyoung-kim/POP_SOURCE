var userId = sessionStorage.getItem("userId");
var MOMXX004 = {
	init : function() {
		var that = this;
		Language.init(function(){
			that.event();
			that.design();
		});
	},
	event : function() {
	}, 
	retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		momWidget.splashHide();
		AUIGrid.setGridData(momWidget.grid[0], data);
		var noticeId;
		var allData = data;
		$.ajax({
			url 		: tuCommon.contextPath() + '/mom/request/com.thirautech.mom.admin.noticeBoard.dummy',
			type 		: 'GET',
			data 		: {popFlag : 'N'},
			async		: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success 	: function(data){
				if(data.length > 0) {
					noticeId = data[0].boardKey;
					for(var i = 0; i < allData.length; i++) {
					  // 현 공지사항(팝업 또는 상단) 스타일 지정
						AUIGrid.setProp(momWidget.grid[0], 'rowStyleFunction', function(rowIndex, item) {
							if(noticeId == item.boardId && item.noticeYn == 'Y') {
								return 'my-row-style';
							} else {
								return 'my-row-style-none';
							}
						});
					}
					AUIGrid.update(momWidget.grid[0]);
				}
				
				
			}
		});
			
		
	},
	createCallInit: function(index, param, callBackParam, indexInfo) {
		if(index != 0) {
			return;
		}
		if(param == undefined) {
			return;
		}
		if(indexInfo.op == 'copyBtn1') {
		   $("#boardIdEP1").val("");
		   $("#boardTypeEP1, #useYnEP1, #systemYnEP1, #noticeYnEP1").jqxComboBox({disabled: false});
		   $("#boardTitleEP1, #boardContentsEP1").attr("readonly", null);
	   }
		if(userId != param.updateBy) {
			  if(indexInfo.op == 'editBtn1') {
				   $("#boardTypeEP1, #useYnEP1, #systemYnEP1, #noticeYnEP1").jqxComboBox({disabled: true});
				   $("#boardTitleEP1, #boardContentsEP1").attr("readonly", "readonly");
			   } else {
				   $("#boardTypeEP1, #useYnEP1, #systemYnEP1, #noticeYnEP1").jqxComboBox({disabled: false});
				   $("#boardTitleEP1, #boardContentsEP1").attr("readonly", null);
			   }
		}
	},
	 design: function() {
			$('head').append('<style>.my-row-style{background:#D8D8D8;font-weight:bold;color:#000;}</style>');
			$('head').append('<style>.my-row-style-none{background:#fff;font-weight:normal;color:#333;}</style>');
		}
};

$(document).ready(function(event) {
	momWidget.init(1, 'MOMXX004', MOMXX004);
	MOMXX004.init();
});
