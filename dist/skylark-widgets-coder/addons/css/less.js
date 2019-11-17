/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../../Addon","../../util","../../addons"],function(s,e,t,n){"use strict";class i extends e{_init(){super._init();var s=this.coder;this.options;void 0!==window.less&&(s.$container.querySelector('a[data-coder-type="css"]').innerHTML="Less",s.on("change",this.change.bind(this),20))}isLess(s){return"css"===s.type&&(-1!==s.file.indexOf(".less")||""===s.file)}change(s){var e=s.data;this.isLess(e)&&window.less.render(e.content,this.options,(s,t)=>{if(s)return callback(s,e);e.content=t.css})}static get categoryName(){return"css"}static get addonName(){return"less"}}return n.css.less=i,i});
//# sourceMappingURL=../../sourcemaps/addons/css/less.js.map
