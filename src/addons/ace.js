define([
    'skylark-langx/langx',
    'skylark-domx-data',
    'skylark-ace',
    '../util',
    "../Coder"
], function (langx,datax,ace,util,Coder) {
    'use strict';
    class PluginAce {
        constructor(coder, options) {
            var priority = 1;
            var i;
            this.editor = {};
            this.coder = coder;
            options = langx.clone(options);
            //if (typeof window.ace === 'undefined') {
            //    return;
            // }
            var $editors = coder.$container.querySelectorAll('.coder-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = datax.data($textarea, 'coder-type');
                let file = datax.data($textarea, 'coder-file');
                let $aceContainer = document.createElement('div');
                $editors[i].appendChild($aceContainer);
                this.editor[type] = ace.edit($aceContainer);
                let editor = this.editor[type];
                let editorOptions = langx.clone(options);
                editor.getSession().setMode('ace/mode/' + util.getMode(type, file));
                editor.getSession().setOptions(editorOptions);
                editor.$blockScrolling = Infinity;
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
            if (!params.aceEditor) {
                editor.getSession().setValue(params.content);
                params.aceEditor = editor;
                editor.on('change', this.editorChange(params));
            }
            params.content = editor.getValue();
            callback(null, params);
        }
    };

    Coder.plugin('ace', PluginAce);
    
    return PluginAce;
});