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
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delCandidatoAction,
	delDocumento,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getContasAction,
	getContasExportAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	getVagasAction,
	loadDocumentos,
	postCriarAdminAction,
	postStatusAction,
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
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { toPairs } from 'lodash';
import CustomCardInfos from '../../components/CustomCardInfos/CustomCardInfos';
import EmailIcon from '@mui/icons-material/Email';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

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

const ListaProcessoSelecao = () => {
	const [filters, setFilters] = useState({
		like: '',
		order: '',
		mostrar: '',
		status: ' ',
	});
	const debouncedLike = useDebounce(filters.like, 800);
	const [loading, setLoading] = useState(false);
	const token = useAuth();
	const classes = useStyles();
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();
	const vagas = useSelector((state) => state.vagas);
	useEffect(() => {
		dispatch(
			getVagasAction(
				token,
				page,
				debouncedLike,
				filters.order,
				filters.mostrar,
				'ativa'
			)
		);
	}, [page, debouncedLike, filters.order, filters.mostrar, filters.status]);

	const handleChangePage = (e, value) => {
		setPage(value);
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

		const handlePausar = async (row) => {
			setLoading(true);
			const resPausar = await dispatch(
				postStatusAction(token, 'inativa', row.row.id)
			);
			if (resPausar) {
				toast.error('Falha ao pausar vaga');
				setLoading(false);
			} else {
				toast.success('Vaga pausada com sucesso!');
				setLoading(false);
				await dispatch(
					getVagasAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar,
						'ativa'
					)
				);
			}
		};

		const handleReiniciar = async (row) => {
			setLoading(true);
			const resIniciarSelecao = await dispatch(
				postStatusAction(token, 'ativa', row.row.id)
			);
			if (resIniciarSelecao) {
				toast.error('Falha ao iniciar seleção');
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
			} else {
				toast.success('Seleção iniciada com sucesso!');
				setLoading(false);
			}
		};

		return (
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
						onClick={() => toast.warning('Em desenvolvimento')}
						style={{ color: APP_CONFIG.mainCollors.black }}
					>
						<PersonIcon style={{ marginRight: '5px' }} />
						Triar candidatos
					</MenuItem>
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
					{row.row.status === 'inativa' ? (
						<MenuItem
							onClick={() => handleReiniciar(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<PauseCircleIcon style={{ marginRight: '5px' }} />
							Reinicar
						</MenuItem>
					) : (
						<MenuItem
							onClick={() => handlePausar(row)}
							style={{ color: APP_CONFIG.mainCollors.black }}
						>
							<PauseCircleIcon style={{ marginRight: '5px' }} />
							Pausar
						</MenuItem>
					)}

					<MenuItem
						onClick={() => toast.warning('Em desenvolvimento')}
						style={{ color: APP_CONFIG.mainCollors.black }}
					>
						<CancelIcon style={{ marginRight: '5px' }} />
						Enviar e-mails
					</MenuItem>
				</Menu>
			</Box>
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
					<Typography className={classes.pageTitle}>
						PROCESSO DE SELEÇÃO
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

				<Box
					style={{
						width: '100%',
						backgroundColor: APP_CONFIG.mainCollors.backgrounds,
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
							/* onChange={(e) =>
							
							setFilters({
								...filters,
								like: e.target.value,
							})
						} */
							onChange={(e) => {
								setPage(1);
								setFilters({
									...filters,
									like: e.target.value,
								});
							}}
						></TextField>

						<Box>
							{/* <CustomButton
								onClick={() => {
									setOpen(true);
								}}
							>
								<Box display="flex" alignItems="center">
									Criar Administrador
								</Box>
							</CustomButton> */}
						</Box>
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
		</Box>
	);
};

export default ListaProcessoSelecao;
