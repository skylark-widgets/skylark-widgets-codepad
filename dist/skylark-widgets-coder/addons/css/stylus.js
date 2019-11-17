/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../../Addon","../../util","../../addons"],function(t,s,e,n){"use strict";class i extends s{_init(){super._init();var t=this.coder;this.options;void 0!==window.stylus&&(t.$container.querySelector('a[data-coder-type="css"]').innerHTML="Stylus",t.on("change",this.change.bind(this),20))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}change(t){var s=t.data;this.isStylus(s)&&window.stylus(s.content,this.options).render((t,e)=>{if(t)return callback(t,s);s.content=e})}static get categoryName(){return"css"}static get addonName(){return"stylus"}}return n.css.stylus=i,i});
//# sourceMappingURL=../../sourcemaps/addons/css/stylus.js.map
