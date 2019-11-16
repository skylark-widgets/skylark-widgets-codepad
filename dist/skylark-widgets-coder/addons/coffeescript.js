/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util","../Coder"],function(e,t){"use strict";class n{constructor(t,n){n=e.extend(n,{}),void 0!==window.CoffeeScript&&(t.$container.querySelector('a[data-coder-type="js"]').innerHTML="CoffeeScript",t.on("change",this.change.bind(this),20))}isCoffee(e){return"js"===e.type&&(-1!==e.file.indexOf(".coffee")||""===e.file)}change(e,t){if(this.isCoffee(e))try{e.content=window.CoffeeScript.compile(e.content)}catch(n){return t(n,e)}t(null,e)}}return t.plugin("coffeescript",n),n});
//# sourceMappingURL=../sourcemaps/addons/coffeescript.js.map
