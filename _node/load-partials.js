var fs = require('fs'),
	path = require('path'),
	dirFiles = require('dir-files'),
	dfp = dirFiles.plugins;

function fnErrorFileType(getMessage) {
	return {
		name: 'errorInvalidFileType',
		sync: function(file) {
			return new Error(getMessage(file));
		}
	};
}

var dfpStat = dfp.stat();
var dfpQueueDir = dfp.queueDir();
var dfpReadDir = dfp.readDir();
var dfpQueueDirFiles = dfp.queueDirFiles();
var dfpErrorFileType = fnErrorFileType(function(file) {
	return 'item is not a dir or file: ' + path.join(file.dir.sub, file.name);
});
var reExtMustache = /^([\w.-]+)\.mustache$/i;
var dfpProcessFile = {
	name: 'loadPartialProcessFile',
	async: function(file, callback) {
		var m = file.name.match(reExtMustache);
		if (m) {
			var result = this.result;
			var sub = file.dir.sub;
			sub &&
				(sub = sub
					.replace(/\W/g, '_')
					.toUpperCase()
					.concat('_'));
			var name = sub + m[1].replace(/\W/g, '_').toLowerCase();
			// console.log(file);
			fs.readFile(
				path.join(file.dir.root, file.dir.sub, file.name),
				'utf8',
				function(err, data) {
					if (err) {
						callback(err);
					} else {
						result[name] = data;
						callback();
					}
				}
			);
		} else {
			callback();
		}
	}
};
var dfpAfterStat = {
	name: 'afterStat',
	pluginTimeIgnore: true,
	sync: function afterStat(file) {
		if (file.stat.isDirectory()) {
			if (file.name) {
				this.plugins.push(dfpQueueDir);
			} else {
				this.plugins.push(dfpReadDir, dfpQueueDirFiles);
			}
		} else if (file.stat.isFile()) {
			this.plugins.push(dfpProcessFile);
		} else {
			this.plugins.push(dfpErrorFileType);
		}
	}
};

function loadPartials(cb) {
	var initialPlugins = [dfpStat, dfpAfterStat];

	dirFiles({
		//,path: node_path.join(file.fullpath, 'static'),
		path: [path.join(__dirname, './template/pages/_partials')],
		result: {},
		callback: cb,
		processPlugins: [
			{
				beforeFile: function() {
					this.plugins = initialPlugins.slice();
				}
			}
		]
	});
}

// loadPartials(function(err, partialMap) {
// 	if (err) throw err;
// 	console.log(partialMap);
// });

module.exports = loadPartials;
