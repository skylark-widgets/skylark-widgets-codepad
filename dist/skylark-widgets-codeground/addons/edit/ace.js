/**
 * skylark-widgets-codeground - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codeground/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../../_addon","../../util","../../code_ground"],function(e,t,i,o,a,n){"use strict";class r extends o{_init(){super._init();var o,n=this.coder,r=this.options;this.editor={};r=this.options;var d=n.$container.querySelectorAll(".codeg-editor");for(o=0;o<d.length;o++){let n=d[o].querySelector("textarea"),s=t.data(n,"codeg-type"),c=t.data(n,"codeg-file"),g=document.createElement("div");d[o].appendChild(g),this.editor[s]=i.edit(g);let l=this.editor[s],h=e.clone(r);l.getSession().setMode("ace/mode/"+a.getMode(s,c)),l.getSession().setOptions(h),l.$blockScrolling=1/0}n.on("change",this.change.bind(this),1)}editorChange(e){return()=>{var t=this.editor[e.type];e.content=t.getValue(),this.coder.emit("change",e)}}change(e,t){var i=e.data,o=this.editor[i.type];i.aceEditor||(o.getSession().setValue(i.content),i.aceEditor=o,o.on("change",this.editorChange(i)))}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return r.register(n),r});
//# sourceMappingURL=../../sourcemaps/addons/edit/ace.js.map
