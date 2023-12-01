import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router';
import { APP_CONFIG } from '../constants/config';

import CustomSideBar from '../components/CustomSideBar/CustomSideBar';
import Dashboard from '../pages/Dashboard/Dashboard';
import ListaCandidatos from '../pages/ListaCandidatos/ListaCandidatos';
import ListaAdministradoresEmpresa from '../pages/ListaAdministradoresEmpresa/ListaAdministradoresEmpresa';
import ListaAdministradoresDiretoria from '../pages/ListaAdministradoresDiretoria/ListaAdministradoresDiretoria';
import ListaVagas from '../pages/ListaVagas/ListaVagas';
import ListaProcessoSelecao from '../pages/ListaProcessoSelecao/ListaProcessoSelecao';
import ListaEmpresas from '../pages/ListaEmpresas/ListaEmpresas';
import ListaCategorias from '../pages/ListaCategorias/ListaCategorias';
import ListaConselhoRegulador from '../pages/ListaConselhoRegulador/ListaConselhoRegulador';
import ListaGrupoAtuante from '../pages/ListaGrupoAtuante/ListaGrupoAtuante';
import ListaEspecialidade from '../pages/ListaEspecialidade/ListaEspecialidade';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		width: '100%',
		margin: '0px',
		padding: '0px',
	},
	sideBarContainer: {
		display: 'flex',
		FlexDirection: 'column',
		width: '25%',
		height: '100vh',
		margin: '0px',
	},
	contentAreaContainer: {
		backgroundColor: '#fff',
		width: '100%',
		/* padding: '50px 50px 10px 50px', */
	},
	pageHeaderContainer: {
		backgroundColor: 'white',
		width: '100%',
		height: '35%',
	},
}));

const SwitchContents = () => {
	const classes = useStyles();
	const { section, id, subsection, subsectionId } = useParams();
	const token = useAuth();
	const dispatch = useDispatch();
	const me = useSelector((state) => state.me);
	const userPermissao = useSelector((state) => state.userPermissao);
	const userData = useSelector((state) => state.userData);
	const gerenciarPermissao = useSelector((state) => state.gerenciarPermissao);
	const [permissoes, setPermissoes] = useState([]);

	/* 	if (token) {
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = APP_CONFIG.crispId;
		(function () {
			var d = document;
			var s = d.createElement('script');
			s.src = 'https://client.crisp.chat/l.js';
			s.async = 1;
			d.getElementsByTagName('head')[0].appendChild(s);
		})();
	} */

	let content = null;

	switch (section) {
		case 'home':
			content = <Dashboard />;
			break;

		case 'candidatos':
			content = <ListaCandidatos />;
			break;

		case 'empresas':
			content = <ListaEmpresas />;
			break;

		case 'categorias':
			content = <ListaCategorias />;
			break;

		case 'vagas':
			content = <ListaVagas />;
			break;

		case 'processo-de-selecao':
			content = <ListaProcessoSelecao />;
			break;

		case 'administradores-empresa':
			content = <ListaAdministradoresEmpresa />;
			break;

		case 'administradores-diretoria':
			content = <ListaAdministradoresDiretoria />;
			break;

		case 'conselho-regulador':
			content = <ListaConselhoRegulador />;
			break;

		case 'grupo-atuante':
			content = <ListaGrupoAtuante />;
			break;

		case 'especialidade':
			content = <ListaEspecialidade />;
			break;

		default:
			content = null;
			break;
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.sidebarContainer}>
				{subsection && subsection === 'print' ? null : (
					<CustomSideBar cadastro={false} />
				)}

				<Box className={classes.pageHeaderContainer}></Box>
			</Box>

			<Box className={classes.contentAreaContainer}>{content}</Box>
		</Box>
	);
};

export default SwitchContents;
