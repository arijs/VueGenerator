(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

var hop = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

window.requestAnimationFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

Utils.animate = function(from, to, time, ease, mod, cb) {
	ease || (ease = Utils.easing.easeLinear);
	mod || (mod = Utils.easing.modIn);
	var interMod = Utils.easing.interMod;
	var start = (new Date()).getTime();
	var timer = function() {
		var pos = new Date().getTime() - start;
		var posMin = Math.min(time, pos);
		var eased = interMod(posMin, from, to, time, ease, mod);
		if (cb(eased, pos)) return;
		if (posMin !== time) window.requestAnimationFrame(timer);
	};
	window.requestAnimationFrame(timer);
};

Utils.easing = (function() {
	/**
	 * @param t
	 * Current time, starting at zero.
	 * @param b
	 * Starting value to ease.
	 * @param c
	 * Ending value.
	 * @param d
	 * Duration in time.
	 */
	function inter(t, b, c, d, fn) {
		return fn(t / d) * (c - b) + b;
	}

	function interMod(t, b, c, d, ease, mod) {
		return mod(t / d, ease) * (c - b) + b;
	}
	function easeLinear(x) {
		return x;
	}
	function easeSin(x) {
		return 1 - Math.sin((1 - x) * 0.5 * Math.PI);
	}
	function easeQuad(x) {
		return x * x;
	}
	function easeCubic(x) {
		return x * x * x;
	}
	function easeQuart(x) {
		return x * x * x * x;
	}
	function easeQuint(x) {
		return x * x * x * x * x;
	}
	function modIn(t, fn) {
		return fn(t);
	}
	function modOut(t, fn) {
		return 1 - fn(1 - t);
	}
	function modTwice(t, fn) {
		return fn(t * 2) * 0.5;
	}
	function modInOut(t, fn) {
		return (t < 0.5 ?
			modTwice(t, fn) :
			modOut(t, fnMod(fn, modTwice))
		);
	}
	function modInOut2(t, fn) {
		return (t < 0.5 ?
			modTwice(t, fn[0]) :
			modOut(t, fnMod(fn[1], modTwice))
		);
	}
	function modOutIn(t, fn) {
		return (t < 0.5 ?
			modTwice(t, fnMod(fn, modOut)) :
			modTwice(t - 0.5, fn) + 0.5
		);
	}
	function modOutIn2(t, fn) {
		return (t < 0.5 ?
			modTwice(t, fnMod(fn[0], modOut)) :
			modTwice(t - 0.5, fn[1]) + 0.5
		);
	}

	function fnMod(fn, mod) {
		return function(t) {
			return mod(t, fn);
		};
	}

	function fnInter(fn) {
		return function(t, b, c, d) {
			return inter(t, b, c, d, fn);
		};
	}
	return {
		inter: inter,
		interMod: interMod,
		fnMod: fnMod,
		fnInter: fnInter,
		easeLinear: easeLinear,
		easeSin: easeSin,
		easeQuad: easeQuad,
		easeCubic: easeCubic,
		easeQuart: easeQuart,
		easeQuint: easeQuint,
		modIn: modIn,
		modOut: modOut,
		modTwice: modTwice,
		modInOut: modInOut,
		modInOut2: modInOut2,
		modOutIn: modOutIn,
		modOutIn2: modOutIn2
	};
})();

Utils.automaticTimer = function(cb) {
	function step() {
		if (active) {
			cb();
			requestAnimationFrame(step);
		}
	}
	function stop() {
		active = false;
	}
	function start() {
		if ( !active ) {
			active = true;
			requestAnimationFrame(step);
		}
	}
	function isActive() {
		return active;
	}
	var active;
	return (
		{ start: start
		, stop: stop
		, isActive: isActive
		});
}

Utils.refreshManager = function() {
	function add(n, fn) {
		var found = false;
		Utils.forEach(keys, function(k) {
			if ( k === n ) {
				found = true;
				return this._break;
			}
		});
		if ( !found ) {
			keys.push(n);
			keyCount++;
		}
		map[n] = fn;
		onchange && onchange();
	}
	function rem(n) {
		Utils.forEach(keys, function(k) {
			if ( k === n ) {
				keyCount--;
				return this._remove;
			}
		});
		map[n] = null;
		onchange && onchange();
	}
	function call() {
		Utils.forEach(keys, function(k) {
			var fn = map[k];
			fn && fn();
		});
	}
	function count() {
		return keyCount;
	}
	function setonchange(fn) {
		onchange = fn;
	}
	var map = {};
	var keys = [];
	var keyCount = 0;
	var onchange;
	return {
		add: add,
		rem: rem,
		call: call,
		count: count,
		setonchange: setonchange
	};
}

})(window._var$);
