import {
	Box,
	makeStyles,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@material-ui/icons/Person';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	iconContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 32,
		padding: '12px',
		width: '100%',
		height: '80px',
		backgroundColor: APP_CONFIG.mainCollors.backgrounds,
		color: '#35322f',
		transition: `${theme.transitions.create(
			['background-color', 'transform'],
			{
				duration: theme.transitions.duration.standard,
			}
		)}`,
		'&:hover': {
			cursor: 'pointer',

			transform: 'scale(1.05)',
			border: '2px solid',
			borderColor: APP_CONFIG.mainCollors.backgrounds,
		},
		animation: `$myEffect 500ms ${theme.transitions.easing.easeInOut}`,
	},
	'@keyframes myEffect': {
		'0%': {
			opacity: 1,
			transform: 'translateX(20%)',
		},
		'100%': {
			opacity: 1,
			transform: 'translateX(0)',
		},
	},

	textImageContainer: {
		width: '100%',
		marginLeft: '10px',
		fontFamily: 'BwGradualDEMO-Regular',
		color: APP_CONFIG.mainCollors.black,
		fontSize: '12px',
	},

	textContainer: {
		width: '100%',
		marginLeft: '10px',
		fontFamily: 'BwGradualDEMO-Bold',
		color: APP_CONFIG.mainCollors.black,
		fontSize: '17px',
	},
}));

const CustomCardInfos = ({
	icon,
	iconColor,
	link,
	text,
	subtext,
	children,
	aprovada,
	rejeitada,
	...rest
}) => {
	const classes = useStyles();
	const { section, id, subsection, subsectionId } = useParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box>
			<Box
				className={classes.iconContainer}
				style={{ borderRadius: 65 }}
				onClick={
					link === null
						? () =>
								toast.warning(
									'Sem permissão para acessar essa funcionalidade'
								)
						: null
				}
				{...rest}
			>
				{matches ? null : (
					<Box
						style={{
							display: 'flex',
							borderRadius: 65,
							width: '60px',
							height: '50px',
							backgroundColor: 'white',
							alignItems: 'center',
							alignContent: 'center',
							justifyContent: 'center',
						}}
					>
						{icon === 'paper' ? (
							<ArticleIcon
								color={'primary'}
								style={{
									alignSelf: 'center',
									fontSize: 30,
									color: APP_CONFIG.mainCollors.primary,
									/* color:
										iconColor ??
										(aprovada ? 'green' : rejeitada ? 'red' : null), */
								}}
							/>
						) : icon === 'pen' ? (
							<EditIcon
								color={'primary'}
								style={{
									alignSelf: 'center',
									fontSize: 30,
									color: APP_CONFIG.mainCollors.primary,
									/* color:
										iconColor ??
										(aprovada ? 'green' : rejeitada ? 'red' : null), */
								}}
							/>
						) : icon === 'person' ? (
							<PersonIcon
								color={'primary'}
								style={{
									alignSelf: 'center',
									fontSize: 30,
									color: APP_CONFIG.mainCollors.primary,
									/* color:
										iconColor ??
										(aprovada ? 'green' : rejeitada ? 'red' : null), */
								}}
							/>
						) : (
							<PersonIcon
								color={'primary'}
								style={{
									alignSelf: 'center',
									fontSize: 30,
									color: APP_CONFIG.mainCollors.primary,
									/* color:
										iconColor ??
										(aprovada ? 'green' : rejeitada ? 'red' : null), */
								}}
							/>
						)}
					</Box>
				)}

				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
					}}
				>
					<Typography align="start" className={classes.textImageContainer}>
						{text}
					</Typography>
					<Typography
						align="start"
						className={classes.textContainer}
						style={{ marginTop: '10px' }}
					>
						{subtext}
					</Typography>
					{/* <Typography align="start" className={classes.textContainer}>
						{children}
						{subtext}
					</Typography> */}
				</Box>
			</Box>
		</Box>
	);
};

export default CustomCardInfos;
