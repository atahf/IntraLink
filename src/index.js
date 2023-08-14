import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</Router>,
	document.getElementById('root')
);