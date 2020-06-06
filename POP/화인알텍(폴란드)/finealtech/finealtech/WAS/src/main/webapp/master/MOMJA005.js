var userId = sessionStorage.getItem("userId");
var codeClassId;
var codeSeq;
var rowCount;
var getStartTime;
var getEndTime;
var groupParams;
//var matchValidP = /^[0-9]*$|:|^[0-9]*$/;
var offCodeName;
var addDate;

var MOMJA001 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid1", "W201904242350476031000L3cuq9FQbE5", undefined, function() {
				that.grid("grid1");		
			}, Language);
			
			mCommon.init("grid2", "W201904242358099011001FAAoNu4v5tP", undefined, function() {
				that.grid("grid2");		
			}, Language);
		});
		
		mCommon.splitter(".h01-h", "vertical", 520);
		
		//상세코드 팝업 필드 사이즈 조정
		$("#dropdownlistArrowisUsableC").css("left", "154px");
		
		
	}, 
	grid: function(grid) {
		//복잡한 그리드에 대한 자바스크립트 설정은 아래와 같이 사용할 수 있다.  
		var that = this; // MOMJA001 내부 변수 사용을 위해서 선언.
		
		// 그리드내의 Edit 버튼 컬럼 및 로우를 생성해주는 function 이다.
		that.editColumnSet(grid);
		
		//코드그룹 그리드 세팅
		if(grid == "grid1") {			
			AUIGrid.bind(grid, "rowCheckClick", function(e) {
				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
				mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : e.item.shiftCd}, function(){});
			});
			
			// 코드그룹 그리드 클릭 이벤트 설정			
			AUIGrid.bind(grid, "cellClick", function(e) {
				var item = e.item;
				var rowIdField;
				var rowId;
				
				rowIdField = AUIGrid.getProp(e.pid, 'rowIdField'); 
				rowId = item[rowIdField];
				
				AUIGrid.setAllCheckedRows(grid, false);
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}
				
				// 선택된 코드그룹을 조건으로 우측 코드상세 그리드 리스트 가져온다. 
				mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : e.item.shiftCd}, function(){});
			});
			
			//코드그룹 그리드 조회
			mCommon.render(grid, "W201904242350476031000L3cuq9FQbE5", function(){
				AUIGrid.setSelectionByIndex(grid, 0);
				var items = AUIGrid.getSelectedItems(grid); 
				if(items.length > 0) {
					mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : items[0].item.shiftCd}, function(){});
				}
			});
		} 
		//코드상세 그리드 세팅
		else if(grid == "grid2") {
			tuCommon.cellClick(grid);		
		}
		
	}, 
	event: function() {
		var that = this; // MOMJA005 내부 변수 사용을 위해서 선언.
		
		//코드그룹 조회
		$(document).on("click", "#findBtn", function() {
			AUIGrid.clearGridData("grid2");
			// 코드그룹 검색조건 데이터를 모아서 준다.
			var param = {
				shiftCodeId : $("#searchClassCode").val()
			}
			//검색조건 파라미터 가지고 그리드를 그린다.
			mCommon.render("grid1", "W201904242350476031000L3cuq9FQbE5", param, function(){
				AUIGrid.setSelectionByIndex('grid1', 0);
				var items = AUIGrid.getSelectedItems('grid1'); 
				if(items.length > 0) {
					mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : items[0].item.shiftCd}, function(){});
				}
			});
		});
		
		// 그룹코드 enter로 조회
		$(document).on("keydown", "#searchClassCode", function() {
			if (event.keyCode == 13){
				$("#findBtn").click();
			}			
		});
		
		// 코드그룹 생성 모달 열기 버튼
		$(document).on("click", "#mCreateBtn", function() {
			// 모달창을 연다.
			$("#passwordPop").micaModal("show");
			// 코드그룹 팝업 input, select등을 초기화한다.
			that.setCodeGroupPop();
			that.checkShiftCode();
			// 코드그룹 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. C는 생성.
			$("#pSaveBtn").attr("type", "C");
			$("#startTime, #endTime").attr("readonly", null);
		});
		
		// 코드그룹 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".grid1EditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid1", rowIndex);
			// 코드그룹 모달창을 연다.
			$("#passwordPop").micaModal("show");
			// 코드그룹 팝업의 값들을 세팅해준다.
			that.setCodeGroupPop(item);
			// 코드그룹 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. U는 수정.
			$("#pSaveBtn").attr("type", "U");
		});
		
		// 코드그룹 복사 모달 열기 버튼
		$(document).on("click", "#mCopyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid1");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];  
				else message = Language.lang['MESSAGES10491'];  
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}
			
			// 코드그룹 모달창을 연다.
			$("#passwordPop").micaModal("show");
			// 코드그룹 팝업의 값들을 세팅해준다.
			that.setCodeGroupPop(selectItems[0].item);
			that.checkShiftCode();
			$("#pSaveBtn").attr("type", "C");
			// 복사이고 생성하기 때문에 코드그룹ID를 입력가능하게 바꾼다.
			$("#startTime, #endTime").attr("readonly", null);
			// 복사이고 생성이므로 Shift타입 선택가능하게 바꾼다. 
			$("#shiftType").jqxComboBox({disabled : false});
		});
		
		// 코드그룹 모달 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			var type = $(this).attr("type");
			var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			
			if($("#codeClassId").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11681']});  
				return;
			}
			
			if($("#codeClassName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11682']});  
				return;
			}
			
			if($("#startTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10788']});  
				return;
			}
			
			if($("#endTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11236']});  
				return;
			}
			
			if($("#isUsableG").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11685']});  
				return;
			}
			
//			if(!matchValidP.test($("#startTime").val()) || $("#startTime").val().length != 5) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11686']});  
//				return;
//			}
			
			if(startTime.substr(0,2) > 23 || startTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11687']});  
				return;
			}
						
//			if(!matchValidP.test($("#endTime").val()) || $("#endTime").val().length != 5) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11688']});  
//				return;
//			}
			
			if(endTime.substr(0,2) > 23 || endTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11689']});  
				return;
			}
			
			if(startTime > endTime) {
				addDate = 1;
			} else {
				addDate = 0;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK",   
				after:function(){
					groupParams = that.getCodeGroupPop();
					//그룹코드 등록
					that.cudCodeGroup(type, groupParams);
				}
			}});
		});
		
		// 코드그룹 삭제 버튼
		$(document).on("click", "#mDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid1");
			var callbackChk = false;
			if(selectItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11691'], closeButton:{text:"Close"}, okButton:{text:"OK",   
					after:function(){
						var param;
						var searchParam = {
							codeClassId : $("#searchClassCode").val()
						}
						for(var i = 0; i < selectItems.length; i++) {
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							param = { 
								shiftCodeId : selectItems[i].item.shiftCd,
								startTime : selectItems[i].item.startTime,
								endTime : selectItems[i].item.endTime
							}
							
							if(i == selectItems.length - 1){
								callbackChk = true;
							}
							
							// type으로 delete로 주고 param을 cud 함수로 넘겨서 삭제를 해준다.
							mom_ajax("D", "reference.workinghours.shiftCode.shiftCodeClass", JSON.stringify(param), that.callBackPost, param, callbackChk);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});  
				return;
			}
		});
		
		// 코드상세 등록 팝업 열기
		$(document).on("click", "#dCreateBtn", function() {
			var selectItems = AUIGrid.getSelectedItems("grid1");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1) { 
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11692']});  
				return; 
			}
			// 모달창을 연다.
			$("#dpPop").micaModal("show");
			// 코드상세 팝업 input, select등을 초기화한다.
			// 코드상세는 코드그룹ID가 무조건 선택돼 있어야한다. 그래서 선택된 코드그룹ID를 넘겨준다. 그리드 클릭 이벤트에서 설정된 값이다.
			that.setCodeDetailPop({shiftCd: selectItems[0].item.shiftCd});
			
			$("#dpSaveBtn").attr("type", "C");
			
			// 비가동유형ID만 수정 가능하도록 바꾼다.
			$('#offCodeId').jqxComboBox({disabled: false});
			$("#offCodeName, #offStartTime, #offEndTime").attr("readonly", "readonly");
		});
		
		// 코드상세 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".grid2EditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid2", rowIndex);
			// 코드상세 모달창을 연다.
			$("#dpPop").micaModal("show");
			// 코드상세 팝업의 값들을 세팅해준다.
			that.setCodeDetailPop(item);
			
			$("#dpSaveBtn").attr("type", "U");
			$('#offCodeId').jqxComboBox({disabled: true});
			$("#offCodeName, #offStartTime, #offEndTime").attr("readonly", true);
		});
		
		// 코드상세 복사 팝업 열기
		$(document).on("click", "#dCopyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid2");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];  
				else message = Language.lang['MESSAGES10491'];  
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}
			
			// 코드상세 모달창을 연다.
			$("#dpPop").micaModal("show");
			$("#dpSaveBtn").attr("type", "C");
			
			// 코드상세 팝업의 값들을 세팅해준다.
			that.setCodeDetailPop(selectItems[0].item);
			
			// 비가동유형ID만 수정 가능하도록 바꾼다.
			$('#offCodeId').jqxComboBox({disabled: false});
			$("#offCodeName, #offStartTime, #offEndTime").attr("readonly", true);
		});

		// 코드상세 저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			that.getShiftCode();
