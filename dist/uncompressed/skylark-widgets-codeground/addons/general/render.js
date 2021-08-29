define([
    'skylark-langx/langx',
    "skylark-domx-query",
    "../../addon",
    '../../util',
    "../../codeground"
], function (langx,$,Addon,util,CodeGround) {
    'use strict';
    class AddonRender  extends Addon{
        //constructor(coder, options) 

        _init() {
            super._init();

            var coder = this.coder,
                options = this.options;


            var supportSrcdoc = !!('srcdoc' in document.createElement('iframe'));
            var $resultFrame = coder.$('.codeg-pane-result iframe');
            var frameContent = '';
            var content = {
                html: '',
                css: '',
                js: ''
            };
            window.addEventListener('message', this.domready.bind(this));

            this.listenTo(coder,"changed",this.update);

            this.supportSrcdoc = supportSrcdoc;
            this.content = content;
            this.frameContent = frameContent;
            this.$resultFrame = $resultFrame;
            this.callbacks = [];
            this.index = 0;
            this.lastCallback = () => {
            };
            this.update();
        }
        template(style = '', body = '', script = '') {
            return `
      <!doctype html>
      <html>
        <head>
          <script>
            (function () {
              window.addEventListener('DOMContentLoaded', function () {
                window.parent.postMessage(JSON.stringify({
                  type: 'codeg-dom-ready'
                }), '*')
              })
            }())
          </script>

          <style>${ style }</style>
        </head>
        <body>
          ${ body }

          <!--
            CodeGround:
            Empty script tag prevents malformed HTML from breaking the next script.
          -->
          <script></script>
          <script>${ script }</script>
        </body>
      </html>
    `;
        }
        update(e) {
            //var params = e.data;
            //this.content[params.type] = params.content;
            var oldFrameContent = this.frameContent;
            let codes = this.coder.getCodes();

            this.frameContent = this.template(codes['css'], codes['html'], codes['js']);
            this.lastCallback = () => {
                this.lastCallback = () => {
                };
                //callback(null, params);
            };
            if (this.frameContent === oldFrameContent) {
                //callback(null, params);
                return;
            }
            if (this.supportSrcdoc) {
                var $newResultFrame = document.createElement('iframe');
                this.$resultFrame.replaceWith($newResultFrame);
                this.$resultFrame = $($newResultFrame);
                $newResultFrame.contentWindow.document.open();
                $newResultFrame.contentWindow.document.write(this.frameContent);
                $newResultFrame.contentWindow.document.close();
            } else {
                this.$resultFrame.attr('data-srcdoc', this.frameContent);
                var jsUrl = 'javascript:window.frameElement.getAttribute("data-srcdoc");';
                this.$resultFrame.attr('src', jsUrl);
                if (this.$resultFrame[0].contentWindow) {
                    this.$resultFrame[0].contentWindow.location = jsUrl;
                }
            }
        }
        domready(e) {
            if (e.source !== this.$resultFrame[0].contentWindow) {
                return;
            }
            var data = {};
            try {
                data = JSON.parse(e.data);
            } catch (e) {
            }
            if (data.type === 'codeg-dom-ready') {
                this.lastCallback();
            }
        }

        static get categoryName() {
            return "general";
        }

        static get addonName(){
            return "render";
        }

    };

    AddonRender.register(CodeGround);

    return AddonRender;
});