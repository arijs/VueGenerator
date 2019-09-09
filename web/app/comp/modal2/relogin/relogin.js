(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["modal2/relogin"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			var session = this.$store.state.session;
			var sData = session && session.data;
			var sEmail = sData && sData.email;
			return {
				erroMensagem: null,
				campoUsuario: {
					nome: 'username',
					rotulo: 'Usuário',
					valor: sEmail || '',
					placeholder: 'Login ou Email',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
						// Utils.valida.email
					]
				},
				campoSenha: {
					nome: 'password',
					tipo: 'password',
					rotulo: 'Senha',
					placeholder: 'Senha',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				sending: false
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
				var formCampos = vm.formCampos;
				vm.erroMensagem = null;
				vm.sending = true;
	
				vm.$store
				.dispatch('validarForm', formCampos)
				.then(function(result) {
					vm.erroMensagem = result.erroMensagem;
					if (result.erroMensagem) {
						vm.sending = false;
					} else {
						vm.sending = true;
						vm.$store
						.dispatch('loadLogin', {
							username: formCampos.username.valor,
							password: formCampos.password.valor
						})
						.then(function(resp) {
							console.log(resp);
							var data = resp.data;
							vm.sending = false;
							if (data.data) {
								vm.$emit('login', resp);
							} else {
								vm.erroMensagem = data.message || 'Usuário ou senha inválidos';
							}
						})
						.catch(function(resp) {
							console.error(resp);
							var errors = resp.err.errors;
							var msg = resp.err.message;
							vm.sending = false;
							if (errors) {
								var errOutros = [];
								Utils.forEach(errors, function(e) {
									if (e.property === 'email' || e.property === 'usuario_email') {
										vm.campoUsuario.erro = e.message;
									} else if (e.property === 'usuario_senha') {
										vm.campoSenha.erro = e.message;
									} else {
										errOutros.push(
											(e.property ? e.property + ': ' : '') +
											(e.message || String(e))
										);
									}
								});
								vm.erroMensagem = errOutros.length ? errOutros.join(' - ') : '';
							} else if (msg) {
								vm.erroMensagem = msg;
							}
						})
						// vm.$refs.form.submit();
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
				e = (e && (e.error || e.message)) || e;
				var t = String(e);
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
						// var getters = this.$store.getters;
						// var router = this.$router;
						// router.replace('/');
					} else if (!loading && error) {
						this.erroMensagem = this.errorText(error);
					}
				}, { immediate: true });
			},
			clickClose: function() {
				this.$emit('click-close');
			},
			clickLogout: function() {
				this.$emit('click-logout');
			},
			modalClose: function() {
				this.$emit('close');
			},
			fadeOut: function() {
				this.$refs.modalBase.fadeOut();
			}
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