//			that.getShiftCodeDetail();
			
			// 기등록된 비가동유형코드가 있을 경우 UPDATE 
//			if(rowCount > 0) {
//				$("#dpSaveBtn").attr("type", "U");
//				var type = $(this).attr("type");
//			} else { // 없을 경우는 INSERT
//				$("#dpSaveBtn").attr("type", "C");
//				var type = $(this).attr("type");
//			}
			
			var type = $(this).attr("type");
			
			var offStartTime = $("#offStartTime").val();
			var offEndTime = $("#offEndTime").val();
			
			if($("#codeClassIds").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11693']});  
				return;
			}
			
			if($("#offCodeId").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11694']});  
				return;
			}
			
			if($("#offCodeName").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11695']});  
				return;
			}
			
			if($("#offStartTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10788']});  
				return;
			}
			
			if($("#offEndTime").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11236']});  
				return;
			}
			
			if($("#isUsableC").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11685']});  
				return;
			}
			
//			if(!matchValidP.test($("#offStartTime").val()) || $("#offStartTime").val().length != 5) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11686']});
//				return;
//			}
			
			if(offStartTime.substr(0,2) > 23 || offStartTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11687']});
				return;
			}
						
//			if(!matchValidP.test($("#offEndTime").val()) || $("#offEndTime").val().length != 5) {
//				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11688']});
//				return;
//			}
			
			if(offEndTime.substr(0,2) > 23 || offEndTime.substr(2,2) > 59) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11689']});
				return;
			}
			
			if(getStartTime > $("#offStartTime").val()) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11696']});
				return;
			}
			
			if(getEndTime > $("#offEndTime").val() && getStartTime > $("#offEndTime").val()) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11697']});
				return;
			}
			
			if(getStartTime > $("#offStartTime").val() && getEndTime < $("#offEndTime").val()) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:"시작시간과 종료시간은 해당 Shift의 시작시간과 종료시간 사이여야 등록할 수 있습니다."});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getCodeDetailPop();
					that.cudCodeDetail(type, param);
				}
			}});
		});
		
		// 코드상세 삭제
		$(document).on("click", "#dDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid2");
			var callbackChk = "";
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10661'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(var i = 0; i < selectItems.length; i++) {
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							var param = {
								shiftCodeId: selectItems[i].item.shiftCd,
								offCodeId: selectItems[i].item.offCd,
								startTime: selectItems[i].item.startTime,
								endTime: selectItems[i].item.endTime
							}
							
							if(i == selectItems.length - 1) {
								callbackChk = "detailCall";
							}
							// type으로 delete로 주고 param을 cud 함수로 넘겨서 삭제를 해준다.
							mom_ajax("D", "admin.shiftCodeDetail", JSON.stringify(param), that.callBackPost, JSON.stringify(param), callbackChk);
						}
					}
				}});
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		// 두개의 팝업 닫기 취소 버튼
		// 쉼표로 여러개를 선택할수 있다.
		$(document).on("click", ".bntpopclose, #pCancelBtn, #dpCancelBtn ", function() {
			// 두개의 팝업을 닫는다.
			$("#passwordPop, #dpPop").micaModal("hide");
		});
		
		$(document).on("change", "#offCodeId", function() {
			$.ajax({
				url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.calOffClass.calOffClass.dummy",
				type : "GET",
				async: false,
				data : {offClassId : $("#offCodeId").val()},
				timeout 	: 30000000,
				dataType 	: 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					if(data.length > 0) {
						offCodeName = data[0].offName;
						offCodeStartTime = data[0].startTime;
						offCodeEndTime = data[0].endTime;
						$("#offCodeName").val(offCodeName);
						$("#offStartTime").val(offCodeStartTime);
						$("#offEndTime").val(offCodeEndTime);
					}
				},
				error: function(data){},
				fail : function(data){}
			});
		});
	}, 
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
	
		// 사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#isUsableG",comboOptions, options);
				micaCommon.comboBox.set("#isUsableC",comboOptions, options);
			}
		);
		
		//비가동유형ID
		mCommon.comboBoxClickCall("#offCodeId", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.calOffClass.calOffClass.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#offCodeId", comboOptions, options);
					callBack();
				}
			);
		});
		
		//Shift Type
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"SHIFT_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#shiftType",comboOptions, options);
				}
			);
		
		$("#startTime").mask("9999");
		$("#endTime").mask("9999");

	}, editColumnSet : function(grid) {// grid 아이디값을 받아 구분한다.
		// 기본적인 그리드 컬럼세팅을 해준다.
		var editColumn = {"headerText":"Edit","dataField":"Edit","width":30,"visible":true,
			renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
			labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
				// return 값으로 HTML을 입력해주면 된다.
				// class 명을 gridID + EditBtn 으로 구분했다.
				// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다. 
				return '<div class="' + grid + 'EditBtn w-icon fa fa-edit icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
			}
		}
		// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
		var gridColumn = AUIGrid.getColumnLayout(grid);
		// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다. 
		// reverse는 javascript array 기본 함수다.
		gridColumn.reverse();
		// 위에서 세팅된 editColumn 값을 넣어준다.
		gridColumn.push(editColumn);
		// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
		gridColumn.reverse();
		// 그리드의 변경된 정보를 바꿔준다.
		AUIGrid.changeColumnLayout(grid, gridColumn);
	}, 
	setCodeGroupPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		// SHIFT코드 값을 설정해준다.
		$("#shiftCodeId").val(data.shiftCd);
		// 그룹코드명 값을 설정해준다.
		$("#shiftCodeName").val(data.shiftName || "");
		// SHIFT타입 값을 설정해준다.
		$("#shiftType").val(data.shiftType || "");
		// 시작시간 값을 설정해준다. null이면 빈값으로 초기화
		$("#startTime").val(data.startTime || "");
		// 종료시간 값을 설정해준다. null이면 빈값으로 초기화
		$("#endTime").val(data.endTime || "");
		// 사용유무 값을 설정해준다. null이면 빈값으로 초기화
		$("#isUsableG").val(data.useYn || "Y");
		// 일련번호 값을 설정해준다.
		$("#mUiSequence").val(data.uiSequence || "");
		// 수정자 값을 설정해준다.
