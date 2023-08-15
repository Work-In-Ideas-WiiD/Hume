import {
	Box,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
	Grid,
	TextField,
	Checkbox,
	MenuItem,
	Select,
	IconButton,
	FormHelperText,
	Card,
	CardActionArea,
	CardMedia,
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import CustomButton from '../../components/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

/* import {
	postBuscarContaCPFAction,
	postBuscarContaCNPJAction,
	setCadastroEtapa1Action,
} from '../../actions/actions'; */
import ReactInputMask from 'react-input-mask';
import { APP_CONFIG } from '../../constants/config';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCep } from '../../services/services';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { postCandidatoAction } from '../../actions/actions';
import ClearIcon from '@material-ui/icons/Clear';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		// flexGrow: 1,
		// width: '100vw',
		// height: '100vh',

		[theme.breakpoints.down('1024')]: {
			flexDirection: 'column',
		},
	},

	leftBox: {
		display: 'flex',
		background: APP_CONFIG.mainCollors.primary,
		width: '50%',
		minHeight: '100vh',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'column',

		[theme.breakpoints.down('1024')]: {
			width: '100%',
			minHeight: '0px',
			height: '100%',
		},
	},
	rightBox: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		width: '50%',

		[theme.breakpoints.down('1024')]: {
			width: '100%',
		},
	},

	smallLogoContainer: {
		display: 'flex',
		alignSelf: 'flex-end',
	},
	bigLogoImg: {
		marginBottom: '-4px',
	},
	inputAutofill: {
		'& :-webkit-autofill': {
			'-webkit-text-fill-color': `${APP_CONFIG.mainCollors.primary} !important`,
		},
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: '5%',
		paddingRight: '5%',
		alignContent: 'center',
		justifyContent: 'center',
	},

	fieldsContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '20px',
		alignContent: 'center',
		justifyContent: 'center',
	},

	stepsContainer: {
		marginTop: '60px',
		flexDirection: 'column',
		display: 'flex',
	},

	stepContainer: {
		marginTop: '10px',
		flexDirection: 'row',
		display: 'flex',
		alignSelf: 'flex-start',
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
export default function Cadastro({ getNextEtapa, errorsEtapa1 }) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const [activeStep, setActiveStep] = useState(0);
	const [errors, setErrors] = useState({});
	const [filePreview, setFilePreview] = useState('');
	const [cadastro, setCadastro] = useState({
		name: '',
		email: '',
		cpf: '',
		telefone: '',
		arquivo: '',
		endereco: {
			cep: '',
			rua: '',
			numero: '',
			bairro: '',
			complemento: '',
			cidade: '',
			estado: '',
		},
		rg: '',
		conselho_regulador: '',
		data_nascimento: '',
		especialidade: '',
		estado_civil: '',
		grupo_atuante: '',
		nacionalidade: '',
		sexo: ' ',
		password: '',
		password_confirmation: '',
	});

	const handleCep = async () => {
		setLoading(true);
		try {
			const response = await getCep(cadastro.endereco.cep);
			setCadastro({
				...cadastro,
				endereco: {
					...cadastro.endereco,
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

	const handleCriarCandidato = async () => {
		setLoading(true);
		const resCriarCandidato = await dispatch(
			postCandidatoAction(
				cadastro.name,
				cadastro.email,
				cadastro.cpf,
				cadastro.telefone,
				cadastro.arquivo,
				cadastro.endereco.cep,
				cadastro.endereco.rua,
				cadastro.endereco.numero,
				cadastro.endereco.bairro,
				cadastro.endereco.complemento,
				cadastro.endereco.cidade,
				cadastro.endereco.estado,
				cadastro.rg,
				cadastro.conselho_regulador,
				cadastro.data_nascimento,
				cadastro.especialidade,
				cadastro.estado_civil,
				cadastro.grupo_atuante,
				cadastro.nacionalidade,
				cadastro.sexo,
				cadastro.password,
				cadastro.password_confirmation
			)
		);
		if (resCriarCandidato) {
			toast.error('Erro ao cadastrar');
			setLoading(false);

			setErrors(resCriarCandidato);
		} else {
			toast.success('Cadastro criado com sucesso!');
			setLoading(false);
		}
	};

	const handleDrop = (picture) => {
		setLoading(true);
		setCadastro({ ...cadastro, arquivo: picture });

		setLoading(false);
	};

	const steps = ['Seus dados', 'Dados complementares', 'Endereço', 'Senha'];

	const handleContinuar = async () => {
		if (activeStep === 0) {
			setActiveStep(1);
		}
		if (activeStep === 1) {
			setActiveStep(2);
		}
		if (activeStep === 2) {
			setActiveStep(3);
		}
		if (activeStep === 3) {
			handleCriarCandidato();
		}
	};

	const handleVoltar = () => {
		if (activeStep === 3) {
			setActiveStep(2);
		}
		if (activeStep === 2) {
			setActiveStep(1);
		}
		if (activeStep === 1) {
			setActiveStep(0);
		}
		if (activeStep === 0) {
			history.push('/login');
		}
	};

	useEffect(() => {
		console.log(cadastro);
	}, [cadastro]);

	return (
		<Box className={classes.root}>
			<LoadingScreen isLoading={loading} />
			<Box className={classes.leftBox}>
				<Stepper
					alternativeLabel
					style={{
						backgroundColor: 'inherit',
						width: '70%',
						marginTop: '100px',
						color: 'white',
					}}
					activeStep={activeStep}
				>
					{steps.map((label, index) => (
						<Step>
							<StepLabel>
								<Typography style={{ color: 'white' }}>
									{label}
								</Typography>
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignSelf: 'center',
					}}
				>
					<Box style={{ alignSelf: 'center' }}>
						<img
							style={{ alignSelf: 'center' }}
							src={APP_CONFIG.assets.imgCadastro}
							alt={''}
						/>
					</Box>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography
							style={{
								fontFamily: 'BwGradualDEMO-Bold',
								fontSize: 30,
								color: '#fff',
							}}
						>
							Mais de 300 vagas
						</Typography>
						<Typography
							style={{
								fontFamily: 'BwGradualDEMO-Bold',
								fontSize: 30,
								color: '#fff',
							}}
						>
							preenchidas por dia!
						</Typography>
					</Box>
				</Box>
				<Box
					style={{
						width: '30%',
						alignSelf: 'flex-end',
					}}
				>
					<img
						className={classes.bigLogoImg}
						src={APP_CONFIG.assets.logoCadastro2}
						alt={''}
					/>
				</Box>
			</Box>

			<Box className={classes.rightBox}>
				<Box
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
					}}
				>
					<Box style={{ padding: '50px' }}>
						<IconButton
							style={{
								borderRadius: 27,
								backgroundColor: APP_CONFIG.mainCollors.primary,
							}}
							onClick={handleVoltar}
						>
							<ArrowBackIcon style={{ color: '#fff' }} />
						</IconButton>
					</Box>
					<Box style={{ padding: '50px' }}>
						<img src={APP_CONFIG.assets.logoCadastro1} alt={'ddddd'} />
					</Box>
				</Box>

				<Box className={classes.titleContainer}>
					<Typography
						align="left"
						style={{
							fontSize: '29px',
							color: APP_CONFIG.mainCollors.secondary,
						}}
					>
						Para criarmos seu acesso, é necessário que preencha o
						formulário abaixo
					</Typography>

					<Box className={classes.fieldsContainer}>
						{activeStep === 0 ? (
							<>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Bold',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Seus dados
								</Typography>
								<Grid
									container
									spacing={4}
									style={{ marginTop: '25px' }}
								>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Nome completo
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.name}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													name: e.target.value,
												})
											}
											error={errors?.name}
											helperText={
												errors?.name
													? errors?.name?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											E-mail
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.email}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													email: e.target.value,
												})
											}
											error={errors?.email}
											helperText={
												errors?.email
													? errors?.email?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Sexo
										</Typography>
										<Select
											style={{
												color: APP_CONFIG.mainCollors.secondary,
											}}
											fullWidth
											variant="outlined"
											value={cadastro.sexo}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													sexo: e.target.value,
												})
											}
											error={errors?.sexo}
											helperText={
												errors?.sexo
													? errors?.sexo?.join(' ')
													: null
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
													Digite aqui...
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
										</Select>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											CPF
										</Typography>
										<ReactInputMask
											mask="999.999.999-99"
											value={cadastro.cpf}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													cpf: e.target.value,
												})
											}
										>
											{() => (
												<TextField
													className={classes.inputAutofill}
													variant="outlined"
													InputLabelProps={{ shrink: true }}
													fullWidth
													required
													placeholder="Digite aqui..."
													error={errors?.cpf}
													helperText={
														errors?.cpf
															? errors?.cpf?.join(' ')
															: null
													}
												/>
											)}
										</ReactInputMask>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											RG
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.rg}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													rg: e.target.value,
												})
											}
											error={errors?.rg}
											helperText={
												errors?.rg ? errors?.rg?.join(' ') : null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Telefone
										</Typography>
										<ReactInputMask
											mask="(99) 99999-9999"
											value={cadastro.telefone}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													telefone: e.target.value,
												})
											}
										>
											{() => (
												<TextField
													className={classes.inputAutofill}
													variant="outlined"
													InputLabelProps={{ shrink: true }}
													fullWidth
													required
													placeholder="Digite aqui..."
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
							</>
						) : activeStep === 1 ? (
							<>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Bold',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Dados complementares
								</Typography>
								<Grid
									container
									spacing={4}
									style={{ marginTop: '25px' }}
								>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Data de nascimento
										</Typography>
										<TextField
											fullWidth
											variant="outlined"
											InputLabelProps={{
												shrink: true,
												pattern: 'd {4}- d {2}- d {2} ',
											}}
											type="date"
											placeholder="Digite aqui..."
											value={cadastro.data_nascimento}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													data_nascimento: e.target.value,
												})
											}
											error={errors?.data_nascimento}
											helperText={
												errors?.data_nascimento
													? errors?.data_nascimento?.join(' ')
													: null
											}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Conselho regulador
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.conselho_regulador}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													conselho_regulador: e.target.value,
												})
											}
											error={errors?.conselho_regulador}
											helperText={
												errors?.conselho_regulador
													? errors?.conselho_regulador?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Especialidade
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.especialidade}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													especialidade: e.target.value,
												})
											}
											error={errors?.especialidade}
											helperText={
												errors?.especialidade
													? errors?.especialidade?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Grupo atuante
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.grupo_atuante}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													grupo_atuante: e.target.value,
												})
											}
											error={errors?.grupo_atuante}
											helperText={
												errors?.grupo_atuante
													? errors?.grupo_atuante?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Nacionalidade
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.nacionalidade}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													nacionalidade: e.target.value,
												})
											}
											error={errors?.nacionalidade}
											helperText={
												errors?.nacionalidade
													? errors?.nacionalidade?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Estado civil
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.estado_civil}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													estado_civil: e.target.value,
												})
											}
											error={errors?.estado_civil}
											helperText={
												errors?.estado_civil
													? errors?.estado_civil?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
								</Grid>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column',
										marginTop: '20px',
									}}
								>
									<Typography
										style={{
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: 14,
											color: APP_CONFIG.mainCollors.black,
											marginLeft: '13px',
										}}
									>
										Currículo
									</Typography>
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
										onAdd={handleDrop}
										filesLimit={1}
										dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
										showPreviews={false}
										showPreviewsInDropzone={false}
									/>
									{errors.arquivo ? (
										<FormHelperText
											style={{
												fontSize: 14,
												textAlign: 'center',
												fontFamily: 'BwGradualDEMO-Regular',
												color: 'red',
											}}
										>
											{errors.arquivo.join(' ')}
										</FormHelperText>
									) : null}
									<Grid item xs={6}>
										<Card className={classes.card}>
											<CardActionArea>
												<Box position="absolute">
													<IconButton
														onClick={() =>
															setCadastro({
																...cadastro,
																arquivo: '',
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
												{cadastro.arquivo ? (
													<PictureAsPdfIcon
														style={{
															color: 'black',
															fontSize: '70px',
														}}
													/>
												) : null}
											</CardActionArea>
										</Card>
									</Grid>
								</Box>
							</>
						) : activeStep === 2 ? (
							<>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Bold',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Endereço
								</Typography>
								<Grid
									container
									spacing={4}
									style={{ marginTop: '25px' }}
								>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											CEP
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.cep}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
														cep: e.target.value,
													},
												})
											}
											error={errors?.endereco?.cep}
											helperText={
												errors?.endereco?.cep
													? errors?.endereco?.cep?.join(' ')
													: null
											}
											onBlur={handleCep}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Rua
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.rua}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
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
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Número
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.numero}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
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
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Bairro
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.bairro}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
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
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Complemento
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.complemento}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
														complemento: e.target.value,
													},
												})
											}
											error={errors?.endereco?.complemento}
											helperText={
												errors?.endereco?.complemento
													? errors?.endereco?.complemento?.join(
															' '
													  )
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={3} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Cidade
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.cidade}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
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
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={3} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Estado
										</Typography>
										<TextField
											variant="outlined"
											value={cadastro.endereco.estado}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													endereco: {
														...cadastro.endereco,
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
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
								</Grid>
							</>
						) : activeStep === 3 ? (
							<>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Bold',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Senha
								</Typography>
								<Grid
									container
									spacing={4}
									style={{ marginTop: '25px' }}
								>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Senha
										</Typography>
										<TextField
											type="password"
											variant="outlined"
											value={cadastro.password}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													password: e.target.value,
												})
											}
											error={errors?.endereco?.password}
											helperText={
												errors?.endereco?.password
													? errors?.endereco?.password?.join(' ')
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Bold',
												fontSize: 14,
												color: APP_CONFIG.mainCollors.black,
												marginLeft: '13px',
											}}
										>
											Confirmar senha
										</Typography>
										<TextField
											type="password"
											variant="outlined"
											value={cadastro.password_confirmation}
											onChange={(e) =>
												setCadastro({
													...cadastro,
													password_confirmation: e.target.value,
												})
											}
											error={errors?.endereco?.password_confirmation}
											helperText={
												errors?.endereco?.password_confirmation
													? errors?.endereco?.password_confirmation?.join(
															' '
													  )
													: null
											}
											placeholder="Digite aqui..."
											autoFocus
											required
											fullWidth
										/>
									</Grid>
								</Grid>
							</>
						) : null}
					</Box>
					<Box
						style={{
							width: '30%',
							alignSelf: 'center',
							display: 'flex',
							marginTop: '40px',

							justifyContent: 'center',
						}}
					>
						<CustomButton
							variant="contained"
							color="colorTertiary"
							onClick={handleContinuar}
						>
							<Typography
								style={{
									fontSize: '10px',
									color: APP_CONFIG.mainCollors.primary,
								}}
							>
								CONTINUAR
							</Typography>
						</CustomButton>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
