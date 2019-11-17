/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../../Addon","../../util","../../addons"],function(e,t,a,i,n,o){"use strict";class r extends a{_init(){super._init();var a,o=this.coder,r=this.options;this.editor={};r=this.options;var d=o.$container.querySelectorAll(".coder-editor");for(a=0;a<d.length;a++){let o=d[a].querySelector("textarea"),s=t.data(o,"coder-type"),c=t.data(o,"coder-file"),l=document.createElement("div");d[a].appendChild(l),this.editor[s]=i.edit(l);let h=this.editor[s],g=e.clone(r);h.getSession().setMode("ace/mode/"+n.getMode(s,c)),h.getSession().setOptions(g),h.$blockScrolling=1/0}o.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.emit("change",{data:e})}}change(e,t){var a=e.data,i=this.editor[a.type];a.aceEditor||(i.getSession().setValue(a.content),a.aceEditor=i,i.on("change",this.editorChange(a))),a.content=i.getValue()}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return o.edit.ace=r,r});
//# sourceMappingURL=../../sourcemaps/addons/edit/ace.js.map
