/**
 * skylark-widgets-codeground - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codeground/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-ace","../../addon","../../util","../../codeground"],function(e,t,i,a,s,r){"use strict";class o extends a{_init(){super._init();var a,r=this.coder,o=this.options;this.editors={};o=this.options;var d=r.$(".codeg-editor");for(a=0;a<d.length;a++){let r=d[a].querySelector("textarea"),n=t.data(r,"codeg-type"),g=t.data(r,"codeg-file"),c=document.createElement("div");d[a].appendChild(c);let l=this.editors[n]=i.edit(c),h=e.clone(o);l.getSession().setMode("ace/mode/"+s.getMode(n,g)),l.getSession().setOptions(h),l.$blockScrolling=1/0,l.$textarea=r,l.on("change",this.editorChange({type:n}))}this.listenTo(r,"reseted",this.update),this.update()}editorChange(e){return()=>{var t=this.editors[e.type];t.$textarea.val(t.getValue()),t.$textarea.trigger("change")}}update(t){var i=this.coder.getCodes();for(let t in this.editors){let a,s=this.editors[t],r=i[t];a=e.isString(r)?r:r.content||"",s.getSession().setValue(a)}}static get categoryName(){return"edit"}static get addonName(){return"ace"}}return o.register(r),o});
//# sourceMappingURL=../../sourcemaps/addons/edit/ace.js.map
