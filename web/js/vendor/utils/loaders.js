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

function loadAjaxParseTypeJson(resp, opt) {
	var cType = resp.req.getResponseHeader("Content-Type");
	if (/\bapplication\/json\b/i.test(cType)) {
		try {
			resp.data = JSON.parse(resp.data);
		} catch (e) {
			resp.ajaxErr = new AjaxError('Invalid JSON', resp.req, e);
		}
	}
	return opt.cb(resp);
}

Utils.loadAjax = function loadAjax(opt) {
	var req = new XMLHttpRequest;
	var head = opt.headers;
	var parse = opt.parse || loadAjaxParseTypeJson;
	req.addEventListener('load', function() {
		var resp = {
			ajaxErr: null,
			err: null,
			data: req.responseText,
			req: req
		};
		if (req.status < 200 || req.status >= 300) {
			resp.ajaxErr = new AjaxError('HTTP '+req.status+' '+req.statusText, req);
		}
		parse(resp, opt);
		// resp = 
		// opt.cb(resp);
	});
	req.addEventListener('error', function(err) {
		var resp = {
			ajaxErr: new AjaxError('Erro de rede', req, err),
			err: null,
			data: req.responseText,
			req: req
		};
		parse(resp, opt);
		// resp = 
		// opt.cb(resp);
	});
	req.open(opt.method || 'GET', opt.url);
	if (head) {
		Utils.forEach(head, function(h) {
			req.setRequestHeader(h.name, h.value);
		});
	}
	req.send(opt.body);
};

function loadServiceParseDefault(callback, resp, opt) {
	// resp.err = 
	opt.dataValidate(resp, opt, callback).then(function(resp) {
		return callback(false, resp, opt);
	});
}
function loadServiceParseJsonIgnoreType(callback, resp, opt) {
	if (!resp.err && 'string' === typeof resp.data) {
		try {
			resp.data = JSON.parse(resp.data);
		} catch (e) {
			resp.err = new AjaxError('JSON inválido', resp.req, e);
		}
	}
	loadServiceParseDefault(callback, resp, opt);
}
function loadServiceLoadDefault(opt) {
	opt.ajax.cb = opt.callback;
	Utils.loadAjax(opt.ajax);
}
Utils.loadService = function(opt, callback) {
	// var callback = opt.callback;
	var reqValidate = opt.reqValidate;
	var reqError, cbCalled;
	if (reqValidate instanceof Function) {
		reqError = reqValidate.apply(opt, opt.paramArgs);
		if ( reqError ) {
			return callback(false, {err: reqError}, opt);
		}
	}
	var fnParse = opt.parse || loadServiceParseDefault;
	opt.callback = function(resp) {
		fnParse(callback, resp, opt);
		cbCalled = true;
	};
	if (callback === opt.callback) throw new Error('Callbacks are the same.1');
	var fnLoad = opt.load || loadServiceLoadDefault;
	fnLoad(opt);
	if (callback === opt.callback) throw new Error('Callbacks are the same.2');
	return cbCalled ? void 0 : callback(true, null, opt);
};
Utils.loadService.parseDefault = loadServiceParseDefault;
Utils.loadService.parseJsonIgnoreType = loadServiceParseJsonIgnoreType;
Utils.loadService.loadDefault = loadServiceLoadDefault;

