function getWidgetsBaseUrl() {
	var url = "/micaweb/mica/projects/" + sessionStorage.getItem('projectId') + "/widgets/";
	if (sessionStorage.getItem('useHost')) {
		//url = sessionStorage.getItem('host') + "/mica/datasets/";
	}
	return url;
}

function getList() {
	$.ajax({
//		url: "/micaweb/mica/projects/" + sessionStorage.getItem('projectId') + "/widgets",
		url: "/TU_Platform/mom/request/com.thirautech.mom.admin.micaWidgets.dummy",
		method: "get",
		success: function(result) {
			if(result.length > 0) {
				AUIGrid.setGridData("#widgetList", result);
				AUIGrid.setSorting("#widgetList", [{dataField : "widgetType", sortType: 1}, {dataField : "widgetName", sortType: 1}]);
				$("#widgetSearch").trigger("keyup");
			}
		}
	});
}

function deleteWidgets(widgetId) {
	if(!confirm("삭제하시겠습니까")) { return; }
	$.ajax({
		url: getWidgetsBaseUrl() + widgetId,
		method: 'delete',
		contentType: 'application/json; charset=UTF-8',
		success: function(data){
			console.log(data);
			if(data=="success") {
				AUIGrid.removeRow("#widgetList", "selectedIndex");
			} else {
				alert("삭제 실패");
			}
		},
		error: function(request, status, error){
			console.log(request, status, error);
			alert("삭제시 오류가 발생하였습니다.");
		}
	});
}
var divisionList = [];
var divisionKeyValue = {};
$.ajax({url: "/TU_Platform/mom/request/com.thirautech.mom.common.siteAll.dummy",
	method:"get",
	async: false,
	success: function(data) {
		divisionList = data;
		divisionKeyValue = micaCommon.fncS.keyValueSet({key:"divisionCd", data: divisionList});
	}
})

var transferResult = {ok : [], fail: []};
function transferUpdate(item, all) {
	var data = item;

	$.ajax({url:"/TU_Platform/mica/widgets/" + data.id,
		data: {
			divisionCd : data.divisionCd,
			companyCd : data.companyCd
		},
		method: "get",
		async: false,
		success: function(result) {
			data.setting = result.setting;
		}
	});
	var dataSetId = item.datasetId;
	callNum = 0;
	if(item.dc) { // 선택된 것만
		var divisionCompany = divisionKeyValue[item.dc];
		var param  = {
			divisionCd : divisionCompany.divisionCd,
			companyCd : divisionCompany.companyCd
		}
		var obj = {};
		obj.id = data.id;
		obj.name = data.name;
		obj.widgetType = data.widgetType;
		obj.dataset = {};
		obj.dataset.id = dataSetId;
		obj.description = data.description;
		obj.setting = data.setting;
		obj.divisionCd = param.divisionCd;
		obj.companyCd = param.companyCd;
		transferUpdateWidget(obj, param, all, 1);
	} else {
		for(var i = 0; i < divisionList.length; i++) { // 전체돌리기 
			var divisionCompany = divisionList[i];
			var param  = {
				divisionCd : divisionCompany.divisionCd,
				companyCd : divisionCompany.companyCd
			}
			var obj = {};
			obj.id = data.id;
			obj.name = data.name;
			obj.widgetType = data.widgetType;
			obj.dataset = {};
			obj.dataset.id = dataSetId;
			obj.description = data.description;
			obj.setting = data.setting;
			obj.divisionCd = param.divisionCd;
			obj.companyCd = param.companyCd;
			transferUpdateWidget(obj, param, all);
		}
	}
}

var callNum = 0;
function transferUpdateWidget (obj, param, all, divisionLength) {
//	var url = "/ECOPRO/mica/widgets/";
	var url = "/TU_Platform/mica/widgets/";
	var method = "post";
	divisionLength = divisionLength || divisionList.length;
	$.get("/TU_Platform/mica/widgets/" + obj.id, param, function(result) {
//	$.get("/ECOPRO/mica/widgets/" + obj.id, param, function(result) {
		if(result != "") {
			url += obj.id;
			method = "put";
		}
		$.ajax({
			url: url,
			method: method,
			data : JSON.stringify(obj),
			contentType: 'application/json; charset=UTF-8',
			success: function(rtn) {
				if(all) {
					if(rtn){
						callNum++;
						if(callNum == divisionLength) {
//							alert("위젯 디플로이 성공");
//							console.log(method + "성공");
							transferResult.ok.push("widgetID : " + obj.id + ", divsionCD : " + obj.divisionCd + ", method : " + method);
						}
					} else {
						transferResult.fail.push("widgetID : " + obj.id + ", divsionCD : " + obj.divisionCd + ", method : " + method);
					}
				} else {
					if(rtn){
						callNum++;
						if(callNum == divisionLength) {
							alert("위젯 디플로이 성공");
							console.log(method + "성공");
						}
					} else {
						alert("실패" + rtn);
					}
				}
			},
			error: function(e){
				if(all) {
					transferResult.fail.push("widgetID : " + obj.id + ", divsionCD : " + obj.divisionCd);
				} else {
					alert("실패" + e);
				}
			}
		});
	});
}

