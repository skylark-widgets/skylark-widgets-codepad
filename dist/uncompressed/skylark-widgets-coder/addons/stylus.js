define([
    'skylark-langx/langx',
    '../util',
    "../Coder"
], function (langx,util,Coder) {
    'use strict';
    
    class PluginStylus {
        constructor(coder, options) {
            var priority = 20;
            options = langx.clone(options);
            if (typeof window.stylus === 'undefined') {
                return;
            }
            coder.$container.querySelector('a[data-coder-type="css"]').innerHTML = 'Stylus';
            coder.on('change', this.change.bind(this), priority);
        }
        isStylus(params) {
            if (params.type !== 'css') {
                return false;
            }
            return params.file.indexOf('.styl') !== -1 || params.file === '';
        }
        change(e) {
            var params = e.data;
            if (this.isStylus(params)) {
                window.stylus(params.content, this.options).render((err, res) => {
                    if (err) {
                        return callback(err, params);
                    } else {
                        params.content = res;
                    }
                    //callback(null, params);
                });
            } else {
                //callback(null, params);
            }
        }
    };

    Coder.plugin('stylus', PluginStylus);

    return PluginStylus;
});