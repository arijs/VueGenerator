(function() {

var vars = this._var$;
var App = this._app$;
var VComp = this._vcomp$;
var Utils = vars.Utils;

var appLoader = Utils.fnPrefixLoader({
	prefix: 'app--',
	loader: Utils.componentDynamic,
	getUrl: function(match) {
		return vars.BaseUrl + 'app/comp/' + match.href;
	},
	setJs: function(match, callback) {
		App.compMap[match.path](function(err, js) {
			match.js = js;
			callback(err);
		});
	}
});

var vcompLoader = Utils.fnPrefixLoader({
	prefix: 'vcomp--',
	loader: Utils.componentDynamic,
	getUrl: function(match) {
		return 'https://unpkg.com/@arijs/frontend@0.1.0/vcomp/' + match.href;
		// return vars.BaseUrl + 'vcomp/' + match.href;
	},
	setJs: function(match, callback) {
		VComp.compMap[match.path](function(err, js) {
			match.js = js;
			callback(err);
		});
	}
});

var loadManager = Utils.fnLoadManager({
	prefixLoaders: [appLoader, vcompLoader]
});

Vue.mixin({
	_lazyLoadComponent: Utils.vueDynamicComponent({
		getLoader: loadManager.getLoader
	})
});

// Vue.component('masked-input', vueTextMask.default);

Vue.component('vnode', {
	functional: true,
	render: function(h, context){
		return context.props.node;
	}
});

var strPojo = String({});

Vue.options._lazyLoadComponent('app--root')(
	function(appRoot) {
		appRoot.store = App.store;
		var AppRoot = Vue.component('app--root', appRoot);
		var root = new AppRoot();
		root.$mount('#mount');
		App.$root = root;
	},
	function(err) {
		var strErr = String(err);
		if (strErr === strPojo) {
			strErr = JSON.stringify(err);
		}
		App.$rootError = new Vue({
			el: '#mount',
			template: '<div class="app--component-error">'
				+ Utils.htmlEntitiesEncode(strErr)
				+ '</div>'
		});
	}
);

// App.store.dispatch('loadGetLogin');
// App.store.commit('setScreen', 1);

})();
