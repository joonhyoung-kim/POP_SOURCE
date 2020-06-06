var MOMDA008_1 = {
	initMessage			: undefined, 
	initParam			: undefined,
		
	allowMinusQty 		: undefined,
	outsourcingUseFlag 	: undefined,
	autoDeductionFlag 	: undefined,
	
	market				: undefined,
	currency			: undefined,
	
	menuId				: 'MOMDA008',
	
	checkNumber 		: /^[0-9]*$/,
	checkDp 			: /^\d*[.]\d*$/,
	validDT 			: /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/,
	regNumber 			: /^[0-9]*$/,
	
	initCount			: 0,
	
	init: function() {
		Language.init(function() {
		});
		
		this.design();
		this.event();
		momWidget.splitter('.h03-h', 'horizontal', '50%');
	}, loadCallInit: function() {
		var that = this;
		momWidget.isInitGrid(0, function() {
			momWidget.isInitGrid(1, function() {
				momWidget.isInitGrid(2, function() {
					momWidget.isInitGrid(3, function() {
						that.grid();
					});
				});
			});
		});
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		console.log('retrieveCallInit ' + JSON.stringify(indexInfo));
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
		} else if(indexInfo != undefined && (indexInfo['op'] == 'findBtn1' || (indexInfo['op'] == 'autoDeductionBtn1' && indexInfo['sequence'] == 2) || (indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 4))) {
			var checkedItems = '';
			var stateList = $('#state').jqxComboBox('getCheckedItems');
			$.each(stateList, function(index) {
				if(stateList.length-1 != index) {
					checkedItems += "'"+this.value + "',";
				} else {
					checkedItems += "'"+this.value + "'";
				}
			});
			
			this.initParam = {state: checkedItems};
		} else if(indexInfo != undefined && indexInfo['op'] == 'createPerfomanceBtn1' && indexInfo['sequence'] == 1) {
			if(param['orderFlag'] == 'OUT' && this.outsourcingUseFlag == 'Y') {
				this.initMessage = Language.lang['MESSAGES10931'];
				return;
			}
			
			this.initParam = {workOrderId : param['workOrderId']}; 
		} else if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 2) {
			if(param != undefined && param['workOrderId'] != undefined) {
				this.initParam = {inWorkOrderId: param['workOrderId']};
			} else {
				this.initParam = {inWorkOrderId: '-1', NO_ACTION: 'Y'};
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3' && indexInfo['sequence'] == 2) {
			this.initParam = {workOrderId : param['workOrderId']};
			this.initMessage = 'CLEAR_PARAM';
		} else if(indexInfo != undefined && indexInfo['op'] == 'cancelPerfomanceBtn4' && indexInfo['sequence'] == 2) {
			this.initParam = {workOrderId : param['workOrderId']}; 
		}
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		var that = this;		
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
			
			AUIGrid.clearGridData(momWidget.grid[1]);
		} else if(indexInfo != undefined && indexInfo['op'] == 'createPerfomanceBtn1' && indexInfo['sequence'] == 1) {
			AUIGrid.setGridData(momWidget.grid[2], data);
			mom_ajax('R', 'workOrder.workOrderResult.workOrderResultCreateHist', this.initParam, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
			
				AUIGrid.setGridData(momWidget.grid[3], data);
				momWidget.splashHide();
			
				$('#listPop1').momModal('show');
				AUIGrid.resize(momWidget.grid[3]); //공통에서 grid[2]번만 resize 해줘서 추가로 resize
			}, undefined, undefined, that, 'sync');
		} else if(indexInfo != undefined && ((indexInfo['op'] == 'autoDeductionBtn1' && indexInfo['sequence'] == 2) || (indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 4))) {
			this.initCount = 0;
			AUIGrid.clearGridData(momWidget.grid[1]);
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.splashHide();
			
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 2) {
			if(param != undefined && param['NO_ACTION'] == 'Y') {
				var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
				var arrayList = [];
				for(var i = 0; i < checkedItems.length; i++) {
					arrayList.push(checkedItems[i].rowIndex);
				}
				
				delete param['NO_ACTION'];
				AUIGrid.removeRow(momWidget.grid[1], arrayList);
			} else {
				this.initCount = 100000;
				AUIGrid.setGridData(momWidget.grid[1], data);
				setTimeout(function() {
					that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
				}, 1000);
			}
			
			momWidget.splashHide();
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3' && indexInfo['sequence'] == 2) {
			AUIGrid.setGridData(momWidget.grid[2], data);
			mom_ajax('R', 'workOrder.workOrderResult.workOrderResultCreateHist', param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				AUIGrid.setGridData(momWidget.grid[3], data);
				momWidget.splashHide();
			}, undefined, undefined, this, 'sync');
		} else if(indexInfo != undefined && indexInfo['op'] == 'cancelPerfomanceBtn4' && indexInfo['sequence'] == 2) {
			AUIGrid.setGridData(momWidget.grid[2], data);
			mom_ajax('R', 'workOrder.workOrderResult.workOrderResultCreateHist', this.initParam, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
			
				AUIGrid.setGridData(momWidget.grid[3], data);
				momWidget.splashHide();
			}, undefined, undefined, that, 'sync');
		} else if(indexInfo != undefined && (indexInfo['op'] == 'cancelSaveBtn1' || indexInfo['op'] == 'cancelAllWoBtn1') && indexInfo['sequence'] == 2) { 
			momWidget.splashHide();
			if(indexInfo['op'] == 'cancelSaveBtn1') {
				$('#cancelPop1').momModal('hide');
			}
			
			AUIGrid.setGridData(momWidget.grid[0], data);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else {
			if(index == 1) {
				that.initCount = 100000;
			}
			
			AUIGrid.setGridData(momWidget.grid[index], data);
			momWidget.splashHide();
			
			if(index == 1) {
				setTimeout(function() {
					that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
				}, 1000);
			}
		}
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'autoDeductionBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < param.length; i++) {
				if(param[i]['qty'] == undefined || param[i]['qty'] <= 0) {
					this.initMessage = Language.getLang('MESSAGES12192');
					return;
				} else if(param[i]['endTime'] == undefined || to_date_yyyy_mm_dd(param[i]['endTime'].substring(0,10)) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES10923' + '@' + this.endPeriod);
					return;
				}
				
				// 수동차감 안 된 데이터만 자동차감 진행
				if(param[i]['manualDeductFlag'] == undefined || param[i]['manualDeductFlag'] == 'N') {
					param[i]['deductFlag'] = 'AUTO';
				}
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 3) {
			this.initParam = {deductFlag: 'MANUAL'};
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3' && indexInfo['sequence'] == 1) {
			var realQty = 0; 
			var defectFlag = param[0]['defectFlag'];	
			var overFlag = param[0]['overFlag'];
			
			var now = new Date();
			var startDT = param[0]['startDate'] + ' ' + param[0]['startTime'];
			var endDT = param[0]['endDate'] + ' ' + param[0]['endTime'];
			
			var chkStartDate = new Date(param[0]['startDate']);
			var chkEndDate = new Date(param[0]['endDate']);			
			var chkStartTime = parseInt(param[0]['startTime'].replace(/:/gi,''));
			var chkEndTime = parseInt(param[0]['endTime'].replace(/:/gi,''));
			
			var currDT = get_current_date('yyyy-mm-dd hh24:mi:ss');
			var currDate = get_current_date('yyyy-mm-dd');
			
			/*시간체크*/
			if(startDT == '' || !this.validDT.test(startDT) ) {
				this.initMessage = Language.lang['MESSAGES10791'];
				return;
			} else if(endDT == '' || !this.validDT.test(endDT) ) {
				this.initMessage = Language.lang['MESSAGES10926'];
				return;
			} else if(chkStartDate > chkEndDate) {
				this.initMessage = Language.lang['MESSAGES10927'];
				return;		
			} else if(param[0]['startDate'].replace(/-/gi,'') == param[0]['endDate'].replace(/-/gi,'') && Number(chkStartTime) > Number(chkEndTime)) {
				this.initMessage = Language.lang['MESSAGES10924'];
				return;
			}
			
			/*숫자입력체크*/
			if(!this.regNumber.test(param[0]['insertNumber'])) {
				this.initMessage = Language.lang['MESSAGES11139'];
				return;
			} else if(!this.regNumber.test(param[0]['goodQty'])) {
				this.initMessage = Language.lang['MESSAGES10834'];
				return;
			} else if(!this.regNumber.test(param[0]['badQty'])) {
				this.initMessage = Language.lang['MESSAGES10515'];
				return;
			} else if(param[0]['closeFlag'] == 'N' && param[0]['goodQty'] <= 0 && param[0]['badQty'] <= 0) {
				this.initMessage = Language.lang['MESSAGES10833'];
				return;
			}
			
			if(overFlag == 'N') { 								// 초과실적등록 미허용일 경우
				if(defectFlag == 'N' || defectFlag == '') { 	// 불량수량 미사용일 경우
					realQty = parseInt(param[0]['goodQty']); 	// 실적수량 = 양품수량
				} else if(defectFlag == 'Y') { 					// 불량수량 사용일 경우
					realQty = parseInt(param[0]['goodQty']) + parseInt(param[0]['badQty']); // 실적수량 = 양품수량 + 불량수량
				}
				
				if(param[0]['remainQty'] < realQty) { 			// 잔여수량 < 실적수량일 경우 
					this.initMessage = Language.lang['MESSAGES10813'];
					return;
				}
			}
			
			if(param[0]['startDate'] <= this.endPeriod) {
				this.initMessage = Language.getLang('MESSAGES10792' + '@' + this.endPeriod);
				return;
			}		
		} else if(indexInfo != undefined && indexInfo['op'] == 'cancelPerfomanceBtn4' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < param.length; i++) {
				if(param[i]['state'] == 'C' || param[i]['cancelFlag'] == '1'){
					this.initMessage = Language.lang['MESSAGES11006'];
					return;
				}
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'cancelSaveBtn1' && indexInfo['sequence'] == 1) {
			this.initParam = this.getWOCancelPop();
			if(this.initParam['cancelQty'] == '') {
				this.initMessage = Language.lang['MESSAGES11472'];
				return;
			} else if(this.initParam['#description'] == '') {
				this.initMessage = Language.lang['MESSAGES11468'];
				return;
			} else if(Number(this.initParam['cancelQty']) > Number(this.initParam['remainQty'])) {
				this.initMessage = Language.lang['MESSAGES11474'];
				return;
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'cancelAllWoBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(to_date_yyyy_mm_dd(callBackParam['planStartTime']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11276' + '@' + this.endPeriod);
					return;
				}
				
				param[i]['cancelQty'] = callBackParam[i]['remainQty'];
				param[i]['description'] = Language.lang['MESSAGES10161'];
				console.log('remainQty = ' + callBackParam[i]['remainQty'] + ', ' + 'cancelQty = ' + param[i]['cancelQty']);

				if(callBackParam[i]['woState'] == 'T') {
					this.initMessage = Language.lang['MESSAGES11136'];
					return;
				}
			}
			
		}
	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'materialDeductionBtn2' && indexInfo['sequence'] == 1) {
			var items = AUIGrid.getGridData(momWidget.grid[1]);
			if(items == undefined || items.length < 1) {
				this.initMessage = Language.lang['MESSAGES10328'];
				return;
			}
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['workOrderId'] == undefined || callBackParam[i]['workOrderId'] == '') {
					this.initMessage = Language.lang['MESSAGES11151'];
					return;
				} else if(callBackParam[i]['itemId'] == undefined || callBackParam[i]['itemId'] == '') {
					this.initMessage = Language.lang['MESSAGES11589'];
					return;
				} else if(callBackParam[i]['inLocationName'] == undefined || callBackParam[i]['inLocationName'] == '') {
					this.initMessage = Language.lang['MESSAGES11397'];
					return;
				} else if(callBackParam[i]['outLocationName'] == undefined || callBackParam[i]['outLocationName'] == '') {
					this.initMessage = Language.lang['MESSAGES10712'];
					return;
				} else if(callBackParam[i]['requestDate'] == undefined || callBackParam[i]['requestDate'] == '') {
					this.initMessage = Language.lang['MESSAGES10951'];
					return;
				} else if(callBackParam[i]['requestQty'] == undefined || callBackParam[i]['requestQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10946'];
					return;
				} else if(callBackParam[i]['unitQty'] == undefined || callBackParam[i]['unitQty'] == '') {
					this.initMessage = Language.lang['MESSAGES10709'];
					return;
				} else if(callBackParam[i]['requestQty'] <= 0) {
					this.initMessage = Language.lang['MESSAGES10944'];
					return;
				} else if(callBackParam[i]['unitQty'] <= 0) {
					this.initMessage = Language.lang['MESSAGES10707'];
					return;
				} else if(!this.checkNumber.test(callBackParam[i]['requestQty']) && !checkDp.test(callBackParam[i]['requestQty'])) {
					this.initMessage = Language.lang['MESSAGES10945'];
					return;
				} else if(!this.checkNumber.test(callBackParam[i]['remainQty']) && !checkDp.test(callBackParam[i]['remainQty'])) {
					this.initMessage = Language.lang['MESSAGES11284'];
					return;
				} else if(!this.checkNumber.test(callBackParam[i]['unitQty']) && !checkDp.test(callBackParam[i]['unitQty'])) {
					this.initMessage = Language.lang['MESSAGES10708'];
					return;
				} else if(callBackParam[i]['deductDate'] == undefined || callBackParam[i]['deductDate'] == '') {
					this.initMessage = Language.lang['MESSAGES11288'];
					return;
				} else if(to_date_yyyy_mm_dd(callBackParam[i]['deductDate']) <= this.endPeriod) {
					this.initMessage = Language.getLang('MESSAGES11287' + '@' + this.endPeriod);
					return;
				}
			}
			
			this.initMessage = 'CLEAR_PARAM';
		} else if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 1) {
			if (callBackParam.length <= 0) {
				this.initMessage = Language.lang['MESSAGES10585'];
				return;
			}
			
			for(var i = callBackParam.length; i >= 0; i--) {
				if(callBackParam[i] != undefined && callBackParam[i]['deductedQty'] != undefined && callBackParam[i]['deductedQty'] != 0 && callBackParam[i]['addFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES11282'];
					return;
				} else if(callBackParam[i] != undefined && callBackParam[i]['issueQty'] != undefined && callBackParam[i]['issueQty'] != 0 && callBackParam[i]['addFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES10529'];
					return;
				} else if (callBackParam[i] != undefined && callBackParam[i]['addFlag'] == 'N') {
					callBackParam.splice(i, 1);
					param.splice(i, 1);
				}
			}
		}
	}, grid: function() {
		var that = this;
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'workOrderId', {
			editable: true,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});	
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'itemId', {
			editable: true,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'inLocationCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'outLocationCd', {
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});	
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'remainQty', {
			editable: true,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'unitQty', {
			editable: true,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}
		});
		
		AUIGrid.setColumnPropByDataField(momWidget.grid[1], 'requestDate', {
			editable: true,
			styleFunction: function(rowIndex, columnIndex, value, headerText, item, dataField) {
				if(rowIndex >= that.initCount) {
					return 'columnStyle';
				}
			}, editRenderer: {
				 type: "CalendarRenderer",
				 openDirectly: true,
				 onlyCalendar: true
			}
		});	
		
		mom_ajax('R', 'common.comParameter', {}, function(result, data) {
			if(result != 'SUCCESS' || data.length < 1) {
				return;
			}
			
			that.outsourcingUseFlag = data[0]['outsourcingUseFlag'];
			if(that.outsourcingUseFlag == 'Y') {
				$('#orderFlag').jqxComboBox('selectIndex', 0, true);
			}
			
			that.market = data[0]['marketCd'];
			that.currency = data[0]['currency'];
		}, undefined, undefined, this, 'sync');
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			if(e.dataField == 'inLocationCd' || e.dataField == 'outLocationCd') {
				 if(e.rowIndex >= that.initCount) {
					 return true;
				 } else {
					 return false;
				 }
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEndBefore', function(e) { 
			if(e.dataField == 'deductDate') { // 달력 지정한 필드인 경우 
				if(new Date(to_date_yyyy_mm_dd(event.value)) <= new Date(that.endPeriod)) { 
					momWidget.messageBox({type:'warning', width:'400', height: '145', html:Language.getLang('MESSAGES10725' + '@' + that.endPeriod)});
					return e.oldValue;
				} else {
					return to_date_yyyy_mm_dd(e.value); 
				} 
			}
			
			return e.value; 
		});
		
		AUIGrid.setProp(momWidget.grid[2], {'editBeginMode' : 'click'});
	}, event: function() {
		var that = this;
		
		$(document).on('click', '#choiceBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			var inWorkOrderId = '';
			if(checkedItems.length <= 0 || checkedItems.length > 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11604']});
				return;
			} 
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(checkedItems[i]['item']['woState'] != 'T' && checkedItems[i]['item']['woState'] != 'R' && checkedItems[i]['item']['woState'] != 'H') {
					momWidget.messageBox({type:'warning', width:'400', height: '145', html: Language.lang['MESSAGES11135']});
					return;
				}
				
				inWorkOrderId += "'" + checkedItems[i]['item']['workOrderId'] + "'";
				if(i != checkedItems.length - 1) {
					inWorkOrderId += ',';
				}
			}
			
			var param = {inWorkOrderId: inWorkOrderId};			
			momWidget.findBtnClicked(1, true, param, function(result, data) {
				if(result != 'SUCCESS') {
					momWidget.splashHide();
					return;
				}
				
				that.initCount = 100000;
				AUIGrid.setGridData(momWidget.grid[1], data);
				momWidget.splashHide();
				setTimeout(function() {
					that.initCount = AUIGrid.getRowCount(momWidget.grid[1]);
				}, 1000);
			}, {index: 1, op: 'choiceBtn1'}, undefined);
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e) {
			AUIGrid.setProp(momWidget.grid[1], 'exportURL', '0');
			if(e.rowIndex < that.initCount) {
				if(
					   e['dataField' == 'workOrderId'] 
					|| e['dataField'] == 'itemId' 
					|| e['dataField'] == 'inLocationName' 
					|| e['dataField'] == 'outLocationName'
					|| e['dataField'] == 'requestDate'
					|| e['dataField'] == 'requestQty'
					|| e['dataField'] == 'remainQty' 
					|| e['dataField'] == 'unitQty'
				) {
					return false;
				}
			}
		});
		
		AUIGrid.bind(momWidget.grid[1], 'cellEditEnd', function(e) {
			if(e.dataField == 'outLocationName' || e.dataField == 'itemId' ) {
				mom_ajax('R', 'common.curItemStock', {itemId: e.item.itemId.replace(/(\s*)/gi,''), locationCd: e.item.outLocationName}, function(result, data) {
					if(result != 'SUCCESS' || data.length < 1 || data[0] == undefined) {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', 0);
					} else {
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'currentQty', data[0]['currentQty']);
					}
				}, undefined, undefined, that, 'sync');
				
				if(e.dataField == 'itemId') {
					mom_ajax('R', 'common.comItemInfo', {itemId: e.item.itemId.replace(/(\s*)/gi,'')}, function(result, data) {
						if(result != 'SUCCESS' || data.length < 1) {
							return;
						} 
						
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'itemName', data[0]['itemName']);
						AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, 'specification', data[0]['specification']);
					}, undefined, undefined, that, 'sync');
				}
			} 
		});
		
		$(document).on('click', '#actAddBtn2', function() {
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length < 1) {
				momWidget.messageBox({type:'warning', width:'400', height: '145', html:'내릴 행을 선택하여 주십시오.'});
				return;
			}
			
			var setWorkOrderId = '';
			var setWoTypeName = '';
			if(checkedItems[0]['item']['woType'] == 'RE') {
				setWorkOrderId = checkedItems[0]['item']['workOrderId'];
				setWoTypeName = Language.lang['MESSAGES11717'];
			} else {
				if(grid2Items.length != 0) {
					var setWorkOrderId = grid2Items[grid2Items.length - 1]['workOrderId'];
				} else {
					var setWorkOrderId = checkedItems[0]['item']['workOrderId'];
				}
				
				var setWoTypeName = Language.lang['MESSAGES11718'];
			}
			
			var setWoType = checkedItems[0]['item']['woType'];
			var newRow = {
				  'woType'			: setWoType
				, 'woTypeName'		: setWoTypeName
				, 'workOrderId'		: setWorkOrderId || ''
				, 'addFlag'			: 'N'
				, 'marketCd'		: that.market
				, 'currencyCd'		: that.currency
				, 'currentQty'		: 0
				, 'originRequestQty': 0
				, 'requestQty'		: 0
				, 'issueQty'		: 0
				, 'cancelQty'		: 0
				, 'remainQty'		: 0
				, 'unitQty'			: 0
			};
			
			AUIGrid.addRow(momWidget.grid[1], newRow, 'last');
		});
		
		$(document).on('click', '#cancelWoBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length != 1) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11605']});
				return;
			} else if(checkedItems[0]['item']['woState'] == 'T') {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11136']});
				return;
			}
			
			for(var i = 0; i < checkedItems.length; i++) {
				if(to_date_yyyy_mm_dd(checkedItems[i]['item']['planStartTime']) <= that.endPeriod) {
					momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.getLang('MESSAGES11276' + '@' + that.endPeriod)});
					return;
				}
			}
			
			that.setWOCancelPop(checkedItems[0].item);
			$('#cancelPop1').momModal('show');
		});
		
		/*$(document).on('click', '#cancelAllWoBtn1', function() {
			var checkedItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
			if(checkedItems.length == 0) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES11610']});
				return;
			}
		});*/
		
		$(document).on('click', '#materialDeductionBtn2', function() {
			var grid2Length = AUIGrid.getGridData(momWidget.grid[1].length);
			if(grid2Length == 0) {
				momWidget.messageBox({type:"warning", width:"400", height: "145", html:Language.lang['MESSAGES10328']});
				return;
			}
		});
		
		$(document).on('click', '#cancelCloseBtn1, #cancelBtn3, .bntpopclose', function() {
			$('.modal').momModal('hide');
			momWidget.findBtnClicked(0, true, {}, undefined, {index: 0, op: 'closePopUp'}, that);
			AUIGrid.clearGridData(momWidget.grid[1]);
		});
		
		// 실적등록 내 저장 버튼 클릭 시
