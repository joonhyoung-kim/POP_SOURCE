var productQty = 0;
var MOMEA007 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201808062058536471005xuPcvU0Da1T", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201808071020376371000msyT8MWlNCE", null, function() {
					that.grid("grid2");
				}, Language);
			}, Language);
		});
		mCommon.splitter(".h02-h", "horizontal", "50%");
		
	}, grid: function(grid) {
		var that = this;
		if(grid == "grid1") {
			AUIGrid.setColumnPropByDataField("grid1", "productQty", {style:"columnStyle"} );
			AUIGrid.setProp("grid1", { "editBeginMode" : "click"} );
			AUIGrid.bind("grid1", "cellClick", function( e ) {
				var selectedItem = AUIGrid.getSelectedItems("grid1");
				if(selectedItem[0].item.productQty != null && selectedItem[0].item.productQty != '') {
					productQty = parseInt(selectedItem[0].item.productQty);
					var params = {
							oqcId : e.item.oqcId,
							productQty : productQty,
							salesOrderId : e.item.salesOrderId
					}
					
					mCommon.render("grid2", "W201808071020376371000msyT8MWlNCE", params, function(){});
				} else {
					if(e.dataField != 'productQty') {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11707']});
	                	return;
					}
				}
				
			});
			
			AUIGrid.bind("grid1", "cellEditEnd", function(e) {
				if(e.dataField == 'productQty') {
					if(e.item.productQty > e.item.remainQty) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11708']});
						AUIGrid.setCellValue("grid1", e.rowIndex, "productQty", e.oldValue);
					} else {
						AUIGrid.setCellValue("grid1", e.rowIndex, "productQty", e.value);
					}
				}
			});
			
		} else {
			AUIGrid.setSelectionMode("grid2", "singleCell");
			//Edit 가능한 컬럼
			AUIGrid.setColumnPropByDataField("grid2", "itemValue1", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue2", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue3", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue4", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue5", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "processDescription", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "handlingTime", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "reasonName", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "problemReason", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "defectBy", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "description", {style:"columnStyle"} );
			
			// 출하검사 하단 그리드 콤보박스 설정 
			var processDescriptionUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy' +'?codeClassId' + '=' +'HANDLING_FLAG';
			var reasonCodeUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy' +'?codeClassId' + '=' +'IQC_REASON_CODE';
			
			//처리일 달력
			that.datePickerSet("grid2", "handlingTime", "CalendarRenderer", false);

			//처리, 불량코드 콤보
			that.gridComboBoxSet("grid2", processDescriptionUrl, "processDescription", "DropDownListRenderer", true);
			that.gridComboBoxSet("grid2", reasonCodeUrl, "reasonName", "DropDownListRenderer", true);
			
			var itemValues = ["itemValue1", "itemValue2", "itemValue3", "itemValue4", "itemValue5"];
			var colLayout = AUIGrid.getColumnLayout("grid2");
			for(var i = 0; i < itemValues.length; i++) {
				var colIndex = AUIGrid.getColumnIndexByDataField("grid2", itemValues[i]);
				var col = colLayout[colIndex];
				col.editRenderer = {	
					type : "ConditionRenderer",
					conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
						switch(item.measureMethod) {
						case "COUNT": 					// 계수
							return {"type":"DropDownListRenderer","list":["OK", "NG"]};
						case "NUMBERLESS": 					// 계측
							return {"type":"InputEditRenderer"};
						}
					}
				}
				AUIGrid.setColumnProp( "grid2", colIndex, col );
			}
			
			AUIGrid.bind(grid, "cellEditBegin", function(e) {
				var item = AUIGrid.getSelectedItems('grid1')[0].item;
				var sampleCnt = e.item.sampleCnt < item.productQty ? e.item.sampleCnt : item.productQty;
				if(e.dataField.indexOf("itemValue") > -1) {
					var number = Number(e.dataField.replace("itemValue", ""));
					if(number > sampleCnt) {
						return false;
					}
				}
				
				AUIGrid.setProp(grid, 'exportURL', '0');
			});
			
			// 불량코드 선택 시 해당하는 코드값 조회(grid combo)
			AUIGrid.bind("grid2", "cellEditEnd", function(e) {
				var item = AUIGrid.getSelectedItems('grid2')[0].item;
				
				$.ajax({
					type : 'GET',
					url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
					timeout : 30000000,
					async : false,
					data : {codeClassId : 'IQC_REASON_CODE', codeId : e.value},
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(e.value != "") {
							AUIGrid.updateRow("grid2", { "reasonCode" : data[0].code }, e.rowIndex);
						} else {
							AUIGrid.updateRow("grid2", { "reasonCode" : null }, e.rowIndex);
						}
					},
					error : function(error){
						errors = error;
					},
					fail : function(){
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
			});
			
			tuCommon.cellClick('grid2');
			
			AUIGrid.setProp("grid2", { "editBeginMode" : "click"} );
		}
	}, event: function() {
		var that = this;
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid1", "W201808062058536471005xuPcvU0Da1T", mCommon.formGetParam("#node"), function(){});
		});
		
		// 저장
		$(document).on("click", "#saveBtn", function() {
			var detailItems = AUIGrid.getGridData("grid2");
				for(var i=0; i<detailItems.length; i++) {
					detailItems[i].buttonState = "SAVE";
				}
				
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("D", "quality.productShippingPlanCheck.productShippingPlanCheckTemp", "{}", that.delCallBack, detailItems);
				}
			}});
		});
		
		// 검사완료
		$(document).on("click", "#passBtn", function() {
			var detailItems = AUIGrid.getGridData("grid2");
			for(var i=0; i<detailItems.length; i++) {
				detailItems[i].buttonState = "FINISH";
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10123'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("D", "quality.productShippingPlanCheck.productShippingPlanCheckTemp", "{}", that.delCallBack, detailItems);
				}
			}});
		});
		
		tuCommon.addKeyDown($(document), $('#node'), $('#findBtn'));
	},
	comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 고객사
		mCommon.comboBoxClickCall("#customerId", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#customerId",comboOptions, options);
					callBack();
				}
			);
		});
	},
	gridComboBoxSet: function(grid, url, field, type, showFg) {
		var lists;
		var errors;
		
		getComboList();
		
		function getComboList(){
			$.ajax({
				type : 'GET',
				url : url,
				timeout : 30000000,
				async : false,
				dataType : 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					lists = data;
				},
				error : function(error){
					errors = error;
				},
				fail : function(){
					micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
				}
			});
		}
		
		var colSet = {
			dataField : field,
			labelFunction : function(rowIndex, columnIndex, value, headerText, item) { 
				var retStr = "";
				for(var i=0,len=lists.length; i<len; i++) {
					if(lists[i]["code"] == value) {
						retStr = lists[i]["name"];
						break;
					}
				}
				return retStr == "" ? value : retStr;
			},
			editRenderer : {
				type : type,
				showEditorBtnOver : showFg, // 마우스 오버 시 에디터버턴 보이기
				list : lists,
				keyField : "code",
				valueField : "name"				
			}
		};
		
		AUIGrid.setColumnPropByDataField(grid, field, colSet);
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	datePickerSet : function(grid, field, type, showExDay) {
		var requestDateColumn = AUIGrid.getColumnItemByDataField(grid, field);
		requestDateColumn.editRenderer = {
				type : type,
	            showExtraDays : showExDay,
	            openDirectly : true,
		   		onlyCalendar : false,
		        titles : [Language.lang['MESSAGES11017'], Language.lang['MESSAGES10968'], Language.lang['MESSAGES11636'], Language.lang['MESSAGES10715'], 
	        	      	  Language.lang['MESSAGES10416'], Language.lang['MESSAGES10247'], Language.lang['MESSAGES11510']]
		}
		AUIGrid.setColumnPropByDataField(grid, field, requestDateColumn);
		
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	delCallBack : function(result, data, param, callbackParam){
		var that = this.MOMEA007;
		var arrayList = [];
		var items = AUIGrid.getGridData("grid2");
		if(result == "SUCCESS"){
			for(var i = 0; i < items.length; i++){
				items[i].measureType = "OQC";
				items[i].buttonType = callbackParam.buttonState;
				items[i].productQty = productQty;
				arrayList.push(items[i]);
			}
			mom_ajax('L', 'quality.productShippingPlanCheck.productShippingPlanCheckTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMEA007;
		if(result == "SUCCESS"){
			if(callbackParam.length > 0){
				mom_ajax('C', 'quality.productShippingPlanCheck.productShippingPlanCheck', "{}", that.listCallbackPost);
			}
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	listCallbackPost : function(result, data){
		var that = this.MOMEA007;
		if(result == "SUCCESS"){
			mdParam = {
					salesOrderId : data.salesOrderId,
					productQty : productQty,
					oqcId : data.oqcId,
					
				}
			mCommon.render("grid2", "W201808071020376371000msyT8MWlNCE", mdParam, function(){
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		}else{
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
};
$(document).ready(function(event){
	MOMEA007.init();
});