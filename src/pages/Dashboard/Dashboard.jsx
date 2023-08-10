import {
	Box,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
	Grid,
	TextField,
	StepContent,
	StepConnector,
	Button,
	Divider,
	CardMedia,
	DialogActions,
	IconButton,
	CardActionArea,
	Card,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	MenuItem,
	Select,
	Switch,
} from '@material-ui/core';
import { Link, useHistory, generatePath } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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
import CustomFowardButton from '../../components/CustomFowardButton/CustomFowardButton';
import { getCep } from '../../services/services';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ReactInputMask from 'react-input-mask';
import CustomLineChart from '../../components/CustomLineChart/CustomLineChart';
import CustomCard from '../../components/CustomCard/CustomCard';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
/* import {
	loadExtratoFilter,
	loadUserData,
	getListaBannerAction,
	setRedirecionarTransferencia,
	setRedirecionarValorTransferencia,
	getTransacaoMesAction,
} from '../../actions/actions'; */
import useAuth from '../../hooks/useAuth';
import CustomTable from '../../components/CustomTable/CustomTable';
import PersonIcon from '@material-ui/icons/Person';
import CustomRoundedCard from '../../components/CustomRoundedCard/CustomRoundedCard';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CurrencyInput from 'react-currency-input';
import { APP_CONFIG } from '../../constants/config';
import { width } from '@mui/system';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		/* flexGrow: 1, */
		/* width: '100vw',
		height: '100vh', */
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		padding: '10px',
	},
	header: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	dadosBox: {
		display: 'flex',
		flexDirection: 'row',
		/* alignItems: 'center', */
		/* justifyContent: 'center', */
		marginTop: '20px',
		marginLeft: '30px',
	},
	cardContainer: {
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'space-between',
	},
	contadorStyle: {
		display: 'flex',
		fontSize: '30px',
		fontFamily: 'BwGradualDEMO-Bold',
	},
	currencyInput: {
		marginBottom: '6px',

		alignSelf: 'center',
		textAlign: 'center',
		height: 45,
		fontSize: 17,
		borderWidth: '1px !important',
		borderRadius: 27,
		border: 'none',
		color: APP_CONFIG.mainCollors.primary,
		backgroundColor: 'transparent',
		fontFamily: 'BwGradualDEMO-Regular',
	},
	textClick: {
		fontSize: 12,
		color: '#ED757D',
		alignSelf: 'center',
		'&:hover': {
			cursor: 'pointer',

			transform: 'scale(1.05)',
		},
	},
}));
export default function Dashboard({
	cobrancasFilter,
	financasFilter,
	transferenciasFilter,
	outrosServicosFilter,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const userData = useSelector((state) => state.userData);
	const extrato = useSelector((state) => state.extrato);
	const listaBanner = useSelector((state) => state.listaBanner);
	const transacaoMes = useSelector((state) => state.transacaoMes);
	const token = useAuth();
	const [loading, setLoading] = useState(false);
	const [banner, setBanner] = useState([]);
	const [modalRetirada, setModalRetirada] = useState(false);
	const [textRetirada, setTextRetirada] = useState(false);
	const [valorRetirada, setValorRetirada] = useState(null);
	const [valorTransferencia, setValorTransferencia] = useState(null);
	const [tipoTransferencia, setTipoTransferencia] = useState('');
	const [saqueAuto, setSaqueAuto] = useState(false);

	var firstBanner = banner[0];

	moment.locale();

	return (
		<Box className={classes.root}>
			<LoadingScreen isLoading={loading} />

			<Box className={classes.main}>
				<Box className={classes.dadosBox}>
					<Box
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							style={{
								display: 'flex',
								backgroundColor: APP_CONFIG.mainCollors.backgrounds,
								/* height: '100px', */
								borderRadius: '17px',
								marginRight: '30px',
								alignItems: 'center',
								justifyContent: 'space-around',
							}}
						>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: '30px',
									marginBottom: '30px',
								}}
							>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Transacionado no mês
								</Typography>
								<Box
									style={{
										width: '80%',
										height: '1px',
										backgroundColor: APP_CONFIG.mainCollors.primary,
									}}
								/>

								{/* <CurrencyInput
									placeHolder="R$0,00"
									style={{
										alignSelf: 'center',
										textAlign: 'center',
										height: 45,
										fontSize: '20px',
										borderWidth: '1px !important',
										borderRadius: 27,
										border: 'none',
										color: APP_CONFIG.mainCollors.primary,
										backgroundColor: 'transparent',
										fontFamily: 'BwGradualDEMO-Regular',
									}}
									decimalSeparator=","
									thousandSeparator="."
									prefix="R$ "
									value={textRetirada ? '' : valorRetirada}
									onChangeEvent={(event, maskedvalue, floatvalue) => {
										setValorRetirada(floatvalue);
									}}
								/> */}
								{transacaoMes && transacaoMes.transacionado && (
									<Typography style={{ fontSize: '20px' }}>
										R$ {transacaoMes.transacionado}
									</Typography>
								)}
							</Box>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: '30px',
									marginBottom: '30px',
								}}
							>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Transações aprovadas
								</Typography>
								<Box
									style={{
										width: '80%',
										height: '1px',
										backgroundColor: APP_CONFIG.mainCollors.primary,
									}}
								/>

								{transacaoMes && transacaoMes.aprovado && (
									<Typography style={{ fontSize: '20px' }}>
										R$ {transacaoMes.aprovado}
									</Typography>
								)}
							</Box>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: '30px',
									marginBottom: '30px',
								}}
							>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Transações negadas
								</Typography>
								<Box
									style={{
										width: '80%',
										height: '1px',
										backgroundColor: APP_CONFIG.mainCollors.primary,
									}}
								/>

								{transacaoMes && transacaoMes.recusado && (
									<Typography style={{ fontSize: '20px' }}>
										R$ {transacaoMes.recusado}
									</Typography>
								)}
							</Box>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									marginTop: '30px',
									marginBottom: '30px',
								}}
							>
								<Typography
									style={{
										fontFamily: 'BwGradualDEMO-Regular',
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									Taxa de conversão
								</Typography>
								<Box
									style={{
										width: '80%',
										height: '1px',
										backgroundColor: APP_CONFIG.mainCollors.primary,
									}}
								/>

								{transacaoMes && transacaoMes.conversao && (
									<Typography style={{ fontSize: '20px' }}>
										% {transacaoMes.conversao}
									</Typography>
								)}
							</Box>
						</Box>

						<Box style={{ display: 'flex' }}>
							{cobrancasFilter ? (
								<Grid
									container
									spacing={0}
									style={{ marginTop: '20px', width: '60%' }}
								>
									<Grid container spacing={5}>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/maquina-virtual-cartao'
													)
												}
											>
												<CustomCard
													icon="card"
													title="Máquina virtual / Cartão"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/boleto'
													)
												}
											>
												<CustomCard icon="boletos" title="Boleto" />
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/carne'
													)
												}
											>
												<CustomCard icon="card" title="Carnê" />
											</Box>
										</Grid>
									</Grid>
									<Grid
										container
										spacing={5}
										style={{ marginTop: '5px' }}
									>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/cobranca-recorrente'
													)
												}
											>
												<CustomCard
													icon="loop"
													title="Cobrança recorrente"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/link-de-pagamento'
													)
												}
											>
												<CustomCard
													icon="link"
													title="Link de pagamento"
												/>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							) : financasFilter ? (
								<Grid
									container
									spacing={0}
									style={{ marginTop: '20px', width: '60%' }}
								>
									<Grid container spacing={5}>
										<Grid item sm={4} xs={12}>
											<Box onClick={() => history.push('extrato')}>
												<CustomCard
													icon="extrato"
													title="Extrato"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/historico-de-transacoes'
													)
												}
											>
												<CustomCard
													icon="historico"
													title="Histórico de transações"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/lancamentos-futuros'
													)
												}
											>
												<CustomCard
													icon="time"
													title="Lançamentos futuros"
												/>
											</Box>
										</Grid>
									</Grid>
									<Grid
										container
										spacing={5}
										style={{ marginTop: '5px' }}
									>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/tarifas'
													)
												}
											>
												<CustomCard icon="fare" title="Tarifas" />
											</Box>
										</Grid>
									</Grid>
								</Grid>
							) : transferenciasFilter ? (
								<Grid
									container
									spacing={0}
									style={{ marginTop: '20px', width: '60%' }}
								>
									<Grid container spacing={5}>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push('lista-pagamentos')
												}
											>
												<CustomCard
													icon="transferencias"
													title="Histórico de transferências"
												/>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							) : outrosServicosFilter ? (
								<Grid
									container
									spacing={0}
									style={{ marginTop: '20px', width: '60%' }}
								>
									<Grid container spacing={5}>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/pagadores'
													)
												}
											>
												<CustomCard
													icon="person"
													title="Pagadores"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/terminais-pos'
													)
												}
											>
												<CustomCard
													icon="terminal"
													title="Terminal - POS"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/exportacoes-solicitadas'
													)
												}
											>
												<CustomCard
													icon="inventory"
													title="Exportações solicitadas"
												/>
											</Box>
										</Grid>
									</Grid>
									<Grid
										container
										spacing={5}
										style={{ marginTop: '5px' }}
									>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/tarifas'
													)
												}
											>
												<CustomCard icon="fare" title="Tarifas" />
											</Box>
										</Grid>
									</Grid>
								</Grid>
							) : (
								<Grid
									container
									spacing={0}
									style={{ marginTop: '20px', width: '60%' }}
								>
									<Grid container spacing={5}>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/maquina-virtual-cartao'
													)
												}
											>
												<CustomCard
													icon="card"
													title="Máquina virtual / Cartão"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/boleto'
													)
												}
											>
												<CustomCard icon="boletos" title="Boleto" />
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/carne'
													)
												}
											>
												<CustomCard icon="card" title="Carnê" />
											</Box>
										</Grid>
									</Grid>
									<Grid
										container
										spacing={5}
										style={{ marginTop: '5px' }}
									>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/link-de-pagamento'
													)
												}
											>
												<CustomCard
													icon="link"
													title="Link de pagamento"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/lancamentos-futuros'
													)
												}
											>
												<CustomCard
													icon="time"
													title="Lançamentos futuros"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box onClick={() => history.push('extrato')}>
												<CustomCard
													icon="extrato"
													title="Extrato"
												/>
											</Box>
										</Grid>
									</Grid>

									<Grid
										container
										spacing={5}
										style={{ marginTop: '5px' }}
									>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/cobranca-recorrente'
													)
												}
											>
												<CustomCard
													icon="loop"
													title="Cobrança recorrente"
												/>
											</Box>
										</Grid>

										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/historico-de-transacoes'
													)
												}
											>
												<CustomCard
													icon="historico"
													title="Histórico de transações"
												/>
											</Box>
										</Grid>
										<Grid item sm={4} xs={12}>
											<Box
												onClick={() =>
													history.push(
														'/dashboard/adquirencia/acao/tarifas'
													)
												}
											>
												<CustomCard icon="fare" title="Tarifas" />
											</Box>
										</Grid>

										{/* <Box style={{ height: '150px', width: '1px' }}></Box> */}
									</Grid>
								</Grid>
							)}

							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginLeft: '30px',
									marginTop: '20px',
								}}
							>
								<Box
									style={{
										display: 'flex',
										backgroundColor:
											APP_CONFIG.mainCollors.backgrounds,

										borderRadius: '17px',
										flexDirection: 'column',
										width: '550px',
										alignItems: 'center',
									}}
								>
									<Typography
										style={{
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '16px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '30px',
										}}
									>
										Saldo disponível
									</Typography>
									<Box
										style={{
											width: '80%',
											height: '1px',
											backgroundColor:
												APP_CONFIG.mainCollors.primary,
										}}
									/>
									{userData &&
										userData.saldo &&
										userData.saldo.valor && (
											<Typography
												style={{
													fontFamily: 'BwGradualDEMO-Regular',
													fontSize: '20px',
													color: APP_CONFIG.mainCollors.primary,
													marginTop: '35px',
												}}
											>
												R$
												{parseFloat(
													userData.saldo.valor
												).toLocaleString('pt-br', {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}
											</Typography>
										)}

									<Box
										style={{
											marginTop: '30px',
											marginBottom: '25px',
										}}
										onClick={() => {
											history.push('extrato');
										}}
									>
										<Typography className={classes.textClick}>
											Ver extrato
										</Typography>
									</Box>
								</Box>
								<Box
									style={{
										display: 'flex',
										backgroundColor:
											APP_CONFIG.mainCollors.backgrounds,

										borderRadius: '17px',
										flexDirection: 'column',
										width: '550px',
										alignItems: 'center',
										marginTop: '20px',
									}}
								>
									<Typography
										style={{
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '16px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '30px',
										}}
									>
										Saldo futuro
									</Typography>
									<Box
										style={{
											width: '80%',
											height: '1px',
											backgroundColor:
												APP_CONFIG.mainCollors.primary,
										}}
									/>
									{userData &&
										userData.saldo &&
										userData.saldo.valor && (
											<Typography
												style={{
													fontFamily: 'BwGradualDEMO-Regular',
													fontSize: '20px',
													color: APP_CONFIG.mainCollors.primary,
													marginTop: '35px',
												}}
											>
												R$
												{parseFloat(
													userData.saldo.valor_futuro
												).toLocaleString('pt-br', {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}
											</Typography>
										)}

									<Box
										style={{
											marginTop: '30px',
											marginBottom: '25px',
										}}
									>
										<Typography
											onClick={() => {}}
											className={classes.textClick}
										>
											Ver mais
										</Typography>
									</Box>
								</Box>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										marginTop: '30px',
									}}
								></Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
