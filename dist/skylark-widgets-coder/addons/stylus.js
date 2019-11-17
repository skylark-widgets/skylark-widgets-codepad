/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(n,t,s){"use strict";class e{constructor(t,s){s=n.clone(s),void 0!==window.stylus&&(t.$container.querySelector('a[data-coder-type="css"]').innerHTML="Stylus",t.on("change",this.change.bind(this),20))}isStylus(n){return"css"===n.type&&(-1!==n.file.indexOf(".styl")||""===n.file)}change(n,t){this.isStylus(n)?window.stylus(n.content,this.options).render((s,e)=>{if(s)return t(s,n);n.content=e,t(null,n)}):t(null,n)}}return s.plugin("stylus",e),e});
//# sourceMappingURL=../sourcemaps/addons/stylus.js.map
