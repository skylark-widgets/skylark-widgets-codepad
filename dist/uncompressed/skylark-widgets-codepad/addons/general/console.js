define([
    'skylark-langx/langx',
    "skylark-domx-styler",
    "../../addon",
    '../../util',
    "../../codepad"
], function (langx,styler,Addon,util,CodeGround) {
    'use strict';
    
    class AddonConsole  extends Addon{
        //constructor(coder, options) 

        get options() {
            return {
               autoClear: false 
            }
        }

        _init() {
            super._init();
            var coder = this.coder,
                options = this.options;
            
            var priority = 30;
            var history = [];
            var historyIndex = 0;
            var logCaptureSnippet = `(function ${ this.capture.toString() })();`;
            var contentCache = {
                html: '',
                css: '',
                js: ''
            };
            var $nav = document.createElement('li');
            styler.addClass($nav, 'codepad-nav-item codepad-nav-item-console');
            $nav.innerHTML = '<a href="#" data-codepad-type="console">JS Console</a>';
            var $pane = document.createElement('div');
            styler.addClass($pane, 'codepad-pane codepad-pane-console');
            $pane.innerHTML = `
              <div class="codepad-console-container">
                <ul class="codepad-console-output"></ul>
                <form class="codepad-console-input">
                  <input type="text">
                </form>
              </div>
              <button class="codepad-button codepad-console-clear">Clear</button>
            `;

            coder._velm.append($pane);
            coder._velm.find('.codepad-nav').append($nav);
            var $container = coder.$container.querySelector('.codepad-console-container');
            var $output = coder.$container.querySelector('.codepad-console-output');
            var $input = coder.$container.querySelector('.codepad-console-input input');
            var $inputForm = coder.$container.querySelector('.codepad-console-input');
            var $clear = coder.$container.querySelector('.codepad-console-clear');
            $inputForm.addEventListener('submit', this.submit.bind(this));
            $input.addEventListener('keydown', this.history.bind(this));
            $clear.addEventListener('click', this.clear.bind(this));
            if (options.autoClear === true) {
                coder.on('change', this.autoClear.bind(this), priority - 1);
            }
            coder.on('change', this.change.bind(this), priority);
            window.addEventListener('message', this.getMessage.bind(this));
            this.$coderContainer = coder.$container;
            this.$container = $container;
            this.$input = $input;
            this.$output = $output;
            this.history = history;
            this.historyIndex = historyIndex;
            this.logCaptureSnippet = logCaptureSnippet;
            this.contentCache = contentCache;
            this.getIframe = this.getIframe.bind(this);
        }
        getIframe() {
            return this.$coderContainer.querySelector('.codepad-pane-result iframe');
        }
        getMessage(e) {
            if (e.source !== this.getIframe().contentWindow) {
                return;
            }
            var data = {};
            try {
                data = JSON.parse(e.data);
            } catch (err) {
            }
            if (data.type === 'codepad-console-log') {
                this.log(data.message);
            }
        }
        autoClear(params, callback) {
            var snippetlessContent = params.content;
            if (params.type === 'js') {
                snippetlessContent = snippetlessContent.replace(this.logCaptureSnippet, '');
            }
            if (params.forceRender === true || this.contentCache[params.type] !== snippetlessContent) {
                this.clear();
            }
            this.contentCache[params.type] = snippetlessContent;
            //callback(null, params);
        }
        change(e) {
            var params = e.data;
            if (params.type !== 'js') {
                return //callback(null, params);
            }
            if (params.content.indexOf(this.logCaptureSnippet) === -1) {
                params.content = `${ this.logCaptureSnippet }${ params.content }`;
            }
            //callback(null, params);
        }
        capture() {
            if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
                window.console = {
                    log: function () {
                    }
                };
            }
            var oldConsoleLog = Function.prototype.bind.call(window.console.log, window.console);
            window.console.log = function () {
                [].slice.call(arguments).forEach(function (message) {
                    window.parent.postMessage(JSON.stringify({
                        type: 'codepad-console-log',
                        message: message
                    }), '*');
                });
                oldConsoleLog.apply(oldConsoleLog, arguments);
            };
        }
        log(message = '', type) {
            var $log = document.createElement('li');
            styler.addClass($log, 'codepad-console-log');
            if (typeof type !== 'undefined') {
                styler.addClass($log, `codepad-console-log-${ type }`);
            }
            $log.innerHTML = message;
            this.$output.appendChild($log);
        }
        submit(e) {
            var inputValue = this.$input.value.trim();
            if (inputValue === '') {
                return e.preventDefault();
            }
            this.history.push(inputValue);
            this.historyIndex = this.history.length;
            this.log(inputValue, 'history');
            if (inputValue.indexOf('return') !== 0) {
                inputValue = 'return ' + inputValue;
            }
            try {
                var scriptOutput = this.getIframe().contentWindow.eval(`(function() {${ inputValue }})()`);
                this.log(scriptOutput);
            } catch (err) {
                this.log(err, 'error');
            }
            this.$input.value = '';
            this.$container.scrollTop = this.$container.scrollHeight;
            e.preventDefault();
        }
        clear() {
            this.$output.innerHTML = '';
        }
        history(e) {
            var UP = 38;
            var DOWN = 40;
            var gotHistory = false;
            var selectionStart = this.$input.selectionStart;
            if (e.keyCode === UP && this.historyIndex !== 0 && selectionStart === 0) {
                this.historyIndex--;
                gotHistory = true;
            }
            if (e.keyCode === DOWN && this.historyIndex !== this.history.length - 1 && selectionStart === this.$input.value.length) {
                this.historyIndex++;
                gotHistory = true;
            }
            if (gotHistory) {
                this.$input.value = this.history[this.historyIndex];
            }
        }

        static get categoryName() {
            return "general";
        }

        static get addonName(){
            return "console";
        }
        
    };

    AddonConsole.register(CodeGround);

    return AddonConsole;
});