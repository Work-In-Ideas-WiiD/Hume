import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	TablePagination,
	TextField,
	Typography,
	makeStyles,
	Paper,
	Grid,
	CardMedia,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	delAdmin,
	delCandidatoAction,
	delDocumento,
	getAllContasAction,
	getAprovarContaAction,
	getCandidatoAction,
	getContasAction,
	getContasExportAction,
	getListaAdministradorAction,
	getReenviarTokenUsuarioAction,
	getStatsAction,
	loadDocumentos,
	postCriarAdminAction,
	postStatusAction,
} from '../../actions/actions';
import { generatePath, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSideBar from '../../components/CustomSideBar/CustomSideBar';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { Pagination } from '@material-ui/lab';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useDebounce from '../../hooks/useDebounce';
import { APP_CONFIG } from '../../constants/config';
import InputMask from 'react-input-mask';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import PersonIcon from '@mui/icons-material/Person';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReactInputMask from 'react-input-mask';
import CustomCardInfos from '../../components/CustomCardInfos/CustomCardInfos';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: '50px',
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	tableContainer: { marginTop: '1px' },
	pageTitle: {
		color: APP_CONFIG.mainCollors.black,
		fontFamily: 'BwGradualDEMO-Regular',
	},
}));

const columns = [
	{ headerText: 'Nome do candidato', key: 'name' },
	{ headerText: 'Status - Candidato', key: 'type' },
	{ headerText: '', key: 'menu' },
];

