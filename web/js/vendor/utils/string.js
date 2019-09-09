(function(vars) {

var Utils;
var string = {};
vars.Utils = Utils = vars.Utils || {};
Utils.string = string;

string.singularPlural = singularPlural;
function singularPlural(n, s) {
	return s instanceof Array ? s[n == 1 ? 0 : 1] : s;
}

string.levenshtein = levenshtein;
function levenshtein(a, b, allways) {
	var cost, total;
	var m = a.length;
	var n = b.length;
	var inv = false;

	// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
	if (m < n) {
		var c = a; a = b; b = c;
		var o = m; m = n; n = o;
		inv = true;
	}

	var r = []; r[0] = [];
	for (var c = 0; c < m + 1; ++c) {
		r[0][c] = c;
	}

	for (var i = 1; i < n + 1; ++i) {
		r[i] = []; r[i][0] = i;
		for ( var j = 1; j < m + 1; ++j ) {
			cost = a.charAt( j - 1 ) === b.charAt( i - 1 ) ? 0 : 1;
			r[i][j] = Math.min( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
		}
	}

	// i = n, j = m;
	total = r[n][m];
	var opt = {
		a: a,
		b: b,
		allways: allways,
		r: r,
		inv: inv
	};
	var pathRoot = {
		opt: opt,
		way: null,
		path: [],
		matches: [],
		matchSum: 0,
		matchBig: null,
		match: null,
		i: n,
		j: m,
		sub: null
	};
	var pathsRun = [pathRoot];
	var pathsFinish = [];
	while (pathsRun.length) {
		var pobj = pathsRun.shift();
		var psub = levenshteinRun(pobj);
		if (psub) pathsRun = pathsRun.concat(psub);
		else pathsFinish.push(pobj);
	}
	// console.log(pathRoot, pathsRun, pathsFinish);

	return {
		total: total,
		inv: inv,
		// path: path,
		// matches: matches,
		// matchSum: matchSum,
		// matchBig: matchBig,
		pathRoot: pathRoot,
		pathsFinish: pathsFinish,
		full: r
	};
}

string.levenshteinRun = levenshteinRun;
function levenshteinRun(pobj) {
	var opt = pobj.opt;
	var r = opt.r;
	var a = opt.a;
	var b = opt.b;
	var inv = opt.inv;
	var allways = opt.allways;
	var way = pobj.way;
	var path = pobj.path;
	var matches = pobj.matches;
	// var matchSum = pobj.matchSum;
	var matchBig = pobj.matchBig;
	var match = pobj.match;
	var i = pobj.i;
	var j = pobj.j;
	var cost, lastCost, min, v, vn, ways;
	var op_i = 1; // insert
	var op_d = 2; // delete
	var op_r = 3; // replace
	var op_n = 0; // none
	var op_1 = inv ? op_d : op_i;
	var op_2 = inv ? op_i : op_d;
	function createSubObj(way) {
		return {
			opt: opt,
			way: way,
			path: path.slice(),
			matches: copyMatches(matches),
			matchSum: pobj.matchSum,
			matchBig: matchBig && copyMatch(matchBig),
			match: match && copyMatch(match),
			i: i,
			j: j,
			sub: null
		};
	}
	function copyMatch(match) {
		return {
			length: match.length,
			aPos: match.aPos,
			bPos: match.bPos
		};
	}
	function copyMatches(matches) {
		var l = [];
		for (var i = 0; i < matches.length; i++) {
			l.push(copyMatch(matches[i]));
		}
		return l;
	}
	function specialCase() {
		var s = (i > 0 && j > 0);
		var sc = s && a.charAt(j-1) === b.charAt(i-1);
		s = s && (lastCost == null || lastCost === op_n || sc)
			&& r[i][j] === r[i-1][j-1];
		// if (s || sc) console.log(a+'['+(j-1)+']='+a.charAt(j-1), b+'['+(i-1)+']='+b.charAt(i-1), s);
		return s && sc;
	}
	while (i > 0 || j > 0) {
		lastCost = cost;
		cost = r[i][j];
		if (way) {
			min = way.p;
			vn = way.v;
			way = void 0;
		} else {
			min = cost;
			ways = [];
			if (i != 0 && j != 0) v = r[i-1][j-1], ways.push({p:2, v:v}), min = v < min ? v : min;
			if (i != 0) v = r[i-1][j], ways.push({p:0, v:v}), min = v < min ? v : min;
			if (j != 0) v = r[i][j-1], ways.push({p:1, v:v}), min = v < min ? v : min;
			for (v = 0; v < ways.length; v++) {
				ways[v].v > min && !specialCase() && ways.splice(v--, 1);
			}
			if (ways.length > 1 && allways) {
				pobj.sub = {
					i: i,
					j: j,
					val: min,
					ways: []
				};
				for (v = 0; v < ways.length; v++) {
					pobj.sub.ways.push(createSubObj(ways[v]));
				}
				return pobj.sub.ways;
			} else {
				way = ways[0];
				min = way.p;
				vn = way.v;
				way = void 0;
			}
		}
		cost = [op_1, op_2, vn === cost ? op_n : op_r][min];
		if (cost === op_n) {
			if (!match) match = {length:0, aPos:null, bPos:null};
			match.length++;
			pobj.matchSum++;
			match.aPos = (inv ? i : j) - 1;
			match.bPos = (inv ? j : i) - 1;
		} else if (match) {
			if (!matchBig || match.length > matchBig.length) {
				matchBig = match;
			}
			matches.unshift(match);
			match = void 0;
		}
		path.unshift(cost);
		i -= [1, 0, 1][min];
		j -= [0, 1, 1][min];
	}
	if (match) {
		if (!matchBig || match.length > matchBig.length) {
			matchBig = match;
		}
		matches.unshift(match);
		match = void 0;
	}
	pobj.match = match;
	pobj.matchBig = matchBig;
}

string.levenshteinLength = levenshteinLength;
function levenshteinLength(a, b) {
	var leven = levenshtein(a, b);
	var pf = leven.pathsFinish[0];
	return {
		distance: leven.total,
		path: pf.path,
		matches: pf.matches,
		matchSum: pf.matchSum,
		matchBig: pf.matchBig,
		aLength: a.length,
		bLength: b.length
	};
}

var deaccentize;
string.deaccentize = deaccentize = (function() {

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

var charBasic = {
	A: 'ÀÁÂÃÄÅ', a: 'àáâãäå',
	C: 'Ç',      c: 'ç',
	E: 'ÈÉÊË',   e: 'èéêë',
	I: 'ÌÍÎÏ',   i: 'ìíîï',
	N: 'Ñ',      n: 'ñ',
	O: 'ÒÓÔÕÖØ', o: 'òóôõöø',
	U: 'ÙÚÛÜ',   u: 'ùúûü',
	Y: 'ÝŸ',     y: 'ýÿ'
};
var charAdvanced = {
	A: 'ĀĂĄ',    a: 'āăą',
	C: 'ĆĈĊČ',   c: 'ćĉċč',
	D: 'ĎĐ',     d: 'ďđ',
	E: 'ĒĔĖĘĚ',  e: 'ēĕėęě',
	G: 'ĜĞĠĢ',   g: 'ĝğġģ',
	H: 'ĤĦ',     h: 'ĥħ',
	I: 'ĨĪĬĮİ',  i: 'ĩīĭįı',
	J: 'Ĵ',      j: 'ĵ',
	K: 'Ķ',      k: 'ķ',
	L: 'ĹĻĽĿŁ',  l: 'ĺļľŀł',
	N: 'ŃŅŇ',    n: 'ńņň',
	O: 'ŌŎŐ',    o: 'ōŏő',
	R: 'ŔŖŘ',    r: 'ŕŗř',
	S: 'ŚŜŞŠ',   s: 'śŝşš',
	T: 'ŢŤŦ',    t: 'ţťŧ',
	U: 'ŨŪŬŮŰŲ', u: 'ũūŭůűų',
	W: 'Ŵ',      w: 'ŵ',
	Y: 'Ŷ',      y: 'ŷ',
	Z: 'ŹŻŽ',    z: 'źżž'
};
var basic    = {};
var advanced = {};
var all      = {};

setChars(charBasic, [basic, all]);
setChars(charAdvanced, [advanced, all]);

function deaccentize(s, charMap) {
	var t = '';
	charMap || (charMap = all);
	for ( var i = 0, ii = s.length; i < ii; i++ ) {
		var sc = s[i],
			tc = charMap[sc];
		t += tc || sc;
	}
	return t;
}

deaccentize.basic    = basic;
deaccentize.advanced = advanced;
deaccentize.all      = all;

return deaccentize;

})();

var reSpaces;
string.reSpaces = reSpaces = /^\s*|\s+(?=\s)|\s*$/g;

string.getViews = getViews;
function getViews(raw) {
	var trim = String(raw).replace(reSpaces, '');
	var lower = trim.toLowerCase();
	var noacc = deaccentize(lower);
	return {
		raw: raw,
		trim: trim,
		lower: lower,
		noacc: noacc
	};
}

string.getDistance = getDistance;
function getDistance(a, b) {
	return {
		raw: levenshteinLength(a.raw, b.raw),
		trim: levenshteinLength(a.trim, b.trim),
		lower: levenshteinLength(a.lower, b.lower),
		noacc: levenshteinLength(a.noacc, b.noacc)
	};
}

string.getDistanceView = getDistanceView;
function getDistanceView(view) {
	var first = view.matches[0];
	return {
		initial: view.distance,
		distance: view.distance + view.aLength - view.bLength,
		first: first && first.aPos === 0 ? first : null,
		biggest: view.matchBig,
		sum: view.matchSum
	};
}

string.compareViewItem = compareViewItem;
function compareViewItem(a, b) {
	var aw = a.distance, bw = b.distance;
	var af = a.first, bf = b.first;
	var ab = a.biggest, bb = b.biggest;
	if (ab) aw -= ab.length + 4;
	if (bb) bw -= bb.length + 4;
	if (af) aw -= af.length + 2;
	if (bf) bw -= bf.length + 2;
	aw -= a.sum;
	bw -= b.sum;
	return aw - bw;
}

string.compareViews = compareViews;
function compareViews(a, b) {
	var v, c;
	var views = ['noacc', 'lower', 'trim', 'raw'];
	do {
		v = views.shift();
		c = compareViewItem(a[v], b[v]);
	} while (c == 0 && views.length);
	return [c, v];
	// return ( a.noacc !== b.noacc ? ( a.noacc < b.noacc ? -1 : +1 ) :
	// 	( a.lower !== b.lower ? ( a.lower < b.lower ? -1 : +1 ) :
	// 	( a.trim !== b.trim ? ( a.trim < b.trim ? -1 : +1 ) :
	// 	( a.raw !== b.raw ? ( a.raw < b.raw ? -1 : +1 ) :
	// 	0 ) ) ) );
}

string.search = search;
function search(searchTerm, maxCount, maxDistance, merge) {
	function testMaxDistanceDefault(item) {
		// var dsrc = item.distSrc;
		var dist = item.dist;
		// if (dsrc.noacc.distance === dsrc.noacc.bLength) {
		// 	return false;
		// }
		if (maxDistance >= 0) {
			if (dist.noacc.distance > maxDistance) {
				return false;
			}
		} else if (String(maxDistance) === String({})) {
			if (
				(maxDistance.noacc >= 0 && dist.noacc > maxDistance.noacc) ||
				(maxDistance.lower >= 0 && dist.lower > maxDistance.lower) ||
				(maxDistance.trim >= 0 && dist.trim > maxDistance.trim) ||
				(maxDistance.raw >= 0 && dist.raw > maxDistance.raw)
			) {
				return false;
			}
		}
		return true;
	}
	function mergeDefault(closest, item, index, total) {
		if (maxCount > 0) {
			if (index < maxCount) {
				closest.splice(index, 0, item);
				closest.splice(maxCount, total - maxCount);
			}
		} else {
			closest.splice(index, 0, item);
		}
		return closest;
	}
	function getDistanceObject(str, data) {
		var d = getDistance(searchTerm, getViews(str));
		return {
			data: data,
			str: str,
			dist: {
				raw: getDistanceView(d.raw),
				trim: getDistanceView(d.trim),
				lower: getDistanceView(d.lower),
				noacc: getDistanceView(d.noacc)
			}
		};
	}
	function insert(str, data) {
		var item = getDistanceObject(str, data), itemComp;
		if (testMaxDistance(item)) {
			for (var i = 0, ii = closest.length; i < ii; i++) {
				itemComp = compareViews(item.dist, closest[i].dist);
				if (itemComp[0] < 0) break;
			}
			closest = merge(closest, item, i, ii);
			return itemComp && itemComp.concat([item, i,
				i > 0 ? closest[0] : null,
				i > 1 ? closest[i-1] : null,
				(i + 2) < ii ? closest[i+1] : null,
				(i + 1) < ii ? closest[ii-1] : null
			]);
		}
	}
	function getClosest(cutDistance) {
		var c = closest.slice();
		var count = c.length;
		var dFirst = (c[0] || {}).dist;
		if (cutDistance && dFirst) {
			var dCut = {
				raw: cutDistance.raw == null ? null : dFirst.raw.distance + cutDistance.raw,
				trim: cutDistance.trim == null ? null : dFirst.trim.distance + cutDistance.trim,
				lower: cutDistance.lower == null ? null : dFirst.lower.distance + cutDistance.lower,
				noacc: cutDistance.noacc == null ? null : dFirst.noacc.distance + cutDistance.noacc
			}
			for (var i = 1; i < count; i++) {
				var d = c[i].dist;
				if (
					( dCut.raw != null && d.raw.distance > dCut.raw ) ||
					( dCut.trim != null && d.trim.distance > dCut.trim ) ||
					( dCut.lower != null && d.lower.distance > dCut.lower ) ||
					( dCut.noacc != null && d.noacc.distance > dCut.noacc )
				) break;
			}
			c = c.slice(0, i);
		}
		return c;
	}
	var testMaxDistance = maxDistance instanceof Function ? maxDistance : testMaxDistanceDefault;
	if (null == maxCount) maxCount = 0;
	if (!(merge instanceof Function)) merge = mergeDefault;
	var closest = [];
	searchTerm = getViews(searchTerm);
	return {
		distance: getDistanceObject,
		insert: insert,
		getClosest: getClosest
	};
}

})(window._var$);
