import {
	Box,
	Button,
	TextField,
	Typography,
	makeStyles,
	InputAdornment,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextField from '../../components/CustomTextField/CustomTextField';

import { Link } from 'react-router-dom';
import { postLoginAction, setSessionAuth } from '../../actions/actions';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import CustomTextFieldPassword from '../../components/CustomTextFieldPassword/CustomTextFieldPassword';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
	},
	textfield: {
		display: 'flex',
		justifyContent: 'center',

		width: '45%',
	},
	title: {
		letterSpacing: '3px',
		fontFamily: 'microgramma-d-bold-extended',
	},
	subtitle: {
		fontFamily: 'Montserrat-Regular',
	},
	forgotPassword: {
		fontFamily: 'Montserrat-Regular',
		color: APP_CONFIG.mainCollors.forgotPasswordLogin,
	},
}));

const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useAuth();

	const classes = useStyles();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const handleLogin = async (e) => {
		e.preventDefault();

		const resLogin = await dispatch(
			postLoginAction(loginData.email, loginData.password)
		);
		if (resLogin) {
			await localStorage.setItem(
				'@auth',
				JSON.stringify({
					...resLogin.data,
					login_time: new Date().getTime(),
				})
			);
			/* const login_time = new Date().getTime();
			await dispatch(
				setSessionAuth({ ...resLogin.data, login_time: login_time })
			); */

			history.push('/dashboard/home');
		} else {
			toast.error('Usuário ou senha inválidos');
		}
	};

	return (
		<Box className={classes.root}>
			<Box
				style={{
					width: '100%',
					height: '80px',
					backgroundColor: APP_CONFIG.mainCollors.primary,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					alignSelf: 'flex-start',
				}}
			>
				<img src={APP_CONFIG.assets.loginSvg} alt={''} />
			</Box>

			<Box
				style={{
					borderRadius: 27,
					border: `2px solid ${APP_CONFIG.mainCollors.primary}`,
					borderWidth: '3px',
					display: 'flex',
					flexDirection: 'column',
					alignSelf: 'center',
					alignItems: 'center',
					marginTop: '150px',
					padding: '30px',
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '100%',
						alignSelf: 'center',
					}}
				>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							alignSelf: 'center',
							marginTop: '30px',
						}}
					>
						<Typography
							style={{
								fontSize: 20,
								color: APP_CONFIG.mainCollors.black,
							}}
						>
							Entre no seu perfil
						</Typography>
						<Typography
							style={{
								marginTop: '10px',
								fontSize: 13,
								color: APP_CONFIG.mainCollors.black,
							}}
						>
							Bem-vindo de volta ao Hume :)
						</Typography>
					</Box>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
							width: '100%',
							marginBottom: '30%',
							zIndex: 10,
						}}
					>
						<form
							onSubmit={(e) => handleLogin(e)}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								height: '100%',
								justifyContent: 'center',
								width: '100%',
								marginBottom: '10%',
							}}
						>
							<Box
								style={{
									display: 'flex',
									marginTop: '30px',
									flexDirection: 'column',
								}}
							>
								<Typography
									style={{
										fontSize: 14,
										color: APP_CONFIG.mainCollors.black,
										marginLeft: '13px',
									}}
								>
									E-mail
								</Typography>
								<TextField
									variant="outlined"
									style={{
										width: '300px',
									}}
									onChange={(e) =>
										setLoginData({
											...loginData,
											email: e.target.value,
										})
									}
									placeholder="Email"
									size="small"
									type="email"
									id="email"
									name="email"
									autoComplete="email"
									autoFocus
									required
								/>
							</Box>

							<Box
								style={{
									display: 'flex',
									marginTop: '20px',
									flexDirection: 'column',
								}}
							>
								<Typography
									style={{
										fontSize: 13,
										marginLeft: '13px',
										color: APP_CONFIG.mainCollors.black,
									}}
								>
									Senha
								</Typography>
								<TextField
									/* InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<LockIcon style={{ color: 'white' }} />
											</InputAdornment>
										),
									}} */
									style={{ width: '300px' }}
									onChange={(e) =>
										setLoginData({
											...loginData,
											password: e.target.value,
										})
									}
									placeholder="Senha"
									size="small"
									type="password"
									variant="outlined"
									margin="none"
									required
									name="password"
									id="password"
									autoComplete="current-password"
								/>
							</Box>

							<Box
								display="flex"
								flexDirection="column"
								/* alignItems="center" */
								marginTop="10px"
								marginBottom="30px"
								style={{ width: '100%' }}
							>
								{/* <Button
										uppercase={false}
										className={classes.forgotPassword}
										size="small"
										component={Link}
										to="/solictar-reset"
										style={{ height: '28px', borderRadius: '27px' }}
									> */}
								<Box>
									<Typography
										component={Link}
										className={classes.forgotPassword}
										to="/solicitar-reset"
										uppercase={false}
										style={{
											display: 'flex',
											justifyContent: 'end',
											marginBottom: '30px',
											fontSize: '10px',
										}}
									>
										Esqueci minha senha
									</Typography>
								</Box>
								{/* </Button> */}
							</Box>
							<Box>
								<CustomButton color="colorTertiary" type="submit">
									Entrar
								</CustomButton>
							</Box>
							<Box style={{ marginTop: '10px' }}>
								<CustomButton
									color="white"
									component={Link}
									to="/cadastro"
								>
									Cadastrar
								</CustomButton>
							</Box>
						</form>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
