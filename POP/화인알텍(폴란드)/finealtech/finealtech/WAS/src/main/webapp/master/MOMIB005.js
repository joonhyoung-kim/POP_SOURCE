var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var gvThat;
var MOMIB005 = {
	init: function() {		
		var that = this;
		gvThat = this;
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W201806281312195811000p1yOqMEcV3o", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES10115']});
				that.comboBox();
				that.event();
				// 라벨 색상 변경
				$("#measureDetailTypeLabel, #itemIdLabel, #gaugeMethodLabel, #measureMethodLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#measureDetailTypeLabel, #itemIdLabel, #gaugeMethodLabel, #measureMethodLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);
		});
	}, 
	grid: function() {
		editColumnSet("grid");
		
		function editColumnSet(grid) {
			var editColumn = {"headerText":"Edit","dataField":"Edit","width":40,"visible":true,
				renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
				labelFunction : function (rowIndex, columnIndex, value, headerText, item ) {
					return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
				}
			}
			
			var gridColumn = AUIGrid.getColumnLayout(grid);
			gridColumn.reverse();
			gridColumn.push(editColumn);
			gridColumn.reverse();
			AUIGrid.changeColumnLayout(grid, gridColumn);
		}
				
		tuCommon.cellClick('grid');		

	}, 
	event: function() {
		var that = this; // MOMIE001 내부 변수 사용을 위해서 선언.
		
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201806281312195811000p1yOqMEcV3o",  mCommon.formGetParam("#form"), function(){});
		});
		
		//등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setQualityInfoPop(null);
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#measureDetailTypeModal, #itemIdModal, #samplingBaseModal, #gaugeMethodModal, #checkLevelModal, #aqlModal").jqxComboBox({disabled: false});
			$("#updateUserNameModal, #updateDateModal").attr("readonly", "readonly");
		});

		//팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#measureDetailTypeModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10130']});
				$("#measureDetailTypeModal").focus();
				return;
			}
			
			if($("#itemIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				$("#itemIdModal").focus();
				return;
			}
			
			if($("#gaugeMethodModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10133']});
				$("#gaugeMethodModal").focus();
				return;
			}
			
			if($("#measureMethodModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11492']});
				$("#measureMethodModal").focus();
				return;
			}
			
			if($("#measureMethodModal").val() == "NUMBERLESS") {
				if($("#targetModal").val() == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10083']});
					return;
				}
				if($("#uslModal").val() == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10092']});
					return;
				}
				if($("#lslModal").val() == '') {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10042']});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getQualityInfoPop();
					that.cudQualityInfoPop(type, param);
					$("#gridModalPop").micaModal("hide");
				}
			}});
			
		});
		
		//팝업 취소 버튼
		$(document).on("click", "#gridModalPopCancelBtn, .bntpopclose", function() {
			$("#gridModalPop").micaModal("hide");
		});

		// 삭제 버튼
		$(document).on("click", "#delBtn", function() {
			// 선택된 데이터 가져오기
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			// confirm 함수로 Y/N 물어봄
			var chkFlag = false;
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10647'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after : function(){
						for(i = 0; i < checkedItems.length; i++){
							var param = checkedItems[i].item;	
							if(i == checkedItems.length - 1){
								chkFlag = true;
							}
							that.cudQualityInfoPop("D", param, chkFlag);
						}
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}	
		});
		
		// 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {			
			mCommon.auiGridExcelExport("grid", {fileName: "QUALITY_INFO_MOMIB005_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "QUALITY_INFO_MOMIB005_test"}, "templete");
		});

		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			that.setQualityInfoPop(item);
			$("#gridModalPopSaveBtn").attr("type", "U");
			$("#gridModalPop").micaModal("show");
			$("#measureDetailTypeModal, #itemIdModal, #samplingBaseModal, #gaugeMethodModal, #checkLevelModal, #aqlModal").jqxComboBox({disabled: true});
			$("#updateUserNameModal, #updateDateModal").attr("readonly", "readonly");		
		});
		
		// 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length > 1 || selectItems.length <= 0) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#gridModalPop").micaModal("show");
			that.setQualityInfoPop(selectItems[0].item);
			$("#measureDetailTypeModal, #itemIdModal, #samplingBaseModal, #gaugeMethodModal, #checkLevelModal, #aqlModal").jqxComboBox({disabled: false});
			$("#updateUserNameModal, #updateDateModal").attr("readonly", "readonly");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
			$("#file").val("");
		});
		
		// 엑셀등록팝업 닫기
		$(document).on("click", "#dpCancelBtn, .bntpopclose", function() {
			$("#uploadPop").micaModal("hide");
		});
		
		// 엑셀등록저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.excelUpload();
		});
		
		// 팝업의 측정방법 선택했을 때,
		$("#measureMethodModal").on("change", function(e) {
			that.measureMethod();
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
	},
	comboBox: function() {
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		//상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYnModal",{selectedIndex : 0, searchMode : "containsignorecase", autoComplete:true}, options);
			}
		);
		
		//검사 종류
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MEASURE_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#measureDetailTypeModal",comboOptions, options);
				micaCommon.comboBox.set("#inMeasureType",comboOptions, options);				
			}
		);
		
		//검사 항목
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"GAUGE_METHOD"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#gaugeMethodModal",comboOptions, options);
			}
		);
		
		//측정 방법
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MEASURE_METHOD"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#measureMethodModal", {searchMode:'containsignorecase', autoComplete:true, selectedIndex: 0}, options);
			}
		);
		
		//샘플링 기준
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SAMPLING_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#samplingBaseModal",comboOptions, options);
			}
		);
		
		//검사 수준
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CHECK_LEVEL"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#checkLevelModal",comboOptions, options);
			}
		);
		
		//AQL
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"AQL_LEVEL"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#aqlModal",comboOptions, options);
			}
		);
		
		//TARGET TYPE
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"MEASURE_TARGET_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#targetTypeModal",comboOptions, options);
			}
		);
		
		//품목		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItems);
		
		//계측장비
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CHECK_METHOD"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#checkMethodModal",comboOptions, options);
			}
		);
	},
	setQualityInfoPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		
		// 검사종류를 설정해준다.
		$("#measureDetailTypeModal").val(data.measureType || "");
		// 샘플개수를 설정해준다.
		$("#sampleCntModal").val(data.sampleCnt || "");
		// 품목을 설정해준다.
		$("#itemIdModal").val(data.itemId || "");
		// 샘플링 기준을 설정해준다.
		$("#samplingBaseModal").val(data.samplingBase || "");
		// 검사항목을 설정해준다.
		$("#gaugeMethodModal").val(data.gaugeMethod || "");
		// 검사수준을 설정해준다.
		$("#checkLevelModal").val(data.checkLevel || "");
		// 측정방법을 설정해준다.
		$("#measureMethodModal").val(data.measureMethod || "");
		// AQL을 설정해준다.
		$("#aqlModal").val(data.aql || "");
		// 검사규격을 설정해준다.
		$("#measureSpecModal").val(data.measureSpec || "");
		// Target Type을 설정해준다.
		$("#targetTypeModal").val(data.targetType || "ALL");
		// Target을 설정해준다.
		$("#targetModal").val(data.target || "");
		// 계측장비를 설정해준다.
		$("#checkMethodModal").val(data.checkMethod || "");
		// USL을 설정해준다.
		$("#uslModal").val(data.usl || "");
		// 일련번호를 설정해준다.
		$("#seqModal").val(data.seq || "");
		// LSL을 설정해준다.
		$("#lslModal").val(data.lsl || "");
		// 사용유무를 설정해준다.
		$("#useYnModal").val(data.useYn || "Y");
		// 수정자를 설정해준다.
		$("#updateUserNameModal").val(data.updateBy || userId);
		// 수정시간을 설정해준다.
		$("#updateDateModal").val(data.updateDate || curr_date);
		// 비고를 설정해준다.
		$("#descriptionModal").val(data.description || "");
	},
	getQualityInfoPop: function() {
		// modelSuffixMapping 팝업의 데이터를 모아서 준다.
		var result ={
			measureType : $("#measureDetailTypeModal").val(),
			sampleCnt : Number($("#sampleCntModal").val()),
			itemId : 	$("#itemIdModal").val(),
			samplingBase : $("#samplingBaseModal").val(),
			gaugeMethod : $("#gaugeMethodModal").val(),
			checkLevel : $("#checkLevelModal").val(),
			measureMethod : $("#measureMethodModal").val(),
			aql : $("#aqlModal").val(),
			measureSpec : $("#measureSpecModal").val(),
			targetType : $("#targetTypeModal").val(),
			target : $("#targetModal").val(),
			checkMethod :$("#checkMethodModal").val(),
			usl : $("#uslModal").val(),
			seq : Number($("#seqModal").val()),
			lsl :  $("#lslModal").val(),
			useYn : $("#useYnModal").val(),
			updateBy : userId,
			createBy: userId,
			description : $("#descriptionModal").val(),
		}
		return result;
	},
	cudQualityInfoPop : function (type, data, callbackParam) {
		var that = this;
		var param = data;
		mom_ajax(type,"reference.itemInfo.qualityInfo.qualityInfo", JSON.stringify(param), that.callback, callbackParam);
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
  		
  		/*excel_upload(file, 'reference.itemInfo.qualityInfo.qualityInfo', 'MOMIB005', JSON.stringify(param));*/
  		excel_upload(file, 'reference.itemInfo.qualityInfo.qualityInfo', 'MOMIB005', 'grid', JSON.stringify(param), gvThat.callback);
  		$("#uploadPop").micaModal("hide");
  		micaCommon.splash.show();
	},
	getSearchData : function() {
		var param = {
				itemName : $("#itemName").val() || "",
				inMeasureType : $("#inMeasureType").val() || ""
		}
		return param;
	},
	callback :  function(param, data, callbackParam) {
		var that = this.MOMIB005;
		if(param == "SUCCESS"){
			if(callbackParam == true || callbackParam == undefined) {
				micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				mCommon.render("grid", "W201806281312195811000p1yOqMEcV3o",  that.getSearchData());
			}				
		}
		else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
			console.log(data);
		}
	},
	measureMethod : function() {
		if($("#measureMethodModal").val() == "NUMBERLESS") {
			$("#targetLabel, #uslLabel, #lslLabel").find(".circle").addClass("bg-orange");
			$("#targetLabel, #uslLabel, #lslLabel").find(".textblock").addClass("orange");
		} else {
			$("#targetLabel, #uslLabel, #lslLabel").find(".circle").removeClass("bg-orange");
			$("#targetLabel, #uslLabel, #lslLabel").find(".textblock").removeClass("orange");
		}
	}
};
$(document).ready(function(event){
	MOMIB005.init();
});
