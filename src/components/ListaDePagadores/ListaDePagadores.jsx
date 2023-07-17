import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	Button,
	IconButton,
	LinearProgress,
	makeStyles,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTransacaoTedAction,
	loadBoletoList,
	loadHistoricoTransferencia,
	loadPagadores,
	loadPagamentosList,
	loadTedTransactionsList,
	setPagadorId,
} from '../../actions/actions';
import useAuth from '../../hooks/useAuth';
import SearchIcon from '@mui/icons-material/Search';
import CustomCollapseTablePix from '../CustomCollapseTablePix/CustomCollapseTablePix';
import CustomRoundedCard from '../CustomRoundedCard/CustomRoundedCard';
import CustomFilterButton from '../CustomFilterButton/CustomFilterButton';
import moment from 'moment';
import 'moment/locale/pt-br';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import { getHistoricoTransferencia } from '../../services/services';
import useDebounce from '../../hooks/useDebounce';
import { Pagination } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({}));

const ListaDePagadores = ({ title, changePath, ...rest }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const token = useAuth();
	const [page, setPage] = useState(1);
	const [like, setLike] = useState('');
	const [order, setOrder] = useState('');
	const [mostrar, setMostrar] = useState(10);

	const pagadoresList = useSelector((state) => state.pagadoresUser);

	moment.locale();
	let debouncedLike = useDebounce(like, 1000);

	useEffect(() => {
		dispatch(loadPagadores(token, page, like, order, mostrar));
	}, [token, page, debouncedLike]);

	const handleChangePage = (e, value) => {
		setPage(value);
	};

	const columns = [
		{
			headerText: 'Data',
			key: 'created_at',
			CustomValue: (created_at) => {
				return <>{moment.utc(created_at).format('DD MMMM')}</>;
			},
		},
		{
			headerText: '',
			key: '',
			CustomValue: (created_at) => {
				return (
					<Box
						style={{
							backgroundColor: APP_CONFIG.mainCollors.primary,
							display: 'flex',
							flexDirection: 'column',
							height: '50px',
							width: '50px',

							borderRadius: '32px',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<PersonIcon style={{ color: 'white', fontSize: '30px' }} />
					</Box>
				);
			},
		},
		{
			headerText: 'Nome',
			key: 'nome',
			CustomValue: (nome) => {
				return (
					<>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '13px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							{nome}
						</Typography>
					</>
				);
			},
		},
		{
			headerText: '',
			key: '',
		},
		{
			headerText: 'Cobrar',
			key: 'id',
			CustomValue: (id) => {
				return (
					<>
						<Button
							onClick={() => {
								dispatch(setPagadorId(id));
								changePath('gerarBoleto');
							}}
							variant="outlined"
							color="primary"
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '12px',
								color: APP_CONFIG.mainCollors.primary,
								borderRadius: 20,
							}}
						>
							Cobrar
						</Button>
					</>
				);
			},
		},
	];

	const itemColumns = [
		{
			headerText: 'Data',
			key: 'nome',
			CustomValue: (nome) => {
				return (
					<>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '15px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Nome: {nome}
						</Typography>
					</>
				);
			},
		},
		{
			headerText: 'Data',
			key: 'email',
			CustomValue: (email) => {
				return (
					<>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '15px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							E-mail: {email}
						</Typography>
					</>
				);
			},
		},
		{
			headerText: 'Data',
			key: 'documento',
			CustomValue: (documento) => {
				return (
					<>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '15px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Documento: {documento}
						</Typography>
					</>
				);
			},
		},
		{
			headerText: 'Data',
			key: 'tipo',
			CustomValue: (tipo) => {
				return (
					<>
						<Typography
							style={{
								fontFamily: 'Montserrat-Regular',
								fontSize: '15px',
								color: APP_CONFIG.mainCollors.primary,
							}}
						>
							Tipo: {tipo}
						</Typography>
					</>
				);
			},
		},
		{
			headerText: 'Data',
			key: 'endereco',
			CustomValue: (endereco) => {
				return (
					<>
						{endereco && (
							<Typography
								style={{
									fontFamily: 'Montserrat-Regular',
									fontSize: '15px',
									color: APP_CONFIG.mainCollors.primary,
								}}
							>
								<strong>Endereço:</strong> <br />
								Bairro: {endereco.bairro}
								<br />
								CEP: {endereco.cep}
								<br />
								Cidade:{endereco.cidade}
								<br />
								Estado: {endereco.estado}
								<br />
								Rua: {endereco.rua}
								<br />
								Numero: {endereco.numero}
							</Typography>
						)}
					</>
				);
			},
		},
	];

	const Editar = (row) => {
		return <CustomRoundedCard icon="transferir" />;
	};

	return (
		<>
			<Typography
				style={{
					fontFamily: 'Montserrat-ExtraBold',
					fontSize: '16px',
					color: APP_CONFIG.mainCollors.primary,
					marginTop: '30px',
					marginLeft: '40px',
				}}
			>
				Pagadores
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
						justifyContent: 'center',
						marginTop: '10px',
						alignItems: 'center',
					}}
				>
					{/* <CustomFilterButton title="Lorem ipsum" />
					<CustomFilterButton title="Lorem ipsum" />
					<CustomFilterButton title="Lorem ipsum" />
					<CustomFilterButton title="Lorem ipsum" /> */}
					<TextField
						onChange={(e) => {
							setLike(e.target.value);
						}}
						variant="outlined"
						label=""
						InputProps={{
							endAdornment: (
								<SearchIcon
									style={{
										fontSize: '25px',
										color: APP_CONFIG.mainCollors.primary,
									}}
								/>
							),
						}}
					/>
				</Box>
				<Box
					style={{
						marginTop: '30px',
						marginBottom: '30px',
						width: '100%',
						maxWidth: 800,
					}}
				>
					{pagadoresList.data && pagadoresList.data.length > 0 ? (
						<>
							<Box minWidth={!matches ? '500px' : null}>
								<CustomCollapseTablePix
									itemColumns={itemColumns}
									data={pagadoresList.data}
									columns={columns}
									Editar={Editar}
								/>
							</Box>
							<Box alignSelf="flex-end" marginTop="8px">
								<Pagination
									variant="outlined"
									color="secondary"
									size="large"
									count={pagadoresList.last_page}
									onChange={handleChangePage}
									page={page}
								/>
							</Box>
						</>
					) : (
						<Box minWidth={!matches ? '500px' : null}>
							<Typography
								style={{
									textAlign: 'center',
								}}
							>
								Não há dados para serem exibidos
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default ListaDePagadores;
