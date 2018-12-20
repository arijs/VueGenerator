(function() {
	var App = this._app$;
	var vars = this._var$;

	var component = vars.compLoader.vueLazyLoad;
	var appPage = function(id) {
		return component(String('app/pages/'+id).replace(/\/+/g,'--'));
	}
	var routes = [
		{ path: '/', component: appPage('index') },
		// { path: '/mobile.html', redirect: '/' },
		{ path: '/login', component: appPage('login') },
		{ path: '/admin', component: appPage('admin'),
			children: [
				{ path: '', redirect: 'home' },
				{ path: 'home', component: appPage('admin/home') }
			]
		},
		{ path: '/user', component: appPage('user'),
			children: [
				{ path: '', redirect: 'home' },
				{ path: 'home', component: appPage('user/home') }
			]
		},
		{ path: '/cadastro', component: appPage('cadastro'),
			children: [
				{ path: '', component: appPage('cadastro/form') },
				{ path: 'efetuado', component: appPage('cadastro/efetuado') }
			]
		},
		{ path: '/api',
			children: [
				{ path: '*', redirect: '/' }
			]
		},
		{ path: '/api-*', redirect: '/' }
	];
	var router = new VueRouter({
		mode: App.routerMode || 'history',
		base: App.routerBaseUrl || '/',
		routes: routes
	});

	App.router = router;
})();
