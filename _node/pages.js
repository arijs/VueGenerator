var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var hop = Object.prototype.hasOwnProperty;

function extend(target, source) {
	for (var k in source) {
		if (hop.call(source, k)) {
			target[k] = source[k];
		}
	}
	return target;
}

function getPageEnvConfig(page, env) {
	var sharedConfig, envConfig;
	try {
		sharedConfig = require(path.join(__dirname, '../env', page, 'shared'));
	} catch(e) {
		console.error(e);
	}
	try {
		envConfig = require(path.join(__dirname, '../env', page, env));
	} catch(e) {
		console.error(e);
	}
	if (!sharedConfig && !envConfig) {
		throw new Error('No config found for page '+page);
	}
	var config = {};
	sharedConfig && extend(config, sharedConfig);
	envConfig && extend(config, envConfig);
	extend(config, {
		__page: page,
		__env: env
	});
	return config;
}

function renderPage(config, partials, cb) {

	fs.readFile(path.join(__dirname, '../template/pages', config.template), 'utf8', function(err, template) {
		if (err) return cb(err);
		var html = mustache.render(template, config, partials);
		// console.log(html);
		fs.writeFile(path.join(__dirname, '..', config.output), html, 'utf8', cb);
		// process.exit();
	});

}

module.exports = {
	getEnvConfig: getPageEnvConfig,
	render: renderPage
};
