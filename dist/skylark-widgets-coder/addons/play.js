/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,t,c){"use strict";class n{constructor(t,c){var n={};!1===(c=e.mixin({firstRun:!0},c)).firstRun&&(n={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}});var i=document.createElement("button");i.className="coder-button coder-button-play",i.innerHTML="Run",t.$container.appendChild(i),i.addEventListener("click",this.run.bind(this)),t.on("change",this.change.bind(this),10),this.cache=n,this.code={},this.coder=t}change(t){var c=t.data;this.code[c.type]=e.clone(c),void 0!==this.cache[c.type]?(callback(null,this.cache[c.type]),this.cache[c.type].forceRender=null):this.cache[c.type]=e.clone(c)}run(){for(let t in this.code)this.cache[t]=e.mixin({forceRender:!0},this.code[t]),this.coder.emit("change",this.cache[t])}}return c.plugin("play",n),n});
//# sourceMappingURL=../sourcemaps/addons/play.js.map
