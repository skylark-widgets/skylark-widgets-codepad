/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","../../addon","../../util","../../codepad"],function(e,t,i,a){"use strict";class n extends t{_init(){super._init();var e=this.coder;this.options;void 0!==window.CoffeeScript&&(e.$('a[data-codepad-type="js"]').html("CoffeeScript"),this.listenTo(e,"changed",this.update))}isCoffee(e){return"js"===e.type&&(-1!==e.file.indexOf(".coffee")||""===e.file)}update(t){t=t.data;if(this.isCoffee(t))try{t.content=window.CoffeeScript.compile(t.content)}catch(e){return callback(e,t)}}static get categoryName(){return"js"}static get addonName(){return"coffeescript"}}return n.register(a),n});
//# sourceMappingURL=../../sourcemaps/addons/js/coffeescript.js.map
