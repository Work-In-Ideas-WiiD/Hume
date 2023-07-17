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
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import CustomSideBar from '../../components/CustomSideBar/CustomSideBar';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchIcon from '@mui/icons-material/Search';
import ReactCodeInput from 'react-code-input';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { APP_CONFIG } from '../../constants/config';

import { postReenviarTokenAction } from '../../actions/actions';
import PinInput from 'react-pin-input';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		flexGrow: 1,
		// width: '100vw',
		// height: '100vh',
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		padding: '20px',
	},
	header: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	tokenBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '100px',
	},
}));
export default function TokenEmailEtapa({ getNextEtapa }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const dadosCadastrais = useSelector((state) => state.cadastroEtapa2);
	const [dadosToken, setDadosToken] = useState({
		documento: dadosCadastrais.documento,
		tipo: 'email',
		token: '',
	});

	const handleReenviarToken = async () => {
		const resReenviarToken = await dispatch(
			postReenviarTokenAction(dadosCadastrais.documento, 'email')
		);
		if (resReenviarToken) {
			toast.error('Erro ao reenviar token');
		} else {
			toast.success('Token enviado com sucesso');
		}
	};

	const handleValidarToken = () => {
		getNextEtapa({ dadosToken });
	};

	return (
		<Box className={classes.root}>
			<CustomSideBar cadastro />
			<Box className={classes.main}>
				<CustomHeader />

				<Box className={classes.tokenBox}>
					<Typography
						style={{
							fontFamily: 'Montserrat-ExtraBold',
							fontSize: '17px',
							color: APP_CONFIG.mainCollors.primary,
						}}
					>
						Validação
					</Typography>
					<Box style={{ marginTop: '10px' }}>
						<Typography
							style={{
								fontFamily: 'Montserrat-ExtraBold',
								fontSize: '14px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Enviamos um código de 6 dígitos para seu e-mail cadastrado,
							insira-o no campo abaixo.
						</Typography>
					</Box>

					<ReactCodeInput
						value={dadosToken.token}
						onChange={(e) =>
							setDadosToken({
								...dadosToken,
								token: e,
							})
						}
						type="number"
						fields={6}
						inputStyle={{
							fontFamily: 'monospace',
							margin: '4px',
							marginTop: '30px',
							MozAppearance: 'textfield',
							width: '30px',
							borderRadius: '28px',
							fontSize: '20px',
							height: '50px',
							paddingLeft: '7px',

							color: APP_CONFIG.mainCollors.primary,
							border: `1px solid ${APP_CONFIG.mainCollors.primary}`,
						}}
					/>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '30px',
						}}
					>
						<CustomButton
							variant="contained"
							color="purple"
							onClick={handleReenviarToken}
						>
							<Typography
								style={{
									fontSize: '10px',
									color: 'white',
								}}
							>
								REENVIAR CÓDIGO
							</Typography>
						</CustomButton>
						<Box style={{ marginTop: '10px' }}>
							<CustomButton
								variant="contained"
								color="purple"
								style={{ marginTop: '10px' }}
								onClick={handleValidarToken}
							>
								<Typography
									style={{
										fontSize: '10px',
										color: 'white',
									}}
								>
									VALIDAR
								</Typography>
							</CustomButton>
						</Box>
					</Box>
					<Box style={{ alignSelf: 'center', marginTop: '50px' }}>
						<img
							src={APP_CONFIG.assets.tokenImageSvg}
							style={{ width: '80%' }}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
