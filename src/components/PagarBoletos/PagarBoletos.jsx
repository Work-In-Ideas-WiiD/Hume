import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	FormControlLabel,
	FormHelperText,
	makeStyles,
	Modal,
	Switch,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTextField from '../CustomTextField/CustomTextField';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConsultaChavePixAction,
	postPagamentoBoletoAction,
} from '../../actions/actions';
import CustomButton from '../CustomButton/CustomButton';
import ReactCodeInput from 'react-code-input';

import useDebounce from '../../hooks/useDebounce';
import {
	getConsultarCodigoDeBarras,
	postPagarBoleto,
	postTransferenciaP2P,
} from '../../services/services';
import InputMask from 'react-input-mask';
import moment from 'moment';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { APP_CONFIG } from '../../constants/config';
import CurrencyInput from 'react-currency-input';

const useStyles = makeStyles((theme) => ({
	modal: {
		outline: ' none',
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
		position: 'absolute',

		top: '10%',
		left: '25%',
		/* transform: 'translate(-50%, -50%)', */
		width: '50%',
		height: '80%',
		backgroundColor: 'white',
		/* bgcolor: 'background.paper', */
		border: '0px solid #000',
		boxShadow: 24,
		/* p: 5, */
	},
}));

const PagarBoletos = ({ title, changePath, ...rest }) => {
	const classes = useStyles();
	const { section } = useParams();
	const theme = useTheme();
	const dispatch = useDispatch();
	const token = useAuth();
	const [loading, setLoading] = useState(false);
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [openModal, setOpenModal] = useState(false);
	const [descricao, setDescricao] = useState('');
	const [tokenApp, setTokenApp] = useState('');
	const [docPagamento, setDocPagamento] = useState('');
	const [docValido, setDocValido] = useState(false);
	const [errors, setErrors] = useState('');
	const [dadosBoleto, setDadosBoleto] = useState({
		BankCode: '',
		BankName: '',
		Barcode: '',
		DigitableLine: '',
		DueDate: '',
		Value: 0.0,
		UpdatedValue: 0.0,
	});
	const [dadosBoletoOriginal, setDadosBoletoOriginal] = useState({
		BankCode: '',
		BankName: '',
		Barcode: '',
		DigitableLine: '',
		DueDate: '',
		Value: 0.0,
		UpdatedValue: 0.0,
	});

	let deboundedDoc = useDebounce(docPagamento, 1000);

	async function verificarDocumentoParaPagamento(doc) {
		if (doc !== '') {
			try {
				setLoading(true);
				const { data } = await getConsultarCodigoDeBarras(
					token,
					docPagamento
				);

				setDadosBoleto(data);
				setDadosBoletoOriginal(data);
				setDocValido(true);
			} catch (err) {
				setDocValido(false);
				toast.error('Não encontramos esse documento para pagamento');
			} finally {
				setLoading(false);
			}
		}
	}

	/* async function handlePagar() {
		if (
			(dadosBoleto.Barcode != '', dadosBoleto.Value != 0.0, tokenApp != '')
		) {
			try {
				setLoading(true);
				await postPagarBoleto(
					token,
					0,
					0,
					dadosBoleto.Barcode,
					dadosBoleto.Value,
					descricao,
					dadosBoleto.DueDate,
					tokenApp
				);

				toast.success('Pagamento efetuado com sucesso!');
				changePath('pagamentos');
				setLoading(false);
			} catch (err) {
				setErrors(err);
				setTokenApp('');
				setLoading(false);
				
				toast.error('Erro ao efetuar pagamento, tente novamente.');
			}
		} else {
			toast.error('Verifique os dados e tente novamente.');
		}
	} */

	const handlePagar = async (e) => {
		if (
			(dadosBoleto.Barcode !== '',
			dadosBoleto.Value !== 0.0,
			tokenApp !== '')
		) {
			setLoading(true);
			const resPagamentoBoleto = await dispatch(
				postPagamentoBoletoAction(
					token,
					0,
					0,
					dadosBoleto.Barcode,
					dadosBoletoOriginal.UpdatedValue > 0
						? dadosBoleto.UpdatedValue
						: dadosBoleto.Value,
					descricao,
					dadosBoleto.DueDate,
					tokenApp
				)
			);
			if (resPagamentoBoleto === false) {
				toast.success('Pagamento enviado!');
				setLoading(false);
				setOpenModal(false);
			} else {
				setErrors(resPagamentoBoleto);
				setLoading(false);
				toast.error(resPagamentoBoleto.valor[0]);
			}
		}
	};
	// function clearData() {
	// 	setOpenModal(false);
	// 	setTokenApp('');
	// 	setDadosBoleto({
	// 		BankCode: "",
	// 		BankName: "",
	// 		Barcode: "",
	// 		DigitableLine: "",
	// 		DueDate: "",
	// 		Value: 0.00
	// 	})
	// }

	function formatarDocumento(doc) {
		let formatado = doc.replace(
			/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi,
			''
		);
		setDocPagamento(formatado);
	}

	return (
		<>
			<LoadingScreen isLoading={loading} />
			<Typography
				style={{
					fontFamily: 'Montserrat-ExtraBold',
					fontSize: '16px',
					color: APP_CONFIG.mainCollors.primary,
					marginTop: '30px',
					marginLeft: '40px',
				}}
			>
				Pagar
			</Typography>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '10px',
				}}
			>
				<Box
					style={{
						width: '90%',
						height: '1px',
						backgroundColor: APP_CONFIG.mainCollors.primary,
					}}
				/>

				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '90%',
						marginTop: '30px',
					}}
				>
					{dadosBoleto.BankCode !== '' && (
						<>
							<Typography
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: '17px',
									color: APP_CONFIG.mainCollors.primary,
								}}
							>
								Banco: {dadosBoleto.BankName}
								<br />
								Linha Digitavel: {dadosBoleto.Barcode}
								<br />
								Vencimento:{' '}
								{moment.utc(dadosBoleto.DueDate).format('DD/MM/YYYY')}
								<br />
							</Typography>
							<Box
								style={{
									backgroundColor: APP_CONFIG.mainCollors.primary,
									display: 'flex',
									flexDirection: 'column',
									/* height: '200px', */
									padding: '20px',
									borderRadius: '17px',
									alignItems: 'center',
									width: '100%',
									maxWidth: 400,
									alignSelf: 'center',
									marginTop: '10px',
									/* justifyContent: 'center', */
								}}
							>
								<Typography
									style={{
										fontFamily: 'Montserrat-ExtraBold',
										fontSize: '13px',
										color: 'white',
										marginTop: '10px',
									}}
								>
									Valor a pagar
								</Typography>

								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										alignSelf: 'center',
										width: '100%',
									}}
								>
									<Box
										style={{
											marginTop: '20px',
											width: '100%',
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										{dadosBoletoOriginal &&
										dadosBoletoOriginal.UpdatedValue > 0 ? (
											<>
												<CurrencyInput
													style={{
														marginBottom: '6px',
														width: '80%',
														alignSelf: 'center',
														textAlign: 'center',
														height: 40,
														fontSize: 20,
														border: 'none',
														color: '#fff',
														backgroundColor: 'transparent',
														fontFamily: 'Montserrat-Regular',
													}}
													decimalSeparator=","
													thousandSeparator="."
													prefix="R$ "
													value={
														dadosBoleto &&
														dadosBoleto.UpdatedValue
															? dadosBoleto.UpdatedValue
															: null
													}
													onChangeEvent={(
														event,
														maskedvalue,
														floatvalue
													) => {
														setDadosBoleto({
															...dadosBoleto,
															UpdatedValue: floatvalue,
														});
													}}
												/>
											</>
										) : (
											<>
												<CurrencyInput
													style={{
														marginBottom: '6px',
														width: '80%',
														alignSelf: 'center',
														textAlign: 'center',
														height: 40,
														fontSize: 20,
														border: 'none',
														color: '#fff',
														backgroundColor: 'transparent',
														fontFamily: 'Montserrat-Regular',
													}}
													decimalSeparator=","
													thousandSeparator="."
													prefix="R$ "
													value={
														dadosBoleto && dadosBoleto.Value
															? dadosBoleto.Value
															: null
													}
													onChangeEvent={(
														event,
														maskedvalue,
														floatvalue
													) => {
														setDadosBoleto({
															...dadosBoleto,
															Value: floatvalue,
														});
													}}
												/>
											</>
										)}

										{errors.valor ? (
											<FormHelperText
												style={{
													width: '300px',
													fontSize: 14,
													textAlign: 'center',
													fontFamily: 'Montserrat-Regular',
													color: 'red',
												}}
											>
												{errors.valor.join(' ')}
											</FormHelperText>
										) : null}
									</Box>
								</Box>
							</Box>
						</>
					)}

					<Box style={{ marginTop: '30px' }}>
						<InputMask
							maskChar=" "
							mask="99999.99999 99999.999999 99999.999999 9 9999999999999999999999999"
							onChange={(e) => formatarDocumento(e.target.value)}
							onBlur={() =>
								verificarDocumentoParaPagamento(deboundedDoc)
							}
						>
							{() => (
								<TextField
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									name="documento"
									fullWidth
									required
									label={'Boleto'}
								/>
							)}
						</InputMask>
					</Box>
					<Box style={{ marginTop: '20px' }}>
						<TextField
							variant="outlined"
							fullWidth
							label="Descrição"
							value={descricao}
							onChange={(e) => {
								setDescricao(e.target.value);
							}}
						/>
					</Box>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							marginTop: '20px',
							backgroundColor: APP_CONFIG.mainCollors.primary,
							width: '20%',
							borderRadius: '27px',
							justifyContent: 'center',
						}}
					></Box>
				</Box>

				<Box
					style={{
						marginTop: '30px',
						marginBottom: '15px',
					}}
				>
					<CustomButton
						color="purple"
						onClick={() => setOpenModal(true)}
						disabled={!docValido}
					>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '14px',
								color: 'white',
								opacity: !docValido ? 0.3 : 1,
							}}
						>
							Continuar
						</Typography>
					</CustomButton>
				</Box>
				<Modal open={openModal} onBackdropClick={() => setOpenModal(false)}>
					<Box className={classes.modal}>
						<LoadingScreen isLoading={loading} />
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								marginTop: '30px',
							}}
						>
							<Typography
								style={{
									fontFamily: 'Montserrat-ExtraBold',
									fontSize: '16px',
									color: APP_CONFIG.mainCollors.primary,
									fontWeight: 'bold',
								}}
							>
								Preencha o campo com o token do seu aplicativo.
							</Typography>

							<ReactCodeInput
								value={tokenApp}
								onChange={(e) => setTokenApp(e)}
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
							{errors.token ? (
								<FormHelperText
									style={{
										fontSize: 14,
										textAlign: 'center',
										fontFamily: 'Montserrat-ExtraBold',
										color: 'red',
									}}
								>
									{errors.token.join(' ')}
								</FormHelperText>
							) : null}
							{errors && errors.valor ? (
								<FormHelperText
									style={{
										fontSize: 14,
										textAlign: 'center',
										fontFamily: 'Montserrat-ExtraBold',
										color: 'red',
									}}
								>
									{errors.valor.join(' ')}
								</FormHelperText>
							) : null}
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginTop: '30px',
								}}
							>
								<Box style={{ marginTop: '10px' }}>
									<CustomButton
										disabled={loading}
										variant="contained"
										color="purple"
										style={{ marginTop: '10px' }}
										onClick={handlePagar}
									>
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '14px',
												color: 'white',
											}}
										>
											Enviar
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
				</Modal>
			</Box>
		</>
	);
};

export default PagarBoletos;
