(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["tab-button"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			active: {
				type: Boolean
			},
			title: {
				type: String
			}
		},
		methods: {
			onClick: function() {
				this.$emit('click', this);
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
