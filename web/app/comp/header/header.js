(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["header"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				messagesOpen: false,
				tasksOpen: false,
				userMenuOpen: false,
				navbarOpen: false
			};
		},
		computed: {
			isLogged: function() {
				return this.$store.getters.isLogged;
			},
			baseUrl: function() {
				return this.$store.state.baseUrl;
			},
			sessionUser: function() {
				var s = this.$store.state.session;
				return s && s.data;
			}
		},
		methods: {
			clickMessages: function() {
				this.messagesOpen = !this.messagesOpen;
			},
			clickTasks: function() {
				this.tasksOpen = !this.tasksOpen;
			},
			clickUserMenu: function() {
				this.userMenuOpen = !this.userMenuOpen;
			},
			clickLogout: function() {
				this.$store.dispatch('loadLogout');
			},
			toggleSidebarNarrow: function() {
				var sn = this.$store.state.sidebarNarrow;
				this.$store.commit('setSidebarNarrow', !sn);
			},
			toggleSidebarOffcanvas: function() {
				var so = this.$store.state.sidebarOffcanvas;
				this.$store.commit('setSidebarOffcanvas', !so);
			},
			toggleNavbar: function() {
				this.navbarOpen = !this.navbarOpen;
			},
			documentClick: function(ev) {
				var target = ev && ev.target;
				var isChildOf = Utils.isChildOf;
				var $refs = this.$refs;
				if (target) {
					if (
						!isChildOf(target, $refs.messagesPanel) &&
						!isChildOf(target, $refs.messagesButton)
					) {
						this.messagesOpen = false;
					}
					if (
						!isChildOf(target, $refs.tasksPanel) &&
						!isChildOf(target, $refs.tasksButton)
					) {
						this.tasksOpen = false;
					}
					if (
						!isChildOf(target, $refs.userMenuPanel) &&
						!isChildOf(target, $refs.userMenuButton)
					) {
						this.userMenuOpen = false;
					}
				}
			}
		},
		mounted: function() {
			document.documentElement.addEventListener('click', this.documentClick, false);
		},
		beforeDestroy: function() {
			document.documentElement.removeEventListener('click', this.documentClick, false);
		}
		/*
		props: {
			propA: {
				type: String
			}
		},
		data: function() {
			return {};
		},
		computed: {},
		methods: {},
		created: function() {},
		mounted: function() {},
		beforeDestroy: function() {}
		*/
	};
})();
