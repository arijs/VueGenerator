var fs = require('fs');
var path = require('path');
var mustache = require('mustache');
var extend = require('./extend');
var all = require('./all');
var openDir = require('./open-dir');
var loadComponentTemplates = require('./load-component-templates');
var hop = Object.prototype.hasOwnProperty;

function normalizePageOpts(pageOpts, env) {
	var envName = env.name;
	var envConfig = env.config;
	var poType = typeof pageOpts;
	var pageName;
	if ('string' === poType) {
		pageName = pageOpts;
		pageOpts = {name: pageOpts};
	} else if ('object' !== poType) {
		throw new Error('Page options must be an object or string, got '+poType);
	} else {
		pageName = pageOpts.name;
	}
	if (!pageName) throw new Error('Page name not informed to render');
	pageOpts.envName = envName;
	var pageConfig = envConfig.pages[pageName];
	if (!pageConfig) throw new Error('Config not found for page ' + pageName);
	pageOpts.config = pageConfig;
	var templateName = pageConfig.template || pageName + '.mustache';
	var templatePath = path.join(__dirname, './template/pages', templateName);
	pageOpts.templateName = templateName;
	pageOpts.templatePath = templatePath;
	var envVars = pageOpts.envVars = envConfig.template_vars;
	var pageVars = pageOpts.pageVars = pageConfig.template_vars;
	var customVars = pageOpts.customVars;
	var allVars = envVars ? extend.merge({}, envVars) : {};
	pageVars && extend.merge(allVars, pageVars);
	customVars && extend.merge(allVars, customVars);
	pageOpts.allVars = allVars;
	return pageOpts;
}

function renderTemplateString(pageOpts, partials, cb) {
	fs.readFile(pageOpts.templatePath, 'utf8', function(err, source) {
		if (err) return cb(err, null, source);
		var vars = pageOpts.allVars;
		var html = mustache.render(source, vars, partials);
		return cb(null, html, source);
	});
}

function saveCompiledTemplate(outputRoot, output, html, cb) {
	var outputDir = openDir.splitDirs(output);
	var outputFile = outputDir.pop();
	openDir.array(outputRoot, outputDir, function(err) {
		if (err) return cb(err);
		output = path.join(outputRoot, output);
		fs.writeFile(output, html, 'utf8', cb);
	});
}

function renderComponentTemplate(path, template, ctx, partials, callback) {
	template = mustache.render(template, ctx, partials);
	fs.writeFile(path, template, 'utf8', callback);
}

function fnRenderEnv(env, partials) {
	return {
		pageString: renderPageString,
		page: renderPage,
		allPages: renderAllPages,
		createComponent: createComponent
	};
	function renderPageString(pageOpts, callback) {
		pageOpts = normalizePageOpts(pageOpts, env);
		renderTemplateString(pageOpts, partials, function(err, html, source) {
			return callback(err, html, pageOpts, source);
		});
	}
	function renderPage(pageOpts, callback) {
		pageOpts = normalizePageOpts(pageOpts, env);
		renderTemplateString(pageOpts, partials, function(err, html, source) {
			var outputDir = env.config.output_dir;
			var output = pageOpts.config.output || pageOpts.name + '.html';
			if (err) return callback(err, pageOpts, outputDir, output, html, source);
			saveCompiledTemplate(outputDir, output, html, function(err) {
				return callback(err, pageOpts, outputDir, output, html, source);
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
		var envConfigPages = env.config.pages;
		for (var pageName in envConfigPages) {
			if (hop.call(envConfigPages, pageName)) {
				(function() {
					var ref = {
						page: pageName,
						env: env.name,
						error: null,
						template: null,
						output: null
					};
					state.pages.push(ref);
					renderPage(
						pageName,
						done(function(state, args) {
							ref.error = args[0];
							ref.template = args[1].templateName;
							ref.output = args[3];
							if (args[0]) state.errors.push(ref);
							return ref;
						})
					);
				})();
			}
		}
		done()(); // para forçar a verificação caso não haja nenhuma página
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
		var scopeMap = env.config.scopes;
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
			var outputRoot = env.config.output_dir;
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
}

module.exports = {
	renderTemplateString: renderTemplateString,
	fnRenderEnv: fnRenderEnv,
	normalizePageOpts: normalizePageOpts,
	saveCompiledTemplate: saveCompiledTemplate,
	renderComponentTemplate: renderComponentTemplate
};
