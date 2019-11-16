/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-codemirror/CodeMirror","../util","../Coder"],function(e,t,r){"use strict";class o{constructor(r,o){var i;this.editor={},this.coder=r;var n={html:"htmlmixed"};o=t.extend(o,{lineNumbers:!0});var d=r.$container.querySelectorAll(".coder-editor");for(i=0;i<d.length;i++){let r=d[i].querySelector("textarea"),c=t.data(r,"coder-type"),a=t.data(r,"coder-file");this.editor[c]=e.fromTextArea(r,o),this.editor[c].setOption("mode",t.getMode(c,a,n))}r.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.trigger("change",e)}}change(e,t){var r=this.editor[e.type];e.cmEditor||(r.setValue(e.content),e.cmEditor=r,r.on("change",this.editorChange(e))),e.content=r.getValue(),t(null,e)}}return r.plugin("codemirror",o),o});
//# sourceMappingURL=../sourcemaps/addons/codemirror.js.map
