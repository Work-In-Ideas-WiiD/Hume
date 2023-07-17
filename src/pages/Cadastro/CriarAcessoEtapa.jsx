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
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import CustomButton from '../../components/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
	postBuscarContaCPFAction,
	postBuscarContaCNPJAction,
	setCadastroEtapa1Action,
} from '../../actions/actions';
import ReactInputMask from 'react-input-mask';
import { APP_CONFIG } from '../../constants/config';

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
		background: APP_CONFIG.mainCollors.primaryGradient,
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
		width: '100px',
		height: '100px',
		alignItems: 'center',
		justifyContent: 'center',
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
}));
export default function CriarAcessoEtapa({ getNextEtapa, errorsEtapa1 }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState({});
	const { section, id, subsection } = useParams();
	const [validarConfirmacaoEmail, setValidarConfirmacaoEmail] = useState('');
	const [fillCheckboxSim, setFillCheckboxSim] = useState(false);
	const [fillCheckboxNao, setFillCheckboxNao] = useState(false);

	const [dadosEtapa1, setDadosEtapa1] = useState({
		nome: '',
		documento: '',
		nome_socio: '',
		documento_socio: '',
		email_socio: '',
		celular_socio: '',
		tipo_empresa: ' ',
		consultor: null,
	});
	const responseVerificarCNPJ = useSelector((state) => state.verificarCNPJ);

	const handleContinuar = async () => {
		const resBuscarCPF = await dispatch(
			postBuscarContaCPFAction(dadosEtapa1.documento_socio)
		);
		if (resBuscarCPF) {
			const resBuscarCNPJ = await dispatch(
				postBuscarContaCNPJAction(dadosEtapa1.documento)
			);
			if (resBuscarCNPJ) {
				if (
					dadosEtapa1.nome === '' ||
					dadosEtapa1.documento === '' ||
					dadosEtapa1.nome_socio === '' ||
					dadosEtapa1.documento_socio === '' ||
					dadosEtapa1.email_socio === '' ||
					dadosEtapa1.celular_socio === '' ||
					dadosEtapa1.tipo_empresa === ' ' ||
					dadosEtapa1.consultor === null
				) {
					/* setErrors(resBuscarCNPJ); */
					toast.error('Preencha todos os campos');
				} else {
					if (dadosEtapa1.email_socio === validarConfirmacaoEmail) {
						getNextEtapa({ dadosEtapa1 });
					} else {
						toast.error('Campo confirmar e-mail não confere');
					}
				}
			} else {
				if (responseVerificarCNPJ.status === 'pending') {
					history.push('/cadastro/conta-cadastrada');
				} else {
					toast.error('CNPJ já possui cadastro de conta');
				}
			}
		} else {
			history.push('/cadastro/criar-conta-pj');
		}
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.leftBox}>
				<Stepper
					alternativeLabel
					style={{
						backgroundColor: 'inherit',
						width: '70%',
						marginTop: '100px',
					}}
				>
					<Step style={{ color: 'white' }}>
						<StepLabel>
							<Typography style={{ color: 'white' }}>
								Seus dados
							</Typography>
						</StepLabel>
					</Step>
					<Step>
						<StepLabel>
							<Typography style={{ color: 'white' }}>
								Dados da empresa
							</Typography>
						</StepLabel>
					</Step>
					<Step>
						<StepLabel>
							<Typography style={{ color: 'white' }}>Senha</Typography>
						</StepLabel>
					</Step>
				</Stepper>
				<Box
					style={{
						width: '50%',
						alignSelf: 'flex-end',
					}}
				>
					<img
						className={classes.bigLogoImg}
						src={APP_CONFIG.assets.backgroundLogo}
						alt={''}
					/>
				</Box>
			</Box>

			<Box className={classes.rightBox}>
				<Box className={classes.smallLogoContainer}>
					<img
						src={APP_CONFIG.assets.smallColoredLogo}
						alt={'vBank Logo'}
					/>
				</Box>

				<Box className={classes.titleContainer}>
					<Typography
						align="left"
						style={{
							fontSize: '29px',
							color: APP_CONFIG.mainCollors.primary,
						}}
					>
						Para criarmos seu acesso, é necessário que preencha o
						formulário abaixo
					</Typography>

					<Box className={classes.fieldsContainer}>
						<Typography
							style={{
								fontFamily: 'Montserrat-ExtraBold',
								fontSize: '16px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Dados do sócio administrador
						</Typography>
						<Grid container spacing={4} style={{ marginTop: '25px' }}>
							<Grid item sm={6} xs={12}>
								<ReactInputMask
									mask="999.999.999-99"
									value={dadosEtapa1.documento_socio}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											documento_socio: e.target.value,
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
											label="CPF"
											error={errorsEtapa1.documento_socio}
											helperText={
												errorsEtapa1.documento_socio
													? errorsEtapa1.documento_socio.join(' ')
													: null
											}
										/>
									)}
								</ReactInputMask>
								{/* <TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="CPF"
									fullWidth
									value={dadosEtapa1.documento_socio}
									error={errorsEtapa1.documento_socio}
									helperText={
										errorsEtapa1.documento_socio
											? errorsEtapa1.documento_socio.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											documento_socio: e.target.value,
										})
									}
								/> */}
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="Nome"
									fullWidth
									value={dadosEtapa1.nome_socio}
									error={errorsEtapa1.nome_socio}
									helperText={
										errorsEtapa1.nome_socio
											? errorsEtapa1.nome_socio.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											nome_socio: e.target.value,
										})
									}
								/>
							</Grid>
							{/* </Grid> */}
							{/* <Grid container spacing={2}style={{ marginTop: '25px' }} > */}
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="E-mail"
									fullWidth
									value={dadosEtapa1.email_socio}
									error={errorsEtapa1.email_socio}
									helperText={
										errorsEtapa1.email_socio
											? errorsEtapa1.email_socio.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											email_socio: e.target.value,
										})
									}
								/>
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="Confirmação do e-mail"
									fullWidth
									value={validarConfirmacaoEmail}
									onChange={(e) =>
										setValidarConfirmacaoEmail(e.target.value)
									}
								/>
							</Grid>
							{/* </Grid> */}
							{/* <Grid container spacing={2} > */}
							<Grid item sm={6} xs={12}>
								<ReactInputMask
									mask="(99) 99999-9999"
									value={dadosEtapa1.celular_socio}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											celular_socio: e.target.value,
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
											label="Celular"
											type="tel"
											error={errorsEtapa1.celular_socio}
											helperText={
												errorsEtapa1.celular_socio
													? errorsEtapa1.celular_socio.join(' ')
													: null
											}
										/>
									)}
								</ReactInputMask>
							</Grid>
						</Grid>
						<Grid item sm={8} xs={12} style={{ marginTop: '10px' }}>
							<Box style={{ display: 'flex' }}>
								<Typography
									style={{
										fontFamily: 'Montserrat-Regular',
										fontSize: '14px',
										color: APP_CONFIG.mainCollors.primary,
										marginTop: '10px',
									}}
								>
									Esse será o cadastro master?
								</Typography>
								<Checkbox
									color="primary"
									checked={fillCheckboxSim}
									onChange={() => {
										setFillCheckboxSim(true);
										setFillCheckboxNao(false);
										setDadosEtapa1({
											...dadosEtapa1,
											consultor: true,
										});
									}}
								/>
								<Typography
									style={{
										fontFamily: 'Montserrat-Regular',
										fontSize: '14px',
										color: APP_CONFIG.mainCollors.primary,
										marginTop: '10px',
									}}
								>
									Sim
								</Typography>

								<Checkbox
									color="primary"
									checked={fillCheckboxNao}
									onChange={() => {
										setFillCheckboxSim(false);
										setFillCheckboxNao(true);
										setDadosEtapa1({
											...dadosEtapa1,
											consultor: false,
										});
									}}
								/>
								<Typography
									style={{
										fontFamily: 'Montserrat-Regular',
										fontSize: '14px',
										color: APP_CONFIG.mainCollors.primary,
										marginTop: '10px',
									}}
								>
									Não
								</Typography>
							</Box>
						</Grid>
						<Typography
							style={{
								fontFamily: 'Montserrat-ExtraBold',
								fontSize: '16px',
								color: APP_CONFIG.mainCollors.primary,
								marginTop: '30px',
							}}
						>
							Dados da empresa
						</Typography>
						<Grid container spacing={4} style={{ marginTop: '25px' }}>
							<Grid item sm={6} xs={12}>
								<ReactInputMask
									mask="99.999.999/9999-99"
									value={dadosEtapa1.documento}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											documento: e.target.value,
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
											label="CNPJ"
											error={errorsEtapa1.documento}
											helperText={
												errorsEtapa1.documento
													? errorsEtapa1.documento.join(' ')
													: null
											}
										/>
									)}
								</ReactInputMask>
								{/* <TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="CNPJ"
									fullWidth
									value={dadosEtapa1.documento}
									error={errorsEtapa1.documento}
									helperText={
										errorsEtapa1.documento
											? errorsEtapa1.documento.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											documento: e.target.value,
										})
									}
								/> */}
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="Razão social"
									fullWidth
									value={dadosEtapa1.nome}
									error={errorsEtapa1.nome}
									helperText={
										errorsEtapa1.nome
											? errorsEtapa1.nome.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											nome: e.target.value,
										})
									}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={4} style={{ marginTop: '25px' }}>
							<Grid item sm={6} xs={12}>
								<Select
									variant="outlined"
									fullWidth
									value={dadosEtapa1.tipo_empresa}
									label="Tipo"
									onChange={(e) =>
										setDadosEtapa1({
											...dadosEtapa1,
											tipo_empresa: e.target.value,
										})
									}
								>
									<MenuItem
										value={' '}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										Tipo da empresa
									</MenuItem>
									<MenuItem
										value={0}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										SA
									</MenuItem>
									<MenuItem
										value={1}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										LTDA
									</MenuItem>
									<MenuItem
										value={2}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										MEI
									</MenuItem>
									<MenuItem
										value={3}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										ME
									</MenuItem>
									<MenuItem
										value={4}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										EIRELI
									</MenuItem>
									<MenuItem
										value={5}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										Condomínio
									</MenuItem>
									<MenuItem
										value={6}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										SA_Fechada
									</MenuItem>
									<MenuItem
										value={7}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										EIRELI_Simples
									</MenuItem>
									<MenuItem
										value={8}
										style={{
											color: APP_CONFIG.mainCollors.secondary,
											fontFamily: 'Montserrat-Regular',
										}}
									>
										Outros
									</MenuItem>
								</Select>
							</Grid>
						</Grid>
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
							color="purple"
							onClick={handleContinuar}
						>
							<Typography
								style={{
									fontSize: '10px',
									color: 'white',
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

/* import { Grid, Paper, useTheme, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CustomTextField from '../../components/CustomTextField/CustomTextField';


import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { postPrimeiroAcesso } from '../../actions/actions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		background:
			APP_CONFIG.mainCollors.primaryGradient,
		margin: '0px',
		padding: '0px',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column-reverse',
		},
	},

	rightSide: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '55%',
		height: '100vh',

		color: '#35322f',
		[theme.breakpoints.down('sm')]: {
			width: '100vw',
			height: '100vh',
		},
	},
	leftSideText: {},
	leftSide: {
		display: 'flex',
		justifyContent: 'center',
		width: '45%',

		padding: '80px',
		[theme.breakpoints.down('sm')]: {
			width: '100vw',
			height: '100vh',
			padding: '0px',
		},
	},

	paper: {
		backgroundColor: '#EDEDF4',
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		height: '600px',
		alignItems: 'center',
		padding: '40px',
		width: '60%',
		borderRadius: '27px',
		animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: APP_CONFIG.mainCollors.primary,
		color: 'white',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},

	'@keyframes myEffect': {
		'0%': {
			opacity: 0,
			transform: 'translateX(-10%)',
		},
		'100%': {
			opacity: 1,
			transform: 'translateX(0)',
		},
	},
}));

const Cadastro = () => {
	const classes = useStyles();
	const [user, setUser] = useState({
		email: '',
		token: '',
		password: '',
		password_confirmation: '',
	});
	const theme = useTheme();
	const [errosUser, setErrosUser] = useState({});
	const history = useHistory();
	const [, setLoading] = useState(false);
	const dispatch = useDispatch();
	const onCadastrar = async () => {
		setLoading(true);
		let newUser = user;
		const resUser = await dispatch(postPrimeiroAcesso(newUser));
		if (resUser) {
			setErrosUser(resUser);
			setLoading(false);
		} else {
			toast.success(
				'Cadastro efetuado com sucesso, faça login para ter acesso!'
			);
			history.push('/login');
			setLoading(false);
		}
	};

	return (
		<>
			<Box className={classes.root}>
				<Box className={classes.leftSide}>
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar} />
						<Typography
							component="h1"
							variant="h5"
							style={{ marginBottom: '4px' }}
						>
							Cadastrar
						</Typography>

						<Grid container spacing={5} className={classes.form}>
							<Grid item xs={12}>
								<TextField
									className={classes.inputAutofill}
								required
									variant="outlined"
									error={errosUser.token}
									helperText={
										errosUser.token ? errosUser.token.join(' ') : null
									}
									autoFocus
									label="Código de verificação enviado por e-mail"
									fullWidth
									required
									value={user.token}
									onChange={(e) =>
										setUser({ ...user, token: e.target.value })
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.inputAutofill}
									variant="outlined"
									error={errosUser.email}
									helperText={
										errosUser.email ? errosUser.email.join(' ') : null
									}
									type="email"
									fullWidth
									label="Digite seu email"
									name="email"
									value={user.email}
									onChange={(e) =>
										setUser({ ...user, email: e.target.value })
									}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.inputAutofill}
									variant="outlined"
									error={errosUser.password}
									helperText={
										errosUser.password
											? errosUser.password.join(' ')
											: null
									}
									type="password"
									required
									fullWidth
									name="password"
									label="Digite sua senha"
									id="password"
									autoComplete="current-password"
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.inputAutofill}
									variant="outlined"
									error={errosUser.password_confirmation}
									helperText={
										errosUser.password_confirmation
											? errosUser.password_confirmation.join(' ')
											: null
									}
									type="password"
									required
									fullWidth
									name="password"
									label="Confirmação de senha"
									id="password"
									autoComplete="current-password"
									value={user.password_confirmation}
									onChange={(e) =>
										setUser({
											...user,
											password_confirmation: e.target.value,
										})
									}
								/>
							</Grid>
							<Button
								size="large"
								fullWidth
								variant="contained"
								className={classes.submit}
								style={{
									borderRadius: '27px',
									backgroundColor: APP_CONFIG.mainCollors.primary,
									fontFamily: 'Montserrat-Regular',
								}}
								onClick={onCadastrar}
							>
								Cadastrar
							</Button>
						</Grid>
					</Paper>
				</Box>
				<Box className={classes.rightSide}>
					<Box>
						<img
							style={{
								width: '200px',
								justifySelf: 'flex-start',
								marginTop: '100px',
							}}
							src={vBankLogo}
							alt="Itapemirim logo"
						/>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						marginTop="150px"
					>
						<Typography
							variant="h3"
							align="center"
							style={{ color: 'white' }}
						>
							Primero acesso?
						</Typography>
						<Typography
							align="center"
							variant="h6"
							style={{ fontWeight: '100', color: 'white' }}
						>
							Bem-vindo! Falta pouco para finalizar seu cadastro.
						</Typography>
						<Typography
							align="center"
							variant="h6"
							style={{ fontWeight: '100', color: 'white' }}
						>
							Basta inserir o código enviado via EMAIL e preencher os
							campos.
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Cadastro;
 */
