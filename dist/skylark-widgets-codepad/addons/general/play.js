/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-noder","skylark-domx-eventer","skylark-domx-query","../../addon","../../util","../../codepad"],function(e,t,n,s,i,a,c){class o extends i{get options(){return{firstRun:!0}}_init(){super._init();var t=this.coder,e={},n=(!1===this.options.firstRun&&(e={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}}),s("<button/>").prop({className:"codepad-button codepad-button-play",innerHTML:"Run"}));t.$().append(n),this.listenTo(n,"click",this.run),this.listenTo(t,"changed",this.update),this.cache=e,this.code={},this.coder=t}update(t){t=t.data;this.code[t.type]=e.clone(t),void 0!==this.cache[t.type]?this.cache[t.type].forceRender=null:this.cache[t.type]=e.clone(t)}run(){this.coder.emit("reseted")}static get categoryName(){return"general"}static get addonName(){return"play"}}return o.register(c),o});
//# sourceMappingURL=../../sourcemaps/addons/general/play.js.map
