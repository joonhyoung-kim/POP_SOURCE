var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var specId;
var state;
var specPassword;
var encPassword;
var specIdType;
var comboUrl;

//시방서 대표모델ID인지 모델ID인지 구별
$.ajax({
	type : 'GET',
	url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comParameter.dummy',
	timeout : 30000000,
	async : false,
	dataType : 'json',
	contentType : 'application/json; charset=UTF-8',
	success : function(data){
		specIdType = data[0].specificationType;
	},
	error : function(error){
		errors = error;
	},
	fail : function(){
		micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
	}
});

if(specIdType == "I") {
	$("#modelIdCondition").show();
	$("#reqModelIdCondition").hide();
	comboUrl = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy";
} else {
	$("#modelIdCondition").hide();
	$("#reqModelIdCondition").show();
	comboUrl = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.document.specification.rpItemId.dummy";
}

var that;

var MOMID001 = {
	init: function() {
		that = this;
		that.event();

		// 파일업로드 팝업 사이즈 수정
		$("#popFileUpload #panel").css("width", "40%");
		$(".fileinput").css("min-width", "420px");
		
		Language.init(function() {
			mCommon.init("grid", "W201806291637022251000KfXb4FS90eM", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES10761']});
				that.fileInpuSet();
				that.comboBox();
				
				// 라벨 색상 변경
				$("#itemIdLabel, #specPasswordLabel, #bomSupplyDateLabel, #ecoNoLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#itemIdLabel, #specPasswordLabel, #bomSupplyDateLabel, #ecoNoLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				// 팝업 내 그리드 사이즈 정의
				AUIGrid.setProp("auigrid", {showAutoNoDataMessage : false});
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			}, Language);	
		});
		
	}, grid: function() {
		var fromDate = get_date_diff(-1);
		var toDate = get_current_date('YYYY-MM-DD');
		$("#fromDate").val(fromDate);
		$("#toDate").val(toDate);
		
		editColumnSet("grid");
		
		function editColumnSet(grid) {
			// 기본적인 그리드 컬럼세팅을 해준다.
			var editColumn = {"headerText":"Edit","dataField":"Edit","width":40,"visible":true,
				renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
				labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
					// return 값으로 HTML을 입력해주면 된다.
					// class 명을 gridID + EditBtn 으로 구분했다.
					// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
					return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
				}
			}
			
			var fileColumn = {"headerText":"File","dataField":"File","width":40,"visible":true,
				renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
				labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
					// return 값으로 HTML을 입력해주면 된다.
					// class 명을 gridID + EditBtn 으로 구분했다.
					// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
					return '<div class="' + grid + 'FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
				}
			}
			
			// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
			var gridColumn = AUIGrid.getColumnLayout(grid);
			// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다.
			// reverse는 javascript array 기본 함수다.
			gridColumn.reverse();
			// 위에서 세팅된 editColumn 값을 넣어준다.
			gridColumn.push(editColumn, fileColumn);
			// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
			gridColumn.reverse();
			// 그리드의 변경된 정보를 바꿔준다.
			AUIGrid.changeColumnLayout(grid, gridColumn);
		}
		
		tuCommon.cellClick('grid');
		
	}, event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201806291637022251000KfXb4FS90eM", mCommon.formGetParam("#form"), function(){});
		});
		
		//등록 버튼
		$(document).on("click", "#createBtn", function() {
			getComboList();
			function getComboList(){
				$.ajax({
					type : 'GET',
					url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comSequence.dummy',
					timeout : 30000000,
					async : false,
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						specId = data[0].sequence;
					},
					error : function(error){
						errors = error;
					},
					fail : function(){
						micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
					}
				});
			}
			callbackStr = "insCall";
			
			mCommon.gridPopAdd("grid");
			if(specIdType == "G") {
				$("#itemIdLabel")[0].innerText = "￭ " + Language.lang['MESSAGES10324'];
				$("#itemIdLabel")[0].style.color = "orange";
			}
			that.setModalSuffixMappingPop([],"C");
			state = "CREATE";
			$("b").detach();
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#fileUploadBtn").attr("type", "C");
			$("#specPasswordModal").attr("type", "password");
			$("#attachFileModal").parent().append('<a id="attachFileModal" href="#" class="w-inline-block btntool blue"> <div tmptabid="six" data-undefined="fa-folder-open-o" class="w-icon fa fa-folder-open-o icon"></div> <div class="textblock">' + Language.lang['MESSAGES11317'] +'</div> </a>')
			$("#attachFileModal").remove();			
			$("#specPasswordModal").attr("readonly", null);
			$("#updateUserNameModal, #updateDateModal, #salesConfirmDateModal, #productConfirmDateModal, #materialConfirmDateModal, #vendorConfirmDateModal, #confirmDateModal").attr("readonly", "readonly");
		});

		//팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#ecoNoModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10024']});
				return;
			}
			
			if($("#itemIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			
			if($("#specPasswordModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10763']});
				return;
			}
			
			if($("#bomSupplyDateModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10017']});
				return;
			}
			
			if($("#useYnModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				return;
			}
			
//			var callbackStr = "upCall";
			
//			if(type == "C") {
//				getComboList();
//				
//				function getComboList(){
//					$.ajax({
//						type : 'GET',
//						url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comSequence.dummy',
//						timeout : 30000000,
//						async : false,
//						dataType : 'json',
//						contentType : 'application/json; charset=UTF-8',
//						success : function(data){
//							specId = data[0].sequence;
//						},
//						error : function(error){
//							errors = error;
//						},
//						fail : function(){
//							micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
//						}
//					});
//				}
//				
//				callbackStr = "insCall";
//			}
						
			var param = that.getModalSuffixMappingPop();
			
			param.specId = specId;
			specPassword = param.specPassword;
			
			/*** 패스워드 암호화해서 다시 리턴 *****************************************************************************************************/
			that.getEncPassword(specPassword);
			param.specPassword = encPassword;	
			/*******************************************************************************************************************************/
			
			mom_ajax(type, "reference.document.specification.specification", JSON.stringify(param), that.callBack, param, type);
		});
		
		//Edit 버튼
		$(document).on("click", ".gridEditBtn", function() {
			var rowIndex = $(this).attr("row-index");
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			
			mCommon.gridPopAdd("grid");
			that.setModalSuffixMappingPop(item);
			
			state = "UPDATE";
			$("b").detach();
			$("#gridModalPopSaveBtn").attr("type", "U");
			$("#fileUploadBtn").attr("type", "U");
			$("#attachFileModal").parent().append('<a id="attachFile" href="#" class="w-inline-block btntool blue"> <div tmptabid="six" data-undefined="fa-folder-open-o" class="w-icon fa fa-folder-open-o icon"></div><div class="textblock">첨부</div></a>');
			$("#attachFileModal").remove();
			$("#specPasswordModal").parent().append('<b><a id="changeSpecPassword" href="#" class="w-inline-block btntool blue"> <div class="textblock">변경</div></a></b>');
			$("#specPasswordModal").attr("type", "password");
			$("#specPasswordModal, #updateUserNameModal, #updateDateModal, #salesConfirmDateModal, #productConfirmDateModal, #materialConfirmDateModal, #vendorConfirmDateModal, #confirmDateModal").attr("readonly", "readonly");
		});
		
		//File 버튼
		$(document).on("click", ".gridFileBtn, #attachFile, #attachFileModal", function() {
			AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			$("#fileUpload").val("");
			var btnType = $(this).attr('class');
			var selSpecId = specId;
			if(btnType.indexOf("gridFileBtn") != -1) {
				specId = AUIGrid.getSelectedItems("grid")[0].item.specId; 
				$("#fileUploadBtn").attr("type", "U");
			} 
			var param = { fileId : selSpecId,
						  entityName : 'MOMID001',
						  entityId : specId}
			
			mCommon.render("auigrid", "W2018082314330345610001wGOlkaGyFf", param, function(){
				$("#popFileUpload").micaModal("show");
			});		
		});
		
		//시방서 비밀번호 변경 팝업창 호출
		$(document).on("click", "#changeSpecPassword", function() {
			//비밀번호 변경 팝업창 띄워줌
			$("#nowPassword").val("");
			$("#newPassword").val("");
			$("#newPasswordConfirm").val("");
			$("#popChangepassword").micaModal("show");
		});
		
		//시방서 비밀번호 변경 버튼
		$(document).on("click", "#changePwBtn", function() {
			if($("#nowPassword").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11009']});
				return;
			}
			
			if($("#newPassword").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10801']});
				return;
			}
			
			if($("#newPasswordConfirm").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11641']});
				return;
			}
			
			// 입력받은 이전 비밀번호 암호화 리턴
			that.getEncPassword($("#nowPassword").val());
			
			var chkSpecPassword = mCommon.sha256Set($("#specPasswordModal").val());
			
			//현재 비밀번호와 변경할 비밀번호가 같으면 messageBox 호출하여 비밀번호 변경 불가
			if(chkSpecPassword != encPassword) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11008']});
				return;
			}
			
			//변경할 비밀번호가 다르면 messageBox 호출하여 비밀번호 변경 불가
			if($("#newPassword").val() != $("#newPasswordConfirm").val()) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10480']});
				return;
			}
			
			// 신규 패스워드 암호화 리턴
			that.getEncPassword($("#newPassword").val());

			var param = {
				specId : specId,
				specPassword : encPassword
			}
			
			mom_ajax("U","reference.document.specification.changePassword", JSON.stringify(param), that.callBack, encPassword, "changePassword");
		});
		
		// 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			if(selectItems.length > 1 || selectItems.length < 1) { 
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}

			mCommon.gridPopAdd("grid");
			that.setModalSuffixMappingPop(selectItems[0].item, "C");
			$("b").detach();
			state = "CREATE";
			$("#gridModalPopSaveBtn").attr("type", "C");
			$("#fileUploadBtn").attr("type", "C");
			$("#specPasswordModal").attr("type", "password");
			
			$("#updateUserNameModal, #updateDateModal, #salesConfirmDateModal, #productConfirmDateModal, #materialConfirmDateModal, #vendorConfirmDateModal, #confirmDateModal").attr("readonly", "readonly");
		});
		
		//삭제 버튼
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length <= 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10653'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){	
					for(var i = 0; i < checkedItems.length; i++){
						var param = {
							specId : checkedItems[i].item.specId
						}
						var check = {
							totalCnt : checkedItems.length - 1,
							pCnt : i
						}
						
						mom_ajax("D","reference.document.specification.specification", JSON.stringify(param), that.callBack, check, "delCall");
					}
				}
			}});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			AUIGrid.exportToXlsx("grid", {fileName: "SPECIFICATION_MOMID001"});
		});
		
		$(document).on("change", "#file", function(){
			$("#uploadFileName").val($(this).val());
		});
				
		// 파일 업로드 버튼 (파일 등록)
		$(document).on("click", "#fileUploadBtn, #fileDelBtn", function(){
			var type = $("#fileUploadBtn").attr("type");
			$("#password").val("");
			
			if($(this).attr("id") == "fileUploadBtn") {
				//등록
				if($("#fileUpload").val() == "") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10347']});
					return;
				}
				$("#checkPwBtn").attr("type", "C");
			} else {
				//삭제
				$("#checkPwBtn").attr("type", "D");
			}
			
			// 등록시는 패스워드 확인 없이 처리
			if(type == "C") {
				// 파일 등록 / 삭제 함수 바로 호출
				that.uploadFileControl($("#checkPwBtn").attr("type"));
			} else {
				$("#popPassword").micaModal("show");
			}
		});
				
		// 패스워드 확인 버튼
		$(document).on("click", "#checkPwBtn", function(){			
			// 등록 / 삭제 구분
			var type = $("#checkPwBtn").attr("type");
			
			if($("#password").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10549']});
				return;
			}
			
			var chkPassword = AUIGrid.getSelectedItems("grid")[0].item.specPassword;			
			// 확인할 패스워드 암호화 리턴
			that.getEncPassword($("#password").val());
			
			if(chkPassword == encPassword) {
				$('#popPassword').micaModal("hide");
				that.uploadFileControl(type);
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10548']});
				return;
			}			
		});
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, #gridModalPopCancelBtn, #changePwCancelBtn, #checkPwCancelBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			
			if(type == "C") {				
				$(".modal").micaModal("hide");
				$("#fileCloseBtn").attr("type", "");
				mCommon.render('grid', 'W201806291637022251000KfXb4FS90eM', mCommon.formGetParam("#form"), 
					function(){micaCommon.messageBox({type:"info",  width:"400", height: "145", html:Language.lang['MESSAGES10338']});
				});				
			} else {
				$(this).closest(".modal").micaModal("hide");
			}			
		});
		
		//파일 다운로드 버튼
		$(document).on("click", "#fileDownBtn", function() {
			var items = AUIGrid.getCheckedRowItems("auigrid");
			for(var i = 0; i < items.length; i++) {
				attach_download(specId, 'MOMID001', items[i].item.oldFileName);	
			}
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#modelId'), $('#modelId'), $('#findBtn'));
		tuCommon.addKeyDown($('#ecoNo'), $('#ecoNo'), $('#findBtn'));
		tuCommon.addKeyDown($('#type'), $('#type'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		//모델 ID		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = comboUrl; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, optItems);
		
		if(specIdType == "G") {
			//대표모델 ID 
			var optItems = {textName : "name", valueName : "code"};
			optItems.url = comboUrl; // 검색 URL
			optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
			optItems.minLength = 4; // 최소 검색 수
			optItems.param = {divisionCd: divisionCd, key: $("#repModelId").val()}; // 파라미터		
			mCommon.comboBoxSearchCall("#repModelId", comboOptions, optItems);
		}
		
		//업체코드 ID
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#vendorCdModal", comboOptions, options);
			}
		);
		
		//사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId: "USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#useYnModal", comboOptions, options);
			}
		);
	},
	setModalSuffixMappingPop : function(data, flag) { 
		data = data || {};
		if(flag !="C") {
			specId = data.specId;
		}
		
		$("#itemIdModal").val(data.itemId || "");
		$("#specTitleModal").val(data.specTitle || "");
		$("#vendorCdModal").val(data.vendorCd || "");
		$("#salesConfirmDateModal").val(data.salesConfirmDate || "");
		$("#ecoNoModal").val(data.ecoNo || "");
		$("#productConfirmDateModal").val(data.productConfirmDate || "");
		$("#materialConfirmDateModal").val(data.materialConfirmDate || "");
		
		// 복사시는 비밀번호 초기화
		if(flag != "C") {
			$("#specPasswordModal").val(data.specPassword || "");
		}
		
		$("#vendorConfirmDateModal").val(data.vendorConfirmDate || "");
		$("#bomSupplyDateModal").val(data.bomSupplyDate || "");
		$("#confirmDateModal").val(data.confirmDate || "");
		$("#createDateModal").val(data.createDate || "");
		$("#updateDateModal").val(data.updateDate || get_current_date());
		$("#updateUserNameModal").val(data.updateBy || userId);
		$("#useYnModal").val(data.useYn || "Y");
		$("#descriptionModal").val(data.description || "");
	},
	getModalSuffixMappingPop : function(data) { 
		var result = {
			specType : $("#specTypeModal").val(),
			specTitle : $("#specTitleModal").val(),
			itemId : $("#itemIdModal").val(),
			state : state,
			vendorCd : $("#vendorCdModal").val(),
			bomSupplyDate : $("#bomSupplyDateModal").val(),
			qaConfirm : $("#qaConfirmModal").val(),
			materialConfirmDate : $("#materialConfirmDateModal").val(),
			salesConfirmDate : $("#salesConfirmDateModal").val(),
			productConfirmDate : $("#productConfirmDateModal").val(),
			vendorConfirmDate : $("#vendorConfirmDateModal").val(),
			createDate : $("#createDateModal").val(),
			specPassword : $("#specPasswordModal").val(),
			description : $("#descriptionModal").val(),
			ecoNo : $("#ecoNoModal").val(),
			useYn : $("#useYnModal").val()
		}
		
		return result;
	},
	callBack : function(result, data, param, callbackParam, flag){
		var that = this.MOMID001;
		if(result == "SUCCESS") {
			if(flag == "C") {				
				$("#gridModalPop").micaModal("hide");
				mCommon.render('grid', 'W201806291637022251000KfXb4FS90eM', mCommon.formGetParam("#form"), 
					function(){micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10338']});
				});
			} else if(flag == "U"){
				// 2018.08.28 hyjeong begin
				$("#gridModalPop").micaModal("hide");
				mCommon.render('grid', 'W201806291637022251000KfXb4FS90eM', mCommon.formGetParam("#form"), 
					function(){micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES11193']});
				});
				// 2018.08.28 hyjeong end
			} else if(flag == "changePassword"){	
				$("#specPasswordModal").val(encPassword);
				$("#popChangepassword").micaModal("hide");
				//변경된 비밀번호 세팅
				AUIGrid.setCellValue("grid", AUIGrid.getSelectedIndex("grid")[0], "specPassword", callbackParam);
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10477']});
			} else {
				if(callbackParam.totalCnt == callbackParam.pCnt) {
					mCommon.render('grid', 'W201806291637022251000KfXb4FS90eM', mCommon.formGetParam("#form"), 
						function(){micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10578']});
					});
				}
			}
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
			} else {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.lang['MESSAGES10821']});
			}
			console.log(data);
		}
	},
	getSearchData : function(){
		var param = {
			fromDate : $("#fromDate").val(),
			toDate : $("#toDate").val(), 
			modelId : $("#modelId").val(),
			ecoNo : $("#ecoNo").val(),
			type : $("#type").val()
		}
		
		return param;
	},
	fileInpuSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	},
	getEncPassword : function(password) {
		encPassword = mCommon.sha256Set(password);
		
//		$.ajax({
//			type : 'GET',
//			url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comEncPassword.dummy',
//			timeout : 30000000,
//			async : false,
//			dataType : 'json',
//			data : {specPassword:password},
//			contentType : 'application/json; charset=UTF-8',
//			success : function(data){
//				if(data.length > 0) {
//					encPassword = data[0].password;
//				}
//			},
//			error : function(error){
//				errors = error;
//			},
//			fail : function(data){
//				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
//					micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
//				} else {
//					micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
//				}
//			}
//		});
	},
	// 파일 업로드 / 삭제 함수
	uploadFileControl : function(type) {
		if(type == "C") {
//			$("#gridModalPop").micaModal("hide");
			var attach = document.getElementById('fileUpload');
			attach_upload(attach, 'MOMID001', specId, '{}', function(flag, response){
				if(flag == 'SUCCESS') {
					var param = {
							entityId   : specId,
							entityName : 'MOMID001'
					}
					mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
				}
			});
			$("#popPassword").hide();
		} else {
			var items = AUIGrid.getCheckedRowItems("auigrid");
			for(var i = 0; items.length; i++) {
				var param =  { fileId : items[i].item.fileId };
				if(i == AUIGrid.getCheckedRowItems("auigrid").length - 1) {
					mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data){
						if(flag == 'SUCCESS') {
							var param = {
									entityId   : specId,
									entityName : 'MOMID001'
							}
							mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
						}
					});
				} else {
					mom_ajax('D', 'common.file', JSON.stringify(param));
				}
			}
		}
	}
};
$(document).ready(function(event){
    momWidget.init(1, 'MOMID001_1', MOMID001_1);
    MOMID001_1.init();
});