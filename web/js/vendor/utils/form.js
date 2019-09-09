(function(vars) {

var Utils;
vars.Utils = Utils = vars.Utils || {};

Utils.digitoVerificador = (function() {

function verifica_cpf_cnpj(valor) {
	valor = String(valor).replace(/[^0-9]/g, '');
	if (valor.length === 11) {
		return 'CPF';
	} else if (valor.length === 14) {
		return 'CNPJ';
	} else {
		return false;
	}
}

function calc_digitos_posicoes(digitos, posicoes, soma_digitos) {
	soma_digitos = soma_digitos || 0;
	digitos = String(digitos);
	for (var i = 0; i < digitos.length; i++) {
		soma_digitos = soma_digitos + (digitos[i] * posicoes);
		posicoes--;
		if (posicoes < 2) {
			posicoes = 9;
		}
	}
	soma_digitos = soma_digitos % 11;
	if (soma_digitos < 2) {
		soma_digitos = 0;
	} else {
		soma_digitos = 11 - soma_digitos;
	}
	return soma_digitos;
}

function calc_digitos_cpf(valor) {
	valor = String(valor).replace(/[^0-9]/g, '');
	var digitos = valor.substr(0, 9);
	var dv1 = calc_digitos_posicoes(digitos, 10);
	var dv2 = calc_digitos_posicoes(digitos + dv1, 11);
	return String(dv1) + String(dv2);
}

function valida_cpf(valor) {
	valor = String(valor).replace(/[^0-9]/g, '');
	var digitos = valor.substr(0, 9);
	var dv = calc_digitos_cpf(digitos);
	if ((digitos + dv) === valor) {
		return true;
	}
	return false;
}

function calc_digitos_cnpj(valor) {
	valor = String(valor).replace(/[^0-9]/g, '');
	var digitos = valor.substr(0, 12);
	var dv1 = calc_digitos_posicoes(digitos, 5);
	var dv2 = calc_digitos_posicoes(digitos + dv1, 6);
	return String(dv1) + String(dv2);
}

function valida_cnpj(valor) {
	valor = String(valor).replace(/[^0-9]/g, '');
	var digitos = valor.substr(0, 12);
	var dv = calc_digitos_cnpj(digitos);
	if ((digitos + dv) === valor) {
		return true;
	}
	return false;
}

function valida_cpf_cnpj(valor) {
	var valida = verifica_cpf_cnpj(valor);
	valor = String(valor).replace(/[^0-9]/g, '');
	if (valida === 'CPF') {
		return valida_cpf(valor);
	} else if (valida === 'CNPJ') {
		return valida_cnpj(valor);
	} else {
		return false;
	}
}

return {
	cpf: calc_digitos_cpf,
	cnpj: calc_digitos_cnpj,
	posicoes: calc_digitos_posicoes,
	valida: {
		cpf: valida_cpf,
		cnpj: valida_cnpj,
		cpf_cnpj: valida_cpf_cnpj
	}
};

})();

Utils.mask = (function() {

var r19 = /[1-9]/;
var rd = /\d/;
var maskFone8 = ['(', r19, r19, ')', ' ', r19, rd, rd, rd, '-', rd, rd, rd, rd];
var maskFone9 = ['(', r19, r19, ')', ' ', r19, rd, rd, rd, rd, '-', rd, rd, rd, rd];
var rnd = /[^\d]/g;
var pipeClearNoNumbers = function(conformedValue) {
	var clear = conformedValue.replace(rnd, '');
	return (clear.length) ? conformedValue : '';
};
var numberOptDefault = {
	prefix: '',
	thousandsSeparatorSymbol: '.',
	allowDecimal: false,
	decimalSymbol: ',',
	allowNegative: false,
	allowLeadingZeroes: true,
	integerLimit: null
};
var decimalOptDefault = {
	prefix: '',
	thousandsSeparatorSymbol: '.',
	allowDecimal: true,
	requireDecimal: true,
	decimalLimit: 2,
	decimalSymbol: ',',
	allowNegative: false,
	allowLeadingZeroes: true,
	integerLimit: null
};
function fnFnNumber(optDefault, pipeDefault) {
	return function fnNumber(opt, pipe) {
		opt = opt ? Utils.extend({}, optDefault, opt) : optDefault;
		pipe = pipe === false ? void 0 : pipe || pipeDefault;
		return {
			mask: window.textMaskAddons.createNumberMask(opt),
			pipe: pipe
		};
	};
}

return {
	fone: {
		mask: function(rawValue) {
			var clear = rawValue.replace(rnd, '');
			//console.log(rawValue.length+' '+rawValue+' -> '+clear.length+' '+clear);
			return (clear.length > 10) ? maskFone9 : maskFone8;
		},
		pipe: pipeClearNoNumbers
	},
	fone8: {
		mask: maskFone8.slice(),
		pipe: pipeClearNoNumbers
	},
	fone9: {
		mask: maskFone9.slice(),
		pipe: pipeClearNoNumbers
	},
	cnpj: {
		mask: [rd, rd, '.', rd, rd, rd, '.', rd, rd, rd, '/', rd, rd, rd, rd, '-', rd, rd],
		pipe: pipeClearNoNumbers
	},
	cpf: {
		mask: [rd, rd, rd, '.', rd, rd, rd, '.', rd, rd, rd, '-', rd, rd],
		pipe: pipeClearNoNumbers
	},
	cep: {
		mask: [rd, rd, rd, rd, rd, '-', rd, rd, rd],
		pipe: pipeClearNoNumbers
	},
	data_dd_mm_yyyy: {
		mask: [rd, rd, '/', rd, rd, '/', rd, rd, rd, rd],
		pipe: pipeClearNoNumbers
	},
	hora_hh_mm: {
		mask: [rd, rd, ':', rd, rd],
		pipe: pipeClearNoNumbers
	},
	numericIdentifier: {
		mask: function(rawValue) {
			var mask = [rd];
			var rc = /[\d.-]/;
			var rcg = /[^\d.-]/g;
			var numValue = String(rawValue).replace(rcg, '');
			for (var i = 1; i < numValue.length; i++) {
				mask.push(rc);
			}
			return mask;
		},
		pipe: pipeClearNoNumbers
	},
	fnNumber: fnFnNumber(numberOptDefault, pipeClearNoNumbers),
	fnDecimal: fnFnNumber(decimalOptDefault),
	pipeClearNoNumbers: pipeClearNoNumbers
};

})();

Utils.valida = (function() {

var rnd = /[^\d]/g;
var reFone = /^[1-9]{3}[0-9]{7,8}$/;
var reFone8 = /^[1-9]{3}[0-9]{7}$/;
var reFone9 = /^[1-9]{3}[0-9]{8}$/;
var reTrim = /^\s+|\s+$/g;
var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var reCep = /^[0-9]{8}$/;
var reDateDdMmYyyy = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
var reTimeHhMm = /^([0-9]{1,2}):([0-9]{2})$/;

function naoVazio(campo) {
	var valor = campo.valor.replace(reTrim, '');
	if (!valor) {
		return { falta: true };
	}
}

function opcional(campo) {
	var valor = campo.valor.replace(reTrim, '');
	if (!valor) {
		return { falta: false };
	}
}

function isTrue(campo) {
	if (!campo.valor) {
		return { falta: true };
	}
}

function selecionado(campo) {
	if (!campo.selecionado) {
		return { falta: true };
	}
}

function checked(campo) {
	if (!campo.checked) {
		return { falta: true };
	}
};

function fone(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!reFone.test(valor)) {
		return { erro: 'Telefone inválido' };
	}
}

function fone8(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!reFone8.test(valor)) {
		return { erro: 'Telefone inválido' };
	}
}

function fone9(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!reFone9.test(valor)) {
		return { erro: 'Telefone inválido' };
	}
}

function email(campo) {
	var valor = campo.valor;
	if (!reEmail.test(valor)) {
		return { erro: 'Email inválido' };
	}
}

function cnpj(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!Utils.digitoVerificador.valida.cnpj(valor)) {
		return { erro: 'CNPJ inválido' };
	}
}

