document.write("<style>.ui-state-highlight {position:relative;top:5px;height:26px;width:80px;float:left;list-style-type:none;border: 1px solid #dad55e;background: #fffa90;color: #777620;}</style>");

var tabMenu = {
	/**
	 * tabMenu 대상 jquery Element
	 */
	target : undefined
	/**
	 * tabMenu 대상 부모 Element Style
	 */
	, parentStyle : "width:calc(100% - 115px);overflow:hidden;position:static;"
	/**
	 * 스크롤 이동 버튼 클릭시 이동 범위
	 */
	, scrollMove : 150
	/**
	 * 왼쪽 이동 버튼 jquery Selector
	 */
	, btnLeft : "#btnLeft"
	/**
	 * 오른쪽 이동 버튼 jquery Selector
	 */
	, btnRight : "#btnRight"
	/**
	 * tabMenu 그리기
	 * param : 대상 Element jquery Selector
	 */
	, draw : function(target){
		if(typeof target == "undefined") {
			console.log("err : menuTab target is undefined...");
			return false;
		}
		
		var _this = this;
		this.target = $(target);
		
		this.target.parent().attr("style", this.target.parent().attr("style") +  ";" + this.parentStyle);
		this.target.width("10000");
		
		this.target.sortable({
			axis : 'x'
			, placeholder : "w-inline-block ui-state-highlight"
			, connectWith : target
			, containment : target
			, items : "li:not(.ui-state-disabled)"
		}).disableSelection();
		
		$(this.btnLeft).click(function(){
			_this.leftClick();
		});
		
		$(this.btnRight).click(function(){
			_this.rightClick();
		});
	}
	/**
	 * 왼쪽 이동 버튼 클릭시 스크롤 이동
	 * default : this.scrollMove
	 * param : 스크롤 이동 값
	 */
	, leftClick : function(width){
		event.preventDefault();
		var _this = this;
		this.target.parent().animate({
			scrollLeft : "-=" + (width ? width : _this.scrollMove)
		});
	}
	/**
	 * 오른쪽 이동 버튼 클릭시 스크롤 이동
	 * default : this.scrollMove
	 * param : 스크롤 이동 값
	 */
	, rightClick : function(width){
		event.preventDefault();
		var _this = this;
		this.target.parent().animate({
			scrollLeft : "+=" + (width ? width : _this.scrollMove)
		});
	}
	/**
	 * 메뉴 호출시 스크롤 위치 이동
	 * default : 0
	 * param : 스크롤 위치 값
	 */
	, scrollPosition : function(position){
		this.target.parent().scrollLeft((position ? position : 0) - 230);
	}
}