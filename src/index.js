import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/Login" component={Login} />
		</Switch>
	</Router>,
	document.getElementById('root')
);