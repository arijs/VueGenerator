(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["pages/cadastro"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				modalTermos: false,
				efetuado: false
			};
		},
		computed: {
			baseUrl: function() {
				return this.$store.state.baseUrl;
			}
		},
		methods: {
			termosAceitar: function() {
				this.$refs.form.$emit('termosAceitar');
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
