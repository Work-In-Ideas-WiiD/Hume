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
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delDocumento,
	getAdministradorEmpresaAction,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getContasAction,
	getContasExportAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	loadDocumentos,
	postAdministradorEmpresaAction,
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
import { getCep } from '../../services/services';
import ClearIcon from '@material-ui/icons/Clear';

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

const columns = [
	{ headerText: 'Nome da empresa', key: 'name' },
	{ headerText: 'E-mail', key: 'email' },
	{ headerText: 'Telefone', key: 'empresa_administrador.telefone' },
	{ headerText: '', key: 'menu' },
];

const ListaAdministradoresEmpresa = () => {
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
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [filePreview, setFilePreview] = useState('');
	const [cadastroAdm, setCadastroAdm] = useState({
		name: '',
		email: '',
		cnpj: '',
		telefone: '',
		imagem: '',
		endereco: {
			cep: '',
			rua: '',
			numero: '',
			bairro: '',
			complemento: '',
			cidade: '',
			estado: '',
		},
	});
	const admEmpresa = useSelector((state) => state.admEmpresa);
	useEffect(() => {
		dispatch(
			getAdministradorEmpresaAction(
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
	const handleCep = async () => {
		setLoading(true);
		try {
			const response = await getCep(cadastroAdm.endereco.cep);
			setCadastroAdm({
				...cadastroAdm,
				endereco: {
					...cadastroAdm.endereco,
					cep: response.data.cep,
					rua: response.data.logradouro,
					complemento: response.data.complemento,
					bairro: response.data.bairro,
					cidade: response.data.localidade,
					estado: response.data.uf,
				},
			});
			setLoading(false);
		} catch (error) {
			toast.error('Dados inválidos');
			setLoading(false);
		}
	};

	const handleDrop = (picture) => {
		setLoading(true);
		setCadastroAdm({ ...cadastroAdm, imagem: picture });
		console.log(picture);
		const logo = { ...picture };

		setFilePreview(URL.createObjectURL(logo[0]));
		setLoading(false);
	};
	useEffect(() => {
		console.log(errors?.endereco?.bairro);
	}, [errors]);

	const handleCriarAdmin = async () => {
		setLoading(true);
		const resCriarAdmin = await dispatch(
			postAdministradorEmpresaAction(
				token,
				cadastroAdm.name,
				cadastroAdm.email,
				cadastroAdm.cnpj,
				cadastroAdm.telefone,
				cadastroAdm.imagem,
				cadastroAdm.endereco.cep,
				cadastroAdm.endereco.rua,
				cadastroAdm.endereco.numero,
				cadastroAdm.endereco.bairro,
				cadastroAdm.endereco.complemento,
				cadastroAdm.endereco.cidade,
				cadastroAdm.endereco.estado
			)
		);
		if (resCriarAdmin) {
			toast.error('Erro ao criar administrador');
			setLoading(false);
			setErrors(resCriarAdmin);
		} else {
			toast.success('Administrador criado com sucesso!');
			setLoading(false);
			setCriarAdminModal(false);
			await dispatch(
				getAdministradorEmpresaAction(
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

		return (
			<Box>
				{/* <IconButton
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
						onClick={() => handleIniciarSelecao(row)}
						style={{ color: APP_CONFIG.mainCollors.black }}
					>
						<CheckCircleIcon style={{ marginRight: '5px' }} />
						Iniciar Seleção
					</MenuItem>
					
				</Menu> */}
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
						ADMINISTRADORES EMPRESA
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
				{admEmpresa.data && admEmpresa.per_page ? (
					<CustomTable
						columns={columns}
						data={admEmpresa.data}
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
						count={admEmpresa.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={criarAdminModal}
				onClose={() => setCriarAdminModal(false)}
			>
				<LoadingScreen isLoading={loading} />
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
						Dados da empresa
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
									Razão social
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
									error={errors?.name}
									helperText={
										errors?.name ? errors?.name?.join(' ') : null
									}
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
									error={errors?.email}
									helperText={
										errors?.email ? errors?.email?.join(' ') : null
									}
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
									CNPJ
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.cnpj}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											cnpj: e.target.value,
										})
									}
									error={errors?.cnpj}
									helperText={
										errors?.cnpj ? errors?.cnpj?.join(' ') : null
									}
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
									Telefone
								</Typography>
								<ReactInputMask
									mask="(99) 99999-9999"
									value={cadastroAdm.telefone}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											telefone: e.target.value,
										})
									}
								>
									{() => (
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											InputLabelProps={{ shrink: true }}
											fullWidth
											required
											type="tel"
											error={errors?.telefone}
											helperText={
												errors?.telefone
													? errors?.telefone?.join(' ')
													: null
											}
										/>
									)}
								</ReactInputMask>
							</Grid>

							<Grid item sm={4} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									CEP
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.cep}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												cep: e.target.value,
											},
										})
									}
									error={errors['endereco.cep']}
									helperText={
										errors['endereco.cep']
											? errors['endereco.cep'].join(' ')
											: null
									}
									onBlur={handleCep}
									required
									fullWidth
								/>
							</Grid>
							<Grid item sm={8} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Rua
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.rua}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												rua: e.target.value,
											},
										})
									}
									error={errors?.endereco?.rua}
									helperText={
										errors?.endereco?.rua
											? errors?.endereco?.rua?.join(' ')
											: null
									}
									required
									fullWidth
								/>
							</Grid>
							<Grid item sm={3} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Número
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.numero}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												numero: e.target.value,
											},
										})
									}
									error={errors?.endereco?.numero}
									helperText={
										errors?.endereco?.numero
											? errors?.endereco?.numero?.join(' ')
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
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Bairro
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.bairro}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												bairro: e.target.value,
											},
										})
									}
									error={errors?.endereco?.bairro}
									helperText={
										errors?.endereco?.bairro
											? errors?.endereco?.bairro?.join(' ')
											: null
									}
									required
									fullWidth
								/>
							</Grid>
							<Grid item sm={5} xs={12}>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Complemento
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.complemento}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												complemento: e.target.value,
											},
										})
									}
									error={errors?.endereco?.complemento}
									helperText={
										errors?.endereco?.complemento
											? errors?.endereco?.complemento?.join(' ')
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
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Cidade
								</Typography>
								<TextField
									InputProps={{
										disableUnderline: true,
										sx: { borderRadius: 0 },
									}}
									variant="filled"
									value={cadastroAdm.endereco.cidade}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												cidade: e.target.value,
											},
										})
									}
									error={errors?.endereco?.cidade}
									helperText={
										errors?.endereco?.cidade
											? errors?.endereco?.cidade?.join(' ')
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
										color: APP_CONFIG.mainCollors.primaryVariant,
										fontSize: 13,
									}}
								>
									Estado
								</Typography>
								<TextField
									InputProps={{ disableUnderline: true }}
									variant="filled"
									value={cadastroAdm.endereco.estado}
									onChange={(e) =>
										setCadastroAdm({
											...cadastroAdm,
											endereco: {
												...cadastroAdm.endereco,
												estado: e.target.value,
											},
										})
									}
									error={errors?.endereco?.estado}
									helperText={
										errors?.endereco?.estado
											? errors?.endereco?.estado?.join(' ')
											: null
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
							flexDirection: 'column',
							marginTop: '30px',
						}}
					>
						<Typography
							style={{
								fontFamily: 'BwGradualDEMO-Bold',
								color: APP_CONFIG.mainCollors.primaryVariant,
							}}
						>
							Logo da empresa
						</Typography>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								marginTop: '20px',
							}}
						>
							<Box className={classes.dropzoneContainer} boxShadow={3}>
								<DropzoneAreaBase
									dropzoneParagraphClass={classes.textoDropzone}
									maxFileSize={10000000}
									onDropRejected={() => {
										toast.error('Tamanho máximo: 10mb');
										toast.error(
											'Arquivos suportados: .pdf .png .jpg .jpeg'
										);
									}}
									acceptedFiles={['image/*', 'application/pdf']}
									dropzoneClass={classes.dropzoneAreaBaseClasses}
									onDrop={handleDrop}
									filesLimit={1}
									dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
								/>
								{errors.imagem ? (
									<FormHelperText
										style={{
											fontSize: 14,
											textAlign: 'center',
											fontFamily: 'BwGradualDEMO-Regular',
											color: 'red',
										}}
									>
										{errors.imagem.join(' ')}
									</FormHelperText>
								) : null}
								<Grid item xs={6}>
									<Card className={classes.card}>
										<CardActionArea>
											<Box position="absolute">
												<IconButton
													onClick={() =>
														setCadastroAdm({
															...cadastroAdm,
															imagem: '',
														})
													}
													size="small"
													style={{
														color: 'white',
														backgroundColor: 'red',
													}}
												>
													<ClearIcon />
												</IconButton>
											</Box>
											{cadastroAdm.imagem ? (
												<CardMedia
													component="img"
													alt={cadastroAdm.imagem[0].path}
													height="100"
													src={filePreview ? filePreview : null}
													onClick={() =>
														window.open(
															filePreview ? filePreview : null
														)
													}
												/>
											) : null}
										</CardActionArea>
									</Card>
								</Grid>
							</Box>

							<Box style={{ marginTop: '30px' }}>
								<CustomButton
									color="colorPrimary"
									onClick={() => handleCriarAdmin()}
								>
									<Typography>Salvar</Typography>
								</CustomButton>
							</Box>
						</Box>
					</Box>
				</Box>
			</Dialog>
		</Box>
	);
};

export default ListaAdministradoresEmpresa;
