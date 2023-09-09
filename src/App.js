import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import CustomNavbar from './components/Navbar';

import Home from './routes/Home';
import UserHome from './routes/UserHome';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Ticket from './routes/Ticket';

function App() {
	const { jwtToken } = useAuthContext();

	return (
		<div className='App'>
			<BrowserRouter>
				<CustomNavbar />
				<div className='pages'>
					<Routes>
						<Route 
							path="/" 
							element={jwtToken ? <UserHome /> : <Home />}
						/>
						<Route 
							path="/login" 
							element={!jwtToken ? <Login /> : <Navigate to="/" />} 
						/>
						<Route 
							path="/profile" 
							element={jwtToken ? <Profile /> : <Navigate to="/login" />}
						/>
						<Route 
							path="/ticket" 
							element={jwtToken ? <Ticket /> : <Navigate to="/" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
