/**
 * skylark-codemirror - A version of codemirror 5.45  that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror/
 * @license MIT
 */
define(["../../CodeMirror"],function(t){"use strict";var e=t.Pos;function r(t,e,r){return r?t.indexOf(e)>=0:0==t.lastIndexOf(e,0)}t.registerHelper("hint","xml",function(s,n){var a=n&&n.schemaInfo,i=n&&n.quoteChar||'"',o=n&&n.matchInMiddle;if(a){var g=s.getCursor(),l=s.getTokenAt(g);l.end>g.ch&&(l.end=g.ch,l.string=l.string.slice(0,g.ch-l.start));var h=t.innerMode(s.getMode(),l.state);if("xml"==h.mode.name){var c,f,p=[],u=!1,v=/\btag\b/.test(l.type)&&!/>$/.test(l.string),m=v&&/^\w/.test(l.string);if(m){var d=s.getLine(g.line).slice(Math.max(0,l.start-2),l.start),y=/<\/$/.test(d)?"close":/<$/.test(d)?"open":null;y&&(f=l.start-("close"==y?2:1))}else v&&"<"==l.string?y="open":v&&"</"==l.string&&(y="close");if(!v&&!h.state.tagName||y){m&&(c=l.string),u=y;var x=h.state.context,O=x&&a[x.tagName],w=x?O&&O.children:a["!top"];if(w&&"close"!=y)for(var M=0;M<w.length;++M)c&&!r(w[M],c,o)||p.push("<"+w[M]);else if("close"!=y)for(var P in a)!a.hasOwnProperty(P)||"!top"==P||"!attrs"==P||c&&!r(P,c,o)||p.push("<"+P);x&&(!c||"close"==y&&r(x.tagName,c,o))&&p.push("</"+x.tagName+">")}else{var A=(O=a[h.state.tagName])&&O.attrs,N=a["!attrs"];if(!A&&!N)return;if(A){if(N){var b={};for(var $ in N)N.hasOwnProperty($)&&(b[$]=N[$]);for(var $ in A)A.hasOwnProperty($)&&(b[$]=A[$]);A=b}}else A=N;if("string"==l.type||"="==l.string){var C,I=(d=s.getRange(e(g.line,Math.max(0,g.ch-60)),e(g.line,"string"==l.type?l.start:l.end))).match(/([^\s\u00a0=<>\"\']+)=$/);if(!I||!A.hasOwnProperty(I[1])||!(C=A[I[1]]))return;if("function"==typeof C&&(C=C.call(this,s)),"string"==l.type){c=l.string;var k=0;/['"]/.test(l.string.charAt(0))&&(i=l.string.charAt(0),c=l.string.slice(1),k++);var q=l.string.length;/['"]/.test(l.string.charAt(q-1))&&(i=l.string.charAt(q-1),c=l.string.substr(k,q-2)),u=!0}for(M=0;M<C.length;++M)c&&!r(C[M],c,o)||p.push(i+C[M]+i)}else for(var H in"attribute"==l.type&&(c=l.string,u=!0),A)!A.hasOwnProperty(H)||c&&!r(H,c,o)||p.push(H)}return{list:p,from:u?e(g.line,null==f?l.start:f):g,to:u?e(g.line,l.end):g}}}})});
//# sourceMappingURL=../../sourcemaps/addon/hint/xml-hint.js.map