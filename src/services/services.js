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
	const url = `${process.env.REACT_APP_API_URL}/candidato`;

	return axios({
		method: 'get',
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
