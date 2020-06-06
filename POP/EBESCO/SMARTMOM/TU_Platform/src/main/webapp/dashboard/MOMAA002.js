var MOMAA002 = {
	initMessage		: undefined,
	initParam		: undefined,
	resourceGroupCd	: undefined,
	groupDelMsg 	: undefined,
	btnType			: undefined,
	init: function() {		
		Language.init(function() {
		});
		
		momWidget.splitter('.tabcontentarea', 'horizontal', '40%');
		this.event();
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 1) {
			this.initParam = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
		}
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		if(result != 'SUCCESS') {
			if(index == 1) {
				this.initParam = undefined;
			}
			
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		if(index == 0) {
			var that = this;
			var param = AUIGrid.getGridData(momWidget.grid[index])[0];
			momWidget.findBtnClicked(1, false, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[index+1], data);
				AUIGrid.setSelectionByIndex(momWidget.grid[index], 0);
				that.resourceGroupCd = data[0]['labelId'];
			});
			if(indexInfo != undefined && indexInfo['op'] == 'delActBtn1') {
				momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
			}
		} else {
			this.initParam = undefined;
		}
		
		momWidget.splashHide();
	}, createCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		
		if (index == 0) { // 상단 그리드
			if(indexInfo != undefined && indexInfo['op'] == 'editBtn1'|| indexInfo != undefined && indexInfo['op'] == 'copyBtn1') {
			//	var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
				
				var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
				$('#printNameEP1').find('input').attr("readonly","readonly");
				$('#useYnEP1').find('input').attr("readonly","readonly");
				$('#printNameEP1').val(selectItems[0].item.printId);
				$('#useYnEP1').val(selectItems[0].item.useYnName);				
				btnType= "UPDATE";
				
			}
		else if(indexInfo != undefined && indexInfo['op'] == 'createBtn1') {
				$('#printNameEP1').find('input').attr("readonly","readonly");
				$('#useYnEP1').find('input').attr("readonly","readonly");
				btnType= "INSERT";							
				}		
		}
		
		else if(index == 1) { // 하단 그리드
			if(indexInfo != undefined && indexInfo['op'] == 'editBtn2'|| indexInfo != undefined && indexInfo['op'] == 'copyBtn2') {
				//	var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
					var selectItems = AUIGrid.getSelectedItems(momWidget.grid[1]);
					
					$('#landscapeEP2').find('input').attr("readonly","readonly");
					$('#methodIdEP2').find('input').attr("readonly","readonly");
					$('#landscapeEP2').val(selectItems[0].item.landscapeName);
					$('#methodIdEP2').val(selectItems[0].item.methodName);				
					btnType= "UPDATE";
					
				}
			else if(indexInfo != undefined && indexInfo['op'] == 'createBtn2') {
				    var gridRowCount = AUIGrid.getRowCount(momWidget.grid[1]);
					$('#landscapeEP2').find('input').attr("readonly","readonly");
					$('#methodIdEP2').find('input').attr("readonly","readonly");
					$('#labelSeqEP2').val(gridRowCount+1);
					$('#barcodeModuleWidthEP2').find('input').attr("readonly","readonly");
					$('#barcodeTextUnderYnEP2').find('input').attr("readonly","readonly");
					$('#barcode2dSizeEP2').val('1');
					$('#barcodeRatioEP2').val('1');
					btnType= "INSERT";							
					}			
			
		}
		
		
		
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;		
		if(indexInfo['op'] != undefined && indexInfo.op == 'saveBtnEP1') {			
			param.cuFlag= btnType;
			mom_ajax('R', 'pop.popProcess.chkLabel', {chkLabelId : $("#labelIdEP1").val()}, function(result, data) {
				// 등록버튼일때 이미등록인 라벨있다면
				if(btnType== "INSERT" && data.length > 0)
				{   that.initMessage= Language.lang['MESSAGES12449'];				
					return;
				} // 등록버튼일때 이미등록인 라벨없다면
				else if(btnType== "INSERT" && data.length ==0)
					{
					
					}
				// 업데이트시
				else if(btnType== "UPDATE" || data.length == 0) {
					
				}			
																											   
				}, undefined, undefined, this, 'sync');
			}
		else if(indexInfo['op'] != undefined && indexInfo.op == 'saveBtnEP2') {				
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);			
			param.cuFlag = btnType;
			param.labelId = selectItems[0].item.labelId;
			param.printId = selectItems[0].item.printId;
									
			
			}
		
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		var that = this;
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 0) {
			if(indexInfo != undefined && indexInfo['op'] == 'delActBtn1') {
				that.groupDelMsg = Language.lang['MESSAGES12498'];
			}
			else if(indexInfo != undefined && indexInfo['op'] == 'delActBtn2') {
				that.groupDelMsg = Language.lang['MESSAGES12498'];
				
			}
			
			
			
		}
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.labelId = item['labelId'];
			this.printId = item['printId'];
			
		}
	},
	event : function() {
		var that = this;
		var cnt = 0;
		
		//mm->pix 변환(enter입력시)
		$(document).on("keydown", "#xPositionMmEP2", function() {
			if (event.keyCode == 13){
				
				var xMm = $("#xPositionMmEP2").val();
				var yMm = $("#yPositionMmEP2").val();
				var xPix = Number(xMm)*12;
				var yPix = Number(yMm)*12;
				$('#xPositionPixEP2').val(xPix);
				
			}			
		});
		$(document).on("keydown", "#yPositionMmEP2", function() {
			if (event.keyCode == 13){
							
				var yMm = $("#yPositionMmEP2").val();				
				var yPix = Number(yMm)*12;			
				$('#yPositionPixEP2').val(yPix);
			}			
		});
		$(document).on("keydown", "#widthAreaMmEP2", function() {
			if (event.keyCode == 13){
							
				var wMm = $("#widthAreaMmEP2").val();				
				var wPix = Number(wMm)*12;			
				$('#widthAreaPixEP2').val(wPix);
			}			
		});
		$(document).on("keydown", "#heightAreaMmEP2", function() {
			if (event.keyCode == 13){
							
				var hMm = $("#heightAreaMmEP2").val();				
				var hPix = Number(hMm)*12;			
				$('#heightAreaPixEP2').val(hPix);
			}			
		});
		$(document).on("keydown", "#barcodeHeightMmEP2", function() {
			if (event.keyCode == 13){
							
				var bhMm = $("#barcodeHeightMmEP2").val();				
				var bhPix = Number(bhMm)*12;			
				$('#barcodeHeightPixEP2').val(bhPix);
			}			
		});
				
		// 라벨인쇄버튼
		$(document).on('click','#labelPrintBtn1', function() {			 	
			var selectItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			var param = {				
					labelId : selectItems[0].item.labelId,
					printId : selectItems[0].item.printId									
				};

			console.log($("html").attr("contextPath") + "/pop/request/print");
				$.ajax({
					url :  "/TU_Platform/pop/request/print",
					method : "get",
					data : param,
					success : function(data) {
						if (data.length > 0) {
						//	$('#write_text').val(data);
							writeToSelectedPrinter(data);
						}
					}
				});
					
		});
	}, 

};
$(document).ready(function(event){
	momWidget.init(1, 'MOMAA002', MOMAA002);
	momWidget.init(2, 'MOMAA002', MOMAA002);
	
	MOMAA002.init();
});