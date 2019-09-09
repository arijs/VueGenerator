(function() {
	var vars = this._var$;
	var App = this._app$;
	var VComp = this._vcomp$;
	var Utils = VComp.Utils = vars.Utils;
	var BaseComponent = vars.BaseComponent;

	var appRootId = 'app--root';
	vars.compLoader.manager(appRootId, function(err, compOptions) {
		var Comp, comp;
		if (err) {
			var strErr = String(err);
			if (strErr === String({})) {
				strErr = JSON.stringify(err);
			}
			Comp = BaseComponent.extend({
				template:
					'<div class="' +
					appRootId +
					'--component-error"><pre>' +
					Utils.htmlEntitiesEncode(strErr) +
					'</pre></div>'
			});
			comp = new Comp();
			comp.$mount('#mount');
			App.$rootError = comp;
			App.defer.$root.done(err, null);
			return;
		}
		compOptions.store = App.store;
		compOptions.router = App.router;
		Comp = BaseComponent.component(appRootId, compOptions);
		comp = new Comp();
		comp.$mount('#mount');
		App.$root = comp;
		App.defer.$root.done(null, comp);
	});

	// App.store.dispatch('loadGetLogin');
	// App.store.commit('setScreen', 1);
})();
