import axios from 'axios';

export const getCep = (cep) => {
	const url = `https://viacep.com.br/ws/${cep}/json`;

	return axios({
		method: 'get',
		url,
	});
};

export const postLogin = (email, password) => {
	const url = `${process.env.REACT_APP_API_URL}/auth/login`;
	return axios({
		method: 'post',
		url,
		data: { email, password },
	});
};

export const postSendReset = (user) => {
	const url = `${process.env.REACT_APP_API_URL}/auth/reset-password`;
	return axios({
		method: 'post',
		url,
		data: {
			email: user.email,
		},
	});
};

export const postResetPassword = (user) => {
	const url = `${process.env.REACT_APP_API_URL}/auth/reset/password`;
	return axios({
		method: 'post',
		url,
		data: {
			email: user.email,
			token: user.token,
			password: user.password,
			password_confirmation: user.password_confirmation,
		},
	});
};

export const postAuthMe = (token) => {
	const url = `${process.env.REACT_APP_API_URL}/auth/me`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {},
	});
};

export const getUserData = (token) => {
	const url = `${process.env.REACT_APP_API_URL}/perfil`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getCandidato = (token, page, like, order, mostrar) => {
	const url = `${process.env.REACT_APP_API_URL}/candidato?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postCandidato = (
	name,
	email,
	cpf,
	telefone,
	arquivo,
	cep,
	rua,
	numero,
	bairro,
	complemento,
	cidade,
	estado,
	rg,
	conselho_regulador,
	data_nascimento,
	especialidade,
	estado_civil,
	grupo_atuante,
	nacionalidade,
	sexo,
	password,
	password_confirmation
) => {
	const url = `${process.env.REACT_APP_API_URL}/candidato`;

	var bodyFormData = new FormData();
	bodyFormData.append('name', name);
	bodyFormData.append('email', email);
	bodyFormData.append('cpf', cpf);
	bodyFormData.append('telefone', telefone);
	bodyFormData.append('arquivo', arquivo);
	bodyFormData.append('endereco[cep]', cep);
	bodyFormData.append('endereco[rua]', rua);
	bodyFormData.append('endereco[numero]', numero);
	bodyFormData.append('endereco[bairro]', bairro);
	bodyFormData.append('endereco[complemento]', complemento);
	bodyFormData.append('endereco[cidade]', cidade);
	bodyFormData.append('endereco[estado]', estado);
	bodyFormData.append('endereco[estado]', estado);
	bodyFormData.append('rg', rg);
	bodyFormData.append('conselho_regulador_id', conselho_regulador);
	bodyFormData.append('data_nascimento', data_nascimento);
	bodyFormData.append('especialidade_id', especialidade);
	bodyFormData.append('estado_civil', estado_civil);
	bodyFormData.append('grupo_atuante_id', grupo_atuante);
	bodyFormData.append('nacionalidade', nacionalidade);
	bodyFormData.append('sexo', sexo);
	bodyFormData.append('password', password);
	bodyFormData.append('password_confirmation', password_confirmation);
	return axios({
		method: 'post',
		url,

		data: bodyFormData,
	});
};

export const delCandidato = (token, id) => {
	const url = `${process.env.REACT_APP_API_URL}/candidato/${id}`;
	return axios({
		method: 'delete',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postStatus = (token, status, id) => {
	const url = `${process.env.REACT_APP_API_URL}/status/vaga/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			status: status,
		},
	});
};

export const getAdministradorDiretoria = (
	token,
	page,
	like,
	order,
	mostrar
) => {
	const url = `${process.env.REACT_APP_API_URL}/administrador?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getAdministradorEmpresa = (token, page, like, order, mostrar) => {
	const url = `${process.env.REACT_APP_API_URL}/empresa-administrador?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postAdministradorDiretoria = (token, name, email) => {
	const url = `${process.env.REACT_APP_API_URL}/administrador`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			name: name,
			email: email,
		},
	});
};

export const postAdministradorEmpresa = (
	token,
	name,
	email,
	cnpj,
	telefone,
	imagem,
	cep,
	rua,
	numero,
	bairro,
	complemento,
	cidade,
	estado
) => {
	const url = `${process.env.REACT_APP_API_URL}/empresa-administrador`;

	var bodyFormData = new FormData();
	bodyFormData.append('name', name);
	bodyFormData.append('email', email);
	bodyFormData.append('cnpj', cnpj);
	bodyFormData.append('telefone', telefone);
	bodyFormData.append('imagem', imagem);
	bodyFormData.append('endereco[cep]', cep);
	bodyFormData.append('endereco[rua]', rua);
	bodyFormData.append('endereco[numero]', numero);
	bodyFormData.append('endereco[bairro]', bairro);
	bodyFormData.append('endereco[complemento]', complemento);
	bodyFormData.append('endereco[cidade]', cidade);
	bodyFormData.append('endereco[estado]', estado);
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: bodyFormData,
	});
};

export const getVagas = (
	token,
	page,
	like,
	status,
	experiencia,
	modalidade,
	categoria_id,
	empresa_id
) => {
	const url = `${process.env.REACT_APP_API_URL}/vaga?page=${page}&status=${status}&like=${like}&experiencia=${experiencia}&modalidade=${modalidade}&categoria_id=${categoria_id}&empresa_id=${empresa_id}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getVagaShow = (token, id) => {
	const url = `${process.env.REACT_APP_API_URL}/vaga/${id}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getEmpresas = (token, page, like, order, mostrar, status) => {
	const url = `${process.env.REACT_APP_API_URL}/empresa?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}&status${status}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getCategoria = (token, page, like, order, mostrar, status) => {
	const url = `${process.env.REACT_APP_API_URL}/categoria?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}&status${status}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postVincularaAdmEmpresa = (
	token,
	administrador_id,
	empresa_id
) => {
	const url = `${process.env.REACT_APP_API_URL}/administrador/store/empresa/adm`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			administrador_id: administrador_id,
			empresa_id: empresa_id,
		},
	});
};

