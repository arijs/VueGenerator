var scopes = {
	App: {
		JS_GLOBAL: '_app$',
		PREFIX: 'app',
		COMP_PATH_PREFIX: 'app/comp/',
		NAME: 'App'
	},
	VComp: {
		JS_GLOBAL: '_vcomp$',
		PREFIX: 'vcomp',
		COMP_URL: 'https://unpkg.com/@arijs/frontend@0.1.3/vcomp/',
		NAME: 'VComp'
	},
	// VComp: { JS_GLOBAL: '_vcomp$', PREFIX: 'vcomp', COMP_PATH_PREFIX: 'vendor/vcomp/', NAME: 'VComp' },
	Global: { JS_GLOBAL: '_var$', NAME: 'Global' }
};
var scopesJson = [
	'"App":' + JSON.stringify(scopes.App) + ',',
	'"VComp":' + JSON.stringify(scopes.VComp) + ',',
	'"Global":' + JSON.stringify(scopes.Global)
];
var baseUrl = function(url) {
	return '' + (url || '');
};
var baseUrlOutraPagina = function(url) {
	return '../../' + (url || '');
};
var hop = Object.prototype.hasOwnProperty;

function fnPrintBaseUrl(propName, baseUrl) {
	return function() {
		var value = propName === false ? this : this[propName];
		if (value != null && hop.call(value, 'addBaseUrl')) {
			return baseUrl(value.addBaseUrl);
		}
		return value;
	};
}

module.exports = {
	scopes: scopes,
	base_url: baseUrl,
	fnPrintBaseUrl: fnPrintBaseUrl,
	template_vars: {
		addBaseUrl_href: fnPrintBaseUrl('href', baseUrl),
		addBaseUrl_src: fnPrintBaseUrl('src', baseUrl),
		addBaseUrl_this: fnPrintBaseUrl(false, baseUrl),
		json_stringify: function() {
			return JSON.stringify(hop.call(this, '__json') ? this.__json : this);
		},
		SCOPES: [scopes.App, scopes.VComp, scopes.Global],
		SCOPES_JSON: scopesJson,
		SCOPES_SET: [
			{
				NAME: scopes.App.JS_GLOBAL + '.compInit',
				VALUE: { __json: [{ MOUNT: '#mount', ID: 'app/root', SAVE: '$root' }] }
			}
		],
		PAGE_LANG: 'pt-br',
		PAGE_TITLE: 'VueGenerator - NONE',
		PAGE_DESCRIPTION: '',
		BASE_URL_STRING: JSON.stringify(baseUrl()),
		FAVICON_URL: { addBaseUrl: 'favicon.ico' },
		HEAD_STYLES: [
			{ href: { addBaseUrl: 'css/font.css' } },
			{ href: { addBaseUrl: 'vendor/css/reset.css' } },
			{ href: { addBaseUrl: 'vendor/css/vuebar.css' } },
			{ href: { addBaseUrl: 'css/desktop.css' } },
			{ href: { addBaseUrl: 'css/mobile.css' }, media: '(max-width: 1024px)' }
		],
		FOOT_SCRIPTS_LIBS: [
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.4/utils/javascript.js' },
			// { src: { addBaseUrl: 'vendor/js/utils/javascript.js' } }, // use o local para testar alterações
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.4/utils/loaders.js' },
			// { src: { addBaseUrl: 'vendor/js/utils/loaders.js' } }, // ou enquanto o unpkg não reflete a última versão
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.4/utils/form.js' },
			// { src: { addBaseUrl: 'vendor/js/utils/form.js' } },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.4/utils/string.js' },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.4/utils/animation.js' },
			{ src: 'https://unpkg.com/@arijs/vue@2.5.17-beta1.0/dist/vue.js' },
			// { src: { addBaseUrl: 'vendor/js/vue.js' } },
			{ src: 'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js' },
			{ src: 'https://unpkg.com/vuebar@0.0.18/vuebar.js' }
		],
		FOOT_SCRIPTS_APP: [
			{ src: { addBaseUrl: 'app/services.js' } },
			{ src: { addBaseUrl: 'app/store.js' } }
		]
	},
	pages: {
		index: {
			template: null, // usar como padrão o nome da chave ("index" neste caso)
			output: 'example.html', // como padrão, o nome da chave + ".html" ("index.html")
			template_vars: {
				PAGE_TITLE: 'VueGenerator - INDEX',
				FOOT_SCRIPTS_PAGE: [{ src: { addBaseUrl: 'app/initialize.js' } }]
			}
		},
		outra_pagina: {
			output: 'outra/pagina/index.html',
			base_url: baseUrlOutraPagina,
			template_vars: {
				addBaseUrl_href: fnPrintBaseUrl('href', baseUrlOutraPagina),
				addBaseUrl_src: fnPrintBaseUrl('src', baseUrlOutraPagina),
				addBaseUrl_this: fnPrintBaseUrl(false, baseUrlOutraPagina),
				BASE_URL_STRING: JSON.stringify(baseUrlOutraPagina()),
				COMP_ROOT: 'app/exemplo-form',
				PAGE_TITLE: 'VueGenerator - OUTRA',
				SCOPES_SET: [
					{
						NAME: scopes.App.JS_GLOBAL + '.compInit',
						VALUE: {
							__json: [
								{ MOUNT: '#mount', ID: 'app/exemplo-form', SAVE: '$root' }
							]
						}
					}
				],
				FOOT_SCRIPTS_PAGE: [
					{ src: { addBaseUrl: 'app/initialize-outra-pagina.js' } }
				]
			}
		},
		404: {
			template_vars: {
				PAGE_TITLE: 'VueGenerator - 404'
			}
		}
	}
};
