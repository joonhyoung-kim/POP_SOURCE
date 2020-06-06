var userId = sessionStorage.getItem("userId");
var shiftId;
var actionType = "";

var MOMIE001 = {
	init: function() {		
		var that = this;
		that.event();
		Language.init(function() {
			mCommon.init("grid", "W201807031646441791003Fy7hsfb8Avo", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: "Shift", width:"750"});
				that.comboBox();
				$("#resourceCdLabel, #shiftIdLabel, #startTimeLabel, #endTimeLabel, #applyStateTimeLabel, #applyEndTimeLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#resourceCdLabel, #shiftIdLabel, #startTimeLabel, #endTimeLabel, #applyStateTimeLabel, #applyEndTimeLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);		
		});
	}, 
	grid: function() {
		tuCommon.editColumnSet("grid");
		tuCommon.cellClick('grid');
		
	}, event: function() {
		var that = this;
		
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render('grid', 'W201807031646441791003Fy7hsfb8Avo',  mCommon.formGetParam("#form"), function(){});
		});
		
		//등록 버튼		
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setShiftPop();
			actionType = "C";
			$("#resourceCdModal, #shiftIdModal").jqxComboBox({disabled: false});
		});

		//팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			if($("#resourceCdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11738']});
				return;
			}
			if($("#shiftIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11739']});
				return;
			}
			if($("#startTimeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10788']});
				return;
			}
			if($("#endTimeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11740']});
				return;
			}	
			if($("#applyStateTimeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11741']});
				return;
			}	
			if($("#applyEndTimeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11742']});
				return;
			}	
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getShiftPop(actionType);			
					mom_ajax("C","reference.workinghours.shift.shift", JSON.stringify(param), that.callback);			

					$(".modal").micaModal("hide");
				}
			}});
			
		});

		// Shift 삭제 버튼
		$(document).on("click", "#delBtn", function() {
			// 선택된 데이터 가져오기
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11743'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < checkedItems.length; i++){
							var param = {
								shiftId : checkedItems[i].item.shiftId,
								applyStateTime : checkedItems[i].item.applyStateTime,
								applyEndTime : checkedItems[i].item.applyEndTime,
								actionType : "D"
							}
							mom_ajax("C", "reference.workinghours.shift.shift", JSON.stringify(param), that.callback);
						}
						
						mCommon.render('grid', 'W201807031646441791003Fy7hsfb8Avo',  mCommon.formGetParam("#form"), function(){});
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});

		// Shift 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length < 1 || checkedItems.length >  1) {
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 			
			}
			mCommon.gridPopAdd("grid");
			actionType = "C";
			that.setShiftPop(checkedItems[0].item);
			$("#resourceCdModal, #shiftIdModal").jqxComboBox({disabled: false});
		});

		// Shift 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "SHIFT_MOMIE001_" + get_current_date("yyyy-mm-dd")});
		});

		// Shift 수정 모달 열기 버튼
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			mCommon.gridPopAdd("grid");
			actionType = "U";
			that.setShiftPop(item);
			$("#resourceCdModal, #shiftIdModal").jqxComboBox({disabled: true});

		});
	},
	comboBox: function() {
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SHIFT_CODE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#shiftName", comboOptions, options);
				micaCommon.comboBox.set("#shiftIdModal", comboOptions, options);
			}
		);
		
		// Resource 리스트.
		mCommon.comboBoxClickCall("#resourceName, #resourceCdModal", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shift.shift_resource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName", comboOptions, options);
					micaCommon.comboBox.set("#resourceCdModal",comboOptions, options);
					callBack();
				}
			);
		});
		
		//사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYnModal", comboOptions, options);
			}
		);
	},
	setShiftPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		shiftId = data.shiftId || "";
		if(actionType == "U" || actionType == "D"){
			shiftId = data.shiftId;
		}else {
			shiftId = "";
		}
		// ResourceId값을 설정해준다. null이면 빈값으로 초기화.
		$("#resourceCdModal").val(data.resourceCd || "");
		// Shift명을 설정해준다.
		$("#shiftIdModal").val(data.shiftCd  || "");
		// 시작시간을 설정해준다.
		$("#startTimeModal").val(data.startTime || "");
		// 완료시간을 설정해준다.
		$("#endTimeModal").val(data.endTime || "");
		// 적용시작일자를 설정해준다.
		$("#applyStateTimeModal").val(data.applyStateTime || "");
		// 적용완료일자를 설정해준다.
		$("#applyEndTimeModal").val(data.applyEndTime || "");
		// 직접투입인원을 설정해준다.
		$("#workPersonCntModal").val(data.normalDrPersonCnt || "");
		// 간접투입인원을 설정해준다.
		$("#normalInPersonCntModal").val(data.normalInPersonCnt || "");
		// 정상직접작업시간을 설정해준다.
		$("#normalDrWorkHourModal").val(data.normalDrWorkHour || "");
		// 정상간접작업시간을 설정해준다.
		$("#normalInWorkHourModal").val(data.normalInWorkHour || "");
		// 잔업직접작업시간을 설정해준다.
		$("#extraDrWorkHourModal").val(data.extraDrWorkHour || "");
		// 잔업간접작업시간을 설정해준다.
		$("#extraInWorkHourModal").val(data.extraInWorkHour || "");
		// 잔업직접투입인원을 설정해준다.
		$("#extraDrPersonCntModal").val(data.extraDrPersonCnt || "");
		// 잔업간접투입인원을 설정해준다.
		$("#extraInPersonCntModal").val(data.extraInPersonCnt || "");
		// 직접사고작업시간을 설정해준다.
		$("#normalDrAcHourModal").val(data.normalDrAcHour || "");
		// 간접사고작업시간을 설정해준다.
		$("#normalInAcHourModal").val(data.normalInAcHour || "");
		// 잔업직접사고시간 설정해준다.
		$("#extraDrAcHourModal").val(data.extraDrAcHour || "");
		// 잔업간접작업시간을 설정해준다.
		$("#extraInWorkHourModal").val(data.extraInWorkHour || "");
		// 잔업간접사고시간을 설정해준다.
		$("#extraInAcHourModal").val(data.extraInAcHour || "");
		//수정자를 설정해준다.
		$("#updateUserNameModal").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#updateDateModal").val(data.updateDate || get_current_date());
		// 비고값을 설정해준다.
		$("#descriptionModal").val(data.description || "");
		//사용유무
		$("#useYnModal").val(data.useYn ||"Y");

		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#updateUserNameModal, #updateDateModal").attr("readonly","readonly");
	},
	getShiftPop: function() {
		// Shift 팝업의 데이터를 모아서 준다.
		var result = {
			shiftId : shiftId,
			resourceCd: $("#resourceCdModal").val(),
			shiftCd:$("#shiftIdModal").val(),
			startTime: $("#startTimeModal").val().replace(/:/gi,''),
			endTime: $("#endTimeModal").val().replace(/:/gi,''),
			applyStateTime: $("#applyStateTimeModal").val(),
			applyEndTime: $("#applyEndTimeModal").val(),
			normalDrPersonCnt : $("#workPersonCntModal").val(),
			normalInPersonCnt : $("#normalInPersonCntModal").val(),
			normalInWorkHour : $("#normalInWorkHourModal").val(),
			normalDrWorkHour : $("#normalDrWorkHourModal").val(),
			extraDrWorkHour : $("#extraDrWorkHourModal").val(),
			extraInWorkHour : $("#extraInWorkHourModal").val(),
			extraDrPersonCnt : $("#extraDrPersonCntModal").val(),
			extraInPersonCnt : $("#extraInPersonCntModal").val(),
			normalDrAcHour : $("#normalDrAcHourModal").val(),
			normalInAcHour : $("#normalInAcHourModal").val(),
			extraDrAcHour : $("#extraDrAcHourModal").val(),
			extraInWorkHour : $("#extraInWorkHourModal").val(),
			extraInAcHour : $("#extraInAcHourModal").val(),
			description : $("#descriptionModal").val(),
			useYn: $("#useYnModal").val(),
			actionType : actionType
		}
		return result;
	},
	callback : function(param, data){
		var that = this.MOMIE001;
		if(param == 'SUCCESS'){
			mCommon.render('grid', 'W201807031646441791003Fy7hsfb8Avo',  mCommon.formGetParam("#form"), function(){
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
	}
};
$(document).ready(function(event){
	MOMIE001.init();
});