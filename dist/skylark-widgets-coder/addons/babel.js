/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,n,t){"use strict";class i{constructor(n,t){if(this.options=e.clone(t),void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}n.$container.querySelector('a[data-coder-type="js"]').innerHTML="ES2015",n.on("change",this.change.bind(this),20)}change(e,n){if("js"===e.type){try{e.content=this.babel.transform(e.content,this.options).code}catch(t){return n(t,e)}n(null,e)}else n(null,e)}}return t.plugin("babel",i),i});
//# sourceMappingURL=../sourcemaps/addons/babel.js.map