function cpf(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!Utils.digitoVerificador.valida.cpf(valor)) {
		return { erro: 'CPF inválido' };
	}
}

function cep(campo) {
	var valor = campo.valor.replace(rnd, '');
	if (!reCep.test(valor)) {
		return { erro: 'CEP inválido' };
	}
}

function data_dd_mm_yyyy(campo) {
	var valor = campo.valor;
	var match = String(valor).match(reDateDdMmYyyy);
	if (!match) {
		return { erro: 'Data inválida' };
	}
	var d = +match[1];
	var m = +match[2];
	var y = +match[3];
	var date = new Date(y, m - 1, d);
	if (
		y !== +date.getFullYear() ||
		m !== +date.getMonth() + 1 ||
		d !== +date.getDate()
	) {
		return { erro: 'Data inválida' };
	}
}

function hora_hh_mm(campo) {
	var valor = campo.valor;
	var match = String(valor).match(reTimeHhMm);
	if (!match) {
		return { erro: 'Hora inválida' };
	}
	var h = +match[1];
	var m = +match[2];
	if (!(
		0 <= h && h <= 23 &&
		0 <= m && m <= 59
	)) {
		return { erro: 'Hora inválida' };
	}
}

function timePicker(campo) {
	var h = campo.hora;
	var m = campo.minuto;
	if (!(
		0 <= h && h <= 23 &&
		0 <= m && m <= 59
	)) {
		return { falta: true };
	}
}

function numero(campo) {
	var valor = +campo.valor;
	return !isNaN(valor) && isFinite(valor);
}

function decimal(campo) {
	var valor = parseFloat(
		String(campo.valor)
		.replace(/\./g,'')
		.replace(/,/g,'.')
	);
	return !isNaN(valor) && isFinite(valor);
}

function hasFile(campo) {
	if (!campo.file) {
		return {falta: true};
	}
}

function isFile(campo) {
	var file = campo.file;
	if (!('function' === typeof File && file instanceof File)) {
		return {erro:(typeof file)+' não é um arquivo'};
	}
}

function fnFileTypeRegex(regex, message) {
	return function(campo) {
		var file = campo.file;
		if (!regex.test(file.type)) {
			return {erro:message};
		}
	};
}

function fnFileSizeUnder(maxsize, message) {
	return function(campo) {
		var file = campo.file;
		if (maxsize < file.size) {
			return {erro:message};
		}
	};
}

function currentStatus(campo) {
	if (campo.erro || campo.falta) {
		return {
			falta: campo.falta,
			erro: campo.erro
		};
	}
}

return {
	naoVazio: naoVazio,
	opcional: opcional,
	isTrue: isTrue,
	selecionado: selecionado,
	checked: checked,
	fone: fone,
	fone8: fone8,
	fone9: fone9,
	email: email,
	cnpj: cnpj,
	cpf: cpf,
	cep: cep,
	data_dd_mm_yyyy: data_dd_mm_yyyy,
	hora_hh_mm: hora_hh_mm,
	timePicker: timePicker,
	numero: numero,
	decimal: decimal,
	hasFile: hasFile,
	isFile: isFile,
	fnFileTypeRegex: fnFileTypeRegex,
	fnFileSizeUnder: fnFileSizeUnder,
	currentStatus: currentStatus
};

})();

})(window._var$);