//var datasets = {}
$(document).ready(function(){
//	$.getJSON("/TU_Platform/mica/datasets", function(datas) {
//		for(var i = 0; i < datas.length; i++) {
//			var data = datas[i];
//			datasets[data.name] = data.id;
//		}
//		console.log(datasets);
//	});
	var columnLayout = [
	//	{dataField : "projectId", headerText : "PROJECT ID"},
		{dataField : "id", 	headerText : "WIDGET ID", style: "left-column"},
		{dataField : "name", 	headerText : "WIDGET NAME", style: "left-column"},
		{dataField : "widgetType", width: 100,	headerText : "TYPE"},
		{dataField : "description", headerText : "DESCRIPTION", style: "left-column"},
		{dataField : "datasetId", 	headerText : "DATASET ID", style: "left-column"},
//		{dataField : "delete", width: 95, 	headerText : "Delete", style: "left-column", renderer : {
//			type : "ButtonRenderer",
//			labelText : "Delete",
//			onclick : function(rowIndex, columnIndex, value, item) {
//				deleteWidgets(item.widgetId);
//			}
//		}}
		{dataField : "deploy", width: 98, 	headerText : "Deploy", style: "left-column", renderer : {
			type : "ButtonRenderer",
			labelText : "Deploy",
			onclick : function(rowIndex, columnIndex, value, item) {
				if(!confirm("TU_Platform에 업데이트 하시겠습니까?")) {
					return;
				}
				transferUpdate(item);
			}
		}},
		{dataField : "dc", width: 98, 	headerText : "divisionCd", style: "left-column",
			renderer : {
				type : "DropDownListRenderer",
				list : divisionList, //key-value Object 로 구성된 리스트
				keyField : "divisionCd", // key 에 해당되는 필드명
				valueField : "companyName" // value 에 해당되는 필드명
			}
		}
		/*
		*/
	];
	
	AUIGrid.create("#widgetList", columnLayout, {enableFilter : true,softRemoveRowMode: false, selectionMode: "singleCell", showSelectionBorder: true});
	$(window).resize(function() {
		AUIGrid.resize("#widgetList");
		debugger;
	});
	AUIGrid.bind("#widgetList", "cellDoubleClick", function(event) {
		
		var rowData = AUIGrid.getItemByRowIndex("#widgetList", event.rowIndex);
		var editorURL = ""; 
		if(rowData.widgetType == "auigrid"){
			editorURL = "/TU_Platform/Content/PopUp/AUIGridWidget";
		}
		else if(rowData.widgetType == "echart"){
			editorURL = "/micaweb/MICA/echart/popup";
			return;
		}
	    if(typeof new_window != "undefined"){
	    	if(new_window != null) {
		    	self.opener = self;
	         	new_window.close()
	         	new_window = null;
	    	}
        }
	    
	    var param = {
    		divisionCd : sessionStorage.divisionCd,
    		companyCd : sessionStorage.companyCd
	    }
	    $.get("/TU_Platform/mica/widgets/" + rowData.id, param, function (data){
	    	if(data != "") {
	    		window.open("about:blank","widgetEditor").close();
	    		new_window = window.open(editorURL, 'widgetEditor', 'width=1600 height=800 resizable=no'); 
	    		var windowParam ={
	    				"widgetId" : data.id,
	    				"widgetName" : data.name,
	    				"type" : data.widgetType,
	    				"datasetId" : data.datasetId,
	    				"projectId" : data.projectId,
	    				"description" : data.description,
	    				"options" : data.setting,
	    				"editMode" : "Edit"
	    		}
	    		new_window.windowParam = windowParam;
	    	}
	    });
	});
	
	AUIGrid.setGridData("#widgetList", []);
	
	$(window).resize(function () {
		AUIGrid.resize("#widgetList");
	});
	
	$("#btnAddGrid").click(function(event){
	    if(typeof new_window != "undefined"){
	    	self.opener = self;
         	new_window.close()
         	new_window = null;
        }
		new_window = window.open("/micaweb/MICA/AUIGrid", 'widgetEditor', 'width=1600 height=800 resizable=no');
	    var windowParam ={
        	"type" : "auigrid",
        	"datasetId" : "",
        	"widgetId" : "",
        	"projectId" : sessionStorage.getItem('projectId'),
        	"description" : "",
        	"editMode" : "Edit"
        }
	    new_window.windowParam = windowParam;
	});
	
	$("#btnAddChart").click(function(event){
	    if(typeof new_window != "undefined"){
	    	self.opener = self;
         	new_window.close()
         	new_window = null;
        }
	    
		new_window = window.open("/micaweb/MICA/echart/popup", 'widgetEditor', 'width=1600 height=800 resizable=no');
	    var windowParam ={
        	"type" : "echart",
        	"datasetId" : "",
        	"widgetId" : "",
        	"projectId" : sessionStorage.getItem('projectId'),
        	"description" : "",
        	"editMode" : "Create"
        }
	    new_window.windowParam = windowParam;
	});
	
	$("#widgetCategory").on("change", function() {
		$("#widgetSearch").trigger("keyup");
	});
	$("#widgetSearch").on("keyup", function() {
		var widgetCategory = $("#widgetCategory").val();
		var search = $(this).val();
		search = search.toLocaleLowerCase();
		AUIGrid.clearFilterAll("#widgetList");
		if(search == "") { return; }
		AUIGrid.setFilter("#widgetList", widgetCategory,  function(dataField, value, item) {
			if(value==null) { return false; }
			return value.toLocaleLowerCase().indexOf(search) > -1;
		});
	});
	
	$("#btnCopy").click(function(event){
		alert("준비중입니다.");
	});
	
	$("#btnTransfer").click(function() {
//		alert("준비중입니다.");
//		return;
		
		var items = AUIGrid.getGridData("#widgetList");
		transferResult = {ok : [], fail: []};
		var ii = setInterval(function() {
			if(items.length < 1){
				clearInterval(ii);
				alert("성공 : " + transferResult.ok.length + "\n실패 : " + transferResult.fail.length);
				console.log(transferResult);
			}
//			var data = datas[i];
			var item = items.pop();
			transferUpdate(item, true);
			
		}, 1000);
	});
	
	getList();
});