var locale = sessionStorage.getItem("locale");
var divisionCd = sessionStorage.getItem("divisionCd");
var companyCd = sessionStorage.getItem("companyCd");
var empAuthority = sessionStorage.getItem("empAuthority");

var MOMJA092_1 = {
	initMessage		: undefined,
	initParam		: undefined,
	
	menuId	: undefined,
	codeId  : undefined,
	checkItems : [],
	
	init: function() {
		var that = this;
		var param = {empAuthority : empAuthority};
		
		Language.init(function() {
			momWidget.isInitGrid(0, function() {
				momWidget.isInitGrid(1, function() {
					momWidget.isInitGrid(2, function() {
						that.grid();
					})
				})
			});
			that.event();
		});
		
		
//		$(".w-clearfix.h100per").prepend('<div id="split-left"></div>');
//		$("#split-left").append($(".card.wcalc10.w400px, .card.wcalc750.h100p"));
//		momWidget.splitter("#split-left", "vertical", "35%");
//		momWidget.splitter(".w-clearfix.h100per", "vertical", "70%");
		
	}, retrieveCallInit: function(index, param, callBackParam, indexInfo) {
		index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : index;
		if(index == 0 && indexInfo['op'] == 'INIT1') {
			this.initParam = {empAuthority : empAuthority};
		} 
		
	}, retrieveCallBack: function(result, data, param, callBackParam, indexInfo) {
		var that = this;
		var index = (indexInfo != undefined	&& indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
		
		if(result != 'SUCCESS') {
			if(index == 1) {
				this.initParam = undefined;
			}         
			
			momWidget.splashHide();
			return;
		}
		
		AUIGrid.setGridData(momWidget.grid[index], data);
		
		if(indexInfo != undefined && indexInfo['op'] == 'CC1') {
			var menuList = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i].authFlag == 'Y') {
					menuList[i] = data[i].id;
				}
			}
			var data1 = momWidget.parentIdHierarchy(data, 'parentId', 'children');
			AUIGrid.setGroupBy(momWidget.grid[1],  ['name'], {
				excepts: ['name']
			});
			AUIGrid.setGridData(momWidget.grid[1], data1);
			AUIGrid.setCheckedRowsByValue(momWidget.grid[1], 'id', menuList);
			AUIGrid.setGridData(momWidget.grid[2], []); 
			that.codeId = param.codeId;
			
		}
		
		if(indexInfo != undefined && indexInfo['op'] == 'CC2' || indexInfo['op'] == 'saveBtnEP3') {
			var elementList = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i].elFlag == 'Y') {
					elementList[i] = data[i].elementId;
				}
			}
			AUIGrid.setCheckedRowsByValue(momWidget.grid[2], 'elementId', elementList);
		}
		
		if(index == 2) {
			this.initParam = {codeId : that.codeId};
		}

		
		momWidget.splashHide();
		
	}, cellClickCallBack: function(index, e) {
		if(index == 0) {
			var item = AUIGrid.getGridData(momWidget.grid[0])[e.rowIndex];
			this.codeId = item['codeId'];
		}
	}, saveCallInit : function(index, param, callBackParam, indexInfo) {
		/*var that = this;
   		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP3') {
   			var saveFlag;
   			mom_ajax('R', 'admin.momAuthElement', {elementId: data.elementId}, function(result, data) {
				if(result != 'SUCCESS') {
					return;
				} 
				if(data.length == 0) {
					saveFlag = 'Y';
				} else {
					saveFlag = 'N';
				}
				console.log(saveFlag);
			}, undefined, undefined, that, 'sync'); 
   		}*/
	}, saveCallBack: function(result, data, param, callBackParam, indexInfo) {
		if(indexInfo != undefined && indexInfo['op'] == 'saveBtnEP3') {
    		if(result == 'SUCCESS') {
	   			var index = (indexInfo != undefined && indexInfo['newIndex'] != undefined && indexInfo['newIndex'] != indexInfo['index']) ? indexInfo['newIndex'] : indexInfo['index'];
	   			momWidget.splashHide();
	   			momWidget.findBtnClicked(2, false, {elementId: data.elementId, codeId : data.codeId, id : data.menuId}, this.retrieveCallBack, indexInfo, this);
	   		} else {
	   			momWidget.splashHide();
	   		}
		}
	}, grid: function() {
		var that = this;
		
		AUIGrid.bind(momWidget.grid[1], "rowAllChkClick", function( e ) {
			var allData = AUIGrid.getGridData(momWidget.grid[1]);
			if(e.checked == true) {
				for(var i = 0; i < allData.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[1], i, "authFlag", "Y");
				}
			} else {
				for(var i = 0; i < allData.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[1], i, "authFlag", "N");
				}
			}		
		});
		AUIGrid.bind(momWidget.grid[1], "rowCheckClick", function( e ) {
			if(e.item.authFlag == "N") {
				AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "authFlag", "Y");
			} else {
				AUIGrid.setCellValue(momWidget.grid[1], e.rowIndex, "authFlag", "N");
			}
		});
		
		AUIGrid.bind(momWidget.grid[2], "rowAllChkClick", function( e ) {
			var allData = AUIGrid.getGridData(momWidget.grid[2]);
			if(e.checked == true) {
				for(var i = 0; i < allData.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[2], i, "elFlag", "Y");
				}
			} else {
				for(var i = 0; i < allData.length; i++) {
					AUIGrid.setCellValue(momWidget.grid[2], i, "elFlag", "N");
				}
			}		
		});
		AUIGrid.bind(momWidget.grid[2], "rowCheckClick", function( e ) {
			if(e.item.elFlag == "N") {
				AUIGrid.setCellValue(momWidget.grid[2], e.rowIndex, "elFlag", "Y");
			} else {
				AUIGrid.setCellValue(momWidget.grid[2], e.rowIndex, "elFlag", "N");
			}
		});	
		
			
	}, event: function() {
		var that = this;
		$(document).on("click", "#saveMBtn2", function() {
			var editedRowItems = AUIGrid.getEditedRowItems(momWidget.grid[1]);
			var createArray = [];
			var removeArray = [];
			var cntEdit = 1;
			var cntDel = 0;
			that.initParam = {codeId: that.codeId};
				momWidget.messageBox({type:"info", width:"400", heigth:"145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK",
					after:function(){
						for(var i = 0; i < editedRowItems.length; i++) {
							editedRowItems[i].codeId = that.codeId;
							if(editedRowItems[i].authFlag == "Y") {
								createArray.push(editedRowItems[i]);
							} else {
								removeArray.push(editedRowItems[i]);
								cntDel++;
							}
						}
						if(cntDel > 0) {
							mom_ajax("LD", "admin.momAuth", JSON.stringify(removeArray),  that.authCallback1);
						}
						if(createArray.length > 0) {
							mom_ajax("L", "admin.momAuth", JSON.stringify(createArray),  that.authCallback1);
						}
				}}});
			});
		
		$(document).on("click", "#saveMBtn3", function() {
//			var items = AUIGrid.getGridData(momWidget.grid[2]);
//			var checkItems2 = AUIGrid.getCheckedRowItems(momWidget.grid[2]);
			var editedRowItems = AUIGrid.getEditedRowItems(momWidget.grid[2]);
			var createArray = [];
			var removeArray = [];
			var cntEdit = 1;
			var cntDel = 0;
			that.initParam = {elementId: that.elementId};
				momWidget.messageBox({type:"info", width:"400", heigth:"145", html:Language.lang['MESSAGES11194'], closeButton:{text:"Close"}, okButton:{text:"OK",
					after:function(){
						for(var i = 0; i < editedRowItems.length; i++) {
							if(editedRowItems[i].elFlag == "Y") {
								editedRowItems[i].codeId = that.codeId;
								createArray.push(editedRowItems[i]);
							} else {
								removeArray.push(editedRowItems[i]);
								cntDel++;
							}
						}
						if(cntDel > 0) {
							mom_ajax("LD", "admin.momAuthElement", JSON.stringify(removeArray),  that.authCallback2);
						}
						if(createArray.length > 0) {
							mom_ajax("L", "admin.momAuthElement", JSON.stringify(createArray),  that.authCallback2);
						}
				}}});
			});

	}, authCallback1: function(result, data, param, callBackParam) {
		momWidget.findBtnClicked(1, false, {codeId: data['codeId']}, function(result, data) {
		if(result == 'SUCCESS') {
			momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
			momWidget.splashHide();
			
		} else {
			if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
			} else {
				momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				}
			}
		});
	}, authCallback2: function(result, data, param, callBackParam) {
		momWidget.findBtnClicked(2, false, {id: data['menuId']}, function(result, data) {
			if(result == 'SUCCESS') {
				momWidget.messageBox({type:'success', width:'400', height: '145', html: Language.lang['MESSAGES10692']});
				momWidget.splashHide();
				
			} else {
				if(data.p_err_msg != null && data.p_err_msg != undefined && data.p_err_msg != '') {
					momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.getLang(data.p_err_msg)});
				} else {
					momWidget.messageBox({type:"danger", width:"400", height: "145", html: Language.lang['MESSAGES10821']});
				}
			}
		});
	}
};

$(document).ready(function(event){
	momWidget.init(1, 'MOMJA092_1', MOMJA092_1);
	momWidget.init(2, 'MOMJA092_1', MOMJA092_1);
	momWidget.init(3, 'MOMJA092_1', MOMJA092_1);
	MOMJA092_1.init();
});