/* import {
	Box,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
	Grid,
	TextField,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import CustomButton from '../../components/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import qrcodeSample from '../../assets/vBankPJAssets/qrcodeSample.svg';

import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		

		[theme.breakpoints.down('1024')]: {
			flexDirection: 'column',
		},
	},

	leftBox: {
		display: 'flex',
		background: APP_CONFIG.mainCollors.primaryGradient,
		width: '50%',
		minHeight: '100vh',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'column',

		[theme.breakpoints.down('1024')]: {
			width: '100%',
			minHeight: '0px',
			height: '100%',
		},
	},
	rightBox: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		width: '50%',

		[theme.breakpoints.down('1024')]: {
			width: '100%',
		},
	},

	smallLogoContainer: {
		display: 'flex',
		alignSelf: 'flex-end',
		width: '100px',
		height: '100px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bigLogoImg: {
		marginBottom: '-4px',
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: '5%',
		paddingRight: '5%',
		alignContent: 'center',
		justifyContent: 'center',
	},

	qrCodeContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '30px',
		alignContent: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},

	stepsContainer: {
		marginTop: '60px',
		flexDirection: 'column',
		display: 'flex',
	},

	stepContainer: {
		marginTop: '10px',
		flexDirection: 'row',
		display: 'flex',
		alignSelf: 'flex-start',
	},
}));
export default function ErroCpfEtapa() {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Box className={classes.root}>
			<Box className={classes.leftBox}>
				<Stepper
					activeStep={2}
					alternativeLabel
					style={{
						backgroundColor: 'inherit',
						width: '70%',
						marginTop: '100px',
					}}
				>
					
				</Stepper>
				<Box
					style={{
						width: '50%',
						alignSelf: 'flex-end',
					}}
				>
					<img
						src={APP_CONFIG.assets.backgroundLogo}
						alt={''}
						className={classes.bigLogoImg}
					/>
				</Box>
			</Box>

			<Box className={classes.rightBox}>
				<Box className={classes.smallLogoContainer}>
					<img
						src={APP_CONFIG.assets.smallColoredLogo}
						alt={'vBank Logo'}
					/>
				</Box>

				<Box className={classes.titleContainer}>
					<Box
						style={{
							alignSelf: 'center',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<img
							src={APP_CONFIG.assets.tokenImageSvg}
							style={{
								width: '50%',
							}}
							alt={''}
						/>
					</Box>
					<Typography
						align="center"
						style={{
							fontSize: '20px',
							color: APP_CONFIG.mainCollors.primary,

							marginTop: '30px',
						}}
					>
						Para abrir uma Conta Digital PJ, você precisa ser correntista
						do vBank.
					</Typography>
					<Typography
						align="center"
						style={{
							fontSize: '20px',
							color: APP_CONFIG.mainCollors.primary,

							marginTop: '30px',
						}}
					>
						Baixe nosso App e abra sua conta agora mesmo!
					</Typography>

					<Box className={classes.qrCodeContainer}>
						<img
							src={qrcodeSample}
							style={{ width: '200px' }}
							alt={'QR Code'}
						/>
						
					</Box>
				
				</Box>
			</Box>
		</Box>
	);
}
 */
