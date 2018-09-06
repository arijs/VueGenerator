(function(vars) {
	'use strict';
	var Utils = vars.Utils;
	var services = {
		square: function(x) {
			return x * x;
		}
	};
	var env = {
		name: 'homolog';
		services: services
	};
	vars.Env = env;
})(window.{{GLOBAL_NAME}});