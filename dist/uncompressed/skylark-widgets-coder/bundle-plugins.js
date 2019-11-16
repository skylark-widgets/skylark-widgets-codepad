define([
    './plugins/render',
    './plugins/scriptless',
    './plugins/ace',
    './plugins/codemirror',
    './plugins/less',
    './plugins/coffeescript',
    './plugins/stylus',
    './plugins/babel',
    './plugins/markdown',
    './plugins/console',
    './plugins/play',
    './plugins/pen'
], function (PluginRender, PluginScriptless, PluginAce, PluginCodeMirror, PluginLess, PluginCoffeeScript, PluginStylus, PluginBabel, PluginMarkdown, PluginConsole, PluginPlay, PluginPen) {
    'use strict';
    return function BundlePlugins(coder) {
        coder.plugin('render', PluginRender);
        coder.plugin('scriptless', PluginScriptless);
        coder.plugin('ace', PluginAce);
        coder.plugin('codemirror', PluginCodeMirror);
        coder.plugin('less', PluginLess);
        coder.plugin('coffeescript', PluginCoffeeScript);
        coder.plugin('stylus', PluginStylus);
        coder.plugin('babel', PluginBabel);
        coder.plugin('markdown', PluginMarkdown);
        coder.plugin('console', PluginConsole);
        coder.plugin('play', PluginPlay);
        coder.plugin('pen', PluginPen);
    };
});