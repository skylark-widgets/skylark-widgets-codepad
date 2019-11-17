define([
    'skylark-langx/langx',
    '../util',
    "../Coder"
], function (langx,util,Coder) {
    'use strict';
    
    class PluginMarkdown {
        constructor(coder, options) {
            var priority = 20;
            this.options = langx.clone(options);
            if (typeof window.marked === 'undefined') {
                return;
            }
            window.marked.setOptions(options);
            coder.$container.querySelector('a[data-coder-type="html"]').innerHTML = 'Markdown';
            coder.on('change', this.change.bind(this), priority);
        }
        change(e) {
            var params = e.data;
            if (params.type === 'html') {
                try {
                    params.content = window.marked(params.content);
                } catch (err) {
                    return callback(err, params);
                }
                //callback(null, params);
            } else {
                //callback(null, params);
            }
        }
    };

    Coder.plugin('markdown', PluginMarkdown);

    return PluginMarkdown;
});