export const getStats = (token) => {
	const url = `${process.env.REACT_APP_API_URL}/stats`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postVaga = (
	token,
	empresa_id,
	categoria_id,
	titulo,
	formacao,
	faixa_salarial,
	modalidade,
	tempo_minimo,
	diferenciais,
	experiencia,
	descricao
) => {
	const url = `${process.env.REACT_APP_API_URL}/vaga`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			empresa_id: empresa_id,
			categoria_id: categoria_id,
			titulo: titulo,
			formacao: formacao,
			faixa_salarial: faixa_salarial,
			modalidade: modalidade,
			tempo_minimo: tempo_minimo,
			diferenciais: diferenciais,
			experiencia: experiencia,
			descricao: descricao,
		},
	});
};

export const postEmpresa = (
	token,
	nome,
	email,
	razao_social,
	cnpj,
	telefone,
	imagem,
	cep,
	rua,
	numero,
	bairro,
	complemento,
	cidade,
	estado
) => {
	const url = `${process.env.REACT_APP_API_URL}/empresa`;

	var bodyFormData = new FormData();
	bodyFormData.append('nome', nome);
	bodyFormData.append('email', email);
	bodyFormData.append('razao_social', razao_social);
	bodyFormData.append('cnpj', cnpj);
	bodyFormData.append('telefone', telefone);
	bodyFormData.append('imagem', imagem);
	bodyFormData.append('endereco[cep]', cep);
	bodyFormData.append('endereco[rua]', rua);
	bodyFormData.append('endereco[numero]', numero);
	bodyFormData.append('endereco[bairro]', bairro);
	bodyFormData.append('endereco[complemento]', complemento);
	bodyFormData.append('endereco[cidade]', cidade);
	bodyFormData.append('endereco[estado]', estado);
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: bodyFormData,
	});
};

export const postCategoria = (token, nome, descricao) => {
	const url = `${process.env.REACT_APP_API_URL}/categoria`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			nome: nome,
			descricao: descricao,
		},
	});
};

export const getConselhoRegulador = (
	token,
	page,
	like,
	order,
	mostrar,
	status
) => {
	const url = `${process.env.REACT_APP_API_URL}/conselho-regulador?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}&status${status}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postConselhoRegulador = (token, nome) => {
	const url = `${process.env.REACT_APP_API_URL}/conselho-regulador`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			nome: nome,
		},
	});
};

export const putConselhoRegulador = (token, nome, id) => {
	const url = `${process.env.REACT_APP_API_URL}/conselho-regulador/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			_method: 'PUT',
			nome: nome,
		},
	});
};

export const delConselhoRegulador = (token, id) => {
	const url = `${process.env.REACT_APP_API_URL}/conselho-regulador/${id}`;
	return axios({
		method: 'delete',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getGrupoAtuante = (token, page, like, order, mostrar, status) => {
	const url = `${process.env.REACT_APP_API_URL}/grupo-atuante?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}&status${status}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postGrupoAtuante = (token, nome) => {
	const url = `${process.env.REACT_APP_API_URL}/grupo-atuante`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			nome: nome,
		},
	});
};

export const putGrupoAtuante = (token, nome, id) => {
	const url = `${process.env.REACT_APP_API_URL}/grupo-atuante/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			_method: 'PUT',
			nome: nome,
		},
	});
};

export const delGrupoAtuante = (token, id) => {
	const url = `${process.env.REACT_APP_API_URL}/grupo-atuante/${id}`;
	return axios({
		method: 'delete',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const getEspecialidade = (token, page, like, order, mostrar, status) => {
	const url = `${process.env.REACT_APP_API_URL}/especialidade?like=${like}&page=${page}&order=${order}&mostrar=${mostrar}&status${status}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postEspecialidade = (token, nome) => {
	const url = `${process.env.REACT_APP_API_URL}/especialidade`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			nome: nome,
		},
	});
};

export const putEspecialidade = (token, nome, id) => {
	const url = `${process.env.REACT_APP_API_URL}/especialidade/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			_method: 'PUT',
			nome: nome,
		},
	});
};

export const delEspecialidade = (token, id) => {
	const url = `${process.env.REACT_APP_API_URL}/especialidade/${id}`;
	return axios({
		method: 'delete',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const postSendMail = (token, id, titulo, conteudo) => {
	const url = `${process.env.REACT_APP_API_URL}/sendmail/vaga/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			titulo: titulo,
			conteudo: conteudo,
		},
	});
};

export const postEnviarTriagem = (token, id, aprovados, reprovados) => {
	const url = `${process.env.REACT_APP_API_URL}/triagem/vaga/${id}`;
	return axios({
		method: 'post',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: {
			aprovados: aprovados,
			reprovados: reprovados,
		},
	});
};

export const getTriagem = (token, id, page, idade, experiencia, sexo) => {
	const url = `${process.env.REACT_APP_API_URL}/vaga_triagem/${id}?page${page}&idade=${idade}&experiencia=${experiencia}&sexo=${sexo}&page${page}`;

	return axios({
		method: 'get',
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
