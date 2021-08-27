/**
 * skylark-widgets-codeground - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codeground/
 * @license MIT
 */
define(["skylark-langx/langx","../../_addon","../../util","../../code_ground"],function(t,e,s,n){"use strict";class i extends e{_init(){super._init();var t=this.coder;this.options;void 0!==window.stylus&&(t.$container.querySelector('a[data-codeg-type="css"]').innerHTML="Stylus",t.on("change",this.change.bind(this),20))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}change(t){var e=t.data;this.isStylus(e)&&window.stylus(e.content,this.options).render((t,s)=>{if(t)return callback(t,e);e.content=s})}static get categoryName(){return"css"}static get addonName(){return"stylus"}}return i.register(n),i});
//# sourceMappingURL=../../sourcemaps/addons/css/stylus.js.map
