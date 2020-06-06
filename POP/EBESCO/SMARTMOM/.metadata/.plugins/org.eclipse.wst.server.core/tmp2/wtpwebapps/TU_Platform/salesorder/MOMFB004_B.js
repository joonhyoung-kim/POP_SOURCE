var vendorSiteCd = "";
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var userId = sessionStorage.getItem("userId");
var gvThat;

var MOMFB004 = {
	init: function() {
		var that = this;
		gvThat = this;
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid", "W201809101424528451005p0V1mvIB77Z", null, function(){
				that.grid();
			}, Language);
		});
		that.getDeployTime();
	}, grid: function() {
//		tuCommon.cellClick('grid');
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click","#findBtn",function(){		
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10785']});
				return;
			}
			
			micaCommon.splash.show();
//			mCommon.render("grid", "W201809101424528451005p0V1mvIB77Z", mCommon.formGetParam("#form"), function(){});
			setTimeout(function() {
				mCommon.pageRender("grid", "W201809101424528451005p0V1mvIB77Z", mCommon.formGetParam("#form"), function(data){
					if(data.length < 1) {
						return;
					} else {
						for (var i = 0; i < data.length; i++) {
							var receivingDate = 'receivingDate';
				            var col_set1 = {
								dataField : receivingDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', receivingDate, col_set1);
							
							var departureDate = 'departureDate';
				            var col_set2 = {
								dataField : departureDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', departureDate, col_set2);
							
							var transferDate = 'transferDate';
				            var col_set3 = {
								dataField : transferDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
							};
							
							AUIGrid.setColumnPropByDataField('grid', transferDate, col_set3);
						}
					}
				});
			}, 500);
			
			AUIGrid.bind("grid", 'cellClick', function(e) {
				AUIGrid.setProp("grid", "exportURL" , "1");
				setTimeout(function() {
					if(AUIGrid.getProp("grid", 'exportURL') == '0') { 
						return;
					}
					
					AUIGrid.setProp("grid", 'exportURL' , '0');
					
					var item = e.item;
					var rowIdField;
					var rowId;
					
					rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
					rowId = item[rowIdField];
					
					if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
						AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
					} else {
						AUIGrid.addCheckedRowsByIds(e.pid, rowId);
					}
				}, 200);
			});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			var items = AUIGrid.getGridData("grid");
	         if(items != undefined && items.length == 0) {
	            micaCommon.messageBox({type:"warning", width:"400", height: "145", html: "다운로드할 데이터가 존재하지 않습니다."});
	            return;
	         } else {
	            if((items[0]['rowCount'] != undefined && items[0]['rowCount'] >= 50000) || (items[0]['ROW_COUNT'] != undefined && items[0]['ROW_COUNT'] >= 50000)) {
	            	micaCommon.messageBox({type:'warning', width:'400', height: '145',  html: '데이터의 건수가 50,000건 이상입니다.<br />다운로드를 지원하지 않습니다.'});               
	               return;
	            }
	         }
			micaCommon.splash.show();
			setTimeout(function() {
				mCommon.auiGridExcelExport("grid", {fileName: "INPUTINFO_B2BI_MOMFB004_" + get_current_date("yyyy-mm-dd"), allData : true});
			}, 1000);
		});
		
		// 현행화 버튼
		$(document).on("click", "#uploadBtn", function() {
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10007'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					micaCommon.splash.show();
//					fn_b2bi_upload('com.thirautech.mom.plan.order.B2BIifrcv.b2biIfRcv', {vendorSiteCd : vendorSiteCd, b2biType : "PuscsReceivingGERP" }, that.callbackPost);
					var param = {
						divisionCd : divisionCd,
						companyCd : companyCd,
						userId : userId
					}
					
					mom_ajax("C", "plan.order.B2BIifrcv.b2biIfRcv", JSON.stringify(param), that.callbackPost, 'UP');
				}
			}});
		});
		
		// 출발정보생성 버튼
		$(document).on("click", "#createDepartureBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems('grid');
			var createArray = [];
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES11602']});
				return;
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10007'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					micaCommon.splash.show();
					for(var i = 0; i < checkedItems.length; i++) {
						createArray.push(checkedItems[i].item);
					}
					
					mom_ajax("L", "plan.order.B2BIifrcv.departureInfo", JSON.stringify(createArray), that.callbackPost, 'DEP');
				}
			}});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#poNo'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#departureNum'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#partNo'), $('#findBtn'));
	}, 
	comboBox: function() {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "LG_IF_DATE", attribute4 : "Y"}, function(data){
			micaCommon.comboBox.set("#orderSeq",{searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code", readonly: false});
		});
		
		//B2BI Vendor Site Cd 조회
		$.get(tuCommon.contextPath() +"/mom/request/com.thirautech.mom.common.comParameter.dummy", // 호출 URL
			{}, // 파라미터
			function(data){
				vendorSiteCd = data[0].b2biVendorCd;
			}
		);
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.organizationCode.dummy',  {}, function(data){
			micaCommon.comboBox.set("#organizationCode",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "code", valueName : "code", readonly: false});
		});
	}, 
	callbackPost : function(result, data, callbackParam){
		micaCommon.splash.hide();
		if(data.p_err_code == 'S'){
			mCommon.pageRender("grid", "W201809101424528451005p0V1mvIB77Z", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			if(callbackParam != 'DEP') {
				gvThat.getDeployTime();
			}
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
		}
	},
	getDeployTime : function(){
		var param = "RCV";
		$.ajax({
			type : 'GET',
			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.b2biDeployTime.dummy?b2biType=' + param,
			timeout : 30000000,
			async : false,
			dataType : 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				var deployTime = "";
				var updateBy = "";
				if(data != null && data != ""){
					deployTime = data[0].deployTime;
					updateBy = data[0].updateBy;
					$("#deployTime").text(Language.lang['MESSAGES11902'] + " " + deployTime + " / " + Language.lang['MESSAGES10747'] + " : " + updateBy);
				}
			},
			error : function(error){
				errors = error;
			},
			fail : function(){
				micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
			}
		});
	}
};
$(document).ready(function(event){
	MOMFB004.init();
});