(function() {
	var vars = this._var$;
	var VComp = this._vcomp$;
	var App = this._app$;
	var Utils = vars.Utils;
	var mask = Utils.mask;
	var valida = Utils.valida;
	var services = App.Services;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var query = Utils.parseQuery(location.search);
	var state = {
		baseUrl: vars.BaseUrl || '',
		query: query
	};
	var getters = {};
	var actions = {
		campoValor: function(context, payload) {
			var campo = payload.campo;
			var valor = payload.valor;
			var validar = payload.validar;
			campo.valor = valor;
			context.commit('aplicarCampoValor', {
				campo: payload.campo,
				valor: payload.valor
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
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
		}
	};
	var mutations = {
		aplicarCampoValor: function(state, payload) {
			payload.campo.valor = payload.valor;
		},
		aplicarCampoSelecionado: function(state, payload) {
			payload.campo.selecionado = payload.selecionado;
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
		}
	};

	var store = new Vuex.Store({
		state: state,
		getters: getters,
		actions: actions,
		mutations: mutations
	});
	App.store = store;

	var appLoader = Utils.getScopePrefixLoader(App);
	var vcompLoader = Utils.getScopePrefixLoader(VComp);

	var loadManager = Utils.fnLoadManager({
		prefixLoaders: [appLoader, vcompLoader]
	});
	var vueLazyLoad = Utils.vueLoadAsyncComponent({
		getLoader: loadManager.getLoader
	});
	var BaseComponent = Vue.extend({
		mixins: [{ getComponent: vueLazyLoad }]
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
