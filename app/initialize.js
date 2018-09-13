(function() {

var vars = this._var$;
var App = this._app$;
var VComp = this._vcomp$;
var Utils = vars.Utils;

function getScopePrefixLoader(scope) {
	var meta = scope.meta;
	return Utils.fnPrefixLoader({
		prefix: meta.PREFIX+'--',
		loader: Utils.componentDynamic,
		getUrl: meta.COMP_URL
			? function(match) {
				return meta.COMP_URL + match.href;
			}
			: function(match) {
				return vars.BaseUrl + meta.COMP_PATH_PREFIX + match.href;
			},
		setJs: function(match, callback) {
			scope.compMap[match.path](function(err, js) {
				match.js = js;
				callback(err);
			});
		}
	});
}

var appLoader = getScopePrefixLoader(App);
var vcompLoader = getScopePrefixLoader(VComp);

var loadManager = Utils.fnLoadManager({
	prefixLoaders: [appLoader, vcompLoader]
});
var vueLazyLoad = Utils.vueDynamicComponent({
	getLoader: loadManager.getLoader
});

Vue.mixin({ _lazyLoadComponent: vueLazyLoad });

vars.compLoader = {
	App: appLoader,
	VComp: vcompLoader,
	manager: loadManager,
	vueLazyLoad: vueLazyLoad
};

// Vue.component('masked-input', vueTextMask.default);

Vue.component('vnode', {
	functional: true,
	render: function(h, context){
		return context.props.node;
	}
});

var strPojo = String({});

vueLazyLoad('app--root')(
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
			template: '<div class="app--component-error"><pre>'
				+ Utils.htmlEntitiesEncode(strErr)
				+ '</pre></div>'
		});
	}
);

// App.store.dispatch('loadGetLogin');
// App.store.commit('setScreen', 1);

})();
