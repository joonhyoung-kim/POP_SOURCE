var MOMDA002 = {
	init: function() {
		mCommon.init("grid1", "W201806271803251831000ytALXPNAxm1");
		this.grid();
		this.event();
		mCommon.pageRender("grid1", "W201806271803251831000ytALXPNAxm1", null, function(){
		}, "reference.price.costPrice.costPriceCount");
	}, grid: function() {
		// 위젯 - Footer - Show Footer - 체크.

		var footerObject = [{
			labelText : "합계",
			positionField : "vendorName"
		}, {
			dataField : "unitPrice",
			positionField : "unitPrice",
			operation : "SUM"
//			formatString : "#,##0"
		}, {
			dataField : "unitPrice",
			positionField : "unitPrice",
//			formatString : "#,##0",
			labelFunction : test
		}];
		function test(a,b,c) {
			return b[0] + b[1];
		}
		// footer 합계
		AUIGrid.setFooter("grid1", footerObject);
		
//		// 그룹 합계
//		AUIGrid.setGroupBy("grid1",  ["itemId"], {
//	         dataFields : [ "unitPrice" ],
//	         labelTexts : ["단가 합계"]
//		});
	}, event: function() {
		
		$("#mExcelDownBtn").click(function(event) {
			
		});
	}
};
$(document).ready(function(event){
	MOMDA002.init();
});