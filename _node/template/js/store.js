(function(vars) {
	var Utils = vars.Utils;
	var query = Utils.parseQuery(location.search);
	var state = {
		baseUrl: (vars.BaseUrl || ''),
		query: query
	};
	var getters = {};
	var actions = {};
	var mutations = {};
	var store = new Vuex.Store({
		state: state,
		getters: getters,
		actions: actions,
		mutations: mutations
	});
	vars.store = store;
})(window.{{GLOBAL_VAR}});