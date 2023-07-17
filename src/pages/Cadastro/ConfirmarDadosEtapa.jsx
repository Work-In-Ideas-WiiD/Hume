import {
	Box,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
	Grid,
	TextField,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import CustomButton from '../../components/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
	setCadastroEtapa2Action,
	setPreContaJuridicaId,
} from '../../actions/actions';
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
		marginTop: '60px',
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
export default function ConfirmarDadosEtapa({ getNextEtapa, errorsEtapa2 }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const dadosEmpresa = useSelector((state) => state.cadastroEtapa1);
	const [dadosEtapa2, setDadosEtapa2] = useState({
		documento: dadosEmpresa.documento,
		nome: dadosEmpresa.nome,
		celular: dadosEmpresa.celular_socio,
		email: dadosEmpresa.email_socio,
	});

	const handleContinuar = () => {
		if (
			dadosEtapa2.nome === '' ||
			dadosEtapa2.documento === '' ||
			dadosEtapa2.celular === '' ||
			dadosEtapa2.email === ''
		) {
			toast.error('Preencha todos os campos');
		} else {
			dispatch(setPreContaJuridicaId(dadosEmpresa.id));
			getNextEtapa({ dadosEtapa2 });
		}
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.leftBox}>
				<Stepper
					activeStep={1}
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
						src={APP_CONFIG.assets.backgroundLogo}
						alt={''}
						className={classes.bigLogoImg}
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
						Confirme os dados da sua empresa.
					</Typography>

					<Box className={classes.fieldsContainer}>
						<Typography
							style={{
								fontFamily: 'Montserrat-ExtraBold',
								fontSize: '16px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Dados da empresa
						</Typography>
						<Grid container spacing={4} style={{ marginTop: '10px' }}>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="CNPJ"
									fullWidth
									value={dadosEtapa2.documento}
									error={errorsEtapa2.documento}
									helperText={
										errorsEtapa2.documento
											? errorsEtapa2.documento.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa2({
											...dadosEtapa2,
											documento: e.target.value,
										})
									}
								/>
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="Razão Social"
									fullWidth
									value={dadosEtapa2.nome}
									error={errorsEtapa2.nome}
									helperText={
										errorsEtapa2.nome
											? errorsEtapa2.nome.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa2({
											...dadosEtapa2,
											nome: e.target.value,
										})
									}
								/>
							</Grid>
							{/* </Grid> */}
							{/* <Grid container spacing={2}> */}
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="E-mail"
									fullWidth
									value={dadosEtapa2.email}
									error={errorsEtapa2.email}
									helperText={
										errorsEtapa2.email
											? errorsEtapa2.email.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa2({
											...dadosEtapa2,
											email: e.target.value,
										})
									}
								/>
							</Grid>
							<Grid item sm={6} xs={12}>
								<TextField
									className={classes.inputAutofill}
									required
									variant="outlined"
									label="Celular"
									fullWidth
									value={dadosEtapa2.celular}
									error={errorsEtapa2.celular}
									helperText={
										errorsEtapa2.celular
											? errorsEtapa2.celular.join(' ')
											: null
									}
									onChange={(e) =>
										setDadosEtapa2({
											...dadosEtapa2,
											celular: e.target.value,
										})
									}
								/>
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
								MEUS DADOS ESTÃO CORRETOS, CONTINUAR
							</Typography>
						</CustomButton>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
