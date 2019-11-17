define([
    'skylark-langx/skylark',
    'skylark-langx/langx',
    'skylark-widgets-base/Widget',
    "skylark-domx-styler",
    "skylark-domx-data",
    './util',
    './template',
    "./addons"
], function (skylark,langx,Widget, styler,datax,util, template,addons) {
    'use strict';
    class Coder extends Widget{
        get klassName() {
          return "Coder";
        } 

        get pluginName(){
          return "lark.coder";
        } 

        //default options
        get options () {
            return {
                files: [],
                showBlank: false,
                runScripts: true,
                pane: 'result',
                debounce: 250,
                addons: {
                    "general" : ["render"]
                }
            }
        }

        _init ($coderContainer, opts) {
            //if (!$coderContainer) {
            //    throw new Error("Can't find Coder container.");
            // }

            var options = this.options;
            if (options.runScripts === false) {
                options.addons.gerneral.push('scriptless');
            }

            super._init();
            //Widget.prototype._init.call(this);

            var _private = {};
            this._get = function (key) {
                return _private[key];
            };
            this._set = function (key, value) {
                _private[key] = value;
                return _private[key];
            };

            /*
            var options = this._set('options', langx.extend({
                files: [],
                showBlank: false,
                runScripts: true,
                pane: 'result',
                debounce: 250,
                plugins: []
            },opts));
            */
            this._set('cachedContent', {
                html: null,
                css: null,
                js: null
            });

            /*
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
            */
            var $container = this.$container = this._elm;
            $container.innerHTML = template.container();
            styler.addClass($container, template.containerClass());
            var paneActive = this._set('paneActive', options.pane);
            styler.addClass($container, template.paneActiveClass(paneActive));
            this._set('$status', {});
            for (let type of [
                    'html',
                    'css',
                    'js'
                ]) {
                this.markup(type);
            }
            $container.addEventListener('keyup', langx.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('change', langx.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('click', this.pane.bind(this));
            //this.$container = this._get('$container');

            //this.on = this._get('on');
            //this.off = this._get('off');
            //this.done = this._get('done');
            //this.trigger = this._get('trigger');
        }

        _startup() {
            var options = this.options;
            this.paneActive = this._get('paneActive');
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
                    styler.addClass($container, template.hasFileClass(type));
                }
            }

        }

        findFile(type) {
            var file = {};
            //var options = this._get('options');
            var options = this.options;
            for (let fileIndex in options.files) {
                let file = options.files[fileIndex];
                if (file.type === type) {
                    return file;
                }
            }
            return file;
        }
        markup(type) {
            //var $container = this._get('$container');
            var $container = this._elm;
            var $parent = $container.querySelector(`.coder-pane-${ type }`);
            var file = this.findFile(type);
            var $editor = document.createElement('div');
            $editor.innerHTML = template.editorContent(type, file.url);
            $editor.className = template.editorClass(type);
            $parent.appendChild($editor);
            this._get('$status')[type] = $parent.querySelector('.coder-status');
            if (typeof file.url !== 'undefined' || typeof file.content !== 'undefined') {
                styler.addClass($container, template.hasFileClass(type));
            }
        }
        load(type) {
            var file = this.findFile(type);
            //var $textarea = this._get('$container').querySelector(`.coder-pane-${ type } textarea`);
            var $textarea = this._elm.querySelector(`.coder-pane-${ type } textarea`);
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
            var type = datax.data(e.target, 'coder-type');
            if (!type) {
                return;
            }
            var cachedContent = this._get('cachedContent');
            if (cachedContent[type] === e.target.value) {
                return;
            }
            cachedContent[type] = e.target.value;
            this.emit('change', { data : {
                type: type,
                file: datax.data(e.target, 'coder-file'),
                content: cachedContent[type]
            }});
        }
        errors(errs, params) {
            this.status('error', errs, params);
        }
        pane(e) {
            if (!datax.data(e.target, 'coder-type')) {
                return;
            }
            //var $container = this._get('$container');
            var $container = this._elm;
            var paneActive = this._get('paneActive');
            styler.removeClass($container, template.paneActiveClass(paneActive));
            paneActive = this._set('paneActive', datax.data(e.target, 'coder-type'));
            styler.addClass($container, template.paneActiveClass(paneActive));
            e.preventDefault();
        }
        status(statusType = 'error', messages = [], params = {}) {
            if (!messages.length) {
                return this.clearStatus(statusType, params);
            }
            var $status = this._get('$status');
            styler.addClass($status[params.type], template.statusClass(statusType));
            //styler.addClass(this._get('$container'), template.statusActiveClass(params.type));
            styler.addClass(this._elm, template.statusActiveClass(params.type));
            var markup = '';
            messages.forEach(function (err) {
                markup += template.statusMessage(err);
            });
            $status[params.type].innerHTML = markup;
        }
        clearStatus(statusType, params) {
            var $status = this._get('$status');
            styler.removeClass($status[params.type], template.statusClass(statusType));
            //styler.removeClass(this._get('$container'), template.statusActiveClass(params.type));
            styler.removeClass(this._elm, template.statusActiveClass(params.type));
            $status[params.type].innerHTML = '';
        }
    }
    Coder.addons = addons;

    return skylark.attach("widgets.Coder",Coder);
});