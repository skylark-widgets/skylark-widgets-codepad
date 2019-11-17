/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-codemirror/CodeMirror","../util","../Coder"],function(e,t,r,o,i){"use strict";class n{constructor(i,n){var a;this.editor={},this.coder=i;var d={html:"htmlmixed"};n=e.extend({},n,{lineNumbers:!0});var c=i.$container.querySelectorAll(".coder-editor");for(a=0;a<c.length;a++){let e=c[a].querySelector("textarea"),i=t.data(e,"coder-type"),l=t.data(e,"coder-file");this.editor[i]=r.fromTextArea(e,n),this.editor[i].setOption("mode",o.getMode(i,l,d))}i.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.trigger("change",e)}}change(e,t){var r=this.editor[e.type];e.cmEditor||(r.setValue(e.content),e.cmEditor=r,r.on("change",this.editorChange(e))),e.content=r.getValue(),t(null,e)}}return i.plugin("codemirror",n),n});
//# sourceMappingURL=../sourcemaps/addons/codemirror.js.map
