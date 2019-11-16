/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util"],function(e){"use strict";return class{constructor(t,n){if(this.options=e.extend(n,{}),void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}t.$container.querySelector('a[data-coder-type="js"]').innerHTML="ES2015",t.on("change",this.change.bind(this),20)}change(e,t){if("js"===e.type){try{e.content=this.babel.transform(e.content,this.options).code}catch(n){return t(n,e)}t(null,e)}else t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/babel.js.map
