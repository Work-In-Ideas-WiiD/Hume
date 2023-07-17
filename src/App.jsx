import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme/theme';
import { store } from './store/store';
import MetaTags from 'react-meta-tags';
import { ToastContainer } from 'react-toastify';
import Root from './pages/Root';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { APP_CONFIG } from './constants/config';

const App = () => {
	return (
		<Provider store={store}>
			<MetaTags>
				<title>{APP_CONFIG.name}</title>
				<meta name="description" content={APP_CONFIG.description} />
				<link rel="shortcut icon" href={APP_CONFIG.assets.favicon} />
			</MetaTags>
			<MuiThemeProvider theme={{ ...theme }}>
				<Root />
				<ToastContainer autoClose={3000} />
			</MuiThemeProvider>
		</Provider>
	);
};

export default App;
