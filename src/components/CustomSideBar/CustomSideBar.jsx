import { Box, Button, Divider } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useAuth from '../../hooks/useAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { APP_CONFIG } from '../../constants/config';
import { loadUserData, setSideBar } from '../../actions/actions';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

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
	const { section } = useParams();
	const token = useAuth();
	const [subMenuTransferencia, setSubMenuTransferencia] = useState(false);
	const [subMenuWallet, setSubMenuWallet] = useState(false);
	const userData = useSelector((state) => state.userData);
	const sideBar = useSelector((state) => state.sideBar);
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const history = useHistory();
	const [isSaldoVisible, setIsSaldoVisible] = useState(true);
	const [permissoes, setPermissoes] = useState([]);
	const [collapseAdministradores, setCollapseAdministradores] =
		useState(false);

	/* useEffect(() => {
		dispatch(loadUserData(token));
	}, [token]); */

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const getSideBarItemBackgroundColor = (index) =>
		index === sideBar ? 'white' : null;

	const getSideBarItemColor = (index) =>
		index === sideBar ? APP_CONFIG.mainCollors.primary : 'white';

	/* const handleListItemClick = (event, index) => {
		
		setSelectedIndex(index);
	}; */

	useEffect(() => {
		dispatch(
			setSideBar(
				section === 'home'
					? 0
					: section === 'candidatos'
					? 1
					: section === 'empresas'
					? 2
					: section === 'vagas'
					? 3
					: section === 'categorias'
					? 4
					: section === 'processo-de-selecao'
					? 5
					: null
			)
		);
	}, [section]);

	const drawer = (
		<Box
			style={{
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
				background: APP_CONFIG.mainCollors.primary,
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
					marginTop: '70px',
				}}
			>
				<img
					src={APP_CONFIG.assets.loginSvg}
					alt={''}
					style={{
						width: '180px',
						alignSelf: 'center',
					}}
				/>
			</Box>
			<Box className={classes.toolbar} />

			<List style={{ marginLeft: '30px', marginTop: '10px' }}>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 0}
					onClick={(event) => dispatch(setSideBar(0))}
					to="/dashboard/home"
					style={
						sideBar === 0
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
					/* disabled={props.cadastro ? true : false}
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
					} */
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
								sideBar === 0
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
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
					selected={sideBar === 1}
					onClick={(event) => dispatch(setSideBar(1))}
					to="/dashboard/candidatos"
					style={
						sideBar === 1
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<AssignmentIndIcon
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
								sideBar === 1
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Candidatos
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 2}
					onClick={(event) => dispatch(setSideBar(2))}
					to="/dashboard/empresas"
					style={
						sideBar === 2
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<BusinessIcon
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
								sideBar === 2
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Empresas
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 3}
					onClick={(event) => dispatch(setSideBar(3))}
					to="/dashboard/vagas"
					style={
						sideBar === 3
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<NoteAddIcon
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
								sideBar === 3
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Vagas
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 4}
					onClick={(event) => dispatch(setSideBar(4))}
					to="/dashboard/categorias"
					style={
						sideBar === 4
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<CreateIcon
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
								sideBar === 4
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Categorias
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 5}
					onClick={(event) => dispatch(setSideBar(5))}
					to="/dashboard/processo-de-selecao"
					style={
						sideBar === 5
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<PersonIcon
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
								sideBar === 5
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Processo de seleção
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem
					disabled={props.cadastro ? true : false}
					component={Link}
					button
					selected={sideBar === 6}
					onClick={(event) => {
						dispatch(setSideBar(6));
						setCollapseAdministradores(!collapseAdministradores);
					}}
					style={
						sideBar === 6
							? {
									backgroundColor: 'white',
									borderTopLeftRadius: 32,
									borderBottomLeftRadius: 32,
							  }
							: { borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }
					}
				>
					<ListItemIcon style={{ width: '60px' }}>
						<SupervisorAccountIcon
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
								sideBar === 6
									? {
											fontWeight: 'bold',
											fontFamily: 'BwGradualDEMO-Bold',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
									  }
									: {
											fontFamily: 'BwGradualDEMO-Regular',
											fontSize: '14px',
											color: 'white',
									  }
							}
						>
							Admnistradores
						</Typography>
					</ListItemText>
				</ListItem>
				{collapseAdministradores ? (
					<>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={sideBar === 6.1}
							onClick={(event) => dispatch(setSideBar(6.1))}
							to="/dashboard/administradores-empresa"
							style={
								sideBar === 6.1
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
							}
						>
							<ListItemText>
								<Typography
									style={
										sideBar === 6.1
											? {
													fontWeight: 'bold',
													fontFamily: 'BwGradualDEMO-Bold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'BwGradualDEMO-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Empresas
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem
							disabled={props.cadastro ? true : false}
							component={Link}
							button
							selected={sideBar === 6.2}
							onClick={(event) => dispatch(setSideBar(6.2))}
							to="/dashboard/administradores-diretoria"
							style={
								sideBar === 6.2
									? {
											backgroundColor: 'white',
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
									: {
											borderTopLeftRadius: 32,
											borderBottomLeftRadius: 32,
									  }
							}
						>
							<ListItemText>
								<Typography
									style={
										sideBar === 6.2
											? {
													fontWeight: 'bold',
													fontFamily: 'BwGradualDEMO-Bold',
													fontSize: '14px',
													color: APP_CONFIG.mainCollors.primary,
											  }
											: {
													fontFamily: 'BwGradualDEMO-Regular',
													fontSize: '14px',
													color: 'white',
											  }
									}
								>
									Diretoria
								</Typography>
							</ListItemText>
						</ListItem>
					</>
				) : null}
			</List>

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
							fontFamily: 'BwGradualDEMO-Regular',
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
									fontFamily: 'BwGradualDEMO-Regular',
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
								fontFamily: 'BwGradualDEMO-Regular',
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
							fontFamily: 'BwGradualDEMO-Bold',
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
