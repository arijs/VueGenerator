(function(vars) {

var Utils = vars.Utils;
var hop = Object.prototype.hasOwnProperty;

vars.compMap['form-campo/select-button'] = function(callback, template) {
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
		var campo = this.campo;
		return {
			pesoTotal: Utils.forEach(campo.opcoes, 0, function(opcao) {
				var peso = +opcao.peso;
				this.result += peso || peso === 0 ? peso : 1;
			}) || 1
		};
	},
	computed: {
		cssClass: function() {
			var campo = this.campo;
			return {
				'campo-selected': Boolean(campo.selecionado),
				'campo-missing': Boolean(campo.falta),
				'campo-error': Boolean(campo.erro),
				'campo-valid': Boolean(campo.valido)
			};
		},
		htmlId: function() {
			return 'vcfcsb-'+this.campo.nome;
		},
		selecionadoTexto: function() {
			var s = this.campo.selecionado;
			return s ? s.selecionadoRotulo || s.valor || s.rotulo : '';
		}
	},
	methods: {
		opcaoClick: function(opcao) {
			// this.$store.commit('setFormCampoSelecionado', {
			//	 campo: this.campo,
			//	 selecionado: opcao
			// });
			this.$emit('selecionado', {
				campo: this.campo,
				selecionado: opcao
			});
			// this.campo.selecionado = opcao;
			this.$emit('change');
		},
		pressSpaceOpcao: function(opcao, event) {
			this.opcaoClick(opcao);
			event.preventDefault();
		},
		emitFocusOpcao: function(opcao, evt) {
			// console.log('campo/select focus', evt, this);
			this.$emit('focus', {
				campo: this.campo,
				opcao: opcao,
				evt: evt
			});
			// this.focused = true;
			// if (this.focusRevertScroll) {
			//	 // console.log('select revertNextScroll', this);
			//	 this.$root.revertNextScroll();
			// }
		},
		emitBlurOpcao: function(opcao, evt) {
			// var act = document.activeElement;
			// if (!evt || !act || !Utils.isChildOf(act, this.$el)) {
			//	 this.$emit('blur', evt);
			// }
			this.$emit('blur', {
				campo: this.campo,
				opcao: opcao,
				evt: evt
			});
			// this.focused = false;
		}
	}
};

})(window._vcomp$);
