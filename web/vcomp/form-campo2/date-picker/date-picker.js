(function() {
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	var mapAlign = {
		left: 'campo-lista-left',
		right: 'campo-lista-right'
	};
	VComp.compMap["form-campo2/date-picker"] = function(callback, template, match) {
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
			},
			monthNames: {
				type: Array,
				required: true
			},
			weekDaysHeader: {
				type: Array,
				required: true
			},
			customMonthHeader: {
				type: [String, Function],
				required: false
			},
			listaAlign: {
				type: String,
				required: false,
				validator: function(v) {
					return v == null || Boolean(mapAlign[v]);
				}
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
					'campo-valid': Boolean(campo.valido),
					'campo-disabled': Boolean(campo.disabled)
				};
			},
			cssClassLista: function() {
				return [mapAlign[this.listaAlign]];
			},
			selecionadoTexto: function() {
				var s = this.campo.selecionado;
				return s || this.campo.placeholder || '';
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
			pressSpaceCampo: function(event) {
				this.campoClick(event);
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
			},
			onCalClickDay: function(day) {
				this.$emit('clickDay', {
					campo: this.campo,
					day: day
				});
			},
			onCalChangeMonth: function(date, change) {
				this.$emit('changeMonth', {
					campo: this.campo,
					date: date,
					change: change
				});
			}
		},
		mounted: function() {
			var self = this;
			document.documentElement.addEventListener('click', this.documentClick, false);
		},
		beforeDestroy: function() {
			document.documentElement.removeEventListener('click', this.documentClick, false);
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
