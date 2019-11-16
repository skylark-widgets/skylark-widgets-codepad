/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-codemirror/CodeMirror","../util"],function(e,t){"use strict";return class{constructor(r,o){var i;this.editor={},this.coder=r;var n={html:"htmlmixed"};o=t.extend(o,{lineNumbers:!0});var d=r.$container.querySelectorAll(".coder-editor");for(i=0;i<d.length;i++){let r=d[i].querySelector("textarea"),a=t.data(r,"coder-type"),c=t.data(r,"coder-file");this.editor[a]=e.fromTextArea(r,o),this.editor[a].setOption("mode",t.getMode(a,c,n))}r.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.trigger("change",e)}}change(e,t){var r=this.editor[e.type];e.cmEditor||(r.setValue(e.content),e.cmEditor=r,r.on("change",this.editorChange(e))),e.content=r.getValue(),t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/codemirror.js.map
