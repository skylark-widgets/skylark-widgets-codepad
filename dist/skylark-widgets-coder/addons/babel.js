/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(e,n,t){"use strict";class a{constructor(n,t){if(this.options=e.clone(t),void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}n.$container.querySelector('a[data-coder-type="js"]').innerHTML="ES2015",n.on("change",this.change.bind(this),20)}change(e){var n=e.data;if("js"===n.type)try{n.content=this.babel.transform(n.content,this.options).code}catch(e){return callback(e,n)}}}return t.plugin("babel",a),a});
//# sourceMappingURL=../sourcemaps/addons/babel.js.map
