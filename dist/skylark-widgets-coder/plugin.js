/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-domx-styler","./util","./template"],function(t,i,n){"use strict";var e=[];return{register:function(t,i){i._id=t,e.push(i)},init:function(){this.options.plugins.forEach(i=>{let s,r,o={};"string"==typeof i?r=i:"object"==typeof i&&(r=i.name,o=i.options||{}),s=function(t){for(let i in e){let n=e[i];if(n._id===t)return n}throw new Error(`Plugin ${t} is not registered.`)}(r),this._get("plugins")[i]=new s(this,o),t.addClass(this.$container,n.pluginClass(r))})}}});
//# sourceMappingURL=sourcemaps/plugin.js.map
