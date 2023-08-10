import {
	Box,
	makeStyles,
	Modal,
	TextField,
	Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { atualizarView } from '../../actions/actions';

import useAuth from '../../hooks/useAuth';
import { postPrimeiraSenhaCartao } from '../../services/services';
import CustomButton from '../CustomButton/CustomButton';
import { APP_CONFIG } from '../../constants/config';

export default function ModalPrimeiraSenhaCartao({
	closeModal,
	isOpen,
	cartao,
}) {
	const classes = useStyles();
	const [pin, setPin] = useState('');
	const [confirmarPin, setConfirmarPin] = useState('');
	const token = useAuth();
	const updater = useSelector((state) => state.atualizarView);
	const dispatch = useDispatch();
	//integrar metodo de ativar cartao

	async function enviarSenha() {
		if (pin == '' || confirmarPin == '') {
			return toast.error('Dados obrigatórios.');
		}
		if (pin.length > 4) {
			return toast.error('A senha deve ter 4 digitos.');
		}
		if (pin != confirmarPin) {
			return toast.error('As senhas não correspondem.');
		}

		try {
			await postPrimeiraSenhaCartao(token, cartao.id, pin, confirmarPin);
			toast.success('Senha inserida com sucesso!.');
			dispatch(atualizarView(!updater));
			closeModal();
		} catch (error) {
			toast.error('Erro ao inserir senha, tente novamente.');
			closeModal();
		}
	}

	return (
		<Modal
			className={classes.modal}
			open={isOpen}
			onBackdropClick={closeModal}
		>
			<Box className={classes.content}>
				<Typography className={classes.tituloModal}>
					Crie uma senha para o seu cartão.
				</Typography>
				<Typography className={classes.inputLabel}>
					Insira sua senha
				</Typography>
				<TextField
					variant="outlined"
					value={pin}
					onChange={(e) => {
						setPin(e.target.value);
					}}
					type="number"
				/>
				<Typography className={classes.inputLabel}>
					Confirme sua senha
				</Typography>
				<TextField
					variant="outlined"
					value={confirmarPin}
					onChange={(e) => {
						setConfirmarPin(e.target.value);
					}}
					type="number"
				/>
				<img
					src={APP_CONFIG.assets.tokenImageSvg}
					className={classes.img}
				/>
				<CustomButton
					variant="contained"
					color="purple"
					onClick={enviarSenha}
				>
					<Typography className={classes.btnText}>Enviar</Typography>
				</CustomButton>
			</Box>
		</Modal>
	);
}

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputLabel: {
		fontFamily: 'BwGradualDEMO-Regular',
		fontSize: '14px',
		color: APP_CONFIG.mainCollors.primary,
		marginTop: '10px',
	},
	btnText: {
		fontFamily: 'BwGradualDEMO-Regular',
		fontSize: '14px',
		color: 'white',
	},
	img: {
		marginTop: 20,
		marginBottom: 20,
		width: '50%',
	},
	content: {
		width: '100%',
		maxWidth: 800,
		background: 'white',
		padding: 50,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	tituloModal: {
		fontFamily: 'BwGradualDEMO-Bold',
		fontSize: '16px',
		color: APP_CONFIG.mainCollors.primary,
	},
}));
