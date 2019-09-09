(function(vars) {

var Utils = vars.Utils;

vars.compMap['form-campo/autocomplete'] = function(callback, template) {
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
	data: function () {
		return {
			searchOpcoes: [],
			searchSelected: 0,
			opened: false,
			focused: false,
			opcoesEase: Utils.easing.easeQuad,
			opcoesMod: Utils.easing.modOut,
			opcoesCancel: function() {},
			opcoesTime: 500
		}
	},
	computed: {
		cssClass: function () {
			var campo = this.campo;
			return {
				'campo-opened': Boolean(this.opened),
				'campo-focused': Boolean(this.focused),
				'campo-filled': Boolean(campo.selecionado || campo.valor),
				'campo-missing': Boolean(campo.falta),
				'campo-error': Boolean(campo.erro),
				'campo-valid': Boolean(campo.valido)
			};
		}
	},
	methods: {
		setOpened: function (opened) {
			this.opened = opened;
			this.$emit('open', opened);
		},
		setFocused: function (focused) {
			this.focused = focused;
		},
		opcaoClick: function (opcao) {
			this.$emit('valor', {
				campo: this.campo,
				valor: opcao ? opcao.texto : ''
			});
			this.$emit('selecionado', {
				campo: this.campo,
				selecionado: opcao || null
			});
			this.$emit('change');
			this.searchOpcoes = [];
			this.searchSelected = 0;
			this.campoClick();
			// this.emitBlur();
		},
		pressSpaceOpcao: function (opcao, event) {
			this.opcaoClick(opcao);
			event.preventDefault();
		},
		emitFocus: function (evt) {
			this.$emit('focus', evt);
			this.focused = true;
		},
		triggerBlur: function (evt) {
			this.focused = false;
			var act = document.activeElement;
			if (!evt || !act || !Utils.isChildOf(act, this.$el)) {
				this.$emit('blur', evt);
			}
			this.afterBlur();
		},
		afterBlur: function() {
			var selecionado = this.campo.selecionado;
			if (!(selecionado && selecionado.texto === this.campo.valor)) {
				var opcao = this.searchOpcoes[this.searchSelected];
				this.opcaoClick(opcao);
			}
		},
		documentClick: function (ev) {
			if (!Utils.isChildOf(ev.target, this.$el)) {
				this.setOpened(false);
			}
		},
		onTextKeyDown: function(evt) {
			var mov = 0;
			if (evt.keyCode === 38) {
				// seta pra cima
				mov = -1;
			} else if (evt.keyCode === 40) {
				// seta pra baixo
				mov = +1;
			} else if (evt.keyCode === 13) {
				// enter
				this.opcaoClick(this.searchOpcoes[this.searchSelected]);
			}
			var sol = this.searchOpcoes.length;
			this.searchSelected = ((this.searchSelected + mov) % sol + sol) % sol;
			this.$nextTick(this.ensureSelectedVisible);
		},
		onTextKeyUp: function() {},
		ensureSelectedVisible: function() {
			var sol = this.searchOpcoes.length;
			var lista = this.$refs.lista;
			var opcao = this.$refs.opcao;
			var opcaoSelected = this.searchSelected;
			opcao = sol && opcao && opcao[opcaoSelected];
			if (!opcao) return;
			var listaTop = lista.scrollTop;
			var listaBottom = listaTop + lista.clientHeight;
			var opcaoTop = opcao.offsetTop;
			var opcaoBottom = opcaoTop + opcao.offsetHeight;
			var scrollTo;
			if (opcaoTop < listaTop) scrollTo = opcaoTop;
			else if (opcaoBottom > listaBottom) scrollTo = opcaoBottom - lista.clientHeight;
			if (null == scrollTo) return;
			var cancel;
			var time = this.opcoesTime;
			var ease = this.opcoesEase;
			var mod = this.opcoesMod;
			this.opcoesCancel();
			this.opcoesCancel = function() { cancel = true; };
			Utils.animate(listaTop, scrollTo, time, ease, mod, function(pos) {
				if (cancel) return cancel;
				lista.scrollTop = parseInt(pos);
			});
		},
		onFocus: function(evt) {
			this.focused = true;
			this.$emit('focus', evt);
		},
		onBlur: function(evt) {
			this.focused = false;
			this.$emit('blur', evt);
			this.afterBlur();
		},
		onInput: function(evt) {
			var valor = evt.target.value;
			var campo = this.campo;
			this.$emit('valor', {
				campo: campo,
				valor: valor
			});
			this.$emit('input', evt);
			var us = Utils.string;
			if (us) {
				var search = us.search(valor);
				Utils.forEach(campo.opcoes, function(o) {
					search.insert(o.texto, o);
				});
				var cut = search.getClosest(campo.cutDistance);
				var closest = [];
				Utils.forEach(cut, function(item) {
					var d = item.data;
					closest.push({
						texto: d.texto,
						valor: d.valor,
						item: item
					});
					var mr = campo.maxResults;
					if (mr > 0 && closest.length == mr) {
						return this._break;
					}
				});
				this.searchSelected = 0;
				this.searchOpcoes = closest;
			}
		},
		onAnimationStart: function(evt) {
			switch (evt.animationName) {
				case 'onAutoFillStart':
					this.onAutoFill(true); break;
				case 'onAutoFillCancel':
					this.onAutoFill(false); break;
			}
			this.$emit('animationstart', evt);
		},
		onAutoFill: function(af) {
			this.autofill = af;
			this.$emit('autofill', af);
		},
		campoClick: function(evt) {
			this.setOpened(!this.opened);
			var input = this.$refs.input;
			if (evt && evt.target !== input) {
				input.focus();
			}
		},
		initSearch: function() {}
	},
	mounted: function () {
		document.documentElement.addEventListener('click', this.documentClick, false);
	},
	beforeDestroy: function () {
		document.documentElement.removeEventListener('click', this.documentClick, false);
	}
};

})(window._vcomp$); 
