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

	function url(url) {
		return vars.BaseUrl + url;
	}

	var mapSession = {
		admin: url('api/session/admin.json'),
		user: url('api/session/user.json'),
		not_logged: url('api/session/not-logged.json')
	};
	var defaultSession = mapSession.not_logged;

	Services.session = function(opt) {
		var url = App.sessionUrl;
		opt.ajax = {
			url: url && mapSession[url] || defaultSession
		};
		return opt;
	};

	Services.login = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: url('api/login'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify(params)
		};
		return opt;
	};

})();
