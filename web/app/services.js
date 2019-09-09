(function() {
	var App = this._app$;
	var vars = this._var$;
	var Utils = vars.Utils;

	var Env = App.Env;
	var Services = {};
	var defer = App.defer = {};
	var arraySlice = Array.prototype.slice;

	App.Services = Services;
	var deferRoot = defer.$root = Utils.deferred('$root');
	var $root;
	deferRoot.then(function(err, comp) {
		if (!err) $root = comp;
	});
	Services.$retry = function(opt, callback) {
		return opt.service.apply(this, [opt, callback].concat(opt.paramArgs));
	};

	function dataValidateEmpty(resp, opt, callback) {
		var err = resp.err || resp.ajaxErr;
		var data = resp.data;
		if (data && (data.error || data.errors || data.message || data.erro)) {
			err = data;
		} else if (err || !data) {
			err = err || {
				message: 'Resposta vazia do servidor'
			};
		}
		resp.err = err;
		return Utils.deferred().done(resp, opt, callback);
	}
	function validateMustHaveDataSuccess(resp, opt, callback) {
		var data = resp.data;
		if (!resp.err && !(data.success && data.data)) {
			resp.err = data;
		}
		return Utils.deferred().done(resp, opt, callback);
	}
	function validateAuthorization(resp, opt, callback) {
		var err = resp.ajaxErr;
		if (err && err.xhr && err.xhr.status === 401 && $root) {
			var defer = Utils.deferred();
			var retry = Utils.deferred({
				name: 'loginAndRetry',
				services: [{
					resolve: defer,
					resp: resp,
					opt: opt,
					callback: callback
				}]
			});
			$root.$emit('session-expired-service', retry);
			retry.then(function(err, result) {
				console.log('session restarted', err, result);
			});
			return defer;
		}
		return Utils.deferred().done(resp, opt, callback);
	}
	function fnTestAll(list) {
		return function testAllValidate(resp, opt, callback) {
			var defer = Utils.deferred('testAllValidate');
			var i = 0;
			next(resp, opt, callback);
			return defer;
			function next(resp, opt, callback) {
				var validate = list[i];
				if (!resp.err && validate) {
					i++;
					return validate(resp, opt, callback).then(next);
				} else {
					return defer.done(resp, opt, callback);
				}
			}
		};
	}
	function ajaxAddAuthorization(opt) {
		var ajax = opt.ajax;
		if (!ajax || opt.noAuthorization) return opt;
		var session = App.store.state.session.data;
		var token = session && session.token;
		if (!token) return opt;
		var head = ajax.headers;
		if (!head) ajax.headers = head = [];
		head.push({
			name: 'Authorization',
			value: 'Bearer '+token
		});
		return opt;
	}
	var dataValidateSuccess = fnTestAll([
		validateAuthorization,
		dataValidateEmpty,
		validateMustHaveDataSuccess
	]);
	function fnService(name, optService) {
		var envSvc = Env.Services;
		Services[name] = serviceRun;
		function serviceRun(opt, callback) {
			var params = 2;
			if (opt instanceof Function) {
				callback = opt;
				opt = null;
				params = 1;
			}
			params = arraySlice.call(arguments, params);
			opt = Utils.extend({
				name: name,
				service: serviceRun,
				paramArgs: params.slice(),
				dataValidate: dataValidateSuccess
			}, optService || {}, opt || {});
			params.unshift(opt);
			opt = envSvc[name].apply(envSvc, params);
			if (!opt) return;
			opt = ajaxAddAuthorization(opt);
			return Utils.loadService(opt, callback);
		}
	}
	function fnServiceEnum(name, options) {
		fnService(name, {
			enumOpcoes: {
				success: true,
				data: options
			},
			load: function(opt) {
				opt.callback({
					ajaxErr: null,
					err: null,
					data: opt.enumOpcoes,
					req: null
				});
			}
		});
	}

	fnService('session', {
		parse: Utils.loadService.parseJsonIgnoreType,
		dataValidate: dataValidateEmpty
	});
	fnService('login', {
		dataValidate: dataValidateEmpty
	});
	fnService('recuperarSenha');

	fnService('usuariosLista');
	fnService('usuariosGet');
	fnService('usuariosInsert');
	fnService('usuariosEdit');
	fnService('usuariosDelete');
	fnService('usuariosActivate');

	fnServiceEnum('usuariosPerfilLista', [
		{ valor: 'Administrador', texto: 'Administrador' },
		{ valor: 'Financeiro', texto: 'Financeiro' },
		{ valor: 'Especialista', texto: 'Especialista' },
		{ valor: 'ClienteAdministrador', texto: 'Cliente Administrador' },
		{ valor: 'ClienteAgendador', texto: 'Cliente Agendador' }
	]);

	fnService('temasLista');
	fnService('temasInsert');
	fnService('temasGet');
	fnService('temasEdit');
	fnService('temasDelete');
	fnService('temasActivate');

	fnService('subtemasInsert');
	fnService('subtemasEdit');
	fnService('subtemasDelete');

	fnService('solucoesLista');
	fnService('solucoesInsert');
	fnService('solucoesGet');
	fnService('solucoesEdit');
	fnService('solucoesDelete');
	fnService('solucoesActivate');

	fnService('subsolucoesInsert');
	fnService('subsolucoesEdit');
	fnService('subsolucoesDelete');

	fnServiceEnum('solucoesTipoSolucao', [
		{ valor: 'PIR', texto: 'PIR' },
		{ valor: 'Demissional', texto: 'Demissional' },
		{ valor: 'Mapeamento', texto: 'Mapeamento' }
	]);
	fnServiceEnum('solucoesTipoEspecialista', [
		{ valor: 'SemPagamento', texto: 'Sem Pagamento' },
		{ valor: 'Entrevista', texto: 'Entrevista' },
		{ valor: 'Devolutiva', texto: 'Devolutiva' }
	]);
	fnServiceEnum('questoesTipoQuestao', [
		{ valor: 'Dissertativa', texto: 'Dissertativa' },
		{ valor: 'EscolhaSimples', texto: 'Escolha Simples' },
		{ valor: 'Video', texto: 'Vídeo' }
	]);
	fnServiceEnum('questoesQuestaoPool', [
		{ valor: 'Estrategico', texto: 'Estratégico' },
		{ valor: 'Operacional', texto: 'Operacional' },
		{ valor: 'Tatico', texto: 'Tático' },
		{ valor: 'Demissional', texto: 'Demissional' }
	]);
	fnServiceEnum('questoesRespostaCategorizacao', [
		{ valor: 'Baixo', texto: 'Baixo' },
		{ valor: 'Medio', texto: 'Médio' },
		{ valor: 'Alto', texto: 'Alto' }
	]);

	fnService('questoesLista');
	fnService('questoesInsert');
	fnService('questoesGet');
	fnService('questoesEdit');
	fnService('questoesDelete');
	fnService('questoesActivate');

	fnService('respostasInsert');
	fnService('respostasEdit');
	fnService('respostasDelete');

	fnService('especialistasLista');
	fnService('especialistasInsert');
	fnService('especialistasGet');
	fnService('especialistasEdit');

	fnService('bancosLista', {
		parse: Utils.loadService.parseJsonIgnoreType,
		dataValidate: dataValidateEmpty
	});

	fnService('cep', {
		reqValidate: function(cep) {
			if (!cep) {
				return new Error('Cep não informado');
			} else if ('string' !== typeof cep) {
				return new Error('Cep deve ser string, recebido '+typeof cep);
			} else if (8 !== cep.length) {
				return new Error('Tamanho do cep inválido: '+cep.length+' caracteres');
			} else if (!/^\d{8}$/.test(cep)) {
				return new Error('Cep inválido, não contém somente números: '+cep);
			}
		},
		dataValidate: function(resp) {
			var err = dataValidateEmpty(resp);
			var eErro = err && err.erro;
			if (eErro) {
				err = new Error(eErro === true ? 'Cep não encontrado' : eErro);
			}
			return err;
		}
	});
})();
