var gvThat;

var MOMJA003 = {
	init: function() {
		var that = this;
		gvThat = this;
		Language.init(function() {
			mCommon.init("grid", "W201809131706381111002GceX5HmpheO", null, function(){
				that.grid();
			}, Language);
		});
		that.event();
		that.design();
		that.comboBox();
		that.fileInpuSet();
	}, 
	grid: function() {
		AUIGrid.setSelectionMode("grid", "singleCell");
		AUIGrid.setColumnPropByDataField( "grid", "uploadDemandSeq", { 
			style:"columnStyle",
			editRenderer : {
				onlyNumeric : true,
				allowPoint : true
			}
		});
		
		AUIGrid.setColumnPropByDataField( "grid", "promptName", {style:"columnStyle"});
		
		$.ajax({
			url : tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy",
			type : "GET",
			data : {codeClassId:"USE_FLAG"},
			async: false,
			timeout 	: 30000000,
			dataType 	: 'json',
			contentType : 'application/json; charset=UTF-8',
			success : function(data){
				AUIGrid.setColumnPropByDataField('grid', 'bufferDemandUseFlag', {
					style:"columnStyle",
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "DropDownListRenderer",
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					}
			 	});
				AUIGrid.setColumnPropByDataField('grid', 'momDemandUseFlag', {
					style:"columnStyle",
					labelFunction : function( rowIndex, columnIndex, value, headerText, item ) { 
						var retStr = value;
						for(var i=0,len=data.length; i<len; i++) {
							if(data[i]["code"] == value) {
								retStr = data[i]["name"];
								break;
							}
						}
						return retStr;
					},
					editRenderer : {
						type : "DropDownListRenderer",
						list : data, 
						keyField : "code", 
						valueField : "name" 							
					}
			 	});
			},
			error: function(data){},
			fail : function(data){}
		});
		
		AUIGrid.bind('grid', 'cellEditBegin', function(e) {
			AUIGrid.setProp('grid', 'exportURL', '0');
		});

	}, 
	event: function() {
		var that = this;
		
		// 조회 버튼
		$(document).on("click", "#findBtn", function(){
			mCommon.render("grid", "W201809131706381111002GceX5HmpheO",mCommon.formGetParam("#form"), function(){});
					
		});
		
		// 저장 버튼
		$(document).on("click", "#saveBtn", function(){
			micaCommon.messageBox({type:"info", width:"400", height: "145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK",    
				after:function(){
					var items = AUIGrid.getGridData("grid"); 
					var chkFlag = false;
					for(var i = 0; i < items.length; i++) {
						if(i == items.length - 1) {
							chkFlag = true;
						}
						mom_ajax("U", "admin.demandConfig.demandConfig", JSON.stringify(items[i]), that.callbackPost, chkFlag);
						micaCommon.splash.show();
					}
				}
			}});
		});
		
		// 엑셀 양식 다운 버튼
		$(document).on("click", "#excelSampleBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "ITEM_MOMJA003_test"}, "templete");
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
			mCommon.gridPopHide("grid");
		});
		
		// 엑셀 다운 버튼
		$(document).on("click", "#excelDownBtn", function() {
			mCommon.auiGridExcelExport("grid", {fileName: "DEMAND_CONFIG_MOMJA003_" + get_current_date("yyyy-mm-dd")});
		});
	},
	design: function(){
		$("head").append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	},
	comboBox : function() {
		var comboOptions = {searchMode:'containsignorecase', autoComplete:true};
		var options = {local: "", textName : "name", valueName : "code", selectedIndex:0, readonly : false};
	
		// 업로드 유형
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{codeClassId:"UPLOAD_TYPE"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#uploadType",comboOptions, options);
				}
		);
	},
	fileInpuSet: function() {
		$("#uploadPop .searcharea").css({"padding" : "5px 5px 0"});
		$("#uploadPop .searcharea from").attr("id", "fileUploadForm");
		$("#uploadPop .searcharea form").html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
		// form ID 는 fileUploadForm
	},
	excelUpload: function() {
		var param = [{}];
 		/*excel_upload(file, 'admin.demandConfig.demandConfig', 'MOMJA003', JSON.stringify(param));*/	
 		excel_upload(file, 'admin.demandConfig.demandConfig', 'MOMJA003', 'grid', JSON.stringify(param), gvThat.callbackPost, true);
 		$("#uploadPop").micaModal("hide");
 		micaCommon.splash.show();
	},
	callbackPost : function(result, data, param, callbackParam){
		if(result == 'SUCCESS'){
			if(callbackParam == true) {
				mCommon.render("grid", "W201809131706381111002GceX5HmpheO",mCommon.formGetParam("#form"), function(){
					micaCommon.messageBox({type:"success",  width:"400", height: "145", html:Language.lang['MESSAGES10692']});  
				});
			}
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
	            micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
	         } else {
	        	 micaCommon.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});  
	         }
			console.log(data);
		}
	}
};
$(document).ready(function(event){
	MOMJA003.init();
});