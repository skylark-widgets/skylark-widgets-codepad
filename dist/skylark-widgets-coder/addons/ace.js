/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../util","../Coder"],function(e,t,o,a,r){"use strict";class n{constructor(r,n){var i;this.editor={},this.coder=r,n=e.clone(n);var c=r.$container.querySelectorAll(".coder-editor");for(i=0;i<c.length;i++){let r=c[i].querySelector("textarea"),d=t.data(r,"coder-type"),s=t.data(r,"coder-file"),l=document.createElement("div");c[i].appendChild(l),this.editor[d]=o.edit(l);let h=this.editor[d],g=e.clone(n);h.getSession().setMode("ace/mode/"+a.getMode(d,s)),h.getSession().setOptions(g),h.$blockScrolling=1/0}r.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.emit("change",{data:e})}}change(e,t){var o=e.data,a=this.editor[o.type];o.aceEditor||(a.getSession().setValue(o.content),o.aceEditor=a,a.on("change",this.editorChange(o))),o.content=a.getValue()}}return r.plugin("ace",n),n});
//# sourceMappingURL=../sourcemaps/addons/ace.js.map
