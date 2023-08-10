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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LinkIcon from '@mui/icons-material/Link';
import LoopIcon from '@mui/icons-material/Loop';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TerminalIcon from '@mui/icons-material/Terminal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: APP_CONFIG.mainCollors.primary,
		display: 'flex',
		flexDirection: 'column',
		height: '220px',
		padding: '40px',
		borderRadius: '17px',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: APP_CONFIG.mainCollors.primaryVariant,
		},
	},
}));

const CustomCard = ({ icon, title, ...rest }) => {
	const classes = useStyles();
	const { section } = useParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box className={classes.root}>
			{icon === 'pagamentos' ? (
				<PaymentsIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'transferencias' ? (
				<CompareArrowsIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'pix' ? (
				<PixIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'boletos' ? (
				<ReceiptIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'card' ? (
				<CreditCardIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'link' ? (
				<LinkIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'loop' ? (
				<LoopIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'list' ? (
				<TextSnippetIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'time' ? (
				<AccessTimeIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'fare' ? (
				<AttachMoneyIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'inventory' ? (
				<Inventory2Icon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'terminal' ? (
				<TerminalIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'historico' ? (
				<TextSnippetIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'extrato' ? (
				<ReceiptIcon style={{ color: 'white', fontSize: '60px' }} />
			) : icon === 'person' ? (
				<PersonIcon style={{ color: 'white', fontSize: '60px' }} />
			) : null}
			<Typography
				style={{
					fontFamily: 'BwGradualDEMO-Bold',
					fontSize: '13px',
					color: 'white',
					marginTop: '10px',
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default CustomCard;
