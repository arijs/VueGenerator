(function() {
	'use strict';
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	VComp.compMap["lista-horario"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			hora: {
				type: Number
			},
			minuto: {
				type: Number
			}
		},
		methods: {
			getHora: function(hg, h) {
				return (hg-1)*6+h-1;
			},
			getMinuto: function(mg, m) {
				return (mg-1)*30+(m-1)*5;
			},
			clickHora: function(hg, h) {
				this.$emit('click-hora', this.getHora(hg, h));
			},
			clickMinuto: function(mg, m) {
				this.$emit('click-minuto', this.getMinuto(mg, m));
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