const Dashboard = () => {
	const [filters, setFilters] = useState({
		like: '',
		order: '',
		mostrar: '',
	});
	const debouncedLike = useDebounce(filters.like, 800);
	const [loading, setLoading] = useState(false);
	const token = useAuth();
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const candidato = useSelector((state) => state.candidato);
	const stats = useSelector((state) => state.stats);
	const [verCandidatoModal, setVerCandidatoModal] = useState(false);
	const [verCandidato, setVerCandidato] = useState({});
	useEffect(() => {
		dispatch(
			getCandidatoAction(
				token,
				page,
				debouncedLike,
				filters.order,
				filters.mostrar
			)
		);
	}, [page, debouncedLike, filters.order, filters.mostrar]);

	useEffect(() => {
		dispatch(getStatsAction(token));
	}, []);

	const handleChangePage = (e, value) => {
		setPage(value);
	};

	const handleClickRow = (row) => {
		setVerCandidato(row);

		setVerCandidatoModal(true);
	};

	const Editar = (row) => {
		const [anchorEl, setAnchorEl] = useState(null);

		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleExcluirCandidato = async (row) => {
			setLoading(true);
			const resDelCandidato = await dispatch(
				delCandidatoAction(token, row.row.id)
			);
			if (resDelCandidato) {
				setLoading(false);
				toast.error('Erro ao deletar candidato');
			} else {
				setLoading(false);
				toast.success('Candidato deletado com sucesso!');
				await dispatch(
					getCandidatoAction(
						token,
						page,
						debouncedLike,
						filters.order,
						filters.mostrar
					)
				);
			}
		};

		return (
			<Box>
				<IconButton
					style={{ height: '15px', width: '10px' }}
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreHorizIcon style={{}} />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem
						onClick={() => handleExcluirCandidato(row)}
						style={{ color: APP_CONFIG.mainCollors.black }}
					>
						<CancelIcon style={{ marginRight: '5px' }} />
						Excluir
					</MenuItem>
					<MenuItem
						onClick={() => handleClickRow(row.row)}
						style={{ color: APP_CONFIG.mainCollors.black }}
					>
						<VisibilityIcon style={{ marginRight: '5px' }} />
						Ver mais
					</MenuItem>
				</Menu>
			</Box>
		);
	};

	useEffect(() => {
		setVerCandidato({});
	}, []);

	return (
		<Box className={classes.root}>
			<LoadingScreen isLoading={loading} />
			<Box className={classes.headerContainer}>
				<Box
					style={{
						marginBottom: '20px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography className={classes.pageTitle}>DASHBOARD</Typography>
					<Box style={{ alignSelf: 'flex-end' }}>
						<IconButton
							style={{
								backgroundColor: APP_CONFIG.mainCollors.backgrounds,
								color: APP_CONFIG.mainCollors.primaryVariant,
							}}
							onClick={() => window.location.reload(false)}
						>
							<RefreshIcon></RefreshIcon>
						</IconButton>
					</Box>
				</Box>
				<Grid container spacing={2}>
					<Grid item sm={3} xs={12}>
						<CustomCardInfos
							text="EMPRESAS CADASTRADAS"
							subtext={stats?.empresas ? stats.empresas.total : null}
							icon="paper"
						/>
					</Grid>
					<Grid item sm={3} xs={12}>
						<CustomCardInfos
							text="CANDIDATOS EM SELEÇÃO"
							subtext={
								stats?.candidatos ? stats.candidatos.selecao : null
							}
							icon="pen"
						/>
					</Grid>
					<Grid item sm={3} xs={12}>
						<CustomCardInfos
							text="VAGAS TOTAIS"
							subtext={stats?.vagas ? stats.vagas.total : null}
							icon="paper"
						/>
					</Grid>
					<Grid item sm={3} xs={12}>
						<CustomCardInfos
							text="CANDIDATOS APROVADOS"
							subtext={
								stats?.candidatos ? stats.candidatos.aprovados : null
							}
							icon="paper"
						/>
					</Grid>
				</Grid>

				<Box
					style={{
						width: '100%',
						backgroundColor: APP_CONFIG.mainCollors.backgrounds,
						marginTop: '30px',
					}}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignContent="center"
						alignItems="center"
						style={{ margin: 30 }}
					>
						<Typography className={classes.pageTitle}>
							CANDIDATOS
						</Typography>

						<Box>
							<CustomButton
								color="colorPrimary"
								component={Link}
								to="/dashboard/candidatos"
							>
								<Box display="flex" alignItems="center">
									VER TUDO
								</Box>
							</CustomButton>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box className={classes.tableContainer}>
				{candidato.data && candidato.per_page ? (
					<CustomTable
						columns={columns}
						data={candidato.data}
						Editar={Editar}
					/>
				) : (
					<Box>
						<LinearProgress color="secondary" />
					</Box>
				)}
				<Box
					display="flex"
					alignSelf="flex-end"
					marginTop="8px"
					justifyContent="space-between"
				>
					<Pagination
						variant="outlined"
						color="primary"
						size="large"
						count={candidato.last_page}
						onChange={handleChangePage}
						page={page}
					/>
				</Box>
			</Box>
			<Dialog
				open={verCandidatoModal}
				onClose={() => {
					{
						setVerCandidatoModal(false);
						setVerCandidato({});
					}
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflowY: 'scroll',
				}}
				maxWidth="800px"
				fullWidth
			>
				<>
					<LoadingScreen isLoading={loading} />
					<Box
						style={{
							backgroundColor: APP_CONFIG.mainCollors.backgrounds,
							width: '800px',
							padding: '50px',
						}}
					>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						>
							<Box
								style={{
									display: 'flex',
									borderRadius: 60,
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid gray',
									height: 100,
									width: 100,
									backgroundColor: '#fff',
								}}
							>
								{verCandidato?.candidato?.arquivo === '' ? (
									<>
										<PersonIcon
											style={{
												fontSize: '30px',
												color: APP_CONFIG.mainCollors.black,
											}}
										/>
									</>
								) : (
									<>
										<PictureAsPdfIcon />
									</>
								)}
							</Box>

							<Box style={{ marginTop: '20px' }}>
								<CustomButton
									href={verCandidato?.candidato?.arquivo_url}
									download
									color="colorTertiary"
								>
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<DownloadIcon style={{ marginRight: '5px' }} />
										<Typography>Fazer download</Typography>
									</Box>
								</CustomButton>
							</Box>
						</Box>
						<Box style={{ marginTop: '10px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Dados do candidato
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Nome
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.name}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											E-mail
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.email}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											CPF
										</Typography>
										<InputMask
											mask={'999.999.999-99'}
											value={verCandidato?.candidato?.cpf}
											disabled
										>
											{() => (
												<TextField
													disabled
													InputProps={{
														disableUnderline: true,
													}}
													variant="filled"
													InputLabelProps={{ shrink: true }}
													required
													fullWidth
												/>
											)}
										</InputMask>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Telefone
										</Typography>
										<ReactInputMask
											disabled
											mask="(99) 99999-9999"
											value={verCandidato?.candidato?.telefone}
										>
											{() => (
												<TextField
													disabled
													InputProps={{ disableUnderline: true }}
													variant="filled"
													InputLabelProps={{ shrink: true }}
													fullWidth
													required
													type="tel"
												/>
											)}
										</ReactInputMask>
									</Grid>

									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Data de nascimento
										</Typography>
										<TextField
											disabled
											fullWidth
											variant="filled"
											InputLabelProps={{
												shrink: true,
												pattern: 'd {4}- d {2}- d {2} ',
											}}
											type="date"
											value={
												verCandidato?.candidato?.data_nascimento
											}
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											RG
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.rg}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Conselho regulador
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={
												verCandidato?.candidato?.conselho_regulador
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Especialidade
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.especialidade}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Estado civil
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.estado_civil}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Grupo atuante
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.grupo_atuante}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Nacionalidade
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.nacionalidade}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Sexo
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.sexo}
											required
											fullWidth
										/>
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Box style={{ marginTop: '60px' }}>
							<Typography
								style={{
									fontFamily: 'BwGradualDEMO-Bold',
									color: APP_CONFIG.mainCollors.primaryVariant,
								}}
							>
								Endereço
							</Typography>
							<Box style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											CEP
										</Typography>
										<InputMask
											disabled
											mask={'99999-999'}
											value={verCandidato?.candidato?.endereco?.cep}
										>
											{() => (
												<TextField
													disabled
													InputProps={{
														disableUnderline: true,
													}}
													variant="filled"
													InputLabelProps={{ shrink: true }}
													required
													fullWidth
												/>
											)}
										</InputMask>
									</Grid>
									<Grid item sm={8} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Rua
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={verCandidato?.candidato?.endereco?.rua}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={3} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Número
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={
												verCandidato?.candidato?.endereco?.numero
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Bairro
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={
												verCandidato?.candidato?.endereco?.bairro
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={5} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Complemento
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={
												verCandidato?.candidato?.endereco
													?.complemento
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Cidade
										</Typography>
										<TextField
											disabled
											InputProps={{
												disableUnderline: true,
												sx: { borderRadius: 0 },
											}}
											variant="filled"
											value={
												verCandidato?.candidato?.endereco?.cidade
											}
											required
											fullWidth
										/>
									</Grid>
									<Grid item sm={4} xs={12}>
										<Typography
											style={{
												fontFamily: 'BwGradualDEMO-Regular',
												color: APP_CONFIG.mainCollors
													.primaryVariant,
												fontSize: 13,
											}}
										>
											Estado
										</Typography>
										<TextField
											disabled
											InputProps={{ disableUnderline: true }}
											variant="filled"
											value={
												verCandidato?.candidato?.endereco?.estado
											}
											required
											fullWidth
										/>
									</Grid>
								</Grid>
							</Box>
						</Box>
						{/* <Box
									style={{
										display: 'flex',
										marginTop: '30px',
										alignSelf: 'center',
										justifyContent: 'center',
									}}
								>
									<CustomButton
										color="colorPrimary"
										onClick={() => handleCriarAdmin()}
									>
										<Typography>Salvar</Typography>
									</CustomButton>
								</Box> */}
					</Box>
				</>
			</Dialog>
		</Box>
	);
};

export default Dashboard;
