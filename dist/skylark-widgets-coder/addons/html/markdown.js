/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../../Addon","../../util","../../addons"],function(t,n,e,a){"use strict";class r extends n{_init(){super._init();var t=this.coder,n=this.options;void 0!==window.marked&&(window.marked.setOptions(n),t.$container.querySelector('a[data-coder-type="html"]').innerHTML="Markdown",t.on("change",this.change.bind(this),20))}change(t){var n=t.data;if("html"===n.type)try{n.content=window.marked(n.content)}catch(t){return callback(t,n)}}static get categoryName(){return"html"}static get addonName(){return"markdown"}}return a.html.markdown=r,r});
//# sourceMappingURL=../../sourcemaps/addons/html/markdown.js.map
