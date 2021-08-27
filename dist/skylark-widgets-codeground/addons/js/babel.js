/**
 * skylark-widgets-codeground - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codeground/
 * @license MIT
 */
define(["skylark-langx/langx","../../_addon","../../util","../../code_ground"],function(e,t,n,a){"use strict";class i extends t{_init(){super._init();var e=this.coder;this.options;if(void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}e.$container.querySelector('a[data-codeg-type="js"]').innerHTML="ES2015",e.on("change",this.change.bind(this),20)}change(e){var t=e.data;if("js"===t.type)try{t.content=this.babel.transform(t.content,this.options).code}catch(e){return callback(e,t)}}static get categoryName(){return"js"}static get addonName(){return"babel"}}return i.register(a),i});
//# sourceMappingURL=../../sourcemaps/addons/js/babel.js.map
