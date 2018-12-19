(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	var reTrim = /^\s+|\s+$/g;
	function validaNome(campo) {
		var valor = campo.valor.replace(reTrim, '');
		if (!/^[a-z ]+$/i.test(Utils.deaccentize(valor))) {
			return { erro: 'Nome inválido' };
		}
	}
	App.compMap['exemplo-form'] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				campoNome: {
					nome: 'nome',
					rotulo: 'Nome',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [Utils.valida.opcional, validaNome]
				}
			};
		},
		computed: {
			greeting: function() {
				return 'Hello ' + (this.campoNome.valor || 'World') + '!';
			}
		},
		methods: {
			campoValorNome: function(payload) {
				this.$store.dispatch('campoValor', payload);
			},
			campoBlur: function(payload) {
				this.$store.dispatch('validarCampo', payload);
			}
		}
	};
})();
