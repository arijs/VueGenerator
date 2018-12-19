(function() {
	var vars = this._var$;
	var VComp = this._vcomp$;
	var App = this._app$;
	var Utils = vars.Utils;

	Utils.getMonthNames = function() {
		return [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		];
	};
	Utils.getWeekDaysHeader = function() {
		return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
	};
	Utils.formatDateUser = function(date) {
		return [
			String('00'+date.getDate()).substr(-2),
			String('00'+(1 + date.getMonth())).substr(-2),
			String('0000'+date.getFullYear()).substr(-4)
		].join('/');
	};
	Utils.formatDateIso = function(date) {
		return [
			String('0000'+date.getFullYear()).substr(-4),
			String('00'+(1 + date.getMonth())).substr(-2),
			String('00'+date.getDate()).substr(-2)
		].join('-');
	};

	var query = Utils.parseQuery(location.search);
	var state = {
		baseUrl: vars.BaseUrl || '',
		device: App.device,
		routerBaseUrl: App.routerBaseUrl || '/',
		mobile: /\bmobile\b/i.test(App.device || ''),
		query: query,
		session: {
			loading: false,
			error: null,
			data: null
		}
	};
	var getters = {
		serverLocal: function() {
			// return false;
			return /^localhost$|^127\.0\.0\.1$/i.test(window.location.hostname);
		},
		isAdmin: function(state) {
			var sError = state.session.error;
			var sData = state.session.data;
			return !sError && sData && sData.isadmin;
		},
		isUser: function(state) {
			var sError = state.session.error;
			var sData = state.session.data;
			return !sError && sData && !sData.isadmin;
		},
		isLogged: function(state) {
			var sError = state.session.error;
			var sData = state.session.data;
			return !sError && sData;
		},
		userCompanyName: function(state) {
			var sData = state.session.data;
			return sData && sData.companyName;
		}
	};
	var actions = {
		campoValor: function(context, payload) {
			var campo = payload.campo;
			var valor = payload.valor;
			var validar = payload.validar;
			// campo.valor = valor;
			context.commit('aplicarCampoValor', {
				campo: campo,
				valor: valor
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoSelecionado: function(context, payload) {
			var campo = payload.campo;
			var selecionado = payload.selecionado;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCampoSelecionado', {
				campo: campo,
				selecionado: selecionado
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCheck: function(context, payload) {
			var campo = payload.campo;
			var checked = payload.checked;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCampoChecked', {
				campo: campo,
				checked: checked
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarDay: function(context, payload) {
			var campo = payload.campo;
			var date = payload.date;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			date = +campo.dataInicial == +date ? null : date;
			context.commit('aplicarCalendarDate', {
				campo: campo,
				dataInicial: date,
				dataFinal: date
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarPeriod: function(context, payload) {
			var campo = payload.campo;
			var start = payload.start;
			var end = payload.end;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCalendarDate', {
				campo: campo,
				dataInicial: start,
				dataFinal: end
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarMonth: function(context, payload) {
			var campo = payload.campo;
			var date = payload.date;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCalendarMonth', {
				campo: campo,
				dataMes: date
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		testaCampo: function(context, campo) {
			var validacao = null;
			if (campo.valida) {
				Utils.forEach(campo.valida, function(fn) {
					validacao = fn(campo, context);
					if (validacao) return this._break;
				});
			}
			return Promise.resolve({
				campo: campo,
				validacao: validacao
			});
		},
		validarCampo: function(context, payload) {
			return new Promise(function(resolve, reject) {
				context.dispatch('testaCampo', payload.campo).then(function(item) {
					context.commit('aplicarCampoValidacao', {
						campo: item.campo,
						validacao: item.validacao,
						ocultaErro: payload.ocultaErro,
						ocultaValido: payload.ocultaValido
					});
					resolve(item);
				});
			});
		},
		testaFormGrupo: function(context, grupo) {
			var camposPromise = [];
			Utils.forEachProperty(g, function(campo) {
				camposPromise.push(context.dispatch('testaCampo', campo));
			});
			return Promise.all(camposPromise);
		},
		testaForm: function(context, form) {
			// var grupos = context.state.formGrupos;
			var camposPromise = [];
			// Utils.forEachProperty(grupos, function(g, gkey) {
			Utils.forEachProperty(form, function(campo) {
				camposPromise.push(context.dispatch('testaCampo', campo));
			});
			// });
			return Promise.all(camposPromise);
		},
		validarForm: function(context, form) {
			return context.dispatch('testaForm', form).then(function(lista) {
				var result = {
					erroMensagem: null,
					lista: lista,
					erros: 0,
					faltas: 0
				};
				Utils.forEach(lista, function(item) {
					context.commit('aplicarCampoValidacao', item);
					var v = item.validacao;
					if (!v) return;
					if (v.falta) result.faltas++;
					if (v.erro) result.erros++;
				});
				if (result.erros) {
					result.erroMensagem = 'Um ou mais campos possuem dados inválidos';
				} else if (result.faltas) {
					result.erroMensagem = 'Você precisa preencher todas as informações';
				}
				return result;
			});
		},
		loadSession: function(context) {
			App.Services.session(function(loading, error, data) {
				context.commit('serviceSession', {
					loading: loading,
					error: error,
					data: data
				});
			});
		}
	};
	var mutations = {
		aplicarCampoValor: function(state, payload) {
			payload.campo.valor = payload.valor;
		},
		aplicarCampoSelecionado: function(state, payload) {
			payload.campo.selecionado = payload.selecionado;
		},
		aplicarCalendarDate: function(state, payload) {
			payload.campo.dataInicial = payload.dataInicial;
			payload.campo.dataFinal = payload.dataFinal;
		},
		aplicarCalendarMonth: function(state, payload) {
			payload.campo.dataMes = payload.dataMes;
		},
		aplicarCampoChecked: function(state, payload) {
			payload.campo.checked = payload.checked;
		},
		aplicarCampoValidacao: function(state, payload) {
			var campo = payload.campo;
			var v = payload.validacao;
			campo.falta = (v && v.falta) || false;
			campo.erro = (v && v.erro) || null;
			campo.erro = (!payload.ocultaErro && v && v.erro) || null;
			campo.falta = (!payload.ocultaErro && v && v.falta) || false;
			campo.valido = (!payload.ocultaValido && !v) || (!v.erro && !v.falta);
		},
		serviceSession: function(state, payload) {
			state.session = {
				loading: payload.loading,
				error: payload.error,
				data: payload.data
			};
		}
	};

	var store = new Vuex.Store({
		state: state,
		getters: getters,
		actions: actions,
		mutations: mutations
	});
	App.store = store;

	if (/^\/api\/login$/i.test(query.$_POST)) {
		if (query.username === 'admin' && query.password === 'admin') {
			App.sessionUrl = 'admin';
		} else if (query.username === 'user' && query.password === 'user') {
			App.sessionUrl = 'user';
		} else {
			App.sessionUrl = 'not_logged';
		}
	}
	store.dispatch('loadSession');

	var appLoader = Utils.getScopePrefixLoader(App);
	var vcompLoader = Utils.getScopePrefixLoader(VComp);

	var loadManager = Utils.fnLoadManager({
		prefixLoaders: [appLoader, vcompLoader]
	});
	var vueLazyLoad = Utils.vueLoadAsyncComponent({
		getLoader: loadManager.getLoader
	});
	var BaseComponent = Vue.extend({
		mixins: [{ getComponent: vueLazyLoad }],
		components: {
			'masked-input': vueTextMask.default
		}
	});
	BaseComponent.options._base = BaseComponent;
	vueLazyLoad.setRegisterInto(BaseComponent);

	vars.compLoader = {
		App: appLoader,
		VComp: vcompLoader,
		manager: loadManager,
		vueLazyLoad: vueLazyLoad
	};
	vars.BaseComponent = BaseComponent;

	BaseComponent.component('vnode', {
		functional: true,
		render: function(h, context) {
			return context.props.node;
		}
	});
})();
