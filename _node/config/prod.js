var extend = require('../extend');
var config = require('./default');

config = extend.merge({}, config, {
	template_vars: {
		BYTE_ORDER_MARK: '\ufeff',
	},
	pages: {
		index: {
			output: 'Views/Order/Automacao/Pos/Index.cshtml'
		},
		outra_pagina: {
			output: 'Views/Order/Automacao/Pos/OutraPagina.cshtml'
		},
		404: {
			output: 'Views/404.cshtml'
		}
	}
});

var fsa = config.template_vars.FOOT_SCRIPTS_APP;
fsa = [{src:'/app/env/prod.js'}].concat(fsa || []);
config.template_vars.FOOT_SCRIPTS_APP = fsa;

module.exports = config;
