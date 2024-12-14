/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","../../addon","../../util","../../codepad"],function(r,s,t,e,n){"use strict";class i extends t{get options(){return{html:{template:function(t){return`
                          <!doctype html>
                          <html>
                            <head>
                              <script>
                                (function () {
                                  window.addEventListener('DOMContentLoaded', function () {
                                    window.parent.postMessage(JSON.stringify({
                                      type: 'codepad-dom-ready'
                                    }), '*')
                                  })
                                }())
                              </script>

                              <style>${t.css||""}</style>
                            </head>
                            <body>
                              ${t.html||""}

                              <!--
                                CodeGround:
                                Empty script tag prevents malformed HTML from breaking the next script.
                              -->
                              <script></script>
                              <script>${t.js||""}</script>
                            </body>
                          </html>
                        `}}}}_init(){super._init();var t=this.coder,e=(this.options,!!("srcdoc"in document.createElement("iframe"))),r=t.$(".codepad-pane-result iframe");window.addEventListener("message",this.domready.bind(this)),this.listenTo(t,"changed",this.update),this.supportSrcdoc=e,this.content={html:"",css:"",js:""},this.frameContent="",this.$resultFrame=r,this.callbacks=[],this.index=0,this.lastCallback=()=>{},this.update()}_render(t){var e;return this._renderHtml||(e=this.options.html.template,r.isString(e)?this._renderHtml=r.template(e):r.isFunction(e)&&(this._renderHtml=e)),this._renderHtml(t)}update(t){var e=this.frameContent,r=this.coder.getCodes();this.frameContent=this._render(r),this.lastCallback=()=>{this.lastCallback=()=>{}},this.frameContent!==e&&(this.supportSrcdoc?(r=document.createElement("iframe"),this.$resultFrame.replaceWith(r),this.$resultFrame=s(r),r.contentWindow.document.open(),r.contentWindow.document.write(this.frameContent),r.contentWindow.document.close()):(this.$resultFrame.attr("data-srcdoc",this.frameContent),this.$resultFrame.attr("src",e='javascript:window.frameElement.getAttribute("data-srcdoc");'),this.$resultFrame[0].contentWindow&&(this.$resultFrame[0].contentWindow.location=e)))}domready(t){if(t.source===this.$resultFrame[0].contentWindow){var e={};try{e=JSON.parse(t.data)}catch(t){}"codepad-dom-ready"===e.type&&this.lastCallback()}}static get categoryName(){return"general"}static get addonName(){return"render"}}return i.register(n),i});
//# sourceMappingURL=../../sourcemaps/addons/general/render.js.map
