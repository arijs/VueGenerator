(function() {
	'use strict';
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	VComp.compMap["levenshtein"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				mode: 'all',
				campoTextoA: {
					nome: 'textoA',
					rotulo: 'Texto A',
					valor: '',
					placeholder: '',
					erro: null,
					falta: false,
					valido: false,
					valida: []
				},
				campoTextoB: {
					nome: 'textoB',
					rotulo: 'Texto B',
					valor: '',
					placeholder: '',
					erro: null,
					falta: false,
					valido: false,
					valida: []
				}
			};
		},
		computed: {
			charsA: function() {
				return ['""'].concat(String(this.campoTextoA.valor).split(''));
			},
			charsB: function() {
				return ['""'].concat(String(this.campoTextoB.valor).split(''));
			},
			leven: function() {
				var a = String(this.campoTextoA.valor);
				var b = String(this.campoTextoB.valor);
				return Utils.string.levenshtein(a, b);
			},
			lvInv: function() {
				var l = this.leven;
				return l ? l.inv ? 'I' : 'D' : 'N';
			}
		},
		methods: {
			onCampoValor: function(payload) {
				this.$store.dispatch('campoValor', payload);
			},
			onCampoBlur: function(payload) {
				this.$store.dispatch('campoBlur', payload);
			},
			getQuad: function(ia, ib) {
				var l = this.leven;
				var li = l && l.inv;
				var y = li ? ia : ib;
				var x = li ? ib : ia;
				var f = l && l.full || [];
				var r1 = f[y-1] || [];
				var r0 = f[y-0] || [];
				return [
					r1[x-1],
					r1[x-0],
					r0[x-1],
					r0[x-0]
				];
			},
			getRaw: function(ia, ib) {
				var q = this.getQuad(ia, ib);
				return q[3];
			},
			getHor: function(ia, ib) {
				var q = this.getQuad(ia, ib);
				return q[2] == null ? '-' : q[3] - q[2];
			},
			getVer: function(ia, ib) {
				var q = this.getQuad(ia, ib);
				return q[1] == null ? '-' : q[3] - q[1];
			},
			getDia: function(ia, ib) {
				var q = this.getQuad(ia, ib);
				return q[0] == null ? '-' : q[3] - q[0];
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
