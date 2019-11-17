/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,t,n){"use strict";class c{constructor(t,n){n=e.clone(n),void 0!==window.CoffeeScript&&(t.$container.querySelector('a[data-coder-type="js"]').innerHTML="CoffeeScript",t.on("change",this.change.bind(this),20))}isCoffee(e){return"js"===e.type&&(-1!==e.file.indexOf(".coffee")||""===e.file)}change(e){var t=e.data;if(this.isCoffee(t))try{t.content=window.CoffeeScript.compile(t.content)}catch(e){return callback(e,t)}}}return n.plugin("coffeescript",c),c});
//# sourceMappingURL=../sourcemaps/addons/coffeescript.js.map
