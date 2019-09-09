(function(vars) {

var Utils = vars.Utils;

vars.compMap['form-campo2/autocomplete'] = function(callback, template) {
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
		classValue: {
			type: [String, Array, Object]
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
		emitValor: function(opcao, validar) {
			this.$emit('valor', {
				campo: this.campo,
				valor: opcao ? opcao.texto : '',
				validar: validar
			});
		},
		emitSelecionado: function(opcao, validar) {
			this.$emit('selecionado', {
				campo: this.campo,
				selecionado: opcao || null,
				validar: validar
			});
		},
		campoClick: function(evt) {
			var target = evt && evt.target;
			var clickInside = target &&
				Utils.isChildOf(target, this.$el) &&
				!Utils.isChildOf(target, this.$refs.valueBefore) &&
				!Utils.isChildOf(target, this.$refs.valueAfter);
			// console.log(clickInside ? 'clickInside' : '', this.opened ? 'open' : 'closed', target);
			this.setOpened(clickInside ? !this.opened : false);
			var input = this.$refs.input;
			if (clickInside) {
				input.focus();
				this.onFocus(evt);
			}
		},
		opcaoClick: function (opcao) {
			var validar = {ocultaErro: false};
			this.emitValor(opcao, validar);
			this.emitSelecionado(opcao, validar);
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
			// console.log('autocomplete:emitFocus focused='+this.focused, evt && evt.target);
		},
		triggerBlur: function (evt) {
			this.focused = false;
			var rel = evt && evt.relatedTarget;
			var act = rel || document.activeElement;
			if (!evt || !act ||
				(!Utils.isChildOf(act, this.$refs.input) &&
				!Utils.isChildOf(act, this.$refs.lista))
			) {
				this.onBlur();
			} else {
				this.afterBlur(rel);
			}
		},
		afterBlur: function(rel) {
			var selecionado = this.campo.selecionado;
			if (!this.campo.valor && !rel) {
				if (selecionado) this.opcaoClick();
			} else {
				var opcao = this.searchOpcoes[this.searchSelected];
				if (opcao) this.opcaoClick(opcao);
			}
		},
		documentClick: function (ev) {
			if (!Utils.isChildOf(ev.target, this.$el)) {
				this.setOpened(false);
			}
		},
		onTextKeyDown: function(evt) {
			if (evt.keyCode === 38) {
				// seta pra cima
				this.moveSelected(-1);
			} else if (evt.keyCode === 40) {
				// seta pra baixo
				this.moveSelected(+1);
			} else if (evt.keyCode === 13) {
				// enter
				this.opcaoClick(this.searchOpcoes[this.searchSelected]);
			}
		},
		onTextKeyUp: function() {},
		moveSelected: function(mov) {
			var sol = this.searchOpcoes.length;
			this.searchSelected = ((this.searchSelected + mov) % sol + sol) % sol;
			this.$nextTick(this.ensureSelectedVisible);
		},
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
			var rel = evt && evt.relatedTarget;
			// console.log('autocomplete:onFocus focused='+this.focused, rel);
			if (rel && (
				Utils.isChildOf(rel, this.$refs.valueBefore) ||
				Utils.isChildOf(rel, this.$refs.valueAfter)
			)) return;
			this.focused = true;
			this.$emit('focus', evt);
			this.searchOpcoesValor(this.campo.valor);
		},
		onBlur: function() {
			this.focused = false;
			// console.log('autocomplete:onBlur focused='+this.focused);
			this.$emit('blur', {
				campo: this.campo
			});
			this.afterBlur();
			// console.log('autocomplete:onBlur afterBlur focused='+this.focused);
		},
		searchOpcoesValor: function(valor) {
			var us = Utils.string;
			var campo = this.campo;
			var search = us.search(valor);
			var logInsert = [];
			Utils.forEach(campo.opcoes, function(o) {
				var li = search.insert(o.texto, o)
				li && logInsert.push(li);
			});
			var cut = search.getClosest(campo.cutDistance);
			// console.log('autocomplete search', logInsert, cut);
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
		},
		onInput: function(evt) {
			var valor = evt.target.value;
			var campo = this.campo;
			this.$emit('valor', {
				campo: campo,
				valor: valor
			});
			this.$emit('input', evt);
			this.searchOpcoesValor(valor);
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
