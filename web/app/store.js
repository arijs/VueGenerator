(function() {
	var vars = this._var$;
	var VComp = this._vcomp$;
	var App = this._app$;
	var Utils = vars.Utils;

	Utils.getMonthNames = function() {
		return [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		];
	};
	Utils.getWeekDaysHeader = function() {
		return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
	};
	Utils.formatDateUser = function(date) {
		return [
			String('00'+date.getDate()).substr(-2),
			String('00'+(1 + date.getMonth())).substr(-2),
			String('0000'+date.getFullYear()).substr(-4)
		].join('/');
	};
	Utils.formatDateIso = function(date) {
		return [
			String('0000'+date.getFullYear()).substr(-4),
			String('00'+(1 + date.getMonth())).substr(-2),
			String('00'+date.getDate()).substr(-2)
		].join('-');
	};
	Utils.formatTime = function(time) {
		return [
			String('00'+time[0]).substr(-2),
			String('00'+time[1]).substr(-2)
		].join(':');
	};
	Utils.sameDay = function(d1, d2) {
		return d1.getDate() === d2.getDate() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getFullYear() === d2.getFullYear();
	};
	Utils.selecionaOpcaoValor = function(campo, valor) {
		campo.selecionado = Utils.forEach(campo.opcoes, null, function(o) {
			if (o.valor === valor) {
				this.result = o;
				return this._break;
			}
		});
	};
	Utils.campoPreencheData = function(campo, date) {
		date = new Date(date);
		campo.valor = date.getTime() && date.getFullYear() >= 1900
			// vamos assumir que não precisamos registrar datas antes de 1900
			? Utils.formatDateUser(date)
			: '';
	};
	Utils.campoDataFormataIso = function(campo) {
		var valor = String(campo.valor || '').match(/\b(\d+)\/(\d+)\/(\d+)\b/i);
		if (!valor) return;
		var data = new Date(+valor[3], +valor[2] - 1, +valor[1], 12);
		if (
			data.getDate() !== +valor[1] ||
			data.getMonth() !== (+valor[2] - 1) ||
			data.getFullYear() !== +valor[3]
		) return;
		return data.toISOString();
	};
	Utils.diffDates = function(d1, d2, labels) {
		var p = true;
		var t1 = d1.getTime();
		var t2 = d2.getTime();
		var sp = Utils.string.singularPlural;
		if (t2 < t1) {
			p = t1;
			t1 = t2;
			t2 = p;
			p = d1;
			d1 = d2;
			d2 = p;
			p = false;
		}
		var td = t2 - t1;
		var o1 = {
			ms: d1.getMilliseconds(),
			s: d1.getSeconds(),
			m: d1.getMinutes(),
			h: d1.getHours(),
			d: d1.getDate(),
			M: d1.getMonth(),
			Mdays: 0,
			y: d1.getFullYear()
		};
		o1.Mdays = new Date(o1.y, o1.M + 1 + 1, 0).getDate();
		var o2 = {
			ms: d2.getMilliseconds(),
			s: d2.getSeconds(),
			m: d2.getMinutes(),
			h: d2.getHours(),
			d: d2.getDate(),
			M: d2.getMonth(),
			Mdays: 0,
			y: d2.getFullYear()
		};
		o2.Mdays = new Date(o2.y, o2.M + 1 + 1, 0).getDate();
		var oafter = {
			t: td,
			o1: o1,
			o2: o2,
			after: p,
			ms: o2.ms - o1.ms,
			s: o2.s - o1.s,
			m: o2.m - o1.m,
			h: o2.h - o1.h,
			d: o2.d - o1.d,
			M: o2.M - o1.M,
			y: o2.y - o1.y
		};
		var oac = {
			after: p,
			raw: oafter,
			ms: oafter.ms,
			s: oafter.s,
			m: oafter.m,
			h: oafter.h,
			d: oafter.d,
			M: oafter.M,
			y: oafter.y
		};
		while (oac.ms < 0) {
			oac.ms += 1000;
			oac.s -= 1;
		}
		while (oac.s < 0) {
			oac.s += 60;
			oac.m -= 1;
		}
		while (oac.m < 0) {
			oac.m += 60;
			oac.h -= 1;
		}
		while (oac.h < 0) {
			oac.h += 24;
			oac.d -= 1;
		}
		while (oac.d < 0) {
			oac.d += 30; // Aproximação
			oac.M -= 1;
		}
		while (oac.M < 0) {
			oac.M += 12;
			oac.y -= 1;
		}
		var s = [];
		if (oac.y != 0) s.push(oac.y + sp(Math.abs(oac.y), labels.ano));
		if (oac.M != 0) s.push(oac.M + sp(Math.abs(oac.M), labels.mes));
		if (oac.d != 0 || s.length == 0) s.push(oac.d + sp(Math.abs(oac.d), labels.dia));
		oac.sd = s.join(' ');
		oac.st = [
			String('00'+oac.h).substr(-2),
			String('00'+oac.m).substr(-2),
			String('00'+oac.s).substr(-2),
		].join(':');
		return oac;
	};
	Utils.printDate = function(d) {
		var dt = new Date(d);
		return [
			String('00'+dt.getDate()).substr(-2),
			String('00'+(dt.getMonth()+1)).substr(-2),
			String('0000'+dt.getFullYear()).substr(-4)
		].join('/');
	};
	Utils.printElapsed = function(d) {
		var dt = new Date(d);
		var n = new Date();
		var a = Utils.diffDates(n, dt, {
			ano: [' ano', ' anos'],
			mes: [' mes', ' meses'],
			dia: [' dia', ' dias']
		});
		// console.log(a);
		return a.sd + ' ' + a.st;
	};
	Utils.datePart = function(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	App.storeSession = Utils.store.key('s2pir-session');

	var query = Utils.parseQuery(location.search);
	var state = {
		baseUrl: vars.BaseUrl || '',
		device: App.device,
		routerBaseUrl: App.routerBaseUrl || '/',
		mobile: /\bmobile\b/i.test(App.device || ''),
		query: query,
		sidebarNarrow: false,
		sidebarOffcanvas: false,
		Status: {
			GRAVADO: {},
			CRIADO: {},
			ALTERADO: {},
			REMOVIDO: {}
		},
		session: {
			loading: false,
			error: null,
			data: null
		}
	};
	var getters = {
		serverLocal: function() {
			// return false;
			return /^localhost$|^127\.0\.0\.1$/i.test(window.location.hostname);
		},
		// isAdmin: function(state) {
		// 	var sError = state.session.error;
		// 	var sData = state.session.data;
		// 	var sUser = sData && sData.user;
		// 	return !sError && sUser && sUser.isadmin;
		// },
		// isUser: function(state) {
		// 	var sError = state.session.error;
		// 	var sData = state.session.data;
		// 	var sUser = sData && sData.user;
		// 	return !sError && sUser && !sUser.isadmin;
		// },
		isLogged: function(state) {
			var sError = state.session.error;
			var sData = state.session.data;
			return !sError && sData && Boolean(sData.id && sData.token);
		},
		monthNames: function() {
			return [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro'
			];
		},
		weekDaysHeader: function() {
			return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
		}
	};
	var actions = {
		campoValor: function(context, payload) {
			var campo = payload.campo;
			var valor = payload.valor;
			var validar = payload.validar;
			// campo.valor = valor;
			context.commit('aplicarCampoValor', {
				campo: campo,
				valor: valor
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoSelecionado: function(context, payload) {
			var campo = payload.campo;
			var selecionado = payload.selecionado;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCampoSelecionado', {
				campo: campo,
				selecionado: selecionado
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoClickHora: function(context, payload) {
			var campo = payload.campo;
			var hora = payload.hora;
			var validar = payload.validar;
			context.commit('aplicarCampoHora', {
				campo: campo,
				hora: hora
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoClickMinuto: function(context, payload) {
			var campo = payload.campo;
			var minuto = payload.minuto;
			var validar = payload.validar;
			context.commit('aplicarCampoMinuto', {
				campo: campo,
				minuto: minuto
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			return Promise.resolve(payload);
		},
		campoCheck: function(context, payload) {
			var campo = payload.campo;
			var checked = payload.checked;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCampoChecked', {
				campo: campo,
				checked: checked
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarDay: function(context, payload) {
			var campo = payload.campo;
			var date = payload.date;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			date = +campo.dataInicial == +date ? null : date;
			context.commit('aplicarCalendarDate', {
				campo: campo,
				dataInicial: date,
				dataFinal: date
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarPeriod: function(context, payload) {
			var campo = payload.campo;
			var start = payload.start;
			var end = payload.end;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCalendarDate', {
				campo: campo,
				dataInicial: start,
				dataFinal: end
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		campoCalendarMonth: function(context, payload) {
			var campo = payload.campo;
			var date = payload.date;
			var validar = payload.validar;
			// campo.selecionado = selecionado;
			context.commit('aplicarCalendarMonth', {
				campo: campo,
				dataMes: date
			});
			if (validar !== false) {
				return context.dispatch('validarCampo', {
					campo: campo,
					ocultaErro: validar ? validar.ocultaErro : true,
					ocultaValido: validar ? validar.ocultaValido : false
				});
			}
			// this.campoValido[campo.nome] = valido;
			return Promise.resolve(payload);
		},
		testaCampo: function(context, campo) {
			var validacao = null;
			if (campo.valida) {
				Utils.forEach(campo.valida, function(fn) {
					validacao = fn(campo, context);
					if (validacao) return this._break;
				});
			}
			return Promise.resolve({
				campo: campo,
				validacao: validacao
			});
		},
		validarCampo: function(context, payload) {
			return new Promise(function(resolve, reject) {
				context.dispatch('testaCampo', payload.campo).then(function(item) {
					context.commit('aplicarCampoValidacao', {
						campo: item.campo,
						validacao: item.validacao,
						ocultaErro: payload.ocultaErro,
						ocultaValido: payload.ocultaValido
					});
					resolve(item);
				});
			});
		},
		testaFormGrupo: function(context, grupo) {
			var camposPromise = [];
			Utils.forEachProperty(g, function(campo) {
				camposPromise.push(context.dispatch('testaCampo', campo));
			});
			return Promise.all(camposPromise);
		},
		testaForm: function(context, form) {
			// var grupos = context.state.formGrupos;
			var camposPromise = [];
			// Utils.forEachProperty(grupos, function(g, gkey) {
			Utils.forEachProperty(form, function(campo) {
				camposPromise.push(context.dispatch('testaCampo', campo));
			});
			// });
			return Promise.all(camposPromise);
		},
		validarForm: function(context, form) {
			return context.dispatch('testaForm', form).then(function(lista) {
				var result = {
					erroMensagem: null,
					lista: lista,
					erros: 0,
					faltas: 0
				};
				Utils.forEach(lista, function(item) {
					context.commit('aplicarCampoValidacao', item);
					var v = item.validacao;
					if (!v) return;
					if (v.falta) result.faltas++;
					if (v.erro) result.erros++;
				});
				if (result.erros) {
					result.erroMensagem = 'Um ou mais campos possuem dados inválidos';
				} else if (result.faltas) {
					result.erroMensagem = 'Você precisa preencher todas as informações';
				}
				return result;
			});
		},
		limparValidacaoForm: function(context, form) {
			Utils.forEachProperty(form, function(campo) {
				context.commit('aplicarCampoValidacao', {
					campo: campo,
					validacao: null
				});
			});
			return Promise.resolve();
		},
		loadSession: function(context) {
			App.Services.session(function(loading, resp) {
				context.commit('serviceSession', {
					loading: loading,
					error: resp && resp.err,
					data: resp && resp.data
				});
			});
		},
		loadSessionStored: function(context) {
			return new Promise(function(resolve, reject) {
				var v = App.storeSession.get();
				if (v && v.id && v.token && v.nome && v.email) {
					context.commit('serviceSession', {
						loading: false,
						error: null,
						data: v
					});
					resolve(v);
				} else {
					reject(v || 'user session not found');
				}
			});
		},
		loadLogin: function(context, params) {
			return new Promise(function(resolve, reject) {
				App.Services.login(function(loading, resp) {
					if (loading) {
					} else if (resp && resp.data && !resp.err) {
						var data = resp.data.data;
						data = {
							apelido: data.apelido,
							email: data.email,
							id: data.id,
							message: data.message,
							nome: data.nome,
							perfil: data.perfil,
							token: data.token
						};
						context.commit('serviceSession', {
							loading: false,
							error: null,
							data: data
						});
						App.storeSession.set(data);
						resolve(resp);
					} else {
						reject(resp);
					}
				}, params);
			});
		},
		loadLogout: function(context) {
			return new Promise(function(resolve, reject) {
				context.commit('serviceSession', {
					loading: false,
					error: null,
					data: null
				});
				context.commit('setSidebarOffcanvas', false);
				App.storeSession.remove();
				setTimeout(function() {
					App.router.push('/');
					resolve();
				}, 100);
			});
		},
		loadRecuperarSenha: function(context, params) {
			return new Promise(function(resolve, reject) {
				App.Services.recuperarSenha(function(loading, resp) {
					if (loading) {
					} else if (resp && resp.data && !resp.err) {
						resolve(resp);
					} else {
						reject(resp);
					}
				}, params);
			});
		}
	};
	var mutations = {
		aplicarCampoValor: function(state, payload) {
			payload.campo.valor = payload.valor;
		},
		aplicarCampoSelecionado: function(state, payload) {
			payload.campo.selecionado = payload.selecionado;
		},
		aplicarCampoHora: function(state, payload) {
			payload.campo.hora = payload.hora;
		},
		aplicarCampoMinuto: function(state, payload) {
			payload.campo.minuto = payload.minuto;
		},
		aplicarCalendarDate: function(state, payload) {
			payload.campo.dataInicial = payload.dataInicial;
			payload.campo.dataFinal = payload.dataFinal;
		},
		aplicarCalendarMonth: function(state, payload) {
			payload.campo.dataMes = payload.dataMes;
		},
		aplicarCampoChecked: function(state, payload) {
			payload.campo.checked = payload.checked;
		},
		aplicarCampoValidacao: function(state, payload) {
			var campo = payload.campo;
			var v = payload.validacao;
			campo.falta = (v && v.falta) || false;
			campo.erro = (v && v.erro) || null;
			campo.erro = (!payload.ocultaErro && v && v.erro) || null;
			campo.falta = (!payload.ocultaErro && v && v.falta) || false;
			campo.valido = (!payload.ocultaValido && !v) || (!v.erro && !v.falta);
		},
		serviceSession: function(state, payload) {
			state.session = {
				loading: payload.loading,
				error: payload.error,
				data: payload.data
			};
		}
	};

	var store = new Vuex.Store({
		state: state,
		getters: getters,
		actions: actions,
		mutations: mutations
	});
	App.store = store;

	if ('/api/login' === query.$_POST) {
		if (query.username === 'admin' && query.password === 'admin') {
			App.sessionUrl = 'admin';
		} else if (query.username === 'user' && query.password === 'user') {
			App.sessionUrl = 'user';
		} else {
			App.sessionUrl = 'not_logged';
		}
	}
	// store.dispatch('loadSession');
	store.dispatch('loadSessionStored');

	var appLoader = Utils.getScopePrefixLoader(App);
	var vcompLoader = Utils.getScopePrefixLoader(VComp);

	var loadManager = Utils.fnLoadManager({
		prefixLoaders: [appLoader, vcompLoader]
	});
	var vueLazyLoad = Utils.vueLoadAsyncComponent({
		getLoader: loadManager.getLoader
	});
	var baseMixin = {
		getComponent: vueLazyLoad,
		components: {
			'masked-input': vueTextMask.default
		}
	};
	var BaseComponent = Vue.extend({
	});
	Vue.mixin(baseMixin);

	vueLazyLoad.setRegisterInto(Vue);

	vars.compLoader = {
		App: appLoader,
		VComp: vcompLoader,
		manager: loadManager,
		vueLazyLoad: vueLazyLoad
	};
	vars.BaseComponent = BaseComponent;

	Vue.component('vnode', {
		functional: true,
		render: function(h, context) {
			return context.props.vnode;
		}
	});
})();
