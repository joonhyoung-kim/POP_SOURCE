var userId = sessionStorage.getItem("userId");
var checkCnt;
var workOrderId, entityId, entityName;

var MOMEA005 = {
	init: function() {
		var that = this;
		that.comboBox();
		that.event();
		that.design();
		Language.init(function() {
			mCommon.init("grid1", "W201808062153577801000bc4IJqvLt4T", null, function() {
				that.grid("grid1");
				mCommon.init("grid2", "W201808071115304241004PmzwvbVBwr8", null, function(){
					that.grid("grid2");
					that.fileInpuSet();
				}, Language);
			}, Language);
			
			// 파일 업로드 팝업 그리드
			mCommon.init("auigrid", "W2018082314330345610001wGOlkaGyFf", null, function() {
				that.grid("auigrid");
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
		var that = this;
		if(grid == "grid1"){
			AUIGrid.bind("grid1", "cellClick", function(event) {
				var item = event.item;
				checkCnt = item.goodQty;
					mCommon.render("grid2", "W201808071115304241004PmzwvbVBwr8", item, function(){});
				if(item.pqcSpecFlag == "N") {
					micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10116']});
				}
			});
		} else if(grid == 'grid2') {
			editColumnSet("grid2");
			
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
			
			AUIGrid.setSelectionMode("grid2", "singleCell");
			AUIGrid.setColumnPropByDataField("grid2", "startTime", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "endTime", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue1", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue2", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue3", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue4", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "itemValue5", {style:"columnStyle"} );
			AUIGrid.setColumnPropByDataField("grid2", "description", {style:"columnStyle"} );
			
			var itemValues = ["itemValue1", "itemValue2", "itemValue3", "itemValue4", "itemValue5"];
			var colLayout = AUIGrid.getColumnLayout("grid2");
			var matchValidP = /^\d*[:]\d*$/;
			
			for(var i = 0; i < itemValues.length; i++) {
				var colIndex = AUIGrid.getColumnIndexByDataField("grid2", itemValues[i]);
				var col = colLayout[colIndex];
				col.editRenderer = {	
					type : "ConditionRenderer",
					conditionFunction : function(rowIndex, columnIndex, value, item, dataField) {
						switch(item.measureMethod) {
						case "COUNT": 							// 계수
							return {"type":"DropDownListRenderer","list":["OK", "NG"]};
						case "NUMBERLESS": 						// 계측
							return {"type":"InputEditRenderer"};
						}
					}
				}
				AUIGrid.setColumnProp( "grid2", colIndex, col );
			}			
			
			AUIGrid.bind(grid, "cellEditBegin", function(e) {
				var sampleCnt = e.item.sampleCnt;
				if(e.dataField.indexOf("itemValue") > -1) {
					var number = Number(e.dataField.replace("itemValue", ""));
					if(number > sampleCnt) {
						return false;
					}
					
					if(sampleCnt > checkCnt) {
						return false;
					}
				}
				AUIGrid.setProp(grid, 'exportURL', '0');	
			});
			
			AUIGrid.setColumnPropByDataField( "grid2", "startTime", { 
		 		editRenderer : {
		           type : "InputEditRenderer",
		           onlyNumeric : false
			    },
			    labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
			    	if(value == '') {
			    		return '00:00'; 
			    	} else {
			    		return value;
			    	}
			       
			    } 
		 	});
			
			AUIGrid.bind(grid, "cellEditEndBefore", function(e) {
				if(e.dataField == "startTime" || e.dataField == "endTime") {
					if(e.value && e.value.length == 5 && e.value.indexOf(":") != -1) {
						return e.value;
					} else {
						micaCommon.messageBox({type:"warning", width:"400", height: "145", html: Language.lang['MESSAGES10037']});
						return e.oldValue;
					}
				}
				if(e.dataField == "itemValue1" || e.dataField == "itemValue2" || e.dataField == "itemValue3" || e.dataField == "itemValue4" || e.dataField == "itemValue5" || e.dataField == "description") {
					return e.value;
				}
			});
			
			AUIGrid.setColumnPropByDataField( "grid2", "endTime", { 
		 		editRenderer : {
		           type : "InputEditRenderer",
		           onlyNumeric : false
			    },
			    labelFunction: function(rowIndex, columnIndex, value, headerText, item) { 
			    	if(value == '') {
			    		return '00:00'; 
			    	} else {
			    		return value;
			    	}
			    } 
		 	});
			
			tuCommon.cellClick(grid);
			AUIGrid.setProp("grid2", { "editBeginMode" : "click"} );
		} else {
			tuCommon.cellClick('auigrid', 'single');
		}
	}, event: function() {
		var that = this;
		// 조회 버튼 클릭
		$(document).on("click", "#findBtn", function() {
			mCommon.render("grid1", "W201808062153577801000bc4IJqvLt4T", that.getSearchData(), function(){});
			AUIGrid.clearGridData("grid2");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid1", {fileName: "PROCESS_QUALITY_COOPERATION_MOMEA005_" + get_current_date("yyyy-mm-dd")});
		});
		
		// 검사완료
		$(document).on("click", "#passBtn", function() {
			var detailItems = AUIGrid.getGridData("grid2");
			for(var i=0; i<detailItems.length; i++) {
				detailItems[i].buttonState = "FINISH";
			}
			
			for(var i=0; i<detailItems.length; i++) {
				if(detailItems[i].startTime == '' || detailItems[i].startTime == null) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10788']});
					return;
				}
				
				if(detailItems[i].endTime == '' || detailItems[i].endTime == null) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11236']});
					return;
				}
				
				var startTime = detailItems[i].startTime.split(':');
				var endTime = detailItems[i].endTime.split(':');
				startTime = startTime[0] + startTime[1];
				endTime = endTime[0] + endTime[1];
				
				if(startTime > endTime) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10789']});
					return;
				}
			}
			
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES10123'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("L", "quality.processQualityCoorperation.upsertPqc", JSON.stringify(detailItems), that.callBack, detailItems, "selStateCall_COMPLETE");
				}
			}});
		});
		
		// 저장
		$(document).on("click", "#saveBtn", function() {
			var detailItems = AUIGrid.getGridData("grid2");
			for(var i=0; i<detailItems.length; i++) {
				detailItems[i].buttonState = "SAVE";
			}
			
			for(var i=0; i<detailItems.length; i++) {
				if(detailItems[i].startTime == '' || detailItems[i].startTime == null) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10788']});
					return;
				}
				
				if(detailItems[i].endTime == '' || detailItems[i].endTime == null) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES11236']});
					return;
				}
				
				var startTime = detailItems[i].startTime.split(':');
				var endTime = detailItems[i].endTime.split(':');
				startTime = startTime[0] + startTime[1];
				endTime = endTime[0] + endTime[1];
				if(startTime > endTime) {
					micaCommon.messageBox({type:"warning",  width:"400", height: "145", html: Language.lang['MESSAGES10789']});
					return;
				}
			}
				
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK", 
				after:function(){
					mom_ajax("L", "quality.processQualityCoorperation.upsertPqc", JSON.stringify(detailItems), that.callBack, detailItems, "selStateCall_COMPLETE");
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
						  entityName : 'MOMEA005',
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
				attach_upload(attach, 'MOMEA005', entityId, '{}', function(flag, response){
					if(flag == 'SUCCESS') {
						var param = {
							entityId   : entityId,
							entityName : 'MOMEA005'
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
									entityName : 'MOMEA005'
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
				attach_download(entityId, 'MOMEA005', items[i].item.oldFileName);	
			}
		});
		
		tuCommon.addKeyDown($(document), $('#itemName'), $('#findBtn'));
		tuCommon.addKeyDown($(document), $('#searchKeyWord'), $('#findBtn'));
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
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	fileInpuSet: function() {
		$("#fileBtn").remove(); 
		$("#fileUpload").removeClass("w-input").css("margin-bottom", 0).attr("type", "file");
		$("#pop .searcharea form").append('<input name="attach" id="attach" type="file" accept=".jpg, .jpeg" style="width:100%; display:none;">');
	},
	getSearchData: function() {
		var param = {
			fromDate : $("#fromDate").val() || "",
			toDate : $("#toDate").val() || "",
			workOrderId : $("#searchKeyWord").val() || "",
			itemId : $("#itemName").val() || "",
			resourceCd : $("#resourceName").val() || ""
		}
		
		return param;
	},
	callBack: function(result, data, param, callbackParam, flag) {
		var that = this.MOMEA005;
		if(result == "SUCCESS") {
			woParam = {
				workOrderId : data.workOrderId
			}
			
			if(flag == "selStateCall_COMPLETE") {
				if(data.buttonState == "FINISH") {
					mCommon.render("grid1", "W201808062153577801000bc4IJqvLt4T", mCommon.formGetParam("#node"), function(){});
					AUIGrid.clearGridData("grid2");
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
					
				} else {
					mCommon.render("grid2", "W201808071115304241004PmzwvbVBwr8", woParam, function(){});
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10692']});
				}
			}
			
		} else {
			if(data.p_err_msg != '' || data.p_err_msg != null) {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
				console.log(data);
			} else {
				micaCommon.messageBox({type:"success",  width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				console.log(data);
			}
		}
	}
};
$(document).ready(function(event){
	MOMEA005.init();
});