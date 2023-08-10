import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	makeStyles,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PixIcon from '@mui/icons-material/Pix';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PaymentIcon from '@mui/icons-material/Payment';
import KeyIcon from '@mui/icons-material/Key';
import DoneIcon from '@mui/icons-material/Done';
import ArticleIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: APP_CONFIG.mainCollors.primary,
		display: 'flex',
		flexDirection: 'column',
		height: '50px',
		width: '50px',
		borderRadius: '32px',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: APP_CONFIG.mainCollors.primaryVariant,
		},
	},
}));

const CustomRoundedCard = ({ icon, title, ...rest }) => {
	const classes = useStyles();
	const { section } = useParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Box className={classes.root}>
				{icon === 'depositar' ? (
					<FileDownloadIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'transferir' ? (
					<CompareArrowsIcon
						style={{ color: 'white', fontSize: '30px' }}
					/>
				) : icon === 'chaves' ? (
					<KeyIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'aprovacoes' ? (
					<DoneIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'extrato' ? (
					<ArticleIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'pix' ? (
					<PixIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'cobrar' ? (
					<PaymentIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'copia-e-cola' ? (
					<ContentCopyIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'person' ? (
					<PersonIcon style={{ color: 'white', fontSize: '30px' }} />
				) : icon === 'pagamento' ? (
					<PaymentsIcon style={{ color: 'white', fontSize: '30px' }} />
				) : null}
			</Box>
			<Typography
				style={{
					fontFamily: 'BwGradualDEMO-Bold',
					fontSize: '13px',
					color: APP_CONFIG.mainCollors.primary,
					marginTop: '10px',
					textAlign: 'center',
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default CustomRoundedCard;
