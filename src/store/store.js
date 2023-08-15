import {
	LOAD_USER_DATA,
	POST_AUTH_ME,
	POST_LOGIN,
	SET_STATE,
	SET_SIDE_BAR,
	GET_CANDIDATO,
	GET_ADM_EMPRESA,
	GET_ADM_DIRETORIA,
} from '../constants/actionsStrings';
import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';

const INITIAL_STATE = {
	me: {},
	userData: {
		saldo: {
			valor: '',
		},
	},
	sideBar: {},
	candidato: {},
	admEmpresa: {},
	admDiretoria: {},
};

const enhancer = compose(applyMiddleware(thunk));
const state = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_STATE:
			return action.payload;

		case POST_LOGIN:
			return { ...state };

		case SET_SIDE_BAR:
			return { ...state, sideBar: action.payload };

		case LOAD_USER_DATA:
			return { ...state, userData: action.payload };

		case POST_AUTH_ME:
			return { ...state, me: action.payload };

		case GET_CANDIDATO:
			return { ...state, candidato: action.payload };

		case GET_ADM_EMPRESA:
			return { ...state, admEmpresa: action.payload };

		case GET_ADM_DIRETORIA:
			return { ...state, admDiretoria: action.payload };

		default:
			return { ...state };
	}
};

const store = createStore(state, enhancer);

export { store };
