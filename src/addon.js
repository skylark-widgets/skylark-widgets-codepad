define([
	"skylark-domx-styler",
	"skylark-widgets-base/addon"
],function(styler,_Addon){
	return class Addon extends _Addon {
		_init() {
            this.coder = this._widget;

            this.options.pluginCssClass = this.options.pluginClass || ("codepad-plugin-" + this.constructor.addonName);

			if (this.options.pluginCssClass) {
	            styler.addClass(this._widget._elm, this.options.pluginCssClass);			
			}

		}

	}
})