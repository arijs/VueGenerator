(function() {
	var App = this._app$;
	var vars = this._var$;
	var Utils = vars.Utils;
	var mask = Utils.mask;
	var valida = Utils.valida;
	var services = App.Services;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var query = Utils.parseQuery(location.search);
	var state = {
		baseUrl: (vars.BaseUrl || ''),
		query: query
	};
	var getters = {};
	var actions = {
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
		validarCampo: function(context, campo) {
			return new Promise(function(resolve, reject) {
				context.dispatch('testaCampo', campo).then(function(item) {
					context.commit('setFormCampoErro', item);
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
					context.commit('setFormCampoErro', item);
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
	};

	var store = new Vuex.Store({
		state: state,
		getters: getters,
		actions: actions,
		mutations: mutations
	});
	vars.store = store;
})();