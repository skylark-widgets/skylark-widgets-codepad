/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util","../Coder"],function(e,n){"use strict";class t{constructor(n,t){if(this.options=e.extend(t,{}),void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}n.$container.querySelector('a[data-coder-type="js"]').innerHTML="ES2015",n.on("change",this.change.bind(this),20)}change(e,n){if("js"===e.type){try{e.content=this.babel.transform(e.content,this.options).code}catch(t){return n(t,e)}n(null,e)}else n(null,e)}}return n.plugin("babel",t),t});
//# sourceMappingURL=../sourcemaps/addons/babel.js.map
