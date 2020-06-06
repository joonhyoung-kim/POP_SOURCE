var userId = sessionStorage.getItem("userId");
var resourceCd = "";
var resources = [];

var MOMIA005 = {
	init : function() {
		var that = this;			
		that.event();
		Language.init(function() {
			mCommon.init("resourceGroupGrid", "W201909260942597351000Jv22WXkfkAa", null, function() {
				that.grid("resourceGroupGrid");
				mCommon.gridPopCreat("resourceGroupGrid", {colCount : 1, title : Language.lang['MESSAGES12135']});
				that.comboBox();
				// 라벨 색상 변경
				$("#resourceGroupCdLabel, #resourceGroupNameLabel, #useYnLabel").find(".circle").addClass("bg-orange");
				$("#resourceGroupCdLabel, #resourceGroupNameLabel, #useYnLabel").find(".textblock").addClass("orange");
			}, Language);
			mCommon.init("resourceGrid", "W20190926094538024100187jTkvWLJE3", null, function() {
				that.grid("resourceGrid");
				mCommon.gridPopCreat("resourceGrid", {colCount: 3, title : Language.lang['MESSAGES12136']});
				that.comboBox();
				$("#resourceGroupCdLabel, #resourceCdLabel, #resourceNameLabel, #locationCdLabel, #goodLocationCdLabel").find(".circle").addClass("bg-orange");
				$("#resourceGroupCdLabel, #resourceCdLabel, #resourceNameLabel, #locationCdLabel, #goodLocationCdLabel").find(".textblock").addClass("orange");
			}, Language);
			mCommon.init("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", null, function() {
				that.grid("equipmentGrid");
				mCommon.gridPopCreat("equipmentGrid", {colCount : 1, title : Language.lang['MESSAGES12137']});
				that.comboBox();
				// 라벨 색상 변경
				$("#equipmentCdLabel, #equipmentNameLabel, #useYnLabel, #resourceCd").find(".circle").addClass("bg-orange");
				$("#equipmentCdLabel, #equipmentNameLabel, #useYnLabel, #resourceCd").find(".textblock").addClass("orange");
			}, Language);
		});
		
		$("#menuContent").prepend('<div id="split-left"></div>');
		$("#split-left").append($(".card.w25p.h100p.paddingr10"));
		mCommon.splitter("#split-left", "vertical", "25.5%");
		mCommon.splitter("#menuContent", "vertical", "74.5%");
	},
	grid : function(grid) { 
		// 그리드내의 Edit 버튼 컬럼 및 로우를 생성해주는 function 이다.
		tuCommon.editColumnSet(grid);
		var resourceGroupCd;
		
		//작업장군 그리드 세팅
		if(grid == "resourceGroupGrid") {
			AUIGrid.bind(grid, "rowCheckClick", function(e) {
				// 선택된 작업장군을 조건으로 작업장 그리드 리스트 가져온 후 작업장 기준의 설비 리스트를 가져온다. 
				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
				mCommon.render("resourceGrid", "W20190926094538024100187jTkvWLJE3", {resourceGroupCd : e.item.resourceGroupCd}, function() {
					AUIGrid.setSelectionByIndex("resourceGrid", 0);
					var resourceItems = AUIGrid.getSelectedItems("resourceGrid");
					if(resourceItems.length > 0) {
						mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : resourceItems[0].item.resourceCd}, function() {});
					} else {
						AUIGrid.clearGridData("equipmentGrid");
					}
				});
			});
			
			// 작업장군 그리드 클릭 이벤트 설정			
			AUIGrid.bind(grid, "cellClick", function(e) {
				var rowId = e.item[AUIGrid.getProp(e.pid, "rowIdField")];
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}				
				// 선택된 작업장군을 조건으로 작업장 그리드 리스트 가져온 후 작업장 기준의 설비 리스트를 가져온다. 
				mCommon.render("resourceGrid", "W20190926094538024100187jTkvWLJE3", {resourceGroupCd : e.item.resourceGroupCd}, function() {
					AUIGrid.setSelectionByIndex("resourceGrid", 0);
					var resourceItems = AUIGrid.getSelectedItems("resourceGrid");
					if(resourceItems.length > 0) {
						mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : resourceItems[0].item.resourceCd}, function() {});
					} else {
						AUIGrid.clearGridData("equipmentGrid");
					}
				});
			});
			
			//작업장군 그리드 조회
			mCommon.render(grid, "W201909260942597351000Jv22WXkfkAa", {}, function() {
				AUIGrid.setSelectionByIndex(grid, 0);
				var items = AUIGrid.getSelectedItems(grid); 
				if(items.length > 0) {
					resourceGroupCd = items[0].item.resourceGroupCd;
					mCommon.render("resourceGrid", "W20190926094538024100187jTkvWLJE3", {resourceGroupCd : items[0].item.resourceGroupCd}, function() {
						AUIGrid.setSelectionByIndex("resourceGrid", 0);
						var resourceItems = AUIGrid.getSelectedItems("resourceGrid");
						if(resourceItems.length > 0) {
							mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : resourceItems[0].item.resourceCd}, function() {});
						}
					});
				}
			});
		} 
		//작업장 그리드 세팅
		else if(grid == "resourceGrid") {
			AUIGrid.bind(grid, "rowCheckClick", function(e) {
				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
				mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : e.item.resourceCd}, function() {});
			});

			// 작업장 그리드 클릭 이벤트 설정			
			AUIGrid.bind(grid, "cellClick", function(e) {
				var rowId = e.item[AUIGrid.getProp(e.pid, "rowIdField")];
				
				if(AUIGrid.isCheckedRowById(e.pid, rowId)) {
					AUIGrid.addUncheckedRowsByIds(e.pid, rowId);
				} else {
					AUIGrid.addCheckedRowsByIds(e.pid, rowId);
				}				
				// 선택된 설비군명을 조건으로 우측 설비 그리드 리스트 가져온다. 
				mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : e.item.resourceCd}, function() {});
			});
		
		// 설비 그리드 세팅
		} else if(grid == "equipmentGrid") {
			AUIGrid.bind(grid, "rowCheckClick", function(e) {
				AUIGrid.setSelectionByIndex(e.pid, e.rowIndex);
			});
			
			tuCommon.cellClick(grid);
		}
	}, event : function() {
		var that = this; // MOMIA005 내부 변수 사용을 위해서 선언.
		
		// 작업장군 생성 모달 열기 버튼
		$(document).on("click", "#mCreateBtn", function() {
			mCommon.gridPopAdd("resourceGroupGrid");
			that.setResourceGroupPop();
			// 생성이기 때문에 작업장군코드가 입력가능하게 바꾼다.
			$("#resourceGroupGridModalPop #resourceGroupCdModal").attr("readonly", null);
			$("#useYnModal").jqxComboBox({disabled : false});
			// 작업장군 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. C는 생성.
			$("#resourceGroupGridModalPopSaveBtn").attr("type", "C");
			$(".labelbox").css({"width" : "90px"});
		});
		
		// 작업장군 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".resourceGroupGridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("resourceGroupGrid", rowIndex);
			mCommon.gridPopAdd("resourceGroupGrid");
			// 작업장군 팝업의 값들을 세팅해준다.
			that.setResourceGroupPop(item);
			// 작업장군 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. U는 수정.
			$("#resourceGroupGridModalPopSaveBtn").attr("type", "U");
			
			// 수정이기 때문에 작업장군코드가 입력불가능하게 바꾼다.
			$("#resourceGroupGridModalPop #resourceGroupCdModal").attr("readonly", "readonly");
		});
		
		// 작업장군 복사 모달 열기 버튼
		$(document).on("click", "#mCopyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("resourceGroupGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopAdd("resourceGroupGrid");
			
			// 작업장군 팝업의 값들을 세팅해준다.
			that.setResourceGroupPop(selectItems[0].item);
			
			$("#resourceGroupGridModalPopSaveBtn").attr("type", "C");

			// 복사이고 생성하기 때문에 작업장군코드가 입력가능하게 바꾼다.
			$("#resourceGroupGridModalPop #useYnModal").jqxComboBox({disabled : false});
			$("#resourceGroupGridModalPop #resourceGroupCdModal").attr("readonly", null);
		});
		
		// 작업장군 모달 저장 버튼
		$(document).on("click", "#resourceGroupGridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if($("#resourceGroupGridModalPop #resourceGroupCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12141']});
				return;
			}
			
			if($("#resourceGroupNameModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12142']});
				return;
			}
			
			if($("#resourceGroupGridModalPop #useYnModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10565']});
				return;
			}	
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after : function(){
					// 버튼 type 세팅
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getResourceGroupPop();
					// 작업장군 등록
					that.cudResourceGroup(type, param);
					$("#resourceGroupGridModalPop").micaModal("hide");
				}
			}});
			
		});
		
		// 작업장군 삭제 버튼
		$(document).on("click", "#mDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("resourceGroupGrid");
			var chkFlag = false;
			var arrayList = [];
			resources = "";
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES12145'], closeButton : {text : "Close"}, okButton : {text : "OK", 
					after : function() {
						var param;
						for(var i = 0; i < selectItems.length; i++) {
							// selectItems는 배열로 오니 0번째만 param 변수로 넣어준다.
							param = { resourceGroupCd : selectItems[i].item.resourceGroupCd }
							arrayList.push(param);
							
							// 작업장군에 해당하는 작업장 조회
							$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.workPlace.workPlaceCd.dummy", // 호출 URL
								{ resourceGroupCd : selectItems[i].item.resourceGroupCd }, // 파라미터
								function(data) {
									for(var i=0; i<data.length; i++) {
										if(i+1 < data.length) {
											resources += "'" + data[i].resourceCd + "',";
										} else {
											resources += "'" + data[i].resourceCd + "'";
										}
									}
								}
							);
						}
						mom_ajax("LD", "reference.resource.facility.facility_group", JSON.stringify(arrayList), that.callbackPost, "delResourceGroup");
					}
				}});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		
		// 작업장 등록 팝업 열기
		$(document).on("click", "#dCreateBtn", function() {
			var selectItems = AUIGrid.getSelectedItems("resourceGroupGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1) { 
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10683']});
				return; 
			}
			
			mCommon.gridPopAdd("resourceGrid");
			// 작업장은 작업장군이 무조건 선택돼 있어야한다. 그래서 선택된 작업장군을 넘겨준다. 그리드 클릭 이벤트에서 설정된 값이다.
			that.setResourcePop({resourceGroupCd : selectItems[0].item.resourceGroupCd});
			
			$("#resourceGridModalPopSaveBtn").attr("type", "C");
			
			// 생성이기 때문에 작업장코드가 입력가능하게 바꾼다.
			$("#resourceGridModalPop #resourceCdModal").attr("readonly", null);
			$("#resourceGridModalPop #resourceGroupCdModal").attr("readonly", "readonly");
		});
		
		// 작업장 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".resourceGridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("resourceGrid", rowIndex);
			mCommon.gridPopAdd("resourceGrid");
			// 작업장 팝업의 값들을 세팅해준다.
			that.setResourcePop(item);
			
			$("#resourceGridModalPopSaveBtn").attr("type", "U");
		
			// 수정이기 때문에 작업장군코드가 입력불가능하게 바꾼다.
			$("#resourceGridModalPop #resourceGroupCdModal, #resourceCdModal").attr("readonly", "readonly");
		});
		
		// 작업장 복사 팝업 열기
		$(document).on("click", "#dCopyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("resourceGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopAdd("resourceGrid");
			
			$("#resourceGridModalPopSaveBtn").attr("type", "C");
			
			// 작업장군 팝업의 값들을 세팅해준다.
			that.setResourcePop(selectItems[0].item);
			
			$("#resourceGridModalPop #resourceGroupCdModal").attr("readonly", "readonly");
			$("#resourceGridModalPop #resourceCdModal").attr("readonly", null);
		});

		// 작업장 저장 버튼
		$(document).on("click", "#resourceGridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if($("#resourceGridModalPop #resourceGroupCdModal").val() == ''){
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12141']});
				return;
			}
			
			if($("#resourceGridModalPop #resourceCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12143']});
				return;
			}
			
			if($("#resourceNameModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES12144']});
				return;
			}
			
			if($("#locationCdModal").val() == '') {
				micaCommon.messageBox({type:"warning", width:"400", height: "145", html : Language.lang['MESSAGES10712']});
				return;
			}
			
			if($("#goodLocationCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10838']});
				return;
			}
			
			if($("#resourceGridModalPop #useYnModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10565']});
				return;
			}	
			
			if(AUIGrid.getSelectedItems("resourceGroupGrid")[0].item.useYn == 'N' && $("#resourceGridModalPop #useYnModal").val() == 'Y') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10427']});
				return;
			}
			
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after : function() {
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getResourcePop();
					
					that.cudResource(type, param);
					
					mCommon.render("resourceGrid", "W20190926094538024100187jTkvWLJE3", param, function() {});
					$("#resourceGridModalPop").micaModal("hide");
				}
			}});
			
		});
		
		// 작업장 삭제
		$(document).on("click", "#dDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getCheckedRowItems("resourceGrid");
			var chkFlag = false;
			var arrayList = [];
			if(selectItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES12146'], closeButton : {text : "Close"}, okButton : {text : "OK", 
					after : function() {
						for(var i = 0; i < selectItems.length; i++) {
							arrayList.push(selectItems[i].item);
						}
						mom_ajax("LD", "reference.resource.facility.facility", JSON.stringify(arrayList), that.callbackPost, "resourceDel");
					}
				}
				});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		// 작업장 엑셀 다운로드
		$(document).on("click", "#excelDownBtn", function() {
			// AUIGrid 내의 기능으로 엑셀 다운로드 가능하다.
			// 두번째 파라미터로 엑셀 파일명을 설정이 가능하다.
			mCommon.auiGridExcelExport("resourceGrid", {fileName : "RESOURCE_MOMIA005_" + get_current_date("yyyy-mm-dd")});
			
		});
		
		// 작업장 설비 등록 팝업
		$(document).on("click", "#ddCreateBtn", function() {
			var selectItems = AUIGrid.getSelectedItems("resourceGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1) { 
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10683']});
				return; 
			}
			
			mCommon.gridPopAdd("equipmentGrid");
			// 설비는 설비군이 무조건 선택돼 있어야한다. 그래서 선택된 설비군을 넘겨준다. 그리드 클릭 이벤트에서 설정된 값이다.
			that.setEquipmentPop({resourceCd : selectItems[0].item.resourceCd});
			
			$("#equipmentGridModalPopSaveBtn").attr("type", "C");
			
			// 생성이기 때문에 설비코드가 입력가능하게 바꾼다.
			$("#equipmentCdModal").attr("readonly", null);
		});
		
		// 작업장 설비 모달 저장 버튼
		$(document).on("click", "#equipmentGridModalPopSaveBtn", function() {
			var type = $(this).attr("type");
			if($("#equipmentCdModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10690']});
				return;
			}
			
			if($("#equipmentNameModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10687']});
				return;
			}
			
			if($("#equipmentGridModalPop #useYnModal").val() == '') {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10565']});
				return;
			}	
			micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES11194'], closeButton : {text : "Close"}, okButton : {text : "OK", 
				after : function(){
					//버튼 type 세팅
					// 모달창의 데이터값들을 세팅해서 가져온다.
					var param = that.getEquipmentPop();
					//설비군 등록
					that.cudEquipment(type, param);
					$("#equipmentGridModalPop").micaModal("hide");
				}
			}});
			
		});
		
		// 작업장 설비 수정 모달 열기 버튼
		// ID는 하나의 이벤트만 가능하지만 클래스는 같은 클래스라면 이벤트가 선언가능하다.
		// 위에서 컬럼 Edit 클래스를 가지고 이벤트를 선언했다. GridID + "EditBtn"
		$(document).on("click", ".equipmentGridEditBtn", function() {
			// Edit html를 만들때 선언해주었던 버튼의 attribute row-index를 가져온다.
			var rowIndex = $(this).attr("row-index");
			// rowIndex를 활용하여 선택된 Row Item을 가져온다.
			var item = AUIGrid.getItemByRowIndex("equipmentGrid", rowIndex);
			mCommon.gridPopAdd("equipmentGrid");
			// 작업장 설비 팝업의 값들을 세팅해준다.
			that.setEquipmentPop(item);
			// 작업장 설비 팝업 저장버튼에 attribute에 type이라는 속성을 주었다. U는 수정.
			$("#equipmentGridModalPopSaveBtn").attr("type", "U");
			
			// 수정이기 때문에 작업장 설비 코드가 입력 불가능하게 바꾼다.
			$("#equipmentGridModalPop #equipmentCdModal").attr("readonly", "readonly");
		});
		
		// 작업장 설비 복사 모달 열기 버튼
		$(document).on("click", "#ddCopyBtn", function() {
			// 그리드에서 선택된 RowItem을 가져온다. // 배열값으로 나온다.
			var selectItems = AUIGrid.getCheckedRowItems("equipmentGrid");
			// 선택된 값이 0개라면 이벤트 실행취소.
			if(selectItems.length < 1 || selectItems.length > 1) {
				var message = "";
				if(selectItems.length > 1) message = Language.lang['MESSAGES11603'];
				else message = Language.lang['MESSAGES10491'];
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : message});
				return; 
			}
			mCommon.gridPopAdd("equipmentGrid");
			
			// 설비군 팝업의 값들을 세팅해준다.
			that.setEquipmentPop(selectItems[0].item);
			
			$("#equipmentGridModalPopSaveBtn").attr("type", "C");

			// 복사이고 생성하기 때문에 설비군코드가 입력가능하게 바꾼다.
			$("#equipmentGridModalPop #useYnModal").jqxComboBox({disabled : false});
		});
		
		// 작업장 설비 삭제
		$(document).on("click", "#ddDelBtn", function() {
			// 선택된 데이터 가져오기
			var selectItems = AUIGrid.getSelectedItems("resourceGrid");
			var checkedItems = AUIGrid.getCheckedRowItems("equipmentGrid");
			var chkFlag = false;
			var arrayList = [];
			if(checkedItems.length > 0) {
				// confirm 함수로 Y/N 물어봄
				micaCommon.messageBox({type : "info", width : "400", height : "145", html : Language.lang['MESSAGES10652'], closeButton : {text : "Close"}, okButton : {text : "OK", 
						after : function() {
							var resourceCd = "";
							for(var i = 0; i < checkedItems.length; i++) {
								var params = {
									resourceCd : selectItems[0].item.resourceCd,
									equipmentCd : checkedItems[i].item.equipmentCd
								}
								
								if (i == selectItems.length-1) {
									chkFlag = true;
								}
								arrayList.push(params);
							}
							mom_ajax("LD", "reference.resource.workPlace.equipment", JSON.stringify(arrayList), that.callbackPost, "equipment", chkFlag);
						}
					}
				});
			} else {
				micaCommon.messageBox({type : "warning", width : "400", height : "145", html : Language.lang['MESSAGES10585']});
				return;
			}
		});
		
		// 작업장 설비 엑셀 다운로드
		$(document).on("click", "#ddExcelDownBtn", function() {
			// AUIGrid 내의 기능으로 엑셀 다운로드 가능하다.
			// 두번째 파라미터로 엑셀 파일명을 설정이 가능하다.
			mCommon.auiGridExcelExport("equipmentGrid", {fileName : "EQUIPMENT_MOMIA005_" + get_current_date("yyyy-mm-dd")});
			
		});
	},
	comboBox : function() {
		var comboOptions = {searchMode : 'containsignorecase', autoComplete : true};
		var options = {local : "", textName : "name", valueName : "code", selectedIndex : 0, readonly : false};
	
		
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{ codeClassId : "USE_FLAG"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#resourceGroupGridModalPop #useYnModal",comboOptions, options);
					micaCommon.comboBox.set("#resourceGridModalPop #useYnModal",comboOptions, options);
					micaCommon.comboBox.set("#equipmentGridModalPop #useYnModal",comboOptions, options);
				}
		);
		
		//외주여부
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.common.comCode.dummy", // 호출 URL
				{ codeClassId : "N_Y"}, // 파라미터
				function(data) {
					options.local = data;
					micaCommon.comboBox.set("#outsourcingFlagModal",comboOptions, options);
				}
		);
		
		// 소진창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.facility.facility_group_category.dummy", // 호출 URL
			{facilityClassCd : "AREA"}, // 파라미터
			function(data) {		
				micaCommon.comboBox.set("#locationCdModal", {searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '250px'}, {local : data, textName : "facilityName", valueName : "facilityCd", readonly : false});
			}
		);
		
		// 양품창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.facility.facility_group_category.dummy", // 호출 URL
			{facilityClassCd : "AREA"}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#goodLocationCdModal", {searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '250px'}, {local : data, textName : "facilityName", valueName : "facilityCd", readonly : false});
			}
		);
		
		// 불량창고
		$.get(tuCommon.contextPath() + "/mom/request/com.thirautech.mom.reference.resource.facility.facility_group_category.dummy", // 호출 URL
			{facilityClassCd : "AREA"}, // 파라미터
			function(data) {
				// 받아온 데이터를 local에 넣고 textName 키값, valueName 키값을 설정해준다.
				// 콤보박스가 생성된다.
				micaCommon.comboBox.set("#badLocationCdModal", {searchMode:'containsignorecase', autoComplete:true, dropDownWidth : '250px'}, {local : data, textName : "facilityName", valueName : "facilityCd", readonly : false});
			}
		);
	},
	setResourceGroupPop : function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		// 설비군 코드 값을 설정해준다. null이면 빈값으로 초기화.
		$("#resourceGroupGridModalPop #resourceGroupCdModal").val(data.resourceGroupCd || "");
		// 설비군명 값을 설정해준다.
		$("#resourceGroupNameModal").val(data.resourceGroupName || "");
		// 사용여부 값을 설정해준다. null이면 Y로 초기화
		$("#resourceGroupGridModalPop #useYnModal").val(data.useYn || "Y");
		// 수정자 값을 설정해준다.
		$("#resourceGroupGridModalPop #updateByModal").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#resourceGroupGridModalPop #updateDateModal").val(data.updateDate ||get_current_date());
		// 설비설명 값을 설정해준다.
		$("#resourceGroupGridModalPop #descriptionModal").val(data.description || "");
		
		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#resourceGroupGridModalPop #updateByModal, #resourceGroupGridModalPop #updateDateModal").attr("readonly","readonly");
	},
	getResourceGroupPop : function() {
		// 설비군 팝업의 데이터를 모아서 준다.
		var result = {
			resourceGroupCd : $("#resourceGroupGridModalPop #resourceGroupCdModal").val(),
			resourceGroupName : $("#resourceGroupNameModal").val(),
			useYn : $("#resourceGroupGridModalPop #useYnModal").val(),
			updateBy : $("#resourceGroupGridModalPop #updateByModal").val(),
			updateDate : $("#resourceGroupGridModalPop #updateDateModal").val(),
			description :$("#resourceGroupGridModalPop #descriptionModal").val()
		}
		return result;
	},
	setResourcePop : function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		// 설비군 코드 값을 설정해준다. null이면 빈값으로 초기화.
		$("#resourceGridModalPop #resourceGroupCdModal").val(data.resourceGroupCd || "");
		// 설비코드 값을 설정해준다.
		$("#resourceGridModalPop #resourceCdModal").val(data.resourceCd || "");
		// 설비명 값을 설정해준다.
		$("#resourceNameModal").val(data.resourceName || "");
		// 소진창고 값을 설정해준다.
		$("#locationCdModal").val(data.locationCd || "");
		// 양품창고 값을 설정해준다.
		$("#goodLocationCdModal").val(data.goodLocationCd || "");
		// 불량창고 값을 설정해준다.
		$("#badLocationCdModal").val(data.badLocationCd || "");
		// 사용여부 값을 설정해준다. null이면 Y로 초기화.
		$("#resourceGridModalPop #useYnModal").val(data.useYn || "Y");
		// 외주여부 값을 설정해준다. null이면 Y로 초기화.
		$("#outsourcingFlagModal").val(data.outsourcingFlag || "N");
		// MES설비 값을 설정해준다.
		$("#mesLineCdModal").val(data.mesLineCd || "");
		// 수정자 값을 설정해준다.
		$("#resourceGridModalPop #updateByModal").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#resourceGridModalPop #updateDateModal").val(data.updateDate || get_current_date());
		// 특이사항 값을 설정해준다.
		$("#unusualDataModal").val(data.unusualData || "");
		// 비고 값을 설정해준다.
		$("#resourceGridModalPop #descriptionModal").val(data.description || "");
		
		// 설비군코드, 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#resourceGridModalPop #updateByModal, #resourceGridModalPop #updateDateModal").attr("readonly","readonly");
		
	},
	getResourcePop : function() {
		// 설비 팝업의 데이터를 모아서 준다.
		var result = {
			resourceGroupCd : $("#resourceGridModalPop #resourceGroupCdModal").val(),
			resourceCd : $("#resourceGridModalPop #resourceCdModal").val(),
			resourceName : $("#resourceNameModal").val(),
			locationCd : $("#locationCdModal").val(),
			goodLocationCd : $("#goodLocationCdModal").val(),
			badLocationCd : $("#badLocationCdModal").val(),
			useYn : $("#resourceGridModalPop #useYnModal").val(),
			outsourcingFlag : $("#outsourcingFlagModal").val(),
			mesLineCd : $("#mesLineCdModal").val(),
			updateBy : $("#resourceGridModalPop #updateByModal").val(),
			updateDate : $("#resourceGridModalPop #updateDateModal").val(),
			unusualData : $("#unusualDataModal").val(),
			description : $("#resourceGridModalPop #descriptionModal").val()
		}
		return result;
	},
	setEquipmentPop : function(data) { // data가 비었으면 초기화.
		// data값이 null일시 오브젝트{} 선언을 해준다.
		data = data || {};
		// 작업장 코드, 참조값
		$("#equipmentGridModalPop #resourceCdModal").val(data.resourceCd || "");
		// 설비 코드 값을 설정해준다. null이면 빈값으로 초기화.
		$("#equipmentCdModal").val(data.equipmentCd || "");
		// 설비명 값을 설정해준다.
		$("#equipmentNameModal").val(data.equipmentName || "");
		// 사용여부 값을 설정해준다. null이면 Y로 초기화
		$("#equipmentGridModalPop #useYnModal").val(data.useYn || "Y");
		// 수정자 값을 설정해준다.
		$("#equipmentGridModalPop #updateByModal").val(data.updateBy || userId);
		// 수정시간 값을 설정해준다.
		$("#equipmentGridModalPop #updateDateModal").val(data.updateDate ||get_current_date());
		
		// 수정자, 수정시간은 사용자가 수정을 못하기에 읽기전용으로 선언해준다.
		$("#equipmentGridModalPop #updateByModal, #equipmentGridModalPop #updateDateModal, #resourceCdModal").attr("readonly","readonly");
	},
	getEquipmentPop : function() {
		// 설비군 팝업의 데이터를 모아서 준다.
		var result = {
			equipmentCd : $("#equipmentCdModal").val(),
			equipmentName : $("#equipmentNameModal").val(),
			useYn : $("#equipmentGridModalPop #useYnModal").val(),
			updateBy : $("#equipmentGridModalPop #updateByModal").val(),
			updateDate : $("#equipmentGridModalPop #updateDateModal").val()
		}
		return result;
	},
	cudEquipment : function (type, data) {
		var that = this;
		//설비군 CUD
		var param = data;
		var gridType = "equipment";
		var resourceGrid = AUIGrid.getSelectedItems("resourceGrid");
		param.resourceCd = resourceGrid[0].item.resourceCd;
		mom_ajax(type, "reference.resource.workPlace.equipment", JSON.stringify(param), that.callbackPost, gridType);
	},
	cudResourceGroup : function (type, data) {
		var that = this;
		//설비군 CUD
		var param = data;
		if(type == "U" && $("#resourceGroupGridModalPop #useYnModal").val() == 'N') {
			var updateParam = {
					resourceGroupCd : param.resourceGroupCd,
					resourceGroupName : param.resourceGroupName,
					description : param.description,
					useYn : $("#resourceGroupGridModalPop #useYnModal").val()
			}
			mom_ajax(type, "reference.resource.facility.facility_group", JSON.stringify(updateParam), function() {});
		}
		mom_ajax(type, "reference.resource.facility.facility_group", JSON.stringify(param), that.callbackPost, "resourceGroup");
	},
	cudResource : function (type, data) {
		var that = this;
		// 설비 CUD 해주는 곳이다.
		var param = data;
		// process 호출하여 type을 넘겨주면 데이터가 생성.
		mom_ajax(type, "reference.resource.facility.facility", JSON.stringify(param), that.callbackPost, "workPlace");
	},
	callbackPost : function(result, data, param, callbackParam) {
		var that = this.MOMIA005;
		if(result == 'SUCCESS') {
			if(callbackParam == "delResourceGroup") {
				var selectItems = AUIGrid.getCheckedRowItems("resourceGroupGrid");
				var arrayList = [];
				
				for(var i = 0; i < selectItems.length; i++) {
					var param = {resourceGroupCd : selectItems[i].item.resourceGroupCd};
					arrayList.push(param);
				}
				
				mom_ajax("LD", "reference.resource.facility.facility", JSON.stringify(arrayList), that.callbackPost, "resource");
				
			} else if(callbackParam == "resourceDel") {
				var selectItems = AUIGrid.getCheckedRowItems("resourceGrid");
				var arrayList = [];
				for(var i = 0; i < selectItems.length; i++) {
					var param = {resourceCd : selectItems[i].item.resourceCd};
					arrayList.push(param);
				}
				
				mom_ajax("LD", "reference.resource.workPlace.equipment", JSON.stringify(arrayList), that.callbackPost, "workPlace");
				
			} else if(callbackParam == "equipment") {
				mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : data.resourceCd}, function() {
					micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});
					$("#resourceGroupGridModalPop").micaModal("hide");
				});
				
			} else if(callbackParam == "resource") {
				var param = {resourceCd : resources};
				mom_ajax("D", "reference.resource.workPlace.equipmentByResources", JSON.stringify(param), that.callbackPost, "workPlace");
				
			} else {
				mCommon.render("resourceGroupGrid", "W201909260942597351000Jv22WXkfkAa", null, function() {							
					var resourceGroupCd = data.resourceGroupCd;
					if(resourceGroupCd != undefined) {
						var row = AUIGrid.getRowIndexesByValue("resourceGroupGrid", "resourceGroupCd", resourceGroupCd.toUpperCase());
						AUIGrid.setSelectionByIndex("resourceGroupGrid", row[0]);
					} else {
						AUIGrid.setSelectionByIndex("resourceGroupGrid", 0);
					}
					
					var items = AUIGrid.getSelectedItems("resourceGroupGrid"); 
					if(items.length > 0) {
						mCommon.render("resourceGrid", "W20190926094538024100187jTkvWLJE3", {resourceGroupCd : items[0].item.resourceGroupCd}, function(){
							AUIGrid.setSelectionByIndex("resourceGrid", 0);
							var resourceItems = AUIGrid.getSelectedItems("resourceGrid");
							if(resourceItems.length > 0) {
								mCommon.render("equipmentGrid", "W201909260942597351000Jv22WXkfkAw", {resourceCd : resourceItems[0].item.resourceCd}, function() {
									micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});
									$("#resourceGroupGridModalPop").micaModal("hide");
								});
							} else {
								AUIGrid.clearGridData("equipmentGrid");
								micaCommon.messageBox({type : "success", width : "400", height : "145", html : Language.lang['MESSAGES10692']});
								$("#resourceGridModalPop").micaModal("hide");
							}
						});
					}
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
	},
};
$(document).ready(function(event){
	MOMIA005.init();
});