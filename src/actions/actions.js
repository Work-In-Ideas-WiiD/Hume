import {
	DEL_CANDIDATO,
	GET_ADM_DIRETORIA,
	GET_ADM_EMPRESA,
	GET_CANDIDATO,
	GET_EMPRESAS,
	GET_STATS,
	GET_VAGAS,
	LOAD_USER_DATA,
	POST_ADM_DIRETORIA,
	POST_ADM_EMPRESA,
	POST_AUTH_ME,
	POST_CANDIDATO,
	POST_LOGIN,
	POST_RECUPERAR_SENHA,
	POST_SOLICITAR_RESET,
	POST_STATUS,
	POST_VAGA,
	POST_VINCULAR_ADM_EMPRESA,
	SET_SIDE_BAR,
	GET_CATEGORIA,
} from '../constants/actionsStrings';
import {
	getUserData,
	postAuthMe,
	postLogin,
	postResetPassword,
	postSendReset,
	getCandidato,
	getAdministradorEmpresa,
	getAdministradorDiretoria,
	postAdministradorDiretoria,
	postAdministradorEmpresa,
	postCandidato,
	delCandidato,
	getVagas,
	getEmpresas,
	postVincularaAdmEmpresa,
	getStats,
	postVaga,
	getCategoria,
	postStatus,
} from '../services/services';

import { toast } from 'react-toastify';
import { map } from 'lodash';

export const postLoginAction = (email, password) => async (dispatch) => {
	try {
		const res = await postLogin(email, password);
		dispatch({
			type: POST_LOGIN,
			payload: res.data,
		});
		return res;
	} catch (err) {
		console.log(err);
		return false;
	}
};
export const postSolicitarReset = (user) => async (dispatch) => {
	try {
		const res = await postSendReset(user);
		dispatch({
			type: POST_SOLICITAR_RESET,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		if (err.response.status === 422) {
			return err.response.data.errors;
		} else {
			toast.error('Erro no solicitar reset senha');
			return null;
		}
	}
};
export const postRecuperarSenha = (user) => async (dispatch) => {
	try {
		const res = await postResetPassword(user);
		dispatch({
			type: POST_RECUPERAR_SENHA,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		if (err.response.status === 422) {
			return err.response.data.errors;
		} else {
			toast.error('Erro no recuperar senha');
			return null;
		}
	}
};

export const postAuthMeAction = (token) => async (dispatch) => {
	try {
		const res = await postAuthMe(token);
		dispatch({
			type: POST_AUTH_ME,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const loadUserData = (token) => async (dispatch) => {
	try {
		const res = await getUserData(token);
		dispatch({
			type: LOAD_USER_DATA,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const setSideBar = (index) => (dispatch) => {
	dispatch({
		type: SET_SIDE_BAR,
		payload: index,
	});
};

export const getCandidatoAction =
	(token, page, like, order, mostrar) => async (dispatch) => {
		try {
			const res = await getCandidato(token, page, like, order, mostrar);
			dispatch({
				type: GET_CANDIDATO,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const postCandidatoAction =
	(
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
	) =>
	async (dispatch) => {
		const arquivoObjeto = { ...arquivo };

		try {
			const res = await postCandidato(
				name,
				email,
				cpf,
				telefone,
				arquivoObjeto[0].file,
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
			);
			dispatch({
				type: POST_CANDIDATO,
				payload: res.data,
			});
			return false;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 422) {
				return err.response.data.errors;
			} else {
				return err;
			}
		}
	};

export const delCandidatoAction = (token, id) => async (dispatch) => {
	try {
		const res = await delCandidato(token, id);
		dispatch({
			type: DEL_CANDIDATO,
			payload: res.data,
		});
		return false;
	} catch (err) {
		console.log(err);
		if (err.response.status === 422) {
			return err.response.data.errors;
		} else {
			toast.error('Erro');
			return err;
		}
	}
};

export const postStatusAction = (token, status, id) => async (dispatch) => {
	try {
		const res = await postStatus(token, status, id);
		dispatch({
			type: POST_STATUS,
			payload: res.data,
		});
		return false;
	} catch (err) {
		console.log(err);
		if (err.response && err.response.status === 422) {
			return err.response.data.errors;
		} else {
			if (err.response.data.message) {
				toast.error(err.response.data.message);
			}
			return err;
		}
	}
};

export const getAdministradorEmpresaAction =
	(token, page, like, order, mostrar) => async (dispatch) => {
		try {
			const res = await getAdministradorEmpresa(
				token,
				page,
				like,
				order,
				mostrar
			);
			dispatch({
				type: GET_ADM_EMPRESA,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const getAdministradorDiretoriaAction =
	(token, page, like, order, mostrar) => async (dispatch) => {
		try {
			const res = await getAdministradorDiretoria(
				token,
				page,
				like,
				order,
				mostrar
			);
			dispatch({
				type: GET_ADM_DIRETORIA,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const postAdministradorDiretoriaAction =
	(token, name, email) => async (dispatch) => {
		try {
			const res = await postAdministradorDiretoria(token, name, email);
			dispatch({
				type: POST_ADM_DIRETORIA,
				payload: res.data,
			});
			return false;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 422) {
				return err.response.data.errors;
			} else {
				if (err.response.data.result) {
					toast.error(err.response.data.result.Message);
				}
				return err;
			}
		}
	};

export const postAdministradorEmpresaAction =
	(
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
	) =>
	async (dispatch) => {
		try {
			const res = await postAdministradorEmpresa(
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
			);
			dispatch({
				type: POST_ADM_EMPRESA,
				payload: res.data,
			});
			return false;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 422) {
				return err.response.data.errors;
			} else {
				return err;
			}
		}
	};

export const getVagasAction =
	(token, page, like, order, mostrar, status) => async (dispatch) => {
		try {
			const res = await getVagas(token, page, like, order, mostrar, status);
			dispatch({
				type: GET_VAGAS,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const getEmpresasAction =
	(token, page, like, order, mostrar, status) => async (dispatch) => {
		try {
			const res = await getEmpresas(
				token,
				page,
				like,
				order,
				mostrar,
				status
			);
			dispatch({
				type: GET_EMPRESAS,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const getCategoriaAction =
	(token, page, like, order, mostrar, status) => async (dispatch) => {
		try {
			const res = await getCategoria(
				token,
				page,
				like,
				order,
				mostrar,
				status
			);
			dispatch({
				type: GET_CATEGORIA,
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const postVincularaAdmEmpresaAction =
	(token, administrador_id, empresa_id) => async (dispatch) => {
		try {
			const res = await postVincularaAdmEmpresa(
				token,
				administrador_id,
				empresa_id
			);
			dispatch({
				type: POST_VINCULAR_ADM_EMPRESA,
				payload: res.data,
			});
			return false;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 422) {
				return err.response.data.errors;
			} else {
				if (err.response.data.message) {
					toast.error(err.response.data.message);
				}
				return err;
			}
		}
	};

export const getStatsAction = (token) => async (dispatch) => {
	try {
		const res = await getStats(token);
		dispatch({
			type: GET_STATS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const postVagaAction =
	(
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
	) =>
	async (dispatch) => {
		try {
			const res = await postVaga(
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
			);
			dispatch({
				type: POST_VAGA,
				payload: res.data,
			});
			return false;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 422) {
				return err.response.data.errors;
			} else {
				if (err.response.data.message) {
					toast.error(err.response.data.message);
				}
				return err;
			}
		}
	};
