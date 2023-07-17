/* import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LogoVbanck from '../../assets/vBankPJAssets/vBankLogo.svg';
import VisaLogo from '../../assets/vBankPJAssets/visa.svg';
import LogoVbankRoxa from '../../assets/vBankPJAssets/vBankLogoRoxa.svg';
import VisaLogoRoxa from '../../assets/vBankPJAssets/visaRoxa.svg';
import { APP_CONFIG } from '../../constants/config';

export default function CartaoPre({
	dados,
	desativado = false,
	visualizarCartao,
	index,
}) {
	const classes = useStyles();

	return (
		<Box
			onClick={() => {
				visualizarCartao(dados, index);
			}}
			className={
				!desativado == false ? classes.cartao : classes.cartaoDesativado
			}
		>
			{dados.response_card != null ? (
				<>
					<img
						className={classes.vbankLogo}
						src={!desativado == false ? LogoVbanck : LogoVbankRoxa}
						alt="logo"
					/>
					<img
						className={classes.visaLogo}
						src={!desativado == false ? VisaLogo : VisaLogoRoxa}
						alt="logo"
					/>
					<span className={classes.nome}>
						{dados.response_card.CardHolderName}
					</span>
					<Box className={classes.dados}>
						<span className={classes.numCartao}>
							**** **** **** {dados.response_card.PanLastDigits}
						</span>
						<Box className={classes.info}>
							<span className={classes.val}>VAL 00/00</span>
							<span className={classes.ccv}>CCV ***</span>
						</Box>
					</Box>
				</>
			) : (
				<>
					<img
						className={classes.vbankLogo}
						src={!desativado == false ? LogoVbanck : LogoVbankRoxa}
						alt="logo"
					/>
					<img
						className={classes.visaLogo}
						src={!desativado == false ? VisaLogo : VisaLogoRoxa}
						alt="logo"
					/>
					<span className={classes.nome}>Aguardando confirmação</span>
					<Box className={classes.dados}>
						<span className={classes.numCartao}>**** **** **** ****</span>
						<Box className={classes.info}>
							<span className={classes.val}>VAL 00/00</span>
							<span className={classes.ccv}>CCV ***</span>
						</Box>
					</Box>
				</>
			)}
		</Box>
	);
}

const useStyles = makeStyles((theme) => ({
	cartao: {
		cursor: 'pointer',
		width: 330,
		height: 200,
		background: APP_CONFIG.mainCollors.buttonGradientVariant,
		borderRadius: 25,
		padding: 15,
		position: 'relative',
		color: 'white',
		transition: '0.2s',
	},
	cartaoDesativado: {
		transition: '0.2s',
		cursor: 'pointer',
		width: 300,
		height: 170,
		background: 'transparent',
		borderRadius: 25,
		border: `1px solid ${APP_CONFIG.mainCollors.primary}`,
		padding: 15,
		position: 'relative',
		color: APP_CONFIG.mainCollors.primary,
	},
	nome: {
		display: 'block',
		position: 'absolute',
		left: 15,
		bottom: 15,
		fontSize: 14,
		textTransform: 'uppercase',
	},
	vbankLogo: {
		width: '70px',
		right: 10,
		position: 'absolute',
	},
	visaLogo: {
		width: '35px',
		right: 15,
		bottom: 15,
		position: 'absolute',
	},
	info: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
	dados: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		position: 'absolute',
		bottom: 60,
	},
	numCartao: {},
	val: {},
	ccv: {},
}));
 */
