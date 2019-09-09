(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["tab-panel"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			initActive: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			},
			tabName: {
				type: String
			},
			tabOrder: {
				type: [Number, String]
			}
		},
		computed: {
			active: function() {
				return this.getTabControl().tabActive === this;
			}
		},
		methods: {
			getTabControl: function() {
				var tc = this.$parent;
				while (tc && tc.$options._componentTag !== 'app--tab-control') {
					tc = tc.$parent;
				}
				return tc;
			},
			activate: function() {
				this.getTabControl().tabActive = this;
			}
		},
		beforeMount() {
			this.getTabControl().registerTab(this);
		},
		beforeDestroy() {
			this.getTabControl().removeTab(this);
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
