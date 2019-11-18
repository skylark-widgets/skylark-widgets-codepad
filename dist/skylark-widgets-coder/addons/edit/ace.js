/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../../Addon","../../util","../../Coder"],function(e,t,i,a,o,r){"use strict";class n extends i{_init(){super._init();var i,r=this.coder,n=this.options;this.editor={};n=this.options;var d=r.$container.querySelectorAll(".coder-editor");for(i=0;i<d.length;i++){let r=d[i].querySelector("textarea"),s=t.data(r,"coder-type"),c=t.data(r,"coder-file"),l=document.createElement("div");d[i].appendChild(l),this.editor[s]=a.edit(l);let g=this.editor[s],h=e.clone(n);g.getSession().setMode("ace/mode/"+o.getMode(s,c)),g.getSession().setOptions(h),g.$blockScrolling=1/0}r.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.emit("change",{data:e})}}change(e,t){var i=e.data,a=this.editor[i.type];i.aceEditor||(a.getSession().setValue(i.content),i.aceEditor=a,a.on("change",this.editorChange(i))),i.content=a.getValue()}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return n.register(r),n});
//# sourceMappingURL=../../sourcemaps/addons/edit/ace.js.map
