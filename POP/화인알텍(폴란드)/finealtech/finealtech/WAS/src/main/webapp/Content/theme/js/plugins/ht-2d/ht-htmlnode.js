!function(E){"use strict";var F="ht",m=E[F],w=function(){return document},M=function(){return w().body},v=function($,v,t){$.style.setProperty(v,t,null)},K=function(Z){return w().createElement(Z)},U=function(){return K("div")},S=function(){var j=K("canvas");return j},y=function(i,X){v(i,"-webkit-transform",X),v(i,"-ms-transform",X),v(i,"transform",X)},R=function(w,F){v(w,"-webkit-transform-origin",F),v(w,"-ms-transform-origin",F),v(w,"transform-origin",F)},X=function(r,H){r.appendChild(H)},P=function(F,u){F.removeChild(u)},A=E.parseInt,g=m.Default,k=g.getInternal(),V=Math.PI,I="white-space",u="visibility",N="left",W="top",J="width",l="height",d="position",$="display",H="z-index",G="px",B="0 0",r="absolute",Z="visible",Y="hidden",z="none",D="block",c="nowrap",j="rgba(0, 0, 0, 0.005)";g.setImage("node_dragger","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN9JREFUeNrsV9sNhDAMKyzQVdgARmGzrMJNUFZhAh6nfkVcG9PQgHSR8lEksJs6pnGuLCimSRzAa0yyBK9O4gy8GokU+O0kJOAwiQYg0LP1xNYDW3+0CfBYNb7VOuN4LAGpiOaYUhFDas9F2NPHDELNENJqaHgBgSQJ3ufakfQJqckERcOiK+Ae1FGWBNKGh9oX5WPpLpdNYfffijbsxTHh7VKP7388n1g1h7OKUoUuyGpJakQEuhwkZAKcDXVOdWcrOrL/feBVBHI/q8fcjE1nA9PpyHQ+NJ2Qi8A3AQYAOtS27fCoRY0AAAAASUVORK5CYII=");var Q=m.graph.GraphView.prototype,o=Q._42;Q.adjustHtmlNodeIndex=!0,Q._42=function(z,k){if(o.call(this,z,k),this.adjustHtmlNodeIndex)for(var V=this.getDataModel()._datas._as,U=V.length,l=1,$=0;U>$;$++){var q=V[$];if(q instanceof T){var b=this.getDataUI(q);v(b.$2f,H,l+""),v(b.$3f,H,l+1+""),l+=2}}};var C=m.HtmlNodeUI=function(O,e){var q=this;C.superClass.constructor.call(q,O,e);var a=q.$2f=U(),L=q.$3f=S();v(a,d,r),v(a,u,Y),v(a,I,c),L.draggable=!1,v(L,d,r),v(L,$,z),R(L,B),a.addEventListener("change",function(J){var r=J.target,g=r.bind||r.getAttribute("bind"),H=r.type&&"checkbox"===r.type?r.checked:r.value,D=e.getContext();g&&D&&(D[g]=H,q.$4f=JSON.stringify(D))}),["mousedown","touchstart","keydown","mousewheel","DOMMouseScroll"].forEach(function(N){a.addEventListener(N,this.$9f.bind(this))},q)};g.def(C,k.ui().NodeUI,{_visible:!0,$11f:function(){var W=this,y=W.$3f,z=W._data,L=z.getDraggerImageWidth(),f=z.getDraggerImageHeight(),h=z.getDraggerImage(),_=k.initContext(y);_.beginPath(),k.setCanvas(y,L,f),k.translateAndScale(_,0,0,1),_.clearRect(0,0,L,f),g.drawImage(_,g.getImage(h),0,0,L,f),_.restore()},_80o:function(S){C.superClass._80o.call(this,S);var o=this,g=o._data,I=g._padding,T=2*I,p=o.$2f,f=o.$3f,q=o.gv,P=q.getZoom(),Q=q.getTranslateX(),i=q.getTranslateY(),O=q.getView(),t=o._83o,E=g._width,R=g._height,c=t.position,B=t.rotation,L=(E-T)/g.$5f*P,k=(R-T)/g.$6f*P,w=o._html,K=g._html,M=g.getHtmlType();if("html"===M){var s=g.getContext()||{},h=o.$4f,F=g.$10f,x=JSON.stringify(s);w&&h&&w===K&&h===x||(o.$4f=x,o._html=K,p.innerHTML=F?F(s):K)}else if(null!=M){var _=g.getHtml();"ht"===M&&(_=_.getView()),w&&w===_&&p.contains(w)||(o._html=_,p.innerHTML="",X(p,_))}if(!p.parentNode){var n=q.$1f;if(!n){var b=U();v(b,d,r),v(b,H,"0"),n=q.$1f=b;var a=q._canvas.nextSibling;a?O.insertBefore(b,a):X(O,b)}X(n,p),X(n,f),g.onContentInitialized&&g.onContentInitialized(p)}if(g._scalable){var m=g.$5f,e=g.$6f;y(p,"rotate("+180*(B/V)+"deg) scale("+L+","+k+")"),v(p,J,""),v(p,l,""),v(p,N,(c.x-m/P/2)*P+Q+G),v(p,W,(c.y-e/P/2)*P+i+G)}else{var dj=A(p.style.width),mn=A(p.style.height),sj=A((E-T)*P),Cl=A((R-T)*P),Ag="100%",Lh=p.children[0];v(Lh,J,Ag),v(Lh,l,Ag),(dj!==sj||mn!==Cl)&&(v(p,J,sj+G),v(p,l,Cl+G),"ht"===M&&K.invalidate()),y(p,"rotate("+180*(B/V)+"deg)"),v(p,N,(c.x-sj/P/2)*P+Q+G),v(p,W,(c.y-Cl/P/2)*P+i+G)}var Kn=o.dragRect;q.isMovable(g)&&q.isSelected(g)&&Kn?(S.save(),S.fillStyle=j,S.fillRect(Kn.x,Kn.y,Kn.width,Kn.height),S.restore(),v(f,N,Kn.x*P+Q+G),v(f,W,Kn.y*P+i+G),y(f,"scale("+P+","+P+")"),v(f,$,D),o.$11f()):v(f,$,z),v(p,u,this._visible?Z:Y)},dispose:function(){var P=this.gv.$1f;this.$2f.parentNode===P&&P.removeChild(this.$2f),this.$3f.parentNode===P&&P.removeChild(this.$3f)},_84o:function(O){this._visible=O,v(this.$2f,u,O?Z:Y),v(this.$3f,$,O?D:z)},_3O:function(){var $=this,x=$.gv,g=$._data;C.superClass._3O.call($);var r=g.getRect();x.isEditable(g)&&($.dragRect={x:r.x+r.width+g._padding,y:r.y+10,width:g.getDraggerImageWidth(),height:g.getDraggerImageHeight()},$._68o($.dragRect))},rectIntersects:function(x){var I=this._79o();return m.Default.intersection(I,x)?!0:void 0},$9f:function(b){var u=this.gv,o=this._data;u.sm().contains(o)&&b.stopPropagation()}});var T=m.HtmlNode=function(){T.superClass.constructor.call(this)};m.Default.def(T,m.Node,{ms_ac:["html","context","scalable","padding","draggerImage","draggerImageWidth","draggerImageHeight"],_padding:m.Default.isTouchable?12:6,_image:null,_scalable:!0,_draggerImage:"node_dragger",_draggerImageWidth:20,_draggerImageHeight:20,setHtml:function(R){var h=this,r=h._html;h._html=R,"html"===h.getHtmlType()&&"Handlebars"in E&&(h.$10f=Handlebars.compile(R)),h.$13f(),h.fp("html",r,R)},setContext:function(z){var a=this,O=a._context;a._context=z,a.fp("context",O,z),a.$13f()},setScalable:function(J){var A=this,N=A._scalable;A._scalable=J,A.fp("scalable",N,J),A.$13f()},getHtmlType:function(){var $=this._html;return $?"string"==typeof $?"html":$.getView?"ht":"dom":null},$13f:function(){var H=this,Z=H._html,W=H.$10f;if(Z){var p=U(),f=!1,S=H.getHtmlType();if(v(p,d,r),v(p,I,c),v(p,u,Y),"html"===S?(p.innerHTML=W?W(H.getContext()||{}):Z,f=!0):"ht"===S?(X(p,Z.getView()),f=!0):"dom"===S&&(X(p,Z),f=!0),f){var J=2*H._padding;X(M(),p),H.$5f=p.scrollWidth,H.$6f=p.scrollHeight,H._width=H.$5f+J,H._height=H.$6f+J,H._originWidth=H._width,H._originHeight=H._height,P(M(),p)}}},getUIClass:function(){return m.HtmlNodeUI}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);