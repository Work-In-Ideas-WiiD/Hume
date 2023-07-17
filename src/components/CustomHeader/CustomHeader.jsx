import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	Button,
	makeStyles,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import {
	postAuthMeAction,
	setAutorizarPagamentoModal,
	setAutorizarTodos,
	setCadastrarLoteModal,
	setHeaderLike,
} from '../../actions/actions';
import useDebounce from '../../hooks/useDebounce';
import { APP_CONFIG } from '../../constants/config';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		/* alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'center', */
		width: '100%',
		marginTop: '20px',
	},
	filterButton: {
		'&:hover': {
			background: APP_CONFIG.mainCollors.buttonGradientVariant,
		},
	},
	titleFilterButton: {
		'&:hover': {
			color: 'white',
		},
	},
}));

const CustomHeader = ({
	pageTitle,
	isSearchVisible,
	folhaDePagamento,
	routeForCreateEmployees,
	routeForCreatePayroll,
	autorizarButtons,
	arquivosLote,
}) => {
	const classes = useStyles();
	const { section } = useParams();
	const token = useAuth();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const history = useHistory();
	const dispatch = useDispatch();
	const dadosCadastrais = useSelector((state) => state.cadastroEtapa3);
	const headerLike = useSelector((state) => state.headerLike);
	const userData = useSelector((state) => state.userData);
	const me = useSelector((state) => state.me);
	const [filterStyle, setFilterStyle] = useState(false);
	const [openAutorizarModal, setOpenAutorizarModal] = useState(false);
	const [openCadastrarLoteModal, setOpenCadastrarLoteModal] = useState(false);
	const [buscarHeader, setBuscarHeader] = useState('');
	const debouncedLike = useDebounce(buscarHeader, 500);

	useEffect(() => {
		dispatch(postAuthMeAction(token));
	}, []);

	useEffect(() => {
		dispatch(setAutorizarPagamentoModal(openAutorizarModal));
	}, [openAutorizarModal]);

	useEffect(() => {
		dispatch(setCadastrarLoteModal(openCadastrarLoteModal));
	}, [openCadastrarLoteModal]);

	const handleRedirectArquivosLote = () => {
		const path = generatePath(
			'/dashboard/folha-de-pagamento/acao/arquivos-lote'
		);
		history.push(path);
	};

	const handleRedirectFolhaDePagamento = () => {
		const path = generatePath(
			'/dashboard/folha-de-pagamento/acao/lista-folhas-de-pagamento'
		);
		history.push(path);
	};

	useEffect(() => {
		dispatch(setHeaderLike(debouncedLike));
	}, [debouncedLike]);

	return (
		<Box className={classes.header}>
			<Box
				style={{
					display: 'flex',
					alignSelf: 'baseline',
					marginLeft: '30px',
				}}
			>
				<Typography
					style={{
						fontSize: '19px',
						color: APP_CONFIG.mainCollors.primary,
					}}
				>
					{pageTitle}
				</Typography>
			</Box>
			{/* <>
				{isSearchVisible ? (
					<TextField
						value={buscarHeader}
						onChange={(e) => setBuscarHeader(e.target.value)}
						variant="outlined"
						label=""
						style={{ width: '40%' }}
						InputProps={{
							endAdornment: (
								<SearchIcon
									style={{
										fontSize: '30px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								/>
							),
						}}
					/>
				) : (
					<Box style={{ width: '49%' }} />
				)}
				{folhaDePagamento && isSearchVisible ? (
					<Box style={{ display: 'flex' }}>
						<Box
							style={{ marginLeft: '10px' }}
							onMouseOver={() => setFilterStyle(true)}
							onMouseLeave={() => setFilterStyle(false)}
						>
							<Button
								variant="outlined"
								style={{
									borderRadius: '37px',
									borderColor: APP_CONFIG.mainCollors.primary,
									borderWidth: '1px',
								}}
								className={classes.filterButton}
							>
								<FilterAltIcon
									style={{
										color: filterStyle
											? 'white'
											: APP_CONFIG.mainCollors.primary,
									}}
								/>

								<Typography
									style={{
										fontFamily: 'Montserrat-Regular',
										fontSize: '14px',
										color: filterStyle
											? 'white'
											: APP_CONFIG.mainCollors.primary,
									}}
								>
									FILTROS
								</Typography>
							</Button>
						</Box>
						{autorizarButtons ? (
							<>
								<Box style={{ marginLeft: '10px' }}>
									<Box
										style={{ marginLeft: '10px' }}
										onClick={() => {
											dispatch(setAutorizarPagamentoModal(true));
											dispatch(setAutorizarTodos(true));
										}}
									>
										<CustomButton color="purple">
											<Typography
												style={{
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
												}}
											>
												Autorizar Todos
											</Typography>
										</CustomButton>
									</Box>
								</Box>
								<Box
									style={{ marginLeft: '10px' }}
									onClick={() => {
										dispatch(setAutorizarPagamentoModal(true));
										dispatch(setAutorizarTodos(false));
									}}
								>
									<CustomButton color="horizontalGradient">
										<AddIcon
											style={{ color: 'white', marginRight: '10px' }}
										/>
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '14px',
												color: 'white',
											}}
										>
											Autorizar pagamento
										</Typography>
									</CustomButton>
								</Box>
							</>
						) : pageTitle === 'Arquivos em lote' ? (
							<>
								<Box
									style={{ marginLeft: '10px' }}
									onClick={() => handleRedirectFolhaDePagamento()}
								>
									<CustomButton color="purple">
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '12px',
												color: 'white',
											}}
										>
											Folha de Pagamento
										</Typography>
									</CustomButton>
								</Box>
								<Box
									onClick={() => dispatch(setCadastrarLoteModal(true))}
									style={{ marginLeft: '10px' }}
								>
									<CustomButton color="horizontalGradient">
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '14px',
												color: 'white',
											}}
										>
											Cadastrar em Lote por arquivo
										</Typography>
									</CustomButton>
								</Box>
							</>
						) : (
							<>
								<Box style={{ marginLeft: '10px' }}>
									<CustomButton
										color="purple"
										onClick={() =>
											arquivosLote
												? handleRedirectArquivosLote()
												: dispatch(setCadastrarLoteModal(true))
										}
									>
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '12px',
												color: 'white',
											}}
										>
											{arquivosLote
												? 'Arquivos em Lote'
												: 'Cadastrar em Lote por arquivo'}
										</Typography>
									</CustomButton>
								</Box>
								<Box
									style={{ marginLeft: '10px' }}
									component={Link}
									to={
										routeForCreateEmployees
											? 'cadastrar-funcionarios-e-grupos'
											: routeForCreatePayroll
											? 'cadastrar-folha-de-pagamento'
											: 'folha-de-pagamento/acao/cadastrar-funcionarios-e-grupos'
									}
								>
									<CustomButton color="horizontalGradient">
										<AddIcon
											style={{ color: 'white', marginRight: '10px' }}
										/>
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												fontSize: '14px',
												color: 'white',
											}}
										>
											Novo cadastro
										</Typography>
									</CustomButton>
								</Box>
							</>
						)}
					</Box>
				) : (
					<>
						<Box
							style={{
								height: '50px',
								width: '1px',
								backgroundColor: APP_CONFIG.mainCollors.primary,
							}}
						/>
						
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<AccountCircleRoundedIcon
								style={{
									fontSize: '50px',
									color: APP_CONFIG.mainCollors.primary,
									marginRight: '10px',
								}}
							/>
							<Box style={{ display: 'flex', flexDirection: 'column' }}>
								<Typography
									style={{
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
										minWidth: '180px',
									}}
								>
									{dadosCadastrais.razao_social
										? dadosCadastrais.razao_social
										: userData.razao_social
										? userData.razao_social
										: null}
								</Typography>
								<Typography
									style={{
										fontSize: '16px',
										color: APP_CONFIG.mainCollors.primary,
										minWidth: '180px',
									}}
								>
									{me.nome
										? me.nome
										: userData.nome
										? userData.nome
										: null}
								</Typography>
								<Typography
									style={{
										fontSize: '15px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								>
									{dadosCadastrais.documento_socio
										? dadosCadastrais.documento_socio
										: userData.cnpj
										? userData.cnpj
										: null}
								</Typography>
							</Box>
						</Box>
						<Box
							style={{
								height: '50px',
								width: '1px',
								backgroundColor: APP_CONFIG.mainCollors.primary,
							}}
						/>
						
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
							onClick={() => {
								localStorage.removeItem('@auth');
								history.push('/login');
							}}
						>
							<LogoutRoundedIcon
								style={{
									fontSize: '50px',
									color: APP_CONFIG.mainCollors.primary,
									marginRight: '10px',
								}}
							/>
							<Typography
								style={{
									fontSize: '16px',
									color: APP_CONFIG.mainCollors.primary,
								}}
							>
								SAIR
							</Typography>
						</Box>
					</>
				)}
			</>
		 */}
		</Box>
	);
};

export default CustomHeader;
