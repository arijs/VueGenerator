
var hop = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

function propertyOverwrite(key, target, source) {
	target[key] = source[key];
}

function fnPropertyExtend(subExtend) {
	propertyExtend.setSubExtend = setSubExtend;
	return propertyExtend;
	function setSubExtend(se) { subExtend = se; }
	function propertyExtend(key, target, source) {
		var sk = source[key];
		var tk = target[key];
		var so = 'object' === typeof sk;
		var to = 'object' === typeof tk;
		var spo = sk && so ? sk.__proto__ === Object.prototype : false;
		var tpo = tk && to ? tk.__proto__ === Object.prototype : false;
		target[key] = (spo && tpo) ? subExtend(tk, sk) : sk;
	}
}

var propertyObjectModify = fnPropertyExtend();
var propertyObjectCreate = fnPropertyExtend();

propertyObjectModify.setSubExtend(function(target, source) {
	return extendCustom(propertyObjectModify, target, source);
});
propertyObjectCreate.setSubExtend(function(target, source) {
	return extendCustom(propertyObjectCreate, {}, target, source);
});

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

var extend = fnExtendCustom(propertyOverwrite);
var extendDeep = fnExtendCustom(propertyObjectModify);
var merge = fnExtendCustom(propertyObjectCreate);

module.exports = {
	extend: extend,
	extendDeep: extendDeep,
	merge: merge,
	extendCustom: extendCustom,
	fnExtendCustom: fnExtendCustom
	fnPropertyExtend: fnPropertyExtend,
	propertyOverwrite: propertyOverwrite,
	propertyObjectModify: propertyObjectModify,
	propertyObjectCreate: propertyObjectCreate
};
