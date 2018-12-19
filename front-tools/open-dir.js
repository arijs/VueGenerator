var fs = require('fs');
var path = require('path');

var EXISTS = {};
var CREATED = {};
var ERROR = {};

function splitDirs(pathName) {
	return pathName.replace(/^[\\\/]+|[\\\/]+$/g, '').split(/[\\\/]+/g);
}

function testaDir(dir, cb) {
	fs.stat(dir, function(err, stat) {
		if (err) {
			if ('ENOENT' === err.code) {
				return cb(null, false);
			} else {
				return cb(err);
			}
		} else {
			return testaDirStat(dir, stat, cb);
		}
	});
}

function testaDirStat(dir, stat, cb) {
	if (stat.isDirectory()) {
		return cb(null, true);
	} else {
		var err = new Error('path exists but is not a directory: ' + dir);
		err.code = err.errno = 'ENOTDIR';
		return cb(err);
	}
}

function openDir(dir, cb, stats) {
	stats || (stats = { rec: 0, test: 0, make: 0 });
	testaDir(dir, function(err, exists) {
		stats.test++;
		if (err) {
			return cb.call(stats, err, ERROR);
		} else if (exists) {
			return cb.call(stats, null, EXISTS);
		} else {
			fs.mkdir(dir, function(err) {
				stats.make++;
				if (err) {
					if ('EEXIST' === err.code) {
						// mas eu acabei de verificar...
						stats.rec++;
						return openDir(dir, cb, stats);
					} else {
						return cb.call(stats, err, ERROR);
					}
				} else {
					return cb.call(stats, null, CREATED);
				}
			});
		}
	});
}

function openDirSub(base, sub, cb) {
	return openDir(path.join(base, sub), cb);
}

function openDirArray(base, arr, cb, stats) {
	stats || (stats = { count: 0, test: 0, rec: 0, make: 0, list: [] });
	if (arr.length) {
		stats.count++;
		var dir = arr.shift();
		base = base ? path.join(base, dir) : dir;
		return openDir(base, function(err) {
			stats.rec += this.rec;
			stats.test += this.test;
			stats.make += this.make;
			stats.list.push(this);
			if (err) {
				return cb.call(stats, err);
			} else {
				openDirArray(base, arr, cb, stats);
			}
		});
	} else {
		return cb.call(stats, null);
	}
}

function testaFile(file, cb) {
	fs.open(file, 'r', function(err, fd) {
		if (err) {
			if ('ENOENT' === err.code) {
				return cb(null, false);
			} else {
				return cb(err);
			}
		} else {
			fs.close(fd, function(err) {
				if (err) {
					return cb(err);
				} else {
					return cb(null, true);
				}
			});
		}
	});
}

openDir.EXISTS = EXISTS;
openDir.CREATED = CREATED;
openDir.sub = openDirSub;
openDir.array = openDirArray;
openDir.test = testaDir;
openDir.testFile = testaFile;
openDir.splitDirs = splitDirs;

module.exports = openDir;
