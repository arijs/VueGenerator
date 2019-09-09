(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

function rotateX(x) {
	x *= Math.PI;
	var cosX = Math.cos(x);
	var sinX = Math.sin(x);
	return (
		[ 1,    0,     0
		, 0, cosX, -sinX
		, 0, sinX,  cosX
		]);
}
function rotateY(y) {
	y *= Math.PI;
	var cosY = Math.cos(y);
	var sinY = Math.sin(y);
	return (
		[  cosY, 0, sinY
		,     0, 1,    0
		, -sinY, 0, cosY
		]);
}
function rotateZ(z) {
	z *= Math.PI;
	var cosZ = Math.cos(z);
	var sinZ = Math.sin(z);
	return (
		[ cosZ, -sinZ, 0
		, sinZ,  cosZ, 0
		,    0,     0, 1
		]);
}
function applyMatrix(m, v) {
	return (
		[ m[0]*v[0] + m[1]*v[1] + m[2]*v[2]
		, m[3]*v[0] + m[4]*v[1] + m[5]*v[2]
		, m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
		]);
}
function applyMatrices(list, v) {
	var len = list && list.length || 0;
	for ( var i = 0; i < len; i++ ) {
		v = applyMatrix(list[i], v);
	}
	return v;
}

function multiplyMatrix(m1, m2) {
	return [
		m1[0]*m2[0] + m1[1]*m2[3] + m1[2]*m2[6],
		m1[0]*m2[1] + m1[1]*m2[4] + m1[2]*m2[7],
		m1[0]*m2[2] + m1[1]*m2[5] + m1[2]*m2[8],
		
		m1[3]*m2[0] + m1[4]*m2[3] + m1[5]*m2[6],
		m1[3]*m2[1] + m1[4]*m2[4] + m1[5]*m2[7],
		m1[3]*m2[2] + m1[4]*m2[5] + m1[5]*m2[8],
		
		m1[6]*m2[0] + m1[7]*m2[3] + m1[8]*m2[6],
		m1[6]*m2[1] + m1[7]*m2[4] + m1[8]*m2[7],
		m1[6]*m2[2] + m1[7]*m2[5] + m1[8]*m2[8]
	];
}

function multiplyMatrices(list) {
	var len = list && list.length || 0
		, m = list[0];
	for ( var i = 1; i < len; i++ ) {
		m = multiplyMatrix(m, list[i]);
	}
	return m;
}

function identityMatrix() {
	return [
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	];
}

function normalizeVector(v) {
	var x = v[0];
	var y = v[1];
	var z = v[2];
	var len = x*x+y*y+z*z;
	if ( 1 !== len ) {
		var rlen = 1 / Math.sqrt(len);
		x *= rlen;
		y *= rlen;
		z *= rlen;
	}
	return [x, y, z];
}

function subtractVector(v0, v1) {
	return (
		[ v0[0] - v1[0]
		, v0[1] - v1[1]
		, v0[2] - v1[2]
		]);
}

function addVector(v0, v1) {
	return (
		[ v0[0] + v1[0]
		, v0[1] + v1[1]
		, v0[2] + v1[2]
		]);
}

function rotateAxis(v, a) {
	v = normalizeVector(v);
	return rotateAxisNormalized(v, a);
}

function rotateAxisNormalized(v, a) {
	a *= Math.PI;
	var x = v[0];
	var y = v[1];
	var z = v[2];
	var c = Math.cos(a);
	var s = Math.sin(a);
	var xx = x*x;
	var yy = y*y;
	var zz = z*z;

	var nc = 1 - c;
	var xy = x*y;
	var yz = y*z;
	var zx = z*x;
	var xs = x*s;
	var ys = y*s;
	var zs = z*s;

	return [
		xx * nc +  c,
		xy * nc + zs,
		zx * nc - ys,

		xy * nc - zs,
		yy * nc +  c,
		yz * nc + xs,

		zx * nc + ys,
		yz * nc - xs,
		zz * nc +  c
	];
}

function getSlopePosX(slope, v, y) {
	return (slope * (y - v[1])) + v[0];
}
function getSlopePosY(slope, v, x) {
	return ((x - v[0]) / slope) + v[1];
}
function swapXY(v) {
	var s = v.slice();
	s[0] = v[1];
	s[1] = v[0];
	return s;
}

function fnLineAxis(p1, p2) {
	var pr = subtractVector(p2, p1);
	var axisDiff = Math.abs(pr[0]) - Math.abs(pr[1]);
	if (axisDiff > 0) { // mais horizontal
		var slopeX = pr[1] / pr[0];
		var p = swapXY(p1);
		return {
			axisDiff: axisDiff,
			x: function(y) { return getSlopePosY(slopeX, p, y); },
			y: function(x) { return getSlopePosX(slopeX, p, x); }
		};
	} else { // mais vertical
		var slopeY = pr[0] / pr[1];
		var p = p1.slice();
		return {
			axisDiff: axisDiff,
			x: function(y) { return getSlopePosX(slopeY, p, y); },
			y: function(x) { return getSlopePosY(slopeY, p, x); }
		};
	}
}

function getLineIntersection(la, bounds) {
	var top, bottom, left, right;
	if (la.axisDiff > 0) {
		left = [bounds.left, la.y(bounds.left)];
		right = [bounds.right, la.y(bounds.right)];
		if ( (left[1] < bounds.top && right[1] < bounds.top)
			|| (left[1] > bounds.bottom && right[1] > bounds.bottom)
		) return null; // line does not intersect boundaries
		if (left[1] < bounds.top) {
			left = [la.x(bounds.top), bounds.top];
			if (left[0] < bounds.left || left[0] > bounds.right) return null;
		}
		if (left[1] > bounds.bottom) {
			left = [la.x(bounds.bottom), bounds.bottom];
			if (left[0] < bounds.left || left[0] > bounds.right) return null;
		}
		if (right[1] < bounds.top) {
			right = [la.x(bounds.top), bounds.top];
			if (right[0] < bounds.left || right[0] > bounds.right) return null;
		}
		if (right[1] > bounds.bottom) {
			right = [la.x(bounds.bottom), bounds.bottom];
			if (right[0] < bounds.left || right[0] > bounds.right) return null;
		}
		return [left, right];
	} else {
		top = [la.x(bounds.top), bounds.top];
		bottom = [la.x(bounds.bottom), bounds.bottom];
		if ( (top[1] < bounds.left && bottom[1] < bounds.left)
			|| (top[1] > bounds.right && bottom[1] > bounds.right)
		) return null; // line does not intersect boundaries
		if (top[0] < bounds.left) {
			top = [bounds.left, la.y(bounds.left)];
			if (top[1] < bounds.top || top[1] > bounds.bottom) return null;
		}
		if (top[0] > bounds.right) {
			top = [bounds.right, la.y(bounds.right)];
			if (top[1] < bounds.top || top[1] > bounds.bottom) return null;
		}
		if (bottom[0] < bounds.left) {
			bottom = [bounds.left, la.y(bounds.left)];
			if (bottom[1] < bounds.top || bottom[1] > bounds.bottom) return null;
		}
		if (bottom[0] > bounds.right) {
			bottom = [bounds.right, la.y(bounds.right)];
			if (bottom[1] < bounds.top || bottom[1] > bounds.bottom) return null;
		}
		return [top, bottom];
	}
}

var splice = Array.prototype.splice;
function cutShapeLine(shape, line) {
	var pointsSide = [];
	var pcount = shape.length;
	var lmx = lineToMatrixX(line);
	var limx = invertCanvasMatrix(lmx);
	for (var i = 0; i < pcount; i++) {
		var p0 = shape[i];
		var p1 = shape[(i + 1) % pcount];
		var q0 = applyMatrix(limx, [p0[0], p0[1], 1]);
		var q1 = applyMatrix(limx, [p1[0], p1[1], 1]);
		var cut = cutLineYAxis(q0, q1);
		var cross = cut.cross;
		pointsSide.push({
			point: p0,
			above: cut.above[0],
			below: cut.below[0]
		});
		if (cross) {
			pointsSide.push({
				point: applyMatrix(lmx, [cross[0], cross[1], 1]),
				above: false,
				below: false
			});
		}
	}
	pcount = pointsSide.length;
	var above = [];
	var below = [];
	var shapeAbove;
	var shapeBelow;
	var shapeColinear;
	var shapeLast;
	var shapeFirst;
	var shapeLastSide;
	var shapeFirstSide;
	for (i = 0; i < pcount; i++) {
		p0 = pointsSide[i];
		// p1 = pointsSide[(i + 1) % pcount];
		if (p0.above) {
			if (shapeLast) {
				if (shapeLast === shapeAbove) {
					shapeAbove.push(p0.point);
				} else {
					below.push(shapeBelow);
					shapeBelow = void 0;
					if (shapeColinear) {
						shapeLast = shapeAbove = shapeColinear.concat([p0.point]);
						shapeColinear = void 0;
					} else {
						shapeLast = shapeAbove = [p0.point];
					}
				}
			} else if (shapeColinear) {
				shapeLast = shapeAbove = shapeColinear.concat([p0.point]);
				shapeColinear = void 0;
			} else {
				shapeLast = shapeAbove = [p0.point];
			}
			shapeFirst || (shapeFirst = shapeAbove);
			shapeFirstSide || (shapeFirstSide = above);
			// shapeLastSide = 'above';
		} else if (p0.below) {
			if (shapeLast) {
				if (shapeLast === shapeBelow) {
					shapeBelow.push(p0.point);
				} else {
					above.push(shapeAbove);
					shapeAbove = void 0;
					if (shapeColinear) {
						shapeLast = shapeBelow = shapeColinear.concat([p0.point]);
						shapeColinear = void 0;
					} else {
						shapeLast = shapeBelow = [p0.point];
					}
				}
			} else if (shapeColinear) {
				shapeLast = shapeBelow = shapeColinear.concat([p0.point]);
				shapeColinear = void 0;
			} else {
				shapeLast = shapeBelow = [p0.point];
			}
			shapeFirst || (shapeFirst = shapeBelow);
			shapeFirstSide || (shapeFirstSide = below);
			// shapeLastSide = 'below';
		} else {
			if (shapeLast) {
				shapeLast.push(p0.point);
			}
			shapeColinear || (shapeColinear = []);
			shapeColinear.push(p0.point);
		}
	}
	var firstMod = false;
	if (shapeAbove) {
		if (shapeFirstSide === above && shapeFirst !== shapeAbove) {
			splice.apply(shapeFirst, [shapeFirst.length,0].concat(shapeAbove));
			firstMod = true;
		} else {
			shapeFirst || (shapeFirst = shapeAbove, firstMod = true);
			above.push(shapeAbove);
		}
		shapeAbove = void 0;
	}
	if (shapeBelow) {
		if (shapeFirstSide === below && shapeFirst !== shapeBelow) {
			splice.apply(shapeFirst, [shapeFirst.length,0].concat(shapeBelow));
			firstMod = true;
		} else {
			shapeFirst || (shapeFirst = shapeBelow, firstMod = true);
			below.push(shapeBelow);
		}
		shapeBelow = void 0;
	}
	if (shapeColinear && !firstMod) {
		if (shapeFirst) {
			splice.apply(shapeFirst, [shapeFirst.length,0].concat(shapeColinear));
		} else {
			above.push(shapeColinear);
		}
		shapeColinear = void 0;
	}
	return {
		above: above,
		below: below
	};
}
function lineToMatrixX(line) {
	var vecX = [
		line[1][0] - line[0][0],
		line[1][1] - line[0][1],
		1
	];
	var vecY = applyMatrix(rotateZ(1.5), vecX);
	return [
		vecX[0], vecX[1], line[0][0],
		vecY[0], vecY[1], line[0][1],
		0, 0, 1
	];
}
function invertCanvasMatrix(m) {
	var det = (m[0]*m[4]-m[3]*m[1]);
	if (!det) throw new Error('Invalid determinant '+det+' - '+m.join());
	det = 1/det;
	return [
		m[4]*det, -m[3]*det, (m[3]*m[5] - m[4]*m[2])*det,
		-m[1]*det, m[0]*det, (m[1]*m[2] - m[0]*m[5])*det,
		0, 0, 1
	];
}
var epsilon = Math.pow(0.5, 32);
function cutLineYAxis(p0, p1) {
	var p0above = p0[1] < -epsilon;
	var p0below = p0[1] > epsilon;
	var p1above = p1[1] < -epsilon;
	var p1below = p1[1] > epsilon;
	if ( p0above && p1below || p0below && p1above ) {
		var la = fnLineAxis(p0, p1);
		var pm = [la.x(0), 0];
	}
	return {
		above: [p0above, p1above],
		below: [p0below, p1below],
		points: [p0, p1],
		cross: pm
	};
}

function getPlane(vv, transformVector) {
	var origin = transformVector(vv[0]);
	var vx = transformVector(vv[1]);
	var vy = transformVector(vv[2]);
	return (
		[ vx[0], vx[1]
		, vy[0], vy[1]
		, origin[0], origin[1]
		]);
}

function getPlanePoints(vv, transformVector) {
	var origin = vv[0];
	var vx = subtractVector(vv[1], origin);
	var vy = subtractVector(vv[2], origin);
	return getPlane([origin, vx, vy], transformVector);
}

function withPlane(ct, vv, transformVector, callback) {
	return withTransform(ct, getPlane(vv, transformVector), callback);
}

function withPoints(ct, vv, transformVector, callback) {
	return withTransform(ct, getPlanePoints(vv, transformVector), callback);
}

function withTransform(ct, pxy, callback) {
	ct.save();
	ct.transform.apply(ct, pxy);
	callback();
	ct.restore();
}

function line(ct, start, end) {
	ct.beginPath();
	ct.moveTo(start[0], start[1]);
	ct.lineTo(end  [0], end  [1]);
	ct.stroke();
}

function line3d(ct, transformVector, start, end) {
	start = transformVector(start);
	end   = transformVector(end  );
	line(ct, start, end);
}

function fill(ct, color) {
	ct.save();
	ct.fillStyle = color;
	ct.fill();
	ct.restore();
}

function path(ct, vlist) {
	var len = vlist.length;
	var v = vlist[0];
	ct.beginPath();
	ct.moveTo(v[0], v[1]);
	for ( var i = 1; i < len; i++ ) {
		v = vlist[i];
		ct.lineTo(v[0], v[1]);
	}
	ct.closePath();
}

function fnPath(vlist) {
	return function(ct) {
		return path(ct, vlist);
	}
}

function triangle(ct) {
	return path(ct, [
		[0, 0],
		[1, 0],
		[0, 1]
	]);
}

function square(ct) {
	return path(ct, [
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 1]
	]);
}

