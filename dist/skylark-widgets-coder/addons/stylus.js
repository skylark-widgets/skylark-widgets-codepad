/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(t,n,s){"use strict";class e{constructor(n,s){s=t.clone(s),void 0!==window.stylus&&(n.$container.querySelector('a[data-coder-type="css"]').innerHTML="Stylus",n.on("change",this.change.bind(this),20))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}change(t){var n=t.data;this.isStylus(n)&&window.stylus(n.content,this.options).render((t,s)=>{if(t)return callback(t,n);n.content=s})}}return s.plugin("stylus",e),e});
//# sourceMappingURL=../sourcemaps/addons/stylus.js.map
