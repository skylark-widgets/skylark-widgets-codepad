define([
    '../util',
    "../Coder"
], function (util,Coder) {
    'use strict';
    class PluginCoffeeScript {
        constructor(coder, options) {
            var priority = 20;
            options = util.extend(options, {});
            if (typeof window.CoffeeScript === 'undefined') {
                return;
            }
            coder.$container.querySelector('a[data-coder-type="js"]').innerHTML = 'CoffeeScript';
            coder.on('change', this.change.bind(this), priority);
        }
        isCoffee(params) {
            if (params.type !== 'js') {
                return false;
            }
            return params.file.indexOf('.coffee') !== -1 || params.file === '';
        }
        change(params, callback) {
            if (this.isCoffee(params)) {
                try {
                    params.content = window.CoffeeScript.compile(params.content);
                } catch (err) {
                    return callback(err, params);
                }
            }
            callback(null, params);
        }
    };

    Coder.plugin('coffeescript', PluginCoffeeScript);

    return PluginCoffeeScript;
});