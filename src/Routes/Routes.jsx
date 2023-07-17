import { Route, Switch } from 'react-router';

import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import React from 'react';
import Recuperar from '../pages/RecuperarSenha/RecuperarSenha';
import Solicitar from '../pages/SolicitarRecuperacao/SolicitarRecuperacao';
import SwitchContents from './SwitchContents';
import { Typography } from '@material-ui/core';

const Routes = () => {
	return (
		<Switch>
			<PrivateRoute
				path="/dashboard/:section"
				exact
				component={SwitchContents}
			/>
			<PrivateRoute
				path="/dashboard/:section/acao/:subsection"
				exact
				component={SwitchContents}
			/>
			<PrivateRoute
				path="/dashboard/:section/acao/:subsection/:subsectionId"
				exact
				component={SwitchContents}
			/>
			<PrivateRoute
				path="/dashboard/:section/:id/:subsection"
				exact
				component={SwitchContents}
			/>
			<PrivateRoute
				path="/dashboard/:section/:id/:subsection/:subsectionId"
				exact
				component={SwitchContents}
			/>

			<Route path="/login" exact component={Login} />
			<Route path="/cadastro" exact component={Cadastro} />
			{/* <Route
				path="/cadastro/criar-conta-pj"
				exact
				component={ErroCpfEtapa}
			/> */}
			{/* <Route
				path="/cadastro/conta-cadastrada"
				exact
				component={ContaCadastradaEtapa}
			/> */}
			<Route path="/reset-password/:token" exact component={Recuperar} />
			<Route path="/solicitar-reset" exact component={Solicitar} />

			<PrivateRoute path="/" />
		</Switch>
	);
};

export default Routes;
