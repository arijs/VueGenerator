var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var extend = require('./extend');
var all = require('./all');
var openDir = require('./open-dir');
var loadComponentTemplates = require('./load-component-templates');
var hop = Object.prototype.hasOwnProperty;

function renderTemplate(template, outputRoot, output, vars, partials, cb) {
	fs.readFile(template, 'utf8', function(err, source) {
		if (err) return cb(err);
		var html = mustache.render(source, vars, partials);
		// console.log(html);
		var outputDir = openDir.splitDirs(output);
		var outputFile = outputDir.pop();
		openDir.array(outputRoot, outputDir, function(err) {
			if (err) return cb(err);
			output = path.join(outputRoot, output);
			fs.writeFile(output, html, 'utf8', cb);
		});
		// process.exit();
	});
}

function renderComponentTemplate(path, template, ctx, partials, callback) {
	template = mustache.render(template, ctx, partials);
	fs.writeFile(path, template, 'utf8', callback);
}

function fnRenderEnv(envName, envConfig, partials) {
	return {
		page: renderPage,
		allPages: renderAllPages,
		createComponent: createComponent
	};
	function renderPage(pageName, callback) {
		var pageConfig = envConfig.pages[pageName];
		if (!pageConfig) throw new Error('Config not found for page ' + pageName);
		var template = pageConfig.template || pageName + '.mustache';
		var output = pageConfig.output || pageName + '.html';
		var vars = envConfig.template_vars;
		var pvars = pageConfig.template_vars;
		pvars = pvars ? extend.merge({}, vars, pvars) : vars;
		var outputDir = path.join(__dirname, '..');
		template = path.join(__dirname, './template/pages', template);

		renderTemplate(template, outputDir, output, pvars, partials, function(err) {
			callback(err, template, output, pageName, envName);
		});
	}
	function createComponent(componentPath, tagRoot, callback) {
		componentPath = openDir.splitDirs(componentPath);
		var pathFs = componentPath.join('/');
		if (componentPath.length < 2) {
			return callback(
				new Error(
					'Caminho inválido para criar componente: ' + JSON.stringify(pathFs)
				)
			);
		}
		var pathFile = componentPath[componentPath.length - 1];
		var scopeMap = envConfig.scopes;
		var scope;
		for (var k in scopeMap) {
			if (hop.call(scopeMap, k)) {
				scope = scopeMap[k];
				var prefix = scopeMap[k].PREFIX;
				if (prefix && prefix.toLowerCase() === componentPath[0].toLowerCase()) {
					break;
				} else {
					scope = void 0;
				}
			}
		}
		if (!scope) {
			return callback(
				new Error(
					'Escopo não encontrado para criar o componente ' +
						JSON.stringify(pathFs)
				)
			);
		}
		var compPathPrefix = scope.COMP_PATH_PREFIX;
		if (!compPathPrefix) {
			return callback(
				new Error(
					'Escopo não contém um caminho para criar o componente ' +
						JSON.stringify(pathFs)
				)
			);
		}
		compPathPrefix = openDir.splitDirs(compPathPrefix);
		loadComponentTemplates(function(result) {
			var ecount = result.errors.length;
			if (ecount) {
				var enames = [];
				for (var i = 0; i < ecount; i++) {
					var err = result.errors[i];
					console.error(err);
					enames.push(err.name);
				}
				return callback(
					new Error(
						'Erro ao carregar os templates de componente: ' + enames.join()
					)
				);
			}
			var ctx = extend.merge({}, scope, {
				COMP_PATH: JSON.stringify(String(componentPath.slice(1).join('/'))),
				COMP_TAG_ROOT: tagRoot || 'div',
				COMP_CSS_CLASS: componentPath.join('--')
			});
			var state = { html: false, js: false, css: false, errors: [] };
			var done = all(
				state,
				function(state) {
					if (state.errors.length) {
						callback(state.errors, state);
					} else {
						callback(null, state);
					}
				},
				function(ref, state) {
					state[ref.name] = ref;
					if (ref.error) state.errors.push(ref);
					return state.html && state.js && state.css ? state : null;
				}
			);
			var tpHtml = result.html.content;
			var tpJs = result.js.content;
			var tpCss = result.css.content;
			var outputRoot = path.join(__dirname, '..');
			var outputDir = compPathPrefix.concat(componentPath.slice(1));
			var outputPath = path.join(outputRoot, outputDir.join('/'), pathFile);
			// console.log(': outputRoot', outputRoot);
			// console.log(': outputDir', outputDir);
			// console.log(': outputFile', pathFile);
			// console.log(': outputPath', outputPath);
			openDir.array(outputRoot, outputDir, function(err) {
				if (err) return callback(err);
				renderComponentTemplate(
					outputPath + '.html',
					tpHtml,
					ctx,
					partials,
					done(function(state, args) {
						// console.log(': html', outputPath+'.html', tpHtml);
						return { name: 'html', error: args[0] };
					})
				);
				renderComponentTemplate(
					outputPath + '.js',
					tpJs,
					ctx,
					partials,
					done(function(state, args) {
						// console.log(': js', outputPath+'.js', tpJs);
						return { name: 'js', error: args[0] };
					})
				);
				renderComponentTemplate(
					outputPath + '.css',
					tpCss,
					ctx,
					partials,
					done(function(state, args) {
						// console.log(': css', outputPath+'.css', tpCss);
						return { name: 'css', error: args[0] };
					})
				);
			});
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
					renderPage(
						k,
						done(function(state, args) {
							ref.error = args[0];
							ref.template = args[1];
							ref.output = args[2];
							if (args[0]) state.errors.push(ref);
							return ref;
						})
					);
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
