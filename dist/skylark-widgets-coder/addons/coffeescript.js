/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,n,t){"use strict";class i{constructor(n,t){t=e.clone(t),void 0!==window.CoffeeScript&&(n.$container.querySelector('a[data-coder-type="js"]').innerHTML="CoffeeScript",n.on("change",this.change.bind(this),20))}isCoffee(e){return"js"===e.type&&(-1!==e.file.indexOf(".coffee")||""===e.file)}change(e,n){if(this.isCoffee(e))try{e.content=window.CoffeeScript.compile(e.content)}catch(t){return n(t,e)}n(null,e)}}return t.plugin("coffeescript",i),i});
//# sourceMappingURL=../sourcemaps/addons/coffeescript.js.map
