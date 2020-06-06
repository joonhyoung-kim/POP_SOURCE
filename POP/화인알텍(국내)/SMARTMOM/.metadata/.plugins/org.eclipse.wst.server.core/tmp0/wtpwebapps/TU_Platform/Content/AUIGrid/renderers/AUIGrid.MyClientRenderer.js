/* eslint-disable */
/*
 * AUIGrid 사용자 정의 렌더러
 */
AUIGrid.MyClientRenderer = AUIGrid.Class({
	
	/****************************************************************
	 * 
	 * Overriden Properties
	 * 
	 ****************************************************************/
	
	/* 생성될 HTML Tag 명 */
	tagName : "div",
	
	/* CSS 스타일 클래스 */
	cssClass : "aui-grid-renderer-base aui-grid-renderer-custom",
	
	/* 행 아이템 */
	data : null,
	
	/* 렌더러의 칼럼 레이아웃 데이터 */
	columnData : null,
	
	/* 칼럼 인덱스 */
	columnIndex : -1,
	
	/* 행 인덱스 */
	rowIndex : -1,
	
	/* 헤더 텍스트 */
	headerText : "",
	
	/* 데이터 필드명 */
	dataField : "",
	
	/* 초기화 여부 */
	initialized : false,
	
	/****************************************************************
	 * 
	 * Private Properties
	 * 
	 * Rule : Private Properties 는 반드시 __ 로 시작하십시오
	 * 즉, 사용자가 추가하는 속성, 메소드는 __ 로 시작하십시오.
	 * 
	 ****************************************************************/
	
	/* 사용자가 작성할 엘리먼트*/
	__imgEle : null,
	
	/* 사용자가 작성할 엘리먼트*/
	__childEle : null,
	
	/* 사용자가 작성할 엘리먼트*/
	__childEle2 : null,
	
	
	/****************************************************************
	 * 
	 * Overriden Methods
	 * 
	 ****************************************************************/
	
	/*
	 * @Overriden public update
	 * 
	 * 그리드에 의해 호출되는 메소드이며 빈번히 호출됩니다.
	 * 이 메소드에서 DOM 검색이나, jQuery 객체 생성 등은 자제하십시오.
	 * DOM 검색이나 jQuery 객체는 initialize() 메소드에서 하십시오.
	 */
	update : function() {
		
		var data = this.data;
		
		if(!data) return;
		
		// 최초 1회만 실행해야 할 것들.
		if(!this.initialized) {
			this.initialize();
		}
		
		// 실제 element 에 값 출력
		this.__displayMyValues();
	},
	
	/*
	 * @Overriden public destroy
	 * 
	 * 여기서 해제할 것 모두 해제 하십시오.
	 * 메모리 누수를 유발하는 코드들을 모두 해제 하십시오.
	 */
	destroy : function(unload) {
		
		this.__imgEle = null;
		this.__childEle = null;
		this.__childEle2 = null;
		
		// 필수 : 반드시 아래 코드는 추가 해야 합니다.
		this.$super.destroy(unload);
	},
	
	/*
	 * @Overriden public initialize
	 * 
	 * 최초 1번만 실행되므로 설정할 사항이 있으면 여기서 설정하십시오.
	 */
	initialize : function() {
		
		if(this.initialized)
			return;
		
		this.initialized = true;
		
		this.setHeight(this.rowHeight - 2);
		
		// 렌더러 자체 HTML Element(Div)
		var element = this.element;
		// 중요!!!! child 들이 absolute 포지션을 갖기 때문에 relative 해줘야 함.
		this.__setStyle(element, "position", "relative" );
		
		var img = this.__imgEle = document.createElement("img");
		img.className = "my-img";
		
		var c1 = this.__childEle = document.createElement("div");
		c1.className = "my-child1";
		
		var c2 = this.__childEle2 = document.createElement("div");
		c2.className = "my-child2";
		
		element.appendChild(img);
		element.appendChild(c1);
		element.appendChild(c2);
		
		// IE 메모리 누수 방지
		img = c1 = c2 =  null;
	},
	
	/****************************************************************
	 * 
	 * Private Methods
	 * 
	 * Rule : Private Methods 는 반드시 __ 로 시작하십시오
	 * 즉, 사용자가 추가하는 속성, 메소드는 __ 로 시작하십시오.
	 * 
	 ****************************************************************/
	
	/* 값을 실제로 element 에 출력함*/
	__displayMyValues : function() {
		var el, ownValue;
		var data = this.data;
		if(data) {
			
			this.__imgEle.setAttribute("src", "./assets/" + data.flag);
			this.__imgEle.setAttribute("title", data.country);
			
			el = this.__childEle;
			ownValue = "<b>Name : </b>" + data.name;
			el.innerHTML = ownValue;
			
			el = this.__childEle2;
			ownValue = "<b>Product : </b>" + data.product;
			el.innerHTML = ownValue;
			
		}
		el = null;
	},
	
	/* element (엘리먼트) 에 styles 을 설정합니다. */
	__setStyle : function(element, name, value) {
		element.style[name] = value;
	}
	
}).extend(AUIGrid.RendererBase);
