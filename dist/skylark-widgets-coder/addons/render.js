/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util","../Coder"],function(t,e){"use strict";class n{constructor(e,n){n=t.extend(n,{});var r=!!("srcdoc"in document.createElement("iframe")),s=e.$container.querySelector(".coder-pane-result iframe");window.addEventListener("message",this.domready.bind(this)),e.on("change",this.change.bind(this),100),this.supportSrcdoc=r,this.content={html:"",css:"",js:""},this.frameContent="",this.$resultFrame=s,this.callbacks=[],this.index=0,this.lastCallback=(()=>{})}template(t="",e="",n=""){return`\n      <!doctype html>\n      <html>\n        <head>\n          <script>\n            (function () {\n              window.addEventListener('DOMContentLoaded', function () {\n                window.parent.postMessage(JSON.stringify({\n                  type: 'coder-dom-ready'\n                }), '*')\n              })\n            }())\n          <\/script>\n\n          <style>${t}</style>\n        </head>\n        <body>\n          ${e}\n\n          \x3c!--\n            Coder:\n            Empty script tag prevents malformed HTML from breaking the next script.\n          --\x3e\n          <script><\/script>\n          <script>${n}<\/script>\n        </body>\n      </html>\n    `}change(t,e){this.content[t.type]=t.content;var n=this.frameContent;if(this.frameContent=this.template(this.content.css,this.content.html,this.content.js),this.lastCallback=(()=>{this.lastCallback=(()=>{}),e(null,t)}),!0===t.forceRender||this.frameContent!==n)if(this.supportSrcdoc){var r=document.createElement("iframe");this.$resultFrame.parentNode.replaceChild(r,this.$resultFrame),this.$resultFrame=r,this.$resultFrame.contentWindow.document.open(),this.$resultFrame.contentWindow.document.write(this.frameContent),this.$resultFrame.contentWindow.document.close()}else{this.$resultFrame.setAttribute("data-srcdoc",this.frameContent);var s='javascript:window.frameElement.getAttribute("data-srcdoc");';this.$resultFrame.setAttribute("src",s),this.$resultFrame.contentWindow&&(this.$resultFrame.contentWindow.location=s)}else e(null,t)}domready(t){if(t.source===this.$resultFrame.contentWindow){var e={};try{e=JSON.parse(t.data)}catch(t){}"coder-dom-ready"===e.type&&this.lastCallback()}}}return e.plugin("render",n),n});
//# sourceMappingURL=../sourcemaps/addons/render.js.map
