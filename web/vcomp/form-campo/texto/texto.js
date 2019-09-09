(function(vars) {

var vtmLoad = (function() {
	var vtm;
	var vtmLoading;
	var vtmUrl = vars.pathVueTextMask || 'https://unpkg.com/vue-text-mask@6.1.2/dist/vueTextMask.js';
	return function vtmLoad(cb) {
		if (vtm) return setTimeout(cb, 0);
		if (vtmLoading) return vtmLoading.push(cb);
		vtmLoading = [cb];
		vars.Utils.loadScript(vtmUrl, function(err) {
			if (err) throw err;
			vtm = vueTextMask.default;
			Vue.component('masked-input', vtm);
			vtmLoad.ready = true;
			vars.Utils.forEach(vtmLoading, function(cb) {
				cb();
			});
			vtmLoading = null;
		});
	};
})();

vars.compMap['form-campo/texto'] = function(callback, template) {
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
		var self = this;
		var vtmReady = Boolean(vtmLoad.ready);
		if (this.campo.mask && !vtmReady) {
			vtmLoad(function() {
				self.maskReady = vtmReady = true;
			});
		}
		return {
			// valor: this.campo.valor,
			focused: false,
			autofill: false,
			maskReady: vtmReady
		}
	},
	computed: {
		cssClass: function() {
			var campo = this.campo;
			return {
				'campo-filled': campo.valor || this.autofill,
				'campo-focused': this.focused,
				'campo-missing': campo.falta,
				'campo-error': campo.erro,
				'campo-valid': campo.valido
			};
		}
	},
	methods: {
		focus: function() {
			if (this.campo.mask) {
				this.$refs.inputMask.$refs.input.focus();
			} else {
				this.$refs.input.focus();
			}
		},
		reloadValue: function() {
			// this.valor = this.campo.valor;
		},
		onFocus: function(evt) {
			this.focused = true;
			// console.log('campo/texto focus', evt, this);
			this.$emit('focus', {
				campo: this.campo,
				event: evt
			});
			// if (this.focusRevertScroll) {
			//	 // console.log('texto revertNextScroll', this);
			//	 this.$root.revertNextScroll();
			// }
		},
		onBlur: function(evt) {
			this.focused = false;
			this.$emit('blur', {
				campo: this.campo,
				event: evt
			});
		},
		onInput: function(evt) {
			//this.$emit('input', this.value);
			var valor;
			if ('string' === typeof evt) {
				valor = evt;
			} else if (evt && evt.target && 'string' === typeof evt.target.value) {
				valor = evt.target.value;
			}
			// this.$store.commit('setFormCampoValor', {
			//	 campo: this.campo,
			//	 valor: valor
			// });
			this.$emit('valor', {
				campo: this.campo,
				valor: valor
			});
			this.$emit('input', evt);
		},
		onAnimationStart: function(evt) {
			switch (evt.animationName) {
				case 'onAutoFillStart':
					this.onAutoFill(true); break;
				case 'onAutoFillCancel':
					this.onAutoFill(false); break;
			}
			this.$emit('animationstart', evt);
			// console.log('animationstart', evt, this.autofill, this.cssClass);
		},
		onAutoFill: function(af) {
			this.autofill = af;
			this.$emit('autofill', af);
		},
		campoClick: function(event) {
			var m = this.campo.mask && this.maskReady;
			var input = m ? this.$refs.inputMask.$el : this.$refs.input;
			if (event.target !== input) {
				input.focus();
			}
		}
	}
};

})(window._vcomp$);
