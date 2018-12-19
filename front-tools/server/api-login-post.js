var bodyAnyFormat = require('body/any');
var hop = Object.prototype.hasOwnProperty;

function isLoginAdmin(body) {
	return body &&
		body.username === 'admin' &&
		body.password === 'admin';
}
function isLoginUser(body) {
	return body &&
		body.username === 'user' &&
		body.password === 'user';
}

function apiLoginPost(req, res, ctx, env) {
	return bodyAnyFormat(req, function(err, body) {
		if (err) {
			res.writeHead(400);
			res.end(err);
			return;
		}
		var toBody = typeof body;
		if ('object' !== toBody || body == null) {
			res.writeHead(400);
			res.end('Invalid body data, got '+toBody+' '+req.headers['content-type']);
			return;
		}
		if (!(hop.call(body, 'username') && hop.call(body, 'password'))) {
			res.writeHead(400);
			res.write('Username and/or password is not defined\n');
			res.write(typeof body+'\n');
			res.end(JSON.stringify(body));
			return;
		}
		var sessionUrl =
			isLoginAdmin(body) ? 'admin' :
			isLoginUser(body) ? 'user' :
			'not_logged';
		var pageName = ctx.isMobile ? 'mobile' : 'index';
		var pvars = env.config.pages[pageName].template_vars || {};
		env.renderPage.pageString({
			name: pageName,
			customVars: {
				SCOPES_SET: (pvars.SCOPES_SET || []).concat([{
					NAME: env.config.scopes.App.JS_GLOBAL+'.sessionUrl',
					VALUE: { __json: sessionUrl }
				}])
			}
		}, function(err, html) {
			if (err) {
				res.writeHead(500);
				res.end(err);
				return;
			}
			res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
			res.end(html);
		});
	});
}

module.exports = apiLoginPost;
