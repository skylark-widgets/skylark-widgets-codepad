define([
    'skylark-langx/langx',
    "../../_addon",
    '../../util',
    "../../code_ground"
], function (langx,Addon,util,CodeGround) {
    'use strict';
    
    class AddonBabel  extends Addon{
        //constructor(coder, options) 

        _init() {
            super._init();

            var coder = this.coder,
                options = this.options;

            var priority = 20;
            //this.options = langx.clone(options);
            if (typeof window.Babel !== 'undefined') {
                this.babel = window.Babel;
            } else if (typeof window.babel !== 'undefined') {
                this.babel = { transform: window.babel };
            } else {
                return;
            }
            coder.$container.querySelector('a[data-codeg-type="js"]').innerHTML = 'ES2015';
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

        static get categoryName() {
            return "js";
        }

        static get addonName(){
            return "babel";
        }

    };

    AddonBabel.register(CodeGround);

    return AddonBabel;
});