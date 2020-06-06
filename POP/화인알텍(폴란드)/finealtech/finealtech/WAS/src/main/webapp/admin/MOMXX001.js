var userId 		= sessionStorage.getItem('userId');
var divisionCd 	= sessionStorage.getItem('divisionCd');
var companyCd 	= sessionStorage.getItem('companyCd');
var locale 		= sessionStorage.getItem('locale');

var grid1 = undefined;
var grid2 = undefined;
var grid8 = undefined;
var grid9 = undefined;

var INFINITE = 100000000;

var flag = 'LANG';

var fromLocale;
var fromLocaleValue;
var toLocale;
var toLocaleValue;

var columnProperty1 = [
	{
		dataField 	: 'companyCd', 
		headerText 	: 'Company',
		width		: 80
	},{
		dataField 	: 'divisionCd', 
		headerText 	: 'Division',
		width		: 80
	},{
		dataField 	: 'locale', 
		headerText 	: 'Locale',
		width		: 60
	},{
		dataField 	: 'localeValue', 
		headerText 	: 'Nation',
		width		: 120
	},{
		dataField 	: 'pageId', 
		headerText 	: 'Page Id',
		width		: 120
	},{
		dataField 	: 'codeType', 
		headerText 	: 'Code',
		/*style		: 'left-column',*/
		width		: 120
	},{
		dataField 	: 'fromLang', 
		headerText 	: 'From Lang',
		style		: 'left-column'
	},{
		dataField 	: 'toLang', 
		headerText 	: 'To Lang',
		style		: 'left-column'
	},/*{
		dataField 	: 'useYn', 
		headerText 	: 'Use Y/N',
		width		: 80
	},*/{
		dataField 	: 'description', 
		headerText 	: 'Description',
		style		: 'left-column',
		width		: 120
	},{
		dataField 	: 'updateBy', 
		headerText 	: 'Updater',
		width		: 80
	},{
		dataField 	: 'NEW', 
		headerText 	: 'NEW',
		width		: 80,
		visible		: false
	}
];

var columnProperty2 = [
   	{
   		dataField 	: 'id', 
   		headerText 	: 'Id',
   		width		: 140
   	},{
   		dataField 	: 'locale', 
   		headerText 	: 'Locale',
   		width		: 80
   	},{
   		dataField 	: 'parentId', 
   		headerText 	: 'Parent Id',
   		width		: 140
   	},{
   		dataField 	: 'name', 
   		headerText 	: 'Name',
   		style		: 'left-column'
   	},{
   		dataField 	: 'url', 
   		headerText 	: 'url',
   		style		: 'left-column'
   	},{
   		dataField 	: 'icon', 
   		headerText 	: 'Icon',
   		width		: 100
   	},{
   		dataField 	: 'displayOrder', 
   		headerText 	: 'Display Order',
   		width		: 100
   	},{
   		dataField 	: 'useFlag', 
   		headerText 	: 'Use Y/N',
   		width		: 80
   	},{
   		dataField 	: 'param', 
   		headerText 	: 'Param',
   		style		: 'left-column',
   		width		: 120
   	}/*,{
		dataField 	: 'NEW', 
		headerText 	: 'NEW',
		width		: 80,
		visible		: false
	}*/
];

var gridProperty1 = {
	'showRowNumColumn':true,
	'showSelectionBorder':false,
	'editable':true,				
	'enableSorting':true,	
	'showRowCheckColumn':true,	
	'enableFilter':true,
	'filterLayoutWidth':200,
	'filterLayoutHeight':300,	
	'selectionMode':'multiplerows',
	'copySingleCellOnRowMode':true,
	'softRemoveRowMode': false,
	'showPageButtonCount':10,
	'pageRowCount':100,
	'usePaging':true
};

