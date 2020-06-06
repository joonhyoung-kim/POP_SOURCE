var MOMFB006 = {
	init : function() {
		Language.init(function() {
			mCommon.init("grid", "W201812200048188891000VdhOj4KiAkj", null, function() {}, Language);
		});
		var that = this;
		that.comboBox();
		that.setInitData();
		that.event();
	}, grid : function() {
	}, event : function() {
		var that = this;
		//조회 버튼
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
			setTimeout(function() {
				mCommon.render("grid", "W201812200048188891000VdhOj4KiAkj", mCommon.formGetParam("#form"), function(data){
//				mCommon.pageRender("grid", "W201812200048188891000VdhOj4KiAkj", mCommon.formGetParam("#form"), function(data){
					if(data.length < 1) {
						return;
					} else {
						var transactionDate = 'transactionDate';
						var col_set1 = {
								dataField : transactionDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
						};
						
						AUIGrid.setColumnPropByDataField('grid', transactionDate, col_set1);
						
						var creationDate = 'creationDate';
						var col_set2 = {
								dataField : creationDate,
								labelFunction : function(row_index, column_index, value, header_text, item) { 
									if(value != "" && value != undefined && value != null) {
										if(value.length > 19) {
											return value.replace('T', ' ').substring(0, 19);
										} 
									}
									return '';
								}
						};
						
						AUIGrid.setColumnPropByDataField('grid', creationDate, col_set2);
						
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
					//}
//				}, "plan.order.ospIssue.ospIssue");
				});
				
			}, 500);
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
				mCommon.auiGridExcelExport("grid", {fileName: "OSP_ISSUE_MOMFB006_" + get_current_date("yyyy-mm-dd"), allData : true});
			}, 1000);
		});
		
		// 현행화 버튼
		$(document).on("click", "#uploadBtn", function() {
			if($("#fromDate").val() == '' || $("#toDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10250']});
	            return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES12380'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					micaCommon.splash.show();
					var param = {
						fromDate : $("#fromDate").val(),
						toDate : $("#toDate").val()
					}
					
					mom_ajax("C", "plan.order.ospIssue.b2biOspIssue", JSON.stringify(param), that.callbackPost);
				}
			}});
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	}, comboBox : function() {
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.organizationCode.dummy',  {}, function(data){
			micaCommon.comboBox.set("#orgCode",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "code", valueName : "code", readonly: false});
		});
	}, setInitData : function() {
		$("#fromDate").val(get_date_diff(0));
		$("#toDate").val(get_date_diff(0));
	}, callbackPost : function(result, data) {
		micaCommon.splash.hide();
		
		if(data.p_err_code == 'S') {
			mCommon.pageRender("grid", "W201812200048188891000VdhOj4KiAkj", mCommon.formGetParam("#form"), function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		} else {
			micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
		}
	}
};
$(document).ready(function(event){
	MOMFB006.init();
});