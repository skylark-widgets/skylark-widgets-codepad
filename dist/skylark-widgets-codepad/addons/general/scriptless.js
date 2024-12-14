/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","../../addon","../../util","../../codepad"],function(t,e,i,a){"use strict";class r extends e{_init(){super._init();var t=this.coder;this.options;this.listenTo(t,"changed",this.update),this.runScriptTypes=["application/javascript","application/ecmascript","application/x-ecmascript","application/x-javascript","text/ecmascript","text/javascript","text/javascript1.0","text/javascript1.1","text/javascript1.2","text/javascript1.3","text/javascript1.4","text/javascript1.5","text/jscript","text/livescript","text/x-ecmascript","text/x-javascript"]}update(t){t=t.data;if("html"===t.type){var e,i=document.createElement("div"),a=(i.innerHTML=t.content,i.querySelectorAll("script"));for(let t=0;t<a.length;t++)(e=a[t].getAttribute("type"))&&-1===this.runScriptTypes.indexOf(e)||a[t].parentNode.removeChild(a[t]);t.content=i.innerHTML}}static get categoryName(){return"general"}static get addonName(){return"scriptless"}}return r.register(a),r});
//# sourceMappingURL=../../sourcemaps/addons/general/scriptless.js.map
