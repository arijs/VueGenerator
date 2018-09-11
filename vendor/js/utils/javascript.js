(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

var hop = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

Utils.extend = (function() {

	function extendCustom(method, target) {
		var argc = arguments.length;
		for (var i = 2; i < argc; i++) {
			var source = arguments[i];
			for (var k in source) {
				if (hop.call(source, k)) {
					method(k, target, source);
				}
			}
		}
		return target;
	}

	function fnExtendCustom(method) {
		return function extend() {
			return extendCustom.apply(this, [method].concat(slice.call(arguments)))
		}
	}

	function fnPropertyExtend(subExtend) {
		propertyExtend.setSubExtend = setSubExtend;
		return propertyExtend;
		function setSubExtend(se) { subExtend = se; }
		function propertyExtend(key, target, source) {
			var sk = source[key];
			var tk = target[key];
			var so = sk && 'object' === typeof sk;
			var to = tk && 'object' === typeof tk;
			var spo = so ? sk.__proto__ === Object.prototype : false;
			var tpo = to ? tk.__proto__ === Object.prototype : false;
			if (spo && tpo) {
				subExtend(key, target, source, propertyExtend);
			} else {
				target[key] = sk;
			}
		}
	}

	function propertyOverwrite(key, target, source) {
		target[key] = source[key];
	}
	function propertyNewOnly(key, target, source) {
		if (hop.call(target, key)) {
			throw new Error('Objeto já contem uma propriedade '+key+': '+String(target[key]).substr(0, 32));
		}
		target[key] = source[key];
	}
	var propertyObjectModify = fnPropertyExtend(function(key, target, source, propertyObjectModify) {
		target[key] = extendCustom(propertyObjectModify, target[key], source[key]);
	});
	var propertyObjectCreate = fnPropertyExtend(function(key, target, source, propertyObjectCreate) {
		target[key] = extendCustom(propertyObjectCreate, {}, target[key], source[key]);
	});

	var extend = fnExtendCustom(propertyOverwrite);
	var extendNewOnly = fnExtendCustom(propertyNewOnly);
	var extendDeep = fnExtendCustom(propertyObjectModify);
	var extendMerge = fnExtendCustom(propertyObjectCreate);

	extendNewOnly(extend, {
		newOnly: extendNewOnly,
		deep: extendDeep,
		merge: extendMerge,
		custom: extendCustom,
		fnExtendCustom: fnExtendCustom,
		fnPropertyExtend: fnPropertyExtend,
		propertyOverwrite: propertyOverwrite,
		propertyObjectModify: propertyObjectModify,
		propertyObjectCreate: propertyObjectCreate
	});

return extend;

})();

Utils.forEach = function forEach(list, cb, result) {
	var _break = 1 << 0;
	var _remove = 1 << 1;
	var count = list.length;
	var i;
	if (result instanceof Function && !(cb instanceof Function)) {
		result = [result, cb];
		cb = result[0];
		result = result[1];
	}
	var ctx = {
		_break: _break,
		_remove: _remove,
		result: result,
		count: list.length,
		i: 0
	};
	var ret;
	for ( ; ctx.i < ctx.count; ctx.i++ ) {
		ret = cb.call(ctx, list[ctx.i], ctx.i, list);
		if (_remove & ret) {
			list.splice(ctx.i, 1);
			ctx.i--;
			ctx.count--;
		}
		if (_break & ret) {
			break;
		}
	}
	return ctx.result;
};

Utils.forEachProperty = function forEachProperty(obj, cb) {
	var _break = 1 << 0;
	var i = 0;
	var ctx = {
		_break: _break
	};
	var ret;
	for ( var k in obj ) {
		if ( !hop.call(obj, k) ) continue;
		ret = cb.call(ctx, obj[k], k, i);
		if (_break & ret) {
			break;
		}
		i++;
	}
};

Utils.filter = function(list, cb) {
	return Utils.forEach(list, [], function(val, i) {
		if (cb(val, i, list)) this.result.push(val);
	});
};

Utils.debounce = function debounce(fn, wait) {
	function cancel() {
		_iv && clearTimeout(_iv);
		_iv = null;
	}
	function fire() {
		waiting = false;
		fn();
	}
	function trigger() {
		cancel();
		waiting = true;
		_iv = setTimeout(fire, wait);
	}
	function customWait(wait) {
		cancel();
		waiting = true;
		_iv = setTimeout(fn, wait);
	}
	function isWaiting() {
		return waiting;
	}
	var _iv;
	var waiting = false;
	trigger.cancel = cancel;
	trigger.customWait = customWait;
	trigger.isWaiting = isWaiting;
	return trigger;
};

Utils.all = function(state, finish, reduce, add) {
	return item;
	function item(ref) {
		add && (ref = add(state, ref));
		return done;
		function done() {
			if (ref instanceof Function) {
				ref = ref(state, arguments);
			}
			if (reduce(ref, state, arguments)) {
				finish(state);
			}
		}
	}
};

Utils.padStart = function padStart(str, len, chars) {
	var strLen = str.length;
	if (strLen >= len) return str;
	var chLen = chars.length;
	var pad = '';
	var padLen = 0;
	var remain = len - strLen;
	while (padLen < remain) {
		pad += chars;
		padLen += chLen;
	}
	return pad.substr(0, remain) + str;
};

Utils.repeat = function repeat(times, item) {
	var list = [];
	while (times) {
		list.push(item);
		times--;
	}
	return list;
};

Utils.randomizeList = function(list) {
	var rand = [];
	for (var i = list.length-1; i >= 0; i--) {
		rand.splice(Math.floor(Math.random()*rand.length), 0, list[i]);
	}
	return rand;
};

Utils.parseQuery = function parseQuery(param) {
	param = String(param).replace(/^\?/, '').split('&');
	var obj = {};
	for (var i = 0; i < param.length; i++) {
		var pi = param[i];
		if (!pi) continue;
		var eqpos = pi.indexOf('=');
		//var pair = param[i].split('=');
		var name = window.decodeURIComponent(eqpos==-1?pi:pi.substr(0,eqpos));
		var value = window.decodeURIComponent(eqpos==-1?true:pi.substr(eqpos+1));
		obj[name] = value;
	}
	return obj;
};

Utils.stringifyQuery = function stringifyQuery(param) {
	var arr = [];
	for ( var key in param ) {
		if ( hop.call(param, key) ) {
			var pair = [
				window.encodeURIComponent(key),
				window.encodeURIComponent(String(param[key]))
			];
			arr.push(pair.join('='));
		}
	}
	return arr.join('&');
};

Utils.htmlEntitiesEncode = function(str) {
	var text = document.createTextNode(str);
	var div = document.createElement('div');
	div.appendChild(text);
	return div.innerHTML;
};

Utils.htmlEntitiesDecode = function(str) {
	var div = document.createElement('div');
	div.innerHTML = str.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	return div.firstChild.nodeValue;
};

})(window._var$);
