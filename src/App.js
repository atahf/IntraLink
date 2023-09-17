import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import { decodeJwtToken } from './utils/jwtTools';

import CustomNavbar from './components/Navbar';

import Home from './routes/Home';
import UserHome from './routes/UserHome';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Ticket from './routes/Ticket';
import NewUser from './routes/NewUser';

function App() {
	const { jwtToken } = useAuthContext();

	const hasPermission = (neededPerm) => {
		if(!jwtToken) {
			return false;
		}

		const userPerms = decodeJwtToken(jwtToken).authorities;
		
		for(var i in userPerms) {
			if(userPerms[i].authority === neededPerm) {
				return true;
			}
		}

		return false;
	}

	return (
		<div className='App'>
			<BrowserRouter>
				<CustomNavbar />
				<div className='pages'>
					<Routes>
						<Route 
							exact path="/" 
							element={jwtToken ? <UserHome /> : <Home />}
						/>
						<Route 
							exact path="/login" 
							element={!jwtToken ? <Login /> : <Navigate to="/" />} 
						/>
						<Route 
							exact path="/profile" 
							element={jwtToken ? <Profile /> : <Navigate to="/login" />}
						/>
						<Route 
							exact path="/ticket" 
							element={hasPermission("ticket:add") ? <Ticket /> : <Navigate to="/" />}
						/>
						<Route 
							exact path="/new-user" 
							element={hasPermission("user:add") ? <NewUser /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
