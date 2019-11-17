define([
    'skylark-langx/langx',
    '../util',
    "../Coder"
], function (langx,util,Coder) {
    'use strict';
    
    class PluginBabel {
        constructor(coder, options) {
            var priority = 20;
            this.options = langx.clone(options);
            if (typeof window.Babel !== 'undefined') {
                this.babel = window.Babel;
            } else if (typeof window.babel !== 'undefined') {
                this.babel = { transform: window.babel };
            } else {
                return;
            }
            coder.$container.querySelector('a[data-coder-type="js"]').innerHTML = 'ES2015';
            coder.on('change', this.change.bind(this), priority);
        }
        change(e) {
            var params = e.data;
            if (params.type === 'js') {
                try {
                    params.content = this.babel.transform(params.content, this.options).code;
                } catch (err) {
                    return callback(err, params);
                }
                //callback(null, params);
            } else {
                //callback(null, params);
            }
        }
    };

    Coder.plugin('babel', PluginBabel);

    return PluginBabel;
});