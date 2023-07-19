import loginSvg from '../assets/humeAssets/hume-logo-sem-tagline-branca.svg';

//vbank

export const APP_CONFIG = {
	hume: {
		titleLogin: 'Hume',
		name: 'Hume',
		description: '',
		crispId: '',
		sidebarRede: 'Hume',
		AbaCartoes: true,
		linkApp: '',
		linkDePagamento: '',
		deeplink: '',

		mainCollors: {
			primary: '#003DFF',
			primaryVariant: '#1B1464',
			secondary: '#9D9DC6',
			backgrounds: '#F7F7F7',
			disabledTextfields: '#E0DFF8',
			extratoHome: '#302F60',
			primaryGradient:
				'linear-gradient(135deg, rgba(2,149,59,1) 15%, rgba(75,75,150,1) 100%)',
			secondaryGradient:
				'linear-gradient(360deg, rgba(2,149,59,1) 0%, rgba(75,75,150,1) 100%)',
			buttonGradient:
				'linear-gradient(135deg, rgba(2,149,59,1) 10%, rgba(75,75,150,1) 100%)',
			buttonGradientVariant:
				'linear-gradient(180deg, rgba(2,149,59,1) 15%, rgba(75,75,150,1) 100%)',
			drawerSideBar: '#02953b',

			buttonPrimary: '#7732F5',
			buttonSecondary: '#003DFF',
			buttonTertiary: '#72EAB8',
			black: '#4E4E4E',
		},
		theme: {
			typography: {
				fontFamily: 'Montserrat-Regular',
				/* fontWeight: 'bold', */

				h1: {
					fontFamily: 'Montserrat-SemiBold',
					fontSize: '16px',
				},
				subtitle1: {
					fontFamily: 'Montserrat-Regular',
					fontSize: '16px',
				},
				subtitle2: {
					fontFamily: 'Montserrat-Regular',
					fontSize: '16px',
				},
				h4: {
					fontFamily: 'Montserrat-SemiBold',
				},
			},
			palette: {
				background: {
					default: '#fff',
					paper: '#FFF',
				},
				primary: {
					main: '#4C4B97',
					light: '#EDEDF4',
				},
				secondary: {
					main: '#fff',
					light: '#fff',
				},
				tertiary: {
					main: '#fff',
					light: '#fff',
				},
			},
			overrides: {
				MuiInputBase: {
					input: {
						fontFamily: 'Montserrat-Regular',
						/* fontWeight: 'bold', */
						color: '#4C4B97',
					},
					label: {
						color: 'black',
					},
					placeholder: {
						color: 'white',
					},
				},

				MuiTableContainer: {
					root: {
						overflowX: 'unset',
					},
				},

				MuiOutlinedInput: {
					root: {
						height: '45px',
						borderColor: 'white',
						borderRadius: 17,
						'&$cssFocused $notchedOutline': {
							borderWidth: 1,
						},
						'&:not($error) $notchedOutline': {
							borderColor: '#4C4B97',

							// Reset on touch devices, it doesn't add specificity
							'@media (hover: none)': {
								borderColor: 'rgba(0, 0, 0, 0.23)',
							},
						},

						borderWidth: '1px',
						'& :-webkit-autofill': {
							'-webkit-padding-after': '15px',
							'-webkit-padding-before': '18px',
							'-webkit-padding-end': '15px',
							'-webkit-padding-start': '15px',
							'-webkit-background-clip': 'text',
							'-webkit-color': 'black',

							'-webkit-text-fill-color': 'black !important',
						},

						'& $notchedOutline': {
							borderColor: 'white',
							borderWidth: 1,
						},
						'&:hover $notchedOutline': {
							borderColor: 'white',
							borderWidth: 1,
						},
						'&$focused $notchedOutline': {
							borderColor: 'white',
							borderWidth: 1,
						},
					},
					focused: {
						borderWidth: '1px',
					},
					notchedOutline: {
						borderWidth: '1px',
					},
					input: {
						'&::placeholder': {
							fontFamily: 'Montserrat-SemiBold',
							textOverflow: 'ellipsis !important',
							color: 'black',
							/* fontWeight: '600', */
							fontSize: '15px',
						},

						borderRadius: '27px',
						height: '10px',
						color: 'black',
						fontFamily: 'Montserrat-Thin',
						fontWeight: 'bold',
					},
				},

				MuiTextField: {
					root: {
						margin: '0px 0px 0px 0px',
					},
				},
				MuiInputLabel: {
					outlined: {
						transform: 'translate(14px, 15px) scale(1)',
						'&$shrink': {
							transform: 'translate(14px, -20px) scale(0.8)',
							color: '#4C4B97',
							fontFamily: 'Montserrat-SemiBold',
						},
						fontFamily: 'Montserrat-Thin',
						fontWeight: 'bold',
						color: '#4C4B97',
					},
					root: {
						transform: 'translate(10px, 12px) scale(1)',
						'&$shrink': {
							transform: 'translate(10px, -2px) scale(0.8)',
							color: '#4C4B97',
							fontFamily: 'Montserrat-SemiBold',
						},
						fontFamily: 'Montserrat-Thin',
						fontWeight: 'bold',
						color: '#4C4B97',
					},
				},
				MuiButton: {
					contained: {
						fontFamily: 'Montserrat-Thin',
						/* fontSize: '0.9rem', */
						textTransform: 'none',
						boxShadow: '0px 0px 0px 0px',
					},

					fontFamily: 'Montserrat-Thin',
					fontWeight: 'bold',
				},
				MuiStepIcon: {
					color: 'red',
					fill: 'red',
					active: {
						color: 'red',
						fill: 'red',
					},
					completed: {
						color: 'red',
						fill: 'red',
					},
				},
			},
		},

		cssVariables: {
			gradient: {
				main: 'linear-gradient(to right top, #cc9b00, #cc9b00);',
			},
		},
		assets: {
			loginSvg: loginSvg,
		},
	},
}[process.env.REACT_APP_FRONT_APP || 'hume'];
