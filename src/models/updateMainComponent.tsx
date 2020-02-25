import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Routes from '../Routes/Routes';

const updateMainComponent = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Routes />
		</Provider>,
		document.getElementById('root')
	);
};

export default updateMainComponent;
