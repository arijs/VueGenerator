(function() {
	var vars = this._var$;
	var App = this._app$;
	var Utils = vars.Utils;
	var Services = {};
	var Env = {
		name: 'local',
		Services: Services
	};
	App.Env = Env;

	var mapSession = {
		admin: vars.BaseUrl + 'api/session/admin.json',
		user: vars.BaseUrl + 'api/session/user.json',
		not_logged: vars.BaseUrl + 'api/session/not-logged.json'
	};
	var defaultSession = mapSession.not_logged;

	Services.session = function(opt) {
		var url = App.sessionUrl;
		opt.ajax = {
			url: url && mapSession[url] || defaultSession
		};
		return opt;
	};

})();
