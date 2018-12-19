var http = require('http');
var fs = require('fs');
var path = require('path');
// var bodyAnyFormat = require('body/any');
var apiLoginPost = require('./api-login-post');

var typeMap = {
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
};

var rePathRequest = /^\.(\/mobile\.html)?(\/.*)?$/i;
var reFileError = /^ENOENT$|^ENOTDIR$/;
var reExtHtml = /^$|^\.html$/i;

var mapCustomHandler = {
	'/api/login': {
		'POST': apiLoginPost
	}
};

function getCustomHandler(req, ctx) {
	var custom = mapCustomHandler[ctx.reqPath];
	custom = custom && (custom[req.method] || custom['*']);
	return custom;
}

function startLocalServer(env) {
	http.createServer(function(req, res) {
		var file = {
			path: '.' + req.url,
			ext: path.extname(req.url),
			type: undefined
		};
		var matchRequest = String(file.path).match(rePathRequest);
		if (!matchRequest) {
			res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
			res.end('Could not parse request url\n');
			return;
		}
		file.type = typeMap[file.ext.replace(/^\.+/, '')];
		if (!file.type) {
			file.type = typeMap.html;
			file.path = file.path.replace(/\/+$/, '') + '/index.html';
		}
		var isMobile = Boolean(matchRequest[1]);
		var reqPath = String(matchRequest[2] || '').replace(/\/+$/,'');
		var fpath = path.resolve(env.config.output_dir, file.path);
		var fRouteDesktop = path.resolve(env.config.output_dir, './index.html');
		var fRouteMobile = path.resolve(env.config.output_dir, './mobile.html');
		var ctx = {
			file: file,
			matchRequest: matchRequest,
			isMobile: isMobile,
			reqPath: reqPath,
			fpath: fpath,
			fRouteDesktop: fRouteDesktop,
			fRouteMobile: fRouteMobile
		};
		var custom = getCustomHandler(req, ctx);
		if (custom) {
			return custom(req, res, ctx, env);
		}
		fs.readFile(fpath, function(error, content) {
			if (error) {
				console.log(error.code + ': ' + file.path);
				if (reFileError.test(error.code)) {
					if (reExtHtml.test(file.ext)) {
						var catchAll = isMobile ? fRouteMobile : fRouteDesktop;
						fs.readFile(catchAll, function(error, content) {
							res.writeHead(200, { 'Content-Type': file.type });
							res.end(content, 'utf-8');
						});
					} else {
						res.writeHead(404);
						res.write(JSON.stringify(file, null, 2)+'\n');
						res.end(String(error));
					}
				} else {
					res.writeHead(500);
					res.end(String(error));
				}
			} else {
				res.writeHead(200, { 'Content-Type': file.type });
				res.end(content, 'utf-8');
			}
		});
	})
	.listen(env.port, function() {
		console.log('> Server running on port ' + env.port);
	});
}

module.exports = startLocalServer;
