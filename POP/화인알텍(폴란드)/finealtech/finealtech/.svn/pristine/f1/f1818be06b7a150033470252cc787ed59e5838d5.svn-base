var userId = sessionStorage.getItem("userId");

var MOMJA001 = {
	init: function() {
		var that = this;
		that.event();
		that.comboBox();
		Language.init(function() {
			mCommon.init("grid1", "W201808102350476031000L3cuq9FQbE5", undefined, function() {
				that.grid("grid1");		
			}, Language);
			
			mCommon.init("grid2", "W201808102358099011001FAAoNu4v5tP", undefined, function() {
				that.grid("grid2");		
			}, Language);
		});
		mCommon.splitter(".h01-h", "vertical", 400);
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
				mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : e.item.codeClassId}, function(){});
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
				mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : e.item.codeClassId}, function(){});
			});
			
			//코드그룹 그리드 조회
			mCommon.render(grid, "W201808102350476031000L3cuq9FQbE5", function(){
				AUIGrid.setSelectionByIndex(grid, 0);
				var items = AUIGrid.getSelectedItems(grid); 
				if(items.length > 0) {
					mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : items[0].item.codeClassId}, function(){});
				}
			});
		} 
		//코드상세 그리드 세팅
		else if(grid == "grid2") {
			tuCommon.cellClick(grid);		
		}
	}, 
	event: function() {
		var that = this; // MOMJA001 내부 변수 사용을 위해서 선언.
		
		//코드그룹 조회
		$(document).on("click", "#findBtn", function() {
			AUIGrid.clearGridData("grid2");
			// 코드그룹 검색조건 데이터를 모아서 준다.
			var param = {
				codeClassId : $("#searchClassCode").val()
			}
			//검색조건 파라미터 가지고 그리드를 그린다.
			mCommon.render("grid1", "W201808102350476031000L3cuq9FQbE5", param, function(){
				// 2018.08.11 hyjeong begin
				AUIGrid.setSelectionByIndex('grid1', 0);
				var items = AUIGrid.getSelectedItems('grid1'); 
				if(items.length > 0) {
					mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : items[0].item.codeClassId}, function(){});
				}
				// 2018.08.11 hyjeong end
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
			// 코드그룹 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. C는 생성.
			$("#pSaveBtn").attr("type", "C");
			// 생성이기 때문에 코드그룹ID가 입력가능하게 바꾼다.
			$("#codeClassId").attr("readonly", null);
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
			// 수정이기 때문에 코드그룹ID가 입력불가능하게 바꾼다.
			$("#codeClassId").attr("readonly", "readonly");
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
			$("#pSaveBtn").attr("type", "C");
			// 복사이고 생성하기 때문에 코드그룹ID를 입력가능하게 바꾼다.
			$("#codeClassId").attr("readonly", null);
			// 코드그룹ID는 Key값이기 때문에 빈 값으로 세팅한다.
			$("#codeClassId").val("");
		});
		
		// 코드그룹 모달 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#codeClassId").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10241']});
				return;
			}
			
			if($("#codeClassName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10244']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getCodeGroupPop();
					var searchParam = {
							codeClassId : $("#searchClassCode").val()
						}
					//그룹코드 등록
					that.cudCodeGroup(type, param);
					
					var codeClassId = param.codeClassId;
					mCommon.render("grid1", "W201808102350476031000L3cuq9FQbE5", searchParam, function(){
						var row = AUIGrid.getRowIndexesByValue("codeClassId", "codeClassId", codeClassId);
						AUIGrid.setSelectionByIndex("grid1", row);
						
						var items = AUIGrid.getSelectedItems("codeClassId"); 
						if(items.length > 0) {
							mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : items[0].item.codeClassId}, function(){});
						}
					});
					
					// 코드그룹 모달창을 닫는다.
					$("#passwordPop").micaModal("hide");
				}
			}});
		});
		
		
		// 코드그룹 삭제 버튼
		$(document).on("click", "#mDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid1");
			for(var i = 0; i < selectItems.length; i++) {
				if(selectItems[i].item.isSystem == "Y") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10784']});
					return;
				}
			}
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10660'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						var param;
						var searchParam = {
								codeClassId : $("#searchClassCode").val()
							}
						for(var i = 0; i < selectItems.length; i++) {
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							param =  { codeClassId : selectItems[i].item.codeClassId }
							// type으로 delete로 주고 param을 cud 함수로 넘겨서 삭제를 해준다.
							mom_ajax("D", "common.codeGroup", JSON.stringify(param));
						}
						
						mCommon.render("grid1", "W201808102350476031000L3cuq9FQbE5", searchParam, function(){
							AUIGrid.setSelectionByIndex("grid1", 0);							
							var items = AUIGrid.getSelectedItems("grid1"); 
							if(items.length > 0) {
								mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", {codeClassId : items[0].item.codeClassId}, function(){});
							}
						});
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
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11503']});
				return; 
			}
			// 모달창을 연다.
			$("#dpPop").micaModal("show");
			// 코드상세 팝업 input, select등을 초기화한다.
			// 코드상세는 코드그룹ID가 무조건 선택돼 있어야한다. 그래서 선택된 코드그룹ID를 넘겨준다. 그리드 클릭 이벤트에서 설정된 값이다.
			that.setCodeDetailPop({codeClassId: selectItems[0].item.codeClassId});
			
			$("#dpSaveBtn").attr("type", "C");
			
			// 생성이기 때문에 코드ID가 입력가능하게 바꾼다.
			$("#codeId").attr("readonly", null);
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
		
			// 수정이기 때문에 코드ID가 입력불가능하게 바꾼다.
			$("#codeId").attr("readonly", "readonly");
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
			
			// 복사이고 생성하기 때문에 코드ID가 입력가능하게 바꾼다.
			$("#codeId").attr("readonly", null);
			
			// 코드ID는 Key값이기 때문에 빈 값으로 세팅한다.
			$("#codeId").val("");
		});

		// 코드상세 저장 버튼
		$(document).on("click", "#dpSaveBtn", function() {
			//버튼 type 세팅
			var type = $(this).attr("type");
			
			if($("#codeId").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11499']});
				return;
			}
			
			if($("#codeName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11506']});
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getCodeDetailPop();
					
					that.cudCodeDetail(type, param);
					
					mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", param, function(){});
					// 코드상세 모달창을 닫는다.
					$("#dpPop").micaModal("hide");
				}
			}});
		});
		
		// 코드상세 삭제
		$(document).on("click", "#dDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("grid2");
			for(var i = 0; i < selectItems.length; i++) {
				if(selectItems[i].item.isSystem == "Y") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10784']});
					return;
				}
			}
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10661'], closeButton:{text:"Close"}, okButton:{text:"OK",    
					after:function(){
						for(var i = 0; i < selectItems.length; i++) {
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							var param = {
								codeId: selectItems[i].item.codeId,
								codeClassId: selectItems[i].item.codeClassId,
							}
							// type으로 delete로 주고 param을 cud 함수로 넘겨서 삭제를 해준다.
							that.cudCodeDetail("D", param);
						}
						mCommon.render("grid2", "W201808102358099011001FAAoNu4v5tP", param, function(){});
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
	}, 
	comboBox: function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", selectedIndex:0, readonly : false};
	
		// 코드타입
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"CODE_TYPE"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#codeType",comboOptions, options);
			}
		);
		
		// 사용유무
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#isUsableG",comboOptions, options);
				micaCommon.comboBox.set("#isUsableC",comboOptions, options);
			}
		);
		
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
		// 그룹코드 값을 설정해준다. null이면 빈값으로 초기화.
		$("#codeClassId").val(data.codeClassId || "");
		// 그룹코드명 값을 설정해준다.
		$("#codeClassName").val(data.codeClassName || "");
		// 코드타입 값을 설정해준다. null이면 빈값으로 초기화
		$("#codeType").val(data.codeType || "");
		// 상위그룹코드 값을 설정해준다. null이면 빈값으로 초기화
		$("#codeClassGroup").val(data.codeClassGroup || "");
		// 사용유무 값을 설정해준다. null이면 빈값으로 초기화
		$("#isUsableG").val(data.useYn || "Y");
		// 수정자 값을 설정해준다.
		$("#modifier").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#modifyTime").val(data.updateDate ||get_current_date());
		// 비고 값을 설정해준다.
		$("#description").val(data.description || "");
		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#modifier, #modifyTime").attr("readonly","readonly");
	}, 
	getCodeGroupPop: function() {
		// 코드그룹 팝업의 데이터를 모아서 준다.
		var result = {
			codeClassId : $("#codeClassId").val(),
			codeClassName : $("#codeClassName").val(),
			codeType : $("#codeType").val(),
			codeClassGroup : $("#codeClassGroup").val(),
			useYn : $("#isUsableG").val(),
			updateBy : $("#modifier").val(),
			updateDate : $("#modifyTime").val(),
			description :$("#description").val()
		}
		return result;
	}, 
	cudCodeGroup : function (type, data) {
		//코드그룹 CUD
		var param = data;
		mom_ajax(type, "common.codeGroup", JSON.stringify(param));
	}, 
	setCodeDetailPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		
		// 코드그룹ID 값을 설정해준다. null이면 빈값으로 초기화.
		$("#codeClassIds").val(data.codeClassId || "");
		// 코드ID 값을 설정해준다.
		$("#codeId").val(data.codeId || "");
		// 코드명 값을 설정해준다.
		$("#codeName").val(data.codeName || "");
		// 상위ID 값을 설정해준다.
		$("#parentId").val(data.parentId || "");
		// 코드값을 설정해준다.
		$("#codeValues").val(data.codeValues || "");
		// 일련번호 값을 설정해준다.
		$("#uiSequence").val(data.uiSequence || "");
		// 사용여부 값을 설정해준다. null이면 Y로 초기화.
		$("#isUsableC").val(data.useYn || "Y");
		// ATTR1 값을 설정해준다.
		$("#attribute1").val(data.attribute1 || "");
		// ATTR2 값을 설정해준다.
		$("#attribute2").val(data.attribute2 || "");
		// ATTR3 값을 설정해준다.
		$("#attribute3").val(data.attribute3 || "");
		// ATTR4 값을 설정해준다.
		$("#attribute4").val(data.attribute4 || "");
		// ATTR5 값을 설정해준다.
		$("#attribute5").val(data.attribute5 || "");
		// ATTR6 값을 설정해준다.
		$("#attribute6").val(data.attribute6 || "");
		// ATTR7 값을 설정해준다.
		$("#attribute7").val(data.attribute7 || "");
		// ATTR8 값을 설정해준다.
		$("#attribute8").val(data.attribute8 || "");
		// ATTR9 값을 설정해준다.
		$("#attribute9").val(data.attribute9 || "");
		// ATTR10 값을 설정해준다.
		$("#attribute10").val(data.attribute10 || "");
		// ATTR11 값을 설정해준다.
		$("#attribute11").val(data.attribute11 || "");
		// ATTR12 값을 설정해준다.
		$("#attribute12").val(data.attribute12 || "");
		// ATTR13 값을 설정해준다.
		$("#attribute13").val(data.attribute13 || "");
		// ATTR14 값을 설정해준다.
		$("#attribute14").val(data.attribute14 || "");
		// ATTR15 값을 설정해준다.
		$("#attribute15").val(data.attribute15 || "");
		$("#attribute16").val(data.attribute16 || "");
		$("#attribute17").val(data.attribute17 || "");
		$("#attribute18").val(data.attribute18 || "");
		$("#attribute19").val(data.attribute19 || "");
		$("#attribute20").val(data.attribute20 || "");
		// 수정자 값을 설정해준다.
		$("#detailModifier").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#detailModifyTime").val(data.updateDate || get_current_date());
		// 비고 값을 설정해준다.
		$("#dpDescription").val(data.description || "");
		
		// 코드그룹, 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#codeClassIds, #detailModifier, #detailModifyTime").attr("readonly","readonly");
		
	}, getCodeDetailPop: function() {
		// 코드상세 팝업의 데이터를 모아서 준다.
		var result ={
			codeClassId : $("#codeClassIds").val(),
			codeId : $("#codeId").val(),
			codeName : $("#codeName").val(),
			parentId : $("#parentId").val(),
			codeValues : $("#codeValues").val(),
			useYn : $("#isUsableC").val(),
			uiSequence : $("#uiSequence").val(),
			attribute1 : $("#attribute1").val(),
			attribute2 : $("#attribute2").val(),
			attribute3 : $("#attribute3").val(),
			attribute4 : $("#attribute4").val(),
			attribute5 : $("#attribute5").val(),
			attribute6 : $("#attribute6").val(),
			attribute7 : $("#attribute7").val(),
			attribute8 : $("#attribute8").val(),
			attribute9 : $("#attribute9").val(),
			attribute10 : $("#attribute10").val(),
			attribute11 : $("#attribute11").val(),
			attribute12 : $("#attribute12").val(),
			attribute13 : $("#attribute13").val(),
			attribute14 : $("#attribute14").val(),
			attribute15 : $("#attribute15").val(),
			attribute16 : $("#attribute16").val(),
			attribute17 : $("#attribute17").val(),
			attribute18 : $("#attribute18").val(),
			attribute19 : $("#attribute19").val(),
			attribute20 : $("#attribute20").val(),
			updateBy : userId,
			description : $("#dpDescription").val()
		}
		return result;
	}, cudCodeDetail : function (type, data) {
		// 상세코드 CUD 해주는 곳이다.
		var param = data;
		// process 호출하여 type을 넘겨주면 데이터가 생성.
		mom_ajax(type, "common.codeDetail", JSON.stringify(param));
	}
};
$(document).ready(function(event){
	MOMJA001.init();
});