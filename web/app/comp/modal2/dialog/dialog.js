(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["modal2/dialog"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			title: {
				type: String,
				default: ''
			},
			message: {
				type: String,
				default: ''
			},
			buttons: {
				type: Array,
				default: []
			}
		},
		methods: {
			clickClose: function() {
				this.$emit('click-close');
			},
			clickButton: function(b) {
				this.$emit('click-button', b);
			},
			modalClose: function() {
				this.$emit('close');
			},
			fadeOut: function() {
				this.$refs.modalBase.fadeOut();
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
