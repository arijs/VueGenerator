var hop = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

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
		return extendCustom.apply(this, [method].concat(slice.call(arguments)));
	};
}

function fnPropertyExtend(subExtend) {
	propertyExtend.setSubExtend = setSubExtend;
	return propertyExtend;
	function setSubExtend(se) {
		subExtend = se;
	}
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
		throw new Error(
			'Objeto já contem uma propriedade ' +
				key +
				': ' +
				String(target[key]).substr(0, 32)
		);
	}
	target[key] = source[key];
}
var propertyObjectModify = fnPropertyExtend(function(
	key,
	target,
	source,
	propertyObjectModify
) {
	target[key] = extendCustom(propertyObjectModify, target[key], source[key]);
});
var propertyObjectCreate = fnPropertyExtend(function(
	key,
	target,
	source,
	propertyObjectCreate
) {
	target[key] = extendCustom(
		propertyObjectCreate,
		{},
		target[key],
		source[key]
	);
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
	propertyNewOnly: propertyNewOnly,
	propertyObjectModify: propertyObjectModify,
	propertyObjectCreate: propertyObjectCreate
});

module.exports = extend;