//		$("#modifier").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
//		$("#modifyTime").val(data.updateDate ||get_current_date());
		// 비고 값을 설정해준다.
		$("#description").val(data.description || "");
		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#shiftCodeId, #startTime, #endTime").attr("readonly","readonly");
		$("#shiftType").jqxComboBox({disabled : false});
	}, 
	getCodeGroupPop: function() {
		var startTime = $("#startTime").val().replace(":", "");
		var endTime = $("#endTime").val().replace(":", "");
		// 코드그룹 팝업의 데이터를 모아서 준다.
		var result = {
			shiftCodeId : $("#shiftCodeId").val(),
			shiftCodeName : $("#shiftCodeName").val(),
			shiftType : $("#shiftType").val(),
			startTime : startTime,
			endTime : endTime,
			useYn : $("#isUsableG").val(),
			uiSequence : $("#mUiSequence").val(),
//			updateBy : $("#modifier").val(),
//			updateDate : $("#modifyTime").val(),
			description :$("#description").val(),
			addDate : addDate
		}
		return result;
	}, 
	cudCodeGroup : function (type, data) {
		//코드그룹 CU
		var param = data;
		mom_ajax(type, "reference.workinghours.shiftCode.shiftCodeClass", JSON.stringify(param), this.callBackPost, JSON.stringify(param), "groupCall");
	}, 
	setCodeDetailPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		
		// 코드그룹ID 값을 설정해준다. null이면 빈값으로 초기화.
		$("#shiftCodeIds").val(data.shiftCd || "");
		// 코드ID 값을 설정해준다.
		var items = $('#offCodeId').jqxComboBox('source');
		$('#offCodeId').jqxComboBox("clear");
		$('#offCodeId').jqxComboBox("source", items);
		$("#offCodeId").val(data.offCd || "");
		// 코드명 값을 설정해준다.
		$("#offCodeName").val(data.offName || "");
		// 상위ID 값을 설정해준다.
		$("#offStartTime").val(data.startTime || "");
		// 코드값을 설정해준다.
		$("#offEndTime").val(data.endTime || "");
		// 일련번호 값을 설정해준다.
		$("#dUiSequence").val(data.uiSequence || "");
		// 사용여부 값을 설정해준다. null이면 Y로 초기화.
		$("#isUsableC").val(data.useYn || "Y");
		// 수정자 값을 설정해준다.
