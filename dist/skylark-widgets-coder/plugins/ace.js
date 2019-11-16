/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-ace","../util"],function(e,t){"use strict";return class{constructor(r,o){var i;this.editor={},this.coder=r,o=t.extend(o,{});var n=r.$container.querySelectorAll(".coder-editor");for(i=0;i<n.length;i++){let r=n[i].querySelector("textarea"),c=t.data(r,"coder-type"),d=t.data(r,"coder-file"),a=document.createElement("div");n[i].appendChild(a),this.editor[c]=e.edit(a);let s=this.editor[c],l=t.extend(o);s.getSession().setMode("ace/mode/"+t.getMode(c,d)),s.getSession().setOptions(l),s.$blockScrolling=1/0}r.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.coder.trigger("change",e)}}change(e,t){var r=this.editor[e.type];e.aceEditor||(r.getSession().setValue(e.content),e.aceEditor=r,r.on("change",this.editorChange(e))),e.content=r.getValue(),t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/ace.js.map
