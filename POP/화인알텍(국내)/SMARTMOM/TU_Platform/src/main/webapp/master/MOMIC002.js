var userId = sessionStorage.getItem("userId");
var divisionCd = sessionStorage.getItem("divisionCd");
var currentDate = get_current_date('YYYY-MM-DD');
var params;

var MOMIC002 = {
	init: function() {		
		var that = this;		
		that.event();
		that.comboBox();
		that.fileInpuSet();
		Language.init(function() {
			mCommon.init("grid", "W201806271803251831000ytALXPNAxm1", null, function() {
				that.grid();	
			}, Language);
		});
	}, 
	grid: function() {		
		var that = this;
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
		var that = this;
		// 자재단가관리 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".gridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("grid", rowIndex);
			
			// Shift 모달창을 연다.
			$("#pop").micaModal("show");
			// Shift 팝업의 값들을 세팅해준다.
			cudFlag = "U";
			that.setCostPricePop(item);
			
			$("#pItemName, #pVendorName, #marketName, #currencyName").jqxComboBox({disabled: true});
			$("#startDate, #endDate, #createUserName, #updateUserName").attr("readonly", "readonly");
			$("#startDate, #endDate").datetimepicker("destroy");
			$("#startDate, #endDate, #updateUserName, #updateDate, #prevPrice").attr("readonly", "readonly");
		});
		
		// 조회 버튼
		$(document).on("click","#findBtn",function(){
			mCommon.render("grid", "W201806271803251831000ytALXPNAxm1", that.getSearchData(), function(){});
		});
		
		// 등록 버튼
		$(document).on("click", "#createBtn", function() {
			$("#pop").micaModal("show");
			cudFlag = "C";
			that.setCostPricePop();
			$("#pItemName, #pVendorName, #marketName, #currencyName").jqxComboBox({disabled: false});
			micaCommon.datetimepicker("#startDate, #endDate", {dateFormat: "date", dataFormat: "Y-m-d"});
			$("#startDate, #endDate").attr("readonly", null);
			$("#updateUserName, #updateDate, #prevPrice").attr("readonly", "readonly");
		});
		
		//삭제 버튼
		$(document).on('click', '#delBtn', function(){
			var checkedItems = AUIGrid.getCheckedRowItems('grid');
			cudFlag = "D";
			params = that.getCostPricePop();
			if(checkedItems.length > 0) {
				micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11737'], closeButton:{text:"Close"}, okButton:{text:"OK", 
					after:function(){
						mom_ajax('D', 'reference.price.costPrice.costPriceTemp', JSON.stringify(params), that.delCallback, checkedItems);
					}
				}});				
			} else {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		// 팝업 취소 버튼
		$(document).on("click", "#pCancelBtn, .bntpopclose", function() {
			$("#pop").micaModal("hide");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "COST_PRICE_MOMIC002_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "COST_PRICE_MOMIC002_test"}, "templete");
		});
		
		// 팝업 저장 버튼
		$(document).on("click", "#pSaveBtn", function() {
			if($("#pItemName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11589']});
				return;
			}
			
			if($("#pVendorName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10848']});
				return;
			}

			if($("#currencyName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11657']});
				return;
			}
			
			if($("#marketName").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10044']});
				return;
			}
			
			if($("#startDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10796']});
				return;
			}
			
			if($("#endDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11240']});
				return;
			}
			
			var inputStartDate = new Date($("#startDate").val());
			var inputEndDate = new Date($("#endDate").val());
			
			if(inputStartDate > inputEndDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10785']});
				$("#endDate").focus();
				return;
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					params = that.getCostPricePop();
					$("#pop").micaModal("hide");
					
					mom_ajax("D", "reference.price.costPrice.costPriceTemp", JSON.stringify(params), that.upCallback);
				}
			}});
			
		});
		
		// 복사
		$(document).on("click", "#copyBtn", function(){
			var checkedItems = AUIGrid.getCheckedRowItems("grid");
			if(checkedItems.length > 1 || checkedItems.length == 0){
				var message = "";
				if(checkedItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html:message});
				return; 
			} else {
				cudFlag = "C";
				that.setCostPricePop(checkedItems[0].item);
				$("#pop").micaModal("show");
			}
			$("#pItemName, #pVendorName, #marketName, #currencyName").jqxComboBox({disabled: false});
			micaCommon.datetimepicker("#startDate, #endDate", {dateFormat: "date", dataFormat: "Y-m-d"});
			$("#startDate, #endDate, #createUserName, #startDate, #endDate").attr("readonly", null);
			$("#updateUserName, #updateDate").attr("readonly", "readonly");
		});
		
		// 엑셀등록 팝업
		$(document).on("click", "#excelUpBtn", function() {
			$("#uploadPop").micaModal("show");
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
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
	},
	comboBox : function(){
		var comboOptions = {searchMode : "containsignorecase", autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		$("#fromDate").val(get_date_diff(0));
		
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy', {}, function(data){
				options.local = data;
				micaCommon.comboBox.set("#vendorName",comboOptions, options);
				callBack();
			});
		});
					
		mCommon.comboBoxClickCall("#pVendorName", function(callBack) {
			$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comVendor.dummy',  {}, function(data){
				
				options.local = data;
				micaCommon.comboBox.set("#pVendorName",comboOptions, options);
				callBack();
			});
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "CURRENCY_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#currencyName",comboOptions, options);
		});
		
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',  {codeClassId : "MARKET_CODE"}, function(data){
			options.local = data;
			micaCommon.comboBox.set("#marketName",comboOptions, options);
		});
		
		//품목		
		var optItems = {textName : "name", valueName : "code"};
		optItems.url = tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comItemId.dummy"; // 검색 URL
		optItems.keyName = "key"; // 서버로 검색 조건 키 이름값
		optItems.minLength = 4; // 최소 검색 수
		optItems.param = {divisionCd: divisionCd}; // 기본 파라미터
		mCommon.comboBoxSearchCall("#pItemName", comboOptions, optItems);
	},
	setCostPricePop: function(data) { 
		data = data || {};
		
		$("#pItemName").val(data.itemId || "");
		$("#pVendorName").val(data.vendorCd || ""); 
		$("#prevPrice").val(data.prevPrice || "");
		$("#unitPrice").val(data.unitPrice || "");
		$("#currencyName").val(data.currencyCd || ""); 
		$("#startDate").val(data.startDate || currentDate);
		$("#endDate").val(data.endDate || "");
		$("#marketName").val(data.marketCd || "");
		$("#createUserName").val(data.createBy || "");
		$("#createDate").val(data.createDate || "");
		$("#updateUserName").val(data.updateBy || userId);
		$("#updateDate").val(data.updateDate || currentDate);
		$("#description").val(data.description || "");
	},
	getCostPricePop: function() {
		var result ={
			inoutFlag: "OUT",
			vendorCd: $("#pVendorName").val() || "",
			itemId: $("#pItemName").val() || "",
			startDate: $("#startDate").val() || "",
			endDate: $("#endDate").val() || "",
			unitPrice: $("#unitPrice").val(),
			marketCd: $("#marketName").val() || "",
			currencyCd:$("#currencyName").val() || "",
			description:$("#description").val() || "",
			cudFlag : cudFlag,
			createBy: $("#createUserName").val() || "",
		}
		return result;
	},
	getSearchData : function(){
		var param = {
			fromDate : $("#fromDate").val(),
			itemId : $("#itemName").val(),
			vendorCd : $("#vendorName").val(),
			startPage : "1",
			endPage : "100"
		}
		return param;
	},
	callback : function(result, data){
		var that = this.MOMIC002;
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201806271803251831000ytALXPNAxm1", that.getSearchData());
		}
		
		if(param == "ERROR"){
			alert("ERROR!");
			console.log(data);
		}
		
		if(param == "FAIL"){
			alert("FAIL!");
			console.log(data);
		}
	},
	delCallback : function(result, data, param, callbackParam){
		var that = this.MOMIC002;
		if(result == 'SUCCESS'){
			var arrayList = []; 
			for(var i = 0; i < callbackParam.length; i++){
				callbackParam[i].item.cudFlag = "D";
            	arrayList.push(callbackParam[i].item);                  
            }
			mom_ajax('L', 'reference.price.costPrice.costPriceTemp', JSON.stringify(arrayList), that.listCallback, arrayList);
		}else{
			alert(param+'!');
			console.log(data);
		}
	},
	upCallback : function(result, data){
		var that = this.MOMIC002;
		if(result == "SUCCESS"){
			mom_ajax("C", "reference.price.costPrice.costPriceTemp", JSON.stringify(params), that.upCallback2, params);
		}
		if(param == "ERROR"){
			alert("ERROR!");
			console.log(data);
		}
		if(param == "FAIL"){
			alert("FAIL!");
			console.log(data);
		}
	},
	upCallback2 : function(result, data){
		var that = this.MOMIC002;
		if(result == "SUCCESS"){
			mom_ajax("C", "reference.price.costPrice.costPrice", JSON.stringify(params), that.listCallback, params);
			params = "";
		}
		if(param == "ERROR"){
			alert("ERROR!");
			console.log(data);
		}
		if(param == "FAIL"){
			alert("FAIL!");
			console.log(data);
		}
	},
	listCallback : function(result, data, param, callbackParam){
		var that = this.MOMIC002;
		if(result == 'SUCCESS'){
			if(callbackParam.length > 0){
				mom_ajax('C', 'reference.price.costPrice.costPrice', JSON.stringify(callbackParam[0]), that.listCallbackPost);
			}
		}else{
			alert(param+'!');
			console.log(data);
		}
	},
	listCallbackPost : function(result, data){
		var that = this.MOMIC002;
		if(result == "SUCCESS"){
			mCommon.render("grid", "W201806271803251831000ytALXPNAxm1", that.getSearchData(), function(){});
		}else{
			alert(param+'!');
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
   		
		excel_upload(file, 'reference.price.costPrice.costPrice', 'MOMIC002', 'grid', JSON.stringify(param));		
   		$("#uploadPop").micaModal("hide");
   		micaCommon.splash.show();
	}
};
$(document).ready(function(event){
	MOMIC002.init();
});

