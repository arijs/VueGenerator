(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["modal/esqueci-a-senha"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				campoEmail: {
					nome: 'email',
					rotulo: 'Insira o e-mail cadastrado',
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
		methods: {
			clickFechar: function() {
				this.$emit('fechar');
			},
			onCampoValor: function(payload) {
				this.$store.dispatch('campoValor', payload);
			},
			onCampoBlur: function(payload) {
				this.$store.dispatch('validarCampo', payload);
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
