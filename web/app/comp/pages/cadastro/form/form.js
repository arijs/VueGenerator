(function() {
	'use strict';
	var vars = window._var$;
	var App = window._app$;
	var Utils = vars.Utils;
	var reDocOrImage = /^application\/pdf$|^image\/(?:jpe?g|png)$/i;
	App.compMap["pages/cadastro/form"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		data: function() {
			return {
				checkboxAceito: false,
				enviandoCadastro: false,
				erroMensagem: null,
				uploadFile: null,
				campoCNPJ: {
					nome: 'usuario',
					rotulo: 'CNPJ: *',
					valor: '',
					mask: Utils.mask.cnpj,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio,
						Utils.valida.cnpj
					]
				},
				campoDataDia: {
					nome: 'campoDataDia',
					tipo: 'date',
					rotulo: 'Data',
					placeholder: 'dd/mm/aaaa',
					dataMes: new Date(),
					dataInicial: null,
					dataFinal: null,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						// Utils.valida.selecionado
					]
				},
				campoDataPeriodo: {
					nome: 'campoDataPeriodo',
					tipo: 'date',
					rotulo: 'Período',
					placeholder: 'dd/mm/aaaa',
					dataMes: new Date(),
					dataInicial: null,
					dataFinal: null,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						// Utils.valida.selecionado
					]
				},
				campoEmpresa: {
					nome: 'empresa',
					rotulo: 'Nome da empresa: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				// campoNomeFantasia: {
				// 	nome: 'nomefantasia',
				// 	rotulo: 'Nome Fantasia: *',
				// 	valor: '',
				// 	erro: null,
				// 	falta: false,
				// 	valido: false,
				// 	valida: [
				// 		Utils.valida.naoVazio
				// 	]
				// },
				campoSUC: {
					nome: 'suc',
					rotulo: 'SUC: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				campoAndar: {
					nome: 'andar',
					rotulo: 'Andar: *',
					selecionado: null,
					opcoes: [
						{ valor: 0, texto: 'Térreo' },
						{ valor: 1, texto: '1º' },
						{ valor: 2, texto: '2º' },
						{ valor: 3, texto: '3º' },
						{ valor: 4, texto: '4º' },
						{ valor: 5, texto: '5º' }
					],
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.selecionado
					]
				},
				campoCategoria: {
					nome: 'categoria',
					rotulo: 'Categoria: *',
					selecionado: null,
					opcoes: [
						{ valor: 'tecnologia', texto: 'Tecnologia' },
						{ valor: 'outros', texto: 'Outros' }
					],
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.selecionado
					]
				},
				campoResponsavel: {
					nome: 'responsavel',
					rotulo: 'Nome do Responsável: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				campoTelefone: {
					nome: 'telefone',
					rotulo: 'Telefone do Responsável: *',
					valor: '',
					mask: Utils.mask.fone,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio,
						Utils.valida.fone
					]
				},
				campoEmail: {
					nome: 'email',
					rotulo: 'Email do Responsável: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio,
						Utils.valida.email
					]
				},
				campoEnviarEmail: {
					nome: 'enviarEmail',
					rotulo: 'Enviar Email: *',
					selecionado: null,
					opcoes: [
						{ valor: true, texto: 'Sim' },
						{ valor: false, texto: 'Não' }
					],
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.selecionado
					]
				},
				// Campos disable
				campoDtRecebimento: {
					nome: 'DtRecebimento',
					rotulo: 'Data de recebimento: ',
					valor: 'Semanalmente',
					erro: null,
					falta: false,
					valido: false,
					disabled: true,
					valida: [
						Utils.valida.naoVazio,
					]
				},
				campoAntecipacao: {
					nome: 'antecipacao',
					rotulo: 'Antecipação: ',
					valor: 'Não',
					erro: null,
					falta: false,
					valido: false,
					disabled: true,
					valida: [
						Utils.valida.naoVazio,
					]
				},
				campoTaxa: {
					nome: 'taxa',
					rotulo: 'Taxa Aplicativo: ',
					valor: '3%',
					erro: null,
					falta: false,
					valido: false,
					disabled: true,
					valida: [
						Utils.valida.naoVazio,
					]
				},
				// Fim dos campos disable
				campoContaBanco: {
					nome: 'contaBanco',
					rotulo: 'Banco: *',
					selecionado: null,
					opcoes: [
						{ valor: '001', texto: '001 - Banco do Brasil' },
						{ valor: '237', texto: '237 - Bradesco' },
						{ valor: '104', texto: '104 - Caixa Econômica Federal' },
						{ valor: '341', texto: '341 - Itaú Unibanco' },
						{ valor: '033', texto: '033 - Santander' }
					],
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.selecionado
					]
				},
				campoContaAgencia: {
					nome: 'contaAgencia',
					rotulo: 'Agência: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				campoContaNumero: {
					nome: 'contaNumero',
					rotulo: 'Conta Corrente: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				campoDV: {
					nome: 'DV',
					rotulo: 'DV: *',
					valor: '',
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.naoVazio
					]
				},
				campoAceito: {
					nome: 'aceitoTermos',
					rotulo: '',
					checked: false,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.checked
					]
				},
				campoUpload: {
					nome: 'file',
					rotulo: 'Comprovante Bancário: *',
					file: null,
					erro: null,
					falta: false,
					valido: false,
					valida: [
						Utils.valida.hasFile,
						Utils.valida.isFile,
						Utils.valida.fnFileTypeRegex(
							/^application\/pdf$|^image\/(?:jpe?g|png)$/i,
							'Formato inválido, por favor envie um JPG, PNG ou PDF'
						),
						Utils.valida.fnFileSizeUnder(
							1024 * 1024,
							'Arquivo muito grande, por favor envie um arquivo menor que 1 MB'
						)
					]
				}
			};
		},
		computed: {
			baseUrl: function() {
				return this.$store.state.baseUrl;
			},
			isUser: function() {
				return this.$store.getters.isUser;
			},
			monthNames: function() {
				return this.$store.getters.monthNames;
			},
			weekDaysHeader: function() {
				return this.$store.getters.weekDaysHeader;
			}
		},
		methods: {
			enviarDados: function() {
				var vm = this;
				this.enviandoCadastro = true;
				App.Services.cadastroUsuario({
					"cnpj" : this.campoCNPJ.valor,
					"companyName" : this.campoEmpresa.valor,
					// "nomefantasia" : this.campoNomeFantasia.valor,
					"suc" : this.campoSUC.valor,
					"andar" : (this.campoAndar.selecionado || {}).valor,
					"categoria" : (this.campoCategoria.selecionado || {}).valor,
					"nomeresponsavel" : this.campoResponsavel.valor,
					"emailresponsavel" : this.campoEmail.valor,
					"telefoneresponsavel" : this.campoTelefone.valor,
					"enviaremail" : (this.campoEnviarEmail.selecionado || {}).valor,
					"banco" : (this.campoContaBanco.selecionado || {}).valor,
					"agencia" : this.campoContaAgencia.valor,
					"contacorrente" : this.campoContaNumero.valor,
					"dv" : this.campoDV.valor,
					"file": this.campoUpload.file,
				}, function(loading, error, data) {
					vm.enviandoCadastro = loading;
					if (loading) return;
					if (!error && data && !data.message) {
						vm.$emit('cadastrar');
					} else {
						vm.erroMensagem = data && data.message
							? data.message
							: (error && error.error || error) || 'Resposta vazia do servidor';
						// tratar o erro
					}
				});
			},
			clickCadastrar: function() {
				// this.$emit('cadastrar');
				var vm = this;
				this.erroMensagem = null;

				this.$store.dispatch('validarForm', {
					cnpj: this.campoCNPJ,
					empresa: this.campoEmpresa,
					// nomeFantasia: this.campoNomeFantasia,
					suc: this.campoSUC,
					andar: this.campoAndar,
					categoria: this.campoCategoria,
					responsavel: this.campoResponsavel,
					telefone: this.campoTelefone,
					email: this.campoEmail,
					enviarEmail: this.campoEnviarEmail,
					contaBanco: this.campoContaBanco,
					contaAgencia: this.campoContaAgencia,
					contaNumero: this.campoContaNumero,
					dv: this.campoDV,
					aceito: this.campoAceito,
					upload: this.campoUpload
				}).then(function(result) {
					vm.erroMensagem = result.erroMensagem;
					if (!result.erroMensagem) {
						vm.enviarDados();
					}
				});
			},
			clickTermos: function() {
				this.$emit('termos');
			},
			onCampoValor: function(payload) {
				this.$store.dispatch('campoValor', payload);
			},
			onCampoSelecionado: function(payload) {
				this.$store.dispatch('campoSelecionado', payload);
			},
			onCampoCheck: function(payload) {
				this.$store.dispatch('campoCheck', payload);
			},
			onCampoClickDay: function(payload) {
				var campo = payload.campo;
				var day = payload.day;
				var start, end;
				var cdInicial = this.campoDataInicial;
				var cdFinal = this.campoDataFinal;
				this.$store.commit('aplicarCalendarMonth', {
					campo: cdInicial,
					dataMes: campo.dataMes
				});
				this.$store.commit('aplicarCalendarMonth', {
					campo: cdFinal,
					dataMes: campo.dataMes
				});
				if (campo === cdInicial) {
					start = day.startStart;
					end = day.startEnd;
				} else if (campo === cdFinal) {
					start = day.endStart;
					end = day.endEnd;
				} else {
					return;
				}
				var camposPromise = [
					this.$store.dispatch('campoCalendarPeriod', {
						campo: cdInicial,
						start: start,
						end: end
					}),
					this.$store.dispatch('campoCalendarPeriod', {
						campo: cdFinal,
						start: start,
						end: end
					})
				];
				Promise.all(camposPromise).then(function() {
					cdInicial.selecionado = start
						? Utils.formatDateUser(start)
						: null;
					cdFinal.selecionado = end
						? Utils.formatDateUser(end)
						: null;
				});
			},
			onCampoChangeMonth: function(payload) {
				this.$store.dispatch('campoCalendarMonth', payload);
			},
			onCampoBlur: function(payload) {
				this.$store.dispatch('validarCampo', payload);
			},
			onChangeFileUpload: function() {
				this.campoUpload.file = this.$refs.fileUpload.files[0] || null;
				this.$store.dispatch('validarCampo', { campo: this.campoUpload });
			},
			filterClickAceito: function(evt) {
				return !Utils.isChildOf(evt.target, this.$refs.btAbrirTermos);
			},
			findSelectOpcaoValor: function(obj) {
				var valor = obj.selecionado;
				obj.selecionado = null;
				Utils.forEach(obj.campo.opcoes, function(opcao) {
					if (valor == opcao.valor) {
						obj.selecionado = opcao;
						return this._break;
					}
				});
				return obj;
			},
			fillInputsWithSessionData: function() {
				var sData = this.$store.state.session.data;
				var cValor = 'campoValor';
				var cSelecionado = 'campoSelecionado';
				var plist = [
					this.$store.dispatch(cValor, {
						campo: this.campoCNPJ,
						valor: sData.cnpj || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoRazaoSocial,
						valor: sData.razaosocial || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoNomeFantasia,
						valor: sData.nomefantasia || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoSUC,
						valor: sData.suc || ''
					}),
					this.$store.dispatch(cSelecionado, this.findSelectOpcaoValor({
						campo: this.campoAndar,
						selecionado: sData.andar || ''
					})),
					this.$store.dispatch(cSelecionado, this.findSelectOpcaoValor({
						campo: this.campoCategoria,
						selecionado: sData.categoria || ''
					})),
					this.$store.dispatch(cValor, {
						campo: this.campoResponsavel,
						valor: sData.nomeresponsavel || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoTelefone,
						valor: sData.telefoneresponsavel || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoEmail,
						valor: sData.emailresponsavel || ''
					}),
					this.$store.dispatch(cSelecionado, this.findSelectOpcaoValor({
						campo: this.campoEnviarEmail,
						selecionado: sData.enviaremail
					})),
					this.$store.dispatch(cValor, {
						campo: this.campoDtRecebimento,
						valor: sData.datadorecebimento || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoAntecipacao,
						valor: sData.antecipacao === true ? 'Sim' :
							sData.antecipacao === false ? 'Não' :
							String(sData.antecipacao)
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoTaxa,
						valor: Number(+sData.taxaaplicativo*100).toFixed(4)
							.replace(/\.?0*$/,'')
							.replace('.',',')+' %'
					}),
					this.$store.dispatch(cSelecionado, this.findSelectOpcaoValor({
						campo: this.campoContaBanco,
						selecionado: sData.codigodobanco
					})),
					this.$store.dispatch(cValor, {
						campo: this.campoContaAgencia,
						valor: sData.agencia || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoContaNumero,
						valor: sData.contacorrente || ''
					}),
					this.$store.dispatch(cValor, {
						campo: this.campoDV,
						valor: sData.digitoverificadorconta || ''
					})
				];
				Promise.all(plist).then(function(){});
			},
			onChangeSession: function() {
				if (this.isUser) {
					if (this.unwatchSession) {
						this.unwatchSession();
						this.unwatchSession = void 0;
					}
					this.fillInputsWithSessionData();
				}
			}
		},
		created: function() {
			this.$on('termosAceitar', function() {
				this.onCampoCheck({
					campo: this.campoAceito,
					checked: true
				});
			});
			if (this.$store.state.session.loading) {
				this.unwatchSession = this.$watch(function() {
					return this.$store.state.session;
				}, this.onChangeSession);
			} else {
				this.onChangeSession();
			}
		}
		/*
		props: {
			propA: {
				type: String
			}
		},
		data: function() {
			return {};
		},
		computed: {},
		methods: {},
		created: function() {},
		mounted: function() {},
		beforeDestroy: function() {}
		*/
	};
})();
