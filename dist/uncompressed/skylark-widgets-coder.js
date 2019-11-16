/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-widgets-coder/util',[
    "skylark-net-http/Xhr"
],function (Xhr) {
    'use strict';
    function extend(obj = {}, defaults = {}) {
        var extended = {};
        Object.keys(obj).forEach(function (key) {
            extended[key] = obj[key];
        });
        Object.keys(defaults).forEach(function (key) {
            if (typeof extended[key] !== 'undefined') {
                extended[key] = obj[key];
            } else {
                extended[key] = defaults[key];
            }
        });
        return extended;
    }
    function fetch(url, callback) {
        /*
        var xhr = new window.XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'text';
        xhr.onload = function () {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(url, xhr);
            }
        };
        xhr.onerror = function (err) {
            callback(err);
        };
        xhr.send();
        */
        Xhr.get(url).then(
            function(res) {
                callback(null,res);
            },
            function(e){
                callback(e);
            }
        )
    }
    function runCallback(index, params, arr, errors, callback) {
        return function (err, res) {
            if (err) {
                errors.push(err);
            }
            index++;
            if (index < arr.length) {
                seqRunner(index, res, arr, errors, callback);
            } else {
                callback(errors, res);
            }
        };
    }
    function seqRunner(index, params, arr, errors, callback) {
        arr[index](params, runCallback.apply(this, arguments));
    }
    function seq(arr, params, callback = function () {
    }) {
        var errors = [];
        if (!arr.length) {
            return callback(errors, params);
        }
        seqRunner(0, params, arr, errors, callback);
    }
    function debounce(fn, delay) {
        var cooldown = null;
        var multiple = null;
        return function () {
            if (cooldown) {
                multiple = true;
            } else {
                fn.apply(this, arguments);
            }
            clearTimeout(cooldown);
            cooldown = setTimeout(() => {
                if (multiple) {
                    fn.apply(this, arguments);
                }
                cooldown = null;
                multiple = null;
            }, delay);
        };
    }
    function log() {
        console.log(arguments);
    }
    function hasClass(node, className) {
        if (!node.className) {
            return false;
        }
        var tempClass = ' ' + node.className + ' ';
        className = ' ' + className + ' ';
        if (tempClass.indexOf(className) !== -1) {
            return true;
        }
        return false;
    }
    function addClass(node, className) {
        if (hasClass(node, className)) {
            return node.className;
        }
        if (node.className) {
            className = ' ' + className;
        }
        node.className += className;
        return node.className;
    }
    function removeClass(node, className) {
        var spaceBefore = ' ' + className;
        var spaceAfter = className + ' ';
        if (node.className.indexOf(spaceBefore) !== -1) {
            node.className = node.className.replace(spaceBefore, '');
        } else if (node.className.indexOf(spaceAfter) !== -1) {
            node.className = node.className.replace(spaceAfter, '');
        } else {
            node.className = node.className.replace(className, '');
        }
        return node.className;
    }
    function data(node, attr) {
        return node.getAttribute('data-' + attr);
    }
    var defaultModemap = {
        'html': 'html',
        'css': 'css',
        'js': 'javascript',
        'less': 'less',
        'styl': 'stylus',
        'coffee': 'coffeescript'
    };
    function getMode(type = '', file = '', customModemap = {}) {
        var modemap = extend(customModemap, defaultModemap);
        for (let key in modemap) {
            let keyLength = key.length;
            if (file.slice(-keyLength++) === '.' + key) {
                return modemap[key];
            }
        }
        for (let key in modemap) {
            if (type === key) {
                return modemap[key];
            }
        }
        return type;
    }
    return {
        extend,
        fetch,
        seq,
        debounce,
        log,
        getMode,
        data,
        hasClass,
        addClass,
        removeClass
    };
});
define('skylark-widgets-coder/template',[],function () {
    'use strict';
    function container() {
        return `
    <ul class="coder-nav">
      <li class="coder-nav-item coder-nav-item-result">
        <a href="#" data-coder-type="result">
          Result
        </a>
      </li>
      <li class="coder-nav-item coder-nav-item-html">
        <a href="#" data-coder-type="html">
          HTML
        </a>
      </li>
      <li class="coder-nav-item coder-nav-item-css">
        <a href="#" data-coder-type="css">
          CSS
        </a>
      </li>
      <li class="coder-nav-item coder-nav-item-js">
        <a href="#" data-coder-type="js">
          JavaScript
        </a>
      </li>
    </ul>
    <div class="coder-pane coder-pane-result"><iframe></iframe></div>
    <div class="coder-pane coder-pane-html"></div>
    <div class="coder-pane coder-pane-css"></div>
    <div class="coder-pane coder-pane-js"></div>
  `;
    }
    function paneActiveClass(type) {
        return `coder-pane-active-${ type }`;
    }
    function containerClass() {
        return 'coder';
    }
    function hasFileClass(type) {
        return `coder-has-${ type }`;
    }
    function editorClass(type) {
        return `coder-editor coder-editor-${ type }`;
    }
    function editorContent(type, fileUrl = '') {
        return `
    <textarea data-coder-type="${ type }" data-coder-file="${ fileUrl }"></textarea>
    <div class="coder-status"></div>
  `;
    }
    function statusMessage(err) {
        return `
    <p>${ err }</p>
  `;
    }
    function statusClass(type) {
        return `coder-status-${ type }`;
    }
    function statusActiveClass(type) {
        return `coder-status-active-${ type }`;
    }
    function pluginClass(name) {
        return `coder-plugin-${ name }`;
    }
    function statusLoading(url) {
        return `Loading <strong>${ url }</strong>..`;
    }
    function statusFetchError(url) {
        return `There was an error loading <strong>${ url }</strong>.`;
    }
    return {
        container: container,
        paneActiveClass: paneActiveClass,
        containerClass: containerClass,
        hasFileClass: hasFileClass,
        editorClass: editorClass,
        editorContent: editorContent,
        statusMessage: statusMessage,
        statusClass: statusClass,
        statusActiveClass: statusActiveClass,
        pluginClass: pluginClass,
        statusLoading: statusLoading,
        statusFetchError: statusFetchError
    };
});
define('skylark-widgets-coder/plugin',[
    './util',
    './template'
], function (util, template) {
    'use strict';
    var plugins = [];
    function find(id) {
        for (let pluginIndex in plugins) {
            let plugin = plugins[pluginIndex];
            if (plugin._id === id) {
                return plugin;
            }
        }
        throw new Error(`Plugin ${ id } is not registered.`);
    }
    function register(id, plugin) {
        plugin._id = id;
        plugins.push(plugin);
    }
    function init() {
        this._get('options').plugins.forEach(plugin => {
            let Plugin;
            let pluginName;
            let pluginOptions = {};
            if (typeof plugin === 'string') {
                pluginName = plugin;
            } else if (typeof plugin === 'object') {
                pluginName = plugin.name;
                pluginOptions = plugin.options || {};
            }
            Plugin = find(pluginName);
            this._get('plugins')[plugin] = new Plugin(this, pluginOptions);
            util.addClass(this._get('$container'), template.pluginClass(pluginName));
        });
    }
    return {
        register,
        init
    };
});
define('skylark-widgets-coder/pubsoup',['./util'], function (util) {
    'use strict';
    return class PubSoup {
        constructor() {
            this.topics = {};
            this.callbacks = {};
        }
        find(query) {
            this.topics[query] = this.topics[query] || [];
            return this.topics[query];
        }
        subscribe(topic, subscriber, priority = 90) {
            var foundTopic = this.find(topic);
            subscriber._priority = priority;
            foundTopic.push(subscriber);
            foundTopic.sort(function (a, b) {
                return a._priority > b._priority ? 1 : b._priority > a._priority ? -1 : 0;
            });
        }
        remover(arr, fn) {
            arr.forEach(function () {
                if (!fn) {
                    arr.length = 0;
                    return;
                }
                var index = [].indexOf.call(arr, fn);
                if (index === -1) {
                    return;
                }
                arr.splice(index, 1);
            });
        }
        unsubscribe(topic, subscriber) {
            var foundTopic = this.find(topic);
            this.remover(foundTopic, subscriber);
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.remover(this.callbacks[topic], subscriber);
        }
        publish(topic, params = {}) {
            var foundTopic = this.find(topic);
            var runList = [];
            foundTopic.forEach(function (subscriber) {
                runList.push(subscriber);
            });
            util.seq(runList, params, this.runCallbacks(topic));
        }
        runCallbacks(topic) {
            return (err, params) => {
                this.callbacks[topic] = this.callbacks[topic] || [];
                this.callbacks[topic].forEach(c => {
                    c(err, params);
                });
            };
        }
        done(topic, callback = function () {
        }) {
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.callbacks[topic].push(callback);
        }
    };
});
define('skylark-widgets-coder/Coder',[
    'skylark-langx/skylark',
    './util',
    './template',
    './plugin',
    './pubsoup'
], function (skylark, util, template, plugin, PubSoup, BundlePlugins) {
    'use strict';
    class Coder {
        constructor($coderContainer, opts) {
            if (!$coderContainer) {
                throw new Error("Can't find Coder container.");
            }
            var _private = {};
            this._get = function (key) {
                return _private[key];
            };
            this._set = function (key, value) {
                _private[key] = value;
                return _private[key];
            };
            var options = this._set('options', util.extend(opts, {
                files: [],
                showBlank: false,
                runScripts: true,
                pane: 'result',
                debounce: 250,
                plugins: []
            }));
            options.plugins.push('render');
            if (options.runScripts === false) {
                options.plugins.push('scriptless');
            }
            this._set('cachedContent', {
                html: null,
                css: null,
                js: null
            });
            var pubsoup = this._set('pubsoup', new PubSoup());
            this._set('trigger', this.trigger());
            this._set('on', function () {
                pubsoup.subscribe.apply(pubsoup, arguments);
            });
            this._set('off', function () {
                pubsoup.unsubscribe.apply(pubsoup, arguments);
            });
            var done = this._set('done', function () {
                pubsoup.done.apply(pubsoup, arguments);
            });
            done('change', this.errors.bind(this));
            var $container = this._set('$container', $coderContainer);
            $container.innerHTML = template.container();
            util.addClass($container, template.containerClass());
            var paneActive = this._set('paneActive', options.pane);
            util.addClass($container, template.paneActiveClass(paneActive));
            this._set('$status', {});
            for (let type of [
                    'html',
                    'css',
                    'js'
                ]) {
                this.markup(type);
            }
            $container.addEventListener('keyup', util.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('change', util.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('click', this.pane.bind(this));
            this.$container = this._get('$container');
            this.on = this._get('on');
            this.off = this._get('off');
            this.done = this._get('done');
            this.trigger = this._get('trigger');
            this.paneActive = this._get('paneActive');
            this._set('plugins', {});
            plugin.init.call(this);
            for (let type of [
                    'html',
                    'css',
                    'js'
                ]) {
                this.load(type);
            }
            if (options.showBlank) {
                for (let type of [
                        'html',
                        'css',
                        'js'
                    ]) {
                    util.addClass($container, template.hasFileClass(type));
                }
            }
        }
        findFile(type) {
            var file = {};
            var options = this._get('options');
            for (let fileIndex in options.files) {
                let file = options.files[fileIndex];
                if (file.type === type) {
                    return file;
                }
            }
            return file;
        }
        markup(type) {
            var $container = this._get('$container');
            var $parent = $container.querySelector(`.coder-pane-${ type }`);
            var file = this.findFile(type);
            var $editor = document.createElement('div');
            $editor.innerHTML = template.editorContent(type, file.url);
            $editor.className = template.editorClass(type);
            $parent.appendChild($editor);
            this._get('$status')[type] = $parent.querySelector('.coder-status');
            if (typeof file.url !== 'undefined' || typeof file.content !== 'undefined') {
                util.addClass($container, template.hasFileClass(type));
            }
        }
        load(type) {
            var file = this.findFile(type);
            var $textarea = this._get('$container').querySelector(`.coder-pane-${ type } textarea`);
            if (typeof file.content !== 'undefined') {
                this.setValue($textarea, file.content);
            } else if (typeof file.url !== 'undefined') {
                this.status('loading', [template.statusLoading(file.url)], {
                    type: type,
                    file: file
                });
                util.fetch(file.url, (err, res) => {
                    if (err) {
                        this.status('error', [template.statusFetchError(err)], { type: type });
                        return;
                    }
                    this.clearStatus('loading', { type: type });
                    this.setValue($textarea, res);
                });
            } else {
                this.setValue($textarea, '');
            }
        }
        setValue($textarea, val) {
            $textarea.value = val;
            this.change({ target: $textarea });
        }
        change(e) {
            var type = util.data(e.target, 'coder-type');
            if (!type) {
                return;
            }
            var cachedContent = this._get('cachedContent');
            if (cachedContent[type] === e.target.value) {
                return;
            }
            cachedContent[type] = e.target.value;
            this.trigger('change', {
                type: type,
                file: util.data(e.target, 'coder-file'),
                content: cachedContent[type]
            });
        }
        errors(errs, params) {
            this.status('error', errs, params);
        }
        pane(e) {
            if (!util.data(e.target, 'coder-type')) {
                return;
            }
            var $container = this._get('$container');
            var paneActive = this._get('paneActive');
            util.removeClass($container, template.paneActiveClass(paneActive));
            paneActive = this._set('paneActive', util.data(e.target, 'coder-type'));
            util.addClass($container, template.paneActiveClass(paneActive));
            e.preventDefault();
        }
        status(statusType = 'error', messages = [], params = {}) {
            if (!messages.length) {
                return this.clearStatus(statusType, params);
            }
            var $status = this._get('$status');
            util.addClass($status[params.type], template.statusClass(statusType));
            util.addClass(this._get('$container'), template.statusActiveClass(params.type));
            var markup = '';
            messages.forEach(function (err) {
                markup += template.statusMessage(err);
            });
            $status[params.type].innerHTML = markup;
        }
        clearStatus(statusType, params) {
            var $status = this._get('$status');
            util.removeClass($status[params.type], template.statusClass(statusType));
            util.removeClass(this._get('$container'), template.statusActiveClass(params.type));
            $status[params.type].innerHTML = '';
        }
        trigger() {
            var options = this._get('options');
            var pubsoup = this._get('pubsoup');
            if (options.debounce === false) {
                return function () {
                    pubsoup.publish.apply(pubsoup, arguments);
                };
            }
            var cooldown = {};
            var multiple = {};
            return function (topic, {
                type = 'default'
            } = {}) {
                if (cooldown[type]) {
                    multiple[type] = true;
                } else {
                    pubsoup.publish.apply(pubsoup, arguments);
                }
                clearTimeout(cooldown[type]);
                cooldown[type] = setTimeout(() => {
                    if (multiple[type]) {
                        pubsoup.publish.apply(pubsoup, arguments);
                    }
                    multiple[type] = null;
                    cooldown[type] = null;
                }, options.debounce);
            };
        }
    }
    Coder.plugin = function () {
        return plugin.register.apply(this, arguments);
    };

    return skylark.attach("widgets.Coder",Coder);
});
define('skylark-widgets-coder/addons/codemirror',[
    'skylark-codemirror/CodeMirror',
    '../util',
    "../Coder"    
], function (CodeMirror,util,Coder) {
    'use strict';
    class PluginCodeMirror {
        constructor(coder, options) {
            var priority = 1;
            var i;
            this.editor = {};
            this.coder = coder;
            var modemap = { 'html': 'htmlmixed' };
            options = util.extend(options, { lineNumbers: true });
            //if (typeof window.CodeMirror === 'undefined') {
            //    return;
            //}
            var $editors = coder.$container.querySelectorAll('.coder-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = util.data($textarea, 'coder-type');
                let file = util.data($textarea, 'coder-file');
                this.editor[type] = CodeMirror.fromTextArea($textarea, options);
                this.editor[type].setOption('mode', util.getMode(type, file, modemap));
            }
            coder.on('change', this.change.bind(this), priority);
        }
        editorChange(params) {
            return () => {
                this.coder.trigger('change', params);
            };
        }
        change(params, callback) {
            var editor = this.editor[params.type];
            if (!params.cmEditor) {
                editor.setValue(params.content);
                params.cmEditor = editor;
                editor.on('change', this.editorChange(params));
            }
            params.content = editor.getValue();
            callback(null, params);
        }
    };

    Coder.plugin('codemirror', PluginCodeMirror);

    return PluginCodeMirror;
});
define('skylark-widgets-coder/addons/console',[
    '../util',
    "../Coder"
], function (util,Coder) {
    'use strict';
    
    class PluginConsole {
        constructor(coder, options) {
            options = util.extend(options, { autoClear: false });
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
            util.addClass($nav, 'coder-nav-item coder-nav-item-console');
            $nav.innerHTML = '<a href="#" data-coder-type="console">JS Console</a>';
            var $pane = document.createElement('div');
            util.addClass($pane, 'coder-pane coder-pane-console');
            $pane.innerHTML = `
              <div class="coder-console-container">
                <ul class="coder-console-output"></ul>
                <form class="coder-console-input">
                  <input type="text">
                </form>
              </div>
              <button class="coder-button coder-console-clear">Clear</button>
            `;

            coder.$container.appendChild($pane);
            coder.$container.querySelector('.coder-nav').appendChild($nav);
            var $container = coder.$container.querySelector('.coder-console-container');
            var $output = coder.$container.querySelector('.coder-console-output');
            var $input = coder.$container.querySelector('.coder-console-input input');
            var $inputForm = coder.$container.querySelector('.coder-console-input');
            var $clear = coder.$container.querySelector('.coder-console-clear');
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
            return this.$coderContainer.querySelector('.coder-pane-result iframe');
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
            if (data.type === 'coder-console-log') {
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
            callback(null, params);
        }
        change(params, callback) {
            if (params.type !== 'js') {
                return callback(null, params);
            }
            if (params.content.indexOf(this.logCaptureSnippet) === -1) {
                params.content = `${ this.logCaptureSnippet }${ params.content }`;
            }
            callback(null, params);
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
                        type: 'coder-console-log',
                        message: message
                    }), '*');
                });
                oldConsoleLog.apply(oldConsoleLog, arguments);
            };
        }
        log(message = '', type) {
            var $log = document.createElement('li');
            util.addClass($log, 'coder-console-log');
            if (typeof type !== 'undefined') {
                util.addClass($log, `coder-console-log-${ type }`);
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
    };

    Coder.plugin('console', PluginConsole);

    return PluginConsole;
});
define('skylark-widgets-coder/addons/play',[
    '../util',
    "../Coder"
], function (util,Coder) {
    'use strict';
    class PluginPlay {
        constructor(coder, options) {
            options = util.extend(options, { firstRun: true });
            var priority = 10;
            var cache = {};
            var code = {};
            if (options.firstRun === false) {
                cache = {
                    html: {
                        type: 'html',
                        content: ''
                    },
                    css: {
                        type: 'css',
                        content: ''
                    },
                    js: {
                        type: 'js',
                        content: ''
                    }
                };
            }
            var $button = document.createElement('button');
            $button.className = 'coder-button coder-button-play';
            $button.innerHTML = 'Run';
            coder.$container.appendChild($button);
            $button.addEventListener('click', this.run.bind(this));
            coder.on('change', this.change.bind(this), priority);
            this.cache = cache;
            this.code = code;
            this.coder = coder;
        }
        change(params, callback) {
            this.code[params.type] = util.extend(params);
            if (typeof this.cache[params.type] !== 'undefined') {
                callback(null, this.cache[params.type]);
                this.cache[params.type].forceRender = null;
            } else {
                this.cache[params.type] = util.extend(params);
                callback(null, params);
            }
        }
        run() {
            for (let type in this.code) {
                this.cache[type] = util.extend(this.code[type], { forceRender: true });
                this.coder.trigger('change', this.cache[type]);
            }
        }
    };

    Coder.plugin('play', PluginPlay);

    return PluginPlay;
});
define('skylark-widgets-coder/addons/render',[
    '../util',
    "../Coder"
], function (util,Coder) {
    'use strict';
    class PluginRender {
        constructor(coder, options) {
            options = util.extend(options, {});
            var supportSrcdoc = !!('srcdoc' in document.createElement('iframe'));
            var $resultFrame = coder.$container.querySelector('.coder-pane-result iframe');
            var frameContent = '';
            var content = {
                html: '',
                css: '',
                js: ''
            };
            window.addEventListener('message', this.domready.bind(this));
            coder.on('change', this.change.bind(this), 100);
            this.supportSrcdoc = supportSrcdoc;
            this.content = content;
            this.frameContent = frameContent;
            this.$resultFrame = $resultFrame;
            this.callbacks = [];
            this.index = 0;
            this.lastCallback = () => {
            };
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
                  type: 'coder-dom-ready'
                }), '*')
              })
            }())
          </script>

          <style>${ style }</style>
        </head>
        <body>
          ${ body }

          <!--
            Coder:
            Empty script tag prevents malformed HTML from breaking the next script.
          -->
          <script></script>
          <script>${ script }</script>
        </body>
      </html>
    `;
        }
        change(params, callback) {
            this.content[params.type] = params.content;
            var oldFrameContent = this.frameContent;
            this.frameContent = this.template(this.content['css'], this.content['html'], this.content['js']);
            this.lastCallback = () => {
                this.lastCallback = () => {
                };
                callback(null, params);
            };
            if (params.forceRender !== true && this.frameContent === oldFrameContent) {
                callback(null, params);
                return;
            }
            if (this.supportSrcdoc) {
                var $newResultFrame = document.createElement('iframe');
                this.$resultFrame.parentNode.replaceChild($newResultFrame, this.$resultFrame);
                this.$resultFrame = $newResultFrame;
                this.$resultFrame.contentWindow.document.open();
                this.$resultFrame.contentWindow.document.write(this.frameContent);
                this.$resultFrame.contentWindow.document.close();
            } else {
                this.$resultFrame.setAttribute('data-srcdoc', this.frameContent);
                var jsUrl = 'javascript:window.frameElement.getAttribute("data-srcdoc");';
                this.$resultFrame.setAttribute('src', jsUrl);
                if (this.$resultFrame.contentWindow) {
                    this.$resultFrame.contentWindow.location = jsUrl;
                }
            }
        }
        domready(e) {
            if (e.source !== this.$resultFrame.contentWindow) {
                return;
            }
            var data = {};
            try {
                data = JSON.parse(e.data);
            } catch (e) {
            }
            if (data.type === 'coder-dom-ready') {
                this.lastCallback();
            }
        }
    };

    Coder.plugin('render', PluginRender);

    return PluginRender;
});
define('skylark-widgets-coder/main',[
	"./Coder",
	"./addons/codemirror",
	"./addons/console",
	"./addons/play",
	"./addons/render"
],function(Coder){

	return Coder;
});
define('skylark-widgets-coder', ['skylark-widgets-coder/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-widgets-coder.js.map
