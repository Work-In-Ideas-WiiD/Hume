import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	customButton: {
		borderRadius: 32,
		fontWeight: 'bold',
		fontSize: '11px',
		width: '40px',
		height: '60px',
		boxShadow: '0px 0px 5px 0.7px grey',
		fontFamily: 'BwGradualDEMO-Bold',
	},
}));

const CustomBackButton = (props) => {
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
					: { backgroundColor: 'white', color: '#9D9CC6' })
			}
		>
			<ArrowBackIcon style={{ fontSize: '40px' }} />
		</Button>
	);
};

export default CustomBackButton;