var MOMXX001 = {
	init: function() {		
		var that = this;
		
		Language.init(function() {
			that.grid1();
		});
		
		that.comboBox();
		that.grid9();
		that.event();
		that.fileInpuSet();	
	}, 
	
	grid1: function() {
		var that = this;
		
		if(grid1 != undefined) {
			AUIGrid.clearGridData(grid1);
			AUIGrid.destroy(grid1);
		}
		
		if(flag == 'MENU') {
			grid1 = AUIGrid.create('#grid1', columnProperty2, gridProperty1);
			
			var useCode =  [{'code':'N', 'name':'N'}, {'code':'Y', 'name':'Y'}];
			AUIGrid.setColumnPropByDataField(grid1, 'useFlag', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					return value;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : useCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});
		} else {
			grid1 = AUIGrid.create('#grid1', columnProperty1, gridProperty1);
			
			//var gridColumn = AUIGrid.getColumnLayout(grid1);
			
			var useCode =  [{'code':'N', 'name':'N'}, {'code':'Y', 'name':'Y'}];
			AUIGrid.setColumnPropByDataField(grid1, 'useYn', {
				style:'columnStyle',
				labelFunction: function(rowIndex, columnIndex, value, item) { 
					return value;
				},
				editRenderer: {
					type : 'DropDownListRenderer',
					list : useCode,
					showEditorBtnOver : true,
					keyField : 'code', 
					valueField : 'name'
				}
		 	});
		}
		
		tuCommon.cellClick(grid1);
	}, 
	
	grid9: function() {		
		$('body').append('<div id="temp_div_div" style="width600%; position:fixed; height:100%; z-index: -999; top:0px"><div id="grid8"></div></div>');
		$('body').append('<div id="temp_div_div" style="width600%; position:fixed; height:100%; z-index: -999; top:0px"><div id="grid9"></div></div>');
	},
	
	event: function() {
		var that = this;	
		// 조회 버튼
		$(document).on('click', '#findBtn', function() {
			that.retrieve();
		});
		
		$(document).on('click', '#toggleBtn', function() {
			if(flag == 'MENU') {
				flag = 'LANG';
				
				/*$('#toggle').css('display','');
				$('#fromLocaleLabel').text('From Lang.');*/
			} else {
				flag = 'MENU';
				
				/*$('#toggle').css('display','none');
				$('#fromLocaleLabel').text('Locale');*/
			}
			
			that.grid1();
			
			$('#toggleBtn').text(flag);
		});
		
		$(document).on('click', '#newBtn', function() {
			var items1 = $('#fromLocale').jqxComboBox('source');
			$('#fromLocale').jqxComboBox('clear');
			$('#fromLocale').jqxComboBox('source', items1);
			$('#fromLocale').jqxComboBox('val', '');
			
			var items2 = $('#toLocale').jqxComboBox('source');
			$('#toLocale').jqxComboBox('clear');
			$('#toLocale').jqxComboBox('source', items2);
			$('#toLocale').jqxComboBox('val', '');
			
			AUIGrid.clearGridData(grid1);
		});
		
		$(document).on('click', '#saveBtn', function() {
//			var items = AUIGrid.getGridData(grid1);
//			
//			if(items == undefined || items.length < 1) {
//				return;
//			}
//			
//			for(var i = 0; i < items.length; i++) {
//				delete items[i]._$uid;
//			}
			
			var saveItems = new Array();
			saveItems = that.setLocaleParams("C");
			
			micaCommon.messageBox({type:'info', width:'400', height: '145', html:'do you want to save?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function(){
				var url;
				if(flag == 'MENU') {
					url = 'admin.micaMenu';
				} else {
					url = 'lang.widget';
				}
				
				micaCommon.splash.show();
				
				mom_ajax('L', url, JSON.stringify(saveItems), function(result, data, call_back_param, flag) {
					micaCommon.splash.hide();
					
					if(result != 'SUCCESS') {
						micaCommon.messageBox({type:'danger', width:'400', height: '145', html: 'fail to enroll'});
						return;
					}
					
					that.retrieve();
					micaCommon.messageBox({type:'success', width:'400', height: '145', html: 'success to enroll'});
				}, undefined, undefined);
			}}});
		});
		
		$(document).on('click', '#addBtn', function() {
			var items = AUIGrid.getGridData(grid1);
			
			var currentDate;
			var newRow;
			if(flag == 'MENU') {
				newRow = {
					'id'				:'',
					'local'				:'',
					'parentId'			:'',
					'name'				:'',
					'url'				:'',
					'icon'				:'',
					'displayOrder'		:'',
					'useFlag'			:'Y',
					'param'				:'',
					'NEW'				:'Y'
					};
			} else {
				newRow = {
					'companyCd'			:companyCd,
					'divisionCd'		:divisionCd,
					'locale'			:'',
					'localeValue'		:'',
					'pageId'			:'',
					'codeType'			:'',
					'fromLang'			:'',
					'toLang'			:'',
					'description'		:'',
					'updateBy'			:userId,
					'NEW'				:'Y'
				};
			}
				
			AUIGrid.addRow(grid1, newRow, 'last');
		});
		
		$(document).on('click', '#delBtn', function() {
			micaCommon.messageBox({type:'info', width:'400', height:'145', html:'do you want to delete?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function(){
				var param = that.setLocaleParams("D");
				
				var url;
				if(flag == 'MENU') {
					url = 'admin.micaMenu';
				} else {
					url = 'lang.widget';
				}
				
				micaCommon.splash.show();
				
				if(param.length > 0) {
					mom_ajax('LD', url, JSON.stringify(param), function(result, data, call_back_param, flag) {
						micaCommon.splash.hide();
						
						if(result != 'SUCCESS') {
							micaCommon.messageBox({type:'danger', width:'400', height: '145', html: 'fail to delete'});
							return;
						}
						
						that.retrieve();
						micaCommon.messageBox({type:'success', width:'400', height: '145', html: 'success to delete'});
					}, undefined, undefined);
				} else {
					setTimeout(function() {
						micaCommon.splash.hide();
						
						that.retrieve();
						micaCommon.messageBox({type:'success', width:'400', height: '145', html: 'success to delete'});
					}, 200);
				}
			}}});			
		});
		
		// 엑셀 다운 버튼
		$(document).on('click', '#excelDownBtn', function() {
			var items = AUIGrid.getGridData(grid1);
			if(items == undefined || items.length < 1) {
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html:'empty data'});
				return;
			}
			
			if(flag == 'MENU') {
				if(grid8 != undefined) {
					AUIGrid.clearGridData(grid8);
					AUIGrid.destroy(grid8);
				} 
				
				grid8 = AUIGrid.create('#grid8', columnProperty2, {showRowNumColumn: false});
				AUIGrid.setGridData(grid8, items);	
				
				AUIGrid.exportToXlsx(grid8, {fileName : 'MOM_' + flag + '_' + items[0]['locale'] + '_' + get_current_date('yyyy-mm-dd')});
				
				AUIGrid.clearGridData(grid8);
			} else {
				if(grid9 != undefined) {
					AUIGrid.clearGridData(grid9);
					AUIGrid.destroy(grid9);
				} 
				
				grid9 = AUIGrid.create('#grid9', columnProperty1, {showRowNumColumn: false});
				AUIGrid.setGridData(grid9, items);	
				
				AUIGrid.exportToXlsx(grid9, {fileName : 'MOM_' + flag + '_' + items[0]['locale'] + '_' + get_current_date('yyyy-mm-dd')});
				
				AUIGrid.clearGridData(grid9);
			}
		});
		
		// 엑셀등록 팝업
		$(document).on('click', '#excelUpBtn', function() {
			$('#excelPop1').micaModal('show');
			$('#file').val('');
		});
		
		$(document).on('click', '#cancelBtnEX1, ' + '.bntpopclose', function() {
			$('#excelPop1').micaModal('hide');		
		});
		
		// 엑셀등록저장 버튼
		$(document).on('click', '#saveBtnEX1', function() {	
			var url;
			if(flag == 'MENU') {
				url = 'admin.micaMenu';
			} else {
				url = 'lang.widget';
			}
			
			micaCommon.splash.show();
			
			var param = [{}];
			if(flag != 'MENU') {
				param[0]['locale'] = $('#fromLocale').val();
				
				var selectedIndex = $('#fromLocale').jqxComboBox('selectedIndex');
                var item = $('#fromLocale').jqxComboBox('getItem', selectedIndex);
                param[0]['localeValue'] = item.label;
			}
			excel_upload(file, url, 'MOM_' + flag, grid1, JSON.stringify(param), function(result, data) {
				if(result != 'SUCCESS') {
					micaCommon.splash.hide();
					
					if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 2) {
						micaCommon.messageBox({type:'danger',  width:'400', height: '145', html:Language.getLang(data.p_err_msg)});
					} else {
						micaCommon.messageBox({type:'danger',  width:'400', height: '145', html:'fail to enroll'});
					}
					
					return;
				}
				
				that.retrieve('enroll');
			});
			
	 		$('#excelPop1').micaModal('hide');	
	 		micaCommon.splash.show();
		});
		
		//조회 시 키다운 이벤트(InputBox)
		tuCommon.addKeyDown($(document), $('#keyword'), $('#findBtn'));
		
		// Lang Batch 버튼
		$(document).on('click', '#batchBtn', function() {
			if(flag == 'MENU') {
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html:'Batch is only available in Lang!'});
				return;
			} else {
				url = 'lang.setLangBatchProcessing';
			}
			
			fromLocale = $("#fromLocale").val();
			toLocale = $("#toLocale").val();
			
			if(fromLocale == "" || fromLocale == undefined){
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html:'Please select From Lang.'});
				return;
			} 
			
			if(toLocale == "" || toLocale == undefined){
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html:'Please select To Lang.'});
				return;
			}
			
			micaCommon.messageBox({type:'info', width:'400', height:'145', html:'do you want to batch?', closeButton:{text:'Close'}, okButton:{text:'OK', after:function(){
				micaCommon.splash.show();
				
				var paramList = [];
				var param = {
						divisionCd : divisionCd,
						companyCd : companyCd,
						locale : fromLocale
				}
				paramList.push(param);
				
				// FromLang과 ToLang 다를 경우
				if(fromLocale != toLocale){
					param = {
							divisionCd : divisionCd,
							companyCd : companyCd,
							locale : toLocale
					}
					paramList.push(param);
				}
				
				if(paramList.length > 0) {
					mom_ajax('L', url, JSON.stringify(paramList), function(result, data, call_back_param, flag) {
						micaCommon.splash.hide();
						
						if(result != 'SUCCESS') {
							if(data['p_err_msg'] != undefined && data['p_err_msg'].length > 2) {
								micaCommon.messageBox({type:'danger',  width:'400', height: '145', html:Language.getLang(data.p_err_msg)});
							} else {
								micaCommon.messageBox({type:'danger',  width:'400', height: '145', html:'fail to batch'});
							}
							return;
						}
						
						that.retrieve();
						micaCommon.messageBox({type:'success', width:'400', height: '145', html: 'success to batch'});
					}, undefined, undefined);
				}
			}}});	
		});
	},
	
	comboBox: function() {
		var param = {'companyCd':companyCd, 'divisionCd':divisionCd, 'codeClassId' : 'LANGUAGE_CODE'};
		$.get(tuCommon.contextPath() + '/mom/request/com.thirautech.mom.common.comCode.dummy', param, function(data) {
			$('#fromLocale').jqxComboBox({dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
			var width = parseInt(document.getElementById('fromLocale').style.width.toString().replace('px','')) - 7;
			var height = parseInt(document.getElementById('fromLocale').style.height.toString().replace('px','')) + 1;
			$('#fromLocale').jqxComboBox({width : width + 'px', height : height + 'px'});
			
			$('#toLocale').jqxComboBox({dropDownHeight : 250, autoDropDownHeight: false, searchMode : 'containsignorecase', autoComplete : true, selectedIndex : 0});
			var width = parseInt(document.getElementById('toLocale').style.width.toString().replace('px','')) - 7;
			var height = parseInt(document.getElementById('toLocale').style.height.toString().replace('px','')) + 1;
			$('#toLocale').jqxComboBox({width : width + 'px', height : height + 'px'});
			
			var items = $('#fromLocale').jqxComboBox('source');
			for(var i = 0; i < data.length; i++) {
				items.push({ label: data[i]['name'], value: data[i]['code'] });
			}
			
			$('#fromLocale').jqxComboBox('source', items);
			$('#fromLocale').find('input').attr('readonly', false);
			$('#fromLocale').removeClass('w-select');
			$('#fromLocale').parent().find('#' + ($('#fromLocale').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
			$('#fromLocale').jqxComboBox({selectedIndex : 0});
			
			$('#toLocale').jqxComboBox('source', items);
			$('#toLocale').find('input').attr('readonly', false);
			$('#toLocale').removeClass('w-select');
			$('#toLocale').parent().find('#' + ($('#toLocale').attr('id')).replace('_jqxComboBox', '').replace(/_/g, '-'));
			$('#toLocale').jqxComboBox({selectedIndex : 0});
		});
	},
		
	retrieve: function(enroll) {
		var that = this;
		
		var param = {'companyCd':companyCd, 'divisionCd':divisionCd};
		
		if($.trim($('#fromLocale').val()) != '') {
			param['fromLocale'] = $.trim($('#fromLocale').val());
		} 
		
		if($.trim($('#toLocale').val()) != '') {
			param['toLocale'] = $.trim($('#toLocale').val());
		}
		
		if($.trim($('#keyword').val()) != '') {
			param['keyword'] = $.trim($('#keyword').val());
		}
		
		var url;
		if(flag == 'MENU') {
			url = '/mom/request/com.thirautech.mom.admin.micaMenu.dummy';
		} else {
			url = '/mom/request/com.thirautech.mom.lang.widget.dummy';
		}
		
		if(enroll == undefined || enroll != 'enroll') {
			micaCommon.splash.show();
		}
		
		$.get(tuCommon.contextPath() + url, param, function(data) {
			micaCommon.splash.hide();
			if(!data || data == undefined) {
				console.log('error');
				return;
			}	
			
			AUIGrid.setGridData(grid1, data);
			
			if(enroll != undefined || enroll == 'enroll') {
				micaCommon.messageBox({type:'success',  width:'400', height: '145', html:'success to enroll'});
			}
		});
	},
	
	fileInpuSet: function() {
		$('#excelPop1 .searcharea').css({'padding' : '5px 5px 0'});
		$('#excelPop1 .searcharea from').attr('id', 'fileUploadForm');
		$('#excelPop1 .searcharea form').html('<input name="file" id="file" type="file" accept=".xlsx, .xls" style="width:100%;">');
	},
	
	setLocaleParams: function(crudFlag){
		var checkedItems = AUIGrid.getCheckedRowItems(grid1);
		var htmlStr;
		
		if(crudFlag == "C"){
			htmlStr = 'check row to save';
		} else{
			htmlStr = 'check row to delete';
		}
		
		if(checkedItems.length < 1) {
			setTimeout(function() {
				micaCommon.messageBox({type:'warning', width:'400', height: '145', html: htmlStr});
			});
			
			return;
		}
		var saveItems = new Array();
		
		fromLocale = $("#fromLocale").val();
		toLocale = $("#toLocale").val();
		
		var selectedIndex = $('#fromLocale').jqxComboBox('selectedIndex');
        var item = $('#fromLocale').jqxComboBox('getItem', selectedIndex);
        fromLocaleValue = item.label;
        
        selectedIndex = $('#toLocale').jqxComboBox('selectedIndex');
        item = $('#toLocale').jqxComboBox('getItem', selectedIndex);
        toLocaleValue = item.label;

		for(var i = 0; i < checkedItems.length; i++) {
			if(crudFlag == "D"){
				if(checkedItems[i].item['NEW'] == 'Y') {
					continue;
				}
			}
			
			if(fromLocale == toLocale){
				saveItems.push(checkedItems[i].item);
			} else{
				// From Lang Setting
				var items = {
						companyCd: checkedItems[i].item.companyCd,
						divisionCd: checkedItems[i].item.divisionCd,
						locale: fromLocale,
						localeValue: fromLocaleValue,
						pageId: checkedItems[i].item.pageId,
						codeType: checkedItems[i].item.codeType,
						toLang: checkedItems[i].item.fromLang,
						description: checkedItems[i].item.description,
						userId: userId
				};
				saveItems.push(items);
				
				// To Lang Setting
				items = {
						companyCd: checkedItems[i].item.companyCd,
						divisionCd: checkedItems[i].item.divisionCd,
						locale: toLocale,
						localeValue: toLocaleValue,
						pageId: checkedItems[i].item.pageId,
						codeType: checkedItems[i].item.codeType,
						toLang: checkedItems[i].item.toLang,
						description: checkedItems[i].item.description,
						userId: userId
				};
				saveItems.push(items);
			} 
		}
		
		return saveItems;
	}
};

$(document).ready(function(event) {
	MOMXX001.init();
});
