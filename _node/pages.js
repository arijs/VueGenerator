var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var all = require('./all');
var openDir = require('./open-dir');
var hop = Object.prototype.hasOwnProperty;

function renderTemplate(template, outputRoot, output, vars, partials, cb) {
	fs.readFile(template, 'utf8', function(err, source) {
		if (err) return cb(err);
		var html = mustache.render(source, vars, partials);
		// console.log(html);
		var outputDir = output.replace(/^[\\\/]+|[\\\/]+$/g,'').split(/[\\\/]+/g);
		var outputFile = outputDir.pop();
		openDir.array(outputRoot, outputDir, function(err) {
			if (err) return cb(err);
			output = path.join(outputRoot, output);
			fs.writeFile(output, html, 'utf8', cb);
		});
		// process.exit();
	});
}

function fnRenderEnv(envName, envConfig, partials) {
	return {
		page: renderPage,
		allPages: renderAllPages
	};
	function renderPage(pageName, callback) {
		var pageConfig = envConfig.pages[pageName];
		var template = pageConfig.template || pageName+'.mustache';
		var output = pageConfig.output || pageName+'.html';
		var vars = envConfig.template_vars;
		var outputDir = path.join(__dirname, '..');
		template = path.join(__dirname, './template/pages', template);

		renderTemplate(template, outputDir, output, vars, partials, function(err) {
			callback(err, template, output, pageName, envName);
		});
	}
	function renderAllPages(callback) {
		var state = {
			pages: [],
			done: [],
			errors: []
		};
		var done = all(state, callback, function(ref, state) {
			if (ref) state.done.push(ref);
			if (state.done.length === state.pages.length) return state;
		});
		for (var k in envConfig.pages) {
			if (hop.call(envConfig.pages, k)) {
				(function() {
					var ref = {
						page: k,
						env: envName,
						error: null,
						template: null,
						output: null
					};
					state.pages.push(ref);
					renderPage(k, done(function(state, args) {
						ref.error = args[0];
						ref.template = args[1];
						ref.output = args[2];
						if (args[0]) state.errors.push(ref);
						return ref;
					}));
				})();
			}
		}
		done()(); // para forçar a verificação caso não haja nenhuma página
	}
}


module.exports = {
	renderTemplate: renderTemplate,
	fnRenderEnv: fnRenderEnv
};
