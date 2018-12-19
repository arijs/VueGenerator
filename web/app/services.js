(function() {
	var App = this._app$;
	var vars = this._var$;
	var Utils = vars.Utils;

	var Env = App.Env;
	var Services = {};

	App.Services = Services;

	Services.session = function(callback) {
		var opt = Env.Services.session({
			parse: Utils.loadService.parseJsonIgnoreType,
			callback: callback,
			dataValidate: function(data) {
				if (!data) {
					return {
						message: 'Resposta vazia do servidor'
					};
				} else if (data.message) {
					return data;
				}
			}
		});
		opt && Utils.loadService(opt);
	};

})();
