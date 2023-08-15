import loginSvg from '../assets/humeAssets/hume-logo-sem-tagline-branca.svg';
import logoHumeColorida from '../assets/humeAssets/hume-logo-sem-tagline.svg';
import logoHumeBranca from '../assets/humeAssets/hume-logo-simbolo-branca.svg';
import imgHumano from '../assets/humeAssets/humaaans-standing-4.svg';

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
				fontFamily: 'BwGradualDEMO-Regular',
				/* fontWeight: 'bold', */

				h1: {
					fontFamily: 'BwGradualDEMO-Regular',
					fontSize: '16px',
				},
				subtitle1: {
					fontFamily: 'BwGradualDEMO-Regular',
					fontSize: '16px',
				},
				subtitle2: {
					fontFamily: 'BwGradualDEMO-Regular',
					fontSize: '16px',
				},
				h4: {
					fontFamily: 'BwGradualDEMO-Regular',
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
						fontFamily: 'BwGradualDEMO-Regular',
						/* fontWeight: 'bold', */
						color: '#1B1464',
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
				MuiFilledInput: {
					root: {
						height: '45px',
						borderColor: '#4E4E4E',
						borderRadius: 0,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						backgroundColor: '#fff',
						border: '1px solid #4E4E4E',
						'&$cssFocused $notchedOutline': {
							borderWidth: 1,
						},
						'&:not($error) $notchedOutline': {
							borderColor: '#4E4E4E',

							// Reset on touch devices, it doesn't add specificity
							'@media (hover: none)': {
								borderColor: '#4E4E4E',
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

							'-webkit-text-fill-color': '#4E4E4E !important',
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
						backgroundColor: '#fff',
					},
					notchedOutline: {
						borderWidth: '1px',
					},
					input: {
						'&::placeholder': {
							fontFamily: 'BwGradualDEMO-Regular',
							textOverflow: 'ellipsis !important',

							color: 'black',
							/* fontWeight: '600', */
							fontSize: '15px',
						},

						borderRadius: '27px',
						height: '10px',
						color: 'black',
						fontFamily: 'BwGradualDEMO-Regular',
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
							borderColor: '#1B1464',

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
							fontFamily: 'BwGradualDEMO-Regular',
							textOverflow: 'ellipsis !important',
							color: 'black',
							/* fontWeight: '600', */
							fontSize: '15px',
						},

						borderRadius: '27px',
						height: '10px',
						color: 'black',
						fontFamily: 'BwGradualDEMO-Regular',
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
							color: '#1B1464',
							fontFamily: 'BwGradualDEMO-Regular',
						},
						fontFamily: 'BwGradualDEMO-Regular',
						fontWeight: 'bold',
						color: '#1B1464',
					},
					root: {
						transform: 'translate(10px, 12px) scale(1)',
						'&$shrink': {
							transform: 'translate(10px, -2px) scale(0.8)',
							color: '#1B1464',
							fontFamily: 'BwGradualDEMO-Regular',
						},
						fontFamily: 'BwGradualDEMO-Regular',
						fontWeight: 'bold',
						color: '#1B1464',
					},
				},
				MuiButton: {
					contained: {
						fontFamily: 'BwGradualDEMO-Regular',
						/* fontSize: '0.9rem', */
						textTransform: 'none',
						boxShadow: '0px 0px 0px 0px',
					},

					fontFamily: 'BwGradualDEMO-Regular',
					fontWeight: 'bold',
				},
				MuiStepIcon: {
					color: 'red',
					fill: 'red',
					active: {
						color: 'black',
						fill: 'white',
						fontSize: '35px',
					},
					completed: {
						color: 'white',
						fill: 'white',
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
			logoCadastro1: logoHumeColorida,
			logoCadastro2: logoHumeBranca,
			imgCadastro: imgHumano,
		},
	},
}[process.env.REACT_APP_FRONT_APP || 'hume'];
