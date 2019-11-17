/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/langx","../util","../Coder"],function(n,t,e){"use strict";class a{constructor(t,e){this.options=n.clone(e),void 0!==window.marked&&(window.marked.setOptions(e),t.$container.querySelector('a[data-coder-type="html"]').innerHTML="Markdown",t.on("change",this.change.bind(this),20))}change(n){var t=n.data;if("html"===t.type)try{t.content=window.marked(t.content)}catch(n){return callback(n,t)}}}return e.plugin("markdown",a),a});
//# sourceMappingURL=../sourcemaps/addons/markdown.js.map
