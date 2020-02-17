import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Autorization from '../pages/Autorization/Autorization';
import Search from '../pages/Search/Search';
import Favorites from '../pages/Favorites/Favorites';

const Routes: FC = () => (
	<Router>
		<Switch>
			<Route exact path="/">
				<Autorization />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route path="/favorites">
				<Favorites />
			</Route>
		</Switch>
	</Router>
);

export default Routes;
