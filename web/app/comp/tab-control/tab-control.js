(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["tab-control"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			classHeader: {
				type: [String, Array, Object]
			},
			classHeaderList: {
				type: [String, Array, Object]
			}
		},
		data: function() {
			return {
				tabs: [],
				tabActive: null
			};
		},
		watch: {
			tabActive: function(tab) {
				this.$emit('change', tab);
				this.$nextTick(function() {
					this.$forceUpdate();
				});
			}
		},
		methods: {
			registerTab: function(tab) {
				var tabs = this.tabs;
				var i = tabs.indexOf(tab);
				if (i == -1) {
					var order = +tab.tabOrder;
					if (order || order === 0) {
						for (i = 0; i < tabs.length; i++) {
							if (order < tabs[i].tabOrder) break;
						}
						tabs.splice(i, 0, tab);
					} else {
						tabs.push(tab);
					}
					if (!this.tabActive || tab.initActive) {
						this.tabActive = tab;
					}
				}
			},
			removeTab: function(tab) {
				var i = this.tabs.indexOf(tab);
				if (i != -1) this.tabs.splice(i, 1);
			},
			activateTabName: function(name) {
				var found;
				Utils.forEach(this.tabs, function(tab) {
					if (tab.tabName === name) {
						found = tab;
						return this._break;
					}
				});
				if (found) {
					this.tabActive = found;
				} else {
					throw new Error('Aba com nome '+JSON.stringify(name)+' não encontrada');
				}
			},
			getHeader: function(tab) {
				var h = tab.$slots.header;
				h = h && h[0];
				// if (h) {
				// 	console.log('tab header vnode', h, tab);
				// }
				return h;
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
