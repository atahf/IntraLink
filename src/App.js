import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import { decodeJwtToken, hasPermission } from './utils/jwtTools';

import CustomNavbar from './components/Navbar';

import Home from './routes/Home';
import UserHome from './routes/UserHome';
import Login from './routes/Login';
import Profile from './routes/Profile';
import NewTicket from './routes/NewTicket';
import Tickets from './routes/Tickets';
import Users from './routes/Users';
import NewUser from './routes/NewUser';
import AccountSettings from './routes/AccountSettings';

function App() {
	const { jwtToken } = useAuthContext();

	return (
		<div className='App'>
			<BrowserRouter>
				<CustomNavbar perms={jwtToken ? decodeJwtToken(jwtToken).authorities : null}/>
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
							exact path="/account-settings" 
							element={jwtToken ? <AccountSettings /> : <Navigate to="/login" />}
						/>
						<Route 
							exact path="/tickets" 
							element={hasPermission("ticket:read", jwtToken) ? <Tickets /> : <Navigate to="/" />}
						/>
						<Route 
							exact path="/users" 
							element={hasPermission("user:read", jwtToken) ? <Users /> : <Navigate to="/" />}
						/>
						<Route 
							exact path="/new-ticket" 
							element={hasPermission("ticket:add", jwtToken) ? <NewTicket /> : <Navigate to="/" />}
						/>
						<Route 
							exact path="/new-user" 
							element={hasPermission("user:add", jwtToken) ? <NewUser /> : <Navigate to="/" />}
						/>
						<Route 
							path="*" 
							element={<Navigate to="/" />} 
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
