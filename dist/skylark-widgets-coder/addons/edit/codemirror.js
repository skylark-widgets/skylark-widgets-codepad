/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-codemirror/CodeMirror","../../Addon","../../util","../../addons"],function(e,t,r,i,o,a){"use strict";class d extends i{get options(){return{lineNumbers:!0,pluginCssClass:"coder-plugin-codemirror"}}_init(){super._init();var e,i=this.coder,a=this.options;this.editor={};var d={html:"htmlmixed"},n=(a=this.options,i.$container.querySelectorAll(".coder-editor"));for(e=0;e<n.length;e++){let i=n[e].querySelector("textarea"),s=t.data(i,"coder-type"),c=t.data(i,"coder-file");this.editor[s]=r.fromTextArea(i,a),this.editor[s].setOption("mode",o.getMode(s,c,d))}i.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.emit("change",{data:e})}}change(e,t){var r=e.data,i=this.editor[r.type];r.cmEditor||(i.setValue(r.content),r.cmEditor=i,i.on("change",this.editorChange(r))),r.content=i.getValue()}static get categoryName(){return"edit"}static get addonName(){return"codemirror"}}return a.edit.codemirror=d,d});
//# sourceMappingURL=../../sourcemaps/addons/edit/codemirror.js.map
