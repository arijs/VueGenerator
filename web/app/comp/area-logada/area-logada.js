(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["area-logada"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			var session = this.$store.state.session;
			return {
				initialSession: {
					loading: session.loading,
					error: session.error,
					data: session.data
				},
				redirectLoginSeconds: 10,
				redirectLoginTimer: null
			};
		},
		computed: {
			session: function() {
				return this.$store.state.session;
			},
			loading: function() {
				return this.$store.state.session.loading;
			},
			error: function() {
				return this.$store.state.session.error;
			},
			errorText: function() {
				var e = this.$store.state.session.error;
				var t = String(e && (e.error || e.message) || e);
				if (t === String({})) {
					t = JSON.stringify(e);
				}
				return t;
			},
			data: function() {
				return this.$store.state.session.data;
			}
		},
		methods: {
			printJson: function(json) {
				return JSON.stringify(json, null, 4);
			},
			redirectUser: function() {
				var getters = this.$store.getters;
				var router = this.$router;
				if (getters.isAdmin) {
					router.replace('/admin');
				} else if (getters.isUser) {
					router.replace('/user');
				} else {
					router.replace('/login');
				}
			},
			redirectTick: function() {
				var rls = this.redirectLoginSeconds - 1;
				this.redirectLoginSeconds = Math.max(0, rls);
				this.redirectLoginTimer = null;
				if (rls > 0) {
					this.redirectTimer();
				} else {
					this.redirectUser();
				}
			},
			redirectTimer: function() {
				this.redirectTimerClear();
				this.redirectLoginTimer = setTimeout(this.redirectTick, 990);
			},
			redirectTimerClear: function() {
				var rlt = this.redirectLoginTimer;
				if (rlt) {
					clearTimeout(rlt);
					this.redirectLoginTimer = null;
				}
			},
			watchSession: function() {
				this.$watch(function() {
					return this.$store.state.session;
				}, function(session) {
					var loading = session.loading;
					var error = session.error;
					if (!loading && !this.$store.getters.isLogged) {
						// console.log('redirect', session);
						this.redirectTimer();
					}
				}, { immediate: true });
			}
		},
		mounted: function() {
			this.watchSession();
		},
		beforeDestroy: function() {
			this.redirectTimerClear();
		}
	};
})();
