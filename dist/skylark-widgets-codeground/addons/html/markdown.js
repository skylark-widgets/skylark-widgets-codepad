/**
 * skylark-widgets-codeground - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codeground/
 * @license MIT
 */
define(["skylark-langx/langx","../../_addon","../../util","../../code_ground"],function(t,e,n,a){"use strict";class r extends e{_init(){super._init();var t=this.coder,e=this.options;void 0!==window.marked&&(window.marked.setOptions(e),t.$container.querySelector('a[data-codeg-type="html"]').innerHTML="Markdown",t.on("change",this.change.bind(this),20))}change(t){var e=t.data;if("html"===e.type)try{e.content=window.marked(e.content)}catch(t){return callback(t,e)}}static get categoryName(){return"html"}static get addonName(){return"markdown"}}return r.register(a),r});
//# sourceMappingURL=../../sourcemaps/addons/html/markdown.js.map