//		$("#detailModifier").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
//		$("#detailModifyTime").val(data.updateDate || get_current_date());
		// 비고 값을 설정해준다.
		$("#dpDescription").val(data.description || "");
		
		// 코드그룹, 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#shiftCodeIds, #offStartTime, #offEndTime").attr("readonly","readonly");
	}, getCodeDetailPop: function() {
		// 코드상세 팝업의 데이터를 모아서 준다.
		var result = {
			shiftCodeId : $("#shiftCodeIds").val(),
			offCodeId : $("#offCodeId").val(),
			offCodeName : $("#offCodeName").val(),
			startTime : $("#offStartTime").val(),
			endTime : $("#offEndTime").val(),
			useYn : $("#isUsableC").val(),
			uiSequence : $("#dUiSequence").val(),
//			updateBy : userId,
			description : $("#dpDescription").val()
		}
		return result;
	}, cudCodeDetail : function (type, data) {
		// 상세코드 CUD 해주는 곳이다.
		var param = data;
		// process 호출하여 type을 넘겨주면 데이터가 생성.
		mom_ajax(type, "reference.workinghours.shiftCode.shiftCodeDetail", JSON.stringify(param), this.callBackPost, JSON.stringify(param), "detailCall");
	},
	checkShiftCode : function() {
		// SHIFT 코드 조회하여 팝업 항목에 값 세팅
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClassId.dummy",
			type : "GET",
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					if(data[0] == null) {
						codeClassId = "SH0001";
					} else {
						codeSeq = data[0].codeSeq;
						if(codeSeq > 0 && codeSeq < 9) {
							codeSeq = "000" + (codeSeq + 1);
						} else if(codeSeq >= 9) {
							codeSeq = "00" + (codeSeq + 1);
						} else if(codeSeq >= 99) {
							codeSeq = "0" + (codeSeq + 1);
						} else if(codeSeq >= 999) {
							codeSeq = codeSeq + 1;
						}
						codeClassId = "SH" + codeSeq;
					}
					$("#shiftCodeId").val(codeClassId);
					
				} else {
					codeClassId = "SH0001";
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	getShiftCode : function() {
		var param = {
			shiftCodeId : $("#shiftCodeIds").val()
		}
		
		// SHIFT코드 조회하여 시작시간, 종료시간 가져옴(validation용)
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeClass.dummy",
			type : "GET",
			async: false,
			data : param,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					getStartTime = data[0].startTime;
					getEndTime = data[0].endTime;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	getShiftCodeDetail : function() {
		var param = {
			shiftCodeId : $("#shiftCodeIds").val(),
			offCodeId : $("#offCodeId").val(),
			startTime : $("#offStartTime").val(),
			endTime : $("#offEndTime").val()
		}
		
		// 비가동유형코드 조회하여 기등록된게 있는지 체크
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.workinghours.shiftCode.shiftCodeDetailCount.dummy",
			type : "GET",
			async: false,
			data : param,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				if(data.length > 0) {
					rowCount = data[0].rowCount;
				}
			},
			error: function(data){},
			fail : function(data){}
		});
	},
	callBackPost : function(param, data, callbackParam, flag) {
		var that = this.MOMJA005;
		if(param == 'SUCCESS') {
			if(flag == "groupCall") {
				var searchParam = {
					shiftCodeId : $("#searchClassCode").val()
				}
				var shiftCodeId = groupParams.shiftCodeId;
				$("#passwordPop").micaModal("hide");
				
				if(data.useYn == "Y") {
					mCommon.render("grid1", "W201904242350476031000L3cuq9FQbE5", searchParam, function(){
						mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : shiftCodeId}, function(){});
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
						
						var grid1Length = AUIGrid.getRowCount("grid1");
						var rowId = AUIGrid.indexToRowId('grid1', grid1Length-1);
						AUIGrid.addCheckedRowsByIds('grid1', rowId);
						AUIGrid.setSelectionByIndex('grid1', grid1Length-1);
					});
					
					
				} else {
					// Shift코드 미사용으로 수정 시 해당 Shift의 비가동유형코드도 미사용으로 변경 
					mom_ajax("U", "reference.workinghours.shiftCode.shiftCodeDetailUseFlag", JSON.stringify(data), this.callBackPost, JSON.stringify(data));
					
					mCommon.render("grid1", "W201904242350476031000L3cuq9FQbE5", searchParam, function(){
						mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : shiftCodeId}, function(){});
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					});
				}
			}
			if(flag == "detailCall") {
				var checkedItems = AUIGrid.getCheckedRowItems("grid1");
				// 코드상세 모달창을 닫는다.
				$("#dpPop").micaModal("hide");
				
				if(checkedItems.length > 0) {
					mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : checkedItems[0].item.shiftCd}, function(){
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					});
				} else {
					mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {}, function(){
						micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
					});
				}
			}
			if(flag == true) {
				mCommon.render("grid1", "W201904242350476031000L3cuq9FQbE5", searchParam, function() {
					AUIGrid.setSelectionByIndex("grid1", 0);
					
					var items = AUIGrid.getSelectedItems("grid1"); 
					if(items.length > 0) {
						mCommon.render("grid2", "W201904242358099011001FAAoNu4v5tP", {shiftCodeId : items[0].item.shiftCd}, function(){});
					} else {
						AUIGrid.clearGridData("grid2");
					}
					
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
	         }
		}
	}
};
$(document).ready(function(event){
	MOMJA001.init();
});