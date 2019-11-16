/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util","../Coder"],function(e,t){"use strict";class n{constructor(t,n){var c={};!1===(n=e.extend(n,{firstRun:!0})).firstRun&&(c={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}});var i=document.createElement("button");i.className="coder-button coder-button-play",i.innerHTML="Run",t.$container.appendChild(i),i.addEventListener("click",this.run.bind(this)),t.on("change",this.change.bind(this),10),this.cache=c,this.code={},this.coder=t}change(t,n){this.code[t.type]=e.extend(t),void 0!==this.cache[t.type]?(n(null,this.cache[t.type]),this.cache[t.type].forceRender=null):(this.cache[t.type]=e.extend(t),n(null,t))}run(){for(let t in this.code)this.cache[t]=e.extend(this.code[t],{forceRender:!0}),this.coder.trigger("change",this.cache[t])}}return t.plugin("play",n),n});
//# sourceMappingURL=../sourcemaps/addons/play.js.map
