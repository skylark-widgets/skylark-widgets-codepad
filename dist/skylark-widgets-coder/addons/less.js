/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,s,n){"use strict";class t{constructor(s,n){n=e.clone(n),void 0!==window.less&&(s.$container.querySelector('a[data-coder-type="css"]').innerHTML="Less",s.on("change",this.change.bind(this),20))}isLess(e){return"css"===e.type&&(-1!==e.file.indexOf(".less")||""===e.file)}change(e){var s=e.data;this.isLess(s)&&window.less.render(s.content,this.options,(e,n)=>{if(e)return callback(e,s);s.content=n.css})}}return n.plugin("less",t),t});
//# sourceMappingURL=../sourcemaps/addons/less.js.map
