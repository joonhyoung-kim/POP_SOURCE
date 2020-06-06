var MOMJA008 = {
	initMessage: undefined,
	initParam: undefined,
	cudFlag: undefined,
	
	init: function() {		
		var that = this;
		Language.init(function() {
			that.event();
		});
	},
	
	event: function() {
		var that = this;
		momWidget.isInitGrid(0, function(){
//			$(document).on("click", "#createBtn1", function(){
//				$("#workDateEP1").removeClass("hasDatepicker");
//				$("#startTimeDate").val("");
//				$("#endTimeDate").val("");
//				$("#nonWorkCdEP1, #nonTypeEP1").jqxComboBox('clear');
//				
//				that.drawCombo();
//				
//			});
//			
//			$(document).on("click", "#copyBtn1", function(){
//				that.drawCombo();
//				var selectedItem = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
//				var startDate = selectedItem[0].item.startTime;
//				var endDate = selectedItem[0].item.endTime;
//				$("#startTimeDate").val(startDate.substr(0,10));
//				$("#startTime1").val(startDate.substr(11,2));
//				$("#startTime2").val(startDate.substr(14,2));
//				$("#startTime3").val(startDate.substr(17,2));
//				$("#endTimeDate").val(endDate.substr(0,10));
//				$("#endTime1").val(endDate.substr(11,2));
//				$("#endTime2").val(endDate.substr(14,2));
//				$("#endTime3").val(endDate.substr(17,2));
//				
//			});
			
			$(document).on("click", ".bntpopclose, #cancelBtnEP1", function(){
				$("#startTimeDate, #startTime1, #startTime2, #startTime3").remove();
				$("#endTimeDate, #endTime1, #endTime2, #endTime3").remove();
				$("#startTimeEP1").css({display:"block"});
				$("#endTimeEP1").css({display:"block"});
			});
			
			// 팝업 내 비가동종류 항목 수정 시
			$(document).on("change", "#nonClassIdEP1", function() {
				mom_ajax('R', 'reference.workinghours.nonWorkDataHist.nonWorkCode', {nonClassId: $("#nonClassIdEP1").val()}, function(result, data) {
					$("#nonWorkCdEP1, #nonTypeEP1, #nonOperationTypeEP1").jqxComboBox('clear');

					if(data.length > 0) {
						var items = [];
						for(var i = 0; i < data.length; i++) {
							items.push({ label: data[i]['name'], value: data[i]['code'] });
						}
						
						$("#nonWorkCdEP1").jqxComboBox('source', items);
					}
					
				}, undefined, undefined, this, 'sync');
			});
			
			// 팝업 내 비가동분류 항목 수정 시
			$(document).on("change", "#nonWorkCdEP1", function() {
				mom_ajax('R', 'reference.workinghours.nonWorkDataHist.nonWorkType', {nonClassId: $("#nonClassIdEP1").val(), nonWorkCd: $("#nonWorkCdEP1").val()}, function(result, data) {
					$("#nonTypeEP1, #nonOperationTypeEP1").jqxComboBox('clear');

					if(data.length > 0) {
						var items = [];
						for(var i = 0; i < data.length; i++) {
							items.push({ label: data[i]['name'], value: data[i]['code'] });
						}
						
						$("#nonTypeEP1").jqxComboBox('source', items);
					}
					
				}, undefined, undefined, this, 'sync');
			});
			
			// 팝업 내 비가동유형 항목 수정 시
			$(document).on("change", "#nonTypeEP1", function() {
				mom_ajax('R', 'reference.workinghours.nonWorkDataHist.nonWorkOperationType', {nonClassId: $("#nonClassIdEP1").val(), nonWorkCd: $("#nonWorkCdEP1").val(), nonType: $("#nonTypeEP1").val()}, function(result, data) {
					$("#nonOperationTypeEP1").jqxComboBox('clear');

					if(data.length > 0) {
						var items = [];
						for(var i = 0; i < data.length; i++) {
							items.push({ label: data[i]['name'], value: data[i]['code'] });
						}
						
						$("#nonOperationTypeEP1").jqxComboBox('source', items);
					}
					
				}, undefined, undefined, this, 'sync');
			});
			
		});
		
		$(document).on("click", "#rDelBtn1", function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var arrayList = [];
			
			if(checkedItems.length > 0) {
				momWidget.messageBox({type: 'info', width: '400', height: '145', html: '선택된 행을 삭제 하시겠습니까?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function() {
					momWidget.splashShow();
					for(var i=0; i<checkedItems.length; i++) {
						var param = {
							resourceCd : checkedItems[i].item.resourceCd,
							startTime : checkedItems[i].item.startTime.replace(/\-+/g, "").replace(/\:+/g, "").replace(/ +/g, "").replace(/\t+/g, "")
						}
							
						arrayList.push(param);
					}
					
					mom_ajax('LD', 'reference.workinghours.nonWorkDataHist.nonWorkDataHist', JSON.stringify(arrayList), function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						}
						
						mom_ajax('R', 'reference.workinghours.nonWorkDataHist.nonWorkDataHist', {sNonWorkDate : $("#sNonWorkDate").val()
																							   , sNonWorkResource : $("#sNonWorkResource").val()
																							   , sNonWorkClassId : $("#sNonWorkClassId").val()
																							   , sNonWorkCode : $("#sNonWorkCode").val()
																							   , sNonWorkType : $("#sNonWorkType").val()
																							   , sNonOperationType : $("#sNonOperationType").val()}, function(result, data) {
							if(data.length < 1) {
								momWidget.splashHide();
								AUIGrid.clearGridData(momWidget.grid[0]);
								momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
								return;
							} else {
								momWidget.splashHide();
								AUIGrid.setGridData(momWidget.grid[0], data);
								momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
								return;
							}
							
						}, undefined, undefined, this, 'sync');
						
					}, undefined, undefined, this, 'sync');
				}}});
			}
		});
		
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'createBtn1') {
			$("#startTimeDate").val("");
			$("#endTimeDate").val("");
			
			that.cudFlag = 'C';
			
			that.drawCombo();
		}
		if(indexInfo != undefined && indexInfo['op'] == 'copyBtn1') {
			that.drawCombo();
			var selectedItem = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var startDate = selectedItem[0].item.startTime;
			var endDate = selectedItem[0].item.endTime;
			$("#startTimeDate").val(startDate.substr(0,10));
			$("#startTime1").val(startDate.substr(11,2));
			$("#startTime2").val(startDate.substr(14,2));
			$("#startTime3").val(startDate.substr(17,2));
			$("#endTimeDate").val(endDate.substr(0,10));
			$("#endTime1").val(endDate.substr(11,2));
			$("#endTime2").val(endDate.substr(14,2));
			$("#endTime3").val(endDate.substr(17,2));
			that.cudFlag = 'C';
		}
		if(indexInfo != undefined && indexInfo['op'] == 'editBtn1') {
			that.cudFlag = 'U';
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		var startTime, endTime;
		if(index == 0) {
			
			if($("#startTimeDate").val() == '' || $("#startTime1 input").val() == '' || $("#startTime2 input").val() == '' || $("#startTime3 input").val() == '') {
				this.initMessage = Language.lang['MESSAGES10788'];
				return;
			}
			
			if($("#endTimeDate").val() == '' || $("#endTime1 input").val() == '' || $("#endTime2 input").val() == '' || $("#endTime3 input").val() == '') {
				this.initMessage = Language.lang['MESSAGES11236'];
				return;
			}
			
			if(that.cudFlag != undefined && that.cudFlag != 'U') {
				startTime = $("#startTimeDate").val().replace(/-/gi,"") + $("#startTime1 input").val() + $("#startTime2 input").val() + $("#startTime3 input").val();
				endTime = $("#endTimeDate").val().replace(/-/gi,"") + $("#endTime1 input").val() + $("#endTime2 input").val() + $("#endTime3 input").val();
				var workDate = $("#startTimeDate").val().substring(0,10);
				
				this.initMessage = undefined;
				this.initParam = {startTime : startTime, endTime : endTime, workDate : workDate};
			}
			
			if(that.cudFlag != undefined && that.cudFlag == 'U') {
				startTime = $("#startTimeEP1").val().replace(/\-+/g, "").replace(/\:+/g, "").replace(/ +/g, "").replace(/\t+/g, "");
				var workDate = $("#startTimeEP1").val().substring(0,10);
				this.initParam = {startTime : startTime, workDate : workDate};
			}

		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			if(startTime >= endTime) {
				this.initMessage = Language.lang['MESSAGES11690'];
				return;
			}
		}
		
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo['op'] != undefined && indexInfo['op'] == 'saveBtnEP1') {
			momWidget.findBtnClicked(0, false, {}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[0], data);
			});
			
		}
		momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		momWidget.splashHide();
		$("#startTimeDate, #startTime1, #startTime2, #startTime3").remove();
		$("#endTimeDate, #endTime1, #endTime2, #endTime3").remove();
		$("#startTimeEP1").css({display:"block"});
		$("#endTimeEP1").css({display:"block"});
	}, drawCombo: function() {
		$("#startTime1Label, #endTime1Label").find(".circle").addClass("bg-orange");
		$("#startTime1Label, #endTime1Label").find(".textblock").addClass("orange");
		$("#startTimeEP1").parent().append(
				"<input style='margin:-1px 0px 0px -1px; border: 1px solid #aaa;' maxlength='256' id='startTimeDate' input-type='datepicker' date-format='date' class='w-input fieldbox w190' autocomplete='off'>" +
				"<div title id='startTime1' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperstartTime1' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 100%; position: relative;'>" + 
				"<div id='dropdownlistContentstartTime1' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none; float: left; position: absolute; height: 28px; left: 0px; top: 0px;width:38.666px;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='startTime11' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder='00' ></div>" +
				"<div id='dropdownlistArrowstartTime1' role='button' style='left: 39.666px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div></div></div>" +
				"<div title id='startTime2' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperstartTime2' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 50%; position: relative;'>" + 
				"<div id='dropdownlistContentstartTime2' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none;border-left: 1px solid #aaa; border-radius:initial;float: left; position: absolute; height: 28px; left: 63.666px; top: 0px;width:38.666px;box-sizing: border-box;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='startTime21' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder="+'"'+"00'"+"\""+"></div>" +
				"<div id='dropdownlistArrowstartTime2' role='button' style='left: 102.332px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div></div></div>"+
				"<div title id='startTime3' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperstartTime3' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 50%; position: relative;'>" + 
				"<div id='dropdownlistContentstartTime3' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none;border-left: 1px solid #aaa; border-radius:initial; float: left; position: absolute; height: 28px; left: 126px; top: 0px;width:38.666px;box-sizing: border-box;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='startTime31' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder='00"+'"'+"'></div>" +
				"<div id='dropdownlistArrowstartTime3' role='button' style='left: 164.666px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div>"+
				"</div><input type='hidden' value></div>"
				);
		$("#startTimeEP1").css({display:"none"});
		$("#endTimeEP1").parent().append(
				"<input style='margin:-1px 0px 0px -1px; border: 1px solid #aaa;' maxlength='256' id='endTimeDate' input-type='datepicker' date-format='date' class='w-input fieldbox w190' autocomplete='off'>" +
				"<div title id='endTime1' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperendTime1' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 100%; position: relative;'>" + 
				"<div id='dropdownlistContentendTime1' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none; float: left; position: absolute; height: 28px; left: 0px; top: 0px;width:38.666px;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='endTime11' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder='00' ></div>" +
				"<div id='dropdownlistArrowendTime1' role='button' style='left: 39.666px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div></div></div>" +
				"<div title id='endTime2' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperendTime2' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 50%; position: relative;'>" + 
				"<div id='dropdownlistContentendTime2' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none;border-left: 1px solid #aaa; border-radius:initial;float: left; position: absolute; height: 28px; left: 63.666px; top: 0px;width:38.666px;box-sizing: border-box;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='endTime21' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder="+'"'+"00'"+"\""+"></div>" +
				"<div id='dropdownlistArrowendTime2' role='button' style='left: 102.332px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div></div></div>"+
				"<div title id='endTime3' class='fieldbox w60 jqx-combobox-state-normal jqx-combobox jqx-rc-all jqx-widget jqx-widget-content' aria-owns='listBoxjqxWidget86dd7924' aria-haspopup='true'aria-multiline='false' aria-readonly='false' aria-disabled='false'>" +
				"<div id='dropdownlistWrapperendTime3' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 50%; position: relative;'>" + 
				"<div id='dropdownlistContentendTime3' style= 'padding: 0px; margin: 0px; border-top: none; border-bottom: none;border-left: 1px solid #aaa; border-radius:initial; float: left; position: absolute; height: 28px; left: 126px; top: 0px;width:38.666px;box-sizing: border-box;' class='jqx-combobox-content jqx-widget-content'> " +
				"<input id='endTime31' autocomplete='off' style='margin: 0px; padding: 0px 3px; border: 0px; width: 100%; height: 28px;' type='textarea' class='jqx-combobox-input jqx-widget-content jqx-rc-all' value placeholder='00"+'"'+"'></div>" +
				"<div id='dropdownlistArrowendTime3' role='button' style='left: 164.666px; padding: 0px; margin: 0px; border-width: 0px 0px 0px 1px; float: right; position: absolute; width: 24px; height: 28px;' class='jqx-combobox-arrow-normal jqx-fill-state-normal jqx-rc-r'><div class='jqx-icon-arrow-down jqx-icon'></div></div>"+
				"</div><input type='hidden' value></div>");
		$("#endTimeEP1").css({display:"none"});
		// 시,분,초
		 var sourceH = //시
        {
			datatype: "json",
            url: tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy?codeClassId=HMS_SET_UP&attribute1=Y"
        };
		 var sourceM =
        {
			datatype: "json",
            url: tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy?codeClassId=HMS_SET_UP&attribute2=Y"
        };
		 var sourceS =
        {
			datatype: "json",
            url: tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy?codeClassId=HMS_SET_UP&attribute3=Y"
        };

        var dataAdapter1 = new $.jqx.dataAdapter(sourceH, { async: false });
        var dataAdapter2 = new $.jqx.dataAdapter(sourceM, { async: false });
        var dataAdapter3 = new $.jqx.dataAdapter(sourceS, { async: false });
        dataAdapter1.dataBind();
        dataAdapter2.dataBind();
        dataAdapter3.dataBind();
        $("#startTime1").jqxComboBox({width: "62px", height : "25px", source: dataAdapter1, displayMember : "name", valueMember : "code", autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
        $("#startTime2").jqxComboBox({width: "62px", height : "25px", source: dataAdapter2, displayMember : "name", valueMember : "code",autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
        $("#startTime3").jqxComboBox({width: "62px", height : "25px", source: dataAdapter3, displayMember : "name", valueMember : "code", autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});

        $("#endTime1").jqxComboBox({width: "62px", height : "25px", source: dataAdapter1, displayMember : "name", valueMember : "code", autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
        $("#endTime2").jqxComboBox({width: "62px", height : "25px", source: dataAdapter2, displayMember : "name", valueMember : "code",autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
        $("#endTime3").jqxComboBox({width: "62px", height : "25px", source: dataAdapter3, displayMember : "name", valueMember : "code", autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true});
        $("#workDateEP1, #startTimeDate, #endTimeDate").datetimepicker({
			timepicker:false, 
			format:'Y-m-d'
		});
	}
};
$(document).ready(function(event){
	momWidget.init(1, 'MOMJA008', MOMJA008);
	MOMJA008.init();
});
