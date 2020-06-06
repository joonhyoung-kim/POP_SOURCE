var userId = sessionStorage.getItem("userId");
var cudFlag;
var shiftStartTime, shiftEndTime;
var gridStartTime, gridEndTime, gridShiftType, gridShiftTypeName, gridWorkTime, gridOffTime, gridRealWorkTime;
var hDate;
var tResources = '';
var selShiftType;
var gridShiftCdList = [];

var MOMIE003 = {
	init: function() {		
		var that = this;
		var title;
		$("#label-id").text(title);
		that.design();
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201905281045448591002f60CN14pbBb", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: title});
				that.comboBox();
			}, Language);
		});
	}, grid: function() {
		var that = this;
		$("#fromDate").val(get_current_date("YYYY-MM-DD"));
		$("#toDate").val(get_date_diff(30));
		tuCommon.cellClick('grid');	
		
		AUIGrid.setColumnPropByDataField( "grid", "shiftCd", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "workPersonCnt", { style:"columnStyle" } );
		AUIGrid.setColumnPropByDataField( "grid", "workIndrPersonCnt", { style:"columnStyle" } );
		
		// shift Code 그리드 콤보박스 리스트 조회 
		var shiftCodeUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy' + '?useYn=' + 'Y';
		
		// shift Code 그리드 콤보 셋업
		that.gridComboBoxSet("grid", shiftCodeUrl, "shiftCd", "DropDownListRenderer", true);
		
		// shift Code 그리드 콤보 수정 시 해당 shift의 시작시간, 죵료시간 조회하여 매핑
		AUIGrid.bind("grid", "cellEditEnd", function(e) {
			 if(e.dataField == "shiftCd") {
				 $.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.resourceByShiftPlanSchedule.dummy",
					type : "GET",
					async: false,
					data : {resourceCd : e.item.resourceCd, applyDate : e.item.applyDate},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							for(var i=0; i<data.length; i++) {
								gridShiftCdList[i] = "";
								gridShiftCdList[i] += data[i].hShiftCd;
							}
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				 
				 $.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy",
					type : "GET",
					async: false,
					data : {shiftCodeId : e.item.shiftCd},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							gridShiftType = data[0].shiftType;
							gridStartTime = data[0].startTime;
							gridEndTime = data[0].endTime;
							AUIGrid.setCellValue("grid", e.rowIndex, "shiftType", gridShiftType);
							AUIGrid.setCellValue("grid", e.rowIndex, "startTime", gridStartTime);
							AUIGrid.setCellValue("grid", e.rowIndex, "endTime", gridEndTime);
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				 
				 $.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.shiftTypeName.dummy",
					type : "GET",
					async: false,
					data : {gridShiftType : gridShiftType},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							if(data[0].shiftTypeName != "NULL") {
								gridShiftTypeName = data[0].shiftTypeName;
								AUIGrid.setCellValue("grid", e.rowIndex, "shiftTypeNm", gridShiftTypeName);
							} else {
								AUIGrid.setCellValue("grid", e.rowIndex, "shiftTypeNm", "");
							}
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				 
				 $.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.shiftTime.dummy",
					type : "GET",
					async: false,
					data : {shiftCd : e.item.shiftCd},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							gridWorkTime = data[0].workTime;
							gridOffTime = data[0].offTime;
							gridRealWorkTime = gridWorkTime - gridOffTime;
							AUIGrid.setCellValue("grid", e.rowIndex, "workTime", gridWorkTime);
							AUIGrid.setCellValue("grid", e.rowIndex, "offTime", gridOffTime);
							AUIGrid.setCellValue("grid", e.rowIndex, "realWorkTime", gridRealWorkTime);
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				 
				 if(gridShiftCdList.includes(e.item.shiftCd)) {
					 that.gridBefore();
					 micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11877']});
					 return;
				 }
			 }
			 AUIGrid.setProp('grid', 'exportURL', '0');
		});
		
	}, event: function() {
		var that = this;
	
		// 조회 버튼
		$(document).on("click", "#findBtn", function() {
			var param =  mCommon.formGetParam("#form");
			if($("#resourceCd").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10685']});
				return;
			}
			mCommon.render("grid", "W201905281045448591002f60CN14pbBb", param, function(){});
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			that.setResourceShiftSchedulePop("", "C");
			cudFlag = "L";
			$("#pop").micaModal("show");
			$("#pStartTime, #pEndTime").attr("readonly", "readonly");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "RESOURCE_BY_SHIFT_SCHEDULE_MOMIE003_" + get_current_date("yyyy-mm-dd")});
		});
				
		// 팝업 저장 버튼
		$(document).on("click", "#rSaveBtn", function() {
			var shiftType = "";
			var arrayList = [];
			var applyDate = [];
			
			if($("#pResourceCd").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10685']});
				return;
			}
			
			if($("#pApplicationDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11200']});
				return;
			}
			
			if($("#pShiftCode").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11692']});
				return;
			}
			
			if($("#pStartTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10788']});
				return;
			}
			
			if($("#pEndTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11236']});
				return;
			}
			
			setTimeout(function() {
				$.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy",
					type : "GET",
					async: false,
					data : {shiftCodeId : $("#pShiftCode").val()},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							shiftType = data[0].shiftType;
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				
				// 등록, 복사하여 저장 시 해당 설비의 시작 ~ 종료일 기준 주/야간 타입의 기등록된 Shift 있는지 체크
				$.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.overlapShiftSchedule.dummy",
					type : "GET",
					async: false,
					data : {pResourceCd : "'" + $("#pResourceCd").val() + "'", pStartDate : $("#pStartDate").val(), pEndDate : $("#pEndDate").val(), shiftType : shiftType},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0 && data[0].cnt > 0) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11864']});
							return;
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
			 }, 100);
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					micaCommon.splash.show();
					var param = that.getResourceShiftSchedulePop();
					if(param.startDate != '' && param.endDate != '') {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.searchDate.dummy",
							type : "GET",
							async: false,
							data : {fStartDate : param.startDate, fEndDate : param.endDate},
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									for(var i=0; i<data.length; i++) {
										applyDate[i] = "";
										applyDate[i] += data[i].solarDate;
									}
								}
							},
							error: function(data){},
							fail : function(data){}
						});
					}
					
					for(var i=0; i<applyDate.length; i++) {
						var listParam = {
							shiftCd : param.shiftCd,
							shiftType : shiftType,
							startTime : param.startTime,
							endTime : param.endTime, 
							resourceCd : param.resourceCd,
							workPersonCnt : param.workPerson,
							workIndrPersonCnt : param.workIndrPersonCnt,
							applyDate : applyDate[i]
						}
							
						arrayList.push(listParam);
					}
					
					mom_ajax(cudFlag, "reference.workinghours.resourceByShiftPlanSchedule.resourceByShiftPlanSchedule", JSON.stringify(arrayList), that.listCallbackPost);
					
					$(".modal").micaModal("hide");
				}
			}});
		});
		
		//복사 버튼
		$(document).on("click", "#copyBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "L";
				that.setResourceShiftSchedulePop(checkedItems[0].item, "CP");
			}
			$("#pop").micaModal("show");
			$("#pStartTime, #pEndTime").attr("readonly", "readonly");
		});
		
		// 선택 휴일 적용(삭제) 버튼
		$(document).on("click", "#delBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			/* modify hists
			 * 20191025_005 / 20191105 / yjp / 선택휴일적용시 list로 넘겨서 처리되도록 변경
			 */
			/* start 20191025_005 */
			var arrayList = [];
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES12096'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						micaCommon.splash.show();
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								shiftType : checkedItems[i].item.shiftType,
								shiftCd : checkedItems[i].item.shiftCd,
								resourceCd : checkedItems[i].item.resourceCd,
								applyDate : checkedItems[i].item.applyDate,
								startTime : checkedItems[i].item.startTime,
								endTime : checkedItems[i].item.endTime,
								workPersonCnt : checkedItems[i].item.workPersonCnt,
								workTime : checkedItems[i].item.workTime,
								offTime : checkedItems[i].item.offTime,
								realWorkTime : checkedItems[i].item.realWorkTime
							}
							arrayList.push(checkedItems[i].item); //array로 담아서
						}
						mom_ajax("LD", "reference.workinghours.resourceByShiftPlanSchedule.resourceByShiftPlanSchedule", JSON.stringify(arrayList), that.callback, JSON.stringify(arrayList)); //list로 넘김
						/* end 20191025_005 */
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11875']});
				return;
			}
		});
		
		// 저장 버튼
		$(document).on("click", "#saveBtn", function() {
			var gridData = AUIGrid.getGridData("grid");
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var checkResourceCd, checkApplyDate, checkShiftType, searchShiftType = "";
			var cnt = 0;
			var arrayList = [];
			
			if(checkedItems.length > 0) {
				for(var i=0; i<gridData.length; i++) {
					if(checkResourceCd == gridData[i].resourceCd && checkApplyDate == gridData[i].applyDate && checkShiftType == gridData[i].shiftType) {
						cnt += 1;
					}
					
					checkResourceCd = gridData[i].resourceCd;
					checkApplyDate = gridData[i].applyDate;
					checkShiftType = gridData[i].shiftType;
				}
				
				if(cnt > 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11876']});
					return;
				}
				
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						micaCommon.splash.show();
						for(var i = 0; i < checkedItems.length; i++) {
							var param = {
								hShiftCd : checkedItems[i].item.hShiftCd,
								resourceCd : checkedItems[i].item.resourceCd,
								applyDate : checkedItems[i].item.applyDate,
								startTime : checkedItems[i].item.startTime,
								endTime : checkedItems[i].item.endTime,
								shiftCd : checkedItems[i].item.shiftCd,
								applyDate : checkedItems[i].item.applyDate,
								workPersonCnt : checkedItems[i].item.workPersonCnt,
								workIndrPersonCnt : checkedItems[i].item.workIndrPersonCnt,
								shiftType : checkedItems[i].item.shiftType
							}
							
							arrayList.push(param);
						}
						
						mom_ajax("L", "reference.workinghours.resourceByShiftPlanSchedule.resourceByShiftPlanScheduleModify", JSON.stringify(arrayList), that.listCallbackPost);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11340']});
				return;
			}
		});
		
		// 설비 복사 버튼 
		$(document).on("click", "#copyResourceBtn", function() {
			that.setCopyResourcePop();
			$("#resourcePop").micaModal("show");
		});
		
		// 설비 복사 팝업 저장 버튼
		$(document).on("click", "#rcSaveBtn", function() {
			var arrayList = [];
			var toResourceList = $("#toResource").jqxComboBox('getCheckedItems');
			
			if($("#rStartDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			
			if($("#rEndDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});
				return;
			}
			
			if($("#fromResource").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11855']});
				return;
			}
			
			if($("#toResource").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11856']});
				return;
			}
			
			if(toResourceList.length == 1) {
				if($("#fromResource").val() == toResourceList[0].originalItem.value) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11880']});
					return;
				}
			}
			
			// 복사할 From 설비 대상 Shift Schedule이 있는지 체크
			setTimeout(function() {
				$.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.fromResource.dummy",
					type : "GET",
					async: false,
					data : {fromResourceCd : $("#fromResource").val(), startDate : $("#rStartDate").val(), endDate : $("#rEndDate").val()},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length < 1) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11865']});
							return;
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
			 }, 100);
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					micaCommon.splash.show();
					for(var i=0; i<toResourceList.length; i++) {
						if($("#fromResource").val() != toResourceList[i].originalItem.value) {
							var param = {
								startDate : $("#rStartDate").val(),
								endDate : $("#rEndDate").val(),
								fromResource : $("#fromResource").val(),
								toResource : toResourceList[i].originalItem.value,
								eventType : "multi"
							}
							
							arrayList.push(param);
						}
					}
					
					mom_ajax("L", "reference.workinghours.resourceByShiftPlanSchedule.copyResourceByShiftPlanSchedule", JSON.stringify(arrayList), that.listCallbackPost);
					
					$("#resourcePop").micaModal("hide");
				}
			}});
		});
		
		// 설비군 복사 버튼 
		$(document).on("click", "#copyResourceGroupBtn", function() {
			that.setCopyResourceGroupPop();
			$("#resourceGroupPop").micaModal("show");
		});
		
		// 설비군 복사 팝업 저장 버튼
		$(document).on("click", "#rgSaveBtn", function() {
			var toResource = [];
			var arrayList = [];
			var param = that.getCopyResourceGroupPop();
			
			if($("#rgStartDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			
			if($("#rgEndDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});
				return;
			}
			
			if($("#fromResourceGroup").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11859']});
				return;
			}
			
			if($("#toResourceGroup").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11860']});
				return;
			}
			
			
			// 복사할 From 설비 대상 Shift Schedule이 있는지 체크
			setTimeout(function() {
				$.ajax({
				 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.fromResource.dummy",
					type : "GET",
					async: false,
					data : {fromResourceCd : $("#fromResourceGroup").val(), startDate : $("#rgStartDate").val(), endDate : $("#rgEndDate").val()},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length < 1) {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11865']});
							return;
						}
					},
					error: function(data){},
					fail : function(data){}
				 });
				
				// 복사될 To 설비군에 포함된 설비 리스트 가져오는 부분
				if(param.toResourceGroup != '') {
					$.ajax({
						url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.Resources.dummy",
						type : "GET",
						async: false,
						data : {hResourceGroup : param.toResourceGroup},
						timeout 	: 30000000,
						dataType 	: 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(data.length > 0) {
								for(var i=0; i<data.length; i++) {
									if(param.fromResourceGroup != data[i].resourceCd) {
										toResource[i] = "";
										toResource[i] += data[i].resourceCd;
									}
								}
							} else {
								micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11869']});
								return;
							}
						},
						error: function(data){},
						fail : function(data){}
					});
				}
			}, 100);
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					micaCommon.splash.show();
					for(var i=0; i<toResource.length; i++) {
						var listParam = {
							fromResourceGroup : param.fromResourceGroup,
							startDate : param.rgStartDate,
							endDate : param.rgEndDate,
							toResource : toResource[i],
							eventType : "multi"
						}
						
						if(listParam.toResource != undefined) {
							arrayList.push(listParam);
						}
					}
					
					mom_ajax("L", "reference.workinghours.resourceByShiftPlanSchedule.copyResourceGroupByShiftPlanSchedule", JSON.stringify(arrayList), that.listCallbackPost);
					
					$("#resourceGroupPop").micaModal("hide");
				}
			}});
		});
		
		// 휴일 적용(설비/설비군) 버튼 
		$(document).on("click", "#holidayBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11604'];
				else message = Language.lang['MESSAGES11604'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "D";
				hDate = checkedItems[0].item.applyDate;
				that.setHolidayPop(checkedItems[0].item);
			}
			$("#holidayPop").micaModal("show");
		});
		
		// 휴일 적용(설비/설비군) 팝업 저장 버튼
		$(document).on("click", "#hSaveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var hResourceList = $("#hResource").jqxComboBox('getCheckedItems');
//			var hResources = '';
			
			if($("#hStartDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			
			if($("#hEndDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});
				return;
			}
			
			if($("#hResource").val() == '' && $("#hResourceGroup").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11861']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					micaCommon.splash.show();
					var param = that.getHolidayPop();
					param.hResources = '';
//					if(param.hResourceGroup != '') {
//						$.ajax({
//							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.holidayShiftReosurce.dummy",
//							type : "GET",
//							async: false,
//							data : param,
//							timeout 	: 30000000,
//							dataType 	: 'json',
//							contentType : 'application/json; charset=UTF-8',
//							success : function(data){
//								if(data.length > 0) {
//									for(var i=0; i<data.length; i++) {
//										hResources[i] = "";
//										hResources[i] += "'" + data[i].resourceCd + "'";
//									}
//								}
//							},
//							error: function(data){},
//							fail : function(data){}
//						});
//					}
//					
//					param.hResources = "";
//					if(hResources.length > 0) {
//						param.hResources = hResources.toString();
//					}
//					
//					
					// 휴일 적용(설비/설비군) 설비 멀티콤보
					if(hResourceList.length > 0) {
						for(var i=0; i<hResourceList.length; i++) {
							if(i == 0){
								param.hResources += "'" + hResourceList[i].originalItem.value + "'";
							} else {
								param.hResources += ",'" + hResourceList[i].originalItem.value + "'";
							}
						}
					}
					
					param.eventType = "multi";
//					param.shiftCd = checkedItems[0].item.shiftCd;
					
					mom_ajax(cudFlag, "reference.workinghours.resourceByShiftPlanSchedule.applyingHoliday", JSON.stringify(param), that.listCallbackPost);
					
					$("#holidayPop").micaModal("hide");
				}
			}});
			
		});
		
		// From 설비 복사 버튼 
		$(document).on("click", "#copyFromResourceBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "L";
				that.setCopyFromResourcePop(checkedItems[0].item);
			}
			$("#fromResourcePop").micaModal("show");
		});
		
		// From 설비 복사 팝업 저장 버튼
		$(document).on("click", "#fSaveBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			var param = that.getCopyFromResourcePop();
			var shiftCd, shiftType, startTime, endTime = "";
			var applyDate = [];
			var arrayList = [];
			
			if($("#fStartDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10793']});
				return;
			}
			
			if($("#fEndDate").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11238']});
				return;
			}
			
			if($("#copyFromResource").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11855']});
				return;
			}
			
			if($("#fShiftCode").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11692']});
				return;
			}
			
			if($("#fStartDate").val() > $("#fEndDate").val()) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});
				return;
			}
			
			setTimeout(function() {
				$.ajax({
					url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy",
					type : "GET",
					async: false,
					data : {shiftCodeId : param.fShiftCode},
					timeout 	: 30000000,
					dataType 	: 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.length > 0) {
							shiftCd = data[0].shiftCd;
							shiftType = data[0].shiftType;
							startTime = data[0].startTime;
							endTime = data[0].endTime;
						} else {
							micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11755']});
							return;
						}
					},
					error: function(data){},
					fail : function(data){}
				});
			}, 100);
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function() {
					if(param.fStartDate != '' && param.fEndDate != '') {
						$.ajax({
							url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.searchDate.dummy",
							type : "GET",
							async: false,
							data : {fStartDate : param.fStartDate, fEndDate : param.fEndDate},
							timeout 	: 30000000,
							dataType 	: 'json',
							contentType : 'application/json; charset=UTF-8',
							success : function(data){
								if(data.length > 0) {
									for(var i=0; i<data.length; i++) {
										applyDate[i] = "";
										applyDate[i] += data[i].solarDate;
									}
								}
							},
							error: function(data){},
							fail : function(data){}
						});
					}
					
					for(var i=0; i<applyDate.length; i++) {
						var listParam = {
							shiftCd : shiftCd,
							shiftType : shiftType,
							startTime : startTime,
							endTime : endTime, 
							fStartDate : param.fStartDate,
							fEndDate : param.fEndDate,
							copyFromResource : param.copyFromResource,
							workPersonCnt : param.fWorkPerson,
							applyDate : applyDate[i]
						}
							
						arrayList.push(listParam);
					}
					
					mom_ajax(cudFlag, "reference.workinghours.resourceByShiftPlanSchedule.copyFromResourceByShiftPlanSchedule", JSON.stringify(arrayList), that.listCallbackPost);
					
					$("#fromResourcePop").micaModal("hide");
				}
			}});
			
		});
		
		//팝업 닫기 버튼
		$(document).on("click", "#rCancelBtn, #rcCancelBtn, #rgCancelBtn, #hCancelBtn, #fCancelBtn, .bntpopclose", function() {
			$("#pop, #resourcePop, #resourceGroupPop, #holidayPop, #fromResourcePop").micaModal("hide");
		});
		
		$(document).on("change", "#pShiftCode", function() {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy",
				type : "GET",
				async: false,
				data : {shiftCodeId : $("#pShiftCode").val()},
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						shiftStartTime = data[0].startTime;
						shiftEndTime = data[0].endTime;
						$("#pStartTime").val(shiftStartTime);
						$("#pEndTime").val(shiftEndTime);
					}
				},
				error: function(data){},
				fail : function(data){}
			});
		});
		
		// 설비 복사 시작일 밸리데이션
		$(document).on("change", "#rStartDate", function() {
			if($("#rStartDate").val() < get_current_date("YYYY-MM-DD")) {
				$("#rStartDate").val($("#fromDate").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11857']});
				return;
			}
		});
		
		// 설비 복사 종료일 밸리데이션
		$(document).on("change", "#rEndDate", function() {
			if($("#rStartDate").val() > $("#rEndDate").val()) {
				$("#rEndDate").val($("#toDate").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});
				return;
			}
		});
		
		// 설비군 복사 시작일 밸리데이션
		$(document).on("change", "#rgStartDate", function() {
			if($("#rgStartDate").val() < get_current_date("YYYY-MM-DD")) {
				$("#rgStartDate").val($("#fromDate").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11857']});
				return;
			}
		});
		
		// 설비군 복사 종료일 밸리데이션
		$(document).on("change", "#rgEndDate", function() {
			if($("#rgStartDate").val() > $("#rgEndDate").val()) {
				$("#rgEndDate").val($("#toDate").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});
				return;
			}
		});
		
		// 휴일 적용(설비/설비군) 시작일 밸리데이션
		$(document).on("change", "#hStartDate", function() {
			if($("#hStartDate").val() < get_current_date("YYYY-MM-DD")) {
				$("#hStartDate").val(hDate);
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11857']});
				return;
			}
		});
		
		// 휴일 적용(설비/설비군) 종료일 밸리데이션
		$(document).on("change", "#hEndDate", function() {
			if($("#hStartDate").val() > $("#hEndDate").val()) {
				$("#hEndDate").val(hDate);
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});
				return;
			}
		});
		
		// 등록 종료일 밸리데이션
		$(document).on("change", "#pEndDate", function() {
			if($("#pStartDate").val() > $("#pEndDate").val()) {
				$("#pEndDate").val($("#fromDate").val());
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11858']});
				return;
			}
		});
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// 설비
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.shiftPlanResource.dummy', {}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#resourceCd", comboOptions, options);
			micaCommon.comboBox.set("#pResourceCd", comboOptions, options);
			micaCommon.comboBox.set("#fromResource", comboOptions, options);
			micaCommon.comboBox.set("#toResource", {searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, options);
			micaCommon.comboBox.set("#hResource", {searchMode:'containsignorecase', autoComplete:true, checkboxes: true}, options);
			micaCommon.comboBox.set("#fromResourceGroup", comboOptions, options);
			micaCommon.comboBox.set("#copyFromResource", comboOptions, options);
		});
		
		// 설비군
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comResourceGroup.dummy', {}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#toResourceGroup", comboOptions, options);
			micaCommon.comboBox.set("#hResourceGroup", comboOptions, options);
		});
		
		// SHIFT코드
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy', {useYn : "Y"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#pShiftCode", comboOptions, options);
			micaCommon.comboBox.set("#fShiftCode", comboOptions, options);
		});
		
		// SHIFT유형
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', {codeClassId : "SHIFT_TYPE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#hShiftType", comboOptions, options);
		});
		
		
		
		$("#pStartTime").mask("9999");
		$("#pEndTime").mask("9999");
		
	},
	// 등록, 복사 버튼 클릭하여 팝업 호출 시
	setResourceShiftSchedulePop: function(data, flag) {
		data = data || {};
		var selShiftCd = $('#pShiftCode').jqxComboBox('source');
		var pStartDate, pEndDate = "";
		if(flag == "C") {
			pStartDate = $("#fromDate").val();
			pEndDate = $("#fromDate").val();
		} else {
			pStartDate = data.applyDate;
			pEndDate = data.applyDate;
		}
		$('#pShiftCode').jqxComboBox("clear");
		$('#pShiftCode').jqxComboBox("source", selShiftCd);
		$("#pResourceCd").val($("#resourceCd").val());
		$("#pStartDate").val(pStartDate);
		$("#pEndDate").val(pEndDate);
		$("#pShiftCode").val(data.shiftCd || "");
		$("#pStartTime").val(data.startTime || "");
		$("#pEndTime").val(data.endTime || "");
		$("#pWorkPerson").val(data.workPersonCnt || "");
		$("#pWorkIndrPerson").val(data.workIndrPersonCnt || "");
	},
	// 등록, 복사 팝업에서 저장 버튼 클릭 시
	getResourceShiftSchedulePop: function() {
		var result = {
			resourceCd : $("#pResourceCd").val(),
			startDate : $("#pStartDate").val(),
			endDate : $("#pEndDate").val(),
			shiftCd : $("#pShiftCode").val(),
			startTime : $("#pStartTime").val(),
			endTime : $("#pEndTime").val(),
			workPerson : $("#pWorkPerson").val(),
			holidayFlag : $("#holidayFlag").val(),
			workIndrPersonCnt : $("#pWorkIndrPerson").val()
		}
		return result;
	},
	// 설비 복사 버튼 클릭하여 팝업 호출 시
	setCopyResourcePop: function() {
		$("#rStartDate").val($("#fromDate").val());
		$("#rEndDate").val($("#toDate").val()); 
		$("#fromResource").val($("#resourceCd").val());
		$("#toResource").val("");
		$("#toResource").jqxComboBox("uncheckAll"); 
	},
	// 설비군 복사 버튼 클릭하여 팝업 호출 시
	setCopyResourceGroupPop: function() {
		$("#rgStartDate").val($("#fromDate").val());
		$("#rgEndDate").val($("#toDate").val()); 
		$("#fromResourceGroup").val($("#resourceCd").val());
		$("#toResourceGroup").val("");
	},
	// 설비군 복사 팝업에서 저장 버튼 클릭 시
	getCopyResourceGroupPop: function() {
		var result = {
			rgStartDate : $("#rgStartDate").val(),
			rgEndDate : $("#rgEndDate").val(),
			fromResourceGroup : $("#fromResourceGroup").val(),
			toResourceGroup : $("#toResourceGroup").val()
		}
		return result;
	},
	// 휴일 적용(설비/설비군) 버튼 클릭하여 팝업 호출 시
	setHolidayPop: function(data) {
		data = data || {};
		$("#hStartDate").val(data.applyDate);
		$("#hEndDate").val(data.applyDate); 
		$("#hResource").jqxComboBox("uncheckAll");
		$("#hResource").jqxComboBox("checkItem", data.resourceCd); 
		$("#hResourceGroup").val(data.resourceGroupCd || "(" || data.resourceGroupName || ")");
	},
	// 휴일 적용(설비/설비군) 팝업에서 저장 버튼 클릭 시
	getHolidayPop: function() {
		var result = {
			startDate : $("#hStartDate").val(),
			endDate : $("#hEndDate").val(),
			hResources : $("#hResource").val(),
			hResourceGroup : $("#hResourceGroup").val(),
			shiftType : $("#hShiftType").val()
		}
		return result;
	},
	// From설비 복사 버튼 클릭하여 팝업 호출 시
	setCopyFromResourcePop : function(data) {
		data = data || {};
		$("#fStartDate").val("");
		$("#fEndDate").val("");
		$("#copyFromResource").val(data.resourceCd);
		$("#fShiftCode").val(data.shiftCd);
		$("#fWorkPerson").val("");
	},
	// From설비 복사 팝업에서 저장 버튼 클릭 시
	getCopyFromResourcePop : function(data) {
		var result = {
			fStartDate : $("#fStartDate").val(),
			fEndDate : $("#fEndDate").val(),
			copyFromResource : $("#copyFromResource").val(),
			fShiftCode : $("#fShiftCode").val(),
			fWorkPerson : $("#fWorkPerson").val()
		}
		return result;
	},
	// 설비 복사, 설비군 복사 모두 From 설비에 복사할 데이터 존재하는지 확인
	overlapResource : function () {
		$.ajax({
		 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.overlapResource.dummy",
			type : "GET",
			async: false,
			data : {pResourceCd : $("#pResourceCd").val(), pApplicationDate : $("#pApplicationDate").val(), pStartTime : $("#pStartTime").val(), pEndTime : $("#pEndTime").val()},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0 && data[0].cnt > 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11864']});
					return;
				}
			},
			error: function(data){},
			fail : function(data){}
		 });
	},
	// From 설비 복사 시 기등록된 설비 있는지 확인
	overlapFromResource : function () {
		$.ajax({
		 	url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.overlapFromResource.dummy",
			type : "GET",
			async: false,
			data : {fromResourceCd : $("#copyFromResource").val(), startDate : $("#fStartDate").val(), endDate : $("#fEndDate").val()},
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0 && data[0].cnt > 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11864']});
					return;
				}
			},
			error: function(data){},
			fail : function(data){}
		 });
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background:  #C7E8FD;}</style>');	
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
	gridBefore : function() {
		AUIGrid.restoreEditedRows("grid", "selectedIndex");
	},
	callback : function(result, data, param, callbackParam, flag) {
		var that = this.MOMIE003;
		if(result == "SUCCESS") {
			var param = mCommon.formGetParam("#form");
			mCommon.render("grid", "W201905281045448591002f60CN14pbBb", param, function() {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	listCallbackPost : function(result, data) {
		var that = this.MOMIE003;
		if(result == "SUCCESS"){
			var param =  mCommon.formGetParam("#form");
			mCommon.render("grid", "W201905281045448591002f60CN14pbBb", param, function() {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
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
	MOMIE003.init();
});
