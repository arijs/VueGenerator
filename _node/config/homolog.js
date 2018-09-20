var extend = require('../extend');
var config = require('./default');

config = extend.merge({}, config);

var fsa = config.template_vars.FOOT_SCRIPTS_APP;
fsa = [{ src: { addBaseUrl: 'app/env/homolog.js' } }].concat(fsa || []);
config.template_vars.FOOT_SCRIPTS_APP = fsa;

module.exports = config;
/*, {
	template_vars: {
		BYTE_ORDER_MARK: String.fromCharCode(0xEF, 0xBB, 0xBF),
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
}*/
