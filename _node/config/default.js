var scopes = {
	App: { JS_GLOBAL: '_app$', CSS_PREFIX: 'app--', COMP_PATH_PREFIX: 'app/comp/', NAME: 'App' },
	VComp: { JS_GLOBAL: '_vcomp$', CSS_PREFIX: 'vcomp--', COMP_URL: 'https://unpkg.com/@arijs/frontend@0.1.0/vcomp/', NAME: 'VComp' },
	Global: { JS_GLOBAL: '_var$', NAME: 'Global' }
};
var scopesJson = [
	'{',
	'"App":'+JSON.stringify(scopes.App)+',',
	'"VComp":'+JSON.stringify(scopes.VComp)+',',
	'"Global":'+JSON.stringify(scopes.Global),
	'}'
].join('\n');

module.exports = {
	scopes: scopes,
	template_vars: {
		SCOPES: [scopes.App, scopes.VComp, scopes.Global],
		SCOPES_JSON: scopesJson,
		PAGE_LANG: 'pt-br',
		PAGE_TITLE: 'VueGenerator',
		PAGE_DESCRIPTION: '',
		BASE_URL: JSON.stringify('/'),
		HEAD_STYLES: [
			{ href: '/css/font.css' },
			{ href: '/vendor/css/reset.css' },
			{ href: '/vendor/css/vuebar.css' },
			{ href: '/css/desktop.css' },
			{ href: '/css/mobile.css', media: '(max-width: 1024px)' }
		],
		FOOT_SCRIPTS_LIBS: [
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.0/utils/javascript.js' },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.0/utils/loaders.js' },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.0/utils/form.js' },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.0/utils/string.js' },
			{ src: 'https://unpkg.com/@arijs/frontend@0.1.0/utils/animation.js' },
			{ src: 'https://unpkg.com/@arijs/vue@2.5.17-beta.0/dist/vue.min.js'},
			{ src: 'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js' },
			{ src: 'https://unpkg.com/vuebar@0.0.18/vuebar.js' }
		],
		FOOT_SCRIPTS_APP: [
			{ src: '/app/services.js' },
			{ src: '/app/store.js' },
			{ src: '/app/initialize.js' }
		]
	},
	pages: {
		index: {
			template: null, // usar como padrão o nome da chave ("index" neste caso)
			output: null // como padrão, o nome da chave + ".html" ("index.html")
		},
		outra_pagina: {},
		404: {}
	}
};
