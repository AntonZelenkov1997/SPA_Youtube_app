import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import Routes from './Routes/Routes';
import 'antd/dist/antd.css';
import './pages/Autorization/Autorization.scss';
import './pages/Search/Search.scss';
import './components/Header/Header.scss';
import './pages/Favorites/Favorites.scss';
import store from './store/store';

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
);
