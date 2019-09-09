(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["collapse"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			open: {
				type: Boolean,
				required: true
			},
			time: {
				type: Number,
				default: 500
			},
			ease: {
				type: Function,
				default: Utils.easing.easeQuart
			},
			easeMod: {
				type: Function,
				default: Utils.easing.modOut
			},
			classBody: {
				type: [String, Array, Object]
			}
		},
		data: function() {
			return {
				animationStop: function(){},
				heightBody: 0,
				height: 0,
			};
		},
		computed: {
			heightComputed: function() {
				var ch = this.height;
				return ch === 'auto' ? ch : (+ch).toFixed(0)+'px';
			}
		},
		watch: {
			open: function(open, openBefore) {
				if (Boolean(open) == Boolean(openBefore)) return;
				var vm = this;
				var ch = this.height;
				var ct = this.time;
				var cc;
				var stopped;
				this.calcHeight();
				this.animationStop();
				this.animationStop = function() {
					stopped = true;
				};
				this.open = open;
				cc = this.heightBody;
				ch = open ? 0 : cc;
				Utils.animate(ch, open ? cc : 0, ct, this.ease, this.easeMod, function(p, t) {
					if (stopped) {
						return true;
					} else if (t < ct) {
						vm.height = p;
					} else {
						vm.updateHeight();
						vm.$emit('animation-end', open);
					}
				});
			}
		},
		methods: {
			calcHeight: function() {
				this.heightBody = this.$refs.body.scrollHeight;
			},
			updateHeight: function() {
				this.height = this.open ? 'auto' : 0;
			}
		},
		mounted: function() {
			this.calcHeight();
			this.updateHeight();
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
