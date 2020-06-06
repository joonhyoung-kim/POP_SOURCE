var MOMIB002 = {
	init: function() {
		this.event();
	}, grid: function() {
		
	}, event: function() {
		
		// ajax 호출과 동일한 상황의 예제 입니다.
		// 액션 -> 로딩바 -> 정보(결과) 출력
		$(document).on("click", "#createBtn", function() {
			if(confirm("테스트 local 전송하시겠습니까?")) {
				
				// 로딩바 표시
				micaCommon.splash.show();
				
				// ajax 대신 setTiemout으로 예제
				setTimeout(function() {
					var result = {text: "테스트 메시지입니다."};
					
					// 로딩바 숨김
					micaCommon.splash.hide();
					
					// 메시지 표시
					// 타입종류 "primary, success, info, warning, danger"
					micaCommon.messageBox({ width: 350, height: 130, title: "Success", html: result.text, type: "primary"});
				}, 2000);
			}
		});
	}
};
$(document).ready(function(event){
	MOMIB002.init();
});