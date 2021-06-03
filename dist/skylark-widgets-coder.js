/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
!function(t,e){var n=e.define,require=e.require,s="function"==typeof n&&n.amd,r=!s&&"undefined"!=typeof exports;if(!s&&!n){var i={};n=e.define=function(t,e,n){"function"==typeof n?(i[t]={factory:n,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var n=e.split("/"),s=t.split("/");n.pop();for(var r=0;r<s.length;r++)"."!=s[r]&&(".."==s[r]?n.pop():n.push(s[r]));return n.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):i[t]={factory:null,resolved:!0,exports:n}},require=e.require=function(t){if(!i.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=i[t];if(!module.resolved){var n=[];module.deps.forEach(function(t){n.push(require(t))}),module.exports=module.factory.apply(e,n)||null,module.resolved=!0}return module.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-widgets-coder/util",["skylark-langx/langx","skylark-net-http/Xhr"],function(t,e){"use strict";function n(t,e,s,r,i){s[t](e,function(t,e,s,r,i){return function(e,a){e&&r.push(e),++t<s.length?n(t,a,s,r,i):i(r,a)}}.apply(this,arguments))}var s={html:"html",css:"css",js:"javascript",less:"less",styl:"stylus",coffee:"coffeescript"};return{fetch:function(t,n){e.get(t).then(function(t){n(null,t)},function(t){n(t)})},seq:function(t,e,s=function(){}){var r=[];if(!t.length)return s(r,e);n(0,e,t,r,s)},log:function(){console.log(arguments)},getMode:function(e="",n="",r={}){var i=t.mixin({},s,r);for(let t in i){let e=t.length;if(n.slice(-e++)==="."+t)return i[t]}for(let t in i)if(e===t)return i[t];return e}}}),t("skylark-widgets-coder/template",[],function(){"use strict";return{container:function(){return'\n    <ul class="coder-nav">\n      <li class="coder-nav-item coder-nav-item-result">\n        <a href="#" data-coder-type="result">\n          Result\n        </a>\n      </li>\n      <li class="coder-nav-item coder-nav-item-html">\n        <a href="#" data-coder-type="html">\n          HTML\n        </a>\n      </li>\n      <li class="coder-nav-item coder-nav-item-css">\n        <a href="#" data-coder-type="css">\n          CSS\n        </a>\n      </li>\n      <li class="coder-nav-item coder-nav-item-js">\n        <a href="#" data-coder-type="js">\n          JavaScript\n        </a>\n      </li>\n    </ul>\n    <div class="coder-pane coder-pane-result"><iframe></iframe></div>\n    <div class="coder-pane coder-pane-html"></div>\n    <div class="coder-pane coder-pane-css"></div>\n    <div class="coder-pane coder-pane-js"></div>\n  '},paneActiveClass:function(t){return`coder-pane-active-${t}`},containerClass:function(){return"coder"},hasFileClass:function(t){return`coder-has-${t}`},editorClass:function(t){return`coder-editor coder-editor-${t}`},editorContent:function(t,e=""){return`\n    <textarea data-coder-type="${t}" data-coder-file="${e}"></textarea>\n    <div class="coder-status"></div>\n  `},statusMessage:function(t){return`\n    <p>${t}</p>\n  `},statusClass:function(t){return`coder-status-${t}`},statusActiveClass:function(t){return`coder-status-active-${t}`},pluginClass:function(t){return`coder-plugin-${t}`},statusLoading:function(t){return`Loading <strong>${t}</strong>..`},statusFetchError:function(t){return`There was an error loading <strong>${t}</strong>.`}}}),t("skylark-widgets-coder/addons",[],function(){return{general:{},html:{},css:{},js:{},edit:{}}}),t("skylark-widgets-coder/Coder",["skylark-langx/skylark","skylark-langx/langx","skylark-widgets-base/Widget","skylark-domx-styler","skylark-domx-data","./util","./template","./addons"],function(t,e,n,s,r,i,a,o){"use strict";class c extends n{get klassName(){return"Coder"}get pluginName(){return"lark.coder"}get options(){return{files:[],showBlank:!1,runScripts:!0,pane:"result",debounce:250,addons:{general:["render"]}}}_init(t,n){var s=this.options;!1===s.runScripts&&s.addons.gerneral.push("scriptless"),super._init();var r={};this._get=function(t){return r[t]},this._set=function(t,e){return r[t]=e,r[t]},this._set("cachedContent",{html:null,css:null,js:null});this.$container=this._elm;var i=this._set("paneActive",s.pane),o=this._velm;o.html(a.container()).addClass(a.containerClass()).addClass(a.paneActiveClass(i)).on("keyup",e.debounce(this.change.bind(this),s.debounce)).on("change",e.debounce(this.change.bind(this),s.debounce)).on("click",this.pane.bind(this)),this._set("$status",{});for(let t of["html","css","js"])this.markup(t)}_startup(){var t=this.options;this.paneActive=this._get("paneActive");for(let t of["html","css","js"])this.load(t);if(t.showBlank)for(let t of["html","css","js"])this._velm.addClass(a.hasFileClass(t))}findFile(t){var e=this.options;for(let n in e.files){let s=e.files[n];if(s.type===t)return s}return{}}markup(t){var e=this._elm,n=e.querySelector(`.coder-pane-${t}`),r=this.findFile(t),i=document.createElement("div");i.innerHTML=a.editorContent(t,r.url),i.className=a.editorClass(t),n.appendChild(i),this._get("$status")[t]=n.querySelector(".coder-status"),void 0===r.url&&void 0===r.content||s.addClass(e,a.hasFileClass(t))}load(t){var e=this.findFile(t),n=this._elm.querySelector(`.coder-pane-${t} textarea`);void 0!==e.content?this.setValue(n,e.content):void 0!==e.url?(this.status("loading",[a.statusLoading(e.url)],{type:t,file:e}),i.fetch(e.url,(e,s)=>{e?this.status("error",[a.statusFetchError(e)],{type:t}):(this.clearStatus("loading",{type:t}),this.setValue(n,s))})):this.setValue(n,"")}setValue(t,e){t.value=e,this.change({target:t})}change(t){var e=r.data(t.target,"coder-type");if(e){var n=this._get("cachedContent");n[e]!==t.target.value&&(n[e]=t.target.value,this.emit("change",{type:e,file:r.data(t.target,"coder-file"),content:n[e]}))}}errors(t,e){this.status("error",t,e)}pane(t){if(r.data(t.target,"coder-type")){var e=this._elm,n=this._get("paneActive");s.removeClass(e,a.paneActiveClass(n)),n=this._set("paneActive",r.data(t.target,"coder-type")),s.addClass(e,a.paneActiveClass(n)),t.preventDefault()}}status(t="error",e=[],n={}){if(!e.length)return this.clearStatus(t,n);var r=this._get("$status");s.addClass(r[n.type],a.statusClass(t)),s.addClass(this._elm,a.statusActiveClass(n.type));var i="";e.forEach(function(t){i+=a.statusMessage(t)}),r[n.type].innerHTML=i}clearStatus(t,e){var n=this._get("$status");s.removeClass(n[e.type],a.statusClass(t)),s.removeClass(this._elm,a.statusActiveClass(e.type)),n[e.type].innerHTML=""}}return c.addons=o,t.attach("widgets.Coder",c)}),t("skylark-widgets-base/Addon",["skylark-langx/langx","skylark-langx/Evented","./base"],function(t,e,n){var s=e.inherit({_construct:function(e,n){this._widget=e,Object.defineProperty(this,"options",{value:t.mixin({},this.options,n,!0)}),this._init&&this._init()}});return s.register=function(t){var e=this.categoryName,n=this.addonName;e&&n&&(t.addons=t.addons||{},t.addons[e]=t.addons[e]||{},t.addons[e][n]=this)},n.Addon=s}),t("skylark-widgets-coder/Addon",["skylark-domx-styler","skylark-widgets-base/Addon"],function(t,e){return class extends e{_init(){this.coder=this._widget,this.options.pluginCssClass=this.options.pluginClass||"coder-plugin-"+this.constructor.addonName,this.options.pluginCssClass&&t.addClass(this._widget._elm,this.options.pluginCssClass)}}}),t("skylark-widgets-coder/addons/edit/codemirror",["skylark-langx/langx","skylark-domx-data","skylark-codemirror/CodeMirror","../../Addon","../../util","../../Coder"],function(t,e,n,s,r,i){"use strict";class a extends s{get options(){return{lineNumbers:!0,pluginCssClass:"coder-plugin-codemirror"}}_init(){super._init();var t,s=this.coder,i=this.options;this.editor={};var a={html:"htmlmixed"},i=this.options,o=s.$container.querySelectorAll(".coder-editor");for(t=0;t<o.length;t++){let s=o[t].querySelector("textarea"),c=e.data(s,"coder-type"),d=e.data(s,"coder-file");this.editor[c]=n.fromTextArea(s,i),this.editor[c].setOption("mode",r.getMode(c,d,a))}s.on("change",this.change.bind(this),1)}editorChange(t){return()=>{var e=this.editor[t.type];t.content=e.getValue(),this.coder.emit("change",t)}}change(t,e){var n=t.data,s=this.editor[n.type];n.cmEditor||(s.setValue(n.content),n.cmEditor=s,s.on("change",this.editorChange(n)))}static get categoryName(){return"edit"}static get addonName(){return"codemirror"}}return a.register(i),a}),t("skylark-widgets-coder/addons/edit/ace",["skylark-langx/langx","skylark-domx-data","skylark-ace","../../Addon","../../util","../../Coder"],function(t,e,n,s,r,i){"use strict";class a extends s{_init(){super._init();var s,i=this.coder,a=this.options;this.editor={};var a=this.options,o=i.$container.querySelectorAll(".coder-editor");for(s=0;s<o.length;s++){let i=o[s].querySelector("textarea"),c=e.data(i,"coder-type"),d=e.data(i,"coder-file"),l=document.createElement("div");o[s].appendChild(l),this.editor[c]=n.edit(l);let u=this.editor[c],h=t.clone(a);u.getSession().setMode("ace/mode/"+r.getMode(c,d)),u.getSession().setOptions(h),u.$blockScrolling=1/0}i.on("change",this.change.bind(this),1)}editorChange(t){return()=>{var e=this.editor[t.type];t.content=e.getValue(),this.coder.emit("change",t)}}change(t,e){var n=t.data,s=this.editor[n.type];n.aceEditor||(s.getSession().setValue(n.content),n.aceEditor=s,s.on("change",this.editorChange(n)))}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return a.register(i),a}),t("skylark-widgets-coder/addons/general/console",["skylark-langx/langx","skylark-domx-styler","../../Addon","../../util","../../Coder"],function(t,e,n,s,r){"use strict";class i extends n{get options(){return{autoClear:!1}}_init(){super._init();var t=this.coder,n=this.options,s=`(function ${this.capture.toString()})();`,r=document.createElement("li");e.addClass(r,"coder-nav-item coder-nav-item-console"),r.innerHTML='<a href="#" data-coder-type="console">JS Console</a>';var i=document.createElement("div");e.addClass(i,"coder-pane coder-pane-console"),i.innerHTML='\n              <div class="coder-console-container">\n                <ul class="coder-console-output"></ul>\n                <form class="coder-console-input">\n                  <input type="text">\n                </form>\n              </div>\n              <button class="coder-button coder-console-clear">Clear</button>\n            ',t._velm.append(i),t._velm.find(".coder-nav").append(r);var a=t.$container.querySelector(".coder-console-container"),o=t.$container.querySelector(".coder-console-output"),c=t.$container.querySelector(".coder-console-input input"),d=t.$container.querySelector(".coder-console-input"),l=t.$container.querySelector(".coder-console-clear");d.addEventListener("submit",this.submit.bind(this)),c.addEventListener("keydown",this.history.bind(this)),l.addEventListener("click",this.clear.bind(this)),!0===n.autoClear&&t.on("change",this.autoClear.bind(this),29),t.on("change",this.change.bind(this),30),window.addEventListener("message",this.getMessage.bind(this)),this.$coderContainer=t.$container,this.$container=a,this.$input=c,this.$output=o,this.history=[],this.historyIndex=0,this.logCaptureSnippet=s,this.contentCache={html:"",css:"",js:""},this.getIframe=this.getIframe.bind(this)}getIframe(){return this.$coderContainer.querySelector(".coder-pane-result iframe")}getMessage(t){if(t.source===this.getIframe().contentWindow){var e={};try{e=JSON.parse(t.data)}catch(t){}"coder-console-log"===e.type&&this.log(e.message)}}autoClear(t,e){var n=t.content;"js"===t.type&&(n=n.replace(this.logCaptureSnippet,"")),!0!==t.forceRender&&this.contentCache[t.type]===n||this.clear(),this.contentCache[t.type]=n}change(t){var e=t.data;"js"===e.type&&-1===e.content.indexOf(this.logCaptureSnippet)&&(e.content=`${this.logCaptureSnippet}${e.content}`)}capture(){void 0!==window.console&&void 0!==window.console.log||(window.console={log:function(){}});var t=Function.prototype.bind.call(window.console.log,window.console);window.console.log=function(){[].slice.call(arguments).forEach(function(t){window.parent.postMessage(JSON.stringify({type:"coder-console-log",message:t}),"*")}),t.apply(t,arguments)}}log(t="",n){var s=document.createElement("li");e.addClass(s,"coder-console-log"),void 0!==n&&e.addClass(s,`coder-console-log-${n}`),s.innerHTML=t,this.$output.appendChild(s)}submit(t){var e=this.$input.value.trim();if(""===e)return t.preventDefault();this.history.push(e),this.historyIndex=this.history.length,this.log(e,"history"),0!==e.indexOf("return")&&(e="return "+e);try{var n=this.getIframe().contentWindow.eval(`(function() {${e}})()`);this.log(n)}catch(t){this.log(t,"error")}this.$input.value="",this.$container.scrollTop=this.$container.scrollHeight,t.preventDefault()}clear(){this.$output.innerHTML=""}history(t){var e=!1,n=this.$input.selectionStart;38===t.keyCode&&0!==this.historyIndex&&0===n&&(this.historyIndex--,e=!0),40===t.keyCode&&this.historyIndex!==this.history.length-1&&n===this.$input.value.length&&(this.historyIndex++,e=!0),e&&(this.$input.value=this.history[this.historyIndex])}static get categoryName(){return"general"}static get addonName(){return"console"}}return i.register(r),i}),t("skylark-widgets-coder/addons/general/play",["skylark-langx/langx","../../Addon","../../util","../../Coder"],function(t,e,n,s){class r extends e{get options(){return{firstRun:!0}}_init(){super._init();var t=this.coder,e=this.options,n={};!1===e.firstRun&&(n={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}});var s=document.createElement("button");s.className="coder-button coder-button-play",s.innerHTML="Run",t.$container.appendChild(s),s.addEventListener("click",this.run.bind(this)),t.on("change",this.change.bind(this),10),this.cache=n,this.code={},this.coder=t}change(e){var n=e.data;this.code[n.type]=t.clone(n),void 0!==this.cache[n.type]?this.cache[n.type].forceRender=null:this.cache[n.type]=t.clone(n)}run(){for(let e in this.code)this.cache[e]=t.mixin({forceRender:!0},this.code[e]),this.coder.emit("change",this.cache[e])}static get categoryName(){return"general"}static get addonName(){return"play"}}return r.register(s),r}),t("skylark-widgets-coder/addons/general/render",["skylark-langx/langx","../../Addon","../../util","../../Coder"],function(t,e,n,s){"use strict";class r extends e{_init(){super._init();var t=this.coder,e=(this.options,!!("srcdoc"in document.createElement("iframe"))),n=t.$container.querySelector(".coder-pane-result iframe");window.addEventListener("message",this.domready.bind(this)),t.on("change",this.change.bind(this),100),this.supportSrcdoc=e,this.content={html:"",css:"",js:""},this.frameContent="",this.$resultFrame=n,this.callbacks=[],this.index=0,this.lastCallback=(()=>{})}template(t="",e="",n=""){return`\n      <!doctype html>\n      <html>\n        <head>\n          <script>\n            (function () {\n              window.addEventListener('DOMContentLoaded', function () {\n                window.parent.postMessage(JSON.stringify({\n                  type: 'coder-dom-ready'\n                }), '*')\n              })\n            }())\n          <\/script>\n\n          <style>${t}</style>\n        </head>\n        <body>\n          ${e}\n\n          \x3c!--\n            Coder:\n            Empty script tag prevents malformed HTML from breaking the next script.\n          --\x3e\n          <script><\/script>\n          <script>${n}<\/script>\n        </body>\n      </html>\n    `}change(t){var e=t.data;this.content[e.type]=e.content;var n=this.frameContent;if(this.frameContent=this.template(this.content.css,this.content.html,this.content.js),this.lastCallback=(()=>{this.lastCallback=(()=>{})}),!0===e.forceRender||this.frameContent!==n)if(this.supportSrcdoc){var s=document.createElement("iframe");this.$resultFrame.parentNode.replaceChild(s,this.$resultFrame),this.$resultFrame=s,this.$resultFrame.contentWindow.document.open(),this.$resultFrame.contentWindow.document.write(this.frameContent),this.$resultFrame.contentWindow.document.close()}else{this.$resultFrame.setAttribute("data-srcdoc",this.frameContent);var r='javascript:window.frameElement.getAttribute("data-srcdoc");';this.$resultFrame.setAttribute("src",r),this.$resultFrame.contentWindow&&(this.$resultFrame.contentWindow.location=r)}}domready(t){if(t.source===this.$resultFrame.contentWindow){var e={};try{e=JSON.parse(t.data)}catch(t){}"coder-dom-ready"===e.type&&this.lastCallback()}}static get categoryName(){return"general"}static get addonName(){return"render"}}return r.register(s),r}),t("skylark-widgets-coder/main",["./Coder","./addons/edit/codemirror","./addons/edit/ace","./addons/general/console","./addons/general/play","./addons/general/render"],function(t){return t}),t("skylark-widgets-coder",["skylark-widgets-coder/main"],function(t){return t})}(n),!s){var a=require("skylark-langx-ns");r?module.exports=a:e.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-widgets-coder.js.map
