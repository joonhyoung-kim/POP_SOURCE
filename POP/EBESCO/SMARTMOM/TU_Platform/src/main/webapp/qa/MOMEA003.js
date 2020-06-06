var userId = sessionStorage.getItem("userId");
var entityId;
var MOMEA003 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W2018080814153144110000E8l4Wu66Ue", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201808062055095441002XVj4xS72la3", null, function(){
					that.grid("grid2");
					that.fileInpuSet();
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
		$(".fileinput").css("min-width", "400px");
		
		mCommon.splitter(".h02-h", "horizontal", "50%");
	}, 
	grid: function(grid) {
		var that = this;
		if(grid == "grid1"){
			AUIGrid.bind("grid1", "cellClick", function(event) {
				var item = event.item;
				mCommon.render("grid2", "W201808062055095441002XVj4xS72la3", item, function(){});
			});
			
		} else if(grid == "grid2") {
			AUIGrid.setSelectionMode("grid2", "singleCell");
			
			//Edit 가능한 컬럼
			AUIGrid.setColumnPropByDataField("grid2", "itemValue1", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue2", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue3", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue4", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue5", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "processDescription", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "handlingTime", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "reasonName", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "problemReason", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "defectBy", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "description", {style:"columnStyle"} );
			
			// 수입검사 하단 그리드 콤보박스 설정 
			var processDescriptionUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy' +'?codeClassId' + '=' +'HANDLING_FLAG';
			var reasonCodeUrl = tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy' +'?codeClassId' + '=' +'IQC_REASON_CODE';
			
			//처리일 달력
			that.datePickerSet("grid2", "handlingTime", "CalendarRenderer", false);

			//처리, 불량코드 콤보
			that.gridComboBoxSet("grid2", processDescriptionUrl, "processDescription", "DropDownListRenderer", true);
			that.gridComboBoxSet("grid2", reasonCodeUrl, "reasonName", "DropDownListRenderer", true);
			
			var itemValues = ["itemValue1", "itemValue2", "itemValue3", "itemValue4", "itemValue5"];
			var colLayout = AUIGrid.getColumnLayout("grid2");
			for(var i = 0; i < itemValues.length; i++) {
				var colIndex = AUIGrid.getColumnIndexByDataField("grid2", itemValues[i]);
				var col = colLayout[colIndex];
				col.editRenderer = {	
					type : "ConditionRenderer",
					conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
						switch(item.measureMethod) {
						case "COUNT": 					// 계수
							return {"type":"DropDownListRenderer","list":["OK", "NG"]};
						case "NUMBERLESS": 					// 계측
							return {"type":"InputEditRenderer"};
						}
					}
				}
				AUIGrid.setColumnProp( "grid2", colIndex, col );
			}
			
			// 2018.08.12 hyjeong begin, dynamic cell control
			AUIGrid.bind(grid, "cellEditBegin", function(e) {
				var item = AUIGrid.getSelectedItems('grid1')[0].item;
				var sampleCnt = e.item.sampleCnt < item.departureQty ? e.item.sampleCnt : item.departureQty;
				if(e.dataField.indexOf("itemValue") > -1) {
					var number = Number(e.dataField.replace("itemValue", ""));
					if(number > sampleCnt) {
						return false;
					}
				}
				
				AUIGrid.setProp(grid, 'exportURL', '0');
			});
			
			// 2018.08.12 hyjeong end
			
			// 불량코드 선택 시 해당하는 코드값 조회(grid combo)
			AUIGrid.bind("grid2", "cellEditEnd", function(e) {
				var item = AUIGrid.getSelectedItems('grid2')[0].item;
					$.ajax({
						type : 'GET',
						url : tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy',
						timeout : 30000000,
						async : false,
						data : {codeClassId : 'IQC_REASON_CODE', codeId : e.value},
						dataType : 'json',
						contentType : 'application/json; charset=UTF-8',
						success : function(data){
							if(e.value != "") {
								AUIGrid.updateRow("grid2", { "reasonCode" : data[0].code }, e.rowIndex);
							} else {
								AUIGrid.updateRow("grid2", { "reasonCode" : null }, e.rowIndex);
							}
						},
						error : function(error){
							errors = error;
						},
						fail : function(){
							micaCommon.messageBox({type:"danger", width:"400", height: "145", html:Language.lang['MESSAGES10821']});
						}
					});
			});
			
			tuCommon.cellClick('grid2');
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
				
				// 해당그리의 MICA에서 한번 세팅 된 컬럼정보를 가져온다. array.
				var gridColumn = AUIGrid.getColumnLayout(grid);
				// 순서대로 column이 그려지기 때문에 배열 reverse를 해준다.
				// reverse는 javascript array 기본 함수다.
				gridColumn.reverse();
				// 위에서 세팅된 editColumn 값을 넣어준다.
				gridColumn.push(fileColumn);
				// 다시 reverse를 해줘서 정상적인 순서로 바꾼다.
				gridColumn.reverse();
				// 그리드의 변경된 정보를 바꿔준다.
				AUIGrid.changeColumnLayout(grid, gridColumn);
			}
			
			AUIGrid.setProp("grid2", { "editBeginMode" : "click"} );
		}
	}, 
	event: function() {
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
			mCommon.render("grid1", "W2018080814153144110000E8l4Wu66Ue", mCommon.formGetParam("#node"), function(){});
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "QUALITY_INPUT_MOMEA003_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 취소 버튼
		$(document).on("click", "#cancelBtn", function() {
			var checkedItems = AUIGrid.getCheckedRowItems("grid2");
			if(checkedItems.length == 0) {
				micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11345']});
				return;
			} else {
				AUIGrid.clearGridData("grid2");
			}
		});
		
		// 저장
		/* modify hists
		 * 20191115 / pyj / 샘플링 개수가 5이상일 경우 시료 5개만 체크하도록 수정(임시)
		 */
		$(document).on("click", "#saveBtn", function() {
			var selectedItems = AUIGrid.getSelectedItems("grid1");
			var detailItems = AUIGrid.getGridData("grid2");
			for(var i = 0; i < detailItems.length; i++) {
				var checkCnt = detailItems[i].sampleCnt < selectedItems[0].item.departureQty ? detailItems[i].sampleCnt : selectedItems[0].item.departureQty;
				/* start 20191115 */ 
				if(checkCnt > 5) {
					checkCnt = 5;
				}
				/* end 20191115 */ 
				var iv = "itemValue";
				for(var j = 1; j <= checkCnt; j++) {
					var checkIv = iv.concat(j);
					var checkValues = "detailItems" + "[" + [i] + "]." + checkIv;
					if(eval(checkValues) == "" || eval(checkValues) == null) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10759']});
						return;
					}
				}
				if(detailItems[i].handlingTime < selectedItems[0].item.departureDate) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11312']});
					return;
				}
				AUIGrid.updateRow("grid2", { "buttonType" : "SAVE" }, i);
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					param = {};
					mom_ajax("D", "quality.qualityInput.checkIqc", JSON.stringify(param), that.callBack, null, "delCall_SAVE");
				}
			}});
		});
		
		// 검사완료
		/* modify hists
		 * 20191115 / pyj / 샘플링 개수가 5이상일 경우 시료 5개만 체크하도록 수정(임시)
		 */
		$(document).on("click", "#passBtn", function() {
			var selectedItems = AUIGrid.getSelectedItems("grid1");
			var detailItems = AUIGrid.getGridData("grid2");
			for(var i = 0; i < detailItems.length; i++) {
				var checkCnt = detailItems[i].sampleCnt < selectedItems[0].item.departureQty ? detailItems[i].sampleCnt : selectedItems[0].item.departureQty;
				/* start 20191115 */ 
				if(checkCnt > 5) {
					checkCnt = 5;
				}
				/* end 20191115 */
				var iv = "itemValue";
				for(var j = 1; j <= checkCnt; j++) {
					var checkIv = iv.concat(j);
					var checkValues = "detailItems" + "[" + [i] + "]." + checkIv;
					if(eval(checkValues) == "" || eval(checkValues) == null) {
						micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES10759']});
						return;
					}
				}
				if(detailItems[i].handlingTime < selectedItems[0].item.departureDate) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145",  html: Language.lang['MESSAGES11312']});
					return;
				}
				AUIGrid.updateRow("grid2", { "buttonType" : "COMPLETE" }, i);
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10123'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					param = {};
					mom_ajax("D", "quality.qualityInput.checkIqc", JSON.stringify(param), that.callBack, null, "delCall_COMPLETE");
				}
			}});
		});
		
		//File 버튼
		$(document).on("click", ".grid2FileBtn", function() {
			AUIGrid.resize("auigrid", $(window).width() * 0.4 - 48, 150);
			$("#fileUpload").val("");
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
		
		$(document).on("change", "#file", function(){
			$("#uploadFileName").val($(this).val());
		});
		
		// 파일 업로드 버튼 (파일 등록)
		$(document).on("click", "#fileUploadBtn, #fileDelBtn", function(){
			var selectedItems = AUIGrid.getSelectedItems("grid2");
			if($(this).attr("id") == "fileUploadBtn") {
				//등록
				if($("#fileUpload").val() == "") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10347']});
					return;
				}
				
				if(selectedItems[0].item.defectResultId == "" || selectedItems[0].item.defectResultId == null) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10113']});
					return;
				}
				
				var attach = document.getElementById('fileUpload');
				attach_upload(attach, 'MOMEA003', entityId, '{}', function(flag, response){
					if(flag == 'SUCCESS') {
						var param = {
							entityId   : entityId,
							entityName : 'MOMEA003'
						}
						mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
					}
				});
				
			} else {
				// 삭제
				var items = AUIGrid.getCheckedRowItems("auigrid");
				if(items.length <= 0) {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10584']});
					return;
				}
				
				for(var i = 0; items.length; i++) {
					var param =  { fileId : items[i].item.fileId };
					if(i == AUIGrid.getCheckedRowItems("auigrid").length - 1) {
						mom_ajax('D', 'common.file', JSON.stringify(param), function(flag, data){
							if(flag == 'SUCCESS') {
								var param = {
									entityId   : entityId,
									entityName : 'MOMEA003'
								}
								mCommon.render('auigrid', 'W2018082314330345610001wGOlkaGyFf', param, function(){});
							}
						});
					} else {
						mom_ajax('D', 'common.file', JSON.stringify(param));
					}
				}
			}
		});
		
		// 팝업 닫기  
		$(document).on("click", "#fileCloseBtn, .bntpopclose", function(){
			var type = $("#fileCloseBtn").attr("type");
			
			if(type == "C") {				
				$(".modal").micaModal("hide");
				$("#fileCloseBtn").attr("type", "");
				AUIGrid.clearGridData("grid2");
				mCommon.render('grid1', 'W201808062153577801000bc4IJqvLt4T', mCommon.formGetParam("#node"), 
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
				attach_download(entityId, 'MOMEA003', items[i].item.oldFileName);	
			}
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
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
		
		//발주구분
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId : "ORDER_FLAG"}, // 파라미터
				function(data) {
					micaCommon.comboBox.set("#orderType",{searchMode:'containsignorecase', autoComplete:true}, {local: data, textName : "name", valueName : "code", readonly: true});
				}
		);
	},
	gridComboBoxSet: function(grid, url, field, type, showFg) {
		var lists;
		var errors;
		
		getComboList();
		
		function getComboList(){
			$.ajax({
				type : 'GET',
				url : url,
				timeout : 30000000,
				async : false,
				dataType : 'json',
				contentType : 'application/json; charset=UTF-8',
				success : function(data){
					lists = data;
				},
				error : function(error){
					errors = error;
				},
				fail : function(){
					micaCommon.messageBox({type:"danger", width:"400", height: "145",  html:Language.lang['MESSAGES10821']});
				}
			});
		}
		
		var colSet = {
			dataField : field,
			labelFunction : function(rowIndex, columnIndex, value, headerText, item) { 
				var retStr = "";
				for(var i=0,len=lists.length; i<len; i++) {
					if(lists[i]["code"] == value) {
						retStr = lists[i]["name"];
						break;
					}
				}
				return retStr == "" ? value : retStr;
			},
			editRenderer : {
				type : type,
				showEditorBtnOver : showFg, // 마우스 오버 시 에디터버턴 보이기
				list : lists,
				keyField : "code",
				valueField : "name"				
			}
		};
		
		AUIGrid.setColumnPropByDataField(grid, field, colSet);
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	datePickerSet : function(grid, field, type, showExDay) {
		var requestDateColumn = AUIGrid.getColumnItemByDataField(grid, field);
		requestDateColumn.editRenderer = {
				type : type,
	            showExtraDays : showExDay,
	            openDirectly : true,
				onlyCalendar : false,
				titles : [Language.lang['MESSAGES11017'], Language.lang['MESSAGES10968'], Language.lang['MESSAGES11636'], Language.lang['MESSAGES10715'], 
	        	      	  Language.lang['MESSAGES10416'], Language.lang['MESSAGES10247'], Language.lang['MESSAGES11510']]
		}
		AUIGrid.setColumnPropByDataField(grid, field, requestDateColumn);
		
		var gridColumn = AUIGrid.getColumnLayout(grid);
		AUIGrid.changeColumnLayout(grid, gridColumn);
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	callBack: function(result, data, param, callbackParam, flag) {
		var that = this.MOMEA003;
		var detailItems = AUIGrid.getGridData("grid2");
		if(result == "SUCCESS") {
			mdParam = {
				materialDepartureId : data.materialDepartureId
			}
			
			if(flag == "delCall_SAVE") {
				mom_ajax("L", "quality.qualityInput.checkIqc", JSON.stringify(detailItems), that.callBack, detailItems, "procCall_SAVE");
				
			} else if(flag == "delCall_COMPLETE") {
				mom_ajax("L", "quality.qualityInput.checkIqc", JSON.stringify(detailItems), that.callBack, detailItems, "procCall_COMPLETE");
				
			} else if(flag == "procCall_SAVE") {
				mom_ajax("C", "quality.qualityInput.upsertIqc", JSON.stringify({}), that.callBack, detailItems, "selStateCall_SAVE");
				
			} else if(flag == "procCall_COMPLETE") {
				mom_ajax("C", "quality.qualityInput.upsertIqc", JSON.stringify({}), that.callBack, detailItems, "selStateCall_COMPLETE");
				
			} else if(flag == "selStateCall_SAVE") {
				if(callbackParam.length > 0) {
					mdParam.materialDepartureId = callbackParam[0].materialDepartureId;
				}
				mCommon.render("grid2", "W201808062055095441002XVj4xS72la3", mdParam, function(){});
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				
			} else if(flag == "selStateCall_COMPLETE") {
				mCommon.render("grid1", "W2018080814153144110000E8l4Wu66Ue", mCommon.formGetParam("#node"), function(){});
				AUIGrid.clearGridData("grid2");
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
			}

		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"danger",  width:"400", height: "145",   html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	},
	fileInpuSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	},
};
$(document).ready(function(event){
	MOMEA003.init();
});