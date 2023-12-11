import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	TablePagination,
	TextField,
	Typography,
	makeStyles,
	Paper,
	Grid,
	Select,
	FormHelperText,
	TableContainer,
	useMediaQuery,
	Checkbox,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delCandidatoAction,
	delDocumento,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getCategoriaAction,
	getContasAction,
	getContasExportAction,
	getEmpresasAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	getStatsAction,
	getTriagemAction,
	getVagasAction,
	getVagaShowAction,
	loadDocumentos,
	postCriarAdminAction,
	postEnviarTriagemAction,
	postSendMailAction,
	postStatusAction,
	postVagaAction,
} from '../../actions/actions';
import { generatePath, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSideBar from '../../components/CustomSideBar/CustomSideBar';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { Pagination } from '@material-ui/lab';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useDebounce from '../../hooks/useDebounce';
import { APP_CONFIG } from '../../constants/config';
import InputMask from 'react-input-mask';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { toPairs } from 'lodash';
import CustomCardInfos from '../../components/CustomCardInfos/CustomCardInfos';
import CurrencyInput from 'react-currency-input';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: '50px',
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	tableContainer: { marginTop: '1px' },
	pageTitle: {
		color: APP_CONFIG.mainCollors.black,
		fontFamily: 'BwGradualDEMO-Regular',
	},
	currencyInput: {
		marginBottom: '6px',
		height: '32px',
		borderColor: '#4E4E4E',
		borderRadius: 0,
		fontSize: 17,
		width: '100%',
		borderWidth: '1px !important',
		border: 'solid',
		fontFamily: 'BwGradualDEMO-Regular',
	},
	textoEmail: {
		height: '40px',
		rows: 5,
	},
}));

const columns = [
	{ headerText: 'Nome da vaga', key: 'titulo' },
	{ headerText: 'Descrição', key: 'descricao' },
	{
		headerText: 'Status',
		key: 'status',
		CustomValue: (value) => {
			if (value === 'ativa') {
				return (
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<Box
							style={{
								borderRadius: 32,
								backgroundColor: '#C9ECE7',
								maxWidth: '120px',
								padding: '5px',
							}}
						>
							<Typography
								style={{
									color: '#00B57D',
									width: '100%',
									fontSize: '12px',
									paddingInline: '10px',
									fontFamily: 'BwGradualDEMO-Bold',
								}}
							>
								ATIVA
							</Typography>
						</Box>
					</Box>
				);
			}
			if (value === 'inativa') {
				return (
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<Box
							style={{
								borderRadius: 32,
								backgroundColor: '#AA7EB3',
								maxWidth: '120px',
								padding: '5px',
							}}
						>
							<Typography
								style={{
									color: '#531A5F',
									width: '100%',
									fontSize: '12px',
									paddingInline: '10px',
									fontFamily: 'BwGradualDEMO-Bold',
								}}
							>
								INATIVA
							</Typography>
						</Box>
					</Box>
				);
			}
			if (value === 'expirada') {
				return (
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<Box
							style={{
								borderRadius: 32,
								backgroundColor: '#ECC9D2',
								maxWidth: '120px',
								padding: '5px',
							}}
						>
							<Typography
								style={{
									color: '#ED757D',
									width: '100%',
									fontSize: '12px',
									paddingInline: '10px',
									fontFamily: 'BwGradualDEMO-Bold',
								}}
							>
								EXPIRADA
							</Typography>
						</Box>
					</Box>
				);
			}
			if (value === 'finalizada') {
				return (
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<Box
							style={{
								borderRadius: 32,
								backgroundColor: '#ECC9D2',
								maxWidth: '120px',
								padding: '5px',
							}}
						>
							<Typography
								style={{
									color: '#ED757D',
									width: '100%',
									fontSize: '12px',
									paddingInline: '10px',
									fontFamily: 'BwGradualDEMO-Bold',
								}}
							>
								FINALIZADA
							</Typography>
						</Box>
					</Box>
				);
			}
			if (value === 'cancelada') {
				return (
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<Box
							style={{
								borderRadius: 32,
								backgroundColor: '#DFB9D4',
								maxWidth: '120px',
								padding: '5px',
							}}
						>
							<Typography
								style={{
									color: '#95407B',
									width: '100%',
									fontSize: '12px',
									paddingInline: '10px',
									fontFamily: 'BwGradualDEMO-Bold',
								}}
							>
								CANCELADA
							</Typography>
						</Box>
					</Box>
				);
			}
		},
	},
	{ headerText: 'Mais ações', key: 'menu' },
];

