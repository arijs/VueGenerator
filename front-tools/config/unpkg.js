var extend = require('../extend');
var config = require('./default');
var hop = Object.prototype.hasOwnProperty;

var scopes = config.scopes;
var fnPrintBaseUrl = config.fnPrintBaseUrl;
var fsa = config.template_vars.FOOT_SCRIPTS_APP;

var baseUrl = function(url) {
	return '' + (url || ''); // relative
	// return '/' + (url || ''); // absolute
}
var baseUrlOutraPagina = function(url) {
	return '../../' + (url || ''); // relative
	// return '/' + (url || ''); // absolute
}
function fnPageScopesSet(page) {
	return ((page || {}).template_vars || {}).SCOPES_SET || [];
}
function fnPagesExtend() {
	var pagesSource = config.pages;
	var pagesExtend = {};
	for (var pageName in pagesSource) {
		if (hop.call(pagesSource, pageName)) {
			pagesExtend[pageName] = {
				template_vars: {
					SCOPES_SET: fnPageScopesSet(pagesSource[pageName]).concat([
						{
							NAME: scopes.App.JS_GLOBAL + '.routerMode',
							VALUE: { __json: 'hash' }
						}
					])
				}
			};
		}
	}
	return pagesExtend;
}

module.exports = extend.merge({}, config, {
	base_url: baseUrl,
	template_vars: {
		BASE_URL_STRING: JSON.stringify(baseUrl()),
		FOOT_SCRIPTS_APP: [
			{ src: { addBaseUrl: 'app/env/local.js' } }
		].concat(fsa || [])
	},
	pages: extend.merge(fnPagesExtend(), {
		outra_pagina: {
			template_vars: {
				addBaseUrl_href: fnPrintBaseUrl('href', baseUrlOutraPagina),
				addBaseUrl_src: fnPrintBaseUrl('src', baseUrlOutraPagina),
				addBaseUrl_url: fnPrintBaseUrl('url', baseUrlOutraPagina),
				addBaseUrl_this: fnPrintBaseUrl(false, baseUrlOutraPagina),
				BASE_URL_STRING: JSON.stringify(baseUrlOutraPagina()),
			}
		}
	})
});
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
