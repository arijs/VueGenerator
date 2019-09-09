(function() {
	'use strict';
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	VComp.compMap["form-campo2/select-button"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			campo: {
				type: Object,
				required: true
			},
			classValue: {
				type: String
			},
			focusRevertScroll: {
				type: Boolean,
				default: false
			},
			hideErrorMessage: {
				type: Boolean,
				default: false
			}
		},
		data: function() {
			return {
			}
		},
		computed: {
			cssClass: function() {
				var campo = this.campo;
				return {
					'campo-filled': Boolean(campo.selecionado),
					'campo-missing': Boolean(campo.falta),
					'campo-error': Boolean(campo.erro),
					'campo-valid': Boolean(campo.valido),
					'campo-disabled': Boolean(campo.disabled)
				};
			}
		},
		methods: {
			onClickOpcao: function(opcao) {
				if (opcao.disabled || this.campo.disabled) return;
				this.$emit('selecionado', {
					campo: this.campo,
					selecionado: opcao
				});
			},
			getClassOpcao: function(opcao, i) {
				var sel = this.campo.selecionado;
				return {
					'btn-default': opcao !== sel,
					'btn-info': opcao === sel
				};
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
