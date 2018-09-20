var extend = require('../extend');
var config = require('./default');

var baseUrl = function(url) {
	return '@Url.Content("~/' + (url || '') + '")';
};

config = extend.merge({}, config, {
	base_url: baseUrl,
	template_vars: {
		addBaseUrl_href: config.fnPrintBaseUrl('href', baseUrl),
		addBaseUrl_src: config.fnPrintBaseUrl('src', baseUrl),
		addBaseUrl_this: config.fnPrintBaseUrl(false, baseUrl),
		BYTE_ORDER_MARK: '\ufeff',
		BASE_URL_STRING: '"' + baseUrl('') + '"'
	}
});
extend(config.pages, {
	index: {
		output: 'Views/Order/Automacao/Pos/Index.cshtml'
	},
	outra_pagina: {
		output: 'Views/Order/Automacao/Pos/OutraPagina.cshtml'
	},
	404: {
		output: 'Views/404.cshtml'
	}
});

var fsa = config.template_vars.FOOT_SCRIPTS_APP;
fsa = [{ src: { addBaseUrl: 'app/env/prod.js' } }].concat(fsa || []);
config.template_vars.FOOT_SCRIPTS_APP = fsa;

module.exports = config;