function arc(ct, radiusIn, radiusOut, start, end) {
	start *= Math.PI;
	end   *= Math.PI;
	ct.beginPath();
	ct.arc(0,0, radiusIn , start, end, false);
	ct.arc(0,0, radiusOut, end, start, true );
	ct.closePath();
}

function slice(ct, radius, start, end) {
	start *= Math.PI;
	end   *= Math.PI;
	ct.beginPath();
	ct.arc(0,0, radius, start, end, false);
	ct.lineTo(0,0);
	ct.closePath();
}

function quarterHalfArc(ct) {
	return arc(ct, 0.5, 1, 0, 0.5);
}

function quarterSlice(ct) {
	return slice(ct, 1, 0, 0.5);
}

function fnFill(ct, path, color) {
	return function() {
		path(ct);
		fill(ct, color);
	};
}

Utils.geometry = {
	rotateX: rotateX,
	rotateY: rotateY,
	rotateZ: rotateZ,
	applyMatrix: applyMatrix,
	applyMatrices: applyMatrices,
	multiplyMatrix: multiplyMatrix,
	multiplyMatrices: multiplyMatrices,
	identityMatrix: identityMatrix,
	normalizeVector: normalizeVector,
	subtractVector: subtractVector,
	addVector: addVector,
	rotateAxis: rotateAxis,
	rotateAxisNormalized: rotateAxisNormalized,
	getSlopePosX: getSlopePosX,
	getSlopePosY: getSlopePosY,
	swapXY: swapXY,
	fnLineAxis: fnLineAxis,
	getLineIntersection: getLineIntersection,
	cutShapeLine: cutShapeLine,
	lineToMatrixX: lineToMatrixX,
	invertCanvasMatrix: invertCanvasMatrix,
	cutLineYAxis: cutLineYAxis,
	getPlane: getPlane,
	getPlanePoints: getPlanePoints
};

Utils.canvas = {
	withPlane: withPlane,
	withPoints: withPoints,
	withTransform: withTransform,
	line: line,
	line3d: line3d,
	fill: fill,
	path: path,
	fnPath: fnPath,
	triangle: triangle,
	square: square,
	arc: arc,
	slice: slice,
	quarterHalfArc: quarterHalfArc,
	quarterSlice: quarterSlice,
	fnFill: fnFill
};

})(window._var$);
