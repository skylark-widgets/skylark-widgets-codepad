/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-net-http/Xhr"],function(c,e){"use strict";function f(n,t,e){e[n](t,function(e,n,i,r,s){return function(n,t){n&&r.push(n),++e<i.length?f(e,t,i,r,s):s(r,t)}}.apply(this,arguments))}var u={html:"html",css:"css",js:"javascript",less:"less",styl:"stylus",coffee:"coffeescript"};return{fetch:function(n,t){e.get(n).then(function(n){t(null,n)},function(n){t(n)})},seq:function(n,t,e=function(){}){var i=[];if(!n.length)return e(i,t);f(0,t,n,i,e)},log:function(){console.log(arguments)},getMode:function(n="",t="",e={}){var i,r,s=c.mixin({},u,e);for(i in s){var f=i.length;if(t.slice(-+f)==="."+i)return s[i]}for(r in s)if(n===r)return s[r];return n}}});
//# sourceMappingURL=sourcemaps/util.js.map
