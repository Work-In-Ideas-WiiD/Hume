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
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delDocumento,
	getAdministradorDiretoriaAction,
	getAdministradorEmpresaAction,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getContasAction,
	getContasExportAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	loadDocumentos,
	postAdministradorDiretoriaAction,
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ReactInputMask from 'react-input-mask';
import { DropzoneAreaBase } from 'material-ui-dropzone';

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
	dropzoneAreaBaseClasses: {
		width: '70%',
		height: '150px',
		backgroundColor: APP_CONFIG.mainCollors.backgrounds,
	},
	dropzoneContainer: {
		margin: '6px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '12px',
		minHeight: '422px',
		fontSize: '12px',
	},
	textoDropzone: {
		fontSize: '1.2rem',
		color: APP_CONFIG.mainCollors.primary,
	},
}));

const columns = [
	{ headerText: 'Nome', key: 'name' },
	{ headerText: 'E-mail', key: 'email' },

	{ headerText: '', key: 'menu' },
];

const ListaAdministradoresDiretoria = () => {
	const [filters, setFilters] = useState({
		like: '',
		order: '',
		mostrar: '',
	});
	const debouncedLike = useDebounce(filters.like, 800);
	const [loading, setLoading] = useState(false);
	const token = useAuth();
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const [criarAdminModal, setCriarAdminModal] = useState(false);
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const [cadastroAdm, setCadastroAdm] = useState({
		name: '',
		email: '',
	});
	const admDiretoria = useSelector((state) => state.admDiretoria);
	useEffect(() => {
		dispatch(
			getAdministradorDiretoriaAction(
				token,
				page,
				debouncedLike,
				filters.order,
				filters.mostrar
			)
		);
	}, [page, debouncedLike, filters.order, filters.mostrar]);

	const handleChangePage = (e, value) => {
		setPage(value);
	};

	const handleCriarAdmin = async () => {
		setLoading(true);
		const resCriarAdmin = await dispatch(
			postAdministradorDiretoriaAction(
				token,
				cadastroAdm.name,
				cadastroAdm.email
			)
		);
		if (resCriarAdmin) {
			toast.error('Erro ao criar administrador');
			setLoading(false);
			setCriarAdminModal(false);
			setErrors(resCriarAdmin);
		} else {
			toast.success('Administrador criado com sucesso!');
			setLoading(false);
			setCriarAdminModal(false);
			setCadastroAdm({ name: '', email: '' });
			await dispatch(
				getAdministradorDiretoriaAction(
					token,
					page,
					debouncedLike,
					filters.order,
					filters.mostrar
				)
			);
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

		return <Box></Box>;
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
						ADMINISTRADORES DIRETORIA
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
						/>
						<CustomButton
							color="colorPrimary"
							onClick={() => setCriarAdminModal(true)}
						>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<CreateNewFolderIcon style={{ marginRight: '5px' }} />
								<Typography> Cadastrar Admin</Typography>
							</Box>
						</CustomButton>
					</Box>
				</Box>
			</Box>

			<Box className={classes.tableContainer}>
				{admDiretoria.data && admDiretoria.per_page ? (
					<CustomTable
						columns={columns}
						data={admDiretoria.data}
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
						count={admDiretoria.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={criarAdminModal}
				onClose={() => setCriarAdminModal(false)}
			>
				<Box
					style={{
						backgroundColor: APP_CONFIG.mainCollors.backgrounds,
						width: '500px',
						padding: '50px',
					}}
				>
					<Typography
						style={{
							fontFamily: 'BwGradualDEMO-Bold',
							color: APP_CONFIG.mainCollors.primaryVariant,
						}}
					>
						Dados pessoais
					</Typography>
					<Box style={{ marginTop: '30px' }}>
						<Grid container spacing={3}>
							<Grid item sm={6} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Nome
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.name}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											name: e.target.value,
										})
									}
									autoFocus
									required
									fullWidth
								/>
							</Grid>
							<Grid item sm={6} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									E-mail
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.email}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											email: e.target.value,
										})
									}
									autoFocus
									required
									fullWidth
								/>
							</Grid>
						</Grid>
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
								onClick={() => handleCriarAdmin()}
							>
								<Typography>Salvar</Typography>
							</CustomButton>
						</Box>
					</Box>
				</Box>
			</Dialog>
		</Box>
	);
};

export default ListaAdministradoresDiretoria;
