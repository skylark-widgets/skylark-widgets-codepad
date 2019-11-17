define([
    'skylark-langx/langx',
    'skylark-domx-data',
    'skylark-codemirror/CodeMirror',
    '../util',
    "../Coder"    
], function (langx,datax,CodeMirror,util,Coder) {
    'use strict';
    class PluginCodeMirror {
        constructor(coder, options) {
            var priority = 1;
            var i;
            this.editor = {};
            this.coder = coder;
            var modemap = { 'html': 'htmlmixed' };
            options = langx.extend({},options, { lineNumbers: true });
            //if (typeof window.CodeMirror === 'undefined') {
            //    return;
            //}
            var $editors = coder.$container.querySelectorAll('.coder-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = datax.data($textarea, 'coder-type');
                let file = datax.data($textarea, 'coder-file');
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