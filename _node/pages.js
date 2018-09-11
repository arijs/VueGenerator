var fs = require('fs');
var path = require('path');
var mustache = require('mustache');

function renderPage(template, output, vars, partials, cb) {

	fs.readFile(path.join(__dirname, './template/pages', template), 'utf8', function(err, source) {
		if (err) return cb(err);
		var html = mustache.render(source, vars, partials);
		// console.log(html);
		fs.writeFile(path.join(__dirname, '..', output), html, 'utf8', cb);
		// process.exit();
	});

}

function fnRenderPage(envName, envConfig, partials) {
	return function(pageName, callback) {
		var pageConfig = envConfig.pages[pageName];
		var template = pageConfig.template || pageName+'.mustache';
		var output = pageConfig.output || pageName+'.html';
		var vars = envConfig.template_vars;

		renderPage(template, output, vars, partials, function(err) {
			callback(err, template, output, pageName, envName);
		});
	};
}

module.exports = {
	render: renderPage,
	fnRender: fnRenderPage
};
