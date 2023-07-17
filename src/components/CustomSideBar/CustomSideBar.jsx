import { Box, Button, Divider } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
/* import {
	loadContaId,
	loadPermissao,
	postAuthMeAction,
} from '../../actions/actions'; */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import CurrencyFormat from 'react-currency-format';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router';

import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import PixIcon from '@mui/icons-material/Pix';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BlockIcon from '@material-ui/icons/Block';
import LinkIcon from '@mui/icons-material/Link';
import LoopIcon from '@mui/icons-material/Loop';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TerminalIcon from '@mui/icons-material/Terminal';
import useAuth from '../../hooks/useAuth';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CustomButton from '../CustomButton/CustomButton';
import { toast } from 'react-toastify';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { APP_CONFIG } from '../../constants/config';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { loadUserData } from '../../actions/actions';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		backgroundColor: 'white',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		borderRightWidth: '0px',
		background: APP_CONFIG.mainCollors.drawerSideBar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function CustomSideBar(props) {
	const dispatch = useDispatch();
	const { id, section } = useParams();
	const token = useAuth();
	/* const contaSelecionada = useSelector((state) => state.conta); */
	/* 	const userData = useSelector((state) => state.userData); */
	const [subMenuTransferencia, setSubMenuTransferencia] = useState(false);
	const [subMenuWallet, setSubMenuWallet] = useState(false);
	const userData = useSelector((state) => state.userData);
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const history = useHistory();
	const [isSaldoVisible, setIsSaldoVisible] = useState(true);
	const [permissoes, setPermissoes] = useState([]);

	useEffect(() => {
		dispatch(loadUserData(token));
	}, [token]);

	/* const me = useSelector((state) => state.me); */
	/* const userPermissao = useSelector((state) => state.userPermissao); */
	/* useEffect(() => {
		dispatch(postAuthMeAction(token));
	}, []);
 */
	/* useEffect(() => {
		if (me.id !== undefined) {
			dispatch(loadPermissao(token, me.id));
		}
	}, [me.id]); */

	/* useEffect(() => {
		const { permissao } = userPermissao;
		setPermissoes(permissao.map((item) => item.tipo));
	}, [userPermissao]); */

	/* useEffect(() => {
		if (id && token && section !== 'taxa') {
			dispatch(loadContaId(token, id));
		}
	}, [id, token, userData]); */

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const getSideBarItemBackgroundColor = (index) =>
		index === selectedIndex ? 'white' : null;

	const getSideBarItemColor = (index) =>
		index === selectedIndex ? APP_CONFIG.mainCollors.primary : 'white';

	const handleListItemClick = (event, index) => {
		/* if (subMenuTransferencia === true) {
			setSubMenuTransferencia(false);
		}
		if (subMenuWallet === true) {
			setSubMenuWallet(false);
		} */
		setSelectedIndex(index);
	};

	const drawer = (
		<Box
			style={{
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
				background: APP_CONFIG.mainCollors.secondaryGradient,
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<Box
				style={{
					width: '100%',
					justifyContent: 'center',
					display: 'flex',
					marginTop: '40px',
				}}
			>
				<img
					src={APP_CONFIG.assets.smallWhiteLogo}
					alt={''}
					style={{
						width:
							APP_CONFIG.titleLogin === 'Aprobank' || 'Simer Bank'
								? '170px'
								: '50px',
						alignSelf: 'center',
					}}
				/>
			</Box>
			<Box className={classes.toolbar} />
			<Divider
				style={{
					backgroundColor: 'gray',
					width: '90%',
					alignSelf: 'center',
				}}
			/>
			<Typography
				style={{ color: '#fff', alignSelf: 'center', marginTop: '5px' }}
			>
				Adquirência
			</Typography>

			<List style={{ marginLeft: '30px', marginTop: '10px' }}>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={selectedIndex === 0}
					onClick={(event) => handleListItemClick(event, 0)}
					to="/dashboard/home"
					style={
						selectedIndex === 0
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: {}
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<HomeIcon
							fontSize="50px"
							style={{
								backgroundColor: getSideBarItemBackgroundColor(0),
								color: getSideBarItemColor(0),
								width: '48px',
								marginRight: '10px',
								fontSize: '48px',
								borderRadius: '33px',
								padding: '5px',
							}}
						/>
					</ListItemIcon>
					<ListItemText>
						<Typography
							style={
								selectedIndex === 0
									? {
											fontWeight: 'bold',
											fontFamily: 'Montserrat-SemiBold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Home
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={selectedIndex === 1}
					onClick={(event) => handleListItemClick(event, 1)}
					to="/dashboard/cobrancas"
					style={
						selectedIndex === 1
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: {}
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<AttachMoneyIcon
							fontSize="50px"
							style={{
								backgroundColor: getSideBarItemBackgroundColor(1),
								color: getSideBarItemColor(1),
								width: '48px',
								marginRight: '10px',
								fontSize: '48px',
								borderRadius: '33px',
								padding: '5px',
							}}
						/>
					</ListItemIcon>
					<ListItemText>
						<Typography
							style={
								selectedIndex === 1
									? {
											fontWeight: 'bold',
											fontFamily: 'Montserrat-SemiBold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Cobranças
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={selectedIndex === 2}
					onClick={(event) => handleListItemClick(event, 2)}
					to="/dashboard/financas"
					style={
						selectedIndex === 2
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: {}
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<LocalAtmIcon
							fontSize="50px"
							style={{
								backgroundColor: getSideBarItemBackgroundColor(2),
								color: getSideBarItemColor(2),
								width: '48px',
								marginRight: '10px',
								fontSize: '48px',
								borderRadius: '33px',
								padding: '5px',
							}}
						/>
					</ListItemIcon>
					<ListItemText>
						<Typography
							style={
								selectedIndex === 2
									? {
											fontWeight: 'bold',
											fontFamily: 'Montserrat-SemiBold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Finanças
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={selectedIndex === 3}
					onClick={(event) => handleListItemClick(event, 3)}
					to="/dashboard/outros-servicos"
					style={
						selectedIndex === 3
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: {}
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<TextSnippetIcon
							fontSize="50px"
							style={{
								backgroundColor: getSideBarItemBackgroundColor(3),
								color: getSideBarItemColor(3),
								width: '48px',
								marginRight: '10px',
								fontSize: '48px',
								borderRadius: '33px',
								padding: '5px',
							}}
						/>
					</ListItemIcon>
					<ListItemText>
						<Typography
							style={
								selectedIndex === 3
									? {
											fontWeight: 'bold',
											fontFamily: 'Montserrat-SemiBold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Outros serviços
						</Typography>
					</ListItemText>
				</ListItem>
			</List>
			{userData && userData.agent ? (
				<>
					<Divider
						style={{
							backgroundColor: 'gray',
							width: '90%',
							alignSelf: 'center',
						}}
					/>
					<Typography
						style={{
							color: '#fff',
							alignSelf: 'center',
							marginTop: '5px',
						}}
					>
						Representante
					</Typography>
					<List style={{ marginLeft: '30px', marginTop: '10px' }}>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={selectedIndex === 4}
							onClick={(event) => handleListItemClick(event, 4)}
							to="/dashboard/adm"
							style={
								selectedIndex === 4
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {}
							}
						>
							<ListItemIcon style={{ width: '60px' }}>
								<DashboardIcon
									fontSize="50px"
									style={{
										backgroundColor: getSideBarItemBackgroundColor(4),
										color: getSideBarItemColor(4),
										width: '48px',
										marginRight: '10px',
										fontSize: '48px',
										borderRadius: '33px',
										padding: '5px',
									}}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography
									style={
										selectedIndex === 4
											? {
													fontWeight: 'bold',
													fontFamily: 'Montserrat-SemiBold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Dashboard
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={selectedIndex === 5}
							onClick={(event) => handleListItemClick(event, 5)}
							to="/dashboard/gerenciar-contas"
							style={
								selectedIndex === 5
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {}
							}
						>
							<ListItemIcon style={{ width: '60px' }}>
								<GroupsIcon
									fontSize="50px"
									style={{
										backgroundColor: getSideBarItemBackgroundColor(5),
										color: getSideBarItemColor(5),
										width: '48px',
										marginRight: '10px',
										fontSize: '48px',
										borderRadius: '33px',
										padding: '5px',
									}}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography
									style={
										selectedIndex === 5
											? {
													fontWeight: 'bold',
													fontFamily: 'Montserrat-SemiBold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Gerenciar Contas
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={selectedIndex === 6}
							onClick={(event) => handleListItemClick(event, 6)}
							to="/dashboard/historico-de-transacoes"
							style={
								selectedIndex === 6
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {}
							}
						>
							<ListItemIcon style={{ width: '60px' }}>
								<ComputerIcon
									fontSize="50px"
									style={{
										backgroundColor: getSideBarItemBackgroundColor(6),
										color: getSideBarItemColor(6),
										width: '48px',
										marginRight: '10px',
										fontSize: '48px',
										borderRadius: '33px',
										padding: '5px',
									}}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography
									style={
										selectedIndex === 6
											? {
													fontWeight: 'bold',
													fontFamily: 'Montserrat-SemiBold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Transações
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={selectedIndex === 7}
							onClick={(event) => handleListItemClick(event, 7)}
							to="/dashboard/planos-de-venda"
							style={
								selectedIndex === 7
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {}
							}
						>
							<ListItemIcon style={{ width: '60px' }}>
								<MenuBookIcon
									fontSize="50px"
									style={{
										backgroundColor: getSideBarItemBackgroundColor(7),
										color: getSideBarItemColor(7),
										width: '48px',
										marginRight: '10px',
										fontSize: '48px',
										borderRadius: '33px',
										padding: '5px',
									}}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography
									style={
										selectedIndex === 7
											? {
													fontWeight: 'bold',
													fontFamily: 'Montserrat-SemiBold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Planos de Vendas
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={selectedIndex === 8}
							onClick={(event) => handleListItemClick(event, 8)}
							to="/dashboard/logs"
							style={
								selectedIndex === 8
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {}
							}
						>
							<ListItemIcon style={{ width: '60px' }}>
								<VisibilityIcon
									fontSize="50px"
									style={{
										backgroundColor: getSideBarItemBackgroundColor(8),
										color: getSideBarItemColor(8),
										width: '48px',
										marginRight: '10px',
										fontSize: '48px',
										borderRadius: '33px',
										padding: '5px',
									}}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography
									style={
										selectedIndex === 8
											? {
													fontWeight: 'bold',
													fontFamily: 'Montserrat-SemiBold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'Montserrat-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Logs
								</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</>
			) : null}

			{/* {userData && userData.saldo && userData.saldo.valor && (
				<Box
					style={{
						display: 'flex',
						alignSelf: 'center',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography
						style={{
							fontFamily: 'Montserrat-Regular',
							fontSize: '20px',
							color: 'white',
							marginTop: '30px',
						}}
					>
						Saldo disponível:
					</Typography>
					{isSaldoVisible ? (
						<>
							<Typography
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: '25px',
									color: 'white',
									marginTop: '10px',
								}}
							>
								R${' '}
								{parseFloat(userData.saldo.valor).toLocaleString(
									'pt-br',
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									}
								)}
							</Typography>
						</>
					) : (
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '25px',
								color: 'white',
								marginTop: '10px',
							}}
						>
							*******
						</Typography>
					)}

					<Button onClick={() => setIsSaldoVisible(!isSaldoVisible)}>
						{isSaldoVisible ? (
							<VisibilityOffIcon style={{ color: 'white' }} />
						) : (
							<VisibilityIcon style={{ color: 'white' }} />
						)}
					</Button>
				</Box>
			)} */}

			{/* {id &&
			token &&
			section !== 'taxa' &&
			section !== 'detalhes-pre-conta' ? (
				<Box
					style={{ color: 'black' }}
					display="flex"
					flexDirection="column"
					alignContent="center"
					alignItems="center"
					marginBottom="30px"
				>
					<Typography variant="h5" style={{ color: 'white' }}>
						Conta Selecionada:{' '}
					</Typography>
					<Typography
						style={{ wordWrap: 'break-word', color: 'white' }}
						align="center"
					>
						{contaSelecionada.nome ? contaSelecionada.nome : null}
					</Typography>
					<Typography
						style={{ wordWrap: 'break-word', color: 'white' }}
						align="center"
					>
						{contaSelecionada.razao_social
							? contaSelecionada.razao_social
							: null}
					</Typography>
					<Typography style={{ color: 'white' }}>
						{contaSelecionada.documento
							? contaSelecionada.documento
							: null}
					</Typography>
					<Typography style={{ color: 'white' }}>
						{contaSelecionada.cnpj ? contaSelecionada.cnpj : null}
					</Typography>
					<Typography style={{ color: 'white' }}>
						{contaSelecionada.saldo ? (
							<CurrencyFormat
								value={contaSelecionada.saldo.valor.replace('.', ',')}
								displayType={'text'}
								thousandSeparator={'.'}
								decimalSeparator={','}
								prefix={'R$ '}
								renderText={(value) => <div> Saldo: {value}</div>}
							/>
						) : null}
					</Typography>
				</Box>
			) : null} */}

			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<Box
					style={{
						marginBottom: '0px',
						justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Button
						style={{
							width: '0.9rem',
							color: 'gray',
							fontFamily: 'Montserrat-ExtraBold',
							marginBottom: '10px',
						}}
						variant="contained"
						onClick={() => {
							localStorage.removeItem('@auth');
							history.push('/login');
						}}
					>
						Sair
					</Button>
				</Box>
			</Box>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />

			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

CustomSideBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default CustomSideBar;
