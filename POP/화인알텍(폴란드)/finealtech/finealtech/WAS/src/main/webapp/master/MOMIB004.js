var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var gvThat;
var MOMIB004 = {
	init: function() {		
		var that = this;
		gvThat = this;
		that.event();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W201806271045133541000wp7u5DtaozT", null, function() {
				that.grid();
				mCommon.gridPopCreat("grid", {colCount: 2, title: Language.lang['MESSAGES10185']});
				that.comboBox();
				
				// 라벨 색상 변경
				$("#productClassIdLabel, #itemIdLabel, #customerCdLabel, #qtyLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#productClassIdLabel, #itemIdLabel, #customerCdLabel, #qtyLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);
		});
	}, 
	grid: function() {
		editColumnSet("grid");
		
		function editColumnSet(grid) {// grid 아이디값을 받아 구분한다.
			// AUIGrid 세팅은 AUIGrid 홈페이지 Doc를 참고.

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
		}
		
		tuCommon.cellClick('grid');
	}, 
	event: function() {
		var that = this; // MOMIE001 내부 변수 사용을 위해서 선언.
		
		//조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201806271045133541000wp7u5DtaozT", mCommon.formGetParam("#form"), function(){});
		});
		
		//등록 버튼
		$(document).on("click", "#createBtn", function() {
			mCommon.gridPopAdd("grid");
			that.setModalSuffixMappingPop(null);
			$("#gridModalPopSaveBtn").attr("type", "C");
			//편집같은 경우에는 modelSuffix변경이 불가능 하지만 등록할때는 modelSuffix를 입력해줘야하기 때문에 속성 초기화
			$("#productClassIdModal").attr("readonly", null);
			$("#updateUserNameModal, #updateDateModal").attr("readonly", "readonly");
		});

		//팝업 저장 버튼
		$(document).on("click", "#gridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			
			if($("#productClassIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10051']});
				$("#productClassIdModal").focus();
				return;
			}
			
			if($("#itemIdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				$("#itemIdModal").focus();
				return;
			}
			
			if($("#customerCdModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10183']});
				$("#customerCdModal").focus();
				return;
			}
			
			if($("#qtyModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10719']});
				$("#qtyModal").focus();
				return;
			}
			
			if($("#useYnModal").val() == ""){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10565']});
				$("#useYnModal").focus();
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					var param = that.getModalSuffixMappingPop();
					$("#gridModalPop").micaModal("hide");
					that.cudModalSuffixMappingPop(type, param, true);
				}
			}});
			
		});

		//팝업 취소 버튼
		$(document).on("click", "#gridModalPopCancelBtn, .bntpopclose", function() {
			// 등록 팝업을 닫는다.
			$("#gridModalPop").micaModal("hide");
		});

		// 삭제 버튼
		$(document).on("click", "#delBtn", function() {
			// 선택된 데이터 가져오기
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			// confirm 함수로 Y/N 물어봄
			var callbackParam = false;
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10648'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						for(i = 0; i < checkedItems.length; i++){
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							var param = checkedItems[i].item;
							// type으로 delete로 주고 param을 cud 함수로 넘겨서 삭제를 해준다.
							if(i == checkedItems.length - 1){
								callbackParam = true;
							}
							that.cudModalSuffixMappingPop("D", param, callbackParam);
							//저장 후 전체 데이터를 가져온다.
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
			// AUIGrid 내의 기능으로 엑셀 다운로드 가능하다.
			// 두번째 파라미터로 엑셀 파일명을 설정이 가능하다.
			mCommon.auiGridExcelExport("grid", {fileName: "MODEL_SUFFIX_MOMIB004_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "MODEL_SUFFIX_MOMIB004_test"}, "templete");
		});

		// 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			// 팝업창을 연다.
			mCommon.gridPopAdd("grid");
			// 팝업의 값들을 세팅해준다.
			that.setModalSuffixMappingPop(item);
			// 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. put는 수정.
			$("#gridModalPopSaveBtn").attr("type", "U");
			// 수정이기 때문에 modelSuffix,수정자,수정시간이 입력불가능하게 바꾼다.
			$("#productClassIdModal, #updateUserNameModal, #updateDateModal").attr("readonly", "readonly");
		});
		
		// 복사 모달 열기 버튼
		$(document).on("click", "#copyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("grid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			}
			// 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. post는 생성. 복사도 마찬가지로 생성이기 때문에 post
			$("#gridModalPopSaveBtn").attr("type", "C");
			// 모달창을 연다.
			mCommon.gridPopAdd("grid");
			// 팝업의 값들을 세팅해준다.
			that.setModalSuffixMappingPop(selectItems[0].item);
			
			$("#updateUserNameModal, #updateDateModal").attr("readonly", "readonly");
			$("#productClassIdModal").attr("readonly", null);
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
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($('#form'), $('#modelSuffx'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#vendorName'), $('#findBtn'));
		tuCommon.addKeyDown($('#form'), $('#departureVendorName'), $('#findBtn'));
	},
	comboBox: function() {
		//상태
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"USE_FLAG"}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#useYn",{searchMode : "containsignorecase", autoComplete:true, selectedIndex : 0}, {local: data, textName : "name", valueName : "code", readonly : false});
				micaCommon.comboBox.set("#useYnModal",{searchMode : "", autoComplete:true, selectedIndex: 0}, {local: data, textName : "name", valueName : "code", readonly : false});
			}
		);

		
		//품목
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};		
		var options = {textName : "name", valueName : "code"};
		options.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		options.keyName = "key"; // 서버로 검색 조건 키 이름값
		options.minLength = 4; // 최소 검색 수
		options.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#itemIdModal", comboOptions, options);
	
		//고객사, 도착지
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
			{}, // 파라미터
			function(data) {
				micaCommon.comboBox.set("#customerCdModal",{searchMode : "containsignorecase", autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly : false});
				micaCommon.comboBox.set("#destinationCdModal",{searchMode : "containsignorecase", autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly : false});
			}
		);
		
	},
	setModalSuffixMappingPop: function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		var curr_date = get_current_date('yyyy-mm-dd hh24:mi:ss');
		
		// ModelSuffix를 설정해준다.
		$("#productClassIdModal").val(data.productClassId || "");
		// 품목을 설정해준다.
		$("#itemIdModal").val(data.itemId || "");
		// 고객사를 설정해준다.
		$("#customerCdModal").val(data.customerCd || "");
		// 도착지을 설정해준다.
		$("#destinationCdModal").val(data.destinationCd || "");
		// 수량를 설정해준다.
		$("#qtyModal").val(data.qty || "");
		// 시장을 설정해준다.
		$("#marketCdModal").val(data.marketCd || "");
		// 환종을 설정해준다.
		$("#currencyCdModal").val(data.currencyCd || "");
		// 사용유무를 설정해준다.
		$("#useYnModal").val(data.useYn || "Y");
		// 수정자를 설정해준다.
		$("#updateUserNameModal").val(data.updateBy || userId);
		// 수정시간을 설정해준다.
		$("#updateDateModal").val(data.updateDate || curr_date);
		// 비고를 설정해준다.
		$("#descriptionModal").val(data.description || "");

		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#updateUserNameModal, #updateDateModal").attr("readonly","readonly");
	},
	getModalSuffixMappingPop: function() {
		// modelSuffixMapping 팝업의 데이터를 모아서 준다.
		var result ={
			productClassId: $("#productClassIdModal").val(),
			itemId: $("#itemIdModal").val(),
			customerCd:$("#customerCdModal").val(),
			destinationCd: $("#destinationCdModal").val(),
			qty: Number($("#qtyModal").val()),
			marketCd : $("#marketCdModal").val(),
			currencyCd : $("#currencyCdModal").val(),
			useYn: $("#useYnModal").val(),
			description: $("#descriptionModal").val(),
			createBy: userId,
			updateBy: userId
		}
		return result;
	},
	cudModalSuffixMappingPop : function (type, data, callbackParam) {
		// modelSuffixMapping정보 CUD 해주는 곳이다.
		var param = data;
		// process 호출하여 post를 넘겨주면 데이터가 생성.
		mom_ajax(type,"reference.itemInfo.modelSuffixMapping.modelSuffixMapping", JSON.stringify(param), this.callbackPost, callbackParam);
	},
	callbackPost : function(param, data, callbackParam){
		var params = {
				modelSuffx : $("#modelSuffx").val(),
				itemName : $("#itemName").val(),
				vendorName : $("#vendorName").val(),
				departureVendorName : $("#departureVendorName").val(),
				useYn : $("#useYn").val()
		}
		if(param == 'SUCCESS'){
			if(callbackParam == true || callbackParam == undefined) {
				mCommon.render("grid", "W201806271045133541000wp7u5DtaozT", params, function(){
					micaCommon.messageBox({type:"success", width:"400", height: "145", html:Language.lang['MESSAGES10692']});
				});
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
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [ {} ];
   		
   		/*excel_upload(file, 'reference.itemInfo.modelSuffixMapping.modelSuffixMapping', 'MOMIB004', JSON.stringify(param));*/	
   		excel_upload(file, 'reference.itemInfo.modelSuffixMapping.modelSuffixMapping', 'MOMIB004', 'grid', JSON.stringify(param), gvThat.callbackPost);	
   		$("#uploadPop").micaModal("hide");
   		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIB004.init();
});