const ListaVagas = () => {
	const [filters, setFilters] = useState({
		like: '',
		order: '',
		mostrar: '',
		status: ' ',
		idade: '',
		sexo: ' ',
		experiencia: '',
	});
	const debouncedLike = useDebounce(filters.like, 800);
	const [loading, setLoading] = useState(false);
	const token = useAuth();
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const [pageTriagem, setPageTriagem] = useState(1);
	const [registrosAprovados, setRegistrosAprovados] = useState([]);
	const [registrosReprovados, setRegistrosReprovados] = useState([]);
	const [criarVagaModal, setCriarVagaModal] = useState(false);
	const [emailModal, setEmailModal] = useState(false);
	const [triagemModal, setTriagemModal] = useState(false);
	const [triagemId, setTriagemId] = useState('');

	const [dadosEmail, setDadosEmail] = useState({
		titulo: '',
		conteudo: '',
		id: '',
	});
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const vagas = useSelector((state) => state.vagas);
	const triagem = useSelector((state) => state.triagem);

	const stats = useSelector((state) => state.stats);
	const empresas = useSelector((state) => state.empresas);
	const categoria = useSelector((state) => state.categoria);
	const matches = useMediaQuery('(max-width:1120px)');
	const [editarButton, setEditarButton] = useState(false);
	const [dadosVaga, setDadosVaga] = useState({
		empresa_id: ' ',
		categoria_id: ' ',
		titulo: '',
		formacao: '',
		faixa_salarial: '',
		modalidade: '',
		tempo_minimo: '',
		diferenciais: '',
		experiencia: '',
		descricao: '',
	});

	const columnsCandidatos = [
		{
			headerText: 'Aprovar',
			key: 'candidato_id',
			CustomValue: (id) => {
				return (
					<>
						<Box
							style={{
								display: 'flex',
								alignSelf: 'center',
								marginRight: '0px',
								justifyContent: 'space-around',
							}}
						>
							<Checkbox
								color="primary"
								checked={registrosAprovados.includes(id)}
								onChange={() => {
									if (registrosAprovados.includes(id)) {
										setRegistrosAprovados(
											registrosAprovados.filter(
												(item) => item !== id
											)
										);
									} else {
										setRegistrosAprovados([
											...registrosAprovados,
											id,
										]);
										setRegistrosReprovados(
											registrosReprovados.filter(
												(item) => item !== id
											)
										);
									}
								}}
							/>
						</Box>
					</>
				);
			},
		},
		{
			headerText: 'Reprovar',
			key: 'candidato_id',
			CustomValue: (id) => {
				return (
					<>
						<Box
							style={{
								display: 'flex',
								alignSelf: 'center',
								marginRight: '0px',
								justifyContent: 'space-around',
							}}
						>
							<Checkbox
								color="primary"
								checked={registrosReprovados.includes(id)}
								onChange={() => {
									if (registrosReprovados.includes(id)) {
										setRegistrosReprovados(
											registrosReprovados.filter(
												(item) => item !== id
											)
										);
									} else {
										setRegistrosReprovados([
											...registrosReprovados,
											id,
										]);
										setRegistrosAprovados(
											registrosAprovados.filter(
												(item) => item !== id
											)
										);
									}
								}}
							/>
						</Box>
					</>
				);
			},
		},
		{ headerText: 'Nome', key: 'candidato.user.name' },

		{ headerText: 'Experiência', key: 'candidato.experiencia' },
		{ headerText: 'Idade', key: 'candidato.idade' },
		{ headerText: 'Sexo', key: 'candidato.sexo' },
	];
	useEffect(() => {
		dispatch(
			getVagasAction(
				token,
				page,
				debouncedLike,
				filters.order,
				filters.mostrar,
				'publish'
			)
		);
	}, [page, debouncedLike, filters.order, filters.mostrar, filters.status]);

	useEffect(() => {
		dispatch(
			getTriagemAction(
				token,
				triagemId,
				pageTriagem,
				filters.idade,
				filters.experiencia,
				filters.sexo
			)
		);
	}, [
		triagemId,
		pageTriagem,
		filters.idade,
		filters.experiencia,
		filters.sexo,
	]);

	useEffect(() => {
		dispatch(getStatsAction(token));
	}, []);

	useEffect(() => {
		dispatch(getEmpresasAction(token));
	}, []);
	useEffect(() => {
		dispatch(getCategoriaAction(token));
	}, []);

	const handleChangePage = (e, value) => {
		setPage(value);
	};

	const handleCriarVaga = async () => {
		setLoading(true);
		const resCriarVaga = await dispatch(
			postVagaAction(
				token,
				dadosVaga.empresa_id,
				dadosVaga.categoria_id,
				dadosVaga.titulo,
				dadosVaga.formacao,
				dadosVaga.faixa_salarial,
				dadosVaga.modalidade,
				dadosVaga.tempo_minimo,
				dadosVaga.diferenciais,
				dadosVaga.experiencia,
				dadosVaga.descricao
			)
		);
		if (resCriarVaga) {
			toast.error('Falha ao criar vaga');
			setErrors(resCriarVaga);
			setLoading(false);
		} else {
			toast.success('Vaga criada com sucesso');
			setCriarVagaModal(false);
			setLoading(false);
			await dispatch(
				getVagasAction(
					token,
					page,
					debouncedLike,
					filters.order,
					filters.mostrar,
					'publish'
				)
			);
			setDadosVaga({
				empresa_id: ' ',
				categoria_id: ' ',
				titulo: '',
				formacao: '',
				faixa_salarial: '',
				modalidade: '',
				tempo_minimo: '',
				diferenciais: '',
				experiencia: '',
				descricao: '',
			});
		}
	};

	/* const handleEditarVaga = async () => {
		setLoading(true);
		const resEditarVaga = await dispatch(
			postVagaAction(
				token,
				dadosVaga.empresa_id,
				dadosVaga.categoria_id,
				dadosVaga.titulo,
				dadosVaga.formacao,
				dadosVaga.faixa_salarial,
				dadosVaga.modalidade,
				dadosVaga.tempo_minimo,
				dadosVaga.diferenciais,
				dadosVaga.experiencia,
				dadosVaga.descricao
			)
		);
		if (resEditarVaga) {
			toast.error('Falha ao editar vaga');
			setErrors(resEditarVaga);
			setLoading(false);
		} else {
			toast.success('Vaga criada com sucesso');
			setCriarVagaModal(false);
			setLoading(false);
			await dispatch(
				getVagasAction(
					token,
					page,
					debouncedLike,
					filters.order,
					filters.mostrar,
					'publish'
				)
			);
			setDadosVaga({
				empresa_id: ' ',
				categoria_id: ' ',
				titulo: '',
				formacao: '',
				faixa_salarial: '',
				modalidade: '',
				tempo_minimo: '',
				diferenciais: '',
				experiencia: '',
				descricao: '',
			});
		}
	}; */
	/* 
	const enviarEmail = async (row) => {
		setLoading(true);
		getEmailContent();
		const resEnviar = await dispatch(
			postSendMailAction(
				token,
				dadosEmail.id,
				dadosEmail.titulo,
				dadosEmail.conteudo
			)
		);
		if (resEnviar) {
			toast.error('Falha ao enviar e-mail');
			setLoading(false);
		} else {
			toast.success('E-mail enviado com sucesso!');
			setLoading(false);
		}
	}; */

	const handleEnviarEmail = (row) => {
		setDadosEmail({ ...dadosEmail, id: row.row.id });
		setEmailModal(true);
	};

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const handleEditorChange = (state) => {
		setEditorState(state);
	};

	const getEmailContent = async () => {
		const contentState = editorState.getCurrentContent();
		const rawContent = convertToRaw(contentState);

		// Convert raw content to HTML
		const html = stateToHTML(convertFromRaw(rawContent));

		// You can now use 'html' as needed (e.g., display it in a preview)

		if (html) {
			setLoading(true);

			const resEnviar = await dispatch(
				postSendMailAction(token, dadosEmail.id, dadosEmail.titulo, html)
			);
			if (resEnviar) {
				toast.error('Falha ao enviar e-mail');
				setLoading(false);
			} else {
				toast.success('E-mail enviado com sucesso!');
				setLoading(false);
			}
		}
	};

	const handleTriagem = async (row) => {
		setLoading(true);
		const resTriagem = await dispatch(getTriagemAction(token, row.row.id));
		if (resTriagem) {
			toast.error('Falha ao carregar vaga');
			setLoading(false);
		} else {
			setTriagemId(row.row.id);
			setTriagemModal(true);
			setLoading(false);
		}
		setTriagemId(row.row.id);
		setTriagemModal(true);
		setLoading(false);
	};

	const handleEnviarTriagem = async () => {
		setLoading(true);
		const resTriagem = await dispatch(
			postEnviarTriagemAction(
				token,
				triagemId,
				registrosAprovados,
				registrosReprovados
			)
		);
		if (resTriagem) {
			toast.error('Falha ao enviar triagem');
			setLoading(false);
		} else {
			toast.success('Triagem enviada com sucesso!');
			setTriagemModal(false);
			setTriagemId('');
			setRegistrosAprovados([]);
			setRegistrosReprovados([]);
			setLoading(false);
		}
	};

	const Editar = (row) => {
		const [anchorEl, setAnchorEl] = useState(null);
		const [disabled, setDisabled] = useState(false);

		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleIniciarSelecao = async (row) => {
			setLoading(true);
			const resIniciarSelecao = await dispatch(
				postStatusAction(token, 'ativa', row.row.id)
			);
			if (resIniciarSelecao) {
				toast.error('Falha ao iniciar seleção');
				setLoading(false);
			} else {
				toast.success('Seleção iniciada com sucesso!');
				await dispatch(
					getVagasAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar,
						'publish'
					)
				);
				setLoading(false);
			}
		};
		const handleCancelar = async (row) => {
			setLoading(true);
			const resCancelar = await dispatch(
				postStatusAction(token, 'cancelada', row.row.id)
			);
			if (resCancelar) {
				toast.error('Falha ao cancelar vaga');
				setLoading(false);
			} else {
				toast.success('Vaga cancelada com sucesso!');
				setLoading(false);
				await dispatch(
					getVagasAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar,
						'publish'
					)
				);
			}
		};

		return (
			<>
				<Box>
					<IconButton
						style={{ height: '15px', width: '10px' }}
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreHorizIcon style={{}} />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem
							/* onClick={() => {
							setDadosVaga({
								...dadosVaga,
								empresa_id: row.empresa_id,
								categoria_id: row.categoria_id,
								titulo: row.titulo,
								formacao: row.formacao,
								faixa_salarial: row.faixa_salarial,
								modalidade: row.modalidade,
								tempo_minimo: row.tempo_minimo,
								diferenciais: row.diferenciais,
								experiencia: row.experiencia,
								descricao: row.descricao,
							});
							setCriarVagaModal(true);
							setEditarButton(true);
						}} */
							onClick={() => toast.warning('Em desenvolvimento')}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<EditIcon style={{ marginRight: '5px' }} />
							Editar
						</MenuItem>
						<MenuItem
							onClick={() => handleIniciarSelecao(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<CheckCircleIcon style={{ marginRight: '5px' }} />
							Iniciar seleção
						</MenuItem>
						<MenuItem
							onClick={() => handleCancelar(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<CancelIcon style={{ marginRight: '5px' }} />
							Cancelar
						</MenuItem>
						<MenuItem
							onClick={() => handleEnviarEmail(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<EmailIcon style={{ marginRight: '5px' }} />
							Enviar e-mail
						</MenuItem>
						<MenuItem
							onClick={() => handleTriagem(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<HowToRegIcon style={{ marginRight: '5px' }} />
							Triagem
						</MenuItem>
					</Menu>
				</Box>
			</>
		);
	};

	return (
		<Box className={classes.root}>
			<LoadingScreen isLoading={loading} />
			<Box className={classes.headerContainer}>
				<Box
					style={{
						marginBottom: '20px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						onClick={() => {
							setEmailModal(true);
						}}
						className={classes.pageTitle}
					>
						VAGAS
					</Typography>

					<Box style={{ alignSelf: 'flex-end' }}>
						<IconButton
							style={{
								backgroundColor: APP_CONFIG.mainCollors.backgrounds,
								color: APP_CONFIG.mainCollors.primaryVariant,
							}}
							onClick={() => window.location.reload(false)}
						>
							<RefreshIcon></RefreshIcon>
						</IconButton>
					</Box>
				</Box>
				<Grid container spacing={2}>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS TOTAIS"
							subtext={stats?.vagas ? stats.vagas.total : null}
							icon="paper"
						/>
					</Grid>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS ATIVAS"
							subtext={stats?.vagas ? stats.vagas.ativa : null}
							icon="pen"
						/>
					</Grid>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS INATIVAS"
							subtext={stats?.vagas ? stats.vagas.inativa : null}
							icon="paper"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2} style={{ marginTop: '7px' }}>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS CANCELADAS"
							subtext={stats?.vagas ? stats.vagas.cancelada : null}
							icon="paper"
						/>
					</Grid>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS EXPIRADAS"
							subtext={stats?.vagas ? stats.vagas.expirada : null}
							icon="person"
						/>
					</Grid>
					<Grid item sm={4} xs={12}>
						<CustomCardInfos
							text="VAGAS FINALIZADAS"
							subtext={stats?.vagas ? stats.vagas.finalizada : null}
							icon="pen"
						/>
					</Grid>
				</Grid>

				<Box
					style={{
						width: '100%',
						backgroundColor: APP_CONFIG.mainCollors.backgrounds,
						marginTop: '30px',
					}}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignContent="center"
						alignItems="center"
						style={{ margin: 30 }}
					>
						<TextField
							placeholder="Pesquisar por nome, documento, email..."
							size="small"
							variant="filled"
							InputProps={{ disableUnderline: true }}
							style={{
								backgroundColor: APP_CONFIG.mainCollors.backgrounds,
								width: '400px',
							}}
							onChange={(e) => {
								setPage(1);
								setFilters({
									...filters,
									like: e.target.value,
								});
							}}
						/>
						<CustomButton
							color="colorPrimary"
							onClick={() => setCriarVagaModal(true)}
						>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<CreateNewFolderIcon style={{ marginRight: '5px' }} />
								<Typography> NOVA VAGA</Typography>
							</Box>
						</CustomButton>
					</Box>
				</Box>
			</Box>

			<Box className={classes.tableContainer}>
				{vagas.data && vagas.per_page ? (
					<CustomTable
						columns={columns}
						data={vagas.data}
						Editar={Editar}
					/>
				) : (
					<Box>
						<LinearProgress color="secondary" />
					</Box>
				)}
				<Box
					display="flex"
					alignSelf="flex-end"
					marginTop="8px"
					justifyContent="space-between"
				>
					<Pagination
						variant="outlined"
						color="primary"
						size="large"
						count={vagas.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={criarVagaModal}
				onClose={() => {
					{
						setCriarVagaModal(false);
						setErrors({});
					}
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflowY: 'scroll',
				}}
				maxWidth="800px"
				fullWidth
			>
				<>
					<LoadingScreen isLoading={loading} />
					<Box
						style={{
							backgroundColor: APP_CONFIG.mainCollors.backgrounds,
							width: '800px',
							padding: '50px',
						}}
					>
						<Box style={{ marginTop: '10px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Sobre a vaga
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={8} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Título da oportunidade
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.titulo}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													titulo: e.target.value,
												})
											}
											error={errors?.titulo}
											helperText={
												errors?.titulo
													? errors?.titulo?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Modalidade
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.modalidade}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													modalidade: e.target.value,
												})
											}
											error={errors?.modalidade}
											helperText={
												errors?.modalidade
													? errors?.modalidade?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={8} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Descrição
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.descricao}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													descricao: e.target.value,
												})
											}
											error={errors?.descricao}
											helperText={
												errors?.descricao
													? errors?.descricao?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Faixa salarial
										</Typography>
										<CurrencyInput
											placeHolder=" "
											className={classes.currencyInput}
											thousandSeparator={'.'}
											decimalSeparator={','}
											prefix={'R$ '}
											value={dadosVaga.faixa_salarial}
											onChangeEvent={(
												event,
												maskedvalue,
												floatvalue
											) => {
												setDadosVaga({
													...dadosVaga,
													faixa_salarial: floatvalue,
												});
											}}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Empresa
										</Typography>
										<Select
											fullWidth
											variant="standard"
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													empresa_id: e.target.value,
												})
											}
										>
											{empresas?.data?.map((item) => (
												<MenuItem value={item.id} key={item.id}>
													{item.razao_social}
												</MenuItem>
											))}
										</Select>
										{errors?.empresa_id ? (
											<FormHelperText
												style={{
													fontSize: 14,
													textAlign: 'center',
													fontFamily: 'BwGradualDEMO-Regular',
													color: 'red',
												}}
											>
												{errors.empresa_id.join(' ')}
											</FormHelperText>
										) : null}
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Categoria
										</Typography>
										<Select
											fullWidth
											variant="standard"
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													categoria_id: e.target.value,
												})
											}
										>
											{categoria?.data?.map((item) => (
												<MenuItem value={item.id} key={item.id}>
													{item.nome}
												</MenuItem>
											))}
										</Select>
										{errors?.categoria_id ? (
											<FormHelperText
												style={{
													fontSize: 14,
													textAlign: 'center',
													fontFamily: 'BwGradualDEMO-Regular',
													color: 'red',
												}}
											>
												{errors.categoria_id.join(' ')}
											</FormHelperText>
										) : null}
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Box style={{ marginTop: '30px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Expectativas do candidato
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={12} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Formação
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.formacao}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													formacao: e.target.value,
												})
											}
											error={errors?.formacao}
											helperText={
												errors?.formacao
													? errors?.formacao?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={8} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Experiência
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.experiencia}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													experiencia: e.target.value,
												})
											}
											error={errors?.experiencia}
											helperText={
												errors?.experiencia
													? errors?.experiencia?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Tempo mínimo
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.tempo_minimo}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													tempo_minimo: e.target.value,
												})
											}
											error={errors?.tempo_minimo}
											helperText={
												errors?.tempo_minimo
													? errors?.tempo_minimo?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={12} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Diferenciais
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={dadosVaga.diferenciais}
											onChange={(e) =>
												setDadosVaga({
													...dadosVaga,
													diferenciais: e.target.value,
												})
											}
											error={errors?.diferenciais}
											helperText={
												errors?.diferenciais
													? errors?.diferenciais?.join(' ')
													: null
											}
											required
											fullWidth
										/>
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Box
							style={{
								display: 'flex',
								marginTop: '50px',
								alignSelf: 'center',
								justifyContent: 'center',
							}}
						>
							<CustomButton
								color="colorPrimary"
								onClick={() => handleCriarVaga()}
							>
								<Typography>Criar vaga</Typography>
							</CustomButton>
						</Box>
					</Box>
				</>
			</Dialog>
			<Dialog
				open={triagemModal}
				onClose={() => {
					setTriagemModal(false);
					setErrors({});
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflowY: 'scroll',
				}}
				maxWidth="800px"
				fullWidth
			>
				<>
					<Box
						style={{
							backgroundColor: APP_CONFIG.mainCollors.backgrounds,
							width: '800px',
							padding: '50px',
						}}
					>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						></Box>
						<Box style={{ marginTop: '10px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Triagem
							</Typography>
							<Box
								style={{
									width: '100%',
									backgroundColor: APP_CONFIG.mainCollors.backgrounds,
									marginTop: '30px',
								}}
							>
								<Box
									display="flex"
									alignContent="center"
									alignItems="center"
									style={{ margin: 30 }}
								>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
											}}
										>
											Experiência
										</Typography>
										<TextField
											type="number"
											placeholder="Digite aqui..."
											variant="filled"
											InputProps={{ disableUnderline: true }}
											style={{
												backgroundColor:
													APP_CONFIG.mainCollors.backgrounds,
												width: '100px',
											}}
											onChange={(e) => {
												setFilters({
													...filters,
													experiencia: e.target.value,
												});
											}}
										/>
									</Box>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginLeft: '10px',
										}}
									>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
											}}
										>
											Idade
										</Typography>
										<TextField
											type="number"
											placeholder="Digite aqui..."
											variant="filled"
											InputProps={{ disableUnderline: true }}
											style={{
												backgroundColor:
													APP_CONFIG.mainCollors.backgrounds,
												width: '100px',
											}}
											onChange={(e) => {
												setFilters({
													...filters,
													idade: e.target.value,
												});
											}}
										/>
									</Box>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginLeft: '10px',
										}}
									>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
											}}
										>
											Sexo
										</Typography>
										<Select
											style={{
												color: APP_CONFIG.mainCollors.secondary,
												width: '140px',
											}}
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={filters.sexo}
											onChange={(e) =>
												setFilters({
													...filters,
													sexo: e.target.value,
												})
											}
										>
											<MenuItem
												value={' '}
												style={{
													color: APP_CONFIG.mainCollors.secondary,
												}}
											>
												<Typography
													style={{
														fontFamily: 'BwGradualDEMO-Regular',
														color: APP_CONFIG.mainCollors.black,
													}}
												>
													Selecione aqui...
												</Typography>
											</MenuItem>
											<MenuItem
												value={'masculino'}
												style={{
													color: APP_CONFIG.mainCollors.secondary,
												}}
											>
												Masculino
											</MenuItem>
											<MenuItem
												value={'feminino'}
												style={{
													color: APP_CONFIG.mainCollors.secondary,
												}}
											>
												Feminino
											</MenuItem>
											<MenuItem
												value={'outro'}
												style={{
													color: APP_CONFIG.mainCollors.secondary,
												}}
											>
												Outro
											</MenuItem>
											<MenuItem
												value={'nao-informar'}
												style={{
													color: APP_CONFIG.mainCollors.secondary,
												}}
											>
												Não quero informar
											</MenuItem>
										</Select>
									</Box>
								</Box>
							</Box>
							<Box
								style={{
									marginTop: '30px',
									marginBottom: '30px',
									width: '100%',
									maxWidth: 900,
									padding: '10px',
								}}
							>
								<>
									{triagem.data && triagem.per_page ? (
										<>
											<Box minWidth={!matches ? '500px' : null}>
												<TableContainer
													style={{
														overflowX: 'auto',
														overflowY: 'hidden',
													}}
												>
													<CustomTable
														checkBoxAprovacoes
														data={triagem?.data}
														columns={columnsCandidatos}
														Editar={Editar}
													/>
												</TableContainer>
											</Box>
											<Box
												alignSelf="flex-end"
												marginTop="8px"
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<Pagination
													variant="outlined"
													color="secondary"
													size="large"
													count={triagem?.last_page}
													onChange={(e, value) =>
														setTriagemId(value)
													}
													page={page}
												/>

												{/* <Button
													style={{
														minWidth: '5px',
														height: '40px',
														borderRadius: '27px',
														border: 'solid',
														borderWidth: '1px',
														borderColor: 'grey',
													}}
													onClick={() => window.location.reload()}
												>
													<RefreshIcon
														style={{
															fontSize: 25,
															color: 'grey',
														}}
													/>
												</Button> */}
											</Box>
										</>
									) : (
										<LinearProgress />
									)}
								</>
							</Box>
							<Box
								style={{
									display: 'flex',
									marginTop: '30px',
									alignSelf: 'center',
									justifyContent: 'center',
								}}
							>
								<CustomButton
									color="colorPrimary"
									onClick={() => handleEnviarTriagem()}
								>
									<Typography>Triar</Typography>
								</CustomButton>
							</Box>
						</Box>
					</Box>
				</>
			</Dialog>
			<Dialog
				open={emailModal}
				onClose={() => {
					setEmailModal(false);
					setErrors({});
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflowY: 'scroll',
				}}
				maxWidth="800px"
				fullWidth
			>
				<>
					<Box
						style={{
							backgroundColor: APP_CONFIG.mainCollors.backgrounds,
							width: '800px',
							padding: '50px',
						}}
					>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						></Box>
						<Box style={{ marginTop: '10px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Enviar e-mail para candidatos da vaga
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={12} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Título
										</Typography>
										<TextField
											InputProps={{
												disableUnderline: true,
											}}
											variant="filled"
											value={dadosEmail.titulo}
											onChange={(e) =>
												setDadosEmail({
													...dadosEmail,
													titulo: e.target.value,
												})
											}
											/* error={errors?.name}
											helperText={
												errors?.name
													? errors?.name?.join(' ')
													: null
											} */

											required
											fullWidth
										/>
									</Grid>
								</Grid>
								<Box style={{ marginTop: '10px' }}>
									<Typography
										style={{
											fontFamily: 'BwGradualDEMO-Regular',
											color: APP_CONFIG.mainCollors.primaryVariant,
											fontSize: 13,
										}}
									>
										Conteúdo
									</Typography>

									<Box style={{ backgroundColor: 'white' }}>
										<Editor
											editorState={editorState}
											onEditorStateChange={handleEditorChange}
											wrapperClassName="email-editor-wrapper"
											editorClassName="email-editor"
										/>
									</Box>
								</Box>
							</Box>
							<Box
								style={{
									display: 'flex',
									marginTop: '30px',
									alignSelf: 'center',
									justifyContent: 'center',
								}}
							>
								<CustomButton
									color="colorPrimary"
									onClick={() => getEmailContent()}
								>
									<Typography>Enviar</Typography>
								</CustomButton>
							</Box>
						</Box>
					</Box>
				</>
			</Dialog>
		</Box>
	);
};

export default ListaVagas;