Utils.componentDynamic = function componentDynamic(opt) {
	//console.log('Component Dynamic: '+id);
	var pathHtml = opt.pathHtml;
	var pathJs   = opt.pathJs  ;
	var pathCss  = opt.pathCss ;
	var setResult = opt.setResult;
	return function(resolve, reject) {
		var html, js, css;
		var done = function done() {
			if ((html || !pathHtml) && (js || !pathJs)) {
				if (setResult instanceof Function) {
					setResult(function(err) {
						if (err) {
							return reject({
								message: 'Error getting component '+opt.path+' result',
								error: err
							});
						} else {
							resolve();
						}
					});
				} else {
					resolve();
				}
			}
		};
		pathJs && Utils.loadScript(pathJs, function(err) {
			if (err) {
				return reject({
					message: 'Error loading component '+opt.path+' script',
					error: err
				});
			}
			opt.setJs(null, function(err) {
				if (err) return reject(err);
				js = true;
				done();
			});
		});
		pathHtml && Utils.loadAjax({ url: pathHtml, cb: function(resp) {
			var err = resp.err;
			if (err) {
				return reject({
					message: 'Error loading component '+opt.path+' template',
					error: err
				});
			}
			opt.setHtml(resp.data, function(err) {
				if (err) return reject(err);
				html = true;
				done();
			});
		}});
		pathCss && Utils.loadStylesheet(pathCss, function(err) {
			opt.css = css = { error: err };
			if (opt.onCss instanceof Function) {
				opt.onCss(css, opt);
			}
			if (err && opt.logCssNotFound) {
				console.log('Error loading stylesheet for component '+opt.path);
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
		var match = Utils.compPrefixPath(opt.prefix, id.replace(/\/+/g,'--'));
		var getUrl = opt.getUrl;
		var setResult = opt.setResult;
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
			match.setOnCss = function(callback) {
				var css = match.css;
				if (css) {
					onCss(css);
				} else {
					match.onCss = onCss;
				}
				function onCss(css) {
					callback(css.error);
				};
			}
			match.load = function(callback, params) {
				match.params = params;
				return prefixLoader(match, callback);
			};
			if (setResult instanceof Function) {
				match.setResult = function(callback) {
					setResult(match, callback);
				};
			}
		}
		return match;
	}
	function prefixLoader(match, callback) {
		var path = match.path;
		var loadedMap = opt.loadedMap;
		var comp = loadedMap && loadedMap[path];
		if (comp) return callback(null, comp, match);
		var matchListeners = listenersMap[path];
		if (matchListeners) {
			matchListeners.push(callback);
			return;
		}
		listenersMap[path] = matchListeners = [callback];
		var fnLoad = opt.loader(match);
		fnLoad(function resolve() {
			comp = match.result;
			loadedMap && (loadedMap[path] = comp);
			// return callback(null, comp);
			for (var i = 0, ii = matchListeners.length; i < ii; i++) {
				matchListeners[i](null, comp, match);
			}
			listenersMap[path] = void 0;
		}, function reject(err) {
			for (var i = 0, ii = matchListeners.length; i < ii; i++) {
				matchListeners[i](err, comp, match);
			}
			listenersMap[path] = void 0;
		});
	}
};

Utils.getScopePrefixLoader = function(scope) {
	var meta = scope.meta;
	return Utils.fnPrefixLoader({
		prefix: meta.PREFIX+'--',
		loader: Utils.componentDynamic,
		getUrl: meta.COMP_URL ? getAbsoluteUrl : getRelativeUrl,
		setResult: function(match, callback) {
			scope.compMap[match.path](function(err, comp) {
				match.result = comp;
				callback(err);
			}, match.html, match);
		}
	});
	function getAbsoluteUrl(match) {
		return meta.COMP_URL + match.href;
	}
	function getRelativeUrl(match) {
		return scope.BaseUrl + meta.COMP_PATH_PREFIX + match.href;
	}
};

Utils.fnLoadManager = function(opt) {
	var prefixLoaders, plcount;
	loadManager.loadMany = loadMany;
	loadManager.setLoaders = setLoaders;
	loadManager.getLoader = getLoader;
	setLoaders(opt.prefixLoaders);
	return loadManager;
	function loadManager(id, callback, params) {
		var loader = getLoader(id);
		if (loader) {
			loader.load(callback, params);
		} else {
			callback(new Error('No loader found for ID '+id));
		}
	}
	function getLoader(id) {
		for (var i = 0; i < plcount; i++) {
			var match = prefixLoaders[i](id);
			if (match) return match;
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

Utils.vueLoadAsyncComponent = function(opt) {
	var compFactory = opt.compFactory || {};
	var loadingCallbackMap = {};
	var getLoader = opt.getLoader;
	var registerInto = opt.registerInto;
	dynamicComponent.setRegisterInto = setRegisterInto;
	return dynamicComponent;
	function dynamicComponent(id) {
		id = String(id);
		var factory = compFactory[id];
		if (factory) return factory;
		var loader = getLoader(id);
		if (loader) {
			var caller = this;
			compFactory[id] = factory = function(resolve, reject) {
				var loadingCallback = loadingCallbackMap[id];
				var alreadyCalled = Boolean(loadingCallback);
				if (!loadingCallback) {
					loadingCallbackMap[id] = loadingCallback = {
						resolve: [],
						reject: []
					};
				}
				loadingCallback.resolve.push(resolve);
				loadingCallback.reject.push(reject);
				if (!alreadyCalled) {
					loader.load(function(err, comp) {
						if (err) {
							Utils.callListeners(loadingCallback.reject, [err]);
						} else {
							if (registerInto) {
								registerInto.component(id, comp);
								// comp._base = registerInto;
								// compFactory[id] = void 0;
							}
							Utils.callListeners(loadingCallback.resolve, [comp]);
						}
						loadingCallbackMap[id] = loadingCallback = void 0;
					}, { caller: caller });
				}
			};
			return factory;
		}
	}
	function setRegisterInto(ri) {
		registerInto = ri;
	}
};

})(window._var$);
