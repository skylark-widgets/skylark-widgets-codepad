define(function () {
    'use strict';
    function container() {
        return `
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
  `;
    }
    function paneActiveClass(type) {
        return `codepad-pane-active-${ type }`;
    }
    function containerClass() {
        return 'codepad';
    }
    function hasFileClass(type) {
        return `codepad-has-${ type }`;
    }
    function editorClass(type) {
        return `codepad-editor codepad-editor-${ type }`;
    }
    function editorContent(type) {
        return `
    <textarea data-codepad-type="${ type }" ></textarea>
    <div class="codepad-status"></div>
  `;
    }
    function statusMessage(err) {
        return `
    <p>${ err }</p>
  `;
    }
    function statusClass(type) {
        return `codepad-status-${ type }`;
    }
    function statusActiveClass(type) {
        return `codepad-status-active-${ type }`;
    }
    function pluginClass(name) {
        return `codepad-plugin-${ name }`;
    }
    function statusLoading(url) {
        return `Loading <strong>${ url }</strong>..`;
    }
    function statusFetchError(url) {
        return `There was an error loading <strong>${ url }</strong>.`;
    }
    return {
        container: container,
        paneActiveClass: paneActiveClass,
        containerClass: containerClass,
        hasFileClass: hasFileClass,
        editorClass: editorClass,
        editorContent: editorContent,
        statusMessage: statusMessage,
        statusClass: statusClass,
        statusActiveClass: statusActiveClass,
        pluginClass: pluginClass,
        statusLoading: statusLoading,
        statusFetchError: statusFetchError
    };
});