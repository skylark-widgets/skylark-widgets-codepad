/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["../util"],function(n){"use strict";return class{constructor(t,e){this.options=n.extend(e,{}),void 0!==window.marked&&(window.marked.setOptions(e),t.$container.querySelector('a[data-coder-type="html"]').innerHTML="Markdown",t.on("change",this.change.bind(this),20))}change(n,t){if("html"===n.type){try{n.content=window.marked(n.content)}catch(e){return t(e,n)}t(null,n)}else t(null,n)}}});
//# sourceMappingURL=../sourcemaps/plugins/markdown.js.map
