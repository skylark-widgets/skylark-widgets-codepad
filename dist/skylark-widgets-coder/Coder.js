/**
 * skylark-widgets-coder - The skylark code editor widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-coder/
 * @license MIT
 */
define(["skylark-langx/skylark","./util","./template","./plugin","./pubsoup"],function(t,e,s,i,a,n){"use strict";class r{constructor(t,n){if(!t)throw new Error("Can't find Coder container.");var r={};this._get=function(t){return r[t]},this._set=function(t,e){return r[t]=e,r[t]};var l=this._set("options",e.extend(n,{files:[],showBlank:!1,runScripts:!0,pane:"result",debounce:250,plugins:[]}));l.plugins.push("render"),!1===l.runScripts&&l.plugins.push("scriptless"),this._set("cachedContent",{html:null,css:null,js:null});var o=this._set("pubsoup",new a);this._set("trigger",this.trigger()),this._set("on",function(){o.subscribe.apply(o,arguments)}),this._set("off",function(){o.unsubscribe.apply(o,arguments)}),this._set("done",function(){o.done.apply(o,arguments)})("change",this.errors.bind(this));var u=this._set("$container",t);u.innerHTML=s.container(),e.addClass(u,s.containerClass());var h=this._set("paneActive",l.pane);e.addClass(u,s.paneActiveClass(h)),this._set("$status",{});for(let t of["html","css","js"])this.markup(t);u.addEventListener("keyup",e.debounce(this.change.bind(this),l.debounce)),u.addEventListener("change",e.debounce(this.change.bind(this),l.debounce)),u.addEventListener("click",this.pane.bind(this)),this.$container=this._get("$container"),this.on=this._get("on"),this.off=this._get("off"),this.done=this._get("done"),this.trigger=this._get("trigger"),this.paneActive=this._get("paneActive"),this._set("plugins",{}),i.init.call(this);for(let t of["html","css","js"])this.load(t);if(l.showBlank)for(let t of["html","css","js"])e.addClass(u,s.hasFileClass(t))}findFile(t){var e=this._get("options");for(let s in e.files){let i=e.files[s];if(i.type===t)return i}return{}}markup(t){var i=this._get("$container"),a=i.querySelector(`.coder-pane-${t}`),n=this.findFile(t),r=document.createElement("div");r.innerHTML=s.editorContent(t,n.url),r.className=s.editorClass(t),a.appendChild(r),this._get("$status")[t]=a.querySelector(".coder-status"),void 0===n.url&&void 0===n.content||e.addClass(i,s.hasFileClass(t))}load(t){var i=this.findFile(t),a=this._get("$container").querySelector(`.coder-pane-${t} textarea`);void 0!==i.content?this.setValue(a,i.content):void 0!==i.url?(this.status("loading",[s.statusLoading(i.url)],{type:t,file:i}),e.fetch(i.url,(e,i)=>{e?this.status("error",[s.statusFetchError(e)],{type:t}):(this.clearStatus("loading",{type:t}),this.setValue(a,i))})):this.setValue(a,"")}setValue(t,e){t.value=e,this.change({target:t})}change(t){var s=e.data(t.target,"coder-type");if(s){var i=this._get("cachedContent");i[s]!==t.target.value&&(i[s]=t.target.value,this.trigger("change",{type:s,file:e.data(t.target,"coder-file"),content:i[s]}))}}errors(t,e){this.status("error",t,e)}pane(t){if(e.data(t.target,"coder-type")){var i=this._get("$container"),a=this._get("paneActive");e.removeClass(i,s.paneActiveClass(a)),a=this._set("paneActive",e.data(t.target,"coder-type")),e.addClass(i,s.paneActiveClass(a)),t.preventDefault()}}status(t="error",i=[],a={}){if(!i.length)return this.clearStatus(t,a);var n=this._get("$status");e.addClass(n[a.type],s.statusClass(t)),e.addClass(this._get("$container"),s.statusActiveClass(a.type));var r="";i.forEach(function(t){r+=s.statusMessage(t)}),n[a.type].innerHTML=r}clearStatus(t,i){var a=this._get("$status");e.removeClass(a[i.type],s.statusClass(t)),e.removeClass(this._get("$container"),s.statusActiveClass(i.type)),a[i.type].innerHTML=""}trigger(){var t=this._get("options"),e=this._get("pubsoup");if(!1===t.debounce)return function(){e.publish.apply(e,arguments)};var s={},i={};return function(a,{type:n="default"}={}){s[n]?i[n]=!0:e.publish.apply(e,arguments),clearTimeout(s[n]),s[n]=setTimeout(()=>{i[n]&&e.publish.apply(e,arguments),i[n]=null,s[n]=null},t.debounce)}}}return r.plugin=function(){return i.register.apply(this,arguments)},t.attach("widgets.Coder",r)});
//# sourceMappingURL=sourcemaps/Coder.js.map
