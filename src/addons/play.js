define([
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