/**
 * skylark-widgets-codepad - The skylark code playground widget for showcasing html/css/js.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-codepad/
 * @license MIT
 */
define(function(){"use strict";return{container:function(){return`
    <ul class="codepad-nav">
      <li class="codepad-nav-item codepad-nav-item-result">
        <a href="#" data-codepad-type="result">
          Result
        </a>
      </li>
      <li class="codepad-nav-item codepad-nav-item-html">
        <a href="#" data-codepad-type="html">
          HTML
        </a>
      </li>
      <li class="codepad-nav-item codepad-nav-item-css">
        <a href="#" data-codepad-type="css">
          CSS
        </a>
      </li>
      <li class="codepad-nav-item codepad-nav-item-js">
        <a href="#" data-codepad-type="js">
          JavaScript
        </a>
      </li>
    </ul>
    <div class="codepad-pane codepad-pane-result"><iframe></iframe></div>
    <div class="codepad-pane codepad-pane-html"></div>
    <div class="codepad-pane codepad-pane-css"></div>
    <div class="codepad-pane codepad-pane-js"></div>
  `},paneActiveClass:function(a){return"codepad-pane-active-"+a},containerClass:function(){return"codepad"},hasFileClass:function(a){return"codepad-has-"+a},editorClass:function(a){return"codepad-editor codepad-editor-"+a},editorContent:function(a){return`
    <textarea data-codepad-type="${a}" ></textarea>
    <div class="codepad-status"></div>
  `},statusMessage:function(a){return`
    <p>${a}</p>
  `},statusClass:function(a){return"codepad-status-"+a},statusActiveClass:function(a){return"codepad-status-active-"+a},pluginClass:function(a){return"codepad-plugin-"+a},statusLoading:function(a){return`Loading <strong>${a}</strong>..`},statusFetchError:function(a){return`There was an error loading <strong>${a}</strong>.`}}});
//# sourceMappingURL=sourcemaps/template.js.map
