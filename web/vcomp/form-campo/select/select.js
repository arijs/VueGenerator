(function(vars) {

var Utils = vars.Utils;

vars.compMap['form-campo/select'] = function(callback, template) {
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
		return {
			opened: false,
			focused: false
		}
	},
	computed: {
		cssClass: function() {
			var campo = this.campo;
			return {
				'campo-opened': Boolean(this.opened),
				'campo-focused': Boolean(this.focused),
				'campo-filled': Boolean(campo.selecionado),
				'campo-missing': Boolean(campo.falta),
				'campo-error': Boolean(campo.erro),
				'campo-valid': Boolean(campo.valido)
			};
		},
		selecionadoTexto: function() {
			var s = this.campo.selecionado;
			return s ? s.texto : '';
		}
	},
	methods: {
		setOpened: function(opened) {
			this.opened = opened;
			this.$emit('open', {
				campo: this.campo,
				open: opened
			});
		},
		setFocused: function(focused) {
			this.focused = focused;
		},
		campoClick: function(event) {
			if (this.campo.disabled) return;
			this.setOpened(!this.opened);
		},
		opcaoClick: function(opcao) {
			if (this.campo.disabled) return;
			this.$emit('selecionado', {
				campo: this.campo,
				selecionado: opcao
			});
			// this.campo.selecionado = opcao;
			this.$emit('change');
			this.campoClick();
			this.emitBlur();
			this.$refs.select.focus();
		},
		pressSpaceCampo: function(event) {
			this.campoClick(event);
			event.preventDefault();
		},
		pressSpaceOpcao: function(opcao, event) {
			this.opcaoClick(opcao);
			event.preventDefault();
		},
		emitFocus: function(evt) {
			// console.log('campo/select focus', evt, this);
			if (this.campo.disabled) return;
			this.$emit('focus', {
				campo: this.campo,
				event: evt
			});
			this.focused = true;
			// if (this.focusRevertScroll) {
			//	 // console.log('select revertNextScroll', this);
			//	 this.$root.revertNextScroll();
			// }
		},
		emitBlur: function(evt) {
			if (this.campo.disabled) return;
			var act = document.activeElement;
			if (!evt || !act || !Utils.isChildOf(act, this.$el)) {
				this.$emit('blur', {
					campo: this.campo,
					event: evt
				});
			}
			this.focused = false;
		},
		documentClick: function(ev) {
			if (this.campo.disabled) return;
			if ( !Utils.isChildOf(ev.target, this.$el) ) {
				this.setOpened(false);
			}
		}
	},
	mounted: function() {
		var self = this;
		document.documentElement.addEventListener('click', this.documentClick, false);
	},
	beforeDestroy: function() {
		document.documentElement.removeEventListener('click', this.documentClick, false);
	}
};

})(window._vcomp$);
