var fs = require('fs');
var path = require('path');
// var dirFiles = require('dir-files');
var minimist = require('minimist');
var loadPartials = require('./load-partials');
var pages = require('./pages');
var startLocalServer = require('./server/index');
var argv = minimist(process.argv.slice(2), { default: { server: true } });

var localport = argv.port || argv.p || 8082;
// var dfp = dirFiles.plugins;
var envName = argv.env || argv.e || 'homolog';
var envConfig = require('./config/' + envName);
var env = {
	name: envName,
	config: envConfig,
	renderPage: null,
	port: localport
};

console.log('> using env ' + envName);

loadPartials(function(err, partials) {
	if (err) throw err;

	env.renderPage = pages.fnRenderEnv(env, partials);
	var aPage = argv.page; // "p" é usado para a porta do servidor local
	if (aPage) {
		env.renderPage.page(aPage, function(error, pageOpts, outputDir, output) {
			console.log('> page ' + pageOpts.name + ' read '+pageOpts.templateName+' write ' + output);
			if (error) console.error(error);
		});
	} else if (argv.pages !== false) {
		env.renderPage.allPages(function(state) {
			var done = state.done;
			for (var i = 0, ii = done.length; i < ii; i++) {
				var p = done[i];
				console.log('> page ' + p.page + ' read '+p.template+' write ' + p.output);
				if (p.error) console.error(p.error);
			}
		});
	}

	var cPath = argv.component || argv.c;
	if (cPath) {
		env.renderPage.createComponent(cPath, argv.tag || argv.t, function(err) {
			if (err) {
				console.error('Error creating component ' + cPath);
				throw err;
			}
			console.log('> created component ' + cPath);
		});
	}
});

argv['server'] && startLocalServer(env);
