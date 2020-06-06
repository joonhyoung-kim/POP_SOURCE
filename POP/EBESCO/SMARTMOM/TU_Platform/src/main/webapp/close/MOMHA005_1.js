var MOMHA005_1 = {
	initMessage		: undefined, 
	initParam		: undefined,
	
	vendorCd 		: undefined,
	
	inoutFlag		: undefined,
	taxFlag			: undefined,
	
	endFlag			: undefined,
	endSeq			: undefined,
	currencyCd		: undefined,
	
	closeType		: undefined,
	closeTypeName	: undefined,
	
	currentEnterKeyIndex : 0, 
	
	param			: undefined,
		
	init: function() {
		var that = this;
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(2, function() {
						that.grid();
						momWidget.dropDownPost(0, undefined, undefined, undefined, that);
					});
				});
			});
		});
		
		this.event();
		momWidget.splitter('.h01-h', 'horizontal', '50%');
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'findBtn1') {
			this.initParam = {inoutFlag: this.inoutFlag};
		} else if(indexInfo != undefined && indexInfo['op'] == 'findBtn5') {
			if($('#fromDate').val() == '' || $('#toDate').val() == '') {
				this.initMessage = Language.lang['MESSAGES10250'];
				return;
			} else if($('#fromDate').val() > $('#toDate').val()) {
				this.initMessage = Language.lang['MESSAGES10785'];
				return;
			}
			
			this.initParam = {inoutFlag: this.inoutFlag, vendorCd: this.vendorCd, category: this.closeType};
		} 
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(result != 'SUCCESS') {
			momWidget.splashHide();
			return;
		}
		
		var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		momWidget.splashHide();
		
		if(
				indexInfo != undefined 
			&& 
				(indexInfo['op'] == 'saveBtnEP1' || indexInfo['op'] == 'actDelBtn1' || indexInfo['op'] == 'actSaveBtn3' || indexInfo['op'] == 'actEditBtn3') 
			&& 
				indexInfo['sequence'] == 2
		) {
			AUIGrid.clearGridData(momWidget.grid[1]);
			momWidget.messageBox({type: 'success', width: '400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && (indexInfo['op'] == 'actSaveBtn2' || indexInfo['op'] == 'actDelBtn2') && indexInfo['sequence'] == 2) {
			indexInfo['index'] = 1;
			indexInfo['sequence'] += 1;			
			delete indexInfo['newIndex'];
			momWidget.findBtnClicked(1, false, this.initParam, undefined, indexInfo, this);
		} else if(
					indexInfo != undefined 
				&& 
				(
						((indexInfo['op'] == 'saveBtnEP1' || indexInfo['op'] == 'actEditBtn1' || indexInfo['op'] == 'actDelBtn3') && indexInfo['sequence'] == 2)
					||
						((indexInfo['op'] == 'actSaveBtn2' || indexInfo['op'] == 'actDelBtn2') && indexInfo['sequence'] == 3)
				)
		) {
			if(indexInfo['op'] == 'actDelBtn3' && indexInfo['sequence'] == 2) {
				AUIGrid.clearGridData(momWidget.grid[1]); 
			}
			momWidget.messageBox({type: 'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn5' && indexInfo['sequence'] == 4) {
			indexInfo['index'] = 1;
			indexInfo['sequence'] += 1;	
			delete indexInfo['newIndex'];
			this.initParam['vendorCd'] = this.vendorCd;
			momWidget.findBtnClicked(1, false, this.initParam, undefined, indexInfo, this);
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn5' && indexInfo['sequence'] == 5) {
			$('#listPop2').momModal('hide');
			AUIGrid.clearGridData(momWidget.grid[4]);
			momWidget.findBtnClicked(0, false, {inMonth: $('#inMonth').val(), vendorCd: that.vendorCd, endSeq: that.endSeq, category: that.closeType, inoutFlag: that.inoutFlag}, function(result1, data1) {
				AUIGrid.setGridData(momWidget.grid[0], data1);
				if(data1.length > 0){
					momWidget.findBtnClicked(1, false, {vendorCd: that.vendorCd, endSeq: that.endSeq, inoutFlag: that.inoutFlag}, function(result2, data2) {
						AUIGrid.setGridData(momWidget.grid[1], data2);
					})
				}
			});
			momWidget.messageBox({type: 'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
		} else if(indexInfo != undefined && indexInfo['op'] == 'closePopUp') {
			AUIGrid.clearGridData(momWidget.grid[2]);
		} 
	}, saveCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			this.initParam = {inMonth: $('#endDateEP1').val().substr(0, 7), endMonth: $('#endDateEP1').val().substr(0, 7), inoutFlag: this.inoutFlag};
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn2' && indexInfo['sequence'] == 1) {
			if(this.closeType == 'NOEND') {
				this.initMessage = Language.lang['MESSAGES10425'];
				return;
			} else if(this.endFlag == 'Y') {
				this.initMessage = Language.lang['MESSAGES10362'];
				return;
			} 
			
			for(var i = 0; i < callBackParam.length; i++) {
				var unitPrice = '';
				var foreignUnitPrice = '';
				var defCurrency = callBackParam[i]['defaultCurrency'];
				var currencyCd = callBackParam[i]['currencyCd'];
				if(currencyCd == defCurrency) {
					unitPrice = callBackParam[i]['unitPrice'];
				}else{
					unitPrice = callBackParam[i]['unitPrice'] * callBackParam[i]['exchangeRate'];
					foreignUnitPrice = callBackParam[i]['unitPrice'];
				}
				
				param[i]['unitPrice'] = unitPrice;
				param[i]['foreignUnitPrice'] = foreignUnitPrice;
				param[i]['vatPrice'] = callBackParam[i]['inoutVat'];
				param[i]['totalAmount'] = callBackParam[i]['inoutPrice'] + callBackParam[i]['inoutVat']
			}
			
			this.initParam = {vendorCd: this.vendorCd, endSeq: this.endSeq, category: this.closeType, inoutFlag: this.inoutFlag};
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn3' && indexInfo['sequence'] == 1) {
			this.initParam = this.getMaterialMonthlyCloseEtcPop();
			
			var item = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item;
			this.initParam['magamSeq'] 	= item['endSeq'];
            this.initParam['currencyCd']= item['currencyCd'];
            this.initParam['vendorCd'] 	= item['vendorCd'];
            this.initParam['inoutFlag'] = this.inoutFlag;
            this.initParam['endSeq'] 	= this.endSeq;
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn5' && indexInfo['sequence'] == 2) {
			for(var i = 0; i < param.length; i++) {
				param[i]['qty'] = param[i]['remainQty'];
			}
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 2) {
			this.initParam = {inoutFlag: this.inoutFlag, closeType: this.closeType};
		} else if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 3) {
			this.initParam = {inoutFlag: this.inoutFlag, closeType: this.closeType};
		} 
		
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn5' && indexInfo['sequence'] == 3) {
			$('#listPop2').momModal('hide');
			this.currentEnterKeyIndex = 0;
			if(this.closeType == 'INOUT' || this.closeType == 'RETURN') {
				indexInfo['index'] = 0;
				indexInfo['sequence'] += 1;
				delete indexInfo['newIndex'];
				momWidget.findBtnClicked(0, false, {}, undefined, indexInfo, this);
			} else { 
				momWidget.messageBox({type: 'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
				AUIGrid.clearGridData(momWidget.grid[4]);
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP1') {
			indexInfo['sequence'] = 2;
			momWidget.findBtnClicked(0, false, {}, undefined, indexInfo, this);
		} else if (indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 3) {
            param['vendorCd'] 	= this.vendorCd;
            param['endSeq'] 	= this.endSeq;
	         momWidget.findBtnClicked(1, false, {vendorCd: that.vendorCd, endSeq: that.endSeq, category: that.closeType, inoutFlag: that.inoutFlag}, function(result1, data1){
	        	 momWidget.findBtnClicked(0, false, {inMonth: $('#inMonth').val(), vendorCd: that.vendorCd, endSeq: that.endSeq, category: that.closeType, inoutFlag: that.inoutFlag}, function(result2, data2){
		        	 AUIGrid.setGridData(momWidget.grid[0], data2);
		         });
	        	 AUIGrid.setGridData(momWidget.grid[1], data1);
	         });
	         momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
	 		 momWidget.splashHide();
		}    

	}, delCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn1' && indexInfo['sequence'] == 1) {
			for(var i = 0; i < callBackParam.length; i++) {
				if(callBackParam[i]['endFlag'] == 'Y') {
					this.initMessage = Language.lang['MESSAGES10361'];
					return;
				} else if(callBackParam[i]['inoutAmount'] > 0 || callBackParam[i]['returnAmount'] > 0 || callBackParam[i]['etcAmount'] > 0) {
					this.initMessage = Language.lang['MESSAGES11316'];
					return;
				}
			}
		} else if(indexInfo != undefined && indexInfo['op'] == 'actDelBtn2' && indexInfo['sequence'] == 1) {
			if(this.closeType == 'NOEND') {
				this.initMessage = Language.lang['MESSAGES10424'];
				return;
			} else if(this.endFlag == 'Y') {
				this.initMessage = Language.lang['MESSAGES10361'];
				return;
			}
			
			this.initParam = {inoutFlag: this.inoutFlag};
		} else if(indexInfo != undefined && indexInfo['op'] == 'actSaveBtn5' && indexInfo['sequence'] == 1) {
			this.initParam = {inoutFlag: this.inoutFlag, category: this.closeType, closeType: this.closeType, endSeq: this.endSeq};
		}
	}, updateCallInit: function(index, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'actEditBtn3' && indexInfo['sequence'] == 1) {
			this.initParam = this.getMaterialMonthlyCloseEtcPop();
			
			this.initParam['magamSeq'] 		= param['magamSeq'];
            this.initParam['magamDetailSeq']= param['magamDetailSeq'];
            this.initParam['inoutFlag'] 	= this.inoutFlag;
            this.initParam['endSeq'] 		= this.endSeq;
		} 
	}, grid: function() {
		var that = this;
		this.inoutFlag = momWidget.getSearchParam()['inoutFlag'];
		
		if(that.inoutFlag == 'I') {
			that.param = {codeClassId: 'RESULT_END_FLAG', attribute1: 'Y', vendorType: "'COOPERATIVE','BOTH'"};
		} else if(that.inoutFlag == 'O') {
			that.param = {codeClassId: 'RESULT_END_FLAG', attribute2: 'Y', vendorType: "'CUSTOMER','BOTH'"};
		}
		
		// 마감수량 변경 시 환산수량 같이 변경
		AUIGrid.bind(momWidget.grid[4], 'cellEditEnd', function(e) {
			if(e.dataField == 'remainQty') {
				AUIGrid.setCellValue(momWidget.grid[4], e.rowIndex, 'conversionUnitQty', e.item['remainQty'] * e.item['itemConversionUnitQty']);
			}
		});
		
		$('.aui-grid-default-footer').css({'text-align': 'right'});
		var footerObject = [{
			labelText: '∑',
			positionField: '#base'
		},{
			positionField: 'itemId',
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10225'] + ': ' + that.closeTypeName;
			}
		},{
			dataField: 'qty',
			positionField: 'itemName',
			operation: 'SUM',
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11366'] + ': ' + AUIGrid.formatNumber(value, '#,##0');
			}
		},{
			dataField: 'foreignTotalPrice',
			positionField: 'specification',
			operation: 'SUM',
			colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10935'] + ': ' + AUIGrid.formatNumber(value, '#,###.###0');
			}
		},{
			positionField: 'currencyCd',
			dataField: 'inoutPrice',
			operation: 'SUM',
			colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10966'] + ': ' + AUIGrid.formatNumber(value, '#,###.###0');
			}
		},{
			dataField: 'inoutVat',
			positionField: 'foreignTotalPrice',
			operation: 'SUM',
			colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES10492'] + ': ' + AUIGrid.formatNumber(value, '#,##0');
			}
		},{
			dataField: 'totalAmount',
			positionField: 'totalAmount',
			operation: 'SUM',
			colSpan: 3,
			labelFunction: function(value, columnValues, footerValues) {
				return Language.lang['MESSAGES11365'] + ': ' + AUIGrid.formatNumber(value, '#,###.###0');
			}
		}];
		
		// footer 합계
		AUIGrid.setFooter(momWidget.grid[1], footerObject);
		
	}, event: function() {
		var that = this;
		//하단 등록 팝업창 오픈
		$('#actCreateBtn2').click(function() {
			if(that.closeType == 'NOEND') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10423']});
				return;
			} else if(that.endFlag == 'Y') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10360']});
				return;
			}
			
			var month = $('#inMonth').val().split('-')[1] - 0;
			$('#fromDate').val($.datepicker.formatDate($.datepicker.ATOM, new Date($('#inMonth').val().split('-')[0], month -1)));
	        $('#toDate').val($.datepicker.formatDate($.datepicker.ATOM, new Date($('#inMonth').val().split('-')[0], month, 0 )));
			var seletedItems = AUIGrid.getSelectedItems(momWidget.grid[0]);
			var grid2Items = AUIGrid.getGridData(momWidget.grid[1]);
			if(seletedItems.length == 0 && grid2Items.length == 0) {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10366']});
				return;
			} else {
				AUIGrid.clearGridData(momWidget.grid[4]);
				$('#listPop2').momModal('show');
				that.currentEnterKeyIndex = 4;
//				console.log('#### ' + that.currentEnterKeyIndex);
				that.setMaterialMonthlyCloseDetailPop();
			}
		});
		
		//하단 계산
		$('#calcBtn2').click(function(e) {
			if(that.closeType == 'NOEND') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10422']});
				return;
			} else if(this.endFlag == 'Y') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10359']});
				return;
			}
			
			var items = AUIGrid.getCheckedRowItems(momWidget.grid[1]);
			for(var i = 0; i < items.length; i++) {
				var index = items[i]['rowIndex'];
				var unitPrice = AUIGrid.getCellValue(momWidget.grid[1], index, 'unitPrice');
				var qty = AUIGrid.getCellValue(momWidget.grid[1], index, 'qty');
				var exchangeRate = AUIGrid.getCellValue(momWidget.grid[1], index, 'exchangeRate');
				var defaultCurrency = AUIGrid.getCellValue(momWidget.grid[1], index, 'defaultCurrency');
				var currencyCd = AUIGrid.getCellValue(momWidget.grid[1], index, 'currencyCd');
				var conversionQty = AUIGrid.getCellValue(momWidget.grid[1], index, 'conversionUnitQty');
				var calQty = 0;
				
				if(conversionQty == 0 || conversionQty == null) {
					calQty = qty;
				}else {
					calQty = conversionQty;
				}
				
				if(defaultCurrency == currencyCd) {
					AUIGrid.setCellValue(momWidget.grid[1], index, 'inoutPrice', Math.floor(calQty * unitPrice));
					AUIGrid.setCellValue(momWidget.grid[1], index, 'foreignTotalPrice', Math.floor(calQty * unitPrice));
				} else {
					AUIGrid.setCellValue(momWidget.grid[1], index, 'inoutPrice', Math.floor(calQty * unitPrice * exchangeRate));
					AUIGrid.setCellValue(momWidget.grid[1], index, 'foreignTotalPrice', (Math.floor(calQty * unitPrice * 10000)/10000));
				}
				
				var inoutPrice = AUIGrid.getCellValue(momWidget.grid[1], index, 'inoutPrice');
				
				if(that.taxFlag == 'TAX_FREE' || that.taxFlag == 'TAX_ZERO') {
					AUIGrid.setCellValue(momWidget.grid[1], index, 'inoutVat', 0);
				} else {
					AUIGrid.setCellValue(momWidget.grid[1], index, 'inoutVat', Math.floor(inoutPrice * 0.1));
				}
				
				var inoutVat = AUIGrid.getCellValue(momWidget.grid[1], index, 'inoutVat');
				AUIGrid.setCellValue(momWidget.grid[1], index, 'totalAmount', inoutPrice + inoutVat);
			}
		});
		
		//기타처리금액 팝업 계산 버튼 
		$('#calcBtn3').click(function() {
			var price = $('#price').val();
			if(that.taxFlag == 'TAX_FREE' || that.taxFlag == 'TAX_ZERO') {
				$('#vat').val(0);
			} else{
				$('#vat').val(Math.floor(price * 0.1));
			}
		});
		
		// XMOMH15 / ljw / 기타처리금액 팝업 금액, 입고일자 입력 없이 등록 버튼 클릭 시 Validation 체크
		$(document).on('click', '#actSaveBtn3', function () {
			if($('#price').val() == '') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12201']});
				return;
			} else if($('#inputDate').val() == '') {
				momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11057']});
				return;
			}
		});
		
		// 하단 그리드 엑셀 다운로드 버튼 클릭 시
        $(document).on("click", "#grid2ExcelDownBtn2", function() {
        	var fileName = 'MOMHA001' + '_' + get_current_date('yyyy-mm-dd');
                   
            var option = {fileName: fileName};
            option.afterRequestCallback = function() { // 엑셀 만들고 호출되는 콜백함수
	            $('.aui-grid-export-progress-modal').remove();
            }
          
            option.progressBar = true;
          
            AUIGrid.exportToXlsx(momWidget.grid[1], option);
       });
	}, cellClickCallBack: function(index, e) {
		var that = this.init != undefined ? this : this.MOMHA005_1;
		if(index == 0) {
			if(e.dataField != 'inoutAmount' && e.dataField != 'returnAmount' && e.dataField != 'noEndAmount' && e.dataField != 'etcAmount') {
				return;
			} 
			
			that.vendorCd = e.item['vendorCd'];
//			console.log('vendorCd = ' + that.vendorCd);
//			console.log(JSON.stringify(e.item));
			that.taxFlag = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item['taxFlag'];
			that.endSeq = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item['endSeq'];			
			that.endFlag = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item['endFlag'];
			that.currencyCd = AUIGrid.getSelectedItems(momWidget.grid[0])[0].item['currencyCd'];
//			console.log(that.currencyCd);
			$("#currencyCd").val(that.currencyCd);
			
			var queryId = 'close.materialMonthlyClosing.materialMonthlyClosingEtc';
			if(e.dataField == 'inoutAmount') {
				that.closeType = 'INOUT';
				that.closeTypeName = Language.lang['MESSAGES11728'];
				queryId = 'close.materialMonthlyClosing.materialMonthlyClosingDetail';
			} else if(e.dataField == 'returnAmount') {
				that.closeType = 'RETURN';
				that.closeTypeName = Language.lang['MESSAGES11729'];
				queryId = 'close.materialMonthlyClosing.materialMonthlyClosingDetail';
			} else if(e.dataField == 'noEndAmount') {
				that.closeType = 'NOEND';
				that.closeTypeName = Language.lang['MESSAGES12205'];
				queryId = 'close.materialMonthlyClosing.materialMonthlyClosingDetailNoEnd';
			}
			
			var param = {
				  inoutFlag: that.inoutFlag
				, vendorCd: e.item['vendorCd']
				, endSeq: AUIGrid.getSelectedItems(momWidget.grid[0])[0].item['endSeq']
				, category: that.closeType
				, inMonth: $('#inMonth').val()
			};
			
			if(e.dataField != 'etcAmount') {
				AUIGrid.clearGridData(momWidget.grid[1]);
			}
			
			momWidget.splashShow();
			mom_ajax('R', queryId, param, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				}
				
				if(e.dataField != 'etcAmount') {
					AUIGrid.setGridData(momWidget.grid[1], data);
				}
				
				if(e.dataField == 'inoutAmount' || e.dataField == 'returnAmount') {
					that.setText();
				} else if(e.dataField == 'etcAmount') {
					AUIGrid.setGridData(momWidget.grid[2], data);
					$('#listPop1').momModal('show');
					this.currentEnterKeyIndex = 2;
				} 
					
				if(e.dataField == 'noEndAmount') {
					AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e1) {
						if(
							   e1['dataField'] == 'exchangeRate' 
							|| e1['dataField'] == 'unitPrice'
							|| e1['dataField'] == 'foreignTotalPrice'
							|| e1['dataField'] == 'inoutPrice'
							|| e1['dataField'] == 'inoutVat'
							|| e1['dataField'] == 'description' 
						) {
							return false;
						}
					});
				} else {
					AUIGrid.bind(momWidget.grid[1], 'cellEditBegin', function(e1) {
						if(
							   e1['dataField'] == 'exchangeRate' 
							|| e1['dataField'] == 'unitPrice'
							|| e1['dataField'] == 'foreignTotalPrice'
							|| e1['dataField'] == 'inoutPrice'
							|| e1['dataField'] == 'inoutVat'
							|| e1['dataField'] == 'description' 
						) {
							return true;
						}
					});
				}
			}, undefined, undefined, that, 'sync');
			setTimeout(function() {
				momWidget.splashHide();
			}, 40);
		} else if(index == 2) {
			var item = AUIGrid.getSelectedItems(momWidget.grid[2])[0].item;
			
			$("#partNo").val(item['itemId']);
			$("#qty").val(item['qty']);
			$("#price").val(item['inoutPrice']);
			$("#vat").val(item['inoutVat']);
			$("#inputDate").val(item['ioTime']);
			$("#pmDescription2").val(item['description']);
		}
	}, popUpCancelBtnCallBack(index) {
		if(index == 2) {
			$('#partNo').val('');
			$('#qty').val('');
			$('#inputDate').val('');
			$('#price').val('');
			$('#vat').val('');
			$('#pmDescription2').val('');
			
			var indexInfo = {index: 0, op: 'closePopUp'};
			momWidget.findBtnClicked(1, true, {}, undefined, indexInfo, this);
		}
	}, getMaterialMonthlyCloseEtcPop: function() { //기타처리금액 등록
		var param = {
			itemId: $('#partNo').val(),
			qty: $('#qty').val(),
			inoutPrice: $('#price').val(),
			inoutVat: $('#vat').val(),
			ioTime: $('#inputDate').val(),
			description: $('#pmDescription2').val()
		};
		
		if(param.itemId == '' || param.itemId == null) {
			momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11589']});
			return;
		}
		if(param.qty == '' || param.qty == null) {
			momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES10719']});
			return;
		}
		if(param.ioTime == '' || param.ioTime == null) {
			momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES11057']});
			return;
		}
		if(param.inoutPrice == '' || param.inoutPrice == null) {
			momWidget.messageBox({type: 'warning', width: '400', height: '145', html: Language.lang['MESSAGES12447']});
			return;
		}
		
		return param;
	}, setMaterialMonthlyCloseDetailPop: function(data) { //상단 등록 팝업
		data = data || {};
		$('#itemId').val(data.itemId || '');
		$('#market').val(data.matketCd || '');
		$('#largeGroup').val(data.itemLargeGroup || '');
		$('#mideumGroup').val(data.itemMediumGroup || '');
		$('#dDescription').val(data.description || '');
	}, setText: function() {
		var item = AUIGrid.getSelectedItems(momWidget.grid[0]);
		$('.panelcontent .header-title').eq(2).text(Language.lang['MESSAGES10225'] + ': ' + this.closeTypeName);
		$('.panelcontent .header-title').eq(1).text(Language.lang['MESSAGES11654'] + ': ' + item[0].item['currencyCd']);
		$('.panelcontent .header-title').eq(0).text(Language.lang['MESSAGES10695'] + ': ' + item[0].item['taxFlagName']);
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMHA005_1', MOMHA005_1);
	momWidget.init(2, 'MOMHA005_1', MOMHA005_1);
	momWidget.init(3, 'MOMHA005_1', MOMHA005_1);
	momWidget.init(5, 'MOMHA005_1', MOMHA005_1);
	MOMHA005_1.init();
});