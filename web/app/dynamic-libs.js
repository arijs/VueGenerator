(function() {
	var App = this._app$;
	var vars = this._var$;
	var Utils = vars.Utils;

	var Libs = {};
	var libMap = {};
	var libList = [];

	function loadFinish(state) {}
	function loadReduce(ref, state, args) {}
	function loadAdd(state, lib) {
		return function(state, args) {

		}
	}
	function defaultLoad(callback, lib, logErrors) {
		if (!logErrors) logErrors = [];
		if (lib.isLoaded()) return callback();
		if (!(lib.src.length > logErrors.length)) {
			// necessário ativar condição no false
			// e não no true por causa do NaN
			return callback(new Error(
				'Erro ao carregar a biblioteca '+lib.name+
				Utils.forEach(logErrors, '', function(e) {
					this.result += '\n' + String(e);
				})
			));
		}
		var src = lib.src[logErrors.length];
		var url = src.path ? vars.BaseUrl + src.path : src.url || src;
		Utils.loadScript(url, function(err) {
			logErrors.push(err);
			defaultLoad(callback, lib, logErrors);
		});
	}
	function loadDepsRecursive(lib) {}

	Libs.addLib = function addLib(opts) {
		var name = opts.name;
		if (libMap[name]) throw new Error('A biblioteca '+name+' já está registrada');
		opts.loading = false;
		opts.listeners = [];
		libMap[name] = opts;
		libList.push(name);
	};

	Libs.load = function load(name, callback) {
		var lib = libMap[name];
		if (!lib) {
			callback(new Error('Biblioteca '+name+' não cadastrada'));
		} else {
			Libs.loadLib(lib, callback);
		}
	};

	Libs.loadLib = function load(lib, callback) {
		lib.listeners.push(callback);
		if (lib.loading) return;
		lib.loading = true;
		var state = {
			lib: lib,
			pending: [],
			errors: [],
			success: [],
			remain: 0
		};
		var fnAdd = function fnAdd(state, obj) {
			var lib = obj.lib;
			var parents = obj.parents;
			Utils.forEach(lib.deps, function(depName) {
				var depLib = libMap[depName];
				var done = fnItem({
					parents: parents.concat([lib.name]),
					lib: depLib
				});
				if (depLib) {
					// var load = depLib.load || defaultLoad;
					// load(done, depLib);
					state.pending.push(depLib);
					state.remain += 1;
					Libs.load(depName, done);
				} else {
					done(new Error(
						'Dependência não encontrada: '+
						parents.concat([depName]).join(' -> ')
					));
				}
			});
			return function(state, args) {
				var err = args[0];
				if (err) {
					obj.error = err;
					state.errors.push(obj);
				} else {
					state.success.push(obj);
				}
				state.remain -= 1;
			};
		};
		var fnFinish = function fnFinish(state) {

		};
		var fnItem = Utils.all(state, fnFinish, loadReduce, fnAdd);
		var done = fnItem({
			parents: [],
			lib: lib
		});
	};

	App.Libs = Libs;

})();
