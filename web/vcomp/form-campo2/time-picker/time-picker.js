(function() {
	'use strict';
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	var mapAlign = {
		left: 'campo-lista-left',
		right: 'campo-lista-right'
	};
	VComp.compMap["form-campo2/time-picker"] = function(callback, template, match) {
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
				return mapAlign[this.listaAlign];
			},
			selecionadoTexto: function() {
				var c = this.campo;
				var h = c.hora;
				var m = c.minuto;
				return (
					0 <= h && h <= 23 &&
					0 <= m && m <= 59
				) ? [
					String('00'+h).substr(-2, 2),
					String('00'+m).substr(-2, 2)
				].join(':') : c.placeholder || '';
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
			onClickHora: function(h) {
				this.$emit('click-hora', {
					campo: this.campo,
					hora: h
				});
			},
			onClickMinuto: function(m) {
				this.$emit('click-minuto', {
					campo: this.campo,
					minuto: m
				});
			}
		},
		mounted: function() {
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
