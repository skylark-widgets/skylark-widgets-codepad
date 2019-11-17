/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../util","../Coder"],function(e,t,o,r,n){"use strict";class i{constructor(n,i){var a;this.editor={},this.coder=n,i=e.clone(i);var c=n.$container.querySelectorAll(".coder-editor");for(a=0;a<c.length;a++){let n=c[a].querySelector("textarea"),d=t.data(n,"coder-type"),l=t.data(n,"coder-file"),s=document.createElement("div");c[a].appendChild(s),this.editor[d]=o.edit(s);let g=this.editor[d],h=e.clone(i);g.getSession().setMode("ace/mode/"+r.getMode(d,l)),g.getSession().setOptions(h),g.$blockScrolling=1/0}n.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.trigger("change",e)}}change(e,t){var o=this.editor[e.type];e.aceEditor||(o.getSession().setValue(e.content),e.aceEditor=o,o.on("change",this.editorChange(e))),e.content=o.getValue(),t(null,e)}}return n.plugin("ace",i),i});
//# sourceMappingURL=../sourcemaps/addons/ace.js.map
