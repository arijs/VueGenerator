var lib = require('../lib');
var config = require('./default');

module.exports = lib.merge({}, config, {
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
});
