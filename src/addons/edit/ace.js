define([
    'skylark-langx/langx',
    'skylark-domx-data',
    'skylark-ace',
    "../../addon",
    '../../util',
    "../../codeground"
], function (langx,datax,ace,Addon,util,CodeGround) {
    'use strict';
    class AddonAce extends Addon {
        //constructor(coder, options) 

        _init() {
            super._init();
            var coder = this.coder,
                options = this.options;

            var priority = 1;
            var i;
            this.editors = {};
            //this.coder = coder;
            //options = langx.clone(options);
            //if (typeof //window.ace === 'undefined') {
            //    retur//n;
            // }
            var options = this.options;

            var $editors = coder.$('.codeg-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = datax.data($textarea, 'codeg-type');
                let file = datax.data($textarea, 'codeg-file');
                let $aceContainer = document.createElement('div');
                $editors[i].appendChild($aceContainer);
                let editor = this.editors[type] = ace.edit($aceContainer);
                let editorOptions = langx.clone(options);
                editor.getSession().setMode('ace/mode/' + util.getMode(type, file));
                editor.getSession().setOptions(editorOptions);
                editor.$blockScrolling = Infinity;

                editor.$textarea = $textarea;
                editor.on('change', this.editorChange({
                    type
                }));
            }
            this.listenTo(coder,"reseted",this.update);
            this.update();
        }
        
        editorChange(params) {
            return () => {
                var editor = this.editors[params.type];
                editor.$textarea.val(editor.getValue());
                editor.$textarea.trigger("change");
            };

            ///return () => {
            ///    var editor = this.editor[params.type];
            ///    params.content = editor.getValue();
            ///    this.coder.emit('change', params);
            ///};
        }
        update(e) {
            var codes = this.coder.getCodes();
            for (let type in this.editors) {
                let editor = this.editors[type],
                    code = codes[type],
                    content;
                if (langx.isString(code)) {
                    content = code;
                } else {
                    content = code.content || "";
                }
                editor.getSession().setValue(content);
            }

            ///var params = e.data,
            ///    editor = this.editor[params.type];
            ///editor.getSession().setValue(params.content);
        }


        static get categoryName() {
            return "edit";
        }

        static get addonName(){
            return "ace";
        }        
    };

    AddonAce.register(CodeGround);
    
    return AddonAce;
});