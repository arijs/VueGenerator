var fs = require('fs');
var path = require('path');
var all = require('./all');

function loadComponentTemplates(callback) {
	var state = { html: false, js: false, css: false, errors: [] };
	var done = all(state, callback, function(ref, state) {
		state[ref.name] = ref;
		if (ref.error) state.errors.push(ref);
		return state.html && state.js && state.css ? state : null;
	});
	var basePath = path.join(__dirname, 'template/comp');
	fs.readFile(
		path.join(basePath, 'comp.html.mustache'),
		'utf8',
		done(function(state, args) {
			return { name: 'html', error: args[0], content: args[1] };
		})
	);
	fs.readFile(
		path.join(basePath, 'comp.js.mustache'),
		'utf8',
		done(function(state, args) {
			return { name: 'js', error: args[0], content: args[1] };
		})
	);
	fs.readFile(
		path.join(basePath, 'comp.css.mustache'),
		'utf8',
		done(function(state, args) {
			return { name: 'css', error: args[0], content: args[1] };
		})
	);
}

module.exports = loadComponentTemplates;
