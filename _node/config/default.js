module.exports = {
	template_vars: {
		GLOBAL_NAME: '_v$',
		PAGE_LANG: 'pt-br',
		PAGE_TITLE: 'VueGenerator',
		PAGE_DESCRIPTION: '',
		BASE_URL: JSON.stringify('/'),
		HEAD_STYLES: [
			{ href: '/css/font.css' },
			{ href: '/css/desktop.css' },
			{ href: '/css/mobile.css', media: '(max-width: 1024px)' }
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
