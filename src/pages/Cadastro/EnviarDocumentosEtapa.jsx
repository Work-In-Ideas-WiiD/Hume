import {
	Box,
	Step,
	StepLabel,
	Stepper,
	Typography,
	useTheme,
	Grid,
	TextField,
	StepContent,
	StepConnector,
	CardMedia,
	Card,
	CardActionArea,
	IconButton,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import CustomSideBar from '../../components/CustomSideBar/CustomSideBar';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchIcon from '@mui/icons-material/Search';
import ReactCodeInput from 'react-code-input';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomFowardButton from '../../components/CustomFowardButton/CustomFowardButton';
import CurrencyTextField from '@unicef/material-ui-currency-textfield/dist/CurrencyTextField';
import NumberFormat from 'react-number-format';
import {
	delDocumentoPrecontaAction,
	getDocumentoPreContaAction,
	postDocumentoPrecontaAction,
} from '../../actions/actions';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import ClearIcon from '@material-ui/icons/Clear';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { APP_CONFIG } from '../../constants/config';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',

		flexGrow: 1,
		// width: '100vw',
		// height: '100vh',
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		padding: '20px',
	},
	header: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	dadosBox: {
		display: 'flex',
		flexDirection: 'row',
		/* alignItems: 'center', */
		/* justifyContent: 'center', */
		marginTop: '100px',

		[theme.breakpoints.down('1024')]: {
			flexDirection: 'column',
			marginTop: '15px',
		},
	},
	form: {
		borderRadius: 20,
		backgroundColor: '#F6F6FA',
		width: '80%',

		[theme.breakpoints.down('1024')]: {
			width: '100%',
		},
	},
	stepper: {
		backgroundColor: 'inherit',
		minHeight: '500px',

		/* width: '70%', */
		/* marginTop: '100px', */
		display: 'flex',

		[theme.breakpoints.down('1024')]: {
			minHeight: '0px',
			height: '100%',
		},
	},
	card: {
		margin: theme.spacing(1),
		padding: 0,
	},
	dropzoneAreaBaseClasses: {
		width: '70%',
		height: '150px',
		backgroundColor: APP_CONFIG.mainCollors.backgrounds,
	},
	dropzoneContainer: {
		margin: '6px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '12px',
		minHeight: '422px',
		fontSize: '12px',
	},
	textoDropzone: {
		fontSize: '1.2rem',
		color: APP_CONFIG.mainCollors.primary,
	},
}));
export default function EnviarDocumentosEtapa({ getNextEtapa }) {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const dadosCadastrais = useSelector((state) => state.cadastroEtapa2);
	const documentoPreConta = useSelector((state) => state.documentoPreConta);

	const [validacaoCNPJ, setValidacaoCNPJ] = useState(false);
	const [validacaoCSocial, setValidacaoCSocial] = useState(false);
	const [teste, setTeste] = useState(false);

	const handleVoltar = async () => {
		getNextEtapa({ voltar: true });
	};

	const options = {
		/* thousandSeparator: '.',
		decimalSeparator: ',', */
		allowNegative: false,

		customInput: TextField,
		/* style: { width: '100%' }, */
	};

	const steps = [
		{
			label: 'Dados gerais',
			description: (
				<Box
					style={{
						backgroundColor: '#00FF80',
						display: 'flex',
						borderRadius: 20,
						justifyContent: 'center',
					}}
				>
					<Typography
						style={{
							fontSize: '15  px',
							fontFamily: 'Montserrat-Regular',
							color: APP_CONFIG.mainCollors.primary,
						}}
					>
						Concluído
					</Typography>
				</Box>
			),
		},
		{
			label: 'Endereço comercial',
			description: '',
		},
		{
			label: 'Representantes',
			description: ``,
		},
		{
			label: 'Dados complementares',
			description: ``,
		},
		{
			label: 'Envio de documentos',
			description: ``,
		},
		{
			label: 'Resumo',
			description: ``,
		},
	];

	const handleContinuar = async () => {
		if (validacaoCNPJ === false || validacaoCSocial === false) {
			toast.error('Envie os documentos obrigatórios (*)');
		} else {
			getNextEtapa({ voltar: false });
		}
	};

	const handleExcluirArquivo = async (item) => {
		setLoading(true);
		if (item.categoria === 'CARTAO_CNPJ') {
			const resDelDocumento = await dispatch(
				delDocumentoPrecontaAction(item.id)
			);
			if (resDelDocumento) {
				toast.error('Falha ao excluir documento');
			} else {
				setValidacaoCNPJ(false);
				await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
				setLoading(false);
			}
		} else if (item.categoria === 'PAGINA_CONTRATO_SOCIAL') {
			const resDelDocumento = await dispatch(
				delDocumentoPrecontaAction(item.id)
			);
			if (resDelDocumento) {
				toast.error('Falha ao excluir documento');
			} else {
				setValidacaoCSocial(false);
				await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
				setLoading(false);
			}
		} else if (item.categoria === 'PAGINA_PROCURACAO') {
			const resDelDocumento = await dispatch(
				delDocumentoPrecontaAction(item.id)
			);
			if (resDelDocumento) {
				toast.error('Falha ao excluir documento');
			} else {
				await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
				setLoading(false);
			}
		} else if (item.categoria === 'PAGINA_ATA_ELEICAO_DIRETORES') {
			const resDelDocumento = await dispatch(
				delDocumentoPrecontaAction(item.id)
			);
			if (resDelDocumento) {
				toast.error('Falha ao excluir documento');
			} else {
				await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
				setLoading(false);
			}
		}
	};

	const onDropProcuracao = async (picture) => {
		setLoading(true);

		const categoria = 'PAGINA_PROCURACAO';
		await dispatch(
			postDocumentoPrecontaAction(dadosCadastrais.id, picture, categoria)
		);
		await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
		setLoading(false);
	};
	const onDropAtaProcuracaoDiretoria = async (picture) => {
		setLoading(true);

		const categoria = 'PAGINA_ATA_ELEICAO_DIRETORES';
		await dispatch(
			postDocumentoPrecontaAction(dadosCadastrais.id, picture, categoria)
		);
		await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
		setLoading(false);
	};
	const onDropCartaoCNPJ = async (picture) => {
		setLoading(true);

		const categoria = 'CARTAO_CNPJ';
		const resPostDoc = await dispatch(
			postDocumentoPrecontaAction(dadosCadastrais.id, picture, categoria)
		);
		if (resPostDoc) {
			toast.error('erro');
		} else {
			await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
			setLoading(false);
		}
	};
	const onDropContratoSocial = async (picture) => {
		setLoading(true);

		const categoria = 'PAGINA_CONTRATO_SOCIAL';
		const resPostDoc = await dispatch(
			postDocumentoPrecontaAction(dadosCadastrais.id, picture, categoria)
		);
		if (resPostDoc) {
			toast.error('erro');
		} else {
			await dispatch(getDocumentoPreContaAction(dadosCadastrais.id));
			setLoading(false);
		}
	};

	useEffect(() => {
		dispatch(getDocumentoPreContaAction(dadosCadastrais.id));

		if (documentoPreConta && documentoPreConta.length > 0) {
			documentoPreConta.forEach((item) => {
				if (item.categoria === 'CARTAO_CNPJ') {
					setValidacaoCNPJ(true);
				} else if (item.categoria === 'PAGINA_CONTRATO_SOCIAL') {
					setValidacaoCSocial(true);
				}
			});
		}
	}, [documentoPreConta.length]);

	return (
		<Box className={classes.root}>
			<LoadingScreen isLoading={loading} />
			<CustomSideBar cadastro />
			<Box className={classes.main}>
				<CustomHeader />
				<Box className={classes.dadosBox}>
					<Box
						style={{
							display: 'flex',
							justifyContent: 'left',
							/* 	maxWidth: 400,
							minWidth: 400, */
						}}
					>
						<Stepper
							activeStep={4}
							connector
							orientation="vertical"
							className={classes.stepper}
						>
							{steps.map((step, index) => (
								<Step
									key={step.label}
									style={{
										backgroundColor: 'inherit',
										/* width: '70%', */

										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<StepLabel
									/* optional={
											index === 5 ? (
												<Typography
													style={{
														fontFamily: 'Montserrat-Thin',
														color: APP_CONFIG.mainCollors.primary,
													}}
												>
													Última etapa
												</Typography>
											) : null
										} */
									>
										<Typography
											style={{
												fontFamily: 'Montserrat-Regular',
												color: APP_CONFIG.mainCollors.primary,
											}}
										>
											{step.label}
										</Typography>
									</StepLabel>
									<StepContent>
										<Typography>{step.description}</Typography>
									</StepContent>
									{index === 5 ? null : (
										<StepConnector orientation="vertical" />
									)}
								</Step>
							))}
						</Stepper>
					</Box>
					<Box className={classes.form}>
						<Box style={{ padding: '10px', marginLeft: '20px' }}>
							<Typography
								style={{
									fontFamily: 'Montserrat-ExtraBold',
									fontSize: '16px',
									color: APP_CONFIG.mainCollors.primary,
									marginTop: '30px',
								}}
							>
								Envio de documentos
							</Typography>

							<Grid container spacing={2} style={{ marginTop: '15px' }}>
								<Grid item sm={6} xs={12}>
									<Typography
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '0px',
										}}
									>
										Cartão CNPJ*
									</Typography>
									<Box
										className={classes.dropzoneContainer}
										boxShadow={3}
									>
										<DropzoneAreaBase
											dropzoneParagraphClass={classes.textoDropzone}
											maxFileSize={10000000}
											onDropRejected={() => {
												toast.error('Tamanho máximo: 10mb');
												toast.error(
													'Arquivos suportados: .pdf .png .jpg .jpeg'
												);
											}}
											acceptedFiles={['image/*', 'application/pdf']}
											dropzoneClass={classes.dropzoneAreaBaseClasses}
											onAdd={onDropCartaoCNPJ}
											filesLimit={1}
											dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
											showPreviews={false}
											showPreviewsInDropzone={false}
										/>
										<Box width="300px">
											<Grid container>
												{documentoPreConta &&
												documentoPreConta.length > 0
													? documentoPreConta.map((item) =>
															item.categoria ===
															'CARTAO_CNPJ' ? (
																<Grid item xs={6}>
																	<Card
																		className={classes.card}
																	>
																		<CardActionArea>
																			<Box position="absolute">
																				<IconButton
																					onClick={() =>
																						handleExcluirArquivo(
																							item
																						)
																					}
																					size="small"
																					style={{
																						color: 'white',
																						backgroundColor:
																							'red',
																					}}
																				>
																					<ClearIcon />
																				</IconButton>
																			</Box>
																			{item.arquivo.includes(
																				'.pdf'
																			) ? (
																				<Box
																					style={{
																						display:
																							'flex',
																						alignItems:
																							'center',
																						justifyContent:
																							'center',
																						height:
																							'100px',
																					}}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				>
																					<PictureAsPdfIcon
																						style={{
																							color: 'black',
																							fontSize:
																								'70px',
																						}}
																					/>
																				</Box>
																			) : (
																				<CardMedia
																					component="img"
																					alt="Arquivo de Identificação"
																					height="100"
																					image={
																						item.arquivo
																					}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				/>
																			)}
																		</CardActionArea>
																	</Card>
																</Grid>
															) : (
																false
															)
													  )
													: null}
											</Grid>
										</Box>
									</Box>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Typography
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '0px',
										}}
									>
										Contrato social ou certificado de condição do MEI*
									</Typography>
									<Box
										className={classes.dropzoneContainer}
										boxShadow={3}
									>
										<DropzoneAreaBase
											dropzoneParagraphClass={classes.textoDropzone}
											maxFileSize={10145728}
											onDropRejected={() => {
												toast.error('Tamanho máximo: 10mb ');
												toast.error(
													'Arquivos suportados: .pdf .png .jpg .jpeg'
												);
											}}
											acceptedFiles={['image/*', 'application/pdf']}
											dropzoneClass={classes.dropzoneAreaBaseClasses}
											onAdd={onDropContratoSocial}
											filesLimit={1}
											dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
											showPreviews={false}
											showPreviewsInDropzone={false}
										/>
										<Box width="300px">
											<Grid container>
												{documentoPreConta &&
												documentoPreConta.length > 0
													? documentoPreConta.map((item) =>
															item.categoria ===
															'PAGINA_CONTRATO_SOCIAL' ? (
																<Grid item xs={6}>
																	<Card
																		className={classes.card}
																	>
																		<CardActionArea>
																			<Box position="absolute">
																				<IconButton
																					onClick={() =>
																						handleExcluirArquivo(
																							item
																						)
																					}
																					size="small"
																					style={{
																						color: 'white',
																						backgroundColor:
																							'red',
																					}}
																				>
																					<ClearIcon />
																				</IconButton>
																			</Box>
																			{item.arquivo.includes(
																				'.pdf'
																			) ? (
																				<Box
																					style={{
																						display:
																							'flex',
																						alignItems:
																							'center',
																						justifyContent:
																							'center',
																						height:
																							'100px',
																					}}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				>
																					<PictureAsPdfIcon
																						style={{
																							color: 'black',
																							fontSize:
																								'70px',
																						}}
																					/>
																				</Box>
																			) : (
																				<CardMedia
																					component="img"
																					alt="Arquivo de Identificação"
																					height="100"
																					image={
																						item.arquivo
																					}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				/>
																			)}
																		</CardActionArea>
																	</Card>
																</Grid>
															) : (
																false
															)
													  )
													: null}
											</Grid>
										</Box>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={2} style={{ marginTop: '15px' }}>
								<Grid item sm={6} xs={12}>
									<Typography
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '0px',
										}}
									>
										Procurações (se houver)
									</Typography>
									<Box
										className={classes.dropzoneContainer}
										boxShadow={3}
									>
										<DropzoneAreaBase
											dropzoneParagraphClass={classes.textoDropzone}
											maxFileSize={10145728}
											onDropRejected={() => {
												toast.error('Tamanho máximo: 10mb ');
												toast.error(
													'Arquivos suportados: .pdf .png .jpg .jpeg'
												);
											}}
											acceptedFiles={['image/*', 'application/pdf']}
											dropzoneClass={classes.dropzoneAreaBaseClasses}
											onAdd={onDropProcuracao}
											filesLimit={1}
											dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
											showPreviews={false}
											showPreviewsInDropzone={false}
										/>
										<Box width="300px">
											<Grid container>
												{documentoPreConta &&
												documentoPreConta.length > 0
													? documentoPreConta.map((item) =>
															item.categoria ===
															'PAGINA_PROCURACAO' ? (
																<Grid item xs={6}>
																	<Card
																		className={classes.card}
																	>
																		<CardActionArea>
																			<Box position="absolute">
																				<IconButton
																					onClick={() =>
																						handleExcluirArquivo(
																							item
																						)
																					}
																					size="small"
																					style={{
																						color: 'white',
																						backgroundColor:
																							'red',
																					}}
																				>
																					<ClearIcon />
																				</IconButton>
																			</Box>
																			{item.arquivo.includes(
																				'.pdf'
																			) ? (
																				<Box
																					style={{
																						display:
																							'flex',
																						alignItems:
																							'center',
																						justifyContent:
																							'center',
																						height:
																							'100px',
																					}}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				>
																					<PictureAsPdfIcon
																						style={{
																							color: 'black',
																							fontSize:
																								'70px',
																						}}
																					/>
																				</Box>
																			) : (
																				<CardMedia
																					component="img"
																					alt="Arquivo de Identificação"
																					height="100"
																					image={
																						item.arquivo
																					}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				/>
																			)}
																		</CardActionArea>
																	</Card>
																</Grid>
															) : (
																false
															)
													  )
													: null}
											</Grid>
										</Box>
									</Box>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Typography
										style={{
											fontFamily: 'Montserrat-Regular',
											fontSize: '14px',
											color: APP_CONFIG.mainCollors.primary,
											marginTop: '0px',
										}}
									>
										Ata de procuração da diretoria (se houver)
									</Typography>
									<Box
										className={classes.dropzoneContainer}
										boxShadow={3}
									>
										<DropzoneAreaBase
											dropzoneParagraphClass={classes.textoDropzone}
											maxFileSize={10145728}
											onDropRejected={() => {
												toast.error('Tamanho máximo: 10mb ');
												toast.error(
													'Arquivos suportados: .pdf .png .jpg .jpeg'
												);
											}}
											acceptedFiles={['image/*', 'application/pdf']}
											dropzoneClass={classes.dropzoneAreaBaseClasses}
											onAdd={onDropAtaProcuracaoDiretoria}
											filesLimit={1}
											dropzoneText="Arraste e solte o arquivo aqui ou clique para escolher"
											showPreviews={false}
											showPreviewsInDropzone={false}
										/>
										<Box width="300px">
											<Grid container>
												{documentoPreConta &&
												documentoPreConta.length > 0
													? documentoPreConta.map((item) =>
															item.categoria ===
															'PAGINA_ATA_ELEICAO_DIRETORES' ? (
																<Grid item xs={6}>
																	<Card
																		className={classes.card}
																	>
																		<CardActionArea>
																			<Box position="absolute">
																				<IconButton
																					onClick={() =>
																						handleExcluirArquivo(
																							item
																						)
																					}
																					size="small"
																					style={{
																						color: 'white',
																						backgroundColor:
																							'red',
																					}}
																				>
																					<ClearIcon />
																				</IconButton>
																			</Box>
																			{item.arquivo.includes(
																				'.pdf'
																			) ? (
																				<Box
																					style={{
																						display:
																							'flex',
																						alignItems:
																							'center',
																						justifyContent:
																							'center',
																						height:
																							'100px',
																					}}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				>
																					<PictureAsPdfIcon
																						style={{
																							color: 'black',
																							fontSize:
																								'70px',
																						}}
																					/>
																				</Box>
																			) : (
																				<CardMedia
																					component="img"
																					alt="Arquivo de Identificação"
																					height="100"
																					image={
																						item.arquivo
																					}
																					onClick={() =>
																						window.open(
																							item.arquivo
																						)
																					}
																				/>
																			)}
																		</CardActionArea>
																	</Card>
																</Grid>
															) : (
																false
															)
													  )
													: null}
											</Grid>
										</Box>
									</Box>
								</Grid>
							</Grid>

							<Box
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginTop: '80px',
								}}
							>
								<CustomBackButton
									color="purple"
									onClick={handleVoltar}
								/>

								<CustomFowardButton
									color="purple"
									onClick={handleContinuar}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
