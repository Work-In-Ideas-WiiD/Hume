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
	delDocumento,
	getAdministradorEmpresaAction,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getContasAction,
	getContasExportAction,
	getEmpresasAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	loadDocumentos,
	postAdministradorEmpresaAction,
	postCriarAdminAction,
	postEmpresaAction,
	postStatusAction,
	postVincularaAdmEmpresaAction,
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
import InputMask from 'react-input-mask';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonIcon from '@mui/icons-material/Person';
import CommitIcon from '@mui/icons-material/Commit';

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

const ListaEmpresas = () => {
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
	const [logoEmpresa, setLogoEmpresa] = useState({});
	/* const [confirmationModal, setConfirmationModal] = useState(false); */

	const empresas = useSelector((state) => state.empresas);
	const [cadastroEmpresa, setCadastroEmpresa] = useState({
		name: '',
		razao_social: '',
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

	const columns = [
		{ headerText: 'Nome', key: 'nome' },
		{ headerText: 'CNPJ', key: 'cnpj' },
		{ headerText: 'E-mail', key: 'email' },
	];

	useEffect(() => {
		dispatch(
			getEmpresasAction(
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
			const response = await getCep(cadastroEmpresa.endereco.cep);
			setCadastroEmpresa({
				...cadastroEmpresa,
				endereco: {
					...cadastroEmpresa.endereco,
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
			toast.error('CEP não encontrado');
			setLoading(false);
		}
	};

	const handleDrop = (event) => {
		console.log(event.target.files[0]);
		setLoading(true);
		const imagem = event.target.files[0];
		console.log(imagem);
		setCadastroEmpresa({ ...cadastroEmpresa, imagem: imagem });
		setFilePreview(URL.createObjectURL(event.target.files[0]));
		setLogoEmpresa(imagem);
		setLoading(false);
	};

	const hiddenFileInput = React.useRef(null);

	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	const handleCriarAdmin = async () => {
		setLoading(true);
		const resCriarAdmin = await dispatch(
			postEmpresaAction(
				token,
				cadastroEmpresa.name,
				cadastroEmpresa.razao_social,
				cadastroEmpresa.email,
				cadastroEmpresa.cnpj,
				cadastroEmpresa.telefone,
				logoEmpresa,
				cadastroEmpresa.endereco.cep,
				cadastroEmpresa.endereco.rua,
				cadastroEmpresa.endereco.numero,
				cadastroEmpresa.endereco.bairro,
				cadastroEmpresa.endereco.complemento,
				cadastroEmpresa.endereco.cidade,
				cadastroEmpresa.endereco.estado
			)
		);
		if (resCriarAdmin) {
			toast.error('Erro ao criar empresa');
			setLoading(false);
			setErrors(resCriarAdmin);
		} else {
			toast.success('Empresa cadastrada com sucesso!');
			setLoading(false);
			setCriarAdminModal(false);
			setCadastroEmpresa({
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
			await dispatch(
				getEmpresasAction(
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
					<Typography className={classes.pageTitle}>EMPRESAS</Typography>
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
								<Typography> Cadastrar </Typography>
							</Box>
						</CustomButton>
					</Box>
				</Box>
			</Box>

			<Box className={classes.tableContainer}>
				{empresas.data && empresas.per_page ? (
					<CustomTable
						columns={columns}
						data={empresas.data}
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
						count={empresas.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={criarAdminModal}
				onClose={() => {
					{
						setCriarAdminModal(false);
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
						>
							<Box
								style={{
									display: 'flex',
									borderRadius: 60,
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid gray',
									height: 100,
									width: 100,
									backgroundColor: '#fff',
								}}
							>
								{cadastroEmpresa.imagem === '' ? (
									<>
										<PersonIcon
											style={{
												fontSize: '30px',
												color: APP_CONFIG.mainCollors.black,
											}}
										/>
									</>
								) : (
									<>
										<CardMedia
											style={{
												height: 100,
												width: 100,
												borderRadius: 60,
											}}
											component="img"
											alt={cadastroEmpresa.imagem[0]?.path}
											height="100"
											src={filePreview ? filePreview : null}
											onClick={() =>
												window.open(
													filePreview ? filePreview : null
												)
											}
										/>
									</>
								)}
							</Box>
							<Box style={{ marginTop: '20px' }}>
								<input
									type="file"
									ref={hiddenFileInput}
									onChange={handleDrop}
									style={{ display: 'none' }}
								/>
								<CustomButton
									color="colorTertiary"
									onClick={handleClick}
									ref={hiddenFileInput}
								>
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<UploadFileIcon style={{ marginRight: '5px' }} />
										<Typography>Fazer upload</Typography>
									</Box>
								</CustomButton>
							</Box>
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
						</Box>
						<Box style={{ marginTop: '10px' }}>
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
											value={cadastroEmpresa.name}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													name: e.target.value,
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
								<Grid container spacing={3}>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Razão social
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.razao_social}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													razao_social: e.target.value,
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
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											E-mail
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.email}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													email: e.target.value,
												})
											}
											error={errors?.email}
											helperText={
												errors?.email
													? errors?.email?.join(' ')
													: null
											}
											required
											fullWidth
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
											CNPJ
										</Typography>
										<InputMask
											mask={'99.999.999/9999-99'}
											value={cadastroEmpresa.cnpj}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													cnpj: e.target.value,
												})
											}
										>
											{() => (
												<TextField
													InputProps={{ disableUnderline: true }}
													variant="filled"
													InputLabelProps={{ shrink: true }}
													error={errors?.cnpj}
													helperText={
														errors?.cnpj
															? errors?.cnpj?.join(' ')
															: null
													}
													required
													fullWidth
												/>
											)}
										</InputMask>
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
											Telefone
										</Typography>
										<ReactInputMask
											mask="(99) 99999-9999"
											value={cadastroEmpresa.telefone}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
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
								</Grid>
							</Box>
						</Box>
						<Box style={{ marginTop: '60px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Endereço
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											CEP
										</Typography>
										<InputMask
											mask={'99999-999'}
											value={cadastroEmpresa.endereco.cep}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														cep: e.target.value,
													},
												})
											}
											onBlur={handleCep}
										>
											{() => (
												<TextField
													InputProps={{ disableUnderline: true }}
													variant="filled"
													InputLabelProps={{ shrink: true }}
													error={errors['endereco.cep']}
													helperText={
														errors['endereco.cep']
															? errors['endereco.cep'].join(' ')
															: null
													}
													required
													fullWidth
												/>
											)}
										</InputMask>
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
											Rua
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.endereco.rua}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														rua: e.target.value,
													},
												})
											}
											error={errors['endereco.rua']}
											helperText={
												errors['endereco.rua']
													? errors['endereco.rua'].join(' ')
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
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Número
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.endereco.numero}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														numero: e.target.value,
													},
												})
											}
											error={errors['endereco.numero']}
											helperText={
												errors['endereco.numero']
													? errors['endereco.numero'].join(' ')
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
											Bairro
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.endereco.bairro}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														bairro: e.target.value,
													},
												})
											}
											error={errors['endereco.bairro']}
											helperText={
												errors['endereco.bairro']
													? errors['endereco.bairro'].join(' ')
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
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Complemento
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.endereco.complemento}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														complemento: e.target.value,
													},
												})
											}
											error={errors['endereco.complemento']}
											helperText={
												errors['endereco.complemento']
													? errors['endereco.complemento'].join(
															' '
													  )
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
											Cidade
										</Typography>
										<TextField
											InputProps={{
												disableUnderline: true,
												sx: { borderRadius: 0 },
											}}
											variant="filled"
											value={cadastroEmpresa.endereco.cidade}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														cidade: e.target.value,
													},
												})
											}
											error={errors['endereco.cidade']}
											helperText={
												errors['endereco.cidade']
													? errors['endereco.cidade'].join(' ')
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
											Estado
										</Typography>
										<TextField
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={cadastroEmpresa.endereco.estado}
											onChange={(e) =>
												setCadastroEmpresa({
													...cadastroEmpresa,
													endereco: {
														...cadastroEmpresa.endereco,
														estado: e.target.value,
													},
												})
											}
											error={errors['endereco.estado']}
											helperText={
												errors['endereco.estado']
													? errors['endereco.estado'].join(' ')
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
									marginTop: '30px',
									alignSelf: 'center',
									justifyContent: 'center',
								}}
							>
								<CustomButton
									color="colorPrimary"
									onClick={() => handleCriarAdmin()}
								>
									<Typography>Cadastrar</Typography>
								</CustomButton>
							</Box>
						</Box>
					</Box>
				</>
			</Dialog>
			{/* <Dialog
				open={confirmationModal}
				onClose={() => {
					{
						setConfirmationModal(false);
					}
				}}
			>
				<Typography>Deseja vincular o candidato a essa vaga?</Typography>
			</Dialog> */}
		</Box>
	);
};

export default ListaEmpresas;
