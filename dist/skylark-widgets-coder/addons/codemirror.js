/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-codemirror/CodeMirror","../util","../Coder"],function(e,t,r,o,a){"use strict";class i{constructor(a,i){var d;this.editor={},this.coder=a;var n={html:"htmlmixed"};i=e.extend({},i,{lineNumbers:!0});var c=a.$container.querySelectorAll(".coder-editor");for(d=0;d<c.length;d++){let e=c[d].querySelector("textarea"),a=t.data(e,"coder-type"),l=t.data(e,"coder-file");this.editor[a]=r.fromTextArea(e,i),this.editor[a].setOption("mode",o.getMode(a,l,n))}a.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.emit("change",{data:e})}}change(e,t){var r=e.data,o=this.editor[r.type];r.cmEditor||(o.setValue(r.content),r.cmEditor=o,o.on("change",this.editorChange(r))),r.content=o.getValue()}}return a.plugin("codemirror",i),i});
//# sourceMappingURL=../sourcemaps/addons/codemirror.js.map
