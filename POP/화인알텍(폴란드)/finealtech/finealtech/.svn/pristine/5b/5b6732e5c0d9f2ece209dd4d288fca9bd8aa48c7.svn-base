var closeType ='';
var closeTypeName ='';
var locationParam = mCommon.getSearchParam();
var btnType = '';
var vendorCd = '';
var endSeq = '';
var endFlag = '';
var strEndMonth = '';
var taxFlag = '';

var MOMHA005 = {
	init: function() {
		var that = this;
		if(locationParam.inoutFlag == "I"){
			title = Language.lang['MESSAGES11724'];
			etcTitle = Language.lang['MESSAGES11109'];
			popTitle = Language.lang['MESSAGES11107'];
		}else{
			title = Language.lang['MESSAGES11725'];
			etcTitle = Language.lang['MESSAGES11726'];
			popTitle = Language.lang['MESSAGES11727'];
		}
		$("#label-id").text(title);
		$("#labelText1").text(title);
		$("#labelText2").text(etcTitle);
		$("#labelText3").text(popTitle);
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201812120951257561001henburUPPs3", null, function() {
				that.grid("grid1");
				mCommon.init("auigrid", "W201812131615369271000zuaZPCXy1PQ", null, function() {
					that.grid("auigrid");
				}, Language);
				mCommon.init("grid2", "W201812121539303011000OLT5PieM3p1", null, function() {
					that.grid("grid2");
				}, Language);
			}, Language);
			mCommon.init("auigrid-2", "W20181212180449214100049r1J5ptFKi", null, function() {
				that.grid("auigrid-2");
			}, Language);
		});
		
		mCommon.splitter(".h01-h", "horizontal", "50%");
	}, 
	grid: function(grid) {
		var that = this;
		//AUIGrid.setSelectionMode(grid, "none");
		if(grid == "grid1") {
			// 상단 그리드 셀 클릭 이벤트 설정
			AUIGrid.bind(grid, "cellClick", function(e) {
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
				var item = AUIGrid.getSelectedItems("grid1");
				vendorCd = e.item.vendorCd;
				endSeq = item[0].item.endSeq;
				endFlag = item[0].item.endFlag;
				taxFlag = item[0].item.taxFlag;
				if(e.dataField == "inoutAmount") {
					// 매입출금액 셀 클릭 시 하단 그리드 조회
					closeType = 'INOUT';
					closeTypeName = Language.lang['MESSAGES11728'];
					mCommon.render("grid2", "W201812121539303011000OLT5PieM3p1", {inoutFlag : locationParam.inoutFlag, vendorCd : vendorCd, endSeq : endSeq, category : "INOUT"}, function(){
						that.setText();
					});
				} else if(e.dataField == "returnAmount") {
					// 반품금액 셀 클릭 시 하단 그리드 조회
					closeType = 'RETURN';
					closeTypeName = Language.lang['MESSAGES11729'];
					mCommon.render("grid2", "W201812121539303011000OLT5PieM3p1", {inoutFlag : locationParam.inoutFlag, vendorCd : vendorCd, endSeq : endSeq, category : "RETURN"}, function(){
						that.setText();
					});
				} else if(e.dataField == "noEndAmount") {
					// 미마감금액 셀 클릭 시 하단 그리드 조회
					closeType = 'NOEND';
					var inMonth = $("#inMonth").val();
					mCommon.render("grid2", "W201812131013309091000je95uDy07fF", {inoutFlag : locationParam.inoutFlag, vendorCd : vendorCd, inMonth : inMonth}, function(){});
				} else if(e.dataField == "etcAmount") {
					$("#pop2").micaModal("show");
					$(window).resize(); //그리드 사이즈 재조정
					mCommon.render("auigrid", "W201812131615369271000zuaZPCXy1PQ", {inoutFlag : locationParam.inoutFlag, endSeq : item[0].item.endSeq}, function(){});
				}
				that.grid("grid2");
			});
			
			AUIGrid.setColumnPropByDataField(grid, "inoutAmount", {style:"columnChange",
				dataType : "numeric",
				formatString : "#,##0.###0"});
			AUIGrid.setColumnPropByDataField(grid, "returnAmount", {style:"columnChange",
				dataType : "numeric",
				formatString : "#,###0.###0"});
			AUIGrid.setColumnPropByDataField(grid, "etcAmount", {style:"columnChange",
				dataType : "numeric",
				formatString : "#,##0.###0"});
			AUIGrid.setColumnPropByDataField(grid, "noEndAmount", {style:"columnChange",
				dataType : "numeric",
				formatString : "#,##0.###0"});
			if(locationParam.inoutFlag == "I"){
				AUIGrid.setColumnPropByDataField(grid, "endAmount", {
					dataType : "numeric",
					labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) { 
				        var num = Number(value).toFixed(1); 
				        return AUIGrid.formatNumber((Math.round(num)),"#,##0"); 
					} 
				});
				AUIGrid.setColumnPropByDataField(grid, "endTotalAmount", {
					dataType : "numeric",
					labelFunction : function(  rowIndex, columnIndex, value, headerText, item ) { 
				        return AUIGrid.formatNumber((Math.round(value)),"#,##0"); 
					} 
				});
			}
			AUIGrid.setColumnPropByDataField(grid, "description", {style:"columnStyle"});
			
			AUIGrid.bind('grid1', 'cellEditBegin', function(e) {
				AUIGrid.setProp('grid1', 'exportURL', '0');
			});

		} else if(grid == "grid2") {
			$(".aui-grid-default-footer").css({"text-align": "right"});
			tuCommon.cellClick(grid);
			AUIGrid.setProp("grid2", { "editBeginMode" : "click"} );
			if(closeType != 'NOEND' && endFlag != 'Y') {
				AUIGrid.setColumnPropByDataField(grid, "exchangeRate", {style:"columnStyle",
					dataType : "numeric",
					formatString : "#,###.###0"});
				AUIGrid.setColumnPropByDataField(grid, "unitPrice", {style:"columnStyle",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "foreignTotalPrice", {style:"columnStyle",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "inoutPrice", {style:"columnStyle",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "inoutVat", {style:"columnStyle",
					dataType : "numeric",
					formatString : "#,##0"});
				AUIGrid.setColumnPropByDataField(grid, "description", {style:"columnStyle"});
			} else {
				AUIGrid.setColumnPropByDataField(grid, "exchangeRate", {style:"",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "unitPrice", {style:"",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "foreignTotalPrice", {style:"",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "inoutPrice", {style:"",
					dataType : "numeric",
					formatString : "#,##0.###0"});
				AUIGrid.setColumnPropByDataField(grid, "inoutVat", {style:"",
					dataType : "numeric",
					formatString : "#,##0"});
				AUIGrid.setColumnPropByDataField(grid, "description", {style:""});
			}
			
			AUIGrid.setColumnPropByDataField(grid, "totalAmount", {style:"",
				dataType : "numeric",
				formatString : "#,###.###0"});
			
			AUIGrid.bind(grid, "cellEditBegin", function(event){ 
				if(closeType == 'NOEND' || endFlag == 'Y') {
					 return false; 
				} else {
					 return true; 
				}
				 AUIGrid.setProp(grid, 'exportURL', '0');
			}); 
			
			var footerObject = [
				{
					positionField : "itemId",
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10225'] + ": " + closeTypeName;
					}
				},
				{
					dataField : "qty",
					positionField : "itemName",
					operation : "SUM",
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES11366'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
				{
					dataField : "foreignTotalPrice",
					positionField : "specification",
					operation : "SUM",
					colSpan : 3,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10935'] + ": " + AUIGrid.formatNumber(value, "#,###.###0");
					}
				},
				{
					positionField : "currencyCd",
					dataField : "inoutPrice",
					operation : "SUM",
					colSpan : 3,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10966'] + ": " + AUIGrid.formatNumber(value, "#,###.###0");
					}
				},
				{
					dataField : "inoutVat",
					positionField : "foreignTotalPrice",
					operation : "SUM",
					colSpan : 3,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES10492'] + ": " + AUIGrid.formatNumber(value, "#,##0");
					}
				},
				{
					dataField : "totalAmount",
					positionField : "totalAmount",
					operation : "SUM",
					colSpan : 3,
					labelFunction : function(value, columnValues, footerValues) {
						return Language.lang['MESSAGES11365'] + ": " + AUIGrid.formatNumber(value, "#,###.###0");
					}
				},
			]
			// footer 합계
			AUIGrid.setFooter(grid, footerObject);
			
			AUIGrid.bind(grid, "cellEditEnd", function(event){ 
		        if(event.dataField == "exchangeRate") { 
		        	 var grid2length = AUIGrid.getGridData(grid).length;
					 var item = AUIGrid.getItemByRowIndex(grid, event.rowIndex);
					 for(var i = event.rowIndex + 1; i < grid2length; i++) {
						 AUIGrid.setCellValue("grid2", i, "exchangeRate", item.exchangeRate);
					 }
				 }
				 AUIGrid.setProp(grid, 'exportURL', '0');
			}); 
			
		} else if(grid == "auigrid") {
			AUIGrid.bind(grid, "cellClick", function(e) {
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
				that.setMaterialMonthlyCloseEtcPop();
				
			});
		} else if(grid == "auigrid-2") {
			tuCommon.cellClick(grid);
			AUIGrid.setColumnPropByDataField(grid, "remainQty", {style:"columnStyle"});
			AUIGrid.setColumnPropByDataField(grid, "conversionUnitQty", { style:"columnStyle" } );
			
			// 마감수량 변경 시 환산수량 같이 변경
			AUIGrid.bind(grid, "cellEditEnd", function( event ) {
				if(event.dataField == "remainQty") {
					AUIGrid.setCellValue(grid, event.rowIndex, "conversionUnitQty", event.item.remainQty * event.item.itemConversionUnitQty);
				}
			});
		}
	}, 
	event: function() {
		var that = this;
		//상단 조회
		$("#findBtn").click(function() {
			var param = mCommon.formGetParam("#node");
			param.inoutFlag = locationParam.inoutFlag;
			mCommon.render("grid1", "W201812120951257561001henburUPPs3", param, function(){
				AUIGrid.clearGridData("grid2");
			});
		});
		
		//상단 등록 버튼(팝업창 호출)
		$("#mCreateBtn").click(function() {
			var month = $("#inMonth").val().split("-")[1] - 0;
			that.setMaterialMonthlyClosePop();
			$("#pop1").micaModal("show");
			if($("#inMonth").val() != '') {
				$("#closeDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date($("#inMonth").val().split("-")[0], month, 0)));
			}
		});
		
		//상단 등록 팝업의 저장 버튼
		$("#pmCreateBtn").click(function() {
			if($("#pVendorName").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
				return;
			}
			
			if($("#closeType").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11730']});
				return;
			}
			
			if($("#closeGroup").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11731']});
				return;
			}
			
			if($("#currency").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11657']});
				return;
			}
			
			if($("#closeDate").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11732']});
				return;
			}
			
			if($("#taxType").val() == "") {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11733']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11734'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					var param = that.getMaterialMonthlyClosePop();
					param.inoutFlag = locationParam.inoutFlag;
					btnType = 'M';
					mom_ajax("C", "close.materialMonthlyClosing.materialMonthlyClosing", JSON.stringify(param), that.callBack, true);
				}
			}});
		});
		
		//마감 버튼
		/*
		$("#confirmBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"마감할 행을 선택 해 주세요."});
				return;
			}
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:"선택된 정보를 마감하시겠습니까? ", closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								endFlag : 'Y',
								endSeq : checkedItems[i].item.endSeq,
								inoutFlag : checkedItems[i].item.inoutFlag,
								endAmount : checkedItems[i].item.endAmount,
								endVat : checkedItems[i].item.endVat,
								endTotalAmount : checkedItems[i].item.endTotalAmount,
							}
							
							arrayList.push(param);
						}
						btnType = 'M';
						mom_ajax("L", "close.materialMonthlyClosing.materialMonthlyClosingConfirm", JSON.stringify(arrayList), that.callBack, true);
					}
				}});
			}
		});
		
		//마감취소 버튼
		$("#cancelConfirmBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"마감취소할 행을 선택 해 주세요."});
				return;
			}
			
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.close.materialMonthlyClosing.lastCloseMonth.dummy",
				type : "GET",
				data : {buySaleFlag : locationParam.inoutFlag},
				async: false,
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					strEndMonth = data[0].endMonth;
				},
				error: function(data){},
				fail : function(data){}
			});
			
			var endMonth = strEndMonth.replace("-","");
			var selMonth = $("#inMonth").val().replace("-","");
			
			if(Number(endMonth) >= Number(selMonth)){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:strEndMonth + " 월마감이 되어 있어 취소 할 수 없습니다."});
				return;
			}
			
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10659'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								endFlag : 'N',
								endSeq : checkedItems[i].item.endSeq,
								inoutFlag : checkedItems[i].item.inoutFlag
							}
							
							arrayList.push(param);
						}
						btnType = 'M';
						mom_ajax("L", "close.materialMonthlyClosing.materialMonthlyClosingConfirm", JSON.stringify(arrayList), that.callBack, true);
					}
				}});
			}
		});
		*/
		
		//수정 버튼
		$("#editBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var arrayList = [];
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11336']});
				return;
			}
			/*
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.endFlag == "Y"){
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10352']});
					return;
				}
			}
			*/
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10650'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								endSeq : checkedItems[i].item.endSeq,
								description : checkedItems[i].item.description,
								inoutFlag : checkedItems[i].item.inoutFlag
							}
							
							arrayList.push(param);
						}
						btnType = 'M';
						mom_ajax("L", "close.materialMonthlyClosing.materialMonthlyClosings", JSON.stringify(arrayList), that.callBack, true);
					}
				}});
			}
		});
		
		//삭제 버튼
		$("#mDelBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid1");
			var endFlag = false;
			
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11334']});
				return;
			}
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i].item.endFlag == 'Y') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10361']});
					return;
				}
				if(checkedItems[i].item.inoutAmount > 0 || checkedItems[i].item.returnAmount > 0 || checkedItems[i].item.etcAmount > 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11316']});
					return;
				}
			}
			
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10649'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								endSeq : checkedItems[i].item.endSeq,
								inoutFlag : checkedItems[i].item.inoutFlag
							}
							
							if(i == checkedItems.length -1){
								btnType = 'M';
								endFlag = true;
							}
							
							mom_ajax("D", "close.materialMonthlyClosing.materialMonthlyClosing", JSON.stringify(param), that.callBack, endFlag);
						}
						
					}
				}});
			}
		});
		
		//엑셀 다운로드(상단 그리드)
		$("#excelDownBtn").click(function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "MATERIAL_MONTHLY_CLOSE_MOMHA005_" + get_current_date("yyyy-mm-dd")});
		});
		
		//상단 등록 팝업의 취소, 닫기 버튼
		$("#pmCancelBtn, .bntpopclose").click(function() {
			$("#pop1").micaModal("hide");
		});
		
		//상단 기타처리금액 팝업 취소, 닫기 버튼
		$("#pCancelBtn, .bntpopclose").click(function() {
			$("#pop2").micaModal("hide");
			$("#partNo").val("");
			$("#qty").val("");
			$("#inputDate").val("");
			$("#price").val("");
			$("#vat").val("");
			$("#pmDescription2").val("");
			var param = mCommon.formGetParam("#node");
			param.inoutFlag = locationParam.inoutFlag;
			mCommon.render("grid1", "W201812120951257561001henburUPPs3", param, function(){
				AUIGrid.clearGridData("auigrid-2");
			});
		});
		
		//기타처리금액 팝업 계산 버튼 
		$("#pCalcBtn").click(function() {
			var price = $("#price").val();
			if(taxFlag == 'TAX_FREE' || taxFlag == 'TAX_ZERO') {
				$("#vat").val(0);
			} else{
				$("#vat").val(Math.floor(price * 0.1));
			}
			
			
		});
		
		//기타처리금액 팝업 등록 버튼 
		$("#pmCreateBtn2").click(function() {
			var items = AUIGrid.getSelectedItems("grid1");
			var param = that.getMaterialMonthlyCloseEtcPop();
			param.magamSeq = items[0].item.endSeq;
			param.inoutFlag = items[0].item.inoutFlag;
			param.currencyCd = items[0].item.currencyCd;
			param.vendorCd = items[0].item.vendorCd;
			param.inoutFlag = locationParam.inoutFlag;
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10261'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					btnType = 'mP';
					mom_ajax("C", "close.materialMonthlyClosing.materialMonthlyClosingEtc", JSON.stringify(param), that.callBack, true);
				}
			}});
		});
		
		//기타처리금액 팝업 수정 버튼 
		$("#pEditBtn").click(function() {
			var param = that.getMaterialMonthlyCloseEtcPop();
			var item = AUIGrid.getSelectedItems("auigrid");
			param.magamSeq = item[0].item.magamSeq;
			param.magamDetailSeq = item[0].item.magamDetailSeq;
			param.inoutFlag = locationParam.inoutFlag;
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10263'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					btnType = 'mP';
					mom_ajax("U", "close.materialMonthlyClosing.materialMonthlyClosingEtcs", JSON.stringify(param), that.callBack, true);
				}
			}});
		});
		
		//기타처리금액 팝업 삭제버튼 
		$("#pDelBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("auigrid");
			var chkFlag = false;
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10580']});
				return;
			}
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10262'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
									magamSeq : checkedItems[i].item.magamSeq,
									magamDetailSeq : checkedItems[i].item.magamDetailSeq,
									inoutFlag : locationParam.inoutFlag
							}
							if(i == checkedItems.length - 1) {
								chkFlag = true;
							}
						btnType = 'mP';
						mom_ajax("D", "close.materialMonthlyClosing.materialMonthlyClosingEtc", JSON.stringify(param), that.callBack, true);
						}
					}
				}});
		});
		
		//하단 등록 팝업창 오픈
		$("#dCreateBtn").click(function() {
			if(closeType == 'NOEND') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10423']});
				return;
			}
			if(endFlag == 'Y') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10360']});
				return;
			}
			var month = $("#inMonth").val().split("-")[1] - 0;
			$("#fromDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date($("#inMonth").val().split("-")[0], month -1)));
	        $("#toDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date($("#inMonth").val().split("-")[0], month, 0 )));
			var seletedItems = AUIGrid.getSelectedItems("grid1");
			var grid2Items = AUIGrid.getGridData("grid2");
			if(seletedItems.length == 0 && grid2Items.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10366']});
				return;
			} else {
				$("#pop3").micaModal("show");
				that.setMaterialMonthlyCloseDetailPop();
				$(window).resize(); //그리드 사이즈 재조정
			}
		});
		
		//하단 등록 팝업창 닫기
		$("#pdCancelBtn, .bntpopclose").click(function() {
			$("#pop3").micaModal("hide");
			AUIGrid.clearGridData("auigrid-2");
		});
		
		//하단 등록 팝업에서 조회
		$("#pFindBtn-2").click(function() {
			var param = mCommon.formGetParam(".panelbody #form");
			param.vendorCd = vendorCd;
			param.inoutFlag = locationParam.inoutFlag;
			param.category = closeType;
			mCommon.render("auigrid-2", "W20181212180449214100049r1J5ptFKi", param, function(){});
		});
		
		//하단 등록 팝업에서 저장
		$("#pdCreateBtn").click(function() {
			var checkedDetailItems = AUIGrid.getCheckedRowItems("auigrid-2");
			
			if(checkedDetailItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11324']});
				return;
			}
			
			var param = {
				divisionCd : sessionStorage.getItem("divisionCd"),
				companyCd : sessionStorage.getItem("companyCd"),
				inoutFlag : locationParam.inoutFlag,
				category : closeType
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10657'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					btnType = 'dP';
					mom_ajax("D", "close.materialMonthlyClosing.materialMonthlyClosingDetailPop", JSON.stringify(param), that.callBack, "delCall");
				}
			}});
			
		});
		
		//하단 저장
		$("#saveBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var arrayList = [];
			if(closeType == 'NOEND') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10425']});
				return;
			}
			if(endFlag == 'Y') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10362']});
				return;
			}
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11336']});
				return;
			} 
			
			for(var i = 0; i < checkedItems.length; i++) {
				var unitPrice = "";
				var foreignUnitPrice = "";
				var defCurrency = checkedItems[i].item.defaultCurrency;
				var currencyCd = checkedItems[i].item.currencyCd;
				
				if(currencyCd == defCurrency){
					unitPrice = checkedItems[i].item.unitPrice;
				}else{
					unitPrice = checkedItems[i].item.unitPrice * checkedItems[i].item.exchangeRate;
					foreignUnitPrice = checkedItems[i].item.unitPrice;
				}
				
				var param = {
						category : closeType,
						inoutFlag : locationParam.inoutFlag,
						exchangeRate : checkedItems[i].item.exchangeRate,
						unitPrice : unitPrice,
						foreignUnitPrice : foreignUnitPrice,
						foreignTotalPrice : checkedItems[i].item.foreignTotalPrice,
						inoutPrice : checkedItems[i].item.inoutPrice,
						vatPrice : checkedItems[i].item.inoutVat,
						totalAmount : checkedItems[i].item.inoutPrice + checkedItems[i].item.inoutVat,
						magamSeq : checkedItems[i].item.magamSeq,
						magamDetailSeq : checkedItems[i].item.magamDetailSeq,
						description : checkedItems[i].item.description
					}
					
					arrayList.push(param);
			}
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10658'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					btnType = 'D';
					mom_ajax("L", "close.materialMonthlyClosing.materialMonthlyClosingDetailSave", JSON.stringify(arrayList), that.callBack, true);
				}
			}});
			
		});
		
		//하단 삭제
		$("#dDelBtn").click(function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			var chkFlag = false;
			if(closeType == 'NOEND') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10424']});
				return;
			}
			if(endFlag == 'Y') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10361']});
				return;
			}
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11334']});
				return;
			}
			
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10649'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								magamSeq : checkedItems[i].item.magamSeq,
								magamDetailSeq : checkedItems[i].item.magamDetailSeq,
								inoutFlag : locationParam.inoutFlag,
								category : closeType
							}
							
							if(i == checkedItems.length -1){
								btnType = 'D';
								chkFlag = true;
							}
							
							mom_ajax("D", "close.materialMonthlyClosing.materialMonthlyClosingDetail", JSON.stringify(param), that.callBack, chkFlag);
						}
						
					}
				}});
			}
		});
		
		//하단 계산
		$("#calcBtn").click(function(e) {
			if(closeType == 'NOEND') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10422']});
				return;
			}
			if(endFlag == 'Y') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10359']});
				return;
			}
			var items = AUIGrid.getCheckedRowItems("grid2");
			for(var i = 0; i < items.length; i++) {
				var index = items[i].rowIndex;
				var unitPrice = AUIGrid.getCellValue("grid2", index, "unitPrice");
				var qty = AUIGrid.getCellValue("grid2", index, "qty");
				var exchangeRate = AUIGrid.getCellValue("grid2", index, "exchangeRate");
				var defaultCurrency = AUIGrid.getCellValue("grid2", index, "defaultCurrency");
				var currencyCd = AUIGrid.getCellValue("grid2", index, "currencyCd");
				var conversionQty = AUIGrid.getCellValue("grid2", index, "conversionUnitQty");
				var calQty = 0;
				
				if(conversionQty == 0 || conversionQty == null){
					calQty = qty;
				}else {
					calQty = conversionQty;
				}
				
				if(defaultCurrency == currencyCd) {
					AUIGrid.setCellValue("grid2", index, "inoutPrice", Math.floor(calQty * unitPrice));
					AUIGrid.setCellValue("grid2", index, "foreignTotalPrice", Math.floor(calQty * unitPrice));
				} else {
					AUIGrid.setCellValue("grid2", index, "inoutPrice", Math.floor(calQty * unitPrice * exchangeRate));
					AUIGrid.setCellValue("grid2", index, "foreignTotalPrice", (Math.floor(calQty * unitPrice * 10000)/10000));
				}
				
				var inoutPrice = AUIGrid.getCellValue("grid2", index, "inoutPrice");
				
				if(taxFlag == 'TAX_FREE' || taxFlag == 'TAX_ZERO') {
					AUIGrid.setCellValue("grid2", index, "inoutVat", 0);
				} else {
					AUIGrid.setCellValue("grid2", index, "inoutVat", Math.floor(inoutPrice * 0.1));
				}
				
				var inoutVat = AUIGrid.getCellValue("grid2", index, "inoutVat");
				AUIGrid.setCellValue("grid2", index, "totalAmount", inoutPrice + inoutVat);
			}
		});
		
		//엑셀 다운로드(하단 그리드)
		$("#dExcelDownBtn").click(function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "MATERIAL_MONTHLY_CLOSE_DETAIL_MOMHA005_" + get_current_date("yyyy-mm-dd")});
		});
		
		//엑셀 다운로드(하단 등록 팝업 내)
		$("#pExcelDownBtn").click(function() {
			mCommon.auiGridExcelExport("auigrid-2", {fileName: "MATERIAL_MONTHLY_CLOSE_DETAIL_POP_MOMHA005_" + get_current_date("yyyy-mm-dd")});
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($("#node"), $('#inMonth'), $('#findBtn'));
		tuCommon.addKeyDown($("#node"), $('#vendorName'), $('#findBtn'));
		tuCommon.addKeyDown($("#node"), $('#inType'), $('#findBtn'));
	},
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//월
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comClosingMonthly.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#inMonth",{searchMode:'containsignorecase', autoComplete:true, selectedIndex:1}, options);
				}
		);
		
		
		if(locationParam.inoutFlag == 'I') {
			//구분
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{codeClassId : "RESULT_END_FLAG", attribute1 : 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#inType",{searchMode:'containsignorecase', autoComplete:true}, options);
						micaCommon.comboBox.set("#closeType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code"});
					}
			);
			
			// 업체
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : "'COOPERATIVE', 'BOTH'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorName",comboOptions, options);
					micaCommon.comboBox.set("#pVendorName",comboOptions, options);
				}
			);
		} else {
			//구분
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
					{codeClassId : "RESULT_END_FLAG", attribute2 : 'Y'}, // 파라미터
					function(data) {
						options.local = data;
						micaCommon.comboBox.set("#inType",{searchMode:'containsignorecase', autoComplete:true}, options);
						micaCommon.comboBox.set("#closeType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code"});
					}
			);
			
			// 업체
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{vendorType : "'CUSTOMER', 'BOTH'"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorName",comboOptions, options);
					micaCommon.comboBox.set("#pVendorName",comboOptions, options);
				}
			);
		}
		
		
		//환종
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "CURRENCY_CODE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#currency",{searchMode:'containsignorecase', autoComplete:true}, options);
				}
		);
		
		//세금구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "MATERIAL_TAX"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#taxType",{searchMode:'containsignorecase', autoComplete:true}, options);
				}
		);
		
		//MKT
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "MARKET_CODE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#market",{searchMode:'containsignorecase', autoComplete:true}, options);
				}
		);
		
		//자재대그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ITEM_GROUP_LARGE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#largeGroup",{searchMode:'containsignorecase', autoComplete:true}, options);
				}
		);
		
		//자재중그룹
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ITEM_GROUP_MEDIUM"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#mideumGroup",{searchMode:'containsignorecase', autoComplete:true}, options);
				}
		);
		
		//자재 P/NO 
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItem.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {itemType : "'RM', 'SM'"}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#partNo", {searchMode:'containsignorecase', autoComplete:true}, optItems);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background:  #C7E8FD;}</style>');
		$("head").append('<style>.columnChange{ background:  #bfecc7; text-align : right}</style>');
	},
	getMaterialMonthlyClosePop: function() { //상단 등록 팝업
		var result = {
			endMonth : $("#closeDate").val().substr(0, 7),
			vendorCd : $("#pVendorName").val(),
			endType : $("#closeType").val(),
			endGroup : $("#closeGroup").val(),
			currencyCd : $("#currency").val(),
			endDate : $("#closeDate").val(),
			taxFlag : $("#taxType").val(),
			description : $("#pmDescription").val()
		}
		
		return result;
	},
	setMaterialMonthlyClosePop: function(data) {
		data = data || {};
		$("#pVendorName").val(data.vendorCd || "");
		$("#closeType").val(data.endType || "");
		$("#closeGroup").val(data.closeGroup || "");
		$("#currency").val(data.currency || "");
		$("#closeDate").val(data.closeDate || "");
		$("#taxType").val(data.taxType || "");
		$("#pmDescription").val(data.description || "");
	},
	setMaterialMonthlyCloseDetailPop: function(data) { //상단 등록 팝업
		data = data || {};
		$("#itemId").val(data.itemId || "");
		$("#market").val(data.matketCd || "");
		$("#largeGroup").val(data.itemLargeGroup || "");
		$("#mideumGroup").val(data.itemMediumGroup || "");
		$("#dDescription").val(data.description || "");
	},
	setMaterialMonthlyCloseEtcPop: function() { //기타처리금액 등록 팝업
		var item = AUIGrid.getSelectedItems("auigrid");
		
		$("#partNo").val(item[0].item.itemId);
		$("#qty").val(item[0].item.qty);
		$("#price").val(item[0].item.inoutPrice);
		$("#vat").val(item[0].item.inoutVat);
		$("#inputDate").val(item[0].item.ioTime);
		$("#pmDescription2").val(item[0].item.description);
	},
	getMaterialMonthlyCloseEtcPop : function() { //기타처리금액 등록
		var param = {
				itemId : $("#partNo").val(),
				qty : $("#qty").val(),
				inoutPrice : $("#price").val(),
				inoutVat : $("#vat").val(),
				ioTime : $("#inputDate").val(),
				description : $("#pmDescription2").val()
		}
		
		return param;
	},
	setText : function() {
		var item = AUIGrid.getSelectedItems("grid1");
		$(".panelcontent .header-title").eq(2).text(Language.lang['MESSAGES10225'] + ": " + closeTypeName);
		$(".panelcontent .header-title").eq(1).text(Language.lang['MESSAGES11654'] + ": " + item[0].item.currencyCd);
		$(".panelcontent .header-title").eq(0).text(Language.lang['MESSAGES10695'] + ": " + item[0].item.taxFlagName);
	},
	callBack: function(param, data, callbackParam) {
		var that = this.MOMHA005;
		var arrayList = [];
		if(param == 'SUCCESS') {
			$("#pop1").micaModal("hide");
			if(callbackParam == true) {
				var param = mCommon.formGetParam("#node");
				param.inoutFlag = locationParam.inoutFlag;
				if(btnType == 'M') {
					mCommon.render("grid1", "W201812120951257561001henburUPPs3", param, function(){});
					AUIGrid.clearGridData("grid2");
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				} else if(btnType == 'D') {
					var checkedDetailItems = AUIGrid.getCheckedRowItems("grid2");
					mCommon.render("grid1", "W201812120951257561001henburUPPs3", param, function(){
						mCommon.render("grid2", "W201812121539303011000OLT5PieM3p1", {vendorCd : vendorCd, endSeq : endSeq, category : closeType, inoutFlag : locationParam.inoutFlag}, function(){});
					});
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				} else if(btnType == 'mP') {
					var checkedMasterItems = AUIGrid.getSelectedItems("grid1");
					mCommon.render("auigrid", "W201812131615369271000zuaZPCXy1PQ", {endSeq : endSeq, inoutFlag : locationParam.inoutFlag} , function(){});
					AUIGrid.clearGridData("grid2");
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				}
				
			} else if(callbackParam == "delCall") {
				var checkedMasterItems = AUIGrid.getSelectedItems("grid1");
				var checkedDetailItems = AUIGrid.getCheckedRowItems("auigrid-2");
				
				for(var i = 0; i < checkedDetailItems.length; i++) {
					var param = {
						endSeq : endSeq,
						itemStockInoutId : checkedDetailItems[i].item.itemStockInoutId,
						qty : checkedDetailItems[i].item.remainQty,
						closeType : closeType,
						inoutFlag : locationParam.inoutFlag,
						conversionUnitQty : checkedDetailItems[i].item.conversionUnitQty
					}
					
					arrayList.push(param);
				}
				
				mom_ajax("L", "close.materialMonthlyClosing.materialMonthlyClosingDetailPopTemp", JSON.stringify(arrayList), that.callBack, "insCall");
			} else if(callbackParam == "insCall") {
				var checkedMasterItems = AUIGrid.getSelectedItems("grid1");
				var checkedDetailItems = AUIGrid.getCheckedRowItems("auigrid-2");
				
				for(var i = 0; i < checkedDetailItems.length; i++) {
					var param = {
						closeType : closeType,
						inoutFlag : locationParam.inoutFlag
					}
				}
				
				mom_ajax("C", "close.materialMonthlyClosing.materialMonthlyClosingDetailPop", JSON.stringify(param), that.callBack, "procCall");
			} else if(callbackParam == "procCall") {
				var checkedMasterItems = AUIGrid.getSelectedItems("grid1");
				if(btnType = 'dP') {
					var param = mCommon.formGetParam("#node");
					param.inoutFlag = locationParam.inoutFlag;
					$("#pop3").micaModal("hide");
					if(closeType == 'INOUT' || closeType == 'RETURN') {
						mCommon.render("grid1", "W201812120951257561001henburUPPs3", param, function(){
							mCommon.render("grid2", "W201812121539303011000OLT5PieM3p1", {vendorCd : vendorCd, endSeq : endSeq, category : closeType, inoutFlag : locationParam.inoutFlag}, function(){});
						});
					} 
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
					AUIGrid.clearGridData("auigrid-2");
				}
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	}
	
};
$(document).ready(function(event){
	MOMHA005.init();
});