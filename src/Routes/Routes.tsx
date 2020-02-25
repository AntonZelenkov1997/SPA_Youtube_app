import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Autorization from '../pages/Autorization/Autorization';
import Search from '../pages/Search/Search';
import Favorites from '../pages/Favorites/Favorites';

const Routes: FC = () => {

	let local: any = localStorage.getItem('isOnline');
	
	let isOnline = JSON.parse(local);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{isOnline ? <Redirect to="/search" /> : <Autorization />}
				</Route>

				<Route path="/search">{isOnline ? <Search /> : <Redirect to="/" />}</Route>

				<Route path="/favorites">{isOnline ? <Favorites /> : <Redirect to="/" />}</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
