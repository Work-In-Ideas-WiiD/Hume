import {
	CLEAR_PRE_CONTA_ID,
	CLEAR_QRCODE_COBRAR,
	CLEAR_TRANSACAO,
	DELETE_ADMIN,
	DELETE_BANNER,
	DELETE_DOCUMENTO,
	DELETE_DOCUMENTO_PRE_CONTA,
	DELETE_FAVORITO_P2P,
	DELETE_FAVORITO_PIX,
	DELETE_FAVORITO_TED,
	DELETE_FAVORITO_WALLET,
	DELETE_PERFIL_TAXA,
	DEL_ASSINATURA,
	DEL_ASSINATURA_PLANO_VENDAS,
	DEL_CANDIDATO,
	DEL_CHAVE,
	DEL_CONTA_BANCARIA,
	DEL_FOLHA_DE_PAGAMENTO_FUNCIONARIO,
	DEL_FUNCIONARIO,
	DEL_FUNCIONARIO_GRUPO,
	DEL_PAGADOR,
	DEL_PERMISSAO,
	DEL_PLANO,
	DEL_PLANO_ASSINATURA,
	DEL_PLANO_ASSINATURA_EC,
	DEL_PLANO_VENDAS,
	DEL_REPRESENTANTE,
	DEL_TERMINAL_POS,
	DEL_USER_REPRESENTANTE,
	GERAR_QR_CODE_IMAGEM,
	GET_ACESSO_WEB,
	GET_ADM_DIRETORIA,
	GET_ADM_EMPRESA,
	GET_APROVAR_CONTA,
	GET_ARQUIVO_LOTE,
	GET_ARQUIVO_LOTE_COMPROVANTE,
	GET_ARQUIVO_LOTE_FUNCIONARIO,
	GET_ASSINATURA_PLANO_VENDAS,
	GET_BLACKLIST,
	GET_CANDIDATO,
	GET_CARTAO_HISTORICO_TRANSACAO,
	GET_CHAVES_PIX,
	GET_CONSULTA_CHAVE,
	GET_CONTAS_EXPORT,
	GET_DOCUMENTO_PRE_CONTA,
	GET_EMPRESAS,
	GET_ENVIAR_DOCUMENTO_IDWALL,
	GET_EXPORTACOES_SOLICITADAS,
	GET_EXPORT_DOWNLOAD,
	GET_EXTRATO_ADQUIRENCIA,
	GET_EXTRATO_PIX,
	GET_FAVORITOS_P2P,
	GET_FAVORITOS_PIX,
	GET_FAVORITOS_TED,
	GET_FAVORITOS_WALLET,
	GET_FINALIZAR_CADASTRO_CONTA,
	GET_FOLHA_DE_PAGAMENTO,
	GET_FOLHA_DE_PAGAMENTO_APROVAR,
	GET_FOLHA_DE_PAGAMENTO_FUNCIONARIO,
	GET_FOLHA_DE_PAGAMENTO_SHOW,
	GET_FUNCIONARIO,
	GET_FUNCIONARIO_GRUPO,
	GET_GRAFICO_CONTA_BAR_DASHBOARD,
	GET_GRAFICO_CONTA_LINE_DASHBOARD,
	GET_LISTA_ADMINISTRADOR,
	GET_LISTA_BANNER,
	GET_LOGS,
	GET_MEUS_ECS,
	GET_MINHAS_ASSINATURAS,
	GET_MINHAS_TAXAS,
	GET_PAGAMENTO_APROVAR,
	GET_PAGAMENTO_CONTA_EXTRATO,
	GET_PAGAMENTO_PIX,
	GET_PAGAMENTO_PIX_APROVAR,
	GET_PAGAMENTO_PIX_EXTRATO,
	GET_PAGAMENTO_TED_APROVAR,
	GET_PAGAMENTO_TRANSFERENCIA_APROVAR,
	GET_PAGAMENTO_WALLET_APROVAR,
	GET_PLANO_VENDAS,
	GET_PLANO_VENDAS_ID,
	GET_REENVIAR_CODIGO,
	GET_REENVIAR_TOKEN_USUARIO,
	GET_REPRESENTANTE,
	GET_RESUMO_CONTA_DASHBOARD,
	GET_SINCRONIZAR_EXTRATO,
	GET_TED_EXTRATO,
	GET_TERMINAIS_POS,
	GET_TERMINAL_POS,
	GET_TERMINAL_POS_TRANSACTIONS,
	GET_TRANSACAO_MES,
	GET_TRANSACAO_PIX,
	GET_TRANSACAO_PIX_ID,
	GET_TRANSACAO_TED,
	GET_TRANSACAO_TED_ID,
	GET_TRANSFERENCIA_EXTRATO,
	GET_VAGAS,
	LOAD_ALL_CONTAS,
	LOAD_ASSINATURAS,
	LOAD_BANCOS,
	LOAD_BOLETOS,
	LOAD_BOLETO_LIST,
	LOAD_CARNE,
	LOAD_COBRANCAS_CARTAO,
	LOAD_COBRANCAS_COMPARTILHADAS,
	LOAD_COBRANCAS_RECEBIDAS_WALLET,
	LOAD_CONTAS,
	LOAD_CONTA_BANCARIA,
	LOAD_CONTA_ID,
	LOAD_DETALHES_GIFT_CARD,
	LOAD_DETALHES_RECARGA,
	LOAD_DOCUMENTO,
	LOAD_EXPORT_EXTRATO,
	LOAD_EXPORT_TRANSACAO,
	LOAD_EXPORT_TRANSFERENCIA,
	LOAD_EXTRATO,
	LOAD_HISTORICO_TED,
	LOAD_HISTORICO_TRANSACAO,
	LOAD_HISTORICO_TRANSFERENCIA,
	LOAD_LANCAMENTOS_FUTUROS,
	LOAD_LINK_PAGAMENTOS,
	LOAD_LINK_PAGAMENTOS_ID,
	LOAD_LISTAR_PRODUTOS_GIFT_CARD,
	LOAD_LISTAR_RECARGAS,
	LOAD_LISTA_DEVICE_BLOQUEADO,
	LOAD_LISTA_PRE_CONTAS,
	LOAD_LISTA_PRE_CONTA_ID,
	LOAD_LISTA_PRE_CONTA_JURIDICA_ID,
	LOAD_MINHAS_COBRANCAS,
	LOAD_PAGADORES,
	LOAD_PAGADORES_USER,
	LOAD_PAGADOR_ID,
	LOAD_PAGAMENTOS_LIST,
	LOAD_PARTNER_TRANSACTIONS,
	LOAD_PERFIL_TAXA,
	LOAD_PERFIL_TAXA_ID,
	LOAD_PERMISSAO,
	LOAD_PERMISSAO_GERENCIAR,
	LOAD_PLANOS,
	LOAD_PLANO_ID,
	LOAD_RECEBIVEIS,
	LOAD_TRANSACAO,
	LOAD_TRANSFERENCIA_ID,
	LOAD_USER_DATA,
	POST_ACESSAR_WEB,
	POST_ADM_DIRETORIA,
	POST_ADM_EMPRESA,
	POST_ASSINATURA,
	POST_ASSINATURA_PLAN,
	POST_ASSINATURA_PLANO_VENDAS,
	POST_AUTH_ME,
	POST_BANNER,
	POST_BLACK_LIST_SELFIE,
	POST_BLOQUEAR_DEVICE,
	POST_BUSCAR_CONTA_CNPJ,
	POST_BUSCAR_CONTA_CPF,
	POST_CANDIDATO,
	POST_CAPTURA,
	POST_CARTAO_PAGADOR,
	POST_COBRANCA_CARTAO,
	POST_CONFIRMAR_PROPRIEDADE,
	POST_CONTA,
	POST_CONTA_BANCARIA,
	POST_CONTA_PJ,
	POST_CRIAR_CHAVE,
	POST_CRIAR_TAXAS_PADRAO,
	POST_DESBLOQUEAR_DEVICE,
	POST_DESBLOQUEAR_PERFIL_TAXA,
	POST_DOCUMENTO,
	POST_DOCUMENTO_PRE_CONTA,
	POST_EMAIL,
	POST_ENVIAR_COMPROVANTE_FOLHA,
	POST_ETAPA_1,
	POST_ETAPA_2,
	POST_ETAPA_3,
	POST_ETAPA_4,
	POST_ETAPA_5,
	POST_FOLHA_DE_PAGAMENTO_APROVAR,
	POST_FOLHA_DE_PAGAMENTO_LOTE,
	POST_FOLHA_PAGAMENTO,
	POST_FOLHA_PAGAMENTO_FUNCIONARIO_MULTI,
	POST_FUNCIONARIO,
	POST_FUNCIONARIO_GRUPO,
	POST_FUNCIONARIO_LOTE,
	POST_GERAR_QRCODE,
	POST_LER_QRCODE,
	POST_LINK_PAGAMENTOS,
	POST_LOGIN,
	POST_PAGADOR,
	POST_PAGAMENTO_APROVAR,
	POST_PAGAMENTO_BOLETO,
	POST_PAGAMENTO_PIX,
	POST_PAGAMENTO_PIX_APROVAR,
	POST_PAGAMENTO_TED_APROVAR,
	POST_PAGAMENTO_TRANSFERENCIA_APROVAR,
	POST_PAGAMENTO_WALLET_APROVAR,
	POST_PERFIL_TAXA,
	POST_PERMISSAO,
	POST_PLANO,
	POST_PLANO_VENDAS,
	POST_PRIMEIRO_ACESSO,
	POST_RECUPERAR_SENHA,
	POST_REENVIAR_FOLHA_DE_PAGAMENTO_LOTE,
	POST_REENVIAR_TOKEN,
	POST_REIVINDICAR_PORTABILIDADE,
	POST_REIVINDICAR_PROPRIEDADE,
	POST_REPRESENTANTE,
	POST_SOLICITAR_RESET,
	POST_SPLIT,
	POST_STATUS,
	POST_STATUS_CARTAO_PRE,
	POST_TERMINAL_POS,
	POST_USER_BLOQUEAR_DESBLOQUEAR,
	POST_USER_REPRESENTANTE,
	POST_VALIDAR_TOKEN,
	POST_VERIFICAR_CONTATO,
	POST_VINCULAR_ADM_EMPRESA,
	POST_VINCULAR_PERFIL_TAXA,
	PUT_ASSINATURA,
	PUT_FEES,
	PUT_FUNCIONARIO,
	PUT_FUNCIONARIO_GRUPO,
	PUT_PAGADOR,
	PUT_PERFIL_TAXA,
	PUT_PLANO,
	PUT_REPRESENTANTE,
	PUT_TERMINAL_POS,
	SET_AUTORIZAR_MODAL,
	SET_AUTORIZAR_TODOS,
	SET_CADASTRAR_LOTE_MODAL,
	SET_CADASTRO_ETAPA_1,
	SET_CADASTRO_ETAPA_2,
	SET_DADOS_BOLETO_GERADO,
	SET_DADOS_COBRANCA_WALLET,
	SET_DADOS_QR_CODE_COBRANCA,
	SET_HEADER_LIKE,
	SET_LOCAL_GIFT_CARD_ID,
	SET_PAGADOR_ID,
	SET_PRE_CONTA_JURIDICA_ID,
	SET_REDIRECIONAR_TRANSFERENCIA,
	SET_REDIRECIONAR_VALOR_RETIRADA,
	SET_REDIRECIONAR_VALOR_TRANSFERENCIA,
	SET_SIDE_BAR,
	SET_STATE,
	SET_UPDATE_VIEW,
	SHOW_QR_CODE,
	UPDATE_USER_CONTA,
} from '../constants/actionsStrings';
import {
	delChave,
	deleteAdmin,
	deleteAssinatura,
	deleteBanner,
	deleteContaBancaria,
	deleteDocumento,
	deleteDocumentoPreConta,
	deleteFavoritoP2P,
	deleteFavoritoPix,
	deleteFavoritoTED,
	deleteFavoritoWallet,
	deleteFolhaDePagamentoFuncionario,
	deleteFuncionario,
	deleteFuncionarioGrupo,
	deletePagador,
	deletePerfilTaxa,
	deletePermissao,
	deletePlano,
	deletePlanoAssinatura,
	deleteRepresentante,
	deleteUserRepresentante,
	getAcessoWeb,
	getAprovarConta,
	getArquivoLote,
	getArquivoLoteComprovante,
	getArquivoLoteFuncionario,
	getAssinaturasFilters,
	getBancos,
	getBlacklist,
	getBoletos,
	getBoletosFilter,
	getCarneFilters,
	getCartaoHistoricoTransacao,
	getChavesPix,
	getCobrancasCartaoFilters,
	getCobrancasCompartilhadas,
	getConsultaChavePix,
	getContaBancaria,
	getContaId,
	getContas,
	getContasExport,
	getDetalhesGiftCard,
	getDetalhesRecarga,
	getDocumento,
	getDocumentoPreConta,
	getEnviarDocumentoIdWall,
	getExportExtrato,
	getExportHistoricoTransacao,
	getExportHistoricoTransferencia,
	getExportPartnerTransacions,
	getExtratoFilters,
	getExtratoPix,
	getFavoritosP2P,
	getFavoritosPix,
	getFavoritosTED,
	getFavoritosWallet,
	getFinalizarCadastroConta,
	getFolhaDePagamento,
	getFolhaDePagamentoAprovar,
	getFolhaDePagamentoFuncionario,
	getFolhaDePagamentoShow,
	getFuncionario,
	getFuncionarioGrupo,
	getGraficoContaBarDashboard,
	getGraficoContaLineDashboard,
	getHistoricoTransacaoFilters,
	getHistoricoTransferencia,
	getHistoricoTransferenciaFilters,
	getLancamentosFuturos,
	getLinkPagamentoId,
	getLinkPagamentosFilter,
	getListaAdministrador,
	getListaBanner,
	getListaCobrancasRecebidasWallet,
	getListaDeviceBloqueado,
	getListaPreConta,
	getListarProdutosGiftCard,
	getListarProdutosGiftCardAdmin,
	getListarRecargas,
	getListarRecargasAdmin,
	getLogs,
	getMinhasAssinaturas,
	getMinhasCobrancas,
	getMinhasTaxas,
	getPagadores,
	getPagadoresFilter,
	getPagadorId,
	getPagamentoAprovar,
	getPagamentoContaExtrato,
	getPagamentoPix,
	getPagamentoPixAprovar,
	getPagamentoPixExtrato,
	getPagamentos,
	getPagamentoTEDAprovar,
	getPagamentoTransferenciaAprovar,
	getPagamentoWalletAprovar,
	getPartnerTransacions,
	getPerfilTaxa,
	getPerfilTaxaId,
	getPermissao,
	getPlanoId,
	getPlanosAll,
	getPlanosFilters,
	getPreContaId,
	getPreContaJuridicaId,
	getRecebiveisId,
	getReenviarCodigo,
	getReenviarTokenUsuario,
	getRepresentante,
	getResumoContaDashboard,
	getTedExtrato,
	getTransacaoId,
	getTransacaoPix,
	getTransacaoPixId,
	getTransacaoTed,
	getTransacaoTedCliente,
	getTransacaoTedId,
	getTransferenciaExtrato,
	getTransferenciaId,
	getUserData,
	postAcessoWeb,
	postAssinaturaPlan,
	postAssinaturas,
	postAuthMe,
	postBanner,
	postBlackListSelfie,
	postBloquearDeviceAdm,
	postBuscarConta,
	postBuscarContaCPF,
	postCapturaCobranca,
	postCartaoAssinatura,
	postCartaoStatus,
	postCobrancaCartao,
	postCobrancaEstornar,
	postConfirmarPropriedade,
	postContaBancaria,
	postContaPJ,
	postCriarAdmin,
	postCriarChave,
	postDesbloquearDeviceAdm,
	postDesvincularPerfilTaxa,
	postDocumentoPreConta,
	postDocumentos,
	postDocumentosAdm,
	postEnviarComprovanteFolha,
	postEtapa1,
	postEtapa2,
	postEtapa3,
	postEtapa4,
	postEtapa5,
	postFirstAcess,
	postFolhaDePagamentoLote,
	postFolhaPagamento,
	postFolhaPagamentoAprovar,
	postFolhaPagamentoFuncionarioMulti,
	postFuncionario,
	postFuncionarioGrupo,
	postFuncionarioLote,
	postGerarQrCode,
	postLerQrCode,
	postLinkPagamento,
	postLogin,
	postPagador,
	postPagamentoAprovar,
	postPagamentoPix,
	postPagamentoPixAprovar,
	postPagamentoTEDAprovar,
	postPagamentoTransferenciaAprovar,
	postPagamentoWalletAprovar,
	postPagarBoleto,
	postPerfilTaxa,
	postPermissao,
	postPlano,
	postPreContaRepresentante,
	postReenviarFolhaDePagamentoLote,
	postReenviarToken,
	postReivindicarPropriedade,
	postReivindicaçãoPortabilidade,
	postResetPassword,
	postSendReset,
	postSplit,
	postUserBloquearDesbloquear,
	postUserRepresentante,
	postValidarToken,
	postVerificarContato,
	postVincularPerfilTaxa,
	putAssinaturas,
	putConta,
	putPagador,
	putPerfilTaxa,
	putPlano,
	putRepresentante,
	putUpdateFuncionario,
	putUpdateFuncionarioGrupo,
	putUserConta,
	deletePlanoAssinaturaEC,
	getExportacoesSolicitadas,
	getExportDownload,
	getTerminaisPOS,
	getTerminalPOS,
	getTerminalPOSTransactions,
	deleteTerminalPOS,
	putTerminalPOS,
	gerarImagemQrCode,
	showQrCode,
	getTransacaoMes,
	postTerminalPos,
	getSincronizarExtratoConta,
	getExtratoAdquirenciaFilters,
	getPlanosDeVendas,
	postPlanoDeVendas,
	delPlanoVendas,
	getPlanosDeVendasID,
	postCriarTaxasPadrao,
	postAssinaturaPlanoVendas,
	getAssinaturaPlanoVendas,
	delAssinaturaPlanoVendas,
	getMeusEcs,
	putFees,
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
		const res = await postAuthMe(token, status, id);
		dispatch({
			type: POST_STATUS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
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
