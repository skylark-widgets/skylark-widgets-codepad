define(['../util'], function (util) {
    'use strict';
    return class PluginMarkdown {
        constructor(coder, options) {
            var priority = 20;
            this.options = util.extend(options, {});
            if (typeof window.marked === 'undefined') {
                return;
            }
            window.marked.setOptions(options);
            coder.$container.querySelector('a[data-coder-type="html"]').innerHTML = 'Markdown';
            coder.on('change', this.change.bind(this), priority);
        }
        change(params, callback) {
            if (params.type === 'html') {
                try {
                    params.content = window.marked(params.content);
                } catch (err) {
                    return callback(err, params);
                }
                callback(null, params);
            } else {
                callback(null, params);
            }
        }
    };
});