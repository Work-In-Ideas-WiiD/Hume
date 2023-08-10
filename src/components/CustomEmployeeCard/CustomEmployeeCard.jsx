import SettingsIcon from '@material-ui/icons/Settings';
import {
	Box,
	makeStyles,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PixIcon from '@mui/icons-material/Pix';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		width: '150px',
		/* height: '200px', */
		padding: '20px',
		borderRadius: '17px',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: APP_CONFIG.mainCollors.primary,
		border: 'solid',
		borderWidth: 2,
		marginLeft: '30px',
		/* '&:hover': {
			cursor: 'pointer',
			backgroundColor: APP_CONFIG.mainCollors.primary,
		}, */
	},
}));

const CustomEmployeeCard = ({ icon, title, cardStyle, ...rest }) => {
	const classes = useStyles();
	const { section } = useParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box
			className={classes.root}
			style={{
				backgroundColor: cardStyle
					? APP_CONFIG.mainCollors.primary
					: 'white',
			}}
		>
			{icon === 'personAdd' ? (
				<PersonAddAlt1Icon
					style={{
						color: cardStyle ? 'white' : APP_CONFIG.mainCollors.primary,
						fontSize: '50px',
					}}
				/>
			) : icon === 'groupAdd' ? (
				<GroupAddIcon
					style={{
						color: cardStyle ? 'white' : APP_CONFIG.mainCollors.primary,
						fontSize: '50px',
					}}
				/>
			) : null}
			<Typography
				style={{
					fontFamily: 'BwGradualDEMO-Bold',
					fontSize: '13px',
					color: cardStyle ? 'white' : APP_CONFIG.mainCollors.primary,
					marginTop: '10px',
					textAlign: 'center',
				}}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default CustomEmployeeCard;
