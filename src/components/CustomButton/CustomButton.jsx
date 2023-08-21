import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	customButton: {
		borderRadius: 17,
		fontWeight: 'bold',
		fontSize: '11px',
		minWidth: '150px',
		height: '38px',
		/* boxShadow: '0px 0px 5px 0.7px grey', */
		fontFamily: 'BwGradualDEMO-Bold',
	},
}));

const CustomButton = (props) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={classes.customButton}
			variant="contained"
			style={
				(props.size === 'medium'
					? {
							width: '310px',
					  }
					: { width: '320px' },
				props.color === 'black'
					? { backgroundColor: '#443D38', color: 'white' }
					: props.color === 'yellow'
					? { backgroundColor: '#ffdc00', color: 'black' }
					: props.color === 'purple'
					? {
							backgroundColor: APP_CONFIG.mainCollors.primary,
							color: 'white',
					  }
					: props.color === 'red'
					? { backgroundColor: '#ED757D', color: 'white' }
					: props.color === 'horizontalGradient'
					? {
							background: APP_CONFIG.mainCollors.buttonGradient,
							color: 'white',
					  }
					: props.color === 'colorPrimary'
					? {
							backgroundColor: APP_CONFIG.mainCollors.buttonPrimary,
							color: 'white',
					  }
					: props.color === 'colorSecondary'
					? {
							backgroundColor: APP_CONFIG.mainCollors.buttonSecondary,
							color: 'white',
					  }
					: props.color === 'colorTertiary'
					? {
							backgroundColor: APP_CONFIG.mainCollors.buttonTertiary,
							color: APP_CONFIG.mainCollors.primary,
					  }
					: {
							border: `1px solid ${APP_CONFIG.mainCollors.primary}`,
							backgroundColor: 'white',
							color: APP_CONFIG.mainCollors.primary,
					  })
			}
		>
			<Typography
				style={{
					fontSize: '16px',
				}}
			>
				{props.children}
			</Typography>
		</Button>
	);
};

export default CustomButton;
