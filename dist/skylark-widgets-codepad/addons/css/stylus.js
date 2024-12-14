/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","../../addon","../../util","../../codepad"],function(t,s,e,i){"use strict";class n extends s{_init(){super._init();var t=this.coder;this.options;void 0!==window.stylus&&(t.$('a[data-codepad-type="css"]').html("Stylus"),this.listenTo(t,"changed",this.update))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}update(t){var e=t.data;this.isStylus(e)&&window.stylus(e.content,this.options).render((t,s)=>{if(t)return callback(t,e);e.content=s})}static get categoryName(){return"css"}static get addonName(){return"stylus"}}return n.register(i),n});
//# sourceMappingURL=../../sourcemaps/addons/css/stylus.js.map
