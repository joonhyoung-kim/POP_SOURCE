var entityId;
var materialDepartureId;
var MOMEA004 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		Language.init(function() {
			mCommon.init("grid1", "W201808062055530901003fH0yKrKZuFF", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201808062056127631004bA6KqeB1kyH", null, function(){
					that.grid("grid2");
				}, Language);
			}, Language);
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				// 팝업 내 그리드 사이즈 정의
				AUIGrid.setProp("auigrid", {showAutoNoDataMessage : false});
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			}, Language);	
		});
		// 파일업로드 팝업 사이즈 수정
		$("#popFileUpload #panel").css("width", "40%");
		$(".fileinput").css("min-width", "420px");
		
		mCommon.splitter(".h02-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == "grid1"){
			AUIGrid.bind("grid1", "cellClick", function(e) {
				mCommon.render("grid2", "W201808062056127631004bA6KqeB1kyH", e.item, function(){
					materialDepartureId = e.item.materialDepartureId;
				});
			});
		} else if(grid == "grid2") {
			editColumnSet(grid);
			function editColumnSet(grid) {
				var fileColumn = {"headerText":"File","dataField":"File","width":40,"visible":true,"editable":false,
					renderer : { type : "TemplateRenderer"}, // renderer를 설정 해줘야 아래 labelFunction이 호출된다.
					labelFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 각 Row를 그릴때마다 labelFunction이 호출된다.
						// return 값으로 HTML을 입력해주면 된다.
						// class 명을 gridID + EditBtn 으로 구분했다.
						// attr의 row-index 는 edit 버튼을 클릭했을 때 쉽게 선택된 row 값이 무엇인지 알수 있다.
						return '<div class="' + grid + 'FileBtn w-icon fa fa-folder-open-o icon" style="cursor: pointer; font-size: 20px; line-height: 28px;" row-index =' + rowIndex + '> </div>';
					}
				}
				
				AUIGrid.addColumn(grid, fileColumn, 0);
			}
			tuCommon.cellClick(grid);
			AUIGrid.bind(grid, "cellEditBegin", function(e) {
				AUIGrid.setProp(grid, 'exportURL', '0');	
			});
		}
	}, event: function() {
		var that = this;
		// 조회
		$(document).on("click", "#findBtn", function() {
			if($("#fromDate").val() == '' || $("#toDate").val() == ''){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10250']});
				return;
			}
			
			var fromDate = new Date($("#fromDate").val());
			var toDate = new Date($("#toDate").val());
			
			if(fromDate > toDate){
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10785']});
				return;
			}
			
			AUIGrid.clearGridData("grid2");
			mCommon.render("grid1", "W201808062055530901003fH0yKrKZuFF", mCommon.formGetParam("#node"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#mExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "QUALITY_INPUT_HIST_UP_MOMEA004_" + get_current_date("yyyy-mm-dd")});
		});
		
		$(document).on("click", "#dExcelDownBtn", function() {
			mCommon.auiGridExcelExport("grid2", {fileName: "QUALITY_INPUT_HIST_DOWN_MOMEA004_" + get_current_date("yyyy-mm-dd")});
		});
		
		//File 버튼
		$(document).on("click", ".grid2FileBtn", function() {
			AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			var selectedItems = AUIGrid.getSelectedItems("grid2");
			entityId = selectedItems[0].item.defectResultId;
			var param = { 
						  entityName : 'MOMEA003',
						  entityId : entityId
						}
			
			mCommon.render("auigrid", "W2018082314330345610001wGOlkaGyFf", param, function(){
				$("#popFileUpload").micaModal("show");
			});		
		});
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			$(this).closest(".modal").micaModal("hide");
		});
		
		//파일 다운로드 버튼
		$(document).on("click", "#fileDownBtn", function() {
			var items = AUIGrid.getCheckedRowItems("auigrid");
			for(var i = 0; i < items.length; i++) {
				attach_download(entityId, 'MOMEA003', items[i].item.oldFileName);	
			}
		});
		
		
		// 삭제  
		$(document).on("click", "#delBtn", function(){
			var items = AUIGrid.getGridData("grid2");
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax('C', 'quality.qualityInputHist.qualityInputDel', JSON.stringify(items[0]), that.callbackPost);
				}
			}});
		});
		
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#departureNo'), $('#findBtn'));
	},
	comboBox : function(){
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = parseInt(date.getMonth() + 1);
		
		if(mm < 10) mm = "0" + mm;

		$("#fromDate").val(yyyy + "-" + mm +"-01");
		$("#toDate").val(get_date_diff(0));
		
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", readonly : false};
		
		// DATE combo
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"SEARCH_DATE", attribute2: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 0, searchMode:'containsignorecase', autoComplete:true}, options);
			
			}
		);
		
		// 업체
		mCommon.comboBoxClickCall("#vendorName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comVendor.dummy", // 호출 URL
				{attribute1 : 'Y'}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#vendorName",comboOptions, options);
					callBack();
				
				}
			);
		});
		
		// 판정
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
			{codeClassId:"PASS_FLAG"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#judgment",comboOptions, options);
			
			}
		);
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: true});
				}
		);
	},
	callbackPost : function(param, data){
		var that = this.MOMEA004;
		if(param == 'SUCCESS'){
			AUIGrid.clearGridData("grid2");
			mCommon.render('grid1', 'W201808062055530901003fH0yKrKZuFF', mCommon.formGetParam("#node"), function(){
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
			});
			
		}else{
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMEA004.init();
});