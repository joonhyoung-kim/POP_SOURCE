!function(S,F,o){"use strict";var b="ht",U=S[b],M=U.Default,O=M.getInternal();O.addMethod(M,{cadToShape:function(Q,L){var Z=new U.DxfViewer(L);return Z.toShape(Q)}}),function(y){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=y();else if("function"==typeof define&&define.amd)define([],y);else{var t;t="undefined"!=typeof S?S:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.DxfParser=y()}}(function(){var m;return function L(D,v,p){function O(j,f){if(!v[j]){if(!D[j]){var F="function"==typeof require&&require;if(!f&&F)return F(j,!0);if(x)return x(j,!0);var Y=new Error("Cannot find module '"+j+"'");throw Y.code="MODULE_NOT_FOUND",Y}var U=v[j]={exports:{}};D[j][0].call(U.exports,function(p){var $=D[j][1][p];return O($?$:p)},U,U.exports,L,D,v,p)}return v[j].exports}for(var x="function"==typeof require&&require,W=0;W<p.length;W++)O(p[W]);return O}({1:[function(x,z){z.exports=[0,16711680,16776960,65280,65535,255,16711935,16777215,8421504,12632256,16711680,16744319,13369344,13395558,10027008,10046540,8323072,8339263,4980736,4990502,16727808,16752511,13382400,13401958,10036736,10051404,8331008,8343359,4985600,4992806,16744192,16760703,13395456,13408614,10046464,10056268,8339200,8347455,4990464,4995366,16760576,16768895,13408512,13415014,10056192,10061132,8347392,8351551,4995328,4997670,16776960,16777087,13421568,13421670,10000384,10000460,8355584,8355647,5000192,5000230,12582656,14679935,10079232,11717734,7510016,8755276,6258432,7307071,3755008,4344870,8388352,12582783,6736896,10079334,5019648,7510092,4161280,6258495,2509824,3755046,4194048,10485631,3394560,8375398,2529280,6264908,2064128,5209919,1264640,3099686,65280,8388479,52224,6736998,38912,5019724,32512,4161343,19456,2509862,65343,8388511,52275,6737023,38950,5019743,32543,4161359,19475,2509871,65407,8388543,52326,6737049,38988,5019762,32575,4161375,19494,2509881,65471,8388575,52377,6737074,39026,5019781,32607,4161391,19513,2509890,65535,8388607,52428,6737100,39064,5019800,32639,4161407,19532,2509900,49151,8380415,39372,6730444,29336,5014936,24447,4157311,14668,2507340,32767,8372223,26316,6724044,19608,5010072,16255,4153215,9804,2505036,16383,8364031,13260,6717388,9880,5005208,8063,4149119,4940,2502476,255,8355839,204,6710988,152,5000344,127,4145023,76,2500172,4129023,10452991,3342540,8349388,2490520,6245528,2031743,5193599,1245260,3089996,8323327,12550143,6684876,10053324,4980888,7490712,4128895,6242175,2490444,3745356,12517631,14647295,10027212,11691724,7471256,8735896,6226047,7290751,3735628,4335180,16711935,16744447,13369548,13395660,9961624,9981080,8323199,8339327,4980812,4990540,16711871,16744415,13369497,13395634,9961586,9981061,8323167,8339311,4980793,4990530,16711807,16744383,13369446,13395609,9961548,9981042,8323135,8339295,4980774,4990521,16711743,16744351,13369395,13395583,9961510,9981023,8323103,8339279,4980755,4990511,3355443,5987163,8684676,11382189,14079702,16777215]},{}],2:[function(g,k){function O(G){this._pointer=0,this._data=G,this._eof=!1}function R(Q,E){return 9>=Q?E:Q>=10&&59>=Q?parseFloat(E):Q>=60&&99>=Q?parseInt(E):Q>=100&&109>=Q?E:Q>=110&&149>=Q?parseFloat(E):Q>=160&&179>=Q?parseInt(E):Q>=210&&239>=Q?parseFloat(E):Q>=270&&289>=Q?parseInt(E):Q>=290&&299>=Q?P(E):Q>=300&&369>=Q?E:Q>=370&&389>=Q?parseInt(E):Q>=390&&399>=Q?E:Q>=400&&409>=Q?parseInt(E):Q>=410&&419>=Q?E:Q>=420&&429>=Q?parseInt(E):Q>=430&&439>=Q?E:Q>=440&&459>=Q?parseInt(E):Q>=460&&469>=Q?parseFloat(E):Q>=470&&481>=Q?E:999===Q?E:Q>=1e3&&1009>=Q?E:Q>=1010&&1059>=Q?parseFloat(E):Q>=1060&&1071>=Q?parseInt(E):(console.log("WARNING: Group code does not have a defined type: %j",{code:Q,value:E}),E)}function P(v){if("0"===v)return!1;if("1"===v)return!0;throw TypeError("String '"+v+"' cannot be cast to Boolean type")}O.prototype.next=function(){var B;if(!this.hasNext())throw this._eof?new Error("Cannot call 'next' after EOF group has been read"):new Error("Unexpected end of input: EOF group not read before end of file. Ended on code "+this._data[this._pointer]);return B={code:parseInt(this._data[this._pointer])},this._pointer++,B.value=R(B.code,this._data[this._pointer].trim()),this._pointer++,0===B.code&&"EOF"===B.value&&(this._eof=!0),B},O.prototype.hasNext=function(){return this._eof?!1:this._pointer>this._data.length-2?!1:!0},O.prototype.isEOF=function(){return this._eof},k.exports=O},{}],3:[function(S,J){function t(){}function N(X){W.debug("unhandled group "+P(X))}function P(h){return h.code+":"+h.value}function E(R){return _[R]}var M=S("./DxfArrayScanner.js"),_=S("./AutoCadColorIndex"),W=S("loglevel");W.setLevel("error"),t.prototype.parse=function(){throw new Error("read() not implemented. Use readSync()")},t.prototype.parseSync=function(s){return"string"==typeof s?this._parse(s):(console.error("Cannot read dxf source of type `"+typeof s),null)},t.prototype.parseStream=function(O,y){function p(f){M+=f}function r(){try{var U=h._parse(M)}catch(Q){return y(Q)}y(null,U)}function k(j){y(j)}var M="",h=this;O.on("data",p),O.on("end",r),O.on("error",k)},t.prototype._parse=function(U){var x,S,I={},c=0,e=U.split(/\r\n|\r|\n/g);if(x=new M(e),!x.hasNext())throw Error("Empty file");var i=function(){for(S=x.next();!x.isEOF();)if(0===S.code&&"SECTION"===S.value){if(S=x.next(),2!==S.code){console.error("Unexpected code %s after 0:SECTION",P(S)),S=x.next();continue}"HEADER"===S.value?(W.debug("> HEADER"),I.header=b(),W.debug("<")):"BLOCKS"===S.value?(W.debug("> BLOCKS"),I.blocks=k(),W.debug("<")):"ENTITIES"===S.value?(W.debug("> ENTITIES"),I.entities=n(!1),W.debug("<")):"TABLES"===S.value?(W.debug("> TABLES"),I.tables=T(),W.debug("<")):"EOF"===S.value?W.debug("EOF"):W.warn("Skipping section '%s'",S.value)}else S=x.next()},q=function(G,Q){return S.code===G&&S.value===Q},b=function(){var o=null,r=null,D={};for(S=x.next();;){if(q(0,"ENDSEC")){o&&(D[o]=r);break}9===S.code?(o&&(D[o]=r),o=S.value):10===S.code?r={x:S.value}:20===S.code?r.y=S.value:30===S.code?r.z=S.value:r=S.value,S=x.next()}return S=x.next(),D},k=function(){var f,Z={};for(S=x.next();"EOF"!==S.value&&!q(0,"ENDSEC");)q(0,"BLOCK")?(W.debug("block {"),f=$(),W.debug("}"),m(f),f.name?Z[f.name]=f:W.error('block with handle "'+f.handle+'" is missing a name.')):(N(S),S=x.next());return Z},$=function(){var k={};for(S=x.next();"EOF"!==S.value;){switch(S.code){case 1:k.xrefPath=S.value,S=x.next();break;case 2:k.name=S.value,S=x.next();break;case 3:k.name2=S.value,S=x.next();break;case 5:k.handle=S.value,S=x.next();break;case 8:k.layer=S.value,S=x.next();break;case 10:k.position=K();break;case 67:k.paperSpace=S.value&&1==S.value?!0:!1,S=x.next();break;case 70:0!=S.value&&(k.type=S.value),S=x.next();break;case 100:S=x.next();break;case 330:k.ownerHandle=S.value,S=x.next();break;case 0:if("ENDBLK"==S.value)break;x._pointer-=2,k.entities=n(!0);break;default:N(S),S=x.next()}if(q(0,"ENDBLK")){S=x.next();break}}return k},T=function(){var s={};for(S=x.next();"EOF"!==S.value&&!q(0,"ENDSEC");)if(q(0,"TABLE")){S=x.next();var m=d[S.value];m?(W.debug(S.value+" Table {"),s[d[S.value].tableName]=f(),W.debug("}")):W.debug("Unhandled Table "+S.value)}else S=x.next();return S=x.next(),s},R="ENDTAB",f=function(){var V,$=d[S.value],r={},p=0;for(S=x.next();!q(0,R);)switch(S.code){case 5:r.handle=S.value,S=x.next();break;case 330:r.ownerHandle=S.value,S=x.next();break;case 100:"AcDbSymbolTable"===S.value?S=x.next():(N(S),S=x.next());break;case 70:p=S.value,S=x.next();break;case 0:S.value===$.dxfSymbolName?r[$.tableRecordsProperty]=$.parseTableRecords():(N(S),S=x.next());break;default:N(S),S=x.next()}var j=r[$.tableRecordsProperty];return j&&(j.constructor===Array?V=j.length:"object"==typeof j&&(V=F.keys(j).length),p!==V&&W.warn("Parsed "+V+" "+$.dxfSymbolName+"'s but expected "+p)),S=x.next(),r},B=function(){var G=[],f={};for(W.debug("ViewPort {"),S=x.next();!q(0,R);)switch(S.code){case 2:f.name=S.value,S=x.next();break;case 10:f.lowerLeftCorner=K();break;case 11:f.upperRightCorner=K();break;case 12:f.center=K();break;case 13:f.snapBasePoint=K();break;case 14:f.snapSpacing=K();break;case 15:f.gridSpacing=K();break;case 16:f.viewDirectionFromTarget=K();break;case 17:f.viewTarget=K();break;case 40:f.viewHeight=S.value,f.aspectRatio!==o&&(f.viewWidth=S.value*f.aspectRatio),S=x.next();break;case 41:f.aspectRatio=S.value,f.viewHeight!==o&&(f.viewWidth=S.value*f.viewHeight),S=x.next();break;case 42:f.lensLength=S.value,S=x.next();break;case 43:f.frontClippingPlane=S.value,S=x.next();break;case 44:f.backClippingPlane=S.value,S=x.next();break;case 45:f.viewHeight=S.value,S=x.next();break;case 50:f.snapRotationAngle=S.value,S=x.next();break;case 51:f.viewTwistAngle=S.value,S=x.next();break;case 79:f.orthographicType=S.value,S=x.next();break;case 110:f.ucsOrigin=K();break;case 111:f.ucsXAxis=K();break;case 112:f.ucsYAxis=K();break;case 110:f.ucsOrigin=K();break;case 281:f.renderMode=S.value,S=x.next();break;case 281:f.defaultLightingType=S.value,S=x.next();break;case 292:f.defaultLightingOn=S.value,S=x.next();break;case 330:f.ownerHandle=S.value,S=x.next();break;case 63:case 421:case 431:f.ambientColor=S.value,S=x.next();break;case 0:"VPORT"===S.value&&(W.debug("}"),G.push(f),W.debug("ViewPort {"),f={},S=x.next());break;default:N(S),S=x.next()}return W.debug("}"),G.push(f),G},V=function(){var O,d,w={},A={};for(W.debug("LType {"),S=x.next();!q(0,"ENDTAB");)switch(S.code){case 2:A.name=S.value,O=S.value,S=x.next();break;case 3:A.description=S.value,S=x.next();break;case 73:d=S.value,d>0&&(A.pattern=[]),S=x.next();break;case 40:A.patternLength=S.value,S=x.next();break;case 49:A.pattern.push(S.value),S=x.next();break;case 0:W.debug("}"),d>0&&d!==A.pattern.length&&W.warn("lengths do not match on LTYPE pattern"),w[O]=A,A={},W.debug("LType {"),S=x.next();break;default:S=x.next()}return W.debug("}"),w[O]=A,w},v=function(){var Q,J={},d={};for(W.debug("Layer {"),S=x.next();!q(0,"ENDTAB");)switch(S.code){case 2:d.name=S.value,Q=S.value,S=x.next();break;case 62:d.visible=S.value>0,d.color=E(Math.abs(S.value)),S=x.next();break;case 6:d.lineType=S.value,S=x.next();break;case 0:"LAYER"===S.value&&(W.debug("}"),J[Q]=d,W.debug("Layer {"),d={},Q=o,S=x.next());break;default:N(S),S=x.next()}return W.debug("}"),J[Q]=d,J},d={VPORT:{tableRecordsProperty:"viewPorts",tableName:"viewPort",dxfSymbolName:"VPORT",parseTableRecords:B},LTYPE:{tableRecordsProperty:"lineTypes",tableName:"lineType",dxfSymbolName:"LTYPE",parseTableRecords:V},LAYER:{tableRecordsProperty:"layers",tableName:"layer",dxfSymbolName:"LAYER",parseTableRecords:v}},n=function(o){var M=[],c=o?"ENDBLK":"ENDSEC";for(S=x.next();;)if(0===S.code){if(S.value===c)break;var U;if("LWPOLYLINE"===S.value)W.debug("LWPOLYLINE {"),U=A(),W.debug("}");else if("POLYLINE"===S.value)W.debug("POLYLINE {"),U=l(),W.debug("}");else if("LINE"===S.value)W.debug("LINE {"),U=C(),W.debug("}");else if("CIRCLE"===S.value)W.debug("CIRCLE {"),U=_(),W.debug("}");else if("ARC"===S.value)W.debug("ARC {"),U=_(),W.debug("}");else if("ELLIPSE"===S.value)W.debug("ELLIPSE {"),U=p(),W.debug("}");else if("SPLINE"===S.value)W.debug("SPLINE {"),U=w(),W.debug("}");else if("TEXT"===S.value)W.debug("TEXT {"),U=X(),W.debug("}");else if("DIMENSION"===S.value)W.debug("DIMENSION {"),U=h(),W.debug("}");else if("INSERT"===S.value)W.debug("INSERT {"),U=t(),W.debug("}");else if("HATCH"===S.value)W.debug("HATCH {"),U=D(),W.debug("}");else if("SOLID"===S.value)W.debug("SOLID {"),U=u(),W.debug("}");else if("POINT"===S.value)W.debug("POINT {"),U=r(),W.debug("}");else if("MTEXT"===S.value)W.debug("MTEXT {"),U=J(),W.debug("}");else{if("ATTDEF"!==S.value){W.warn("Unhandled entity "+S.value),S=x.next();continue}W.debug("ATTDEF {"),U=Z(),W.debug("}")}m(U),M.push(U)}else S=x.next();return"ENDSEC"==c&&(S=x.next()),M},s=function(e){switch(S.code){case 0:e.type=S.value,S=x.next();break;case 5:e.handle=S.value,S=x.next();break;case 6:e.lineType=S.value,S=x.next();break;case 8:e.layer=S.value,S=x.next();break;case 48:e.lineTypeScale=S.value,S=x.next();break;case 60:e.visible=0===S.value,S=x.next();break;case 62:e.colorIndex=S.value,e.color=E(Math.abs(S.value)),S=x.next();break;case 67:e.inPaperSpace=0!==S.value,S=x.next();break;case 210:e.extrusionDirection=K();break;case 230:e.extrusionDirection={x:0,y:0,z:S.value},S=x.next();break;case 330:e.ownerHandle=S.value,S=x.next();break;case 347:e.materialObjectHandle=S.value,S=x.next();break;case 370:e.lineweight=S.value,S=x.next();break;case 420:e.color=S.value,S=x.next();break;case 100:if("AcDbEntity"==S.value){S=x.next();break}default:N(S),S=x.next()}},Q=function(){var X={type:S.value};for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:X.x=S.value,S=x.next();break;case 20:X.y=S.value,S=x.next();break;case 30:X.z=S.value,S=x.next();break;case 40:case 41:case 42:S=x.next();break;case 70:X.curveFittingVertex=0!==(1|S.value),X.curveFitTangent=0!==(2|S.value),X.splineVertex=0!==(8|S.value),X.splineControlPoint=0!==(16|S.value),X.ThreeDPolylineVertex=0!==(32|S.value),X.ThreeDPolylineMesh=0!==(64|S.value),X.polyfaceMeshVertex=0!==(128|S.value),S=x.next();break;case 50:case 71:case 72:case 73:case 74:S=x.next();break;default:s(X)}return X},j=function(){var U={type:S.value};for(S=x.next();"EOF"!=S&&0!=S.code;)s(U);return U},K=function(){var D={},k=S.code;if(D.x=S.value,k+=10,S=x.next(),S.code!=k)throw new Error("Expected code for point value to be "+k+" but got "+S.code+".");return D.y=S.value,k+=10,S=x.next(),S.code!=k?D:(D.z=S.value,S=x.next(),D)},G=function(){var s={},Z=S.code;return s.x=S.value,Z+=1,S=x.next(),S.code!=Z?(x._pointer-=2,s.y=1):s.y=S.value,Z+=1,S=x.next(),S.code!=Z?(x._pointer-=2,s):(s.z=S.value,S=x.next(),s)},z=function(B){if(!B||0>=B)throw Error("n must be greater than 0 verticies");var u,c=[],G=!1,R=!1;for(u=0;B>u;u++){for(var Z={};"EOF"!==S&&0!==S.code&&!R;){switch(S.code){case 10:if(G){R=!0;continue}Z.x=S.value,G=!0;break;case 20:Z.y=S.value;break;case 30:Z.z=S.value;break;case 40:Z.startWidth=S.value;break;case 41:Z.endWidth=S.value;break;case 42:0!=S.value&&(Z.bulge=S.value);break;default:if(G){R=!0;continue}continue}S=x.next()}c.push(Z),G=!1,R=!1}return c},y=function(){for(var h=[];"EOF"!==S;)if(0===S.code)if("VERTEX"===S.value)h.push(Q());else if("SEQEND"===S.value){j();break}return h},J=function(){var U={type:S.value};for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 1:U.text=S.value,S=x.next();break;case 3:U.text+=S.value,S=x.next();break;case 10:U.position=K();break;case 40:U.height=S.value,S=x.next();break;case 41:U.width=S.value,S=x.next();break;case 71:U.attachmentPoint=S.value,S=x.next();break;case 72:U.drawingDirection=S.value,S=x.next();break;case 50:U.angle=2*S.value*Math.PI/360,S=x.next();break;case 11:U.directionX=S.value,S=x.next();break;case 21:U.directionY=S.value,S=x.next();break;default:s(U)}return U},Z=function(){var w={type:S.value,scale:1,textStyle:"STANDARD"};for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 1:w.text=S.value,S=x.next();break;case 2:w.tag=S.value,S=x.next();break;case 3:w.prompt=S.value,S=x.next();break;case 7:w.textStyle=S.value,S=x.next();break;case 10:w.x=S.value,S=x.next();break;case 20:w.y=S.value,S=x.next();break;case 30:w.z=S.value,S=x.next();break;case 39:w.thickness=S.value,S=x.next();break;case 40:w.textHeight=S.value,S=x.next();break;case 41:w.scale=S.value,S=x.next();break;case 50:w.rotation=S.value,S=x.next();break;case 51:w.obliqueAngle=S.value,S=x.next();break;case 70:w.invisible=!!(1&S.value),w.constant=!!(2&S.value),w.verificationRequired=!!(4&S.value),w.preset=!!(8&S.value),S=x.next();break;case 71:w.backwards=!!(2&S.value),w.mirrored=!!(4&S.value),S=x.next();break;case 72:w.horizontalJustification=S.value,S=x.next();break;case 73:w.fieldLength=S.value,S=x.next();break;case 74:w.verticalJustification=S.value,S=x.next();break;case 100:S=x.next();break;case 210:w.extrusionDirectionX=S.value,S=x.next();break;case 220:w.extrusionDirectionY=S.value,S=x.next();break;case 230:w.extrusionDirectionZ=S.value,S=x.next();break;default:s(w)}return w},A=function(){var T={type:S.value,vertices:[]},K=0;for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 38:T.elevation=S.value,S=x.next();break;case 39:T.depth=S.value,S=x.next();break;case 70:T.shape=1===S.value,S=x.next();break;case 90:K=S.value,S=x.next();break;case 10:T.vertices=z(K);break;case 43:0!==S.value&&(T.width=S.value),S=x.next();break;default:s(T)}return T},l=function(){var F={type:S.value,vertices:[]};for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:case 20:case 30:case 39:case 40:case 41:S=x.next();break;case 70:F.shape=0!==(1|S.value),S=x.next();break;case 71:case 72:case 73:case 74:case 75:S=x.next();break;case 100:S=x.next();break;default:s(F)}return F.vertices=y(),F},C=function(){var t={type:S.value,vertices:[]};for(S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:t.vertices.unshift(K());break;case 11:t.vertices.push(K());break;case 100:if("AcDbLine"==S.value){S=x.next();break}default:s(t)}return t},_=function(){var O,L;for(O={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:O.center=K();break;case 40:O.radius=S.value,S=x.next();break;case 50:O.startAngle=Math.PI/180*S.value,S=x.next();break;case 51:L=Math.PI/180*S.value,O.angleLength=L<O.startAngle?L+2*Math.PI-O.startAngle:L-O.startAngle,O.endAngle=L,S=x.next();break;default:s(O)}return O},p=function(){var B,r;for(B={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:B.center=K();break;case 11:B.major=K();break;case 40:B.ratio=S.value,S=x.next();break;case 41:B.startAngle=S.value,S=x.next();break;case 42:r=S.value,B.angleLength=r<B.startAngle?r+2*Math.PI-B.startAngle:r-B.startAngle,B.endAngle=r,S=x.next();break;default:s(B)}return B},t=function(){var Y;for(Y={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 2:Y.block=S.value,S=x.next();break;case 10:Y.center=K();break;case 41:Y.scale=G();break;case 50:Y.deg=S.value,S=x.next();break;default:s(Y)}return Y},D=function(){var u;for(u={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 2:u.block=S.value,S=x.next();break;case 10:u.center=K();break;case 41:u.scale=G();break;case 50:u.deg=S.value,S=x.next();break;default:s(u)}return u},w=function(){var j,G;for(j={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:j.center=K();break;case 11:j.major=K();break;case 40:j.ratio=S.value,S=x.next();break;case 41:j.startAngle=S.value,S=x.next();break;case 42:G=S.value,j.angleLength=G<j.startAngle?G+2*Math.PI-j.startAngle:G-j.startAngle,j.endAngle=G,S=x.next();break;default:s(j)}return j},X=function(){var V;for(V={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:V.startPoint=K();break;case 11:V.endPoint=K();break;case 40:V.textHeight=S.value,S=x.next();break;case 41:V.xScale=S.value,S=x.next();break;case 1:V.text=S.value,S=x.next();break;case 71:V.generationFlags=S.value,S=x.next();break;case 72:V.halign=S.value,S=x.next();break;case 73:V.valign=S.value,S=x.next();break;case 50:V.rotation=2*S.value*Math.PI/360,S=x.next();break;default:s(V)}return V},h=function(){var k;for(k={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 2:k.block=S.value,S=x.next();break;case 10:k.anchorPoint=K();break;case 11:k.middleOfText=K();break;case 71:k.attachmentPoint=S.value,S=x.next();break;case 42:k.actualMeasurement=S.value,S=x.next();break;case 1:k.text=S.value,S=x.next();break;case 50:k.angle=S.value,S=x.next();break;default:s(k)}return k},u=function(){var M;for(M={type:S.value},M.points=[],S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:M.points[0]=K();break;case 11:M.points[1]=K();break;case 12:M.points[2]=K();break;case 13:M.points[3]=K();break;default:s(M)}return M},r=function(){var d;for(d={type:S.value},S=x.next();"EOF"!==S&&0!==S.code;)switch(S.code){case 10:d.position=K();break;case 39:d.thickness=S.value,S=x.next();break;case 100:if("AcDbPoint"==S.value){S=x.next();break}default:s(d)}return d},m=function(v){if(!v)throw new TypeError("entity cannot be undefined or null");v.handle||(v.handle=c++)};return i(),I},J.exports=t},{"./AutoCadColorIndex":1,"./DxfArrayScanner.js":2,loglevel:4}],4:[function(E,y){!function(F,J){"object"==typeof y&&y.exports&&"function"==typeof E?y.exports=J():"function"==typeof m&&"object"==typeof m.amd?m(J):F.log=J()}(this,function(){function j(Z){return typeof console===w?!1:console[Z]!==o?X(console,Z):console.log!==o?X(console,"log"):i}function X(d,R){var C=d[R];if("function"==typeof C.bind)return C.bind(d);try{return Function.prototype.bind.call(C,d)}catch(M){return function(){return Function.prototype.apply.apply(C,[d,arguments])}}}function b(l,h){return function(){typeof console!==w&&(F(h),A[l].apply(A,arguments))}}function F(q){for(var p=0;p<t.length;p++){var J=t[p];A[J]=q>p?i:A.methodFactory(J,q)}}function d(r){var G=(t[r]||"silent").toUpperCase();try{return S.localStorage.loglevel=G,void 0}catch(b){}try{S.document.cookie="loglevel="+G+";"}catch(b){}}function V(){var L;try{L=S.localStorage.loglevel}catch(u){}if(typeof L===w)try{L=/loglevel=([^;]+)/.exec(S.document.cookie)[1]}catch(u){}A.levels[L]===o&&(L="WARN"),A.setLevel(A.levels[L],!1)}var A={},i=function(){},w="undefined",t=["trace","debug","info","warn","error"];A.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},A.methodFactory=function(W,R){return j(W)||b(W,R)},A.setLevel=function(B,s){if("string"==typeof B&&A.levels[B.toUpperCase()]!==o&&(B=A.levels[B.toUpperCase()]),!("number"==typeof B&&B>=0&&B<=A.levels.SILENT))throw"log.setLevel() called with invalid level: "+B;return s!==!1&&d(B),F(B),typeof console===w&&B<A.levels.SILENT?"No console available for logging":void 0},A.enableAll=function(j){A.setLevel(A.levels.TRACE,j)},A.disableAll=function(q){A.setLevel(A.levels.SILENT,q)};var s=typeof S!==w?S.log:o;return A.noConflict=function(){return typeof S!==w&&S.log===A&&(S.log=s),A},V(),A})},{}]},{},[3])(3)});var I=U.DxfViewer=function(M){var h=this;h.$16w(M)};I.prototype={},I.prototype.constructor=I;var q={LINE:["LINE","POLYLINE","LWPOLYLINE"],CIRCLE:["CIRCLE","ARC"],ELLIPSE:["ELLIPSE"],TEXT:["TEXT","MTEXT"],SOLID:["SOLID"],POINT:["POINT"]};F.defineProperties(I.prototype,{dxf:{get:function(){return this._dxf}}}),I.prototype.$16w=function(Y){var v=this,U=v.options={};Y=Y||{},U.font=Y.font||"Courier",U.textScaleRatio=Y.textScaleRatio||1,U.size=Y.size||512,U.filter=Y.filter,U.defaultColor=Y.defaultColor||0},I.prototype.toShape=function(T){var d=this;d._bound={xMin:1/0,yMin:1/0,xMax:-1/0,yMax:-1/0},d.parseFile(T),d._shiftX=d._bound.xMin,d._shiftY=d._bound.yMax;var I=d._bound.xMax-d._bound.xMin,a=d._bound.yMax-d._bound.yMin,f=d.options.size/I,c=d.options.size/a;return d._scale=Math.min(f,c),d.shapeComps=[],d.$12w(),d.$11w(),d.$9w(),d.$7w(),d.$8w(),{width:Math.ceil(I*d._scale),height:Math.ceil(a*d._scale),comps:d.shapeComps}},I.prototype.$12w=function(){var b,I,Y,s,U,g,t,T,D,z,k,l,K,G,v,S,P,W=this,u=W._models;for(b=q.LINE,s=0,U=b.length;U>s;s++){I=b[s],Y=u[I];for(T in Y)for(D=Y[T],g=0,t=D.length;t>g;g++)if(z=D[g],k=z.vertices,k&&k.length){for(v=W.$3w(k[0].x,1),S=W.$3w(k[0].y,2),P={type:"shape",borderColor:T,points:[v,S],segments:[1]},P.borderWidth=Math.max(1,W.$3w(z.width||0)),K=1,G=k.length;G>K;K++)l=k[K],P.points.push(W.$3w(l.x,1),W.$3w(l.y,2)),P.segments.push(2);z.shape&&P.segments.push(5),W.shapeComps.push(P)}}},I.prototype.$11w=function(){var P,m,c,J,Y,s,G,v,V,f,M,E=this,L=E._models;for(P=q.SOLID,J=0,Y=P.length;Y>J;J++){m=P[J],c=L[m];for(v in c)for(V=c[v],s=0,G=V.length;G>s;s++)f=V[s],M=f.points,E.shapeComps.push({type:"shape",background:v,points:[E.$3w(M[0].x,1),E.$3w(M[0].y,2),E.$3w(M[1].x,1),E.$3w(M[1].y,2),E.$3w(M[3].x,1),E.$3w(M[3].y,2),E.$3w(M[2].x,1),E.$3w(M[2].y,2)],segments:[1,2,2,2,5]})}},I.prototype.extrusionZNagative=function(D){var S=D.extrusionDirection;return S?Math.abs(S.z+1)<1e-5:!1},I.prototype.$9w=function(){var t,o,Y,G,K,C,P,A,O,z,E,I,d,u,X,n,g,$,W,w,x=this,r=x._models;for(t=q.CIRCLE,G=0,K=t.length;K>G;G++){o=t[G],Y=r[o];for(A in Y)for(O=Y[A],C=0,P=O.length;P>C;C++){if(z=O[C],E=z.startAngle||0,I=z.angleLength||2*Math.PI,d=E+I,u=x.$3w(z.radius),X=z.addonAngle||0,n=x.$3w(z.center.x,1),g=x.$3w(z.center.y,2),w=z.xInvert^x.extrusionZNagative(z),W=z.yInvert,W||w?w&&W?(E=Math.PI+E,d=Math.PI+d,$=!1):(E=Math.PI*(w?1:2)-E,d=Math.PI*(w?1:2)-d,$=!0):$=!1,$=!$,E=2*Math.PI-E-X,d=2*Math.PI-d-X,$){var H=E;E=d,d=H}x.shapeComps.push({type:"arc",borderColor:A,borderWidth:1,rect:[n-u,g-u,2*u,2*u],arcFrom:E,arcTo:d,arcClose:!1})}}},I.prototype.$8w=function(){var o,c,n,P,$,B,N,T,E,f,Y,S,M,j,d,Q,G,a,A,D,l,t,s,W,U,u=this,V=u._models;for(o=q.TEXT,W=u.options.textScaleRatio,P=0,$=o.length;$>P;P++){c=o[P],n=V[c];for(T in n)for(E=n[T],B=0,N=E.length;N>B;B++)if(f=E[B],Y=f.text,Y&&Y.length)if("MTEXT"===c?(S=u.$3w(f.height||12),M=u.$3w(f.position.x,1),j=u.$3w(f.position.y,2),D=f.angle?f.angle:f.directionX?Math.atan2(f.directionY,f.directionX):0,D+=f.addonAngle||0,s=1,A=f.attachmentPoint||1,G=A%3,a=Math.floor(A/3)):(S=u.$3w(f.textHeight||12),M=f.startPoint.x,j=f.startPoint.y,D=f.rotation||0,s=f.xScale||1,2===f.generationFlags?D=2*Math.PI-D:4===f.generationFlags?D=Math.PI-D:6===f.generationFlags&&(D=Math.PI+D),M=u.$3w(M,1),j=u.$3w(j,2),G=(f.halign||0)+1,3===f.valign?a=0:2===f.valign?(a=1,f.endPoint&&(M=(M+u.$3w(f.endPoint.x,1))/2)):a=2),u._isAc2015&&(j-=S),D=2*Math.PI-D,a=1===a?"middle":0===a?"top":"bottom",Q=0===G?"right":2===G?"center":"left",d=S*W+"px "+u.options.font,"MTEXT"===c)for(Y=Y.replace(/\\{/g,"#@#"),Y=Y.replace(/\\}/g,"#@@"),Y=Y.replace(/({|})/g,""),Y=Y.replace(/#@#/g,"{"),Y=Y.replace(/#@@/g,"}"),Y=Y.replace(/\\[ACT]\d+;/g,""),(U=Y.match(/\\f[^;]*;/))&&(Y=Y.replace(U[0],""),U=U[0].match(/\|p(\d+)/),U&&(d=U[0]/10*S*W+"px "+d)),l=Y.split("\\P"),t=0;t<l.length;t++)u.shapeComps.push({type:"text",color:T,text:l[t],rotation:D,rect:[M,j+1.2*t*S,0,0],align:Q,vAlign:a,font:d});else u.shapeComps.push({type:"text",color:T,text:Y,rotation:D,rect:[M,j,0,0],align:Q,vAlign:a,font:d})}},I.prototype.$7w=function(){var F,j,d,I,y,u,h,N,e,S,_,L,P,l,o,M,W,B,i,k,Z,x,X=this,A=X._models;for(F=q.ELLIPSE,I=0,y=F.length;y>I;I++){j=F[I],d=A[j];for(N in d)for(e=d[N],u=0,h=e.length;h>u;u++){if(S=e[u],_=S.major,L=Math.atan2(_.y,_.x),P=X.$3w(Math.sqrt(_.x*_.x+_.y*_.y)),l=P*S.ratio,o=S.startAngle||0,M=S.angleLength||2*Math.PI,W=o+M,B=X.$3w(S.center.x,1),i=X.$3w(S.center.y,2),k=S.xInvert,Z=S.yInvert^X.extrusionZNagative(S),Z^=1,Z||k?k&&Z?(o=Math.PI+o,W=Math.PI+W,x=!1):(o=Math.PI*(k?1:2)-o,W=Math.PI*(k?1:2)-W,x=!0):x=!1,x){var s=o;o=W,W=s}L=2*Math.PI-L,X.shapeComps.push({type:"arc",borderColor:N,borderWidth:1,rotation:L,rect:[B-P,i-l,2*P,2*l],arcFrom:o,arcTo:W,arcClose:!1,arcOval:!0})}}},I.prototype.$4w=function(p,X,m,Z){var P=this,T=P.$2w(X,m);if(T&&(!P.options.filter||!P.options.filter(X))){var I,z,i,L=X.type;if("DIMENSION"!==L&&"INSERT"!==L){(I=p[L])||(I=p[L]={}),(z=I[T])||(z=I[T]=[]);var $=P.extrusionZNagative(X)&&["POINT","LINE","ELLIPSE"].indexOf(L)<0;if(Z||$){Z||(Z={a:1,b:0,c:0,d:1,tx:0,ty:0});var F={};for(var l in X)F[l]=X[l];F.radius&&(F.radius*=Math.sqrt(Z.a*Z.a+Z.b*Z.b)),F.textHeight&&(F.textHeight*=Math.sqrt(Z.a*Z.a+Z.b*Z.b));var U=$?-1:1,k=function(t,J){if(t){var W=t.x,s=t.y;return{x:W*U*J.a+s*J.c+J.tx,y:W*U*J.b+s*J.d+J.ty}}};if(F.position=k(F.position,Z),F.startPoint=k(F.startPoint,Z),F.center=k(F.center,Z),"ELLIPSE"===L){var N;N=k({x:X.major.x+X.center.x,y:X.major.y+X.center.y},Z),F.major={x:N.x-F.center.x,y:N.y-F.center.y},P.extrusionZNagative(X)&&(F.major.x*=-1)}var f;F.vertices&&(f=[],F.vertices.forEach(function(P){f.push(k(P,Z))}),F.vertices=f),F.points&&(f=[],F.points.forEach(function(d){f.push(k(d,Z))}),F.points=f);var E=Math.atan2(Z.b,Z.a),q=Math.cos(E);F.yInvert=Z.d*q<0,F.xInvert=Z.a*q<0,0!==E&&(F.addonAngle=E),X=F}P.$8dw(X),z.push(X)}else{if(!X.block)return;if(P.extrusionZNagative(X))return;var B=m.blocks[X.block];if(!B||!B.entities)return;var V=Z;if("INSERT"===L){var o=X.scale?X.scale.x:1,b=X.scale?X.scale.y:1,c=0,t=1,h=0;if(X.deg&&(c=X.deg*Math.PI/180,t=Math.cos(c),h=Math.sin(c)),Z){var _=o*t,K=o*h,s=-b*h,a=b*t,j=X.center.x,g=X.center.y;V={a:Z.a*_+Z.c*K,b:Z.b*_+Z.d*K,c:Z.a*s+Z.c*a,d:Z.b*s+Z.d*a,tx:Z.a*j+Z.c*g+Z.tx,ty:Z.b*j+Z.d*g+Z.ty}}else V={a:o*t,b:o*h,c:-b*h,d:b*t,tx:X.center.x,ty:X.center.y}}for(i=0;i<B.entities.length;i++)P.$4w(p,B.entities[i],m,V)}}},I.prototype.$8cw=function(U){for(var F=1/0,V=1/0,I=-1/0,p=-1/0,H=0,i=U.length;i>H;H++){var O=U[H];F=Math.min(F,O.x),V=Math.min(V,O.y),I=Math.max(I,O.x),p=Math.max(p,O.y)}return{xMin:F,yMin:V,xMax:I,yMax:p}},I.prototype.$8dw=function(u){var l,o,r=this;o=u.type;for(l in q)if(q[l].indexOf(o)>=0)break;var F,M,Q,R,H,h,z,g,Z,X,P,s,K,U,e,G,L=r.$8cw;switch(l){case"LINE":F=L(u.vertices);break;case"SOLID":F=L(u.points);break;case"POINT":if(!u.position)return;M=u.position.x,Q=u.position.y,F={xMin:M,yMin:Q,xMax:M,yMax:Q};break;case"CIRCLE":for(M=u.center.x,Q=u.center.y,R=u.radius,H=[],h=u.startAngle||0,z=h+(u.angleLength||2*Math.PI),g=u.xInvert^r.extrusionZNagative(u),Z=u.yInvert,X=g?-1:1,P=Z?-1:1,s=h;s<z+Math.PI/30;s+=Math.PI/30)s=Math.min(s,z),H.push({x:M+X*R*Math.cos(s),y:Q+P*R*Math.sin(s)});F=L(H);break;case"ELLIPSE":for(M=u.center.x,Q=u.center.y,H=[],K=Math.sqrt(u.major.x*u.major.x+u.major.y*u.major.y),U=K*u.ratio,R=Math.atan2(u.major.y,u.major.x),e=Math.sin(R),G=Math.cos(R),h=u.startAngle||0,z=h+(u.angleLength||2*Math.PI),g=u.xInvert,Z=u.yInvert^r.extrusionZNagative(u),X=g?-1:1,P=Z?-1:1,s=h;s<z+Math.PI/30;s+=Math.PI/30){s=Math.min(s,z);var i=X*K*Math.cos(s),k=P*U*Math.sin(s);H.push({x:M+(G*i-e*k),y:Q+(e*i+G*k)})}F=L(H);break;default:return}var Y=r._bound;Y.xMin=Math.min(Y.xMin,F.xMin),Y.yMin=Math.min(Y.yMin,F.yMin),Y.xMax=Math.max(Y.xMax,F.xMax),Y.yMax=Math.max(Y.yMax,F.yMax)},I.prototype.parseFile=function(I){var E=this,w=new DxfParser,N=w.parseSync(I);E._dxf=N,E._isAc2015="AC1015"===N.header.$ACADVER;var r,J,h,t=E._models={};for(r=0,J=N.entities.length;J>r;r++)h=N.entities[r],E.$4w(t,h,N)},I.prototype.$3w=function(P,l){var U,Y=this;return U=2===l?-(P-Y._shiftY):1===l?P-Y._shiftX:P,U*Y._scale},I.prototype.$2w=function(F,Y){var w,z=this;if(Y.tables&&Y.tables.layer&&(w=Y.tables.layer.layers[F.layer]),!w||w.visible){var S;return F.color!==o?(S=F.color,0===S&&(S=z.options.defaultColor)):w&&(S=w.color),S&&16777215!==S||(S=z.options.defaultColor),"#"+((1<<24)+S).toString(16).slice(1)}}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:this,Object);