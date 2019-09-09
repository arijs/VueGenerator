(function() {
	var vars = this._var$;
	var App = this._app$;
	var Utils = vars.Utils;
	var Services = {};
	var Env = {
		name: 'homolog',
		Services: Services
	};
	App.Env = Env;

	function urlUsuarios(url) {
		return 'https://s2-usuariosapi.azurewebsites.net/' + url;
	}
	function urlCore(url) {
		return 'https://s2-coreapi.azurewebsites.net/' + url;
	}
	function urlSite(url) {
		return App.BaseUrl + url;
	}
	function enc(str) {
		return encodeURIComponent(str);
	}
	function optWithParams(opt, params) {
		opt.params = params;
		return opt;
	}

	var mapSession = {
		admin: ('api/session/admin.json'),
		user: ('api/session/user.json'),
		not_logged: ('api/session/not-logged.json')
	};
	var defaultSession = mapSession.not_logged;

	Services.session = function(opt) {
		var url = App.sessionUrl;
		opt.ajax = {
			url: url && mapSession[url] || defaultSession
		};
		return opt;
	};

	Services.login = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlUsuarios('api/v1/login'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				email: params.username,
				senha: params.password
			})
		};
		opt.noAuthorization = true;
		return opt;
	};

	Services.recuperarSenha = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlUsuarios('api/v1/login/recuperar-senha'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				email: params.username
			})
		};
		return opt;
	};

	Services.usuariosLista = function(opt) {
		opt.ajax = {
			url: urlUsuarios('api/v1/usuarios')
		};
		return opt;
	};

	Services.usuariosGet = function(opt, params) {
		opt.ajax = {
			url: urlUsuarios('api/v1/usuarios/'+enc(params.id))
		};
		return opt;
	};

	Services.usuariosInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlUsuarios('api/v1/usuarios'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				nome: params.nome,
				apelido: params.apelido,
				dataNascimento: params.dataNascimento,
				email: params.email,
				senha: params.senha,
				confirmacaoSenha: params.senhaConfirmacao,
				perfil: params.perfil
			})
		};
		return opt;
	};

	Services.usuariosEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlUsuarios('api/v1/usuarios/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				nome: params.nome,
				apelido: params.apelido,
				dataNascimento: params.dataNascimento,
				email: params.email,
				senha: params.senha,
				confirmacaoSenha: params.senhaConfirmacao,
				perfil: params.perfil
			})
		};
		return opt;
	};

	Services.usuariosDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlUsuarios('api/v1/usuarios/'+enc(params.id))
		};
		return opt;
	};

	Services.usuariosActivate = function(opt, params) {
		opt.ajax = {
			method: 'PATCH',
			url: urlUsuarios('api/v1/usuarios/'+enc(params.id)+'/ativar')
		};
		return opt;
	};

	Services.usuariosPerfilLista = optWithParams;

	Services.temasLista = function(opt) {
		opt.ajax = {
			url: urlCore('api/v1/core/temas')
		};
		return opt;
	};

	Services.temasInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlCore('api/v1/core/temas'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				descricao: params.descricao,
				peso: params.peso,
				descricoesSubTemas: params.descricoesSubTemas
			})
		};
		return opt;
	};

	Services.temasGet = function(opt, params) {
		opt.ajax = {
			url: urlCore('api/v1/core/temas/'+enc(params.id))
		};
		return opt;
	};

	Services.temasEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlCore('api/v1/core/temas/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				descricao: params.descricao,
				peso: params.peso,
				subTemasIncluidos: params.subTemasIncluidos,
				subTemasAtualizados: params.subTemasAtualizados,
				subTemasExcluidos: params.subTemasExcluidos
			})
		};
		return opt;
	};

	Services.temasDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlCore('api/v1/core/temas/'+enc(params.id))
		};
		return opt;
	};

	Services.temasActivate = function(opt, params) {
		opt.ajax = {
			method: 'PATCH',
			url: urlCore('api/v1/core/temas/'+enc(params.id)+'/ativar')
		};
		return opt;
	};

	Services.subtemasInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlCore('api/v1/core/temas/'+enc(params.temaId)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				temaId: params.temaId,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.subtemasEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlCore('api/v1/core/temas/'+enc(params.temaId)+'/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				temaId: params.temaId,
				subTemaId: params.id,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.subtemasDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlCore('api/v1/core/temas/'+enc(params.temaId)+'/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				temaId: params.temaId,
				subTemaId: params.id,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.solucoesLista = function(opt) {
		opt.ajax = {
			url: urlCore('api/v1/core/solucoes')
		};
		return opt;
	};

	Services.solucoesInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlCore('api/v1/core/solucoes'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				nome: params.nome,
				descricao: params.descricao,
				peso: params.peso,
				link: params.link,
				tipoSolucao: params.tipoSolucao,
				tipoEspecialista: params.tipoEspecialista,
				descricoesSubSolucoes: params.descricoesSubSolucoes
			})
		};
		return opt;
	};

	Services.solucoesGet = function(opt, params) {
		opt.ajax = {
			url: urlCore('api/v1/core/solucoes/'+enc(params.id))
		};
		return opt;
	};

	Services.solucoesEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlCore('api/v1/core/solucoes/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				nome: params.nome,
				descricao: params.descricao,
				peso: params.peso,
				link: params.link,
				tipoSolucao: params.tipoSolucao,
				tipoEspecialista: params.tipoEspecialista,
				subSolucoesIncluidas: params.subSolucoesIncluidas,
				subSolucoesAtualizadas: params.subSolucoesAtualizadas,
				subSolucoesExcluidas: params.subSolucoesExcluidas
			})
		};
		return opt;
	};

	Services.solucoesDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlCore('api/v1/core/solucoes/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				descricao: params.descricao,
				peso: params.peso
			})
		};
		return opt;
	};

	Services.solucoesActivate = function(opt, params) {
		opt.ajax = {
			method: 'PATCH',
			url: urlCore('api/v1/core/solucoes/'+enc(params.id)+'/ativar')
		};
		return opt;
	};

	Services.subsolucoesInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlCore('api/v1/core/solucoes/'+enc(params.solucaoId)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				solucaoId: params.solucaoId,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.subsolucoesEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlCore('api/v1/core/solucoes/'+enc(params.solucaoId)+'/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				solucaoId: params.solucaoId,
				subSolucaoId: params.id,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.subsolucoesDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlCore('api/v1/core/solucoes/'+enc(params.solucaoId)+'/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				solucaoId: params.solucaoId,
				subSolucaoId: params.id,
				descricao: params.descricao
			})
		};
		return opt;
	};

	Services.solucoesTipoSolucao = optWithParams;
	Services.solucoesTipoEspecialista = optWithParams;
	Services.questoesTipoQuestao = optWithParams;
	Services.questoesQuestaoPool = optWithParams;
	Services.questoesRespostaCategorizacao = optWithParams;

	Services.questoesLista = function(opt) {
		opt.ajax = {
			url: urlCore('api/v1/core/questoes')
		};
		return opt;
	};

	Services.questoesInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlCore('api/v1/core/questoes'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				nome: params.nome,
				descricao: params.descricao,
				tipoQuestao: params.tipoQuestao,
				questaoPool: params.questaoPool,
				pesoBaixo: params.pesoBaixo,
				pesoMedio: params.pesoMedio,
				pesoAlto: params.pesoAlto,
				obrigatoria: params.obrigatoria,
				tempoResposta: params.tempoResposta,
				subTemaId: params.subTemaId,
				respostas: params.respostas
			})
		};
		return opt;
	};

	Services.questoesGet = function(opt, params) {
		opt.ajax = {
			url: urlCore('api/v1/core/questoes/'+enc(params.id))
		};
		return opt;
	};

	Services.questoesEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlCore('api/v1/core/questoes/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				nome: params.nome,
				descricao: params.descricao,
				tipoQuestao: params.tipoQuestao,
				questaoPool: params.questaoPool,
				pesoBaixo: params.pesoBaixo,
				pesoMedio: params.pesoMedio,
				pesoAlto: params.pesoAlto,
				obrigatoria: params.obrigatoria,
				tempoResposta: params.tempoResposta,
				subTemaId: params.subTemaId,
				respostasIncluidas: params.respostasIncluidas,
				respostasAtualizadas: params.respostasAtualizadas,
				respostasExcluidas: params.respostasExcluidas
			})
		};
		return opt;
	};

	Services.questoesDelete = function(opt, params) {
		opt.ajax = {
			method: 'DELETE',
			url: urlCore('api/v1/core/questoes/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				nome: params.nome,
				descricao: params.descricao,
				peso: params.peso
			})
		};
		return opt;
	};

	Services.questoesActivate = function(opt, params) {
		opt.ajax = {
			method: 'PATCH',
			url: urlCore('api/v1/core/questoes/'+enc(params.id)+'/ativar')
		};
		return opt;
	};


	Services.especialistasLista = function(opt) {
		opt.ajax = {
			url: urlUsuarios('api/v1/usuarios/especialista')
		};
		return opt;
	};

	Services.especialistasInsert = function(opt, params) {
		opt.ajax = {
			method: 'POST',
			url: urlUsuarios('api/v1/usuarios/especialista'),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				idiomas: [params.idioma],
				classificacaoInterna: params.classificacao,
				niveisOperacao: params.operacao,
				nome: params.nome,
				dataNascimento: params.nascimento,
				email: params.email,
				cpf: params.cpf,
				rg: params.rg,
				passaporte: params.passaporte,
				nacionalidade: params.nacionalidade,
				razaoSocial: params.razaoSocial,
				cnpj: params.cnpj,
				inscricaoEstadual: params.ie,
				inscricaoMunicipal: params.im,
				formacao: params.formacao,
				dataMembresia: params.dataMembresia,
				dataCertificacao: params.dataCertificacao,
				dataReCertificacao: params.dataReCertificacao,
				endereco: {
					cep: params.cep,
					logradouro: params.logradouro,
					numero: params.numeroImovel,
					complemento: params.complemento,
					bairro: params.bairro,
					pais: params.pais,
					uf: params.uf,
					cidade: params.cidade
				},
				contato: {
					telefoneResidencial: params.foneRes,
					telefoneCelular: params.foneCel,
					skype: params.skype
				},
				dadosBancarios: {
					banco: params.banco,
					agencia: params.bancoAgencia,
					conta: params.bancoConta,
					tipoConta: params.tipoConta
				}
			})
		};
		return opt;
	};

	Services.especialistasGet = function(opt, params) {
		opt.ajax = {
			url: urlUsuarios('api/v1/usuarios/especialista/'+enc(params.id))
		};
		return opt;
	};

	Services.especialistasEdit = function(opt, params) {
		opt.ajax = {
			method: 'PUT',
			url: urlUsuarios('api/v1/usuarios/especialista/'+enc(params.id)),
			headers: [
				{ name: 'Content-Type', value: 'application/json; charset=UTF-8' }
			],
			body: JSON.stringify({
				id: params.id,
				idiomas: [params.idioma],
				classificacaoInterna: params.classificacao,
				niveisOperacao: params.operacao,
				nome: params.nome,
				dataNascimento: params.nascimento,
				sexo: params.sexo,
				estadoCivil: params.estadoCivil,
				email: params.email,
				cpf: params.cpf,
				rg: params.rg,
				passaporte: params.passaporte,
				nacionalidade: params.nacionalidade,
				razaoSocial: params.razaoSocial,
				cnpj: params.cnpj,
				inscricaoEstadual: params.ie,
				inscricaoMunicipal: params.im,
				formacao: params.formacao,
				dataMembresia: params.dataMembresia,
				dataCertificacao: params.dataCertificacao,
				dataReCertificacao: params.dataReCertificacao,
				endereco: {
					cep: params.cep,
					logradouro: params.endereco,
					numero: params.numeroImovel,
					complemento: params.complemento,
					bairro: params.bairro,
					pais: params.pais,
					uf: params.estado,
					cidade: params.cidade
				},
				contato: {
					telefoneResidencial: params.foneRes,
					telefoneCelular: params.foneCel,
					skype: params.skype
				},
				dadosBancarios: {
					banco: params.banco,
					agencia: params.bancoAgencia,
					conta: params.bancoConta,
					tipoConta: params.tipoConta
				}
			})
		};
		return opt;
	};


	Services.bancosLista = function(opt) {
		opt.ajax = {
			url: urlSite('api/bancos.txt')
		};
		return opt;
	};

	Services.cep = function(opt, cep) {
		opt.ajax = {
			url: '//viacep.com.br/ws/'+cep+'/json/'
		};
		opt.noAuthorization = true;
		return opt;
	};

})();
