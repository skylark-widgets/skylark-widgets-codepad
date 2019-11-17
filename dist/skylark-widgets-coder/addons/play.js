/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,t,n){"use strict";class c{constructor(t,n){var c={};!1===(n=e.mixin({firstRun:!0},n)).firstRun&&(c={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}});var i=document.createElement("button");i.className="coder-button coder-button-play",i.innerHTML="Run",t.$container.appendChild(i),i.addEventListener("click",this.run.bind(this)),t.on("change",this.change.bind(this),10),this.cache=c,this.code={},this.coder=t}change(t,n){this.code[t.type]=e.clone(t),void 0!==this.cache[t.type]?(n(null,this.cache[t.type]),this.cache[t.type].forceRender=null):(this.cache[t.type]=e.clone(t),n(null,t))}run(){for(let t in this.code)this.cache[t]=e.mixin({forceRender:!0},this.code[t]),this.coder.trigger("change",this.cache[t])}}return n.plugin("play",c),c});
//# sourceMappingURL=../sourcemaps/addons/play.js.map
