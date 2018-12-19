var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var webfont = require('webfont').default;
var compressor = require('node-minify');
// var dirFiles = require('dir-files');
var minimist = require('minimist');
var loadPartials = require('./load-partials');
var pages = require('./pages');
var startLocalServer = require('./server/index');
var argv = minimist(process.argv.slice(2), { default: { server: true } });

var localport = argv.port || argv.p || 80;
// var dfp = dirFiles.plugins;
var envName = argv.env || argv.e || 'local';
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
	} else {
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

argv['server'] && startLocalServer(env);
