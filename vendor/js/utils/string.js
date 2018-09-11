(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

Utils.levenshtein = function levenshtein(a, b) {
	var cost;
	var m = a.length;
	var n = b.length;

	// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
	if (m < n) {
		var c = a; a = b; b = c;
		var o = m; m = n; n = o;
	}

	var r = []; r[0] = [];
	for (var c = 0; c < n + 1; ++c) {
		r[0][c] = c;
	}

	for (var i = 1; i < m + 1; ++i) {
		r[i] = []; r[i][0] = i;
		for ( var j = 1; j < n + 1; ++j ) {
			cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
			r[i][j] = Math.min( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
		}
	}

	return r.pop().pop();
};

Utils.deaccentize = (function() {

function setChars(chars, objList) {
	var ollen = objList && objList.length;
	if ( !ollen ) return;
	for ( var k in chars ) {
		if ( chars.hasOwnProperty(k) ) {
			var list = chars[k];
			for ( var i = 0, ii = list.length; i < ii; i++ ) {
				for ( var j = 0; j < ollen; j++ ) {
					objList[j][list[i]] = k;
				}
			}
		}
	}
}

function convert(s, obj) {
	var t = '';
	for ( var i = 0, ii = s.length; i < ii; i++ ) {
		var sc = s[i]
			, tc = obj[sc];
		t += tc || sc;
	}
	return t;
}

function fnConvert(obj) {
	return function(s) {
		return convert(s, obj);
	};
}

var charBasic =
	{ A: 'ÀÁÂÃÄÅ'
	, C: 'Ç'
	, E: 'ÈÉÊË'
	, I: 'ÌÍÎÏ'
	, N: 'Ñ'
	, O: 'ÒÓÔÕÖØ'
	, U: 'ÙÚÛÜ'
	, Y: 'ÝŸ'
	, a: 'àáâãäå'
	, c: 'ç'
	, e: 'èéêë'
	, i: 'ìíîï'
	, n: 'ñ'
	, o: 'òóôõöø'
	, u: 'ùúûü'
	, y: 'ýÿ'
	};
var charAdvanced =
	{ A: 'ĀĂĄ'
	, C: 'ĆĈĊČ'
	, D: 'ĎĐ'
	, E: 'ĒĔĖĘĚ'
	, G: 'ĜĞĠĢ'
	, H: 'ĤĦ'
	, I: 'ĨĪĬĮİ'
	, J: 'Ĵ'
	, K: 'Ķ'
	, L: 'ĹĻĽĿŁ'
	, N: 'ŃŅŇ'
	, O: 'ŌŎŐ'
	, R: 'ŔŖŘ'
	, S: 'ŚŜŞŠ'
	, T: 'ŢŤŦ'
	, U: 'ŨŪŬŮŰŲ'
	, W: 'Ŵ'
	, Y: 'Ŷ'
	, Z: 'ŹŻŽ'
	, a: 'āăą'
	, c: 'ćĉċč'
	, d: 'ďđ'
	, e: 'ēĕėęě'
	, g: 'ĝğġģ'
	, h: 'ĥħ'
	, i: 'ĩīĭįı'
	, j: 'ĵ'
	, k: 'ķ'
	, l: 'ĺļľŀł'
	, n: 'ńņň'
	, o: 'ōŏő'
	, r: 'ŕŗř'
	, s: 'śŝşš'
	, t: 'ţťŧ'
	, u: 'ũūŭůűų'
	, w: 'ŵ'
	, y: 'ŷ'
	, z: 'źżž'
	};
var basic    = {};
var advanced = {};
var all      = {};
var deaccentize;

setChars(charBasic, [basic, all]);
setChars(charAdvanced, [advanced, all]);

deaccentize          = fnConvert(all);
deaccentize.basic    = fnConvert(basic);
deaccentize.advanced = fnConvert(advanced);
deaccentize.map = {
	basic: basic,
	advanced: advanced,
	all: all
};

return deaccentize;

})();

Utils.searchClosestString = function(search) {
	function getViews(raw) {
		var trim = raw.replace(reSpaces, '');
		var lower = trim.toLowerCase();
		var noacc = Utils.deaccentize(lower);
		return {
			raw: raw,
			trim: trim,
			lower: lower,
			noacc: noacc
		};
	}
	function getDistance(str) {
		str = getViews(str);
		return {
			raw: Utils.levenshtein(search.raw, str.raw),
			trim: Utils.levenshtein(search.trim, str.trim),
			lower: Utils.levenshtein(search.lower, str.lower),
			noacc: Utils.levenshtein(search.noacc, str.noacc)
		};
	}
	function getClosest(aVal, bVal) {
		var a = aVal.dist;
		var b = bVal.dist;
		return ( a.noacc === b.noacc
			? ( a.lower === b.lower
				? ( a.trim === b.trim
					? ( a.raw <= b.raw
						? aVal
						: bVal )
					: ( a.trim < b.trim
						? aVal
						: bVal ) )
				: ( a.lower < b.lower
					? aVal
					: bVal ) )
			: ( a.noacc < b.noacc
				? aVal
				: bVal ) );
	}
	var closest;
	var reSpaces = /^\s*|\s+(?=\s)|\s*$/g;
	search = getViews(search);
	return {
		compare: function(str, data) {
			var item = {
				data: data,
				dist: getDistance(str)
			};
			var next = closest
				? getClosest(closest, item)
				: item;
			// if (closest !== next) {
			// 	console.log(closest, next);
			// }
			closest = next;
		},
		getClosest: function() {
			return closest;
		}
	};
};

})(window._var$);
