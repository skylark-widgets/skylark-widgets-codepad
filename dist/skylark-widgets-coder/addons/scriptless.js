/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(t,e,a){"use strict";return class{constructor(e,a){a=t.extend(a);e.on("change",this.change.bind(this)),this.runScriptTypes=["application/javascript","application/ecmascript","application/x-ecmascript","application/x-javascript","text/ecmascript","text/javascript","text/javascript1.0","text/javascript1.1","text/javascript1.2","text/javascript1.3","text/javascript1.4","text/javascript1.5","text/jscript","text/livescript","text/x-ecmascript","text/x-javascript"]}change(t){var e=t.data;if("html"===e.type){var a=document.createElement("div");a.innerHTML=e.content;var i=null,c=a.querySelectorAll("script");for(let t=0;t<c.length;t++)(i=c[t].getAttribute("type"))&&-1===this.runScriptTypes.indexOf(i)||c[t].parentNode.removeChild(c[t]);e.content=a.innerHTML}}}});
//# sourceMappingURL=../sourcemaps/addons/scriptless.js.map
