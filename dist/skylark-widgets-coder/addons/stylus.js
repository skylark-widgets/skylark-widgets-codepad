/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util","../Coder"],function(t,n){"use strict";class e{constructor(n,e){e=t.extend(e,{}),void 0!==window.stylus&&(n.$container.querySelector('a[data-coder-type="css"]').innerHTML="Stylus",n.on("change",this.change.bind(this),20))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}change(t,n){this.isStylus(t)?window.stylus(t.content,this.options).render((e,s)=>{if(e)return n(e,t);t.content=s,n(null,t)}):n(null,t)}}return n.plugin("stylus",e),e});
//# sourceMappingURL=../sourcemaps/addons/stylus.js.map
