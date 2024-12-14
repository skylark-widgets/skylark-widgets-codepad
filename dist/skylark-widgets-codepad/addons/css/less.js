/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","../../addon","../../util","../../codepad"],function(s,e,t,i){"use strict";class n extends e{_init(){super._init();var s=this.coder;this.options;void 0!==window.less&&(s.$('a[data-codepad-type="css"]').html("Less"),this.listenTo(s,"changed",this.update))}isLess(s){return"css"===s.type&&(-1!==s.file.indexOf(".less")||""===s.file)}update(s){var t=s.data;this.isLess(t)&&window.less.render(t.content,this.options,(s,e)=>{if(s)return callback(s,t);t.content=e.css})}static get categoryName(){return"css"}static get addonName(){return"less"}}return n.register(i),n});
//# sourceMappingURL=../../sourcemaps/addons/css/less.js.map
