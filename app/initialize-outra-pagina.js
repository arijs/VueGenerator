(function() {
	var vars = this._var$;
	var App = this._app$;
	var VComp = this._vcomp$;
	var Utils = vars.Utils;
	var BaseComponent = vars.BaseComponent;

	var strPojo = String({});

	var appExemploFormId = 'app--exemplo-form';
	vars.compLoader.manager(appExemploFormId, function(err, compOptions) {
		var Comp, comp;
		if (err) {
			var strErr = String(err);
			if (strErr === strPojo) {
				strErr = JSON.stringify(err);
			}
			Comp = BaseComponent.extend({
				template:
					'<div class="' +
					appExemploFormId +
					'--component-error"><pre>' +
					Utils.htmlEntitiesEncode(strErr) +
					'</pre></div>'
			});
			comp = new Comp();
			comp.$mount('#mount');
			App.$exemploFormError = comp;
			return;
		}
		compOptions.store = App.store;
		Comp = BaseComponent.component(appExemploFormId, compOptions);
		//vars.compLoader.vueLazyLoad.register(appExemploFormId, Comp); não é necessário
		comp = new Comp();
		comp.$mount('#mount');
		App.$exemploForm = comp;
	});

	// App.store.dispatch('loadGetLogin');
	// App.store.commit('setScreen', 1);
})();
