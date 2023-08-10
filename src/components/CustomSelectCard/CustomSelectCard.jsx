import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	makeStyles,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PixIcon from '@mui/icons-material/Pix';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckIcon from '@mui/icons-material/Check';
import FeedIcon from '@mui/icons-material/Feed';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { APP_CONFIG } from '../../constants/config';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LinkIcon from '@mui/icons-material/Link';
import LoopIcon from '@mui/icons-material/Loop';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TerminalIcon from '@mui/icons-material/Terminal';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
		display: 'flex',
		margin: '16px',
		width: '300px',
		/* height: '200px', */
		padding: '20px',
		borderRadius: '17px',
		alignItems: 'center',
		/* justifyContent: 'center', */
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: APP_CONFIG.mainCollors.primaryVariant,
		},
	},
}));

const CustomSelectCard = ({ url, icon, title, ...rest }) => {
	const classes = useStyles();
	const { section } = useParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [cardStyle, setCardStyle] = useState(false);
	const redirectUrl = `${url}`;

	return (
		<Box
			component={Link}
			to={redirectUrl}
			className={classes.root}
			onMouseOver={() => setCardStyle(true)}
			onMouseLeave={() => setCardStyle(false)}
		>
			<Box
				style={{
					display: 'flex',
					borderRadius: 30,
					backgroundColor: cardStyle
						? 'white'
						: APP_CONFIG.mainCollors.primary,
					alignItems: 'center',
					justifyContent: 'center',
					minWidth: '50px',
					minHeight: '50px',
				}}
			>
				{icon === 'check' ? (
					<CheckIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'list' ? (
					<FeedIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'personAdd' ? (
					<PersonAddIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'consult' ? (
					<SearchIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'card' ? (
					<CreditCardIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'link' ? (
					<LinkIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'loop' ? (
					<LoopIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'list' ? (
					<TextSnippetIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'person' ? (
					<PersonIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'time' ? (
					<AccessTimeIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'fare' ? (
					<CorporateFareIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'fare' ? (
					<CorporateFareIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'terminal' ? (
					<TerminalIcon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : icon === 'inventory' ? (
					<Inventory2Icon
						style={{
							color: cardStyle
								? APP_CONFIG.mainCollors.primary
								: 'white',
							fontSize: '30px',
						}}
					/>
				) : null}
			</Box>

			<Typography
				style={{
					fontFamily: 'BwGradualDEMO-Bold',
					fontSize: '13px',
					color: cardStyle ? 'white' : APP_CONFIG.mainCollors.primary,
					marginTop: '10px',
					marginLeft: '30px',
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default CustomSelectCard;
