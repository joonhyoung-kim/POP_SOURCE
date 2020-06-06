!function(y,G){"use strict";var q="ht",h=q+".graph.",X=y[q],o=X.graph,S=X.Default,t=X.Color,w=null,d="px",$=S.getInternal(),R=$.getPinchDist,Q=S.preventDefault,D=S.getTouchCount,N=S.startDragging;$.addMethod(S,{overviewBackground:t.widgetBackground,overviewMaskBackground:t.transparent,overviewContentBorderColor:t.widgetBorder,overviewContentBackground:t.background},!0),o.Overview=function(c){var Z=this,x=Z._view=$.createView(1,Z);Z._canvas=$.createCanvas(x),x.style.background=S.overviewBackground,x.appendChild(Z._mask=$.createDiv()),Z.setGraphView(c),Z.addListeners()},S.def(h+"Overview",G,{ms_v:1,ms_fire:1,ms_listener:1,ms_ac:["maskBackground","contentBorderColor","contentBackground","autoUpdate"],_autoUpdate:!0,_rate:1,_scrollRect:{x:0,y:0,width:0,height:0},_maskBackground:S.overviewMaskBackground,_contentBorderColor:S.overviewContentBorderColor,_contentBackground:S.overviewContentBackground,getGraphView:function(){return this.gv},setGraphView:function(b){var w=this;if(w.gv!==b){var Q=w.gv;w.gv=b,Q&&(Q.removeViewListener(w.handleGraphViewChanged,w),Q.ump(w.handleGraphViewPropertyChanged,w)),b&&(b.addViewListener(w.handleGraphViewChanged,w),b.mp(w.handleGraphViewPropertyChanged,w)),w.fp("graphView",Q,b),w.redraw()}},getCanvas:function(){return this._canvas},getMask:function(){return this._mask},dispose:function(){this.setGraphView(null)},onPropertyChanged:function(){this.redraw()},handleGraphViewChanged:function(S){this._autoUpdate&&"validate"===S.kind&&this.redraw()},handleGraphViewPropertyChanged:function(a){"canvasBackground"===a.property&&this.redraw()},redraw:function(){var Q=this;Q._redraw||(Q._redraw=1,Q.iv(50))},validateImpl:function(){var D=this,b=D.gv,v=D._canvas,q=D.getWidth(),M=D.getHeight(),o=D._redraw;if(b){var Y=D._mask,p=Y.style,i=b.getViewRect(),t=b.getScrollRect(),X=t.x,h=t.y,H=t.width,T=t.height,x=D._rate=Math.max(H/q,T/M),K=D._x=(q-H/x)/2,a=D._y=(M-T/x)/2;if(0!==i.width&&0!==i.height||D.hasRetry||(S.callLater(D.iv,D,w),D.hasRetry=!0),(q!==v.clientWidth||M!==v.clientHeight)&&($.setCanvas(v,q,M),o=1),$.isSameRect(t,D._scrollRect)||(D._scrollRect=t,o=1),o){var Q=$.initContext(v),E=b.getDataModel().getBackground()||D._contentBackground,W=D._contentBorderColor,L=S.devicePixelRatio;Q.clearRect(0,0,q*L,M*L),E&&$.fillRect(Q,K*L,a*L,H/x*L,T/x*L,E),$.translateAndScale(Q,-X/x+K,-h/x+a,1/x),b._42(Q),Q.restore(),W&&$.drawBorder(Q,W,K*L,a*L,H/x*L,T/x*L)}p.background=D._maskBackground,p.left=K+(i.x-X)/x+d,p.top=a+(i.y-h)/x+d,p.width=i.width/x+d,p.height=i.height/x+d,D._redraw=null}else if(o){var Q=$.initContext(v);Q.clearRect(0,0,q,M),Q.restore(),D._redraw=null}},center:function(J){var o=this,N=o.gv;if(N){var X=N._zoom,L=N._29I,M=o._rate,a=o._scrollRect,p=S.getLogicalPoint(J,o._canvas),O=a.x+(p.x-o._x)*M,s=a.y+(p.y-o._y)*M;N.setTranslate((L.width/2-O)*X,(L.height/2-s)*X)}},handle_mousedown:function(S){this.handle_touchstart(S)},handleWindowMouseUp:function(q){this.handleWindowTouchEnd(q)},handleWindowMouseMove:function(m){this.handleWindowTouchMove(m)},handle_mousewheel:function(P){this.handleScroll(P,P.wheelDelta)},handle_DOMMouseScroll:function(n){2===n.axis&&this.handleScroll(n,-n.detail)},handleScroll:function(m,w){if(Q(m),this.gv){var q=this.gv;w>0?q.scrollZoomIn():0>w&&q.scrollZoomOut()}},handle_touchstart:function(C){if(Q(C),this.gv&&S.isLeftButton(C)){var _=this,X=_.gv,O=D(C);1===O?S.isDoubleClick(C)&&X.isResettable()?X.reset():(_.center(C),N(_,C)):2===O&&(_._dist=R(C),N(_,C))}},handleWindowTouchEnd:function(){delete this._dist},handleWindowTouchMove:function(q){if(this.gv){var J=this,x=J._dist,V=D(q);1===V?J.center(q):2===V&&x!=w&&J.gv.handlePinch(w,R(q),x)}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);