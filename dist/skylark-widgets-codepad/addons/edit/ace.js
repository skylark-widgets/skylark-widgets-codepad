/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../../addon","../../util","../../codepad"],function(c,g,l,e,h,t){"use strict";class a extends e{_init(){super._init();for(var e=this.coder,t=(this.options,this.editors={},this.options),a=e.$(".codepad-editor"),i=0;i<a.length;i++){var s=a[i].querySelector("textarea"),r=g.data(s,"codepad-type"),d=g.data(s,"codepad-file"),o=document.createElement("div"),o=(a[i].appendChild(o),this.editors[r]=l.edit(o)),n=c.clone(t);o.getSession().setMode("ace/mode/"+h.getMode(r,d)),o.getSession().setOptions(n),o.$blockScrolling=1/0,o.$textarea=s,o.on("change",this.editorChange({type:r}))}this.listenTo(e,"reseted",this.update),this.update()}editorChange(t){return()=>{var e=this.editors[t.type];e.$textarea.val(e.getValue()),e.$textarea.trigger("change")}}update(e){var i,s=this.coder.getCodes();for(i in this.editors){let e=this.editors[i],t=s[i],a;a=c.isString(t)?t:t.content||"",e.getSession().setValue(a)}}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return a.register(t),a});
//# sourceMappingURL=../../sourcemaps/addons/edit/ace.js.map
