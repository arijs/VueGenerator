(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap['root'] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				relogin: null
			};
		},
		methods: {
			onRelogin: function(login) {
				var relogin = this.relogin;
				console.log('onRelogin', login, relogin);
				Utils.forEach(relogin.services, function(ref) {
					var opt = {
						reloginUser: login,
						reloginRetry: relogin,
						reloginService: ref
					};
					opt = Utils.extend(opt, ref.opt);
					App.Services.$retry(opt, ref.callback);
				});
				this.relogin = null;
			},
			onReloginClickLogout: function() {
				console.log('onReloginClickLogout', arguments, this.relogin);
				this.relogin = null;
				this.$store.dispatch('loadLogout');
			},
			listenSessionExpiredService: function() {
				var vm = this;
				this.$on('session-expired-service', function(evt) {
					var relogin = vm.relogin;
					vm.relogin = relogin
						? Utils.extend(relogin, {
							services: relogin.services.concat(evt.services)
						})
						: evt;
				});
			}
		},
		mounted: function() {
			this.listenSessionExpiredService();
		}
	};
})();
