var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	spawn = require('child_process').spawn,
	webfont = require('webfont').default,
	mustache = require('mustache'),
	compressor = require('node-minify'),
	dirFiles = require('dir-files'),
	minimist = require('minimist'),
	loadPartials = require('./load-partials'),
	pages = require('./pages'),
	argv = minimist(process.argv.slice(2), { default: { server: true } }),
	env = argv.env || argv.e || 'local',
	envConfig = require('./config/' + env),
	localport = argv.port || argv.p || 80,
	dfp = dirFiles.plugins,
	typeMap = {
		html: 'text/html',
		js: 'text/javascript',
		mjs: 'text/javascript',
		css: 'text/css',
		ico: 'image/x-icon',
		png: 'image/png',
		gif: 'image/gif',
		jpg: 'image/jpeg',
		svg: 'image/svg+xml',
		json: 'application/json',
		ttf: 'application/x-font-ttf',
		woff: 'application/font-woff',
		woff2: 'application/font-woff2',
		eot: 'application/vnd.ms-fontobject',
		otf: 'application/x-font-opentype'
	},
	renderPage;

console.log('> using env ' + env);

loadPartials(function(err, partials) {
	if (err) throw err;

	renderPage = pages.fnRenderEnv(env, envConfig, partials);
	var aPage = argv.page; // "p" é usado para a porta do servidor local
	if (aPage) {
		renderPage.page(aPage, function(err, template, output, pageName, envName) {
			console.log('> page ' + pageName + ' rendered at file ' + output);
		});
	} else {
		renderPage.allPages(function(state) {
			var done = state.done;
			for (var i = 0, ii = done.length; i < ii; i++) {
				var p = done[i];
				console.log('> page ' + p.page + ' rendered at file ' + p.output);
				if (p.error) console.error(p.error);
			}
		});
	}

	var cPath = argv.component || argv.c;
	if (cPath) {
		renderPage.createComponent(cPath, argv.tag || argv.t, function(
			err,
			result
		) {
			if (err) {
				console.error('Error creating component ' + cPath);
				throw err;
			}
			console.log('> created component ' + cPath);
		});
	}
});

function getEnvs(cb) {}

function startLocalServer() {
	http
		.createServer(function(req, res) {
			var file = {
				path: '.' + req.url,
				ext: path.extname(req.url),
				type: undefined
			};
			file.type = typeMap[file.ext.replace(/^\./, '')];
			if (!file.type) {
				file.type = typeMap.html;
				file.path = file.path.replace(/\/$/, '') + '/index.html';
			}
			fs.readFile(file.path, function(error, content) {
				if (error) {
					console.log(error.code + ': ' + error.path);
					if (error.code == 'ENOENT') {
						fs.readFile('./404.html', function(error, content) {
							res.writeHead(200, { 'Content-Type': file.type });
							res.end(content, 'utf-8');
						});
					} else {
						res.writeHead(500);
						res.end();
					}
				} else {
					res.writeHead(200, { 'Content-Type': file.type });
					res.end(content, 'utf-8');
				}
			});
		})
		.listen(localport, function() {
			console.log('> Server running on port ' + localport);
		});
}

var downloadFile = function(file_url, save_dir, cb) {
	var file_name = path.basename(file_url);
	var file_path = save_dir + file_name;
	if (!fs.existsSync(file_path)) {
		var file = fs.createWriteStream(file_path);
		var curl = spawn('curl', ['-L', file_url]);
		curl.stdout.on('data', function(data) {
			file.write(data);
		});
		curl.stdout.on('end', function(data) {
			file.end();
			console.log(file_name + ' downloaded to ' + save_dir);
			if (cb) cb();
		});
		curl.on('exit', function(code) {
			if (code != 0) {
				console.error('Failed: ' + code);
			}
		});
	} else if (cb) cb();
};

// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js');
function renderMustache() {
	if (mustache) {
		var json = fs.readFileSync('./env/index/prod.json', 'utf8'),
			header = fs.readFileSync('./template/pages/_header.mustache', 'utf8'),
			footer = fs.readFileSync('./template/pages/_footer.mustache', 'utf8'),
			html = fs.readFileSync('./template/pages/index.mustache', 'utf8');
		html = mustache.to_html(header + html + footer, JSON.parse(json));
		fs.writeFile('./pages/index.html', html, function(err) {
			if (err) return console.log(err);
		});
	}
}
function renderWebfont() {
	if (webfont && !webfont) {
		webfont({
			files: './**/*.ttf',
			fontName: 'webfonts'
		}).then(function(result) {
			console.log(result);
		});
	}
}
function compressVendorJs() {
	if (compressor) {
		compressor.minify({
			compressor: 'uglify-es',
			input: './vendor/js/*.js',
			output: './vendor/bundle/vendor.min.js',
			callback: function(err, min) {
				console.log('MINIFIED JS');
			}
		});
	}
}
function compressVendorCss() {
	if (compressor) {
		compressor.minify({
			compressor: 'crass',
			input: './vendor/css/*.css',
			output: './vendor/bundle/vendor.min.css',
			callback: function(err, min) {
				console.log('MINIFIED CSS');
			}
		});
	}
}

argv['server'] && startLocalServer();
