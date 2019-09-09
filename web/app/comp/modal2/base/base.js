(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	App.compMap["modal2/base"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			modalSize: {
				type: String,
				required: false
			},
			titleIconClass: {
				type: String,
				required: false
			},
			title: {
				type: String,
				required: false
			}
		},
		data: function() {
			return {
				isIn: false
			};
		},
		methods: {
			clickClose: function(){
				this.$emit('click-close');
			},
			fadeOut: function() {
				this.isIn = false;
				var vm = this;
				setTimeout(function() {
					vm.$emit('close');
				}, 200);
			}
		},
		mounted: function() {
			document.body.classList.add('modal-open');
			var vm = this;
			setTimeout(function() {
				vm.isIn = true;
			}, 50);
		},
		beforeDestroy: function() {
			document.body.classList.remove('modal-open');
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
