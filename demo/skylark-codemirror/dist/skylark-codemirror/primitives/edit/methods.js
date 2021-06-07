/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["./deleteNearSelection","./commands","../model/document_data","../util/dom","../util/event","../line/highlight","../input/indent","../input/input","./key_events","./mouse_events","../input/keymap","../input/movement","../display/operations","../line/pos","../measurement/position_measurement","../model/selection","../model/selection_updates","../display/scrolling","../line/spans","../display/update_display","../util/misc","../util/operation_group","../line/utils_line","../display/view_tracking","../display/highlight_worker","../display/line_numbers","../display/scrollbars"],function(t,e,i,o,s,r,n,l,h,a,d,c,p,u,f,g,m,y,w,v,O,b,C,S,H,k,L){"use strict";function W(t,e,i,o,s){let r=e,n=i,l=C.getLine(t,e.line);function h(o){let r;if(null==(r=s?c.moveVisually(t.cm,l,e,i):c.moveLogically(l,e,i))){if(o||!function(){let o=e.line+i;return!(o<t.first||o>=t.first+t.size)&&(e=new u.Pos(o,e.ch,e.sticky),l=C.getLine(t,o))}())return!1;e=c.endOfLine(s,t.cm,l,e.line,i)}else e=r;return!0}if("char"==o)h();else if("column"==o)h(!0);else if("word"==o||"group"==o){let s=null,r="group"==o,n=t.cm&&t.cm.getHelper(e,"wordChars");for(let t=!0;!(i<0)||h(!t);t=!1){let o=l.text.charAt(e.ch)||"\n",a=O.isWordChar(o,n)?"w":r&&"\n"==o?"n":!r||/\s/.test(o)?null:"p";if(!r||t||a||(a="s"),s&&s!=a){i<0&&(i=1,h(),e.sticky="after");break}if(a&&(s=a),i>0&&!h(!t))break}}let a=m.skipAtomic(t,e,r,n,!0);return u.equalCursorPos(r,a)&&(a.hitSide=!0),a}function T(t,e,i,o){let s,r,n=t.doc,l=e.left;if("page"==o){let o=Math.min(t.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),r=Math.max(o-.5*f.textHeight(t.display),3);s=(i>0?e.bottom:e.top)+i*r}else"line"==o&&(s=i>0?e.bottom+3:e.top-3);for(;(r=f.coordsChar(t,l,s)).outside;){if(i<0?s<=0:s>=n.height){r.hitSide=!0;break}s+=5*i}return r}return function(c){let x=c.optionHandlers,M=c.helpers={};c.prototype={constructor:c,focus:function(){window.focus(),this.display.input.focus()},setOption:function(t,e){let i=this.options,o=i[t];i[t]==e&&"mode"!=t||(i[t]=e,x.hasOwnProperty(t)&&p.operation(this,x[t])(this,e,o),s.signal(this,"optionChange",this,t))},getOption:function(t){return this.options[t]},getDoc:function(){return this.doc},addKeyMap:function(t,e){this.state.keyMaps[e?"push":"unshift"](d.getKeyMap(t))},removeKeyMap:function(t){let e=this.state.keyMaps;for(let i=0;i<e.length;++i)if(e[i]==t||e[i].name==t)return e.splice(i,1),!0},addOverlay:p.methodOp(function(t,e){let i=t.token?t:c.getMode(this.options,t);if(i.startState)throw new Error("Overlays may not be stateful.");O.insertSorted(this.state.overlays,{mode:i,modeSpec:t,opaque:e&&e.opaque,priority:e&&e.priority||0},t=>t.priority),this.state.modeGen++,S.regChange(this)}),removeOverlay:p.methodOp(function(t){let e=this.state.overlays;for(let i=0;i<e.length;++i){let o=e[i].modeSpec;if(o==t||"string"==typeof t&&o.name==t)return e.splice(i,1),this.state.modeGen++,void S.regChange(this)}}),indentLine:p.methodOp(function(t,e,i){"string"!=typeof e&&"number"!=typeof e&&(e=null==e?this.options.smartIndent?"smart":"prev":e?"add":"subtract"),C.isLine(this.doc,t)&&n.indentLine(this,t,e,i)}),indentSelection:p.methodOp(function(t){let e=this.doc.sel.ranges,i=-1;for(let o=0;o<e.length;o++){let s=e[o];if(s.empty())s.head.line>i&&(n.indentLine(this,s.head.line,t,!0),i=s.head.line,o==this.doc.sel.primIndex&&y.ensureCursorVisible(this));else{let r=s.from(),l=s.to(),h=Math.max(i,r.line);i=Math.min(this.lastLine(),l.line-(l.ch?0:1))+1;for(let e=h;e<i;++e)n.indentLine(this,e,t);let a=this.doc.sel.ranges;0==r.ch&&e.length==a.length&&a[o].from().ch>0&&m.replaceOneSelection(this.doc,o,new g.Range(r,a[o].to()),O.sel_dontScroll)}}}),getTokenAt:function(t,e){return r.takeToken(this,t,e)},getLineTokens:function(t,e){return r.takeToken(this,u.Pos(t),e,!0)},getTokenTypeAt:function(t){t=u.clipPos(this.doc,t);let e,i=r.getLineStyles(this,C.getLine(this.doc,t.line)),o=0,s=(i.length-1)/2,n=t.ch;if(0==n)e=i[2];else for(;;){let t=o+s>>1;if((t?i[2*t-1]:0)>=n)s=t;else{if(!(i[2*t+1]<n)){e=i[2*t+2];break}o=t+1}}let l=e?e.indexOf("overlay "):-1;return l<0?e:0==l?null:e.slice(0,l-1)},getModeAt:function(t){let e=this.doc.mode;return e.innerMode?c.innerMode(e,this.getTokenAt(t).state).mode:e},getHelper:function(t,e){return this.getHelpers(t,e)[0]},getHelpers:function(t,e){let i=[];if(!M.hasOwnProperty(e))return i;let o=M[e],s=this.getModeAt(t);if("string"==typeof s[e])o[s[e]]&&i.push(o[s[e]]);else if(s[e])for(let t=0;t<s[e].length;t++){let r=o[s[e][t]];r&&i.push(r)}else s.helperType&&o[s.helperType]?i.push(o[s.helperType]):o[s.name]&&i.push(o[s.name]);for(let t=0;t<o._global.length;t++){let e=o._global[t];e.pred(s,this)&&-1==O.indexOf(i,e.val)&&i.push(e.val)}return i},getStateAfter:function(t,e){let i=this.doc;return t=u.clipLine(i,null==t?i.first+i.size-1:t),r.getContextBefore(this,t+1,e).state},cursorCoords:function(t,e){let i,o=this.doc.sel.primary();return i=null==t?o.head:"object"==typeof t?u.clipPos(this.doc,t):t?o.from():o.to(),f.cursorCoords(this,i,e||"page")},charCoords:function(t,e){return f.charCoords(this,u.clipPos(this.doc,t),e||"page")},coordsChar:function(t,e){return t=f.fromCoordSystem(this,t,e||"page"),f.coordsChar(this,t.left,t.top)},lineAtHeight:function(t,e){return t=f.fromCoordSystem(this,{top:t,left:0},e||"page").top,C.lineAtHeight(this.doc,t+this.display.viewOffset)},heightAtLine:function(t,e,i){let o,s=!1;if("number"==typeof t){let e=this.doc.first+this.doc.size-1;t<this.doc.first?t=this.doc.first:t>e&&(t=e,s=!0),o=C.getLine(this.doc,t)}else o=t;return f.intoCoordSystem(this,o,{top:0,left:0},e||"page",i||s).top+(s?this.doc.height-w.heightAtLine(o):0)},defaultTextHeight:function(){return f.textHeight(this.display)},defaultCharWidth:function(){return f.charWidth(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(t,e,i,o,s){let r=this.display,n=(t=f.cursorCoords(this,u.clipPos(this.doc,t))).bottom,l=t.left;if(e.style.position="absolute",e.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(e),r.sizer.appendChild(e),"over"==o)n=t.top;else if("above"==o||"near"==o){let i=Math.max(r.wrapper.clientHeight,this.doc.height),s=Math.max(r.sizer.clientWidth,r.lineSpace.clientWidth);("above"==o||t.bottom+e.offsetHeight>i)&&t.top>e.offsetHeight?n=t.top-e.offsetHeight:t.bottom+e.offsetHeight<=i&&(n=t.bottom),l+e.offsetWidth>s&&(l=s-e.offsetWidth)}e.style.top=n+"px",e.style.left=e.style.right="","right"==s?(l=r.sizer.clientWidth-e.offsetWidth,e.style.right="0px"):("left"==s?l=0:"middle"==s&&(l=(r.sizer.clientWidth-e.offsetWidth)/2),e.style.left=l+"px"),i&&y.scrollIntoView(this,{left:l,top:n,right:l+e.offsetWidth,bottom:n+e.offsetHeight})},triggerOnKeyDown:p.methodOp(h.onKeyDown),triggerOnKeyPress:p.methodOp(h.onKeyPress),triggerOnKeyUp:h.onKeyUp,triggerOnMouseDown:p.methodOp(a.onMouseDown),execCommand:function(t){if(e.commands.hasOwnProperty(t))return e.commands[t].call(null,this)},triggerElectric:p.methodOp(function(t){l.triggerElectric(this,t)}),findPosH:function(t,e,i,o){let s=1;e<0&&(s=-1,e=-e);let r=u.clipPos(this.doc,t);for(let t=0;t<e&&!(r=W(this.doc,r,s,i,o)).hitSide;++t);return r},moveH:p.methodOp(function(t,e){this.extendSelectionsBy(i=>this.display.shift||this.doc.extend||i.empty()?W(this.doc,i.head,t,e,this.options.rtlMoveVisually):t<0?i.from():i.to(),O.sel_move)}),deleteH:p.methodOp(function(e,i){let o=this.doc.sel,s=this.doc;o.somethingSelected()?s.replaceSelection("",null,"+delete"):t.deleteNearSelection(this,t=>{let o=W(s,t.head,e,i,!1);return e<0?{from:o,to:t.head}:{from:t.head,to:o}})}),findPosV:function(t,e,i,o){let s=1,r=o;e<0&&(s=-1,e=-e);let n=u.clipPos(this.doc,t);for(let t=0;t<e;++t){let t=f.cursorCoords(this,n,"div");if(null==r?r=t.left:t.left=r,(n=T(this,t,s,i)).hitSide)break}return n},moveV:p.methodOp(function(t,e){let i=this.doc,o=[],s=!this.display.shift&&!i.extend&&i.sel.somethingSelected();if(i.extendSelectionsBy(r=>{if(s)return t<0?r.from():r.to();let n=f.cursorCoords(this,r.head,"div");null!=r.goalColumn&&(n.left=r.goalColumn),o.push(n.left);let l=T(this,n,t,e);return"page"==e&&r==i.sel.primary()&&y.addToScrollTop(this,f.charCoords(this,l,"div").top-n.top),l},O.sel_move),o.length)for(let t=0;t<i.sel.ranges.length;t++)i.sel.ranges[t].goalColumn=o[t]}),findWordAt:function(t){let e=this.doc,i=C.getLine(e,t.line).text,o=t.ch,s=t.ch;if(i){let e=this.getHelper(t,"wordChars");"before"!=t.sticky&&s!=i.length||!o?++s:--o;let r=i.charAt(o),n=O.isWordChar(r,e)?t=>O.isWordChar(t,e):/\s/.test(r)?t=>/\s/.test(t):t=>!/\s/.test(t)&&!O.isWordChar(t);for(;o>0&&n(i.charAt(o-1));)--o;for(;s<i.length&&n(i.charAt(s));)++s}return new g.Range(u.Pos(t.line,o),u.Pos(t.line,s))},toggleOverwrite:function(t){null!=t&&t==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?o.addClass(this.display.cursorDiv,"CodeMirror-overwrite"):o.rmClass(this.display.cursorDiv,"CodeMirror-overwrite"),s.signal(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==o.activeElt()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:p.methodOp(function(t,e){y.scrollToCoords(this,t,e)}),getScrollInfo:function(){let t=this.display.scroller;return{left:t.scrollLeft,top:t.scrollTop,height:t.scrollHeight-f.scrollGap(this)-this.display.barHeight,width:t.scrollWidth-f.scrollGap(this)-this.display.barWidth,clientHeight:f.displayHeight(this),clientWidth:f.displayWidth(this)}},scrollIntoView:p.methodOp(function(t,e){null==t?(t={from:this.doc.sel.primary().head,to:null},null==e&&(e=this.options.cursorScrollMargin)):"number"==typeof t?t={from:u.Pos(t,0),to:null}:null==t.from&&(t={from:t,to:null}),t.to||(t.to=t.from),t.margin=e||0,null!=t.from.line?y.scrollToRange(this,t):y.scrollToCoordsRange(this,t.from,t.to,t.margin)}),setSize:p.methodOp(function(t,e){let i=t=>"number"==typeof t||/^\d+$/.test(String(t))?t+"px":t;null!=t&&(this.display.wrapper.style.width=i(t)),null!=e&&(this.display.wrapper.style.height=i(e)),this.options.lineWrapping&&f.clearLineMeasurementCache(this);let o=this.display.viewFrom;this.doc.iter(o,this.display.viewTo,t=>{if(t.widgets)for(let e=0;e<t.widgets.length;e++)if(t.widgets[e].noHScroll){S.regLineChange(this,o,"widget");break}++o}),this.curOp.forceUpdate=!0,s.signal(this,"refresh",this)}),operation:function(t){return p.runInOp(this,t)},startOperation:function(){return p.startOperation(this)},endOperation:function(){return p.endOperation(this)},refresh:p.methodOp(function(){let t=this.display.cachedTextHeight;S.regChange(this),this.curOp.forceUpdate=!0,f.clearCaches(this),y.scrollToCoords(this,this.doc.scrollLeft,this.doc.scrollTop),v.updateGutterSpace(this),(null==t||Math.abs(t-f.textHeight(this.display))>.5)&&f.estimateLineHeights(this),s.signal(this,"refresh",this)}),swapDoc:p.methodOp(function(t){let e=this.doc;return e.cm=null,i.attachDoc(this,t),f.clearCaches(this),this.display.input.reset(),y.scrollToCoords(this,t.scrollLeft,t.scrollTop),this.curOp.forceScroll=!0,b.signalLater(this,"swapDoc",this,e),e}),phrase:function(t){let e=this.options.phrases;return e&&Object.prototype.hasOwnProperty.call(e,t)?e[t]:t},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters},startWorker:function(t){return H.startWorker(this,t)},maybeUpdateLineNumberWidth:function(){return k.maybeUpdateLineNumberWidth(this)},measureForScrollbars:function(){return L.measureForScrollbars(this)},updateScrollbars:function(t){return L.updateScrollbars(this,t)}},s.eventMixin(c),c.registerHelper=function(t,e,i){M.hasOwnProperty(t)||(M[t]=c[t]={_global:[]}),M[t][e]=i},c.registerGlobalHelper=function(t,e,i,o){c.registerHelper(t,e,o),M[t]._global.push({pred:i,val:o})}}});
//# sourceMappingURL=../../sourcemaps/primitives/edit/methods.js.map