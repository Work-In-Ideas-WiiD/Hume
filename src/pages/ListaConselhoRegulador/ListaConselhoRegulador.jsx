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
	CardMedia,
	Card,
	CardActionArea,
	FormHelperText,
	Modal,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delConselhoReguladorAction,
	delDocumento,
	getAdministradorEmpresaAction,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getConselhoReguladorAction,
	getContasAction,
	getContasExportAction,
	getEmpresasAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	loadDocumentos,
	postAdministradorEmpresaAction,
	postConselhoReguladorAction,
	postCriarAdminAction,
	postEmpresaAction,
	postStatusAction,
	postVincularaAdmEmpresaAction,
	putConselhoReguladorAction,
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
import { getCep, postConselhoRegulador } from '../../services/services';
import ClearIcon from '@material-ui/icons/Clear';
import InputMask from 'react-input-mask';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonIcon from '@mui/icons-material/Person';
import CommitIcon from '@mui/icons-material/Commit';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import 'moment/locale/pt-br';

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
		maxHeight: '10px',
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
		color: APP_CONFIG.mainCollors.primaryVariant,
	},
}));

const ListaConselhoRegulador = () => {
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
	const [cadastrarModal, setCadastrarModal] = useState(false);
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});

	const conselhoRegulador = useSelector((state) => state.conselhoRegulador);
	const [cadastro, setCadastro] = useState({
		nome: '',
	});
	moment.locale();

	const columns = [
		{
			headerText: 'Data',
			key: 'created_at',
			CustomValue: (created_at) => {
				return (
					<>
						<Typography>
							{moment.utc(created_at).format('DD MMMM')}
						</Typography>
					</>
				);
			},
		},
		{ headerText: 'Nome', key: 'nome' },
		{ headerText: 'ID', key: 'id' },
		{ headerText: '', key: 'menu' },
	];

	useEffect(() => {
		dispatch(
			getConselhoReguladorAction(
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

	const handleCadastrar = async () => {
		setLoading(true);
		const resCadastrar = await dispatch(
			postConselhoReguladorAction(token, cadastro.nome)
		);
		if (resCadastrar) {
			toast.error('Erro ao cadastrar');
			setLoading(false);
			setErrors(resCadastrar);
		} else {
			toast.success('Cadastro feito com sucesso!');
			setLoading(false);
			setCadastrarModal(false);
			setCadastro({
				nome: '',
			});
			await dispatch(
				getConselhoReguladorAction(
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
		const [cadastrarModalEditar, setCadastrarModalEditar] = useState(false);
		const [cadastroEditar, setCadastroEditar] = useState({
			nome: '',
			id: '',
		});
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		useEffect(() => {
			console.log(cadastroEditar);
		}, [cadastroEditar]);

		const handleEditar = (row) => {
			setCadastroEditar({
				...cadastroEditar,
				nome: row.row.nome,
				id: row.row.id,
			});
			setCadastrarModalEditar(true);
		};

		const handleEditarCadastro = async () => {
			setLoading(true);
			const resCadastrar = await dispatch(
				putConselhoReguladorAction(
					token,
					cadastroEditar.nome,
					cadastroEditar.id
				)
			);
			if (resCadastrar) {
				toast.error('Erro ao editar');
				setLoading(false);
				setErrors(resCadastrar);
			} else {
				toast.success('Cadastro editado com sucesso!');
				setLoading(false);
				setCadastrarModal(false);
				setCadastroEditar({
					nome: '',
				});
				await dispatch(
					getConselhoReguladorAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar
					)
				);
			}
		};

		const handleExcluirCadastro = async (row) => {
			setLoading(true);
			const resDelCandidato = await dispatch(
				delConselhoReguladorAction(token, row.row.id)
			);
			if (resDelCandidato) {
				setLoading(false);
				toast.error('Erro ao deletar cadastro');
			} else {
				setLoading(false);
				toast.success('Cadastro deletado com sucesso!');
				await dispatch(
					getConselhoReguladorAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar
					)
				);
			}
		};

		return (
			<>
				<IconButton
					style={{ height: '15px', width: '10px' }}
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreHorizIcon style={{}} />
				</IconButton>
				<Menu
					onClick={() => {}}
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem
						style={{ color: APP_CONFIG.mainCollors.black }}
						onClick={() => {
							handleEditar(row);
						}}
					>
						<EditIcon style={{ marginRight: '5px' }} />
						Editar
					</MenuItem>

					<MenuItem
						style={{ color: APP_CONFIG.mainCollors.black }}
						onClick={() => handleExcluirCadastro(row)}
					>
						<CancelIcon style={{ marginRight: '5px' }} />
						Excluir
					</MenuItem>
				</Menu>
				<Dialog
					open={cadastrarModalEditar}
					onClose={() => {
						{
							setCadastrarModalEditar(false);
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
									Dados do Conselho Regulador
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
												Nome
											</Typography>
											<TextField
												InputProps={{ disableUnderline: true }}
												variant="filled"
												value={cadastroEditar.nome}
												onChange={(e) =>
													setCadastroEditar({
														...cadastroEditar,
														nome: e.target.value,
													})
												}
												required
												fullWidth
											/>
										</Grid>
									</Grid>
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
										onClick={() => handleEditarCadastro()}
									>
										<Typography>Editar</Typography>
									</CustomButton>
								</Box>
							</Box>
						</Box>
					</>
				</Dialog>
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
					<Typography className={classes.pageTitle}>
						Gerenciar Conselho Regulador
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
							onClick={() => setCadastrarModal(true)}
						>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<CreateNewFolderIcon style={{ marginRight: '5px' }} />
								<Typography> Cadastrar </Typography>
							</Box>
						</CustomButton>
					</Box>
				</Box>
			</Box>

			<Box className={classes.tableContainer}>
				{conselhoRegulador.data && conselhoRegulador.per_page ? (
					<CustomTable
						columns={columns}
						data={conselhoRegulador.data}
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
						count={conselhoRegulador.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={cadastrarModal}
				onClose={() => {
					{
						setCadastrarModal(false);
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
								Dados do Conselho Regulador
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
											Nome
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastro.nome}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													nome: e.target.value,
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
									onClick={() => handleCadastrar()}
								>
									<Typography>Cadastrar</Typography>
								</CustomButton>
							</Box>
						</Box>
					</Box>
				</>
			</Dialog>
		</Box>
	);
};

export default ListaConselhoRegulador;
