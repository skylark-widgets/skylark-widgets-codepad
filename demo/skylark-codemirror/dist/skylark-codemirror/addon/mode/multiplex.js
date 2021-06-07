/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror"],function(e){"use strict";e.multiplexingMode=function(n){var t=Array.prototype.slice.call(arguments,1);function i(e,n,t,i){if("string"==typeof n){var r=e.indexOf(n,t);return i&&r>-1?r+n.length:r}var o=n.exec(t?e.slice(t):e);return o?o.index+t+(i?o[0].length:0):-1}return{startState:function(){return{outer:e.startState(n),innerActive:null,inner:null}},copyState:function(t){return{outer:e.copyState(n,t.outer),innerActive:t.innerActive,inner:t.innerActive&&e.copyState(t.innerActive.mode,t.inner)}},token:function(r,o){if(o.innerActive){var l=o.innerActive;a=r.string;if(!l.close&&r.sol())return o.innerActive=o.inner=null,this.token(r,o);if((v=l.close?i(a,l.close,r.pos,l.parseDelimiters):-1)==r.pos&&!l.parseDelimiters)return r.match(l.close),o.innerActive=o.inner=null,l.delimStyle&&l.delimStyle+" "+l.delimStyle+"-close";v>-1&&(r.string=a.slice(0,v));var c=l.mode.token(r,o.inner);return v>-1&&(r.string=a),v==r.pos&&l.parseDelimiters&&(o.innerActive=o.inner=null),l.innerStyle&&(c=c?c+" "+l.innerStyle:l.innerStyle),c}for(var s=1/0,a=r.string,u=0;u<t.length;++u){var v,d=t[u];if((v=i(a,d.open,r.pos))==r.pos){d.parseDelimiters||r.match(d.open),o.innerActive=d;var A=0;if(n.indent){var m=n.indent(o.outer,"","");m!==e.Pass&&(A=m)}return o.inner=e.startState(d.mode,A),d.delimStyle&&d.delimStyle+" "+d.delimStyle+"-open"}-1!=v&&v<s&&(s=v)}s!=1/0&&(r.string=a.slice(0,s));var f=n.token(r,o.outer);return s!=1/0&&(r.string=a),f},indent:function(t,i,r){var o=t.innerActive?t.innerActive.mode:n;return o.indent?o.indent(t.innerActive?t.inner:t.outer,i,r):e.Pass},blankLine:function(i){var r=i.innerActive?i.innerActive.mode:n;if(r.blankLine&&r.blankLine(i.innerActive?i.inner:i.outer),i.innerActive)"\n"===i.innerActive.close&&(i.innerActive=i.inner=null);else for(var o=0;o<t.length;++o){var l=t[o];"\n"===l.open&&(i.innerActive=l,i.inner=e.startState(l.mode,r.indent?r.indent(i.outer,"",""):0))}},electricChars:n.electricChars,innerMode:function(e){return e.inner?{state:e.inner,mode:e.innerActive.mode}:{state:e.outer,mode:n}}}}});
//# sourceMappingURL=../../sourcemaps/addon/mode/multiplex.js.map