//		$(document).on('click', '#actSaveBtn3', function() {
//			var gridData = AUIGrid.getGridData(momWidget.grid[2]);
//			var validDT = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
//			var startDT = gridData[0].startDate + " " + gridData[0].startTime;
//			var endDT = gridData[0].endDate + " " + gridData[0].endTime;
//			
//			var chkStartDate = new Date(gridData[0].startDate);
//			var chkEndDate = new Date(gridData[0].endDate);
//			
//			var chkStartTime = parseInt(gridData[0].startTime.replace(":",""));
//			var chkEndTime = parseInt(gridData[0].endTime.replace(":",""));
//			
//			var regNumber = /^[0-9]*$/;
//			var realQty = 0; 
//			
//			/*시간체크*/
//			if(startDT == '' || !validDT.test(startDT)) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10791']});
//				return;
//			}
//			
//			if(endDT == '' || !validDT.test(endDT)) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10926']});
//				return;
//			}
//			
//			if(chkStartDate > chkEndDate) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10927']});
//				return;		
//				
//			} else if(chkStartDate == chkEndDate) {
//				if(chkStartTime > chkEndTime){
//					momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10924']});
//					return;
//				}
//			}
//			
//			/*숫자입력체크*/
//			if(!regNumber.test(gridData[0].insertNumber)) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES11139']});
//				return;
//			}
//			
//			if(!regNumber.test(gridData[0].goodQty)) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10834']});
//				return;
//			}
//			
//			if(!regNumber.test(gridData[0].badQty)) {
//				momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10515']});
//				return;
//			}
//			
//			if(gridData[0].closeFlag == 'N') {
//				if(gridData[0].goodQty <= 0 && gridData[0].badQty <= 0){
//					momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10833']});
//					return;
//				}
//			}
//			
//			if(gridData[0].overFlag == 'N') { // 초과실적등록 미허용일 경우
//				if(gridData[0].defectFlag == 'N' || gridData[0].defectFlag == '') { // 불량수량 미사용일 경우
//					realQty = parseInt(gridData[0].goodQty); // 실적수량 = 양품수량
//					
//				} else if(gridData[0].defectFlag == 'Y') { // 불량수량 사용일 경우
//					realQty = parseInt(gridData[0].goodQty) + parseInt(gridData[0].badQty); // 실적수량 = 양품수량 + 불량수량
//				}
//				
//				if(gridData[0].remainQty < realQty) { // 잔여수량 < 실적수량일 경우 
//					momWidget.messageBox({type:"warning",width:"400", height: "145", html:Language.lang['MESSAGES10813']});
//					return;
//				}
//			}
//		});
		
	}, popUpCancelBtnCallBack: function(index) {
		if(index == 2) {
			momWidget.findBtnClicked(0, false, undefined, undefined, {index: 0, op: 'findBtn1', sequence: 1}, this);
		}
	}, design: function() {
		$('head').append('<style>.columnStyle{ background: #C7E8FD;}</style>');	
	}, setWOCancelPop : function(data) {
		data = data || {};
		
		$('#resultQty').val(data.resultQty || 0);
		$('#goodQty').val(data.qty || 0);
		$('#remainQty').val(data.remainQty || 0);
		$('#cancelQty').val('');
		$('#description').val('');
		$('#resultQty, #goodQty, #remainQty').attr('readonly','readonly');
	}, getWOCancelPop: function() {
		var selectItems = AUIGrid.getCheckedRowItems(momWidget.grid[0]);
		var param = {
			  resultQty: $('#resultQty').val()
			, goodQty: $('#goodQty').val()
			, remainQty: $('#remainQty').val()
			, cancelQty: $('#cancelQty').val()
			, description: $('#description').val()
			, workOrderId: selectItems[0].item.workOrderId
			, itemId: selectItems[0].item.itemId
			, woState: selectItems[0].item.woState
		};
		
		return param;
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMDA008_1',MOMDA008_1);
	momWidget.init(2, 'MOMDA008_1',MOMDA008_1);
	momWidget.init(3, 'MOMDA008_1',MOMDA008_1);
	momWidget.init(4, 'MOMDA008_1',MOMDA008_1);
	MOMDA008_1.init();
});