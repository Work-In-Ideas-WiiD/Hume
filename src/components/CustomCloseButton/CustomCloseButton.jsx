import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

import CloseIcon from '@mui/icons-material/Close';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	customButton: {
		borderRadius: 32,
		fontWeight: 'bold',
		fontSize: '11px',
		width: '20px',
		height: '20px',
		boxShadow: '0px 0px 5px 0.7px grey',
		fontFamily: 'BwGradualDEMO-Bold',
	},
}));

const CustomCloseButton = (props) => {
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
			<CloseIcon style={{ fontSize: '15px' }} />
		</Button>
	);
};

export default CustomCloseButton;
