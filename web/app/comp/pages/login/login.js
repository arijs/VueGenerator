(function() {
'use strict';
var vars = window._var$;
var App = window._app$;
var Utils = vars.Utils;
App.compMap["pages/login"] = function(callback, template, match) {
	comp.template = template;
	callback(null, comp);
};
var comp = {
	template: null,
	data: function() {
		return {
			modalEsqueci: false,
			erroMensagem: null,
			campoUsuario: {
				nome: 'username',
				rotulo: 'Usuário',
				valor: '',
				erro: null,
				falta: false,
				valido: false,
				valida: [
					Utils.valida.naoVazio
				]
			},
			campoSenha: {
				nome: 'password',
				tipo: 'password',
				rotulo: 'Senha',
				valor: '',
				erro: null,
				falta: false,
				valido: false,
				valida: [
					Utils.valida.naoVazio
				]
			}
		};
	},
	computed: {
		baseUrl: function() {
			return this.$store.state.baseUrl;
		},
		routerBaseUrl: function() {
			return App.routerBaseUrl || '';
		},
		serverLocal: function() {
			return this.$store.getters.serverLocal;
		},
		routerModeHash: function() {
			return App.routerMode === 'hash';
		},
		formCampos: function() {
			return {
				username: this.campoUsuario,
				password: this.campoSenha
			};
		},
		formMethod: function() {
			return this.routerModeHash ? 'GET' : 'POST';
		},
		formAction: function() {
			return this.routerModeHash
				? this.routerBaseUrl || '.'
				: this.routerBaseUrl + '/api-login';
		}
	},
	methods: {
		encodeURIComponent: function(s) {
			return window.encodeURIComponent(s);
		},
		submitLogin: function() {
			var vm = this;
			this.erroMensagem = null;

			this.$store
			.dispatch('validarForm', this.formCampos)
			.then(function(result) {
				vm.erroMensagem = result.erroMensagem;
				if (!result.erroMensagem) {
					vm.$refs.form.submit();
				}
			});
		},
		onCampoValor: function(payload) {
			this.$store.dispatch('campoValor', payload);
		},
		onCampoBlur: function(payload) {
			this.$store.dispatch('validarCampo', payload);
		},
		errorText: function(e) {
			var t = String(e && (e.error || e.message) || e);
			if (t === String({})) {
				t = JSON.stringify(e);
			}
			return t;
		},
		watchSession: function() {
			this.$watch(function() {
				return this.$store.state.session;
			}, function(session) {
				var loading = session.loading;
				var error = session.error;
				if (!loading && !error && session.data) {
					var getters = this.$store.getters;
					var router = this.$router;
					if (getters.isAdmin) {
						router.replace('/admin');
					} else if (getters.isUser) {
						router.replace('/user');
					}
				} else if (!loading && error) {
					this.erroMensagem = this.errorText(error);
				}
			}, { immediate: true });
		}
	},
	mounted: function() {
		this.watchSession();
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
