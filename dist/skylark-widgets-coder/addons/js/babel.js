/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../../Addon","../../util","../../addons"],function(t,e,n,a){"use strict";class i extends e{_init(){super._init();var t=this.coder;this.options;if(void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}t.$container.querySelector('a[data-coder-type="js"]').innerHTML="ES2015",t.on("change",this.change.bind(this),20)}change(t){var e=t.data;if("js"===e.type)try{e.content=this.babel.transform(e.content,this.options).code}catch(t){return callback(t,e)}}static get categoryName(){return"js"}static get addonName(){return"babel"}}return a.js.babel=i,i});
//# sourceMappingURL=../../sourcemaps/addons/js/babel.js.map
