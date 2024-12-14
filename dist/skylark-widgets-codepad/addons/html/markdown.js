/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","../../addon","../../util","../../codepad"],function(t,e,a,n){"use strict";class d extends e{_init(){super._init();var t=this.coder,e=this.options;void 0!==window.marked&&(window.marked.setOptions(e),t.$('a[data-codepad-type="html"]').html("Markdown"),this.listenTo(t,"changed",this.update))}update(e){e=e.data;if("html"===e.type)try{e.content=window.marked(e.content)}catch(t){return callback(t,e)}}static get categoryName(){return"html"}static get addonName(){return"markdown"}}return d.register(n),d});
//# sourceMappingURL=../../sourcemaps/addons/html/markdown.js.map
