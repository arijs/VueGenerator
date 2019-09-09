var path = require('path');

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
		COMP_PATH_PREFIX: 'vcomp/',
		// COMP_URL: 'https://unpkg.com/@arijs/frontend@0.1.6/vcomp/',
		NAME: 'VComp'
	},
	Global: {
		JS_GLOBAL: '_var$',
		NAME: 'Global'
	}
};
var scopesJson = [
	'"App":' + JSON.stringify(scopes.App) + ',',
	'"VComp":' + JSON.stringify(scopes.VComp) + ',',
	'"Global":' + JSON.stringify(scopes.Global)
];
var baseUrl = function(url) {
	// return '' + (url || ''); // relative
	return '/' + (url || ''); // absolute
};
var baseUrlOutraPagina = function(url) {
	// return '../../' + (url || ''); // relative
	return '/' + (url || ''); // absolute
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
/**/
var BASE_STYLES = [
	// { href: { addBaseUrl: 'css/bootstrap.min.css' } },
	// { href: { addBaseUrl: 'css/londinium-theme.css' } },
	// { href: '//cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.min.css' },
	{ href: { addBaseUrl: 'css/styles.css' } },
	// { href: { addBaseUrl: 'css/icons.css' } },
	{ href: '//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&amp;subset=latin,cyrillic-ext' }
];
var BASE_SCOPES_SET = [
	{
		NAME: scopes.App.JS_GLOBAL + '.compInit',
		VALUE: { __json: [{ MOUNT: '#mount', ID: 'app/root', SAVE: '$root' }] }
	}
];

module.exports = {
	scopes: scopes,
	base_url: baseUrl,
	fnPrintBaseUrl: fnPrintBaseUrl,
	output_dir: path.resolve(__dirname, '../../web'),
	template_vars: {
		addBaseUrl_href: fnPrintBaseUrl('href', baseUrl),
		addBaseUrl_src: fnPrintBaseUrl('src', baseUrl),
		addBaseUrl_url: fnPrintBaseUrl('url', baseUrl),
		addBaseUrl_this: fnPrintBaseUrl(false, baseUrl),
		json_stringify: function() {
			return JSON.stringify(hop.call(this, '__json') ? this.__json : this);
		},
		SCOPES: [scopes.App, scopes.VComp, scopes.Global],
		SCOPES_JSON: scopesJson,
		SCOPES_SET: BASE_SCOPES_SET,
		PAGE_LANG: 'pt-br',
		PAGE_TITLE: 'Local.e',
		PAGE_DESCRIPTION: '',
		BASE_URL_STRING: JSON.stringify(baseUrl()),
		PAGE_VIEWPORT: null,
		FAVICON: [
			{ url: { addBaseUrl: 'img/favicon-496.png' }, type: 'image/png', sizes: '496x496' },
			{ url: { addBaseUrl: 'img/favicon.png' }, type: 'image/png', sizes: '80x80' },
			{ url: { addBaseUrl: 'img/favicon.ico' }, type: 'image/x-icon' }
		],
		HEAD_STYLES: BASE_STYLES,
		BODY_ATTRIBUTES: [],
		FOOT_SCRIPTS_LIBS: [
			// { src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/javascript.js' },
			{ src: { addBaseUrl: 'js/vendor/utils/javascript.js' } }, // use o local para testar alterações
			// { src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/loaders.js' },
			{ src: { addBaseUrl: 'js/vendor/utils/loaders.js' } }, // ou enquanto o unpkg não reflete a última versão
			// { src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/form.js' },
			{ src: { addBaseUrl: 'js/vendor/utils/form.js' } },
			// { src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/string.js' },
			{ src: { addBaseUrl: 'js/vendor/utils/string.js' } },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/animation.js' },
			// { src: 'https://unpkg.com/@arijs/frontend@0.1.6/utils/geometry.js' },
			{ src: { addBaseUrl: 'js/vendor/utils/storage.js' } },
			{ src: 'https://unpkg.com/@arijs/vue@2.5.20/dist/vue.js' },
			// { src: 'https://unpkg.com/@arijs/vue@2.5.20/dist/vue.min.js' },
			// { src: { addBaseUrl: 'vendor/js/vue.js' } },
			// { src: { addBaseUrl: 'vendor/js/vue.min.js' } },
			{ src: 'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js' },
			// { src: 'https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js' },
			{ src: 'https://unpkg.com/vue-router@3.0.2/dist/vue-router.js' },
			{ src: 'https://unpkg.com/vue-text-mask@6.1.2/dist/vueTextMask.js' },
			{ src: 'https://unpkg.com/text-mask-addons@3.8.0/dist/textMaskAddons.js' }
			// { src: 'https://unpkg.com/vuebar@0.0.18/vuebar.js' },
			// { src: '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js' },
			// { src: { addBaseUrl: 'js/plugins/interface/datatables.min.js' } },
			// { src: 'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js' },
			// { src: 'https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.js' }
			// { src: { addBaseUrl: 'js/plugins/forms/select2.min.js' } }
		],
		FOOT_SCRIPTS_APP: [
			{ src: { addBaseUrl: 'app/services.js' } },
			{ src: { addBaseUrl: 'app/store.js' } },
			{ src: { addBaseUrl: 'app/router.js' } }
		]
	},
	pages: {
		index: {
			template: null, // usar como padrão o nome da chave ("index" neste caso)
			// output: 'index.html', // como padrão, o nome da chave + ".html" ("index.html")
			template_vars: {
				SCOPES_SET: BASE_SCOPES_SET.concat([
					{
						NAME: scopes.App.JS_GLOBAL + '.device',
						VALUE: { __json: 'desktop' }
					}
				]),
				HEAD_STYLES: BASE_STYLES.concat([
					// { href: { addBaseUrl: 'css/desktop.css' } }
				]),
				BODY_ATTRIBUTES: [
					{ name: 'class', value: 'full-width page-condensed' }
				],
				FOOT_SCRIPTS_PAGE: [{ src: { addBaseUrl: 'app/initialize.js' } }]
			}
		},
		mobile: {
			template: null, // usar como padrão o nome da chave ("mobile" neste caso)
			// output: 'index.html', // como padrão, o nome da chave + ".html" ("mobile.html")
			template_vars: {
				SCOPES_SET: BASE_SCOPES_SET.concat([
					{
						NAME: scopes.App.JS_GLOBAL + '.device',
						VALUE: { __json: 'mobile' }
					},
					{
						NAME: scopes.App.JS_GLOBAL + '.routerBaseUrl',
						VALUE: { __json: '/mobile.html' }
					}
				]),
				PAGE_VIEWPORT: 'width=600',
				HEAD_STYLES: BASE_STYLES.concat([
					// { href: { addBaseUrl: 'css/mobile.css' } }
				]),
				BODY_ATTRIBUTES: [
					{ name: 'class', value: 'root-mobile' }
				],
				FOOT_SCRIPTS_PAGE: [{ src: { addBaseUrl: 'app/initialize.js' } }]
			}
		},
		outra_pagina: {
			output: 'outra/pagina/index.html',
			base_url: baseUrlOutraPagina,
			template_vars: {
				addBaseUrl_href: fnPrintBaseUrl('href', baseUrlOutraPagina),
				addBaseUrl_src: fnPrintBaseUrl('src', baseUrlOutraPagina),
				addBaseUrl_url: fnPrintBaseUrl('url', baseUrlOutraPagina),
				addBaseUrl_this: fnPrintBaseUrl(false, baseUrlOutraPagina),
				BASE_URL_STRING: JSON.stringify(baseUrlOutraPagina()),
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
				PAGE_TITLE: 'Página não encontrada // S2 - PIR - Potencial de Integridade Resiliente'
			}
		}
	}
};
