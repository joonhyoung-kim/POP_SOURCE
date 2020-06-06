var endtityId;
var MOMEA006 = {
	init: function() {
		var that = this;
		Language.init(function() {
			that.setGridFormat("grid");
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				that.grid("auigrid");
				// 팝업 내 그리드 사이즈 정의
				AUIGrid.setProp("auigrid", {showAutoNoDataMessage : false});
				AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			}, Language);
		});
		that.comboBox();
		that.event();
		that.grid("grid");
		
		// 파일업로드 팝업 사이즈 수정
		$("#popFileUpload #panel").css("width", "40%");
		$(".fileinput").css("min-width", "420px");
		
		mCommon.splitter(".h02-h", "horizontal", "50%");
	}, grid: function(grid) {
		if(grid == 'grid') {
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
				AUIGrid.addColumn("grid", fileColumn, 26);
			}
		} else if(grid == 'auigrid') {
			tuCommon.cellClick(grid, 'single');
		}
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			that.selectList();
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "PROCESS_QUALITY_COOPERATION_HIST_MOMEA006_" + get_current_date("yyyy-mm-dd")});
		});
		
		//File 버튼
		$(document).on("click", ".gridFileBtn", function() {
			AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			var selectedItems = AUIGrid.getSelectedItems("grid");
			entityId = selectedItems[0].item.defectResultId;
			var param = { 
						  entityName : 'MOMEA005',
						  entityId : entityId
						}
			
			mCommon.render("auigrid", "W2018082314330345610001wGOlkaGyFf", param, function(){
				$("#popFileUpload").micaModal("show");
			});		
		});
		
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			
			if(type == "C") {				
				$(".modal").micaModal("hide");
				$("#fileCloseBtn").attr("type", "");
				AUIGrid.clearGridData("grid");
				mCommon.render('grid', 'W201808062153577801000bc4IJqvLt4T', mCommon.formGetParam("#node"), 
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
				attach_download(entityId, 'MOMEA005', items[i].item.oldFileName);	
			}
		});
		
		// 삭제  
		$(document).on("click", "#delBtn", function(){
			var checkedItems = AUIGrid.getItemsByValue("grid", "isActive", "Active");
			var arrayList = [];
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10579'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					for(var i = 0; i < checkedItems.length; i++) {
						arrayList.push(checkedItems[i]);
					}
					mom_ajax('L', 'quality.processQualityCoorperationHist.processQualityCoorperationDel', JSON.stringify(arrayList), that.callbackPost);
				}
			}});
		});
		
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#poId'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#modelSuffix'), $('#findBtn'));
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
			{codeClassId:"SEARCH_DATE", attribute4: "Y"}, // 파라미터
			function(data) {
				options.local = data;
				micaCommon.comboBox.set("#dateCombo",{selectedIndex: 1, searchMode:'containsignorecase', autoComplete:true}, options);
			}
		);
	
		// 설비
		mCommon.comboBoxClickCall("#resourceName", function(callBack) {
			$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comResource.dummy", // 호출 URL
				{}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceName",comboOptions, options);
					callBack();
				}
			);
		});
	},
	getSearchData: function() {
		var param = {
			dateCombo : $("#dateCombo").val() || "",
			fromDate : $("#fromDate").val() || "",
			toDate : $("#toDate").val() || "",
			itemId : $("#itemName").val() || "",
			resoruceCd : $("#resourceName").val() || "",
			workOrderId : $("#poId").val() || "",
			modelSuffix : $("#modelSuffix").val() || ""
		}
		return param;
	},
	selectList: function(){
		var that = this;
		micaCommon.splash.show();
	
		var param = {
			dateCombo : $("#dateCombo").val() || "",
			fromDate : $("#fromDate").val() || "",
			toDate : $("#toDate").val() || "",
			itemId : $("#itemName").val() || "",
			resoruceCd : $("#resourceName").val() || "",
			workOrderId : $("#poId").val() || "",
			modelSuffix : $("#modelSuffix").val() || ""
		}
				
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.quality.processQualityCoorperationHist.processQualityCoorperationHist.dummy",
			type : "GET",
			data : param,
			async: true,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){				
				AUIGrid.setGridData("grid", data);
				micaCommon.splash.hide();
			},
			error: function(data){
				micaCommon.splash.hide();
			},
			fail : function(data){
				micaCommon.splash.hide();
			}
		});		
		
	},
	setGridFormat: function(gridId){
		var that = this;
		var columnLayout = [
			{
				dataField : "isActive",
				headerText : "",
				width: 30,
				headerRenderer : {
					type : "CheckBoxHeaderRenderer",
					// 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
					// dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
					// true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
					dependentMode : true, 			
					position : "bottom" // 기본값 "bottom"
				},
				renderer : {
					type : "CheckBoxEditRenderer",
					showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
					editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
					checkValue : "Active", // true, false 인 경우가 기본
					unCheckValue : "Inactive"
				}
			},
			{
				dataField : "workOrderId",
				headerText : Language.lang['MESSAGES11150'],
				editable : false,
				width : 100,
				cellMerge : true
			},
			{
				dataField : "itemId",
				headerText : Language.lang['MESSAGES11577'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "itemName",
				headerText : Language.lang['MESSAGES11569'],
				editable : false,
				width : 120,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "specification",
				headerText : Language.lang['MESSAGES10234'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "planQty",
				headerText : Language.lang['MESSAGES10146'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "goodQty",
				headerText : Language.lang['MESSAGES10812'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "startTime",
				headerText : Language.lang['MESSAGES10631'],
				editable : false,
				width : 120,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "pqcStateName",
				headerText : Language.lang['MESSAGES10222'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "measureStartTime",
				headerText : Language.lang['MESSAGES10786'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "measureEndTime",
				headerText : Language.lang['MESSAGES11235'],
				editable : false,
				width : 100,
				cellMerge : true,
				mergeRef : "workOrderId",
				mergePolicy : "restrict"
			},
			{
				dataField : "unit",
				headerText : Language.lang['MESSAGES10300'],
				editable : false,
				width : 120,
			},
			{
				dataField : "measureMethodName",
				headerText : Language.lang['MESSAGES11491'],
				editable : false,
				width : 100
			},
			{
				dataField : "gaugeMethodName",
				headerText : Language.lang['MESSAGES10132'],
				editable : false,
				width : 100,
			},
			{
				dataField : "checkMethodName",
				headerText : Language.lang['MESSAGES11494'],
				editable : false,
				width : 100,
			},
			{
				dataField : "itemValue1",
				headerText : Language.lang['MESSAGES10754'],
				editable : false,
				width : 120,
			},
			{
				dataField : "itemValue2",
				headerText : Language.lang['MESSAGES10755'],
				editable : false,
				width : 100
			},
			{
				dataField : "itemValue3",
				headerText : Language.lang['MESSAGES10756'],
				editable : false,
				width : 120,
			},
			{
				dataField : "itemValue4",
				headerText : Language.lang['MESSAGES10757'],
				editable : false,
				width : 100
			},
			{
				dataField : "itemValue5",
				headerText : Language.lang['MESSAGES10758'],
				editable : false,
				width : 120,
			},
			{
				dataField : "minItemValue",
				headerText : "Min",
				editable : false,
				width : 100
			},
			{
				dataField : "maxItemValue",
				headerText : "Max",
				editable : false,
				width : 120,
			},
			{
				dataField : "target",
				headerText : "Target",
				editable : false,
				width : 100
			},
			{
				dataField : "usl",
				headerText : "USL",
				editable : false,
				width : 120,
			},
			{
				dataField : "lsl",
				headerText : "LSL",
				editable : false,
				width : 100
			},
			{
				dataField : "judgementName",
				headerText : Language.lang['MESSAGES11529'],
				editable : false,
				width : 120,
			},
			{
				dataField : "description",
				headerText : Language.lang['MESSAGES10545'],
				editable : false,
				width : 100
			},
			{
				dataField : "isFile",
				headerText : Language.lang['MESSAGES11525'],
				editable : false,
				width : 120,
			},
			{
				dataField : "updateUserName",
				headerText : Language.lang['MESSAGES10128'],
				editable : false,
				width : 100
			},
			{
				dataField : "stateTime",
				headerText : Language.lang['MESSAGES10127'],
				editable : false,
				width : 100
			}
		];

		var gridProps = {
				enableCellMerge : true,				
				selectionMode : "singleCell",
				showSelectionBorder : false,
				cellMergePolicy : "withNull",
				rowSelectionWithMerge : true,				
				editable : false
		};

		AUIGrid.create(gridId, columnLayout, gridProps);	
	},
	callbackPost : function(result, data){
		var that = this.MOMEA006;
		if(result == "SUCCESS"){
			that.selectList();
			AUIGrid.clearGridData("grid2");
			micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});
		}else{
			micaCommon.messageBox({type:"danger",  width:"400", height: "145", html:Language.getLang(data.p_err_msg)});
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMEA006.init();
});