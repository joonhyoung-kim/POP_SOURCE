var userName = sessionStorage.getItem("userName");
var search = decodeURI(location.search.replace("?", ""));
var searchArr = search.split('/');
var MOMAA001 = {
	initParam : undefined,
	init : function() {
		var that = this;
		Language.init(function() {
			that.event();
		});
	},
	retrieveCallInit : function(index, param, callBackParam, indexInfo) {
		var that = this;
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex']
				: index;
		if (index == 0 && indexInfo.op == 'findBtn1') {
			// 설비코드를 쿼리 입력값으로
			that.initParam = {
				resourceCd : searchArr[0]
			};
		}

		// 작업지시조회리스트 화면 open시 자동조회
		if (index == 0 && indexInfo.op == 'INIT1') {
			that.initParam = {
				resourceCd : searchArr[0]
			};
		}
		// 특정 레코드 선택하는 더블클릭시 실행 in 작업지시조회리스트 화면
		if (index == 0 && indexInfo.op == 'CD1') {
			if (AUIGrid.getSelectedItems(momWidget.grid[0])[0].item.woStateName == '작업지시') {
				that
						.woStateChange(AUIGrid
								.getSelectedItems(momWidget.grid[0])[0].item.workOrderId);
			}
			var param = '?'
					+ 'MOMAA001/'
					+ searchArr[0]
					+ '/'
					+ searchArr[1]
					+ '/'
					+ AUIGrid.getSelectedItems(momWidget.grid[0])[0].item.workOrderId;
			window.open('complete.html' + encodeURI(param), '_self', 'height='
					+ screen.height + ',width=' + screen.width
					+ 'fullscreen=yes');
		}
	},
	woStateChange : function(woId) {
		var that = this;
		var saveItem = "";
		var goodQtyCount = 0;
		var chkFlag = false;
		var param = {
			p_serialnumber : "LOTSTART",
			p_division_cd : divisionCd,
			p_company_cd : companyCd,
			p_work_order_id : woId,
			p_wo_state : "R",
			p_shift_cd : "DAY",
			p_work_person : "1",
			p_good_qty : "0",
			p_bad_qty : "0",
			p_description : "pop실적",
			p_close_flag : "N",
			p_badcode : "BAD",
			p_destination : "",
			p_update_by : userName,
			p_short_sn : "K",
			p_long_sn : "JH"
		}
		mom_ajax("C", "pop.popResult.popworesult", JSON.stringify(param));

	},
	event : function() {
		var that = this;
		var cnt = 0;
		// 시작

		$(document)
				.on(
						"click",
						"#startBtn1",
						function() {
							// alert('>>>@@@ Hi, Print');
							
							var param = {
								divisionCd : "XMOM",
								companyCd : "XMOM",
								labelId : "P-LABEL02",
								printId : "300DPI"									
							};
							
							console.log($("html").attr("contextPath") + "/pop/request/print");
							
							$.ajax({
								url : $("html").attr("contextPath")
										+ "/pop/request/print",
								method : "get",
								data : param,
								success : function(data) {
									if (data.length > 0) {
									//	$('#write_text').val(data);
										writeToSelectedPrinter(data);
									}
								}
							});
                              
							var param = '?'
									+ 'MOMAA001/'
									+ searchArr[0]
									+ '/'
									+ searchArr[1]
									+ '/'
									+ AUIGrid
											.getSelectedItems(momWidget.grid[0])[0].item.workOrderId;
							window.open('complete.html' + encodeURI(param),
									'_self', 'height=' + screen.height
											+ ',width=' + screen.width
											+ 'fullscreen=yes');
						});

		// 닫기
		$(document).on(
				"click",
				"#closeBtn1",
				function() {
					if (searchArr[2] == '작업지시조회') // 작업지시번호 없다면=처음시작한화면
					{
						var param = '?' + 'MOMAA001/' + searchArr[0] + '/'
								+ searchArr[1];
					} else {
						var param = '?' + 'MOMAA001/' + searchArr[0] + '/'
								+ searchArr[1] + '/' + searchArr[2];
					}
					window.open('complete.html' + encodeURI(param), '_self',
							'height=' + screen.height + ',width='
									+ screen.width + 'fullscreen=yes');
				});
		
		

	}
};
$(document).ready(function(event) {
	momWidget.init(1, 'MOMAA001', MOMAA001);
	MOMAA001.init();
});