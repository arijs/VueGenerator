(function() {
	var App = this._app$;
	var vars = this._var$;

	var component = vars.compLoader.vueLazyLoad;
	var appComp = function(id) {
		return component(String('app/'+id).replace(/\/+/g,'--'));
		//()
	};
	var appPage = function(id) {
		return appComp('pages/'+id);
	};
	var routes = [
		{ path: '/', beforeEnter: (to, from, next) => {
			if (App.store.getters.isLogged) {
				next('/admin');
			} else {
				next('/login');
			}
		}},
		// { path: '/admin', component: appComp('area-logada'),
		// 	children: [
		// 		{ path: '', component: appPage('admin') }
		// 	]
		// },
		// { path: '/mobile.html', redirect: '/' },
		{ path: '/login', component: appPage('login') },
		{ path: '/esqueci-senha', component: appPage('esqueci-senha') },
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
