(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

function AjaxError(message, xhr, error) {
	this.name = 'AjaxError';
	this.message = message;
	this.xhr = xhr;
	this.error = error;
	this.stack = (new Error()).stack;
}
AjaxError.prototype = new Error;

Utils.AjaxError = AjaxError;

Utils.loadScript = function loadScript(url, cb) {
	var script = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	var done = false;
	script.addEventListener('load', function() {
		if (done) {
			console.log('load script too late: ' + url);
			return;
		}
		done = true;
		cb();
	});
	script.addEventListener('error', function(err) {
		if (done) {
			console.log('error script too late: ' + url);
			return;
		}
		done = true;
		cb(err);
	})
	setTimeout(function() {
		if (done) return;
		cb(new Error('load script timeout: '+url));
	}, 30000);
	script.src = url;
	head.appendChild(script);
};

Utils.loadStylesheet = function loadStylesheet(url, cb) {
	var link = document.createElement('link');
	var head = document.getElementsByTagName('head')[0];
	var done = false;
	link.setAttribute('rel', 'stylesheet');
	link.addEventListener('load', function() {
		if (done) {
			console.log('load stylesheet too late: ' + url);
			return;
		}
		done = true;
		cb();
	});
	link.addEventListener('error', function(err) {
		if (done) {
			console.log('error stylesheet too late: ' + url);
			return;
		}
		done = true;
		cb(err);
	})
	setTimeout(function() {
		if (done) return;
		cb(new Error('load stylesheet timeout: '+url));
	}, 30000);
	link.href = url;
	head.appendChild(link);
};

Utils.loadAjax = function loadAjax(opt) {
	var req = new XMLHttpRequest;
	var head = opt.headers;
	req.addEventListener('load', function() {
		var err = null;
		if (req.status < 200 || req.status >= 300) {
			err = new AjaxError('HTTP '+req.status+' '+req.statusText, req);
		}
		var data = req.responseText;
		var cType = req.getResponseHeader("Content-Type");
		if (/\bapplication\/json\b/i.test(cType)) {
			try {
				data = JSON.parse(data);
			} catch (e) {
				err = new AjaxError('Invalid JSON', req, e);
			}
		}
		opt.cb(err, data, req);
	});
	req.addEventListener('error', function(err) {
		opt.cb(new AjaxError('Erro de rede', req, err), null, req);
	});
	req.open(opt.method || 'GET', opt.url);
	if (head) {
		Utils.forEach(head, function(h) {
			req.setRequestHeader(h.name, h.value);
		});
	}
	req.send(opt.body);
};

Utils.loadService = function(opt) {
	var req = opt.req;
	var callback = opt.callback;
	var reqError = opt.reqValidate(req);
	if ( reqError ) {
		return callback(false, reqError);
	}
	Utils.loadAjax(opt.envPrepare(req, function(err, data, req) {
		var serviceError = null;
		var dataError = null;
		var isJson = false;
		if (err) {
			serviceError = {
				message: 'Erro ao carregar o serviço',
				error: err
			};
		}
		if (!serviceError) {
			dataError = opt.dataValidate(data, req);
		}
		return callback(false, dataError || serviceError, data);
	}));
	return callback(true);
};

Utils.componentDynamic = function componentDynamic(opt) {
	//console.log('Component Dynamic: '+id);
	var pathHtml = opt.pathHtml;
	var pathJs   = opt.pathJs  ;
	var pathCss  = opt.pathCss ;
	var getResult = opt.getResult;
	return function(resolve, reject) {
		var html, js;
		var done = function done() {
			if ((html || !pathHtml) && (js || !pathJs)) {
				resolve(getResult instanceof Function && getResult());
			}
		};
		pathJs && Utils.loadScript(pathJs, function(err) {
			if (err) {
				return reject({
					message: 'Error loading component '+path+' script',
					error: err
				});
			}
			opt.setJs(null, function(err) {
				if (err) return reject(err);
				js = true;
				done();
			});
		});
		pathHtml && Utils.loadAjax({ url: pathHtml, cb: function(err, response) {
			if (err) {
				return reject({
					message: 'Error loading component '+opt.name+' template',
					error: err
				});
			}
			opt.setHtml(response, function(err) {
				if (err) return reject(err);
				html = true;
				done();
			});
		}});
		pathCss && Utils.loadStylesheet(pathCss, function(err) {
			if (err && opt.logCssNotFound) {
				console.log('Error loading stylesheet for component '+opt.name);
			}
		});
	};
};

Utils.compPrefixPath = function(prefix, id) {
	//console.log('Component Dynamic: '+id);
	var plen = prefix.length;
	if (id.substr(0, plen).toLowerCase() === prefix) {
		var path = id.substr(plen).replace(/--/g,'/');
		var last = path.lastIndexOf('/');
		var name = path.substr(last+1);
		var href = path+'/'+name;
		return {
			id: id,
			path: path,
			name: name,
			href: href
		};
	}
};

Utils.fnPrefixLoader = function(opt) {
	var listenersMap = {};
	return match;
	function match(id) {
		var match = Utils.compPrefixPath(opt.prefix, id);
		var getUrl = opt.getUrl;
		var pathHtml = opt.pathHtml;
		var pathJs = opt.pathJs;
		var pathCss = opt.pathCss;
		var setHtml = opt.setHtml;
		var setJs = opt.setJs;
		if (match) {
			match.url      = getUrl   ? getUrl  (match) : match.href;
			match.pathHtml = pathHtml ? pathHtml(match) : match.url+'.html';
			match.pathJs   = pathJs   ? pathJs  (match) : match.url+'.js'  ;
			match.pathCss  = pathCss  ? pathCss (match) : match.url+'.css' ;
			match.setHtml = function(html, callback) {
				match.html = html;
				setHtml ? setHtml(match, callback) : callback();
			};
			match.setJs = function(js, callback) {
				match.js = js;
				setJs ? setJs(match, callback) : callback();
			};
			match.load = function(callback) {
				return prefixLoader(match, callback);
			};
		}
		return match;
	}
	function prefixLoader(match, callback) {
		var path = match.path;
		var loadedMap = opt.loadedMap || (opt.loadedMap = loadedMap = {});
		var comp = loadedMap[path];
		if (comp) return callback(null, comp);
		var matchListeners = listenersMap[path];
		if (matchListeners) {
			matchListeners.push(callback);
			return;
		}
		listenersMap[path] = matchListeners = [callback];
		var fnLoad = opt.loader(match);
		fnLoad(function resolve() {
			var comp = match.js;
			comp.template = match.html;
			loadedMap[path] = comp;
			// return callback(null, comp);
			for (var i = 0, ii = matchListeners.length; i < ii; i++) {
				matchListeners[i](null, comp);
			}
			listenersMap[path] = void 0;
		}, function reject(err) {
			for (var i = 0, ii = matchListeners.length; i < ii; i++) {
				matchListeners[i](err);
			}
			listenersMap[path] = void 0;
		});
	}
};

Utils.fnLoadManager = function(opt) {
	var prefixLoaders, plcount;
	loadManager.loadMany = loadMany;
	loadManager.setLoaders = setLoaders;
	loadManager.getLoader = getLoader;
	setLoaders(opt.prefixLoaders);
	return loadManager;
	function loadManager(id, callback) {
		var loader = getLoader(id);
		if (loader) {
			loader.load(callback);
		} else {
			callback(new Error('No loader found for ID '+id));
		}
	}
	function getLoader(id) {
		for (var i = 0; i < plcount; i++) {
			var match = prefixLoaders[i](id);
			if (match) return match;
			// {
			// 	match.load(callback);
			// 	return;
			// }
		}
	}
	function loadMany(idMap, callback) {
		var objList = [];
		var compMap = {};
		var state = {
			list: objList,
			compMap: compMap,
			errors: [],
			remain: 0
		};
		var addItem = Utils.all(state, function manyFinish(state) {
			if (state.errors.length) {
				callback(state.errors, compMap, state);
			} else {
				callback(null, compMap, state);
			}
		}, function manyReduce(index, state, args) {
			var item = objList[index];
			var err = args[0];
			var comp = args[1];
			item.err = err;
			item.comp = comp;
			compMap[item.key] = comp;
			err && state.errors.push(item);
			state.remain -= 1;
			return !state.remain;
		});
		Utils.forEachProperty(idMap, function(id, key) {
			var index = objList.length;
			var done = addItem(index);
			objList[index] = {
				id: id,
				key: key,
				index: index,
				err: null,
				comp: null
			};
			state.remain += 1;
			loadManager(id, done);
		});
	}
	function setLoaders(loaders) {
		prefixLoaders = loaders;
		plcount = loaders && loaders.length || 0;
	}
};

Utils.vueDynamicComponent = function(opt) {
	var compFactory = opt.compFactory || {};
	var getLoader = opt.getLoader;
	return function dynamicComponent(id) {
		var factory = compFactory[id];
		if (factory) return factory;
		var loader = getLoader(id);
		if (loader) {
			return compFactory[id] = factory = function(resolve, reject) {
				loader.load(function(err, comp) {
					if (err) reject(err);
					else resolve(comp);
				});
			};
		}
	};
};

})(window._var$);
